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
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFile(file);
    }
  }], [{
    key: 'clone',
    value: function clone(name, explorer) {
      var file = Element.clone(File, '#file', name, explorer);

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkZpbGUiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJ0eXBlcyIsIkZJTEUiLCJvbkRvdWJsZUNsaWNrIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwiYmluZCIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlIiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsUUFBUUYsUUFBUSxVQUFSLENBQVo7QUFBQSxJQUNJRyxpQkFBaUJILFFBQVEsbUJBQVIsQ0FEckI7O0lBR01JLEk7OztBQUNKLGdCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0M7QUFBQTs7QUFDcEMsUUFBSUMsT0FBT04sTUFBTU8sS0FBTixDQUFZQyxJQUF2Qjs7QUFEb0MsNEdBRzlCTCxRQUg4QixFQUdwQkMsSUFIb0IsRUFHZEMsUUFIYyxFQUdKQyxJQUhJOztBQUtwQyxVQUFLRyxhQUFMLENBQW1CLE1BQUtDLGtCQUFMLENBQXdCQyxJQUF4QixPQUFuQjtBQUxvQztBQU1yQzs7OztrQ0FFYTtBQUNaLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLE1BQUo7QUFBQSxVQUNJQyxZQUFZRixNQUFNRyxPQUFOLEVBRGhCOztBQUdBLGNBQVFELFNBQVI7QUFDRSxhQUFLZCxNQUFNTyxLQUFOLENBQVlDLElBQWpCO0FBQ0EsYUFBS1IsTUFBTU8sS0FBTixDQUFZUyxNQUFqQjs7QUFFRSxjQUFJWixPQUFPLEtBQUthLE9BQUwsRUFBWDtBQUFBLGNBQ0lDLFlBQVlOLE1BQU1LLE9BQU4sRUFEaEI7O0FBR0FKLG1CQUFTVCxLQUFLZSxhQUFMLENBQW1CRCxTQUFuQixJQUFnQyxDQUF6QztBQUNBOztBQUVGLGFBQUtsQixNQUFNTyxLQUFOLENBQVlhLFNBQWpCO0FBQ0VQLG1CQUFTLEtBQVQ7QUFDQTtBQVpKOztBQWVBLGFBQU9BLE1BQVA7QUFDRDs7O29DQUVlO0FBQ2QsVUFBSVEsYUFBYSxFQUFqQixDQURjLENBQ1E7O0FBRXRCLGFBQU9BLFVBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFJaEIsV0FBVyxLQUFLaUIsV0FBTCxFQUFmO0FBQUEsVUFDSUMsT0FBTyxJQURYLENBRG1CLENBRUY7O0FBRWpCbEIsZUFBU21CLFFBQVQsQ0FBa0JELElBQWxCO0FBQ0Q7OzswQkFFWW5CLEksRUFBTUMsUSxFQUFVO0FBQzNCLFVBQUlrQixPQUFPeEIsUUFBUTBCLEtBQVIsQ0FBY3ZCLElBQWQsRUFBb0IsT0FBcEIsRUFBNkJFLElBQTdCLEVBQW1DQyxRQUFuQyxDQUFYOztBQUVBa0IsV0FBS0csZUFBTCxDQUFxQixJQUFyQjs7QUFFQSxhQUFPSCxJQUFQO0FBQ0Q7Ozs7RUF0RGdCdEIsYzs7QUF5RG5CMEIsT0FBT0MsT0FBUCxHQUFpQjFCLElBQWpCIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBGaWxlIGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgYmVmb3JlLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwOyAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHZhciBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlKGZpbGUpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgdmFyIGZpbGUgPSBFbGVtZW50LmNsb25lKEZpbGUsICcjZmlsZScsIG5hbWUsIGV4cGxvcmVyKTtcblxuICAgIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19