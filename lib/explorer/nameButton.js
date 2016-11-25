'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Button = easyui.Button;

var NameButton = function (_Button) {
  _inherits(NameButton, _Button);

  function NameButton(parentElement, name) {
    var doubleClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, [parentElement, '>button.name']));

    _this.setName(name);

    _this.onDoubleClick(doubleClickHandler);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCdXR0b24iLCJOYW1lQnV0dG9uIiwicGFyZW50RWxlbWVudCIsIm5hbWUiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJzZXROYW1lIiwib25Eb3VibGVDbGljayIsImh0bWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsU0FBU0YsT0FBT0UsTUFEcEI7O0lBR01DLFU7OztBQUNKLHNCQUFZQyxhQUFaLEVBQTJCQyxJQUEzQixFQUFxRTtBQUFBLFFBQXBDQyxrQkFBb0MsdUVBQWYsWUFBVyxDQUFFLENBQUU7O0FBQUE7O0FBQUEsd0hBQzdELENBQUNGLGFBQUQsRUFBZ0IsY0FBaEIsQ0FENkQ7O0FBR25FLFVBQUtHLE9BQUwsQ0FBYUYsSUFBYjs7QUFFQSxVQUFLRyxhQUFMLENBQW1CRixrQkFBbkI7QUFMbUU7QUFNcEU7Ozs7OEJBRVM7QUFDUixVQUFJRCxPQUFPLEtBQUtJLElBQUwsRUFBWCxDQURRLENBQ2dCOztBQUV4QixhQUFPSixJQUFQO0FBQ0Q7Ozs0QkFFT0EsSSxFQUFNO0FBQ1osVUFBSUksT0FBT0osSUFBWCxDQURZLENBQ007O0FBRWxCLFdBQUtJLElBQUwsQ0FBVUEsSUFBVjtBQUNEOzs7O0VBbkJzQlAsTTs7QUFzQnpCUSxPQUFPQyxPQUFQLEdBQWlCUixVQUFqQiIsImZpbGUiOiJuYW1lQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgQnV0dG9uID0gZWFzeXVpLkJ1dHRvbjtcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQsIG5hbWUsIGRvdWJsZUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKCkge30pIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz5idXR0b24ubmFtZSddKTtcblxuICAgIHRoaXMuc2V0TmFtZShuYW1lKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuaHRtbCgpOyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdmFyIGh0bWwgPSBuYW1lOyAgLy8vXG5cbiAgICB0aGlzLmh0bWwoaHRtbCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOYW1lQnV0dG9uO1xuIl19