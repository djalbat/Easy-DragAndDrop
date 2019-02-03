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
    var moveHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

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
      var dropTargets = this.getDropTargets(),
          markedDropTarget = dropTargets.reduce(function (markedDropTarget, dropTarget) {
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
    key: 'removeMarkerEntryGlobally',
    value: function removeMarkerEntryGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarkerEntry();
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.removeMarkerEntry();
      }
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
              var sourcePath = pathMap.sourcePath,
                  found = sourcePath === draggableEntryPath;


              return found;
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
      var dropTargets = this.getDropTargets();

      var index = dropTargets.indexOf(dropTarget),
          found = index !== -1;

      if (found) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5Iiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJFbGVtZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaXJzdCIsImxhc3QiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIkRyb3BUYXJnZXQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwicGF0aE1hcHMiLCJkb25lIiwic2V0SW5pdGlhbFN0YXRlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0cyIsImdldERyb3BUYXJnZXRzIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJkcm9wVGFyZ2V0IiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRNYXJrZWQiLCJpc01hcmtlZCIsIm1hcmtlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJmaW5kIiwicGF0aE1hcCIsImZvdW5kIiwiY2FsbGJhY2siLCJtb3ZlRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwibW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwibW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImdldFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsVUFBVUYsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUcsYUFBYUgsUUFBUSxjQUFSLENBRG5COztBQUdNLElBQUVJLE9BQUYsR0FBY0wsSUFBZCxDQUFFSyxPQUFGO0FBQUEsSUFDRUMsY0FERixHQUNxQkosU0FEckIsQ0FDRUksY0FERjtBQUFBLElBRUVDLEtBRkYsR0FFa0JELGNBRmxCLENBRUVDLEtBRkY7QUFBQSxJQUVTQyxJQUZULEdBRWtCRixjQUZsQixDQUVTRSxJQUZUO0FBQUEsSUFHRUMsbUJBSEYsR0FHMEJMLFVBSDFCLENBR0VLLG1CQUhGO0FBQUEsSUFJRUMsK0JBSkYsR0FJc0NQLE9BSnRDLENBSUVPLCtCQUpGOztJQU1BQyxVOzs7QUFDSixzQkFBWUMsUUFBWixF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QUwsQ0FBZ0NILHNCQUFoQyxFQUF3REMsY0FBeEQsRUFBd0VDLGNBQXhFLENBQWpCO0FBQ0Q7O0FBRUQsYUFBTzNDLGNBQVA7QUFDRDs7O2tDQUVhSyxVLEVBQVk7QUFDeEIsVUFBTUosY0FBYyxLQUFLQyxjQUFMLEVBQXBCOztBQUVBRCxrQkFBWTRDLElBQVosQ0FBaUJ4QyxVQUFqQjtBQUNEOzs7cUNBRWdCQSxVLEVBQVk7QUFDM0IsVUFBTUosY0FBYyxLQUFLQyxjQUFMLEVBQXBCOztBQUVBLFVBQU00QyxRQUFRN0MsWUFBWThDLE9BQVosQ0FBb0IxQyxVQUFwQixDQUFkO0FBQUEsVUFDTTBCLFFBQVNlLFVBQVUsQ0FBQyxDQUQxQjs7QUFHQSxVQUFJZixLQUFKLEVBQVc7QUFDVCxZQUFNaUIsUUFBUUYsS0FBZDtBQUFBLFlBQXNCO0FBQ2hCRyxzQkFBYyxDQURwQjs7QUFHQWhELG9CQUFZaUQsTUFBWixDQUFtQkYsS0FBbkIsRUFBMEJDLFdBQTFCO0FBQ0Q7QUFDRjs7O3FDQUVnQjtBQUNULGtCQUFRLEtBQUtFLFFBQUwsRUFBUjtBQUFBLFVBQ0VsRCxXQURGLEdBQ2tCbUQsS0FEbEIsQ0FDRW5ELFdBREY7OztBQUdOLGFBQU9BLFdBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFNQSxjQUFjLEVBQXBCOztBQUVBLFdBQUtvRCxRQUFMLENBQWM7QUFDWnBEO0FBRFksT0FBZDtBQUdEOzs7O0VBaktzQm5CLE87O0FBb0t6QndFLE9BQU9DLE9BQVAsR0FBaUJuRSxVQUFqQiIsImZpbGUiOiJkcm9wVGFyZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuL2VudHJ5VHlwZXMnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCwgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IGVudHJ5VHlwZXMsXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihkcm9wVGFyZ2V0VG9CZU1hcmtlZCwgZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wVGFyZ2V0LCBkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAobWFya2VkRHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpOyAvLy9cblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwcy5maW5kKGZ1bmN0aW9uKHBhdGhNYXApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCk7XG4gIFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHsgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgY2FsbGJhY2sgfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlRW50cmllcztcbiAgICAgIH0sIFtdKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgICAgc291cmNlRmlsZVBhdGggPSBzb3VyY2VQYXRoLCAgLy8vXG4gICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgYWRkRHJvcFRhcmdldChkcm9wVGFyZ2V0KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCk7XG4gICAgXG4gICAgZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpO1xuXG4gICAgY29uc3QgaW5kZXggPSBkcm9wVGFyZ2V0cy5pbmRleE9mKGRyb3BUYXJnZXQpLFxuICAgICAgICAgIGZvdW5kID0gKGluZGV4ICE9PSAtMSk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcbiAgICAgIFxuICAgICAgZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RHJvcFRhcmdldHMoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBkcm9wVGFyZ2V0cyB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldHM7XG4gIH1cbiAgXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IFtdO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcFRhcmdldHNcbiAgICB9KTtcbiAgfSAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcFRhcmdldDtcbiJdfQ==