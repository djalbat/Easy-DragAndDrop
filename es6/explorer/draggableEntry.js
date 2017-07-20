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

    const nameButton = <NameButton>{name}</NameButton>;

    this.explorer = explorer;
    
    this.type = type;

    this.timeout = null;
    this.topOffset = null;
    this.leftOffset = null;
    
    this.nameButton = nameButton;

    this.boundMouseUpHandler = this.mouseUpHandler.bind(this);
    this.boundMouseDownHandler = this.mouseDownHandler.bind(this);
    this.boundMouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.onMouseDown(this.boundMouseDownHandler);

    this.append(nameButton);
  }

  getName() { return this.nameButton.getName(); }

  getExplorer() {
    return this.explorer;
  }

  getType() {
    return this.type;
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

  isDragging() {
    const dragging = this.hasClass('dragging');

    return dragging;
  }

  isHidden() {
    const hidden = this.hasClass('hidden');

    return hidden;
  }
  
  setHidden(hidden) {
    hidden ?
      this.addClass('hidden') :
        this.removeClass('hidden');
  }
  
  show() {
    this.removeClass('hidden');
  }
  
  hide() {
    this.addClass('hidden');
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
          boundsLeft = bounds.getLeft();

    this.topOffset = boundsTop - mouseTop;
    this.leftOffset = boundsLeft - mouseLeft;

    if (escapeKeyStopsDragging) {
      this.onKeyDown(this.keyDownHandler.bind(this));
    }

    this.addClass('dragging');

    this.drag(mouseTop, mouseLeft);
  }

  stopDragging() {
    const escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

    if (escapeKeyStopsDragging) {
      this.off('keydown');
    }

    this.removeClass('dragging');
  }

  dragging(mouseTop, mouseLeft) {
    this.drag(mouseTop, mouseLeft);

    this.explorer.dragging(this);
  }

  startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
    if (this.timeout === null) {
      this.timeout = setTimeout(function() {
        this.timeout = null;

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
    }
  }

  stopWaitingToDrag() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);

      this.timeout = null;
    }
  }

  isMouseOver(mouseTop, mouseLeft) {
    const collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;

    return mouseOver;
  }

  mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
    window.on('mouseup blur', this.boundMouseUpHandler);
    
    window.onMouseMove(this.boundMouseMoveHandler);

    if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
      const dragging = this.isDragging();

      if (!dragging) {
        this.startWaitingToDrag(mouseTop, mouseLeft);
      }
    }
  }

  mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
    window.off('mouseup blur', this.boundMouseUpHandler);
    
    window.offMouseMove(this.boundMouseMoveHandler);

    const dragging = this.isDragging();

    if (dragging) {
      this.explorer.stopDragging(this, function() {
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
          windowScrollLeft = window.getScrollLeft();

    let top = mouseTop + this.topOffset - windowScrollTop,
        left = mouseLeft + this.leftOffset - windowScrollLeft;

    top = `${top}px`; ///
    left = `${left}px`; ///

    const css = {
      top: top,
      left: left
    };

    this.css(css);

    this.explorer.dragging(this);
  }
  
  static fromProperties(Class, properties, ...remainingArguments) { return Element.fromProperties(Class, properties, ...remainingArguments); }
}

Object.assign(DraggableEntry, {
  tagName: 'li'
});

module.exports = DraggableEntry;
