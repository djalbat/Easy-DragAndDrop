"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _necessary = require("necessary");

var _toggle = _interopRequireDefault(require("../../button/toggle"));

var _draggable = _interopRequireDefault(require("../../entry/draggable"));

var _directory = _interopRequireDefault(require("../../button/name/directory"));

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var DirectoryNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(DirectoryNameDraggableEntry);

  function DirectoryNameDraggableEntry() {
    var _this;

    _classCallCheck(this, DirectoryNameDraggableEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "type", _types.DIRECTORY_NAME_TYPE);

    return _this;
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: "getCollapsedBounds",
    ///
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();
      this.collapse();

      var bounds = _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "getBounds", this).call(this),
          collapsedBounds = bounds; ///


      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: "getDirectoryNameButton",
    value: function getDirectoryNameButton() {
      var DirectoryNameButton = this.constructor.DirectoryNameButton;
      return DirectoryNameButton;
    }
  }, {
    key: "getToggleButton",
    value: function getToggleButton() {
      var ToggleButton = this.constructor.ToggleButton;
      return ToggleButton;
    }
  }, {
    key: "isMarked",
    value: function isMarked() {
      var markerEntryPresent = this.isMarkerEntryPresent(),
          marked = markerEntryPresent; ///

      return marked;
    }
  }, {
    key: "isBefore",
    value: function isBefore(entry) {
      var before;
      var entryType = entry.getType();

      switch (entryType) {
        case _types.FILE_NAME_TYPE:
        case _types.FILE_NAME_MARKER_TYPE:
        case _types.DIRECTORY_NAME_MARKER_TYPE:
          before = true;
          break;

        case _types.DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              entryName = entry.getName();
          before = name.localeCompare(entryName) < 0;
          break;
      }

      return before;
    }
  }, {
    key: "isTopmost",
    value: function isTopmost() {
      var path = this.getPath(),
          pathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(path),
          topmost = pathWithoutTopmostDirectoryName === null;
      return topmost;
    }
  }, {
    key: "isFileNameDraggableEntry",
    value: function isFileNameDraggableEntry() {
      return false;
    }
  }, {
    key: "isDirectoryNameDraggableEntry",
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: "isOverlappingDraggableEntry",
    value: function isOverlappingDraggableEntry(draggableEntry) {
      var overlappingDraggableEntry;

      if (this === draggableEntry) {
        overlappingDraggableEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingDraggableEntry = false;
        } else {
          var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "isOverlappingCollapsedBounds", this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: "toggleButtonClickHandler",
    value: function toggleButtonClickHandler() {
      this.toggle();
    }
  }, {
    key: "doubleClickHandler",
    value: function doubleClickHandler() {
      this.toggle();
    }
  }, {
    key: "setCollapsed",
    value: function setCollapsed(collapsed) {
      collapsed ? this.collapse() : this.expand();
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.collapseEntries();
      this.collapseToggleButton();
    }
  }, {
    key: "expand",
    value: function expand() {
      this.expandEntries();
      this.expandToggleButton();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var collapsed = this.isCollapsed();
      collapsed = !collapsed;
      this.setCollapsed(collapsed);
    }
  }, {
    key: "childElements",
    value: function childElements() {
      var _this$properties = this.properties,
          name = _this$properties.name,
          explorer = _this$properties.explorer,
          directoryName = name,
          Entries = explorer.getEntries(),
          ToggleButton = this.getToggleButton(),
          DirectoryNameButton = this.getDirectoryNameButton(),
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);
      return [/*#__PURE__*/React.createElement(ToggleButton, {
        onClick: toggleButtonClickHandler
      }), /*#__PURE__*/React.createElement(DirectoryNameButton, null, directoryName), /*#__PURE__*/React.createElement(Entries, {
        explorer: explorer
      })];
    }
  }, {
    key: "initialise",
    value: function initialise() {
      _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "initialise", this).call(this);

      var _this$properties$coll = this.properties.collapsed,
          collapsed = _this$properties$coll === void 0 ? false : _this$properties$coll;
      this.setCollapsed(collapsed);
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var directoryNameDraggableEntry = _draggable["default"].fromClass(Class, properties);

      directoryNameDraggableEntry.initialise();
      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(_draggable["default"]);

exports["default"] = DirectoryNameDraggableEntry;

_defineProperty(DirectoryNameDraggableEntry, "ToggleButton", _toggle["default"]);

_defineProperty(DirectoryNameDraggableEntry, "DirectoryNameButton", _directory["default"]);

_defineProperty(DirectoryNameDraggableEntry, "defaultProperties", {
  className: "directory-name"
});

_defineProperty(DirectoryNameDraggableEntry, "ignoredProperties", ["collapsed"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZXhwYW5kIiwiRGlyZWN0b3J5TmFtZUJ1dHRvbiIsImNvbnN0cnVjdG9yIiwiVG9nZ2xlQnV0dG9uIiwibWFya2VyRW50cnlQcmVzZW50IiwiaXNNYXJrZXJFbnRyeVByZXNlbnQiLCJtYXJrZWQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwicGF0aCIsImdldFBhdGgiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsInRvZ2dsZSIsImNvbGxhcHNlRW50cmllcyIsImNvbGxhcHNlVG9nZ2xlQnV0dG9uIiwiZXhwYW5kRW50cmllcyIsImV4cGFuZFRvZ2dsZUJ1dHRvbiIsInNldENvbGxhcHNlZCIsInByb3BlcnRpZXMiLCJleHBsb3JlciIsImRpcmVjdG9yeU5hbWUiLCJFbnRyaWVzIiwiZ2V0RW50cmllcyIsImdldFRvZ2dsZUJ1dHRvbiIsImdldERpcmVjdG9yeU5hbWVCdXR0b24iLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwiQ2xhc3MiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLHVDLEdBQTRDQyx3QixDQUE1Q0QsdUM7O0lBRWFFLDJCOzs7Ozs7Ozs7Ozs7Ozs7OzJEQUNaQywwQjs7Ozs7OztBQUFxQjt5Q0FFUDtBQUNuQixVQUFNQyxTQUFTLEdBQUcsS0FBS0MsV0FBTCxFQUFsQjtBQUVBLFdBQUtDLFFBQUw7O0FBRUEsVUFBTUMsTUFBTSw2RkFBWjtBQUFBLFVBQ01DLGVBQWUsR0FBR0QsTUFEeEIsQ0FMbUIsQ0FNYzs7O0FBRWpDLFVBQUksQ0FBQ0gsU0FBTCxFQUFnQjtBQUNkLGFBQUtLLE1BQUw7QUFDRDs7QUFFRCxhQUFPRCxlQUFQO0FBQ0Q7Ozs2Q0FFd0I7QUFBQSxVQUNmRSxtQkFEZSxHQUNTLEtBQUtDLFdBRGQsQ0FDZkQsbUJBRGU7QUFHdkIsYUFBT0EsbUJBQVA7QUFDRDs7O3NDQUVpQjtBQUFBLFVBQ1JFLFlBRFEsR0FDUyxLQUFLRCxXQURkLENBQ1JDLFlBRFE7QUFHaEIsYUFBT0EsWUFBUDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNQyxrQkFBa0IsR0FBRyxLQUFLQyxvQkFBTCxFQUEzQjtBQUFBLFVBQ01DLE1BQU0sR0FBR0Ysa0JBRGYsQ0FEUyxDQUUyQjs7QUFFcEMsYUFBT0UsTUFBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLE1BQUo7QUFFQSxVQUFNQyxTQUFTLEdBQUdGLEtBQUssQ0FBQ0csT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS0UscUJBQUw7QUFDQSxhQUFLQyw0QkFBTDtBQUNBLGFBQUtDLGlDQUFMO0FBQ0VMLFVB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LEtBQXpCLEVBQWdDVCxVQUFoQyxDQUFwQzs7QUFFQVUsTUFBQUEsMkJBQTJCLENBQUNHLFVBQTVCO0FBRUEsYUFBT0gsMkJBQVA7QUFDRDs7OztFQWhMc0RDLHFCOzs7O2dCQUFwQ25ELDJCLGtCQThKR1Usa0I7O2dCQTlKSFYsMkIseUJBZ0tVUSxxQjs7Z0JBaEtWUiwyQix1QkFrS1E7QUFDekJzRCxFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztnQkFsS1J0RCwyQix1QkFzS1EsQ0FDekIsV0FEeUIsQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgVG9nZ2xlQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vdG9nZ2xlXCI7XG5pbXBvcnQgRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4uLy4uL2VudHJ5L2RyYWdnYWJsZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lL2RpcmVjdG9yeVwiO1xuXG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCB7IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICB0eXBlID0gRElSRUNUT1JZX05BTUVfVFlQRTsgLy8vXG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVCdXR0b247XG4gIH1cblxuICBnZXRUb2dnbGVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBUb2dnbGVCdXR0b24gfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gVG9nZ2xlQnV0dG9uO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudCgpLFxuICAgICAgICAgIG1hcmtlZCA9IG1hcmtlckVudHJ5UHJlc2VudDsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc1RvcG1vc3QoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aCgpLFxuICAgICAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCksXG4gICAgICAgICAgdG9wbW9zdCA9IChwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTtcblxuICAgIHJldHVybiB0b3Btb3N0O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5jb2xsYXBzZUVudHJpZXMoKTtcblxuICAgIHRoaXMuY29sbGFwc2VUb2dnbGVCdXR0b24oKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLmV4cGFuZEVudHJpZXMoKTtcblxuICAgIHRoaXMuZXhwYW5kVG9nZ2xlQnV0dG9uKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgbGV0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIGNvbGxhcHNlZCA9ICFjb2xsYXBzZWQ7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cygpIHtcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXMsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IG5hbWUsIC8vL1xuICAgICAgICAgIEVudHJpZXMgPSBleHBsb3Jlci5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgVG9nZ2xlQnV0dG9uID0gdGhpcy5nZXRUb2dnbGVCdXR0b24oKSxcbiAgICAgICAgICBEaXJlY3RvcnlOYW1lQnV0dG9uID0gdGhpcy5nZXREaXJlY3RvcnlOYW1lQnV0dG9uKCksXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25DbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoW1xuXG4gICAgICA8VG9nZ2xlQnV0dG9uIG9uQ2xpY2s9e3RvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcn0gLz4sXG4gICAgICA8RGlyZWN0b3J5TmFtZUJ1dHRvbj57ZGlyZWN0b3J5TmFtZX08L0RpcmVjdG9yeU5hbWVCdXR0b24+LFxuICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgXSk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuXG4gICAgY29uc3QgeyBjb2xsYXBzZWQgPSBmYWxzZSB9ID0gdGhpcy5wcm9wZXJ0aWVzO1xuXG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgfVxuXG4gIHN0YXRpYyBUb2dnbGVCdXR0b24gPSBUb2dnbGVCdXR0b247XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVCdXR0b24gPSBEaXJlY3RvcnlOYW1lQnV0dG9uO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZGlyZWN0b3J5LW5hbWVcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcImNvbGxhcHNlZFwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcyk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZSgpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuIl19