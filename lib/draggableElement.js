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

    _this.offset = null;

    _this.onMouseDown(_this.mouseDown.bind(_this));
    _this.onMouseUp(_this.mouseUp.bind(_this));
    _this.onMouseMove(_this.mouseMove.bind(_this));
    _this.onMouseOut(_this.mouseOut.bind(_this));
    return _this;
  }

  _createClass(DraggableElement, [{
    key: 'isDragged',
    value: function isDragged() {
      var dragged = this.hasClass('dragged');

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
        this.drag(mouseTop, mouseLeft);
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

      var dragEvent = DragEvent.start(this);

      var startDragging = this.dragEventHandler(dragEvent);

      if (startDragging) {
        var bounds = this.getBounds(),
            top = bounds.top,
            ///
        left = bounds.left; ///

        var css = {
          top: top + 'px',
          left: left + 'px'
        };

        this.css(css);

        var topOffset = top - mouseTop,
            leftOffset = left - mouseLeft;

        top = topOffset; ///
        left = leftOffset; ///

        this.offset = {
          top: top,
          left: left
        };

        this.addClass('dragged');
      }
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.removeClass('dragged');

      var dragEvent = DragEvent.stop(this);

      this.dragEventHandler(dragEvent);
    }
  }, {
    key: 'drag',
    value: function drag(mouseTop, mouseLeft) {
      var topOffset = this.offset.top,
          leftOffset = this.offset.left,
          top = mouseTop + topOffset,
          left = mouseLeft + leftOffset;

      var css = {
        top: top + 'px',
        left: left + 'px'
      };

      this.css(css);

      var dragEvent = DragEvent.drag(this);

      this.dragEventHandler(dragEvent);
    }
  }]);

  return DraggableElement;
}(Element);

module.exports = DraggableElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksWUFBWSxRQUFRLGFBQVIsQ0FBaEI7O0FBRUEsSUFBSSx1QkFBdUIsR0FBM0I7O0lBRU0sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsZ0JBQXRCLEVBQXdDO0FBQUE7O0FBQUEsb0dBQ2hDLFFBRGdDOztBQUd0QyxVQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFmOztBQUVBLFVBQUssTUFBTCxHQUFjLElBQWQ7O0FBRUEsVUFBSyxXQUFMLENBQWlCLE1BQUssU0FBTCxDQUFlLElBQWYsT0FBakI7QUFDQSxVQUFLLFNBQUwsQ0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFDQSxVQUFLLFdBQUwsQ0FBaUIsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFqQjtBQUNBLFVBQUssVUFBTCxDQUFnQixNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWhCO0FBWnNDO0FBYXZDOzs7O2dDQUVXO0FBQ1YsVUFBSSxVQUFVLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBZDs7QUFFQSxhQUFPLE9BQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFJLGdCQUFnQixLQUFLLE9BQUwsS0FBaUIsSUFBckM7O0FBRUEsYUFBTyxhQUFQO0FBQ0Q7Ozs0QkFFTyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUN4QyxVQUFJLFVBQVUsS0FBSyxTQUFMLEVBQWQ7O0FBRUEsVUFBSSxPQUFKLEVBQWE7QUFDWCxhQUFLLFlBQUw7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLGlCQUFMO0FBQ0Q7QUFDRjs7OzhCQUVTLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQzFDLFVBQUksZ0JBQWdCLFFBQVEsaUJBQTVCLEVBQStDO0FBQzdDLFlBQUksVUFBVSxLQUFLLFNBQUwsRUFBZDs7QUFFQSxZQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1osZUFBSyxrQkFBTCxDQUF3QixRQUF4QixFQUFrQyxTQUFsQztBQUNEO0FBQ0Y7QUFDRjs7OzhCQUVTLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQzFDLFVBQUksVUFBVSxLQUFLLFNBQUwsRUFBZDs7QUFFQSxVQUFJLE9BQUosRUFBYTtBQUNYLGFBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsU0FBcEI7QUFDRDtBQUNGOzs7NkJBRVEsUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDekMsVUFBSSxVQUFVLEtBQUssU0FBTCxFQUFkO1VBQ0ksZ0JBQWdCLEtBQUssZUFBTCxFQURwQjs7QUFHQSxVQUFJLE9BQUosRUFBYTtBQUNYLGFBQUssWUFBTDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksYUFBSixFQUFtQjtBQUNqQixlQUFLLGlCQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7dUNBRWtCLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ25ELFVBQUksS0FBSyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCLGFBQUssT0FBTCxHQUFlLFdBQVcsWUFBVztBQUNuQyxlQUFLLGFBQUwsQ0FBbUIsUUFBbkIsRUFBNkIsU0FBN0I7QUFDRCxTQUZ5QixDQUV4QixJQUZ3QixDQUVuQixJQUZtQixDQUFYLEVBRUQsb0JBRkMsQ0FBZjtBQUdEO0FBQ0Y7Ozt3Q0FFbUI7QUFDbEIsVUFBSSxLQUFLLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekIscUJBQWEsS0FBSyxPQUFsQjs7QUFFQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFDRjs7O2tDQUVhLFEsRUFBVSxTLEVBQVc7QUFDakMsV0FBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxVQUFJLFlBQVksVUFBVSxLQUFWLENBQWdCLElBQWhCLENBQWhCOztBQUVBLFVBQUksZ0JBQWdCLEtBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBcEI7O0FBRUEsVUFBSSxhQUFKLEVBQW1CO0FBQ2pCLFlBQUksU0FBUyxLQUFLLFNBQUwsRUFBYjtZQUNJLE1BQU0sT0FBTyxHQURqQjs7QUFFSSxlQUFPLE9BQU8sSUFGbEIsQzs7QUFJQSxZQUFJLE1BQU07QUFDUixlQUFLLE1BQU0sSUFESDtBQUVSLGdCQUFNLE9BQU87QUFGTCxTQUFWOztBQUtBLGFBQUssR0FBTCxDQUFTLEdBQVQ7O0FBRUEsWUFBSSxZQUFZLE1BQU0sUUFBdEI7WUFDSSxhQUFhLE9BQU8sU0FEeEI7O0FBR0EsY0FBTSxTQUFOLEM7QUFDQSxlQUFPLFVBQVAsQzs7QUFFQSxhQUFLLE1BQUwsR0FBYztBQUNaLGVBQUssR0FETztBQUVaLGdCQUFNO0FBRk0sU0FBZDs7QUFLQSxhQUFLLFFBQUwsQ0FBYyxTQUFkO0FBQ0Q7QUFDRjs7O21DQUVjO0FBQ2IsV0FBSyxXQUFMLENBQWlCLFNBQWpCOztBQUVBLFVBQUksWUFBWSxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQWhCOztBQUVBLFdBQUssZ0JBQUwsQ0FBc0IsU0FBdEI7QUFDRDs7O3lCQUVJLFEsRUFBVSxTLEVBQVc7QUFDeEIsVUFBSSxZQUFZLEtBQUssTUFBTCxDQUFZLEdBQTVCO1VBQ0ksYUFBYSxLQUFLLE1BQUwsQ0FBWSxJQUQ3QjtVQUVJLE1BQU0sV0FBVyxTQUZyQjtVQUdJLE9BQU8sWUFBWSxVQUh2Qjs7QUFLQSxVQUFJLE1BQU07QUFDUixhQUFLLE1BQU0sSUFESDtBQUVSLGNBQU0sT0FBTztBQUZMLE9BQVY7O0FBS0EsV0FBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxVQUFJLFlBQVksVUFBVSxJQUFWLENBQWUsSUFBZixDQUFoQjs7QUFFQSxXQUFLLGdCQUFMLENBQXNCLFNBQXRCO0FBQ0Q7Ozs7RUEvSTRCLE87O0FBa0ovQixPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpO1xuXG52YXIgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAyNTA7XG5cbmNsYXNzIERyYWdnYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyYWdFdmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgIHRoaXMub2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5vbk1vdXNlT3V0KHRoaXMubW91c2VPdXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0RyYWdnZWQoKSB7XG4gICAgdmFyIGRyYWdnZWQgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2VkJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dlZDtcbiAgfVxuXG4gIGlzV2FpdGluZ1RvRHJhZygpIHtcbiAgICB2YXIgd2FpdGluZ1RvRHJhZyA9IHRoaXMudGltZW91dCAhPT0gbnVsbDtcblxuICAgIHJldHVybiB3YWl0aW5nVG9EcmFnO1xuICB9XG5cbiAgbW91c2VVcChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2VkID0gdGhpcy5pc0RyYWdnZWQoKTtcblxuICAgIGlmIChkcmFnZ2VkKSB7XG4gICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VEb3duKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICB2YXIgZHJhZ2dlZCA9IHRoaXMuaXNEcmFnZ2VkKCk7XG5cbiAgICAgIGlmICghZHJhZ2dlZCkge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmUobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB2YXIgZHJhZ2dlZCA9IHRoaXMuaXNEcmFnZ2VkKCk7XG5cbiAgICBpZiAoZHJhZ2dlZCkge1xuICAgICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlT3V0KG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnZWQgPSB0aGlzLmlzRHJhZ2dlZCgpLFxuICAgICAgICB3YWl0aW5nVG9EcmFnID0gdGhpcy5pc1dhaXRpbmdUb0RyYWcoKTtcblxuICAgIGlmIChkcmFnZ2VkKSB7XG4gICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAod2FpdGluZ1RvRHJhZykge1xuICAgICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgIHZhciBkcmFnRXZlbnQgPSBEcmFnRXZlbnQuc3RhcnQodGhpcyk7XG5cbiAgICB2YXIgc3RhcnREcmFnZ2luZyA9IHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQpO1xuXG4gICAgaWYgKHN0YXJ0RHJhZ2dpbmcpIHtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIHRvcCA9IGJvdW5kcy50b3AsIC8vL1xuICAgICAgICAgIGxlZnQgPSBib3VuZHMubGVmdDsgLy8vXG5cbiAgICAgIHZhciBjc3MgPSB7XG4gICAgICAgIHRvcDogdG9wICsgJ3B4JyxcbiAgICAgICAgbGVmdDogbGVmdCArICdweCdcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICAgIHZhciB0b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbGVmdCAtIG1vdXNlTGVmdDtcblxuICAgICAgdG9wID0gdG9wT2Zmc2V0OyAgLy8vXG4gICAgICBsZWZ0ID0gbGVmdE9mZnNldDsgIC8vL1xuXG4gICAgICB0aGlzLm9mZnNldCA9IHtcbiAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnZWQnKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dlZCcpO1xuXG4gICAgdmFyIGRyYWdFdmVudCA9IERyYWdFdmVudC5zdG9wKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCk7XG4gIH1cblxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgdG9wT2Zmc2V0ID0gdGhpcy5vZmZzZXQudG9wLFxuICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5vZmZzZXQubGVmdCxcbiAgICAgICAgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0O1xuXG4gICAgdmFyIGNzcyA9IHtcbiAgICAgIHRvcDogdG9wICsgJ3B4JyxcbiAgICAgIGxlZnQ6IGxlZnQgKyAncHgnXG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB2YXIgZHJhZ0V2ZW50ID0gRHJhZ0V2ZW50LmRyYWcodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=
