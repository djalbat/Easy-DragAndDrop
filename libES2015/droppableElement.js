'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var options = require('./options'),
    util = require('./util'),
    DragEvent = require('./dragEvent'),
    Entry = require('./explorer/entry'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

class DroppableElement extends Element {
  constructor(selector, options) {
    super(selector);
    
    this.options = options || {};

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

  hasMarker() {
    var marker = this.retrieveMarker();

    return marker !== null;
  }

  showMarker() {
    var marker = this.retrieveMarker();

    marker.show();
  }

  hideMarker() {
    var marker = this.retrieveMarker();

    marker.hide();
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

  onDragEvent(dragEvent, done) {
    var entry = dragEvent.getEntry(),
        dragEventType = dragEvent.getType();

    switch (dragEventType) {
      case DragEvent.types.START:
        return this.startDragging(entry);
        break;

      case DragEvent.types.STOP:
        this.stopDragging(entry, done);
        break;

      case DragEvent.types.DRAGGING:
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

  removeMarkerGlobally() {
    if (this.hasMarker()) {
      this.removeMarker();
    } else {
      var droppableElementHavingMarker = this.droppableElementHavingMarker();

      droppableElementHavingMarker.removeMarker();
    }
  }

  dragging(entry) {
    if (this.hasMarker()) {
      if (!this.isKeepingMarker(entry)) {
        var droppableElementToAddMarker = this.droppableElementToAddMarker(entry);

        if (droppableElementToAddMarker !== null) {
          droppableElementToAddMarker.addMarker(entry);

          this.removeMarker();
        }
      }
    } else {
      var droppableElementHavingMarker = this.droppableElementHavingMarker(),
          droppableElementThatHasMarkerIsLosingMarker = droppableElementHavingMarker.isLosingMarker(entry);

      if (droppableElementThatHasMarkerIsLosingMarker) {
        droppableElementHavingMarker.removeMarker();

        this.addMarker(entry);
      }
    }
  }

  moveEntries(entry, subEntries, sourcePath, targetPath, done) {
    this.moveSubEntries(subEntries, sourcePath, targetPath, function() {
      var handle = true;

      this.moveEntry(entry, sourcePath, targetPath, handle, done);
    }.bind(this));
  }

  moveSubEntries(subEntries, sourcePath, targetPath, done) {
    subEntries.reverse();

    var HANDLE_SUB_ENTRIES = options.HANDLE_SUB_ENTRIES,
        handle = this.options[HANDLE_SUB_ENTRIES] !== false;

    asyncForEach(
      subEntries,
      function(entry, next) {
        this.moveEntry(entry, sourcePath, targetPath, handle, next);
      }.bind(this),
      done
    )
  }
  
  moveEntry(entry, sourcePath, targetPath, handle, next) {
    var entryPath = entry.getPath(),
        sourceEntryPath = entryPath,  ///
        targetEntryPath = targetPath === null ?
                            null :
                              util.replaceTopmostPath(entryPath, sourcePath, targetPath), ///
        entryIsDirectory = entry.isDirectory();

    entryIsDirectory ?
      this.moveDirectory(entry, sourceEntryPath, targetEntryPath, handle, next) :
        this.moveFile(entry, sourceEntryPath, targetEntryPath, handle, next);
  }

  isOverlappingEntry(entry) {
    var bounds = this.getBounds(),
        entryBounds = entry.getBounds(),
        overlappingEntry = bounds.areOverlapping(entryBounds);

    return overlappingEntry;
  }

  isKeepingMarker(entry) {
    var overlappingEntry = this.isOverlappingEntry(entry),
        keepingMarker = overlappingEntry;

    return keepingMarker;
  }

  isLosingMarker(entry) {
    var overlappingEntry = this.isOverlappingEntry(entry),
        losingMarker = !overlappingEntry;

    return losingMarker;
  }

  toAddMarker(entry) {
    var overlappingEntry = this.isOverlappingEntry(entry),
        addMarker = overlappingEntry;

    return addMarker;
  }

  droppableElementToAddMarker(entry) {
    var droppableElementToAddMarker = this.droppableElements.reduce(function(droppableElementToAddMarker, droppableElement) {
      if (droppableElementToAddMarker === null) {
        if (droppableElement.toAddMarker(entry)) {
          droppableElementToAddMarker = droppableElement;
        }
      }

      return droppableElementToAddMarker;
    }, null);

    return droppableElementToAddMarker;
  }

  droppableElementHavingMarker() {
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
}

module.exports = DroppableElement;

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

function asyncForEach(array, cb, done) {
  var arrayLength = array.length,
      index = -1;

  var next = function() {
    index++;

    if (index === arrayLength) {
      if (done) {
        done();
      }
    } else {
      var element = array[index];

      cb(element, next);
    }
  };

  next();
}
