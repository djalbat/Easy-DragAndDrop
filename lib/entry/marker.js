"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _entry = _interopRequireDefault(require("../entry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  width: 4rem;\n  height: 2.4rem;\n  background-image: url(\"css/image/marker.png\");\n  background-repeat: no-repeat;\n  background-position: 1.8rem 1rem;\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

var MarkerEntry = /*#__PURE__*/function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  var _super = _createSuper(MarkerEntry);

  function MarkerEntry() {
    _classCallCheck(this, MarkerEntry);

    return _super.apply(this, arguments);
  }

  _createClass(MarkerEntry, [{
    key: "getName",
    value: function getName() {
      var name = this.properties.name;
      return name;
    }
  }]);

  return MarkerEntry;
}(_entry["default"]);

_defineProperty(MarkerEntry, "defaultProperties", {
  className: "marker"
});

var _default = (0, _easyWithStyle["default"])(MarkerEntry)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcmtlci5qcyJdLCJuYW1lcyI6WyJNYXJrZXJFbnRyeSIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiRW50cnkiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVzs7Ozs7Ozs7Ozs7Ozs4QkFDTTtBQUFBLFVBQ0FDLElBREEsR0FDUyxLQUFLQyxVQURkLENBQ0FELElBREE7QUFHUixhQUFPQSxJQUFQO0FBQ0Q7Ozs7RUFMdUJFLGlCOztnQkFBcEJILFcsdUJBT3VCO0FBQ3pCSSxFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztlQUtkLCtCQUFVSixXQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IEVudHJ5IGZyb20gXCIuLi9lbnRyeVwiO1xuXG5jbGFzcyBNYXJrZXJFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMucHJvcGVydGllcztcblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJtYXJrZXJcIlxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoTWFya2VyRW50cnkpYFxuXG4gIHdpZHRoOiA0cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiY3NzL2ltYWdlL21hcmtlci5wbmdcIik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDEuOHJlbSAxcmVtO1xuXG5gO1xuIl19