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
  DRAGGING: 'DRAGGING'
};

module.exports = DragEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcmFnRXZlbnQuanMiXSwibmFtZXMiOlsiRHJhZ0V2ZW50IiwiZHJhZ2dhYmxlRWxlbWVudCIsImFjdGlvbiIsInN0YXJ0RHJhZ2dpbmdFdmVudCIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsInN0b3BEcmFnZ2luZ0V2ZW50IiwiU1RPUF9EUkFHR0lORyIsImRyYWdnaW5nRXZlbnQiLCJEUkFHR0lORyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUFFTUEsUztBQUNKLHFCQUFZQyxnQkFBWixFQUE4QkMsTUFBOUIsRUFBc0M7QUFBQTs7QUFDcEMsU0FBS0QsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7OzBDQUVxQjtBQUNwQixhQUFPLEtBQUtELGdCQUFaO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBS0MsTUFBWjtBQUNEOzs7a0NBRW9CRCxnQixFQUFrQjtBQUNyQyxVQUFJRSxxQkFBcUIsSUFBSUgsU0FBSixDQUFjQyxnQkFBZCxFQUFnQ0QsVUFBVUksT0FBVixDQUFrQkMsY0FBbEQsQ0FBekI7O0FBRUEsYUFBT0Ysa0JBQVA7QUFDRDs7O2lDQUVtQkYsZ0IsRUFBa0I7QUFDcEMsVUFBSUssb0JBQW9CLElBQUlOLFNBQUosQ0FBY0MsZ0JBQWQsRUFBZ0NELFVBQVVJLE9BQVYsQ0FBa0JHLGFBQWxELENBQXhCOztBQUVBLGFBQU9ELGlCQUFQO0FBQ0Q7Ozs2QkFFZUwsZ0IsRUFBa0I7QUFDaEMsVUFBSU8sZ0JBQWdCLElBQUlSLFNBQUosQ0FBY0MsZ0JBQWQsRUFBZ0NELFVBQVVJLE9BQVYsQ0FBa0JLLFFBQWxELENBQXBCOztBQUVBLGFBQU9ELGFBQVA7QUFDRDs7Ozs7O0FBR0hSLFVBQVVJLE9BQVYsR0FBb0I7QUFDbEJDLGtCQUFnQixnQkFERTtBQUVsQkUsaUJBQWUsZUFGRztBQUdsQkUsWUFBVTtBQUhRLENBQXBCOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCWCxTQUFqQiIsImZpbGUiOiJkcmFnRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIERyYWdFdmVudCB7XG4gIGNvbnN0cnVjdG9yKGRyYWdnYWJsZUVsZW1lbnQsIGFjdGlvbikge1xuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudCA9IGRyYWdnYWJsZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gIH1cblxuICBnZXREcmFnZ2FibGVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBnZXRBY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uO1xuICB9XG5cbiAgc3RhdGljIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRWxlbWVudCkge1xuICAgIHZhciBzdGFydERyYWdnaW5nRXZlbnQgPSBuZXcgRHJhZ0V2ZW50KGRyYWdnYWJsZUVsZW1lbnQsIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HKTtcbiAgICBcbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZ0V2ZW50O1xuICB9XG5cbiAgc3RhdGljIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgdmFyIHN0b3BEcmFnZ2luZ0V2ZW50ID0gbmV3IERyYWdFdmVudChkcmFnZ2FibGVFbGVtZW50LCBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HKTtcbiAgICBcbiAgICByZXR1cm4gc3RvcERyYWdnaW5nRXZlbnQ7XG4gIH1cblxuICBzdGF0aWMgZHJhZ2dpbmcoZHJhZ2dhYmxlRWxlbWVudCkge1xuICAgIHZhciBkcmFnZ2luZ0V2ZW50ID0gbmV3IERyYWdFdmVudChkcmFnZ2FibGVFbGVtZW50LCBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nRXZlbnQ7XG4gIH1cbn1cblxuRHJhZ0V2ZW50LmFjdGlvbnMgPSB7XG4gIFNUQVJUX0RSQUdHSU5HOiAnU1RBUlRfRFJBR0dJTkcnLFxuICBTVE9QX0RSQUdHSU5HOiAnU1RPUF9EUkFHR0lORycsXG4gIERSQUdHSU5HOiAnRFJBR0dJTkcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdFdmVudDtcbiJdfQ==