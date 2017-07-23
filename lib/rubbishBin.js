'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var DropTarget = require('./dropTarget');

var Element = easy.Element;

var RubbishBin = function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  function RubbishBin(selector, removeHandler) {
    _classCallCheck(this, RubbishBin);

    var moveHandler = removeHandler; ///

    return _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, moveHandler));
  }

  _createClass(RubbishBin, [{
    key: 'isOpen',
    value: function isOpen() {
      var open = this.hasClass('open');

      return open;
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
    key: 'addMarkerEntry',
    value: function addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
      this.open();
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      this.close();
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
            var directoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerEntryInPlace(draggableEntry);
          }

          this.removeMarkerEntry();
        }
      }
    }
  }, {
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      if (targetDirectoryPath === null) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      }
    }
  }, {
    key: 'moveFileNameDraggableEntry',
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      if (targetFilePath === null) {
        var explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      }
    }
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

        return pathMap;
      });

      return pathMaps;
    }
  }, {
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null;

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = null; ///

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      this.close();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove,
          rubbishBin = Element.fromProperties(RubbishBin, properties, removeHandler);


      rubbishBin.initialise();

      return rubbishBin;
    }
  }]);

  return RubbishBin;
}(DropTarget);

Object.assign(RubbishBin, {
  tagName: 'div',
  defaultProperties: {
    className: 'rubbishBin'
  },
  ignoredProperties: ['onRemove']
});

module.exports = RubbishBin;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry(),
      directory = draggableEntryDirectoryNameDraggableEntry; ///

  targetPath = null; ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };

  return pathMap;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRHJvcFRhcmdldCIsIkVsZW1lbnQiLCJSdWJiaXNoQmluIiwic2VsZWN0b3IiLCJyZW1vdmVIYW5kbGVyIiwibW92ZUhhbmRsZXIiLCJvcGVuIiwiaGFzQ2xhc3MiLCJpc09wZW4iLCJtYXJrZWQiLCJkcmFnZ2FibGVFbnRyeSIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9CZU1hcmtlZCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2xvc2UiLCJleHBsb3JlciIsImlzTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFkZE1hcmtlckVudHJ5IiwiYWRkTWFya2VyRW50cnlJblBsYWNlIiwicmVtb3ZlTWFya2VyRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsIm9uUmVtb3ZlIiwicnViYmlzaEJpbiIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLGFBQWFELFFBQVEsY0FBUixDQUFuQjs7SUFFUUUsTyxHQUFZSCxJLENBQVpHLE87O0lBRUZDLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUNuQyxRQUFNQyxjQUFjRCxhQUFwQixDQURtQyxDQUNDOztBQURELG1IQUc3QkQsUUFINkIsRUFHbkJFLFdBSG1CO0FBSXBDOzs7OzZCQUVRO0FBQ1AsVUFBTUMsT0FBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFiOztBQUVBLGFBQU9ELElBQVA7QUFDRDs7OytCQUVVO0FBQ1QsVUFBTUEsT0FBTyxLQUFLRSxNQUFMLEVBQWI7QUFBQSxVQUNNQyxTQUFTSCxJQURmLENBRFMsQ0FFYTs7QUFFdEIsYUFBT0csTUFBUDtBQUNEOzs7aUNBRVlDLGMsRUFBZ0I7QUFDM0IsVUFBTUMsU0FBUyxLQUFLQyxTQUFMLEVBQWY7QUFBQSxVQUNNQyxnQ0FBZ0NILGVBQWVJLGtCQUFmLEVBRHRDO0FBQUEsVUFFTUMsMkNBQTJD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T0MsT0FBUCxHQUFpQjVELFVBQWpCOztBQUVBLFNBQVM4Qyx5QkFBVCxDQUFtQ3RDLGNBQW5DLEVBQW1EaUMsVUFBbkQsRUFBK0RDLFVBQS9ELEVBQTJFO0FBQ3pFLE1BQU1tQixxQkFBcUJyRCxlQUFlc0QsT0FBZixFQUEzQjtBQUFBLE1BQ01DLDRDQUE0Q3ZELGVBQWV3RCw2QkFBZixFQURsRDtBQUFBLE1BRU1DLFlBQVlGLHlDQUZsQixDQUR5RSxDQUdYOztBQUU5RHJCLGVBQWEsSUFBYixDQUx5RSxDQUtyRDs7QUFFcEJELGVBQWFvQixrQkFBYixDQVB5RSxDQU92Qzs7QUFFbEMsTUFBTWhCLFVBQVU7QUFDZEosZ0JBQVlBLFVBREU7QUFFZEMsZ0JBQVlBLFVBRkU7QUFHZHVCLGVBQVdBO0FBSEcsR0FBaEI7O0FBTUEsU0FBT3BCLE9BQVA7QUFDRCIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCB9ID0gZWFzeTtcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIGNvbnN0IG1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcblxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG9uUmVtb3ZlLCAvLy9cbiAgICAgICAgICBydWJiaXNoQmluID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSdWJiaXNoQmluLCBwcm9wZXJ0aWVzLCByZW1vdmVIYW5kbGVyKTtcblxuICAgIHJ1YmJpc2hCaW4uaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBydWJiaXNoQmluO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oUnViYmlzaEJpbiwge1xuICB0YWdOYW1lOiAnZGl2JyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdydWJiaXNoQmluJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvblJlbW92ZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gbnVsbDsgIC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3Rvcnk6IGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuIl19