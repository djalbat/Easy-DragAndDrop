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

  function FileNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = FILE_NAME_TYPE;

    return _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, type, explorer));
  }

  _createClass(FileNameDraggableEntry, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJOYW1lQnV0dG9uIiwiZW50cnlUeXBlcyIsIm5hbWVVdGlsaXRpZXMiLCJEcmFnZ2FibGVFbnRyeSIsIlJlYWN0IiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJGaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJleHBsb3JlciIsInR5cGUiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsInN1YkVudHJpZXMiLCJnZXRFeHBsb3JlciIsImZpbGUiLCJvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLGFBQWFELFFBQVEsa0JBQVIsQ0FBbkI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGtCQUFSLENBRG5CO0FBQUEsSUFFTUcsZ0JBQWdCSCxRQUFRLHNCQUFSLENBRnRCO0FBQUEsSUFHTUksaUJBQWlCSixRQUFRLHVCQUFSLENBSHZCOztBQUtNLElBQUVLLEtBQUYsR0FBWU4sSUFBWixDQUFFTSxLQUFGO0FBQUEsSUFDRUMscUJBREYsR0FDNEJILGFBRDVCLENBQ0VHLHFCQURGO0FBQUEsSUFFRUMsY0FGRixHQUU2RkwsVUFGN0YsQ0FFRUssY0FGRjtBQUFBLElBRWtCQyxtQkFGbEIsR0FFNkZOLFVBRjdGLENBRWtCTSxtQkFGbEI7QUFBQSxJQUV1Q0MscUJBRnZDLEdBRTZGUCxVQUY3RixDQUV1Q08scUJBRnZDO0FBQUEsSUFFOERDLDBCQUY5RCxHQUU2RlIsVUFGN0YsQ0FFOERRLDBCQUY5RDs7SUFJQUMsc0I7OztBQUNKLGtDQUFZQyxRQUFaLEVBQXNCQyxRQUF0QixFQUFnQztBQUFBOztBQUM5QixRQUFNQyxPQUFPUCxjQUFiOztBQUQ4QiwySUFHeEJLLFFBSHdCLEVBR2RFLElBSGMsRUFHUkQsUUFIUTtBQUkvQjs7OzsrQ0FFMEI7QUFDekIsYUFBTyxJQUFQO0FBQ0Q7OztvREFFK0I7QUFDOUIsYUFBTyxLQUFQO0FBQ0Q7Ozs2QkFFUUUsSyxFQUFPO0FBQ2QsVUFBSUMsZUFBSjs7QUFFQSxVQUFNQyxZQUFZRixNQUFNRyxPQUFOLEVBQWxCOztBQUVBLGNBQVFELFNBQVI7QUFDRSxhQUFLVixjQUFMO0FBQ0EsYUFBS0UscUJBQUw7QUFDQSxhQUFLQywwQkFBTDtBQUNFLGNBQU1TLE9BQU8sS0FBS0MsT0FBTCxFQUFiO0FBQUEsY0FDTUMsWUFBWU4sTUFBTUssT0FBTixFQURsQjs7QUFHQUosbUJBQVNWLHNCQUFzQmEsSUFBdEIsRUFBNEJFLFNBQTVCLENBQVQ7QUFDQTs7QUFFRixhQUFLYixtQkFBTDtBQUNFUSxtQkFBUyxLQUFUO0FBQ0E7QUFaSjs7QUFlQSxhQUFPQSxNQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTU0sYUFBYSxFQUFuQixDQURtQixDQUNLOztBQUV4QixhQUFPQSxVQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVQsV0FBVyxLQUFLVSxXQUFMLEVBQWpCO0FBQUEsVUFDTUMsT0FBTyxJQURiLENBRG1CLENBRUE7O0FBRW5CWCxlQUFTWSwwQkFBVCxDQUFvQ0QsSUFBcEM7QUFDRDs7O2tDQUVhRSxVLEVBQVk7QUFBQSxVQUNoQlAsSUFEZ0IsR0FDUE8sVUFETyxDQUNoQlAsSUFEZ0I7OztBQUd4QixhQUFRLENBRU47QUFBQyxrQkFBRDtBQUFBO0FBQWFBO0FBQWIsT0FGTSxDQUFSO0FBS0Q7OzttQ0FFcUJPLFUsRUFBWTtBQUNoQyxVQUFNQyx5QkFBeUJ2QixlQUFld0IsY0FBZixDQUE4QmpCLHNCQUE5QixFQUFzRGUsVUFBdEQsQ0FBL0I7O0FBRUFDLDZCQUF1QkUsVUFBdkI7O0FBRUEsYUFBT0Ysc0JBQVA7QUFDRDs7OztFQW5Fa0N2QixjOztBQXNFckMwQixPQUFPQyxNQUFQLENBQWNwQixzQkFBZCxFQUFzQztBQUNwQ3FCLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNO0FBRGlCLENBQXRDOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCeEIsc0JBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi4vLi4vbmFtZUJ1dHRvbicpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5VHlwZXMnKSxcbiAgICAgIG5hbWVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvbmFtZScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9kcmFnZ2FibGUnKTtcblxuY29uc3QgeyBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gPSBuYW1lVXRpbGl0aWVzLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gZW50cnlUeXBlcztcblxuY2xhc3MgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEZJTEVfTkFNRV9UWVBFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUsIGV4cGxvcmVyKTtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgICAgXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgcmV0cmlldmVTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj5cblxuICAgIF0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcyk7XG5cbiAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGUtbmFtZSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==