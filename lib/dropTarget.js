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

  function DropTarget(selector, moveHandler) {
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
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties, moveHandler) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      return Element.fromProperties.apply(Element, [Class, properties, moveHandler].concat(remainingArguments));
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwidHlwZXMiLCJvcHRpb25zIiwiRWxlbWVudCIsImFycmF5VXRpbGl0aWVzIiwiZmlyc3QiLCJsYXN0IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsInNldEluaXRpYWxTdGF0ZSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJ0b0JlTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcFRhcmdldHMiLCJnZXREcm9wVGFyZ2V0cyIsInNvbWUiLCJkcm9wVGFyZ2V0IiwibWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZCIsImlzTWFya2VkIiwiZHJvcFRhcmdldE1hcmtlZCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJ1bm1hcmsiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwicGF0aE1hcHMiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZmluZCIsInBhdGhNYXAiLCJjYWxsYmFjayIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJzdGFydCIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiZnJvbVByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFFBQVFGLFFBQVEsU0FBUixDQUFkO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxXQUFSLENBRGhCOztBQUdNLElBQUVJLE9BQUYsR0FBY0wsSUFBZCxDQUFFSyxPQUFGO0FBQUEsSUFDRUMsY0FERixHQUNxQkosU0FEckIsQ0FDRUksY0FERjtBQUFBLElBRUVDLEtBRkYsR0FFa0JELGNBRmxCLENBRUVDLEtBRkY7QUFBQSxJQUVTQyxJQUZULEdBRWtCRixjQUZsQixDQUVTRSxJQUZUO0FBQUEsSUFHRUMsbUJBSEYsR0FHMEJOLEtBSDFCLENBR0VNLG1CQUhGO0FBQUEsSUFJRUMsK0JBSkYsR0FJc0NOLE9B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bmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyk7XG5cbmNvbnN0IHsgRWxlbWVudCB9ID0gZWFzeSxcbiAgICAgIHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgZmlyc3QsIGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSB0eXBlcyxcbiAgICAgIHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICAgIFxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IG51bGw7XG5cbiAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcblxuICAgICAgZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCB0b0JlTWFya2VkID0gZHJvcFRhcmdldC5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0OyAgLy8vXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBsZXQgbWFya2VkRHJvcFRhcmdldCA9IG51bGw7XG5cbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcblxuICAgICAgZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZUVudHJpZXM7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpO1xuICAgIFxuICAgIGRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBpbmRleCA9IGRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIGRyb3BUYXJnZXRzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldERyb3BUYXJnZXRzKCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRzO1xuICB9XG4gIFxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXTtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3BUYXJnZXRzXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcFRhcmdldDtcbiJdfQ==