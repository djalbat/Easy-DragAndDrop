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
      this.addClass('stopDragging');

      var dragEvent = DragEvent.stop(this);

      this.dragEventHandler(dragEvent, function () {
        this.removeClass('dragged');

        this.removeClass('stopDragging');
      }.bind(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksWUFBWSxRQUFRLGFBQVIsQ0FBaEI7O0FBRUEsSUFBSSx1QkFBdUIsR0FBM0I7O0lBRU0sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsZ0JBQXRCLEVBQXdDO0FBQUE7O0FBQUEsb0dBQ2hDLFFBRGdDOztBQUd0QyxVQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFmOztBQUVBLFVBQUssTUFBTCxHQUFjLElBQWQ7O0FBRUEsVUFBSyxXQUFMLENBQWlCLE1BQUssU0FBTCxDQUFlLElBQWYsT0FBakI7QUFDQSxVQUFLLFNBQUwsQ0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFDQSxVQUFLLFdBQUwsQ0FBaUIsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFqQjtBQUNBLFVBQUssVUFBTCxDQUFnQixNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWhCO0FBWnNDO0FBYXZDOzs7O2dDQUVXO0FBQ1YsVUFBSSxVQUFVLEtBQUssUUFBTCxDQUFjLFNBQWQsS0FBNEIsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxjQUFkLENBQTNDOztBQUVBLGFBQU8sT0FBUDtBQUNEOzs7c0NBRWlCO0FBQ2hCLFVBQUksZ0JBQWdCLEtBQUssT0FBTCxLQUFpQixJQUFyQzs7QUFFQSxhQUFPLGFBQVA7QUFDRDs7OzRCQUVPLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ3hDLFVBQUksVUFBVSxLQUFLLFNBQUwsRUFBZDs7QUFFQSxVQUFJLE9BQUosRUFBYTtBQUNYLGFBQUssWUFBTDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssaUJBQUw7QUFDRDtBQUNGOzs7OEJBRVMsUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDMUMs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O0FBc0ovQixPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpO1xuXG52YXIgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAyNTA7XG5cbmNsYXNzIERyYWdnYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyYWdFdmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgIHRoaXMub2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5vbk1vdXNlT3V0KHRoaXMubW91c2VPdXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0RyYWdnZWQoKSB7XG4gICAgdmFyIGRyYWdnZWQgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2VkJykgJiYgIXRoaXMuaGFzQ2xhc3MoJ3N0b3BEcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnZWQ7XG4gIH1cblxuICBpc1dhaXRpbmdUb0RyYWcoKSB7XG4gICAgdmFyIHdhaXRpbmdUb0RyYWcgPSB0aGlzLnRpbWVvdXQgIT09IG51bGw7XG5cbiAgICByZXR1cm4gd2FpdGluZ1RvRHJhZztcbiAgfVxuXG4gIG1vdXNlVXAobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB2YXIgZHJhZ2dlZCA9IHRoaXMuaXNEcmFnZ2VkKCk7XG5cbiAgICBpZiAoZHJhZ2dlZCkge1xuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlRG93bihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnZWQgPSB0aGlzLmlzRHJhZ2dlZCgpO1xuXG4gICAgICBpZiAoIWRyYWdnZWQpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnZWQgPSB0aGlzLmlzRHJhZ2dlZCgpO1xuXG4gICAgaWYgKGRyYWdnZWQpIHtcbiAgICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU91dChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2VkID0gdGhpcy5pc0RyYWdnZWQoKSxcbiAgICAgICAgd2FpdGluZ1RvRHJhZyA9IHRoaXMuaXNXYWl0aW5nVG9EcmFnKCk7XG5cbiAgICBpZiAoZHJhZ2dlZCkge1xuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHdhaXRpbmdUb0RyYWcpIHtcbiAgICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICB2YXIgZHJhZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0YXJ0KHRoaXMpO1xuXG4gICAgdmFyIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50KTtcblxuICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICB0b3AgPSBib3VuZHMudG9wLCAvLy9cbiAgICAgICAgICBsZWZ0ID0gYm91bmRzLmxlZnQ7IC8vL1xuXG4gICAgICB2YXIgY3NzID0ge1xuICAgICAgICB0b3A6IHRvcCArICdweCcsXG4gICAgICAgIGxlZnQ6IGxlZnQgKyAncHgnXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgICB2YXIgdG9wT2Zmc2V0ID0gdG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICAgIHRvcCA9IHRvcE9mZnNldDsgIC8vL1xuICAgICAgbGVmdCA9IGxlZnRPZmZzZXQ7ICAvLy9cblxuICAgICAgdGhpcy5vZmZzZXQgPSB7XG4gICAgICAgIHRvcDogdG9wLFxuICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2VkJyk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ3N0b3BEcmFnZ2luZycpO1xuXG4gICAgdmFyIGRyYWdFdmVudCA9IERyYWdFdmVudC5zdG9wKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2VkJyk7XG5cbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3N0b3BEcmFnZ2luZycpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgdG9wT2Zmc2V0ID0gdGhpcy5vZmZzZXQudG9wLFxuICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5vZmZzZXQubGVmdCxcbiAgICAgICAgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0O1xuXG4gICAgdmFyIGNzcyA9IHtcbiAgICAgIHRvcDogdG9wICsgJ3B4JyxcbiAgICAgIGxlZnQ6IGxlZnQgKyAncHgnXG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB2YXIgZHJhZ0V2ZW50ID0gRHJhZ0V2ZW50LmRyYWcodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ0V2ZW50KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=
