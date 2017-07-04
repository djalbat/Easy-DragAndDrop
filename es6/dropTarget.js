'use strict';

const easy = require('easy');

const options = require('./options'),
      arrayUtil = require('./util/array');

const { Element } = easy;

class DropTarget extends Element {
  constructor(selector, moveHandler = function(pathMaps, done) { done(); }) {
    super(selector);
    
    this.moveHandler = moveHandler;

    this.dropTargets = [];
  }

  addDropTarget(dropTarget) {
    this.dropTargets.push(dropTarget);
  }

  removeDropTarget(dropTarget) {
    const index = indexOf(this.dropTargets, dropTarget),
          found = (index !== -1);

    if (found) {
      this.dropTargets.splice(index, 1);
    }
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDropTargetToBeMarked(draggableEntry) {
    const dropTargetToBeMarked = this.dropTargets.reduce(function(dropTargetToBeMarked, dropTarget) {
      if (dropTargetToBeMarked === null) {
        if (dropTarget.isToBeMarked(draggableEntry)) { ///
          dropTargetToBeMarked = dropTarget;
        }
      }

      return dropTargetToBeMarked;
    }, null);

    return dropTargetToBeMarked;
  }

  getMarkedDropTarget() {
    const markedDropTarget = this.dropTargets.reduce(function(markedDropTarget, dropTarget) {
      if (markedDropTarget === null) {
        const dropTargetMarked = dropTarget.isMarked();
        
        if (dropTargetMarked) {
          markedDropTarget = dropTarget;
        }
      }

      return markedDropTarget;
    }, null);

    return markedDropTarget;
  }

  removeMarkerGlobally() {
    const marked = this.isMarked();

    if (marked) {
      this.removeMarker();
    } else {
      const markedDropTarget = this.getMarkedDropTarget();

      markedDropTarget.removeMarker();
    }
  }

  moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
    const pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

    this.moveHandler(pathMaps, function() {
      const lastDraggableEntry = arrayUtil.last(draggableEntries),
            firstDraggableEntry = arrayUtil.first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer, ///
            removeEmptyParentDirectories = draggableEntriesExplorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      if (removeEmptyParentDirectories) {
        draggableEntriesExplorer.unsetOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
      }

      draggableEntries.forEach(function(draggableEntry) {
        if (draggableEntry === lastDraggableEntry) {
          if (removeEmptyParentDirectories) {
            draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
          }
        }

        const draggableEntryPath = draggableEntry.getPath();

        if (draggableEntryPath !== null) {
          const pathMap = find(pathMaps, function(pathMap) {
                  const sourcePath = pathMap['sourcePath'],
                        found = (sourcePath === draggableEntryPath);
  
                  return found;
                }),
                targetPath = pathMap['targetPath'];

          this.moveDraggableEntry(draggableEntry, sourcePath, targetPath);
        }
      }.bind(this));

      done();
    }.bind(this));
  }

  moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
    const draggableEntryDirectory = draggableEntry.isDirectory();

    if (draggableEntryDirectory) {
      const directory = draggableEntry,  ///
            sourceDirectoryPath = sourcePath, ///
            targetDirectoryPath = targetPath;

      this.moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath);
    } else {
      const file = draggableEntry, ///
            sourceFilePath = sourcePath,  ///
            targetFilePath = targetPath;  ///

      this.moveFile(file, sourceFilePath, targetFilePath);
    }
  }
}

module.exports = DropTarget;

function indexOf(array, element) {
  let index = -1;

  array.some(function(currentElement, currentElementIndex) {
    if (currentElement === element) {
      index = currentElementIndex;

      return true;
    }
  });

  return index;
}

function find(array, callback) {
  let element = null;
  
  array.some(function(currentElement) {
    if (callback(currentElement)) {
      element = currentElement;
      
      return true;
    }
  });
  
  return element;  
}
