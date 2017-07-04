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

  function NameButton(selector, doubleClickHandler) {
    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, selector));

    if (doubleClickHandler) {
      _this.onDoubleClick(doubleClickHandler);
    }
    return _this;
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
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onDoubleClick = properties.onDoubleClick,
          doubleClickHandler = onDoubleClick; ///

      return InputElement.fromProperties(NameButton, properties, doubleClickHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiYXJyYXlVdGlsIiwiSW5wdXRFbGVtZW50IiwiTmFtZUJ1dHRvbiIsInNlbGVjdG9yIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Eb3VibGVDbGljayIsImNoaWxkRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZmlyc3RDaGlsZEVsZW1lbnQiLCJmaXJzdCIsInRleHQiLCJnZXRUZXh0IiwibmFtZSIsInNldFRleHQiLCJoYW5kbGVyIiwib24iLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsWUFBWUQsUUFBUSxlQUFSLENBQWxCOztJQUVRRSxZLEdBQWlCSCxJLENBQWpCRyxZOztJQUVGQyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsa0JBQXRCLEVBQTBDO0FBQUE7O0FBQUEsd0hBQ2xDRCxRQURrQzs7QUFHeEMsUUFBSUMsa0JBQUosRUFBd0I7QUFDdEIsWUFBS0MsYUFBTCxDQUFtQkQsa0JBQW5CO0FBQ0Q7QUFMdUM7QUFNekM7Ozs7OEJBRVM7QUFDUixVQUFNRSxnQkFBZ0IsS0FBS0MsZ0JBQUwsRUFBdEI7QUFBQSxVQUNNQyxvQkFBb0JSLFVBQVVTLEtBQVYsQ0FBZ0JILGFBQWhCLENBRDFCO0FBQUEsVUFFTUksT0FBT0Ysa0JBQWtCRyxPQUFsQixFQUZiO0FBQUEsVUFHTUMsT0FBT0YsSUFIYixDQURRLENBSVc7O0FBRW5CLGFBQU9FLElBQVA7QUFDRDs7OzRCQUVPQSxJLEVBQU07QUFDWixVQUFNRixPQUFPRSxJQUFiO0FBQUEsVUFBbUI7QUFDYk4sc0JBQWdCLEtBQUtDLGdCQUFMLEVBRHRCO0FBQUEsVUFFTUMsb0JBQW9CUixVQUFVUyxLQUFWLENBQWdCSCxhQUFoQixDQUYxQjs7QUFJQUUsd0JBQWtCSyxPQUFsQixDQUEwQkgsSUFBMUI7QUFDRDs7O2tDQUVhSSxPLEVBQVM7QUFDckIsV0FBS0MsRUFBTCxDQUFRLFVBQVIsRUFBb0JELE9BQXBCO0FBQ0Q7OzttQ0FFcUJFLFUsRUFBWTtBQUMxQixVQUFFWCxhQUFGLEdBQW9CVyxVQUFwQixDQUFFWCxhQUFGO0FBQUEsVUFDQUQsa0JBREEsR0FDcUJDLGFBRHJCLENBRDBCLENBRVU7O0FBRTFDLGFBQU9KLGFBQWFnQixjQUFiLENBQTRCZixVQUE1QixFQUF3Q2MsVUFBeEMsRUFBb0RaLGtCQUFwRCxDQUFQO0FBQ0Q7Ozs7RUFuQ3NCSCxZOztBQXNDekJpQixPQUFPQyxNQUFQLENBQWNqQixVQUFkLEVBQTBCO0FBQ3hCa0IsV0FBUyxRQURlO0FBRXhCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQUZLO0FBS3hCQyxxQkFBbUIsQ0FDakIsTUFEaUIsRUFFakIsZUFGaUI7QUFMSyxDQUExQjs7QUFXQUMsT0FBT0MsT0FBUCxHQUFpQnZCLFVBQWpCIiwiZmlsZSI6Im5hbWVCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IGFycmF5VXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvYXJyYXknKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZG91YmxlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBhcnJheVV0aWwuZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgdGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gdGV4dDsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIGNvbnN0IHRleHQgPSBuYW1lLCAvLy9cbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBhcnJheVV0aWwuZmlyc3QoY2hpbGRFbGVtZW50cyk7XG5cbiAgICBmaXJzdENoaWxkRWxlbWVudC5zZXRUZXh0KHRleHQpO1xuICB9XG4gIFxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Eb3VibGVDbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSBvbkRvdWJsZUNsaWNrOyAvLy9cbiAgICBcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKE5hbWVCdXR0b24sIHByb3BlcnRpZXMsIGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihOYW1lQnV0dG9uLCB7XG4gIHRhZ05hbWU6ICdidXR0b24nLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ25hbWUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdvbkRvdWJsZUNsaWNrJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYW1lQnV0dG9uO1xuIl19