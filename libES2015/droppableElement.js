'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DragEvent = require('./dragEvent'),
    Entry = require('./explorer/entry'),
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

  onDragEvent(dragEvent) {
    var entry = dragEvent.getEntry(),
        dragEventType = dragEvent.getType();

    switch (dragEventType) {
      case DragEvent.types.START:
        return this.startDragging(entry);
        break;

      case DragEvent.types.STOP:
        this.stopDragging(entry);
        break;

      case DragEvent.types.DRAG:
        this.drag(entry);
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
    if (this.hasMarker()) {
      this.removeMarker();
    } else {
      var droppableElementHavingMarker = this.droppableElementHavingMarker();

      droppableElementHavingMarker.removeMarker();
    }
  }

  drag(entry) {
    if (this.hasMarker()) {
      if (!this.isKeepingMarker(entry)) {
        var droppableElementToAddMarker = this.droppableElementToAddMarker(entry);

        if (droppableElementToAddMarker !== null) {
          this.removeMarker();

          droppableElementToAddMarker.addMarker(entry);
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

  dragEntries(entries, sourcePath, targetPath) {
    entries.reverse();  ///

    entries.forEach(function(entry) {
      var entryPath = entry.getPath(),
          sourceEntryPath = entryPath,  ///
          targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath), ///
          entryIsDirectory = entry.isDirectory();

      entryIsDirectory ?
        this.dragDirectory(entry, sourceEntryPath, targetEntryPath) :
          this.dragFile(entry, sourceEntryPath, targetEntryPath);
    }.bind(this));
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
