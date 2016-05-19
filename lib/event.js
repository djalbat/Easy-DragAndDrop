'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(entry, type) {
    _classCallCheck(this, Event);

    this.entry = entry;
    this.type = type;
  }

  _createClass(Event, [{
    key: 'getEntry',
    value: function getEntry() {
      return this.entry;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }]);

  return Event;
}();

Event.start = function (entry) {
  return new Event(entry, Event.types.START_DRAGGING);
};
Event.stop = function (entry) {
  return new Event(entry, Event.types.STOP_DRAGGING);
};
Event.drag = function (entry) {
  return new Event(entry, Event.types.DRAG);
};

Event.types = {
  START_DRAGGING: 'START_DRAGGING',
  STOP_DRAGGING: 'STOP_DRAGGING',
  DRAG: 'DRAG'
};

module.exports = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ldmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU07QUFDSixXQURJLEtBQ0osQ0FBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCOzBCQURyQixPQUNxQjs7QUFDdkIsU0FBSyxLQUFMLEdBQWEsS0FBYixDQUR1QjtBQUV2QixTQUFLLElBQUwsR0FBWSxJQUFaLENBRnVCO0dBQXpCOztlQURJOzsrQkFNTztBQUNULGFBQU8sS0FBSyxLQUFMLENBREU7Ozs7OEJBSUQ7QUFDUixhQUFPLEtBQUssSUFBTCxDQURDOzs7O1NBVk47OztBQWVOLE1BQU0sYUFBTixHQUFzQixVQUFTLEtBQVQsRUFBZ0I7QUFBRSxTQUFPLElBQUksS0FBSixDQUFVLEtBQVYsRUFBaUIsTUFBTSxLQUFOLENBQVksY0FBWixDQUF4QixDQUFGO0NBQWhCO0FBQ3RCLE1BQU0sWUFBTixHQUFxQixVQUFTLEtBQVQsRUFBZ0I7QUFBRSxTQUFPLElBQUksS0FBSixDQUFVLEtBQVYsRUFBaUIsTUFBTSxLQUFOLENBQVksYUFBWixDQUF4QixDQUFGO0NBQWhCO0FBQ3JCLE1BQU0sSUFBTixHQUFhLFVBQVMsS0FBVCxFQUFnQjtBQUFFLFNBQU8sSUFBSSxLQUFKLENBQVUsS0FBVixFQUFpQixNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQXhCLENBQUY7Q0FBaEI7O0FBRWIsTUFBTSxLQUFOLEdBQWM7QUFDWixrQkFBZ0IsZ0JBQWhCO0FBQ0EsaUJBQWUsZUFBZjtBQUNBLFFBQU0sTUFBTjtDQUhGOztBQU1BLE9BQU8sT0FBUCxHQUFpQixLQUFqQiIsImZpbGUiOiJldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgRXZlbnQge1xuICBjb25zdHJ1Y3RvcihlbnRyeSwgdHlwZSkge1xuICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgZ2V0RW50cnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW50cnk7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbn1cblxuRXZlbnQuc3RhcnREcmFnZ2luZyA9IGZ1bmN0aW9uKGVudHJ5KSB7IHJldHVybiBuZXcgRXZlbnQoZW50cnksIEV2ZW50LnR5cGVzLlNUQVJUX0RSQUdHSU5HKTsgfTtcbkV2ZW50LnN0b3BEcmFnZ2luZyA9IGZ1bmN0aW9uKGVudHJ5KSB7IHJldHVybiBuZXcgRXZlbnQoZW50cnksIEV2ZW50LnR5cGVzLlNUT1BfRFJBR0dJTkcpOyB9O1xuRXZlbnQuZHJhZyA9IGZ1bmN0aW9uKGVudHJ5KSB7IHJldHVybiBuZXcgRXZlbnQoZW50cnksIEV2ZW50LnR5cGVzLkRSQUcpOyB9O1xuXG5FdmVudC50eXBlcyA9IHtcbiAgU1RBUlRfRFJBR0dJTkc6ICdTVEFSVF9EUkFHR0lORycsXG4gIFNUT1BfRFJBR0dJTkc6ICdTVE9QX0RSQUdHSU5HJyxcbiAgRFJBRzogJ0RSQUcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50O1xuIl19
