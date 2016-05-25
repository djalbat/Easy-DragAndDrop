'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Body = easyui.Body,
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

    _this.draggedEntry = null;

    var body = new Body();

    body.onMouseUp(_this.mouseUp.bind(_this));
    body.onMouseMove(_this.mouseMove.bind(_this));
    body.onMouseOut(_this.mouseOut.bind(_this));
    return _this;
  }

  _createClass(DroppableElement, [{
    key: 'mouseUp',
    value: function mouseUp(mouseTop, mouseLeft, mouseButton) {
      if (this.draggedEntry !== null) {
        this.draggedEntry.mouseUp(mouseTop, mouseLeft, mouseButton);
      }
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(mouseTop, mouseLeft, mouseButton) {
      if (this.draggedEntry !== null) {
        this.draggedEntry.mouseMove(mouseTop, mouseLeft, mouseButton);
      }
    }
  }, {
    key: 'mouseOut',
    value: function mouseOut(mouseTop, mouseLeft, mouseButton) {
      if (this.draggedEntry !== null) {
        this.draggedEntry.mouseOut(mouseTop, mouseLeft, mouseButton);
      }
    }
  }, {
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

      this.draggedEntry = entry;

      return true;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      this.draggedEntry = null;

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
      targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath),
          ///
      entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourceEntryPath, targetEntryPath, isSubEntry, next) : this.moveFile(entry, sourceEntryPath, targetEntryPath, isSubEntry, next);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksT0FBTyxPQUFPLElBRGxCO0lBRUksVUFBVSxPQUFPLE9BRnJCOztBQUlBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFlBQVksUUFBUSxhQUFSLENBRGhCO0lBRUksUUFBUSxRQUFRLGtCQUFSLENBRlo7SUFHSSxhQUFhLFFBQVEsNkJBQVIsQ0FIakI7SUFJSSxrQkFBa0IsUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLG9HQUNkLFFBRGM7O0FBR3BCLFVBQUssaUJBQUwsR0FBeUIsRUFBekI7O0FBRUEsVUFBSyxZQUFMLEdBQW9CLElBQXBCOztBQUVBLFFBQUksT0FBTyxJQUFJLElBQUosRUFBWDs7QUFFQSxTQUFLLFNBQUwsQ0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFDQSxTQUFLLFdBQUwsQ0FBaUIsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFqQjtBQUNBLFNBQUssVUFBTCxDQUFnQixNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWhCO0FBWG9CO0FBWXJCOzs7OzRCQUVPLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ3hDLFVBQUksS0FBSyxZQUFMLEtBQXNCLElBQTFCLEVBQWdDO0FBQzlCLGFBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixRQUExQixFQUFvQyxTQUFwQyxFQUErQyxXQUEvQztBQUNEO0FBQ0Y7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxVQUFJLEtBQUssWUFBTCxLQUFzQixJQUExQixFQUFnQztBQUM5QixhQUFLLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBNEIsUUFBNUIsRUFBc0MsU0FBdEMsRUFBaUQsV0FBakQ7QUFDRDtBQUNGOzs7NkJBRVEsUSxF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cEI7O0FBRUEsUUFBSSxVQUFVLFdBQWQsRUFBMkI7QUFDekIsVUFBSSxJQUFKLEVBQVU7QUFDUjtBQUNEO0FBQ0YsS0FKRCxNQUlPO0FBQ0wsVUFBSSxVQUFVLE1BQU0sS0FBTixDQUFkOztBQUVBLFNBQUcsT0FBSCxFQUFZLElBQVo7QUFDRDtBQUNGLEdBWkQ7O0FBY0E7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgQm9keSA9IGVhc3l1aS5Cb2R5LFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcblxuICAgIHRoaXMuZHJhZ2dlZEVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICB2YXIgYm9keSA9IG5ldyBCb2R5KCk7XG5cbiAgICBib2R5Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXAuYmluZCh0aGlzKSk7XG4gICAgYm9keS5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICBib2R5Lm9uTW91c2VPdXQodGhpcy5tb3VzZU91dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdXNlVXAobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy5kcmFnZ2VkRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVudHJ5Lm1vdXNlVXAobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZShtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLmRyYWdnZWRFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5kcmFnZ2VkRW50cnkubW91c2VNb3ZlKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU91dChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLmRyYWdnZWRFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5kcmFnZ2VkRW50cnkubW91c2VPdXQobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZHJvcHBhYmxlRWxlbWVudCwgdGhpcy5kcm9wcGFibGVFbGVtZW50cyk7XG5cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuICAgIFxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuIG1hcmtlciAhPT0gbnVsbDtcbiAgfVxuXG4gIHNob3dNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5zaG93KCk7XG4gIH1cblxuICBoaWRlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuaGlkZSgpO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgb25EcmFnRXZlbnQoZHJhZ0V2ZW50LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5ID0gZHJhZ0V2ZW50LmdldEVudHJ5KCksXG4gICAgICAgIGRyYWdFdmVudFR5cGUgPSBkcmFnRXZlbnQuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnRXZlbnRUeXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVEFSVDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnREcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5TVE9QOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC50eXBlcy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgIHRoaXMuZHJhZ2dlZEVudHJ5ID0gZW50cnk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMuZHJhZ2dlZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIGlmICghdGhpcy5pc0tlZXBpbmdNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlci5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmlzTG9zaW5nTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUaGF0SGFzTWFya2VySXNMb3NpbmdNYXJrZXIpIHtcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUVudHJpZXMoZW50cnksIHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB0aGlzLm1vdmVTdWJFbnRyaWVzKHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzU3ViRW50cnkgPSBmYWxzZTtcblxuICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGRvbmUpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlU3ViRW50cmllcyhzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgc3ViRW50cmllcy5yZXZlcnNlKCk7IC8vL1xuXG4gICAgdmFyIGlzU3ViRW50cnkgPSB0cnVlO1xuXG4gICAgYXN5bmNGb3JFYWNoKFxuICAgICAgc3ViRW50cmllcyxcbiAgICAgIGZ1bmN0aW9uKHN1YkVudHJ5LCBuZXh0KSB7XG4gICAgICAgIHRoaXMubW92ZUVudHJ5KHN1YkVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGRvbmVcbiAgICApXG4gIH1cbiAgXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIHNvdXJjZUVudHJ5UGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVRvcG1vc3RQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCksIC8vL1xuICAgICAgICBlbnRyeUlzRGlyZWN0b3J5ID0gZW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGVudHJ5SXNEaXJlY3RvcnkgP1xuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VFbnRyeVBhdGgsIHRhcmdldEVudHJ5UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCk7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZW50cnlCb3VuZHMgPSBlbnRyeS5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhlbnRyeUJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGlzS2VlcGluZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBrZWVwaW5nTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBrZWVwaW5nTWFya2VyO1xuICB9XG5cbiAgaXNMb3NpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgbG9zaW5nTWFya2VyID0gIW92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICByZXR1cm4gbG9zaW5nTWFya2VyO1xuICB9XG5cbiAgdG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgYWRkTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBhZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LnRvQWRkTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihlbGVtZW50LCBhcnJheSkge1xuICB2YXIgaW5kZXggPSBudWxsO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gYXN5bmNGb3JFYWNoKGFycmF5LCBjYiwgZG9uZSkge1xuICB2YXIgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5kZXgrKztcblxuICAgIGlmIChpbmRleCA9PT0gYXJyYXlMZW5ndGgpIHtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIGNiKGVsZW1lbnQsIG5leHQpO1xuICAgIH1cbiAgfTtcblxuICBuZXh0KCk7XG59XG4iXX0=
