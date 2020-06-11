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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(FileNameDraggableEntry);

  function FileNameDraggableEntry() {
    var _this;

    _classCallCheck(this, FileNameDraggableEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "type", _types.FILE_NAME_TYPE);

    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: "getFileNameButton",
    ///
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
    value: function childElements() {
      var name = this.properties.name,
          fileName = name,
          FileNameButton = this.getFileNameButton();
      return [/*#__PURE__*/React.createElement(FileNameButton, null, fileName)];
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var fileNameDraggableEntry = _draggable["default"].fromClass(Class, properties);

      fileNameDraggableEntry.initialise();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVOYW1lLmpzIl0sIm5hbWVzIjpbIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJGSUxFX05BTUVfVFlQRSIsIkZpbGVOYW1lQnV0dG9uIiwiY29uc3RydWN0b3IiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsImRyYWdnYWJsZVN1YkVudHJpZXMiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZpbGVOYW1lIiwiZ2V0RmlsZU5hbWVCdXR0b24iLCJDbGFzcyIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLHNCOzs7Ozs7Ozs7Ozs7Ozs7OzJEQUNaQyxxQjs7Ozs7OztBQUFpQjt3Q0FFSjtBQUFBLFVBQ1ZDLGNBRFUsR0FDUyxLQUFLQyxXQURkLENBQ1ZELGNBRFU7QUFHbEIsYUFBT0EsY0FBUDtBQUNEOzs7NkJBRVFFLEssRUFBTztBQUNkLFVBQUlDLE1BQUo7QUFFQSxVQUFNQyxTQUFTLEdBQUdGLEtBQUssQ0FBQ0csT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS0wscUJBQUw7QUFDQSxhQUFLTyw0QkFBTDtBQUNBLGFBQUtDLGlDQUFMO0FBQ0UsY0FBTUMsSUFBSSxHQUFHLEtBQUtDLE9BQUwsRUFBYjtBQUFBLGNBQ01DLFNBQVMsR0FBR1IsS0FBSyxDQUFDTyxPQUFOLEVBRGxCO0FBR0FOLFVBQUFBLE1BQU0sR0FBRyxpQ0FBc0JLLElBQXRCLEVBQTRCRSxTQUE1QixDQUFUO0FBQ0E7O0FBRUYsYUFBS0MsMEJBQUw7QUFDRVIsVUFBQUEsTUFBTSxHQUFHLEtBQVQ7QUFDQTtBQVpKOztBQWVBLGFBQU9BLE1BQVA7QUFDRDs7OytDQUUwQjtBQUN6QixhQUFPLElBQVA7QUFDRDs7O29EQUUrQjtBQUM5QixhQUFPLEtBQVA7QUFDRDs7O2tEQUU2QjtBQUM1QixVQUFNUyxtQkFBbUIsR0FBRyxFQUE1QixDQUQ0QixDQUNLOztBQUVqQyxhQUFPQSxtQkFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQU1DLFFBQVEsR0FBRyxLQUFLQyxXQUFMLEVBQWpCO0FBQUEsVUFDTUMsSUFBSSxHQUFHLElBRGIsQ0FEbUIsQ0FFQTs7QUFFbkJGLE1BQUFBLFFBQVEsQ0FBQ0csMEJBQVQsQ0FBb0NELElBQXBDO0FBQ0Q7OztvQ0FFZTtBQUNSLFVBQUVQLElBQUYsR0FBVyxLQUFLUyxVQUFoQixDQUFFVCxJQUFGO0FBQUEsVUFDQVUsUUFEQSxHQUNVVixJQURWO0FBQUEsVUFFQVIsY0FGQSxHQUVpQixLQUFLbUIsaUJBQUwsRUFGakI7QUFJTixhQUFRLGNBRU4sb0JBQUMsY0FBRCxRQUFpQkQsUUFBakIsQ0FGTSxDQUFSO0FBS0Q7Ozs4QkFRZ0JFLEssRUFBT0gsVSxFQUFZO0FBQ2xDLFVBQU1JLHNCQUFzQixHQUFHQyxzQkFBZUMsU0FBZixDQUF5QkgsS0FBekIsRUFBZ0NILFVBQWhDLENBQS9COztBQUVBSSxNQUFBQSxzQkFBc0IsQ0FBQ0csVUFBdkI7QUFFQSxhQUFPSCxzQkFBUDtBQUNEOzs7O0VBN0VpREMscUI7Ozs7Z0JBQS9CeEIsc0Isb0JBaUVLRSxnQjs7Z0JBakVMRixzQix1QkFtRVE7QUFDekIyQixFQUFBQSxTQUFTLEVBQUU7QUFEYyxDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvZHJhZ2dhYmxlXCI7XG5pbXBvcnQgRmlsZU5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lL2ZpbGVcIjtcblxuaW1wb3J0IHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICB0eXBlID0gRklMRV9OQU1FX1RZUEU7ICAvLy9cblxuICBnZXRGaWxlTmFtZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lQnV0dG9uO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVTdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlU3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsZU5hbWU9IG5hbWUsIC8vL1xuICAgICAgICAgIEZpbGVOYW1lQnV0dG9uID0gdGhpcy5nZXRGaWxlTmFtZUJ1dHRvbigpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxGaWxlTmFtZUJ1dHRvbj57ZmlsZU5hbWV9PC9GaWxlTmFtZUJ1dHRvbj5cblxuICAgIF0pO1xuICB9XG5cbiAgc3RhdGljIEZpbGVOYW1lQnV0dG9uID0gRmlsZU5hbWVCdXR0b247XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJmaWxlLW5hbWVcIlxuICB9O1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZSgpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cbiJdfQ==