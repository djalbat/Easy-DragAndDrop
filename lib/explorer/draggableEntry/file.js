'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry'),
    ActivateFileEvent = require('../activateFileEvent');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selector, name, readOnly, dragEventHandler, activateFileEventHandler) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, selector, name, type, dragEventHandler));

    _this.readOnly = !!readOnly;

    _this.onDoubleClick(function () {
      var file = this,
          activateFileEvent = new ActivateFileEvent(file);

      activateFileEventHandler(activateFileEvent);
    }.bind(_this));

    _this.update();
    return _this;
  }

  _createClass(File, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;

        case Entry.types.DIRECTORY:

          return false;
      }
    }
  }, {
    key: 'getEntries',
    value: function getEntries() {
      var entry = this,
          ///
      entries = [entry];

      return entries;
    }
  }, {
    key: 'getReadOnly',
    value: function getReadOnly() {
      return this.readOnly;
    }
  }, {
    key: 'update',
    value: function update() {
      this.readOnly ? this.addClass('readOnly') : this.removeClass('readOnly');
    }
  }]);

  return File;
}(DraggableEntry);

File.clone = function (name, readOnly, dragEventHandler, activateFileEventHandler) {
  var file = Element.clone(File, '#file', name, readOnly, dragEventHandler, activateFileEventHandler);

  file.removeAttribute('id');

  return file;
};

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksUUFBUSxRQUFRLFVBQVIsQ0FBWjtJQUNJLGlCQUFpQixRQUFRLG1CQUFSLENBRHJCO0lBRUksb0JBQW9CLFFBQVEsc0JBQVIsQ0FGeEI7O0lBSU0sSTs7O0FBQ0osZ0JBQVksUUFBWixFQUFzQixJQUF0QixFQUE0QixRQUE1QixFQUFzQyxnQkFBdEMsRUFBd0Qsd0JBQXhELEVBQWtGO0FBQUE7O0FBQ2hGLFFBQUksT0FBTyxNQUFNLEtBQU4sQ0FBWSxJQUF2Qjs7QUFEZ0Ysd0ZBRzFFLFFBSDBFLEVBR2hFLElBSGdFLEVBRzFELElBSDBELEVBR3BELGdCQUhvRDs7QUFLaEYsVUFBSyxRQUFMLEdBQWdCLENBQUMsQ0FBQyxRQUFsQjs7QUFFQSxVQUFLLGFBQUwsQ0FBbUIsWUFBVztBQUM1QixVQUFJLE9BQU8sSUFBWDtVQUNJLG9CQUFvQixJQUFJLGlCQUFKLENBQXNCLElBQXRCLENBRHhCOztBQUdBLCtCQUF5QixpQkFBekI7QUFDRCxLQUxrQixDQUtqQixJQUxpQixPQUFuQjs7QUFPQSxVQUFLLE1BQUw7QUFkZ0Y7QUFlakY7Ozs7a0NBRWE7QUFDWixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRLEssRUFBTztBQUNkLFVBQUksWUFBWSxNQUFNLE9BQU4sRUFBaEI7O0FBRUEsY0FBUSxTQUFSO0FBQ0UsYUFBSyxNQUFNLEtBQU4sQ0FBWSxJQUFqQjtBQUNBLGFBQUssTUFBTSxLQUFOLENBQVksTUFBakI7O0FBRUUsY0FBSSxPQUFPLEtBQUssT0FBTCxFQUFYO2NBQ0ksWUFBWSxNQUFNLE9BQU4sRUFEaEI7Y0FFSSxTQUFTLEtBQUssYUFBTCxDQUFtQixTQUFuQixJQUFnQyxDQUY3Qzs7QUFJQSxpQkFBTyxNQUFQOztBQUVGLGFBQUssTUFBTSxLQUFOLENBQVksU0FBakI7O0FBRUUsaUJBQU8sS0FBUDtBQVpKO0FBY0Q7OztpQ0FFWTtBQUNYLFVBQUksUUFBUSxJQUFaOztBQUNJLGdCQUFVLENBQUMsS0FBRCxDQURkOztBQUdBLGFBQU8sT0FBUDtBQUNEOzs7a0NBRWE7QUFDWixhQUFPLEtBQUssUUFBWjtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUFoQixHQUE0QyxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNUM7QUFDRDs7OztFQXREZ0IsYzs7QUF5RG5CLEtBQUssS0FBTCxHQUFhLFVBQVMsSUFBVCxFQUFlLFFBQWYsRUFBeUIsZ0JBQXpCLEVBQTJDLHdCQUEzQyxFQUFxRTtBQUNoRixNQUFJLE9BQU8sUUFBUSxLQUFSLENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QixJQUE3QixFQUFtQyxRQUFuQyxFQUE2QyxnQkFBN0MsRUFBK0Qsd0JBQS9ELENBQVg7O0FBRUEsT0FBSyxlQUFMLENBQXFCLElBQXJCOztBQUVBLFNBQU8sSUFBUDtBQUNELENBTkQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCLElBQWpCIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpLFxuICAgIEFjdGl2YXRlRmlsZUV2ZW50ID0gcmVxdWlyZSgnLi4vYWN0aXZhdGVGaWxlRXZlbnQnKTtcblxuY2xhc3MgRmlsZSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLnJlYWRPbmx5ID0gISFyZWFkT25seTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmaWxlID0gdGhpcyxcbiAgICAgICAgICBhY3RpdmF0ZUZpbGVFdmVudCA9IG5ldyBBY3RpdmF0ZUZpbGVFdmVudChmaWxlKTtcblxuICAgICAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMsIC8vL1xuICAgICAgICBlbnRyaWVzID0gW2VudHJ5XTtcblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgZ2V0UmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZE9ubHk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5yZWFkT25seSA/IHRoaXMuYWRkQ2xhc3MoJ3JlYWRPbmx5JykgOiB0aGlzLnJlbW92ZUNsYXNzKCdyZWFkT25seScpO1xuICB9XG59XG5cbkZpbGUuY2xvbmUgPSBmdW5jdGlvbihuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gIHZhciBmaWxlID0gRWxlbWVudC5jbG9uZShGaWxlLCAnI2ZpbGUnLCBuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICBmaWxlLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICByZXR1cm4gZmlsZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZTtcbiJdfQ==
