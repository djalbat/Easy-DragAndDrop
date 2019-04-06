'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var types = require('./types'),
    options = require('./options');

var Element = easy.Element,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first,
    last = arrayUtilities.last,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var DropTarget = function (_Element) {
  _inherits(DropTarget, _Element);

  function DropTarget(selector, moveHandler, dropTargets) {
    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.dropTargets = dropTargets;

    _this.moveHandler = moveHandler;
    return _this;
  }

  _createClass(DropTarget, [{
    key: 'getDropTargets',
    value: function getDropTargets() {
      return this.dropTargets;
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
      var dropTargetToBeMarked = null;

      var toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        dropTargetToBeMarked = this; ///
      } else {
        this.dropTargets.some(function (dropTarget) {
          var toBeMarked = dropTarget.isToBeMarked(draggableEntry);

          if (toBeMarked) {
            dropTargetToBeMarked = dropTarget; ///

            return true;
          }
        });
      }

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
        this.dropTargets.some(function (dropTarget) {
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
        });

        done();
      });
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var type = draggableEntry.getType();

      switch (type) {
        case FILE_NAME_TYPE:
          var fileNameDraggableEntry = draggableEntry,
              ///
          sourceFilePath = sourcePath,
              ///
          targetFilePath = targetPath;

          draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath); ///

          break;

        case DIRECTORY_NAME_TYPE:
          var directoryDraggableEntry = draggableEntry,
              ///
          sourceDirectoryPath = sourcePath,
              ///
          targetDirectoryPath = targetPath; ///

          draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath); ///

          break;
      }

      return draggableEntry;
    }
  }, {
    key: 'addDropTarget',
    value: function addDropTarget(dropTarget) {
      var reciprocated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.dropTargets.push(dropTarget);

      if (reciprocated) {
        var dropTargets = dropTarget.getDropTargets(),
            _reciprocated = false;

        dropTarget = this; ///

        dropTargets.addDropTarget(dropTarget, _reciprocated);
      }
    }
  }, {
    key: 'removeDropTarget',
    value: function removeDropTarget(dropTarget) {
      var reciprocated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var index = this.dropTargets.indexOf(dropTarget);

      if (index !== -1) {
        var start = index,
            ///
        deleteCount = 1;

        this.dropTargets.splice(start, deleteCount);
      }

      if (reciprocated) {
        var dropTargets = dropTarget.getDropTargets(),
            _reciprocated2 = false;

        dropTarget = this; ///

        dropTargets.removeDropTarget(dropTarget, _reciprocated2);
      }
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties, moveHandler) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var dropTargets = [],
          dropTarget = Element.fromProperties.apply(Element, [Class, properties, dropTargets, moveHandler].concat(remainingArguments));

      return dropTarget;
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwidHlwZXMiLCJvcHRpb25zIiwiRWxlbWVudCIsImFycmF5VXRpbGl0aWVzIiwiZmlyc3QiLCJsYXN0IiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIkZJTEVfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkRyb3BUYXJnZXQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcFRhcmdldHMiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhcmVPdmVybGFwcGluZyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwidG9CZU1hcmtlZCIsImlzVG9CZU1hcmtlZCIsInNvbWUiLCJkcm9wVGFyZ2V0IiwibWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZCIsImlzTWFya2VkIiwiZHJvcFRhcmdldE1hcmtlZCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJ1bm1hcmsiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwicGF0aE1hcHMiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZmluZCIsInBhdGhNYXAiLCJjYWxsYmFjayIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsInR5cGUiLCJnZXRUeXBlIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmVjaXByb2NhdGVkIiwicHVzaCIsImdldERyb3BUYXJnZXRzIiwiYWRkRHJvcFRhcmdldCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJyZW1vdmVEcm9wVGFyZ2V0IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiZnJvbVByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFFBQVFGLFFBQVEsU0FBUixDQUFkO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxXQUFSLENBRGhCOztBQUdNLElBQUVJLE9BQUYsR0FBY0wsSUFBZCxDQUFFSyxPQUFGO0FBQUEsSUFDRUMsY0FERixHQUNxQkosU0FEckIsQ0FDRUksY0FERjtBQUFBLElBRUVDLEtBRkYsR0FFa0JELGNBRmxCLENBRUVDLEtBRkY7QUFBQSxJQUVTQyxJQUZULEdBRWtCRixjQUZsQixDQUVTRSxJQUZUO0FBQUEsSUFHRUMsK0JBSEYsR0FHc0NMLE9BSHRDLENBR0VLLCtCQUhGO0FBQUEsSUFJRUMsY0FKRixHQUkwQ1AsS0FKMUMsQ0FJRU8sY0FKRjtBQUFBLElBSWtCQyxtQkFKbEIsR0FJMENS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RCxjQUFjLEVBQXBCO0FBQUEsVUFDTVksYUFBYXRCLFFBQVEwRSxjQUFSLGlCQUF1QkgsS0FBdkIsRUFBOEJDLFVBQTlCLEVBQTBDOUQsV0FBMUMsRUFBdURELFdBQXZELFNBQXVFZ0Usa0JBQXZFLEVBRG5COztBQUdBLGFBQU9uRCxVQUFQO0FBQ0Q7Ozs7RUFwTHNCdEIsTzs7QUF1THpCMkUsT0FBT0MsT0FBUCxHQUFpQnJFLFVBQWpCIiwiZmlsZSI6ImRyb3BUYXJnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyk7XG5cbmNvbnN0IHsgRWxlbWVudCB9ID0gZWFzeSxcbiAgICAgIHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgZmlyc3QsIGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBkcm9wVGFyZ2V0cykge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJvcFRhcmdldHMgPSBkcm9wVGFyZ2V0cztcblxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRzKCkge1xuICAgIHJldHVybiB0aGlzLmRyb3BUYXJnZXRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7ICAvLy9cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGxldCBtYXJrZWREcm9wVGFyZ2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgY29uc3QgZHJvcFRhcmdldHMgPSBkcm9wVGFyZ2V0LmdldERyb3BUYXJnZXRzKCksXG4gICAgICAgICAgICByZWNpcHJvY2F0ZWQgPSBmYWxzZTtcblxuICAgICAgZHJvcFRhcmdldCA9IHRoaXM7ICAvLy9cblxuICAgICAgZHJvcFRhcmdldHMuYWRkRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCwgcmVjaXByb2NhdGVkID0gZmFsc2UpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZHJvcFRhcmdldHMuaW5kZXhPZihkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcbiAgICAgIFxuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG5cbiAgICBpZiAocmVjaXByb2NhdGVkKSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IGRyb3BUYXJnZXQuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICAgIHJlY2lwcm9jYXRlZCA9IGZhbHNlO1xuXG4gICAgICBkcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuXG4gICAgICBkcm9wVGFyZ2V0cy5yZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXSxcbiAgICAgICAgICBkcm9wVGFyZ2V0ID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuIl19