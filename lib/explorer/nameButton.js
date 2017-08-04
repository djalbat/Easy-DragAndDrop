'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var array = necessary.array,
    InputElement = easy.InputElement;

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
          firstChildElement = array.first(childElements),
          text = firstChildElement.getText(),
          name = text; ///

      return name;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      var text = name,
          ///
      childElements = this.getChildElements(),
          firstChildElement = array.first(childElements);

      firstChildElement.setText(text);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwiYXJyYXkiLCJJbnB1dEVsZW1lbnQiLCJOYW1lQnV0dG9uIiwiY2hpbGRFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJmaXJzdENoaWxkRWxlbWVudCIsImZpcnN0IiwidGV4dCIsImdldFRleHQiLCJuYW1lIiwic2V0VGV4dCIsImhhbmRsZXIiLCJvbiIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHTSxJQUFFRSxLQUFGLEdBQVlELFNBQVosQ0FBRUMsS0FBRjtBQUFBLElBQ0VDLFlBREYsR0FDbUJKLElBRG5CLENBQ0VJLFlBREY7O0lBR0FDLFU7Ozs7Ozs7Ozs7OzhCQUNNO0FBQ1IsVUFBTUMsZ0JBQWdCLEtBQUtDLGdCQUFMLEVBQXRCO0FBQUEsVUFDTUMsb0JBQW9CTCxNQUFNTSxLQUFOLENBQVlILGFBQVosQ0FEMUI7QUFBQSxVQUVNSSxPQUFPRixrQkFBa0JHLE9BQWxCLEVBRmI7QUFBQSxVQUdNQyxPQUFPRixJQUhiLENBRFEsQ0FJVzs7QUFFbkIsYUFBT0UsSUFBUDtBQUNEOzs7NEJBRU9BLEksRUFBTTtBQUNaLFVBQU1GLE9BQU9FLElBQWI7QUFBQSxVQUFtQjtBQUNiTixzQkFBZ0IsS0FBS0MsZ0JBQUwsRUFEdEI7QUFBQSxVQUVNQyxvQkFBb0JMLE1BQU1NLEtBQU4sQ0FBWUgsYUFBWixDQUYxQjs7QUFJQUUsd0JBQWtCSyxPQUFsQixDQUEwQkgsSUFBMUI7QUFDRDs7O2tDQUVhSSxPLEVBQVM7QUFDckIsV0FBS0MsRUFBTCxDQUFRLFVBQVIsRUFBb0JELE9BQXBCO0FBQ0Q7OzttQ0FFcUJFLFUsRUFBWTtBQUFFLGFBQU9aLGFBQWFhLGNBQWIsQ0FBNEJaLFVBQTVCLEVBQXdDVyxVQUF4QyxDQUFQO0FBQTZEOzs7O0VBdEIxRVosWTs7QUF5QnpCYyxPQUFPQyxNQUFQLENBQWNkLFVBQWQsRUFBMEI7QUFDeEJlLFdBQVMsUUFEZTtBQUV4QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGSztBQUt4QkMscUJBQW1CLENBQ2pCLE1BRGlCO0FBTEssQ0FBMUI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUJwQixVQUFqQiIsImZpbGUiOiJuYW1lQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBhcnJheS5maXJzdChjaGlsZEVsZW1lbnRzKSxcbiAgICAgICAgICB0ZXh0ID0gZmlyc3RDaGlsZEVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICAgIG5hbWUgPSB0ZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgY29uc3QgdGV4dCA9IG5hbWUsIC8vL1xuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGFycmF5LmZpcnN0KGNoaWxkRWxlbWVudHMpO1xuXG4gICAgZmlyc3RDaGlsZEVsZW1lbnQuc2V0VGV4dCh0ZXh0KTtcbiAgfVxuICBcbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbignZGJsY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKE5hbWVCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiJdfQ==