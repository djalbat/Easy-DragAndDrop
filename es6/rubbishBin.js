'use strict';

const easy = require('easy'),
      Element = easy.Element;

const DropTarget = require('./dropTarget');

class RubbishBin extends DropTarget {
  constructor(selector, removeHandler = function(pathMaps, done) { done(); } ) {
    const dropTargetMoveHandler = removeHandler;  ///
    
    super(selector, dropTargetMoveHandler);

    this.close();
  }

  getMarkedDirectory() {
    const markedDirectory = null;
    
    return markedDirectory;
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    const directoryOverlappingDraggableEntry = null; ///

    return directoryOverlappingDraggableEntry;
  }

  addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
    this.open();
  }

  removeMarker() {
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
  
  dragging(draggableEntry, explorer) {
    const marked = this.isMarked();

    if (marked) {
      const toBeMarked = this.isToBeMarked(draggableEntry);

      if (!toBeMarked) {
        const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

        if (dropTargetToBeMarked !== null) {
          const directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

          dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
        } else {
          explorer.addMarkerInPlace(draggableEntry);
        }

        this.removeMarker();
      }
    }
  }

  moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
    if (movedDirectoryPath === null) {
      const explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(directoryPath);
    }
  }

  moveFile(file, sourceFilePath, movedFilePath) {
    if (movedFilePath === null) {
      const explorer = file.getExplorer(),
            filePath = sourceFilePath;  ///

      explorer.removeFile(filePath);
    }
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

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map(function(draggableEntry) {
      const pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,  ///
            targetDraggableEntryPath = null;

      pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

      return pathMap;
    });

    return pathMaps;
  }

  static fromProperties(properties) {
    const { onRemove } = properties,
          removeHandler = onRemove; ///

    return Element.fromProperties(RubbishBin, properties, removeHandler);
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
