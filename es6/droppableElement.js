'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    Entry = require('./explorer/entry'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

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
    var index = indexOf(this.droppableElements, droppableElement),
        found = (index !== -1);

    if (found) {
      this.droppableElements.splice(index, 1);
    }
  }

  isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
    var bounds = this.getBounds(),
        boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
        overlappingDraggableEntry = boundsOverlappingDraggableEntry;

    return overlappingDraggableEntry;
  }

  getDroppableElementToBeMarked(draggableEntry) {
    var droppableElementToBeMarked = this.droppableElements.reduce(function(droppableElementToBeMarked, droppableElement) {
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
    var markedDroppableElement = this.droppableElements.reduce(function(markedDroppableElement, droppableElement) {
      if (markedDroppableElement === null) {
        var droppableElementMarked = droppableElement.isMarked();
        
        if (droppableElementMarked) {
          markedDroppableElement = droppableElement;
        }
      }

      return markedDroppableElement;
    }, null);

    return markedDroppableElement;
  }

  addMarker(entry) {
    var entryName = entry.getName(),
        entryType = entry.getType(),
        markerName = entryName, ///
        marker;

    switch (entryType) {
      case Entry.types.FILE:
        marker = FileMarker.clone(markerName);
        break;

      case Entry.types.DIRECTORY:
        marker = DirectoryMarker.clone(markerName);
        break;
    }

    this.append(marker);
  }

  removeMarker() {
    var marker = this.retrieveMarker();

    marker.remove();
  }

  removeMarkerGlobally() {
    var marked = this.isMarked();

    if (marked) {
      this.removeMarker();
    } else {
      var markedDroppableElement = this.getMarkedDroppableElement();

      markedDroppableElement.removeMarker();
    }
  }

  isMarked() {
    var marker = this.retrieveMarker(),
        marked = (marker !== null); ///

    return marked;
  }

  retrieveMarker() {
    var childElements = this.childElements(),
        marker = childElements.reduce(function(marker, childElement) {
          if (marker === null) {
            if ((childElement instanceof FileMarker)
             || (childElement instanceof DirectoryMarker)) {
              marker = childElement;  ///
            }
          }

          return marker;
        }, null);

    return marker;
  }

  moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
    var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

    this.moveHandler(pathMaps, function() {
      draggableEntries.forEach(function(draggableEntry) {
        var draggableEntryPath = draggableEntry.getPath(),
            sourcePath = draggableEntryPath,  ///
            pathMap = find(pathMaps, function(pathMap) {
              var sourceDraggableEntryPath = sourcePath,
                  movedPath = pathMap[sourceDraggableEntryPath],
                  found = (movedPath !== undefined);

              return found;
            }),
            movedPath = pathMap[sourcePath];

        this.moveDraggableEntry(draggableEntry, sourcePath, movedPath);
      }.bind(this));

      done();
    }.bind(this));
  }

  moveDraggableEntry(draggableEntry, sourcePath, movedPath) {
    var draggableEntryDirectory = draggableEntry.isDirectory();

    if (draggableEntryDirectory) {
      var directory = draggableEntry;  ///

      this.moveDirectory(directory, sourcePath, movedPath);
    } else {
      var file = draggableEntry; ///

      this.moveFile(file, sourcePath, movedPath);
    }
  }
}

module.exports = DroppableElement;

function indexOf(array, element) {
  var index = -1;

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
  var element = null;
  
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
