'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NameButton = require('./nameButton'),
    DraggableElement = require('../draggableElement');

var DraggableEntry = function (_DraggableElement) {
  _inherits(DraggableEntry, _DraggableElement);

  function DraggableEntry(selector, name, type, dragEventHandler) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector, dragEventHandler));

    _this.nameButton = new NameButton(_this, name);

    _this.type = type;
    return _this;
  }

  _createClass(DraggableEntry, [{
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
    key: 'getPath',
    value: function getPath() {
      var parentElements = this.parentElements('ul.explorer li'),
          ///
      name = this.getName(),
          path = parentElements.reduce(function (path, parentElement) {
        var parentElementName = parentElement.getName();

        path = parentElementName + '/' + path;

        return path;
      }, name);

      return path;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.nameButton.setName(name);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(doubleClickHandler) {
      this.nameButton.onDoubleClick(doubleClickHandler);
    }
  }]);

  return DraggableEntry;
}(DraggableElement);

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJOYW1lQnV0dG9uIiwicmVxdWlyZSIsIkRyYWdnYWJsZUVsZW1lbnQiLCJEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJkcmFnRXZlbnRIYW5kbGVyIiwibmFtZUJ1dHRvbiIsImdldE5hbWUiLCJwYXJlbnRFbGVtZW50cyIsInBhdGgiLCJyZWR1Y2UiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50RWxlbWVudE5hbWUiLCJzZXROYW1lIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsYUFBYUMsUUFBUSxjQUFSLENBQWpCO0FBQUEsSUFDSUMsbUJBQW1CRCxRQUFRLHFCQUFSLENBRHZCOztJQUdNRSxjOzs7QUFDSiwwQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDQyxnQkFBbEMsRUFBb0Q7QUFBQTs7QUFBQSxnSUFDNUNILFFBRDRDLEVBQ2xDRyxnQkFEa0M7O0FBR2xELFVBQUtDLFVBQUwsR0FBa0IsSUFBSVIsVUFBSixRQUFxQkssSUFBckIsQ0FBbEI7O0FBRUEsVUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBTGtEO0FBTW5EOzs7OzhCQUVTO0FBQUUsYUFBTyxLQUFLRSxVQUFMLENBQWdCQyxPQUFoQixFQUFQO0FBQW1DOzs7OEJBRXJDO0FBQ1IsYUFBTyxLQUFLSCxJQUFaO0FBQ0Q7Ozs4QkFFUztBQUNSLFVBQUlJLGlCQUFpQixLQUFLQSxjQUFMLENBQW9CLGdCQUFwQixDQUFyQjtBQUFBLFVBQTREO0FBQ3hETCxhQUFPLEtBQUtJLE9BQUwsRUFEWDtBQUFBLFVBRUlFLE9BQU9ELGVBQWVFLE1BQWYsQ0FBc0IsVUFBU0QsSUFBVCxFQUFlRSxhQUFmLEVBQThCO0FBQ25ELFlBQUlDLG9CQUFvQkQsY0FBY0osT0FBZCxFQUF4Qjs7QUFFQUUsZUFBT0csb0JBQW9CLEdBQXBCLEdBQTBCSCxJQUFqQzs7QUFFQSxlQUFPQSxJQUFQO0FBQ0QsT0FOQSxFQU1FTixJQU5GLENBRlg7O0FBVUEsYUFBT00sSUFBUDtBQUNEOzs7NEJBRU9OLEksRUFBTTtBQUFFLFdBQUtHLFVBQUwsQ0FBZ0JPLE9BQWhCLENBQXdCVixJQUF4QjtBQUFnQzs7O2tDQUVsQ1csa0IsRUFBb0I7QUFBRSxXQUFLUixVQUFMLENBQWdCUyxhQUFoQixDQUE4QkQsa0JBQTlCO0FBQW9EOzs7O0VBL0I3RGQsZ0I7O0FBa0M3QmdCLE9BQU9DLE9BQVAsR0FBaUJoQixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBkcmFnRXZlbnRIYW5kbGVyKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5ldyBOYW1lQnV0dG9uKHRoaXMsIG5hbWUpO1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICB2YXIgcGFyZW50RWxlbWVudHMgPSB0aGlzLnBhcmVudEVsZW1lbnRzKCd1bC5leHBsb3JlciBsaScpLCAvLy9cbiAgICAgICAgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBwYXRoID0gcGFyZW50RWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKHBhdGgsIHBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50RWxlbWVudE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldE5hbWUoKTtcblxuICAgICAgICAgICAgICAgIHBhdGggPSBwYXJlbnRFbGVtZW50TmFtZSArICcvJyArIHBhdGg7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgICAgICAgfSwgbmFtZSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==