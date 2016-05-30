'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    Entry = require('./explorer/entry'),
    DragEvent = require('./dragEvent'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

class DroppableElement extends Element {
  constructor(selector) {
    super(selector);

    this.droppableElements = [];
  }

  addDroppableElement(droppableElement) {
    this.droppableElements.push(droppableElement);
  }

  removeDroppableElement(droppableElement) {
    var index = indexOf(droppableElement, this.droppableElements);

    if (index !== null) {
      this.droppableElements.splice(index, 1);
    }
  }

  isOverlappingDraggableElement(draggableElementDraggingBounds) {
    var bounds = this.getBounds(),
        overlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds);

    return overlappingDraggableElement;
  }

  onDragEvent(dragEvent) {
    var action = dragEvent.getAction(),
        draggableElement = dragEvent.getDraggableElement(),
        entry = draggableElement;  ///

    switch (action) {
      case DragEvent.actions.START_DRAGGING:
        return this.startDragging(entry);

      case DragEvent.actions.STOP_DRAGGING:
        this.stopDragging(entry);
        break;

      case DragEvent.actions.DRAGGING:
        this.dragging(entry);
        break;
    }
  }

  startDragging(entry) {
    if (this.hasMarker()) {
      return false;
    }

    this.addMarker(entry);

    return true;
  }

  stopDragging(entry) {
    this.removeMarkerGlobally();
  }

  dragging(entry) {
    if (this.hasMarker()) {
      var notToHaveMarker = !this.isToHaveMarker(entry);

      if (notToHaveMarker) {
        var droppableElementToHaveMarker = this.getDroppableElementToHaveMarker(entry);

        if (droppableElementToHaveMarker !== null) {
          droppableElementToHaveMarker.addMarker(entry);

          this.removeMarker();
        }
      }
    } else {
      var droppableElementHavingMarker = this.getDroppableElementHavingMarker(),
          droppableElementHavingMarkerIsNotToHaveMarker = !droppableElementHavingMarker.isToHaveMarker(entry);

      if (droppableElementHavingMarkerIsNotToHaveMarker) {
        droppableElementHavingMarker.removeMarker();

        this.addMarkerInPlace(entry);
      }
    }
  }

  isToHaveMarker(entry) {
    var bounds = this.getBounds(),
        draggingBounds = entry.getDraggingBounds(),
        overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
        toHaveMarker = overlappingDraggingBounds; ///

    return toHaveMarker;
  }

  getDroppableElementToHaveMarker(entry) {
    var droppableElementToHaveMarker = this.droppableElements.reduce(function(droppableElementToHaveMarker, droppableElement) {
      if (droppableElementToHaveMarker === null) {
        if (droppableElement.isToHaveMarker(entry)) {
          droppableElementToHaveMarker = droppableElement;
        }
      }

      return droppableElementToHaveMarker;
    }, null);

    return droppableElementToHaveMarker;
  }

  getDroppableElementHavingMarker() {
    var droppableElementHavingMarker = this.droppableElements.reduce(function(droppableElementHavingMarker, droppableElement) {
      if (droppableElementHavingMarker === null) {
        if (droppableElement.hasMarker()) {
          droppableElementHavingMarker = droppableElement;
        }
      }

      return droppableElementHavingMarker;
    }, null);

    return droppableElementHavingMarker;
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
    if (this.hasMarker()) {
      this.removeMarker();
    } else {
      var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

      droppableElementHavingMarker.removeMarker();
    }
  }

  hasMarker() {
    var marker = this.retrieveMarker();

    return marker !== null;
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

  moveEntries(entry, subEntries, sourcePath, targetPath, done) {
    this.moveSubEntries(subEntries, sourcePath, targetPath, function() {
      var isSubEntry = false;

      this.moveEntry(entry, sourcePath, targetPath, isSubEntry, done);
    }.bind(this));
  }

  moveSubEntries(subEntries, sourcePath, targetPath, done) {
    subEntries.reverse(); ///

    var isSubEntry = true;

    asyncForEach(
      subEntries,
      function(subEntry, next) {
        this.moveEntry(subEntry, sourcePath, targetPath, isSubEntry, next);
      }.bind(this),
      done
    )
  }

  moveEntry(entry, sourcePath, targetPath, isSubEntry, next) {
    var entryPath = entry.getPath(),
        sourceEntryPath = entryPath,  ///
        targetEntryPath = targetPath === null ?
          null :
            util.replaceTopPath(entryPath, sourcePath, targetPath), ///
        entryIsDirectory = entry.isDirectory();

    entryIsDirectory ?
      this.moveDirectory(entry, sourceEntryPath, targetEntryPath, isSubEntry, next) :
        this.moveFile(entry, sourceEntryPath, targetEntryPath, isSubEntry, next);
  }
}

module.exports = DroppableElement;

function asyncForEach(array, cb, done) {
  var arrayLength = array.length,
      index = -1;

  var next = function() {
    index++;

    if (index === arrayLength) {
      done();
    } else {
      var element = array[index];

      cb(element, next);
    }
  };

  next();
}

function indexOf(element, array) {
  var index = null;

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
