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
    targetEntryPath = targetPath === null ? null : util.replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJkb25lIiwiYWN0aW9uIiwiZ2V0QWN0aW9uIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldERyYWdnYWJsZUVsZW1lbnQiLCJlbnRyeSIsInN0YXJ0RHJhZ2dpbmciLCJhY3Rpb25zIiwiU1RBUlRfRFJBR0dJTkciLCJTVE9QX0RSQUdHSU5HIiwic3RvcERyYWdnaW5nIiwiRFJBR0dJTkciLCJkcmFnZ2luZyIsIkVTQ0FQRV9EUkFHR0lORyIsImVzY2FwZURyYWdnaW5nIiwibWFya2VkIiwiaXNNYXJrZWQiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsInRvQmVNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsInJlZHVjZSIsImRyb3BwYWJsZUVsZW1lbnRNYXJrZWQiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm1hcmtlck5hbWUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJjbG9uZSIsIkRJUkVDVE9SWSIsImFwcGVuZCIsInJldHJpZXZlTWFya2VyIiwicmVtb3ZlIiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImVudHJ5UGF0aE1hcHMiLCJlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMiLCJtb3ZlRW50cmllc0RvbmUiLCJmb3JFYWNoIiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsInBhdGhNYXAiLCJmaW5kIiwiZW50cnlQYXRoTWFwIiwic291cmNlRW50cnlQYXRoIiwibW92ZWRQYXRoIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5SXNEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsIm1vdmVEaXJlY3RvcnkiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJtYXAiLCJ0YXJnZXRFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiYXJyYXkiLCJlbGVtZW50Iiwic29tZSIsImN1cnJlbnRFbGVtZW50IiwiY3VycmVudEVsZW1lbnRJbmRleCIsImNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLGtCQUFSLENBRFo7QUFBQSxJQUVJSSxZQUFZSixRQUFRLGFBQVIsQ0FGaEI7QUFBQSxJQUdJSyxhQUFhTCxRQUFRLDZCQUFSLENBSGpCO0FBQUEsSUFJSU0sa0JBQWtCTixRQUFRLGtDQUFSLENBSnRC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SixZQUFZaEQsTUFBTWlELE9BQU4sRUFEaEI7QUFBQSxRQUVJSSxrQkFBa0JMLFNBRnRCO0FBQUEsUUFFa0M7QUFDOUJpQixzQkFBa0J0QixlQUFlLElBQWYsR0FDRSxJQURGLEdBRUl0RSxLQUFLNkYsK0JBQUwsQ0FBcUNsQixTQUFyQyxFQUFnRE4sVUFBaEQsRUFBNERDLFVBQTVELENBTDFCOztBQU9BUyxpQkFBYUMsZUFBYixJQUFnQ1ksZUFBaEM7O0FBRUEsV0FBT2IsWUFBUDtBQUNELEdBWG1CLENBQXBCOztBQWFBLFNBQU9SLGFBQVA7QUFDRDs7QUFFRCxTQUFTM0QsT0FBVCxDQUFpQmtGLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQztBQUMvQixNQUFJcEYsUUFBUSxDQUFDLENBQWI7O0FBRUFtRixRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QkMsbUJBQXpCLEVBQThDO0FBQ3ZELFFBQUlELG1CQUFtQkYsT0FBdkIsRUFBZ0M7QUFDOUJwRixjQUFRdUYsbUJBQVI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU92RixLQUFQO0FBQ0Q7O0FBRUQsU0FBU21FLElBQVQsQ0FBY2dCLEtBQWQsRUFBcUJLLFFBQXJCLEVBQStCO0FBQzdCLE1BQUlKLFVBQVUsSUFBZDs7QUFFQUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUI7QUFDbEMsUUFBSUUsU0FBU0YsY0FBVCxDQUFKLEVBQThCO0FBQzVCRixnQkFBVUUsY0FBVjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT0YsT0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KSxcbiAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50LCBkb25lKSB7XG4gICAgdmFyIGFjdGlvbiA9IGRyYWdFdmVudC5nZXRBY3Rpb24oKSxcbiAgICAgICAgZHJhZ2dhYmxlRWxlbWVudCA9IGRyYWdFdmVudC5nZXREcmFnZ2FibGVFbGVtZW50KCksXG4gICAgICAgIGVudHJ5ID0gZHJhZ2dhYmxlRWxlbWVudCwgIC8vL1xuICAgICAgICBzdGFydERyYWdnaW5nID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVEFSVF9EUkFHR0lORzpcbiAgICAgICAgc3RhcnREcmFnZ2luZyA9IHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUT1BfRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5FU0NBUEVfRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuZXNjYXBlRHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmc7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmICghbWFya2VkKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChlbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIGZ1bmN0aW9uIG1vdmVFbnRyaWVzRG9uZSgpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oZW50cnlQYXRoTWFwKSB7XG4gICAgICAgICAgICAgIHZhciBzb3VyY2VFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdO1xuXG4gICAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIoZW50cnlQYXRoTWFwcywgbW92ZUVudHJpZXNEb25lLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSA6XG4gICAgICAgIHRoaXMubW92ZUZpbGUoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcCA9IHt9LFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIHNvdXJjZUVudHJ5UGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0gPSB0YXJnZXRFbnRyeVBhdGg7XG5cbiAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICB9KTtcblxuICByZXR1cm4gZW50cnlQYXRoTWFwcztcbn1cblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=