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


            draggableEntry = this.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);

            if (callback) {
              callback(draggableEntry);
            }
          }

          return draggableEntries;
        }.bind(this), []);

        done();
      }.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5Iiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJFbGVtZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaXJzdCIsImxhc3QiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIkRyb3BUYXJnZXQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwicGF0aE1hcHMiLCJkb25lIiwic2V0SW5pdGlhbFN0YXRlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0cyIsImdldERyb3BUYXJnZXRzIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJkcm9wVGFyZ2V0IiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRNYXJrZWQiLCJpc01hcmtlZCIsIm1hcmtlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJmaW5kIiwicGF0aE1hcCIsImZvdW5kIiwiY2FsbGJhY2siLCJtb3ZlRHJhZ2dhYmxlRW50cnkiLCJiaW5kIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsIm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJnZXRTdGF0ZSIsInN0YXRlIiwic2V0U3RhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFVBQVVGLFFBQVEsV0FBUixDQUFoQjtBQUFBLElBQ01HLGFBQWFILFFBQVEsY0FBUixDQURuQjs7QUFHTSxJQUFFSSxPQUFGLEdBQWNMLElBQWQsQ0FBRUssT0FBRjtBQUFBLElBQ0VDLGNBREYsR0FDcUJKLFNBRHJCLENBQ0VJLGNBREY7QUFBQSxJQUVFQyxLQUZGLEdBRWtCRCxjQUZsQixDQUVFQyxLQUZGO0FBQUEsSUFFU0MsSUFGVCxHQUVrQkYsY0FGbEIsQ0FFU0UsSUFGVDtBQUFBLElBR0VDLG1CQUhGLEdBRzBCTCxVQUgxQixDQUdFSyxtQkFIRjtBQUFBLElBSUVDLCtCQUpGLEdBSXNDUCxPQUp0QyxDQUlFTywrQkFKRjs7SUFNQUMsVTs7O0FBQ0osc0JBQVlD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MkMseUJBQWlCN0IsVUFEdkI7QUFBQSxZQUNvQztBQUM5QjhCLHlCQUFpQjdCLFVBRnZCOztBQUlBZix5QkFBaUIsS0FBSzZDLDBCQUFMLENBQWdDSCxzQkFBaEMsRUFBd0RDLGNBQXhELEVBQXdFQyxjQUF4RSxDQUFqQjtBQUNEOztBQUVELGFBQU81QyxjQUFQO0FBQ0Q7OztrQ0FFYUssVSxFQUFZO0FBQ3hCLFVBQU1KLGNBQWMsS0FBS0MsY0FBTCxFQUFwQjs7QUFFQUQsa0JBQVk2QyxJQUFaLENBQWlCekMsVUFBakI7QUFDRDs7O3FDQUVnQkEsVSxFQUFZO0FBQzNCLFVBQU1KLGNBQWMsS0FBS0MsY0FBTCxFQUFwQjs7QUFFQSxVQUFNNkMsUUFBUTlDLFlBQVkrQyxPQUFaLENBQW9CM0MsVUFBcEIsQ0FBZDtBQUFBLFVBQ00wQixRQUFTZ0IsVUFBVSxDQUFDLENBRDFCOztBQUdBLFVBQUloQixLQUFKLEVBQVc7QUFDVCxZQUFNa0IsUUFBUUYsS0FBZDtBQUFBLFlBQXNCO0FBQ2hCRyxzQkFBYyxDQURwQjs7QUFHQWpELG9CQUFZa0QsTUFBWixDQUFtQkYsS0FBbkIsRUFBMEJDLFdBQTFCO0FBQ0Q7QUFDRjs7O3FDQUVnQjtBQUNULGtCQUFRLEtBQUtFLFFBQUwsRUFBUjtBQUFBLFVBQ0VuRCxXQURGLEdBQ2tCb0QsS0FEbEIsQ0FDRXBELFdBREY7OztBQUdOLGFBQU9BLFdBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFNQSxjQUFjLEVBQXBCOztBQUVBLFdBQUtxRCxRQUFMLENBQWM7QUFDWnJEO0FBRFksT0FBZDtBQUdEOzs7O0VBaktzQm5CLE87O0FBb0t6QnlFLE9BQU9DLE9BQVAsR0FBaUJwRSxVQUFqQiIsImZpbGUiOiJkcm9wVGFyZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuL2VudHJ5VHlwZXMnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCwgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IGVudHJ5VHlwZXMsXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihkcm9wVGFyZ2V0VG9CZU1hcmtlZCwgZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wVGFyZ2V0LCBkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAobWFya2VkRHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcHMuZmluZChmdW5jdGlvbihwYXRoTWFwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB7IHNvdXJjZVBhdGggfSA9IHBhdGhNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IChzb3VyY2VQYXRoID09PSBkcmFnZ2FibGVFbnRyeVBhdGgpO1xuICBcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZUVudHJpZXM7XG4gICAgICB9LmJpbmQodGhpcyksIFtdKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldEZpbGVQYXRoID0gdGFyZ2V0UGF0aDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcbiAgICBcbiAgICBkcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCk7XG5cbiAgICBjb25zdCBpbmRleCA9IGRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCksXG4gICAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuICAgICAgXG4gICAgICBkcm9wVGFyZ2V0cy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0cygpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGRyb3BUYXJnZXRzIH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0cztcbiAgfVxuICBcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gW107XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wVGFyZ2V0c1xuICAgIH0pO1xuICB9ICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuIl19