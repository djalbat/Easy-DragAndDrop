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
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    ESCAPE_KEY_STOPS_DRAGGING = options.ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry(selector, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector, type));

    _this.setInitialState();
    return _this;
  }

  _createClass(DraggableEntry, [{
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
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
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
              noDraggingSubEntriesOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

          if (topmostDirectoryNameDraggableEntry) {
            return;
          }

          if (subEntry && noDraggingSubEntriesOptionPresent) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwid2luZG93IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsInR5cGUiLCJzZXRJbml0aWFsU3RhdGUiLCJkcmFnZ2FibGVFbnRyeSIsInBhdGgiLCJleHBsb3JlciIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZHJhZ2dpbmciLCJoYXNDbGFzcyIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm1vdXNlT3ZlciIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJzZXRUb3BPZmZzZXQiLCJzZXRMZWZ0T2Zmc2V0Iiwia2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25LZXlEb3duIiwiYWRkQ2xhc3MiLCJkcmFnIiwib2ZmS2V5RG93biIsInJlbW92ZUNsYXNzIiwibW91c2VCdXR0b24iLCJ0aW1lb3V0IiwiZ2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJyZXNldFRpbWVvdXQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmIiwib2ZmTW91c2VVcCIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwia2V5Q29kZSIsImVzY2FwZUtleSIsImVzY2FwZURyYWdnaW5nIiwid2luZG93U2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwid2luZG93U2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiLCJnZXRUb3BPZmZzZXQiLCJnZXRMZWZ0T2Zmc2V0IiwidG9wIiwibGVmdCIsImNzcyIsImdldFN0YXRlIiwic3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwicHJvcGVydGllcyIsImFzc2lnbkNvbnRleHQiLCJtb3VzZURvd25IYW5kbGVyIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Nb3VzZURvd24iLCJvbkRvdWJsZUNsaWNrIiwiQ2xhc3MiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxRQUFRRCxRQUFRLFVBQVIsQ0FBZDtBQUFBLElBQ01FLFVBQVVGLFFBQVEsWUFBUixDQURoQjs7QUFHQSxJQUFNRyxpQkFBaUIsRUFBdkI7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QUFpQjtBQUNmakQ7QUFEZSxPQUFqQjtBQUdEOzs7a0NBRWFDLFUsRUFBWTtBQUN4QixXQUFLZ0QsV0FBTCxDQUFpQjtBQUNmaEQ7QUFEZSxPQUFqQjtBQUdEOzs7c0NBRWlCO0FBQ2hCLFVBQU1XLFVBQVUsSUFBaEI7QUFBQSxVQUNNWixZQUFZLElBRGxCO0FBQUEsVUFFTUMsYUFBYSxJQUZuQjs7QUFJQSxXQUFLaUQsUUFBTCxDQUFjO0FBQ1p0Qyx3QkFEWTtBQUVaWiw0QkFGWTtBQUdaQztBQUhZLE9BQWQ7QUFLRDs7OytCQUVVa0QsVSxFQUFZO0FBQ3JCLFdBQUtDLGFBQUw7O0FBRUEsVUFBTUMsbUJBQW1CLEtBQUtBLGdCQUFMLENBQXNCaEQsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBekI7QUFBQSxVQUNNaUQscUJBQXFCLEtBQUtBLGtCQUFMLENBQXdCakQsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FEM0I7O0FBR0EsV0FBS2tELFdBQUwsQ0FBaUJGLGdCQUFqQjtBQUNBLFdBQUtHLGFBQUwsQ0FBbUJGLGtCQUFuQjtBQUNEOzs7bUNBRXFCRyxLLEVBQU9OLFUsRUFBWTtBQUNqQyxVQUFFekUsUUFBRixHQUFleUUsVUFBZixDQUFFekUsUUFBRjtBQUFBLFVBQ0FGLGNBREEsR0FDaUJiLE1BQU0rRixjQUFOLENBQXFCRCxLQUFyQixFQUE0Qk4sVUFBNUIsRUFBd0N6RSxRQUF4QyxDQURqQjs7O0FBR04sYUFBT0YsY0FBUDtBQUNEOzs7O0VBM1IwQmIsSzs7QUE4UjdCZ0csT0FBT0MsTUFBUCxDQUFjeEYsY0FBZCxFQUE4QjtBQUM1QnlGLFdBQVMsSUFEbUI7QUFFNUJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRlM7QUFLNUJDLHFCQUFtQixDQUNqQixVQURpQjtBQUxTLENBQTlCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCOUYsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gRWxlbWVudCxcbiAgICAgIHsgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSB0aGlzLmV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCk7XG5cbiAgICB0aGlzLnNldExlZnRPZmZzZXQobGVmdE9mZnNldCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGtleURvd25IYW5kbGVyID0gdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgXG4gICAgICB0aGlzLm9uS2V5RG93bihrZXlEb3duSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICB0aGlzLm9mZktleURvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cbiAgICAgIFxuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3AsXG4gICAgICBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdGltZW91dDtcbiAgfVxuXG4gIGdldFRvcE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRvcE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdG9wT2Zmc2V0O1xuICB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKHByb3BlcnRpZXMpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcblxuICAgIGNvbnN0IG1vdXNlRG93bkhhbmRsZXIgPSB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlcik7XG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGV4cGxvcmVyKTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaScsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZHJhZ2dhYmxlJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdleHBsb3JlcidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iXX0=