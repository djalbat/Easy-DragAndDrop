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
    _classCallCheck(this, DirectoryNameDraggableEntry);

    return _super.apply(this, arguments);
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: "getCollapsedBounds",
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
    value: function childElements(properties) {
      var name = properties.name,
          explorer = properties.explorer,
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
    value: function initialise(properties) {
      _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "initialise", this).call(this, properties);

      var _properties$collapsed = properties.collapsed,
          collapsed = _properties$collapsed === void 0 ? false : _properties$collapsed;
      this.setCollapsed(collapsed);
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = _types.DIRECTORY_NAME_TYPE,
          ///
      directoryNameDraggableEntry = _draggable["default"].fromClass(Class, properties, type);

      directoryNameDraggableEntry.initialise(properties);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJEaXJlY3RvcnlOYW1lQnV0dG9uIiwiY29uc3RydWN0b3IiLCJUb2dnbGVCdXR0b24iLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJpc01hcmtlckVudHJ5UHJlc2VudCIsIm1hcmtlZCIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIkZJTEVfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwicGF0aCIsImdldFBhdGgiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsInRvZ2dsZSIsImNvbGxhcHNlRW50cmllcyIsImNvbGxhcHNlVG9nZ2xlQnV0dG9uIiwiZXhwYW5kRW50cmllcyIsImV4cGFuZFRvZ2dsZUJ1dHRvbiIsInNldENvbGxhcHNlZCIsInByb3BlcnRpZXMiLCJleHBsb3JlciIsImRpcmVjdG9yeU5hbWUiLCJFbnRyaWVzIiwiZ2V0RW50cmllcyIsImdldFRvZ2dsZUJ1dHRvbiIsImdldERpcmVjdG9yeU5hbWVCdXR0b24iLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwiQ2xhc3MiLCJ0eXBlIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiRHJhZ2dhYmxlRW50cnkiLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVRQSx1QyxHQUE0Q0Msd0IsQ0FBNUNELHVDOztJQUVhRSwyQjs7Ozs7Ozs7Ozs7Ozt5Q0FDRTtBQUNuQixVQUFNQyxTQUFTLEdBQUcsS0FBS0MsV0FBTCxFQUFsQjtBQUVBLFdBQUtDLFFBQUw7O0FBRUEsVUFBTUMsTUFBTSw2RkFBWjtBQUFBLFVBQ01DLGVBQWUsR0FBR0QsTUFEeEIsQ0FMbUIsQ0FNYzs7O0FBRWpDLFVBQUksQ0FBQ0gsU0FBTCxFQUFnQjtBQUNkLGFBQUtLLE1BQUw7QUFDRDs7QUFFRCxhQUFPRCxlQUFQO0FBQ0Q7Ozs2Q0FFd0I7QUFBQSxVQUNmRSxtQkFEZSxHQUNTLEtBQUtDLFdBRGQsQ0FDZkQsbUJBRGU7QUFHdkIsYUFBT0EsbUJBQVA7QUFDRDs7O3NDQUVpQjtBQUFBLFVBQ1JFLFlBRFEsR0FDUyxLQUFLRCxXQURkLENBQ1JDLFlBRFE7QUFHaEIsYUFBT0EsWUFBUDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNQyxrQkFBa0IsR0FBRyxLQUFLQyxvQkFBTCxFQUEzQjtBQUFBLFVBQ01DLE1BQU0sR0FBR0Ysa0JBRGYsQ0FEUyxDQUUyQjs7QUFFcEMsYUFBT0UsTUFBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLE1BQUo7QUFFQSxVQUFNQyxTQUFTLEdBQUdGLEtBQUssQ0FBQ0csT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS0UscUJBQUw7QUFDQSxhQUFLQyw0QkFBTDtBQUNBLGFBQUtDLGlDQUFMO0FBQ0VMLFVBQUFBLE1BQU0sR0FBRyxJQUFU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MEJBQWI7QUFBQSxVQUFrQztBQUM1QitCLE1BQUFBLDJCQUEyQixHQUFHQyxzQkFBZUMsU0FBZixDQUF5QkosS0FBekIsRUFBZ0NULFVBQWhDLEVBQTRDVSxJQUE1QyxDQURwQzs7QUFHQUMsTUFBQUEsMkJBQTJCLENBQUNHLFVBQTVCLENBQXVDZCxVQUF2QztBQUVBLGFBQU9XLDJCQUFQO0FBQ0Q7Ozs7RUEvS3NEQyxxQjs7OztnQkFBcENwRCwyQixrQkE0SkdTLGtCOztnQkE1SkhULDJCLHlCQThKVU8scUI7O2dCQTlKVlAsMkIsdUJBZ0tRO0FBQ3pCdUQsRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7Z0JBaEtSdkQsMkIsdUJBb0tRLENBQ3pCLFdBRHlCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IFRvZ2dsZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL3RvZ2dsZVwiO1xuaW1wb3J0IERyYWdnYWJsZUVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnZ2FibGVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vbmFtZS9kaXJlY3RvcnlcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgeyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVCdXR0b247XG4gIH1cblxuICBnZXRUb2dnbGVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBUb2dnbGVCdXR0b24gfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gVG9nZ2xlQnV0dG9uO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudCgpLFxuICAgICAgICAgIG1hcmtlZCA9IG1hcmtlckVudHJ5UHJlc2VudDsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc1RvcG1vc3QoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aCgpLFxuICAgICAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCksXG4gICAgICAgICAgdG9wbW9zdCA9IChwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTtcblxuICAgIHJldHVybiB0b3Btb3N0O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5jb2xsYXBzZUVudHJpZXMoKTtcblxuICAgIHRoaXMuY29sbGFwc2VUb2dnbGVCdXR0b24oKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLmV4cGFuZEVudHJpZXMoKTtcblxuICAgIHRoaXMuZXhwYW5kVG9nZ2xlQnV0dG9uKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgbGV0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIGNvbGxhcHNlZCA9ICFjb2xsYXBzZWQ7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gbmFtZSwgLy8vXG4gICAgICAgICAgRW50cmllcyA9IGV4cGxvcmVyLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBUb2dnbGVCdXR0b24gPSB0aGlzLmdldFRvZ2dsZUJ1dHRvbigpLFxuICAgICAgICAgIERpcmVjdG9yeU5hbWVCdXR0b24gPSB0aGlzLmdldERpcmVjdG9yeU5hbWVCdXR0b24oKSxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxUb2dnbGVCdXR0b24gb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPixcbiAgICAgIDxEaXJlY3RvcnlOYW1lQnV0dG9uPntkaXJlY3RvcnlOYW1lfTwvRGlyZWN0b3J5TmFtZUJ1dHRvbj4sXG4gICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICBdKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgc3VwZXIuaW5pdGlhbGlzZShwcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHByb3BlcnRpZXM7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG5cbiAgc3RhdGljIFRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbjtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZUJ1dHRvbiA9IERpcmVjdG9yeU5hbWVCdXR0b247XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnktbmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiY29sbGFwc2VkXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEUsIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShwcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cbiJdfQ==