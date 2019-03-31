'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var InputElement = easy.InputElement,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first;

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
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

      return name;
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      var getName = this.getName.bind(this),
          onDoubleClick = this.onDoubleClick.bind(this);

      return {
        getName: getName,
        onDoubleClick: onDoubleClick
      };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9idXR0b24vbmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIklucHV0RWxlbWVudCIsImFycmF5VXRpbGl0aWVzIiwiZmlyc3QiLCJOYW1lQnV0dG9uIiwiY2hpbGRFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJmaXJzdENoaWxkRWxlbWVudCIsImZpcnN0Q2hpbGRFbGVtZW50VGV4dCIsImdldFRleHQiLCJuYW1lIiwiaGFuZGxlciIsIm9uIiwiZ2V0TmFtZSIsImJpbmQiLCJvbkRvdWJsZUNsaWNrIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdNLElBQUVFLFlBQUYsR0FBbUJILElBQW5CLENBQUVHLFlBQUY7QUFBQSxJQUNFQyxjQURGLEdBQ3FCRixTQURyQixDQUNFRSxjQURGO0FBQUEsSUFFRUMsS0FGRixHQUVZRCxjQUZaLENBRUVDLEtBRkY7O0lBSUFDLFU7Ozs7Ozs7Ozs7OzhCQUNNO0FBQ1IsVUFBTUMsZ0JBQWdCLEtBQUtDLGdCQUFMLEVBQXRCO0FBQUEsVUFDTUMsb0JBQW9CSixNQUFNRSxhQUFOLENBRDFCO0FBQUEsVUFFTUcsd0JBQXdCRCxrQkFBa0JFLE9BQWxCLEVBRjlCO0FBQUEsVUFHTUMsT0FBT0YscUJBSGIsQ0FEUSxDQUk0Qjs7QUFFcEMsYUFBT0UsSUFBUDtBQUNEOzs7a0NBRWFDLE8sRUFBUztBQUNyQixXQUFLQyxFQUFMLENBQVEsVUFBUixFQUFvQkQsT0FBcEI7QUFDRDs7O29DQUVlO0FBQ2YsVUFBTUUsVUFBVSxLQUFLQSxPQUFMLENBQWFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBaEI7QUFBQSxVQUNHQyxnQkFBZ0IsS0FBS0EsYUFBTCxDQUFtQkQsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FEbkI7O0FBR0MsYUFBUTtBQUNORCx3QkFETTtBQUVORTtBQUZNLE9BQVI7QUFJRDs7O21DQUVxQkMsVSxFQUFZO0FBQUUsYUFBT2YsYUFBYWdCLGNBQWIsQ0FBNEJiLFVBQTVCLEVBQXdDWSxVQUF4QyxDQUFQO0FBQTZEOzs7O0VBeEIxRWYsWTs7QUEyQnpCaUIsT0FBT0MsTUFBUCxDQUFjZixVQUFkLEVBQTBCO0FBQ3hCZ0IsV0FBUyxRQURlO0FBRXhCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQUZLO0FBS3hCQyxxQkFBbUIsQ0FDakIsTUFEaUI7QUFMSyxDQUExQjs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQnJCLFVBQWpCIiwiZmlsZSI6Im5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnRUZXh0ID0gZmlyc3RDaGlsZEVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICAgIG5hbWUgPSBmaXJzdENoaWxkRWxlbWVudFRleHQ7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldE5hbWUgPSB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBvbkRvdWJsZUNsaWNrID0gdGhpcy5vbkRvdWJsZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldE5hbWUsXG4gICAgICBvbkRvdWJsZUNsaWNrXG4gICAgfSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTmFtZUJ1dHRvbiwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihOYW1lQnV0dG9uLCB7XG4gIHRhZ05hbWU6ICdidXR0b24nLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ25hbWUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG4iXX0=