'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var DropTarget = require('./dropTarget'),
    entryTypes = require('./entryTypes');

var Element = easy.Element,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE;

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
    key: 'mark',
    value: function mark(draggableEntry) {
      this.open();
    }
  }, {
    key: 'unmark',
    value: function unmark() {
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
            var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            var previousDraggableEntry = draggableEntry; ///

            draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

            dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);
          } else {
            explorer.mark(draggableEntry);
          }

          this.unmark();
        }
      }
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
    className: 'rubbish-bin'
  },
  ignoredProperties: ['onRemove']
});

module.exports = RubbishBin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRHJvcFRhcmdldCIsImVudHJ5VHlwZXMiLCJFbGVtZW50IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsIm9wZW4iLCJoYXNDbGFzcyIsImlzT3BlbiIsIm1hcmtlZCIsImRyYWdnYWJsZUVudHJ5IiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b0JlTWFya2VkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsb3NlIiwiZXhwbG9yZXIiLCJpc01hcmtlZCIsImlzVG9CZU1hcmtlZCIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5IiwibWFyayIsInVubWFyayIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZ2V0RXhwbG9yZXIiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlUGF0aCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwib25SZW1vdmUiLCJydWJiaXNoQmluIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGNBQVIsQ0FBbkI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGNBQVIsQ0FEbkI7O0FBR00sSUFBRUcsT0FBRixHQUFjSixJQUFkLENBQUVJLE9BQUY7QUFBQSxJQUNFQyxtQkFERixHQUMwQkYsVUFEMUIsQ0FDRUUsbUJBREY7O0lBR0FDLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUNuQyxRQUFNQyxjQUFjRCxhQUFwQixDQURtQyxDQUNDOztBQURELG1IQUc3QkQsUUFINkIsRUFHbkJFLFdBSG1CO0FBSXBDOzs7OzZCQUVRO0FBQ1AsVUFBTUMsT0FBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFiOztBQUVBLGFBQU9ELElBQVA7QUFDRDs7OytCQUVVO0FBQ1QsVUFBTUEsT0FBTyxLQUFLRSxNQUFMLEVBQWI7QUFBQSxVQUNNQyxTQUFTSCxJQURmLENBRFMsQ0FFYTs7QUFF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Z0IrQyxRQURoQjtBQUFBLFVBRUFDLFVBRkEsR0FFYXBELFFBQVFxRCxjQUFSLENBQXVCbkQsVUFBdkIsRUFBbUNnRCxVQUFuQyxFQUErQzlDLGFBQS9DLENBRmI7OztBQUlOZ0QsaUJBQVdFLFVBQVg7O0FBRUEsYUFBT0YsVUFBUDtBQUNEOzs7O0VBbklzQnRELFU7O0FBc0l6QnlELE9BQU9DLE1BQVAsQ0FBY3RELFVBQWQsRUFBMEI7QUFDeEJ1RCxXQUFTLEtBRGU7QUFFeEJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRks7QUFLeEJDLHFCQUFtQixDQUNqQixVQURpQjtBQUxLLENBQTFCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCNUQsVUFBakI7O0FBRUEsU0FBUzhDLHlCQUFULENBQW1DdEMsY0FBbkMsRUFBbURpQyxVQUFuRCxFQUErREMsVUFBL0QsRUFBMkU7QUFDekUsTUFBTW1CLHFCQUFxQnJELGVBQWVzRCxPQUFmLEVBQTNCO0FBQUEsTUFDTUMscUJBQXFCdkQsZUFBZXdELE9BQWYsRUFEM0I7QUFBQSxNQUVNQyw0Q0FBNkNGLHVCQUF1QmhFLG1CQUYxRTtBQUFBLE1BR01tRSxZQUFZRCx5Q0FIbEIsQ0FEeUUsQ0FJWDs7QUFFOUR2QixlQUFhLElBQWIsQ0FOeUUsQ0FNckQ7O0FBRXBCRCxlQUFhb0Isa0JBQWIsQ0FSeUUsQ0FRdkM7O0FBRWxDLE1BQU1oQixVQUFVO0FBQ2RKLDBCQURjO0FBRWRDLDBCQUZjO0FBR2R3QjtBQUhjLEdBQWhCOztBQU1BLFNBQU9yQixPQUFQO0FBQ0QiLCJmaWxlIjoicnViYmlzaEJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4vZW50cnlUeXBlcycpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IGVudHJ5VHlwZXM7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICBjb25zdCBtb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG5cbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5tYXJrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG9uUmVtb3ZlLCAvLy9cbiAgICAgICAgICBydWJiaXNoQmluID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSdWJiaXNoQmluLCBwcm9wZXJ0aWVzLCByZW1vdmVIYW5kbGVyKTtcblxuICAgIHJ1YmJpc2hCaW4uaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBydWJiaXNoQmluO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oUnViYmlzaEJpbiwge1xuICB0YWdOYW1lOiAnZGl2JyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdydWJiaXNoLWJpbidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25SZW1vdmUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IG51bGw7ICAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iXX0=