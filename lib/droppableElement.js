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

  function DroppableElement(selector) {
    _classCallCheck(this, DroppableElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DroppableElement).call(this, selector));

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
      var index = indexOf(droppableElement, this.droppableElements);

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
        var droppableElementHavingMarker = this.getDroppableElementHavingMarker(),
            droppableElementHavingMarkerIsNotToHaveMarker = !droppableElementHavingMarker.isToHaveMarker(entry);

        if (droppableElementHavingMarkerIsNotToHaveMarker) {
          droppableElementHavingMarker.removeMarker();

          this.addMarkerInPlace(entry);
        }
      }
    }
  }, {
    key: 'isToHaveMarker',
    value: function isToHaveMarker(entry) {
      var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
          haveMarker = directoryOverlappingEntry !== null;

      return haveMarker;
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
    value: function moveEntries(entry, subEntries, sourcePath, targetPath, done) {
      this.moveSubEntries(subEntries, sourcePath, targetPath, function () {
        var isSubEntry = false;

        this.moveEntry(entry, sourcePath, targetPath, isSubEntry, done);
      }.bind(this));
    }
  }, {
    key: 'moveSubEntries',
    value: function moveSubEntries(subEntries, sourcePath, targetPath, done) {
      subEntries.reverse(); ///

      var isSubEntry = true;

      asyncForEach(subEntries, function (subEntry, next) {
        this.moveEntry(subEntry, sourcePath, targetPath, isSubEntry, next);
      }.bind(this), done);
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, targetPath, isSubEntry, next) {
      var entryPath = entry.getPath(),
          sourceEntryPath = entryPath,
          ///
      targetEntryPath = targetPath === null ? null : util.replaceTopPath(entryPath, sourcePath, targetPath),
          ///
      entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourceEntryPath, targetEntryPath, isSubEntry, next) : this.moveFile(entry, sourceEntryPath, targetEntryPath, isSubEntry, next);
    }
  }]);

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

function asyncForEach(array, cb, done) {
  var arrayLength = array.length,
      index = -1;

  var next = function next() {
    index++;

    if (index === arrayLength) {
      done();
    } else {
      var element = array[index];

      cb(element, next);
    }
  };

  next();
}

function indexOf(element, array) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFFBQVEsUUFBUSxrQkFBUixDQURaO0lBRUksWUFBWSxRQUFRLGFBQVIsQ0FGaEI7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG9HQUNkLFFBRGM7O0FBR3BCLFVBQUssaUJBQUwsR0FBeUIsRUFBekI7QUFIb0I7QUFJckI7Ozs7d0NBRW1CLGdCLEVBQWtCO0FBQ3BDLFdBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0IsZ0IsRUFBa0I7QUFDdkMsVUFBSSxRQUFRLFFBQVEsZ0JBQVIsRUFBMEIsS0FBSyxpQkFBL0IsQ0FBWjs7QUFFQSxVQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixhQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLEtBQTlCLEVBQXFDLENBQXJDO0FBQ0Q7QUFDRjs7O2tEQUU2Qiw4QixFQUFnQztBQUM1RCxVQUFJLFNBQVMsS0FBSyxTQUFMLEVBQWI7VUFDSSw4QkFBOEIsT0FBTyxjQUFQLENBQXNCLDhCQUF0QixDQURsQzs7QUFHQSxhQUFPLDJCQUFQO0FBQ0Q7OztnQ0FFVyxTLEVBQVc7QUFDckIsVUFBSSxTQUFTLFVBQVUsU0FBVixFQUFiO1VBQ0ksbUJBQW1CLFVBQVUsbUJBQVYsRUFEdkI7VUFFSSxRQUFRLGdCQUZaLEM7O0FBSUEsY0FBUSxNQUFSO0FBQ0UsYUFBSyxVQUFVLE9BQVYsQ0FBa0IsY0FBdkI7QUFDRSxpQkFBTyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBUDs7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LFNBQU8sS0FBUDtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZHJvcHBhYmxlRWxlbWVudCwgdGhpcy5kcm9wcGFibGVFbGVtZW50cyk7XG5cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudChkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgb25EcmFnRXZlbnQoZHJhZ0V2ZW50KSB7XG4gICAgdmFyIGFjdGlvbiA9IGRyYWdFdmVudC5nZXRBY3Rpb24oKSxcbiAgICAgICAgZHJhZ2dhYmxlRWxlbWVudCA9IGRyYWdFdmVudC5nZXREcmFnZ2FibGVFbGVtZW50KCksXG4gICAgICAgIGVudHJ5ID0gZHJhZ2dhYmxlRWxlbWVudDsgIC8vL1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RBUlRfRFJBR0dJTkc6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUT1BfRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHZhciBub3RUb0hhdmVNYXJrZXIgPSAhdGhpcy5pc1RvSGF2ZU1hcmtlcihlbnRyeSk7XG5cbiAgICAgIGlmIChub3RUb0hhdmVNYXJrZXIpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlci5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXJJc05vdFRvSGF2ZU1hcmtlciA9ICFkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmlzVG9IYXZlTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXJJc05vdFRvSGF2ZU1hcmtlcikge1xuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGhhdmVNYXJrZXIgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gaGF2ZU1hcmtlcjtcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9IYXZlTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXI7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJ5LCBzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdGhpcy5tb3ZlU3ViRW50cmllcyhzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpc1N1YkVudHJ5ID0gZmFsc2U7XG5cbiAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBkb25lKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZVN1YkVudHJpZXMoc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHN1YkVudHJpZXMucmV2ZXJzZSgpOyAvLy9cblxuICAgIHZhciBpc1N1YkVudHJ5ID0gdHJ1ZTtcblxuICAgIGFzeW5jRm9yRWFjaChcbiAgICAgIHN1YkVudHJpZXMsXG4gICAgICBmdW5jdGlvbihzdWJFbnRyeSwgbmV4dCkge1xuICAgICAgICB0aGlzLm1vdmVFbnRyeShzdWJFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBkb25lXG4gICAgKVxuICB9XG5cbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgIHRhcmdldEVudHJ5UGF0aCA9IHRhcmdldFBhdGggPT09IG51bGwgP1xuICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgdXRpbC5yZXBsYWNlVG9wUGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGlzU3ViRW50cnksIG5leHQpIDpcbiAgICAgICAgdGhpcy5tb3ZlRmlsZShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGlzU3ViRW50cnksIG5leHQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gYXN5bmNGb3JFYWNoKGFycmF5LCBjYiwgZG9uZSkge1xuICB2YXIgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5kZXgrKztcblxuICAgIGlmIChpbmRleCA9PT0gYXJyYXlMZW5ndGgpIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIGNiKGVsZW1lbnQsIG5leHQpO1xuICAgIH1cbiAgfTtcblxuICBuZXh0KCk7XG59XG5cbmZ1bmN0aW9uIGluZGV4T2YoZWxlbWVudCwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gbnVsbDtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG4iXX0=
