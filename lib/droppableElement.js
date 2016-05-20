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
    value: function stopDragging(entry, cb) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFlBQVksUUFBUSxhQUFSLENBRGhCO0lBRUksUUFBUSxRQUFRLGtCQUFSLENBRlo7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG9HQUNkLFFBRGM7O0FBR3BCLFVBQUssaUJBQUwsR0FBeUIsRUFBekI7QUFIb0I7QUFJckI7Ozs7d0NBRW1CLGdCLEVBQWtCO0FBQ3BDLFdBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0IsZ0IsRUFBa0I7QUFDdkMsVUFBSSxRQUFRLFFBQVEsZ0JBQVIsRUFBMEIsS0FBSyxpQkFBL0IsQ0FBWjs7QUFFQSxVQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixhQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLEtBQTlCLEVBQXFDLENBQXJDO0FBQ0Q7QUFDRjs7OzhCQUVTLEssRUFBTztBQUNmLFVBQUksWUFBWSxNQUFNLE9BQU4sRUFBaEI7VUFDSSxZQUFZLE1BQU0sT0FBTixFQURoQjtVQUVJLGFBQWEsU0FGakI7O0FBR0ksWUFISjs7QUFLQSxjQUFRLFNBQVI7QUFDRSxhQUFLLE1BQU0sS0FBTixDQUFZLElBQWpCO0FBQ0UsbUJBQVMsV0FBVyxLQUFYLENBQWlCLFVBQWpCLENBQVQ7QUFDQTs7QUFFRixhQUFLLE1BQU0sS0FBTixDQUFZLFNBQWpCO0FBQ0UsbUJBQVMsZ0JBQWdCLEtBQWhCLENBQXNCLFVBQXRCLENBQVQ7QUFDQTtBQVBKOztBQVVBLFdBQUssTUFBTCxDQUFZ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VUFBSSwrQkFBK0IsS0FBSyxpQkFBTCxDQUF1QixNQUF2QixDQUE4QixVQUFTLDRCQUFULEVBQXVDLGdCQUF2QyxFQUF5RDtBQUN4SCxZQUFJLGlDQUFpQyxJQUFyQyxFQUEyQztBQUN6QyxjQUFJLGlCQUFpQixTQUFqQixFQUFKLEVBQWtDO0FBQ2hDLDJDQUErQixnQkFBL0I7QUFDRDtBQUNGOztBQUVELGVBQU8sNEJBQVA7QUFDRCxPQVJrQyxFQVFoQyxJQVJnQyxDQUFuQzs7QUFVQSxhQUFPLDRCQUFQO0FBQ0Q7Ozs7RUFwTjRCLE87O0FBdU4vQixPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCOztBQUVBLFNBQVMsT0FBVCxDQUFpQixPQUFqQixFQUEwQixLQUExQixFQUFpQztBQUMvQixNQUFJLFFBQVEsSUFBWjs7QUFFQSxRQUFNLElBQU4sQ0FBVyxVQUFTLGNBQVQsRUFBeUIsbUJBQXpCLEVBQThDO0FBQ3ZELFFBQUksbUJBQW1CLE9BQXZCLEVBQWdDO0FBQzlCLGNBQVEsbUJBQVI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU8sS0FBUDtBQUNEOztBQUVELFNBQVMsWUFBVCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixFQUFpQyxJQUFqQyxFQUF1QztBQUNyQyxNQUFJLGNBQWMsTUFBTSxNQUF4QjtNQUNJLFFBQVEsQ0FBQyxDQURiOztBQUdBLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBVztBQUNwQjs7QUFFQSxRQUFJLFVBQVUsV0FBZCxFQUEyQjtBQUN6QixVQUFJLElBQUosRUFBVTtBQUNSO0FBQ0Q7QUFDRixLQUpELE1BSU87QUFDTCxVQUFJLFVBQVUsTUFBTSxLQUFOLENBQWQ7O0FBRUEsU0FBRyxPQUFILEVBQVksSUFBWjtBQUNEO0FBQ0YsR0FaRDs7QUFjQTtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZHJvcHBhYmxlRWxlbWVudCwgdGhpcy5kcm9wcGFibGVFbGVtZW50cyk7XG5cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuICAgIFxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHNob3dNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5zaG93KCk7XG4gIH1cblxuICBoaWRlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuaGlkZSgpO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgb25EcmFnRXZlbnQoZHJhZ0V2ZW50LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5ID0gZHJhZ0V2ZW50LmdldEVudHJ5KCksXG4gICAgICAgIGRyYWdFdmVudFR5cGUgPSBkcmFnRXZlbnQuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnRXZlbnRUeXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVEFSVDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVE9QOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5EUkFHOlxuICAgICAgICB0aGlzLmRyYWcoZW50cnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSwgY2IpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIGlmICghdGhpcy5pc0tlZXBpbmdNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIuYWRkTWFya2VyKGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmlzTG9zaW5nTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIpIHtcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGVudHJpZXMucmV2ZXJzZSgpOyAgLy8vXG5cbiAgICBhc3luY0ZvckVhY2goZW50cmllcywgZnVuY3Rpb24oZW50cnksIG5leHQpIHtcbiAgICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3Btb3N0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgICBlbnRyeUlzRGlyZWN0b3J5ID0gZW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIG5leHQpIDpcbiAgICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCwgbmV4dCk7XG4gICAgfS5iaW5kKHRoaXMpLCBkb25lKVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGVudHJ5Qm91bmRzID0gZW50cnkuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZW50cnlCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBpc0tlZXBpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAga2VlcGluZ01hcmtlciA9IG92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICByZXR1cm4ga2VlcGluZ01hcmtlcjtcbiAgfVxuXG4gIGlzTG9zaW5nTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGxvc2luZ01hcmtlciA9ICFvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGxvc2luZ01hcmtlcjtcbiAgfVxuXG4gIHRvQWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGFkZE1hcmtlciA9IG92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICByZXR1cm4gYWRkTWFya2VyO1xuICB9XG5cbiAgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC50b0FkZE1hcmtlcihlbnRyeSkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXI7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyO1xuICB9XG5cbiAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50Lmhhc01hcmtlcigpKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXI7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BwYWJsZUVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGluZGV4T2YoZWxlbWVudCwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gbnVsbDtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGFzeW5jRm9yRWFjaChhcnJheSwgY2IsIGRvbmUpIHtcbiAgdmFyIGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSAtMTtcblxuICB2YXIgbmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIGluZGV4Kys7XG5cbiAgICBpZiAoaW5kZXggPT09IGFycmF5TGVuZ3RoKSB7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xuXG4gICAgICBjYihlbGVtZW50LCBuZXh0KTtcbiAgICB9XG4gIH07XG5cbiAgbmV4dCgpO1xufVxuIl19
