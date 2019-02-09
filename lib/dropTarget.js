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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5Iiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJFbGVtZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaXJzdCIsImxhc3QiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIkRyb3BUYXJnZXQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwicGF0aE1hcHMiLCJkb25lIiwic2V0SW5pdGlhbFN0YXRlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0cyIsImdldERyb3BUYXJnZXRzIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJkcm9wVGFyZ2V0IiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRNYXJrZWQiLCJpc01hcmtlZCIsIm1hcmtlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJmaW5kIiwicGF0aE1hcCIsImNhbGxiYWNrIiwibW92ZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsIm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJnZXRTdGF0ZSIsInN0YXRlIiwic2V0U3RhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFVBQVVGLFFBQVEsV0FBUixDQUFoQjtBQUFBLElBQ01HLGFBQWFILFFBQVEsY0FBUixDQURuQjs7QUFHTSxJQUFFSSxPQUFGLEdBQWNMLElBQWQsQ0FBRUssT0FBRjtBQUFBLElBQ0VDLGNBREYsR0FDcUJKLFNBRHJCLENBQ0VJLGNBREY7QUFBQSxJQUVFQyxLQUZGLEdBRWtCRCxjQUZsQixDQUVFQyxLQUZGO0FBQUEsSUFFU0MsSUFGVCxHQUVrQkYsY0FGbEIsQ0FFU0UsSUFGVDtBQUFBLElBR0VDLG1CQUhGLEdBRzBCTCxVQUgxQixDQUdFSyxtQkFIRjtBQUFBLElBSUVDLCtCQUpGLEdBSXNDUCxPQUp0QyxDQUlFTywrQkFKRjs7SUFNQUMsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBMEU7QUFB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Q0gsc0JBQWhDLEVBQXdEQyxjQUF4RCxFQUF3RUMsY0FBeEUsQ0FBakI7QUFDRDs7QUFFRCxhQUFPMUMsY0FBUDtBQUNEOzs7a0NBRWFLLFUsRUFBWTtBQUN4QixVQUFNSixjQUFjLEtBQUtDLGNBQUwsRUFBcEI7O0FBRUFELGtCQUFZMkMsSUFBWixDQUFpQnZDLFVBQWpCO0FBQ0Q7OztxQ0FFZ0JBLFUsRUFBWTtBQUMzQixVQUFNSixjQUFjLEtBQUtDLGNBQUwsRUFBcEI7QUFBQSxVQUNNMkMsUUFBUTVDLFlBQVk2QyxPQUFaLENBQW9CekMsVUFBcEIsQ0FEZDs7QUFHQSxVQUFJd0MsVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDaEIsWUFBTUUsUUFBUUYsS0FBZDtBQUFBLFlBQXNCO0FBQ2hCRyxzQkFBYyxDQURwQjs7QUFHQS9DLG9CQUFZZ0QsTUFBWixDQUFtQkYsS0FBbkIsRUFBMEJDLFdBQTFCO0FBQ0Q7QUFDRjs7O3FDQUVnQjtBQUNULGtCQUFRLEtBQUtFLFFBQUwsRUFBUjtBQUFBLFVBQ0VqRCxXQURGLEdBQ2tCa0QsS0FEbEIsQ0FDRWxELFdBREY7OztBQUdOLGFBQU9BLFdBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFNQSxjQUFjLEVBQXBCOztBQUVBLFdBQUttRCxRQUFMLENBQWM7QUFDWm5EO0FBRFksT0FBZDtBQUdEOzs7O0VBaEtzQm5CLE87O0FBbUt6QnVFLE9BQU9DLE9BQVAsR0FBaUJsRSxVQUFqQiIsImZpbGUiOiJkcm9wVGFyZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuL2VudHJ5VHlwZXMnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCwgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IGVudHJ5VHlwZXMsXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihkcm9wVGFyZ2V0VG9CZU1hcmtlZCwgZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wVGFyZ2V0LCBkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAobWFya2VkRHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpOyAvLy9cblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwcy5maW5kKGZ1bmN0aW9uKHBhdGhNYXApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZUVudHJpZXM7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpO1xuICAgIFxuICAgIGRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBpbmRleCA9IGRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIGRyb3BUYXJnZXRzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldERyb3BUYXJnZXRzKCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRzO1xuICB9XG4gIFxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXTtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3BUYXJnZXRzXG4gICAgfSk7XG4gIH0gIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BUYXJnZXQ7XG4iXX0=