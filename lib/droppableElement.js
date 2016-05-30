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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DroppableElement).call(this, selector));
  }

  _createClass(DroppableElement, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFFBQVEsUUFBUSxrQkFBUixDQURaO0lBRUksWUFBWSxRQUFRLGFBQVIsQ0FGaEI7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLCtGQUNkLFFBRGM7QUFFckI7Ozs7a0RBRTZCLDhCLEVBQWdDO0FBQzVELFVBQUksU0FBUyxLQUFLLFNBQUwsRUFBYjtVQUNJLDhCQUE4QixPQUFPLGNBQVAsQ0FBc0IsOEJBQXRCLENBRGxDOztBQUdBLGFBQU8sMkJBQVA7QUFDRDs7O2dDQUVXLFMsRUFBVztBQUNyQixVQUFJLFNBQVMsVUFBVSxTQUFWLEVBQWI7VUFDSSxtQkFBbUIsVUFBVSxtQkFBVixFQUR2QjtVQUVJLFFBQVEsZ0JBRlosQzs7QUFJQSxjQUFRLE1BQVI7QUFDRSxhQUFLLFVBQVUsT0FBVixDQUFrQixjQUF2QjtBQUNFLGlCQUFPLEtBQUssYUFBTCxDQUFtQixLQUFuQixDQUFQOztBQUVGLGFBQUssVUFBVSxPQUFWLENBQWtCLGFBQXZCO0FBQ0UsZUFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0E7O0FBRUYsYUFBSyxVQUFVLE9BQVYsQ0FBa0IsUUFBdkI7QUFDRSxlQUFLLFFBQUwsQ0FBYyxLQUFkO0FBQ0E7QUFWSjtBQVlEOzs7OEJBRVMsSyxFQUFPO0FBQ2YsVUFBSSxZQUFZLE1BQU0sT0FBTixFQUFoQjtVQUNJLFlBQVksTUFBTSxPQUFOLEVBRGhCO1VBRUksYUFBYSxTQUZqQjs7QUFHSSxZQUhKOztBQUtBLGNBQVEsU0FBUjtBQUNFLGFB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ZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcbiAgfVxuXG4gIG9uRHJhZ0V2ZW50KGRyYWdFdmVudCkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQ7ICAvLy9cblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBtYXJrZXJOYW1lID0gZW50cnlOYW1lLCAvLy9cbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKG1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJ5LCBzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdGhpcy5tb3ZlU3ViRW50cmllcyhzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpc1N1YkVudHJ5ID0gZmFsc2U7XG5cbiAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBkb25lKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZVN1YkVudHJpZXMoc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHN1YkVudHJpZXMucmV2ZXJzZSgpOyAvLy9cblxuICAgIHZhciBpc1N1YkVudHJ5ID0gdHJ1ZTtcblxuICAgIGFzeW5jRm9yRWFjaChcbiAgICAgIHN1YkVudHJpZXMsXG4gICAgICBmdW5jdGlvbihzdWJFbnRyeSwgbmV4dCkge1xuICAgICAgICB0aGlzLm1vdmVFbnRyeShzdWJFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBkb25lXG4gICAgKVxuICB9XG5cbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgIHRhcmdldEVudHJ5UGF0aCA9IHRhcmdldFBhdGggPT09IG51bGwgP1xuICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgdXRpbC5yZXBsYWNlVG9wUGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGlzU3ViRW50cnksIG5leHQpIDpcbiAgICAgICAgdGhpcy5tb3ZlRmlsZShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGlzU3ViRW50cnksIG5leHQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gYXN5bmNGb3JFYWNoKGFycmF5LCBjYiwgZG9uZSkge1xuICB2YXIgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5kZXgrKztcblxuICAgIGlmIChpbmRleCA9PT0gYXJyYXlMZW5ndGgpIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIGNiKGVsZW1lbnQsIG5leHQpO1xuICAgIH1cbiAgfTtcblxuICBuZXh0KCk7XG59XG4iXX0=
