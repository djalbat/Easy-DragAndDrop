"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  width: 2rem;\n  height: 2.4rem;\n  border: none;\n  outline: none;\n  display: inline-block;\n  background-color: transparent;\n\n  ::before {\n    width: 1.6rem;\n    content: \"\\025bc\";\n  }\n  \n  .collapsed::before {\n    content: \"\\025b6\";\n  }\n  \n"], ["\n\n  width: 2rem;\n  height: 2.4rem;\n  border: none;\n  outline: none;\n  display: inline-block;\n  background-color: transparent;\n\n  ::before {\n    width: 1.6rem;\n    content: \"\\\\025bc\";\n  }\n  \n  .collapsed::before {\n    content: \"\\\\025b6\";\n  }\n  \n"]);

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

var ToggleButton = /*#__PURE__*/function (_Button) {
  _inherits(ToggleButton, _Button);

  var _super = _createSuper(ToggleButton);

  function ToggleButton() {
    _classCallCheck(this, ToggleButton);

    return _super.apply(this, arguments);
  }

  _createClass(ToggleButton, [{
    key: "expand",
    value: function expand() {
      this.removeClass("collapsed");
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.addClass("collapsed");
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      var collapsed = this.hasClass("collapsed");
      return collapsed;
    }
  }, {
    key: "parentContext",
    value: function parentContext() {
      var isCollapsed = this.isCollapsed.bind(this),
          expandToggleButton = this.expand.bind(this),
          ///
      collapseToggleButton = this.collapse.bind(this); ///

      return {
        isCollapsed: isCollapsed,
        expandToggleButton: expandToggleButton,
        collapseToggleButton: collapseToggleButton
      };
    }
  }]);

  return ToggleButton;
}(_button["default"]);

_defineProperty(ToggleButton, "defaultProperties", {
  className: "toggle"
});

var _default = (0, _easyWithStyle["default"])(ToggleButton)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZ2dsZS5qcyJdLCJuYW1lcyI6WyJUb2dnbGVCdXR0b24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY29sbGFwc2VkIiwiaGFzQ2xhc3MiLCJpc0NvbGxhcHNlZCIsImJpbmQiLCJleHBhbmRUb2dnbGVCdXR0b24iLCJleHBhbmQiLCJjb2xsYXBzZVRvZ2dsZUJ1dHRvbiIsImNvbGxhcHNlIiwiQnV0dG9uIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsWTs7Ozs7Ozs7Ozs7Ozs2QkFDSztBQUNQLFdBQUtDLFdBQUwsQ0FBaUIsV0FBakI7QUFDRDs7OytCQUVVO0FBQ1QsV0FBS0MsUUFBTCxDQUFjLFdBQWQ7QUFDRDs7O2tDQUVhO0FBQ1osVUFBTUMsU0FBUyxHQUFHLEtBQUtDLFFBQUwsQ0FBYyxXQUFkLENBQWxCO0FBRUEsYUFBT0QsU0FBUDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFNRSxXQUFXLEdBQUcsS0FBS0EsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBcEI7QUFBQSxVQUNNQyxrQkFBa0IsR0FBRyxLQUFLQyxNQUFMLENBQVlGLElBQVosQ0FBaUIsSUFBakIsQ0FEM0I7QUFBQSxVQUNvRDtBQUM5Q0csTUFBQUEsb0JBQW9CLEdBQUcsS0FBS0MsUUFBTCxDQUFjSixJQUFkLENBQW1CLElBQW5CLENBRjdCLENBRGMsQ0FHMEM7O0FBRXhELGFBQVE7QUFDTkQsUUFBQUEsV0FBVyxFQUFYQSxXQURNO0FBRU5FLFFBQUFBLGtCQUFrQixFQUFsQkEsa0JBRk07QUFHTkUsUUFBQUEsb0JBQW9CLEVBQXBCQTtBQUhNLE9BQVI7QUFLRDs7OztFQXpCd0JFLGtCOztnQkFBckJYLFksdUJBMkJ1QjtBQUN6QlksRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7ZUFLZCwrQkFBVVosWUFBVixDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uL2J1dHRvblwiO1xuXG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBCdXR0b24ge1xuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKFwiY29sbGFwc2VkXCIpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgY29uc3QgaXNDb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkLmJpbmQodGhpcyksXG4gICAgICAgICAgZXhwYW5kVG9nZ2xlQnV0dG9uID0gdGhpcy5leHBhbmQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgICAgIGNvbGxhcHNlVG9nZ2xlQnV0dG9uID0gdGhpcy5jb2xsYXBzZS5iaW5kKHRoaXMpOyAgLy8vXG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGlzQ29sbGFwc2VkLFxuICAgICAgZXhwYW5kVG9nZ2xlQnV0dG9uLFxuICAgICAgY29sbGFwc2VUb2dnbGVCdXR0b25cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwidG9nZ2xlXCJcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKFRvZ2dsZUJ1dHRvbilgXG5cbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMi40cmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgOjpiZWZvcmUge1xuICAgIHdpZHRoOiAxLjZyZW07XG4gICAgY29udGVudDogXCJcXFxcMDI1YmNcIjtcbiAgfVxuICBcbiAgLmNvbGxhcHNlZDo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlxcXFwwMjViNlwiO1xuICB9XG4gIFxuYDtcbiJdfQ==