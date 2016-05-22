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
    key: 'getReadOnly',
    value: function getReadOnly() {
      return this.readOnly;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = [];

      return subEntries;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksUUFBUSxRQUFRLFVBQVIsQ0FBWjtJQUNJLGlCQUFpQixRQUFRLG1CQUFSLENBRHJCO0lBRUksb0JBQW9CLFFBQVEsc0JBQVIsQ0FGeEI7O0lBSU0sSTs7O0FBQ0osZ0JBQVksUUFBWixFQUFzQixJQUF0QixFQUE0QixRQUE1QixFQUFzQyxnQkFBdEMsRUFBd0Qsd0JBQXhELEVBQWtGO0FBQUE7O0FBQ2hGLFFBQUksT0FBTyxNQUFNLEtBQU4sQ0FBWSxJQUF2Qjs7QUFEZ0Ysd0ZBRzFFLFFBSDBFLEVBR2hFLElBSGdFLEVBRzFELElBSDBELEVBR3BELGdCQUhvRDs7QUFLaEYsVUFBSyxRQUFMLEdBQWdCLENBQUMsQ0FBQyxRQUFsQjs7QUFFQSxVQUFLLGFBQUwsQ0FBbUIsWUFBVztBQUM1QixVQUFJLE9BQU8sSUFBWDtVQUNJLG9CQUFvQixJQUFJLGlCQUFKLENBQXNCLElBQXRCLENBRHhCOztBQUdBLCtCQUF5QixpQkFBekI7QUFDRCxLQUxrQixDQUtqQixJQUxpQixPQUFuQjs7QUFPQSxVQUFLLE1BQUw7QUFkZ0Y7QUFlakY7Ozs7a0NBRWE7QUFDWixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRLEssRUFBTztBQUNkLFVBQUksWUFBWSxNQUFNLE9BQU4sRUFBaEI7O0FBRUEsY0FBUSxTQUFSO0FBQ0UsYUFBSyxNQUFNLEtBQU4sQ0FBWSxJQUFqQjtBQUNBLGFBQUssTUFBTSxLQUFOLENBQVksTUFBakI7O0FBRUUsY0FBSSxPQUFPLEtBQUssT0FBTCxFQUFYO2NBQ0ksWUFBWSxNQUFNLE9BQU4sRUFEaEI7Y0FFSSxTQUFTLEtBQUssYUFBTCxDQUFtQixTQUFuQixJQUFnQyxDQUY3Qzs7QUFJQSxpQkFBTyxNQUFQOztBQUVGLGFBQUssTUFBTSxLQUFOLENBQVksU0FBakI7O0FBRUUsaUJBQU8sS0FBUDtBQVpKO0FBY0Q7OztrQ0FFYTtBQUNaLGFBQU8sS0FBSyxRQUFaO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQUksYUFBYSxFQUFqQjs7QUFFQSxhQUFPLFVBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBaEIsR0FBNEMsS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTVDO0FBQ0Q7Ozs7RUFyRGdCLGM7O0FBd0RuQixLQUFLLEtBQUwsR0FBYSxVQUFTLElBQVQsRUFBZSxRQUFmLEVBQXlCLGdCQUF6QixFQUEyQyx3QkFBM0MsRUFBcUU7QUFDaEYsTUFBSSxPQUFPLFFBQVEsS0FBUixDQUFjLElBQWQsRUFBb0IsT0FBcEIsRUFBNkIsSUFBN0IsRUFBbUMsUUFBbkMsRUFBNkMsZ0JBQTdDLEVBQStELHdCQUEvRCxDQUFYOztBQUVBLE9BQUssZUFBTCxDQUFxQixJQUFyQjs7QUFFQSxTQUFPLElBQVA7QUFDRCxDQU5EOztBQVFBLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKSxcbiAgICBBY3RpdmF0ZUZpbGVFdmVudCA9IHJlcXVpcmUoJy4uL2FjdGl2YXRlRmlsZUV2ZW50Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5yZWFkT25seSA9ICEhcmVhZE9ubHk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZmlsZSA9IHRoaXMsXG4gICAgICAgICAgYWN0aXZhdGVGaWxlRXZlbnQgPSBuZXcgQWN0aXZhdGVGaWxlRXZlbnQoZmlsZSk7XG5cbiAgICAgIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZE9ubHk7XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTtcbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnJlYWRPbmx5ID8gdGhpcy5hZGRDbGFzcygncmVhZE9ubHknKSA6IHRoaXMucmVtb3ZlQ2xhc3MoJ3JlYWRPbmx5Jyk7XG4gIH1cbn1cblxuRmlsZS5jbG9uZSA9IGZ1bmN0aW9uKG5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIGZpbGUgPSBFbGVtZW50LmNsb25lKEZpbGUsICcjZmlsZScsIG5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBmaWxlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19
