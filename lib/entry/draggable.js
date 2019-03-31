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
      var explorer = this.getExplorer(),
          draggableEntry = this,
          ///
      path = explorer.retrieveDraggableEntryPath(draggableEntry);

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
      var explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
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
      var explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDraggingOptionPresent) {
        this.offKeyDown();
      }

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      var explorer = this.getExplorer();

      this.drag(mouseTop, mouseLeft);

      explorer.dragging(this);
    }
  }, {
    key: 'startWaitingToDrag',
    value: function startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
      var _this2 = this;

      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          _this2.resetTimeout();

          var explorer = _this2.getExplorer(),
              topmostDirectoryNameDraggableEntry = _this2.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

          if (topmostDirectoryNameDraggableEntry) {
            return;
          }

          if (subEntry && noDraggingSubEntriesOptionPresent) {
            return;
          }

          var mouseOver = _this2.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = explorer.startDragging(_this2);

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
        var explorer = this.getExplorer(),
            draggableEntry = this; ///

        explorer.stopDragging(draggableEntry, function () {
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
          var explorer = this.getExplorer();

          explorer.escapeDragging();

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

      var explorer = this.getExplorer();

      explorer.dragging(this);
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
    value: function fromProperties(Class, properties, type) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var draggableEntry = Entry.fromProperties.apply(Entry, [Class, properties, type].concat(remainingArguments));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwid2luZG93IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsInR5cGUiLCJzZXRJbml0aWFsU3RhdGUiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VPdmVyIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsInNldFRvcE9mZnNldCIsInNldExlZnRPZmZzZXQiLCJrZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbktleURvd24iLCJhZGRDbGFzcyIsImRyYWciLCJvZmZLZXlEb3duIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZUJ1dHRvbiIsInRpbWVvdXQiLCJnZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0VGltZW91dCIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInN1YkVudHJ5Iiwibm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50IiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0Iiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZVVwIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJwcm9wZXJ0aWVzIiwiYXNzaWduQ29udGV4dCIsIm1vdXNlRG93bkhhbmRsZXIiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbk1vdXNlRG93biIsIm9uRG91YmxlQ2xpY2siLCJDbGFzcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLFFBQVFELFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUUsVUFBVUYsUUFBUSxZ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QyxNQUFQLENBQWMxRixjQUFkLEVBQThCO0FBQzVCMkYsV0FBUyxJQURtQjtBQUU1QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGUztBQUs1QkMscUJBQW1CLENBQ2pCLFVBRGlCO0FBTFMsQ0FBOUI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUJoRyxjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBFbGVtZW50LFxuICAgICAgeyBOT19EUkFHR0lOR19TVUJfRU5UUklFUywgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUpO1xuXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IGV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gICAgdGhpcy5zZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgICB3aW5kb3cub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgICB3aW5kb3cub2ZmTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIGV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihrZXlDb2RlKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICBleHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3AsXG4gICAgICBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdGltZW91dDtcbiAgfVxuXG4gIGdldFRvcE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRvcE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdG9wT2Zmc2V0O1xuICB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKHByb3BlcnRpZXMpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcblxuICAgIGNvbnN0IG1vdXNlRG93bkhhbmRsZXIgPSB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlcik7XG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RyYWdnYWJsZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnZXhwbG9yZXInXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19