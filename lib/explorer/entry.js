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
  defaultProperties: {
    className: 'entry'
  },
  ignoredProperties: ['name'],
  types: {
    FILE_NAME_TYPE: 'FILE_NAME_TYPE',
    DIRECTORY_NAME_TYPE: 'DIRECTORY_NAME_TYPE',
    FILE_NAME_MARKER_TYPE: 'FILE_NAME_MARKER_TYPE',
    DIRECTORY_NAME_MARKER_TYPE: 'DIRECTORY_NAME_MARKER_TYPE'
  }
});

module.exports = Entry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIk5hbWVCdXR0b24iLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiZ2V0TmFtZSIsImFwcGVuZCIsIkNsYXNzIiwicHJvcGVydGllcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsInR5cGVzIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLGFBQWFELFFBQVEsY0FBUixDQUFuQjs7SUFFUUUsTyxHQUFtQkgsSSxDQUFuQkcsTztJQUFTQyxLLEdBQVVKLEksQ0FBVkksSzs7SUFFWEMsSzs7O0FBQ0osaUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQztBQUFBOztBQUFBLDhHQUMxQkYsUUFEMEI7O0FBR2hDLFVBQUtHLFVBQUwsR0FBa0I7QUFBQyxnQkFBRDtBQUFBO0FBQWFGO0FBQWIsS0FBbEI7O0FBRUEsVUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBTGdDO0FBTWpDOzs7OzhCQUVTO0FBQUUsYUFBTyxLQUFLQyxVQUFMLENBQWdCQyxPQUFoQixFQUFQO0FBQW1DOzs7OEJBRXJDO0FBQ1IsYUFBTyxLQUFLRixJQUFaO0FBQ0Q7OztpQ0FFWTtBQUNYLFdBQUtHLE1BQUwsQ0FBWSxLQUFLRixVQUFqQjtBQUNEOzs7bUNBRXFCRyxLLEVBQU9DLFUsRUFBbUM7QUFBQSx3Q0FBcEJDLGtCQUFvQjtBQUFwQkEsMEJBQW9CO0FBQUE7O0FBQ3hELFVBQUVQLElBQUYsR0FBV00sVUFBWCxDQUFFTixJQUFGO0FBQUEsVUFDQVEsS0FEQSxHQUNRWixRQUFRYSxjQUFSLGlCQUF1QkosS0FBdkIsRUFBOEJDLFVBQTlCLEVBQTBDTixJQUExQyxTQUFtRE8sa0JBQW5ELEVBRFI7OztBQUdOLGFBQU9DLEtBQVA7QUFDRDs7OztFQXhCaUJaLE87O0FBMkJwQmMsT0FBT0MsTUFBUCxDQUFjYixLQUFkLEVBQXFCO0FBQ25CYyxXQUFTLElBRFU7QUFFbkJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRkE7QUFLbkJDLHFCQUFtQixDQUNqQixNQURpQixDQUxBO0FBUW5CQyxTQUFPO0FBQ0xDLG9CQUFnQixnQkFEWDtBQUVMQyx5QkFBcUIscUJBRmhCO0FBR0xDLDJCQUF1Qix1QkFIbEI7QUFJTEMsZ0NBQTRCO0FBSnZCO0FBUlksQ0FBckI7O0FBZ0JBQyxPQUFPQyxPQUFQLEdBQWlCeEIsS0FBakIiLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFwcGVuZCh0aGlzLm5hbWVCdXR0b24pO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBlbnRyeSA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyeSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZSdcbiAgXSxcbiAgdHlwZXM6IHtcbiAgICBGSUxFX05BTUVfVFlQRTogJ0ZJTEVfTkFNRV9UWVBFJyxcbiAgICBESVJFQ1RPUllfTkFNRV9UWVBFOiAnRElSRUNUT1JZX05BTUVfVFlQRScsXG4gICAgRklMRV9OQU1FX01BUktFUl9UWVBFOiAnRklMRV9OQU1FX01BUktFUl9UWVBFJyxcbiAgICBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTogJ0RJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiJdfQ==