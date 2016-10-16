'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActivateFileEvent = function () {
  function ActivateFileEvent(file) {
    _classCallCheck(this, ActivateFileEvent);

    this.file = file;
  }

  _createClass(ActivateFileEvent, [{
    key: 'getFile',
    value: function getFile() {
      return this.file;
    }
  }]);

  return ActivateFileEvent;
}();

module.exports = ActivateFileEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9hY3RpdmF0ZUZpbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJBY3RpdmF0ZUZpbGVFdmVudCIsImZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU1BLGlCO0FBQ0osNkJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7Ozs7OEJBRVM7QUFDUixhQUFPLEtBQUtBLElBQVo7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJILGlCQUFqQiIsImZpbGUiOiJhY3RpdmF0ZUZpbGVFdmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQWN0aXZhdGVGaWxlRXZlbnQge1xuICBjb25zdHJ1Y3RvcihmaWxlKSB7XG4gICAgdGhpcy5maWxlID0gZmlsZTtcbiAgfVxuXG4gIGdldEZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGl2YXRlRmlsZUV2ZW50O1xuIl19