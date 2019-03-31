'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = require('./types'),
    DropTarget = require('./dropTarget');

var DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var RubbishBin = function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  function RubbishBin() {
    _classCallCheck(this, RubbishBin);

    return _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).apply(this, arguments));
  }

  _createClass(RubbishBin, [{
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
    key: 'mark',
    value: function mark(draggableEntry, previousDraggableEntry) {
      this.open();
    }
  }, {
    key: 'unmark',
    value: function unmark() {
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
    value: function dragging(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget !== this) {
        return;
      }

      var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

      if (dropTargetToBeMarked === this) {
        ///
      } else if (dropTargetToBeMarked !== null) {
        dropTargetToBeMarked.markDraggableEntry(draggableEntry);

        this.unmark();
      } else {
        var _dropTargetToBeMarked = explorer,
            ///
        previousDraggableEntry = null;

        _dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);

        this.unmark();
      }
    }
  }, {
    key: 'markDraggableEntry',
    value: function markDraggableEntry(draggableEntry) {
      var previousDraggableEntry = null;

      this.mark(draggableEntry, previousDraggableEntry);
    }
  }, {
    key: 'moveFileNameDraggableEntry',
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;

      if (targetFilePath === null) {
        var explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      }

      return draggableEntry;
    }
  }, {
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;

      if (targetDirectoryPath === null) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      }

      return draggableEntry;
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
      var markedDirectoryNameDraggableEntry = null; ///

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null; ///

      return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
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
          removeHandler = onRemove || defaultRemoveHandler,
          moveHandler = removeHandler,
          rubbishBin = DropTarget.fromProperties(RubbishBin, properties, moveHandler);


      rubbishBin.initialise();

      return rubbishBin;
    }
  }]);

  return RubbishBin;
}(DropTarget);

Object.assign(RubbishBin, {
  tagName: 'div',
  defaultProperties: {
    className: 'rubbish-bin'
  },
  ignoredProperties: ['onRemove']
});

module.exports = RubbishBin;

function defaultRemoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === DIRECTORY_NAME_TYPE,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsIkRyb3BUYXJnZXQiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiUnViYmlzaEJpbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcGVuIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyeSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnkiLCJjbG9zZSIsImlzT3BlbiIsIm1hcmtlZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9CZU1hcmtlZCIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJtYXJrRHJhZ2dhYmxlRW50cnkiLCJ1bm1hcmsiLCJtYXJrIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJvblJlbW92ZSIsInJlbW92ZUhhbmRsZXIiLCJkZWZhdWx0UmVtb3ZlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicnViYmlzaEJpbiIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRvbmUiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsU0FBUixDQUFkO0FBQUEsSUFDTUMsYUFBYUQsUUFBUSxjQUFSLENBRG5COztJQUdRRSxtQixHQUF3QkgsSyxDQUF4QkcsbUI7O0lBRUZDLFU7Ozs7Ozs7Ozs7OzJCQUNHO0FBQ0wsV0FBS0MsUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0MsV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxPQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLENBQWI7O0FBRUEsYUFBT0QsSUFBUDtBQUNEOzs7eUJBRUlFLGMsRUFBZ0JDLHNCLEVBQXdCO0FBQzNDLFdBQUtILElBQUw7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0ksS0FBTDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNSixPQUFPLEtBQUtLLE1BQUwsRUFBYjtBQUFBLFVBQ01DLFNBQVNOLElBRGYsQ0FEUyxDQUVhOztBQUV0QixhQUFPTSxNQUFQO0FBQ0Q7OztpQ0FFWUosYyxFQUFnQjtBQUMzQixVQUFNSyxTQUFTLEtBQUtDLFNBQUwsRUFBZjtBQUFBLFVBQ01D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SXNCcEQsVTs7QUF1SXpCdUQsT0FBT0MsTUFBUCxDQUFjdEQsVUFBZCxFQUEwQjtBQUN4QnVELFdBQVMsS0FEZTtBQUV4QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGSztBQUt4QkMscUJBQW1CLENBQ2pCLFVBRGlCO0FBTEssQ0FBMUI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUI1RCxVQUFqQjs7QUFFQSxTQUFTZ0Qsb0JBQVQsQ0FBOEJULFFBQTlCLEVBQXdDc0IsSUFBeEMsRUFBOEM7QUFDNUNBO0FBQ0Q7O0FBRUQsU0FBU25CLHlCQUFULENBQW1DckMsY0FBbkMsRUFBbURnQyxVQUFuRCxFQUErREMsVUFBL0QsRUFBMkU7QUFDekUsTUFBTXdCLHFCQUFxQnpELGVBQWUwRCxPQUFmLEVBQTNCO0FBQUEsTUFDTUMscUJBQXFCM0QsZUFBZTRELE9BQWYsRUFEM0I7QUFBQSxNQUVNQyw0Q0FBNkNGLHVCQUF1QmpFLG1CQUYxRTtBQUFBLE1BR01vRSxZQUFZRCx5Q0FIbEIsQ0FEeUUsQ0FJWDs7QUFFOUQ1QixlQUFhLElBQWIsQ0FOeUUsQ0FNckQ7O0FBRXBCRCxlQUFheUIsa0JBQWIsQ0FSeUUsQ0FRdkM7O0FBRWxDLE1BQU1yQixVQUFVO0FBQ2RKLDBCQURjO0FBRWRDLDBCQUZjO0FBR2Q2QjtBQUhjLEdBQWhCOztBQU1BLFNBQU8xQixPQUFQO0FBQ0QiLCJmaWxlIjoicnViYmlzaEJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0Jyk7XG5cbmNvbnN0IHsgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcblxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSB8fCBkZWZhdWx0UmVtb3ZlSGFuZGxlciwgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyLCAgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IERyb3BUYXJnZXQuZnJvbVByb3BlcnRpZXMoUnViYmlzaEJpbiwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIpO1xuXG4gICAgcnViYmlzaEJpbi5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJ1YmJpc2hCaW47XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihSdWJiaXNoQmluLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ3J1YmJpc2gtYmluJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvblJlbW92ZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcblxuZnVuY3Rpb24gZGVmYXVsdFJlbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSBudWxsOyAgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuIl19