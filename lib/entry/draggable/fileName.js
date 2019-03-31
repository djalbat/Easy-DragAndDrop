'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var NameButton = require('../../nameButton'),
    entryTypes = require('../../entryTypes'),
    nameUtilities = require('../../utilities/name'),
    DraggableEntry = require('../../entry/draggable');

var React = easy.React,
    nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, type, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var _this = _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, type));

    _this.explorer = explorer;
    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
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
    key: 'isFileNameDraggableEntry',
    value: function isFileNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'retrieveDraggableSubEntries',
    value: function retrieveDraggableSubEntries() {
      var draggableSubEntries = []; ///

      return draggableSubEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var name = properties.name;


      return [React.createElement(
        NameButton,
        null,
        name
      )];
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var explorer = properties.explorer,
          type = FILE_NAME_TYPE,
          fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties, type, explorer);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJOYW1lQnV0dG9uIiwiZW50cnlUeXBlcyIsIm5hbWVVdGlsaXRpZXMiLCJEcmFnZ2FibGVFbnRyeSIsIlJlYWN0IiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJGaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJ0eXBlIiwiZXhwbG9yZXIiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImRyYWdnYWJsZVN1YkVudHJpZXMiLCJnZXRFeHBsb3JlciIsImZpbGUiLCJvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLGFBQWFELFFBQVEsa0JBQVIsQ0FBbkI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGtCQUFSLENBRG5CO0FBQUEsSUFFTUcsZ0JBQWdCSCxRQUFRLHNCQUFSLENBRnRCO0FBQUEsSUFHTUksaUJBQWlCSixRQUFRLHVCQUFSLENBSHZCOztBQUtNLElBQUVLLEtBQUYsR0FBWU4sSUFBWixDQUFFTSxLQUFGO0FBQUEsSUFDRUMscUJBREYsR0FDNEJILGFBRDVCLENBQ0VHLHFCQURGO0FBQUEsSUFFRUMsY0FGRixHQUU2RkwsVUFGN0YsQ0FFRUssY0FGRjtBQUFBLElBRWtCQyxtQkFGbEIsR0FFNkZOLFVBRjdGLENBRWtCTSxtQkFGbEI7QUFBQSxJQUV1Q0MscUJBRnZDLEdBRTZGUCxVQUY3RixDQUV1Q08scUJBRnZDO0FBQUEsSUFFOERDLDBCQUY5RCxHQUU2RlIsVUFGN0YsQ0FFOERRLDBCQUY5RDs7SUFJQUMsc0I7OztBQUNKLGtDQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0M7QUFBQTs7QUFBQSxnSkFDOUJGLFFBRDhCLEVBQ3BCQyxJQURvQjs7QUFHcEMsVUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFIb0M7QUFJckM7Ozs7a0NBRWE7QUFDWixhQUFPLEtBQUtBLFFBQVo7QUFDRDs7OzZCQUVRQyxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtWLGNBQUw7QUFDQSxhQUFLRSxxQkFBTDtBQUNBLGFBQUtDLDBCQUFMO0FBQ0UsY0FBTVMsT0FBTyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZTixNQUFNSyxPQUFOLEVBRGxCOztBQUdBSixtQkFBU1Ysc0JBQXNCYSxJQUF0QixFQUE0QkUsU0FBNUIsQ0FBVDtBQUNBOztBQUVGLGFBQUtiLG1CQUFMO0FBQ0VRLG1CQUFTLEtBQVQ7QUFDQTtBQVpKOztBQWVBLGFBQU9BLE1BQVA7QUFDRDs7OytDQUUwQjtBQUN6QixhQUFPLElBQVA7QUFDRDs7O29EQUUrQjtBQUM5QixhQUFPLEtBQVA7QUFDRDs7O2tEQUU2QjtBQUM1QixVQUFNTSxzQkFBc0IsRUFBNUIsQ0FENEIsQ0FDSzs7QUFFakMsYUFBT0EsbUJBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNUixXQUFXLEtBQUtTLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxPQUFPLElBRGIsQ0FEbUIsQ0FFQTs7QUFFbkJWLGVBQVNXLDBCQUFULENBQW9DRCxJQUFwQztBQUNEOzs7a0NBRWFFLFUsRUFBWTtBQUFBLFVBQ2hCUCxJQURnQixHQUNQTyxVQURPLENBQ2hCUCxJQURnQjs7O0FBR3hCLGFBQVEsQ0FFTjtBQUFDLGtCQUFEO0FBQUE7QUFBYUE7QUFBYixPQUZNLENBQVI7QUFLRDs7O21DQUVxQk8sVSxFQUFZO0FBQzFCLFVBQUVaLFFBQUYsR0FBZVksVUFBZixDQUFFWixRQUFGO0FBQUEsVUFDQUQsSUFEQSxHQUNPTixjQURQO0FBQUEsVUFFQW9CLHNCQUZBLEdBRXlCdkIsZUFBZXdCLGNBQWYsQ0FBOEJqQixzQkFBOUIsRUFBc0RlLFVBQXRELEVBQWtFYixJQUFsRSxFQUF3RUMsUUFBeEUsQ0FGekI7OztBQUlOYSw2QkFBdUJFLFVBQXZCOztBQUVBLGFBQU9GLHNCQUFQO0FBQ0Q7Ozs7RUF6RWtDdkIsYzs7QUE0RXJDMEIsT0FBT0MsTUFBUCxDQUFjcEIsc0JBQWQsRUFBc0M7QUFDcENxQixxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQURpQixDQUF0Qzs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQnhCLHNCQUFqQiIsImZpbGUiOiJmaWxlTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4uLy4uL25hbWVCdXR0b24nKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuLi8uLi9lbnRyeVR5cGVzJyksXG4gICAgICBuYW1lVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL25hbWUnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvZHJhZ2dhYmxlJyk7XG5cbmNvbnN0IHsgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IG5hbWVJc0JlZm9yZUVudHJ5TmFtZSB9ID0gbmFtZVV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IGVudHJ5VHlwZXM7XG5cbmNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVTdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlU3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcztcblxuICAgIHJldHVybiAoW1xuXG4gICAgICA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+XG5cbiAgICBdKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICB0eXBlID0gRklMRV9OQU1FX1RZUEUsICAvLy9cbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcywgdHlwZSwgZXhwbG9yZXIpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlLW5hbWUnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=