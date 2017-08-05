'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const options = require('./options'),
      DropTarget = require('./dropTarget'),
      DirectoryNameMarkerEntry = require('./explorer/entry/marker/directoryName'),
      TopmostDirectoryNameDraggableEntry = require('./explorer/draggableEntry/directoryName/topmost');

const { Element, React } = easy,
      { path, array } = necessary;

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

    const topmostDirectoryNameDraggableEntryMarked = this.isTopmostDirectoryNameDraggableEntryMarked();

    if (topmostDirectoryNameDraggableEntryMarked) {
      marked = true;
    } else {
      const topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

      marked = (topmostDirectoryNameMarkerEntry !== null);
    }

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = (directoryNameDraggableEntryOverlappingDraggableEntry !== null);

    return toBeMarked;
  }
  
  getFilePaths() {
    const filePaths = this.retrieveFilePaths();
    
    return filePaths;
  }
  
  addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
    const draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryNameDraggableEntryOverlappingDraggableEntry.getPath(),
          markerEntryPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

    this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
  }

  addMarkerEntryInPlace(draggableEntry) {
    const draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = path.isPathTopmostDirectoryName(draggableEntryPath);

    if (draggableEntryPathTopmostDirectoryName) {
      const topmostDirectoryMarkerPath = draggableEntryPath;

      this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
    } else {
      const markerEntryPath = draggableEntryPath;

      this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
    }
  }

  addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
    const topmostDirectoryMarkerName = topmostDirectoryMarkerPath,  ///
          name = topmostDirectoryMarkerName,  ///
          topmostDirectoryNameMarkerEntry = <DirectoryNameMarkerEntry name={name} />;

    this.append(topmostDirectoryNameMarkerEntry);
  }

  findTopmostDirectoryNameMarkerEntry() {
    const childListElements = this.getChildElements('li'),
          topmostDirectoryNameMarkerEntry = childListElements.find(function(childListElement) {
            const found = (childListElement instanceof DirectoryNameMarkerEntry);
                
            return found;
          }) || null; /// 

    
    return topmostDirectoryNameMarkerEntry;
  }

  removeMarkerEntry() {
    const topmostDirectoryNameDraggableEntryMarked = this.isTopmostDirectoryNameDraggableEntryMarked();

    if (topmostDirectoryNameDraggableEntryMarked) {
      this.removeTopmostDirectoryNameDraggableEntryMarkerEntry();
    } else {
      const topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

      topmostDirectoryNameMarkerEntry.remove();
    }
  }

  startDragging(draggableEntry) {
    const marked = this.isMarked(),
          startedDragging = !marked;

    if (startedDragging) {
      this.addMarkerEntryInPlace(draggableEntry);
    }

    return startedDragging;
  }

  stopDragging(draggableEntry, done) {
    const draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDropTarget = marked ?
                               this :
                                 this.getMarkedDropTarget(),
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          markedDirectoryNameDraggableEntryPath = (markedDirectoryNameDraggableEntry !== null) ?
                                                    markedDirectoryNameDraggableEntry.getPath() :
                                                      null,
          draggableEntryPathWithoutBottommostName = path.pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryNameDraggableEntryPath,
          unmoved = (sourcePath === targetPath);

    if (marked && unmoved) {
      this.removeMarkerEntry();

      done();
    } else {
      const draggableEntrySubEntries = draggableEntry.retrieveSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

      draggableEntries.reverse();
      draggableEntries.push(draggableEntry);

      markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function() {
        markedDropTarget.removeMarkerEntry();

        done();
      });
    }
  }

  dragging(draggableEntry, explorer = this) {
    const marked = this.isMarked();
    
    if (marked) {
      let directoryNameDraggableEntryOverlappingDraggableEntry;
      
      const toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        const within = (explorer === this), ///
              noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

        if (!noDragging) {
          const markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry();

          directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

          if (markedDirectoryNameDraggableEntry !== directoryNameDraggableEntryOverlappingDraggableEntry) {
            this.removeMarkerEntry();

            this.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
          }
        }
      } else {
        const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

        if (dropTargetToBeMarked !== null) {
          directoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

          dropTargetToBeMarked.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
        } else {
          explorer.addMarkerEntryInPlace(draggableEntry);
        }

        this.removeMarkerEntry();
      }
    } else {
      const markedDropTarget = this.getMarkedDropTarget();

      markedDropTarget.dragging(draggableEntry, explorer);
    }
  }

  escapeDragging() {
    this.removeMarkerEntryGlobally();
  }

  moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
    const explorer = fileNameDraggableEntry.getExplorer();

    let filePath;

    if (targetFilePath === sourceFilePath) {

    } else if (targetFilePath === null) {
      filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);
    } else {
      filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);

      filePath = targetFilePath; ///

      const recognised = fileNameDraggableEntry.isRecognised();

      this.addFilePath(filePath, recognised);
    }
  }

  moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
    const explorer = directoryNameDraggableEntry.getExplorer();
    
    let directoryPath;
    
    if (targetDirectoryPath === sourceDirectoryPath) {

    } else if (targetDirectoryPath === null) {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);
    } else {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);

      directoryPath = targetDirectoryPath; ///

      const collapsed = directoryNameDraggableEntry.isCollapsed();
      
      this.addDirectoryPath(directoryPath, collapsed);
    }
  }

  openFileNameDraggableEntry(fileNameDraggableEntry) {
    const topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(),
          fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(topmostDirectoryNameDraggableEntry),
          filePath = fileNameDraggableEntryPath;  ///

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
    const { topmostDirectoryName, topmostDirectoryCollapsed } = properties,
          name = topmostDirectoryName, ///
          collapsed = topmostDirectoryCollapsed, ///
          explorer = this,  ///
          topmostDirectory = <TopmostDirectoryNameDraggableEntry name={name} explorer={explorer} collapsed={collapsed} />;

    return topmostDirectory;
  }

  initialise() {
    this.assignContext();
  }

  static fromProperties(properties) {
    const { onMove, onOpen, options } = properties,
          moveHandler = onMove, ///
          openHandler = onOpen, ///
          explorer = Element.fromProperties(Explorer, properties, moveHandler, openHandler, options);

    explorer.initialise();
    
    return explorer;
  }
}

Object.assign(Explorer, {
  tagName: 'ul',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: [
    'topmostDirectoryName',
    'topmostDirectoryCollapsed',
    'onOpen',
    'onMove',
    'options'
  ]
});

module.exports = Explorer;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry(),
        directory = draggableEntryDirectoryNameDraggableEntry;  ///

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
        secondMatch = array.second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
