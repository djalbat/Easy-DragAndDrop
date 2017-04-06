'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var util = require('./util'),
    options = require('./options');

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
        var lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
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
            var _sourcePath = draggableEntryPath,
                ///
            pathMap = find(pathMaps, function (pathMap) {
              var sourceDraggableEntryPath = _sourcePath,
                  movedPath = pathMap[sourceDraggableEntryPath],
                  found = movedPath !== undefined;

              return found;
            }),
                movedPath = pathMap[_sourcePath];

            this.moveDraggableEntry(draggableEntry, _sourcePath, movedPath);
          }
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, movedPath) {
      var draggableEntryDirectory = draggableEntry.isDirectory();

      if (draggableEntryDirectory) {
        var directory = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        movedDirectoryPath = movedPath;

        this.moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath);
      } else {
        var file = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        movedFilePath = movedPath; ///

        this.moveFile(file, sourceFilePath, movedFilePath);
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
    } else {
      return false;
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
    } else {
      return false;
    }
  });

  return element;
}

function first(array) {
  return array[0];
}
function last(array) {
  return array[array.length - 1];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwidXRpbCIsIm9wdGlvbnMiLCJFbGVtZW50IiwiRHJvcFRhcmdldCIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJwYXRoTWFwcyIsImRvbmUiLCJkcm9wVGFyZ2V0cyIsImRyb3BUYXJnZXQiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwiZm91bmQiLCJzcGxpY2UiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhcmVPdmVybGFwcGluZyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwicmVkdWNlIiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRNYXJrZWQiLCJpc01hcmtlZCIsIm1hcmtlZCIsInJlbW92ZU1hcmtlciIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwibGFzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRHJhZ2dhYmxlRW50cnkiLCJiaW5kIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYWxsYmFjayIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01FLFVBQVVGLFFBQVEsV0FBUixDQURoQjs7SUFHUUcsTyxHQUFZSixJLENBQVpJLE87O0lBRUZDLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQTBFO0FBQUEsUUFBcERDLFdBQW9ELHVFQUF0QyxVQUFTQyxRQUFULEVBQW1CQyxJQUFuQixFQUF5QjtBQUFFQTtBQUFTLEtBQUU7O0FBQUE7O0FBQUEsd0hBQ2xFSCxRQURrRTs7QUFHeEUsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsVUFBS0csV0FBTCxHQUFtQixFQUFuQjtBQUx3RTtBQU16RTs7OztrQ0FFYUMsVSxFQUFZO0FBQ3hCLFdBQUtELFdBQUwsQ0FBaUJFLElBQWpCLENBQXNCRCxVQUF0QjtBQUNEOzs7cUNBRWdCQSxVLEVBQVk7QUFDM0IsVUFBTUUsUUFBUUMsUUFBUSxLQUFLSixXQUFiLEVBQTBCQyxVQUExQixDQUFkO0FBQUEsVUFDTUksUUFBU0YsVUFBVSxDQUFDLENBRDFCOztBQUdBLFVBQUlFLEtBQUosRUFBVztBQUNULGFBQUtMLFdBQUwsQ0FBaUJNLE1BQWpCLENB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QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBTzlELEtBQVA7QUFDRDs7QUFFRCxTQUFTd0MsSUFBVCxDQUFja0IsS0FBZCxFQUFxQkssUUFBckIsRUFBK0I7QUFDN0IsTUFBSUosVUFBVSxJQUFkOztBQUVBRCxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QjtBQUNsQyxRQUFJRSxTQUFTRixjQUFULENBQUosRUFBOEI7QUFDNUJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0Q7O0FBRUQsU0FBU2hDLEtBQVQsQ0FBZStCLEtBQWYsRUFBc0I7QUFBRSxTQUFPQSxNQUFNLENBQU4sQ0FBUDtBQUFrQjtBQUMxQyxTQUFTakMsSUFBVCxDQUFjaUMsS0FBZCxFQUFxQjtBQUFFLFNBQU9BLE1BQU1BLE1BQU1NLE1BQU4sR0FBZSxDQUFyQixDQUFQO0FBQWlDIiwiZmlsZSI6ImRyb3BUYXJnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBEcm9wVGFyZ2V0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKHBhdGhNYXBzLCBkb25lKSB7IGRvbmUoKTsgfSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BUYXJnZXRzID0gW107XG4gIH1cblxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBpbmRleCA9IGluZGV4T2YodGhpcy5kcm9wVGFyZ2V0cywgZHJvcFRhcmdldCksXG4gICAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihkcm9wVGFyZ2V0VG9CZU1hcmtlZCwgZHJvcFRhcmdldCkge1xuICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlZERyb3BUYXJnZXQsIGRyb3BUYXJnZXQpIHtcbiAgICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBwYXRoTWFwID0gZmluZChwYXRoTWFwcywgZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgICAgICB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIG1vdmVkRGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgbW92ZWRGaWxlUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLm1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIGxldCBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZmluZChhcnJheSwgY2FsbGJhY2spIHtcbiAgbGV0IGVsZW1lbnQgPSBudWxsO1xuICBcbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmIChjYWxsYmFjayhjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGVsZW1lbnQ7ICBcbn1cblxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdOyB9XG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxuIl19