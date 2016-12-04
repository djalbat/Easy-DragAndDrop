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
    value: function isOverlappingDraggableElement(draggableElementCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableElement = bounds.areOverlapping(draggableElementCollapsedBounds),
          overlappingDraggableElement = boundsOverlappingDraggableElement;

      return overlappingDraggableElement;
    }
  }, {
    key: 'dragEventHandler',
    value: function dragEventHandler(dragEvent, done) {
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
          this.stopDragging(entry, done);
          break;

        case DragEvent.actions.DRAGGING:
          this.dragging(entry);
          break;

        case DragEvent.actions.ESCAPE_DRAGGING:
          this.escapeDragging(entry);
          break;
      }

      return startDragging;
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
      var entryPathMaps = this.entryPathMapsFromEntries(entries, sourcePath, targetPath);

      function moveEntriesDone() {
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

        done();
      }

      this.moveHandler(entryPathMaps, moveEntriesDone.bind(this));
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, movedPath) {
      var entryDirectory = entry.isDirectory();

      if (entryDirectory) {
        var directory = entry; ///

        this.moveDirectory(directory, sourcePath, movedPath);
      } else {
        var file = entry; ///

        this.moveFile(file, sourcePath, movedPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudENvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiZHJhZ0V2ZW50IiwiZG9uZSIsImFjdGlvbiIsImdldEFjdGlvbiIsImRyYWdnYWJsZUVsZW1lbnQiLCJnZXREcmFnZ2FibGVFbGVtZW50IiwiZW50cnkiLCJzdGFydERyYWdnaW5nIiwiYWN0aW9ucyIsIlNUQVJUX0RSQUdHSU5HIiwiU1RPUF9EUkFHR0lORyIsInN0b3BEcmFnZ2luZyIsIkRSQUdHSU5HIiwiZHJhZ2dpbmciLCJFU0NBUEVfRFJBR0dJTkciLCJlc2NhcGVEcmFnZ2luZyIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwicmVkdWNlIiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImRyb3BwYWJsZUVsZW1lbnRNYXJrZWQiLCJpc01hcmtlZCIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImVudHJ5UGF0aE1hcHMiLCJlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMiLCJtb3ZlRW50cmllc0RvbmUiLCJmb3JFYWNoIiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsInBhdGhNYXAiLCJmaW5kIiwiZW50cnlQYXRoTWFwIiwic291cmNlRW50cnlQYXRoIiwibW92ZWRQYXRoIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5RGlyZWN0b3J5IiwiaXNEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYWxsYmFjayJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxrQkFBUixDQURaO0FBQUEsSUFFSUksWUFBWUosUUFBUSxhQUFSLENBRmhCO0FBQUEsSUFHSUssYUFBYUwsUUFBUSw2QkFBUixDQUhqQjtBQUFBLElBSUlNLGtCQUFrQk4sUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTU8sZ0I7OztBQUNKLDRCQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUFtQztBQUFBOztBQUFBLG9JQUMzQkQsUUFEMkI7O0FBR2pDLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtDLGlCQUFMLEdBQXlCLEVBQXpCO0FBTGlDO0FBTWxDOzs7O3dDQUVtQkMsZ0IsRUFBa0I7QUFDcEMsV0FBS0QsaUJBQUws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QUE4QztBQUN2RCxRQUFJRCxtQkFBbUJGLE9BQXZCLEVBQWdDO0FBQzlCNUUsY0FBUStFLG1CQUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPL0UsS0FBUDtBQUNEOztBQUVELFNBQVM0RCxJQUFULENBQWNlLEtBQWQsRUFBcUJLLFFBQXJCLEVBQStCO0FBQzdCLE1BQUlKLFVBQVUsSUFBZDs7QUFFQUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUI7QUFDbEMsUUFBSUUsU0FBU0YsY0FBVCxDQUFKLEVBQThCO0FBQzVCRixnQkFBVUUsY0FBVjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT0YsT0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KSxcbiAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnRDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVsZW1lbnRDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQsIGRvbmUpIHtcbiAgICB2YXIgYWN0aW9uID0gZHJhZ0V2ZW50LmdldEFjdGlvbigpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50ID0gZHJhZ0V2ZW50LmdldERyYWdnYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgZW50cnkgPSBkcmFnZ2FibGVFbGVtZW50LCAgLy8vXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkVTQ0FQRV9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5lc2NhcGVEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5pc1RvQmVNYXJrZWQoZW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCkge1xuICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcHBhYmxlRWxlbWVudCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IHRoaXMuZW50cnlQYXRoTWFwc0Zyb21FbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgZnVuY3Rpb24gbW92ZUVudHJpZXNEb25lKCkge1xuICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBwYXRoTWFwID0gZmluZChlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbihlbnRyeVBhdGhNYXApIHtcbiAgICAgICAgICAgICAgdmFyIHNvdXJjZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBlbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSxcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfVxuICAgICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihlbnRyeVBhdGhNYXBzLCBtb3ZlRW50cmllc0RvbmUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciBlbnRyeURpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAoZW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIHZhciBkaXJlY3RvcnkgPSBlbnRyeTsgIC8vL1xuXG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZmlsZSA9IGVudHJ5OyAvLy9cblxuICAgICAgdGhpcy5tb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BwYWJsZUVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGVsZW1lbnQpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYWxsYmFjaykge1xuICB2YXIgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNhbGxiYWNrKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIl19