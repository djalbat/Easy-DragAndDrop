'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    Entry = require('./explorer/entry'),
    DragEvent = require('./dragEvent'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

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
    key: 'isOverlappingDraggableElement',
    value: function isOverlappingDraggableElement(draggableElementDraggingBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds),
          overlappingDraggableElement = boundsOverlappingDraggableElement;

      return overlappingDraggableElement;
    }
  }, {
    key: 'dragEventHandler',
    value: function dragEventHandler(dragEvent) {
      var action = dragEvent.getAction(),
          draggableElement = dragEvent.getDraggableElement(),
          entry = draggableElement,
          ///
      startDragging = false;

      switch (action) {
        case DragEvent.actions.START_DRAGGING:
          startDragging = this.startDragging(entry);
          break;

        case DragEvent.actions.STOP_DRAGGING:
          this.stopDragging(entry);
          break;

        case DragEvent.actions.DRAGGING:
          this.dragging(entry);
          break;
      }

      return startDragging;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      var startDragging = false,
          marked = this.isMarked();

      if (!marked) {
        this.addMarker(entry);

        startDragging = true;
      }

      return startDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(entry);

        if (!toBeMarked) {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          if (droppableElementToBeMarked !== null) {
            droppableElementToBeMarked.addMarker(entry);

            this.removeMarker();
          }
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(entry);

        var markedDroppableElementToBeMarked = markedDroppableElement.isToBeMarked(entry);

        if (!markedDroppableElementToBeMarked) {
          markedDroppableElement.removeMarker();

          this.addMarkerInPlace(entry);
        }
      }
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var bounds = this.getBounds(),
          draggingBounds = entry.getDraggingBounds(),
          overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
          toBeMarked = overlappingDraggingBounds; ///

      return toBeMarked;
    }
  }, {
    key: 'getDroppableElementToBeMarked',
    value: function getDroppableElementToBeMarked(entry) {
      var droppableElementToBeMarked = this.droppableElements.reduce(function (droppableElementToBeMarked, droppableElement) {
        if (droppableElementToBeMarked === null) {
          if (droppableElement.isToBeMarked(entry)) {
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
    key: 'addMarker',
    value: function addMarker(entry) {
      var entryName = entry.getName(),
          entryType = entry.getType(),
          markerName = entryName,
          ///
      marker;

      switch (entryType) {
        case Entry.types.FILE:
          marker = FileMarker.clone(markerName);
          break;

        case Entry.types.DIRECTORY:
          marker = DirectoryMarker.clone(markerName);
          break;
      }

      this.append(marker);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var marker = this.retrieveMarker();

      marker.remove();
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
    key: 'isMarked',
    value: function isMarked() {
      var marker = this.retrieveMarker(),
          marked = marker !== null; ///

      return marked;
    }
  }, {
    key: 'retrieveMarker',
    value: function retrieveMarker() {
      var childElements = this.childElements(),
          marker = childElements.reduce(function (marker, childElement) {
        if (marker === null) {
          if (childElement instanceof FileMarker || childElement instanceof DirectoryMarker) {
            marker = childElement; ///
          }
        }

        return marker;
      }, null);

      return marker;
    }
  }, {
    key: 'moveEntries',
    value: function moveEntries(entries, sourcePath, targetPath, done) {
      var entryPathMaps = entries.map(function (entry) {
        var entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = targetPath === null ? null : util.replaceTopPath(entryPath, sourcePath, targetPath); ///

        var entryPathMap = {};

        entryPathMap[sourceEntryPath] = targetEntryPath;

        return entryPathMap;
      });

      this.moveHandler(entryPathMaps, function () {
        entries.forEach(function (entry) {
          var entryPath = entry.getPath(),
              sourcePath = entryPath,
              ///
          pathMap = find(entryPathMaps, function (entryPathMap) {
            var sourceEntryPath = sourcePath,
                movedPath = entryPathMap[sourceEntryPath],
                found = movedPath !== undefined;

            return found;
          }),
              movedPath = pathMap[sourcePath];

          this.moveEntry(entry, sourcePath, movedPath);
        }.bind(this));
      }.bind(this));

      done();
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, movedPath) {
      var entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourcePath, movedPath) : this.moveFile(entry, sourcePath, movedPath);
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

function find(array, cb) {
  var element = null;

  array.some(function (currentElement) {
    if (cb(currentElement)) {
      element = currentElement;

      return true;
    } else {
      return false;
    }
  });

  return element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJhY3Rpb24iLCJnZXRBY3Rpb24iLCJkcmFnZ2FibGVFbGVtZW50IiwiZ2V0RHJhZ2dhYmxlRWxlbWVudCIsImVudHJ5Iiwic3RhcnREcmFnZ2luZyIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsIlNUT1BfRFJBR0dJTkciLCJzdG9wRHJhZ2dpbmciLCJEUkFHR0lORyIsImRyYWdnaW5nIiwibWFya2VkIiwiaXNNYXJrZWQiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsInRvQmVNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImFkZE1hcmtlckluUGxhY2UiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsInJlZHVjZSIsImRyb3BwYWJsZUVsZW1lbnRNYXJrZWQiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm1hcmtlck5hbWUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJjbG9uZSIsIkRJUkVDVE9SWSIsImFwcGVuZCIsInJldHJpZXZlTWFya2VyIiwicmVtb3ZlIiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImRvbmUiLCJlbnRyeVBhdGhNYXBzIiwibWFwIiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsInNvdXJjZUVudHJ5UGF0aCIsInRhcmdldEVudHJ5UGF0aCIsInJlcGxhY2VUb3BQYXRoIiwiZW50cnlQYXRoTWFwIiwiZm9yRWFjaCIsInBhdGhNYXAiLCJmaW5kIiwibW92ZWRQYXRoIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5SXNEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsIm1vdmVEaXJlY3RvcnkiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2IiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7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LEtBQWQsRUFBcUIwQyxVQUFyQixFQUFpQ2MsU0FBakMsQ0FGSjtBQUdEOzs7O0VBaFA0Qm5GLE87O0FBbVAvQjJGLE9BQU9DLE9BQVAsR0FBaUJ0RixnQkFBakI7O0FBRUEsU0FBU08sT0FBVCxDQUFpQmdGLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQztBQUMvQixNQUFJbEYsUUFBUSxDQUFDLENBQWI7O0FBRUFpRixRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QkMsbUJBQXpCLEVBQThDO0FBQ3ZELFFBQUlELG1CQUFtQkYsT0FBdkIsRUFBZ0M7QUFDOUJsRixjQUFRcUYsbUJBQVI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9yRixLQUFQO0FBQ0Q7O0FBRUQsU0FBU3NFLElBQVQsQ0FBY1csS0FBZCxFQUFxQkssRUFBckIsRUFBeUI7QUFDdkIsTUFBSUosVUFBVSxJQUFkOztBQUVBRCxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QjtBQUNsQyxRQUFJRSxHQUFHRixjQUFILENBQUosRUFBd0I7QUFDdEJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0QiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQpIHtcbiAgICB2YXIgYWN0aW9uID0gZHJhZ0V2ZW50LmdldEFjdGlvbigpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50ID0gZHJhZ0V2ZW50LmdldERyYWdnYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgZW50cnkgPSBkcmFnZ2FibGVFbGVtZW50LCAgLy8vXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgc3RhcnREcmFnZ2luZyA9IGZhbHNlLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKCFtYXJrZWQpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgc3RhcnREcmFnZ2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGVudHJ5KTtcblxuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5pc1RvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICBpZiAoIW1hcmtlZERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBlbnRyeS5nZXREcmFnZ2luZ0JvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnaW5nQm91bmRzKSxcbiAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaXNUb0JlTWFya2VkKGVudHJ5KSkgeyAvLy9cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpIHtcbiAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChtYXJrZWREcm9wcGFibGVFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50TWFya2VkID0gZHJvcHBhYmxlRWxlbWVudC5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgbW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHZhciBlbnRyeVBhdGhNYXBzID0gZW50cmllcy5tYXAoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlVG9wUGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cbiAgICAgIFxuICAgICAgdmFyIGVudHJ5UGF0aE1hcCA9IHt9O1xuXG4gICAgICBlbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSA9IHRhcmdldEVudHJ5UGF0aDtcbiAgICAgIFxuICAgICAgcmV0dXJuIGVudHJ5UGF0aE1hcDtcbiAgICB9KTtcbiAgICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKGVudHJ5UGF0aE1hcCkge1xuICAgICAgICAgICAgICB2YXIgc291cmNlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kOyAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICBkb25lKCk7XG4gIH1cblxuICBtb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciBlbnRyeUlzRGlyZWN0b3J5ID0gZW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGVudHJ5SXNEaXJlY3RvcnkgP1xuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIDpcbiAgICAgICAgdGhpcy5tb3ZlRmlsZShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BwYWJsZUVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGVsZW1lbnQpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYikge1xuICB2YXIgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNiKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIl19