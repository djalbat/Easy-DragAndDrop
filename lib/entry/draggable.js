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

      var directoryNameDraggableEntry = this.isDirectoryNameDraggableEntry();

      if (directoryNameDraggableEntry) {
        var _directoryNameDraggableEntry = this,
            ///
        directoryNameDraggableEntryTopmost = _directoryNameDraggableEntry.isTopmost();

        if (directoryNameDraggableEntryTopmost) {
          topmostDirectoryNameDraggableEntry = true;
        }
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwid2luZG93IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsInR5cGUiLCJzZXRJbml0aWFsU3RhdGUiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VPdmVyIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QiLCJpc1RvcG1vc3QiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsInNldFRvcE9mZnNldCIsInNldExlZnRPZmZzZXQiLCJrZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbktleURvd24iLCJhZGRDbGFzcyIsImRyYWciLCJvZmZLZXlEb3duIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZUJ1dHRvbiIsInRpbWVvdXQiLCJnZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0VGltZW91dCIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInN1YkVudHJ5Iiwibm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50IiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0Iiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZVVwIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJwcm9wZXJ0aWVzIiwiYXNzaWduQ29udGV4dCIsIm1vdXNlRG93bkhhbmRsZXIiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbk1vdXNlRG93biIsIm9uRG91YmxlQ2xpY2siLCJDbGFzcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1h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QixJQUE3QixDQUQzQjs7QUFHQSxXQUFLa0QsV0FBTCxDQUFpQkYsZ0JBQWpCO0FBQ0EsV0FBS0csYUFBTCxDQUFtQkYsa0JBQW5CO0FBQ0Q7OzttQ0FFcUJHLEssRUFBT04sVSxFQUFZbEYsSSxFQUE2QjtBQUFBLHdDQUFwQnlGLGtCQUFvQjtBQUFwQkEsMEJBQW9CO0FBQUE7O0FBQ3BFLFVBQU1yRixpQkFBaUJmLE1BQU1xRyxjQUFOLGVBQXFCRixLQUFyQixFQUE0Qk4sVUFBNUIsRUFBd0NsRixJQUF4QyxTQUFpRHlGLGtCQUFqRCxFQUF2Qjs7QUFFQSxhQUFPckYsY0FBUDtBQUNEOzs7O0VBaFQwQmYsSzs7QUFtVDdCc0csT0FBT0MsTUFBUCxDQUFjOUYsY0FBZCxFQUE4QjtBQUM1QitGLFdBQVMsSUFEbUI7QUFFNUJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRlM7QUFLNUJDLHFCQUFtQixDQUNqQixVQURpQjtBQUxTLENBQTlCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCcEcsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gRWxlbWVudCxcbiAgICAgIHsgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSBleHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICB0aGlzLm9mZktleURvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IGV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICBleHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wLFxuICAgICAgbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRpbWVvdXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRpbWVvdXQ7XG4gIH1cblxuICBnZXRUb3BPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRvcE9mZnNldDtcbiAgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBsZWZ0T2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBsZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IEVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkcmFnZ2FibGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==