'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    React = easyui.React;

var NameButton = require('./nameButton');

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    var nameButton = React.createElement(
      NameButton,
      { className: 'name' },
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
  }, {
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
  ignoredAttributes: ['name'],
  types: {
    FILE: 'FILE',
    MARKER: 'MARKER',
    DIRECTORY: 'DIRECTORY'
  }
});

module.exports = Entry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIlJlYWN0IiwiTmFtZUJ1dHRvbiIsIkVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsIm5hbWVCdXR0b24iLCJhcHBlbmQiLCJnZXROYW1lIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJ0eXBlcyIsIkZJTEUiLCJNQVJLRVIiLCJESVJFQ1RPUlkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7QUFBQSxJQUVNQyxRQUFRSCxPQUFPRyxLQUZyQjs7QUFJQSxJQUFNQyxhQUFhSCxRQUFRLGNBQVIsQ0FBbkI7O0lBRU1JLEs7OztBQUNKLGlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFBQSw4R0FDMUJGLFFBRDBCOztBQUdoQyxRQUFNRyxhQUFhO0FBQUMsZ0JBQUQ7QUFBQSxRQUFZLFdBQVUsTUFBdEI7QUFBOEJGO0FBQTlCLEtBQW5COztBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxVQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQSxVQUFLQyxNQUFMLENBQVlELFVBQVo7QUFUZ0M7QUFVakM7Ozs7OEJBRVM7QUFBRSxhQUFPLEtBQUtBLFVBQUwsQ0FBZ0JFLE9BQWhCLEVBQVA7QUFBbUM7Ozs4QkFFckM7QUFDUixhQUFPLEtBQUtILElBQVo7QUFDRDs7O21DQUVjSSxLLEVBQU9DLFUsRUFBWTtBQUFBLFVBQ3hCTixJQUR3QixHQUNmTSxVQURlLENBQ3hCTixJQUR3Qjs7O0FBR2hDLGFBQU9MLFFBQVFZLGNBQVIsQ0FBdUJGLEtBQXZCLEVBQThCQyxVQUE5QixFQUEwQ04sSUFBMUMsQ0FBUDtBQUNEOzs7O0VBdkJpQkwsTzs7QUEwQnBCYSxPQUFPQyxNQUFQLENBQWNYLEtBQWQsRUFBcUI7QUFDbkJZLFdBQVMsSUFEVTtBQUVuQkMscUJBQW1CLENBQ2pCLE1BRGlCLENBRkE7QUFLbkJDLFNBQU87QUFDTEMsVUFBTSxNQUREO0FBRUxDLFlBQVEsUUFGSDtBQUdMQyxlQUFXO0FBSE47QUFMWSxDQUFyQjs7QUFZQUMsT0FBT0MsT0FBUCxHQUFpQm5CLEtBQWpCIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNsYXNzIEVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uIGNsYXNzTmFtZT1cIm5hbWVcIj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5hbWVCdXR0b247XG5cbiAgICB0aGlzLmFwcGVuZChuYW1lQnV0dG9uKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG4gIFxuICBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICduYW1lJ1xuICBdLFxuICB0eXBlczoge1xuICAgIEZJTEU6ICdGSUxFJyxcbiAgICBNQVJLRVI6ICdNQVJLRVInLFxuICAgIERJUkVDVE9SWTogJ0RJUkVDVE9SWSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cnk7XG4iXX0=