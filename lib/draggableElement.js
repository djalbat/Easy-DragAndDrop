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
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var bounds = this.getBounds(),
          collapsedBounds = bounds; ///

      return collapsedBounds;
    }
  }, {
    key: 'isOverlappingCollapsedBounds',
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

      return overlappingCollapsedBounds;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCb2R5IiwiRWxlbWVudCIsIkRyYWdFdmVudCIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRWxlbWVudCIsInNlbGVjdG9yIiwiZHJhZ0V2ZW50SGFuZGxlciIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0Iiwib25Nb3VzZURvd24iLCJtb3VzZURvd25IYW5kbGVyIiwiYmluZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsInRvcCIsImdldFRvcCIsImxlZnQiLCJnZXRMZWZ0IiwiY3NzIiwiYWRkQ2xhc3MiLCJvbiIsImtleURvd25IYW5kbGVyIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJkcmFnZ2luZ0V2ZW50IiwiZHJhZ2dpbmciLCJtb3VzZUJ1dHRvbiIsInNldFRpbWVvdXQiLCJzdGFydERyYWdnaW5nRXZlbnQiLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJ3YWl0aW5nVG9EcmFnIiwib25Nb3VzZVVwIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJvZmZNb3VzZVVwIiwic3RvcERyYWdnaW5nRXZlbnQiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImV2ZW50Iiwia2V5Q29kZSIsIndoaWNoIiwiZXNjYXBlRHJhZ2dpbmdFdmVudCIsImVzY2FwZURyYWdnaW5nIiwibW9kdWxlIiwi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QXVCLElBQXZCLENBQXhCOztBQUVBLGFBQUszQyxnQkFBTCxDQUFzQjBDLGlCQUF0QixFQUF5QyxZQUFXO0FBQ2xELGVBQUtDLFlBQUw7QUFDRCxTQUZ3QyxDQUV2Q3JDLElBRnVDLENBRWxDLElBRmtDLENBQXpDO0FBR0QsT0FORCxNQU1PO0FBQ0wsYUFBS3NDLGlCQUFMO0FBQ0Q7QUFDRjs7O3FDQUVnQmhDLFEsRUFBVUMsUyxFQUFXYSxXLEVBQWE7QUFDakQsVUFBSUQsV0FBVyxLQUFLYSxVQUFMLEVBQWY7O0FBRUEsVUFBSWIsUUFBSixFQUFjO0FBQ1osYUFBS0EsUUFBTCxDQUFjYixRQUFkLEVBQXdCQyxTQUF4QjtBQUNEO0FBQ0Y7OzttQ0FFY2dDLEssRUFBTztBQUNwQixVQUFJQyxVQUFVRCxNQUFNQyxPQUFOLElBQWlCRCxNQUFNRSxLQUFyQzs7QUFFQSxVQUFJRCxZQUFZcEQsY0FBaEIsRUFBZ0M7QUFDOUIsWUFBSStCLFdBQVcsS0FBS2EsVUFBTCxFQUFmOztBQUVBLFlBQUliLFFBQUosRUFBYztBQUNaLGNBQUl1QixzQkFBc0J2RCxVQUFVd0QsY0FBVixDQUF5QixJQUF6QixDQUExQjs7QUFFQSxlQUFLakQsZ0JBQUwsQ0FBc0JnRCxtQkFBdEI7O0FBRUEsZUFBS0wsWUFBTDtBQUNEO0FBQ0Y7QUFDRjs7OztFQXpKNEJuRCxPOztBQTRKL0IwRCxPQUFPQyxPQUFQLEdBQWlCckQsZ0JBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1LFxuICAgICAgTkFNRVNQQUNFID0gJ0Vhc3lVSS1EcmFnQW5kRHJvcC9kcmFnZ2luZyc7XG5cbnZhciBib2R5ID0gbmV3IEJvZHkoKTtcblxuY2xhc3MgRHJhZ2dhYmxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJhZ0V2ZW50SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICB0b3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgIGxlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMudG9wT2Zmc2V0ID0gdG9wIC0gbW91c2VUb3A7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0LFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHZhciBkcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LmRyYWdnaW5nKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGRyYWdnaW5nRXZlbnQpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgdmFyIHN0YXJ0RHJhZ2dpbmdFdmVudCA9IERyYWdFdmVudC5zdGFydERyYWdnaW5nKHRoaXMpLFxuICAgICAgICAgICAgc3RhcnREcmFnZ2luZyA9IHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihzdGFydERyYWdnaW5nRXZlbnQpO1xuXG4gICAgICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNXYWl0aW5nVG9EcmFnKCkge1xuICAgIHZhciB3YWl0aW5nVG9EcmFnID0gKHRoaXMudGltZW91dCAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gd2FpdGluZ1RvRHJhZztcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XG4gICAgYm9keS5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9mZk1vdXNlTW92ZShOQU1FU1BBQ0UpO1xuICAgIGJvZHkub2ZmTW91c2VVcChOQU1FU1BBQ0UpO1xuXG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHZhciBzdG9wRHJhZ2dpbmdFdmVudCA9IERyYWdFdmVudC5zdG9wRHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihzdG9wRHJhZ2dpbmdFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgdmFyIGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHZhciBlc2NhcGVEcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LmVzY2FwZURyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihlc2NhcGVEcmFnZ2luZ0V2ZW50KTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVsZW1lbnQ7XG4iXX0=