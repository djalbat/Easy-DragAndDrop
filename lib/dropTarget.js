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

  function DropTarget(selector, moveHandler) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcFRhcmdldCIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJkcm9wVGFyZ2V0cyIsImRyb3BUYXJnZXQiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwiZm91bmQiLCJzcGxpY2UiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhcmVPdmVybGFwcGluZyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwicmVkdWNlIiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRNYXJrZWQiLCJpc01hcmtlZCIsIm1hcmtlZCIsInJlbW92ZU1hcmtlciIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwicGF0aE1hcHMiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwibGFzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRHJhZ2dhYmxlRW50cnkiLCJiaW5kIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYWxsYmFjayIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFVBQVVGLEtBQUtFLE9BRHJCOztBQUdBLElBQU1DLE9BQU9GLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxXQUFSLENBRGhCOztJQUdNSSxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSx3SEFDM0JELFFBRDJCOztBQUdqQyxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBTGlDO0FBTWxDOzs7O2tDQUVhQyxVLEVBQVk7QUFDeEIsV0FBS0QsV0FBTCxDQUFpQkUsSUFBakIsQ0FBc0JELFVBQXRCO0FBQ0Q7OztxQ0FFZ0JBLFUsRUFBWTtBQUMzQixVQUFNRSxRQUFRQyxRQUFRLEtBQUtKLFdBQWIsRUFBMEJDLFVBQTFCLENBQWQ7QUFBQSxVQUNNSSxRQUFTRixVQUFVLENBQUMsQ0FEMUI7O0FBR0EsVUFBSUUsS0FBSixFQUFXO0FBQ1QsYUFBS0wsV0FBTCxDQUFpQk0sTUFBakIsQ0FBd0JILEtBQXhCLEVBQStCLENBQS9CO0FBQ0Q7QUFDRjs7O2dEQUUyQkksNkIsRUFBK0I7QUFD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aEUsS0FBUDtBQUNEOztBQUVELFNBQVMwQyxJQUFULENBQWNrQixLQUFkLEVBQXFCSyxRQUFyQixFQUErQjtBQUM3QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLFNBQVNGLGNBQVQsQ0FBSixFQUE4QjtBQUM1QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRDs7QUFFRCxTQUFTaEMsS0FBVCxDQUFlK0IsS0FBZixFQUFzQjtBQUFFLFNBQU9BLE1BQU0sQ0FBTixDQUFQO0FBQWtCO0FBQzFDLFNBQVNqQyxJQUFULENBQWNpQyxLQUFkLEVBQXFCO0FBQUUsU0FBT0EsTUFBTUEsTUFBTU0sTUFBTixHQUFlLENBQXJCLENBQVA7QUFBaUMiLCJmaWxlIjoiZHJvcFRhcmdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5LkVsZW1lbnQ7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKTtcblxuY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wVGFyZ2V0cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcFRhcmdldChkcm9wVGFyZ2V0KSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0KSB7XG4gICAgY29uc3QgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcFRhcmdldHMsIGRyb3BUYXJnZXQpLFxuICAgICAgICAgIGZvdW5kID0gKGluZGV4ICE9PSAtMSk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5kcm9wVGFyZ2V0cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcFRhcmdldFRvQmVNYXJrZWQsIGRyb3BUYXJnZXQpIHtcbiAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcFRhcmdldC5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wVGFyZ2V0LCBkcm9wVGFyZ2V0KSB7XG4gICAgICBpZiAobWFya2VkRHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQocGF0aE1hcHMsIGZ1bmN0aW9uKHBhdGhNYXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSxcbiAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdO1xuXG4gICAgICAgICAgdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICBtb3ZlZERpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgIG1vdmVkRmlsZVBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5tb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcFRhcmdldDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICBsZXQgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGxldCBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuZnVuY3Rpb24gbGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07IH1cbiJdfQ==