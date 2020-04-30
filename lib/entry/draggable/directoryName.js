'use strict';

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

var easy = require('easy'),
    necessary = require('necessary');

var types = require('../../types'),
    Entries = require('../../entries'),
    NameButton = require('../../button/name'),
    DraggableEntry = require('../../entry/draggable');

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
      var collapsed = this.hasClass('collapsed');
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
      this.addClass('collapsed');
    }
  }, {
    key: "expand",
    value: function expand() {
      this.removeClass('collapsed');
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.toggleClass('collapsed');
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
    key: "fromProperties",
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          _properties$collapsed = _properties.collapsed,
          collapsed = _properties$collapsed === void 0 ? false : _properties$collapsed,
          type = DIRECTORY_NAME_TYPE,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, type);
      directoryNameDraggableEntry.initialise(collapsed);
      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directory-name'
  },
  ignoredProperties: ['collapsed']
});
module.exports = DirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJ0eXBlcyIsIkVudHJpZXMiLCJOYW1lQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJCdXR0b24iLCJSZWFjdCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJoYXNDbGFzcyIsIm1hcmtlckVudHJ5UHJlc2VudCIsImlzTWFya2VyRW50cnlQcmVzZW50IiwibWFya2VkIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwicGF0aCIsImdldFBhdGgiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsInRvZ2dsZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsInByb3BlcnRpZXMiLCJleHBsb3JlciIsInRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciIsImJpbmQiLCJzZXRDb2xsYXBzZWQiLCJDbGFzcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInR5cGUiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCO0FBQUEsSUFDTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUR6Qjs7QUFHQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxhQUFELENBQXJCO0FBQUEsSUFDTUcsT0FBTyxHQUFHSCxPQUFPLENBQUMsZUFBRCxDQUR2QjtBQUFBLElBRU1JLFVBQVUsR0FBR0osT0FBTyxDQUFDLG1CQUFELENBRjFCO0FBQUEsSUFHTUssY0FBYyxHQUFHTCxPQUFPLENBQUMsdUJBQUQsQ0FIOUI7O0lBS1FNLE0sR0FBa0JQLEksQ0FBbEJPLE07SUFBUUMsSyxHQUFVUixJLENBQVZRLEs7SUFDUkMsYSxHQUFrQlAsUyxDQUFsQk8sYTtJQUNBQyx1QyxHQUE0Q0QsYSxDQUE1Q0MsdUM7SUFDQUMsYyxHQUEyRlIsSyxDQUEzRlEsYztJQUFnQkMsbUIsR0FBMkVULEssQ0FBM0VTLG1CO0lBQXFCQyxxQixHQUFzRFYsSyxDQUF0RFUscUI7SUFBdUJDLDBCLEdBQStCWCxLLENBQS9CVywwQjs7SUFFOURDLDJCOzs7Ozs7Ozs7Ozs7O3lDQUNpQjtBQUNuQixVQUFNQyxTQUFTLEdBQUcsS0FBS0MsV0FBTCxFQUFsQjtBQUVBLFdBQUtDLFFBQUw7O0FBRUEsVUFBTUMsTUFBTSw2RkFBWjtBQUFBLFVBQ01DLGVBQWUsR0FBR0QsTUFEeEIsQ0FMbUIsQ0FNYzs7O0FBRWpDLFVBQUksQ0FBQ0gsU0FBTCxFQUFnQjtBQUNkLGFBQUtLLE1BQUw7QUFDRDs7QUFFRCxhQUFPRCxlQUFQO0FBQ0Q7OztrQ0FFYTtBQUNaLFVBQU1KLFNBQVMsR0FBRyxLQUFLTSxRQUFMLENBQWMsV0FBZCxDQUFsQjtBQUVBLGFBQU9OLFNBQVA7QUFDRDs7OytCQUVVO0FBQ1QsVUFBTU8sa0JBQWtCLEdBQUcsS0FBS0Msb0JBQUwsRUFBM0I7QUFBQSxVQUNNQyxNQUFNLEdBQUdGLGtCQURmLENBRFMsQ0FFMkI7O0FBRXBDLGFBQU9FLE1BQVA7QUFDRDs7OzZCQUVRQyxLLEVBQU87QUFDZCxVQUFJQyxNQUFKO0FBRUEsVUFBTUMsU0FBUyxHQUFHRixLQUFLLENBQUNHLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtqQixjQUFMO0FBQ0EsYUFBS0UscUJBQUw7QUFDQSxhQUFLQywwQkFBTDtBQUNFYSxVQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUVBOztBQUVGLGFBQUtmLG1CQUFMO0FBQ0UsY0FBTWtCLElBQUksR0FBRyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxTQUFTLEdBQUdOLEtBQUssQ0FBQ0ssT0FBTixFQURsQjtBQUdBSixVQUFBQSxNQUFNLEdBQUlHLElBQUksQ0FBQ0csYUFBTCxDQUFtQkQsU0FBbkIsSUFBZ0MsQ0FBMUM7QUFFQTtBQWRKOztBQWlCQSxhQUFPTCxNQUFQO0FBQ0Q7OztnQ0FFVztBQUNWLFVBQU1PLElBQUksR0FBRyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxVQUNNQywrQkFBK0IsR0FBRzFCLHVDQUF1QyxDQUFDd0IsSUFBRCxDQUQvRTtBQUFBLFVBRU1HLE9BQU8sR0FBSUQsK0JBQStCLEtBQUssSUFGckQ7QUFJQSxhQUFPQyxPQUFQO0FBQ0Q7OzsrQ0FFMEI7QUFDekIsYUFBTyxLQUFQO0FBQ0Q7OztvREFFK0I7QUFDOUIsYUFBTyxJQUFQO0FBQ0Q7OztnREFFMkJDLGMsRUFBZ0I7QUFDMUMsVUFBSUMseUJBQUo7O0FBRUEsVUFBSSxTQUFTRCxjQUFiLEVBQTZCO0FBQzNCQyxRQUFBQSx5QkFBeUIsR0FBRyxLQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQU12QixTQUFTLEdBQUcsS0FBS0MsV0FBTCxFQUFsQjs7QUFFQSxZQUFJRCxTQUFKLEVBQWU7QUFDYnVCLFVBQUFBLHlCQUF5QixHQUFHLEtBQTVCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBTUMsNkJBQTZCLEdBQUdGLGNBQWMsQ0FBQ0csa0JBQWYsRUFBdEM7QUFBQSxjQUNNQyx3Q0FBd0MsaUhBQXNDRiw2QkFBdEMsQ0FEOUM7O0FBR0FELFVBQUFBLHlCQUF5QixHQUFHRyx3Q0FBNUI7QUFDRDtBQUNGOztBQUVELGFBQU9ILHlCQUFQO0FBQ0Q7OzsrQ0FFMEI7QUFDekIsV0FBS0ksTUFBTDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUtBLE1BQUw7QUFDRDs7O2lDQUVZM0IsUyxFQUFXO0FBQ3RCQSxNQUFBQSxTQUFTLEdBQ1AsS0FBS0UsUUFBTCxFQURPLEdBRUwsS0FBS0csTUFBTCxFQUZKO0FBR0Q7OzsrQkFFVTtBQUNULFdBQUt1QixRQUFMLENBQWMsV0FBZDtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLQyxXQUFMLENBQWlCLFdBQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtDLFdBQUwsQ0FBaUIsV0FBakI7QUFDRDs7O2tDQUVhQyxVLEVBQVk7QUFBQSxVQUNoQmpCLElBRGdCLEdBQ0dpQixVQURILENBQ2hCakIsSUFEZ0I7QUFBQSxVQUNWa0IsUUFEVSxHQUNHRCxVQURILENBQ1ZDLFFBRFU7QUFBQSxVQUVsQkMsd0JBRmtCLEdBRVMsS0FBS0Esd0JBQUwsQ0FBOEJDLElBQTlCLENBQW1DLElBQW5DLENBRlQ7QUFJeEIsYUFBUSxjQUVOLG9CQUFDLE1BQUQ7QUFBUSxRQUFBLFNBQVMsRUFBQyxRQUFsQjtBQUEyQixRQUFBLE9BQU8sRUFBRUQ7QUFBcEMsUUFGTSxlQUdOLG9CQUFDLFVBQUQsUUFBYW5CLElBQWIsQ0FITSxlQUlOLG9CQUFDLE9BQUQ7QUFBUyxRQUFBLFFBQVEsRUFBRWtCO0FBQW5CLFFBSk0sQ0FBUjtBQU9EOzs7K0JBRVVoQyxTLEVBQVc7QUFDcEIsV0FBS21DLFlBQUwsQ0FBa0JuQyxTQUFsQjs7QUFFQTtBQUNEOzs7bUNBRXFCb0MsSyxFQUFPTCxVLEVBQVk7QUFDdkMsVUFBSU0sU0FBUyxDQUFDQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCUCxRQUFBQSxVQUFVLEdBQUdLLEtBQWI7QUFDQUEsUUFBQUEsS0FBSyxHQUFHckMsMkJBQVI7QUFDRDs7QUFKc0Msd0JBTVRnQyxVQU5TO0FBQUEsOENBTS9CL0IsU0FOK0I7QUFBQSxVQU0vQkEsU0FOK0Isc0NBTW5CLEtBTm1CO0FBQUEsVUFPakN1QyxJQVBpQyxHQU8xQjNDLG1CQVAwQjtBQUFBLFVBUWpDNEMsMkJBUmlDLEdBUUhsRCxjQUFjLENBQUNtRCxjQUFmLENBQThCTCxLQUE5QixFQUFxQ0wsVUFBckMsRUFBaURRLElBQWpELENBUkc7QUFVdkNDLE1BQUFBLDJCQUEyQixDQUFDRSxVQUE1QixDQUF1QzFDLFNBQXZDO0FBRUEsYUFBT3dDLDJCQUFQO0FBQ0Q7Ozs7RUFySnVDbEQsYzs7QUF3SjFDcUQsTUFBTSxDQUFDQyxNQUFQLENBQWM3QywyQkFBZCxFQUEyQztBQUN6QzhDLEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFETSxHQURzQjtBQUl6Q0MsRUFBQUEsaUJBQWlCLEVBQUUsQ0FDakIsV0FEaUI7QUFKc0IsQ0FBM0M7QUFTQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEQsMkJBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi4vLi4vdHlwZXMnKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi8uLi9lbnRyaWVzJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi4vLi4vYnV0dG9uL25hbWUnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvZHJhZ2dhYmxlJyk7XG5cbmNvbnN0IHsgQnV0dG9uLCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgcGF0aFV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudCgpLFxuICAgICAgICAgIG1hcmtlZCA9IG1hcmtlckVudHJ5UHJlc2VudDsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc1RvcG1vc3QoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aCgpLFxuICAgICAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCksXG4gICAgICAgICAgdG9wbW9zdCA9IChwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTtcblxuICAgIHJldHVybiB0b3Btb3N0O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJ0b2dnbGVcIiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+LFxuICAgICAgPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPixcbiAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgIF0pO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKGNvbGxhcHNlZCkge1xuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvbGxhcHNlZCA9IGZhbHNlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHR5cGUgPSBESVJFQ1RPUllfTkFNRV9UWVBFLCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShjb2xsYXBzZWQpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RpcmVjdG9yeS1uYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==