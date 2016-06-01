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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DroppableElement).call(this, selector));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFFBQVEsUUFBUSxrQkFBUixDQURaO0lBRUksWUFBWSxRQUFRLGFBQVIsQ0FGaEI7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQixXQUF0QixFQUFtQztBQUFBOztBQUFBLG9HQUMzQixRQUQyQjs7QUFHakMsVUFBSyxXQUFMLEdBQW1CLFdBQW5COztBQUVBLFVBQUssaUJBQUwsR0FBeUIsRUFBekI7QUFMaUM7QUFNbEM7Ozs7d0NBRW1CLGdCLEVBQWtCO0FBQ3BDLFdBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0IsZ0IsRUFBa0I7QUFDdkMsVUFBSSxRQUFRLFFBQVEsS0FBSyxpQkFBYixFQUFnQyxnQkFBaEMsQ0FBWjs7QUFFQSxVQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixhQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLEtBQTlCLEVBQXFDLENBQXJDO0FBQ0Q7QUFDRjs7O2tEQUU2Qiw4QixFQUFnQztBQUM1RCxVQUFJLFNBQVMsS0FBSyxTQUFMLEVBQWI7VUFDSSw4QkFBOEIsT0FBTyxjQUFQLENBQXNCLDhCQUF0QixDQURsQzs7QUFHQSxhQUFPLDJCQUFQO0FBQ0Q7OztnQ0FFVyxTLEVBQVc7QUFDckIsVUFBSSxTQUFTLFVBQVUsU0FBVixFQUFiO1VBQ0ksbUJBQW1CLFVBQVUsbUJBQVYsRUFEdkI7VUFFSSxRQUFRLGdCQUZaLEM7O0FBSUEsY0FBUSxNQUFSO0FBQ0UsYUFBSyxVQUFVLE9BQVYsQ0FBa0IsY0FB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QU0sSUFBTixDQUFXLFVBQVMsY0FBVCxFQUF5QjtBQUNsQyxRQUFJLEdBQUcsY0FBSCxDQUFKLEVBQXdCO0FBQ3RCLGdCQUFVLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU8sT0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KTtcblxuICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBvbkRyYWdFdmVudChkcmFnRXZlbnQpIHtcbiAgICB2YXIgYWN0aW9uID0gZHJhZ0V2ZW50LmdldEFjdGlvbigpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50ID0gZHJhZ0V2ZW50LmdldERyYWdnYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgZW50cnkgPSBkcmFnZ2FibGVFbGVtZW50OyAgLy8vXG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVEFSVF9EUkFHR0lORzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdmFyIG5vdFRvSGF2ZU1hcmtlciA9ICF0aGlzLmlzVG9IYXZlTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKG5vdFRvSGF2ZU1hcmtlcikge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuZHJhZ2dpbmcoZW50cnkpO1xuXG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcklzTm90VG9IYXZlTWFya2VyID0gIWRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuaXNUb0hhdmVNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcklzTm90VG9IYXZlTWFya2VyKSB7XG4gICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc1RvSGF2ZU1hcmtlcihlbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dpbmdCb3VuZHMpLFxuICAgICAgICB0b0hhdmVNYXJrZXIgPSBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0hhdmVNYXJrZXI7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5pc1RvSGF2ZU1hcmtlcihlbnRyeSkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyO1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50Lmhhc01hcmtlcigpKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXI7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIHJldHVybiBtYXJrZXIgIT09IG51bGw7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygpLFxuICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZXIsIGNoaWxkRWxlbWVudCkge1xuICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRmlsZU1hcmtlcilcbiAgICAgICAgICAgICAgICB8fCAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSkge1xuICAgICAgICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3BQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuICAgICAgXG4gICAgICB2YXIgZW50cnlQYXRoTWFwID0ge307XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuICAgICAgXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuICAgICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oZW50cnlQYXRoTWFwKSB7XG4gICAgICAgICAgICAgIHZhciBzb3VyY2VFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7ICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIFxuICAgIGRvbmUoKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSBudWxsO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZmluZChhcnJheSwgY2IpIHtcbiAgdmFyIGVsZW1lbnQgPSBudWxsO1xuICBcbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmIChjYihjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGVsZW1lbnQ7ICBcbn1cbiJdfQ==
