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

  function DropTarget(selector, dropTargets, moveHandler) {
    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.dropTargets = dropTargets;

    _this.moveHandler = moveHandler;
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
        dropTarget.addDropTarget(this); ///
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
        dropTarget.removeDropTarget(this); ///
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwidHlwZXMiLCJvcHRpb25zIiwiRWxlbWVudCIsImFycmF5VXRpbGl0aWVzIiwiZmlyc3QiLCJsYXN0IiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIkZJTEVfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkRyb3BUYXJnZXQiLCJzZWxlY3RvciIsImRyb3BUYXJnZXRzIiwibW92ZUhhbmRsZXIiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhcmVPdmVybGFwcGluZyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwidG9CZU1hcmtlZCIsImlzVG9CZU1hcmtlZCIsInNvbWUiLCJkcm9wVGFyZ2V0IiwibWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZCIsImlzTWFya2VkIiwiZHJvcFRhcmdldE1hcmtlZCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJ1bm1hcmsiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwicGF0aE1hcHMiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZmluZCIsInBhdGhNYXAiLCJjYWxsYmFjayIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsInR5cGUiLCJnZXRUeXBlIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmVjaXByb2NhdGVkIiwicHVzaCIsImFkZERyb3BUYXJnZXQiLCJpbmRleCIsImluZGV4T2YiLCJzdGFydCIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwicmVtb3ZlRHJvcFRhcmdldCIsIkNsYXNzIiwicHJvcGVydGllcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImZyb21Qcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxRQUFRRixRQUFRLFNBQVIsQ0FBZDtBQUFBLElBQ01HLFVBQVVILFFBQVEsV0FBUixDQURoQjs7QUFHTSxJQUFFSSxPQUFGLEdBQWNMLElBQWQsQ0FBRUssT0FBRjtBQUFBLElBQ0VDLGNBREYsR0FDcUJKLFNBRHJCLENBQ0VJLGNBREY7QUFBQSxJQUVFQyxLQUZGLEdBRWtCRCxjQUZsQixDQUVFQyxLQUZGO0FBQUEsSUFFU0MsSUFGVCxHQUVrQkYsY0FGbEIsQ0FFU0UsSUFGVDtBQUFBLElBR0VDLCtCQUhGLEdBR3NDTCxPQUh0QyxDQUdFSywrQkFIRjtBQUFBLElBSUVDLGNBSkYsR0FJMENQLEtBSjFDLENBSUVPLGNBSkY7QUFBQSxJQUlrQkMsbUJBSmxCLEdBSTBDUixLQUoxQyxDQUlrQlEsbUJB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c3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCwgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcm9wVGFyZ2V0cyA9IGRyb3BUYXJnZXRzO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7ICAvLy9cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGxldCBtYXJrZWREcm9wVGFyZ2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5hZGREcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5yZW1vdmVEcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IFtdLFxuICAgICAgICAgIGRyb3BUYXJnZXQgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BUYXJnZXQ7XG4iXX0=