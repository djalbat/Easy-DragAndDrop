'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragEvent = function () {
  function DragEvent(draggableElement, action) {
    _classCallCheck(this, DragEvent);

    this.draggableElement = draggableElement;
    this.action = action;
  }

  _createClass(DragEvent, [{
    key: 'getDraggableElement',
    value: function getDraggableElement() {
      return this.draggableElement;
    }
  }, {
    key: 'getAction',
    value: function getAction() {
      return this.action;
    }
  }], [{
    key: 'startDragging',
    value: function startDragging(draggableElement) {
      var startDraggingEvent = new DragEvent(draggableElement, DragEvent.actions.START_DRAGGING);

      return startDraggingEvent;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableElement) {
      var stopDraggingEvent = new DragEvent(draggableElement, DragEvent.actions.STOP_DRAGGING);

      return stopDraggingEvent;
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging(draggableElement) {
      var escapeDraggingEvent = new DragEvent(draggableElement, DragEvent.actions.ESCAPE_DRAGGING);

      return escapeDraggingEvent;
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableElement) {
      var draggingEvent = new DragEvent(draggableElement, DragEvent.actions.DRAGGING);

      return draggingEvent;
    }
  }]);

  return DragEvent;
}();

DragEvent.actions = {
  START_DRAGGING: 'START_DRAGGING',
  STOP_DRAGGING: 'STOP_DRAGGING',
  ESCAPE_DRAGGING: 'ESCAPE_DRAGGING',
  DRAGGING: 'DRAGGING'
};

module.exports = DragEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnRXZlbnQuanMiXSwibmFtZXMiOlsiRHJhZ0V2ZW50IiwiZHJhZ2dhYmxlRWxlbWVudCIsImFjdGlvbiIsInN0YXJ0RHJhZ2dpbmdFdmVudCIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsInN0b3BEcmFnZ2luZ0V2ZW50IiwiU1RPUF9EUkFHR0lORyIsImVzY2FwZURyYWdnaW5nRXZlbnQiLCJFU0NBUEVfRFJBR0dJTkciLCJkcmFnZ2luZ0V2ZW50IiwiRFJBR0dJTkciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU1BLFM7QUFDSixxQkFBWUMsZ0JBQVosRUFBOEJDLE1BQTlCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUtELGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDRDs7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLRCxnQkFBWjtBQUNEOzs7Z0NBRVc7QUFDVixhQUFPLEtBQUtDLE1BQVo7QUFDRDs7O2tDQUVvQkQsZ0IsRUFBa0I7QUFDckMsVUFBSUUscUJBQXFCLElBQUlILFNBQUosQ0FBY0MsZ0JBQWQsRUFBZ0NELFVBQVVJLE9BQVYsQ0FBa0JDLGNBQWxELENBQXpCOztBQUVBLGFBQU9GLGtCQUFQO0FBQ0Q7OztpQ0FFbUJGLGdCLEVBQWtCO0FBQ3BDLFVBQUlLLG9CQUFvQixJQUFJTixTQUFKLENBQWNDLGdCQUFkLEVBQWdDRCxVQUFVSSxPQUFWLENBQWtCRyxhQUFsRCxDQUF4Qjs7QUFFQSxhQUFPRCxpQkFBUDtBQUNEOzs7bUNBRXFCTCxnQixFQUFrQjtBQUN0QyxVQUFJTyxzQkFBc0IsSUFBSVIsU0FBSixDQUFjQyxnQkFBZCxFQUFnQ0QsVUFBVUksT0FBVixDQUFrQkssZUFBbEQsQ0FBMUI7O0FBRUEsYUFBT0QsbUJBQVA7QUFDRDs7OzZCQUVlUCxnQixFQUFrQjtBQUNoQyxVQUFJUyxnQkFBZ0IsSUFBSVYsU0FBSixDQUFjQyxnQkFBZCxFQUFnQ0QsVUFBVUksT0FBVixDQUFrQk8sUUFBbEQsQ0FBcEI7O0FBRUEsYUFBT0QsYUFBUDtBQUNEOzs7Ozs7QUFHSFYsVUFBVUksT0FBVixHQUFvQjtBQUNsQkMsa0JBQWdCLGdCQURFO0FBRWxCRSxpQkFBZSxlQUZHO0FBR2xCRSxtQkFBaUIsaUJBSEM7QUFJbEJFLFlBQVU7QUFKUSxDQUFwQjs7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQmIsU0FBakIiLCJmaWxlIjoiZHJhZ0V2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBEcmFnRXZlbnQge1xuICBjb25zdHJ1Y3RvcihkcmFnZ2FibGVFbGVtZW50LCBhY3Rpb24pIHtcbiAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnZ2FibGVFbGVtZW50O1xuICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICB9XG5cbiAgZ2V0RHJhZ2dhYmxlRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgZ2V0QWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgc3RhcnREcmFnZ2luZ0V2ZW50ID0gbmV3IERyYWdFdmVudChkcmFnZ2FibGVFbGVtZW50LCBEcmFnRXZlbnQuYWN0aW9ucy5TVEFSVF9EUkFHR0lORyk7XG4gICAgXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmdFdmVudDtcbiAgfVxuXG4gIHN0YXRpYyBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRWxlbWVudCkge1xuICAgIHZhciBzdG9wRHJhZ2dpbmdFdmVudCA9IG5ldyBEcmFnRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORyk7XG4gICAgXG4gICAgcmV0dXJuIHN0b3BEcmFnZ2luZ0V2ZW50O1xuICB9XG5cbiAgc3RhdGljIGVzY2FwZURyYWdnaW5nKGRyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgZXNjYXBlRHJhZ2dpbmdFdmVudCA9IG5ldyBEcmFnRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRHJhZ0V2ZW50LmFjdGlvbnMuRVNDQVBFX0RSQUdHSU5HKTtcblxuICAgIHJldHVybiBlc2NhcGVEcmFnZ2luZ0V2ZW50O1xuICB9XG5cbiAgc3RhdGljIGRyYWdnaW5nKGRyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgZHJhZ2dpbmdFdmVudCA9IG5ldyBEcmFnRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRHJhZ0V2ZW50LmFjdGlvbnMuRFJBR0dJTkcpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nRXZlbnQ7XG4gIH1cbn1cblxuRHJhZ0V2ZW50LmFjdGlvbnMgPSB7XG4gIFNUQVJUX0RSQUdHSU5HOiAnU1RBUlRfRFJBR0dJTkcnLFxuICBTVE9QX0RSQUdHSU5HOiAnU1RPUF9EUkFHR0lORycsXG4gIEVTQ0FQRV9EUkFHR0lORzogJ0VTQ0FQRV9EUkFHR0lORycsXG4gIERSQUdHSU5HOiAnRFJBR0dJTkcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdFdmVudDtcbiJdfQ==