'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var entryTypes = require('../../../entryTypes'),
    DraggableEntry = require('../../entry/draggable'),
    nameUtilities = require('../../../utilities/name');

var nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = FILE_NAME_TYPE;

    return _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, type, explorer));
  }

  _createClass(FileNameDraggableEntry, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          var name = this.getName(),
              entryName = entry.getName();

          before = nameIsBeforeEntryName(name, entryName);
          break;

        case DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties);

      fileNameDraggableEntry.initialise();

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'file-name'
  }
});

module.exports = FileNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiZW50cnlUeXBlcyIsInJlcXVpcmUiLCJEcmFnZ2FibGVFbnRyeSIsIm5hbWVVdGlsaXRpZXMiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsImV4cGxvcmVyIiwidHlwZSIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYUMsUUFBUSxxQkFBUixDQUFuQjtBQUFBLElBQ01DLGlCQUFpQkQsUUFBUSx1QkFBUixDQUR2QjtBQUFBLElBRU1FLGdCQUFnQkYsUUFBUSx5QkFBUixDQUZ0Qjs7QUFJTSxJQUFFRyxxQkFBRixHQUE0QkQsYUFBNUIsQ0FBRUMscUJBQUY7QUFBQSxJQUNFQyxjQURGLEdBQzZGTCxVQUQ3RixDQUNFSyxjQURGO0FBQUEsSUFDa0JDLG1CQURsQixHQUM2Rk4sVUFEN0YsQ0FDa0JNLG1CQURsQjtBQUFBLElBQ3VDQyxxQkFEdkMsR0FDNkZQLFVBRDdGLENBQ3VDTyxxQkFEdkM7QUFBQSxJQUM4REMsMEJBRDlELEdBQzZGUixVQUQ3RixDQUM4RFEsMEJBRDlEOztJQUdBQyxzQjs7O0FBQ0osa0NBQVlDLFFBQVosRUFBc0JDLFFBQXRCLEVBQWdDO0FBQUE7O0FBQzlCLFFBQU1DLE9BQU9QLGNBQWI7O0FBRDhCLDJJQUd4QkssUUFId0IsRUFHZEUsSUFIYyxFQUdSRCxRQUhRO0FBSS9COzs7OzZCQUVRRSxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtWLGNBQUw7QUFDQSxhQUFLRSxxQkFBTDtBQUNBLGFBQUtDLDBCQUFMO0FBQ0UsY0FBTVMsT0FBTyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZTixNQUFNSyxPQUFOLEVBRGxCOztBQUdBSixtQkFBU1Ysc0JBQXNCYSxJQUF0QixFQUE0QkUsU0FBNUIsQ0FBVDtBQUNBOztBQUVGLGFBQUtiLG1CQUFMO0FBQ0VRLG1CQUFTLEtBQVQ7QUFDQTtBQVpKOztBQWVBLGFBQU9BLE1BQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNTSxhQUFhLEVBQW5CLENBRG1CLENBQ0s7O0FBRXhCLGFBQU9BLFVBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNVCxXQUFXLEtBQUtVLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxPQUFPLElBRGIsQ0FEbUIsQ0FFQTs7QUFFbkJYLGVBQVNZLDBCQUFULENBQW9DRCxJQUFwQztBQUNEOzs7bUNBRXFCRSxVLEVBQVk7QUFDaEMsVUFBTUMseUJBQXlCdkIsZUFBZXdCLGNBQWYsQ0FBOEJqQixzQkFBOUIsRUFBc0RlLFVBQXRELENBQS9COztBQUVBQyw2QkFBdUJFLFVBQXZCOztBQUVBLGFBQU9GLHNCQUFQO0FBQ0Q7Ozs7RUFqRGtDdkIsYzs7QUFvRHJDMEIsT0FBT0MsTUFBUCxDQUFjcEIsc0JBQWQsRUFBc0M7QUFDcENxQixxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQURpQixDQUF0Qzs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQnhCLHNCQUFqQiIsImZpbGUiOiJmaWxlTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudHJ5VHlwZXMnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvZHJhZ2dhYmxlJyksXG4gICAgICBuYW1lVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbGl0aWVzL25hbWUnKTtcblxuY29uc3QgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSA9IG5hbWVVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgY2FzZSBGSUxFX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICByZXRyaWV2ZVN1YkVudHJpZXMoKSB7XG4gICAgY29uc3Qgc3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cbiAgXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlLW5hbWUnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=