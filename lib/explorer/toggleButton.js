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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToggleButton).call(this, [parentElement, '>button.toggle']));

    _this.updateHandler = updateHandler;

    _this.onClick(_this.toggle.bind(_this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7SUFDSSxTQUFTLE9BQU8sTUFEcEI7O0lBR00sWTs7O0FBQ0osd0JBQVksYUFBWixFQUEyQixhQUEzQixFQUEwQztBQUFBOztBQUFBLGdHQUNsQyxDQUFDLGFBQUQsRUFBZ0IsZ0JBQWhCLENBRGtDOztBQUd4QyxVQUFLLGFBQUwsR0FBcUIsYUFBckI7O0FBRUEsVUFBSyxPQUFMLENBQWEsTUFBSyxNQUFMLENBQVksSUFBWixPQUFiO0FBTHdDO0FBTXpDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLLFNBQVo7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBSyxTQUFMLEdBQWlCLEtBQWpCOztBQUVBLFdBQUssTUFBTDtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLLFNBQUwsR0FBaUIsSUFBakI7O0FBRUEsV0FBSyxNQUFMO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUssU0FBTCxHQUFpQixDQUFDLEtBQUssU0FBdkI7O0FBRUEsV0FBSyxNQUFMO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQUksT0FBTyxLQUFLLFNBQUwsR0FBaUIsYUFBYSw2QkFBOUIsR0FBOEQsYUFBYSw0QkFBdEY7O0FBRUEsV0FBSyxJQUFMLENBQVUsSUFBVjs7QUFFQSxXQUFLLGFBQUwsQ0FBbUIsS0FBSyxTQUF4QjtBQUNEOzs7O0VBckN3QixNOztBQXdDM0IsYUFBYSw2QkFBYixHQUE2QyxVQUE3QztBQUNBLGFBQWEsNEJBQWIsR0FBNEMsVUFBNUM7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLFlBQWpCIiwiZmlsZSI6InRvZ2dsZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEJ1dHRvbiA9IGVhc3l1aS5CdXR0b247XG5cbmNsYXNzIFRvZ2dsZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQsIHVwZGF0ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz5idXR0b24udG9nZ2xlJ10pO1xuXG4gICAgdGhpcy51cGRhdGVIYW5kbGVyID0gdXBkYXRlSGFuZGxlcjtcblxuICAgIHRoaXMub25DbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZDtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHZhciBodG1sID0gdGhpcy5jb2xsYXBzZWQgPyBUb2dnbGVCdXR0b24uQkxBQ0tfUklHSFRfUE9JTlRJTkdfVFJJQU5HTEUgOiBUb2dnbGVCdXR0b24uQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRTtcblxuICAgIHRoaXMuaHRtbChodG1sKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlcih0aGlzLmNvbGxhcHNlZCk7XG4gIH1cbn1cblxuVG9nZ2xlQnV0dG9uLkJMQUNLX1JJR0hUX1BPSU5USU5HX1RSSUFOR0xFID0gJyYjeDAyNWI2JztcblRvZ2dsZUJ1dHRvbi5CTEFDS19ET1dOX1BPSU5USU5HX1RSSUFOR0xFID0gJyYjeDAyNWJjJztcblxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVCdXR0b247XG4iXX0=
