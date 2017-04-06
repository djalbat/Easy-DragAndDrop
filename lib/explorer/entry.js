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
      var name = properties.name;


      return Element.fromProperties(Class, properties, name);
    }
  }]);

  return Entry;
}(Element);

Object.assign(Entry, {
  tagName: 'li',
  ignoredProperties: ['name'],
  types: {
    FILE: 'FILE',
    MARKER: 'MARKER',
    DIRECTORY: 'DIRECTORY'
  }
});

module.exports = Entry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIk5hbWVCdXR0b24iLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiYXBwZW5kIiwiZ2V0TmFtZSIsIkNsYXNzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwidHlwZXMiLCJGSUxFIiwiTUFSS0VSIiwiRElSRUNUT1JZIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGNBQVIsQ0FBbkI7O0lBRVFFLE8sR0FBbUJILEksQ0FBbkJHLE87SUFBU0MsSyxHQUFVSixJLENBQVZJLEs7O0lBRVhDLEs7OztBQUNKLGlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFBQSw4R0FDMUJGLFFBRDBCOztBQUdoQyxRQUFNRyxhQUFhO0FBQUMsZ0JBQUQ7QUFBQTtBQUFhRjtBQUFiLEtBQW5COztBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxVQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQSxVQUFLQyxNQUFMLENBQVlELFVBQVo7QUFUZ0M7QUFVakM7Ozs7OEJBRVM7QUFBRSxhQUFPLEtBQUtBLFVBQUwsQ0FBZ0JFLE9BQWhCLEVBQVA7QUFBbUM7Ozs4QkFFckM7QUFDUixhQUFPLEtBQUtILElBQVo7QUFDRDs7O21DQUVxQkksSyxFQUFPQyxVLEVBQVk7QUFBQSxVQUMvQk4sSUFEK0IsR0FDdEJNLFVBRHNCLENBQy9CTixJQUQrQjs7O0FBR3ZDLGFBQU9KLFFBQVFXLGNBQVIsQ0FBdUJGLEtBQXZCLEVBQThCQyxVQUE5QixFQUEwQ04sSUFBMUMsQ0FBUDtBQUNEOzs7O0VBdkJpQkosTzs7QUEwQnBCWSxPQUFPQyxNQUFQLENBQWNYLEtBQWQsRUFBcUI7QUFDbkJZLFdBQVMsSUFEVTtBQUVuQkMscUJBQW1CLENBQ2pCLE1BRGlCLENBRkE7QUFLbkJDLFNBQU87QUFDTEMsVUFBTSxNQUREO0FBRUxDLFlBQVEsUUFGSDtBQUdMQyxlQUFXO0FBSE47QUFMWSxDQUFyQjs7QUFZQUMsT0FBT0MsT0FBUCxHQUFpQm5CLEtBQWpCIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmFtZUJ1dHRvbjtcblxuICAgIHRoaXMuYXBwZW5kKG5hbWVCdXR0b24pO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJ1xuICBdLFxuICB0eXBlczoge1xuICAgIEZJTEU6ICdGSUxFJyxcbiAgICBNQVJLRVI6ICdNQVJLRVInLFxuICAgIERJUkVDVE9SWTogJ0RJUkVDVE9SWSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cnk7XG4iXX0=