'use strict';

const easy = require('easy');

const DropTarget = require('./dropTarget');

const { Element } = easy;

class RubbishBin extends DropTarget {
  constructor(selector, removeHandler) {
    const moveHandler = removeHandler;  ///
    
    super(selector, moveHandler);

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

  moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
    if (targetDirectoryPath === null) {
      const explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(directoryPath);
    }
  }

  moveFile(file, sourceFilePath, targetFilePath) {
    if (targetFilePath === null) {
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
      const pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
      
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

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryDirectory = draggableEntry.isDirectory(),
        directory = draggableEntryDirectory;  ///

  targetPath = null;  ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };

  return pathMap;
}
