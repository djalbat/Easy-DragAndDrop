'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Button = easyui.Button,
    InputElement = easyui.InputElement;

var ToggleButton = function (_Button) {
  _inherits(ToggleButton, _Button);

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
    key: 'fromParentElement',
    value: function fromParentElement(parentElement, updateHandler) {
      var selector = 'button.toggle',
          domElement = parentElement.domElement.querySelector(selector);

      return InputElement.fromDOMElement(ToggleButton, domElement, updateHandler);
    }
  }]);

  return ToggleButton;
}(Button);

ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE = '&#x025b6';
ToggleButton.BLACK_DOWN_POINTING_TRIANGLE = '&#x025bc';

module.exports = ToggleButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkJ1dHRvbiIsIklucHV0RWxlbWVudCIsIlRvZ2dsZUJ1dHRvbiIsInNlbGVjdG9yIiwidXBkYXRlSGFuZGxlciIsIm9uQ2xpY2siLCJjbGlja0hhbmRsZXIiLCJiaW5kIiwiY29sbGFwc2VkIiwidXBkYXRlIiwidG9nZ2xlIiwiaHRtbCIsIkJMQUNLX1JJR0hUX1BPSU5USU5HX1RSSUFOR0xFIiwiQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRSIsInBhcmVudEVsZW1lbnQiLCJkb21FbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImZyb21ET01FbGVtZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLFNBQVNGLE9BQU9FLE1BRHRCO0FBQUEsSUFFTUMsZUFBZUgsT0FBT0csWUFGNUI7O0lBSU1DLFk7OztBQUNKLHdCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUFBLDRIQUM3QkQsUUFENkI7O0FBR25DLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtDLE9BQUwsQ0FBYSxNQUFLQyxZQUFMLENBQWtCQyxJQUFsQixPQUFiO0FBTG1DO0FBTXBDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLQyxTQUFaO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtBLFNBQUwsR0FBaUIsS0FBakI7O0FBRUEsV0FBS0MsTUFBTDtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLRCxTQUFMLEdBQWlCLElBQWpCOztBQUVBLFdBQUtDLE1BQUw7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0QsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCOztBQUVBLFdBQUtDLE1BQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS0MsTUFBTDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxPQUFPLEtBQUtILFNBQUwsR0FDRU4sYUFBYVUsNkJBRGYsR0FFSVYsYUFBYVcsNEJBRjlCOztBQUlBLFdBQUtGLElBQUwsQ0FBVUEsSUFBVjs7QUFFQSxXQUFLUCxhQUFMLENBQW1CLEtBQUtJLFNBQXhCO0FBQ0Q7OztzQ0FFd0JNLGEsRUFBZVYsYSxFQUFlO0FBQ3JELFVBQU1ELFdBQVcsZUFBakI7QUFBQSxVQUNNWSxhQUFhRCxjQUFjQyxVQUFkLENBQXlCQyxhQUF6QixDQUF1Q2IsUUFBdkMsQ0FEbkI7O0FBR0EsYUFBT0YsYUFBYWdCLGNBQWIsQ0FBNEJmLFlBQTVCLEVBQTBDYSxVQUExQyxFQUFzRFgsYUFBdEQsQ0FBUDtBQUNEOzs7O0VBbER3QkosTTs7QUFxRDNCRSxhQUFhVSw2QkFBYixHQUE2QyxVQUE3QztBQUNBVixhQUFhVyw0QkFBYixHQUE0QyxVQUE1Qzs7QUFFQUssT0FBT0MsT0FBUCxHQUFpQmpCLFlBQWpCIiwiZmlsZSI6InRvZ2dsZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBCdXR0b24gPSBlYXN5dWkuQnV0dG9uLFxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeXVpLklucHV0RWxlbWVudDtcblxuY2xhc3MgVG9nZ2xlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHVwZGF0ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXIgPSB1cGRhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5vbkNsaWNrKHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbiAgXG4gIGNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNvbGxhcHNlZCA/IFxuICAgICAgICAgICAgICAgICAgIFRvZ2dsZUJ1dHRvbi5CTEFDS19SSUdIVF9QT0lOVElOR19UUklBTkdMRSA6IFxuICAgICAgICAgICAgICAgICAgICAgVG9nZ2xlQnV0dG9uLkJMQUNLX0RPV05fUE9JTlRJTkdfVFJJQU5HTEU7XG5cbiAgICB0aGlzLmh0bWwoaHRtbCk7XG5cbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXIodGhpcy5jb2xsYXBzZWQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21QYXJlbnRFbGVtZW50KHBhcmVudEVsZW1lbnQsIHVwZGF0ZUhhbmRsZXIpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9ICdidXR0b24udG9nZ2xlJyxcbiAgICAgICAgICBkb21FbGVtZW50ID0gcGFyZW50RWxlbWVudC5kb21FbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChUb2dnbGVCdXR0b24sIGRvbUVsZW1lbnQsIHVwZGF0ZUhhbmRsZXIpO1xuICB9XG59XG5cblRvZ2dsZUJ1dHRvbi5CTEFDS19SSUdIVF9QT0lOVElOR19UUklBTkdMRSA9ICcmI3gwMjViNic7XG5Ub2dnbGVCdXR0b24uQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRSA9ICcmI3gwMjViYyc7XG5cbm1vZHVsZS5leHBvcnRzID0gVG9nZ2xlQnV0dG9uO1xuIl19