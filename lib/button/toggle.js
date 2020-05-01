"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  outline: none;\n  border: none;\n  height: 2.4rem;\n  width: 2rem;\n  position: relative;\n  vertical-align: top;\n  background-color: transparent;\n  \n  .collapsed {\n    content: \"\\025b6\";\n  }\n\n  ::before {\n    position: absolute;\n    top: 0.4rem;\n    left: 0.4rem;\n    width: 1.6rem;\n    content: \"\\025bc\";\n  }\n  \n"], ["\n\n  outline: none;\n  border: none;\n  height: 2.4rem;\n  width: 2rem;\n  position: relative;\n  vertical-align: top;\n  background-color: transparent;\n  \n  .collapsed {\n    content: \"\\\\025b6\";\n  }\n\n  ::before {\n    position: absolute;\n    top: 0.4rem;\n    left: 0.4rem;\n    width: 1.6rem;\n    content: \"\\\\025bc\";\n  }\n  \n"]);

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
}(_easy.Button);

_defineProperty(ToggleButton, "defaultProperties", {
  className: "toggle"
});

var _default = (0, _easyWithStyle["default"])(ToggleButton)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZ2dsZS5qcyJdLCJuYW1lcyI6WyJUb2dnbGVCdXR0b24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY29sbGFwc2VkIiwiaGFzQ2xhc3MiLCJpc0NvbGxhcHNlZCIsImJpbmQiLCJleHBhbmRUb2dnbGVCdXR0b24iLCJleHBhbmQiLCJjb2xsYXBzZVRvZ2dsZUJ1dHRvbiIsImNvbGxhcHNlIiwiQnV0dG9uIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFk7Ozs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxXQUFLQyxXQUFMLENBQWlCLFdBQWpCO0FBQ0Q7OzsrQkFFVTtBQUNULFdBQUtDLFFBQUwsQ0FBYyxXQUFkO0FBQ0Q7OztrQ0FFYTtBQUNaLFVBQU1DLFNBQVMsR0FBRyxLQUFLQyxRQUFMLENBQWMsV0FBZCxDQUFsQjtBQUVBLGFBQU9ELFNBQVA7QUFDRDs7O29DQUVlO0FBQ2QsVUFBTUUsV0FBVyxHQUFHLEtBQUtBLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLENBQXBCO0FBQUEsVUFDTUMsa0JBQWtCLEdBQUcsS0FBS0MsTUFBTCxDQUFZRixJQUFaLENBQWlCLElBQWpCLENBRDNCO0FBQUEsVUFDb0Q7QUFDOUNHLE1BQUFBLG9CQUFvQixHQUFHLEtBQUtDLFFBQUwsQ0FBY0osSUFBZCxDQUFtQixJQUFuQixDQUY3QixDQURjLENBRzBDOztBQUV4RCxhQUFRO0FBQ05ELFFBQUFBLFdBQVcsRUFBWEEsV0FETTtBQUVORSxRQUFBQSxrQkFBa0IsRUFBbEJBLGtCQUZNO0FBR05FLFFBQUFBLG9CQUFvQixFQUFwQkE7QUFITSxPQUFSO0FBS0Q7Ozs7RUF6QndCRSxZOztnQkFBckJYLFksdUJBMkJ1QjtBQUN6QlksRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7ZUFLZCwrQkFBVVosWUFBVixDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJlYXN5XCI7XG5cbmNsYXNzIFRvZ2dsZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICBjb25zdCBpc0NvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICBleHBhbmRUb2dnbGVCdXR0b24gPSB0aGlzLmV4cGFuZC5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VUb2dnbGVCdXR0b24gPSB0aGlzLmNvbGxhcHNlLmJpbmQodGhpcyk7ICAvLy9cblxuICAgIHJldHVybiAoe1xuICAgICAgaXNDb2xsYXBzZWQsXG4gICAgICBleHBhbmRUb2dnbGVCdXR0b24sXG4gICAgICBjb2xsYXBzZVRvZ2dsZUJ1dHRvblxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJ0b2dnbGVcIlxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoVG9nZ2xlQnV0dG9uKWBcblxuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGhlaWdodDogMi40cmVtO1xuICB3aWR0aDogMnJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgXG4gIC5jb2xsYXBzZWQge1xuICAgIGNvbnRlbnQ6IFwiXFxcXDAyNWI2XCI7XG4gIH1cblxuICA6OmJlZm9yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMC40cmVtO1xuICAgIGxlZnQ6IDAuNHJlbTtcbiAgICB3aWR0aDogMS42cmVtO1xuICAgIGNvbnRlbnQ6IFwiXFxcXDAyNWJjXCI7XG4gIH1cbiAgXG5gO1xuIl19