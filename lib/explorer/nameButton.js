'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    InputElement = easyui.InputElement;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJJbnB1dEVsZW1lbnQiLCJOYW1lQnV0dG9uIiwic2VsZWN0b3IiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwiY2hpbGRFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJmaXJzdENoaWxkRWxlbWVudCIsImZpcnN0IiwidGV4dCIsImdldFRleHQiLCJuYW1lIiwic2V0VGV4dCIsImhhbmRsZXIiLCJvbiIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLGVBQWVGLE9BQU9FLFlBRDVCOztJQUdNQyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsa0JBQXRCLEVBQTBDO0FBQUE7O0FBQUEsd0hBQ2xDRCxRQURrQzs7QUFHeEMsUUFBSUMsa0JBQUosRUFBd0I7QUFDdEIsWUFBS0MsYUFBTCxDQUFtQkQsa0JBQW5CO0FBQ0Q7QUFMdUM7QUFNekM7Ozs7OEJBRVM7QUFDUixVQUFNRSxnQkFBZ0IsS0FBS0MsZ0JBQUwsRUFBdEI7QUFBQSxVQUNNQyxvQkFBb0JDLE1BQU1ILGFBQU4sQ0FEMUI7QUFBQSxVQUVNSSxPQUFPRixrQkFBa0JHLE9BQWxCLEVBRmI7QUFBQSxVQUdNQyxPQUFPRixJQUhiLENBRFEsQ0FJVzs7QUFFbkIsYUFBT0UsSUFBUDtBQUNEOzs7NEJBRU9BLEksRUFBTTtBQUNaLFVBQU1GLE9BQU9FLElBQWI7QUFBQSxVQUFtQjtBQUNiTixzQkFBZ0IsS0FBS0MsZ0JBQUwsRUFEdEI7QUFBQSxVQUVNQyxvQkFBb0JDLE1BQU1ILGFBQU4sQ0FGMUI7O0FBSUFFLHdCQUFrQkssT0FBbEIsQ0FBMEJILElBQTFCO0FBQ0Q7OztrQ0FFYUksTyxFQUFTO0FBQ3JCLFdBQUtDLEVBQUwsQ0FBUSxVQUFSLEVBQW9CRCxPQUFwQjtBQUNEOzs7bUNBRXFCRSxVLEVBQVk7QUFDMUIsVUFBRVgsYUFBRixHQUFvQlcsVUFBcEIsQ0FBRVgsYUFBRjtBQUFBLFVBQ0FELGtCQURBLEdBQ3FCQyxhQURyQixDQUQwQixDQUVVOztBQUUxQyxhQUFPSixhQUFhZ0IsY0FBYixDQUE0QmYsVUFBNUIsRUFBd0NjLFVBQXhDLEVBQW9EWixrQkFBcEQsQ0FBUDtBQUNEOzs7O0VBbkNzQkgsWTs7QUFzQ3pCaUIsT0FBT0MsTUFBUCxDQUFjakIsVUFBZCxFQUEwQjtBQUN4QmtCLFdBQVMsUUFEZTtBQUV4QkMscUJBQW1CLENBQ2pCLE1BRGlCLEVBRWpCLGVBRmlCO0FBRkssQ0FBMUI7O0FBUUFDLE9BQU9DLE9BQVAsR0FBaUJyQixVQUFqQjs7QUFFQSxTQUFTTyxLQUFULENBQWVlLEtBQWYsRUFBc0I7QUFBRSxTQUFPQSxNQUFNLENBQU4sQ0FBUDtBQUFrQiIsImZpbGUiOiJuYW1lQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3l1aS5JbnB1dEVsZW1lbnQ7XG5cbmNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZG91YmxlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBmaXJzdChjaGlsZEVsZW1lbnRzKSxcbiAgICAgICAgICB0ZXh0ID0gZmlyc3RDaGlsZEVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICAgIG5hbWUgPSB0ZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgY29uc3QgdGV4dCA9IG5hbWUsIC8vL1xuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGZpcnN0KGNoaWxkRWxlbWVudHMpO1xuXG4gICAgZmlyc3RDaGlsZEVsZW1lbnQuc2V0VGV4dCh0ZXh0KTtcbiAgfVxuICBcbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbignZGJsY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uRG91YmxlQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gb25Eb3VibGVDbGljazsgLy8vXG4gICAgXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzLCBkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTmFtZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ29uRG91YmxlQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuIl19