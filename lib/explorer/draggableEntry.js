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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DraggableEntry).call(this, selector, dragEventHandler));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUksYUFBYSxRQUFRLGNBQVIsQ0FBakI7SUFDSSxtQkFBbUIsUUFBUSxxQkFBUixDQUR2Qjs7SUFHTSxjOzs7QUFDSiwwQkFBWSxRQUFaLEVBQXNCLElBQXRCLEVBQTRCLElBQTVCLEVBQWtDLGdCQUFsQyxFQUFvRDtBQUFBOztBQUFBLGtHQUM1QyxRQUQ0QyxFQUNsQyxnQkFEa0M7O0FBR2xELFVBQUssVUFBTCxHQUFrQixJQUFJLFVBQUosUUFBcUIsSUFBckIsQ0FBbEI7O0FBRUEsVUFBSyxJQUFMLEdBQVksSUFBWjtBQUxrRDtBQU1uRDs7Ozs4QkFFUztBQUFFLGFBQU8sS0FBSyxVQUFMLENBQWdCLE9BQWhCLEVBQVA7QUFBbUM7Ozs4QkFFckM7QUFDUixhQUFPLEtBQUssSUFBWjtBQUNEOzs7OEJBRVM7QUFDUixVQUFJLGlCQUFpQixLQUFLLGNBQUwsQ0FBb0IsZ0JBQXBCLENBQXJCOztBQUNJLGFBQU8sS0FBSyxPQUFMLEVBRFg7VUFFSSxPQUFPLGVBQWUsTUFBZixDQUFzQixVQUFTLElBQVQsRUFBZSxhQUFmLEVBQThCO0FBQ25ELFlBQUksb0JBQW9CLGNBQWMsT0FBZCxFQUF4Qjs7QUFFQSxlQUFPLG9CQUFvQixHQUFwQixHQUEwQixJQUFqQzs7QUFFQSxlQUFPLElBQVA7QUFDRCxPQU5BLEVBTUUsSUFORixDQUZYOztBQVVBLGFBQU8sSUFBUDtBQUNEOzs7NEJBRU8sSSxFQUFNO0FBQUUsV0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLElBQXhCO0FBQWdDOzs7a0NBRWxDLGtCLEVBQW9CO0FBQUUsV0FBSyxVQUFMLENBQWdCLGFBQWhCLENBQThCLGtCQUE5QjtBQUFvRDs7OztFQS9CN0QsZ0I7O0FBa0M3QixPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyksXG4gICAgRHJhZ2dhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVsZW1lbnQnKTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuZXcgTmFtZUJ1dHRvbih0aGlzLCBuYW1lKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgdmFyIHBhcmVudEVsZW1lbnRzID0gdGhpcy5wYXJlbnRFbGVtZW50cygndWwuZXhwbG9yZXIgbGknKSwgLy8vXG4gICAgICAgIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgcGF0aCA9IHBhcmVudEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihwYXRoLCBwYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudEVsZW1lbnROYW1lID0gcGFyZW50RWxlbWVudC5nZXROYW1lKCk7XG5cbiAgICAgICAgICAgICAgICBwYXRoID0gcGFyZW50RWxlbWVudE5hbWUgKyAnLycgKyBwYXRoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICAgIH0sIG5hbWUpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iXX0=
