"use strict";

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

var easy = require("easy"),
    necessary = require("necessary");

var InputElement = easy.InputElement,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first;

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
}(InputElement);

Object.assign(NameButton, {
  tagName: "button",
  defaultProperties: {
    className: "name"
  },
  ignoredProperties: ["name"]
});
module.exports = NameButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJJbnB1dEVsZW1lbnQiLCJhcnJheVV0aWxpdGllcyIsImZpcnN0IiwiTmFtZUJ1dHRvbiIsImNoaWxkRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZmlyc3RDaGlsZEVsZW1lbnQiLCJmaXJzdENoaWxkRWxlbWVudFRleHQiLCJnZXRUZXh0IiwibmFtZSIsImhhbmRsZXIiLCJvbiIsImdldE5hbWUiLCJiaW5kIiwib25Eb3VibGVDbGljayIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7QUFBQSxJQUNNQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBRHpCOztBQUdNLElBQUVFLFlBQUYsR0FBbUJILElBQW5CLENBQUVHLFlBQUY7QUFBQSxJQUNFQyxjQURGLEdBQ3FCRixTQURyQixDQUNFRSxjQURGO0FBQUEsSUFFRUMsS0FGRixHQUVZRCxjQUZaLENBRUVDLEtBRkY7O0lBSUFDLFU7Ozs7Ozs7Ozs7Ozs7OEJBQ007QUFDUixVQUFNQyxhQUFhLEdBQUcsS0FBS0MsZ0JBQUwsRUFBdEI7QUFBQSxVQUNNQyxpQkFBaUIsR0FBR0osS0FBSyxDQUFDRSxhQUFELENBRC9CO0FBQUEsVUFFTUcscUJBQXFCLEdBQUdELGlCQUFpQixDQUFDRSxPQUFsQixFQUY5QjtBQUFBLFVBR01DLElBQUksR0FBR0YscUJBSGIsQ0FEUSxDQUk0Qjs7QUFFcEMsYUFBT0UsSUFBUDtBQUNEOzs7a0NBRWFDLE8sRUFBUztBQUNyQixXQUFLQyxFQUFMLENBQVEsVUFBUixFQUFvQkQsT0FBcEI7QUFDRDs7O29DQUVlO0FBQ2YsVUFBTUUsT0FBTyxHQUFHLEtBQUtBLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUFoQjtBQUFBLFVBQ0dDLGFBQWEsR0FBRyxLQUFLQSxhQUFMLENBQW1CRCxJQUFuQixDQUF3QixJQUF4QixDQURuQjtBQUdDLGFBQVE7QUFDTkQsUUFBQUEsT0FBTyxFQUFQQSxPQURNO0FBRU5FLFFBQUFBLGFBQWEsRUFBYkE7QUFGTSxPQUFSO0FBSUQ7Ozs7RUF0QnNCZCxZOztBQXlCekJlLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjYixVQUFkLEVBQTBCO0FBQ3hCYyxFQUFBQSxPQUFPLEVBQUUsUUFEZTtBQUV4QkMsRUFBQUEsaUJBQWlCLEVBQUU7QUFDakJDLElBQUFBLFNBQVMsRUFBRTtBQURNLEdBRks7QUFLeEJDLEVBQUFBLGlCQUFpQixFQUFFLENBQ2pCLE1BRGlCO0FBTEssQ0FBMUI7QUFVQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkIsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoXCJlYXN5XCIpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZShcIm5lY2Vzc2FyeVwiKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnRUZXh0ID0gZmlyc3RDaGlsZEVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICAgIG5hbWUgPSBmaXJzdENoaWxkRWxlbWVudFRleHQ7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKFwiZGJsY2xpY2tcIiwgaGFuZGxlcik7XG4gIH1cbiAgXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgZ2V0TmFtZSA9IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIG9uRG91YmxlQ2xpY2sgPSB0aGlzLm9uRG91YmxlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoe1xuICAgICAgZ2V0TmFtZSxcbiAgICAgIG9uRG91YmxlQ2xpY2tcbiAgICB9KTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKE5hbWVCdXR0b24sIHtcbiAgdGFnTmFtZTogXCJidXR0b25cIixcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6IFwibmFtZVwiXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgXCJuYW1lXCJcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiJdfQ==