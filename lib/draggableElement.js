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
  }]);

  return DraggableElement;
}(Element);

module.exports = DraggableElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCb2R5IiwiRWxlbWVudCIsIkRyYWdFdmVudCIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiTkFNRVNQQUNFIiwiYm9keSIsIkRyYWdnYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsImRyYWdFdmVudEhhbmRsZXIiLCJ0aW1lb3V0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm9uTW91c2VEb3duIiwibW91c2VEb3duSGFuZGxlciIsImJpbmQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwidG9wIiwiZ2V0VG9wIiwibGVmdCIsImdldExlZnQiLCJjc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZHJhZ2dpbmdFdmVudCIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwic3RhcnREcmFnZ2luZ0V2ZW50Iiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImhhc0NsYXNzIiwid2FpdGluZ1RvRHJhZyIsIm9uTW91c2VVcCIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwib2ZmTW91c2VVcCIsInN0b3BEcmFnZ2luZ0V2ZW50Iiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsT0FBT0YsT0FBT0UsSUFEbEI7QUFBQSxJQUVJQyxVQUFV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QyxnQkFBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEJvZHkgPSBlYXN5dWkuQm9keSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpO1xuXG5jb25zdCBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NSxcbiAgICAgIE5BTUVTUEFDRSA9ICdFYXN5VUktRHJhZ0FuZERyb3AvZHJhZ2dpbmcnO1xuXG52YXIgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmNsYXNzIERyYWdnYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyYWdFdmVudEhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG4gIFxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBkcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyhkcmFnZ2luZ0JvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnaW5nQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIHRvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0LFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHZhciBkcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LmRyYWdnaW5nKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKGRyYWdnaW5nRXZlbnQpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgdmFyIHN0YXJ0RHJhZ2dpbmdFdmVudCA9IERyYWdFdmVudC5zdGFydERyYWdnaW5nKHRoaXMpLFxuICAgICAgICAgICAgc3RhcnREcmFnZ2luZyA9IHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihzdGFydERyYWdnaW5nRXZlbnQpO1xuXG4gICAgICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNXYWl0aW5nVG9EcmFnKCkge1xuICAgIHZhciB3YWl0aW5nVG9EcmFnID0gKHRoaXMudGltZW91dCAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gd2FpdGluZ1RvRHJhZztcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XG4gICAgYm9keS5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9mZk1vdXNlTW92ZShOQU1FU1BBQ0UpO1xuICAgIGJvZHkub2ZmTW91c2VVcChOQU1FU1BBQ0UpO1xuXG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHZhciBzdG9wRHJhZ2dpbmdFdmVudCA9IERyYWdFdmVudC5zdG9wRHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihzdG9wRHJhZ2dpbmdFdmVudCk7XG4gICAgICBcbiAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRWxlbWVudDtcbiJdfQ==