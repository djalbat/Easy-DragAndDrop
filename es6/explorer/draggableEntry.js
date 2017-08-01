'use strict';

const easy = require('easy');

const options = require('../options'),
      NameButton = require('./nameButton');

const ESCAPE_KEYCODE = 27,
      START_DRAGGING_DELAY = 175;

const { window, Element, React } = easy;

class DraggableEntry extends Element {
  constructor(selector, name, explorer, type) {
    super(selector);

    this.nameButton = <NameButton>{name}</NameButton>;

    this.explorer = explorer;
    
    this.type = type;
    
    this.setInitialState();
  }

  getName() { return this.nameButton.getName(); }

  getExplorer() {
    return this.explorer;
  }

  getType() {
    return this.type;
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
  
  isRootDirectoryNameDraggableEntry() {
    return false;
  }

  isOverlappingCollapsedBounds(collapsedBounds) {
    const bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

    return overlappingCollapsedBounds;
  }

  setName(name) { this.nameButton.setName(name); }

  onDoubleClick(handler) { this.nameButton.onDoubleClick(handler); }

  startDragging(mouseTop, mouseLeft) {
    const escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft(),
          topOffset = boundsTop - mouseTop,
          leftOffset = boundsLeft - mouseLeft;

    this.setTopOffset(topOffset);

    this.setLeftOffset(leftOffset);

    if (escapeKeyStopsDragging) {
      const keyDownHandler = this.keyDownHandler.bind(this);
      
      this.onKeyDown(keyDownHandler);
    }

    this.addClass('dragging');

    this.drag(mouseTop, mouseLeft);
  }

  stopDragging() {
    const escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

    if (escapeKeyStopsDragging) {
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
      timeout = setTimeout(function() {
        this.resetTimeout();

        const rootDirectoryNameDraggableEntry = this.isRootDirectoryNameDraggableEntry(),
              subEntry = !rootDirectoryNameDraggableEntry,  ///
              noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectoryNameDraggableEntry = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);  ///

        if ((noDragging) || (subEntry && noDraggingSubEntries) || (rootDirectoryNameDraggableEntry && noDraggingRootDirectoryNameDraggableEntry)) {
          return;
        }

        const mouseOver = this.isMouseOver(mouseTop, mouseLeft);

        if (mouseOver) {
          const startedDragging = this.explorer.startDragging(this);

          if (startedDragging) {
            this.startDragging(mouseTop, mouseLeft);
          }
        }
      }.bind(this), START_DRAGGING_DELAY);
      
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

    if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
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
      
      this.explorer.stopDragging(draggableEntry, function() {
        this.stopDragging();
      }.bind(this));
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
      top: top,
      left: left
    };

    this.css(css);

    this.explorer.dragging(this);
  }
  
  resetTimeout() {
    const timeout = null;
    
    this.setTimeout(timeout);
  }
  
  getTimeout() { return this.fromState('timeout'); }

  getTopOffset() { return this.fromState('topOffset'); }

  getLeftOffset() { return this.fromState('leftOffset'); }

  setTimeout(timeout) {
    this.updateState({
      timeout: timeout
    });
  }

  setTopOffset(topOffset) {
    this.updateState({
      topOffset: topOffset
    });
  }

  setLeftOffset(leftOffset) {
    this.updateState({
      leftOffset: leftOffset
    });
  }

  setInitialState() {
    const timeout = null,
          topOffset = null,
          leftOffset = null;
    
    this.setState({
      timeout: timeout,
      topOffset: topOffset,
      leftOffset: leftOffset
    });
  }

  initialise() {
    this.append(this.nameButton);

    const mouseDownHandler = this.mouseDownHandler.bind(this);

    this.onMouseDown(mouseDownHandler);
  }

  static fromProperties(Class, properties, ...remainingArguments) { return Element.fromProperties(Class, properties, ...remainingArguments); }
}

Object.assign(DraggableEntry, {
  tagName: 'li'
});

module.exports = DraggableEntry;
