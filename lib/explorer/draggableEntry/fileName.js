'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry'),
    nameUtil = require('../../util/name'),
    DraggableEntry = require('../draggableEntry');

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, name, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = Entry.types.FILE_NAME;

    var _this = _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, name, explorer, type));

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
    return _this;
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
        case Entry.types.MARKER:
        case Entry.types.FILE_NAME:
          var name = this.getName(),
              entryName = entry.getName();

          before = nameIsBeforeEntryName(name, entryName);
          break;

        case Entry.types.DIRECTORY_NAME:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'isRecognised',
    value: function isRecognised() {
      var recognised = this.hasClass('recognised');

      return recognised;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'recognise',
    value: function recognise() {
      this.addClass('recognised');
    }
  }, {
    key: 'overlook',
    value: function overlook() {
      this.removeClass('recognised');
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
      var name = properties.name,
          explorer = properties.explorer,
          recognised = properties.recognised,
          hidden = properties.hidden,
          fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties, name, explorer);


      recognised ? ///
      fileNameDraggableEntry.recognise() : fileNameDraggableEntry.overlook();

      hidden ? fileNameDraggableEntry.hide() : fileNameDraggableEntry.show();

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  },
  ignoredProperties: ['name', 'explorer']
});

module.exports = FileNameDraggableEntry;

