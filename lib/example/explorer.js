"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../index");

var _entries = _interopRequireDefault(require("./entries"));

var _fileName = _interopRequireDefault(require("./entry/marker/fileName"));

var _fileName2 = _interopRequireDefault(require("./entry/draggable/fileName"));

var _directoryName = _interopRequireDefault(require("./entry/marker/directoryName"));

var _directoryName2 = _interopRequireDefault(require("./entry/draggable/directoryName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = /*#__PURE__*/function (_Explorer) {
  _inherits(_default, _Explorer);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
  }

  return _default;
}(_index.Explorer);

exports["default"] = _default;

_defineProperty(_default, "Entries", _entries["default"]);

_defineProperty(_default, "FileNameMarkerEntry", _fileName["default"]);

_defineProperty(_default, "FileNameDraggableEntry", _fileName2["default"]);

_defineProperty(_default, "DirectoryNameMarkerEntry", _directoryName["default"]);

_defineProperty(_default, "DirectoryNameDraggableEntry", _directoryName2["default"]);

;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbIkV4cGxvcmVyIiwiRW50cmllcyIsIkZpbGVOYW1lTWFya2VyRW50cnkiLCJGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFFNkJBLGU7Ozs7cUNBQ1ZDLG1COztpREFFWUMsb0I7O29EQUVHQyxxQjs7c0RBRUVDLHlCOzt5REFFR0MsMEI7O0FBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEV4cGxvcmVyIH0gZnJvbSBcIi4uL2luZGV4XCI7ICAvLy9cblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4vZW50cmllc1wiO1xuaW1wb3J0IEZpbGVOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFeHBsb3JlciB7XG4gIHN0YXRpYyBFbnRyaWVzID0gRW50cmllcztcblxuICBzdGF0aWMgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IEZpbGVOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbn07XG4iXX0=