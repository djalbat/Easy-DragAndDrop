"use strict";

import options from "../../options";
import dragMixins from "../../mixins/drag";

import { ESCAPE_KEYCODE } from "../../constants";

const { startDragging: superStartDragging } = dragMixins,
      { NO_DRAGGING_SUB_ENTRIES, ESCAPE_KEY_STOPS_DRAGGING } = options;

function didMount() {
  this.enableDragging();

  this.onDragging(draggingHandler, this);
  this.onStopDragging(stopDraggingHandler, this);
  this.onStartDragging(startDraggingHandler, this);
}

function willUnmount() {
  this.offStartDragging(startDraggingHandler, this);
  this.offStopDragging(stopDraggingHandler, this);
  this.offDragging(draggingHandler, this);

  this.disableDragging();
}

function isMouseOver(mouseTop, mouseLeft) {
  const collapsedBounds = this.getCollapsedBounds(),
        collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
        mouseOver = collapsedBoundsOverlappingMouse;  ///

  return mouseOver;
}

function startDragging(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        dragEntry = this,  ///
        topmostDirectoryNameDragEntry = this.isTopmostDirectoryNameDragEntry(),
        subEntry = !topmostDirectoryNameDragEntry,
        startedDragging = explorer.hasStartedDragging(dragEntry),
        noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

  if (!startedDragging) {
    return;
  }

  if (topmostDirectoryNameDragEntry) {
    return;
  }

  if (subEntry && noDraggingSubEntriesOptionPresent) {
    return;
  }

  superStartDragging.call(this, mouseTop, mouseLeft);
}

function getCollapsedBounds() {
  const bounds = this.getBounds(),
        collapsedBounds = bounds;  ///

  return collapsedBounds;
}

module.exports = {
  didMount,
  willUnmount,
  isMouseOver,
  startDragging,
  getCollapsedBounds
};

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
        dragEntry = this;  ///

  explorer.dragging(dragEntry);
}

function stopDraggingHandler(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

  if (escapeKeyStopsDraggingOptionPresent) {
    this.offKeyDown(keyDownHandler, this);
  }
}

function startDraggingHandler(mouseTop, mouseLeft) {
  const explorer = this.getExplorer(),
        escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

  if (escapeKeyStopsDraggingOptionPresent) {
    this.onKeyDown(keyDownHandler, this);
  }
}
