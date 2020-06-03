"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _marker = _interopRequireDefault(require("../../entry/marker"));

var _name = require("../../utilities/name");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameMarkerEntry = /*#__PURE__*/function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FileNameMarkerEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FileNameMarkerEntry)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "type", _types.FILE_NAME_MARKER_TYPE);

    return _this;
  }

  _createClass(FileNameMarkerEntry, [{
    key: "isBefore",
    value: function isBefore(draggableEntry) {
      var before;
      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case _types.FILE_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();
          before = (0, _name.nameIsBeforeEntryName)(name, draggableEntryName);
          break;

        case _types.DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = _types.FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = _marker["default"].fromClass(Class, properties, type);

      return fileNameMarkerEntry;
    }
  }]);

  return FileNameMarkerEntry;
}(_marker["default"]);

exports["default"] = FileNameMarkerEntry;

_defineProperty(FileNameMarkerEntry, "defaultProperties", {
  className: "file-name"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVOYW1lLmpzIl0sIm5hbWVzIjpbIkZpbGVOYW1lTWFya2VyRW50cnkiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJkcmFnZ2FibGVFbnRyeSIsImJlZm9yZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsIm5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkNsYXNzIiwicHJvcGVydGllcyIsInR5cGUiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiTWFya2VyRW50cnkiLCJmcm9tQ2xhc3MiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsbUI7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBQ1pDLDRCOzs7Ozs7OzZCQUVFQyxjLEVBQWdCO0FBQ3ZCLFVBQUlDLE1BQUo7QUFFQSxVQUFNQyxrQkFBa0IsR0FBR0YsY0FBYyxDQUFDRyxPQUFmLEVBQTNCOztBQUVBLGNBQVFELGtCQUFSO0FBQ0UsYUFBS0UscUJBQUw7QUFDRSxjQUFNQyxJQUFJLEdBQUcsS0FBS0MsT0FBTCxFQUFiO0FBQUEsY0FDTUMsa0JBQWtCLEdBQUdQLGNBQWMsQ0FBQ00sT0FBZixFQUQzQjtBQUdBTCxVQUFBQSxNQUFNLEdBQUcsaUNBQXNCSSxJQUF0QixFQUE0QkUsa0JBQTVCLENBQVQ7QUFDQTs7QUFFRixhQUFLQywwQkFBTDtBQUNFUCxVQUFBQSxNQUFNLEdBQUcsS0FBVDtBQUNBO0FBVko7O0FBYUEsYUFBT0EsTUFBUDtBQUNEOzs7OEJBTWdCUSxLLEVBQU9DLFUsRUFBWTtBQUNsQyxVQUFNQyxJQUFJLEdBQUdaLDRCQUFiO0FBQUEsVUFDTWEsbUJBQW1CLEdBQUdDLG1CQUFZQyxTQUFaLENBQXNCTCxLQUF0QixFQUE2QkMsVUFBN0IsRUFBeUNDLElBQXpDLENBRDVCOztBQUdBLGFBQU9DLG1CQUFQO0FBQ0Q7Ozs7RUFqQzhDQyxrQjs7OztnQkFBNUJmLG1CLHVCQXdCUTtBQUN6QmlCLEVBQUFBLFNBQVMsRUFBRTtBQURjLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE1hcmtlckVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9tYXJrZXJcIjtcblxuaW1wb3J0IHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVOYW1lTWFya2VyRW50cnkgZXh0ZW5kcyBNYXJrZXJFbnRyeSB7XG4gIHR5cGUgPSBGSUxFX05BTUVfTUFSS0VSX1RZUEU7XG5cbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBkcmFnZ2FibGVFbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZmlsZS1uYW1lXCJcbiAgfTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgdHlwZSA9IEZJTEVfTkFNRV9NQVJLRVJfVFlQRSxcbiAgICAgICAgICBmaWxlTmFtZU1hcmtlckVudHJ5ID0gTWFya2VyRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlKTtcblxuICAgIHJldHVybiBmaWxlTmFtZU1hcmtlckVudHJ5O1xuICB9XG59XG4iXX0=