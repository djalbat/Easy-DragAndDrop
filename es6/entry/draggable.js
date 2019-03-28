'use strict';

const easy = require('easy');

const Entry = require('../entry'),
      options = require('../options'),
      NameButton = require('../nameButton');

const ESCAPE_KEYCODE = 27,
      START_DRAGGING_DELAY = 175;

const { window, React, Element } = easy,
      { LEFT_MOUSE_BUTTON } = Element,
      { NO_DRAGGING, NO_DRAGGING_SUB_ENTRIES, NO_DRAGGING_TOPMOST_DIRECTORY, ESCAPE_KEY_STOPS_DRAGGING } = options;

class DraggableEntry extends Entry {
  constructor(selector, type, explorer) {
    super(selector, type);

    this.explorer = explorer;
    
    this.setInitialState();
  }

  getExplorer() {
    return this.explorer;
  }

  isDragging() {
    const dragging = this.hasClass('dragging');

    return dragging;
  }

  getPath() {
    const draggableEntry = this,  ///
          path = this.explorer.retrieveDraggableEntryPath(draggableEntry);

    return path;
  }

  getCollapsedBounds() {
    const bounds = this.getBounds(),
          collapsedBounds = bounds;  ///

    return collapsedBounds;
  }
  
  isTopmostDirectoryNameDraggableEntry() {
    return false;
  }

  isOverlappingCollapsedBounds(collapsedBounds) {
    const bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

    return overlappingCollapsedBounds;
  }

  startDragging(mouseTop, mouseLeft) {
    const escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
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

    this.addClass('dragging');

    this.drag(mouseTop, mouseLeft);
  }

  stopDragging() {
    const escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

    if (escapeKeyStopsDraggingOptionPresent) {
      this.offKeyDown();
    }

    this.removeClass('dragging');
  }

  dragging(mouseTop, mouseLeft) {
    this.drag(mouseTop, mouseLeft);

    this.explorer.dragging(this);
  }

  startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
    let timeout = this.getTimeout();
    
    if (timeout === null) {
      timeout = setTimeout(() => {
        this.resetTimeout();

        const topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,  ///
              noDraggingOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING),
              noDraggingSubEntriesOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES),
              noDraggingTopmostDirectoryNameDraggableEntryOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_TOPMOST_DIRECTORY);  ///

        if ((noDraggingOptionPresent) || (subEntry && noDraggingSubEntriesOptionPresent) || (topmostDirectoryNameDraggableEntry && noDraggingTopmostDirectoryNameDraggableEntryOptionPresent)) {
          return;
        }

        const mouseOver = this.isMouseOver(mouseTop, mouseLeft);

        if (mouseOver) {
          const startedDragging = this.explorer.startDragging(this);

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

  isMouseOver(mouseTop, mouseLeft) {
    const collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;

    return mouseOver;
  }

  mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
    window.on('blur', this.mouseUpHandler, this); ///

    window.onMouseUp(this.mouseUpHandler, this);

    window.onMouseMove(this.mouseMoveHandler, this);

    if (mouseButton === LEFT_MOUSE_BUTTON) {
      const dragging = this.isDragging();

      if (!dragging) {
        this.startWaitingToDrag(mouseTop, mouseLeft);
      }
    }
  }

  mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
    window.off('blur', this.mouseUpHandler, this);  ///

    window.offMouseUp(this.mouseUpHandler, this);

    window.offMouseMove(this.mouseMoveHandler, this);

    const dragging = this.isDragging();

    if (dragging) {
      const draggableEntry = this;  ///
      
      this.explorer.stopDragging(draggableEntry, () => {
        this.stopDragging();
      });
    } else {
      this.stopWaitingToDrag();
    }
  }

  mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
    const dragging = this.isDragging();

    if (dragging) {
      this.dragging(mouseTop, mouseLeft);
    }
  }

  keyDownHandler(keyCode) {
    const escapeKey = (keyCode === ESCAPE_KEYCODE);

    if (escapeKey) {
      const dragging = this.isDragging();

      if (dragging) {
        this.explorer.escapeDragging();

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

    this.explorer.dragging(this);
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

  childElements(properties) {
    const { name } = properties;

    return ([

      <NameButton>{name}</NameButton>

    ]);
  }

  initialise(properties) {
    this.assignContext();

    const mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);
    
    this.onMouseDown(mouseDownHandler);
    this.onDoubleClick(doubleClickHandler);
  }

  static fromProperties(Class, properties) {
    const { explorer } = properties,
          draggableEntry = Entry.fromProperties(Class, properties, explorer);

    return draggableEntry;
  }
}

Object.assign(DraggableEntry, {
  tagName: 'li',
  defaultProperties: {
    className: 'draggable'
  },
  ignoredProperties: [
    'explorer'
  ]
});

module.exports = DraggableEntry;
