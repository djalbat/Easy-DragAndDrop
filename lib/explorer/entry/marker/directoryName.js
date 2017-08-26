'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var types = Entry.types,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameMarkerEntry = function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  function DirectoryNameMarkerEntry(selector, name) {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    var type = DIRECTORY_NAME_MARKER_TYPE;

    return _possibleConstructorReturn(this, (DirectoryNameMarkerEntry.__proto__ || Object.getPrototypeOf(DirectoryNameMarkerEntry)).call(this, selector, name, type));
  }

  _createClass(DirectoryNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          before = true;

          break;

        case DIRECTORY_NAME_TYPE:
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
      var draggableNameMarkerEntry = MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties);

      draggableNameMarkerEntry.initialise();

      return draggableNameMarkerEntry;
    }
  }]);

  return DirectoryNameMarkerEntry;
}(MarkerEntry);

Object.assign(DirectoryNameMarkerEntry, {
  defaultProperties: {
    className: 'directoryName'
  }
});

module.exports = DirectoryNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJFbnRyeSIsInJlcXVpcmUiLCJNYXJrZXJFbnRyeSIsInR5cGVzIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJ0eXBlIiwiZHJhZ2dhYmxlRW50cnkiLCJiZWZvcmUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJwcm9wZXJ0aWVzIiwiZHJhZ2dhYmxlTmFtZU1hcmtlckVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsYUFBUixDQUFkO0FBQUEsSUFDTUMsY0FBY0QsUUFBUSxvQkFBUixDQURwQjs7QUFHTSxJQUFFRSxLQUFGLEdBQVlILEtBQVosQ0FBRUcsS0FBRjtBQUFBLElBQ0VDLGNBREYsR0FDc0VELEtBRHRFLENBQ0VDLGNBREY7QUFBQSxJQUNrQkMsbUJBRGxCLEdBQ3NFRixLQUR0RSxDQUNrQkUsbUJBRGxCO0FBQUEsSUFDdUNDLDBCQUR2QyxHQUNzRUgsS0FEdEUsQ0FDdUNHLDBCQUR2Qzs7SUFHQUMsd0I7OztBQUNKLG9DQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QjtBQUFBOztBQUMxQixRQUFNQyxPQUFPSiwwQkFBYjs7QUFEMEIsK0lBR3BCRSxRQUhvQixFQUdWQyxJQUhVLEVBR0pDLElBSEk7QUFJM0I7Ozs7NkJBRVFDLGMsRUFBZ0I7QUFDdkIsVUFBSUMsZUFBSjs7QUFFQSxVQUFNQyxxQkFBcUJGLGVBQWVHLE9BQWYsRUFBM0I7O0FBRUEsY0FBUUQsa0JBQVI7QUFDRSxhQUFLVCxjQUFMO0FBQ0VRLG1CQUFTLElBQVQ7O0FBRUE7O0FBRUYsYUFBS1AsbUJBQUw7QUFDRSxjQUFNSSxPQUFPLEtBQUtNLE9BQUwsRUFBYjtBQUFBLGNBQ01DLHFCQUFxQkwsZUFBZUksT0FBZixFQUQzQjs7QUFHQUgsbUJBQVVILEtBQUtRLGFBQUwsQ0FBbUJELGtCQUFuQixJQUF5QyxDQUFuRDs7QUFFQTtBQVpKOztBQWVBLGFBQU9KLE1BQVA7QUFDRDs7O21DQUVxQk0sVSxFQUFZO0FBQ2hDLFVBQU1DLDJCQUEyQmpCLFlBQVlrQixjQUFaLENBQTJCYix3QkFBM0IsRUFBcURXLFVBQXJELENBQWpDOztBQUVBQywrQkFBeUJFLFVBQXpCOztBQUVBLGFBQU9GLHdCQUFQO0FBQ0Q7Ozs7RUFwQ29DakIsVzs7QUF1Q3ZDb0IsT0FBT0MsTUFBUCxDQUFjaEIsd0JBQWQsRUFBd0M7QUFDdENpQixxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQURtQixDQUF4Qzs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQnBCLHdCQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L21hcmtlcicpO1xuXG5jb25zdCB7IHR5cGVzIH0gPSBFbnRyeSxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTtcbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSk7XG4gIH1cbiAgXG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ2dhYmxlRW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IFxuICAgIGNvbnN0IGRyYWdnYWJsZU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21Qcm9wZXJ0aWVzKERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSwgcHJvcGVydGllcyk7XG5cbiAgICBkcmFnZ2FibGVOYW1lTWFya2VyRW50cnkuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVOYW1lTWFya2VyRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lTWFya2VyRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnlOYW1lJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4iXX0=