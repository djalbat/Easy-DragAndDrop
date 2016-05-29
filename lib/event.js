'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(draggableElement, action) {
    _classCallCheck(this, Event);

    this.draggableElement = draggableElement;
    this.action = action;
  }

  _createClass(Event, [{
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

  return Event;
}();

Event.startDragging = function (draggableElement) {
  return new Event(draggableElement, Event.actions.START_DRAGGING);
};
Event.stopDragging = function (draggableElement) {
  return new Event(draggableElement, Event.actions.STOP_DRAGGING);
};
Event.dragging = function (draggableElement) {
  return new Event(draggableElement, Event.actions.DRAGGING);
};
Event.draggingEnter = function (draggableElement) {
  return new Event(draggableElement, Event.actions.DRAGGING_ENTER);
};
Event.draggingLeave = function (draggableElement) {
  return new Event(draggableElement, Event.actions.DRAGGING_LEAVE);
};
Event.dropInside = function (draggableElement) {
  return new Event(draggableElement, Event.actions.DROP_INSIDE);
};
Event.dropOutside = function (draggableElement) {
  return new Event(draggableElement, Event.actions.DROP_OUTSIDE);
};

Event.actions = {
  START_DRAGGING: 'START_DRAGGING',
  STOP_DRAGGING: 'STOP_DRAGGING',
  DRAGGING: 'DRAGGING',
  DRAGGING_ENTER: 'DRAGGING_ENTER',
  DRAGGING_LEAVE: 'DRAGGING_LEAVE',
  DROP_INSIDE: 'DROP_INSIDE',
  DROP_OUTSIDE: 'DROP_OUTSIDE'
};

module.exports = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ldmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU0sSztBQUNKLGlCQUFZLGdCQUFaLEVBQThCLE1BQTlCLEVBQXNDO0FBQUE7O0FBQ3BDLFNBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNEOzs7OzBDQUVxQjtBQUNwQixhQUFPLEtBQUssZ0JBQVo7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLLE1BQVo7QUFDRDs7Ozs7O0FBR0gsTUFBTSxhQUFOLEdBQXNCLFVBQVMsZ0JBQVQsRUFBMkI7QUFBRSxTQUFPLElBQUksS0FBSixDQUFVLGdCQUFWLEVBQTRCLE1BQU0sT0FBTixDQUFjLGNBQTFDLENBQVA7QUFBbUUsQ0FBdEg7QUFDQSxNQUFNLFlBQU4sR0FBcUIsVUFBUyxnQkFBVCxFQUEyQjtBQUFFLFNBQU8sSUFBSSxLQUFKLENBQVUsZ0JBQVYsRUFBNEIsTUFBTSxPQUFOLENBQWMsYUFBMUMsQ0FBUDtBQUFrRSxDQUFwSDtBQUNBLE1BQU0sUUFBTixHQUFpQixVQUFTLGdCQUFULEVBQTJCO0FBQUUsU0FBTyxJQUFJLEtBQUosQ0FBVSxnQkFBVixFQUE0QixNQUFNLE9BQU4sQ0FBYyxRQUExQyxDQUFQO0FBQTZELENBQTNHO0FBQ0EsTUFBTSxhQUFOLEdBQXNCLFVBQVMsZ0JBQVQsRUFBMkI7QUFBRSxTQUFPLElBQUksS0FBSixDQUFVLGdCQUFWLEVBQTRCLE1BQU0sT0FBTixDQUFjLGNBQTFDLENBQVA7QUFBbUUsQ0FBdEg7QUFDQSxNQUFNLGFBQU4sR0FBc0IsVUFBUyxnQkFBVCxFQUEyQjtBQUFFLFNBQU8sSUFBSSxLQUFKLENBQVUsZ0JBQVYsRUFBNEIsTUFBTSxPQUFOLENBQWMsY0FBMUMsQ0FBUDtBQUFtRSxDQUF0SDtBQUNBLE1BQU0sVUFBTixHQUFtQixVQUFTLGdCQUFULEVBQTJCO0FBQUUsU0FBTyxJQUFJLEtBQUosQ0FBVSxnQkFBVixFQUE0QixNQUFNLE9BQU4sQ0FBYyxXQUExQyxDQUFQO0FBQWdFLENBQWhIO0FBQ0EsTUFBTSxXQUFOLEdBQW9CLFVBQVMsZ0JBQVQsRUFBMkI7QUFBRSxTQUFPLElBQUksS0FBSixDQUFVLGdCQUFWLEVBQTRCLE1BQU0sT0FBTixDQUFjLFlBQTFDLENBQVA7QUFBaUUsQ0FBbEg7O0FBRUEsTUFBTSxPQUFOLEdBQWdCO0FBQ2Qsa0JBQWdCLGdCQURGO0FBRWQsaUJBQWUsZUFGRDtBQUdkLFlBQVUsVUFISTtBQUlkLGtCQUFnQixnQkFKRjtBQUtkLGtCQUFnQixnQkFMRjtBQU1kLGVBQWEsYUFOQztBQU9kLGdCQUFjO0FBUEEsQ0FBaEI7O0FBVUEsT0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6ImV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKGRyYWdnYWJsZUVsZW1lbnQsIGFjdGlvbikge1xuICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudCA9IGRyYWdnYWJsZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gIH1cblxuICBnZXREcmFnZ2FibGVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBnZXRBY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uO1xuICB9XG59XG5cbkV2ZW50LnN0YXJ0RHJhZ2dpbmcgPSBmdW5jdGlvbihkcmFnZ2FibGVFbGVtZW50KSB7IHJldHVybiBuZXcgRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRXZlbnQuYWN0aW9ucy5TVEFSVF9EUkFHR0lORyk7IH07XG5FdmVudC5zdG9wRHJhZ2dpbmcgPSBmdW5jdGlvbihkcmFnZ2FibGVFbGVtZW50KSB7IHJldHVybiBuZXcgRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HKTsgfTtcbkV2ZW50LmRyYWdnaW5nID0gZnVuY3Rpb24oZHJhZ2dhYmxlRWxlbWVudCkgeyByZXR1cm4gbmV3IEV2ZW50KGRyYWdnYWJsZUVsZW1lbnQsIEV2ZW50LmFjdGlvbnMuRFJBR0dJTkcpOyB9O1xuRXZlbnQuZHJhZ2dpbmdFbnRlciA9IGZ1bmN0aW9uKGRyYWdnYWJsZUVsZW1lbnQpIHsgcmV0dXJuIG5ldyBFdmVudChkcmFnZ2FibGVFbGVtZW50LCBFdmVudC5hY3Rpb25zLkRSQUdHSU5HX0VOVEVSKTsgfTtcbkV2ZW50LmRyYWdnaW5nTGVhdmUgPSBmdW5jdGlvbihkcmFnZ2FibGVFbGVtZW50KSB7IHJldHVybiBuZXcgRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRXZlbnQuYWN0aW9ucy5EUkFHR0lOR19MRUFWRSk7IH07XG5FdmVudC5kcm9wSW5zaWRlID0gZnVuY3Rpb24oZHJhZ2dhYmxlRWxlbWVudCkgeyByZXR1cm4gbmV3IEV2ZW50KGRyYWdnYWJsZUVsZW1lbnQsIEV2ZW50LmFjdGlvbnMuRFJPUF9JTlNJREUpOyB9O1xuRXZlbnQuZHJvcE91dHNpZGUgPSBmdW5jdGlvbihkcmFnZ2FibGVFbGVtZW50KSB7IHJldHVybiBuZXcgRXZlbnQoZHJhZ2dhYmxlRWxlbWVudCwgRXZlbnQuYWN0aW9ucy5EUk9QX09VVFNJREUpOyB9O1xuXG5FdmVudC5hY3Rpb25zID0ge1xuICBTVEFSVF9EUkFHR0lORzogJ1NUQVJUX0RSQUdHSU5HJyxcbiAgU1RPUF9EUkFHR0lORzogJ1NUT1BfRFJBR0dJTkcnLFxuICBEUkFHR0lORzogJ0RSQUdHSU5HJyxcbiAgRFJBR0dJTkdfRU5URVI6ICdEUkFHR0lOR19FTlRFUicsXG4gIERSQUdHSU5HX0xFQVZFOiAnRFJBR0dJTkdfTEVBVkUnLFxuICBEUk9QX0lOU0lERTogJ0RST1BfSU5TSURFJyxcbiAgRFJPUF9PVVRTSURFOiAnRFJPUF9PVVRTSURFJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudDtcbiJdfQ==
