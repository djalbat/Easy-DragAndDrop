'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

var START_DRAGGING_DELAY = 250;

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
    _this.onMouseMove(_this.mouseMove.bind(_this));
    _this.onMouseOut(_this.mouseOut.bind(_this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksWUFBWSxRQUFRLGFBQVIsQ0FBaEI7O0FBRUEsSUFBSSx1QkFBdUIsR0FBM0I7O0lBRU0sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsZ0JBQXRCLEVBQXdDO0FBQUE7O0FBQUEsb0dBQ2hDLFFBRGdDOztBQUd0QyxVQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFmOztBQUVBLFVBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUssVUFBTCxHQUFrQixJQUFsQjs7QUFFQSxVQUFLLFdBQUwsQ0FBaUIsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFqQjtBQUNBLFVBQUssU0FBTCxDQUFlLE1BQUssT0FBTCxDQUFhLElBQWIsT0FBZjtBQUNBLFVBQUssV0FBTCxDQUFpQixNQUFLLFNBQUwsQ0FBZSxJQUFmLE9BQWpCO0FBQ0EsVUFBSyxVQUFMLENBQWdCLE1BQUssUUFBTCxDQUFjLElBQWQsT0FBaEI7QUFic0M7QUFjdkM7Ozs7Z0NBRVc7QUFDVixVQUFJLFVBQVUsS0FBSyxRQUFMLENBQWMsU0FBZCxLQUE0QixDQUFDLEtBQUssUUFBTCxDQUFjLGNBQWQsQ0FBM0M7O0FBRUEsYUFBTyxPQUFQO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsVUFBSSxnQkFBZ0IsS0FBSyxPQUFMLEtBQWlCLElBQXJDOztBQUVBLGFBQU8sYUFBUDtBQUNEOzs7NEJBRU8sUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDeEMsVUFBSSxVQUFVLEtBQUssU0FBTCxFQUFkOztBQUVBLFVBQUksT0FBSixFQUFhO0FBQ1gsYUFBSyxZQUFMO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxpQkFBTDtBQUNEO0FBQ0Y7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxVQUFJLGdCQUFnQixRQUFRLGlCQUE1QixFQUErQztBQUM3QyxZQUFJLFVBQVUsS0FBSyxTQUFMLEVBQWQ7O0FBRUEsWUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaLGVBQUssa0JBQUwsQ0FBd0IsUUFBeEIsRUFBa0MsU0FBbEM7QUFDRDtBQUNGO0FBQ0Y7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxVQUFJLFVBQVUsS0FBSyxTQUFMLEVBQWQ7O0FBRUEsVUFBSSxPQUFKLEVBQWE7QUFDWCxhQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXdCLFNBQXhCO0FBQ0Q7QUFDRjs7OzZCQUVRLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ3pDLFVBQUksVUFBVSxLQUFLLFNBQUwsRUFBZDtVQUNJLGdCQUFnQixLQUFLLGVBQUwsRUFEcEI7O0FBR0EsVUFBSSxPQUFKLEVBQWE7QUFDWCxhQUFLLFlBQUw7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJLGFBQUosRUFBbUI7QUFDakIsZUFBSyxpQkFBTDtBQUNEO0FBQ0Y7QUFDRjs7O3VDQUVrQixRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUNuRCxVQUFJLEtBQUssT0FBTCxLQUFpQixJQUFyQixFQUEyQjtBQUN6QixhQUFLLE9BQUwsR0FBZSxXQUFXLFlBQVc7QUFDbkMsZUFBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCO0FBQ0QsU0FGeUIsQ0FFeEIsSUFGd0IsQ0FFbkIsSUFGbUIsQ0FBWCxFQUVELG9CQUZDLENBQWY7QUFHRDtBQUNGOzs7d0NBRW1CO0FBQ2xCLFVBQUksS0FBSyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCLHFCQUFhLEtBQUssT0FBbEI7O0FBRUEsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNEO0FBQ0Y7OztrQ0FFYSxRLEVBQVUsUyxFQUFXO0FBQ2pDLFdBQUssT0FBTCxHQUFlLElBQWY7O0FBRUEsVUFBSSxZQUFZLFVBQVUsS0FBVixDQUFnQixJQUFoQixDQUFoQjtVQUNJLGdCQUFnQixLQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBRHBCOztBQUdBLFVBQUksYUFBSixFQUFtQjtBQUNqQixZQUFJLFNBQVMsS0FBSyxTQUFMLEVBQWI7WUFDSSxNQUFNLE9BQU8sTUFBUCxFQURWO1lBRUksT0FBTyxPQUFPLE9BQVAsRUFGWDtZQUdJLE1BQU07QUFDSixlQUFLLEdBREQ7QUFFSixnQkFBTTtBQUZGLFNBSFY7O0FBUUEsYUFBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxhQUFLLFNBQUwsR0FBaUIsTUFBTSxRQUF2QjtBQUNBLGFBQUssVUFBTCxHQUFrQixPQUFPLFNBQXpCOztBQUVBLGFBQUssUUFBTCxDQUFjLFNBQWQ7QUFDRDtBQUNGOzs7bUNBRWM7QUFDYixXQUFLLFFBQUwsQ0FBYyxjQUFkOztBQUVBLFVBQUksWUFBWSxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQWhCOztBQUVBLFdBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUMsWUFBVztBQUMxQyxhQUFLLFdBQUwsQ0FBaUIsY0FBakI7QUFDQSxhQUFLLFdBQUwsQ0FBaUIsU0FBakI7QUFDRCxPQUhnQyxDQUcvQixJQUgrQixDQUcxQixJQUgwQixDQUFqQztBQUlEOzs7NkJBRVEsUSxFQUFVLFMsRUFBVztBQUM1QixVQUFJLE1BQU0sV0FBVyxLQUFLLFNBQTFCO1VBQ0ksT0FBTyxZQUFZLEtBQUssVUFENUI7VUFFSSxNQUFNO0FBQ0osYUFBSyxHQUREO0FBRUosY0FBTTtBQUZGLE9BRlY7O0FBT0EsV0FBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxVQUFJLFlBQVksVUFBVSxRQUFWLENBQW1CLElBQW5CLENBQWhCOztBQUVBLFdBQUssZ0JBQUwsQ0FBc0IsU0FBdEI7QUFDRDs7OztFQXRJNEIsTzs7QUF5SS9CLE9BQU8sT0FBUCxHQUFpQixnQkFBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50Jyk7XG5cbnZhciBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDI1MDtcblxuY2xhc3MgRHJhZ2dhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJhZ0V2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgIHRoaXMub25Nb3VzZVVwKHRoaXMubW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMub25Nb3VzZU91dCh0aGlzLm1vdXNlT3V0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEcmFnZ2VkKCkge1xuICAgIHZhciBkcmFnZ2VkID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dlZCcpICYmICF0aGlzLmhhc0NsYXNzKCdzdG9wRHJhZ2dpbmcnKTtcblxuICAgIHJldHVybiBkcmFnZ2VkO1xuICB9XG5cbiAgaXNXYWl0aW5nVG9EcmFnKCkge1xuICAgIHZhciB3YWl0aW5nVG9EcmFnID0gdGhpcy50aW1lb3V0ICE9PSBudWxsO1xuXG4gICAgcmV0dXJuIHdhaXRpbmdUb0RyYWc7XG4gIH1cblxuICBtb3VzZVVwKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnZWQgPSB0aGlzLmlzRHJhZ2dlZCgpO1xuXG4gICAgaWYgKGRyYWdnZWQpIHtcbiAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd24obW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIHZhciBkcmFnZ2VkID0gdGhpcy5pc0RyYWdnZWQoKTtcblxuICAgICAgaWYgKCFkcmFnZ2VkKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZShtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2VkID0gdGhpcy5pc0RyYWdnZWQoKTtcblxuICAgIGlmIChkcmFnZ2VkKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3V0KG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnZWQgPSB0aGlzLmlzRHJhZ2dlZCgpLFxuICAgICAgICB3YWl0aW5nVG9EcmFnID0gdGhpcy5pc1dhaXRpbmdUb0RyYWcoKTtcblxuICAgIGlmIChkcmFnZ2VkKSB7XG4gICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAod2FpdGluZ1RvRHJhZykge1xuICAgICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgIHZhciBkcmFnRXZlbnQgPSBEcmFnRXZlbnQuc3RhcnQodGhpcyksXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50KTtcblxuICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICB0b3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgICAgfTtcblxuICAgICAgdGhpcy5jc3MoY3NzKTtcblxuICAgICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnZWQnKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnc3RvcERyYWdnaW5nJyk7XG5cbiAgICB2YXIgZHJhZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0b3AodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3N0b3BEcmFnZ2luZycpO1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dlZCcpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQsXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdmFyIGRyYWdFdmVudCA9IERyYWdFdmVudC5kcmFnZ2luZyh0aGlzKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRWxlbWVudDtcbiJdfQ==
