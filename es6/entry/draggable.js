"use strict";

import { window, constants } from "easy";

import Entry from "../entry";
import options from "../options";

import { ESCAPE_KEYCODE, START_DRAGGING_DELAY } from "../constants";

const { LEFT_MOUSE_BUTTON } = constants,
      { NO_DRAGGING_SUB_ENTRIES, ESCAPE_KEY_STOPS_DRAGGING } = options;

export default class DraggableEntry extends Entry {
  constructor(selector, type) {
    super(selector, type);

    this.setInitialState();
  }

  getPath() {
    const explorer = this.getExplorer(),
          draggableEntry = this,  ///
          path = explorer.retrieveDraggableEntryPath(draggableEntry);

    return path;
  }

  getCollapsedBounds() {
    const bounds = this.getBounds(),
          collapsedBounds = bounds;  ///

    return collapsedBounds;
  }

  isDragging() {
    const dragging = this.hasClass("dragging");

    return dragging;
  }

  isMouseOver(mouseTop, mouseLeft) {
    const collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;

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

    this.drag(mouseTop, mouseLeft);
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
    const explorer = this.getExplorer();

    this.drag(mouseTop, mouseLeft);

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
      
      this.setTimeout(timeout);
    }
  }

  stopWaitingToDrag() {
    const timeout = this.getTimeout();
    
    if (timeout !== null) {
      clearTimeout(timeout);

      this.resetTimeout();
    }
  }

  mouseDownHandler(event, element) {
    const { button, pageX, pageY } = event,
          mouseTop = pageY,
          mouseLeft = pageX;

    window.on("blur", this.mouseUpHandler, this); ///

    window.onMouseUp(this.mouseUpHandler, this);

    window.onMouseMove(this.mouseMoveHandler, this);

    if (button === LEFT_MOUSE_BUTTON) {
      const dragging = this.isDragging();

      if (!dragging) {
        this.startWaitingToDrag(mouseTop, mouseLeft);
      }
    }
  }

  mouseUpHandler(event, element) {
    window.off("blur", this.mouseUpHandler, this);  ///

    window.offMouseUp(this.mouseUpHandler, this);

    window.offMouseMove(this.mouseMoveHandler, this);

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

  mouseMoveHandler(event, element) {
    const { pageX, pageY } = event,
          mouseTop = pageY,
          mouseLeft = pageX;

    const dragging = this.isDragging();

    if (dragging) {
      this.dragging(mouseTop, mouseLeft);
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
  
  drag(mouseTop, mouseLeft) {
    const windowScrollTop = window.getScrollTop(),
          windowScrollLeft = window.getScrollLeft(),
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset();

    let top = mouseTop + topOffset - windowScrollTop,
        left = mouseLeft + leftOffset - windowScrollLeft;

    top = `${top}px`; ///
    left = `${left}px`; ///

    const css = {
      top,
      left
    };

    this.css(css);

    const explorer = this.getExplorer();

    explorer.dragging(this);
  }
  
  resetTimeout() {
    const timeout = null;
    
    this.setTimeout(timeout);
  }
  
  getTimeout() {
    const state = this.getState(),
          { timeout } = state;

    return timeout;
  }

  getTopOffset() {
    const state = this.getState(),
          { topOffset } = state;

    return topOffset;
  }

  getLeftOffset() {
    const state = this.getState(),
          { leftOffset } = state;

    return leftOffset;
  }

  setTimeout(timeout) {
    this.updateState({
      timeout
    });
  }

  setTopOffset(topOffset) {
    this.updateState({
      topOffset
    });
  }

  setLeftOffset(leftOffset) {
    this.updateState({
      leftOffset
    });
  }

  setInitialState() {
    const timeout = null,
          topOffset = null,
          leftOffset = null;
    
    this.setState({
      timeout,
      topOffset,
      leftOffset
    });
  }

  initialise(properties) {
    this.assignContext();

    const mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);
    
    this.onMouseDown(mouseDownHandler);
    this.onDoubleClick(doubleClickHandler);
  }

  static tagName = "li";

  static defaultProperties = {
    className: "draggable"
  };

  static ignoredProperties = [
    "explorer"
  ];
}
