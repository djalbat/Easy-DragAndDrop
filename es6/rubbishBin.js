'use strict';

const easy = require('easy');

const types = require('./types'),
      DropTarget = require('./dropTarget');

const { Element } = easy,
      { DIRECTORY_NAME_TYPE } = types;

class RubbishBin extends DropTarget {
  constructor(selector, removeHandler) {
    const moveHandler = removeHandler;  ///
    
    super(selector, moveHandler);
  }

  open() {
    this.addClass('open');
  }

  close() {
    this.removeClass('open');
  }

  isOpen() {
    const open = this.hasClass('open');

    return open;
  }

  mark(draggableEntry, previousDraggableEntry) {
    this.open();
  }

  unmark() {
    this.close();
  }

  isMarked() {
    const open = this.isOpen(),
          marked = open;  ///

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

    return toBeMarked;
  }

  dragging(draggableEntry) {
    const explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

    if (markedDropTarget !== this) {
      return;
    }

    const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

    if (dropTargetToBeMarked === this) {
      ///
    } else if (dropTargetToBeMarked !== null) {
      this.unmark();

      dropTargetToBeMarked.markDraggableEntry(draggableEntry);
    } else {
      const dropTargetToBeMarked = explorer,  ///
            previousDraggableEntry = null;

      this.unmark();

      dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);
    }
  }

  markDraggableEntry(draggableEntry) {
    const previousDraggableEntry = null;

    this.mark(draggableEntry, previousDraggableEntry);
  }

  moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
    const draggableEntry = null;

    if (targetFilePath === null) {
      const explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);
    }

    return draggableEntry;
  }

  moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
    const draggableEntry = null;

    if (targetDirectoryPath === null) {
      const explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);
    }

    return draggableEntry;
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map((draggableEntry) => {
      const pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
      
      return pathMap;
    });

    return pathMaps;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    const markedDirectoryNameDraggableEntry = null; ///

    return markedDirectoryNameDraggableEntry;
  }

  retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    const bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null; ///

    return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
  }

  initialise() {
    this.close();
  }

  static fromProperties(properties) {
    const { onRemove } = properties,
          removeHandler = onRemove, ///
          rubbishBin = Element.fromProperties(RubbishBin, properties, removeHandler);

    rubbishBin.initialise();
    
    return rubbishBin;
  }
}

Object.assign(RubbishBin, {
  tagName: 'div',
  defaultProperties: {
    className: 'rubbish-bin'
  },
  ignoredProperties: [
    'onRemove'
  ]
});

module.exports = RubbishBin;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryType = draggableEntry.getType(),
        draggableEntryDirectoryNameDraggableEntry = (draggableEntryType === DIRECTORY_NAME_TYPE),
        directory = draggableEntryDirectoryNameDraggableEntry;  ///

  targetPath = null;  ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath,
    targetPath,
    directory
  };

  return pathMap;
}
