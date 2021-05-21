"use strict";

import { window, constants } from "easy";

const { LEFT_MOUSE_BUTTON } = constants;

import { mouseTopFromEvent, mouseLeftFromEvent } from "../utilities/event";

function enableDragging() {
  const timeout = null,
        topOffset = null,
        leftOffset = null,
        startMouseTop = null,
        startMouseLeft = null;

  this.setState({
    timeout,
    topOffset,
    leftOffset,
    startMouseTop,
    startMouseLeft
  });

  this.onMouseDown(mouseDownHandler, this);
}

function disableDragging() {
  this.offMouseDown(mouseDownHandler, this);
}

function isDragging() {
  const dragging = this.hasClass("dragging");

  return dragging;
}

function getTimeout() {
  const state = this.getState(),
      { timeout } = state;

  return timeout;
}

function resetTimeout() {
  const timeout = null;

  this.updateTimeout(timeout);
}

function updateTimeout(timeout) {
  this.updateState({
    timeout
  });
}

function getTopOffset() {
  const state = this.getState(),
        { topOffset } = state;

  return topOffset;
}

function getLeftOffset() {
  const state = this.getState(),
        { leftOffset } = state;

  return leftOffset;
}

function setTopOffset(topOffset) {
  this.updateState({
    topOffset
  });
}

function setLeftOffset(leftOffset) {
  this.updateState({
    leftOffset
  });
}

export default {
  enableDragging,
  disableDragging,
  isDragging,
  getTimeout,
  resetTimeout,
  updateTimeout,
  getTopOffset,
  getLeftOffset,
  setTopOffset,
  setLeftOffset
};

function mouseUpHandler(event, element) {
  window.off("blur", mouseUpHandler, this);  ///

  window.offMouseUp(mouseUpHandler, this);

  window.offMouseMove(mouseMoveHandler, this);

  const dragging = this.isDragging();

  if (dragging) {
    const explorer = this.getExplorer(),
          draggableEntry = this;  ///

    explorer.stopDragging(draggableEntry, () => {
      this.stopDragging();
    });
  } else {
    this.stopWaitingToDrag();
  }
}

function mouseDownHandler(event, element) {
  const { button } = event;

  window.on("blur", mouseUpHandler, this); ///

  window.onMouseUp(mouseUpHandler, this);

  window.onMouseMove(mouseMoveHandler, this);

  if (button === LEFT_MOUSE_BUTTON) {
    const dragging = this.isDragging();

    if (!dragging) {
      const mouseTop = mouseTopFromEvent(event),
            mouseLeft = mouseLeftFromEvent(event);

      this.startWaitingToDrag(mouseTop, mouseLeft);
    }
  }
}

function mouseMoveHandler(event, element) {
  const { pageX, pageY } = event,
        mouseTop = pageY,
        mouseLeft = pageX;

  const dragging = this.isDragging();

  if (dragging) {
    this.dragging(mouseTop, mouseLeft);
  }
}

let counter = 0;