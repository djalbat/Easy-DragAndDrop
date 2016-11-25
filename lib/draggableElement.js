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
      return this.hasClass('dragging');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnZ2FibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJCb2R5IiwiRWxlbWVudCIsIkRyYWdFdmVudCIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiTkFNRVNQQUNFIiwiYm9keSIsIkRyYWdnYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsImRyYWdFdmVudEhhbmRsZXIiLCJ0aW1lb3V0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm9uTW91c2VEb3duIiwibW91c2VEb3duSGFuZGxlciIsImJpbmQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwidG9wIiwiZ2V0VG9wIiwibGVmdCIsImdldExlZnQiLCJjc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZHJhZ2dpbmdFdmVudCIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwic3RhcnREcmFnZ2luZ0V2ZW50Iiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImhhc0NsYXNzIiwid2FpdGluZ1RvRHJhZyIsIm9uTW91c2VVcCIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwib2ZmTW91c2VVcCIsInN0b3BEcmFnZ2luZ0V2ZW50Iiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsT0FBT0YsT0FBT0UsSUFEbEI7QUFBQSxJQUVJQyxVQUFV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YWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9kcmFnRXZlbnQnKTtcblxuY29uc3QgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzUsXG4gICAgICBOQU1FU1BBQ0UgPSAnRWFzeVVJLURyYWdBbmREcm9wL2RyYWdnaW5nJztcblxudmFyIGJvZHkgPSBuZXcgQm9keSgpO1xuXG5jbGFzcyBEcmFnZ2FibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcmFnRXZlbnRIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyID0gZHJhZ0V2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuICBcbiAgZ2V0RHJhZ2dpbmdCb3VuZHMoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gZHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMoZHJhZ2dpbmdCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2luZ0JvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICB0b3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgIGxlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMudG9wT2Zmc2V0ID0gdG9wIC0gbW91c2VUb3A7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB2YXIgZHJhZ2dpbmdFdmVudCA9IERyYWdFdmVudC5kcmFnZ2luZyh0aGlzKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcihkcmFnZ2luZ0V2ZW50KTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIHZhciBzdGFydERyYWdnaW5nRXZlbnQgPSBEcmFnRXZlbnQuc3RhcnREcmFnZ2luZyh0aGlzKSxcbiAgICAgICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLmRyYWdFdmVudEhhbmRsZXIoc3RhcnREcmFnZ2luZ0V2ZW50KTtcblxuICAgICAgICBpZiAoc3RhcnREcmFnZ2luZykge1xuICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGlzV2FpdGluZ1RvRHJhZygpIHtcbiAgICB2YXIgd2FpdGluZ1RvRHJhZyA9IHRoaXMudGltZW91dCAhPT0gbnVsbDtcblxuICAgIHJldHVybiB3YWl0aW5nVG9EcmFnO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcbiAgICBib2R5Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7XG4gICAgYm9keS5vZmZNb3VzZVVwKE5BTUVTUEFDRSk7XG5cbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdmFyIHN0b3BEcmFnZ2luZ0V2ZW50ID0gRHJhZ0V2ZW50LnN0b3BEcmFnZ2luZyh0aGlzKTtcblxuICAgICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKHN0b3BEcmFnZ2luZ0V2ZW50KTtcbiAgICAgIFxuICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbGVtZW50O1xuIl19