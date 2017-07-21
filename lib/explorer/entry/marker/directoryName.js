'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var DirectoryNameMarkerEntry = function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  function DirectoryNameMarkerEntry() {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    return _possibleConstructorReturn(this, (DirectoryNameMarkerEntry.__proto__ || Object.getPrototypeOf(DirectoryNameMarkerEntry)).apply(this, arguments));
  }

  _createClass(DirectoryNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case Entry.types.FILE_NAME:
          before = true;

          break;

        case Entry.types.DIRECTORY_NAME:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();

          before = name.localeCompare(draggableEntryName) < 0;

          break;
      }

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties);
    }
  }]);

  return DirectoryNameMarkerEntry;
}(MarkerEntry);

module.exports = DirectoryNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJFbnRyeSIsInJlcXVpcmUiLCJNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiYmVmb3JlIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwiRElSRUNUT1JZX05BTUUiLCJuYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsYUFBUixDQUFkO0FBQUEsSUFDTUMsY0FBY0QsUUFBUSxvQkFBUixDQURwQjs7SUFHTUUsd0I7Ozs7Ozs7Ozs7OzZCQUNLQyxjLEVBQWdCO0FBQ3ZCLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMscUJBQXFCRixlQUFlRyxPQUFmLEVBQTNCOztBQUVBLGNBQVFELGtCQUFSO0FBQ0UsYUFBS04sTUFBTVEsS0FBTixDQUFZQyxTQUFqQjtBQUNFSixtQkFBUyxJQUFUOztBQUVBOztBQUVGLGFBQUtMLE1BQU1RLEtBQU4sQ0FBWUUsY0FBakI7QUFDRSxjQUFNQyxPQUFPLEtBQUtDLE9BQUwsRUFBYjtBQUFBLGNBQ01DLHFCQUFxQlQsZUFBZVEsT0FBZixFQUQzQjs7QUFHQVAsbUJBQVVNLEtBQUtHLGFBQUwsQ0FBbUJELGtCQUFuQixJQUF5QyxDQUFuRDs7QUFFQTtBQVpKOztBQWVBLGFBQU9SLE1BQVA7QUFDRDs7O21DQUVxQlUsVSxFQUFZO0FBQUUsYUFBT2IsWUFBWWMsY0FBWixDQUEyQmIsd0JBQTNCLEVBQXFEWSxVQUFyRCxDQUFQO0FBQTBFOzs7O0VBeEJ6RWIsVzs7QUEyQnZDZSxPQUFPQyxPQUFQLEdBQWlCZix3QkFBakIiLCJmaWxlIjoiZGlyZWN0b3J5TmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9tYXJrZXInKTtcblxuY2xhc3MgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ2dhYmxlRW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBNYXJrZXJFbnRyeS5mcm9tUHJvcGVydGllcyhEaXJlY3RvcnlOYW1lTWFya2VyRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuIl19