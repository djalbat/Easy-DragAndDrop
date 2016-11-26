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

      this.moveHandler(entryPathMaps, function () {
        this.moveEntriesEx(entries, entryPathMaps);

        done();
      }.bind(this));
    }
  }, {
    key: 'moveEntriesEx',
    value: function moveEntriesEx(entries, entryPathMaps) {
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
    var entryPath = entry.getPath(),
        sourceEntryPath = entryPath,
        ///
    targetEntryPath = targetPath === null ? null : util.replaceTopPath(entryPath, sourcePath, targetPath); ///

    var entryPathMap = {};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJkb25lIiwiYWN0aW9uIiwiZ2V0QWN0aW9uIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldERyYWdnYWJsZUVsZW1lbnQiLCJlbnRyeSIsInN0YXJ0RHJhZ2dpbmciLCJhY3Rpb25zIiwiU1RBUlRfRFJBR0dJTkciLCJTVE9QX0RSQUdHSU5HIiwic3RvcERyYWdnaW5nIiwiRFJBR0dJTkciLCJkcmFnZ2luZyIsIkVTQ0FQRV9EUkFHR0lORyIsImVzY2FwZURyYWdnaW5nIiwibWFya2VkIiwiaXNNYXJrZWQiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsInRvQmVNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsInJlZHVjZSIsImRyb3BwYWJsZUVsZW1lbnRNYXJrZWQiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm1hcmtlck5hbWUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJjbG9uZSIsIkRJUkVDVE9SWSIsImFwcGVuZCIsInJldHJpZXZlTWFya2VyIiwicmVtb3ZlIiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImVudHJ5UGF0aE1hcHMiLCJlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMiLCJtb3ZlRW50cmllc0V4IiwiYmluZCIsImZvckVhY2giLCJlbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJlbnRyeVBhdGhNYXAiLCJzb3VyY2VFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRW50cnkiLCJlbnRyeUlzRGlyZWN0b3J5IiwiaXNEaXJlY3RvcnkiLCJtb3ZlRGlyZWN0b3J5IiwibW92ZUZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwibWFwIiwidGFyZ2V0RW50cnlQYXRoIiwicmVwbGFjZVRvcFBhdGgiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2IiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMs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QzlDLFFBQUlpRCxZQUFZakQsTUFBTWtELE9BQU4sRUFBaEI7QUFBQSxRQUNJSSxrQkFBa0JMLFNBRHRCO0FBQUEsUUFDa0M7QUFDOUJnQixzQkFBa0J0QixlQUFlLElBQWYsR0FDZCxJQURjLEdBRWR0RSxLQUFLNkYsY0FBTCxDQUFvQmpCLFNBQXBCLEVBQStCUCxVQUEvQixFQUEyQ0MsVUFBM0MsQ0FKUixDQUQ4QyxDQUtrQjs7QUFFaEUsUUFBSVUsZUFBZSxFQUFuQjs7QUFFQUEsaUJBQWFDLGVBQWIsSUFBZ0NXLGVBQWhDOztBQUVBLFdBQU9aLFlBQVA7QUFDRCxHQVptQixDQUFwQjs7QUFjQSxTQUFPVCxhQUFQO0FBQ0Q7O0FBRUQsU0FBUzNELE9BQVQsQ0FBaUJrRixLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUM7QUFDL0IsTUFBSXBGLFFBQVEsQ0FBQyxDQUFiOztBQUVBbUYsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUJDLG1CQUF6QixFQUE4QztBQUN2RCxRQUFJRCxtQkFBbUJGLE9BQXZCLEVBQWdDO0FBQzlCcEYsY0FBUXVGLG1CQUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPdkYsS0FBUDtBQUNEOztBQUVELFNBQVNvRSxJQUFULENBQWNlLEtBQWQsRUFBcUJLLEVBQXJCLEVBQXlCO0FBQ3ZCLE1BQUlKLFVBQVUsSUFBZDs7QUFFQUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUI7QUFDbEMsUUFBSUUsR0FBR0YsY0FBSCxDQUFKLEVBQXdCO0FBQ3RCRixnQkFBVUUsY0FBVjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT0YsT0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KSxcbiAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50LCBkb25lKSB7XG4gICAgdmFyIGFjdGlvbiA9IGRyYWdFdmVudC5nZXRBY3Rpb24oKSxcbiAgICAgICAgZHJhZ2dhYmxlRWxlbWVudCA9IGRyYWdFdmVudC5nZXREcmFnZ2FibGVFbGVtZW50KCksXG4gICAgICAgIGVudHJ5ID0gZHJhZ2dhYmxlRWxlbWVudCwgIC8vL1xuICAgICAgICBzdGFydERyYWdnaW5nID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVEFSVF9EUkFHR0lORzpcbiAgICAgICAgc3RhcnREcmFnZ2luZyA9IHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUT1BfRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5FU0NBUEVfRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuZXNjYXBlRHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmc7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmICghbWFya2VkKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChlbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vdmVFbnRyaWVzRXgoZW50cmllcywgZW50cnlQYXRoTWFwcyk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZUVudHJpZXNFeChlbnRyaWVzLCBlbnRyeVBhdGhNYXBzKSB7XG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICBwYXRoTWFwID0gZmluZChlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbihlbnRyeVBhdGhNYXApIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2VFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciBlbnRyeUlzRGlyZWN0b3J5ID0gZW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGVudHJ5SXNEaXJlY3RvcnkgP1xuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIDpcbiAgICAgICAgdGhpcy5tb3ZlRmlsZShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BwYWJsZUVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHZhciBlbnRyeVBhdGhNYXBzID0gZW50cmllcy5tYXAoZnVuY3Rpb24oZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/XG4gICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgIHV0aWwucmVwbGFjZVRvcFBhdGgoZW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgICB2YXIgZW50cnlQYXRoTWFwID0ge307XG5cbiAgICBlbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSA9IHRhcmdldEVudHJ5UGF0aDtcblxuICAgIHJldHVybiBlbnRyeVBhdGhNYXA7XG4gIH0pO1xuXG4gIHJldHVybiBlbnRyeVBhdGhNYXBzO1xufVxuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIHZhciBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZmluZChhcnJheSwgY2IpIHtcbiAgdmFyIGVsZW1lbnQgPSBudWxsO1xuICBcbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmIChjYihjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGVsZW1lbnQ7ICBcbn1cbiJdfQ==