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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRHJvcFRhcmdldCIsImVudHJ5VHlwZXMiLCJFbGVtZW50IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsIm9wZW4iLCJoYXNDbGFzcyIsImlzT3BlbiIsIm1hcmtlZCIsImRyYWdnYWJsZUVudHJ5IiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b0JlTWFya2VkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJjbG9zZSIsImV4cGxvcmVyIiwiaXNNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkTWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeUluUGxhY2UiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZ2V0RXhwbG9yZXIiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlUGF0aCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwib25SZW1vdmUiLCJydWJiaXNoQmluIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGNBQVIsQ0FBbkI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGNBQVIsQ0FEbkI7O0FBR00sSUFBRUcsT0FBRixHQUFjSixJQUFkLENBQUVJLE9BQUY7QUFBQSxJQUNFQyxtQkFERixHQUMwQkYsVUFEMUIsQ0FDRUUsbUJBREY7O0lBR0FDLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUNuQyxRQUFNQyxjQUFjRCxhQUFwQixDQURtQyxDQUNDOztBQURELG1IQUc3QkQsUUFINkIsRUFHbkJFLFdBSG1CO0FBSXBDOzs7OzZCQUVRO0FBQ1AsVUFBTUMsT0FBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFiOztBQUVBLGFBQU9ELElBQVA7QUFDRDs7OytCQUVVO0FBQ1QsVUFBTUEsT0FBTyxLQUFLRSxNQUFMLEVBQWI7QUFBQSxVQUNNQyxTQUFTSCxJQURmLENBRFMsQ0FFYTs7QUFF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QUErQzlDLGFBQS9DLENBRmI7OztBQUlOZ0QsaUJBQVdFLFVBQVg7O0FBRUEsYUFBT0YsVUFBUDtBQUNEOzs7O0VBL0hzQnRELFU7O0FBa0l6QnlELE9BQU9DLE1BQVAsQ0FBY3RELFVBQWQsRUFBMEI7QUFDeEJ1RCxXQUFTLEtBRGU7QUFFeEJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRks7QUFLeEJDLHFCQUFtQixDQUNqQixVQURpQjtBQUxLLENBQTFCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCNUQsVUFBakI7O0FBRUEsU0FBUzhDLHlCQUFULENBQW1DdEMsY0FBbkMsRUFBbURpQyxVQUFuRCxFQUErREMsVUFBL0QsRUFBMkU7QUFDekUsTUFBTW1CLHFCQUFxQnJELGVBQWVzRCxPQUFmLEVBQTNCO0FBQUEsTUFDTUMscUJBQXFCdkQsZUFBZXdELE9BQWYsRUFEM0I7QUFBQSxNQUVNQyw0Q0FBNkNGLHVCQUF1QmhFLG1CQUYxRTtBQUFBLE1BR01tRSxZQUFZRCx5Q0FIbEIsQ0FEeUUsQ0FJWDs7QUFFOUR2QixlQUFhLElBQWIsQ0FOeUUsQ0FNckQ7O0FBRXBCRCxlQUFhb0Isa0JBQWIsQ0FSeUUsQ0FRdkM7O0FBRWxDLE1BQU1oQixVQUFVO0FBQ2RKLDBCQURjO0FBRWRDLDBCQUZjO0FBR2R3QjtBQUhjLEdBQWhCOztBQU1BLFNBQU9yQixPQUFQO0FBQ0QiLCJmaWxlIjoicnViYmlzaEJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4vZW50cnlUeXBlcycpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IGVudHJ5VHlwZXM7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICBjb25zdCBtb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG5cbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG9uUmVtb3ZlLCAvLy9cbiAgICAgICAgICBydWJiaXNoQmluID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSdWJiaXNoQmluLCBwcm9wZXJ0aWVzLCByZW1vdmVIYW5kbGVyKTtcblxuICAgIHJ1YmJpc2hCaW4uaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBydWJiaXNoQmluO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oUnViYmlzaEJpbiwge1xuICB0YWdOYW1lOiAnZGl2JyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdydWJiaXNoLWJpbidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25SZW1vdmUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IG51bGw7ICAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iXX0=