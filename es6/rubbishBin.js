'use strict';

const easy = require('easy');

const DropTarget = require('./dropTarget');

const { Element } = easy;

class RubbishBin extends DropTarget {
  constructor(selector, removeHandler) {
    const moveHandler = removeHandler;  ///
    
    super(selector, moveHandler);
  }

  isOpen() {
    const open = this.hasClass('open');

    return open;
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

  open() {
    this.addClass('open');
  }

  close() {
    this.removeClass('open');
  }

  addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
    this.open();
  }

  removeMarkerEntry() {
    this.close();
  }

  dragging(draggableEntry, explorer) {
    const marked = this.isMarked();

    if (marked) {
      const toBeMarked = this.isToBeMarked(draggableEntry);

      if (!toBeMarked) {
        const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

        if (dropTargetToBeMarked !== null) {
          const directoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

          dropTargetToBeMarked.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
        } else {
          explorer.addMarkerEntryInPlace(draggableEntry);
        }

        this.removeMarkerEntry();
      }
    }
  }

  moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
    if (targetDirectoryPath === null) {
      const explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);
    }
  }

  moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
    if (targetFilePath === null) {
      const explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);
    }
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map(function(draggableEntry) {
      const pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
      
      return pathMap;
    });

    return pathMaps;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    const markedDirectoryNameDraggableEntry = null;

    return markedDirectoryNameDraggableEntry;
  }

  retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    const directoryNameDraggableEntryOverlappingDraggableEntry = null; ///

    return directoryNameDraggableEntryOverlappingDraggableEntry;
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
    className: 'rubbishBin'
  },
  ignoredProperties: [
    'onRemove'
  ]
});

module.exports = RubbishBin;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry(),
        directory = draggableEntryDirectoryNameDraggableEntry;  ///

  targetPath = null;  ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };

  return pathMap;
}
