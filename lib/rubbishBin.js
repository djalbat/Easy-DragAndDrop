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
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var bounds = this.getBounds(),
          draggingBounds = entry.getDraggingBounds(),
          overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
          toBeMarked = overlappingDraggingBounds; ///

      return toBeMarked;
    }
  }, {
    key: 'dragging',
    value: function dragging(entry, explorer) {
      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(entry);

        if (!toBeMarked) {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          droppableElementToBeMarked !== null ? droppableElementToBeMarked.addMarker(entry) : explorer.addMarkerInPlace(entry);

          this.removeMarker();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImVudHJ5Iiwib3BlbiIsImlzT3BlbiIsIm1hcmtlZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnaW5nQm91bmRzIiwiZ2V0RHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b0JlTWFya2VkIiwiZXhwbG9yZXIiLCJpc01hcmtlZCIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJhZGRNYXJrZXIiLCJhZGRNYXJrZXJJblBsYWNlIiwicmVtb3ZlTWFya2VyIiwiZGlyZWN0b3J5Iiwic291cmNlUGF0aCIsIm1vdmVkUGF0aCIsInJlbW92ZWRQYXRoIiwicmVtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInJlbW92ZUZpbGUiLCJyZW1vdmUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJjbG9uZSIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxtQkFBbUJGLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU1HLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUNuQyxRQUFJQyw4QkFBOEJELGFBQWxDLENBRG1DLENBQ2U7O0FBRGYsd0hBRzdCRCxRQUg2QixFQUduQkUsMkJBSG1COztBQUtuQyxVQUFLQyxLQUFMO0FBTG1DO0FBTXBDOzs7O3lDQUVvQjtBQUNuQixVQUFJQyxrQkFBa0IsSUFBdEI7O0FBRUEsYUFBT0EsZUFBUDtBQUNEOzs7OEJBRVNDLEssRUFBTztBQUNmLFdBQUtDLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS0gsS0FBTDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFJRyxPQUFPLEtBQUtDLE1BQUwsRUFBWDtBQUFBLFVBQ0lDLFNBQVNGLElBRGIsQ0FEUyxDQUVXOztBQUVwQixhQUFPRSxNQUFQO0FBQ0Q7OztpQ0FFWUgsSyxFQUFPO0FBQ2xCLFVBQUlJLFNBQVMsS0FBS0MsU0FBTCxFQUFiO0FBQUEsVUFDSUMsaUJBQWlCTixNQUFNTyxpQkFBTixFQURyQjtBQUFBLFVBRUlDLDRCQUE0QkosT0FBT0ssY0FBUCxDQUFzQkgsY0FBdEIsQ0FGaEM7QUFBQSxVQUdJSSxhQUFhRix5QkFIakIsQ0FEa0IsQ0FJMEI7O0FBRTVDLGFBQU9FLFVBQVA7QUFDRDs7OzZCQUVRVixLLEVBQU9XLFEsRUFBVTtBQUN4QixVQUFJUixTQUFTLEtBQUtTLFFBQUwsRUFBYjs7QUFFQSxVQUFJVCxNQUFKLEVBQVk7QUFDVixZQUFJTyxhQUFhLEtBQUtHLFlBQUwsQ0FBa0JiLEtBQWxCLENBQWpCOztBQUVBLFlBQUksQ0FBQ1UsVUFBTCxFQUFpQjtBQUNmLGNBQUlJLDZCQUE2QixLQUFLQyw2QkFBTCxDQUFtQ2YsS0FBbkMsQ0FBakM7O0FBRUNjLHlDQUErQixJQUFoQyxHQUNFQSwyQkFBMkJFLFNBQTNCLENBQXFDaEIsS0FBckMsQ0FERixHQUVJVyxTQUFTTSxnQkFBVCxDQUEwQmpCLEtBQTFCLENBRko7O0FBSUEsZUFBS2tCLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7OztrQ0FFYUMsUyxFQUFXQyxVLEVBQVlDLFMsRUFBVztBQUM5QyxVQUFJQyxjQUFjRCxTQUFsQixDQUQ4QyxDQUNoQjs7QUFFOUIsV0FBS0UsZUFBTCxDQUFxQkosU0FBckIsRUFBZ0NHLFdBQWhDO0FBQ0Q7Ozs2QkFFUUUsSSxFQUFNSixVLEVBQVlDLFMsRUFBVztBQUNwQyxVQUFJQyxjQUFjRCxTQUFsQixDQURvQyxDQUNOOztBQUU5QixXQUFLSSxVQUFMLENBQWdCRCxJQUFoQixFQUFzQkYsV0FBdEI7QUFDRDs7O29DQUVlSCxTLEVBQVdHLFcsRUFBYTtBQUN0QyxVQUFJQSxnQkFBZ0IsSUFBcEIsRUFBMEI7QUFDeEJILGtCQUFVTyxNQUFWO0FBQ0Q7QUFDRjs7OytCQUVVRixJLEVBQU1GLFcsRUFBYTtBQUM1QixVQUFJQSxnQkFBZ0IsSUFBcEIsRUFBMEI7QUFDeEJFLGFBQUtFLE1BQUw7QUFDRDtBQUNGOzs7MkJBRU07QUFDTCxXQUFLQyxRQUFMLENBQWMsTUFBZDtBQUNEOzs7NEJBRU87QUFDTixXQUFLQyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQUkzQixPQUFPLEtBQUs0QixRQUFMLENBQWMsTUFBZCxDQUFYOztBQUVBLGFBQU81QixJQUFQO0FBQ0Q7OzswQkFFWU4sUSxFQUFVQyxhLEVBQWU7QUFDcEMsYUFBT0osUUFBUXNDLEtBQVIsQ0FBY3BDLFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxhQUFwQyxDQUFQO0FBQ0Q7Ozs2QkFFZW1DLEksRUFBTW5DLGEsRUFBZTtBQUNuQyxhQUFPSixRQUFRd0MsUUFBUixDQUFpQnRDLFVBQWpCLEVBQTZCcUMsSUFBN0IsRUFBbUNuQyxhQUFuQyxDQUFQO0FBQ0Q7Ozs7RUFyR3NCSCxnQjs7QUF3R3pCd0MsT0FBT0MsT0FBUCxHQUFpQnhDLFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBkcmFnZ2luZyhlbnRyeSwgZXhwbG9yZXIpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgICAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpID9cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZW50cnkpIDpcbiAgICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgcmVtb3ZlZFBhdGgpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIHJlbW92ZWRQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG4gICAgXG4gICAgdGhpcy5yZW1vdmVGaWxlKGZpbGUsIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKSB7XG4gICAgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICB2YXIgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICBcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKFJ1YmJpc2hCaW4sIHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoUnViYmlzaEJpbiwgaHRtbCwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIl19