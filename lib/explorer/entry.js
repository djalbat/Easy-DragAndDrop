'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var NameButton = require('./nameButton');

var Element = easy.Element,
    React = easy.React;

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    _this.nameButton = React.createElement(
      NameButton,
      null,
      name
    );

    _this.type = type;
    return _this;
  }

  _createClass(Entry, [{
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      this.append(this.nameButton);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      var name = properties.name,
          entry = Element.fromProperties.apply(Element, [Class, properties, name].concat(remainingArguments));


      return entry;
    }
  }]);

  return Entry;
}(Element);

Object.assign(Entry, {
  tagName: 'li',
  ignoredProperties: ['name'],
  types: {
    FILE_NAME_TYPE: 'FILE_NAME_TYPE',
    DIRECTORY_NAME_TYPE: 'DIRECTORY_NAME_TYPE',
    FILE_NAME_MARKER_TYPE: 'FILE_NAME_MARKER_TYPE',
    DIRECTORY_NAME_MARKER_TYPE: 'DIRECTORY_NAME_MARKER_TYPE'
  }
});

module.exports = Entry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIk5hbWVCdXR0b24iLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiZ2V0TmFtZSIsImFwcGVuZCIsIkNsYXNzIiwicHJvcGVydGllcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJ0eXBlcyIsIkZJTEVfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGNBQVIsQ0FBbkI7O0lBRVFFLE8sR0FBbUJILEksQ0FBbkJHLE87SUFBU0MsSyxHQUFVSixJLENBQVZJLEs7O0lBRVhDLEs7OztBQUNKLGlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFBQSw4R0FDMUJGLFFBRDBCOztBQUdoQyxVQUFLRyxVQUFMLEdBQWtCO0FBQUMsZ0JBQUQ7QUFBQTtBQUFhRjtBQUFiLEtBQWxCOztBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUxnQztBQU1qQzs7Ozs4QkFFUztBQUFFLGFBQU8sS0FBS0MsVUFBTCxDQUFnQkMsT0FBaEIsRUFBUDtBQUFtQzs7OzhCQUVyQztBQUNSLGFBQU8sS0FBS0YsSUFBWjtBQUNEOzs7aUNBRVk7QUFDWCxXQUFLRyxNQUFMLENBQVksS0FBS0YsVUFBakI7QUFDRDs7O21DQUVxQkcsSyxFQUFPQyxVLEVBQW1DO0FBQUEsd0NBQXBCQyxrQkFBb0I7QUFBcEJBLDBCQUFvQjtBQUFBOztBQUN4RCxVQUFFUCxJQUFGLEdBQVdNLFVBQVgsQ0FBRU4sSUFBRjtBQUFBLFVBQ0FRLEtBREEsR0FDUVosUUFBUWEsY0FBUixpQkFBdUJKLEtBQXZCLEVBQThCQyxVQUE5QixFQUEwQ04sSUFBMUMsU0FBbURPLGtCQUFuRCxFQURSOzs7QUFHTixhQUFPQyxLQUFQO0FBQ0Q7Ozs7RUF4QmlCWixPOztBQTJCcEJjLE9BQU9DLE1BQVAsQ0FBY2IsS0FBZCxFQUFxQjtBQUNuQmMsV0FBUyxJQURVO0FBRW5CQyxxQkFBbUIsQ0FDakIsTUFEaUIsQ0FGQTtBQUtuQkMsU0FBTztBQUNMQyxvQkFBZ0IsZ0JBRFg7QUFFTEMseUJBQXFCLHFCQUZoQjtBQUdMQywyQkFBdUIsdUJBSGxCO0FBSUxDLGdDQUE0QjtBQUp2QjtBQUxZLENBQXJCOztBQWFBQyxPQUFPQyxPQUFQLEdBQWlCdEIsS0FBakIiLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXBwZW5kKHRoaXMubmFtZUJ1dHRvbik7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGVudHJ5ID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJ1xuICBdLFxuICB0eXBlczoge1xuICAgIEZJTEVfTkFNRV9UWVBFOiAnRklMRV9OQU1FX1RZUEUnLFxuICAgIERJUkVDVE9SWV9OQU1FX1RZUEU6ICdESVJFQ1RPUllfTkFNRV9UWVBFJyxcbiAgICBGSUxFX05BTUVfTUFSS0VSX1RZUEU6ICdGSUxFX05BTUVfTUFSS0VSX1RZUEUnLFxuICAgIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOiAnRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJ5O1xuIl19