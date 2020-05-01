"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _entry = _interopRequireDefault(require("../entry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  width: 4rem;\n  height: 2.4rem;\n  background-image: url(\"image/marker.png\");\n  background-repeat: no-repeat;\n  background-position: 1.8rem 1rem;\n\n"]);

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MarkerEntry = /*#__PURE__*/function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  var _super = _createSuper(MarkerEntry);

  function MarkerEntry(selector, type, name) {
    var _this;

    _classCallCheck(this, MarkerEntry);

    _this = _super.call(this, selector, type);
    _this.name = name;
    return _this;
  }

  _createClass(MarkerEntry, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties, type) {
      var name = properties.name,
          markerEntry = _entry["default"].fromClass(Class, properties, type, name);

      return markerEntry;
    }
  }]);

  return MarkerEntry;
}(_entry["default"]);

_defineProperty(MarkerEntry, "defaultProperties", {
  className: "marker"
});

var _default = (0, _easyWithStyle["default"])(MarkerEntry)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcmtlci5qcyJdLCJuYW1lcyI6WyJNYXJrZXJFbnRyeSIsInNlbGVjdG9yIiwidHlwZSIsIm5hbWUiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJtYXJrZXJFbnRyeSIsIkVudHJ5IiwiZnJvbUNsYXNzIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFc7Ozs7O0FBQ0osdUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQztBQUFBOztBQUFBOztBQUNoQyw4QkFBTUYsUUFBTixFQUFnQkMsSUFBaEI7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFIZ0M7QUFJakM7Ozs7OEJBRVM7QUFDUixhQUFPLEtBQUtBLElBQVo7QUFDRDs7OzhCQU1nQkMsSyxFQUFPQyxVLEVBQVlILEksRUFBTTtBQUNsQyxVQUFFQyxJQUFGLEdBQVdFLFVBQVgsQ0FBRUYsSUFBRjtBQUFBLFVBQ0FHLFdBREEsR0FDY0Msa0JBQU1DLFNBQU4sQ0FBZ0JKLEtBQWhCLEVBQXVCQyxVQUF2QixFQUFtQ0gsSUFBbkMsRUFBeUNDLElBQXpDLENBRGQ7O0FBR04sYUFBT0csV0FBUDtBQUNEOzs7O0VBcEJ1QkMsaUI7O2dCQUFwQlAsVyx1QkFXdUI7QUFDekJTLEVBQUFBLFNBQVMsRUFBRTtBQURjLEM7O2VBWWQsK0JBQVVULFdBQVYsQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4uL2VudHJ5XCI7XG5cbmNsYXNzIE1hcmtlckVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSwgbmFtZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcIm1hcmtlclwiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtYXJrZXJFbnRyeSA9IEVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSwgbmFtZSk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKE1hcmtlckVudHJ5KWBcblxuICB3aWR0aDogNHJlbTtcbiAgaGVpZ2h0OiAyLjRyZW07XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImltYWdlL21hcmtlci5wbmdcIik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDEuOHJlbSAxcmVtO1xuXG5gO1xuIl19