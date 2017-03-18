'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DropTarget = require('./dropTarget');

var RubbishBin = function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  function RubbishBin(selector) {
    var removeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, RubbishBin);

    var dropTargetMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, dropTargetMoveHandler));

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
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            var directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
      if (movedDirectoryPath === null) {
        var explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath) {
      if (movedFilePath === null) {
        var explorer = file.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
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
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove; ///

      return Element.fromProperties(RubbishBin, properties, removeHandler);
    }
  }]);

  return RubbishBin;
}(DropTarget);

Object.assign(RubbishBin, {
  tagName: 'div',
  ignoredAttributes: ['onRemove']
});

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcFRhcmdldCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJwYXRoTWFwcyIsImRvbmUiLCJkcm9wVGFyZ2V0TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvQmVNYXJrZWQiLCJleHBsb3JlciIsImlzTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRNYXJrZXIiLCJhZGRNYXJrZXJJblBsYWNlIiwicmVtb3ZlTWFya2VyIiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImZpbGUiLCJzb3VyY2VGaWxlUGF0aCIsIm1vdmVkRmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJtYXAiLCJwYXRoTWFwIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsInRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCIsImNsb25lIiwiaHRtbCIsImZyb21IVE1MIiwicHJvcGVydGllcyIsIm9uUmVtb3ZlIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7O0FBR0EsSUFBTUMsYUFBYUYsUUFBUSxjQUFSLENBQW5COztJQUVNRyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUE2RTtBQUFBLFFBQXZEQyxhQUF1RCx1RUFBdkMsVUFBU0MsUUFBVCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFBRUE7QUFBUyxLQUFHOztBQUFBOztBQUMzRSxRQUFNQyx3QkFBd0JILGFBQTlCLENBRDJFLENBQzdCOztBQUQ2Qix3SEFHckVELFFBSHFFLEVBRzNESSxxQkFIMkQ7O0FBSzNFLFVBQUtDLEtBQUw7QUFMMkU7QUFNNUU7Ozs7eUNBRW9CO0FBQ25CLFVBQU1DLGtCQUFrQixJQUF4Qjs7QUFFQSxhQUFPQSxlQUFQO0FBQ0Q7OzswREFFcUNDLGMsRUFBZ0I7QUFDcEQsVUFBTUMscUNBQXFDLElBQTNDLENBRG9ELENBQ0g7O0FBRWpELGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4QkFFU0QsYyxFQUFnQkMsa0MsRUFBb0M7QUFDNUQsV0FBS0MsSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLSixLQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1JLE9BQU8sS0FBS0MsTUFBTCxFQUFiO0FBQUEsVUFDTUMsU0FBU0YsSUFEZixDQURTLENBRWE7O0FBRXRCLGFBQU9FLE1BQVA7QUFDRDs7O2lDQUVZSixjLEVBQWdCO0FBQzNCLFVBQU1LLFNBQVMsS0FBS0MsU0FBTCxFQUFmO0FBQUEsVUFDTUMsZ0NBQWdD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QjtBQUN4QjRELFdBQVMsS0FEZTtBQUV4QkMscUJBQW1CLENBQ2pCLFVBRGlCO0FBRkssQ0FBMUI7O0FBT0FDLE9BQU9DLE9BQVAsR0FBaUIvRCxVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxuY29uc3QgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9ICkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRNb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldE1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCkge1xuICAgIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpIHtcbiAgICBpZiAobW92ZWRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0ge30sXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFJ1YmJpc2hCaW4sIGh0bWwsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZTsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSdWJiaXNoQmluLCBwcm9wZXJ0aWVzLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFJ1YmJpc2hCaW4sIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ29uUmVtb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIl19