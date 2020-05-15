"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../../../index");

var _toggle = _interopRequireDefault(require("../../button/toggle"));

var _directory = _interopRequireDefault(require("../../button/name/directory"));

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

var _default = /*#__PURE__*/function (_DirectoryNameDraggab) {
  _inherits(_default, _DirectoryNameDraggab);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
  }

  return _default;
}(_index.DirectoryNameDraggableEntry);

exports["default"] = _default;

_defineProperty(_default, "ToggleButton", _toggle["default"]);

_defineProperty(_default, "DirectoryNameButton", _directory["default"]);

;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiVG9nZ2xlQnV0dG9uIiwiRGlyZWN0b3J5TmFtZUJ1dHRvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBRTZCQSxrQzs7OzswQ0FDTEMsa0I7O2lEQUVPQyxxQjs7QUFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gZnJvbSBcIi4uLy4uLy4uL2luZGV4XCI7IC8vL1xuXG5pbXBvcnQgVG9nZ2xlQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vdG9nZ2xlXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL25hbWUvZGlyZWN0b3J5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IHtcbiAgc3RhdGljIFRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbjtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZUJ1dHRvbiA9IERpcmVjdG9yeU5hbWVCdXR0b247XG59O1xuIl19