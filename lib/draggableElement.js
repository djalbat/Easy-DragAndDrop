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

        this.dragEventHandler(stopDraggingEvent, function () {
          this.stopDragging();
        }.bind(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCb2R5IiwiRWxlbWVudCIsIkRyYWdFdmVudCIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRWxlbWVudCIsInNlbGVjdG9yIiwiZHJhZ0V2ZW50SGFuZGxlciIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0Iiwib25Nb3VzZURvd24iLCJtb3VzZURvd25IYW5kbGVyIiwiYmluZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJ0b3AiLCJnZXRUb3AiLCJsZWZ0IiwiZ2V0TGVmdCIsImNzcyIsImFkZENsYXNzIiwib24iLCJrZXlEb3duSGFuZGxlciIsIm9mZiIsInJlbW92ZUNsYXNzIiwiZHJhZ2dpbmdFdmVudCIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwic3RhcnREcmFnZ2luZ0V2ZW50Iiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImhhc0NsYXNzIiwid2FpdGluZ1RvRHJhZyIsIm9uTW91c2VVcCIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwib2ZmTW91c2VVcCIsInN0b3BEcmFnZ2luZ0V2ZW50Iiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJldmVudCIsImtleUNvZGUiLCJ3aGljaCIsImVzY2FwZURyYWdnaW5nRXZlbnQiLCJlc2NhcGVEcmFnZ2luZyIsIm1vZHVsZSIsImV4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QixJQUF2QixDQUF4Qjs7QUFFQSxhQUFLM0MsZ0JBQUwsQ0FBc0IwQyxpQkFBdEIsRUFBeUMsWUFBVztBQUNsRCxlQUFLQyxZQUFMO0FBQ0QsU0FGd0MsQ0FFdkNyQyxJQUZ1QyxDQUVsQyxJQUZrQyxDQUF6QztBQUdELE9BTkQsTUFNTztBQUNMLGFBQUtzQyxpQkFBTDtBQUNEO0FBQ0Y7OztxQ0FFZ0JoQyxRLEVBQVVDLFMsRUFBV2EsVyxFQUFhO0FBQ2pELFVBQUlELFdBQVcsS0FBS2EsVUFBTCxFQUFmOztBQUVBLFVBQUliLFFBQUosRUFBYztBQUNaLGFBQUtBLFFBQUwsQ0FBY2IsUUFBZCxFQUF3QkMsU0FBeEI7QUFDRDtBQUNGOzs7bUNBRWNnQyxLLEVBQU87QUFDcEIsVUFBSUMsVUFBVUQsTUFBTUMsT0FBTixJQUFpQkQsTUFBTUUsS0FBckM7O0FBRUEsVUFBSUQsWUFBWXBELGNBQWhCLEVBQWdDO0FBQzlCLFlBQUkrQixXQUFXLEtBQUthLFVBQUwsRUFBZjs7QUFFQSxZQUFJYixRQUFKLEVBQWM7QUFDWixjQUFJdUIsc0JBQXNCdkQsVUFBVXdELGNBQVYsQ0FBeUIsSUFBekIsQ0FBMUI7O0FBRUEsZUFBS2pELGdCQUFMLENBQXNCZ0QsbUJBQXRCOztBQUVBLGVBQUtMLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7Ozs7RUF6SjRCbkQsTzs7QUE0Si9CMEQsT0FBT0MsT0FBUCxHQUFpQnJELGdCQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgQm9keSA9IGVhc3l1aS5Cb2R5LFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50Jyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NSxcbiAgICAgIE5BTUVTUEFDRSA9ICdFYXN5VUktRHJhZ0FuZERyb3AvZHJhZ2dpbmcnO1xuXG52YXIgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmNsYXNzIERyYWdnYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyYWdFdmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG4gIFxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBkcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyhkcmFnZ2luZ0JvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnaW5nQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIHRvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQsXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdmFyIGRyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuZHJhZ2dpbmcodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIoZHJhZ2dpbmdFdmVudCk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICB2YXIgc3RhcnREcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0YXJ0RHJhZ2dpbmcodGhpcyksXG4gICAgICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0YXJ0RHJhZ2dpbmdFdmVudCk7XG5cbiAgICAgICAgaWYgKHN0YXJ0RHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc1dhaXRpbmdUb0RyYWcoKSB7XG4gICAgdmFyIHdhaXRpbmdUb0RyYWcgPSAodGhpcy50aW1lb3V0ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB3YWl0aW5nVG9EcmFnO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcbiAgICBib2R5Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7XG4gICAgYm9keS5vZmZNb3VzZVVwKE5BTUVTUEFDRSk7XG5cbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdmFyIHN0b3BEcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0b3BEcmFnZ2luZyh0aGlzKTtcblxuICAgICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0b3BEcmFnZ2luZ0V2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdmFyIGVzY2FwZURyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuZXNjYXBlRHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGVzY2FwZURyYWdnaW5nRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRWxlbWVudDtcbiJdfQ==