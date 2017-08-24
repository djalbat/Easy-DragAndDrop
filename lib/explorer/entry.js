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
      var name = properties.name,
          entry = Element.fromProperties(Class, properties, name);


      entry.initialise();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIk5hbWVCdXR0b24iLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiZ2V0TmFtZSIsImFwcGVuZCIsIkNsYXNzIiwicHJvcGVydGllcyIsImVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwidHlwZXMiLCJNQVJLRVIiLCJGSUxFX05BTUUiLCJESVJFQ1RPUllfTkFNRSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsYUFBYUQsUUFBUSxjQUFSLENBQW5COztJQUVRRSxPLEdBQW1CSCxJLENBQW5CRyxPO0lBQVNDLEssR0FBVUosSSxDQUFWSSxLOztJQUVYQyxLOzs7QUFDSixpQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQUE7O0FBQUEsOEdBQzFCRixRQUQwQjs7QUFHaEMsVUFBS0csVUFBTCxHQUFrQjtBQUFDLGdCQUFEO0FBQUE7QUFBYUY7QUFBYixLQUFsQjs7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFMZ0M7QUFNakM7Ozs7OEJBRVM7QUFBRSxhQUFPLEtBQUtDLFVBQUwsQ0FBZ0JDLE9BQWhCLEVBQVA7QUFBbUM7Ozs4QkFFckM7QUFDUixhQUFPLEtBQUtGLElBQVo7QUFDRDs7O2lDQUVZO0FBQ1gsV0FBS0csTUFBTCxDQUFZLEtBQUtGLFVBQWpCO0FBQ0Q7OzttQ0FFcUJHLEssRUFBT0MsVSxFQUFZO0FBQ2pDLFVBQUVOLElBQUYsR0FBV00sVUFBWCxDQUFFTixJQUFGO0FBQUEsVUFDQU8sS0FEQSxHQUNRWCxRQUFRWSxjQUFSLENBQXVCSCxLQUF2QixFQUE4QkMsVUFBOUIsRUFBMENOLElBQTFDLENBRFI7OztBQUdOTyxZQUFNRSxVQUFOOztBQUVBLGFBQU9GLEtBQVA7QUFDRDs7OztFQTFCaUJYLE87O0FBNkJwQmMsT0FBT0MsTUFBUCxDQUFjYixLQUFkLEVBQXFCO0FBQ25CYyxXQUFTLElBRFU7QUFFbkJDLHFCQUFtQixDQUNqQixNQURpQixDQUZBO0FBS25CQyxTQUFPO0FBQ0xDLFlBQVEsUUFESDtBQUVMQyxlQUFXLFdBRk47QUFHTEMsb0JBQWdCO0FBSFg7QUFMWSxDQUFyQjs7QUFZQUMsT0FBT0MsT0FBUCxHQUFpQnJCLEtBQWpCIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFwcGVuZCh0aGlzLm5hbWVCdXR0b24pO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cnkgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lKTtcblxuICAgIGVudHJ5LmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJ1xuICBdLFxuICB0eXBlczoge1xuICAgIE1BUktFUjogJ01BUktFUicsXG4gICAgRklMRV9OQU1FOiAnRklMRV9OQU1FJyxcbiAgICBESVJFQ1RPUllfTkFNRTogJ0RJUkVDVE9SWV9OQU1FJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiJdfQ==