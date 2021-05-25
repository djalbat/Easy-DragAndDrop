"use strict";

import options from "../../options";
import draggableMixins from "../../mixins/draggable";

import { ESCAPE_KEYCODE } from "../../constants";

const { startDragging: superStartDragging } = draggableMixins,
      { NO_DRAGGING_SUB_ENTRIES, ESCAPE_KEY_STOPS_DRAGGING } = options;

function getCollapsedBounds() {
  const bounds = this.getBounds(),
        collapsedBounds = bounds;  ///

  return collapsedBounds;
}

function isMouseOver(mouseTop, mouseLeft) {
  const collapsedBounds = this.getCollapsedBounds(),
        collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
        mouseOver = collapsedBoundsOverlappingMouse;  ///

  return mouseOver;
}

function startDragging(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        draggableEntry = this,  ///
        topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
        subEntry = !topmostDirectoryNameDraggableEntry,
        startedDragging = explorer.hasStartedDragging(draggableEntry),
        noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

  if (!startedDragging) {
    return;
  }

  if (topmostDirectoryNameDraggableEntry) {
    return;
  }

  if (subEntry && noDraggingSubEntriesOptionPresent) {
    return;
  }

  superStartDragging.call(this, mouseTop, mouseLeft);
}

function keyDownHandler(event, element) {
  const { keyCode } = event,
        escapeKey = (keyCode === ESCAPE_KEYCODE);

  if (escapeKey) {
    const dragging = this.isDragging();

    if (dragging) {
      const explorer = this.getExplorer();

      explorer.escapeDragging();

      this.stopDragging();
    }
  }
}

function draggingHandler(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        draggableEntry = this;  ///

  explorer.dragging(draggableEntry);
}

function stopDraggingHandler(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

  if (escapeKeyStopsDraggingOptionPresent) {
    this.offKeyDown(this.keyDownHandler, this);
  }
}

function startDraggingHandler(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

  if (escapeKeyStopsDraggingOptionPresent) {
    this.onKeyDown(this.keyDownHandler, this);
  }
}

function didMount() {
  this.enableDragging();

  this.onDragging(this.draggingHandler, this);
  this.onStopDragging(this.stopDraggingHandler, this);
  this.onStartDragging(this.startDraggingHandler, this);
}

function willUnmount() {
  this.offStartDragging(this.startDraggingHandler, this);
  this.offStopDragging(this.stopDraggingHandler, this);
  this.offDragging(this.draggingHandler, this);

  this.disableDragging();
}

module.exports = {
  getCollapsedBounds,
  isMouseOver,
  startDragging,
  keyDownHandler,
  draggingHandler,
  stopDraggingHandler,
  startDraggingHandler,
  didMount,
  willUnmount
};
