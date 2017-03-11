'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Button = easyui.Button,
    InputElement = easyui.InputElement;

var NameButton = function (_Button) {
  _inherits(NameButton, _Button);

  function NameButton(selector, name, doubleClickHandler) {
    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, selector));

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
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }], [{
    key: 'fromParentElement',
    value: function fromParentElement(parentElement, name, doubleClickHandler) {
      var selector = 'button.name',
          domElement = parentElement.domElement.querySelector(selector);

      return InputElement.fromDOMElement(NameButton, domElement, name, doubleClickHandler);
    }
  }]);

  return NameButton;
}(Button);

module.exports = NameButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCdXR0b24iLCJJbnB1dEVsZW1lbnQiLCJOYW1lQnV0dG9uIiwic2VsZWN0b3IiLCJuYW1lIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwic2V0TmFtZSIsIm9uRG91YmxlQ2xpY2siLCJodG1sIiwiaGFuZGxlciIsIm9uIiwicGFyZW50RWxlbWVudCIsImRvbUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZnJvbURPTUVsZW1lbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsU0FBU0YsT0FBT0UsTUFEdEI7QUFBQSxJQUVNQyxlQUFlSCxPQUFPRyxZQUY1Qjs7SUFJTUMsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxrQkFBNUIsRUFBZ0Q7QUFBQTs7QUFBQSx3SEFDeENGLFFBRHdDOztBQUc5QyxVQUFLRyxPQUFMLENBQWFGLElBQWI7O0FBRUEsUUFBSUMsa0JBQUosRUFBd0I7QUFDdEIsWUFBS0UsYUFBTCxDQUFtQkYsa0JBQW5CO0FBQ0Q7QUFQNkM7QUFRL0M7Ozs7OEJBRVM7QUFDUixVQUFNRCxPQUFPLEtBQUtJLElBQUwsRUFBYixDQURRLENBQ2tCOztBQUUxQixhQUFPSixJQUFQO0FBQ0Q7Ozs0QkFFT0EsSSxFQUFNO0FBQ1osVUFBTUksT0FBT0osSUFBYixDQURZLENBQ1E7O0FBRXBCLFdBQUtJLElBQUwsQ0FBVUEsSUFBVjtBQUNEOzs7a0NBRWFDLE8sRUFBUztBQUNyQixXQUFLQyxFQUFMLENBQVEsVUFBUixFQUFvQkQsT0FBcEI7QUFDRDs7O3NDQUV3QkUsYSxFQUFlUCxJLEVBQU1DLGtCLEVBQW9CO0FBQ2hFLFVBQU1GLFdBQVcsYUFBakI7QUFBQSxVQUNNUyxhQUFhRCxjQUFjQyxVQUFkLENBQXlCQyxhQUF6QixDQUF1Q1YsUUFBdkMsQ0FEbkI7O0FBR0EsYUFBT0YsYUFBYWEsY0FBYixDQUE0QlosVUFBNUIsRUFBd0NVLFVBQXhDLEVBQW9EUixJQUFwRCxFQUEwREMsa0JBQTFELENBQVA7QUFDRDs7OztFQWhDc0JMLE07O0FBbUN6QmUsT0FBT0MsT0FBUCxHQUFpQmQsVUFBakIiLCJmaWxlIjoibmFtZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBCdXR0b24gPSBlYXN5dWkuQnV0dG9uLFxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeXVpLklucHV0RWxlbWVudDtcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnNldE5hbWUobmFtZSk7XG4gICAgXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5odG1sKCk7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICBjb25zdCBodG1sID0gbmFtZTsgIC8vL1xuXG4gICAgdGhpcy5odG1sKGh0bWwpO1xuICB9XG4gIFxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21QYXJlbnRFbGVtZW50KHBhcmVudEVsZW1lbnQsIG5hbWUsIGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gJ2J1dHRvbi5uYW1lJyxcbiAgICAgICAgICBkb21FbGVtZW50ID0gcGFyZW50RWxlbWVudC5kb21FbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIFxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoTmFtZUJ1dHRvbiwgZG9tRWxlbWVudCwgbmFtZSwgZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG4iXX0=