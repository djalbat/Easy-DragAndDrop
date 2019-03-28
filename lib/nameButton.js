'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var InputElement = easy.InputElement,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first;

var NameButton = function (_InputElement) {
  _inherits(NameButton, _InputElement);

  function NameButton() {
    _classCallCheck(this, NameButton);

    return _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).apply(this, arguments));
  }

  _createClass(NameButton, [{
    key: 'getName',
    value: function getName() {
      var childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

      return name;
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      var getName = this.getName.bind(this),
          onDoubleClick = this.onDoubleClick.bind(this);

      return {
        getName: getName,
        onDoubleClick: onDoubleClick
      };
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return InputElement.fromProperties(NameButton, properties);
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  tagName: 'button',
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: ['name']
});

module.exports = NameButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwiSW5wdXRFbGVtZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaXJzdCIsIk5hbWVCdXR0b24iLCJjaGlsZEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImZpcnN0Q2hpbGRFbGVtZW50IiwiZmlyc3RDaGlsZEVsZW1lbnRUZXh0IiwiZ2V0VGV4dCIsIm5hbWUiLCJoYW5kbGVyIiwib24iLCJnZXROYW1lIiwiYmluZCIsIm9uRG91YmxlQ2xpY2siLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR00sSUFBRUUsWUFBRixHQUFtQkgsSUFBbkIsQ0FBRUcsWUFBRjtBQUFBLElBQ0VDLGNBREYsR0FDcUJGLFNBRHJCLENBQ0VFLGNBREY7QUFBQSxJQUVFQyxLQUZGLEdBRVlELGNBRlosQ0FFRUMsS0FGRjs7SUFJQUMsVTs7Ozs7Ozs7Ozs7OEJBQ007QUFDUixVQUFNQyxnQkFBZ0IsS0FBS0MsZ0JBQUwsRUFBdEI7QUFBQSxVQUNNQyxvQkFBb0JKLE1BQU1FLGFBQU4sQ0FEMUI7QUFBQSxVQUVNRyx3QkFBd0JELGtCQUFrQkUsT0FBbEIsRUFGOUI7QUFBQSxVQUdNQyxPQUFPRixxQkFIYixDQURRLENBSTRCOztBQUVwQyxhQUFPRSxJQUFQO0FBQ0Q7OztrQ0FFYUMsTyxFQUFTO0FBQ3JCLFdBQUtDLEVBQUwsQ0FBUSxVQUFSLEVBQW9CRCxPQUFwQjtBQUNEOzs7b0NBRWU7QUFDZixVQUFNRSxVQUFVLEtBQUtBLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUFoQjtBQUFBLFVBQ0dDLGdCQUFnQixLQUFLQSxhQUFMLENBQW1CRCxJQUFuQixDQUF3QixJQUF4QixDQURuQjs7QUFHQyxhQUFRO0FBQ05ELHdCQURNO0FBRU5FO0FBRk0sT0FBUjtBQUlEOzs7bUNBRXFCQyxVLEVBQVk7QUFBRSxhQUFPZixhQUFhZ0IsY0FBYixDQUE0QmIsVUFBNUIsRUFBd0NZLFVBQXhDLENBQVA7QUFBNkQ7Ozs7RUF4QjFFZixZOztBQTJCekJpQixPQUFPQyxNQUFQLENBQWNmLFVBQWQsRUFBMEI7QUFDeEJnQixXQUFTLFFBRGU7QUFFeEJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRks7QUFLeEJDLHFCQUFtQixDQUNqQixNQURpQjtBQUxLLENBQTFCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCckIsVUFBakIiLCJmaWxlIjoibmFtZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCB7IElucHV0RWxlbWVudCB9ID0gZWFzeSxcbiAgICAgIHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBmaXJzdChjaGlsZEVsZW1lbnRzKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudFRleHQgPSBmaXJzdENoaWxkRWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgICAgbmFtZSA9IGZpcnN0Q2hpbGRFbGVtZW50VGV4dDsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikge1xuICAgIHRoaXMub24oJ2RibGNsaWNrJywgaGFuZGxlcik7XG4gIH1cbiAgXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgZ2V0TmFtZSA9IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIG9uRG91YmxlQ2xpY2sgPSB0aGlzLm9uRG91YmxlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoe1xuICAgICAgZ2V0TmFtZSxcbiAgICAgIG9uRG91YmxlQ2xpY2tcbiAgICB9KTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKE5hbWVCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiJdfQ==