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
    value: function moveEntries(entries, sourcePath, targetPath, done) {
      var entry = entries.shift(),
          subEntries = entries;

      this.moveSubEntries(subEntries, sourcePath, targetPath, function () {
        var handleEntry = true;

        this.moveEntry(entry, sourcePath, targetPath, handleEntry, done);
      }.bind(this));
    }
  }, {
    key: 'moveSubEntries',
    value: function moveSubEntries(subEntries, sourcePath, targetPath, done) {
      subEntries.reverse();

      var HANDLE_SUB_ENTRIES = options.HANDLE_SUB_ENTRIES,
          handleSubEntries = this.options[HANDLE_SUB_ENTRIES] !== false,
          handleEntry = handleSubEntries;

      asyncForEach(subEntries, function (entry, next) {
        this.moveEntry(entry, sourcePath, targetPath, handleEntry, next);
      }.bind(this), done);
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, targetPath, handleEntry, next) {
      var entryPath = entry.getPath(),
          sourceEntryPath = entryPath,
          ///
      targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath),
          ///
      entryIsDirectory = entry.isDirectory(),
          handleDirectory = handleEntry,
          handleFile = handleEntry;

      entryIsDirectory ? this.moveDirectory(entry, sourceEntryPath, targetEntryPath, handleDirectory, next) : this.moveFile(entry, sourceEntryPath, targetEntryPath, handleFile, next);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksVUFBVSxRQUFRLFdBQVIsQ0FBZDtJQUNJLE9BQU8sUUFBUSxRQUFSLENBRFg7SUFFSSxZQUFZLFFBQVEsYUFBUixDQUZoQjtJQUdJLFFBQVEsUUFBUSxrQkFBUixDQUhaO0lBSUksYUFBYSxRQUFRLDZCQUFSLENBSmpCO0lBS0ksa0JBQWtCLFFBQVEsa0NBQVIsQ0FMdEI7O0lBT00sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFBQSxvR0FDdkIsUUFEdUI7O0FBRzdCLFVBQUssT0FBTCxHQUFlLFdBQVcsRUFBMUI7O0FBRUEsVUFBSyxpQkFBTCxHQUF5QixFQUF6QjtBQUw2QjtBQU05Qjs7Ozt3Q0FFbUIsZ0IsRUFBa0I7QUFDcEMsV0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixnQkFBNUI7QUFDRDs7OzJDQUVzQixnQixFQUFrQjtBQUN2QyxVQUFJLFFBQVEsUUFBUSxnQkFBUixFQUEwQixLQUFLLGlCQUEvQixDQUFaOztBQUVBLFVBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLGFBQUssaUJBQUwsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBOUIsRUFBcUMsQ0FBckM7QUFDRDtBQUNGOzs7OEJBRVMsSyxFQUFPO0FBQ2YsVUFBSSxZQUFZLE1BQU0sT0FBTixFQUFoQjtVQUNJLFlBQVksTUFBTSxPQUFOLEVBRGhCO1VBRUksYUFBYSxTQUZqQjs7QUFHSSxZQUhKOztBQUtBLGNBQVEsU0FBUjtBQUNFLGFBQUssTUFBTSxLQUFOLENBQVksSUFBakI7QUFDRSxtQkFBUyxXQUFXLEtBQVgsQ0FBaUIsVUFBakIsQ0FBVDtBQUNBOztBQUVGLGFBQUssTUFBTSxLQUFOLENBQVksU0FBakI7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L0IsT0FBTyxPQUFQLEdBQWlCLGdCQUFqQjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUM7QUFDL0IsTUFBSSxRQUFRLElBQVo7O0FBRUEsUUFBTSxJQUFOLENBQVcsVUFBUyxjQUFULEVBQXlCLG1CQUF6QixFQUE4QztBQUN2RCxRQUFJLG1CQUFtQixPQUF2QixFQUFnQztBQUM5QixjQUFRLG1CQUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsS0FBdEIsRUFBNkIsRUFBN0IsRUFBaUMsSUFBakMsRUFBdUM7QUFDckMsTUFBSSxjQUFjLE1BQU0sTUFBeEI7TUFDSSxRQUFRLENBQUMsQ0FEYjs7QUFHQSxNQUFJLE9BQU8sU0FBUCxJQUFPLEdBQVc7QUFDcEI7O0FBRUEsUUFBSSxVQUFVLFdBQWQsRUFBMkI7QUFDekIsVUFBSSxJQUFKLEVBQVU7QUFDUjtBQUNEO0FBQ0YsS0FKRCxNQUlPO0FBQ0wsVUFBSSxVQUFVLE1BQU0sS0FBTixDQUFkOztBQUVBLFNBQUcsT0FBSCxFQUFZLElBQVo7QUFDRDtBQUNGLEdBWkQ7O0FBY0E7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGRyb3BwYWJsZUVsZW1lbnQsIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMpO1xuXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcbiAgICBcbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIHJldHVybiBtYXJrZXIgIT09IG51bGw7XG4gIH1cblxuICBzaG93TWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuc2hvdygpO1xuICB9XG5cbiAgaGlkZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLmhpZGUoKTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG9uRHJhZ0V2ZW50KGRyYWdFdmVudCwgZG9uZSkge1xuICAgIHZhciBlbnRyeSA9IGRyYWdFdmVudC5nZXRFbnRyeSgpLFxuICAgICAgICBkcmFnRXZlbnRUeXBlID0gZHJhZ0V2ZW50LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ0V2ZW50VHlwZSkge1xuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuU1RBUlQ6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuU1RPUDpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuRFJBRzpcbiAgICAgICAgdGhpcy5kcmFnKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIGlmICghdGhpcy5pc0tlZXBpbmdNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlci5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmlzTG9zaW5nTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIpIHtcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXMuc2hpZnQoKSxcbiAgICAgICAgc3ViRW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLm1vdmVTdWJFbnRyaWVzKHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhhbmRsZUVudHJ5ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGhhbmRsZUVudHJ5LCBkb25lKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZVN1YkVudHJpZXMoc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHN1YkVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgdmFyIEhBTkRMRV9TVUJfRU5UUklFUyA9IG9wdGlvbnMuSEFORExFX1NVQl9FTlRSSUVTLFxuICAgICAgICBoYW5kbGVTdWJFbnRyaWVzID0gdGhpcy5vcHRpb25zW0hBTkRMRV9TVUJfRU5UUklFU10gIT09IGZhbHNlLFxuICAgICAgICBoYW5kbGVFbnRyeSA9IGhhbmRsZVN1YkVudHJpZXM7XG5cbiAgICBhc3luY0ZvckVhY2goXG4gICAgICBzdWJFbnRyaWVzLFxuICAgICAgZnVuY3Rpb24oZW50cnksIG5leHQpIHtcbiAgICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGhhbmRsZUVudHJ5LCBuZXh0KTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGRvbmVcbiAgICApXG4gIH1cbiAgXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaGFuZGxlRW50cnksIG5leHQpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3Btb3N0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCksXG4gICAgICAgIGhhbmRsZURpcmVjdG9yeSA9IGhhbmRsZUVudHJ5LFxuICAgICAgICBoYW5kbGVGaWxlID0gaGFuZGxlRW50cnk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGhhbmRsZURpcmVjdG9yeSwgbmV4dCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCwgaGFuZGxlRmlsZSwgbmV4dCk7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZW50cnlCb3VuZHMgPSBlbnRyeS5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhlbnRyeUJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGlzS2VlcGluZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBrZWVwaW5nTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBrZWVwaW5nTWFya2VyO1xuICB9XG5cbiAgaXNMb3NpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgbG9zaW5nTWFya2VyID0gIW92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICByZXR1cm4gbG9zaW5nTWFya2VyO1xuICB9XG5cbiAgdG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgYWRkTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBhZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LnRvQWRkTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihlbGVtZW50LCBhcnJheSkge1xuICB2YXIgaW5kZXggPSBudWxsO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gYXN5bmNGb3JFYWNoKGFycmF5LCBjYiwgZG9uZSkge1xuICB2YXIgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5kZXgrKztcblxuICAgIGlmIChpbmRleCA9PT0gYXJyYXlMZW5ndGgpIHtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIGNiKGVsZW1lbnQsIG5leHQpO1xuICAgIH1cbiAgfTtcblxuICBuZXh0KCk7XG59XG4iXX0=
