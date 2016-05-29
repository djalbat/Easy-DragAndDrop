'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DragEvent = require('./event');

var START_DRAGGING_DELAY = 175;

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
    _this.onMouseUp(_this.mouseUp.bind(_this));
    return _this;
  }

  _createClass(DraggableElement, [{
    key: 'isDragged',
    value: function isDragged() {
      var dragged = this.hasClass('dragged') && !this.hasClass('stopDragging');

      return dragged;
    }
  }, {
    key: 'isWaitingToDrag',
    value: function isWaitingToDrag() {
      var waitingToDrag = this.timeout !== null;

      return waitingToDrag;
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp(mouseTop, mouseLeft, mouseButton) {
      var dragged = this.isDragged();

      if (dragged) {
        this.stopDragging();
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown(mouseTop, mouseLeft, mouseButton) {
      if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
        var dragged = this.isDragged();

        if (!dragged) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(mouseTop, mouseLeft, mouseButton) {
      var dragged = this.isDragged();

      if (dragged) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: 'mouseOut',
    value: function mouseOut(mouseTop, mouseLeft, mouseButton) {
      var dragged = this.isDragged(),
          waitingToDrag = this.isWaitingToDrag();

      if (dragged) {
        this.stopDragging();
      } else {
        if (waitingToDrag) {
          this.stopWaitingToDrag();
        }
      }
    }
  }, {
    key: 'startWaitingToDrag',
    value: function startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
      if (this.timeout === null) {
        this.timeout = setTimeout(function () {
          this.startDragging(mouseTop, mouseLeft);
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
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      this.timeout = null;

      var dragEvent = DragEvent.start(this),
          startDragging = this.dragEventHandler(dragEvent);

      if (startDragging) {
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

        this.addClass('dragged');
      }
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.addClass('stopDragging');

      var dragEvent = DragEvent.stop(this);

      this.dragEventHandler(dragEvent, function () {
        this.removeClass('stopDragging');
        this.removeClass('dragged');
      }.bind(this));
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

      var dragEvent = DragEvent.dragging(this);

      this.dragEventHandler(dragEvent);
    }
  }]);

  return DraggableElement;
}(Element);

module.exports = DraggableElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbGVtZW50Lm9sZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLFVBQVUsT0FBTyxPQURyQjs7QUFHQSxJQUFJLFlBQVksUUFBUSxTQUFSLENBQWhCOztBQUVBLElBQUksdUJBQXVCLEdBQTNCOztJQUVNLGdCOzs7QUFDSiw0QkFBWSxRQUFaLEVBQXNCLGdCQUF0QixFQUF3QztBQUFBOztBQUFBLG9HQUNoQyxRQURnQzs7QUFHdEMsVUFBSyxnQkFBTCxHQUF3QixnQkFBeEI7O0FBRUEsVUFBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxVQUFLLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxVQUFLLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUEsVUFBSyxXQUFMLENBQWlCLE1BQUssU0FBTCxDQUFlLElBQWYsT0FBakI7QUFDQSxVQUFLLFNBQUwsQ0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFYc0M7QUFZdkM7Ozs7Z0NBRVc7QUFDVixVQUFJLFVBQVUsS0FBSyxRQUFMLENBQWMsU0FBZCxLQUE0QixDQUFDLEtBQUssUUFBTCxDQUFjLGNBQWQsQ0FBM0M7O0FBRUEsYUFBTyxPQUFQO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsVUFBSSxnQkFBZ0IsS0FBSyxPQUFMLEtBQWlCLElBQXJDOztBQUVBLGFBQU8sYUFBUDtBQUNEOzs7NEJBRU8sUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDeEMsVUFBSSxVQUFVLEtBQUssU0FBTCxFQUFkOztBQUVBLFVBQUksT0FBSixFQUFhO0FBQ1gsYUFBSyxZQUFMO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxpQkFBTDtBQUNEO0FBQ0Y7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxVQUFJLGdCQUFnQixRQUFRLGlCQUE1QixFQUErQztBQUM3QyxZQUFJLFVBQVUsS0FBSyxTQUFMLEVBQWQ7O0FBRUEsWUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaLGVBQUssa0JBQUwsQ0FBd0IsUUFBeEIsRUFBa0MsU0FBbEM7QUFDRDtBQUNGO0FBQ0Y7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxVQUFJLFVBQVUsS0FBSyxTQUFMLEVBQWQ7O0FBRUEsVUFBSSxPQUFKLEVBQWE7QUFDWCxhQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXdCLFNBQXhCO0FBQ0Q7QUFDRjs7OzZCQUVRLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ3pDLFVBQUksVUFBVSxLQUFLLFNBQUwsRUFBZDtVQUNJLGdCQUFnQixLQUFLLGVBQUwsRUFEcEI7O0FBR0EsVUFBSSxPQUFKLEVBQWE7QUFDWCxhQUFLLFlBQUw7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJLGFBQUosRUFBbUI7QUFDakIsZUFBSyxpQkFBTDtBQUNEO0FBQ0Y7QUFDRjs7O3VDQUVrQixRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUNuRCxVQUFJLEtBQUssT0FBTCxLQUFpQixJQUFyQixFQUEyQjtBQUN6QixhQUFLLE9BQUwsR0FBZSxXQUFXLFlBQVc7QUFDbkMsZUFBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCO0FBQ0QsU0FGeUIsQ0FFeEIsSUFGd0IsQ0FFbkIsSUFGbUIsQ0FBWCxFQUVELG9CQUZDLENBQWY7QUFHRDtBQUNGOzs7d0NBRW1CO0FBQ2xCLFVBQUksS0FBSyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCLHFCQUFhLEtBQUssT0FBbEI7O0FBRUEsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNEO0FBQ0Y7OztrQ0FFYSxRLEVBQVUsUyxFQUFXO0FBQ2pDLFdBQUssT0FBTCxHQUFlLElBQWY7O0FBRUEsVUFBSSxZQUFZLFVBQVUsS0FBVixDQUFnQixJQUFoQixDQUFoQjtVQUNJLGdCQUFnQixLQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBRHBCOztBQUdBLFVBQUksYUFBSixFQUFtQjtBQUNqQixZQUFJLFNBQVMsS0FBSyxTQUFMLEVBQWI7WUFDSSxNQUFNLE9BQU8sTUFBUCxFQURWO1lBRUksT0FBTyxPQUFPLE9BQVAsRUFGWDtZQUdJLE1BQU07QUFDSixlQUFLLEdBREQ7QUFFSixnQkFBTTtBQUZGLFNBSFY7O0FBUUEsYUFBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxhQUFLLFNBQUwsR0FBaUIsTUFBTSxRQUF2QjtBQUNBLGFBQUssVUFBTCxHQUFrQixPQUFPLFNBQXpCOztBQUVBLGFBQUssUUFBTCxDQUFjLFNBQWQ7QUFDRDtBQUNGOzs7bUNBRWM7QUFDYixXQUFLLFFBQUwsQ0FBYyxjQUFkOztBQUVBLFVBQUksWUFBWSxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQWhCOztBQUVBLFdBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUMsWUFBVztBQUMxQyxhQUFLLFdBQUwsQ0FBaUIsY0FBakI7QUFDQSxhQUFLLFdBQUwsQ0FBaUIsU0FBakI7QUFDRCxPQUhnQyxDQUcvQixJQUgrQixDQUcxQixJQUgwQixDQUFqQztBQUlEOzs7NkJBRVEsUSxFQUFVLFMsRUFBVztBQUM1QixVQUFJLE1BQU0sV0FBVyxLQUFLLFNBQTFCO1VBQ0ksT0FBTyxZQUFZLEtBQUssVUFENUI7VUFFSSxNQUFNO0FBQ0osYUFBSyxHQUREO0FBRUosY0FBTTtBQUZGLE9BRlY7O0FBT0EsV0FBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxVQUFJLFlBQVksVUFBVSxRQUFWLENBQW1CLElBQW5CLENBQWhCOztBQUVBLFdBQUssZ0JBQUwsQ0FBc0IsU0FBdEI7QUFDRDs7OztFQXBJNEIsTzs7QUF1SS9CLE9BQU8sT0FBUCxHQUFpQixnQkFBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRWxlbWVudC5vbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbnZhciBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY2xhc3MgRHJhZ2dhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJhZ0V2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgIHRoaXMub25Nb3VzZVVwKHRoaXMubW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzRHJhZ2dlZCgpIHtcbiAgICB2YXIgZHJhZ2dlZCA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnZWQnKSAmJiAhdGhpcy5oYXNDbGFzcygnc3RvcERyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dlZDtcbiAgfVxuXG4gIGlzV2FpdGluZ1RvRHJhZygpIHtcbiAgICB2YXIgd2FpdGluZ1RvRHJhZyA9IHRoaXMudGltZW91dCAhPT0gbnVsbDtcblxuICAgIHJldHVybiB3YWl0aW5nVG9EcmFnO1xuICB9XG5cbiAgbW91c2VVcChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2VkID0gdGhpcy5pc0RyYWdnZWQoKTtcblxuICAgIGlmIChkcmFnZ2VkKSB7XG4gICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VEb3duKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICB2YXIgZHJhZ2dlZCA9IHRoaXMuaXNEcmFnZ2VkKCk7XG5cbiAgICAgIGlmICghZHJhZ2dlZCkge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmUobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB2YXIgZHJhZ2dlZCA9IHRoaXMuaXNEcmFnZ2VkKCk7XG5cbiAgICBpZiAoZHJhZ2dlZCkge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU91dChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2VkID0gdGhpcy5pc0RyYWdnZWQoKSxcbiAgICAgICAgd2FpdGluZ1RvRHJhZyA9IHRoaXMuaXNXYWl0aW5nVG9EcmFnKCk7XG5cbiAgICBpZiAoZHJhZ2dlZCkge1xuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHdhaXRpbmdUb0RyYWcpIHtcbiAgICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICB2YXIgZHJhZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0YXJ0KHRoaXMpLFxuICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCk7XG5cbiAgICBpZiAoc3RhcnREcmFnZ2luZykge1xuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGxlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIGNzcyA9IHtcbiAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICAgIH07XG5cbiAgICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICAgIHRoaXMudG9wT2Zmc2V0ID0gdG9wIC0gbW91c2VUb3A7XG4gICAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2VkJyk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ3N0b3BEcmFnZ2luZycpO1xuXG4gICAgdmFyIGRyYWdFdmVudCA9IERyYWdFdmVudC5zdG9wKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCdzdG9wRHJhZ2dpbmcnKTtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnZWQnKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0LFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHZhciBkcmFnRXZlbnQgPSBEcmFnRXZlbnQuZHJhZ2dpbmcodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=
