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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NameButton).call(this, [parentElement, '>button.name']));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksU0FBUyxPQUFPLE1BRHBCOztJQUdNLFU7OztBQUNKLHNCQUFZLGFBQVosRUFBMkIsSUFBM0IsRUFBaUMsa0JBQWpDLEVBQXFEO0FBQUE7O0FBQUEsOEZBQzdDLENBQUMsYUFBRCxFQUFnQixjQUFoQixDQUQ2Qzs7QUFHbkQsVUFBSyxPQUFMLENBQWEsSUFBYjs7QUFFQSxRQUFJLGtCQUFKLEVBQXdCO0FBQ3RCLFlBQUssYUFBTCxDQUFtQixrQkFBbkI7QUFDRDtBQVBrRDtBQVFwRDs7Ozs4QkFFUztBQUNSLFVBQUksT0FBTyxLQUFLLElBQUwsRUFBWCxDOztBQUVBLGFBQU8sSUFBUDtBQUNEOzs7NEJBRU8sSSxFQUFNO0FBQ1osVUFBSSxPQUFPLElBQVgsQzs7QUFFQSxXQUFLLElBQUwsQ0FBVSxJQUFWO0FBQ0Q7Ozs7RUFyQnNCLE07O0FBd0J6QixPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoibmFtZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEJ1dHRvbiA9IGVhc3l1aS5CdXR0b247XG5cbmNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBCdXR0b24ge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBuYW1lLCBkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz5idXR0b24ubmFtZSddKTtcblxuICAgIHRoaXMuc2V0TmFtZShuYW1lKTtcblxuICAgIGlmIChkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmh0bWwoKTsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHZhciBodG1sID0gbmFtZTsgIC8vL1xuXG4gICAgdGhpcy5odG1sKGh0bWwpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiJdfQ==
