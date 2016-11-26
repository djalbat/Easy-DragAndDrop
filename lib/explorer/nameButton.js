'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Button = easyui.Button;

var NameButton = function (_Button) {
  _inherits(NameButton, _Button);

  function NameButton(parentElement, name, doubleClickHandler) {
    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, [parentElement, '>button.name']));

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
  }]);

  return NameButton;
}(Button);

module.exports = NameButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCdXR0b24iLCJOYW1lQnV0dG9uIiwicGFyZW50RWxlbWVudCIsIm5hbWUiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJzZXROYW1lIiwib25Eb3VibGVDbGljayIsImh0bWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsU0FBU0YsT0FBT0UsTUFEcEI7O0lBR01DLFU7OztBQUNKLHNCQUFZQyxhQUFaLEVBQTJCQyxJQUEzQixFQUFpQ0Msa0JBQWpDLEVBQXFEO0FBQUE7O0FBQUEsd0hBQzdDLENBQUNGLGFBQUQsRUFBZ0IsY0FBaEIsQ0FENkM7O0FBR25ELFVBQUtHLE9BQUwsQ0FBYUYsSUFBYjs7QUFFQSxRQUFJQyxrQkFBSixFQUF3QjtBQUN0QixZQUFLRSxhQUFMLENBQW1CRixrQkFBbkI7QUFDRDtBQVBrRDtBQVFwRDs7Ozs4QkFFUztBQUNSLFVBQUlELE9BQU8sS0FBS0ksSUFBTCxFQUFYLENBRFEsQ0FDZ0I7O0FBRXhCLGFBQU9KLElBQVA7QUFDRDs7OzRCQUVPQSxJLEVBQU07QUFDWixVQUFJSSxPQUFPSixJQUFYLENBRFksQ0FDTTs7QUFFbEIsV0FBS0ksSUFBTCxDQUFVQSxJQUFWO0FBQ0Q7Ozs7RUFyQnNCUCxNOztBQXdCekJRLE9BQU9DLE9BQVAsR0FBaUJSLFVBQWpCIiwiZmlsZSI6Im5hbWVCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCdXR0b24gPSBlYXN5dWkuQnV0dG9uO1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgbmFtZSwgZG91YmxlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+YnV0dG9uLm5hbWUnXSk7XG5cbiAgICB0aGlzLnNldE5hbWUobmFtZSk7XG4gICAgXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuaHRtbCgpOyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdmFyIGh0bWwgPSBuYW1lOyAgLy8vXG5cbiAgICB0aGlzLmh0bWwoaHRtbCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOYW1lQnV0dG9uO1xuIl19