function nameIsBeforeEntryName(name, entryName) {
  var before = name.localeCompare(entryName) < 0;

  var nameExtension = nameUtil.extensionFromName(name),
      entryNameExtension = nameUtil.extensionFromName(entryName),
      nameWithoutExtension = nameUtil.nameWithoutExtensionFromName(name),
      entryNameWithoutExtension = nameUtil.nameWithoutExtensionFromName(entryName),
      nameExtensionPresent = nameExtension !== null,
      entryNameExtensionPresent = entryNameExtension !== null,
      nameWithoutExtensionMissing = nameWithoutExtension === null,
      entryNameWithoutExtensionMissing = entryNameWithoutExtension === null,
      extensionsBothPresent = nameExtensionPresent && entryNameExtensionPresent,
      namesWithoutExtensionsBothMissing = nameWithoutExtensionMissing && entryNameWithoutExtensionMissing;

  if (namesWithoutExtensionsBothMissing) {
    ///
  } else if (nameWithoutExtensionMissing) {
    before = true;
  } else if (entryNameWithoutExtensionMissing) {
    before = false;
  } else {
    if (extensionsBothPresent) {
      var extensionsDiffer = nameExtension !== entryNameExtension;

      if (extensionsDiffer) {
        before = nameExtension.localeCompare(entryNameExtension) < 0;
      }
    } else if (nameExtensionPresent) {
      before = false;
    } else if (entryNameExtensionPresent) {
      before = true;
    }
  }

  return before;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJFbnRyeSIsInJlcXVpcmUiLCJuYW1lVXRpbCIsIkRyYWdnYWJsZUVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUUiLCJyZWNvZ25pc2VkIiwiaGFzQ2xhc3MiLCJzdWJFbnRyaWVzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImhpZGRlbiIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmcm9tUHJvcGVydGllcyIsInJlY29nbmlzZSIsIm92ZXJsb29rIiwiaGlkZSIsInNob3ciLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvY2FsZUNvbXBhcmUiLCJuYW1lRXh0ZW5zaW9uIiwiZXh0ZW5zaW9uRnJvbU5hbWUiLCJlbnRyeU5hbWVFeHRlbnNpb24iLCJuYW1lV2l0aG91dEV4dGVuc2lvbiIsIm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUiLCJlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uIiwibmFtZUV4dGVuc2lvblByZXNlbnQiLCJlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50IiwibmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nIiwiZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmciLCJleHRlbnNpb25zQm90aFByZXNlbnQiLCJuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmciLCJleHRlbnNpb25zRGlmZmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUMsV0FBV0QsUUFBUSxpQkFBUixDQURqQjtBQUFBLElBRU1FLGlCQUFpQkYsUUFBUSxtQkFBUixDQUZ2Qjs7SUFJTUcsc0I7OztBQUNKLGtDQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0M7QUFBQTs7QUFDcEMsUUFBTUMsT0FBT1IsTUFBTVMsS0FBTixDQUFZQyxTQUF6Qjs7QUFEb0MsZ0pBRzlCTCxRQUg4QixFQUdwQkMsSUFIb0IsRUFHZEMsUUFIYyxFQUdKQyxJQUhJOztBQUtwQyxVQUFLRyxhQUFMLENBQW1CLE1BQUtDLGtCQUFMLENBQXdCQyxJQUF4QixPQUFuQjtBQUxvQztBQU1yQzs7OztvREFFK0I7QUFDOUIsYUFBTyxLQUFQO0FBQ0Q7Ozs2QkFFUUMsSyxFQUFPO0FBQ2QsVUFBSUMsZUFBSjs7QUFFQSxVQUFNQyxZQUFZRixNQUFNRyxPQUFOLEVBQWxCOztBQUVBLGNBQVFELFNBQVI7QUFDRSxhQUFLaEIsTUFBTVMsS0FBTixDQUFZUyxNQUFqQjtBQUNBLGFBQUtsQixNQUFNUyxLQUFOLENBQVlDLFNBQWpCO0FBQ0UsY0FBTUosT0FBTyxLQUFLYSxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZTixNQUFNSyxPQUFOLEVBRGxCOztBQUdBSixtQkFBU00sc0JBQXNCZixJQUF0QixFQUE0QmMsU0FBNUIsQ0FBVDtBQUNBOztBQUVGLGFBQUtwQixNQUFNUyxLQUFOLENBQVlhLGNBQWpCO0FBQ0VQLG1CQUFTLEtBQVQ7QUFDQTtBQVhKOztBQWNBLGFBQU9BLE1BQVA7QUFDRDs7O21DQUVjO0FBQ2IsVUFBTVEsYUFBYSxLQUFLQyxRQUFM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QUFDcEN2QyxlQUFTLElBQVQ7QUFDRDtBQUNGOztBQUVELFNBQU9BLE1BQVA7QUFDRCIsImZpbGUiOiJmaWxlTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgbmFtZVV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL25hbWUnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEVfTkFNRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNSZWNvZ25pc2VkKCkge1xuICAgIGNvbnN0IHJlY29nbmlzZWQgPSB0aGlzLmhhc0NsYXNzKCdyZWNvZ25pc2VkJyk7XG5cbiAgICByZXR1cm4gcmVjb2duaXNlZDtcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJlY29nbmlzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBvdmVybG9vaygpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIsIHJlY29nbmlzZWQsIGhpZGRlbiB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgcmVjb2duaXNlZCA/IC8vL1xuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZWNvZ25pc2UoKSA6XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkub3Zlcmxvb2soKTtcblxuICAgIGhpZGRlbiA/XG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmhpZGUoKSA6XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuc2hvdygpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlTmFtZURyYWdnYWJsZUVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZmlsZU5hbWUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdleHBsb3JlcidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuZnVuY3Rpb24gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSkge1xuICBsZXQgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG4gIFxuICBjb25zdCBuYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsLmV4dGVuc2lvbkZyb21OYW1lKGVudHJ5TmFtZSksXG4gICAgICAgIG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9IG5hbWVVdGlsLm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZUV4dGVuc2lvblByZXNlbnQgPSAobmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQgPSAoZW50cnlOYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9PT0gbnVsbCksXG4gICAgICAgIGV4dGVuc2lvbnNCb3RoUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uUHJlc2VudCAmJiBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSxcbiAgICAgICAgbmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyAmJiBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyk7XG5cbiAgaWYgKG5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZykge1xuICAgIC8vL1xuICB9IGVsc2UgaWYgKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcpIHtcbiAgICBiZWZvcmUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZXh0ZW5zaW9uc0JvdGhQcmVzZW50KSB7XG4gICAgICBjb25zdCBleHRlbnNpb25zRGlmZmVyID0gKG5hbWVFeHRlbnNpb24gIT09IGVudHJ5TmFtZUV4dGVuc2lvbik7XG5cbiAgICAgIGlmIChleHRlbnNpb25zRGlmZmVyKSB7XG4gICAgICAgIGJlZm9yZSA9IChuYW1lRXh0ZW5zaW9uLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lRXh0ZW5zaW9uKSA8IDApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmFtZUV4dGVuc2lvblByZXNlbnQpIHtcbiAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmVmb3JlO1xufSJdfQ==