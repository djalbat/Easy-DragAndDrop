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
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = FileNameDraggableEntry;
      }

      var _properties = properties,
          name = _properties.name,
          explorer = _properties.explorer,
          recognised = _properties.recognised,
          hidden = _properties.hidden,
          fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, name, explorer);


      hidden ? fileNameDraggableEntry.hide() : fileNameDraggableEntry.show();

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
  ignoredProperties: ['name', 'explorer', 'recognised', 'hidden']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJFbnRyeSIsInJlcXVpcmUiLCJuYW1lVXRpbCIsIkRyYWdnYWJsZUVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUUiLCJyZWNvZ25pc2VkIiwiaGFzQ2xhc3MiLCJzdWJFbnRyaWVzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiaGlkZGVuIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiaGlkZSIsInNob3ciLCJyZWNvZ25pc2UiLCJvdmVybG9vayIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9jYWxlQ29tcGFyZSIsIm5hbWVFeHRlbnNpb24iLCJleHRlbnNpb25Gcm9tTmFtZSIsImVudHJ5TmFtZUV4dGVuc2lvbiIsIm5hbWVXaXRob3V0RXh0ZW5zaW9uIiwibmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZSIsImVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb24iLCJuYW1lRXh0ZW5zaW9uUHJlc2VudCIsImVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQiLCJuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmciLCJlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyIsImV4dGVuc2lvbnNCb3RoUHJlc2VudCIsIm5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZyIsImV4dGVuc2lvbnNEaWZmZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNQyxXQUFXRCxRQUFRLGlCQUFSLENBRGpCO0FBQUEsSUFFTUUsaUJBQWlCRixRQUFRLG1CQUFSLENBRnZCOztJQUlNRyxzQjs7O0FBQ0osa0NBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUNwQyxRQUFNQyxPQUFPUixNQUFNUyxLQUFOLENBQVlDLFNBQXpCOztBQURvQyxnSkFHOUJMLFFBSDhCLEVBR3BCQyxJQUhvQixFQUdkQyxRQUhjLEVBR0pDLElBSEk7O0FBS3BDLFVBQUtHLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCLE9BQW5CO0FBTG9DO0FBTXJDOzs7O29EQUUrQjtBQUM5QixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRQyxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtoQixNQUFNUyxLQUFOLENBQVlTLE1BQWpCO0FBQ0EsYUFBS2xCLE1BQU1TLEtBQU4sQ0FBWUMsU0FBakI7QUFDRSxjQUFNSixPQUFPLEtBQUthLE9BQUwsRUFBYjtBQUFBLGNBQ01DLFlBQVlOLE1BQU1LLE9BQU4sRUFEbEI7O0FBR0FKLG1CQUFTTSxzQkFBc0JmLElBQXRCLEVBQTRCYyxTQUE1QixDQUFUO0FBQ0E7O0FBRUYsYUFBS3BCLE1BQU1TLEtBQU4sQ0FBWWEsY0FBakI7QUFDRVAsbUJBQVMsS0FBVDtBQUNBO0FBWEo7O0FBY0EsYUFBT0EsTUFBUDtBQUNEOzs7bUNB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RyxrQkFBNUIsSUFBa0QsQ0FBNUQ7QUFDRDtBQUNGLEtBTkQsTUFNTyxJQUFJSSxvQkFBSixFQUEwQjtBQUMvQnpDLGVBQVMsS0FBVDtBQUNELEtBRk0sTUFFQSxJQUFJMEMseUJBQUosRUFBK0I7QUFDcEMxQyxlQUFTLElBQVQ7QUFDRDtBQUNGOztBQUVELFNBQU9BLE1BQVA7QUFDRCIsImZpbGUiOiJmaWxlTmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgbmFtZVV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL25hbWUnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEVfTkFNRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNSZWNvZ25pc2VkKCkge1xuICAgIGNvbnN0IHJlY29nbmlzZWQgPSB0aGlzLmhhc0NsYXNzKCdyZWNvZ25pc2VkJyk7XG5cbiAgICByZXR1cm4gcmVjb2duaXNlZDtcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJlY29nbmlzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBvdmVybG9vaygpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgICB9XG5cbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyLCByZWNvZ25pc2VkLCBoaWRkZW4gfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lLCBleHBsb3Jlcik7XG5cbiAgICBoaWRkZW4gP1xuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5oaWRlKCkgOlxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnNob3coKTtcblxuICAgIHJlY29nbmlzZWQgP1xuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZWNvZ25pc2UoKSA6XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkub3Zlcmxvb2soKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGVOYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdyZWNvZ25pc2VkJyxcbiAgICAnaGlkZGVuJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuXG5mdW5jdGlvbiBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKSB7XG4gIGxldCBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcbiAgXG4gIGNvbnN0IG5hbWVFeHRlbnNpb24gPSBuYW1lVXRpbC5leHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lVXRpbC5uYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChlbnRyeU5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZXh0ZW5zaW9uc0JvdGhQcmVzZW50ID0gKG5hbWVFeHRlbnNpb25QcmVzZW50ICYmIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpLFxuICAgICAgICBuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nICYmIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKTtcblxuICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgLy8vXG4gIH0gZWxzZSBpZiAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChleHRlbnNpb25zQm90aFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNEaWZmZXIgPSAobmFtZUV4dGVuc2lvbiAhPT0gZW50cnlOYW1lRXh0ZW5zaW9uKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiZWZvcmU7XG59Il19