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

    var nameButton = React.createElement(
      NameButton,
      null,
      name
    );

    _this.type = type;

    _this.nameButton = nameButton;

    _this.append(nameButton);
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
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var name = properties.name,
          entry = Element.fromProperties(Class, properties, name);


      return entry;
    }
  }]);

  return Entry;
}(Element);

Object.assign(Entry, {
  tagName: 'li',
  ignoredProperties: ['name'],
  types: {
    MARKER: 'MARKER',
    FILE_NAME: 'FILE_NAME',
    DIRECTORY_NAME: 'DIRECTORY_NAME'
  }
});

module.exports = Entry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIk5hbWVCdXR0b24iLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiYXBwZW5kIiwiZ2V0TmFtZSIsIkNsYXNzIiwicHJvcGVydGllcyIsImVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJ0eXBlcyIsIk1BUktFUiIsIkZJTEVfTkFNRSIsIkRJUkVDVE9SWV9OQU1FIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGNBQVIsQ0FBbkI7O0lBRVFFLE8sR0FBbUJILEksQ0FBbkJHLE87SUFBU0MsSyxHQUFVSixJLENBQVZJLEs7O0lBRVhDLEs7OztBQUNKLGlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFBQSw4R0FDMUJGLFFBRDBCOztBQUdoQyxRQUFNRyxhQUFhO0FBQUMsZ0JBQUQ7QUFBQTtBQUFhRjtBQUFiLEtBQW5COztBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxVQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQSxVQUFLQyxNQUFMLENBQVlELFVBQVo7QUFUZ0M7QUFVakM7Ozs7OEJBRVM7QUFBRSxhQUFPLEtBQUtBLFVBQUwsQ0FBZ0JFLE9BQWhCLEVBQVA7QUFBbUM7Ozs4QkFFckM7QUFDUixhQUFPLEtBQUtILElBQVo7QUFDRDs7O21DQUVxQkksSyxFQUFPQyxVLEVBQVk7QUFDakMsVUFBRU4sSUFBRixHQUFXTSxVQUFYLENBQUVOLElBQUY7QUFBQSxVQUNBTyxLQURBLEdBQ1FYLFFBQVFZLGNBQVIsQ0FBdUJILEtBQXZCLEVBQThCQyxVQUE5QixFQUEwQ04sSUFBMUMsQ0FEUjs7O0FBR04sYUFBT08sS0FBUDtBQUNEOzs7O0VBeEJpQlgsTzs7QUEyQnBCYSxPQUFPQyxNQUFQLENBQWNaLEtBQWQsRUFBcUI7QUFDbkJhLFdBQVMsSUFEVTtBQUVuQkMscUJBQW1CLENBQ2pCLE1BRGlCLENBRkE7QUFLbkJDLFNBQU87QUFDTEMsWUFBUSxRQURIO0FBRUxDLGVBQVcsV0FGTjtBQUdMQyxvQkFBZ0I7QUFIWDtBQUxZLENBQXJCOztBQVlBQyxPQUFPQyxPQUFQLEdBQWlCcEIsS0FBakIiLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuYW1lQnV0dG9uO1xuXG4gICAgdGhpcy5hcHBlbmQobmFtZUJ1dHRvbik7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGVudHJ5ID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZSdcbiAgXSxcbiAgdHlwZXM6IHtcbiAgICBNQVJLRVI6ICdNQVJLRVInLFxuICAgIEZJTEVfTkFNRTogJ0ZJTEVfTkFNRScsXG4gICAgRElSRUNUT1JZX05BTUU6ICdESVJFQ1RPUllfTkFNRSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cnk7XG4iXX0=