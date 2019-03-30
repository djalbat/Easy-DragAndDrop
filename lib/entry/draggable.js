'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    options = require('../options');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    Element = easy.Element,
    LEFT_MOUSE_BUTTON = Element.LEFT_MOUSE_BUTTON,
    NO_DRAGGING = options.NO_DRAGGING,
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    NO_DRAGGING_TOPMOST_DIRECTORY = options.NO_DRAGGING_TOPMOST_DIRECTORY,
    ESCAPE_KEY_STOPS_DRAGGING = options.ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry(selector, type, explorer) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector, type));

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
    key: 'isOverlappingCollapsedBounds',
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

      return overlappingCollapsedBounds;
    }
  }, {
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
      var topmostDirectoryNameDraggableEntry = false;

      return topmostDirectoryNameDraggableEntry;
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
      var _this2 = this;

      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          _this2.resetTimeout();

          var topmostDirectoryNameDraggableEntry = _this2.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              ///
          noDraggingOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING),
              noDraggingSubEntriesOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES),
              noDraggingTopmostDirectoryNameDraggableEntryOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING_TOPMOST_DIRECTORY); ///

          if (noDraggingOptionPresent || subEntry && noDraggingSubEntriesOptionPresent || topmostDirectoryNameDraggableEntry && noDraggingTopmostDirectoryNameDraggableEntryOptionPresent) {
            return;
          }

          var mouseOver = _this2.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = _this2.explorer.startDragging(_this2);

            if (startedDragging) {
              _this2.startDragging(mouseTop, mouseLeft);
            }
          }
        }, START_DRAGGING_DELAY);

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
      var _this3 = this;

      window.off('blur', this.mouseUpHandler, this); ///

      window.offMouseUp(this.mouseUpHandler, this);

      window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var draggableEntry = this; ///

        this.explorer.stopDragging(draggableEntry, function () {
          _this3.stopDragging();
        });
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
      var state = this.getState(),
          timeout = state.timeout;


      return timeout;
    }
  }, {
    key: 'getTopOffset',
    value: function getTopOffset() {
      var state = this.getState(),
          topOffset = state.topOffset;


      return topOffset;
    }
  }, {
    key: 'getLeftOffset',
    value: function getLeftOffset() {
      var state = this.getState(),
          leftOffset = state.leftOffset;


      return leftOffset;
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
    value: function initialise(properties) {
      this.assignContext();

      var mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);

      this.onMouseDown(mouseDownHandler);
      this.onDoubleClick(doubleClickHandler);
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
  tagName: 'li',
  defaultProperties: {
    className: 'draggable'
  },
  ignoredProperties: ['explorer']
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwid2luZG93IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkciLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIk5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJ0eXBlIiwiZXhwbG9yZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJzZXRUb3BPZmZzZXQiLCJzZXRMZWZ0T2Zmc2V0Iiwia2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25LZXlEb3duIiwiYWRkQ2xhc3MiLCJkcmFnIiwib2ZmS2V5RG93biIsInJlbW92ZUNsYXNzIiwibW91c2VCdXR0b24iLCJ0aW1lb3V0IiwiZ2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJyZXNldFRpbWVvdXQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmdPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZ1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPcHRpb25QcmVzZW50IiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmIiwib2ZmTW91c2VVcCIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwia2V5Q29kZSIsImVzY2FwZUtleSIsImVzY2FwZURyYWdnaW5nIiwid2luZG93U2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwid2luZG93U2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiLCJnZXRUb3BPZmZzZXQiLCJnZXRMZWZ0T2Zmc2V0IiwidG9wIiwibGVmdCIsImNzcyIsImdldFN0YXRlIiwic3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsImFzc2lnbkNvbnRleHQiLCJtb3VzZURvd25IYW5kbGVyIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Nb3VzZURvd24iLCJvbkRvdWJsZUNsaWNrIiwiQ2xhc3MiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7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akMsVUFBRTlFLFFBQUYsR0FBZThFLFVBQWYsQ0FBRTlFLFFBQUY7QUFBQSxVQUNBSSxjQURBLEdBQ2lCbEIsTUFBTW1HLGNBQU4sQ0FBcUJELEtBQXJCLEVBQTRCTixVQUE1QixFQUF3QzlFLFFBQXhDLENBRGpCOzs7QUFHTixhQUFPSSxjQUFQO0FBQ0Q7Ozs7RUEvUjBCbEIsSzs7QUFrUzdCb0csT0FBT0MsTUFBUCxDQUFjMUYsY0FBZCxFQUE4QjtBQUM1QjJGLFdBQVMsSUFEbUI7QUFFNUJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRlM7QUFLNUJDLHFCQUFtQixDQUNqQixVQURpQjtBQUxTLENBQTlCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCaEcsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gRWxlbWVudCxcbiAgICAgIHsgTk9fRFJBR0dJTkcsIE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBOT19EUkFHR0lOR19UT1BNT1NUX0RJUkVDVE9SWSwgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IHRoaXMuZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gICAgdGhpcy5zZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgdGhpcy5vZmZLZXlEb3duKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZKTsgIC8vL1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZ09wdGlvblByZXNlbnQpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHx8ICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICYmIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgICB3aW5kb3cub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgICB3aW5kb3cub2ZmTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihrZXlDb2RlKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIGxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDsgLy8vXG4gICAgbGVmdCA9IGAke2xlZnR9cHhgOyAvLy9cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcCxcbiAgICAgIGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHJlc2V0VGltZW91dCgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gIH1cbiAgXG4gIGdldFRpbWVvdXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0aW1lb3V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB0aW1lb3V0O1xuICB9XG5cbiAgZ2V0VG9wT2Zmc2V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdG9wT2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB0b3BPZmZzZXQ7XG4gIH1cblxuICBnZXRMZWZ0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgbGVmdE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gbGVmdE9mZnNldDtcbiAgfVxuXG4gIHNldFRpbWVvdXQodGltZW91dCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdGltZW91dFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdG9wT2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBudWxsLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZW91dCxcbiAgICAgIHRvcE9mZnNldCxcbiAgICAgIGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpc2UocHJvcGVydGllcykge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGRvdWJsZUNsaWNrSGFuZGxlciA9IHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgZXhwbG9yZXIpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkcmFnZ2FibGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==