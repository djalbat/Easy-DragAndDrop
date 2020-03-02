'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var easy = require('easy'),
    necessary = require('necessary');

var InputElement = easy.InputElement,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first;

var NameButton = /*#__PURE__*/function (_InputElement) {
  _inherits(NameButton, _InputElement);

  function NameButton() {
    _classCallCheck(this, NameButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(NameButton).apply(this, arguments));
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
      this.on('dblclick', handler);
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
  }], [{
    key: "fromProperties",
    value: function fromProperties(properties) {
      return InputElement.fromProperties(NameButton, properties);
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  tagName: 'button',
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: ['name']
});
module.exports = NameButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJJbnB1dEVsZW1lbnQiLCJhcnJheVV0aWxpdGllcyIsImZpcnN0IiwiTmFtZUJ1dHRvbiIsImNoaWxkRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZmlyc3RDaGlsZEVsZW1lbnQiLCJmaXJzdENoaWxkRWxlbWVudFRleHQiLCJnZXRUZXh0IiwibmFtZSIsImhhbmRsZXIiLCJvbiIsImdldE5hbWUiLCJiaW5kIiwib25Eb3VibGVDbGljayIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjtBQUFBLElBQ01DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLFdBQUQsQ0FEekI7O0FBR00sSUFBRUUsWUFBRixHQUFtQkgsSUFBbkIsQ0FBRUcsWUFBRjtBQUFBLElBQ0VDLGNBREYsR0FDcUJGLFNBRHJCLENBQ0VFLGNBREY7QUFBQSxJQUVFQyxLQUZGLEdBRVlELGNBRlosQ0FFRUMsS0FGRjs7SUFJQUMsVTs7Ozs7Ozs7Ozs7OEJBQ007QUFDUixVQUFNQyxhQUFhLEdBQUcsS0FBS0MsZ0JBQUwsRUFBdEI7QUFBQSxVQUNNQyxpQkFBaUIsR0FBR0osS0FBSyxDQUFDRSxhQUFELENBRC9CO0FBQUEsVUFFTUcscUJBQXFCLEdBQUdELGlCQUFpQixDQUFDRSxPQUFsQixFQUY5QjtBQUFBLFVBR01DLElBQUksR0FBR0YscUJBSGIsQ0FEUSxDQUk0Qjs7QUFFcEMsYUFBT0UsSUFBUDtBQUNEOzs7a0NBRWFDLE8sRUFBUztBQUNyQixXQUFLQyxFQUFMLENBQVEsVUFBUixFQUFvQkQsT0FBcEI7QUFDRDs7O29DQUVlO0FBQ2YsVUFBTUUsT0FBTyxHQUFHLEtBQUtBLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUFoQjtBQUFBLFVBQ0dDLGFBQWEsR0FBRyxLQUFLQSxhQUFMLENBQW1CRCxJQUFuQixDQUF3QixJQUF4QixDQURuQjtBQUdDLGFBQVE7QUFDTkQsUUFBQUEsT0FBTyxFQUFQQSxPQURNO0FBRU5FLFFBQUFBLGFBQWEsRUFBYkE7QUFGTSxPQUFSO0FBSUQ7OzttQ0FFcUJDLFUsRUFBWTtBQUFFLGFBQU9mLFlBQVksQ0FBQ2dCLGNBQWIsQ0FBNEJiLFVBQTVCLEVBQXdDWSxVQUF4QyxDQUFQO0FBQTZEOzs7O0VBeEIxRWYsWTs7QUEyQnpCaUIsTUFBTSxDQUFDQyxNQUFQLENBQWNmLFVBQWQsRUFBMEI7QUFDeEJnQixFQUFBQSxPQUFPLEVBQUUsUUFEZTtBQUV4QkMsRUFBQUEsaUJBQWlCLEVBQUU7QUFDakJDLElBQUFBLFNBQVMsRUFBRTtBQURNLEdBRks7QUFLeEJDLEVBQUFBLGlCQUFpQixFQUFFLENBQ2pCLE1BRGlCO0FBTEssQ0FBMUI7QUFVQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCckIsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnRUZXh0ID0gZmlyc3RDaGlsZEVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICAgIG5hbWUgPSBmaXJzdENoaWxkRWxlbWVudFRleHQ7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldE5hbWUgPSB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBvbkRvdWJsZUNsaWNrID0gdGhpcy5vbkRvdWJsZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldE5hbWUsXG4gICAgICBvbkRvdWJsZUNsaWNrXG4gICAgfSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTmFtZUJ1dHRvbiwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihOYW1lQnV0dG9uLCB7XG4gIHRhZ05hbWU6ICdidXR0b24nLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ25hbWUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG4iXX0=