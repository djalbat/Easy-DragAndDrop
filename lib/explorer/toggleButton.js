'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    InputElement = easy.InputElement;

var ToggleButton = function (_InputElement) {
  _inherits(ToggleButton, _InputElement);

  function ToggleButton(selector, updateHandler) {
    _classCallCheck(this, ToggleButton);

    var _this = _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).call(this, selector));

    _this.updateHandler = updateHandler;

    _this.onClick(_this.clickHandler.bind(_this));
    return _this;
  }

  _createClass(ToggleButton, [{
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.removeClass('collapsed');
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.addClass('collapsed');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.toggleClass('collapsed');

      var collapsed = this.isCollapsed();

      this.updateHandler(collapsed);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.toggle();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var updateHandler = properties.updateHandler;


      return InputElement.fromProperties(ToggleButton, properties, updateHandler);
    }
  }]);

  return ToggleButton;
}(InputElement);

Object.assign(ToggleButton, {
  tagName: 'button',
  ignoredAttributes: ['updateHandler']
});

module.exports = ToggleButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJJbnB1dEVsZW1lbnQiLCJUb2dnbGVCdXR0b24iLCJzZWxlY3RvciIsInVwZGF0ZUhhbmRsZXIiLCJvbkNsaWNrIiwiY2xpY2tIYW5kbGVyIiwiYmluZCIsImNvbGxhcHNlZCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInRvZ2dsZUNsYXNzIiwiaXNDb2xsYXBzZWQiLCJ0b2dnbGUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsZUFBZUYsS0FBS0UsWUFEMUI7O0lBR01DLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUFBLDRIQUM3QkQsUUFENkI7O0FBR25DLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtDLE9BQUwsQ0FBYSxNQUFLQyxZQUFMLENBQWtCQyxJQUFsQixPQUFiO0FBTG1DO0FBTXBDOzs7O2tDQUVhO0FBQ1osVUFBTUMsWUFBWSxLQUFLQyxRQUFMLENBQWMsV0FBZCxDQUFsQjs7QUFFQSxhQUFPRCxTQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtFLFdBQUwsQ0FBaUIsV0FBakI7QUFDRDs7OytCQUVVO0FBQ1QsV0FBS0MsUUFBTCxDQUFjLFdBQWQ7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0MsV0FBTCxDQUFpQixXQUFqQjs7QUFFQSxVQUFNSixZQUFZLEtBQUtLLFdBQUwsRUFBbEI7O0FBRUEsV0FBS1QsYUFBTCxDQUFtQkksU0FBbkI7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS00sTUFBTDtBQUNEOzs7bUNBRXFCQyxVLEVBQVk7QUFBQSxVQUN4QlgsYUFEd0IsR0FDTlcsVUFETSxDQUN4QlgsYUFEd0I7OztBQUdoQyxhQUFPSCxhQUFhZSxjQUFiLENBQTRCZCxZQUE1QixFQUEwQ2EsVUFBMUMsRUFBc0RYLGFBQXRELENBQVA7QUFDRDs7OztFQXZDd0JILFk7O0FBMEMzQmdCLE9BQU9DLE1BQVAsQ0FBY2hCLFlBQWQsRUFBNEI7QUFDMUJpQixXQUFTLFFBRGlCO0FBRTFCQyxxQkFBbUIsQ0FDakIsZUFEaUI7QUFGTyxDQUE1Qjs7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQnBCLFlBQWpCIiwiZmlsZSI6InRvZ2dsZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3kuSW5wdXRFbGVtZW50O1xuXG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdXBkYXRlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlciA9IHVwZGF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLm9uQ2xpY2sodGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpO1xuICB9XG4gIFxuICBjbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB1cGRhdGVIYW5kbGVyIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoVG9nZ2xlQnV0dG9uLCBwcm9wZXJ0aWVzLCB1cGRhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFRvZ2dsZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAndXBkYXRlSGFuZGxlcidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVG9nZ2xlQnV0dG9uO1xuIl19