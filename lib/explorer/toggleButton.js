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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIklucHV0RWxlbWVudCIsIlRvZ2dsZUJ1dHRvbiIsInNlbGVjdG9yIiwidXBkYXRlSGFuZGxlciIsIm9uQ2xpY2siLCJjbGlja0hhbmRsZXIiLCJiaW5kIiwiY29sbGFwc2VkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidG9nZ2xlQ2xhc3MiLCJpc0NvbGxhcHNlZCIsInRvZ2dsZSIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxlQUFlRixPQUFPRSxZQUQ1Qjs7SUFHTUMsWTs7O0FBQ0osd0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDO0FBQUE7O0FBQUEsNEhBQzdCRCxRQUQ2Qjs7QUFHbkMsVUFBS0MsYUFBTCxHQUFxQkEsYUFBckI7O0FBRUEsVUFBS0MsT0FBTCxDQUFhLE1BQUtDLFlBQUwsQ0FBa0JDLElBQWxCLE9BQWI7QUFMbUM7QUFNcEM7Ozs7a0NBRWE7QUFDWixVQUFNQyxZQUFZLEtBQUtDLFFBQUwsQ0FBYyxXQUFkLENBQWxCOztBQUVBLGFBQU9ELFNBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0UsV0FBTCxDQUFpQixXQUFqQjtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLQyxRQUFMLENBQWMsV0FBZDtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLQyxXQUFMLENBQWlCLFdBQWpCOztBQUVBLFVBQU1KLFlBQVksS0FBS0ssV0FBTCxFQUFsQjs7QUFFQSxXQUFLVCxhQUFMLENBQW1CSSxTQUFuQjtBQUNEOzs7bUNBRWM7QUFDYixXQUFLTSxNQUFMO0FBQ0Q7OzttQ0FFcUJDLFUsRUFBWTtBQUFBLFVBQ3hCWCxhQUR3QixHQUNOVyxVQURNLENBQ3hCWCxhQUR3Qjs7O0FBR2hDLGFBQU9ILGFBQWFlLGNBQWIsQ0FBNEJkLFlBQTVCLEVBQTBDYSxVQUExQyxFQUFzRFgsYUFBdEQsQ0FBUDtBQUNEOzs7O0VBdkN3QkgsWTs7QUEwQzNCZ0IsT0FBT0MsTUFBUCxDQUFjaEIsWUFBZCxFQUE0QjtBQUMxQmlCLFdBQVMsUUFEaUI7QUFFMUJDLHFCQUFtQixDQUNqQixlQURpQjtBQUZPLENBQTVCOztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCcEIsWUFBakIiLCJmaWxlIjoidG9nZ2xlQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3l1aS5JbnB1dEVsZW1lbnQ7XG5cbmNsYXNzIFRvZ2dsZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB1cGRhdGVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy51cGRhdGVIYW5kbGVyID0gdXBkYXRlSGFuZGxlcjtcblxuICAgIHRoaXMub25DbGljayh0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy51cGRhdGVIYW5kbGVyKGNvbGxhcHNlZCk7XG4gIH1cbiAgXG4gIGNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHVwZGF0ZUhhbmRsZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhUb2dnbGVCdXR0b24sIHByb3BlcnRpZXMsIHVwZGF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVG9nZ2xlQnV0dG9uLCB7XG4gIHRhZ05hbWU6ICdidXR0b24nLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICd1cGRhdGVIYW5kbGVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVCdXR0b247XG4iXX0=