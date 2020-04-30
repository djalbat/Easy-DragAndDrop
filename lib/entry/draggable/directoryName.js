"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var easy = require("easy"),
    necessary = require("necessary");

var types = require("../../types"),
    Entries = require("../../entries"),
    NameButton = require("../../button/name"),
    DraggableEntry = require("../../entry/draggable");

var Button = easy.Button,
    React = easy.React,
    pathUtilities = necessary.pathUtilities,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

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
    key: "isCollapsed",
    value: function isCollapsed() {
      var collapsed = this.hasClass("collapsed");
      return collapsed;
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
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          before = true;
          break;

        case DIRECTORY_NAME_TYPE:
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
      this.addClass("collapsed");
    }
  }, {
    key: "expand",
    value: function expand() {
      this.removeClass("collapsed");
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.toggleClass("collapsed");
    }
  }, {
    key: "childElements",
    value: function childElements(properties) {
      var name = properties.name,
          explorer = properties.explorer,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);
      return [/*#__PURE__*/React.createElement(Button, {
        className: "toggle",
        onClick: toggleButtonClickHandler
      }), /*#__PURE__*/React.createElement(NameButton, null, name), /*#__PURE__*/React.createElement(Entries, {
        explorer: explorer
      })];
    }
  }, {
    key: "initialise",
    value: function initialise(collapsed) {
      this.setCollapsed(collapsed);

      _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "initialise", this).call(this);
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$collapsed = properties.collapsed,
          collapsed = _properties$collapsed === void 0 ? false : _properties$collapsed,
          type = DIRECTORY_NAME_TYPE,
          directoryNameDraggableEntry = DraggableEntry.fromClass(Class, properties, type);
      directoryNameDraggableEntry.initialise(collapsed);
      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: "directory-name"
  },
  ignoredProperties: ["collapsed"]
});
module.exports = DirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJ0eXBlcyIsIkVudHJpZXMiLCJOYW1lQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJCdXR0b24iLCJSZWFjdCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJoYXNDbGFzcyIsIm1hcmtlckVudHJ5UHJlc2VudCIsImlzTWFya2VyRW50cnlQcmVzZW50IiwibWFya2VkIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwicGF0aCIsImdldFBhdGgiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsInRvZ2dsZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsInByb3BlcnRpZXMiLCJleHBsb3JlciIsInRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciIsImJpbmQiLCJzZXRDb2xsYXBzZWQiLCJDbGFzcyIsInR5cGUiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjtBQUFBLElBQ01DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLFdBQUQsQ0FEekI7O0FBR0EsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsYUFBRCxDQUFyQjtBQUFBLElBQ01HLE9BQU8sR0FBR0gsT0FBTyxDQUFDLGVBQUQsQ0FEdkI7QUFBQSxJQUVNSSxVQUFVLEdBQUdKLE9BQU8sQ0FBQyxtQkFBRCxDQUYxQjtBQUFBLElBR01LLGNBQWMsR0FBR0wsT0FBTyxDQUFDLHVCQUFELENBSDlCOztJQUtRTSxNLEdBQWtCUCxJLENBQWxCTyxNO0lBQVFDLEssR0FBVVIsSSxDQUFWUSxLO0lBQ1JDLGEsR0FBa0JQLFMsQ0FBbEJPLGE7SUFDQUMsdUMsR0FBNENELGEsQ0FBNUNDLHVDO0lBQ0FDLGMsR0FBMkZSLEssQ0FBM0ZRLGM7SUFBZ0JDLG1CLEdBQTJFVCxLLENBQTNFUyxtQjtJQUFxQkMscUIsR0FBc0RWLEssQ0FBdERVLHFCO0lBQXVCQywwQixHQUErQlgsSyxDQUEvQlcsMEI7O0lBRTlEQywyQjs7Ozs7Ozs7Ozs7Ozt5Q0FDaUI7QUFDbkIsVUFBTUMsU0FBUyxHQUFHLEtBQUtDLFdBQUwsRUFBbEI7QUFFQSxXQUFLQyxRQUFMOztBQUVBLFVBQU1DLE1BQU0sNkZBQVo7QUFBQSxVQUNNQyxlQUFlLEdBQUdELE1BRHhCLENBTG1CLENBTWM7OztBQUVqQyxVQUFJLENBQUNILFNBQUwsRUFBZ0I7QUFDZCxhQUFLSyxNQUFMO0FBQ0Q7O0FBRUQsYUFBT0QsZUFBUDtBQUNEOzs7a0NBRWE7QUFDWixVQUFNSixTQUFTLEdB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LEssRUFBT0wsVSxFQUFZO0FBQUEsa0NBQ0pBLFVBREksQ0FDMUIvQixTQUQwQjtBQUFBLFVBQzFCQSxTQUQwQixzQ0FDZCxLQURjO0FBQUEsVUFFNUJxQyxJQUY0QixHQUVyQnpDLG1CQUZxQjtBQUFBLFVBRzVCMEMsMkJBSDRCLEdBR0VoRCxjQUFjLENBQUNpRCxTQUFmLENBQXlCSCxLQUF6QixFQUFnQ0wsVUFBaEMsRUFBNENNLElBQTVDLENBSEY7QUFLbENDLE1BQUFBLDJCQUEyQixDQUFDRSxVQUE1QixDQUF1Q3hDLFNBQXZDO0FBRUEsYUFBT3NDLDJCQUFQO0FBQ0Q7Ozs7RUFoSnVDaEQsYzs7QUFtSjFDbUQsTUFBTSxDQUFDQyxNQUFQLENBQWMzQywyQkFBZCxFQUEyQztBQUN6QzRDLEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFETSxHQURzQjtBQUl6Q0MsRUFBQUEsaUJBQWlCLEVBQUUsQ0FDakIsV0FEaUI7QUFKc0IsQ0FBM0M7QUFTQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEQsMkJBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKFwiZWFzeVwiKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoXCJuZWNlc3NhcnlcIik7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL3R5cGVzXCIpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoXCIuLi8uLi9lbnRyaWVzXCIpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoXCIuLi8uLi9idXR0b24vbmFtZVwiKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZShcIi4uLy4uL2VudHJ5L2RyYWdnYWJsZVwiKTtcblxuY29uc3QgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IHR5cGVzO1xuXG5jbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKFwiY29sbGFwc2VkXCIpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQoKSxcbiAgICAgICAgICBtYXJrZWQgPSBtYXJrZXJFbnRyeVByZXNlbnQ7ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNUb3Btb3N0KCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKSxcbiAgICAgICAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpLFxuICAgICAgICAgIHRvcG1vc3QgPSAocGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9wbW9zdDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwidG9nZ2xlXCIgb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPixcbiAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj4sXG4gICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICBdKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZShjb2xsYXBzZWQpIHtcbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuXG4gICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgPSBmYWxzZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICB0eXBlID0gRElSRUNUT1JZX05BTUVfVFlQRSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlKTtcblxuICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKGNvbGxhcHNlZCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICBcImNvbGxhcHNlZFwiXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==