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
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null; ///

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
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
    value: function isToBeMarked(draggableEntry) {
      var bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

      return toBeMarked;
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry, explorer) {
      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (!toBeMarked) {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

          if (droppableElementToBeMarked !== null) {
            var directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

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
  }, {
    key: 'draggableEntryPathMapsFromDraggableEntries',
    value: function draggableEntryPathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var draggableEntryPathMaps = draggableEntries.map(function (draggableEntry) {
        var draggableEntryPathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceEntryPath = draggableEntryPath,
            ///
        targetEntryPath = null;

        draggableEntryPathMap[sourceEntryPath] = targetEntryPath;

        return draggableEntryPathMap;
      });

      return draggableEntryPathMaps;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvQmVNYXJrZWQiLCJleHBsb3JlciIsImlzTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRNYXJrZXIiLCJhZGRNYXJrZXJJblBsYWNlIiwicmVtb3ZlTWFya2VyIiwiZGlyZWN0b3J5Iiwic291cmNlUGF0aCIsIm1vdmVkUGF0aCIsInJlbW92ZWRQYXRoIiwicmVtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInJlbW92ZUZpbGUiLCJyZW1vdmUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyaWVzIiwidGFyZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aE1hcHMiLCJtYXAiLCJkcmFnZ2FibGVFbnRyeVBhdGhNYXAiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwic291cmNlRW50cnlQYXRoIiwidGFyZ2V0RW50cnlQYXRoIiwi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QVA7QUFDRDs7OytEQUUwQzhCLGdCLEVBQWtCVixVLEVBQVlXLFUsRUFBWTtBQUNuRixVQUFJQyx5QkFBeUJGLGlCQUFpQkcsR0FBakIsQ0FBcUIsVUFBU25DLGNBQVQsRUFBeUI7QUFDekUsWUFBSW9DLHdCQUF3QixFQUE1QjtBQUFBLFlBQ0lDLHFCQUFxQnJDLGVBQWVzQyxPQUFmLEVBRHpCO0FBQUEsWUFFSUMsa0JBQWtCRixrQkFGdEI7QUFBQSxZQUUyQztBQUN2Q0csMEJBQWtCLElBSHRCOztBQUtBSiw4QkFBc0JHLGVBQXRCLElBQXlDQyxlQUF6Qzs7QUFFQSxlQUFPSixxQkFBUDtBQUNELE9BVDRCLENBQTdCOztBQVdBLGFBQU9GLHNCQUFQO0FBQ0Q7OzswQkFFWXZDLFEsRUFBVUMsYSxFQUFlO0FBQ3BDLGFBQU9KLFFBQVFpRCxLQUFSLENBQWMvQyxVQUFkLEVBQTBCQyxRQUExQixFQUFvQ0MsYUFBcEMsQ0FBUDtBQUNEOzs7NkJBRWU4QyxJLEVBQU05QyxhLEVBQWU7QUFDbkMsYUFBT0osUUFBUW1ELFFBQVIsQ0FBaUJqRCxVQUFqQixFQUE2QmdELElBQTdCLEVBQW1DOUMsYUFBbkMsQ0FBUDtBQUNEOzs7O0VBOUhzQkgsZ0I7O0FBaUl6Qm1ELE9BQU9DLE9BQVAsR0FBaUJuRCxVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgcmVtb3ZlZFBhdGgpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIHJlbW92ZWRQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG4gICAgXG4gICAgdGhpcy5yZW1vdmVGaWxlKGZpbGUsIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKSB7XG4gICAgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICB2YXIgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICBcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aE1hcCA9IHt9LFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSA9IHRhcmdldEVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=