'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var NameButton = require('./nameButton');

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    _this.nameButton = NameButton.fromParentElement(_this, name);

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
  }]);

  return Entry;
}(Element);

Entry.types = {
  FILE: 'FILE',
  MARKER: 'MARKER',
  DIRECTORY: 'DIRECTORY'
};

module.exports = Entry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIk5hbWVCdXR0b24iLCJFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJuYW1lQnV0dG9uIiwiZnJvbVBhcmVudEVsZW1lbnQiLCJnZXROYW1lIiwidHlwZXMiLCJGSUxFIiwiTUFSS0VSIiwiRElSRUNUT1JZIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLFVBQVVGLE9BQU9FLE9BRHZCOztBQUdBLElBQU1DLGFBQWFGLFFBQVEsY0FBUixDQUFuQjs7SUFFTUcsSzs7O0FBQ0osaUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQztBQUFBOztBQUFBLDhHQUMxQkYsUUFEMEI7O0FBR2hDLFVBQUtHLFVBQUwsR0FBa0JMLFdBQVdNLGlCQUFYLFFBQW1DSCxJQUFuQyxDQUFsQjs7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFMZ0M7QUFNakM7Ozs7OEJBRVM7QUFBRSxhQUFPLEtBQUtDLFVBQUwsQ0FBZ0JFLE9BQWhCLEVBQVA7QUFBbUM7Ozs4QkFFckM7QUFDUixhQUFPLEtBQUtILElBQVo7QUFDRDs7OztFQWJpQkwsTzs7QUFnQnBCRSxNQUFNTyxLQUFOLEdBQWM7QUFDWkMsUUFBTSxNQURNO0FBRVpDLFVBQVEsUUFGSTtBQUdaQyxhQUFXO0FBSEMsQ0FBZDs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQlosS0FBakIiLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG5jb25zdCBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNsYXNzIEVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gTmFtZUJ1dHRvbi5mcm9tUGFyZW50RWxlbWVudCh0aGlzLCBuYW1lKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxufVxuXG5FbnRyeS50eXBlcyA9IHtcbiAgRklMRTogJ0ZJTEUnLFxuICBNQVJLRVI6ICdNQVJLRVInLFxuICBESVJFQ1RPUlk6ICdESVJFQ1RPUlknXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJ5O1xuIl19