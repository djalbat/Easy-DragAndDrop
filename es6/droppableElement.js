'use strict';

const easyui = require('easyui'),
      Element = easyui.Element;

const util = require('./util'),
      options = require('./options');

class DroppableElement extends Element {
  constructor(selector, moveHandler) {
    super(selector);
    
    this.moveHandler = moveHandler;

    this.droppableElements = [];
  }

  addDroppableElement(droppableElement) {
    this.droppableElements.push(droppableElement);
  }

  removeDroppableElement(droppableElement) {
    const index = indexOf(this.droppableElements, droppableElement),
          found = (index !== -1);

    if (found) {
      this.droppableElements.splice(index, 1);
    }
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    const bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDroppableElementToBeMarked(draggableEntry) {
    const droppableElementToBeMarked = this.droppableElements.reduce(function(droppableElementToBeMarked, droppableElement) {
      if (droppableElementToBeMarked === null) {
        if (droppableElement.isToBeMarked(draggableEntry)) { ///
          droppableElementToBeMarked = droppableElement;
        }
      }

      return droppableElementToBeMarked;
    }, null);

    return droppableElementToBeMarked;
  }

  getMarkedDroppableElement() {
    const markedDroppableElement = this.droppableElements.reduce(function(markedDroppableElement, droppableElement) {
      if (markedDroppableElement === null) {
        const droppableElementMarked = droppableElement.isMarked();
        
        if (droppableElementMarked) {
          markedDroppableElement = droppableElement;
        }
      }

      return markedDroppableElement;
    }, null);

    return markedDroppableElement;
  }

  removeMarkerGlobally() {
    const marked = this.isMarked();

    if (marked) {
      this.removeMarker();
    } else {
      const markedDroppableElement = this.getMarkedDroppableElement();

      markedDroppableElement.removeMarker();
    }
  }

  moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
    const pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

    this.moveHandler(pathMaps, function() {
      const lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
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
          const sourcePath = draggableEntryPath,  ///
              pathMap = find(pathMaps, function(pathMap) {
                const sourceDraggableEntryPath = sourcePath,
                      movedPath = pathMap[sourceDraggableEntryPath],
                      found = (movedPath !== undefined);

                return found;
              }),
              movedPath = pathMap[sourcePath];

          this.moveDraggableEntry(draggableEntry, sourcePath, movedPath);
        }
      }.bind(this));

      done();
    }.bind(this));
  }

  moveDraggableEntry(draggableEntry, sourcePath, movedPath) {
    const draggableEntryDirectory = draggableEntry.isDirectory();

    if (draggableEntryDirectory) {
      const directory = draggableEntry,  ///
            sourceDirectoryPath = sourcePath, ///
            movedDirectoryPath = movedPath;

      this.moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath);
    } else {
      const file = draggableEntry, ///
            sourceFilePath = sourcePath,  ///
            movedFilePath = movedPath;  ///

      this.moveFile(file, sourceFilePath, movedFilePath);
    }
  }
}

module.exports = DroppableElement;

function indexOf(array, element) {
  let index = -1;

  array.some(function(currentElement, currentElementIndex) {
    if (currentElement === element) {
      index = currentElementIndex;

      return true;
    } else {
      return false;
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
    } else {
      return false;
    }
  });
  
  return element;  
}

function first(array) { return array[0]; }
function last(array) { return array[array.length - 1]; }
