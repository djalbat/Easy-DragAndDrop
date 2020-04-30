"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

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

var first = _necessary.arrayUtilities.first;

var NameButton = /*#__PURE__*/function (_InputElement) {
  _inherits(NameButton, _InputElement);

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
    value: function onDoubleClick(handler) {
      this.on("dblclick", handler);
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
}(_easy.InputElement);

exports["default"] = NameButton;
Object.assign(NameButton, {
  tagName: "button",
  defaultProperties: {
    className: "name"
  },
  ignoredProperties: ["name"]
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWUuanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsIk5hbWVCdXR0b24iLCJjaGlsZEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImZpcnN0Q2hpbGRFbGVtZW50IiwiZmlyc3RDaGlsZEVsZW1lbnRUZXh0IiwiZ2V0VGV4dCIsIm5hbWUiLCJoYW5kbGVyIiwib24iLCJnZXROYW1lIiwiYmluZCIsIm9uRG91YmxlQ2xpY2siLCJJbnB1dEVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLEssR0FBVUMseUIsQ0FBVkQsSzs7SUFFYUUsVTs7Ozs7Ozs7Ozs7Ozs4QkFDVDtBQUNSLFVBQU1DLGFBQWEsR0FBRyxLQUFLQyxnQkFBTCxFQUF0QjtBQUFBLFVBQ01DLGlCQUFpQixHQUFHTCxLQUFLLENBQUNHLGFBQUQsQ0FEL0I7QUFBQSxVQUVNRyxxQkFBcUIsR0FBR0QsaUJBQWlCLENBQUNFLE9BQWxCLEVBRjlCO0FBQUEsVUFHTUMsSUFBSSxHQUFHRixxQkFIYixDQURRLENBSTRCOztBQUVwQyxhQUFPRSxJQUFQO0FBQ0Q7OztrQ0FFYUMsTyxFQUFTO0FBQ3JCLFdBQUtDLEVBQUwsQ0FBUSxVQUFSLEVBQW9CRCxPQUFwQjtBQUNEOzs7b0NBRWU7QUFDZixVQUFNRSxPQUFPLEdBQUcsS0FBS0EsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWhCO0FBQUEsVUFDR0MsYUFBYSxHQUFHLEtBQUtBLGFBQUwsQ0FBbUJELElBQW5CLENBQXdCLElBQXhCLENBRG5CO0FBR0MsYUFBUTtBQUNORCxRQUFBQSxPQUFPLEVBQVBBLE9BRE07QUFFTkUsUUFBQUEsYUFBYSxFQUFiQTtBQUZNLE9BQVI7QUFJRDs7OztFQXRCcUNDLGtCOzs7QUF5QnhDQyxNQUFNLENBQUNDLE1BQVAsQ0FBY2QsVUFBZCxFQUEwQjtBQUN4QmUsRUFBQUEsT0FBTyxFQUFFLFFBRGU7QUFFeEJDLEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFETSxHQUZLO0FBS3hCQyxFQUFBQSxpQkFBaUIsRUFBRSxDQUNqQixNQURpQjtBQUxLLENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IElucHV0RWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuY29uc3QgeyBmaXJzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBnZXROYW1lKCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGZpcnN0KGNoaWxkRWxlbWVudHMpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50VGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gZmlyc3RDaGlsZEVsZW1lbnRUZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbihcImRibGNsaWNrXCIsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldE5hbWUgPSB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBvbkRvdWJsZUNsaWNrID0gdGhpcy5vbkRvdWJsZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldE5hbWUsXG4gICAgICBvbkRvdWJsZUNsaWNrXG4gICAgfSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihOYW1lQnV0dG9uLCB7XG4gIHRhZ05hbWU6IFwiYnV0dG9uXCIsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcIm5hbWVcIlxuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgIFwibmFtZVwiXG4gIF1cbn0pO1xuIl19