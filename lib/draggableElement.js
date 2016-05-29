'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

var START_DRAGGING_DELAY = 175,
    NAMESPACE = 'EasyUI-DragAndDrop/dragging';

var body = new Body();

var DraggableElement = function (_Element) {
  _inherits(DraggableElement, _Element);

  function DraggableElement(selector, dragEventHandler) {
    _classCallCheck(this, DraggableElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DraggableElement).call(this, selector));

    _this.dragEventHandler = dragEventHandler;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.onMouseDown(_this.mouseDown.bind(_this));
    return _this;
  }

  _createClass(DraggableElement, [{
    key: 'getDraggingBounds',
    value: function getDraggingBounds() {
      return this.getBounds();
    }
  }, {
    key: 'isOverlappingDraggableElement',
    value: function isOverlappingDraggableElement(draggableElement) {
      var bounds = this.getBounds(),
          draggableElementDraggingBounds = draggableElement.getDraggingBounds(),
          overlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds);

      return overlappingDraggableElement;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var bounds = this.getBounds(),
          top = bounds.getTop(),
          left = bounds.getLeft(),
          css = {
        top: top,
        left: left
      };

      this.css(css);

      this.topOffset = top - mouseTop;
      this.leftOffset = left - mouseLeft;

      this.addClass('dragging');
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      var top = mouseTop + this.topOffset,
          left = mouseLeft + this.leftOffset,
          css = {
        top: top,
        left: left
      };

      this.css(css);

      var draggingEvent = DragEvent.dragging(this);

      this.dragEventHandler(draggingEvent);
    }
  }, {
    key: 'startWaitingToDrag',
    value: function startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
      if (this.timeout === null) {
        this.timeout = setTimeout(function () {
          this.timeout = null;
          var startDraggingEvent = DragEvent.startDragging(this),
              startDragging = this.dragEventHandler(startDraggingEvent);

          if (startDragging) {
            this.startDragging(mouseTop, mouseLeft);
          }
        }.bind(this), START_DRAGGING_DELAY);
      }
    }
  }, {
    key: 'stopWaitingToDrag',
    value: function stopWaitingToDrag() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);

        this.timeout = null;
      }
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      return this.hasClass('dragging');
    }
  }, {
    key: 'isWaitingToDrag',
    value: function isWaitingToDrag() {
      var waitingToDrag = this.timeout !== null;

      return waitingToDrag;
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown(mouseTop, mouseLeft, mouseButton) {
      body.onMouseUp(this.mouseUp.bind(this), NAMESPACE);
      body.onMouseMove(this.mouseMove.bind(this), NAMESPACE);

      if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp(mouseTop, mouseLeft, mouseButton) {
      body.offMouseMove(NAMESPACE);
      body.offMouseUp(NAMESPACE);

      var dragging = this.isDragging();

      if (dragging) {
        var stopDraggingEvent = DragEvent.stopDragging(this);

        this.dragEventHandler(stopDraggingEvent);

        this.stopDragging();
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(mouseTop, mouseLeft, mouseButton) {
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }]);

  return DraggableElement;
}(Element);

module.exports = DraggableElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksT0FBTyxPQUFPLElBRGxCO0lBRUksVUFBVSxPQUFPLE9BRnJCOztBQUlBLElBQUksWUFBWSxRQUFRLGFBQVIsQ0FBaEI7O0FBRUEsSUFBTSx1QkFBdUIsR0FBN0I7SUFDTSxZQUFZLDZCQURsQjs7QUFHQSxJQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7O0lBRU0sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsZ0JBQXRCLEVBQXdDO0FBQUE7O0FBQUEsb0dBQ2hDLFFBRGdDOztBQUd0QyxVQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBSyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBSyxVQUFMLEdBQWtCLElBQWxCOztBQUVBLFVBQUssV0FBTCxDQUFpQixNQUFLLFNBQUwsQ0FBZSxJQUFmLE9BQWpCO0FBVHNDO0FBVXZDOzs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUssU0FBTCxFQUFQO0FBQ0Q7OztrREFFNkIsZ0IsRUFBa0I7QUFDOUMsVUFBSSxTQUFTLEtBQUssU0FBTCxFQUFiO1VBQ0ksaUNBQWlDLGlCQUFpQixpQkFBakIsRUFEckM7VUFFSSw4QkFBOEIsT0FBTyxjQUFQLENBQXNCLDhCQUF0QixDQUZsQzs7QUFJQSxhQUFPLDJCQUFQO0FBQ0Q7OztrQ0FFYSxRLEVBQVUsUyxFQUFXO0FBQ2pDLFVBQUksU0FBUyxLQUFLLFNBQUwsRUFBYjtVQUNJLE1BQU0sT0FBTyxNQUFQLEVBRFY7VUFFSSxPQUFPLE9BQU8sT0FBUCxFQUZYO1VBR0ksTUFBTTtBQUNKLGFBQUssR0FERDtBQUVKLGNBQU07QUFGRixPQUhWOztBQVFBLFdBQUssR0FBTCxDQUFTLEdBQVQ7O0FBRUEsV0FBSyxTQUFMLEdBQWlCLE1BQU0sUUFBdkI7QUFDQSxXQUFLLFVBQUwsR0FBa0IsT0FBTyxTQUF6Qjs7QUFFQSxXQUFLLFFBQUwsQ0FBYyxVQUFkO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUssV0FBTCxDQUFpQixVQUFqQjtBQUNEOzs7NkJBRVEsUSxFQUFVLFMsRUFBVztBQUM1QixVQUFJLE1BQU0sV0FBVyxLQUFLLFNBQTFCO1VBQ0ksT0FBTyxZQUFZLEtBQUssVUFENUI7VUFFSSxNQUFNO0FBQ0osYUFBSyxHQUREO0FBRUosY0FBTTtBQUZGLE9BRlY7O0FBT0EsV0FBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxVQUFJLGdCQUFnQixVQUFVLFFBQVYsQ0FBbUIsSUFBbkIsQ0FBcEI7O0FBRUEsV0FBSyxnQkFBTCxDQUFzQixhQUF0QjtBQUNEOzs7dUNBRWtCLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ25ELFVBQUksS0FBSyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCLGFBQUssT0FBTCxHQUFlLFdBQVcsWUFBVztBQUNuQyxlQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsY0FBSSxxQkFBcUIsVUFBVSxhQUFWLENBQXdCLElBQXhCLENBQXpCO2NBQ0ksZ0JBQWdCLEtBQUssZ0JBQUwsQ0FBc0Isa0JBQXRCLENBRHBCOztBQUdBLGNBQUksYUFBSixFQUFtQjtBQUNqQixpQkFBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCO0FBQ0Q7QUFDRixTQVJ5QixDQVF4QixJQVJ3QixDQVFuQixJQVJtQixDQUFYLEVBUUQsb0JBUkMsQ0FBZjtBQVNEO0FBQ0Y7Ozt3Q0FFbUI7QUFDbEIsVUFBSSxLQUFLLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekIscUJBQWEsS0FBSyxPQUFsQjs7QUFFQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFDRjs7O2lDQUVZO0FBQ1gsYUFBTyxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFJLGdCQUFnQixLQUFLLE9BQUwsS0FBaUIsSUFBckM7O0FBRUEsYUFBTyxhQUFQO0FBQ0Q7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxXQUFLLFNBQUwsQ0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWYsRUFBd0MsU0FBeEM7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixJQUFwQixDQUFqQixFQUE0QyxTQUE1Qzs7QUFFQSxVQUFJLGdCQUFnQixRQUFRLGlCQUE1QixFQUErQztBQUM3QyxZQUFJLFdBQVcsS0FBSyxVQUFMLEVBQWY7O0FBRUEsWUFBSSxDQUFDLFFBQUwsRUFBZTtBQUNiLGVBQUssa0JBQUwsQ0FBd0IsUUFBeEIsRUFBa0MsU0FBbEM7QUFDRDtBQUNGO0FBQ0Y7Ozs0QkFFTyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUN4QyxXQUFLLFlBQUwsQ0FBa0IsU0FBbEI7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsU0FBaEI7O0FBRUEsVUFBSSxXQUFXLEtBQUssVUFBTCxFQUFmOztBQUVBLFVBQUksUUFBSixFQUFjO0FBQ1osWUFBSSxvQkFBb0IsVUFBVSxZQUFWLENBQXVCLElBQXZCLENBQXhCOztBQUVBLGFBQUssZ0JBQUwsQ0FBc0IsaUJBQXRCOztBQUVBLGFBQUssWUFBTDtBQUNELE9BTkQsTUFNTztBQUNMLGFBQUssaUJBQUw7QUFDRDtBQUNGOzs7OEJBRVMsUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDMUMsVUFBSSxXQUFXLEtBQUssVUFBTCxFQUFmOztBQUVBLFVBQUksUUFBSixFQUFjO0FBQ1osYUFBSyxRQUFMLENBQWMsUUFBZCxFQUF3QixTQUF4QjtBQUNEO0FBQ0Y7Ozs7RUFqSTRCLE87O0FBb0kvQixPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKTtcblxuY29uc3QgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzUsXG4gICAgICBOQU1FU1BBQ0UgPSAnRWFzeVVJLURyYWdBbmREcm9wL2RyYWdnaW5nJztcblxudmFyIGJvZHkgPSBuZXcgQm9keSgpO1xuXG5jbGFzcyBEcmFnZ2FibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcmFnRXZlbnRIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyID0gZHJhZ0V2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duLmJpbmQodGhpcykpO1xuICB9XG4gIFxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCb3VuZHMoKTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50KGRyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzID0gZHJhZ2dhYmxlRWxlbWVudC5nZXREcmFnZ2luZ0JvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICBsZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQsXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdmFyIGRyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuZHJhZ2dpbmcodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ2dpbmdFdmVudCk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICB2YXIgc3RhcnREcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0YXJ0RHJhZ2dpbmcodGhpcyksXG4gICAgICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0YXJ0RHJhZ2dpbmdFdmVudCk7XG5cbiAgICAgICAgaWYgKHN0YXJ0RHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBpc1dhaXRpbmdUb0RyYWcoKSB7XG4gICAgdmFyIHdhaXRpbmdUb0RyYWcgPSB0aGlzLnRpbWVvdXQgIT09IG51bGw7XG5cbiAgICByZXR1cm4gd2FpdGluZ1RvRHJhZztcbiAgfVxuXG4gIG1vdXNlRG93bihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcC5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xuICAgIGJvZHkub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7XG4gICAgYm9keS5vZmZNb3VzZVVwKE5BTUVTUEFDRSk7XG5cbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdmFyIHN0b3BEcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0b3BEcmFnZ2luZyh0aGlzKTtcblxuICAgICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0b3BEcmFnZ2luZ0V2ZW50KTtcbiAgICAgIFxuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZShtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=
