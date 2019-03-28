'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const options = require('./options'),
      Entries = require('./entries'),
      DropTarget = require('./dropTarget'),
      entryTypes = require('./entryTypes'),
      DirectoryNameDraggableEntry = require('./entry/draggable/directoryName');

const { pathUtilities, arrayUtilities } = necessary,
      { Element, React } = easy,
      { first, second } = arrayUtilities,
      { NO_DRAGGING_WITHIN } = options,
      { DIRECTORY_NAME_TYPE } = entryTypes,
      { topmostDirectoryNameFromPath, pathWithoutBottommostNameFromPath, pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

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

  getFilePaths() {
    const filePaths = this.retrieveFilePaths();

    return filePaths;
  }

  getDirectoryPaths() {
    const directoryPaths = this.retrieveDirectoryPaths();

    return directoryPaths;
  }

  addFilePath(filePath) {
    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(filePath);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      filePath = filePathWithoutTopmostDirectoryName; ///

      topmostDirectoryNameDraggableEntry.addFilePath(filePath);
    }
  }

  removeFilePath(filePath) {
    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(filePath);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      filePath = filePathWithoutTopmostDirectoryName; ///

      topmostDirectoryNameDraggableEntry.removeFilePath(filePath);
    }
  }

  addDirectoryPath(directoryPath, collapsed = false) {
    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(directoryPath);

    if (topmostDirectoryNameDraggableEntry!== null) {
      const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      directoryPath = directoryPathWithoutTopmostDirectoryName; ///

      topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPath, collapsed);
    }
  }

  removeDirectoryPath(directoryPath) {
    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(directoryPath);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      directoryPath = directoryPathWithoutTopmostDirectoryName; ///

      topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPath);
    }
  }

  isOptionPresent(option) {
    const optionPresent = (this.options[option] === true);

    return optionPresent;
  }

  isMarked() {
    const topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry(),
          marked = (topmostDirectoryNameMarkerEntry !== null);

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = (directoryNameDraggableEntryOverlappingDraggableEntry !== null);

    return toBeMarked;
  }
  
  addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
    const draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryNameDraggableEntryOverlappingDraggableEntry.getPath();

    let markerEntryPath = `${directoryOverlappingDraggableEntryPath}/${draggableEntryName}`;

    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(markerEntryPath),
          markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);

    markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///

    topmostDirectoryNameDraggableEntry.addMarkerEntry(markerEntryPath, draggableEntryType);
  }

  addMarkerEntryInPlace(draggableEntry) {
    const draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType();

    let markerEntryPath = draggableEntryPath;

    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(markerEntryPath),
          markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);

    markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///

    topmostDirectoryNameDraggableEntry.addMarkerEntry(markerEntryPath, draggableEntryType);
  }

  findTopmostDirectoryNameMarkerEntry() {
    let topmostDirectoryNameMarkerEntry = null;

    const childDirectoryNameMarkerEntryListItemElements = this.getChildElements('li.directoryName marker entry'),
          childDirectoryNameMarkerEntryListItemElementsLength = childDirectoryNameMarkerEntryListItemElements.length;

    if (childDirectoryNameMarkerEntryListItemElementsLength === 1) {
      const firstChildDirectoryNameMarkerEntryListItemElement = first(childDirectoryNameMarkerEntryListItemElements);

      topmostDirectoryNameMarkerEntry = firstChildDirectoryNameMarkerEntryListItemElement;  ///

    }
    
    return topmostDirectoryNameMarkerEntry;
  }

  findTopmostDirectoryNameDraggableEntry(path) {
    let topmostDirectoryNameDraggableEntry = null;

    const topmostDirectoryName = topmostDirectoryNameFromPath(path),
          directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

    if (directoryNameDraggableEntry !== null) {
      topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
    }

    return topmostDirectoryNameDraggableEntry;
  }

  retrieveDraggableEntryPath(draggableEntry) {
    const draggableEntryPath = this.entriesRetrieveDraggableEntryPath(draggableEntry);

    return draggableEntryPath;
  }

  removeMarkerEntry() {
    const topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

    topmostDirectoryNameMarkerEntry.remove();
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
          draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName; ///

    let targetPath = null,
        duplicate = false;

    if (markedDirectoryNameDraggableEntry !== null) {
      const draggableEntryName = draggableEntry.getName(),
            name = draggableEntryName,  ///
            draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);

      if (draggableEntryPresent) {
        duplicate = true;
      } else {
        const markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry.getPath();

        targetPath = markedDirectoryNameDraggableEntryPath; ///
      }
    }

    const unmoved = (sourcePath === targetPath);

    if (duplicate || unmoved) {
      markedDropTarget.removeMarkerEntry();

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
              noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN),
              noDragging = (within && noDraggingWithinOptionPresent);

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
    let draggableEntry = null;
    
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

      fileNameDraggableEntry = this.addFilePath(filePath);

      draggableEntry = fileNameDraggableEntry;  ///
    }
    
    return draggableEntry;
  }
  
  moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
    let draggableEntry = null;
    
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

      directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);

      draggableEntry = directoryNameDraggableEntry; ///
    }
    
    return draggableEntry;
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
          explorer = this,  ///
          collapsed = topmostDirectoryCollapsed,  ///
          directoryName = topmostDirectoryName, ///
          entries =

            <Entries />

          ;

    entries.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry);

    const childElements = entries;  ///

    return childElements;
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
  tagName: 'div',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: [
    'onOpen',
    'onMove',
    'options',
    'topmostDirectoryName',
    'topmostDirectoryCollapsed'
  ]
});

module.exports = Explorer;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryType = draggableEntry.getType(),
        draggableEntryDirectoryNameDraggableEntry = (draggableEntryType === DIRECTORY_NAME_TYPE),
        directory = draggableEntryDirectoryNameDraggableEntry;  ///

  targetPath = (sourcePath === null) ?
                  prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) :  ///
                    replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath,
    targetPath,
    directory
  };

  return pathMap;
}

function prependTargetPathToDraggableEntryPath(draggableEntryPath,  targetPath) {
  draggableEntryPath = `${targetPath}/${draggableEntryPath}`;

  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)');  ///

  const regExp = new RegExp(`^${sourcePath}(.*$)`),
        matches = draggableEntryPath.match(regExp),
        secondMatch = second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
