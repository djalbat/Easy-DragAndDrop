'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var entryTypes = require('../../entryTypes'),
    MarkerEntry = require('../../entry/marker'),
    nameUtilities = require('../../utilities/name');

var nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE;

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).apply(this, arguments));
  }

  _createClass(FileNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();

          before = nameIsBeforeEntryName(name, draggableEntryName);
          break;

        case DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var type = FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = MarkerEntry.fromProperties(FileNameMarkerEntry, properties, type);

      return fileNameMarkerEntry;
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: 'file-name'
  }
});

module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiZW50cnlUeXBlcyIsInJlcXVpcmUiLCJNYXJrZXJFbnRyeSIsIm5hbWVVdGlsaXRpZXMiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJiZWZvcmUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwibmFtZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJwcm9wZXJ0aWVzIiwidHlwZSIsImZpbGVOYW1lTWFya2VyRW50cnkiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLGtCQUFSLENBQW5CO0FBQUEsSUFDTUMsY0FBY0QsUUFBUSxvQkFBUixDQURwQjtBQUFBLElBRU1FLGdCQUFnQkYsUUFBUSxzQkFBUixDQUZ0Qjs7QUFJTSxJQUFFRyxxQkFBRixHQUE0QkQsYUFBNUIsQ0FBRUMscUJBQUY7QUFBQSxJQUNFQyxjQURGLEdBQ2lFTCxVQURqRSxDQUNFSyxjQURGO0FBQUEsSUFDa0JDLHFCQURsQixHQUNpRU4sVUFEakUsQ0FDa0JNLHFCQURsQjtBQUFBLElBQ3lDQyxtQkFEekMsR0FDaUVQLFVBRGpFLENBQ3lDTyxtQkFEekM7O0lBR0FDLG1COzs7Ozs7Ozs7Ozs2QkFDS0MsYyxFQUFnQjtBQUN2QixVQUFJQyxlQUFKOztBQUVBLFVBQU1DLHFCQUFxQkYsZUFBZUcsT0FBZixFQUEzQjs7QUFFQSxjQUFRRCxrQkFBUjtBQUNFLGFBQUtOLGNBQUw7QUFDRSxjQUFNUSxPQUFPLEtBQUtDLE9BQUwsRUFBYjtBQUFBLGNBQ01DLHFCQUFxQk4sZUFBZUssT0FBZixFQUQzQjs7QUFHQUosbUJBQVNOLHNCQUFzQlMsSUFBdEIsRUFBNEJFLGtCQUE1QixDQUFUO0FBQ0E7O0FBRUYsYUFBS1IsbUJBQUw7QUFDRUcsbUJBQVMsS0FBVDtBQUNBO0FBVko7O0FBYUEsYUFBT0EsTUFBUDtBQUNEOzs7bUNBRXFCTSxVLEVBQVk7QUFDaEMsVUFBTUMsT0FBT1gscUJBQWI7QUFBQSxVQUNNWSxzQkFBc0JoQixZQUFZaUIsY0FBWixDQUEyQlgsbUJBQTNCLEVBQWdEUSxVQUFoRCxFQUE0REMsSUFBNUQsQ0FENUI7O0FBR0EsYUFBT0MsbUJBQVA7QUFDRDs7OztFQTNCK0JoQixXOztBQThCbENrQixPQUFPQyxNQUFQLENBQWNiLG1CQUFkLEVBQW1DO0FBQ2pDYyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQURjLENBQW5DOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCakIsbUJBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi4vLi4vZW50cnlUeXBlcycpLFxuICAgICAgTWFya2VyRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9tYXJrZXInKSxcbiAgICAgIG5hbWVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvbmFtZScpO1xuXG5jb25zdCB7IG5hbWVJc0JlZm9yZUVudHJ5TmFtZSB9ID0gbmFtZVV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gZW50cnlUeXBlcztcblxuY2xhc3MgRmlsZU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBkcmFnZ2FibGVFbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFLFxuICAgICAgICAgIGZpbGVOYW1lTWFya2VyRW50cnkgPSBNYXJrZXJFbnRyeS5mcm9tUHJvcGVydGllcyhGaWxlTmFtZU1hcmtlckVudHJ5LCBwcm9wZXJ0aWVzLCB0eXBlKTtcblxuICAgIHJldHVybiBmaWxlTmFtZU1hcmtlckVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVNYXJrZXJFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGUtbmFtZSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiJdfQ==