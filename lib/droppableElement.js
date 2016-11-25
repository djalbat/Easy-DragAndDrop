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
    key: 'dragEventHandler',
    value: function dragEventHandler(dragEvent) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCIsImFyZU92ZXJsYXBwaW5nIiwiZHJhZ0V2ZW50IiwiYWN0aW9uIiwiZ2V0QWN0aW9uIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldERyYWdnYWJsZUVsZW1lbnQiLCJlbnRyeSIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsInN0YXJ0RHJhZ2dpbmciLCJTVE9QX0RSQUdHSU5HIiwic3RvcERyYWdnaW5nIiwiRFJBR0dJTkciLCJkcmFnZ2luZyIsImhhc01hcmtlciIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlckdsb2JhbGx5Iiwibm90VG9IYXZlTWFya2VyIiwiaXNUb0hhdmVNYXJrZXIiLCJkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciIsInJlbW92ZU1hcmtlciIsImRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIiLCJnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyIiwiZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcklzTm90VG9IYXZlTWFya2VyIiwiYWRkTWFya2VySW5QbGFjZSIsImRyYWdnaW5nQm91bmRzIiwiZ2V0RHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwidG9IYXZlTWFya2VyIiwicmVkdWNlIiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJtYXJrZXJOYW1lIiwibWFya2VyIiwidHlwZXMiLCJGSUxFIiwiY2xvbmUiLCJESVJFQ1RPUlkiLCJhcHBlbmQiLCJyZXRyaWV2ZU1hcmtlciIsInJlbW92ZSIsImNoaWxkRWxlbWVudHMiLCJjaGlsZEVsZW1lbnQiLCJlbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkb25lIiwiZW50cnlQYXRoTWFwcyIsIm1hcCIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJzb3VyY2VFbnRyeVBhdGgiLCJ0YXJnZXRFbnRyeVBhdGgiLCJyZXBsYWNlVG9wUGF0aCIsImVudHJ5UGF0aE1hcCIsImZvckVhY2giLCJwYXRoTWFwIiwiZmluZCIsIm1vdmVkUGF0aCIsImZvdW5kIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5SXNEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsIm1vdmVEaXJlY3RvcnkiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2IiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JE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QU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPbkYsS0FBUDtBQUNEOztBQUVELFNBQVNtRSxJQUFULENBQWNZLEtBQWQsRUFBcUJLLEVBQXJCLEVBQXlCO0FBQ3ZCLE1BQUlKLFVBQVUsSUFBZDs7QUFFQUQsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUI7QUFDbEMsUUFBSUUsR0FBR0YsY0FBSCxDQUFKLEVBQXdCO0FBQ3RCRixnQkFBVUUsY0FBVjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT0YsT0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KTtcblxuICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBkcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQ7ICAvLy9cblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB2YXIgbm90VG9IYXZlTWFya2VyID0gIXRoaXMuaXNUb0hhdmVNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAobm90VG9IYXZlTWFya2VyKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5kcmFnZ2luZyhlbnRyeSk7XG5cbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VySXNOb3RUb0hhdmVNYXJrZXIgPSAhZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5pc1RvSGF2ZU1hcmtlcihlbnRyeSk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VySXNOb3RUb0hhdmVNYXJrZXIpIHtcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzVG9IYXZlTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIHRvSGF2ZU1hcmtlciA9IG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvSGF2ZU1hcmtlcjtcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9IYXZlTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXI7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZUVudHJ5UGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgIHRhcmdldEVudHJ5UGF0aCA9IHRhcmdldFBhdGggPT09IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVRvcFBhdGgoZW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG4gICAgICBcbiAgICAgIHZhciBlbnRyeVBhdGhNYXAgPSB7fTtcblxuICAgICAgZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0gPSB0YXJnZXRFbnRyeVBhdGg7XG4gICAgICBcbiAgICAgIHJldHVybiBlbnRyeVBhdGhNYXA7XG4gICAgfSk7XG4gICAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBwYXRoTWFwID0gZmluZChlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbihlbnRyeVBhdGhNYXApIHtcbiAgICAgICAgICAgICAgdmFyIHNvdXJjZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBlbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSxcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgXG4gICAgZG9uZSgpO1xuICB9XG5cbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSA6XG4gICAgICAgIHRoaXMubW92ZUZpbGUoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIHZhciBpbmRleCA9IG51bGw7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYikge1xuICB2YXIgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNiKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIl19