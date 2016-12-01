'use strict';

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

const ESCAPE_KEYCODE = 27,
      START_DRAGGING_DELAY = 175,
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
  
  getCollapsedBounds() {
    var bounds = this.getBounds(),
        collapsedBounds = bounds;  ///

    return collapsedBounds;
  }

  isOverlappingCollapsedBounds(collapsedBounds) {
    var bounds = this.getBounds(),
        overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

    return overlappingCollapsedBounds;
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

    this.on('keydown', this.keyDownHandler.bind(this));
  }

  stopDragging() {
    this.off('keydown', this.keyDownHandler.bind(this));

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
    var dragging = this.hasClass('dragging');
    
    return dragging;
  }

  isWaitingToDrag() {
    var waitingToDrag = (this.timeout !== null);

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

      this.dragEventHandler(stopDraggingEvent, function() {
        this.stopDragging();
      }.bind(this));
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

  keyDownHandler(event) {
    var keyCode = event.keyCode || event.which;

    if (keyCode === ESCAPE_KEYCODE) {
      var dragging = this.isDragging();

      if (dragging) {
        var escapeDraggingEvent = DragEvent.escapeDragging(this);

        this.dragEventHandler(escapeDraggingEvent);

        this.stopDragging();
      }
    }
  }
}

module.exports = DraggableElement;
