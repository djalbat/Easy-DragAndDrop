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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50Lm9sZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLE9BQU8sT0FBTyxJQURsQjtJQUVJLFVBQVUsT0FBTyxPQUZyQjs7QUFJQSxJQUFJLE9BQU8sUUFBUSxRQUFSLENBQVg7SUFDSSxZQUFZLFFBQVEsYUFBUixDQURoQjtJQUVJLFFBQVEsUUFBUSxrQkFBUixDQUZaO0lBR0ksYUFBYSxRQUFRLDZCQUFSLENBSGpCO0lBSUksa0JBQWtCLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU0sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFBQSxvR0FDZCxRQURjOztBQUdwQixVQUFLLGlCQUFMLEdBQXlCLEVBQXpCOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFwQjs7QUFFQSxRQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7O0FBRUEsU0FBSyxTQUFMLENBQWUsTUFBSyxPQUFMLENBQWEsSUFBYixPQUFmO0FBQ0EsU0FBSyxXQUFMLENBQWlCLE1BQUssU0FBTCxDQUFlLElBQWYsT0FBakI7QUFDQSxTQUFLLFVBQUwsQ0FBZ0IsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFoQjtBQVhvQjtBQVlyQjs7Ozs0QkFFTyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUN4QyxVQUFJLEtBQUssWUFBTCxLQUFzQixJQUExQixFQUFnQztBQUM5QixhQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBMEIsUUFBMUIsRUFBb0MsU0FBcEMsRUFBK0MsV0FBL0M7QUFDRDtBQUNGOzs7OEJBRVMsUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDMUMsVUFBSSxLQUFLLFlBQUwsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDOUIsYUFBSyxZQUFMLENBQWtCLFNBQWxCLENBQTRCLFFBQTVCLEVBQXNDLFNBQXRDLEVBQWlELFdBQWpEO0FBQ0Q7QUFDRjs7OzZCQUVR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QUFJLDhCQUE4QixLQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLFVBQVMsMkJBQVQsRUFBc0MsZ0JBQXRDLEVBQXdEO0FBQ3RILFlBQUksZ0NBQWdDLElBQXBDLEVBQTBDO0FBQ3hDLGNBQUksaUJBQWlCLFdBQWpCLENBQTZCLEtBQTdCLENBQUosRUFBeUM7QUFDdkMsMENBQThCLGdCQUE5QjtBQUNEO0FBQ0Y7O0FBRUQsZUFBTywyQkFBUDtBQUNELE9BUmlDLEVBUS9CLElBUitCLENBQWxDOztBQVVBLGFBQU8sMkJBQVA7QUFDRDs7O21EQUU4QjtBQUM3QixVQUFJLCtCQUErQixLQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLFVBQVMsNEJBQVQsRUFBdUMsZ0JBQXZDLEVBQXlEO0FBQ3hILFlBQUksaUNBQWlDLElBQXJDLEVBQTJDO0FBQ3pDLGNBQUksaUJBQWlCLFNBQWpCLEVBQUosRUFBa0M7QUFDaEMsMkNBQStCLGdCQUEvQjtBQUNEO0FBQ0Y7O0FBRUQsZUFBTyw0QkFBUDtBQUNELE9BUmtDLEVBUWhDLElBUmdDLENBQW5DOztBQVVBLGFBQU8sNEJBQVA7QUFDRDs7OztFQXJPNEIsTzs7QUF3Ty9CLE9BQU8sT0FBUCxHQUFpQixnQkFBakI7O0FBRUEsU0FBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQy9CLE1BQUksUUFBUSxJQUFaOztBQUVBLFFBQU0sSUFBTixDQUFXLFVBQVMsY0FBVCxFQUF5QixtQkFBekIsRUFBOEM7QUFDdkQsUUFBSSxtQkFBbUIsT0FBdkIsRUFBZ0M7QUFDOUIsY0FBUSxtQkFBUjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBTyxLQUFQO0FBQ0QiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5vbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50JyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5JyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIERyb3BwYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cyA9IFtdO1xuXG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBudWxsO1xuICAgIFxuICAgIHZhciBib2R5ID0gbmV3IEJvZHkoKTtcblxuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICBib2R5Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIGJvZHkub25Nb3VzZU91dCh0aGlzLm1vdXNlT3V0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW91c2VVcChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLmRyYWdnZWRFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5kcmFnZ2VkRW50cnkubW91c2VVcChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dlZEVudHJ5ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbnRyeS5tb3VzZU1vdmUobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3V0KG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dlZEVudHJ5ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbnRyeS5tb3VzZU91dChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgYWRkRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5wdXNoKGRyb3BwYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcHBhYmxlRWxlbWVudChkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihkcm9wcGFibGVFbGVtZW50LCB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzKTtcblxuICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG4gICAgXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICByZXR1cm4gbWFya2VyICE9PSBudWxsO1xuICB9XG5cbiAgc2hvd01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnNob3coKTtcbiAgfVxuXG4gIGhpZGVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5oaWRlKCk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygpLFxuICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZXIsIGNoaWxkRWxlbWVudCkge1xuICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRmlsZU1hcmtlcilcbiAgICAgICAgICAgICB8fCAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSkge1xuICAgICAgICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBvbkRyYWdFdmVudChkcmFnRXZlbnQsIGRvbmUpIHtcbiAgICB2YXIgZW50cnkgPSBkcmFnRXZlbnQuZ2V0RW50cnkoKSxcbiAgICAgICAgZHJhZ0V2ZW50VHlwZSA9IGRyYWdFdmVudC5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdFdmVudFR5cGUpIHtcbiAgICAgIGNhc2UgRHJhZ0V2ZW50LnR5cGVzLlNUQVJUOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LnR5cGVzLlNUT1A6XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LnR5cGVzLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBlbnRyeTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgaWYgKCF0aGlzLmlzS2VlcGluZ01hcmtlcihlbnRyeSkpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRoYXRIYXNNYXJrZXJJc0xvc2luZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuaXNMb3NpbmdNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRoYXRIYXNNYXJrZXJJc0xvc2luZ01hcmtlcikge1xuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZW50cnlCb3VuZHMgPSBlbnRyeS5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhlbnRyeUJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGlzS2VlcGluZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBrZWVwaW5nTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBrZWVwaW5nTWFya2VyO1xuICB9XG5cbiAgaXNMb3NpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgbG9zaW5nTWFya2VyID0gIW92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICByZXR1cm4gbG9zaW5nTWFya2VyO1xuICB9XG5cbiAgdG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgYWRkTWFya2VyID0gb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBhZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LnRvQWRkTWFya2VyKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXI7XG4gIH1cblxuICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcjtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihlbGVtZW50LCBhcnJheSkge1xuICB2YXIgaW5kZXggPSBudWxsO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cbiJdfQ==
