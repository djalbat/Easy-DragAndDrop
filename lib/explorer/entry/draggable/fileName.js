'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    DraggableEntry = require('../../entry/draggable'),
    nameUtilities = require('../../../utilities/name');

var types = Entry.types,
    nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = FILE_NAME_TYPE;

    return _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, type, explorer));
  }

  _createClass(FileNameDraggableEntry, [{
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
    key: 'initialise',
    value: function initialise() {
      _get(FileNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry.prototype), 'initialise', this).call(this);

      var doubleClickHandler = this.doubleClickHandler.bind(this);

      this.onDoubleClick(doubleClickHandler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = FileNameDraggableEntry;
      }

      var fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);

      fileNameDraggableEntry.initialise();

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  }
});

module.exports = FileNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiRHJhZ2dhYmxlRW50cnkiLCJuYW1lVXRpbGl0aWVzIiwidHlwZXMiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsImV4cGxvcmVyIiwidHlwZSIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwiYmluZCIsIm9uRG91YmxlQ2xpY2siLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFBQSxJQUNNQyxpQkFBaUJELFFBQVEsdUJBQVIsQ0FEdkI7QUFBQSxJQUVNRSxnQkFBZ0JGLFFBQVEseUJBQVIsQ0FGdEI7O0FBSU0sSUFBRUcsS0FBRixHQUFZSixLQUFaLENBQUVJLEtBQUY7QUFBQSxJQUNFQyxxQkFERixHQUM0QkYsYUFENUIsQ0FDRUUscUJBREY7QUFBQSxJQUVFQyxjQUZGLEdBRTZGRixLQUY3RixDQUVFRSxjQUZGO0FBQUEsSUFFa0JDLG1CQUZsQixHQUU2RkgsS0FGN0YsQ0FFa0JHLG1CQUZsQjtBQUFBLElBRXVDQyxxQkFGdkMsR0FFNkZKLEtBRjdGLENBRXVDSSxxQkFGdkM7QUFBQSxJQUU4REMsMEJBRjlELEdBRTZGTCxLQUY3RixDQUU4REssMEJBRjlEOztJQUlBQyxzQjs7O0FBQ0osa0NBQVlDLFFBQVosRUFBc0JDLFFBQXRCLEVBQWdDO0FBQUE7O0FBQzlCLFFBQU1DLE9BQU9QLGNBQWI7O0FBRDhCLDJJQUd4QkssUUFId0IsRUFHZEUsSUFIYyxFQUdSRCxRQUhRO0FBSS9COzs7O29EQUUrQjtBQUM5QixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRRSxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtWLGNBQUw7QUFDQSxhQUFLRSxxQkFBTDtBQUNBLGFBQUtDLDBCQUFMO0FBQ0UsY0FBTVMsT0FBTyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZTixNQUFNSyxPQUFOLEVBRGxCOztBQUdBSixtQkFBU1Ysc0JBQXNCYSxJQUF0QixFQUE0QkUsU0FBNUIsQ0FBVDtBQUNBOztBQUVGLGFBQUtiLG1CQUFMO0FBQ0VRLG1CQUFTLEtBQVQ7QUFDQTtBQVpKOztBQWVBLGFBQU9BLE1BQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNTSxhQUFhLEVBQW5CLENBRG1CLENBQ0s7O0FBRXhCLGFBQU9BLFVBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNVCxXQUFXLEtBQUtVLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxPQUFPLElBRGIsQ0FEbUIsQ0FFQTs7QUFFbkJYLGVBQVNZLDBCQUFULENBQW9DRCxJQUFwQztBQUNEOzs7aUNBRWE7QUFDWjs7QUFFQSxVQUFNRSxxQkFBcUIsS0FBS0Esa0JBQUwsQ0FBd0JDLElBQXhCLENBQTZCLElBQTdCLENBQTNCOztBQUVBLFdBQUtDLGFBQUwsQ0FBbUJGLGtCQUFuQjtBQUNEOzs7bUNBRXFCRyxLLEVBQU9DLFUsRUFBWTtBQUN2QyxVQUFJQyxVQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCRixxQkFBYUQsS0FBYjtBQUNBQSxnQkFBUWxCLHNCQUFSO0FBQ0Q7O0FBRUQsVUFBTXNCLHlCQUF5QjlCLGVBQWUrQixjQUFmLENBQThCTCxLQUE5QixFQUFxQ0MsVUFBckMsQ0FBL0I7O0FBRUFHLDZCQUF1QkUsVUFBdkI7O0FBRUEsYUFBT0Ysc0JBQVA7QUFDRDs7OztFQWxFa0M5QixjOztBQXFFckNpQyxPQUFPQyxNQUFQLENBQWMxQixzQkFBZCxFQUFzQztBQUNwQzJCLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNO0FBRGlCLENBQXRDOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCOUIsc0JBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L2RyYWdnYWJsZScpLFxuICAgICAgbmFtZVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxpdGllcy9uYW1lJyk7XG5cbmNvbnN0IHsgdHlwZXMgfSA9IEVudHJ5LFxuICAgICAgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSA9IG5hbWVVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEZJTEVfTkFNRV9UWVBFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUsIGV4cGxvcmVyKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgICAgXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgcmV0cmlldmVTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKCkgIHtcbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgY29uc3QgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlTmFtZSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==