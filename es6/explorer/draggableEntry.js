'use strict';

var easyui = require('easyui'),
    Element = easyui.Element,
    window = easyui.window;

var options = require('../options'),
    NameButton = require('./nameButton');

const ESCAPE_KEYCODE = 27,
      START_DRAGGING_DELAY = 175,
      NAMESPACE = 'EasyUI-DragAndDrop';

class DraggableEntry extends Element {
  constructor(selector, name, explorer, type) {
    super(selector);

    this.nameButton = new NameButton(this, name);

    this.explorer = explorer;
    
    this.type = type;

    this.timeout = null;
    this.topOffset = null;
    this.leftOffset = null;

    this.onMouseDown(this.mouseDownHandler.bind(this));
  }

  getName() { return this.nameButton.getName(); }

  getExplorer() {
    return this.explorer;
  }

  getType() {
    return this.type;
  }

  getPath() {
    var path = this.explorer.getDraggableEntryPath(this);
    
    return path;
  }
  
  getCollapsedBounds() {
    var bounds = this.getBounds(),
        collapsedBounds = bounds;  ///

    return collapsedBounds;
  }

  isRootDirectory() {
    return false;
  }

  isOverlappingCollapsedBounds(collapsedBounds) {
    var bounds = this.getBounds(),
        overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

    return overlappingCollapsedBounds;
  }

  setName(name) { this.nameButton.setName(name); }

  onDoubleClick(doubleClickHandler) { this.nameButton.onDoubleClick(doubleClickHandler); }

  startDragging(mouseTop, mouseLeft) {
    var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING),
        bounds = this.getBounds(),
        top = bounds.getTop(),
        left = bounds.getLeft(),
        css = {
          top: top,
          left: left
        };

    this.css(css);

    this.topOffset = top - mouseTop;
    this.leftOffset = left - mouseLeft;

    if (escapeKeyStopsDragging) {
      this.on('keydown', this.keyDownHandler.bind(this));
    }

    this.addClass('dragging');
  }

  stopDragging() {
    var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

    if (escapeKeyStopsDragging) {
      this.off('keydown', this.keyDownHandler.bind(this));
    }

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

    this.explorer.dragging(this);
  }

  startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
    if (this.timeout === null) {
      this.timeout = setTimeout(function() {
        this.timeout = null;

        var rootDirectory = this.isRootDirectory(),
            subEntry = !rootDirectory,  ///
            noDragging = this.explorer.hasOption(options.NO_DRAGGING),
            noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
            noDraggingRootDirectory = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);

        if ((noDragging) || (subEntry && noDraggingSubEntries) || (rootDirectory && noDraggingRootDirectory)) {
          return;
        }

        var mouseOver = this.isMouseOver(mouseTop, mouseLeft);

        if (mouseOver) {
          var startedDragging = this.explorer.startDragging(this);

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

  isDragging() {
    var dragging = this.hasClass('dragging');
    
    return dragging;
  }

  isMouseOver(mouseTop, mouseLeft) {
    var collapsedBounds = this.getCollapsedBounds(),
        collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
        mouseOver = collapsedBoundsOverlappingMouse;

    return mouseOver;
  }

  mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
    window.on('mouseup blur', this.mouseUpHandler.bind(this), NAMESPACE);  ///
    window.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE);

    if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
      var dragging = this.isDragging();

      if (!dragging) {
        this.startWaitingToDrag(mouseTop, mouseLeft);
      }
    }
  }

  mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
    window.off('mouseup blur', NAMESPACE); ///
    window.offMouseMove(NAMESPACE);

    var dragging = this.isDragging();

    if (dragging) {
      this.explorer.stopDragging(this, function() {
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
        this.explorer.escapeDragging();

        this.stopDragging();
      }
    }
  }
}

module.exports = DraggableEntry;
