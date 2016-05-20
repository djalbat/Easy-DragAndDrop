'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DragEvent = require('./dragEvent'),
    Entry = require('./explorer/entry'),
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
    key: 'hasMarker',
    value: function hasMarker() {
      var marker = this.retrieveMarker();

      return marker !== null;
    }
  }, {
    key: 'showMarker',
    value: function showMarker() {
      var marker = this.retrieveMarker();

      marker.show();
    }
  }, {
    key: 'hideMarker',
    value: function hideMarker() {
      var marker = this.retrieveMarker();

      marker.hide();
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
    key: 'onDragEvent',
    value: function onDragEvent(dragEvent, done) {
      var entry = dragEvent.getEntry(),
          dragEventType = dragEvent.getType();

      switch (dragEventType) {
        case DragEvent.types.START:
          return this.startDragging(entry);
          break;

        case DragEvent.types.STOP:
          this.stopDragging(entry, done);
          break;

        case DragEvent.types.DRAG:
          this.drag(entry);
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
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      if (this.hasMarker()) {
        this.removeMarker();
      } else {
        var droppableElementHavingMarker = this.droppableElementHavingMarker();

        droppableElementHavingMarker.removeMarker();
      }
    }
  }, {
    key: 'drag',
    value: function drag(entry) {
      if (this.hasMarker()) {
        if (!this.isKeepingMarker(entry)) {
          var droppableElementToAddMarker = this.droppableElementToAddMarker(entry);

          if (droppableElementToAddMarker !== null) {
            this.removeMarker();

            droppableElementToAddMarker.addMarker(entry);
          }
        }
      } else {
        var droppableElementHavingMarker = this.droppableElementHavingMarker(),
            droppableElementThatHasMarkerIsLosingMarker = droppableElementHavingMarker.isLosingMarker(entry);

        if (droppableElementThatHasMarkerIsLosingMarker) {
          droppableElementHavingMarker.removeMarker();

          this.addMarker(entry);
        }
      }
    }
  }, {
    key: 'moveEntries',
    value: function moveEntries(entries, sourcePath, targetPath, done) {
      entries.reverse(); ///

      asyncForEach(entries, function (entry, next) {
        var entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath),
            ///
        entryIsDirectory = entry.isDirectory();

        entryIsDirectory ? this.moveDirectory(entry, sourceEntryPath, targetEntryPath, next) : this.moveFile(entry, sourceEntryPath, targetEntryPath, next);
      }.bind(this), done);
    }
  }, {
    key: 'isOverlappingEntry',
    value: function isOverlappingEntry(entry) {
      var bounds = this.getBounds(),
          entryBounds = entry.getBounds(),
          overlappingEntry = bounds.areOverlapping(entryBounds);

      return overlappingEntry;
    }
  }, {
    key: 'isKeepingMarker',
    value: function isKeepingMarker(entry) {
      var overlappingEntry = this.isOverlappingEntry(entry),
          keepingMarker = overlappingEntry;

      return keepingMarker;
    }
  }, {
    key: 'isLosingMarker',
    value: function isLosingMarker(entry) {
      var overlappingEntry = this.isOverlappingEntry(entry),
          losingMarker = !overlappingEntry;

      return losingMarker;
    }
  }, {
    key: 'toAddMarker',
    value: function toAddMarker(entry) {
      var overlappingEntry = this.isOverlappingEntry(entry),
          addMarker = overlappingEntry;

      return addMarker;
    }
  }, {
    key: 'droppableElementToAddMarker',
    value: function droppableElementToAddMarker(entry) {
      var droppableElementToAddMarker = this.droppableElements.reduce(function (droppableElementToAddMarker, droppableElement) {
        if (droppableElementToAddMarker === null) {
          if (droppableElement.toAddMarker(entry)) {
            droppableElementToAddMarker = droppableElement;
          }
        }

        return droppableElementToAddMarker;
      }, null);

      return droppableElementToAddMarker;
    }
  }, {
    key: 'droppableElementHavingMarker',
    value: function droppableElementHavingMarker() {
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
  }]);

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

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

