'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    InputElement = easyui.InputElement;

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
      return this.collapsed;
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.collapsed = false;

      this.update();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.collapsed = true;

      this.update();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.collapsed = !this.collapsed;

      this.update();
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.toggle();
    }
  }, {
    key: 'update',
    value: function update() {
      var html = this.collapsed ? ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE : ToggleButton.BLACK_DOWN_POINTING_TRIANGLE;

      this.html(html);

      this.updateHandler(this.collapsed);
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
  ignoredAttributes: ['updateHandler'],
  BLACK_RIGHT_POINTING_TRIANGLE: '&#x025b6',
  BLACK_DOWN_POINTING_TRIANGLE: '&#x025bc'
});

module.exports = ToggleButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIklucHV0RWxlbWVudCIsIlRvZ2dsZUJ1dHRvbiIsInNlbGVjdG9yIiwidXBkYXRlSGFuZGxlciIsIm9uQ2xpY2siLCJjbGlja0hhbmRsZXIiLCJiaW5kIiwiY29sbGFwc2VkIiwidXBkYXRlIiwidG9nZ2xlIiwiaHRtbCIsIkJMQUNLX1JJR0hUX1BPSU5USU5HX1RSSUFOR0xFIiwiQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRSIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxlQUFlRixPQUFPRSxZQUQ1Qjs7SUFHTUMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDO0FBQUE7O0FBQUEsNEhBQzdCRCxRQUQ2Qjs7QUFHbkMsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7O0FBRUEsVUFBS0MsT0FBTCxDQUFhLE1BQUtDLFlBQUwsQ0FBa0JDLElBQWxCLE9BQWI7QUFMbUM7QUFNcEM7Ozs7a0NBRWE7QUFDWixhQUFPLEtBQUtDLFNBQVo7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0EsU0FBTCxHQUFpQixLQUFqQjs7QUFFQSxXQUFLQyxNQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULFdBQUtELFNBQUwsR0FBaUIsSUFBakI7O0FBRUEsV0FBS0MsTUFBTDtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLRCxTQUFMLEdBQWlCLENBQUMsS0FBS0EsU0FBdkI7O0FBRUEsV0FBS0MsTUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLQyxNQUFMO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1DLE9BQU8sS0FBS0gsU0FBTCxHQUNFTixhQUFhVSw2QkFEZixHQUVJVixhQUFhVyw0QkFGOUI7O0FBSUEsV0FBS0YsSUFBTCxDQUFVQSxJQUFWOztBQUVBLFdBQUtQLGFBQUwsQ0FBbUIsS0FBS0ksU0FBeEI7QUFDRDs7O21DQUVxQk0sVSxFQUFZO0FBQUEsVUFDeEJWLGFBRHdCLEdBQ05VLFVBRE0sQ0FDeEJWLGFBRHdCOzs7QUFHaEMsYUFBT0gsYUFBYWMsY0FBYixDQUE0QmIsWUFBNUIsRUFBMENZLFVBQTFDLEVBQXNEVixhQUF0RCxDQUFQO0FBQ0Q7Ozs7RUFqRHdCSCxZOztBQW9EM0JlLE9BQU9DLE1BQVAsQ0FBY2YsWUFBZCxFQUE0QjtBQUMxQmdCLFdBQVMsUUFEaUI7QUFFMUJDLHFCQUFtQixDQUNqQixlQURpQixDQUZPO0FBSzFCUCxpQ0FBK0IsVUFMTDtBQU0xQkMsZ0NBQThCO0FBTkosQ0FBNUI7O0FBU0FPLE9BQU9DLE9BQVAsR0FBaUJuQixZQUFqQiIsImZpbGUiOiJ0b2dnbGVCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeXVpLklucHV0RWxlbWVudDtcblxuY2xhc3MgVG9nZ2xlQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHVwZGF0ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXIgPSB1cGRhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5vbkNsaWNrKHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbiAgXG4gIGNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNvbGxhcHNlZCA/IFxuICAgICAgICAgICAgICAgICAgIFRvZ2dsZUJ1dHRvbi5CTEFDS19SSUdIVF9QT0lOVElOR19UUklBTkdMRSA6IFxuICAgICAgICAgICAgICAgICAgICAgVG9nZ2xlQnV0dG9uLkJMQUNLX0RPV05fUE9JTlRJTkdfVFJJQU5HTEU7XG5cbiAgICB0aGlzLmh0bWwoaHRtbCk7XG5cbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXIodGhpcy5jb2xsYXBzZWQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHVwZGF0ZUhhbmRsZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhUb2dnbGVCdXR0b24sIHByb3BlcnRpZXMsIHVwZGF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVG9nZ2xlQnV0dG9uLCB7XG4gIHRhZ05hbWU6ICdidXR0b24nLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICd1cGRhdGVIYW5kbGVyJ1xuICBdLFxuICBCTEFDS19SSUdIVF9QT0lOVElOR19UUklBTkdMRTogJyYjeDAyNWI2JyxcbiAgQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRTogJyYjeDAyNWJjJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVG9nZ2xlQnV0dG9uO1xuIl19