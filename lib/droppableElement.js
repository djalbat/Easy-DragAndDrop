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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJkb25lIiwiYWN0aW9uIiwiZ2V0QWN0aW9uIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldERyYWdnYWJsZUVsZW1lbnQiLCJlbnRyeSIsInN0YXJ0RHJhZ2dpbmciLCJhY3Rpb25zIiwiU1RBUlRfRFJBR0dJTkciLCJTVE9QX0RSQUdHSU5HIiwic3RvcERyYWdnaW5nIiwiRFJBR0dJTkciLCJkcmFnZ2luZyIsIkVTQ0FQRV9EUkFHR0lORyIsImVzY2FwZURyYWdnaW5nIiwiZHJhZ2dpbmdCb3VuZHMiLCJnZXREcmFnZ2luZ0JvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJ0b0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJpc1RvQmVNYXJrZWQiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZHJvcHBhYmxlRWxlbWVudE1hcmtlZCIsImlzTWFya2VkIiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJtYXJrZXJOYW1lIiwibWFya2VyIiwidHlwZXMiLCJGSUxFIiwiY2xvbmUiLCJESVJFQ1RPUlkiLCJhcHBlbmQiLCJyZXRyaWV2ZU1hcmtlciIsInJlbW92ZSIsIm1hcmtlZCIsInJlbW92ZU1hcmtlciIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJjaGlsZEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50IiwiZW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZW50cnlQYXRoTWFwcyIsImVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyIsIm1vdmVFbnRyaWVzRG9uZSIsImZvckVhY2giLCJlbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJlbnRyeVBhdGhNYXAiLCJzb3VyY2VFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRW50cnkiLCJiaW5kIiwiZW50cnlJc0RpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwibW92ZURpcmVjdG9yeSIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1hcCIsInRhcmdldEVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JE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OEI7QUFDNUJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0QiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQsIGRvbmUpIHtcbiAgICB2YXIgYWN0aW9uID0gZHJhZ0V2ZW50LmdldEFjdGlvbigpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50ID0gZHJhZ0V2ZW50LmdldERyYWdnYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgZW50cnkgPSBkcmFnZ2FibGVFbGVtZW50LCAgLy8vXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkVTQ0FQRV9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5lc2NhcGVEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dpbmdCb3VuZHMpLFxuICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5pc1RvQmVNYXJrZWQoZW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCkge1xuICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcHBhYmxlRWxlbWVudCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgIG1hcmtlZCA9IChtYXJrZXIgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygpLFxuICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZXIsIGNoaWxkRWxlbWVudCkge1xuICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRmlsZU1hcmtlcilcbiAgICAgICAgICAgICB8fCAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSkge1xuICAgICAgICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICBmdW5jdGlvbiBtb3ZlRW50cmllc0RvbmUoKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKGVudHJ5UGF0aE1hcCkge1xuICAgICAgICAgICAgICB2YXIgc291cmNlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcblxuICAgICAgICB0aGlzLm1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gICAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyKGVudHJ5UGF0aE1hcHMsIG1vdmVFbnRyaWVzRG9uZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gZW50cnlQYXRoTWFwc0Zyb21FbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGhNYXAgPSB7fSxcbiAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgoZW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aE1hcDtcbiAgfSk7XG5cbiAgcmV0dXJuIGVudHJ5UGF0aE1hcHM7XG59XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGVsZW1lbnQpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYWxsYmFjaykge1xuICB2YXIgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNhbGxiYWNrKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIl19