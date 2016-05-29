'use strict';

class DragEvent {
  constructor(draggableElement, action) {
    this.draggableElement = draggableElement;
    this.action = action;
  }

  getDraggableElement() {
    return this.draggableElement;
  }

  getAction() {
    return this.action;
  }
}

DragEvent.startDragging = function(draggableElement) { return new DragEvent(draggableElement, DragEvent.actions.START_DRAGGING); };
DragEvent.stopDragging = function(draggableElement) { return new DragEvent(draggableElement, DragEvent.actions.STOP_DRAGGING); };
DragEvent.dragging = function(draggableElement) { return new DragEvent(draggableElement, DragEvent.actions.DRAGGING); };

DragEvent.actions = {
  START_DRAGGING: 'START_DRAGGING',
  STOP_DRAGGING: 'STOP_DRAGGING',
  DRAGGING: 'DRAGGING'
};

module.exports = DragEvent;
