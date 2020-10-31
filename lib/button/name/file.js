"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _name = _interopRequireDefault(require("../../button/name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  padding-left: 4rem;\n  background-image: url(\"css/image/file.png\");\n  background-position: 2.2rem 0.5rem;\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameButton = /*#__PURE__*/function (_NameButton) {
  _inherits(FileNameButton, _NameButton);

  var _super = _createSuper(FileNameButton);

  function FileNameButton() {
    _classCallCheck(this, FileNameButton);

    return _super.apply(this, arguments);
  }

  return FileNameButton;
}(_name["default"]);

_defineProperty(FileNameButton, "defaultProperties", {
  className: "file"
});

var _default = (0, _easyWithStyle["default"])(FileNameButton)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOlsiRmlsZU5hbWVCdXR0b24iLCJOYW1lQnV0dG9uIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxjOzs7Ozs7Ozs7Ozs7RUFBdUJDLGdCOztnQkFBdkJELGMsdUJBQ3NCO0FBQ3hCRSxFQUFBQSxTQUFTLEVBQUU7QUFEYSxDOztlQUtiLCtCQUFVRixjQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IE5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lXCI7XG5cbmNsYXNzIEZpbGVOYW1lQnV0dG9uIGV4dGVuZHMgTmFtZUJ1dHRvbiB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9e1xuICAgIGNsYXNzTmFtZTogXCJmaWxlXCJcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKEZpbGVOYW1lQnV0dG9uKWBcblxuICBwYWRkaW5nLWxlZnQ6IDRyZW07XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImNzcy9pbWFnZS9maWxlLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMi4ycmVtIDAuNXJlbTtcblxuYDtcbiJdfQ==