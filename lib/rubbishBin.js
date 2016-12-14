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
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = null;

        pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return pathMap;
      });

      return pathMaps;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvQmVNYXJrZWQiLCJleHBsb3JlciIsImlzTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRNYXJrZXIiLCJhZGRNYXJrZXJJblBsYWNlIiwicmVtb3ZlTWFya2VyIiwiZGlyZWN0b3J5Iiwic291cmNlUGF0aCIsIm1vdmVkUGF0aCIsInJlbW92ZWRQYXRoIiwicmVtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInJlbW92ZUZpbGUiLCJyZW1vdmUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyaWVzIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJjbG9uZSIsImh0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aURBRTRCOEIsZ0IsRUFBa0JWLFUsRUFBWVcsVSxFQUFZO0FBQ3JFLFVBQUlDLFdBQVdGLGlCQUFpQkcsR0FBakIsQ0FBcUIsVUFBU25DLGNBQVQsRUFBeUI7QUFDM0QsWUFBSW9DLFVBQVUsRUFBZDtBQUFBLFlBQ0lDLHFCQUFxQnJDLGVBQWVzQyxPQUFmLEVBRHpCO0FBQUEsWUFFSUMsMkJBQTJCRixrQkFGL0I7QUFBQSxZQUVvRDtBQUNoREcsbUNBQTJCLElBSC9COztBQUtBSixnQkFBUUcsd0JBQVIsSUFBb0NDLHdCQUFwQzs7QUFFQSxlQUFPSixPQUFQO0FBQ0QsT0FUYyxDQUFmOztBQVdBLGFBQU9GLFFBQVA7QUFDRDs7OzBCQUVZdkMsUSxFQUFVQyxhLEVBQWU7QUFDcEMsYUFBT0osUUFBUWlELEtBQVIsQ0FBYy9DLFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxhQUFwQyxDQUFQO0FBQ0Q7Ozs2QkFFZThDLEksRUFBTTlDLGEsRUFBZTtBQUNuQyxhQUFPSixRQUFRbUQsUUFBUixDQUFpQmpELFVBQWpCLEVBQTZCZ0QsSUFBN0IsRUFBbUM5QyxhQUFuQyxDQUFQO0FBQ0Q7Ozs7RUE5SHNCSCxnQjs7QUFpSXpCbUQsT0FBT0MsT0FBUCxHQUFpQm5ELFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcikge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIHJlbW92ZWRQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG4gICAgXG4gICAgdGhpcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGUsIHJlbW92ZWRQYXRoKSB7XG4gICAgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHZhciBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICAgIFxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIHZhciBwYXRoTWFwID0ge30sXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFJ1YmJpc2hCaW4sIGh0bWwsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcbiJdfQ==