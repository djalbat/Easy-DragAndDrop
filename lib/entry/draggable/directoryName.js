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

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var DirectoryNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DirectoryNameDraggableEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DirectoryNameDraggableEntry)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
      return [React.createElement(ToggleButton, {
        onClick: toggleButtonClickHandler
      }), React.createElement(DirectoryNameButton, null, directoryName), React.createElement(Entries, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZXhwYW5kIiwiRGlyZWN0b3J5TmFtZUJ1dHRvbiIsImNvbnN0cnVjdG9yIiwiVG9nZ2xlQnV0dG9uIiwibWFya2VyRW50cnlQcmVzZW50IiwiaXNNYXJrZXJFbnRyeVByZXNlbnQiLCJtYXJrZWQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwicGF0aCIsImdldFBhdGgiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsInRvZ2dsZSIsImNvbGxhcHNlRW50cmllcyIsImNvbGxhcHNlVG9nZ2xlQnV0dG9uIiwiZXhwYW5kRW50cmllcyIsImV4cGFuZFRvZ2dsZUJ1dHRvbiIsInNldENvbGxhcHNlZCIsInByb3BlcnRpZXMiLCJleHBsb3JlciIsImRpcmVjdG9yeU5hbWUiLCJFbnRyaWVzIiwiZ2V0RW50cmllcyIsImdldFRvZ2dsZUJ1dHRvbiIsImdldERpcmVjdG9yeU5hbWVCdXR0b24iLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwiQ2xhc3MiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFUUEsdUMsR0FBNENDLHdCLENBQTVDRCx1Qzs7SUFFYUUsMkI7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBQ1pDLDBCOzs7Ozs7O0FBQXFCO3lDQUVQO0FBQ25CLFVBQU1DLFNBQVMsR0FBRyxLQUFLQyxXQUFMLEVBQWxCO0FBRUEsV0FBS0MsUUFBTDs7QUFFQSxVQUFNQyxNQUFNLDZGQUFaO0FBQUEsVUFDTUMsZUFBZSxHQUFHRCxNQUR4QixDQUxtQixDQU1jOzs7QUFFakMsVUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ2QsYUFBS0ssTUFBTDtBQUNEOztBQUVELGFBQU9ELGVBQVA7QUFDRDs7OzZDQUV3QjtBQUFBLFVBQ2ZFLG1CQURlLEdBQ1MsS0FBS0MsV0FEZCxDQUNmRCxtQkFEZTtBQUd2QixhQUFPQSxtQkFBUDtBQUNEOzs7c0NBRWlCO0FBQUEsVUFDUkUsWUFEUSxHQUNTLEtBQUtELFdBRGQsQ0FDUkMsWUFEUTtBQUdoQixhQUFPQSxZQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1DLGtCQUFrQixHQUFHLEtBQUtDLG9CQUFMLEVBQTNCO0FBQUEsVUFDTUMsTUFBTSxHQUFHRixrQkFEZixDQURTLENBRTJCOztBQUVwQyxhQUFPRSxNQUFQO0FBQ0Q7Ozs2QkFFUUMsSyxFQUFPO0FBQ2QsVUFBSUMsTUFBSjtBQUVBLFVBQU1DLFNBQVMsR0FBR0YsS0FBSyxDQUFDRyxPQUFOLEVBQWxCOztBQUVBLGNBQVFELFNBQVI7QUFDRSxhQUFLRSxxQkFBTDtBQUNBLGFBQUtDLDRCQUFMO0FBQ0EsYUFBS0MsaUNBQUw7QUFDRUwsVUFBQUEs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ekIsRUFBZ0NULFVBQWhDLENBQXBDOztBQUVBVSxNQUFBQSwyQkFBMkIsQ0FBQ0csVUFBNUI7QUFFQSxhQUFPSCwyQkFBUDtBQUNEOzs7O0VBaExzREMscUI7Ozs7Z0JBQXBDbkQsMkIsa0JBOEpHVSxrQjs7Z0JBOUpIViwyQix5QkFnS1VRLHFCOztnQkFoS1ZSLDJCLHVCQWtLUTtBQUN6QnNELEVBQUFBLFNBQVMsRUFBRTtBQURjLEM7O2dCQWxLUnRELDJCLHVCQXNLUSxDQUN6QixXQUR5QixDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBUb2dnbGVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi90b2dnbGVcIjtcbmltcG9ydCBEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvZHJhZ2dhYmxlXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL25hbWUvZGlyZWN0b3J5XCI7XG5cbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IHsgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIHR5cGUgPSBESVJFQ1RPUllfTkFNRV9UWVBFOyAvLy9cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeU5hbWVCdXR0b24gfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZUJ1dHRvbjtcbiAgfVxuXG4gIGdldFRvZ2dsZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7IFRvZ2dsZUJ1dHRvbiB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBUb2dnbGVCdXR0b247XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeVByZXNlbnQgPSB0aGlzLmlzTWFya2VyRW50cnlQcmVzZW50KCksXG4gICAgICAgICAgbWFya2VkID0gbWFya2VyRW50cnlQcmVzZW50OyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgY2FzZSBGSUxFX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuICAgICAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzVG9wbW9zdCgpIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRQYXRoKCksXG4gICAgICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKSxcbiAgICAgICAgICB0b3Btb3N0ID0gKHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvcG1vc3Q7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID9cbiAgICAgIHRoaXMuY29sbGFwc2UoKSA6XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlRW50cmllcygpO1xuXG4gICAgdGhpcy5jb2xsYXBzZVRvZ2dsZUJ1dHRvbigpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMuZXhwYW5kRW50cmllcygpO1xuXG4gICAgdGhpcy5leHBhbmRUb2dnbGVCdXR0b24oKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBsZXQgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgY29sbGFwc2VkID0gIWNvbGxhcHNlZDtcblxuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gbmFtZSwgLy8vXG4gICAgICAgICAgRW50cmllcyA9IGV4cGxvcmVyLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBUb2dnbGVCdXR0b24gPSB0aGlzLmdldFRvZ2dsZUJ1dHRvbigpLFxuICAgICAgICAgIERpcmVjdG9yeU5hbWVCdXR0b24gPSB0aGlzLmdldERpcmVjdG9yeU5hbWVCdXR0b24oKSxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxUb2dnbGVCdXR0b24gb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPixcbiAgICAgIDxEaXJlY3RvcnlOYW1lQnV0dG9uPntkaXJlY3RvcnlOYW1lfTwvRGlyZWN0b3J5TmFtZUJ1dHRvbj4sXG4gICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICBdKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZSgpIHtcbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG5cbiAgICBjb25zdCB7IGNvbGxhcHNlZCA9IGZhbHNlIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG5cbiAgc3RhdGljIFRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbjtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZUJ1dHRvbiA9IERpcmVjdG9yeU5hbWVCdXR0b247XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnktbmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiY29sbGFwc2VkXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKTtcblxuICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG4iXX0=