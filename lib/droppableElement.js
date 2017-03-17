'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    options = require('./options');

var DroppableElement = function (_Element) {
  _inherits(DroppableElement, _Element);

  function DroppableElement(selector, moveHandler) {
    _classCallCheck(this, DroppableElement);

    var _this = _possibleConstructorReturn(this, (DroppableElement.__proto__ || Object.getPrototypeOf(DroppableElement)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.droppableElements = [];
    return _this;
  }

  _createClass(DroppableElement, [{
    key: 'addDroppableElement',
    value: function addDroppableElement(droppableElement) {
      this.droppableElements.push(droppableElement);
    }
  }, {
    key: 'removeDroppableElement',
    value: function removeDroppableElement(droppableElement) {
      var index = indexOf(this.droppableElements, droppableElement),
          found = index !== -1;

      if (found) {
        this.droppableElements.splice(index, 1);
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
    key: 'getDroppableElementToBeMarked',
    value: function getDroppableElementToBeMarked(draggableEntry) {
      var droppableElementToBeMarked = this.droppableElements.reduce(function (droppableElementToBeMarked, droppableElement) {
        if (droppableElementToBeMarked === null) {
          if (droppableElement.isToBeMarked(draggableEntry)) {
            ///
            droppableElementToBeMarked = droppableElement;
          }
        }

        return droppableElementToBeMarked;
      }, null);

      return droppableElementToBeMarked;
    }
  }, {
    key: 'getMarkedDroppableElement',
    value: function getMarkedDroppableElement() {
      var markedDroppableElement = this.droppableElements.reduce(function (markedDroppableElement, droppableElement) {
        if (markedDroppableElement === null) {
          var droppableElementMarked = droppableElement.isMarked();

          if (droppableElementMarked) {
            markedDroppableElement = droppableElement;
          }
        }

        return markedDroppableElement;
      }, null);

      return markedDroppableElement;
    }
  }, {
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarker();
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.removeMarker();
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

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIm9wdGlvbnMiLCJEcm9wcGFibGVFbGVtZW50Iiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsImRyb3BwYWJsZUVsZW1lbnRzIiwiZHJvcHBhYmxlRWxlbWVudCIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJmb3VuZCIsInNwbGljZSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJpc1RvQmVNYXJrZWQiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZHJvcHBhYmxlRWxlbWVudE1hcmtlZCIsImlzTWFya2VkIiwibWFya2VkIiwicmVtb3ZlTWFya2VyIiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImRvbmUiLCJwYXRoTWFwcyIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJsYXN0IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsIm1vdmVkUGF0aCIsInVuZGVmaW5lZCIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsImJpbmQiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnkiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJtb3ZlZEZpbGVQYXRoIiwibW92ZUZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXJyYXkiLCJlbGVtZW50Iiwic29tZSIsImN1cnJlbnRFbGVtZW50IiwiY3VycmVudEVsZW1lbnRJbmRleCIsImNhbGxiYWNrIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7O0FBR0EsSUFBTUMsT0FBT0YsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRyxVQUFVSCxRQUFRLFdBQVIsQ0FEaEI7O0lBR01JLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JELFFBRDJCOztBQUdqQyxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLQyxpQkFBTCxHQUF5QixFQUF6QjtBQUxpQztBQU1sQzs7Ozt3Q0FFbUJDLGdCLEVBQWtCO0FBQ3BDLFdBQUtELGlCQUFMLENBQXVCRSxJQUF2QixDQUE0QkQsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0JBLGdCLEVBQWtCO0FBQ3ZDLFVBQU1FLFFBQVFDLFFBQVEsS0FBS0osaUJBQWIsRUFBZ0NDLGdCQUFoQyxDQUFkO0FBQUEsVUFDTUksUUFBU0YsVUFBVSxDQUFDLENBRDFCOztBQUdBLFVBQUlFLEtBQUosRUFBVztBQUNULGFBQUtMLGlCQUFMLENBQXVCTSxN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QUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPaEUsS0FBUDtBQUNEOztBQUVELFNBQVMwQyxJQUFULENBQWNrQixLQUFkLEVBQXFCSyxRQUFyQixFQUErQjtBQUM3QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLFNBQVNGLGNBQVQsQ0FBSixFQUE4QjtBQUM1QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRDs7QUFFRCxTQUFTaEMsS0FBVCxDQUFlK0IsS0FBZixFQUFzQjtBQUFFLFNBQU9BLE1BQU0sQ0FBTixDQUFQO0FBQWtCO0FBQzFDLFNBQVNqQyxJQUFULENBQWNpQyxLQUFkLEVBQXFCO0FBQUUsU0FBT0EsTUFBTUEsTUFBTU0sTUFBTixHQUFlLENBQXJCLENBQVA7QUFBaUMiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICAgIGZvdW5kID0gKGluZGV4ICE9PSAtMSk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBkcm9wcGFibGVFbGVtZW50TWFya2VkID0gZHJvcHBhYmxlRWxlbWVudC5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQocGF0aE1hcHMsIGZ1bmN0aW9uKHBhdGhNYXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSxcbiAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdO1xuXG4gICAgICAgICAgdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICBtb3ZlZERpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgIG1vdmVkRmlsZVBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5tb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICBsZXQgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGxldCBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuZnVuY3Rpb24gbGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07IH1cbiJdfQ==