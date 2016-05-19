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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQVQ7SUFDQSxTQUFTLE9BQU8sTUFBUDs7SUFFUDs7O0FBQ0osV0FESSxZQUNKLENBQVksYUFBWixFQUEyQixhQUEzQixFQUEwQzswQkFEdEMsY0FDc0M7O3VFQUR0Qyx5QkFFSSxDQUFDLGFBQUQsRUFBZ0IsZ0JBQWhCLElBRGtDOztBQUd4QyxVQUFLLGFBQUwsR0FBcUIsYUFBckIsQ0FId0M7O0FBS3hDLFVBQUssT0FBTCxDQUFhLE1BQUssTUFBTCxDQUFZLElBQVosT0FBYixFQUx3Qzs7R0FBMUM7O2VBREk7O2tDQVNVO0FBQ1osYUFBTyxLQUFLLFNBQUwsQ0FESzs7Ozs2QkFJTDtBQUNQLFdBQUssU0FBTCxHQUFpQixLQUFqQixDQURPOztBQUdQLFdBQUssTUFBTCxHQUhPOzs7OytCQU1FO0FBQ1QsV0FBSyxTQUFMLEdBQWlCLElBQWpCLENBRFM7O0FBR1QsV0FBSyxNQUFMLEdBSFM7Ozs7NkJBTUY7QUFDUCxXQUFLLFNBQUwsR0FBaUIsQ0FBQyxLQUFLLFNBQUwsQ0FEWDs7QUFHUCxXQUFLLE1BQUwsR0FITzs7Ozs2QkFNQTtBQUNQLFVBQUksT0FBTyxLQUFLLFNBQUwsR0FBaUIsYUFBYSw2QkFBYixHQUE2QyxhQUFhLDRCQUFiLENBRGxFOztBQUdQLFdBQUssSUFBTCxDQUFVLElBQVYsRUFITzs7QUFLUCxXQUFLLGFBQUwsQ0FBbUIsS0FBSyxTQUFMLENBQW5CLENBTE87Ozs7U0EvQkw7RUFBcUI7O0FBd0MzQixhQUFhLDZCQUFiLEdBQTZDLFVBQTdDO0FBQ0EsYUFBYSw0QkFBYixHQUE0QyxVQUE1Qzs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsWUFBakIiLCJmaWxlIjoidG9nZ2xlQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgQnV0dG9uID0gZWFzeXVpLkJ1dHRvbjtcblxuY2xhc3MgVG9nZ2xlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgdXBkYXRlSGFuZGxlcikge1xuICAgIHN1cGVyKFtwYXJlbnRFbGVtZW50LCAnPmJ1dHRvbi50b2dnbGUnXSk7XG5cbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXIgPSB1cGRhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5vbkNsaWNrKHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdmFyIGh0bWwgPSB0aGlzLmNvbGxhcHNlZCA/IFRvZ2dsZUJ1dHRvbi5CTEFDS19SSUdIVF9QT0lOVElOR19UUklBTkdMRSA6IFRvZ2dsZUJ1dHRvbi5CTEFDS19ET1dOX1BPSU5USU5HX1RSSUFOR0xFO1xuXG4gICAgdGhpcy5odG1sKGh0bWwpO1xuXG4gICAgdGhpcy51cGRhdGVIYW5kbGVyKHRoaXMuY29sbGFwc2VkKTtcbiAgfVxufVxuXG5Ub2dnbGVCdXR0b24uQkxBQ0tfUklHSFRfUE9JTlRJTkdfVFJJQU5HTEUgPSAnJiN4MDI1YjYnO1xuVG9nZ2xlQnV0dG9uLkJMQUNLX0RPV05fUE9JTlRJTkdfVFJJQU5HTEUgPSAnJiN4MDI1YmMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvZ2dsZUJ1dHRvbjtcbiJdfQ==