function asyncForEach(array, cb, done) {
  var arrayLength = array.length,
      index = -1;

  var next = function next() {
    index++;

    if (index === arrayLength) {
      if (done) {
        done();
      }
    } else {
      var element = array[index];

      cb(element, next);
    }
  };

  next();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFlBQVksUUFBUSxhQUFSLENBRGhCO0lBRUksUUFBUSxRQUFRLGtCQUFSLENBRlo7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG9HQUNkLFFBRGM7O0FBR3BCLFVBQUssaUJBQUwsR0FBeUIsRUFBekI7QUFIb0I7QUFJckI7Ozs7d0NBRW1CLGdCLEVBQWtCO0FBQ3BDLFdBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0IsZ0IsRUFBa0I7QUFDdkMsVUFBSSxRQUFRLFFBQVEsZ0JBQVIsRUFBMEIsS0FBSyxpQkFBL0IsQ0FBWjs7QUFFQSxVQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixhQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLEtBQTlCLEVBQXFDLENBQXJDO0FBQ0Q7QUFDRjs7OzhCQUVTLEssRUFBTztBQUNmLFVBQUksWUFBWSxNQUFNLE9BQU4sRUFBaEI7VUFDSSxZQUFZLE1BQU0sT0FBTixFQURoQjtVQUVJLGFBQWEsU0FGakI7O0FBR0ksWUFISjs7QUFLQSxjQUFRLFNBQVI7QUFDRSxhQUFLLE1BQU0sS0FBTixDQUFZLElBQWpCO0FBQ0UsbUJBQVMsV0FBVyxLQUFYLENBQWlCLFVBQWpCLENBQVQ7QUFDQTs7QUFFRixhQUFLLE1BQU0sS0FBTixDQUFZLFNBQWpCO0FBQ0UsbUJBQVMsZ0JBQWdCLEtBQWhCLENBQXNCLFVBQXRCLENBQVQ7QUFDQTtBQVBKOztBQVVBLFdBQUssTUFBTCxDQUFZ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cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZHJvcHBhYmxlRWxlbWVudCwgdGhpcy5kcm9wcGFibGVFbGVtZW50cyk7XG5cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuICAgIFxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHNob3dNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5zaG93KCk7XG4gIH1cblxuICBoaWRlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuaGlkZSgpO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgb25EcmFnRXZlbnQoZHJhZ0V2ZW50LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5ID0gZHJhZ0V2ZW50LmdldEVudHJ5KCksXG4gICAgICAgIGRyYWdFdmVudFR5cGUgPSBkcmFnRXZlbnQuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnRXZlbnRUeXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVEFSVDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVE9QOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5EUkFHOlxuICAgICAgICB0aGlzLmRyYWcoZW50cnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLmlzS2VlcGluZ01hcmtlcihlbnRyeSkpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlci5hZGRNYXJrZXIoZW50cnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRoYXRIYXNNYXJrZXJJc0xvc2luZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuaXNMb3NpbmdNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRoYXRIYXNNYXJrZXJJc0xvc2luZ01hcmtlcikge1xuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgZW50cmllcy5yZXZlcnNlKCk7ICAvLy9cblxuICAgIGFzeW5jRm9yRWFjaChlbnRyaWVzLCBmdW5jdGlvbihlbnRyeSwgbmV4dCkge1xuICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID8gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVRvcG1vc3RQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCksIC8vL1xuICAgICAgICAgIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCwgbmV4dCkgOlxuICAgICAgICAgIHRoaXMubW92ZUZpbGUoZW50cnksIHNvdXJjZUVudHJ5UGF0aCwgdGFyZ2V0RW50cnlQYXRoLCBuZXh0KTtcbiAgICB9LmJpbmQodGhpcyksIGRvbmUpXG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZW50cnlCb3VuZHMgPSBlbnRyeS5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhlbnRyeUJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGlzS2VlcGluZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBrZWVwaW5nTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBrZWVwaW5nTWFya2VyO1xuICB9XG5cbiAgaXNMb3NpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgbG9zaW5nTWFya2VyID0gIW92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICByZXR1cm4gbG9zaW5nTWFya2VyO1xuICB9XG5cbiAgdG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgYWRkTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBhZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LnRvQWRkTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihlbGVtZW50LCBhcnJheSkge1xuICB2YXIgaW5kZXggPSBudWxsO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gYXN5bmNGb3JFYWNoKGFycmF5LCBjYiwgZG9uZSkge1xuICB2YXIgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5kZXgrKztcblxuICAgIGlmIChpbmRleCA9PT0gYXJyYXlMZW5ndGgpIHtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIGNiKGVsZW1lbnQsIG5leHQpO1xuICAgIH1cbiAgfTtcblxuICBuZXh0KCk7XG59XG4iXX0=
