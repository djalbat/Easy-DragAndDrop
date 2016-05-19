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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFUO0lBQ0EsU0FBUyxPQUFPLE1BQVA7O0lBRVA7OztBQUNKLFdBREksVUFDSixDQUFZLGFBQVosRUFBMkIsSUFBM0IsRUFBaUMsa0JBQWpDLEVBQXFEOzBCQURqRCxZQUNpRDs7dUVBRGpELHVCQUVJLENBQUMsYUFBRCxFQUFnQixjQUFoQixJQUQ2Qzs7QUFHbkQsVUFBSyxPQUFMLENBQWEsSUFBYixFQUhtRDs7QUFLbkQsUUFBSSxrQkFBSixFQUF3QjtBQUN0QixZQUFLLGFBQUwsQ0FBbUIsa0JBQW5CLEVBRHNCO0tBQXhCO2lCQUxtRDtHQUFyRDs7ZUFESTs7OEJBV007QUFDUixVQUFJLE9BQU8sS0FBSyxJQUFMLEVBQVA7O0FBREksYUFHRCxJQUFQLENBSFE7Ozs7NEJBTUYsTUFBTTtBQUNaLFVBQUksT0FBTyxJQUFQOztBQURRLFVBR1osQ0FBSyxJQUFMLENBQVUsSUFBVixFQUhZOzs7O1NBakJWO0VBQW1COztBQXdCekIsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6Im5hbWVCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCdXR0b24gPSBlYXN5dWkuQnV0dG9uO1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgbmFtZSwgZG91YmxlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+YnV0dG9uLm5hbWUnXSk7XG5cbiAgICB0aGlzLnNldE5hbWUobmFtZSk7XG5cbiAgICBpZiAoZG91YmxlQ2xpY2tIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHZhciBuYW1lID0gdGhpcy5odG1sKCk7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB2YXIgaHRtbCA9IG5hbWU7ICAvLy9cblxuICAgIHRoaXMuaHRtbChodG1sKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG4iXX0=
