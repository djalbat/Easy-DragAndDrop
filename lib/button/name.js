"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _button = _interopRequireDefault(require("../button"));

var _necessary = require("necessary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  border: none;\n  height: 2.4rem;\n  outline: none;\n  display: inline-block;\n  text-align: left;\n  background-color: transparent;\n  background-repeat: no-repeat;\n\n"]);

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

var first = _necessary.arrayUtilities.first;

var NameButton = /*#__PURE__*/function (_Button) {
  _inherits(NameButton, _Button);

  var _super = _createSuper(NameButton);

  function NameButton() {
    _classCallCheck(this, NameButton);

    return _super.apply(this, arguments);
  }

  _createClass(NameButton, [{
    key: "getName",
    value: function getName() {
      var childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

      return name;
    }
  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(doubleClickHandler) {
      this.on("dblclick", doubleClickHandler);
    }
  }, {
    key: "parentContext",
    value: function parentContext() {
      var getName = this.getName.bind(this),
          onDoubleClick = this.onDoubleClick.bind(this);
      return {
        getName: getName,
        onDoubleClick: onDoubleClick
      };
    }
  }]);

  return NameButton;
}(_button["default"]);

_defineProperty(NameButton, "defaultProperties", {
  className: "name"
});

var _default = (0, _easyWithStyle["default"])(NameButton)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWUuanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsIk5hbWVCdXR0b24iLCJjaGlsZEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImZpcnN0Q2hpbGRFbGVtZW50IiwiZmlyc3RDaGlsZEVsZW1lbnRUZXh0IiwiZ2V0VGV4dCIsIm5hbWUiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbiIsImdldE5hbWUiLCJiaW5kIiwib25Eb3VibGVDbGljayIsIkJ1dHRvbiIsImNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLEssR0FBVUMseUIsQ0FBVkQsSzs7SUFFRkUsVTs7Ozs7Ozs7Ozs7Ozs4QkFDTTtBQUNSLFVBQU1DLGFBQWEsR0FBRyxLQUFLQyxnQkFBTCxFQUF0QjtBQUFBLFVBQ01DLGlCQUFpQixHQUFHTCxLQUFLLENBQUNHLGFBQUQsQ0FEL0I7QUFBQSxVQUVNRyxxQkFBcUIsR0FBR0QsaUJBQWlCLENBQUNFLE9BQWxCLEVBRjlCO0FBQUEsVUFHTUMsSUFBSSxHQUFHRixxQkFIYixDQURRLENBSTRCOztBQUVwQyxhQUFPRSxJQUFQO0FBQ0Q7OztrQ0FFYUMsa0IsRUFBb0I7QUFDaEMsV0FBS0MsRUFBTCxDQUFRLFVBQVIsRUFBb0JELGtCQUFwQjtBQUNEOzs7b0NBRWU7QUFDZixVQUFNRSxPQUFPLEdBQUcsS0FBS0EsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWhCO0FBQUEsVUFDR0MsYUFBYSxHQUFHLEtBQUtBLGFBQUwsQ0FBbUJELElBQW5CLENBQXdCLElBQXhCLENBRG5CO0FBR0MsYUFBUTtBQUNORCxRQUFBQSxPQUFPLEVBQVBBLE9BRE07QUFFTkUsUUFBQUEsYUFBYSxFQUFiQTtBQUZNLE9BQVI7QUFJRDs7OztFQXRCc0JDLGtCOztnQkFBbkJaLFUsdUJBd0J1QjtBQUN6QmEsRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7ZUFLZCwrQkFBVWIsVUFBVixDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uL2J1dHRvblwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuY29uc3QgeyBmaXJzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBCdXR0b24ge1xuICBnZXROYW1lKCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGZpcnN0KGNoaWxkRWxlbWVudHMpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50VGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gZmlyc3RDaGlsZEVsZW1lbnRUZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgb25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICB0aGlzLm9uKFwiZGJsY2xpY2tcIiwgZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuICBcbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBnZXROYW1lID0gdGhpcy5nZXROYW1lLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgb25Eb3VibGVDbGljayA9IHRoaXMub25Eb3VibGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXROYW1lLFxuICAgICAgb25Eb3VibGVDbGlja1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJuYW1lXCJcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKE5hbWVCdXR0b24pYFxuXG4gIGJvcmRlcjogbm9uZTtcbiAgaGVpZ2h0OiAyLjRyZW07XG4gIG91dGxpbmU6IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cbmA7XG4iXX0=