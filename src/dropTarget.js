"use strict";

import { Element } from "easy";
import { arrayUtilities } from "necessary";

import { REMOVE_EMPTY_PARENT_DIRECTORIES } from "./options";
import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE } from "./types";

const { first, last } = arrayUtilities;

export default class DropTarget extends Element {
  constructor(selector, moveHandler) {
    super(selector);

    this.moveHandler = moveHandler;
  }

  isOverlappingDragEntry(dragEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDragEntry = bounds.areOverlapping(dragEntryCollapsedBounds),
          overlappingDragEntry = boundsOverlappingDragEntry;

    return overlappingDragEntry;
  }

  getDropTargetToBeMarked(dragEntry) {
    let dropTargetToBeMarked = null;

    const state = this.getState(),
          { dropTargets } = state,
          toBeMarked = this.isToBeMarked(dragEntry);

    if (toBeMarked) {
      dropTargetToBeMarked = this;  ///
    } else {
      dropTargets.some((dropTarget) => {
        const toBeMarked = dropTarget.isToBeMarked(dragEntry);

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

    const state = this.getState(),
          { dropTargets } = state,
          marked = this.isMarked();

    if (marked) {
      markedDropTarget = this;  ///
    } else {
      dropTargets.some((dropTarget) => {
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

  moveDragEntries(dragEntries, sourcePath, targetPath, done) {
    const pathMaps = this.pathMapsFromDragEntries(dragEntries, sourcePath, targetPath);

    this.moveHandler(pathMaps, () => {
      const lastDragEntry = last(dragEntries),
            firstDragEntry = first(dragEntries),
            firstDragEntryExplorer = firstDragEntry.getExplorer(),
            dragEntriesExplorer = firstDragEntryExplorer, ///
            removeEmptyParentDirectoriesOptionPresent = dragEntriesExplorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES); ///

      if (removeEmptyParentDirectoriesOptionPresent) {
        dragEntriesExplorer.unsetOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
      }

      dragEntries.forEach((dragEntry) => {
        if (dragEntry === lastDragEntry) {
          if (removeEmptyParentDirectoriesOptionPresent) {
            dragEntriesExplorer.setOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
          }
        }

        const dragEntryPath = dragEntry.getPath();

        if (dragEntryPath !== null) {
          const pathMap = pathMaps.find((pathMap) => {
                  const { sourcePath } = pathMap;

                  if (sourcePath === dragEntryPath) {
                    return true;
                  }
                }),
                { sourcePath, targetPath, callback } = pathMap;

          dragEntry = this.moveDragEntry(dragEntry, sourcePath, targetPath);
          
          if (callback) {
            callback(dragEntry);
          }
        }
      });

      done();
    });
  }

  moveDragEntry(dragEntry, sourcePath, targetPath) {
    const type = dragEntry.getType();

    switch (type) {
      case FILE_NAME_TYPE :
        const fileNameDragEntry = dragEntry, ///
              sourceFilePath = sourcePath,  ///
              targetFilePath = targetPath;

        dragEntry = this.moveFileNameDragEntry(fileNameDragEntry, sourceFilePath, targetFilePath); ///

        break;

      case DIRECTORY_NAME_TYPE :
        const directoryDragEntry = dragEntry,  ///
              sourceDirectoryPath = sourcePath, ///
              targetDirectoryPath = targetPath; ///

        dragEntry = this.moveDirectoryNameDragEntry(directoryDragEntry, sourceDirectoryPath, targetDirectoryPath); ///

        break;
    }

    return dragEntry;
  }
  
  addDropTarget(dropTarget, reciprocated = false) {
    const state = this.getState(),
          { dropTargets } = state;

    dropTargets.push(dropTarget);

    if (reciprocated) {
      dropTarget.addDropTarget(this); ///
    }
  }

  removeDropTarget(dropTarget, reciprocated = false) {
    const state = this.getState(),
          { dropTargets } = state,
          index = dropTargets.indexOf(dropTarget);

    if (index !== -1) {
      const start = index,  ///
            deleteCount = 1;
      
      dropTargets.splice(start, deleteCount);
    }

    if (reciprocated) {
      dropTarget.removeDropTarget(this); ///
    }
  }

  initialise() {
    const dropTargets = [];

    this.setState({
      dropTargets
    });
  }

  static fromClass(Class, properties, moveHandler, ...remainingArguments) {
    const dropTarget = Element.fromClass(Class, properties, moveHandler, ...remainingArguments);

    return dropTarget;
  }
}
