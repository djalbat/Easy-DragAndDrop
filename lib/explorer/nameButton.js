'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    InputElement = easyui.InputElement;

var NameButton = function (_InputElement) {
  _inherits(NameButton, _InputElement);

  function NameButton(selector, name, doubleClickHandler) {
    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, selector));

    _this.setName(name);

    if (doubleClickHandler) {
      _this.onDoubleClick(doubleClickHandler);
    }
    return _this;
  }

  _createClass(NameButton, [{
    key: 'getName',
    value: function getName() {
      var name = this.html(); ///

      return name;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      var html = name; ///

      this.html(html);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var name = properties.name;
      var onDoubleClick = properties.onDoubleClick;
      var doubleClickHandler = onDoubleClick; ///

      return InputElement.fromProperties(NameButton, properties, name, doubleClickHandler);
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  type: 'button',
  ignoredAttributes: ['name', 'onDoubleClick']
});

module.exports = NameButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJJbnB1dEVsZW1lbnQiLCJOYW1lQnV0dG9uIiwic2VsZWN0b3IiLCJuYW1lIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwic2V0TmFtZSIsIm9uRG91YmxlQ2xpY2siLCJodG1sIiwiaGFuZGxlciIsIm9uIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidHlwZSIsImlnbm9yZWRBdHRyaWJ1dGVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLGVBQWVGLE9BQU9FLFlBRDVCOztJQUdNQyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLGtCQUE1QixFQUFnRDtBQUFBOztBQUFBLHdIQUN4Q0YsUUFEd0M7O0FBRzlDLFVBQUtHLE9BQUwsQ0FBYUYsSUFBYjs7QUFFQSxRQUFJQyxrQkFBSixFQUF3QjtBQUN0QixZQUFLRSxhQUFMLENBQW1CRixrQkFBbkI7QUFDRDtBQVA2QztBQVEvQzs7Ozs4QkFFUztBQUNSLFVBQU1ELE9BQU8sS0FBS0ksSUFBTCxFQUFiLENBRFEsQ0FDa0I7O0FBRTFCLGFBQU9KLElBQVA7QUFDRDs7OzRCQUVPQSxJLEVBQU07QUFDWixVQUFNSSxPQUFPSixJQUFiLENBRFksQ0FDUTs7QUFFcEIsV0FBS0ksSUFBTCxDQUFVQSxJQUFWO0FBQ0Q7OztrQ0FFYUMsTyxFQUFTO0FBQ3JCLFdBQUtDLEVBQUwsQ0FBUSxVQUFSLEVBQW9CRCxPQUFwQjtBQUNEOzs7bUNBRXFCRSxVLEVBQVk7QUFBQSxVQUN4QlAsSUFEd0IsR0FDQU8sVUFEQSxDQUN4QlAsSUFEd0I7QUFDMUIsVUFBUUcsYUFBUixHQUEwQkksVUFBMUIsQ0FBUUosYUFBUjtBQUNBLCtCQUFxQkEsYUFBckIsQ0FGMEIsQ0FFVTs7QUFFMUMsYUFBT04sYUFBYVcsY0FBYixDQUE0QlYsVUFBNUIsRUFBd0NTLFVBQXhDLEVBQW9EUCxJQUFwRCxFQUEwREMsa0JBQTFELENBQVA7QUFDRDs7OztFQWhDc0JKLFk7O0FBbUN6QlksT0FBT0MsTUFBUCxDQUFjWixVQUFkLEVBQTBCO0FBQ3hCYSxRQUFNLFFBRGtCO0FBRXhCQyxxQkFBbUIsQ0FDakIsTUFEaUIsRUFFakIsZUFGaUI7QUFGSyxDQUExQjs7QUFRQUMsT0FBT0MsT0FBUCxHQUFpQmhCLFVBQWpCIiwiZmlsZSI6Im5hbWVCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeXVpLklucHV0RWxlbWVudDtcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnNldE5hbWUobmFtZSk7XG4gICAgXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5odG1sKCk7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICBjb25zdCBodG1sID0gbmFtZTsgIC8vL1xuXG4gICAgdGhpcy5odG1sKGh0bWwpO1xuICB9XG4gIFxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgb25Eb3VibGVDbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSBvbkRvdWJsZUNsaWNrOyAvLy9cbiAgICBcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKE5hbWVCdXR0b24sIHByb3BlcnRpZXMsIG5hbWUsIGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihOYW1lQnV0dG9uLCB7XG4gIHR5cGU6ICdidXR0b24nLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICduYW1lJyxcbiAgICAnb25Eb3VibGVDbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiJdfQ==