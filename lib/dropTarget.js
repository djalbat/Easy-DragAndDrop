'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    entryTypes = require('./entryTypes');

var Element = easy.Element,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first,
    last = arrayUtilities.last,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES;

var DropTarget = function (_Element) {
  _inherits(DropTarget, _Element);

  function DropTarget(selector) {
    var moveHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMoveHandler;

    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.setInitialState();
    return _this;
  }

  _createClass(DropTarget, [{
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
      var dropTargets = this.getDropTargets(),
          dropTargetToBeMarked = dropTargets.reduce(function (dropTargetToBeMarked, dropTarget) {
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
      var markedDropTarget = null;

      var marked = this.isMarked();

      if (marked) {
        markedDropTarget = this; ///
      } else {
        var dropTargets = this.getDropTargets();

        dropTargets.some(function (dropTarget) {
          var dropTargetMarked = dropTarget.isMarked();

          if (dropTargetMarked) {
            markedDropTarget = dropTarget;

            return true;
          }
        });
      }

      return markedDropTarget;
    }
  }, {
    key: 'unmarkGlobally',
    value: function unmarkGlobally() {
      var markedDropTarget = this.getMarkedDropTarget();

      markedDropTarget.unmark();
    }
  }, {
    key: 'moveDraggableEntries',
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var _this2 = this;

      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

      this.moveHandler(pathMaps, function () {
        var lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoriesOptionPresent) {
          draggableEntriesExplorer.unsetOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoriesOptionPresent) {
              draggableEntriesExplorer.setOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = pathMaps.find(function (pathMap) {
              var sourcePath = pathMap.sourcePath;


              if (sourcePath === draggableEntryPath) {
                return true;
              }
            }),
                _sourcePath = pathMap.sourcePath,
                _targetPath = pathMap.targetPath,
                callback = pathMap.callback;


            draggableEntry = _this2.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);

            if (callback) {
              callback(draggableEntry);
            }
          }

          return draggableEntries;
        }, []);

        done();
      });
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var draggableEntryType = draggableEntry.getType(),
          draggableEntryDirectoryNameDraggableEntry = draggableEntryType === DIRECTORY_NAME_TYPE;

      if (draggableEntryDirectoryNameDraggableEntry) {
        var directoryDraggableEntry = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        targetDirectoryPath = targetPath; ///

        draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath);
      } else {
        var fileNameDraggableEntry = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        targetFilePath = targetPath;

        draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath);
      }

      return draggableEntry;
    }
  }, {
    key: 'addDropTarget',
    value: function addDropTarget(dropTarget) {
      var dropTargets = this.getDropTargets();

      dropTargets.push(dropTarget);
    }
  }, {
    key: 'removeDropTarget',
    value: function removeDropTarget(dropTarget) {
      var dropTargets = this.getDropTargets(),
          index = dropTargets.indexOf(dropTarget);

      if (index !== -1) {
        var start = index,
            ///
        deleteCount = 1;

        dropTargets.splice(start, deleteCount);
      }
    }
  }, {
    key: 'getDropTargets',
    value: function getDropTargets() {
      var state = this.getState(),
          dropTargets = state.dropTargets;


      return dropTargets;
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState() {
      var dropTargets = [];

      this.setState({
        dropTargets: dropTargets
      });
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;

function defaultMoveHandler(pathMaps, done) {
  done();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5Iiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJFbGVtZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaXJzdCIsImxhc3QiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIkRyb3BUYXJnZXQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZGVmYXVsdE1vdmVIYW5kbGVyIiwic2V0SW5pdGlhbFN0YXRlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0cyIsImdldERyb3BUYXJnZXRzIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJkcm9wVGFyZ2V0IiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZCIsImlzTWFya2VkIiwic29tZSIsImRyb3BUYXJnZXRNYXJrZWQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwidW5tYXJrIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsInBhdGhNYXBzIiwicGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyIsImxhc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsImRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwidW5zZXRPcHRpb24iLCJmb3JFYWNoIiwic2V0T3B0aW9uIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImZpbmQiLCJwYXRoTWFwIiwiY2FsbGJhY2siLCJtb3ZlRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwibW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwibW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImdldFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsVUFBVUYsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUcsYUFBYUgsUUFBUSxjQUFSLENBRG5COztBQUdNLElBQUVJLE9BQUYsR0FBY0wsSUFBZCxDQUFFSyxPQUFGO0FBQUEsSUFDRUMsY0FERixHQUNxQkosU0FEckIsQ0FDRUksY0FERjtBQUFBLElBRUVDLEtBRkYsR0FFa0JELGNBRmxCLENBRUVDLEtBRkY7QUFBQSxJQUVTQyxJQUZULEdBRWtCRixjQUZsQixDQUVTRSxJQUZUO0FBQUEsSUFHRUMsbUJBSEYsR0FHMEJMLFVBSDFCLENBR0VLLG1CQUhGO0FBQUEsSUFJRUMsK0JBSkYsR0FJc0NQLE9BSnRDLENBSUVPLCtCQUpGOztJQU1BQyxVOzs7QUFDSixzQkFB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RDs7O2tDQUVhSyxVLEVBQVk7QUFDeEIsVUFBTUosY0FBYyxLQUFLQyxjQUFMLEVBQXBCOztBQUVBRCxrQkFBWThDLElBQVosQ0FBaUIxQyxVQUFqQjtBQUNEOzs7cUNBRWdCQSxVLEVBQVk7QUFDM0IsVUFBTUosY0FBYyxLQUFLQyxjQUFMLEVBQXBCO0FBQUEsVUFDTThDLFFBQVEvQyxZQUFZZ0QsT0FBWixDQUFvQjVDLFVBQXBCLENBRGQ7O0FBR0EsVUFBSTJDLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCLFlBQU1FLFFBQVFGLEtBQWQ7QUFBQSxZQUFzQjtBQUNoQkcsc0JBQWMsQ0FEcEI7O0FBR0FsRCxvQkFBWW1ELE1BQVosQ0FBbUJGLEtBQW5CLEVBQTBCQyxXQUExQjtBQUNEO0FBQ0Y7OztxQ0FFZ0I7QUFDVCxrQkFBUSxLQUFLRSxRQUFMLEVBQVI7QUFBQSxVQUNFcEQsV0FERixHQUNrQnFELEtBRGxCLENBQ0VyRCxXQURGOzs7QUFHTixhQUFPQSxXQUFQO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsVUFBTUEsY0FBYyxFQUFwQjs7QUFFQSxXQUFLc0QsUUFBTCxDQUFjO0FBQ1p0RDtBQURZLE9BQWQ7QUFHRDs7OztFQWpLc0JsQixPOztBQW9LekJ5RSxPQUFPQyxPQUFQLEdBQWlCcEUsVUFBakI7O0FBRUEsU0FBU0csa0JBQVQsQ0FBNEIwQixRQUE1QixFQUFzQ0QsSUFBdEMsRUFBNEM7QUFDMUNBO0FBQ0QiLCJmaWxlIjoiZHJvcFRhcmdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi9lbnRyeVR5cGVzJyk7XG5cbmNvbnN0IHsgRWxlbWVudCB9ID0gZWFzeSxcbiAgICAgIHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgZmlyc3QsIGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSBlbnRyeVR5cGVzLFxuICAgICAgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcm9wVGFyZ2V0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciA9IGRlZmF1bHRNb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG4gICAgXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCksXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0cy5yZWR1Y2UoKGRyb3BUYXJnZXRUb0JlTWFya2VkLCBkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICAgICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBsZXQgbWFya2VkRHJvcFRhcmdldCA9IG51bGw7XG5cbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcblxuICAgICAgZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZUVudHJpZXM7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpO1xuICAgIFxuICAgIGRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBpbmRleCA9IGRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIGRyb3BUYXJnZXRzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldERyb3BUYXJnZXRzKCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRzO1xuICB9XG4gIFxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXTtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3BUYXJnZXRzXG4gICAgfSk7XG4gIH0gIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BUYXJnZXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG4iXX0=