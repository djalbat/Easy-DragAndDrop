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
          fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties, name, explorer);


      recognised ? fileNameDraggableEntry.recognise() : fileNameDraggableEntry.overlook();

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  },
  ignoredProperties: ['name', 'explorer', 'recognised']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJFbnRyeSIsInJlcXVpcmUiLCJuYW1lVXRpbCIsIkRyYWdnYWJsZUVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUUiLCJyZWNvZ25pc2VkIiwiaGFzQ2xhc3MiLCJzdWJFbnRyaWVzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmcm9tUHJvcGVydGllcyIsInJlY29nbmlzZSIsIm92ZXJsb29rIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJsb2NhbGVDb21wYXJlIiwibmFtZUV4dGVuc2lvbiIsImV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lRXh0ZW5zaW9uIiwibmFtZVdpdGhvdXRFeHRlbnNpb24iLCJuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiIsIm5hbWVFeHRlbnNpb25QcmVzZW50IiwiZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCIsIm5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyIsImVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nIiwiZXh0ZW5zaW9uc0JvdGhQcmVzZW50IiwibmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nIiwiZXh0ZW5zaW9uc0RpZmZlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLFVBQVIsQ0FBZDtBQUFBLElBQ01DLFdBQVdELFFBQVEsaUJBQVIsQ0FEakI7QUFBQSxJQUVNRSxpQkFBaUJGLFFBQVEsbUJBQVIsQ0FGdkI7O0lBSU1HLHNCOzs7QUFDSixrQ0FBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQUE7O0FBQ3BDLFFBQU1DLE9BQU9SLE1BQU1TLEtBQU4sQ0FBWUMsU0FBekI7O0FBRG9DLGdKQUc5QkwsUUFIOEIsRUFHcEJDLElBSG9CLEVBR2RDLFFBSGMsRUFHSkMsSUFISTs7QUFLcEMsVUFBS0csYUFBTCxDQUFtQixNQUFLQyxrQkFBTCxDQUF3QkMsSUFBeEIsT0FBbkI7QUFMb0M7QUFNckM7Ozs7b0RBRStCO0FBQzlCLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMsWUFBWUYsTUFBTUcsT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS2hCLE1BQU1TLEtBQU4sQ0FBWVMsTUFBakI7QUFDQSxhQUFLbEIsTUFBTVMsS0FBTixDQUFZQyxTQUFqQjtBQUNFLGNBQU1KLE9BQU8sS0FBS2EsT0FBTCxFQUFiO0FBQUEsY0FDTUMsWUFBWU4sTUFBTUssT0FBTixFQURsQjs7QUFHQUosbUJBQVNNLHNCQUFzQmYsSUFBdEIsRUFBNEJjLFNBQTVCLENBQVQ7QUFDQTs7QUFFRixhQUFLcEIsTUFBTVMsS0FBTixDQUFZYSxjQUFqQjtBQUNFUCxtQkFBUyxLQUFUO0FBQ0E7QUFYSjs7QUFjQSxhQUFPQSxNQUFQO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1RLGFBQWEsS0FBS0MsUUFBTCxDQUFjLFlBQWQsQ0FBbkI7O0FBRUEs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c3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgbmFtZVV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL25hbWUnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEVfTkFNRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNSZWNvZ25pc2VkKCkge1xuICAgIGNvbnN0IHJlY29nbmlzZWQgPSB0aGlzLmhhc0NsYXNzKCdyZWNvZ25pc2VkJyk7XG5cbiAgICByZXR1cm4gcmVjb2duaXNlZDtcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJlY29nbmlzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBvdmVybG9vaygpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIsIHJlY29nbmlzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyKTtcblxuICAgIHJlY29nbmlzZWQgP1xuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZWNvZ25pc2UoKSA6XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkub3Zlcmxvb2soKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGVOYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdyZWNvZ25pc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuXG5mdW5jdGlvbiBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKSB7XG4gIGxldCBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcbiAgXG4gIGNvbnN0IG5hbWVFeHRlbnNpb24gPSBuYW1lVXRpbC5leHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lVXRpbC5uYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChlbnRyeU5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZXh0ZW5zaW9uc0JvdGhQcmVzZW50ID0gKG5hbWVFeHRlbnNpb25QcmVzZW50ICYmIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpLFxuICAgICAgICBuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nICYmIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKTtcblxuICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgLy8vXG4gIH0gZWxzZSBpZiAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChleHRlbnNpb25zQm90aFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNEaWZmZXIgPSAobmFtZUV4dGVuc2lvbiAhPT0gZW50cnlOYW1lRXh0ZW5zaW9uKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiZWZvcmU7XG59Il19