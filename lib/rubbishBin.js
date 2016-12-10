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
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      var directoryOverlappingEntry = null; ///

      return directoryOverlappingEntry;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry, directoryOverlappingEntry) {
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
          collapsedBounds = entry.getCollapsedBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds),
          toBeMarked = overlappingCollapsedBounds; ///

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

          if (droppableElementToBeMarked !== null) {
            var directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingEntry(entry);

            droppableElementToBeMarked.addMarker(entry, directoryOverlappingEntry);
          } else {
            explorer.addMarkerInPlace(entry);
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
    key: 'entryPathMapsFromEntries',
    value: function entryPathMapsFromEntries(entries, sourcePath, targetPath) {
      var entryPathMaps = entries.map(function (entry) {
        var entryPathMap = {},
            entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = null;

        entryPathMap[sourceEntryPath] = targetEntryPath;

        return entryPathMap;
      });

      return entryPathMaps;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9CZU1hcmtlZCIsImV4cGxvcmVyIiwiaXNNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImFkZE1hcmtlciIsImFkZE1hcmtlckluUGxhY2UiLCJyZW1vdmVNYXJrZXIiLCJkaXJlY3RvcnkiLCJzb3VyY2VQYXRoIiwibW92ZWRQYXRoIiwicmVtb3ZlZFBhdGgiLCJyZW1vdmVEaXJlY3RvcnkiLCJmaWxlIiwicmVtb3ZlRmlsZSIsInJlbW92ZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImVudHJpZXMiLCJ0YXJnZXRQYXRoIiwiZW50cnlQYXRoTWFwcyIsIm1hcCIsImVudHJ5UGF0aE1hcCIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJzb3VyY2VFbnRyeVBhdGgiLCJ0YXJnZXRFbnRyeVBhdGgiLCJjbG9uZSIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFB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QUFDOUMsWUFBSW9DLGVBQWUsRUFBbkI7QUFBQSxZQUNJQyxZQUFZckMsTUFBTXNDLE9BQU4sRUFEaEI7QUFBQSxZQUVJQyxrQkFBa0JGLFNBRnRCO0FBQUEsWUFFa0M7QUFDOUJHLDBCQUFrQixJQUh0Qjs7QUFLQUoscUJBQWFHLGVBQWIsSUFBZ0NDLGVBQWhDOztBQUVBLGVBQU9KLFlBQVA7QUFDRCxPQVRtQixDQUFwQjs7QUFXQSxhQUFPRixhQUFQO0FBQ0Q7OzswQkFFWXZDLFEsRUFBVUMsYSxFQUFlO0FBQ3BDLGFBQU9KLFFBQVFpRCxLQUFSLENBQWMvQyxVQUFkLEVBQTBCQyxRQUExQixFQUFvQ0MsYUFBcEMsQ0FBUDtBQUNEOzs7NkJBRWU4QyxJLEVBQU05QyxhLEVBQWU7QUFDbkMsYUFBT0osUUFBUW1ELFFBQVIsQ0FBaUJqRCxVQUFqQixFQUE2QmdELElBQTdCLEVBQW1DOUMsYUFBbkMsQ0FBUDtBQUNEOzs7O0VBOUhzQkgsZ0I7O0FBaUl6Qm1ELE9BQU9DLE9BQVAsR0FBaUJuRCxVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gZW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgdmFyIG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciBlbnRyeVBhdGhNYXBzID0gZW50cmllcy5tYXAoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gbnVsbDtcblxuICAgICAgZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0gPSB0YXJnZXRFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBlbnRyeVBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnlQYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKFJ1YmJpc2hCaW4sIHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoUnViYmlzaEJpbiwgaHRtbCwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIl19