'use strict';

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

const START_DRAGGING_DELAY = 175,
      NAMESPACE = 'EasyUI-DragAndDrop/dragging';

var body = new Body();

class DraggableElement extends Element {
  constructor(selector, dragEventHandler) {
    super(selector);

    this.dragEventHandler = dragEventHandler;

    this.timeout = null;
    this.topOffset = null;
    this.leftOffset = null;

    this.onMouseDown(this.mouseDownHandler.bind(this));
  }
  
  getDraggingBounds() {
    var bounds = this.getBounds(),
        draggingBounds = bounds;  ///

    return draggingBounds;
  }

  isOverlappingDraggingBounds(draggingBounds) {
    var bounds = this.getBounds(),
        overlappingDraggingBounds = bounds.areOverlapping(draggingBounds);

    return overlappingDraggingBounds;
  }

  startDragging(mouseTop, mouseLeft) {
    var bounds = this.getBounds(),
        top = bounds.getTop(),
        left = bounds.getLeft(),
        css = {
          top: top,
          left: left
        };

    this.css(css);

    this.topOffset = top - mouseTop;
    this.leftOffset = left - mouseLeft;

    this.addClass('dragging');
  }

  stopDragging() {
    this.removeClass('dragging');
  }

  dragging(mouseTop, mouseLeft) {
    var top = mouseTop + this.topOffset,
        left = mouseLeft + this.leftOffset,
        css = {
          top: top,
          left: left
        };

    this.css(css);

    var draggingEvent = DragEvent.dragging(this);

    this.dragEventHandler(draggingEvent);
  }

  startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
    if (this.timeout === null) {
      this.timeout = setTimeout(function() {
        this.timeout = null;
        var startDraggingEvent = DragEvent.startDragging(this),
            startDragging = this.dragEventHandler(startDraggingEvent);

        if (startDragging) {
          this.startDragging(mouseTop, mouseLeft);
        }
      }.bind(this), START_DRAGGING_DELAY);
    }
  }

  stopWaitingToDrag() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);

      this.timeout = null;
    }
  }

  isDragging() {
    return this.hasClass('dragging');
  }

  isWaitingToDrag() {
    var waitingToDrag = this.timeout !== null;

    return waitingToDrag;
  }

  mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
    body.onMouseUp(this.mouseUpHandler.bind(this), NAMESPACE);
    body.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE);

    if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
      var dragging = this.isDragging();

      if (!dragging) {
        this.startWaitingToDrag(mouseTop, mouseLeft);
      }
    }
  }

  mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
    body.offMouseMove(NAMESPACE);
    body.offMouseUp(NAMESPACE);

    var dragging = this.isDragging();

    if (dragging) {
      var stopDraggingEvent = DragEvent.stopDragging(this);

      this.dragEventHandler(stopDraggingEvent);
      
      this.stopDragging();
    } else {
      this.stopWaitingToDrag();
    }
  }

  mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
    var dragging = this.isDragging();

    if (dragging) {
      this.dragging(mouseTop, mouseLeft);
    }
  }
}

module.exports = DraggableElement;
