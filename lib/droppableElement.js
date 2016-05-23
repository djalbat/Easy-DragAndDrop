'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var options = require('./options'),
    util = require('./util'),
    DragEvent = require('./dragEvent'),
    Entry = require('./explorer/entry'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

var DroppableElement = function (_Element) {
  _inherits(DroppableElement, _Element);

  function DroppableElement(selector, options) {
    _classCallCheck(this, DroppableElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DroppableElement).call(this, selector));

    _this.options = options || {};

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

        case DragEvent.types.DRAGGING:
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
    key: 'dragging',
    value: function dragging(entry) {
      if (this.hasMarker()) {
        if (!this.isKeepingMarker(entry)) {
          var droppableElementToAddMarker = this.droppableElementToAddMarker(entry);

          if (droppableElementToAddMarker !== null) {
            droppableElementToAddMarker.addMarker(entry);

            this.removeMarker();
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
    value: function moveEntries(entry, subEntries, sourcePath, targetPath, done) {
      this.moveSubEntries(subEntries, sourcePath, targetPath, function () {
        var handle = true;

        this.moveEntry(entry, sourcePath, targetPath, handle, done);
      }.bind(this));
    }
  }, {
    key: 'moveSubEntries',
    value: function moveSubEntries(subEntries, sourcePath, targetPath, done) {
      subEntries.reverse();

      var HANDLE_SUB_ENTRIES = options.HANDLE_SUB_ENTRIES,
          handle = this.options[HANDLE_SUB_ENTRIES] !== false;

      asyncForEach(subEntries, function (entry, next) {
        this.moveEntry(entry, sourcePath, targetPath, handle, next);
      }.bind(this), done);
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, targetPath, handle, next) {
      var entryPath = entry.getPath(),
          sourceEntryPath = entryPath,
          ///
      targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath),
          ///
      entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourceEntryPath, targetEntryPath, handle, next) : this.moveFile(entry, sourceEntryPath, targetEntryPath, handle, next);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksVUFBVSxRQUFRLFdBQVIsQ0FBZDtJQUNJLE9BQU8sUUFBUSxRQUFSLENBRFg7SUFFSSxZQUFZLFFBQVEsYUFBUixDQUZoQjtJQUdJLFFBQVEsUUFBUSxrQkFBUixDQUhaO0lBSUksYUFBYSxRQUFRLDZCQUFSLENBSmpCO0lBS0ksa0JBQWtCLFFBQVEsa0NBQVIsQ0FMdEI7O0lBT00sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFBQSxvR0FDdkIsUUFEdUI7O0FBRzdCLFVBQUssT0FBTCxHQUFlLFdBQVcsRUFBMUI7O0FBRUEsVUFBSyxpQkFBTCxHQUF5QixFQUF6QjtBQUw2QjtBQU05Qjs7Ozt3Q0FFbUIsZ0IsRUFBa0I7QUFDcEMsV0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixnQkFBNUI7QUFDRDs7OzJDQUVzQixnQixFQUFrQjtBQUN2QyxVQUFJLFFBQVEsUUFBUSxnQkFBUixFQUEwQixLQUFLLGlCQUEvQixDQUFaOztBQUVBLFVBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLGFBQUssaUJBQUwsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBOUIsRUFBcUMsQ0FBckM7QUFDRDtBQUNGOzs7OEJBRVMsSyxFQUFPO0FBQ2YsVUFBSSxZQUFZLE1BQU0sT0FBTixFQUFoQjtVQUNJLFlBQVksTUFBTSxPQUFOLEVBRGhCO1VBRUksYUFBYSxTQUZqQjs7QUFHSSxZQUhKOztBQUtBLGNBQVEsU0FBUjtBQUNFLGFBQUssTUFBTSxLQUFOLENBQVksSUFBakI7QUFDRSxtQkFBUyxXQUFXLEtBQVgsQ0FBaUIsVUFBakIsQ0FBVDtBQUNBOztBQUVGLGFBQUssTUFBTSxLQUFOLENBQVksU0FBakI7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QUFFQSxRQUFNLElBQU4sQ0FBVyxVQUFTLGNBQVQsRUFBeUIsbUJBQXpCLEVBQThDO0FBQ3ZELFFBQUksbUJBQW1CLE9BQXZCLEVBQWdDO0FBQzlCLGNBQVEsbUJBQVI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU8sS0FBUDtBQUNEOztBQUVELFNBQVMsWUFBVCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixFQUFpQyxJQUFqQyxFQUF1QztBQUNyQyxNQUFJLGNBQWMsTUFBTSxNQUF4QjtNQUNJLFFBQVEsQ0FBQyxDQURiOztBQUdBLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBVztBQUNwQjs7QUFFQSxRQUFJLFVBQVUsV0FBZCxFQUEyQjtBQUN6QixVQUFJLElBQUosRUFBVTtBQUNSO0FBQ0Q7QUFDRixLQUpELE1BSU87QUFDTCxVQUFJLFVBQVUsTUFBTSxLQUFOLENBQWQ7O0FBRUEsU0FBRyxPQUFILEVBQVksSUFBWjtBQUNEO0FBQ0YsR0FaRDs7QUFjQTtBQUNEIiwiZmlsZSI6ImRyb3BwYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50JyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIERyb3BwYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZHJvcHBhYmxlRWxlbWVudCwgdGhpcy5kcm9wcGFibGVFbGVtZW50cyk7XG5cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuICAgIFxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHNob3dNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5zaG93KCk7XG4gIH1cblxuICBoaWRlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuaGlkZSgpO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgb25EcmFnRXZlbnQoZHJhZ0V2ZW50LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5ID0gZHJhZ0V2ZW50LmdldEVudHJ5KCksXG4gICAgICAgIGRyYWdFdmVudFR5cGUgPSBkcmFnRXZlbnQuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnRXZlbnRUeXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVEFSVDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVE9QOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLmlzS2VlcGluZ01hcmtlcihlbnRyeSkpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRoYXRIYXNNYXJrZXJJc0xvc2luZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuaXNMb3NpbmdNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRoYXRIYXNNYXJrZXJJc0xvc2luZ01hcmtlcikge1xuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyeSwgc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHRoaXMubW92ZVN1YkVudHJpZXMoc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaGFuZGxlID0gdHJ1ZTtcblxuICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGhhbmRsZSwgZG9uZSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVTdWJFbnRyaWVzKHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBzdWJFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgIHZhciBIQU5ETEVfU1VCX0VOVFJJRVMgPSBvcHRpb25zLkhBTkRMRV9TVUJfRU5UUklFUyxcbiAgICAgICAgaGFuZGxlID0gdGhpcy5vcHRpb25zW0hBTkRMRV9TVUJfRU5UUklFU10gIT09IGZhbHNlO1xuXG4gICAgYXN5bmNGb3JFYWNoKFxuICAgICAgc3ViRW50cmllcyxcbiAgICAgIGZ1bmN0aW9uKGVudHJ5LCBuZXh0KSB7XG4gICAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBoYW5kbGUsIG5leHQpO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZG9uZVxuICAgIClcbiAgfVxuICBcbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBoYW5kbGUsIG5leHQpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3Btb3N0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGhhbmRsZSwgbmV4dCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCwgaGFuZGxlLCBuZXh0KTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBlbnRyeUJvdW5kcyA9IGVudHJ5LmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0VudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGVudHJ5Qm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgaXNLZWVwaW5nTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGtlZXBpbmdNYXJrZXIgPSBvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGtlZXBpbmdNYXJrZXI7XG4gIH1cblxuICBpc0xvc2luZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBsb3NpbmdNYXJrZXIgPSAhb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBsb3NpbmdNYXJrZXI7XG4gIH1cblxuICB0b0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBhZGRNYXJrZXIgPSBvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGFkZE1hcmtlcjtcbiAgfVxuXG4gIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQudG9BZGRNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgfVxuXG4gIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5oYXNNYXJrZXIoKSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGVsZW1lbnQsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IG51bGw7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBhc3luY0ZvckVhY2goYXJyYXksIGNiLCBkb25lKSB7XG4gIHZhciBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gLTE7XG5cbiAgdmFyIG5leHQgPSBmdW5jdGlvbigpIHtcbiAgICBpbmRleCsrO1xuXG4gICAgaWYgKGluZGV4ID09PSBhcnJheUxlbmd0aCkge1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcblxuICAgICAgY2IoZWxlbWVudCwgbmV4dCk7XG4gICAgfVxuICB9O1xuXG4gIG5leHQoKTtcbn1cbiJdfQ==
