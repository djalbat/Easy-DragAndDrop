'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    Element = easy.Element;

var util = require('./util'),
    options = require('./options');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcFRhcmdldCIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJwYXRoTWFwcyIsImRvbmUiLCJkcm9wVGFyZ2V0cyIsImRyb3BUYXJnZXQiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwiZm91bmQiLCJzcGxpY2UiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhcmVPdmVybGFwcGluZyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwicmVkdWNlIiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRNYXJrZWQiLCJpc01hcmtlZCIsIm1hcmtlZCIsInJlbW92ZU1hcmtlciIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwibGFzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRHJhZ2dhYmxlRW50cnkiLCJiaW5kIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYWxsYmFjayIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFVBQVVGLEtBQUtFLE9BRHJCOztBQUdBLElBQU1DLE9BQU9GLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxXQUFSLENBRGhCOztJQUdNSSxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUEwRTtBQUFBLFFBQXBEQyxXQUFvRCx1RUFBdEMsVUFBU0MsUUFBVCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFBRUE7QUFBUyxLQUFFOztBQUFBOztBQUFBLHdIQUNsRUgsUUFEa0U7O0FBR3hFLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtHLFdBQUwsR0FBbUIsRUFBbkI7QUFMd0U7QUFNekU7Ozs7a0NBRWFDLFUsRUFBWTtBQUN4QixXQUFLRCxXQUFMLENBQWlCRSxJQUFqQixDQUFzQkQsVUFBdEI7QUFDRDs7O3FDQUVnQkEsVSxFQUFZO0FBQzNCLFVBQU1FLFFBQVFDLFFBQVEsS0FBS0osV0FBYixFQUEwQkMsVUFBMUIsQ0FBZDtBQUFBLFVBQ01JLFFBQVNGLFVBQVUsQ0FBQyxDQUQxQjs7QUFHQSxVQUFJRSxLQUFKLEVBQVc7QUFDVCxhQUFLTCxXQUFMLENBQWlCTSxNQUFq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QUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU85RCxLQUFQO0FBQ0Q7O0FBRUQsU0FBU3dDLElBQVQsQ0FBY2tCLEtBQWQsRUFBcUJLLFFBQXJCLEVBQStCO0FBQzdCLE1BQUlKLFVBQVUsSUFBZDs7QUFFQUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUI7QUFDbEMsUUFBSUUsU0FBU0YsY0FBVCxDQUFKLEVBQThCO0FBQzVCRixnQkFBVUUsY0FBVjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT0YsT0FBUDtBQUNEOztBQUVELFNBQVNoQyxLQUFULENBQWUrQixLQUFmLEVBQXNCO0FBQUUsU0FBT0EsTUFBTSxDQUFOLENBQVA7QUFBa0I7QUFDMUMsU0FBU2pDLElBQVQsQ0FBY2lDLEtBQWQsRUFBcUI7QUFBRSxTQUFPQSxNQUFNQSxNQUFNTSxNQUFOLEdBQWUsQ0FBckIsQ0FBUDtBQUFpQyIsImZpbGUiOiJkcm9wVGFyZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgRWxlbWVudCA9IGVhc3kuRWxlbWVudDtcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5jbGFzcyBEcm9wVGFyZ2V0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKHBhdGhNYXBzLCBkb25lKSB7IGRvbmUoKTsgfSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BUYXJnZXRzID0gW107XG4gIH1cblxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBpbmRleCA9IGluZGV4T2YodGhpcy5kcm9wVGFyZ2V0cywgZHJvcFRhcmdldCksXG4gICAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihkcm9wVGFyZ2V0VG9CZU1hcmtlZCwgZHJvcFRhcmdldCkge1xuICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlZERyb3BUYXJnZXQsIGRyb3BUYXJnZXQpIHtcbiAgICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBwYXRoTWFwID0gZmluZChwYXRoTWFwcywgZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgICAgICB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIG1vdmVkRGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgbW92ZWRGaWxlUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLm1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIGxldCBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZmluZChhcnJheSwgY2FsbGJhY2spIHtcbiAgbGV0IGVsZW1lbnQgPSBudWxsO1xuICBcbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmIChjYWxsYmFjayhjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGVsZW1lbnQ7ICBcbn1cblxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdOyB9XG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxuIl19