'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const options = require('./options'),
      Entries = require('./entries'),
      DropTarget = require('./dropTarget'),
      entryTypes = require('./entryTypes'),
      DirectoryNameDraggableEntry = require('./entry/draggable/directoryName'),
      TopmostDirectoryNameDraggableEntry = require('./entry/draggable/directoryName/topmost');

const { pathUtilities, arrayUtilities } = necessary,
      { Element, React } = easy,
      { second } = arrayUtilities,
      { NO_DRAGGING_WITHIN } = options,
      { DIRECTORY_NAME_TYPE } = entryTypes,
      { pathWithoutBottommostNameFromPath } = pathUtilities;

class Explorer extends DropTarget {
  constructor(selector, moveHandler, openHandler = defaultOpenHandler, options = {}) {
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

  isOptionPresent(option) {
    const optionPresent = !!this.options[option]; ///

    return optionPresent;
  }

  getFilePaths() {
    const filePaths = this.retrieveFilePaths();

    return filePaths;
  }

  getDirectoryPaths() {
    const directoryPaths = this.retrieveDirectoryPaths();

    return directoryPaths;
  }

  getDirectoryNameDraggableEntry() {
    return DirectoryNameDraggableEntry; ///
  }

  mark(draggableEntry, previousDraggableEntry = null) {
    const draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType();

  let markerEntryPath;

  if (previousDraggableEntry !== null) {
    const previousDraggableEntryName = previousDraggableEntry.getName();

    markerEntryPath = `${draggableEntryPath}/${previousDraggableEntryName}`;
  } else {
    markerEntryPath = draggableEntryPath; ///

  }

    this.addMarker(markerEntryPath, draggableEntryType);
  }

  unmark() {
    this.removeMarker();
  }

  isMarked() {
    const markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
          marked = (markedDirectoryNameDraggableEntry !== null);

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = (bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry !== null);

    return toBeMarked;
  }

  startDragging(draggableEntry) {
    const marked = this.isMarked(),
          startedDragging = !marked;

    if (startedDragging) {
      this.mark(draggableEntry);
    }

    return startedDragging;
  }

  dragging(draggableEntry, explorer = this) {
    const markedDropTarget = this.getMarkedDropTarget();

    if (markedDropTarget === this) {
      let bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;

      const toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        const within = (explorer === this), ///
              noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN),
              noDragging = (within && noDraggingWithinOptionPresent);

        if (!noDragging) {
          const markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry();

          bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

          if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
            this.unmark();

            const previousDraggableEntry = draggableEntry;  ///

            draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;  ///

            this.mark(draggableEntry, previousDraggableEntry);
          }
        }
      } else {
        const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

        if (dropTargetToBeMarked !== null) {
          bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

          const previousDraggableEntry = draggableEntry;  ///

          draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;  ///

          dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);
        } else {
          explorer.mark(draggableEntry);
        }

        this.unmark();
      }
    } else {
      markedDropTarget.dragging(draggableEntry, explorer);
    }
  }

  stopDragging(draggableEntry, done) {
    const markedDropTarget = this.getMarkedDropTarget(),
          draggableEntryPath = draggableEntry.getPath(),
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
      markedDropTarget.unmark();

      done();
    } else {
      const draggableEntrySubEntries = draggableEntry.retrieveDraggableSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

      draggableEntries.reverse();

      draggableEntries.push(draggableEntry);

      markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, () => {
        markedDropTarget.unmark();

        done();
      });
    }
  }

  escapeDragging() {
    this.unmarkGlobally();
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
    const fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
          filePath = fileNameDraggableEntryPath;  ///

    this.openHandler(filePath);
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map((draggableEntry) => {
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

            <Entries explorer={explorer} />

          ;

    entries.addDirectoryNameDraggableEntry(directoryName, collapsed, TopmostDirectoryNameDraggableEntry);

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

function defaultOpenHandler(sourcePath) {
  ///
}
