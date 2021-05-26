"use strict";

import { window, constants } from "easy";

import { mouseTopFromEvent, mouseLeftFromEvent } from "../utilities/event";
import { BLUR, DRAGGING, STOP_DRAGGING, START_DRAGGING, START_DRAGGING_DELAY } from "../constants";

const { LEFT_MOUSE_BUTTON } = constants;

function onDragging(draggingHandler, element) {
  const eventType = DRAGGING,
        handler = draggingHandler;  ///

  this.addEventListener(eventType, handler, element);
}

function offDragging(draggingHandler, element) {
  const eventType = DRAGGING,
        handler = draggingHandler;  ///

  this.removeEventListener(eventType, handler, element);
}

function onStopDragging(stopDragHandler, element) {
  const eventType = STOP_DRAGGING,
        handler = stopDragHandler;  ///

  this.addEventListener(eventType, handler, element);
}

function offStopDragging(stopDragHandler, element) {
  const eventType = STOP_DRAGGING,
        handler = stopDragHandler;  ///

  this.removeEventListener(eventType, handler, element);
}

function onStartDragging(startDragHandler, element) {
  const eventType = START_DRAGGING,
        handler = startDragHandler;  ///

  this.addEventListener(eventType, handler, element);
}

function offStartDragging(startDragHandler, element) {
  const eventType = START_DRAGGING,
        handler = startDragHandler;  ///

  this.removeEventListener(eventType, handler, element);
}

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

function startWaitingToDrag(mouseTop, mouseLeft) {
  let timeout = this.getTimeout();

  if (timeout === null) {
    timeout = setTimeout(() => {
      this.resetTimeout();

      const mouseOver = this.isMouseOver(mouseTop, mouseLeft);

      if (mouseOver) {
        this.startDragging(mouseTop, mouseLeft);
      }
    }, START_DRAGGING_DELAY);

    this.updateTimeout(timeout);
  }
}

function stopWaitingToDrag() {
  const timeout = this.getTimeout();

  if (timeout !== null) {
    clearTimeout(timeout);

    this.resetTimeout();
  }
}

function startDragging(mouseTop, mouseLeft) {
  const bounds = this.getBounds(),
        eventType = START_DRAGGING,
        boundsTop = bounds.getTop(),
        boundsLeft = bounds.getLeft(),
        topOffset = mouseTop - boundsTop,
        leftOffset = mouseLeft - boundsLeft,
        startMouseTop = mouseTop, ///
        startMouseLeft = mouseLeft, ///
        relativeMouseTop = mouseTop - startMouseTop,
        relativeMouseLeft = mouseLeft - startMouseLeft;

  this.addClass("dragging");

  this.setTopOffset(topOffset);

  this.setLeftOffset(leftOffset);

  this.setStartMouseTop(startMouseTop);

  this.setStartMouseLeft(startMouseLeft);

  this.callHandlers(eventType, relativeMouseTop, relativeMouseLeft);

  this.dragging(mouseTop, mouseLeft);
}

function stopDragging(mouseTop, mouseLeft) {
  const eventType = STOP_DRAGGING,
        startMouseTop = this.getStartMouseTop(),
        startMouseLeft = this.getStartMouseLeft(),
        relativeMouseTop = mouseTop - startMouseTop,
        relativeMouseLeft = mouseLeft - startMouseLeft;

  this.callHandlers(eventType, relativeMouseTop, relativeMouseLeft);

  this.removeClass("dragging");
}

function dragging(mouseTop, mouseLeft) {
  const eventType = DRAGGING,
        scrollTop = window.getScrollTop(),
        scrollLeft = window.getScrollLeft(),
        topOffset = this.getTopOffset(),
        leftOffset = this.getLeftOffset(),
        startMouseTop = this.getStartMouseTop(),
        startMouseLeft = this.getStartMouseLeft(),
        relativeMouseTop = mouseTop - startMouseTop,
        relativeMouseLeft = mouseLeft - startMouseLeft;

  let top = startMouseTop + relativeMouseTop - topOffset - scrollTop,
      left = startMouseLeft + relativeMouseLeft - leftOffset - scrollLeft;

  top = `${top}px`; ///
  left = `${left}px`; ///

  const css = {
    top,
    left
  };

  this.css(css);

  this.callHandlers(eventType, relativeMouseTop, relativeMouseLeft);
}

function callHandlers(eventType, relativeMouseTop, relativeMouseLeft) {
  const eventListeners = this.findEventListeners(eventType);

  eventListeners.forEach((eventListener) => {
    const { handler, element } = eventListener;

    handler.call(element, relativeMouseTop, relativeMouseLeft);
  });
}

function isMouseOver(mouseTop, mouseLeft) {
  const bounds = this.getCollapsedBounds(),
        boundsOverlappingMouse = bounds.isOverlappingMouse(mouseTop, mouseLeft),
        mouseOver = boundsOverlappingMouse;  ///

  return mouseOver;
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

function getStartMouseTop() {
  const state = this.getState(),
      { startMouseTop } = state;

  return startMouseTop;
}

function getStartMouseLeft() {
  const state = this.getState(),
      { startMouseLeft } = state;

  return startMouseLeft;
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

function setStartMouseTop(startMouseTop) {
  this.updateState({
    startMouseTop
  });
}

function setStartMouseLeft(startMouseLeft) {
  this.updateState({
    startMouseLeft
  });
}

export default {
  onDragging,
  offDragging,
  onStopDragging,
  offStopDragging,
  onStartDragging,
  offStartDragging,
  enableDragging,
  disableDragging,
  isDragging,
  startWaitingToDrag,
  stopWaitingToDrag,
  startDragging,
  stopDragging,
  dragging,
  callHandlers,
  isMouseOver,
  getTimeout,
  resetTimeout,
  updateTimeout,
  getTopOffset,
  getLeftOffset,
  getStartMouseTop,
  getStartMouseLeft,
  setTopOffset,
  setLeftOffset,
  setStartMouseTop,
  setStartMouseLeft
};

function mouseUpHandler(event, element) {
  window.off(BLUR, mouseUpHandler, this);  ///

  window.offMouseUp(mouseUpHandler, this);

  window.offMouseMove(mouseMoveHandler, this);

  const dragging = this.isDragging();

  if (dragging) {
    const explorer = this.getExplorer(),
          dragEntry = this;  ///

    explorer.stopDragging(dragEntry, () => {
      this.stopDragging();
    });
  } else {
    this.stopWaitingToDrag();
  }
}

function mouseDownHandler(event, element) {
  const { button } = event;

  window.on(BLUR, mouseUpHandler, this); ///

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
  const dragging = this.isDragging();

  if (dragging) {
    const mouseTop = mouseTopFromEvent(event),
          mouseLeft = mouseLeftFromEvent(event);

    this.dragging(mouseTop, mouseLeft);
  }
}
