'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragEvent = function () {
  function DragEvent(entry, type) {
    _classCallCheck(this, DragEvent);

    this.entry = entry;
    this.type = type;
  }

  _createClass(DragEvent, [{
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

  return DragEvent;
}();

DragEvent.start = function (entry) {
  return new DragEvent(entry, DragEvent.types.START);
};
DragEvent.stop = function (entry) {
  return new DragEvent(entry, DragEvent.types.STOP);
};
DragEvent.drag = function (entry) {
  return new DragEvent(entry, DragEvent.types.DRAG);
};

DragEvent.types = {
  START: 'START',
  STOP: 'STOP',
  DRAG: 'DRAG'
};

module.exports = DragEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcmFnRXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNLFM7QUFDSixxQkFBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCO0FBQUE7O0FBQ3ZCLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7Ozs7K0JBRVU7QUFDVCxhQUFPLEtBQUssS0FBWjtBQUNEOzs7OEJBRVM7QUFDUixhQUFPLEtBQUssSUFBWjtBQUNEOzs7Ozs7QUFHSCxVQUFVLEtBQVYsR0FBa0IsVUFBUyxLQUFULEVBQWdCO0FBQUUsU0FBTyxJQUFJLFNBQUosQ0FBYyxLQUFkLEVBQXFCLFVBQVUsS0FBVixDQUFnQixLQUFyQyxDQUFQO0FBQXFELENBQXpGO0FBQ0EsVUFBVSxJQUFWLEdBQWlCLFVBQVMsS0FBVCxFQUFnQjtBQUFFLFNBQU8sSUFBSSxTQUFKLENBQWMsS0FBZCxFQUFxQixVQUFVLEtBQVYsQ0FBZ0IsSUFBckMsQ0FBUDtBQUFvRCxDQUF2RjtBQUNBLFVBQVUsSUFBVixHQUFpQixVQUFTLEtBQVQsRUFBZ0I7QUFBRSxTQUFPLElBQUksU0FBSixDQUFjLEtBQWQsRUFBcUIsVUFBVSxLQUFWLENBQWdCLElBQXJDLENBQVA7QUFBb0QsQ0FBdkY7O0FBRUEsVUFBVSxLQUFWLEdBQWtCO0FBQ2hCLFNBQU8sT0FEUztBQUVoQixRQUFNLE1BRlU7QUFHaEIsUUFBTTtBQUhVLENBQWxCOztBQU1BLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJkcmFnRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIERyYWdFdmVudCB7XG4gIGNvbnN0cnVjdG9yKGVudHJ5LCB0eXBlKSB7XG4gICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXRFbnRyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyeTtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxufVxuXG5EcmFnRXZlbnQuc3RhcnQgPSBmdW5jdGlvbihlbnRyeSkgeyByZXR1cm4gbmV3IERyYWdFdmVudChlbnRyeSwgRHJhZ0V2ZW50LnR5cGVzLlNUQVJUKTsgfTtcbkRyYWdFdmVudC5zdG9wID0gZnVuY3Rpb24oZW50cnkpIHsgcmV0dXJuIG5ldyBEcmFnRXZlbnQoZW50cnksIERyYWdFdmVudC50eXBlcy5TVE9QKTsgfTtcbkRyYWdFdmVudC5kcmFnID0gZnVuY3Rpb24oZW50cnkpIHsgcmV0dXJuIG5ldyBEcmFnRXZlbnQoZW50cnksIERyYWdFdmVudC50eXBlcy5EUkFHKTsgfTtcblxuRHJhZ0V2ZW50LnR5cGVzID0ge1xuICBTVEFSVDogJ1NUQVJUJyxcbiAgU1RPUDogJ1NUT1AnLFxuICBEUkFHOiAnRFJBRydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ0V2ZW50O1xuIl19
