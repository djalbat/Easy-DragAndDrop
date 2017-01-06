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
            var sourcePath = draggableEntryPath,
                ///
            pathMap = find(pathMaps, function (pathMap) {
              var sourceDraggableEntryPath = sourcePath,
                  movedPath = pathMap[sourceDraggableEntryPath],
                  found = movedPath !== undefined;

              return found;
            }),
                movedPath = pathMap[sourcePath];

            this.moveDraggableEntry(draggableEntry, sourcePath, movedPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIm9wdGlvbnMiLCJEcm9wcGFibGVFbGVtZW50Iiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsImRyb3BwYWJsZUVsZW1lbnRzIiwiZHJvcHBhYmxlRWxlbWVudCIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJmb3VuZCIsInNwbGljZSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJpc1RvQmVNYXJrZWQiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZHJvcHBhYmxlRWxlbWVudE1hcmtlZCIsImlzTWFya2VkIiwibWFya2VkIiwicmVtb3ZlTWFya2VyIiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImRvbmUiLCJwYXRoTWFwcyIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJsYXN0IiwiZmlyc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsIm1vdmVkUGF0aCIsInVuZGVmaW5lZCIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsImJpbmQiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnkiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJtb3ZlZEZpbGVQYXRoIiwibW92ZUZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXJyYXkiLCJlbGVtZW50Iiwic29tZSIsImN1cnJlbnRFbGVtZW50IiwiY3VycmVudEVsZW1lbnRJbmRleCIsImNhbGxiYWNrIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxVQUFVSCxRQUFRLFdBQVIsQ0FEZDs7SUFHTUksZ0I7OztBQUNKLDRCQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUFtQztBQUFBOztBQUFBLG9JQUMzQkQsUUFEMkI7O0FBR2pDLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtDLGlCQUFMLEdBQXlCLEVBQXpCO0FBTGlDO0FBTWxDOzs7O3dDQUVtQkMsZ0IsRUFBa0I7QUFDcEMsV0FBS0QsaUJBQUwsQ0FBdUJFLElBQXZCLENBQTRCRCxnQkFBNUI7QUFDRDs7OzJDQUVzQkEsZ0IsRUFBa0I7QUFDdkMsVUFBSUUsUUFBUUMsUUFBUSxLQUFLSixpQkFBYixFQUFnQ0MsZ0JBQWhDLENBQVo7QUFBQSxVQUNJSSxRQUFTRixVQUFVLENBQUMsQ0FEeEI7O0FBR0EsVUFBSUUsS0FBSixFQUFXO0FBQ1QsYUFBS0wsaUJBQUwsQ0FBdUJNLE1B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Ujs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT2hFLEtBQVA7QUFDRDs7QUFFRCxTQUFTMEMsSUFBVCxDQUFja0IsS0FBZCxFQUFxQkssUUFBckIsRUFBK0I7QUFDN0IsTUFBSUosVUFBVSxJQUFkOztBQUVBRCxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QjtBQUNsQyxRQUFJRSxTQUFTRixjQUFULENBQUosRUFBOEI7QUFDNUJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0Q7O0FBRUQsU0FBU2hDLEtBQVQsQ0FBZStCLEtBQWYsRUFBc0I7QUFBRSxTQUFPQSxNQUFNLENBQU4sQ0FBUDtBQUFrQjtBQUMxQyxTQUFTakMsSUFBVCxDQUFjaUMsS0FBZCxFQUFxQjtBQUFFLFNBQU9BLE1BQU1BLE1BQU1NLE1BQU4sR0FBZSxDQUFyQixDQUFQO0FBQWlDIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICB2YXIgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBwYXRoTWFwID0gZmluZChwYXRoTWFwcywgZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgICAgICB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIHZhciBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICBtb3ZlZERpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlID0gZHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgIG1vdmVkRmlsZVBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5tb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuZnVuY3Rpb24gbGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07IH1cbiJdfQ==