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

  function File(selector, name, explorer, activateFileEventHandler) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, explorer, type));

    _this.activateFileEventHandler = activateFileEventHandler;

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
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
      var before,
          entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;
          break;

        case Entry.types.DIRECTORY:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var file = this,
          activateFileEvent = new ActivateFileEvent(file);

      this.activateFileEventHandler(activateFileEvent);
    }
  }], [{
    key: 'clone',
    value: function clone(name, explorer, activateFileEventHandler) {
      var file = Element.clone(File, '#file', name, explorer, activateFileEventHandler);

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkFjdGl2YXRlRmlsZUV2ZW50IiwiRmlsZSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRklMRSIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJiaW5kIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJESVJFQ1RPUlkiLCJzdWJFbnRyaWVzIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsUUFBUUYsUUFBUSxVQUFSLENBQVo7QUFBQSxJQUNJRyxpQkFBaUJILFFBQVEsbUJBQVIsQ0FEckI7QUFBQSxJQUVJSSxvQkFBb0JKLFFBQVEsc0JBQVIsQ0FGeEI7O0lBSU1LLEk7OztBQUNKLGdCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0NDLHdCQUF0QyxFQUFnRTtBQUFBOztBQUM5RCxRQUFJQyxPQUFPUixNQUFNUyxLQUFOLENBQVlDLElBQXZCOztBQUQ4RCw0R0FHeEROLFFBSHdELEVBRzlDQyxJQUg4QyxFQUd4Q0MsUUFId0MsRUFHOUJFLElBSDhCOztBQUs5RCxVQUFLRCx3QkFBTCxHQUFnQ0Esd0JBQWhDOztBQUVBLFVBQUtJLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCLE9BQW5CO0FBUDhEO0FBUS9EOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFQO0FBQ0Q7Ozs2QkFFUUMsSyxFQUFPO0FBQ2QsVUFBSUMsTUFBSjtBQUFBLFVBQ0lDLFlBQVlGLE1BQU1HLE9BQU4sRUFEaEI7O0FBR0EsY0FBUUQsU0FBUjtBQUNFLGFBQUtoQixNQUFNUyxLQUFOLENBQVlDLElBQWpCO0FBQ0EsYUFBS1YsTUFBTVMsS0FBTixDQUFZUyxNQUFqQjs7QUFFRSxjQUFJYixPQUFPLEtBQUtjLE9BQUwsRUFBWDtBQUFBLGNBQ0lDLFlBQVlOLE1BQU1LLE9BQU4sRUFEaEI7O0FBR0FKLG1CQUFTVixLQUFLZ0IsYUFBTCxDQUFtQkQsU0FBbkIsSUFBZ0MsQ0FBekM7QUFDQTs7QUFFRixhQUFLcEIsTUFBTVMsS0FBTixDQUFZYSxTQUFqQjtBQUNFUCxtQkFBUyxLQUFUO0FBQ0E7QUFaSjs7QUFlQSxhQUFPQSxNQUFQO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQUlRLGFBQWEsRUFBakIsQ0FEYyxDQUNROztBQUV0QixhQUFPQSxVQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBSUMsT0FBTyxJQUFYO0FBQUEsVUFDSUMsb0JBQW9CLElBQUl2QixpQkFBSixDQUFzQnNCLElBQXRCLENBRHhCOztBQUdBLFdBQUtqQix3QkFBTCxDQUE4QmtCLGlCQUE5QjtBQUNEOzs7MEJBRVlwQixJLEVBQU1DLFEsRUFBVUMsd0IsRUFBMEI7QUFDckQsVUFBSWlCLE9BQU96QixRQUFRMkIsS0FBUixDQUFjdkIsSUFBZCxFQUFvQixPQUFwQixFQUE2QkUsSUFBN0IsRUFBbUNDLFFBQW5DLEVBQTZDQyx3QkFBN0MsQ0FBWDs7QUFFQWlCLFdBQUtHLGVBQUwsQ0FBcUIsSUFBckI7O0FBRUEsYUFBT0gsSUFBUDtBQUNEOzs7O0VBeERnQnZCLGM7O0FBMkRuQjJCLE9BQU9DLE9BQVAsR0FBaUIxQixJQUFqQiIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKSxcbiAgICBBY3RpdmF0ZUZpbGVFdmVudCA9IHJlcXVpcmUoJy4uL2FjdGl2YXRlRmlsZUV2ZW50Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyID0gYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgYmVmb3JlLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwOyAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHZhciBmaWxlID0gdGhpcyxcbiAgICAgICAgYWN0aXZhdGVGaWxlRXZlbnQgPSBuZXcgQWN0aXZhdGVGaWxlRXZlbnQoZmlsZSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBmaWxlID0gRWxlbWVudC5jbG9uZShGaWxlLCAnI2ZpbGUnLCBuYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19