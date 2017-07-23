'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var arrayUtil = require('../util/array');

var InputElement = easy.InputElement;

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
          firstChildElement = arrayUtil.first(childElements),
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
          firstChildElement = arrayUtil.first(childElements);

      firstChildElement.setText(text);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }, {
    key: 'initialise',
    value: function initialise(doubleClickHandler) {
      this.onDoubleClick(doubleClickHandler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onDoubleClick = properties.onDoubleClick,
          doubleClickHandler = onDoubleClick,
          nameButton = InputElement.fromProperties(NameButton, properties);


      nameButton.initialise(doubleClickHandler);

      return nameButton;
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  tagName: 'button',
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: ['name', 'onDoubleClick']
});

module.exports = NameButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiYXJyYXlVdGlsIiwiSW5wdXRFbGVtZW50IiwiTmFtZUJ1dHRvbiIsImNoaWxkRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZmlyc3RDaGlsZEVsZW1lbnQiLCJmaXJzdCIsInRleHQiLCJnZXRUZXh0IiwibmFtZSIsInNldFRleHQiLCJoYW5kbGVyIiwib24iLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwicHJvcGVydGllcyIsIm5hbWVCdXR0b24iLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsWUFBWUQsUUFBUSxlQUFSLENBQWxCOztJQUVRRSxZLEdBQWlCSCxJLENBQWpCRyxZOztJQUVGQyxVOzs7Ozs7Ozs7Ozs4QkFDTTtBQUNSLFVBQU1DLGdCQUFnQixLQUFLQyxnQkFBTCxFQUF0QjtBQUFBLFVBQ01DLG9CQUFvQkwsVUFBVU0sS0FBVixDQUFnQkgsYUFBaEIsQ0FEMUI7QUFBQSxVQUVNSSxPQUFPRixrQkFBa0JHLE9BQWxCLEVBRmI7QUFBQSxVQUdNQyxPQUFPRixJQUhiLENBRFEsQ0FJVzs7QUFFbkIsYUFBT0UsSUFBUDtBQUNEOzs7NEJBRU9BLEksRUFBTTtBQUNaLFVBQU1GLE9BQU9FLElBQWI7QUFBQSxVQUFtQjtBQUNiTixzQkFBZ0IsS0FBS0MsZ0JBQUwsRUFEdEI7QUFBQSxVQUVNQyxvQkFBb0JMLFVBQVVNLEtBQVYsQ0FBZ0JILGFBQWhCLENBRjFCOztBQUlBRSx3QkFBa0JLLE9BQWxCLENBQTBCSCxJQUExQjtBQUNEOzs7a0NBRWFJLE8sRUFBUztBQUNyQixXQUFLQyxFQUFMLENBQVEsVUFBUixFQUFvQkQsT0FBcEI7QUFDRDs7OytCQUVVRSxrQixFQUFvQjtBQUM3QixXQUFLQyxhQUFMLENBQW1CRCxrQkFBbkI7QUFDRDs7O21DQUVxQkUsVSxFQUFZO0FBQzFCLFVBQUVELGFBQUYsR0FBb0JDLFVBQXBCLENBQUVELGFBQUY7QUFBQSxVQUNBRCxrQkFEQSxHQUNxQkMsYUFEckI7QUFBQSxVQUVBRSxVQUZBLEdBRWFmLGFBQWFnQixjQUFiLENBQTRCZixVQUE1QixFQUF3Q2EsVUFBeEMsQ0FGYjs7O0FBSU5DLGlCQUFXRSxVQUFYLENBQXNCTCxrQkFBdEI7O0FBRUEsYUFBT0csVUFBUDtBQUNEOzs7O0VBbENzQmYsWTs7QUFxQ3pCa0IsT0FBT0MsTUFBUCxDQUFjbEIsVUFBZCxFQUEwQjtBQUN4Qm1CLFdBQVMsUUFEZTtBQUV4QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGSztBQUt4QkMscUJBQW1CLENBQ2pCLE1BRGlCLEVBRWpCLGVBRmlCO0FBTEssQ0FBMUI7O0FBV0FDLE9BQU9DLE9BQVAsR0FBaUJ4QixVQUFqQiIsImZpbGUiOiJuYW1lQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBhcnJheVV0aWwgPSByZXF1aXJlKCcuLi91dGlsL2FycmF5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBhcnJheVV0aWwuZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgdGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gdGV4dDsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIGNvbnN0IHRleHQgPSBuYW1lLCAvLy9cbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBhcnJheVV0aWwuZmlyc3QoY2hpbGRFbGVtZW50cyk7XG5cbiAgICBmaXJzdENoaWxkRWxlbWVudC5zZXRUZXh0KHRleHQpO1xuICB9XG4gIFxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Eb3VibGVDbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSBvbkRvdWJsZUNsaWNrLCAvLy9cbiAgICAgICAgICBuYW1lQnV0dG9uID0gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKE5hbWVCdXR0b24sIHByb3BlcnRpZXMpO1xuICAgIFxuICAgIG5hbWVCdXR0b24uaW5pdGlhbGlzZShkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBuYW1lQnV0dG9uO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTmFtZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICduYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnb25Eb3VibGVDbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiJdfQ==