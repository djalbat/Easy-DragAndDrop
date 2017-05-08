'use strict';

const easy = require('easy');

const util = require('./util'),
      options = require('./options'),
      DropTarget = require('./dropTarget'),
      DirectoryMarker = require('./explorer/entry/marker/directory'),
      RootDirectory = require('./explorer/draggableEntry/directory/root');

const { Element, React } = easy;

class Explorer extends DropTarget {
  constructor(selector, moveHandler, openHandler = function(sourcePath) {}, options = {}) {
    super(selector, moveHandler);

    this.openHandler = openHandler;

    this.options = options;
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

  isMarked() {
    let marked;

    const rootDirectoryMarked = this.isRootDirectoryMarked();

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
  
  getFilePaths() { return this.rootDirectory.getFilePaths(); }

  addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
    const draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

    this.addRootDirectoryMarker(markerPath, draggableEntryType);
  }

  addMarkerInPlace(draggableEntry) {
    const draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

    if (draggableEntryPathTopmostDirectoryName) {
      const topmostDirectoryMarkerPath = draggableEntryPath;

      this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
    } else {
      const markerPath = draggableEntryPath;

      this.addRootDirectoryMarker(markerPath, draggableEntryType);
    }
  }

  addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
    const topmostDirectoryMarkerName = topmostDirectoryMarkerPath,  ///
          name = topmostDirectoryMarkerName,  ///
          topmostDirectoryMarker = <DirectoryMarker name={name} />;

    this.append(topmostDirectoryMarker);
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

  removeMarker() {
    const rootDirectoryMarked = this.isRootDirectoryMarked();

    if (rootDirectoryMarked) {
      this.removeRootDirectoryMarker();
    } else {
      const topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

      topmostDirectoryMarker.remove();
    }
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

  escapeDragging() {
    this.removeMarkerGlobally();
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

  openFile(file) {
    const rootDirectory = this.getRootDirectory(),
          filePath = file.getPath(rootDirectory);

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

  childElements(properties) {
    const { rootDirectoryName } = properties,
          name = rootDirectoryName, ///
          explorer = this,  ///
          rootDirectory = <RootDirectory name={name} explorer={explorer} />;

    return rootDirectory;
  }

  applyProperties() {
    super.applyProperties(...arguments);

    this.assignContext();
  }

  static fromProperties(properties) {
    const { onMove, onOpen, options } = properties,
          moveHandler = onMove, ///
          openHandler = onOpen; ///

    return Element.fromProperties(Explorer, properties, moveHandler, openHandler, options);
  }
}

Object.assign(Explorer, {
  tagName: 'ul',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: [
    'rootDirectoryName', 
    'onOpen',
    'onMove',
    'options'
  ]
});

module.exports = Explorer;
