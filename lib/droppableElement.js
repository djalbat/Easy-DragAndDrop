'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util');

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
        draggableEntries.forEach(function (draggableEntry) {
          var draggableEntryPath = draggableEntry.getPath(),
              sourcePath = draggableEntryPath,
              ///
          pathMap = find(pathMaps, function (pathMap) {
            var sourceDraggableEntryPath = sourcePath,
                movedPath = pathMap[sourceDraggableEntryPath],
                found = movedPath !== undefined;

            return found;
          }),
              movedPath = pathMap[sourcePath],
              removeEmptyParentDirectories = pathMap.removeEmptyParentDirectories; ///

          this.moveDraggableEntry(draggableEntry, sourcePath, movedPath, removeEmptyParentDirectories);
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, movedPath) {
      var removeEmptyParentDirectories = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var draggableEntryDirectory = draggableEntry.isDirectory();

      if (draggableEntryDirectory) {
        var directory = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        movedDirectoryPath = movedPath;

        this.moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath, removeEmptyParentDirectories);
      } else {
        var file = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        movedFilePath = movedPath; ///

        this.moveFile(file, sourceFilePath, movedFilePath, removeEmptyParentDirectories);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsInJlZHVjZSIsImlzVG9CZU1hcmtlZCIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJkcm9wcGFibGVFbGVtZW50TWFya2VkIiwiaXNNYXJrZWQiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsInBhdGhNYXBzIiwicGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyIsImZvckVhY2giLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwibW92ZURyYWdnYWJsZUVudHJ5IiwiYmluZCIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5IiwiaXNEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwibW92ZWREaXJlY3RvcnlQYXRoIiwibW92ZURpcmVjdG9yeSIsImZpbGUiLCJzb3VyY2VGaWxlUGF0aCIsIm1vdmVkRmlsZVBhdGgiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDs7SUFFTUcsZ0I7OztBQUNKLDRCQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUFtQztBQUFBOztBQUFBLG9JQUMzQkQsUUFEMkI7O0FBR2pDLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtDLGlCQUFMLEdBQXlCLEVBQXpCO0FBTGlDO0FBTWxDOzs7O3dDQUVtQkMsZ0IsRUFBa0I7QUFDcEMsV0FBS0QsaUJBQUwsQ0FBdUJFLElBQXZCLENBQTRCRCxnQkFBNUI7QUFDRDs7OzJDQUVzQkEsZ0IsRUFBa0I7QUFDdkMsVUFBSUUsUUFBUUMsUUFBUSxLQUFLSixpQkFBYixFQUFnQ0MsZ0JBQWhDLENBQVo7QUFBQSxVQUNJSSxRQUFTRixVQUFVLENBQUMsQ0FEeEI7O0FBR0EsVUFBSUUsS0FBSixFQUFXO0FBQ1QsYUFBS0wsaUJBQUwsQ0FBdUJNLE1BQXZCLENBQThCSCxLQUE5QixFQUFxQyxDQUFyQztBQUNEO0FBQ0Y7OztnREFFMkJJLDZCLEVBQStCO0FBQ3pELFVBQUlDLFNBQVMsS0FBS0MsU0FBTCxFQUFiO0FBQUEsVUFDSUMsa0NBQWtDRixPQUFPRyxjQUFQLENBQXNCSiw2QkFBdEIsQ0FEdEM7QUFBQSxVQUVJSyw0QkFBNEJGLCtCQUZoQzs7QUFJQSxhQUFPRSx5QkFBUDtBQUNEOzs7a0RBRTZCQyxjLEVBQWdCO0FBQzVDLFVBQUlDLDZCQUE2QixLQUFLZCxpQkFBTCxDQUF1QmUsTUFBdkIs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RzJCOztBQUVoQyxhQUFLYyxRQUFMLENBQWNILElBQWQsRUFBb0JDLGNBQXBCLEVBQW9DQyxhQUFwQyxFQUFtRFgsNEJBQW5EO0FBQ0Q7QUFDRjs7OztFQWhINEIxQyxPOztBQW1IL0J1RCxPQUFPQyxPQUFQLEdBQWlCdEQsZ0JBQWpCOztBQUVBLFNBQVNPLE9BQVQsQ0FBaUJnRCxLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUM7QUFDL0IsTUFBSWxELFFBQVEsQ0FBQyxDQUFiOztBQUVBaUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUJDLG1CQUF6QixFQUE4QztBQUN2RCxRQUFJRCxtQkFBbUJGLE9BQXZCLEVBQWdDO0FBQzlCbEQsY0FBUXFELG1CQUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPckQsS0FBUDtBQUNEOztBQUVELFNBQVM4QixJQUFULENBQWNtQixLQUFkLEVBQXFCSyxRQUFyQixFQUErQjtBQUM3QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLFNBQVNGLGNBQVQsQ0FBSixFQUE4QjtBQUM1QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQocGF0aE1hcHMsIGZ1bmN0aW9uKHBhdGhNYXApIHtcbiAgICAgICAgICAgICAgdmFyIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdLFxuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHBhdGhNYXAucmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllczsgIC8vL1xuXG4gICAgICAgIHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGZhbHNlKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgdmFyIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgIG1vdmVkRGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZpbGUgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgc291cmNlRmlsZVBhdGggPSBzb3VyY2VQYXRoLCAgLy8vXG4gICAgICAgICAgbW92ZWRGaWxlUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLm1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIHZhciBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZmluZChhcnJheSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsZW1lbnQgPSBudWxsO1xuICBcbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmIChjYWxsYmFjayhjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGVsZW1lbnQ7ICBcbn1cbiJdfQ==