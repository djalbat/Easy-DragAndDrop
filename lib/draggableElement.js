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
    key: 'isOverlappingDraggingBounds',
    value: function isOverlappingDraggingBounds(draggingBounds) {
      var bounds = this.getBounds(),
          overlappingDraggingBounds = bounds.areOverlapping(draggingBounds);

      return overlappingDraggingBounds;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksT0FBTyxPQUFPLElBRGxCO0lBRUksVUFBVSxPQUFPLE9BRnJCOztBQUlBLElBQUksWUFBWSxRQUFRLGFBQVIsQ0FBaEI7O0FBRUEsSUFBTSx1QkFBdUIsR0FBN0I7SUFDTSxZQUFZLDZCQURsQjs7QUFHQSxJQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7O0lBRU0sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsZ0JBQXRCLEVBQXdDO0FBQUE7O0FBQUEsb0dBQ2hDLFFBRGdDOztBQUd0QyxVQUFLLGdCQUFMLEdBQXdCLGdCQUF4Qjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBSyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBSyxVQUFMLEdBQWtCLElBQWxCOztBQUVBLFVBQUssV0FBTCxDQUFpQixNQUFLLFNBQUwsQ0FBZSxJQUFmLE9BQWpCO0FBVHNDO0FBVXZDOzs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUssU0FBTCxFQUFQO0FBQ0Q7OztnREFFMkIsYyxFQUFnQjtBQUMxQyxVQUFJLFNBQVMsS0FBSyxTQUFMLEVBQWI7VUFDSSw0QkFBNEIsT0FBTyxjQUFQLENBQXNCLGNBQXRCLENBRGhDOztBQUdBLGFBQU8seUJBQVA7QUFDRDs7O2tDQUVhLFEsRUFBVSxTLEVBQVc7QUFDakMsVUFBSSxTQUFTLEtBQUssU0FBTCxFQUFiO1VBQ0ksTUFBTSxPQUFPLE1BQVAsRUFEVjtVQUVJLE9BQU8sT0FBTyxPQUFQLEVBRlg7VUFHSSxNQUFNO0FBQ0osYUFBSyxHQUREO0FBRUosY0FBTTtBQUZGLE9BSFY7O0FBUUEsV0FBSyxHQUFMLENBQVMsR0FBVDs7QUFFQSxXQUFLLFNBQUwsR0FBaUIsTUFBTSxRQUF2QjtBQUNBLFdBQUssVUFBTCxHQUFrQixPQUFPLFNBQXpCOztBQUVBLFdBQUssUUFBTCxDQUFjLFVBQWQ7QUFDRDs7O21DQUVjO0FBQ2IsV0FBSyxXQUFMLENBQWlCLFVBQWpCO0FBQ0Q7Ozs2QkFFUSxRLEVBQVUsUyxFQUFXO0FBQzVCLFVBQUksTUFBTSxXQUFXLEtBQUssU0FBMUI7VUFDSSxPQUFPLFlBQVksS0FBSyxVQUQ1QjtVQUVJLE1BQU07QUFDSixhQUFLLEdBREQ7QUFFSixjQUFNO0FBRkYsT0FGVjs7QUFPQSxXQUFLLEdBQUwsQ0FBUyxHQUFUOztBQUVBLFVBQUksZ0JBQWdCLFVBQVUsUUFBVixDQUFtQixJQUFuQixDQUFwQjs7QUFFQSxXQUFLLGdCQUFMLENBQXNCLGFBQXRCO0FBQ0Q7Ozt1Q0FFa0IsUSxFQUFVLFMsRUFBVyxXLEVBQWE7QUFDbkQsVUFBSSxLQUFLLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekIsYUFBSyxPQUFMLEdBQWUsV0FBVyxZQUFXO0FBQ25DLGVBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxjQUFJLHFCQUFxQixVQUFVLGFBQVYsQ0FBd0IsSUFBeEIsQ0FBekI7Y0FDSSxnQkFBZ0IsS0FBSyxnQkFBTCxDQUFzQixrQkFBdEIsQ0FEcEI7O0FBR0EsY0FBSSxhQUFKLEVBQW1CO0FBQ2pCLGlCQUFLLGFBQUwsQ0FBbUIsUUFBbkIsRUFBNkIsU0FBN0I7QUFDRDtBQUNGLFNBUnlCLENBUXhCLElBUndCLENBUW5CLElBUm1CLENBQVgsRUFRRCxvQkFSQyxDQUFmO0FBU0Q7QUFDRjs7O3dDQUVtQjtBQUNsQixVQUFJLEtBQUssT0FBTCxLQUFpQixJQUFyQixFQUEyQjtBQUN6QixxQkFBYSxLQUFLLE9BQWxCOztBQUVBLGFBQUssT0FBTCxHQUFlLElBQWY7QUFDRDtBQUNGOzs7aUNBRVk7QUFDWCxhQUFPLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBUDtBQUNEOzs7c0NBRWlCO0FBQ2hCLFVBQUksZ0JBQWdCLEtBQUssT0FBTCxLQUFpQixJQUFyQzs7QUFFQSxhQUFPLGFBQVA7QUFDRDs7OzhCQUVTLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQzFDLFdBQUssU0FBTCxDQUFlLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZixFQUF3QyxTQUF4QztBQUNBLFdBQUssV0FBTCxDQUFpQixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQWpCLEVBQTRDLFNBQTVDOztBQUVBLFVBQUksZ0JBQWdCLFFBQVEsaUJBQTVCLEVBQStDO0FBQzdDLFlBQUksV0FBVyxLQUFLLFVBQUwsRUFBZjs7QUFFQSxZQUFJLENBQUMsUUFBTCxFQUFlO0FBQ2IsZUFBSyxrQkFBTCxDQUF3QixRQUF4QixFQUFrQyxTQUFsQztBQUNEO0FBQ0Y7QUFDRjs7OzRCQUVPLFEsRUFBVSxTLEVBQVcsVyxFQUFhO0FBQ3hDLFdBQUssWUFBTCxDQUFrQixTQUFsQjtBQUNBLFdBQUssVUFBTCxDQUFnQixTQUFoQjs7QUFFQSxVQUFJLFdBQVcsS0FBSyxVQUFMLEVBQWY7O0FBRUEsVUFBSSxRQUFKLEVBQWM7QUFDWixZQUFJLG9CQUFvQixVQUFVLFlBQVYsQ0FBdUIsSUFBdkIsQ0FBeEI7O0FBRUEsYUFBSyxnQkFBTCxDQUFzQixpQkFBdEI7O0FBRUEsYUFBSyxZQUFMO0FBQ0QsT0FORCxNQU1PO0FBQ0wsYUFBSyxpQkFBTDtBQUNEO0FBQ0Y7Ozs4QkFFUyxRLEVBQVUsUyxFQUFXLFcsRUFBYTtBQUMxQyxVQUFJLFdBQVcsS0FBSyxVQUFMLEVBQWY7O0FBRUEsVUFBSSxRQUFKLEVBQWM7QUFDWixhQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXdCLFNBQXhCO0FBQ0Q7QUFDRjs7OztFQWhJNEIsTzs7QUFtSS9CLE9BQU8sT0FBUCxHQUFpQixnQkFBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEJvZHkgPSBlYXN5dWkuQm9keSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpO1xuXG5jb25zdCBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NSxcbiAgICAgIE5BTUVTUEFDRSA9ICdFYXN5VUktRHJhZ0FuZERyb3AvZHJhZ2dpbmcnO1xuXG52YXIgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmNsYXNzIERyYWdnYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyYWdFdmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd24uYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIGdldERyYWdnaW5nQm91bmRzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEJvdW5kcygpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKGRyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dpbmdCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICBsZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQsXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdmFyIGRyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuZHJhZ2dpbmcodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ2dpbmdFdmVudCk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICB2YXIgc3RhcnREcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0YXJ0RHJhZ2dpbmcodGhpcyksXG4gICAgICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0YXJ0RHJhZ2dpbmdFdmVudCk7XG5cbiAgICAgICAgaWYgKHN0YXJ0RHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBpc1dhaXRpbmdUb0RyYWcoKSB7XG4gICAgdmFyIHdhaXRpbmdUb0RyYWcgPSB0aGlzLnRpbWVvdXQgIT09IG51bGw7XG5cbiAgICByZXR1cm4gd2FpdGluZ1RvRHJhZztcbiAgfVxuXG4gIG1vdXNlRG93bihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcC5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xuICAgIGJvZHkub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcChtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7XG4gICAgYm9keS5vZmZNb3VzZVVwKE5BTUVTUEFDRSk7XG5cbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdmFyIHN0b3BEcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0b3BEcmFnZ2luZyh0aGlzKTtcblxuICAgICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0b3BEcmFnZ2luZ0V2ZW50KTtcbiAgICAgIFxuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZShtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=
