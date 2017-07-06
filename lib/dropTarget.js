'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('./options'),
    arrayUtil = require('./util/array');

var Element = easy.Element;

var DropTarget = function (_Element) {
  _inherits(DropTarget, _Element);

  function DropTarget(selector) {
    var moveHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.dropTargets = [];
    return _this;
  }

  _createClass(DropTarget, [{
    key: 'addDropTarget',
    value: function addDropTarget(dropTarget) {
      this.dropTargets.push(dropTarget);
    }
  }, {
    key: 'removeDropTarget',
    value: function removeDropTarget(dropTarget) {
      var index = indexOf(this.dropTargets, dropTarget),
          found = index !== -1;

      if (found) {
        this.dropTargets.splice(index, 1);
      }
    }
  }, {
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

      return overlappingDraggableEntry;
    }
  }, {
    key: 'getDropTargetToBeMarked',
    value: function getDropTargetToBeMarked(draggableEntry) {
      var dropTargetToBeMarked = this.dropTargets.reduce(function (dropTargetToBeMarked, dropTarget) {
        if (dropTargetToBeMarked === null) {
          if (dropTarget.isToBeMarked(draggableEntry)) {
            ///
            dropTargetToBeMarked = dropTarget;
          }
        }

        return dropTargetToBeMarked;
      }, null);

      return dropTargetToBeMarked;
    }
  }, {
    key: 'getMarkedDropTarget',
    value: function getMarkedDropTarget() {
      var markedDropTarget = this.dropTargets.reduce(function (markedDropTarget, dropTarget) {
        if (markedDropTarget === null) {
          var dropTargetMarked = dropTarget.isMarked();

          if (dropTargetMarked) {
            markedDropTarget = dropTarget;
          }
        }

        return markedDropTarget;
      }, null);

      return markedDropTarget;
    }
  }, {
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarker();
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.removeMarker();
      }
    }
  }, {
    key: 'moveDraggableEntries',
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

      this.moveHandler(pathMaps, function () {
        var lastDraggableEntry = arrayUtil.last(draggableEntries),
            firstDraggableEntry = arrayUtil.first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectories = draggableEntriesExplorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

        if (removeEmptyParentDirectories) {
          draggableEntriesExplorer.unsetOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectories) {
              draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = find(pathMaps, function (pathMap) {
              var sourcePath = pathMap['sourcePath'],
                  found = sourcePath === draggableEntryPath;

              return found;
            }),
                _sourcePath = pathMap['sourcePath'],
                _targetPath = pathMap['targetPath'];

            this.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);
          }
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var draggableEntryDirectory = draggableEntry.isDirectory();

      if (draggableEntryDirectory) {
        var directory = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        targetDirectoryPath = targetPath;

        this.moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath);
      } else {
        var file = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        targetFilePath = targetPath; ///

        this.moveFile(file, sourceFilePath, targetFilePath);
      }
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;

function indexOf(array, element) {
  var index = -1;

  array.some(function (currentElement, currentElementIndex) {
    if (currentElement === element) {
      index = currentElementIndex;

      return true;
    }
  });

  return index;
}

function find(array, callback) {
  var element = null;

  array.some(function (currentElement) {
    if (callback(currentElement)) {
      element = currentElement;

      return true;
    }
  });

  return element;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsImFycmF5VXRpbCIsIkVsZW1lbnQiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsInBhdGhNYXBzIiwiZG9uZSIsImRyb3BUYXJnZXRzIiwiZHJvcFRhcmdldCIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJmb3VuZCIsInNwbGljZSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJpc1RvQmVNYXJrZWQiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZHJvcFRhcmdldE1hcmtlZCIsImlzTWFya2VkIiwibWFya2VkIiwicmVtb3ZlTWFya2VyIiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJsYXN0IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsImJpbmQiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUUsWUFBWUYsUUFBUSxjQUFSLENBRGxCOztJQUdRRyxPLEdBQVlKLEksQ0FBWkksTzs7SUFFRkMsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBMEU7QUFBQSxRQUFwREMsV0FBb0QsdUVBQXRDLFVBQVNDLFFBQVQsRUFBbUJDLElBQW5CLEVBQXlCO0FBQUVBO0FBQVMsS0FBRTs7QUFBQTs7QUFBQSx3SEFDbEVILFFBRGtFOztBQUd4RSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLRyxXQUFMLEdBQW1CLEVBQW5CO0FBTHdFO0FBTXpFOzs7O2tDQUVhQyxVLEVBQVk7QUFDeEIsV0FBS0QsV0FBTCxDQUFpQkUsSUFBakIsQ0FBc0JELFVBQXRCO0FBQ0Q7OztxQ0FFZ0JBLFUsRUFBWTtBQUMzQixVQUFNRSxRQUFRQyxRQUFRLEtBQUtKLFdBQWIsRUFBMEJDLFVBQTFCLENBQWQ7QUFBQSxVQUNNSSxRQUFTRixVQUFVLENBQUMsQ0FEMUI7O0FBR0EsVUFBSUUsS0FBSixFQUFXO0FBQ1QsYUFBS0wsV0FBTCxDQUFpQk0sTUFBakIsQ0FBd0JILEtBQXhCLEVBQStCLENBQS9CO0FBQ0Q7QUFDRjs7O2dEQUUyQkksNkIsRUFBK0I7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QVN3QyxJQUFULENBQWNlLEtBQWQsRUFBcUJLLFFBQXJCLEVBQStCO0FBQzdCLE1BQUlKLFVBQVUsSUFBZDs7QUFFQUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUI7QUFDbEMsUUFBSUUsU0FBU0YsY0FBVCxDQUFKLEVBQThCO0FBQzVCRixnQkFBVUUsY0FBVjs7QUFFQSxhQUFPLElBQVA7QUFDRDtBQUNGLEdBTkQ7O0FBUUEsU0FBT0YsT0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BUYXJnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIGFycmF5VXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9hcnJheScpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcblxuICAgIHRoaXMuZHJvcFRhcmdldHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIHRoaXMuZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BUYXJnZXRzLCBkcm9wVGFyZ2V0KSxcbiAgICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BUYXJnZXRUb0JlTWFya2VkLCBkcm9wVGFyZ2V0KSB7XG4gICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5kcm9wVGFyZ2V0cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcFRhcmdldCwgZHJvcFRhcmdldCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGFycmF5VXRpbC5sYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGFycmF5VXRpbC5maXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBmaW5kKHBhdGhNYXBzLCBmdW5jdGlvbihwYXRoTWFwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gcGF0aE1hcFsnc291cmNlUGF0aCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSAoc291cmNlUGF0aCA9PT0gZHJhZ2dhYmxlRW50cnlQYXRoKTtcbiAgXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc291cmNlUGF0aCA9IHBhdGhNYXBbJ3NvdXJjZVBhdGgnXSxcbiAgICAgICAgICAgICAgICB0YXJnZXRQYXRoID0gcGF0aE1hcFsndGFyZ2V0UGF0aCddO1xuXG4gICAgICAgICAgdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIGxldCBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGxldCBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIl19