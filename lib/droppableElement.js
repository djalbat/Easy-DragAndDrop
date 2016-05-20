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
    value: function onDragEvent(dragEvent) {
      var entry = dragEvent.getEntry(),
          dragEventType = dragEvent.getType();

      switch (dragEventType) {
        case DragEvent.types.START:
          return this.startDragging(entry);
          break;

        case DragEvent.types.STOP:
          this.stopDragging(entry);
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
    key: 'dragEntries',
    value: function dragEntries(entries, sourcePath, targetPath) {
      entries.reverse(); ///

      entries.forEach(function (entry) {
        var entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath),
            ///
        entryIsDirectory = entry.isDirectory();

        entryIsDirectory ? this.dragDirectory(entry, sourceEntryPath, targetEntryPath) : this.dragFile(entry, sourceEntryPath, targetEntryPath);
      }.bind(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFlBQVksUUFBUSxhQUFSLENBRGhCO0lBRUksUUFBUSxRQUFRLGtCQUFSLENBRlo7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG9HQUNkLFFBRGM7O0FBR3BCLFVBQUssaUJBQUwsR0FBeUIsRUFBekI7QUFIb0I7QUFJckI7Ozs7d0NBRW1CLGdCLEVBQWtCO0FBQ3BDLFdBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0IsZ0IsRUFBa0I7QUFDdkMsVUFBSSxRQUFRLFFBQVEsZ0JBQVIsRUFBMEIsS0FBSyxpQkFBL0IsQ0FBWjs7QUFFQSxVQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixhQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLEtBQTlCLEVBQXFDLENBQXJDO0FBQ0Q7QUFDRjs7OzhCQUVTLEssRUFBTztBQUNmLFVBQUksWUFBWSxNQUFNLE9BQU4sRUFBaEI7VUFDSSxZQUFZLE1BQU0sT0FBTixFQURoQjtVQUVJLGFBQWEsU0FGakI7O0FBR0ksWUFISjs7QUFLQSxjQUFRLFNBQVI7QUFDRSxhQUFLLE1BQU0sS0FBTixDQUFZLElBQWpCO0FBQ0UsbUJBQVMsV0FBVyxLQUFYLENBQWlCLFVBQWpCLENBQVQ7QUFDQTs7QUFFRixhQUFLLE1BQU0sS0FBTixDQUFZLFNBQWpCO0FBQ0UsbUJBQVMsZ0JBQWdCLEtBQWhCLENBQXNCLFVBQXRCLENBQVQ7QUFDQTtBQVBKOztBQVVBLFdBQUssTUFBTCxDQUFZ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SSxpQ0FBaUMsSUFBckMsRUFBMkM7QUFDekMsY0FBSSxpQkFBaUIsU0FBakIsRUFBSixFQUFrQztBQUNoQywyQ0FBK0IsZ0JBQS9CO0FBQ0Q7QUFDRjs7QUFFRCxlQUFPLDRCQUFQO0FBQ0QsT0FSa0MsRUFRaEMsSUFSZ0MsQ0FBbkM7O0FBVUEsYUFBTyw0QkFBUDtBQUNEOzs7O0VBbE40QixPOztBQXFOL0IsT0FBTyxPQUFQLEdBQWlCLGdCQUFqQjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUM7QUFDL0IsTUFBSSxRQUFRLElBQVo7O0FBRUEsUUFBTSxJQUFOLENBQVcsVUFBUyxjQUFULEVBQXlCLG1CQUF6QixFQUE4QztBQUN2RCxRQUFJLG1CQUFtQixPQUF2QixFQUFnQztBQUM5QixjQUFRLG1CQUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPLEtBQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50JyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIERyb3BwYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGRyb3BwYWJsZUVsZW1lbnQsIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMpO1xuXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcbiAgICBcbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIHJldHVybiBtYXJrZXIgIT09IG51bGw7XG4gIH1cblxuICBzaG93TWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuc2hvdygpO1xuICB9XG5cbiAgaGlkZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLmhpZGUoKTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG9uRHJhZ0V2ZW50KGRyYWdFdmVudCkge1xuICAgIHZhciBlbnRyeSA9IGRyYWdFdmVudC5nZXRFbnRyeSgpLFxuICAgICAgICBkcmFnRXZlbnRUeXBlID0gZHJhZ0V2ZW50LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ0V2ZW50VHlwZSkge1xuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuU1RBUlQ6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuU1RPUDpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuRFJBRzpcbiAgICAgICAgdGhpcy5kcmFnKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIGlmICghdGhpcy5pc0tlZXBpbmdNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIuYWRkTWFya2VyKGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmlzTG9zaW5nTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIpIHtcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhZ0VudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGVudHJpZXMucmV2ZXJzZSgpOyAgLy8vXG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/IG51bGwgOiB1dGlsLnJlcGxhY2VUb3Btb3N0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgICBlbnRyeUlzRGlyZWN0b3J5ID0gZW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICAgIHRoaXMuZHJhZ0RpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgpIDpcbiAgICAgICAgICB0aGlzLmRyYWdGaWxlKGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBlbnRyeUJvdW5kcyA9IGVudHJ5LmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0VudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGVudHJ5Qm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgaXNLZWVwaW5nTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGtlZXBpbmdNYXJrZXIgPSBvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGtlZXBpbmdNYXJrZXI7XG4gIH1cblxuICBpc0xvc2luZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBsb3NpbmdNYXJrZXIgPSAhb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBsb3NpbmdNYXJrZXI7XG4gIH1cblxuICB0b0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBhZGRNYXJrZXIgPSBvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGFkZE1hcmtlcjtcbiAgfVxuXG4gIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQudG9BZGRNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgfVxuXG4gIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5oYXNNYXJrZXIoKSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGVsZW1lbnQsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IG51bGw7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuIl19
