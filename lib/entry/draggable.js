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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LEFT_MOUSE_BUTTON = _easy.constants.LEFT_MOUSE_BUTTON,
    NO_DRAGGING_SUB_ENTRIES = _options["default"].NO_DRAGGING_SUB_ENTRIES,
    ESCAPE_KEY_STOPS_DRAGGING = _options["default"].ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = /*#__PURE__*/function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  var _super = _createSuper(DraggableEntry);

  function DraggableEntry() {
    _classCallCheck(this, DraggableEntry);

    return _super.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWdnYWJsZS5qcyJdLCJuYW1lcyI6WyJMRUZUX01PVVNFX0JVVFRPTiIsImNvbnN0YW50cyIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwib3B0aW9ucyIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJEcmFnZ2FibGVFbnRyeSIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyeSIsInBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInByb3BlcnRpZXMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VPdmVyIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QiLCJpc1RvcG1vc3QiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsInNldFRvcE9mZnNldCIsInNldExlZnRPZmZzZXQiLCJrZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbktleURvd24iLCJhZGRDbGFzcyIsImRyYWciLCJvZmZLZXlEb3duIiwicmVtb3ZlQ2xhc3MiLCJ0aW1lb3V0IiwiZ2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJyZXNldFRpbWVvdXQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiY2xlYXJUaW1lb3V0IiwiZXZlbnQiLCJlbGVtZW50IiwiYnV0dG9uIiwicGFnZVgiLCJwYWdlWSIsIndpbmRvdyIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmIiwib2ZmTW91c2VVcCIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwia2V5Q29kZSIsImVzY2FwZUtleSIsIkVTQ0FQRV9LRVlDT0RFIiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwic3RhdGUiLCJnZXRTdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJhc3NpZ25Db250ZXh0IiwibW91c2VEb3duSGFuZGxlciIsImRvdWJsZUNsaWNrSGFuZGxlciIsIm9uTW91c2VEb3duIiwib25Eb3VibGVDbGljayIsInNldEluaXRpYWxTdGF0ZSIsIkVudHJ5IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFFQSxpQkFBRixHQUF3QkMsZUFBeEIsQ0FBRUQsaUJB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dUI7QUFDekJnRyxFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztnQkF6VHZCaEcsYyx1QkE2VHVCLENBQ3pCLFVBRHlCLEM7O2VBS2QsK0JBQVVBLGNBQVYsQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyB3aW5kb3csIGNvbnN0YW50cyB9IGZyb20gXCJlYXN5XCI7XG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBvcHRpb25zIGZyb20gXCIuLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7IEVTQ0FQRV9LRVlDT0RFLCBTVEFSVF9EUkFHR0lOR19ERUxBWSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gY29uc3RhbnRzLFxuICAgICAgeyBOT19EUkFHR0lOR19TVUJfRU5UUklFUywgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IGV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gdGhpcy5wcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcblxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCk7XG5cbiAgICB0aGlzLnNldExlZnRPZmZzZXQobGVmdE9mZnNldCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGtleURvd25IYW5kbGVyID0gdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgXG4gICAgICB0aGlzLm9uS2V5RG93bihrZXlEb3duSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICB0aGlzLm9mZktleURvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiZHJhZ2dpbmdcIik7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSBleHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgICAgXG4gICAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsgYnV0dG9uLCBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LFxuICAgICAgICAgIG1vdXNlVG9wID0gcGFnZVksXG4gICAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVg7XG5cbiAgICB3aW5kb3cub24oXCJibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cblxuICAgIHdpbmRvdy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGlmIChidXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgd2luZG93Lm9mZihcImJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cblxuICAgIHdpbmRvdy5vZmZNb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cbiAgICAgIFxuICAgICAgZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnQsXG4gICAgICAgICAgbW91c2VUb3AgPSBwYWdlWSxcbiAgICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWDtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IGV2ZW50LFxuICAgICAgICAgIGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wLFxuICAgICAgbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRpbWVvdXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRpbWVvdXQ7XG4gIH1cblxuICBnZXRUb3BPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRvcE9mZnNldDtcbiAgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBsZWZ0T2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBsZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcblxuICAgIGNvbnN0IG1vdXNlRG93bkhhbmRsZXIgPSB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlcik7XG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG5cbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImxpXCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkcmFnZ2FibGVcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcImV4cGxvcmVyXCJcbiAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKERyYWdnYWJsZUVudHJ5KWBcblxuICAuZHJhZ2dpbmcge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDAwMDtcbiAgfVxuXG5gO1xuIl19