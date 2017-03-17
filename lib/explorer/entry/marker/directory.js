'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    Marker = require('../marker');

var DirectoryMarker = function (_Marker) {
  _inherits(DirectoryMarker, _Marker);

  function DirectoryMarker() {
    _classCallCheck(this, DirectoryMarker);

    return _possibleConstructorReturn(this, (DirectoryMarker.__proto__ || Object.getPrototypeOf(DirectoryMarker)).apply(this, arguments));
  }

  _createClass(DirectoryMarker, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = entryType === Entry.types.FILE ? true : name.localeCompare(entryName) < 0;

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Marker.fromProperties(DirectoryMarker, properties);
    }
  }]);

  return DirectoryMarker;
}(Marker);

module.exports = DirectoryMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbIkVudHJ5IiwicmVxdWlyZSIsIk1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsImVudHJ5IiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiYmVmb3JlIiwidHlwZXMiLCJGSUxFIiwibG9jYWxlQ29tcGFyZSIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFBQSxJQUNNQyxTQUFTRCxRQUFRLFdBQVIsQ0FEZjs7SUFHTUUsZTs7Ozs7Ozs7Ozs7NkJBQ0tDLEssRUFBTztBQUNkLFVBQU1DLE9BQU8sS0FBS0MsT0FBTCxFQUFiO0FBQUEsVUFDTUMsWUFBWUgsTUFBTUUsT0FBTixFQURsQjtBQUFBLFVBRU1FLFlBQVlKLE1BQU1LLE9BQU4sRUFGbEI7QUFBQSxVQUdNQyxTQUFVRixjQUFjUixNQUFNVyxLQUFOLENBQVlDLElBQTNCLEdBQ0UsSUFERixHQUVLUCxLQUFLUSxhQUFMLENBQW1CTixTQUFuQixJQUFnQyxDQUxwRDs7QUFPQSxhQUFPRyxNQUFQO0FBQ0Q7OzttQ0FFcUJJLFUsRUFBWTtBQUNoQyxhQUFPWixPQUFPYSxjQUFQLENBQXNCWixlQUF0QixFQUF1Q1csVUFBdkMsQ0FBUDtBQUNEOzs7O0VBZDJCWixNOztBQWlCOUJjLE9BQU9DLE9BQVAsR0FBaUJkLGVBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyID0gcmVxdWlyZSgnLi4vbWFya2VyJyk7XG5cbmNsYXNzIERpcmVjdG9yeU1hcmtlciBleHRlbmRzIE1hcmtlciB7XG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgYmVmb3JlID0gKGVudHJ5VHlwZSA9PT0gRW50cnkudHlwZXMuRklMRSkgP1xuICAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICAgIChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gTWFya2VyLmZyb21Qcm9wZXJ0aWVzKERpcmVjdG9yeU1hcmtlciwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlNYXJrZXI7XG4iXX0=