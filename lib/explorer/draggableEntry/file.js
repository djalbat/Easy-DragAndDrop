'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selector, name, explorer) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, explorer, type));

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
      var before = void 0;

      var entryType = entry.getType();

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
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFile(file);
    }
  }], [{
    key: 'clone',
    value: function clone(name, explorer) {
      var file = new File('#file', name, explorer);

      file = Element.clone(File, file, name, explorer); ///

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkZpbGUiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJ0eXBlcyIsIkZJTEUiLCJvbkRvdWJsZUNsaWNrIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwiYmluZCIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlIiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7O0FBR0EsSUFBTUMsUUFBUUYsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNRyxpQkFBaUJILFFBQVEsbUJBQVIsQ0FEdkI7O0lBR01JLEk7OztBQUNKLGdCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0M7QUFBQTs7QUFDcEMsUUFBTUMsT0FBT04sTUFBTU8sS0FBTixDQUFZQyxJQUF6Qjs7QUFEb0MsNEdBRzlCTCxRQUg4QixFQUdwQkMsSUFIb0IsRUFHZEMsUUFIYyxFQUdKQyxJQUhJOztBQUtwQyxVQUFLRyxhQUFMLENBQW1CLE1BQUtDLGtCQUFMLENBQXdCQyxJQUF4QixPQUFuQjtBQUxvQztBQU1yQzs7OztrQ0FFYTtBQUNaLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMsWUFBWUYsTUFBTUcsT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS2QsTUFBTU8sS0FBTixDQUFZQyxJQUFqQjtBQUNBLGFBQUtSLE1BQU1PLEtBQU4sQ0FBWVMsTUFBakI7O0FBRUUsY0FBTVosT0FBTyxLQUFLYSxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZTixNQUFNSyxPQUFOLEVBRGxCOztBQUdBSixtQkFBU1QsS0FBS2UsYUFBTCxDQUFtQkQsU0FBbkIsSUFBZ0MsQ0FBekM7QUFDQTs7QUFFRixhQUFLbEIsTUFBTU8sS0FBTixDQUFZYSxTQUFqQjtBQUNFUCxtQkFBUyxLQUFUO0FBQ0E7QUFaSjs7QUFlQSxhQUFPQSxNQUFQO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQU1RLGFBQWEsRUFBbkIsQ0FEYyxDQUNVOztBQUV4QixhQUFPQSxVQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTWhCLFdBQVcsS0FBS2lCLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxPQUFPLElBRGIsQ0FEbUIsQ0FFQTs7QUFFbkJsQixlQUFTbUIsUUFBVCxDQUFrQkQsSUFBbEI7QUFDRDs7OzBCQUVZbkIsSSxFQUFNQyxRLEVBQVU7QUFDM0IsVUFBSWtCLE9BQU8sSUFBSXJCLElBQUosQ0FBUyxPQUFULEVBQWtCRSxJQUFsQixFQUF3QkMsUUFBeEIsQ0FBWDs7QUFFQWtCLGFBQU94QixRQUFRMEIsS0FBUixDQUFjdkIsSUFBZCxFQUFvQnFCLElBQXBCLEVBQTBCbkIsSUFBMUIsRUFBZ0NDLFFBQWhDLENBQVAsQ0FIMkIsQ0FHdUI7O0FBRWxEa0IsV0FBS0csZUFBTCxDQUFxQixJQUFyQjs7QUFFQSxhQUFPSCxJQUFQO0FBQ0Q7Ozs7RUF6RGdCdEIsYzs7QUE0RG5CMEIsT0FBT0MsT0FBUCxHQUFpQjFCLElBQWpCIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgICAgXG4gICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDsgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZShmaWxlKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBleHBsb3Jlcikge1xuICAgIGxldCBmaWxlID0gbmV3IEZpbGUoJyNmaWxlJywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgZmlsZSA9IEVsZW1lbnQuY2xvbmUoRmlsZSwgZmlsZSwgbmFtZSwgZXhwbG9yZXIpOyAvLy9cblxuICAgIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19