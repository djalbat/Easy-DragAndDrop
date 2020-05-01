"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _draggable = _interopRequireDefault(require("../../entry/draggable"));

var _file = _interopRequireDefault(require("../../button/name/file"));

var _name = require("../../utilities/name");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(FileNameDraggableEntry);

  function FileNameDraggableEntry(selector, type, explorer) {
    var _this;

    _classCallCheck(this, FileNameDraggableEntry);

    _this = _super.call(this, selector, type);
    _this.explorer = explorer;
    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: "getExplorer",
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: "getFileNameButton",
    value: function getFileNameButton() {
      var FileNameButton = this.constructor.FileNameButton;
      return FileNameButton;
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
          var name = this.getName(),
              entryName = entry.getName();
          before = (0, _name.nameIsBeforeEntryName)(name, entryName);
          break;

        case _types.DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: "isFileNameDraggableEntry",
    value: function isFileNameDraggableEntry() {
      return true;
    }
  }, {
    key: "isDirectoryNameDraggableEntry",
    value: function isDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: "retrieveDraggableSubEntries",
    value: function retrieveDraggableSubEntries() {
      var draggableSubEntries = []; ///

      return draggableSubEntries;
    }
  }, {
    key: "doubleClickHandler",
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }, {
    key: "childElements",
    value: function childElements(properties) {
      var name = properties.name,
          fileName = name,
          FileNameButton = this.getFileNameButton();
      return [/*#__PURE__*/React.createElement(FileNameButton, null, fileName)];
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var explorer = properties.explorer,
          type = _types.FILE_NAME_TYPE,
          fileNameDraggableEntry = _draggable["default"].fromClass(Class, properties, type, explorer);

      fileNameDraggableEntry.initialise(properties);
      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(_draggable["default"]);

exports["default"] = FileNameDraggableEntry;

_defineProperty(FileNameDraggableEntry, "FileNameButton", _file["default"]);

_defineProperty(FileNameDraggableEntry, "defaultProperties", {
  className: "file-name"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVOYW1lLmpzIl0sIm5hbWVzIjpbIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsInR5cGUiLCJleHBsb3JlciIsIkZpbGVOYW1lQnV0dG9uIiwiY29uc3RydWN0b3IiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZHJhZ2dhYmxlU3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZpbGVOYW1lIiwiZ2V0RmlsZU5hbWVCdXR0b24iLCJDbGFzcyIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLHNCOzs7OztBQUNuQixrQ0FBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ3BDLDhCQUFNRixRQUFOLEVBQWdCQyxJQUFoQjtBQUVBLFVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBSG9DO0FBSXJDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLQSxRQUFaO0FBQ0Q7Ozt3Q0FFbUI7QUFBQSxVQUNWQyxjQURVLEdBQ1MsS0FBS0MsV0FEZCxDQUNWRCxjQURVO0FBR2xCLGFBQU9BLGNBQVA7QUFDRDs7OzZCQUVRRSxLLEVBQU87QUFDZCxVQUFJQyxNQUFKO0FBRUEsVUFBTUMsU0FBUyxHQUFHRixLQUFLLENBQUNHLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtFLHFCQUFMO0FBQ0EsYUFBS0MsNEJBQUw7QUFDQSxhQUFLQyxpQ0FBTDtBQUNFLGNBQU1DLElBQUksR0FBRyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxTQUFTLEdBQUdULEtBQUssQ0FBQ1EsT0FBTixFQURsQjtBQUdBUCxVQUFBQSxNQUFNLEdBQUcsaUNBQXNCTSxJQUF0QixFQUE0QkUsU0FBNUIsQ0FBVDtBQUNBOztBQUVGLGFBQUtDLDBCQUFMO0FBQ0VULFVBQUFBLE1BQU0sR0FBRyxLQUFUO0FBQ0E7QUFaSjs7QUFlQSxhQUFPQSxNQUFQO0FBQ0Q7OzsrQ0FFMEI7QUFDekIsYUFBTyxJQUFQO0FBQ0Q7OztvREFFK0I7QUFDOUIsYUFBTyxLQUFQO0FBQ0Q7OztrREFFNkI7QUFDNUIsVUFBTVUsbUJBQW1CLEdBQUcsRUFBNUIsQ0FENEIsQ0FDSzs7QUFFakMsYUFBT0EsbUJBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNZCxRQUFRLEdBQUcsS0FBS2UsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLElBQUksR0FBRyxJQURiLENBRG1CLENBRUE7O0FBRW5CaEIsTUFBQUEsUUFBUSxDQUFDaUIsMEJBQVQsQ0FBb0NELElBQXBDO0FBQ0Q7OztrQ0FFYUUsVSxFQUFZO0FBQ2xCLFVBQUVSLElBQUYsR0FBV1EsVUFBWCxDQUFFUixJQUFGO0FBQUEsVUFDQVMsUUFEQSxHQUNVVCxJQURWO0FBQUEsVUFFQVQsY0FGQSxHQUVpQixLQUFLbUIsaUJBQUwsRUFGakI7QUFJTixhQUFRLGNBRU4sb0JBQUMsY0FBRCxRQUFpQkQsUUFBakIsQ0FGTSxDQUFSO0FBS0Q7Ozs4QkFRZ0JFLEssRUFBT0gsVSxFQUFZO0FBQzVCLFVBQUVsQixRQUFGLEdBQWVrQixVQUFmLENBQUVsQixRQUFGO0FBQUEsVUFDQUQsSUFEQSxHQUNPUSxxQkFEUDtBQUFBLFVBRUFlLHNCQUZBLEdBRXlCQyxzQkFBZUMsU0FBZixDQUF5QkgsS0FBekIsRUFBZ0NILFVBQWhDLEVBQTRDbkIsSUFBNUMsRUFBa0RDLFFBQWxELENBRnpCOztBQUlOc0IsTUFBQUEsc0JBQXNCLENBQUNHLFVBQXZCLENBQWtDUCxVQUFsQztBQUVBLGFBQU9JLHNCQUFQO0FBQ0Q7Ozs7RUF2RmlEQyxxQjs7OztnQkFBL0IxQixzQixvQkF5RUtJLGdCOztnQkF6RUxKLHNCLHVCQTJFUTtBQUN6QjZCLEVBQUFBLFNBQVMsRUFBRTtBQURjLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IERyYWdnYWJsZUVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnZ2FibGVcIjtcbmltcG9ydCBGaWxlTmFtZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL25hbWUvZmlsZVwiO1xuXG5pbXBvcnQgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL25hbWVcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZUJ1dHRvbiB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBGaWxlTmFtZUJ1dHRvbjtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgY2FzZSBGSUxFX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlU3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZVN1YkVudHJpZXM7XG4gIH1cbiAgXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZSk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsZU5hbWU9IG5hbWUsIC8vL1xuICAgICAgICAgIEZpbGVOYW1lQnV0dG9uID0gdGhpcy5nZXRGaWxlTmFtZUJ1dHRvbigpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxGaWxlTmFtZUJ1dHRvbj57ZmlsZU5hbWV9PC9GaWxlTmFtZUJ1dHRvbj5cblxuICAgIF0pO1xuICB9XG5cbiAgc3RhdGljIEZpbGVOYW1lQnV0dG9uID0gRmlsZU5hbWVCdXR0b247XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJmaWxlLW5hbWVcIlxuICB9O1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHR5cGUgPSBGSUxFX05BTUVfVFlQRSwgIC8vL1xuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIGV4cGxvcmVyKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShwcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG4iXX0=