'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    Element = easy.Element,
    React = easy.React;

var NameButton = require('./nameButton');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVsZW1lbnQiLCJSZWFjdCIsIk5hbWVCdXR0b24iLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiYXBwZW5kIiwiZ2V0TmFtZSIsIkNsYXNzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwidHlwZXMiLCJGSUxFIiwiTUFSS0VSIiwiRElSRUNUT1JZIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFVBQVVGLEtBQUtFLE9BRHJCO0FBQUEsSUFFTUMsUUFBUUgsS0FBS0csS0FGbkI7O0FBSUEsSUFBTUMsYUFBYUgsUUFBUSxjQUFSLENBQW5COztJQUVNSSxLOzs7QUFDSixpQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQUE7O0FBQUEsOEdBQzFCRixRQUQwQjs7QUFHaEMsUUFBTUcsYUFBYTtBQUFDLGdCQUFEO0FBQUE7QUFBYUY7QUFBYixLQUFuQjs7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7O0FBRUEsVUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7O0FBRUEsVUFBS0MsTUFBTCxDQUFZRCxVQUFaO0FBVGdDO0FBVWpDOzs7OzhCQUVTO0FBQUUsYUFBTyxLQUFLQSxVQUFMLENBQWdCRSxPQUFoQixFQUFQO0FBQW1DOzs7OEJBRXJDO0FBQ1IsYUFBTyxLQUFLSCxJQUFaO0FBQ0Q7OzttQ0FFcUJJLEssRUFBT0MsVSxFQUFZO0FBQUEsVUFDL0JOLElBRCtCLEdBQ3RCTSxVQURzQixDQUMvQk4sSUFEK0I7OztBQUd2QyxhQUFPTCxRQUFRWSxjQUFSLENBQXVCRixLQUF2QixFQUE4QkMsVUFBOUIsRUFBMENOLElBQTFDLENBQVA7QUFDRDs7OztFQXZCaUJMLE87O0FBMEJwQmEsT0FBT0MsTUFBUCxDQUFjWCxLQUFkLEVBQXFCO0FBQ25CWSxXQUFTLElBRFU7QUFFbkJDLHFCQUFtQixDQUNqQixNQURpQixDQUZBO0FBS25CQyxTQUFPO0FBQ0xDLFVBQU0sTUFERDtBQUVMQyxZQUFRLFFBRkg7QUFHTEMsZUFBVztBQUhOO0FBTFksQ0FBckI7O0FBWUFDLE9BQU9DLE9BQVAsR0FBaUJuQixLQUFqQiIsImZpbGUiOiJlbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5LkVsZW1lbnQsXG4gICAgICBSZWFjdCA9IGVhc3kuUmVhY3Q7XG5cbmNvbnN0IE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuYW1lQnV0dG9uO1xuXG4gICAgdGhpcy5hcHBlbmQobmFtZUJ1dHRvbik7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaScsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnXG4gIF0sXG4gIHR5cGVzOiB7XG4gICAgRklMRTogJ0ZJTEUnLFxuICAgIE1BUktFUjogJ01BUktFUicsXG4gICAgRElSRUNUT1JZOiAnRElSRUNUT1JZJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiJdfQ==