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
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
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
      var dropTargetToBeMarked = null;

      var toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        dropTargetToBeMarked = this; ///
      } else {
        var dropTargets = this.getDropTargets();

        dropTargets.some(function (dropTarget) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwidHlwZXMiLCJvcHRpb25zIiwiRWxlbWVudCIsImFycmF5VXRpbGl0aWVzIiwiZmlyc3QiLCJsYXN0IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsImRlZmF1bHRNb3ZlSGFuZGxlciIsInNldEluaXRpYWxTdGF0ZSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJ0b0JlTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcFRhcmdldHMiLCJnZXREcm9wVGFyZ2V0cyIsInNvbWUiLCJkcm9wVGFyZ2V0IiwibWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZCIsImlzTWFya2VkIiwiZHJvcFRhcmdldE1hcmtlZCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJ1bm1hcmsiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwicGF0aE1hcHMiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZmluZCIsInBhdGhNYXAiLCJjYWxsYmFjayIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJzdGFydCIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxRQUFRRixRQUFRLFNBQVIsQ0FBZDtBQUFBLElBQ01HLFVBQVVILFFBQVEsV0FBUixDQURoQjs7QUFHTSxJQUFFSSxPQUFGLEdBQWNMLElBQWQsQ0FBRUssT0FBRjtBQUFBLElBQ0VDLGNBREYsR0FDcUJKLFNBRHJCLENBQ0VJLGNBREY7QUFBQSxJQUVFQyxLQUZGLEdBRWtCRCxjQUZsQixDQUVFQyxLQUZGO0FBQUEsSUFFU0MsSUFGVCxHQUVrQkYsY0FGbEIsQ0FFU0UsSUFGVDtBQUFBLElBR0VDLG1CQUhGLEdBRzBCTixLQUgxQixDQUdFTSxtQkFIRjtBQUFBLElBSUVDLCtCQUpGLEdBSXNDTixPQUp0QyxDQUlFTSwrQkFKRjs7SUFNQUMsVTs7O0FBQ0osc0JBQVlD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eUJBQWlCLEtBQUs4QywwQkFBTCxDQUFnQ0gsc0JBQWhDLEVBQXdEQyxjQUF4RCxFQUF3RUMsY0FBeEUsQ0FBakI7QUFDRDs7QUFFRCxhQUFPN0MsY0FBUDtBQUNEOzs7a0NBRWFPLFUsRUFBWTtBQUN4QixVQUFNSCxjQUFjLEtBQUtDLGNBQUwsRUFBcEI7O0FBRUFELGtCQUFZMkMsSUFBWixDQUFpQnhDLFVBQWpCO0FBQ0Q7OztxQ0FFZ0JBLFUsRUFBWTtBQUMzQixVQUFNSCxjQUFjLEtBQUtDLGNBQUwsRUFBcEI7QUFBQSxVQUNNMkMsUUFBUTVDLFlBQVk2QyxPQUFaLENBQW9CMUMsVUFBcEIsQ0FEZDs7QUFHQSxVQUFJeUMsVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDaEIsWUFBTUUsUUFBUUYsS0FBZDtBQUFBLFlBQXNCO0FBQ2hCRyxzQkFBYyxDQURwQjs7QUFHQS9DLG9CQUFZZ0QsTUFBWixDQUFtQkYsS0FBbkIsRUFBMEJDLFdBQTFCO0FBQ0Q7QUFDRjs7O3FDQUVnQjtBQUNULGtCQUFRLEtBQUtFLFFBQUwsRUFBUjtBQUFBLFVBQ0VqRCxXQURGLEdBQ2tCa0QsS0FEbEIsQ0FDRWxELFdBREY7OztBQUdOLGFBQU9BLFdBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFNQSxjQUFjLEVBQXBCOztBQUVBLFdBQUttRCxRQUFMLENBQWM7QUFDWm5EO0FBRFksT0FBZDtBQUdEOzs7O0VBMUtzQnJCLE87O0FBNkt6QnlFLE9BQU9DLE9BQVAsR0FBaUJwRSxVQUFqQjs7QUFFQSxTQUFTRyxrQkFBVCxDQUE0QjBCLFFBQTVCLEVBQXNDRCxJQUF0QyxFQUE0QztBQUMxQ0E7QUFDRCIsImZpbGUiOiJkcm9wVGFyZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXMsXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZGVmYXVsdE1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCk7XG5cbiAgICAgIGRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldDsgIC8vL1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgbGV0IG1hcmtlZERyb3BUYXJnZXQgPSBudWxsO1xuXG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCk7XG5cbiAgICAgIGRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgdW5tYXJrR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpOyAvLy9cblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwcy5maW5kKChwYXRoTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB7IHNvdXJjZVBhdGggfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VQYXRoID09PSBkcmFnZ2FibGVFbnRyeVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgeyBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBjYWxsYmFjayB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkcmFnZ2FibGVFbnRyaWVzO1xuICAgICAgfSwgW10pO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldEZpbGVQYXRoID0gdGFyZ2V0UGF0aDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcbiAgICBcbiAgICBkcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCksXG4gICAgICAgICAgaW5kZXggPSBkcm9wVGFyZ2V0cy5pbmRleE9mKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuICAgICAgXG4gICAgICBkcm9wVGFyZ2V0cy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0cygpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGRyb3BUYXJnZXRzIH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0cztcbiAgfVxuICBcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gW107XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wVGFyZ2V0c1xuICAgIH0pO1xuICB9ICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0TW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuIl19