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
      var index = indexOf(this.droppableElements, droppableElement);

      if (index !== null) {
        this.droppableElements.splice(index, 1);
      }
    }
  }, {
    key: 'isOverlappingDraggableElement',
    value: function isOverlappingDraggableElement(draggableElementDraggingBounds) {
      var bounds = this.getBounds(),
          overlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds);

      return overlappingDraggableElement;
    }
  }, {
    key: 'onDragEvent',
    value: function onDragEvent(dragEvent) {
      var action = dragEvent.getAction(),
          draggableElement = dragEvent.getDraggableElement(),
          entry = draggableElement; ///

      switch (action) {
        case DragEvent.actions.START_DRAGGING:
          return this.startDragging(entry);

        case DragEvent.actions.STOP_DRAGGING:
          this.stopDragging(entry);
          break;

        case DragEvent.actions.DRAGGING:
          this.dragging(entry);
          break;
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      if (this.hasMarker()) {
        return false;
      }

      this.addMarker(entry);

      return true;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      if (this.hasMarker()) {
        var notToHaveMarker = !this.isToHaveMarker(entry);

        if (notToHaveMarker) {
          var droppableElementToHaveMarker = this.getDroppableElementToHaveMarker(entry);

          if (droppableElementToHaveMarker !== null) {
            droppableElementToHaveMarker.addMarker(entry);

            this.removeMarker();
          }
        }
      } else {
        var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

        droppableElementHavingMarker.dragging(entry);

        var droppableElementHavingMarkerIsNotToHaveMarker = !droppableElementHavingMarker.isToHaveMarker(entry);

        if (droppableElementHavingMarkerIsNotToHaveMarker) {
          droppableElementHavingMarker.removeMarker();

          this.addMarkerInPlace(entry);
        }
      }
    }
  }, {
    key: 'isToHaveMarker',
    value: function isToHaveMarker(entry) {
      var bounds = this.getBounds(),
          draggingBounds = entry.getDraggingBounds(),
          overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
          toHaveMarker = overlappingDraggingBounds; ///

      return toHaveMarker;
    }
  }, {
    key: 'getDroppableElementToHaveMarker',
    value: function getDroppableElementToHaveMarker(entry) {
      var droppableElementToHaveMarker = this.droppableElements.reduce(function (droppableElementToHaveMarker, droppableElement) {
        if (droppableElementToHaveMarker === null) {
          if (droppableElement.isToHaveMarker(entry)) {
            droppableElementToHaveMarker = droppableElement;
          }
        }

        return droppableElementToHaveMarker;
      }, null);

      return droppableElementToHaveMarker;
    }
  }, {
    key: 'getDroppableElementHavingMarker',
    value: function getDroppableElementHavingMarker() {
      var droppableElementHavingMarker = this.droppableElements.reduce(function (droppableElementHavingMarker, droppableElement) {
        if (droppableElementHavingMarker === null) {
          if (droppableElement.hasMarker()) {
            droppableElementHavingMarker = droppableElement;
          }
        }

        return droppableElementHavingMarker;
      }, null);

      return droppableElementHavingMarker;
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
      if (this.hasMarker()) {
        this.removeMarker();
      } else {
        var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

        droppableElementHavingMarker.removeMarker();
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      var marker = this.retrieveMarker();

      return marker !== null;
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
  var index = null;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCIsImFyZU92ZXJsYXBwaW5nIiwiZHJhZ0V2ZW50IiwiYWN0aW9uIiwiZ2V0QWN0aW9uIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldERyYWdnYWJsZUVsZW1lbnQiLCJlbnRyeSIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsInN0YXJ0RHJhZ2dpbmciLCJTVE9QX0RSQUdHSU5HIiwic3RvcERyYWdnaW5nIiwiRFJBR0dJTkciLCJkcmFnZ2luZyIsImhhc01hcmtlciIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlckdsb2JhbGx5Iiwibm90VG9IYXZlTWFya2VyIiwiaXNUb0hhdmVNYXJrZXIiLCJkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciIsInJlbW92ZU1hcmtlciIsImRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIiLCJnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyIiwiZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcklzTm90VG9IYXZlTWFya2VyIiwiYWRkTWFya2VySW5QbGFjZSIsImRyYWdnaW5nQm91bmRzIiwiZ2V0RHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwidG9IYXZlTWFya2VyIiwicmVkdWNlIiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJtYXJrZXJOYW1lIiwibWFya2VyIiwidHlwZXMiLCJGSUxFIiwiY2xvbmUiLCJESVJFQ1RPUlkiLCJhcHBlbmQiLCJyZXRyaWV2ZU1hcmtlciIsInJlbW92ZSIsImNoaWxkRWxlbWVudHMiLCJjaGlsZEVsZW1lbnQiLCJlbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwiZW50cnlQYXRoTWFwcyIsIm1hcCIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJzb3VyY2VFbnRyeVBhdGgiLCJ0YXJnZXRFbnRyeVBhdGgiLCJyZXBsYWNlVG9wUGF0aCIsImVudHJ5UGF0aE1hcCIsImZvckVhY2giLCJwYXRoTWFwIiwiZmluZCIsIm1vdmVkUGF0aCIsImZvdW5kIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5SXNEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsIm1vdmVEaXJlY3RvcnkiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2IiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JE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TyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9uRixLQUFQO0FBQ0Q7O0FBRUQsU0FBU21FLElBQVQsQ0FBY1ksS0FBZCxFQUFxQkssRUFBckIsRUFBeUI7QUFDdkIsTUFBSUosVUFBVSxJQUFkOztBQUVBRCxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QjtBQUNsQyxRQUFJRSxHQUFHRixjQUFILENBQUosRUFBd0I7QUFDdEJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0QiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpO1xuXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcbiAgfVxuXG4gIG9uRHJhZ0V2ZW50KGRyYWdFdmVudCkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQ7ICAvLy9cblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB2YXIgbm90VG9IYXZlTWFya2VyID0gIXRoaXMuaXNUb0hhdmVNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAobm90VG9IYXZlTWFya2VyKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5kcmFnZ2luZyhlbnRyeSk7XG5cbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VySXNOb3RUb0hhdmVNYXJrZXIgPSAhZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5pc1RvSGF2ZU1hcmtlcihlbnRyeSk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VySXNOb3RUb0hhdmVNYXJrZXIpIHtcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzVG9IYXZlTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIHRvSGF2ZU1hcmtlciA9IG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvSGF2ZU1hcmtlcjtcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9IYXZlTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXI7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZUVudHJ5UGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgIHRhcmdldEVudHJ5UGF0aCA9IHRhcmdldFBhdGggPT09IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVRvcFBhdGgoZW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG4gICAgICBcbiAgICAgIHZhciBlbnRyeVBhdGhNYXAgPSB7fTtcblxuICAgICAgZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0gPSB0YXJnZXRFbnRyeVBhdGg7XG4gICAgICBcbiAgICAgIHJldHVybiBlbnRyeVBhdGhNYXA7XG4gICAgfSk7XG4gICAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBwYXRoTWFwID0gZmluZChlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbihlbnRyeVBhdGhNYXApIHtcbiAgICAgICAgICAgICAgdmFyIHNvdXJjZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBlbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSxcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgXG4gICAgZG9uZSgpO1xuICB9XG5cbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSA6XG4gICAgICAgIHRoaXMubW92ZUZpbGUoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIHZhciBpbmRleCA9IG51bGw7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYikge1xuICB2YXIgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNiKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIl19