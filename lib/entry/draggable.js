"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

var _entry = _interopRequireDefault(require("../entry"));

var _options = _interopRequireDefault(require("../options"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  .dragging {\n    position: fixed;\n    z-index: 10000;\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LEFT_MOUSE_BUTTON = _easy.constants.LEFT_MOUSE_BUTTON,
    NO_DRAGGING_SUB_ENTRIES = _options["default"].NO_DRAGGING_SUB_ENTRIES,
    ESCAPE_KEY_STOPS_DRAGGING = _options["default"].ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = /*#__PURE__*/function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry() {
    _classCallCheck(this, DraggableEntry);

    return _possibleConstructorReturn(this, _getPrototypeOf(DraggableEntry).apply(this, arguments));
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
    key: "getExplorer",
    value: function getExplorer() {
      var explorer = this.properties.explorer;
      return explorer;
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
      var dragging = this.hasClass("dragging");
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

      this.addClass("dragging");
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

      this.removeClass("dragging");
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
    value: function startWaitingToDrag(mouseTop, mouseLeft) {
      var _this = this;

      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          _this.resetTimeout();

          var explorer = _this.getExplorer(),
              topmostDirectoryNameDraggableEntry = _this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

          if (topmostDirectoryNameDraggableEntry) {
            return;
          }

          if (subEntry && noDraggingSubEntriesOptionPresent) {
            return;
          }

          var mouseOver = _this.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = explorer.startDragging(_this);

            if (startedDragging) {
              _this.startDragging(mouseTop, mouseLeft);
            }
          }
        }, _constants.START_DRAGGING_DELAY);
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
    value: function mouseDownHandler(event, element) {
      var button = event.button,
          pageX = event.pageX,
          pageY = event.pageY,
          mouseTop = pageY,
          mouseLeft = pageX;

      _easy.window.on("blur", this.mouseUpHandler, this); ///


      _easy.window.onMouseUp(this.mouseUpHandler, this);

      _easy.window.onMouseMove(this.mouseMoveHandler, this);

      if (button === LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler(event, element) {
      var _this2 = this;

      _easy.window.off("blur", this.mouseUpHandler, this); ///


      _easy.window.offMouseUp(this.mouseUpHandler, this);

      _easy.window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var explorer = this.getExplorer(),
            draggableEntry = this; ///

        explorer.stopDragging(draggableEntry, function () {
          _this2.stopDragging();
        });
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(event, element) {
      var pageX = event.pageX,
          pageY = event.pageY,
          mouseTop = pageY,
          mouseLeft = pageX;
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(event, element) {
      var keyCode = event.keyCode,
          escapeKey = keyCode === _constants.ESCAPE_KEYCODE;

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
      var windowScrollTop = _easy.window.getScrollTop(),
          windowScrollLeft = _easy.window.getScrollLeft(),
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
    value: function initialise() {
      this.assignContext();
      var mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);
      this.onMouseDown(mouseDownHandler);
      this.onDoubleClick(doubleClickHandler);
      this.setInitialState();
    }
  }]);

  return DraggableEntry;
}(_entry["default"]);

_defineProperty(DraggableEntry, "tagName", "li");

_defineProperty(DraggableEntry, "defaultProperties", {
  className: "draggable"
});

_defineProperty(DraggableEntry, "ignoredProperties", ["explorer"]);

var _default = (0, _easyWithStyle["default"])(DraggableEntry)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWdnYWJsZS5qcyJdLCJuYW1lcyI6WyJMRUZUX01PVVNFX0JVVFRPTiIsImNvbnN0YW50cyIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwib3B0aW9ucyIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJEcmFnZ2FibGVFbnRyeSIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyeSIsInBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInByb3BlcnRpZXMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VPdmVyIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QiLCJpc1RvcG1vc3QiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsInNldFRvcE9mZnNldCIsInNldExlZnRPZmZzZXQiLCJrZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbktleURvd24iLCJhZGRDbGFzcyIsImRyYWciLCJvZmZLZXlEb3duIiwicmVtb3ZlQ2xhc3MiLCJ0aW1lb3V0IiwiZ2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJyZXNldFRpbWVvdXQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiY2xlYXJUaW1lb3V0IiwiZXZlbnQiLCJlbGVtZW50IiwiYnV0dG9uIiwicGFnZVgiLCJwYWdlWSIsIndpbmRvdyIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmIiwib2ZmTW91c2VVcCIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwia2V5Q29kZSIsImVzY2FwZUtleSIsIkVTQ0FQRV9LRVlDT0RFIiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwic3RhdGUiLCJnZXRTdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJhc3NpZ25Db250ZXh0IiwibW91c2VEb3duSGFuZGxlciIsImRvdWJsZUNsaWNrSGFuZGxlciIsIm9uTW91c2VEb3duIiwib25Eb3VibGVDbGljayIsInNldEluaXRpYWxTdGF0ZSIsIkVudHJ5IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFFQSxpQkFBRixHQUF3QkMsZUFBeEIsQ0FBRUQsaUJBQUY7QUFBQSxJQUNFRSx1QkFERixHQUN5REMsbUJB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Qzs7Z0JBelR2QmhHLGMsdUJBNlR1QixDQUN6QixVQUR5QixDOztlQUtkLCtCQUFVQSxjQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgd2luZG93LCBjb25zdGFudHMgfSBmcm9tIFwiZWFzeVwiO1xuXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4uL2VudHJ5XCI7XG5pbXBvcnQgb3B0aW9ucyBmcm9tIFwiLi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQgeyBFU0NBUEVfS0VZQ09ERSwgU1RBUlRfRFJBR0dJTkdfREVMQVkgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IHsgTEVGVF9NT1VTRV9CVVRUT04gfSA9IGNvbnN0YW50cyxcbiAgICAgIHsgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSBleHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHRoaXMucHJvcGVydGllcztcblxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKFwiZHJhZ2dpbmdcIik7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gICAgdGhpcy5zZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgdGhpcy5vZmZLZXlEb3duKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImRyYWdnaW5nXCIpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGJ1dHRvbiwgcGFnZVgsIHBhZ2VZIH0gPSBldmVudCxcbiAgICAgICAgICBtb3VzZVRvcCA9IHBhZ2VZLFxuICAgICAgICAgIG1vdXNlTGVmdCA9IHBhZ2VYO1xuXG4gICAgd2luZG93Lm9uKFwiYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgICB3aW5kb3cub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBpZiAoYnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIHdpbmRvdy5vZmYoXCJibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgICB3aW5kb3cub2ZmTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIGV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LFxuICAgICAgICAgIG1vdXNlVG9wID0gcGFnZVksXG4gICAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVg7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudCxcbiAgICAgICAgICBlc2NhcGVLZXkgPSAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpO1xuXG4gICAgaWYgKGVzY2FwZUtleSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIGV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIGxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDsgLy8vXG4gICAgbGVmdCA9IGAke2xlZnR9cHhgOyAvLy9cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcCxcbiAgICAgIGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHJlc2V0VGltZW91dCgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gIH1cbiAgXG4gIGdldFRpbWVvdXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0aW1lb3V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB0aW1lb3V0O1xuICB9XG5cbiAgZ2V0VG9wT2Zmc2V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdG9wT2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB0b3BPZmZzZXQ7XG4gIH1cblxuICBnZXRMZWZ0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgbGVmdE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gbGVmdE9mZnNldDtcbiAgfVxuXG4gIHNldFRpbWVvdXQodGltZW91dCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdGltZW91dFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdG9wT2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBudWxsLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZW91dCxcbiAgICAgIHRvcE9mZnNldCxcbiAgICAgIGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJsaVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZHJhZ2dhYmxlXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJleHBsb3JlclwiXG4gIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShEcmFnZ2FibGVFbnRyeSlgXG5cbiAgLmRyYWdnaW5nIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gIH1cblxuYDtcbiJdfQ==