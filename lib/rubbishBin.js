'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

var RubbishBin = function (_DroppableElement) {
  _inherits(RubbishBin, _DroppableElement);

  function RubbishBin(selector, removeHandler) {
    _classCallCheck(this, RubbishBin);

    var droppableElementMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, droppableElementMoveHandler));

    _this.close();
    return _this;
  }

  _createClass(RubbishBin, [{
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = null;

      return markedDirectory;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry) {
      this.open();
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      this.close();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var open = this.isOpen(),
          marked = open; ///

      return marked;
    }
  }, {
    key: 'dragging',
    value: function dragging(entry, explorer) {
      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(entry);

        if (!toBeMarked) {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          this.removeMarker();

          droppableElementToBeMarked !== null ? droppableElementToBeMarked.addMarker(entry) : explorer.addMarkerInPlace(entry);
        }
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourcePath, movedPath) {
      var removedPath = movedPath; ///

      this.removeDirectory(directory, removedPath);
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, movedPath) {
      var removedPath = movedPath; ///

      this.removeFile(file, removedPath);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directory, removedPath) {
      if (removedPath === null) {
        directory.remove();
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file, removedPath) {
      if (removedPath === null) {
        file.remove();
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.addClass('open');
    }
  }, {
    key: 'close',
    value: function close() {
      this.removeClass('open');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      var open = this.hasClass('open');

      return open;
    }
  }], [{
    key: 'clone',
    value: function clone(selector, removeHandler) {
      return Element.clone(RubbishBin, selector, removeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, removeHandler) {
      return Element.fromHTML(RubbishBin, html, removeHandler);
    }
  }]);

  return RubbishBin;
}(DroppableElement);

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImVudHJ5Iiwib3BlbiIsImlzT3BlbiIsIm1hcmtlZCIsImV4cGxvcmVyIiwiaXNNYXJrZWQiLCJ0b0JlTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsInJlbW92ZU1hcmtlciIsImFkZE1hcmtlciIsImFkZE1hcmtlckluUGxhY2UiLCJkaXJlY3RvcnkiLCJzb3VyY2VQYXRoIiwibW92ZWRQYXRoIiwicmVtb3ZlZFBhdGgiLCJyZW1vdmVEaXJlY3RvcnkiLCJmaWxlIiwicmVtb3ZlRmlsZSIsInJlbW92ZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImNsb25lIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLG1CQUFtQkYsUUFBUSxvQkFBUixDQUF2Qjs7SUFFTUcsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDO0FBQUE7O0FBQ25DLFFBQUlDLDhCQUE4QkQsYUFBbEMsQ0FEbUMsQ0FDZTs7QUFEZix3SEFHN0JELFFBSDZCLEVBR25CRSwyQkFIbUI7O0FBS25DLFVBQUtDLEtBQUw7QUFMbUM7QUFNcEM7Ozs7eUNBRW9CO0FBQ25CLFVBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxhQUFPQSxlQUFQO0FBQ0Q7Ozs4QkFFU0MsSyxFQUFPO0FBQ2YsV0FBS0MsSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLSCxLQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQUlHLE9BQU8sS0FBS0MsTUFBTCxFQUFYO0FBQUEsVUFDSUMsU0FBU0YsSUFEYixDQURTLENBRVc7O0FBRXBCLGFBQU9FLE1BQVA7QUFDRDs7OzZCQUVRSCxLLEVBQU9JLFEsRUFBVTtBQUN4QixVQUFJRCxTQUFTLEtBQUtFLFFBQUwsRUFBYjs7QUFFQSxVQUFJRixNQUFKLEVBQVk7QUFDVixZQUFJRyxhQUFhLEtBQUtDLFlBQUwsQ0FBa0JQLEtBQWxCLENBQWpCOztBQUVBLFlBQUksQ0FBQ00sVUFBTCxFQUFpQjtBQUNmLGNBQUlFLDZCQUE2QixLQUFLQyw2QkFBTCxDQUFtQ1QsS0FBbkMsQ0FBakM7O0FBRUEsZUFBS1UsWUFBTDs7QUFFQ0YseUNBQStCLElBQWhDLEdBQ0VBLDJCQUEyQkcsU0FBM0IsQ0FBcUNYLEtBQXJDLENBREYsR0FFSUksU0FBU1EsZ0JBQVQsQ0FBMEJaLEtBQTFCLENBRko7QUFHRDtBQUNGO0FBQ0Y7OztrQ0FFYWEsUyxFQUFXQyxVLEVBQVlDLFMsRUFBVztBQUM5QyxVQUFJQyxjQUFjRCxTQUFsQixDQUQ4QyxDQUNoQjs7QUFFOUIsV0FBS0UsZUFBTCxDQUFxQkosU0FBckIsRUFBZ0NHLFdBQWhDO0FBQ0Q7Ozs2QkFFUUUsSSxFQUFNSixVLEVBQVlDLFMsRUFBVztBQUNwQyxVQUFJQyxjQUFjRCxTQUFsQixDQURvQyxDQUNOOztBQUU5QixXQUFLSSxVQUFMLENBQWdCRCxJQUFoQixFQUFzQkYsV0FBdEI7QUFDRDs7O29DQUVlSCxTLEVBQVdHLFcsRUFBYTtBQUN0QyxVQUFJQSxnQkFBZ0IsSUFBcEIsRUFBMEI7QUFDeEJILGtCQUFVTyxNQUFWO0FBQ0Q7QUFDRjs7OytCQUVVRixJLEVBQU1GLFcsRUFBYTtBQUM1QixVQUFJQSxnQkFBZ0IsSUFBcEIsRUFBMEI7QUFDeEJFLGFBQUtFLE1BQUw7QUFDRDtBQUNGOzs7MkJBRU07QUFDTCxXQUFLQyxRQUFMLENBQWMsTUFBZDtBQUNEOzs7NEJBRU87QUFDTixXQUFLQyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQUlyQixPQUFPLEtBQUtzQixRQUFMLENBQWMsTUFBZCxDQUFYOztBQUVBLGFBQU90QixJQUFQO0FBQ0Q7OzswQkFFWU4sUSxFQUFVQyxhLEVBQWU7QUFDcEMsYUFBT0osUUFBUWdDLEtBQVIsQ0FBYzlCLFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxhQUFwQyxDQUFQO0FBQ0Q7Ozs2QkFFZTZCLEksRUFBTTdCLGEsRUFBZTtBQUNuQyxhQUFPSixRQUFRa0MsUUFBUixDQUFpQmhDLFVBQWpCLEVBQTZCK0IsSUFBN0IsRUFBbUM3QixhQUFuQyxDQUFQO0FBQ0Q7Ozs7RUE1RnNCSCxnQjs7QUErRnpCa0MsT0FBT0MsT0FBUCxHQUFpQmxDLFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChlbnRyeSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpID9cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZW50cnkpIDpcbiAgICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZW50cnkpOyAgICAgICAgICBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIHJlbW92ZWRQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG4gICAgXG4gICAgdGhpcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGUsIHJlbW92ZWRQYXRoKSB7XG4gICAgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHZhciBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICAgIFxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=