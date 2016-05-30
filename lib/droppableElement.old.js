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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50Lm9sZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLE9BQU8sT0FBTyxJQURsQjtJQUVJLFVBQVUsT0FBTyxPQUZyQjs7QUFJQSxJQUFJLE9BQU8sUUFBUSxRQUFSLENBQVg7SUFDSSxZQUFZLFFBQVEsYUFBUixDQURoQjtJQUVJLGFBQWEsUUFBUSw2QkFBUixDQUZqQjtJQUdJLGtCQUFrQixRQUFRLGtDQUFSLENBSHRCOztJQUtNLGdCOzs7QUFDSiw0QkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsb0dBQ2QsUUFEYzs7QUFHcEIsVUFBSyxpQkFBTCxHQUF5QixFQUF6Qjs7QUFFQSxVQUFLLFlBQUwsR0FBb0IsSUFBcEI7O0FBRUEsUUFBSSxPQUFPLElBQUksSUFBSixFQUFYOztBQUVBLFNBQUssU0FBTCxDQUFlLE1BQUssT0FBTCxDQUFhLElBQWIsT0FBZjtBQUNBLFNBQUssV0FBTCxDQUFpQixNQUFLLFNBQUwsQ0FBZSxJQUFmLE9BQWpCO0FBQ0EsU0FBSyxVQUFMLENBQWdCLE1BQUssUUFBTCxDQUFjLElBQWQsT0FBaEI7QUFYb0I7QUFZckI7Ozs7NEJBRU8sUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDeEMsVUFBSSxLQUFLLFlBQUwsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDOUIsYUFBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLFFBQTFCLEVBQW9DLFNBQXBDLEVBQStDLFdBQS9DO0FBQ0Q7QUFDRjs7OzhCQUVTLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQzFDLFVBQUksS0FBSyxZQUFMLEtBQXNCLElBQTFCLEVBQWdDO0FBQzlCLGFBQUssWUFBTCxDQUFrQixTQUFsQixDQUE0QixRQUE1QixFQUFzQyxTQUF0QyxFQUFpRCxXQUFqRDtBQUNEO0FBQ0Y7Ozs2QkFFUSxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUN6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UDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPLEtBQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50Lm9sZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEJvZHkgPSBlYXN5dWkuQm9keSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRHJvcHBhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG5cbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgdmFyIGJvZHkgPSBuZXcgQm9keSgpO1xuXG4gICAgYm9keS5vbk1vdXNlVXAodGhpcy5tb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIGJvZHkub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgYm9keS5vbk1vdXNlT3V0KHRoaXMubW91c2VPdXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3VzZVVwKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dlZEVudHJ5ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbnRyeS5tb3VzZVVwKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmUobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy5kcmFnZ2VkRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVudHJ5Lm1vdXNlTW92ZShtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgbW91c2VPdXQobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy5kcmFnZ2VkRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVudHJ5Lm1vdXNlT3V0KG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGRyb3BwYWJsZUVsZW1lbnQsIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMpO1xuXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cblxuICBzaG93TWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIuc2hvdygpO1xuICB9XG5cbiAgaGlkZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLmhpZGUoKTtcbiAgfVxuXG4gIG9uRHJhZ0V2ZW50KGRyYWdFdmVudCwgZG9uZSkge1xuICAgIHZhciBlbnRyeSA9IGRyYWdFdmVudC5nZXRFbnRyeSgpLFxuICAgICAgICBkcmFnRXZlbnRUeXBlID0gZHJhZ0V2ZW50LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ0V2ZW50VHlwZSkge1xuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuU1RBUlQ6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuU1RPUDpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQudHlwZXMuRFJBR0dJTkc6XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICBpZiAoIXRoaXMuaXNLZWVwaW5nTWFya2VyKGVudHJ5KSkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VGhhdEhhc01hcmtlcklzTG9zaW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5pc0xvc2luZ01hcmtlcihlbnRyeSk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VGhhdEhhc01hcmtlcklzTG9zaW5nTWFya2VyKSB7XG4gICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBlbnRyeUJvdW5kcyA9IGVudHJ5LmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0VudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGVudHJ5Qm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgaXNLZWVwaW5nTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGtlZXBpbmdNYXJrZXIgPSBvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGtlZXBpbmdNYXJrZXI7XG4gIH1cblxuICBpc0xvc2luZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBsb3NpbmdNYXJrZXIgPSAhb3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIHJldHVybiBsb3NpbmdNYXJrZXI7XG4gIH1cblxuICB0b0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBhZGRNYXJrZXIgPSBvdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgcmV0dXJuIGFkZE1hcmtlcjtcbiAgfVxuXG4gIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9BZGRNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQudG9BZGRNYXJrZXIoZW50cnkpKSB7XG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQWRkTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0FkZE1hcmtlcjtcbiAgfVxuXG4gIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5oYXNNYXJrZXIoKSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGVsZW1lbnQsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IG51bGw7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuIl19
