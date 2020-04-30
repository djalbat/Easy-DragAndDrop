"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var easy = require("easy");

var Entry = require("../entry"),
    options = require("../options");

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;
var window = easy.window,
    constants = easy.constants,
    LEFT_MOUSE_BUTTON = constants.LEFT_MOUSE_BUTTON,
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    ESCAPE_KEY_STOPS_DRAGGING = options.ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = /*#__PURE__*/function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  var _super = _createSuper(DraggableEntry);

  function DraggableEntry(selector, type) {
    var _this;

    _classCallCheck(this, DraggableEntry);

    _this = _super.call(this, selector, type);

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
    value: function mouseDownHandler(event, element) {
      var button = event.button,
          pageX = event.pageX,
          pageY = event.pageY,
          mouseTop = pageY,
          mouseLeft = pageX;
      window.on("blur", this.mouseUpHandler, this); ///

      window.onMouseUp(this.mouseUpHandler, this);
      window.onMouseMove(this.mouseMoveHandler, this);

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
      var _this3 = this;

      window.off("blur", this.mouseUpHandler, this); ///

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
          escapeKey = keyCode === ESCAPE_KEYCODE;

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
  }]);

  return DraggableEntry;
}(Entry);

Object.assign(DraggableEntry, {
  tagName: "li",
  defaultProperties: {
    className: "draggable"
  },
  ignoredProperties: ["explorer"]
});
module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWdnYWJsZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVudHJ5Iiwib3B0aW9ucyIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJ3aW5kb3ciLCJjb25zdGFudHMiLCJMRUZUX01PVVNFX0JVVFRPTiIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJ0eXBlIiwic2V0SW5pdGlhbFN0YXRlIiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsImRyYWdnYWJsZUVudHJ5IiwicGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZHJhZ2dpbmciLCJoYXNDbGFzcyIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm1vdXNlT3ZlciIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0IiwiaXNUb3Btb3N0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJzZXRUb3BPZmZzZXQiLCJzZXRMZWZ0T2Zmc2V0Iiwia2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25LZXlEb3duIiwiYWRkQ2xhc3MiLCJkcmFnIiwib2ZmS2V5RG93biIsInJlbW92ZUNsYXNzIiwidGltZW91dCIsImdldFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzZXRUaW1lb3V0IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic3ViRW50cnkiLCJub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQiLCJpc01vdXNlT3ZlciIsInN0YXJ0ZWREcmFnZ2luZyIsInN0YXJ0RHJhZ2dpbmciLCJjbGVhclRpbWVvdXQiLCJldmVudCIsImVsZW1lbnQiLCJidXR0b24iLCJwYWdlWCIsInBhZ2VZIiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZVVwIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwic3RhdGUiLCJnZXRTdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJwcm9wZXJ0aWVzIiwiYXNzaWduQ29udGV4dCIsIm1vdXNlRG93bkhhbmRsZXIiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbk1vdXNlRG93biIsIm9uRG91YmxlQ2xpY2siLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFTLEVBQVRBLFNBRlk7QUFHWkMsUUFBQUEsVUFBVSxFQUFWQTtBQUhZLE9BQWQ7QUFLRDs7OytCQUVVc0QsVSxFQUFZO0FBQ3JCLFdBQUtDLGFBQUw7QUFFQSxVQUFNQyxnQkFBZ0IsR0FBRyxLQUFLQSxnQkFBTCxDQUFzQnBELElBQXRCLENBQTJCLElBQTNCLENBQXpCO0FBQUEsVUFDTXFELGtCQUFrQixHQUFHLEtBQUtBLGtCQUFMLENBQXdCckQsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FEM0I7QUFHQSxXQUFLc0QsV0FBTCxDQUFpQkYsZ0JBQWpCO0FBQ0EsV0FBS0csYUFBTCxDQUFtQkYsa0JBQW5CO0FBQ0Q7Ozs7RUFuVDBCcEcsSzs7QUFzVDdCdUcsTUFBTSxDQUFDQyxNQUFQLENBQWMvRixjQUFkLEVBQThCO0FBQzVCZ0csRUFBQUEsT0FBTyxFQUFFLElBRG1CO0FBRTVCQyxFQUFBQSxpQkFBaUIsRUFBRTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFO0FBRE0sR0FGUztBQUs1QkMsRUFBQUEsaUJBQWlCLEVBQUUsQ0FDakIsVUFEaUI7QUFMUyxDQUE5QjtBQVVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJyRyxjQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZShcImVhc3lcIik7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZShcIi4uL2VudHJ5XCIpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoXCIuLi9vcHRpb25zXCIpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBjb25zdGFudHMgfSA9IGVhc3ksXG4gICAgICB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBjb25zdGFudHMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKFwiZHJhZ2dpbmdcIik7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IGV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBidXR0b24sIHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnQsXG4gICAgICAgICAgbW91c2VUb3AgPSBwYWdlWSxcbiAgICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWDtcblxuICAgIHdpbmRvdy5vbihcImJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKGJ1dHRvbiA9PT0gTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICB3aW5kb3cub2ZmKFwiYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICBleHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsgcGFnZVgsIHBhZ2VZIH0gPSBldmVudCxcbiAgICAgICAgICBtb3VzZVRvcCA9IHBhZ2VZLFxuICAgICAgICAgIG1vdXNlTGVmdCA9IHBhZ2VYO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQsXG4gICAgICAgICAgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICBleHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3AsXG4gICAgICBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdGltZW91dDtcbiAgfVxuXG4gIGdldFRvcE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRvcE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdG9wT2Zmc2V0O1xuICB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKHByb3BlcnRpZXMpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcblxuICAgIGNvbnN0IG1vdXNlRG93bkhhbmRsZXIgPSB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlcik7XG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiBcImxpXCIsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcImRyYWdnYWJsZVwiXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgXCJleHBsb3JlclwiXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19