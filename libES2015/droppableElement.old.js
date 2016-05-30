'use strict';

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var util = require('./util'),
    DragEvent = require('./dragEvent'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

class DroppableElement extends Element {
  constructor(selector) {
    super(selector);
    
    this.droppableElements = [];

    this.draggedEntry = null;
    
    var body = new Body();

    body.onMouseUp(this.mouseUp.bind(this));
    body.onMouseMove(this.mouseMove.bind(this));
    body.onMouseOut(this.mouseOut.bind(this));
  }

  mouseUp(mouseTop, mouseLeft, mouseButton) {
    if (this.draggedEntry !== null) {
      this.draggedEntry.mouseUp(mouseTop, mouseLeft, mouseButton);
    }
  }

  mouseMove(mouseTop, mouseLeft, mouseButton) {
    if (this.draggedEntry !== null) {
      this.draggedEntry.mouseMove(mouseTop, mouseLeft, mouseButton);
    }
  }

  mouseOut(mouseTop, mouseLeft, mouseButton) {
    if (this.draggedEntry !== null) {
      this.draggedEntry.mouseOut(mouseTop, mouseLeft, mouseButton);
    }
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


  showMarker() {
    var marker = this.retrieveMarker();

    marker.show();
  }

  hideMarker() {
    var marker = this.retrieveMarker();

    marker.hide();
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

    this.draggedEntry = entry;

    return true;
  }

  stopDragging(entry) {
    this.draggedEntry = null;

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
