'use strict';

const easy = require('easy');

const options = require('./options'),
      pathUtil = require('./util/path'),
      arrayUtil = require('./util/array'),
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
          draggableEntryPathTopmostDirectoryName = pathUtil.isPathTopmostDirectoryName(draggableEntryPath);

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
          draggableEntryPathWithoutBottommostName = pathUtil.pathWithoutBottommostName(draggableEntryPath),
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

  moveFile(file, sourceFilePath, targetFilePath) {
    const explorer = file.getExplorer();

    let filePath;

    if (targetFilePath === sourceFilePath) {

    } else if (targetFilePath === null) {
      filePath = sourceFilePath;  ///

      explorer.removeFile(filePath);
    } else {
      filePath = sourceFilePath;  ///

      explorer.removeFile(filePath);

      filePath = targetFilePath; ///

      this.addFile(filePath);
    }
  }

  moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
    const explorer = directory.getExplorer();
    
    let directoryPath;
    
    if (targetDirectoryPath === sourceDirectoryPath) {

    } else if (targetDirectoryPath === null) {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(directoryPath);
    } else {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(directoryPath);

      const collapsed = directory.isCollapsed();
      
      directoryPath = targetDirectoryPath; ///

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
      const pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

      return pathMap;
    });

    return pathMaps;
  }

  childElements(properties) {
    const { rootDirectoryName, rootDirectoryCollapsed } = properties,
          name = rootDirectoryName, ///
          collapsed = rootDirectoryCollapsed, ///
          explorer = this,  ///
          rootDirectory = <RootDirectory name={name} explorer={explorer} collapsed={collapsed} />;

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
    'rootDirectoryCollapsed',
    'onOpen',
    'onMove',
    'options'
  ]
});

module.exports = Explorer;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryDirectory = draggableEntry.isDirectory(),
        directory = draggableEntryDirectory;  ///

  targetPath = (sourcePath === null) ?
                  prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) :  ///
                    replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };

  return pathMap;
}

function prependTargetPathToDraggableEntryPath(draggableEntryPath,  targetPath) {
  draggableEntryPath = targetPath + '/' + draggableEntryPath;

  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)');  ///

  const regExp = new RegExp('^' + sourcePath + '(.*$)'),
        matches = draggableEntryPath.match(regExp),
        secondMatch = arrayUtil.second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
