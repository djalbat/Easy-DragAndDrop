'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('./entry'),
    NameButton = require('./nameButton'),
    DraggableElement = require('./draggableElement'),
    ActivateFileEvent = require('./activateFileEvent');

var DraggableEntry = function (_DraggableElement) {
  _inherits(DraggableEntry, _DraggableElement);

  function DraggableEntry(selectorOr$Element, name, eventHandler, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DraggableEntry).call(this, selectorOr$Element, eventHandler));

    _this.nameButton = new NameButton(_this, name, function () {
      if (type === Entry.types.FILE) {
        var file = this,
            ///
        activateFileEvent = new ActivateFileEvent(file);

        eventHandler(activateFileEvent);
      }
    }.bind(_this));

    _this.type = type;
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
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
  }]);

  return DraggableEntry;
}(DraggableElement);

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBUSxRQUFRLFNBQVIsQ0FBUjtJQUNBLGFBQWEsUUFBUSxjQUFSLENBQWI7SUFDQSxtQkFBbUIsUUFBUSxvQkFBUixDQUFuQjtJQUNBLG9CQUFvQixRQUFRLHFCQUFSLENBQXBCOztJQUVFOzs7QUFDSixXQURJLGNBQ0osQ0FBWSxrQkFBWixFQUFnQyxJQUFoQyxFQUFzQyxZQUF0QyxFQUFvRCxJQUFwRCxFQUEwRDswQkFEdEQsZ0JBQ3NEOzt1RUFEdEQsMkJBRUksb0JBQW9CLGVBRDhCOztBQUd4RCxVQUFLLFVBQUwsR0FBa0IsSUFBSSxVQUFKLFFBQXFCLElBQXJCLEVBQTJCLFlBQVc7QUFDdEQsVUFBSSxTQUFTLE1BQU0sS0FBTixDQUFZLElBQVosRUFBa0I7QUFDN0IsWUFBSSxPQUFPLElBQVA7O0FBQ0EsNEJBQW9CLElBQUksaUJBQUosQ0FBc0IsSUFBdEIsQ0FBcEIsQ0FGeUI7O0FBSTdCLHFCQUFhLGlCQUFiLEVBSjZCO09BQS9CO0tBRDJDLENBTzNDLElBUDJDLE9BQTNCLENBQWxCLENBSHdEOztBQVl4RCxVQUFLLElBQUwsR0FBWSxJQUFaLENBWndEOztHQUExRDs7ZUFESTs7OEJBZ0JNO0FBQ1IsYUFBTyxLQUFLLElBQUwsQ0FEQzs7Ozs4QkFJQTtBQUFFLGFBQU8sS0FBSyxVQUFMLENBQWdCLE9BQWhCLEVBQVAsQ0FBRjs7Ozs4QkFFQTtBQUNSLFVBQUksaUJBQWlCLEtBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBakI7O0FBQ0EsYUFBTyxLQUFLLE9BQUwsRUFBUDtVQUNBLE9BQU8sZUFBZSxNQUFmLENBQXNCLFVBQVMsSUFBVCxFQUFlLGFBQWYsRUFBOEI7QUFDbkQsWUFBSSxvQkFBb0IsY0FBYyxPQUFkLEVBQXBCLENBRCtDOztBQUduRCxlQUFPLG9CQUFvQixHQUFwQixHQUEwQixJQUExQixDQUg0Qzs7QUFLbkQsZUFBTyxJQUFQLENBTG1EO09BQTlCLEVBTXBCLElBTkYsQ0FBUCxDQUhJOztBQVdSLGFBQU8sSUFBUCxDQVhROzs7OzRCQWNGLE1BQU07QUFBRSxXQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsSUFBeEIsRUFBRjs7OztTQXBDVjtFQUF1Qjs7QUF1QzdCLE9BQU8sT0FBUCxHQUFpQixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbGVtZW50JyksXG4gICAgQWN0aXZhdGVGaWxlRXZlbnQgPSByZXF1aXJlKCcuL2FjdGl2YXRlRmlsZUV2ZW50Jyk7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3IkRWxlbWVudCwgbmFtZSwgZXZlbnRIYW5kbGVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3JPciRFbGVtZW50LCBldmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmV3IE5hbWVCdXR0b24odGhpcywgbmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodHlwZSA9PT0gRW50cnkudHlwZXMuRklMRSkge1xuICAgICAgICB2YXIgZmlsZSA9IHRoaXMsICAvLy9cbiAgICAgICAgICAgIGFjdGl2YXRlRmlsZUV2ZW50ID0gbmV3IEFjdGl2YXRlRmlsZUV2ZW50KGZpbGUpO1xuXG4gICAgICAgIGV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCk7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgdmFyIHBhcmVudEVsZW1lbnRzID0gdGhpcy5wYXJlbnRFbGVtZW50cygndWwuZXhwbG9yZXIgbGknKSwgLy8vXG4gICAgICAgIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgcGF0aCA9IHBhcmVudEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihwYXRoLCBwYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudEVsZW1lbnROYW1lID0gcGFyZW50RWxlbWVudC5nZXROYW1lKCk7XG5cbiAgICAgICAgICAgICAgICBwYXRoID0gcGFyZW50RWxlbWVudE5hbWUgKyAnLycgKyBwYXRoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICAgIH0sIG5hbWUpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==
