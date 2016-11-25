'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Button = easyui.Button;

var ToggleButton = function (_Button) {
  _inherits(ToggleButton, _Button);

  function ToggleButton(parentElement, updateHandler) {
    _classCallCheck(this, ToggleButton);

    var _this = _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).call(this, [parentElement, '>button.toggle']));

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
  }]);

  return ToggleButton;
}(Button);

ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE = '&#x025b6';
ToggleButton.BLACK_DOWN_POINTING_TRIANGLE = '&#x025bc';

module.exports = ToggleButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkJ1dHRvbiIsIlRvZ2dsZUJ1dHRvbiIsInBhcmVudEVsZW1lbnQiLCJ1cGRhdGVIYW5kbGVyIiwib25DbGljayIsImNsaWNrSGFuZGxlciIsImJpbmQiLCJjb2xsYXBzZWQiLCJ1cGRhdGUiLCJ0b2dnbGUiLCJodG1sIiwiQkxBQ0tfUklHSFRfUE9JTlRJTkdfVFJJQU5HTEUiLCJCTEFDS19ET1dOX1BPSU5USU5HX1RSSUFOR0xFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFNBQVNGLE9BQU9FLE1BRHBCOztJQUdNQyxZOzs7QUFDSix3QkFBWUMsYUFBWixFQUEyQkMsYUFBM0IsRUFBMEM7QUFBQTs7QUFBQSw0SEFDbEMsQ0FBQ0QsYUFBRCxFQUFnQixnQkFBaEIsQ0FEa0M7O0FBR3hDLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtDLE9BQUwsQ0FBYSxNQUFLQyxZQUFMLENBQWtCQyxJQUFsQixPQUFiO0FBTHdDO0FBTXpDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLQyxTQUFaO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtBLFNBQUwsR0FBaUIsS0FBakI7O0FBRUEsV0FBS0MsTUFBTDtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLRCxTQUFMLEdBQWlCLElBQWpCOztBQUVBLFdBQUtDLE1BQUw7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0QsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCOztBQUVBLFdBQUtDLE1BQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS0MsTUFBTDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJQyxPQUFPLEtBQUtILFNBQUwsR0FDRU4sYUFBYVUsNkJBRGYsR0FFSVYsYUFBYVcsNEJBRjVCOztBQUlBLFdBQUtGLElBQUwsQ0FBVUEsSUFBVjs7QUFFQSxXQUFLUCxhQUFMLENBQW1CLEtBQUtJLFNBQXhCO0FBQ0Q7Ozs7RUEzQ3dCUCxNOztBQThDM0JDLGFBQWFVLDZCQUFiLEdBQTZDLFVBQTdDO0FBQ0FWLGFBQWFXLDRCQUFiLEdBQTRDLFVBQTVDOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCYixZQUFqQiIsImZpbGUiOiJ0b2dnbGVCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCdXR0b24gPSBlYXN5dWkuQnV0dG9uO1xuXG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBCdXR0b24ge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCB1cGRhdGVIYW5kbGVyKSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+YnV0dG9uLnRvZ2dsZSddKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlciA9IHVwZGF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLm9uQ2xpY2sodGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQ7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuICBcbiAgY2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdmFyIGh0bWwgPSB0aGlzLmNvbGxhcHNlZCA/IFxuICAgICAgICAgICAgICAgICBUb2dnbGVCdXR0b24uQkxBQ0tfUklHSFRfUE9JTlRJTkdfVFJJQU5HTEUgOiBcbiAgICAgICAgICAgICAgICAgICBUb2dnbGVCdXR0b24uQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRTtcblxuICAgIHRoaXMuaHRtbChodG1sKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlcih0aGlzLmNvbGxhcHNlZCk7XG4gIH1cbn1cblxuVG9nZ2xlQnV0dG9uLkJMQUNLX1JJR0hUX1BPSU5USU5HX1RSSUFOR0xFID0gJyYjeDAyNWI2JztcblRvZ2dsZUJ1dHRvbi5CTEFDS19ET1dOX1BPSU5USU5HX1RSSUFOR0xFID0gJyYjeDAyNWJjJztcblxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVCdXR0b247XG4iXX0=