'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    InputElement = easy.InputElement;

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
          firstChildElement = first(childElements),
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
          firstChildElement = first(childElements);

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
  ignoredAttributes: ['name', 'onDoubleClick']
});

module.exports = NameButton;

function first(array) {
  return array[0];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiSW5wdXRFbGVtZW50IiwiTmFtZUJ1dHRvbiIsInNlbGVjdG9yIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Eb3VibGVDbGljayIsImNoaWxkRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZmlyc3RDaGlsZEVsZW1lbnQiLCJmaXJzdCIsInRleHQiLCJnZXRUZXh0IiwibmFtZSIsInNldFRleHQiLCJoYW5kbGVyIiwib24iLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXJyYXkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxlQUFlRixLQUFLRSxZQUQxQjs7SUFHTUMsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBc0JDLGtCQUF0QixFQUEwQztBQUFBOztBQUFBLHdIQUNsQ0QsUUFEa0M7O0FBR3hDLFFBQUlDLGtCQUFKLEVBQXdCO0FBQ3RCLFlBQUtDLGFBQUwsQ0FBbUJELGtCQUFuQjtBQUNEO0FBTHVDO0FBTXpDOzs7OzhCQUVTO0FBQ1IsVUFBTUUsZ0JBQWdCLEtBQUtDLGdCQUFMLEVBQXRCO0FBQUEsVUFDTUMsb0JBQW9CQyxNQUFNSCxhQUFOLENBRDFCO0FBQUEsVUFFTUksT0FBT0Ysa0JBQWtCRyxPQUFsQixFQUZiO0FBQUEsVUFHTUMsT0FBT0YsSUFIYixDQURRLENBSVc7O0FBRW5CLGFBQU9FLElBQVA7QUFDRDs7OzRCQUVPQSxJLEVBQU07QUFDWixVQUFNRixPQUFPRSxJQUFiO0FBQUEsVUFBbUI7QUFDYk4sc0JBQWdCLEtBQUtDLGdCQUFMLEVBRHRCO0FBQUEsVUFFTUMsb0JBQW9CQyxNQUFNSCxhQUFOLENBRjFCOztBQUlBRSx3QkFBa0JLLE9BQWxCLENBQTBCSCxJQUExQjtBQUNEOzs7a0NBRWFJLE8sRUFBUztBQUNyQixXQUFLQyxFQUFMLENBQVEsVUFBUixFQUFvQkQsT0FBcEI7QUFDRDs7O21DQUVxQkUsVSxFQUFZO0FBQzFCLFVBQUVYLGFBQUYsR0FBb0JXLFVBQXBCLENBQUVYLGFBQUY7QUFBQSxVQUNBRCxrQkFEQSxHQUNxQkMsYUFEckIsQ0FEMEIsQ0FFVTs7QUFFMUMsYUFBT0osYUFBYWdCLGNBQWIsQ0FBNEJmLFVBQTVCLEVBQXdDYyxVQUF4QyxFQUFvRFosa0JBQXBELENBQVA7QUFDRDs7OztFQW5Dc0JILFk7O0FBc0N6QmlCLE9BQU9DLE1BQVAsQ0FBY2pCLFVBQWQsRUFBMEI7QUFDeEJrQixXQUFTLFFBRGU7QUFFeEJDLHFCQUFtQixDQUNqQixNQURpQixFQUVqQixlQUZpQjtBQUZLLENBQTFCOztBQVFBQyxPQUFPQyxPQUFQLEdBQWlCckIsVUFBakI7O0FBRUEsU0FBU08sS0FBVCxDQUFlZSxLQUFmLEVBQXNCO0FBQUUsU0FBT0EsTUFBTSxDQUFOLENBQVA7QUFBa0IiLCJmaWxlIjoibmFtZUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3kuSW5wdXRFbGVtZW50O1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgdGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gdGV4dDsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIGNvbnN0IHRleHQgPSBuYW1lLCAvLy9cbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBmaXJzdChjaGlsZEVsZW1lbnRzKTtcblxuICAgIGZpcnN0Q2hpbGRFbGVtZW50LnNldFRleHQodGV4dCk7XG4gIH1cbiAgXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikge1xuICAgIHRoaXMub24oJ2RibGNsaWNrJywgaGFuZGxlcik7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkRvdWJsZUNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRvdWJsZUNsaWNrSGFuZGxlciA9IG9uRG91YmxlQ2xpY2s7IC8vL1xuICAgIFxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTmFtZUJ1dHRvbiwgcHJvcGVydGllcywgZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKE5hbWVCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdvbkRvdWJsZUNsaWNrJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYW1lQnV0dG9uO1xuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cbiJdfQ==