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
  }]);

  return DragEvent;
}();

DragEvent.startDragging = function (draggableElement) {
  return new DragEvent(draggableElement, DragEvent.actions.START_DRAGGING);
};
DragEvent.stopDragging = function (draggableElement) {
  return new DragEvent(draggableElement, DragEvent.actions.STOP_DRAGGING);
};
DragEvent.dragging = function (draggableElement) {
  return new DragEvent(draggableElement, DragEvent.actions.DRAGGING);
};

DragEvent.actions = {
  START_DRAGGING: 'START_DRAGGING',
  STOP_DRAGGING: 'STOP_DRAGGING',
  DRAGGING: 'DRAGGING'
};

module.exports = DragEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnRXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNLFM7QUFDSixxQkFBWSxnQkFBWixFQUE4QixNQUE5QixFQUFzQztBQUFBOztBQUNwQyxTQUFLLGdCQUFMLEdBQXdCLGdCQUF4QjtBQUNBLFNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDRDs7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLLGdCQUFaO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFaO0FBQ0Q7Ozs7OztBQUdILFVBQVUsYUFBVixHQUEwQixVQUFTLGdCQUFULEVBQTJCO0FBQUUsU0FBTyxJQUFJLFNBQUosQ0FBYyxnQkFBZCxFQUFnQyxVQUFVLE9BQVYsQ0FBa0IsY0FBbEQsQ0FBUDtBQUEyRSxDQUFsSTtBQUNBLFVBQVUsWUFBVixHQUF5QixVQUFTLGdCQUFULEVBQTJCO0FBQUUsU0FBTyxJQUFJLFNBQUosQ0FBYyxnQkFBZCxFQUFnQyxVQUFVLE9BQVYsQ0FBa0IsYUFBbEQsQ0FBUDtBQUEwRSxDQUFoSTtBQUNBLFVBQVUsUUFBVixHQUFxQixVQUFTLGdCQUFULEVBQTJCO0FBQUUsU0FBTyxJQUFJLFNBQUosQ0FBYyxnQkFBZCxFQUFnQyxVQUFVLE9BQVYsQ0FBa0IsUUFBbEQsQ0FBUDtBQUFxRSxDQUF2SDs7QUFFQSxVQUFVLE9BQVYsR0FBb0I7QUFDbEIsa0JBQWdCLGdCQURFO0FBRWxCLGlCQUFlLGVBRkc7QUFHbEIsWUFBVTtBQUhRLENBQXBCOztBQU1BLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJkcmFnRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIERyYWdFdmVudCB7XG4gIGNvbnN0cnVjdG9yKGRyYWdnYWJsZUVsZW1lbnQsIGFjdGlvbikge1xuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudCA9IGRyYWdnYWJsZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gIH1cblxuICBnZXREcmFnZ2FibGVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBnZXRBY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uO1xuICB9XG59XG5cbkRyYWdFdmVudC5zdGFydERyYWdnaW5nID0gZnVuY3Rpb24oZHJhZ2dhYmxlRWxlbWVudCkgeyByZXR1cm4gbmV3IERyYWdFdmVudChkcmFnZ2FibGVFbGVtZW50LCBEcmFnRXZlbnQuYWN0aW9ucy5TVEFSVF9EUkFHR0lORyk7IH07XG5EcmFnRXZlbnQuc3RvcERyYWdnaW5nID0gZnVuY3Rpb24oZHJhZ2dhYmxlRWxlbWVudCkgeyByZXR1cm4gbmV3IERyYWdFdmVudChkcmFnZ2FibGVFbGVtZW50LCBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HKTsgfTtcbkRyYWdFdmVudC5kcmFnZ2luZyA9IGZ1bmN0aW9uKGRyYWdnYWJsZUVsZW1lbnQpIHsgcmV0dXJuIG5ldyBEcmFnRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRHJhZ0V2ZW50LmFjdGlvbnMuRFJBR0dJTkcpOyB9O1xuXG5EcmFnRXZlbnQuYWN0aW9ucyA9IHtcbiAgU1RBUlRfRFJBR0dJTkc6ICdTVEFSVF9EUkFHR0lORycsXG4gIFNUT1BfRFJBR0dJTkc6ICdTVE9QX0RSQUdHSU5HJyxcbiAgRFJBR0dJTkc6ICdEUkFHR0lORydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ0V2ZW50O1xuIl19
