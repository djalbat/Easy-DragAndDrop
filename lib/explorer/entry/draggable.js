'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    options = require('../../options');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    React = easy.React,
    Element = easy.Element,
    LEFT_MOUSE_BUTTON = Element.LEFT_MOUSE_BUTTON,
    NO_DRAGGING = options.NO_DRAGGING,
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    NO_DRAGGING_TOPMOST_DIRECTORY = options.NO_DRAGGING_TOPMOST_DIRECTORY,
    ESCAPE_KEY_STOPS_DRAGGING = options.ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector, name, type));

    _this.explorer = explorer;

    _this.setInitialState();
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var draggableEntry = this,
          ///
      path = this.explorer.retrieveDraggableEntryPath(draggableEntry);

      return path;
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var bounds = this.getBounds(),
          collapsedBounds = bounds; ///

      return collapsedBounds;
    }
  }, {
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'isOverlappingCollapsedBounds',
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

      return overlappingCollapsedBounds;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.nameButton.setName(name);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.nameButton.onDoubleClick(handler);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft(),
          topOffset = boundsTop - mouseTop,
          leftOffset = boundsLeft - mouseLeft;

      this.setTopOffset(topOffset);

      this.setLeftOffset(leftOffset);

      if (escapeKeyStopsDraggingOptionPresent) {
        var keyDownHandler = this.keyDownHandler.bind(this);

        this.onKeyDown(keyDownHandler);
      }

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDraggingOptionPresent) {
        this.offKeyDown();
      }

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      this.drag(mouseTop, mouseLeft);

      this.explorer.dragging(this);
    }
  }, {
    key: 'startWaitingToDrag',
    value: function startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          this.resetTimeout();

          var topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              ///
          noDraggingOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING),
              noDraggingSubEntriesOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES),
              noDraggingTopmostDirectoryNameDraggableEntryOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_TOPMOST_DIRECTORY); ///

          if (noDraggingOptionPresent || subEntry && noDraggingSubEntriesOptionPresent || topmostDirectoryNameDraggableEntry && noDraggingTopmostDirectoryNameDraggableEntryOptionPresent) {
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

        this.setTimeout(timeout);
      }
    }
  }, {
    key: 'stopWaitingToDrag',
    value: function stopWaitingToDrag() {
      var timeout = this.getTimeout();

      if (timeout !== null) {
        clearTimeout(timeout);

        this.resetTimeout();
      }
    }
  }, {
    key: 'isMouseOver',
    value: function isMouseOver(mouseTop, mouseLeft) {
      var collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;

      return mouseOver;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
      window.on('blur', this.mouseUpHandler, this); ///

      window.onMouseUp(this.mouseUpHandler, this);

      window.onMouseMove(this.mouseMoveHandler, this);

      if (mouseButton === LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
      window.off('blur', this.mouseUpHandler, this); ///

      window.offMouseUp(this.mouseUpHandler, this);

      window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var draggableEntry = this; ///

        this.explorer.stopDragging(draggableEntry, function () {
          this.stopDragging();
        }.bind(this));
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler(keyCode) {
      var escapeKey = keyCode === ESCAPE_KEYCODE;

      if (escapeKey) {
        var dragging = this.isDragging();

        if (dragging) {
          this.explorer.escapeDragging();

          this.stopDragging();
        }
      }
    }
  }, {
    key: 'drag',
    value: function drag(mouseTop, mouseLeft) {
      var windowScrollTop = window.getScrollTop(),
          windowScrollLeft = window.getScrollLeft(),
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset();

      var top = mouseTop + topOffset - windowScrollTop,
          left = mouseLeft + leftOffset - windowScrollLeft;

      top = top + 'px'; ///
      left = left + 'px'; ///

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
    }
  }, {
    key: 'resetTimeout',
    value: function resetTimeout() {
      var timeout = null;

      this.setTimeout(timeout);
    }
  }, {
    key: 'getTimeout',
    value: function getTimeout() {
      return this.fromState('timeout');
    }
  }, {
    key: 'getTopOffset',
    value: function getTopOffset() {
      return this.fromState('topOffset');
    }
  }, {
    key: 'getLeftOffset',
    value: function getLeftOffset() {
      return this.fromState('leftOffset');
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      this.updateState({
        timeout: timeout
      });
    }
  }, {
    key: 'setTopOffset',
    value: function setTopOffset(topOffset) {
      this.updateState({
        topOffset: topOffset
      });
    }
  }, {
    key: 'setLeftOffset',
    value: function setLeftOffset(leftOffset) {
      this.updateState({
        leftOffset: leftOffset
      });
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState() {
      var timeout = null,
          topOffset = null,
          leftOffset = null;

      this.setState({
        timeout: timeout,
        topOffset: topOffset,
        leftOffset: leftOffset
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      _get(DraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DraggableEntry.prototype), 'initialise', this).call(this);

      var mouseDownHandler = this.mouseDownHandler.bind(this);

      this.onMouseDown(mouseDownHandler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var explorer = properties.explorer,
          draggableEntry = Entry.fromProperties(Class, properties, explorer);


      return draggableEntry;
    }
  }]);

  return DraggableEntry;
}(Entry);

Object.assign(DraggableEntry, {
  tagName: 'li'
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwid2luZG93IiwiUmVhY3QiLCJFbGVtZW50IiwiTEVGVF9NT1VTRV9CVVRUT04iLCJOT19EUkFHR0lORyIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwiTk9fRFJBR0dJTkdfVE9QTU9TVF9ESVJFQ1RPUlkiLCJFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJzZXRJbml0aWFsU3RhdGUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwibmFtZUJ1dHRvbiIsInNldE5hbWUiLCJoYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJzZXRUb3BPZmZzZXQiLCJzZXRMZWZ0T2Zmc2V0Iiwia2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25LZXlEb3duIiwiYWRkQ2xhc3MiLCJkcmFnIiwib2ZmS2V5RG93biIsInJlbW92ZUNsYXNzIiwibW91c2VCdXR0b24iLCJ0aW1lb3V0IiwiZ2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJyZXNldFRpbWVvdXQiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic3ViRW50cnkiLCJub0RyYWdnaW5nT3B0aW9uUHJlc2VudCIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCIsIm5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCIsIm1vdXNlT3ZlciIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZVVwIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiaXNEcmFnZ2luZyIsInN0YXJ0V2FpdGluZ1RvRHJhZyIsIm9mZiIsIm9mZk1vdXNlVXAiLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImtleUNvZGUiLCJlc2NhcGVLZXkiLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwiZ2V0VG9wT2Zmc2V0IiwiZ2V0TGVmdE9mZnNldCIsInRvcCIsImxlZnQiLCJjc3MiLCJmcm9tU3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwibW91c2VEb3duSGFuZGxlciIsIm9uTW91c2VEb3duIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFB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QUY7QUFBQSxVQUNBSyxjQURBLEdBQ2lCcEIsTUFBTXFHLGNBQU4sQ0FBcUJGLEtBQXJCLEVBQTRCQyxVQUE1QixFQUF3Q3JGLFFBQXhDLENBRGpCOzs7QUFHTixhQUFPSyxjQUFQO0FBQ0Q7Ozs7RUFoUjBCcEIsSzs7QUFtUjdCc0csT0FBT0MsTUFBUCxDQUFjM0YsY0FBZCxFQUE4QjtBQUM1QjRGLFdBQVM7QUFEbUIsQ0FBOUI7O0FBSUFDLE9BQU9DLE9BQVAsR0FBaUI5RixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcHRpb25zJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY29uc3QgeyB3aW5kb3csIFJlYWN0LCBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gRWxlbWVudCxcbiAgICAgIHsgTk9fRFJBR0dJTkcsIE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBOT19EUkFHR0lOR19UT1BNT1NUX0RJUkVDVE9SWSwgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IHRoaXMuZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cbiAgXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhoYW5kbGVyKTsgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gICAgdGhpcy5zZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgdGhpcy5vZmZLZXlEb3duKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfVE9QTU9TVF9ESVJFQ1RPUlkpOyAgLy8vXG5cbiAgICAgICAgaWYgKChub0RyYWdnaW5nT3B0aW9uUHJlc2VudCkgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkgfHwgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgJiYgbm9EcmFnZ2luZ1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPcHRpb25QcmVzZW50KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgICAgXG4gICAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cbiAgICAgIFxuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGtleUNvZGUpIHtcbiAgICBjb25zdCBlc2NhcGVLZXkgPSAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpO1xuXG4gICAgaWYgKGVzY2FwZUtleSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ3RpbWVvdXQnKTsgfVxuXG4gIGdldFRvcE9mZnNldCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCd0b3BPZmZzZXQnKTsgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgnbGVmdE9mZnNldCcpOyB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXQ6IHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgICB0b3BPZmZzZXQ6IHRvcE9mZnNldCxcbiAgICAgIGxlZnRPZmZzZXQ6IGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSAgPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGV4cGxvcmVyKTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19