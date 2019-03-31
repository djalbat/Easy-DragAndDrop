'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const options = require('./options'),
      entryTypes = require('./entryTypes');

const { Element } = easy,
      { arrayUtilities } = necessary,
      { first, last } = arrayUtilities,
      { DIRECTORY_NAME_TYPE } = entryTypes,
      { REMOVE_EMPTY_PARENT_DIRECTORIES } = options;

class DropTarget extends Element {
  constructor(selector, moveHandler = function(pathMaps, done) { done(); }) {
    super(selector);
    
    this.moveHandler = moveHandler;
    
    this.setInitialState();
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDropTargetToBeMarked(draggableEntry) {
    const dropTargets = this.getDropTargets(),
          dropTargetToBeMarked = dropTargets.reduce(function(dropTargetToBeMarked, dropTarget) {
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
    let markedDropTarget = null;

    const marked = this.isMarked();

    if (marked) {
      markedDropTarget = this;  ///
    } else {
      const dropTargets = this.getDropTargets();

      dropTargets.some(function(dropTarget) {
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
          const pathMap = pathMaps.find(function(pathMap) {
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

        return draggableEntries;
      }, []);

      done();
    });
  }

  moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
    const draggableEntryType = draggableEntry.getType(),
          draggableEntryDirectoryNameDraggableEntry = (draggableEntryType === DIRECTORY_NAME_TYPE);

    if (draggableEntryDirectoryNameDraggableEntry) {
      const directoryDraggableEntry = draggableEntry,  ///
            sourceDirectoryPath = sourcePath, ///
            targetDirectoryPath = targetPath; ///

      draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath);
    } else {
      const fileNameDraggableEntry = draggableEntry, ///
            sourceFilePath = sourcePath,  ///
            targetFilePath = targetPath;

      draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath);
    }

    return draggableEntry;
  }
  
  addDropTarget(dropTarget) {
    const dropTargets = this.getDropTargets();
    
    dropTargets.push(dropTarget);
  }

  removeDropTarget(dropTarget) {
    const dropTargets = this.getDropTargets(),
          index = dropTargets.indexOf(dropTarget);

    if (index !== -1) {
      const start = index,  ///
            deleteCount = 1;
      
      dropTargets.splice(start, deleteCount);
    }
  }

  getDropTargets() {
    const state = this.getState(),
          { dropTargets } = state;

    return dropTargets;
  }
  
  setInitialState() {
    const dropTargets = [];
    
    this.setState({
      dropTargets
    });
  }  
}

module.exports = DropTarget;
