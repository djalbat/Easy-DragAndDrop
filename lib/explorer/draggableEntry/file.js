'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry'),
    nameUtil = require('../../util/name'),
    DraggableEntry = require('../draggableEntry');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selector, name, explorer) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, explorer, type));

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
    return _this;
  }

  _createClass(File, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:
          var name = this.getName(),
              entryName = entry.getName();

          before = nameIsBeforeEntryName(name, entryName);
          break;

        case Entry.types.DIRECTORY:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFile(file);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var name = properties.name,
          explorer = properties.explorer;


      return DraggableEntry.fromProperties(File, properties, name, explorer);
    }
  }]);

  return File;
}(DraggableEntry);

Object.assign(File, {
  defaultProperties: {
    className: 'file'
  },
  ignoredProperties: ['name', 'explorer']
});

module.exports = File;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbIkVudHJ5IiwicmVxdWlyZSIsIm5hbWVVdGlsIiwiRHJhZ2dhYmxlRW50cnkiLCJGaWxlIiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwidHlwZXMiLCJGSUxFIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJsb2NhbGVDb21wYXJlIiwibmFtZUV4dGVuc2lvbiIsImV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lRXh0ZW5zaW9uIiwibmFtZVdpdGhvdXRFeHRlbnNpb24iLCJuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiIsIm5hbWVFeHRlbnNpb25QcmVzZW50IiwiZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCIsIm5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyIsImVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nIiwiZXh0ZW5zaW9uc0JvdGhQcmVzZW50IiwibmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nIiwiZXh0ZW5zaW9uc0RpZmZlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLFVB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QUVPLElBQUlILDJCQUFKLEVBQWlDO0FBQ3RDOUIsYUFBUyxJQUFUO0FBQ0QsR0FGTSxNQUVBLElBQUkrQixnQ0FBSixFQUFzQztBQUMzQy9CLGFBQVMsS0FBVDtBQUNELEdBRk0sTUFFQTtBQUNMLFFBQUlnQyxxQkFBSixFQUEyQjtBQUN6QixVQUFNRSxtQkFBb0JaLGtCQUFrQkUsa0JBQTVDOztBQUVBLFVBQUlVLGdCQUFKLEVBQXNCO0FBQ3BCbEMsaUJBQVVzQixjQUFjRCxhQUFkLENBQTRCRyxrQkFBNUIsSUFBa0QsQ0FBNUQ7QUFDRDtBQUNGLEtBTkQsTUFNTyxJQUFJSSxvQkFBSixFQUEwQjtBQUMvQjVCLGVBQVMsS0FBVDtBQUNELEtBRk0sTUFFQSxJQUFJNkIseUJBQUosRUFBK0I7QUFDcEM3QixlQUFTLElBQVQ7QUFDRDtBQUNGOztBQUVELFNBQU9BLE1BQVA7QUFDRCIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBuYW1lVXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvbmFtZScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBGaWxlIGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRklMRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7ICAgICAgICAgIFxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgY29uc3Qgc3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cbiAgXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGUoZmlsZSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZSwgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdleHBsb3JlcidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZTtcblxuZnVuY3Rpb24gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSkge1xuICBsZXQgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG4gIFxuICBjb25zdCBuYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsLmV4dGVuc2lvbkZyb21OYW1lKGVudHJ5TmFtZSksXG4gICAgICAgIG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9IG5hbWVVdGlsLm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZUV4dGVuc2lvblByZXNlbnQgPSAobmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQgPSAoZW50cnlOYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9PT0gbnVsbCksXG4gICAgICAgIGV4dGVuc2lvbnNCb3RoUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uUHJlc2VudCAmJiBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSxcbiAgICAgICAgbmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyAmJiBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyk7XG5cbiAgaWYgKG5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZykge1xuICAgIC8vL1xuICB9IGVsc2UgaWYgKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcpIHtcbiAgICBiZWZvcmUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZXh0ZW5zaW9uc0JvdGhQcmVzZW50KSB7XG4gICAgICBjb25zdCBleHRlbnNpb25zRGlmZmVyID0gKG5hbWVFeHRlbnNpb24gIT09IGVudHJ5TmFtZUV4dGVuc2lvbik7XG5cbiAgICAgIGlmIChleHRlbnNpb25zRGlmZmVyKSB7XG4gICAgICAgIGJlZm9yZSA9IChuYW1lRXh0ZW5zaW9uLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lRXh0ZW5zaW9uKSA8IDApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmFtZUV4dGVuc2lvblByZXNlbnQpIHtcbiAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmVmb3JlO1xufSJdfQ==