'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

var DraggableEntry = /*#__PURE__*/function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry(selector, type) {
    var _this;

    _classCallCheck(this, DraggableEntry);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DraggableEntry).call(this, selector, type));

    _this.setInitialState();

    return _this;
  }

  _createClass(DraggableEntry, [{
    key: "getPath",
    value: function getPath() {
      var explorer = this.getExplorer(),
          draggableEntry = this,
          ///
      path = explorer.retrieveDraggableEntryPath(draggableEntry);
      return path;
    }
  }, {
    key: "getCollapsedBounds",
    value: function getCollapsedBounds() {
      var bounds = this.getBounds(),
          collapsedBounds = bounds; ///

      return collapsedBounds;
    }
  }, {
    key: "isDragging",
    value: function isDragging() {
      var dragging = this.hasClass('dragging');
      return dragging;
    }
  }, {
    key: "isMouseOver",
    value: function isMouseOver(mouseTop, mouseLeft) {
      var collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;
      return mouseOver;
    }
  }, {
    key: "isOverlappingCollapsedBounds",
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);
      return overlappingCollapsedBounds;
    }
  }, {
    key: "isTopmostDirectoryNameDraggableEntry",
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
    key: "startDragging",
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
    key: "stopDragging",
    value: function stopDragging() {
      var explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDraggingOptionPresent) {
        this.offKeyDown();
      }

      this.removeClass('dragging');
    }
  }, {
    key: "dragging",
    value: function dragging(mouseTop, mouseLeft) {
      var explorer = this.getExplorer();
      this.drag(mouseTop, mouseLeft);
      explorer.dragging(this);
    }
  }, {
    key: "startWaitingToDrag",
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
    key: "stopWaitingToDrag",
    value: function stopWaitingToDrag() {
      var timeout = this.getTimeout();

      if (timeout !== null) {
        clearTimeout(timeout);
        this.resetTimeout();
      }
    }
  }, {
    key: "mouseDownHandler",
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
    key: "mouseUpHandler",
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
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: "keyDownHandler",
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
    key: "drag",
    value: function drag(mouseTop, mouseLeft) {
      var windowScrollTop = window.getScrollTop(),
          windowScrollLeft = window.getScrollLeft(),
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset();
      var top = mouseTop + topOffset - windowScrollTop,
          left = mouseLeft + leftOffset - windowScrollLeft;
      top = "".concat(top, "px"); ///

      left = "".concat(left, "px"); ///

      var css = {
        top: top,
        left: left
      };
      this.css(css);
      var explorer = this.getExplorer();
      explorer.dragging(this);
    }
  }, {
    key: "resetTimeout",
    value: function resetTimeout() {
      var timeout = null;
      this.setTimeout(timeout);
    }
  }, {
    key: "getTimeout",
    value: function getTimeout() {
      var state = this.getState(),
          timeout = state.timeout;
      return timeout;
    }
  }, {
    key: "getTopOffset",
    value: function getTopOffset() {
      var state = this.getState(),
          topOffset = state.topOffset;
      return topOffset;
    }
  }, {
    key: "getLeftOffset",
    value: function getLeftOffset() {
      var state = this.getState(),
          leftOffset = state.leftOffset;
      return leftOffset;
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(timeout) {
      this.updateState({
        timeout: timeout
      });
    }
  }, {
    key: "setTopOffset",
    value: function setTopOffset(topOffset) {
      this.updateState({
        topOffset: topOffset
      });
    }
  }, {
    key: "setLeftOffset",
    value: function setLeftOffset(leftOffset) {
      this.updateState({
        leftOffset: leftOffset
      });
    }
  }, {
    key: "setInitialState",
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
    key: "initialise",
    value: function initialise(properties) {
      this.assignContext();
      var mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);
      this.onMouseDown(mouseDownHandler);
      this.onDoubleClick(doubleClickHandler);
    }
  }], [{
    key: "fromProperties",
    value: function fromProperties(Class, properties, type) {
      for (var _len = arguments.length, remainingArguments = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWdnYWJsZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVudHJ5Iiwib3B0aW9ucyIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJ3aW5kb3ciLCJFbGVtZW50IiwiTEVGVF9NT1VTRV9CVVRUT04iLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwidHlwZSIsInNldEluaXRpYWxTdGF0ZSIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyeSIsInBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsImJvdW5kcyIsImdldEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImRyYWdnaW5nIiwiaGFzQ2xhc3MiLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJtb3VzZU92ZXIiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCIsImlzVG9wbW9zdCIsImVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiYm91bmRzVG9wIiwiZ2V0VG9wIiwiYm91bmRzTGVmdCIsImdldExlZnQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0Iiwic2V0VG9wT2Zmc2V0Iiwic2V0TGVmdE9mZnNldCIsImtleURvd25IYW5kbGVyIiwiYmluZCIsIm9uS2V5RG93biIsImFkZENsYXNzIiwiZHJhZyIsIm9mZktleURvd24iLCJyZW1vdmVDbGFzcyIsIm1vdXNlQnV0dG9uIiwidGltZW91dCIsImdldFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzZXRUaW1lb3V0IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic3ViRW50cnkiLCJub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQiLCJpc01vdXNlT3ZlciIsInN0YXJ0ZWREcmFnZ2luZyIsInN0YXJ0RHJhZ2dpbmciLCJjbGVhclRpbWVvdXQiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZVVwIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiaXNEcmFnZ2luZyIsInN0YXJ0V2FpdGluZ1RvRHJhZyIsIm9mZiIsIm9mZk1vdXNlVXAiLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImtleUNvZGUiLCJlc2NhcGVLZXkiLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwiZ2V0VG9wT2Zmc2V0IiwiZ2V0TGVmdE9mZnNldCIsInRvcCIsImxlZnQiLCJjc3MiLCJzdGF0ZSIsImdldFN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJhc3NpZ25Db250ZXh0IiwibW91c2VEb3duSGFuZGxlciIsImRvdWJsZUNsaWNrSGFuZGxlciIsIm9uTW91c2VEb3duIiwib25Eb3VibGVDbGljayIsIkNsYXNzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7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QUFwQnlGLGtCQUFvQjtBQUFwQkEsUUFBQUEsa0JBQW9CO0FBQUE7O0FBQ3BFLFVBQU1yRixjQUFjLEdBQUdmLEtBQUssQ0FBQ3FHLGNBQU4sT0FBQXJHLEtBQUssR0FBZ0JtRyxLQUFoQixFQUF1Qk4sVUFBdkIsRUFBbUNsRixJQUFuQyxTQUE0Q3lGLGtCQUE1QyxFQUE1QjtBQUVBLGFBQU9yRixjQUFQO0FBQ0Q7Ozs7RUFoVDBCZixLOztBQW1UN0JzRyxNQUFNLENBQUNDLE1BQVAsQ0FBYzlGLGNBQWQsRUFBOEI7QUFDNUIrRixFQUFBQSxPQUFPLEVBQUUsSUFEbUI7QUFFNUJDLEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFETSxHQUZTO0FBSzVCQyxFQUFBQSxpQkFBaUIsRUFBRSxDQUNqQixVQURpQjtBQUxTLENBQTlCO0FBVUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBHLGNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gRWxlbWVudCxcbiAgICAgIHsgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSBleHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICB0aGlzLm9mZktleURvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IGV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICBleHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wLFxuICAgICAgbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRpbWVvdXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRpbWVvdXQ7XG4gIH1cblxuICBnZXRUb3BPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRvcE9mZnNldDtcbiAgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBsZWZ0T2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBsZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IEVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkcmFnZ2FibGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==