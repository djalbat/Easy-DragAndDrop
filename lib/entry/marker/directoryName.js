'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var entryTypes = require('../../entryTypes'),
    MarkerEntry = require('../../entry/marker');

var FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameMarkerEntry = function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  function DirectoryNameMarkerEntry(selector, name) {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    var type = DIRECTORY_NAME_MARKER_TYPE;

    return _possibleConstructorReturn(this, (DirectoryNameMarkerEntry.__proto__ || Object.getPrototypeOf(DirectoryNameMarkerEntry)).call(this, selector, type, name));
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
      return MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties);
    }
  }]);

  return DirectoryNameMarkerEntry;
}(MarkerEntry);

Object.assign(DirectoryNameMarkerEntry, {
  defaultProperties: {
    className: 'directory-name'
  }
});

module.exports = DirectoryNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlbnRyeVR5cGVzIiwicmVxdWlyZSIsIk1hcmtlckVudHJ5IiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJ0eXBlIiwiZHJhZ2dhYmxlRW50cnkiLCJiZWZvcmUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYUMsUUFBUSxrQkFBUixDQUFuQjtBQUFBLElBQ01DLGNBQWNELFFBQVEsb0JBQVIsQ0FEcEI7O0lBR1FFLGMsR0FBb0VILFUsQ0FBcEVHLGM7SUFBZ0JDLG1CLEdBQW9ESixVLENBQXBESSxtQjtJQUFxQkMsMEIsR0FBK0JMLFUsQ0FBL0JLLDBCOztJQUV2Q0Msd0I7OztBQUNKLG9DQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QjtBQUFBOztBQUMxQixRQUFNQyxPQUFPSiwwQkFBYjs7QUFEMEIsK0lBR3BCRSxRQUhvQixFQUdWRSxJQUhVLEVBR0pELElBSEk7QUFJM0I7Ozs7NkJBRVFFLGMsRUFBZ0I7QUFDdkIsVUFBSUMsZUFBSjs7QUFFQSxVQUFNQyxxQkFBcUJGLGVBQWVHLE9BQWYsRUFBM0I7O0FBRUEsY0FBUUQsa0JBQVI7QUFDRSxhQUFLVCxjQUFMO0FBQ0VRLG1CQUFTLElBQVQ7O0FBRUE7O0FBRUYsYUFBS1AsbUJBQUw7QUFDRSxjQUFNSSxPQUFPLEtBQUtNLE9BQUwsRUFBYjtBQUFBLGNBQ01DLHFCQUFxQkwsZUFBZUksT0FBZixFQUQzQjs7QUFHQUgsbUJBQVVILEtBQUtRLGFBQUwsQ0FBbUJELGtCQUFuQixJQUF5QyxDQUFuRDs7QUFFQTtBQVpKOztBQWVBLGFBQU9KLE1BQVA7QUFDRDs7O21DQUVxQk0sVSxFQUFZO0FBQUUsYUFBT2YsWUFBWWdCLGNBQVosQ0FBMkJaLHdCQUEzQixFQUFxRFcsVUFBckQsQ0FBUDtBQUEwRTs7OztFQTlCekVmLFc7O0FBaUN2Q2lCLE9BQU9DLE1BQVAsQ0FBY2Qsd0JBQWQsRUFBd0M7QUFDdENlLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNO0FBRG1CLENBQXhDOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCbEIsd0JBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuLi8uLi9lbnRyeVR5cGVzJyksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L21hcmtlcicpO1xuXG5jb25zdCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gZW50cnlUeXBlcztcblxuY2xhc3MgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTtcbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSwgbmFtZSk7XG4gIH1cbiAgXG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ2dhYmxlRW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBNYXJrZXJFbnRyeS5mcm9tUHJvcGVydGllcyhEaXJlY3RvcnlOYW1lTWFya2VyRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZGlyZWN0b3J5LW5hbWUnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiJdfQ==