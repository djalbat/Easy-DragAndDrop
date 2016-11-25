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

  static startDragging(draggableElement) {
    var startDraggingEvent = new DragEvent(draggableElement, DragEvent.actions.START_DRAGGING);
    
    return startDraggingEvent;
  }

  static stopDragging(draggableElement) {
    var stopDraggingEvent = new DragEvent(draggableElement, DragEvent.actions.STOP_DRAGGING);
    
    return stopDraggingEvent;
  }

  static dragging(draggableElement) {
    var draggingEvent = new DragEvent(draggableElement, DragEvent.actions.DRAGGING);
    
    return draggingEvent;
  }
}

DragEvent.actions = {
  START_DRAGGING: 'START_DRAGGING',
  STOP_DRAGGING: 'STOP_DRAGGING',
  DRAGGING: 'DRAGGING'
};

module.exports = DragEvent;
