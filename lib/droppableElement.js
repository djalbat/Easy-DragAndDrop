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
      var entryPathMaps = entryPathMapsFromEntries(entries, sourcePath, targetPath);

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
      var entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourcePath, movedPath) : this.moveFile(entry, sourcePath, movedPath);
    }
  }]);

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

function entryPathMapsFromEntries(entries, sourcePath, targetPath) {
  var entryPathMaps = entries.map(function (entry) {
    var entryPathMap = {},
        entryPath = entry.getPath(),
        sourceEntryPath = entryPath,
        ///
    targetEntryPath;

    if (targetPath === null) {
      targetEntryPath = null;
    } else if (sourcePath === null) {
      targetEntryPath = targetPath;
    } else {
      targetEntryPath = util.replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath);
    }

    entryPathMap[sourceEntryPath] = targetEntryPath;

    return entryPathMap;
  });

  return entryPathMaps;
}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudENvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiZHJhZ0V2ZW50IiwiZG9uZSIsImFjdGlvbiIsImdldEFjdGlvbiIsImRyYWdnYWJsZUVsZW1lbnQiLCJnZXREcmFnZ2FibGVFbGVtZW50IiwiZW50cnkiLCJzdGFydERyYWdnaW5nIiwiYWN0aW9ucyIsIlNUQVJUX0RSQUdHSU5HIiwiU1RPUF9EUkFHR0lORyIsInN0b3BEcmFnZ2luZyIsIkRSQUdHSU5HIiwiZHJhZ2dpbmciLCJFU0NBUEVfRFJBR0dJTkciLCJlc2NhcGVEcmFnZ2luZyIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwicmVkdWNlIiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImRyb3BwYWJsZUVsZW1lbnRNYXJrZWQiLCJpc01hcmtlZCIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImVudHJ5UGF0aE1hcHMiLCJlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMiLCJtb3ZlRW50cmllc0RvbmUiLCJmb3JFYWNoIiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsInBhdGhNYXAiLCJmaW5kIiwiZW50cnlQYXRoTWFwIiwic291cmNlRW50cnlQYXRoIiwibW92ZWRQYXRoIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5SXNEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsIm1vdmVEaXJlY3RvcnkiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJtYXAiLCJ0YXJnZXRFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiYXJyYXkiLCJlbGVtZW50Iiwic29tZSIsImN1cnJlbnRFbGVtZW50IiwiY3VycmVudEVsZW1lbnRJbmRleCIsImNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLGtCQUFSLENBRFo7QUFBQSxJQUVJSSxZQUFZSixRQUFRLGFBQVIsQ0FGaEI7QUFBQSxJQUdJSyxhQUFhTCxRQUFRLDZCQUFSLENBSGpCO0FBQUEsSUFJSU0sa0JBQWtCTixRQUFRLGtDQUFSLENBSnRCOztJQU1NTyxnQjs7O0FBQ0osNEJBQVlDLFFBQVosRUFBc0JDLFdBQXRCLEVBQW1DO0FBQUE7O0FBQUEsb0lBQzNCRCxRQUQyQjs7QUFHakMsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsVUFBS0MsaUJBQUwsR0FBeUIsRUFBekI7QUFMaUM7QUFN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dXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KSxcbiAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnRDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVsZW1lbnRDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQsIGRvbmUpIHtcbiAgICB2YXIgYWN0aW9uID0gZHJhZ0V2ZW50LmdldEFjdGlvbigpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50ID0gZHJhZ0V2ZW50LmdldERyYWdnYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgZW50cnkgPSBkcmFnZ2FibGVFbGVtZW50LCAgLy8vXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkVTQ0FQRV9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5lc2NhcGVEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5pc1RvQmVNYXJrZWQoZW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCkge1xuICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcHBhYmxlRWxlbWVudCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgIG1hcmtlZCA9IChtYXJrZXIgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygpLFxuICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZXIsIGNoaWxkRWxlbWVudCkge1xuICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRmlsZU1hcmtlcilcbiAgICAgICAgICAgICB8fCAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSkge1xuICAgICAgICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICBmdW5jdGlvbiBtb3ZlRW50cmllc0RvbmUoKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKGVudHJ5UGF0aE1hcCkge1xuICAgICAgICAgICAgICB2YXIgc291cmNlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcblxuICAgICAgICB0aGlzLm1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gICAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyKGVudHJ5UGF0aE1hcHMsIG1vdmVFbnRyaWVzRG9uZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gZW50cnlQYXRoTWFwc0Zyb21FbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGhNYXAgPSB7fSxcbiAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgdGFyZ2V0RW50cnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXRQYXRoID09PSBudWxsKSB7XG4gICAgICB0YXJnZXRFbnRyeVBhdGggPSBudWxsO1xuICAgIH0gZWxzZSBpZiAoc291cmNlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgfVxuXG4gICAgZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0gPSB0YXJnZXRFbnRyeVBhdGg7XG5cbiAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICB9KTtcblxuICByZXR1cm4gZW50cnlQYXRoTWFwcztcbn1cblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=