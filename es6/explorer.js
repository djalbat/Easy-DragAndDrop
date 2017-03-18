'use strict';

const easyui = require('easyui'),
      Element = easyui.Element,
      React = easyui.React;

const util = require('./util'),
      options = require('./options'),
      DropTarget = require('./dropTarget'),
      DirectoryMarker = require('./explorer/entry/marker/directory'),
      RootDirectory = require('./explorer/draggableEntry/directory/root');

class Explorer extends DropTarget {
  constructor(selector, rootDirectoryName, openHandler = function(sourcePath) {}, moveHandler = function(pathMaps, done) { done(); } ) {
    super(selector, moveHandler);

    const name = rootDirectoryName, ///
          explorer = this,  ///
          rootDirectory = <RootDirectory name={name} explorer={explorer} className="directory" />;

    this.openHandler = openHandler;

    this.options = {};

    this.rootDirectory = rootDirectory;

    this.append(rootDirectory);
  }

  setOption(option) {
    this.options[option] = true;
  }

  unsetOption(option) {
    delete(this.options[option]);
  }

  hasOption(option) {
    option = (this.options[option] === true); ///

    return option;
  }

  getFilePaths() { return this.rootDirectory.getFilePaths(); }
  
  getRootDirectoryName() { return this.rootDirectory.getName(); }
  
  getMarkedDirectory() { return this.rootDirectory.getMarkedDirectory(); }
  
  getDirectoryOverlappingDraggableEntry(draggableEntry) { return this.rootDirectory.getDirectoryOverlappingDraggableEntry(draggableEntry); }
  
  getDraggableEntryPath(draggableEntry) { return this.rootDirectory.getDraggableEntryPath(draggableEntry); }

  addFile(filePath) { this.rootDirectory.addFile(filePath); }
  
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }

  removeFile(filePath) { this.rootDirectory.removeFile(filePath); }
  
  removeDirectory(directoryPath) { this.rootDirectory.removeDirectory(directoryPath); }

  addMarkerInPlace(draggableEntry) {
    const draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

    if (draggableEntryPathTopmostDirectoryName) {
      const topmostDirectoryMarkerPath = draggableEntryPath;

      this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
    } else {
      const markerPath = draggableEntryPath;

      this.rootDirectory.addMarker(markerPath, draggableEntryType);
    }
  }

  addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
    const draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

    this.rootDirectory.addMarker(markerPath, draggableEntryType);
  }

  addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
    const topmostDirectoryMarkerName = topmostDirectoryMarkerPath,  ///
          name = topmostDirectoryMarkerName,  ///
          topmostDirectoryMarker = <DirectoryMarker name={name} className="marker" />;

    this.append(topmostDirectoryMarker);
  }

  removeMarker() {
    const rootDirectoryMarked = this.rootDirectory.isMarked();

    if (rootDirectoryMarked) {
      this.rootDirectory.removeMarker();
    } else {
      const topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

      topmostDirectoryMarker.remove();
    }
  }

  isMarked() {
    let marked;
    
    const rootDirectoryMarked = this.rootDirectory.isMarked();

    if (rootDirectoryMarked) {
      marked = true;
    } else {
      const topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

      marked = (topmostDirectoryMarker !== null);
    }

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = (directoryOverlappingDraggableEntry !== null);

    return toBeMarked;
  }

  retrieveTopmostDirectoryMarker() {
    let topmostDirectoryMarker = null;
    
    const childListElements = this.getChildElements('li');

    childListElements.some(function(childElement) {
      if (childElement instanceof DirectoryMarker) {
        topmostDirectoryMarker = childElement;  ///

        return true;
      } else {
        return false;
      }
    });

    return topmostDirectoryMarker;
  }

  startDragging(draggableEntry) {
    const marked = this.isMarked(),
          startedDragging = !marked;

    if (startedDragging) {
      this.addMarkerInPlace(draggableEntry);
    }

    return startedDragging;
  }

  stopDragging(draggableEntry, done) {
    const draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDropTarget = marked ?
                                     this :
                                       this.getMarkedDropTarget(),
          markedDirectory = markedDropTarget.getMarkedDirectory(),
          markedDirectoryPath = (markedDirectory !== null) ?
                                  markedDirectory.getPath() :
                                    null,
          draggableEntryPathWithoutBottommostName = util.pathWithoutBottommostName(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryPath,
          unmoved = (sourcePath === targetPath);

    if (marked && unmoved) {
      this.removeMarker();

      done();
    } else {
      const subDraggableEntries = draggableEntry.getSubEntries(),
            draggableEntries = subDraggableEntries; ///

      draggableEntries.reverse();
      draggableEntries.push(draggableEntry);

      markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function() {
        markedDropTarget.removeMarker();

        done();
      });
    }
  }

  escapeDragging() {
    this.removeMarkerGlobally();
  }

  dragging(draggableEntry, explorer = this) {
    const marked = this.isMarked();
    
    if (marked) {
      let directoryOverlappingDraggableEntry;
      
      const toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        const within = (explorer === this), ///
              noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

        if (!noDragging) {
          const markedDirectory = this.getMarkedDirectory();

          directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry);

          if (markedDirectory !== directoryOverlappingDraggableEntry) {
            this.removeMarker();

            this.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          }
        }
      } else {
        const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

        if (dropTargetToBeMarked !== null) {
          directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

          dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
        } else {
          explorer.addMarkerInPlace(draggableEntry);
        }

        this.removeMarker();
      }
    } else {
      const markedDropTarget = this.getMarkedDropTarget();

      markedDropTarget.dragging(draggableEntry, explorer);
    }
  }
  
  moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
    const explorer = directory.getExplorer();
    
    let directoryPath;
    
    if (movedDirectoryPath === sourceDirectoryPath) {

    } else if (movedDirectoryPath === null) {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(directoryPath);
    } else {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(directoryPath);

      const collapsed = directory.isCollapsed();
      
      directoryPath = movedDirectoryPath; ///

      this.addDirectory(directoryPath, collapsed);
    }
  }

  moveFile(file, sourceFilePath, movedFilePath) {
    const explorer = file.getExplorer();
    
    let filePath;

    if (movedFilePath === sourceFilePath) {

    } else if (movedFilePath === null) {
      filePath = sourceFilePath;  ///

      explorer.removeFile(filePath);
    } else {
      filePath = sourceFilePath;  ///

      explorer.removeFile(filePath);
      
      filePath = movedFilePath; ///

      this.addFile(filePath);
    }
  }

  openFile(file) {
    const filePath = file.getPath(this.rootDirectory);
    
    this.openHandler(filePath);
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map(function(draggableEntry) {
      const pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,  ///
            targetDraggableEntryPath = (sourcePath === null) ?
                                         util.prependTargetPath(draggableEntryPath, targetPath) :
                                           util.replaceSourcePathWithTargetPath(draggableEntryPath, sourcePath, targetPath);

      pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

      return pathMap;
    });

    return pathMaps;
  }

  static clone(selector, rootDirectoryName, openHandler, moveHandler) {
    return Element.clone(Explorer, selector, rootDirectoryName, openHandler, moveHandler);
  }

  static fromHTML(html, rootDirectoryName, openHandler, moveHandler) {
    return Element.fromHTML(Explorer, html, rootDirectoryName, openHandler, moveHandler);
  }
  
  static fromProperties(properties) {
    const { rootDirectoryName, onOpen, onMove } = properties,
          openHandler = onOpen, ///
          moveHandler = onMove; ///

    return Element.fromProperties(Explorer, properties, rootDirectoryName, openHandler, moveHandler);
  }
}

Object.assign(Explorer, {
  tagName: 'ul',
  ignoredAttributes: [
    'rootDirectoryName', 
    'onOpen',
    'onMove'
  ]
});

module.exports = Explorer;
