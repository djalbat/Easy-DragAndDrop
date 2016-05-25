'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

var START_DRAGGING_DELAY = 175;

class DraggableElement extends Element {
  constructor(selector, dragEventHandler) {
    super(selector);

    this.dragEventHandler = dragEventHandler;

    this.timeout = null;

    this.topOffset = null;
    this.leftOffset = null;

    this.onMouseDown(this.mouseDown.bind(this));
    this.onMouseUp(this.mouseUp.bind(this));
  }

  isDragged() {
    var dragged = this.hasClass('dragged') && !this.hasClass('stopDragging');

    return dragged;
  }

  isWaitingToDrag() {
    var waitingToDrag = this.timeout !== null;

    return waitingToDrag;
  }

  mouseUp(mouseTop, mouseLeft, mouseButton) {
    var dragged = this.isDragged();

    if (dragged) {
      this.stopDragging();
    } else {
      this.stopWaitingToDrag();
    }
  }

  mouseDown(mouseTop, mouseLeft, mouseButton) {
    if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
      var dragged = this.isDragged();

      if (!dragged) {
        this.startWaitingToDrag(mouseTop, mouseLeft);
      }
    }
  }

  mouseMove(mouseTop, mouseLeft, mouseButton) {
    var dragged = this.isDragged();

    if (dragged) {
      this.dragging(mouseTop, mouseLeft);
    }
  }

  mouseOut(mouseTop, mouseLeft, mouseButton) {
    var dragged = this.isDragged(),
        waitingToDrag = this.isWaitingToDrag();

    if (dragged) {
      this.stopDragging();
    } else {
      if (waitingToDrag) {
        this.stopWaitingToDrag();
      }
    }
  }

  startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
    if (this.timeout === null) {
      this.timeout = setTimeout(function() {
        this.startDragging(mouseTop, mouseLeft);
      }.bind(this), START_DRAGGING_DELAY);
    }
  }

  stopWaitingToDrag() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);

      this.timeout = null;
    }
  }

  startDragging(mouseTop, mouseLeft) {
    this.timeout = null;

    var dragEvent = DragEvent.start(this),
        startDragging = this.dragEventHandler(dragEvent);

    if (startDragging) {
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

      this.addClass('dragged');
    }
  }

  stopDragging() {
    this.addClass('stopDragging');

    var dragEvent = DragEvent.stop(this);

    this.dragEventHandler(dragEvent, function() {
      this.removeClass('stopDragging');
      this.removeClass('dragged');
    }.bind(this));
  }

  dragging(mouseTop, mouseLeft) {
    var top = mouseTop + this.topOffset,
        left = mouseLeft + this.leftOffset,
        css = {
          top: top,
          left: left
        };

    this.css(css);

    var dragEvent = DragEvent.dragging(this);

    this.dragEventHandler(dragEvent);
  }
}

module.exports = DraggableElement;
