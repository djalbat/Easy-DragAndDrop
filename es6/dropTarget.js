'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const types = require('./types'),
      options = require('./options');

const { Element } = easy,
      { arrayUtilities } = necessary,
      { first, last } = arrayUtilities,
      { REMOVE_EMPTY_PARENT_DIRECTORIES } = options,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE } = types;

class DropTarget extends Element {
  constructor(selector, dropTargets, moveHandler) {
    super(selector);

    this.dropTargets = dropTargets;

    this.moveHandler = moveHandler;
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDropTargetToBeMarked(draggableEntry) {
    let dropTargetToBeMarked = null;

    const toBeMarked = this.isToBeMarked(draggableEntry);

    if (toBeMarked) {
      dropTargetToBeMarked = this;  ///
    } else {
      this.dropTargets.some((dropTarget) => {
        const toBeMarked = dropTarget.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          dropTargetToBeMarked = dropTarget;  ///

          return true;
        }
      });
    }

    return dropTargetToBeMarked;
  }

  getMarkedDropTarget() {
    let markedDropTarget = null;

    const marked = this.isMarked();

    if (marked) {
      markedDropTarget = this;  ///
    } else {
      this.dropTargets.some((dropTarget) => {
        const dropTargetMarked = dropTarget.isMarked();

        if (dropTargetMarked) {
          markedDropTarget = dropTarget;

          return true;
        }
      });
    }

    return markedDropTarget;
  }

  unmarkGlobally() {
    const markedDropTarget = this.getMarkedDropTarget();

    markedDropTarget.unmark();
  }

  moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
    const pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

    this.moveHandler(pathMaps, () => {
      const lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer, ///
            removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES); ///

      if (removeEmptyParentDirectoriesOptionPresent) {
        draggableEntriesExplorer.unsetOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
      }

      draggableEntries.forEach((draggableEntry) => {
        if (draggableEntry === lastDraggableEntry) {
          if (removeEmptyParentDirectoriesOptionPresent) {
            draggableEntriesExplorer.setOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
          }
        }

        const draggableEntryPath = draggableEntry.getPath();

        if (draggableEntryPath !== null) {
          const pathMap = pathMaps.find((pathMap) => {
                  const { sourcePath } = pathMap;

                  if (sourcePath === draggableEntryPath) {
                    return true;
                  }
                }),
                { sourcePath, targetPath, callback } = pathMap;

          draggableEntry = this.moveDraggableEntry(draggableEntry, sourcePath, targetPath);
          
          if (callback) {
            callback(draggableEntry);
          }
        }
      });

      done();
    });
  }

  moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
    const type = draggableEntry.getType();

    switch (type) {
      case FILE_NAME_TYPE :
        const fileNameDraggableEntry = draggableEntry, ///
              sourceFilePath = sourcePath,  ///
              targetFilePath = targetPath;

        draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath); ///

        break;

      case DIRECTORY_NAME_TYPE :
        const directoryDraggableEntry = draggableEntry,  ///
              sourceDirectoryPath = sourcePath, ///
              targetDirectoryPath = targetPath; ///

        draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath); ///

        break;
    }

    return draggableEntry;
  }
  
  addDropTarget(dropTarget, reciprocated = false) {
    this.dropTargets.push(dropTarget);

    if (reciprocated) {
      dropTarget.addDropTarget(this); ///
    }
  }

  removeDropTarget(dropTarget, reciprocated = false) {
    const index = this.dropTargets.indexOf(dropTarget);

    if (index !== -1) {
      const start = index,  ///
            deleteCount = 1;
      
      this.dropTargets.splice(start, deleteCount);
    }

    if (reciprocated) {
      dropTarget.removeDropTarget(this); ///
    }
  }

  static fromProperties(Class, properties, moveHandler, ...remainingArguments) {
    const dropTargets = [],
          dropTarget = Element.fromProperties(Class, properties, dropTargets, moveHandler, ...remainingArguments);

    return dropTarget;
  }
}

module.exports = DropTarget;
