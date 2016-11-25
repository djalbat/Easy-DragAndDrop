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

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, type, dragEventHandler));

    _this.readOnly = readOnly;

    _this.activateFileEventHandler = activateFileEventHandler;

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

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
    key: 'getReadOnly',
    value: function getReadOnly() {
      return this.readOnly;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'update',
    value: function update() {
      this.readOnly ? this.addClass('readOnly') : this.removeClass('readOnly');
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
    value: function clone(name, readOnly, dragEventHandler, activateFileEventHandler) {
      var file = Element.clone(File, '#file', name, readOnly, dragEventHandler, activateFileEventHandler);

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkFjdGl2YXRlRmlsZUV2ZW50IiwiRmlsZSIsInNlbGVjdG9yIiwibmFtZSIsInJlYWRPbmx5IiwiZHJhZ0V2ZW50SGFuZGxlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsInR5cGUiLCJ0eXBlcyIsIkZJTEUiLCJvbkRvdWJsZUNsaWNrIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwiYmluZCIsInVwZGF0ZSIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxRQUFRRixRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lHLGlCQUFpQkgsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlJLG9CQUFvQkosUUFBUSxzQkFBUixDQUZ4Qjs7SUFJTUssSTs7O0FBQ0osZ0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0MsZ0JBQXRDLEVBQXdEQyx3QkFBeEQsRUFBa0Y7QUFBQTs7QUFDaEYsUUFBSUMsT0FBT1QsTUFBTVUsS0FBTixDQUFZQyxJQUF2Qjs7QUFEZ0YsNEdBRzFFUCxRQUgwRSxFQUdoRUMsSUFIZ0UsRUFHMURJLElBSDBELEVBR3BERixnQkFIb0Q7O0FBS2hGLFVBQUtELFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLFVBQUtFLHdCQUFMLEdBQWdDQSx3QkFBaEM7O0FBRUEsVUFBS0ksYUFBTCxDQUFtQixNQUFLQyxrQkFBTCxDQUF3QkMsSUFBeEIsT0FBbkI7O0FBRUEsVUFBS0MsTUFBTDtBQVhnRjtBQVlqRjs7OztrQ0FFYTtBQUNaLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLE1BQUo7QUFBQSxVQUNJQyxZQUFZRixNQUFNRyxPQUFOLEVBRGhCOztBQUdBLGNBQVFELFNBQVI7QUFDRSxhQUFLbEIsTUFBTVUsS0FBTixDQUFZQyxJQUFqQjtBQUNBLGFBQUtYLE1BQU1VLEtBQU4sQ0FBWVUsTUFBakI7O0FBRUUsY0FBSWYsT0FBTyxLQUFLZ0IsT0FBTCxFQUFYO0FBQUEsY0FDSUMsWUFBWU4sTUFBTUssT0FBTixFQURoQjs7QUFHQUosbUJBQVNaLEtBQUtrQixhQUFMLENBQW1CRCxTQUFuQixJQUFnQyxDQUF6QztBQUNBOztBQUVGLGFBQUt0QixNQUFNVSxLQUFOLENBQVljLFNBQWpCO0FBQ0VQLG1CQUFTLEtBQVQ7QUFDQTtBQVpKOztBQWVBLGFBQU9BLE1BQVA7QUFDRDs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLWCxRQUFaO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQUltQixhQUFhLEVBQWpCLENBRGMsQ0FDUTs7QUFFdEIsYUFBT0EsVUFBUDtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLbkIsUUFBTCxHQUNFLEtBQUtvQixRQUFMLENBQWMsVUFBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixVQUFqQixDQUZKO0FBR0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBSUMsT0FBTyxJQUFYO0FBQUEsVUFDSUMsb0JBQW9CLElBQUkzQixpQkFBSixDQUFzQjBCLElBQXRCLENBRHhCOztBQUdBLFdBQUtwQix3QkFBTCxDQUE4QnFCLGlCQUE5QjtBQUNEOzs7MEJBRVl4QixJLEVBQU1DLFEsRUFBVUMsZ0IsRUFBa0JDLHdCLEVBQTBCO0FBQ3ZFLFVBQUlvQixPQUFPN0IsUUFBUStCLEtBQVIsQ0FBYzNCLElBQWQsRUFBb0IsT0FBcEIsRUFBNkJFLElBQTdCLEVBQW1DQyxRQUFuQyxFQUE2Q0MsZ0JBQTdDLEVBQStEQyx3QkFBL0QsQ0FBWDs7QUFFQW9CLFdBQUtHLGVBQUwsQ0FBcUIsSUFBckI7O0FBRUEsYUFBT0gsSUFBUDtBQUNEOzs7O0VBdEVnQjNCLGM7O0FBeUVuQitCLE9BQU9DLE9BQVAsR0FBaUI5QixJQUFqQiIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKSxcbiAgICBBY3RpdmF0ZUZpbGVFdmVudCA9IHJlcXVpcmUoJy4uL2FjdGl2YXRlRmlsZUV2ZW50Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5yZWFkT25seSA9IHJlYWRPbmx5O1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgYmVmb3JlLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwOyAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRSZWFkT25seSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkT25seTtcbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5yZWFkT25seSA/IFxuICAgICAgdGhpcy5hZGRDbGFzcygncmVhZE9ubHknKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdyZWFkT25seScpO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdmFyIGZpbGUgPSB0aGlzLFxuICAgICAgICBhY3RpdmF0ZUZpbGVFdmVudCA9IG5ldyBBY3RpdmF0ZUZpbGVFdmVudChmaWxlKTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBFbGVtZW50LmNsb25lKEZpbGUsICcjZmlsZScsIG5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgZmlsZS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGU7XG4iXX0=