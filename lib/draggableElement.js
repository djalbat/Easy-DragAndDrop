'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var DragEvent = require('./dragEvent');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175,
    NAMESPACE = 'EasyUI-DragAndDrop/dragging';

var body = new Body();

var DraggableElement = function (_Element) {
  _inherits(DraggableElement, _Element);

  function DraggableElement(selector, dragEventHandler) {
    _classCallCheck(this, DraggableElement);

    var _this = _possibleConstructorReturn(this, (DraggableElement.__proto__ || Object.getPrototypeOf(DraggableElement)).call(this, selector));

    _this.dragEventHandler = dragEventHandler;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.onMouseDown(_this.mouseDownHandler.bind(_this));
    return _this;
  }

  _createClass(DraggableElement, [{
    key: 'getDraggingBounds',
    value: function getDraggingBounds() {
      var bounds = this.getBounds(),
          draggingBounds = bounds; ///

      return draggingBounds;
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

      this.on('keydown', this.keyDownHandler.bind(this));
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.off('keydown', this.keyDownHandler.bind(this));

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
      var dragging = this.hasClass('dragging');

      return dragging;
    }
  }, {
    key: 'isWaitingToDrag',
    value: function isWaitingToDrag() {
      var waitingToDrag = this.timeout !== null;

      return waitingToDrag;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
      body.onMouseUp(this.mouseUpHandler.bind(this), NAMESPACE);
      body.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE);

      if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
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
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler(event) {
      var keyCode = event.keyCode || event.which;

      if (keyCode === ESCAPE_KEYCODE) {
        var dragging = this.isDragging();

        if (dragging) {
          var escapeDraggingEvent = DragEvent.escapeDragging(this);

          this.dragEventHandler(escapeDraggingEvent);

          this.stopDragging();
        }
      }
    }
  }]);

  return DraggableElement;
}(Element);

module.exports = DraggableElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCb2R5IiwiRWxlbWVudCIsIkRyYWdFdmVudCIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRWxlbWVudCIsInNlbGVjdG9yIiwiZHJhZ0V2ZW50SGFuZGxlciIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0Iiwib25Nb3VzZURvd24iLCJtb3VzZURvd25IYW5kbGVyIiwiYmluZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJ0b3AiLCJnZXRUb3AiLCJsZWZ0IiwiZ2V0TGVmdCIsImNzcyIsImFkZENsYXNzIiwib24iLCJrZXlEb3duSGFuZGxlciIsIm9mZiIsInJlbW92ZUNsYXNzIiwiZHJhZ2dpbmdFdmVudCIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwic3RhcnREcmFnZ2luZ0V2ZW50Iiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImhhc0NsYXNzIiwid2FpdGluZ1RvRHJhZyIsIm9uTW91c2VVcCIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwib2ZmTW91c2VVcCIsInN0b3BEcmFnZ2luZ0V2ZW50Iiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJldmVudCIsImtleUNvZGUiLCJ3aGljaCIsImVzY2FwZURyYWdnaW5nRXZlbnQiLCJlc2NhcGVEcmFnZ2luZyIsIm1vZHVsZSIsImV4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QixJQUF2QixDQUF4Qjs7QUFFQSxhQUFLM0MsZ0JBQUwsQ0FBc0IwQyxpQkFBdEI7O0FBRUEsYUFBS0MsWUFBTDtBQUNELE9BTkQsTUFNTztBQUNMLGFBQUtDLGlCQUFMO0FBQ0Q7QUFDRjs7O3FDQUVnQmhDLFEsRUFBVUMsUyxFQUFXYSxXLEVBQWE7QUFDakQsVUFBSUQsV0FBVyxLQUFLYSxVQUFMLEVBQWY7O0FBRUEsVUFBSWIsUUFBSixFQUFjO0FBQ1osYUFBS0EsUUFBTCxDQUFjYixRQUFkLEVBQXdCQyxTQUF4QjtBQUNEO0FBQ0Y7OzttQ0FFY2dDLEssRUFBTztBQUNwQixVQUFJQyxVQUFVRCxNQUFNQyxPQUFOLElBQWlCRCxNQUFNRSxLQUFyQzs7QUFFQSxVQUFJRCxZQUFZcEQsY0FBaEIsRUFBZ0M7QUFDOUIsWUFBSStCLFdBQVcsS0FBS2EsVUFBTCxFQUFmOztBQUVBLFlBQUliLFFBQUosRUFBYztBQUNaLGNBQUl1QixzQkFBc0J2RCxVQUFVd0QsY0FBVixDQUF5QixJQUF6QixDQUExQjs7QUFFQSxlQUFLakQsZ0JBQUwsQ0FBc0JnRCxtQkFBdEI7O0FBRUEsZUFBS0wsWUFBTDtBQUNEO0FBQ0Y7QUFDRjs7OztFQXpKNEJuRCxPOztBQTRKL0IwRCxPQUFPQyxPQUFQLEdBQWlCckQsZ0JBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1LFxuICAgICAgTkFNRVNQQUNFID0gJ0Vhc3lVSS1EcmFnQW5kRHJvcC9kcmFnZ2luZyc7XG5cbnZhciBib2R5ID0gbmV3IEJvZHkoKTtcblxuY2xhc3MgRHJhZ2dhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJhZ0V2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIGdldERyYWdnaW5nQm91bmRzKCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKGRyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dpbmdCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICBsZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB2YXIgZHJhZ2dpbmdFdmVudCA9IERyYWdFdmVudC5kcmFnZ2luZyh0aGlzKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihkcmFnZ2luZ0V2ZW50KTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIHZhciBzdGFydERyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuc3RhcnREcmFnZ2luZyh0aGlzKSxcbiAgICAgICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLmRyYWdFdmVudEhhbmRsZXIoc3RhcnREcmFnZ2luZ0V2ZW50KTtcblxuICAgICAgICBpZiAoc3RhcnREcmFnZ2luZykge1xuICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzV2FpdGluZ1RvRHJhZygpIHtcbiAgICB2YXIgd2FpdGluZ1RvRHJhZyA9ICh0aGlzLnRpbWVvdXQgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHdhaXRpbmdUb0RyYWc7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgYm9keS5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xuICAgIGJvZHkub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgYm9keS5vZmZNb3VzZU1vdmUoTkFNRVNQQUNFKTtcbiAgICBib2R5Lm9mZk1vdXNlVXAoTkFNRVNQQUNFKTtcblxuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB2YXIgc3RvcERyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuc3RvcERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoc3RvcERyYWdnaW5nRXZlbnQpO1xuICAgICAgXG4gICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgdmFyIGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHZhciBlc2NhcGVEcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LmVzY2FwZURyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihlc2NhcGVEcmFnZ2luZ0V2ZW50KTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=