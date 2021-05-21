"use strict";

import withStyle from "easy-with-style";  ///

import { window } from "easy";

import Entry from "../entry";
import options from "../options";
import draggableMixins from "../mixins/draggable";

import { ESCAPE_KEYCODE, START_DRAGGING_DELAY } from "../constants";

const { NO_DRAGGING_SUB_ENTRIES, ESCAPE_KEY_STOPS_DRAGGING } = options;

class DraggableEntry extends Entry {
  getPath() {
    const explorer = this.getExplorer(),
          draggableEntry = this,  ///
          path = explorer.retrieveDraggableEntryPath(draggableEntry);

    return path;
  }

  getExplorer() {
    const { explorer } = this.properties;

    return explorer;
  }

  getCollapsedBounds() {
    const bounds = this.getBounds(),
          collapsedBounds = bounds;  ///

    return collapsedBounds;
  }

  isMouseOver(mouseTop, mouseLeft) {
    const collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;  ///

    return mouseOver;
  }

  isOverlappingCollapsedBounds(collapsedBounds) {
    const bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

    return overlappingCollapsedBounds;
  }

  isTopmostDirectoryNameDraggableEntry() {
    let topmostDirectoryNameDraggableEntry = false;

    const directoryNameDraggableEntry = this.isDirectoryNameDraggableEntry();

    if (directoryNameDraggableEntry) {
      const directoryNameDraggableEntry = this, ///
            directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

      if (directoryNameDraggableEntryTopmost) {
        topmostDirectoryNameDraggableEntry = true;
      }
    }

    return topmostDirectoryNameDraggableEntry;
  }

  startDragging(mouseTop, mouseLeft) {
    const explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft(),
          topOffset = boundsTop - mouseTop,
          leftOffset = boundsLeft - mouseLeft;

    this.setTopOffset(topOffset);

    this.setLeftOffset(leftOffset);

    if (escapeKeyStopsDraggingOptionPresent) {
      const keyDownHandler = this.keyDownHandler.bind(this);
      
      this.onKeyDown(keyDownHandler);
    }

    this.addClass("dragging");

    this.dragging(mouseTop, mouseLeft);
  }

  stopDragging() {
    const explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

    if (escapeKeyStopsDraggingOptionPresent) {
      this.offKeyDown();
    }

    this.removeClass("dragging");
  }

  dragging(mouseTop, mouseLeft) {
    const explorer = this.getExplorer(),
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset(),
          windowScrollTop = window.getScrollTop(),
          windowScrollLeft = window.getScrollLeft();

    let top = mouseTop + topOffset - windowScrollTop,
        left = mouseLeft + leftOffset - windowScrollLeft;

    top = `${top}px`; ///
    left = `${left}px`; ///

    const css = {
      top,
      left
    };

    this.css(css);

    explorer.dragging(this);
  }

  startWaitingToDrag(mouseTop, mouseLeft) {
    let timeout = this.getTimeout();
    
    if (timeout === null) {
      timeout = setTimeout(() => {
        this.resetTimeout();

        const explorer = this.getExplorer(),
              topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

        if (topmostDirectoryNameDraggableEntry) {
          return;
        }

        if (subEntry && noDraggingSubEntriesOptionPresent) {
          return;
        }

        const mouseOver = this.isMouseOver(mouseTop, mouseLeft);

        if (mouseOver) {
          const startedDragging = explorer.startDragging(this);

          if (startedDragging) {
            this.startDragging(mouseTop, mouseLeft);
          }
        }
      }, START_DRAGGING_DELAY);
      
      this.updateTimeout(timeout);
    }
  }

  stopWaitingToDrag() {
    const timeout = this.getTimeout();
    
    if (timeout !== null) {
      clearTimeout(timeout);

      this.resetTimeout();
    }
  }

  keyDownHandler(event, element) {
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

  didMount() {
    this.enableDragging();

    this.onDoubleClick(this.doubleClickHandler, this);
  }

  willUnmount() {
    this.offDoubleClick(this.doubleClickHandler, this);

    this.disableDragging();
  }
  
  initialise() {
    this.assignContext();
  }

  static tagName = "li";

  static defaultProperties = {
    className: "draggable"
  };

  static ignoredProperties = [
    "explorer"
  ];
}

Object.assign(DraggableEntry.prototype, draggableMixins);

export default withStyle(DraggableEntry)`

  .dragging {
    position: fixed;
    z-index: 10000;
  }

`;
