'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

var START_DRAGGING_DELAY = 250;

class DraggableElement extends Element {
  constructor(selector, dragEventHandler) {
    super(selector);

    this.dragEventHandler = dragEventHandler;

    this.timeout = null;

    this.offset = null;

    this.onMouseDown(this.mouseDown.bind(this));
    this.onMouseUp(this.mouseUp.bind(this));
    this.onMouseMove(this.mouseMove.bind(this));
    this.onMouseOut(this.mouseOut.bind(this));
  }

  isDragged() {
    var dragged = this.hasClass('dragged');

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
      this.drag(mouseTop, mouseLeft);
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

    var dragEvent = DragEvent.start(this);

    var startDragging = this.dragEventHandler(dragEvent);

    if (startDragging) {
      var bounds = this.getBounds(),
          top = bounds.top, ///
          left = bounds.left; ///

      var css = {
        top: top + 'px',
        left: left + 'px'
      };

      this.css(css);

      var topOffset = top - mouseTop,
          leftOffset = left - mouseLeft;

      top = topOffset;  ///
      left = leftOffset;  ///

      this.offset = {
        top: top,
        left: left
      };

      this.addClass('dragged');
    }
  }

  stopDragging() {
    this.removeClass('dragged');

    var dragEvent = DragEvent.stop(this);

    this.dragEventHandler(dragEvent);
  }

  drag(mouseTop, mouseLeft) {
    var topOffset = this.offset.top,
        leftOffset = this.offset.left,
        top = mouseTop + topOffset,
        left = mouseLeft + leftOffset;

    var css = {
      top: top + 'px',
      left: left + 'px'
    };

    this.css(css);

    var dragEvent = DragEvent.drag(this);

    this.dragEventHandler(dragEvent);
  }
}

module.exports = DraggableElement;
