'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).apply(this, arguments));
  }

  _createClass(FileNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var name = this.getName(),
          draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          before = draggableEntryType === Entry.types.DIRECTORY_NAME ? false : name.localeCompare(draggableEntryName) < 0;

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return MarkerEntry.fromProperties(FileNameMarkerEntry, properties);
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJuYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJiZWZvcmUiLCJ0eXBlcyIsIkRJUkVDVE9SWV9OQU1FIiwibG9jYWxlQ29tcGFyZSIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFBQSxJQUNNQyxjQUFjRCxRQUFRLG9CQUFSLENBRHBCOztJQUdNRSxtQjs7Ozs7Ozs7Ozs7NkJBQ0tDLGMsRUFBZ0I7QUFDdkIsVUFBTUMsT0FBTyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxVQUNNQyxxQkFBcUJILGVBQWVFLE9BQWYsRUFEM0I7QUFBQSxVQUVNRSxxQkFBcUJKLGVBQWVLLE9BQWYsRUFGM0I7QUFBQSxVQUdNQyxTQUFVRix1QkFBdUJSLE1BQU1XLEtBQU4sQ0FBWUMsY0FBcEMsR0FDRSxLQURGLEdBRUtQLEtBQUtRLGFBQUwsQ0FBbUJOLGtCQUFuQixJQUF5QyxDQUw3RDs7QUFPQSxhQUFPRyxNQUFQO0FBQ0Q7OzttQ0FFcUJJLFUsRUFBWTtBQUFFLGFBQU9aLFlBQVlhLGNBQVosQ0FBMkJaLG1CQUEzQixFQUFnRFcsVUFBaEQsQ0FBUDtBQUFxRTs7OztFQVp6RVosVzs7QUFlbENjLE9BQU9DLE9BQVAsR0FBaUJkLG1CQUFqQiIsImZpbGUiOiJmaWxlTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9tYXJrZXInKTtcblxuY2xhc3MgRmlsZU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBiZWZvcmUgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRSkgPyBcbiAgICAgICAgICAgICAgICAgICAgIGZhbHNlIDogXG4gICAgICAgICAgICAgICAgICAgICAgIChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ2dhYmxlRW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIE1hcmtlckVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGVOYW1lTWFya2VyRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiJdfQ==