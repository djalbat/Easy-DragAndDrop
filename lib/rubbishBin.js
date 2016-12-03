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
      var directoryOverlappingEntry = null;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9CZU1hcmtlZCIsImV4cGxvcmVyIiwiaXNNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiYWRkTWFya2VyIiwiYWRkTWFya2VySW5QbGFjZSIsInJlbW92ZU1hcmtlciIsImRpcmVjdG9yeSIsInNvdXJjZVBhdGgiLCJtb3ZlZFBhdGgiLCJyZW1vdmVkUGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImZpbGUiLCJyZW1vdmVGaWxlIiwicmVtb3ZlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiZW50cmllcyIsInRhcmdldFBhdGgiLCJlbnRyeVBhdGhNYXBzIiwibWFwIiwiZW50cnlQYXRoTWFwIiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsInNvdXJjZUVudHJ5UGF0aCIsInRhcmdldEVudHJ5UGF0aCIsImNsb25lIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9B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QUFnQ0MsZUFBaEM7O0FBRUEsZUFBT0osWUFBUDtBQUNELE9BVG1CLENBQXBCOztBQVdBLGFBQU9GLGFBQVA7QUFDRDs7OzBCQUVZdEMsUSxFQUFVQyxhLEVBQWU7QUFDcEMsYUFBT0osUUFBUWdELEtBQVIsQ0FBYzlDLFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxhQUFwQyxDQUFQO0FBQ0Q7Ozs2QkFFZTZDLEksRUFBTTdDLGEsRUFBZTtBQUNuQyxhQUFPSixRQUFRa0QsUUFBUixDQUFpQmhELFVBQWpCLEVBQTZCK0MsSUFBN0IsRUFBbUM3QyxhQUFuQyxDQUFQO0FBQ0Q7Ozs7RUExSHNCSCxnQjs7QUE2SHpCa0QsT0FBT0MsT0FBUCxHQUFpQmxELFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBudWxsO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGRyYWdnaW5nKGVudHJ5LCBleHBsb3Jlcikge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkgP1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSkgOlxuICAgICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIHJlbW92ZWRQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG4gICAgXG4gICAgdGhpcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGUsIHJlbW92ZWRQYXRoKSB7XG4gICAgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHZhciBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICAgIFxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgZW50cnlQYXRoTWFwc0Zyb21FbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlQYXRoTWFwID0ge30sXG4gICAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZUVudHJ5UGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgIHRhcmdldEVudHJ5UGF0aCA9IG51bGw7XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFJ1YmJpc2hCaW4sIGh0bWwsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcbiJdfQ==