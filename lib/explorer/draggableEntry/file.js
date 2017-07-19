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
      entryNameWithoutExtension = nameUTil.nameWithoutExtensionFromName(entryName),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbIkVudHJ5IiwicmVxdWlyZSIsIm5hbWVVdGlsIiwiRHJhZ2dhYmxlRW50cnkiLCJGaWxlIiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwidHlwZXMiLCJGSUxFIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJsb2NhbGVDb21wYXJlIiwibmFtZUV4dGVuc2lvbiIsImV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lRXh0ZW5zaW9uIiwibmFtZVdpdGhvdXRFeHRlbnNpb24iLCJuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiIsIm5hbWVVVGlsIiwibmFtZUV4dGVuc2lvblByZXNlbnQiLCJlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50IiwibmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nIiwiZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmciLCJleHRlbnNpb25zQm90aFByZXNlbnQiLCJuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmciLCJleHRlbnNpb25zRGlmZmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFFB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Q0QsR0FGRCxNQUVPLElBQUlILDJCQUFKLEVBQWlDO0FBQ3RDL0IsYUFBUyxJQUFUO0FBQ0QsR0FGTSxNQUVBLElBQUlnQyxnQ0FBSixFQUFzQztBQUMzQ2hDLGFBQVMsS0FBVDtBQUNELEdBRk0sTUFFQTtBQUNMLFFBQUlpQyxxQkFBSixFQUEyQjtBQUN6QixVQUFNRSxtQkFBb0JiLGtCQUFrQkUsa0JBQTVDOztBQUVBLFVBQUlXLGdCQUFKLEVBQXNCO0FBQ3BCbkMsaUJBQVVzQixjQUFjRCxhQUFkLENBQTRCRyxrQkFBNUIsSUFBa0QsQ0FBNUQ7QUFDRDtBQUNGLEtBTkQsTUFNTyxJQUFJSyxvQkFBSixFQUEwQjtBQUMvQjdCLGVBQVMsS0FBVDtBQUNELEtBRk0sTUFFQSxJQUFJOEIseUJBQUosRUFBK0I7QUFDcEM5QixlQUFTLElBQVQ7QUFDRDtBQUNGOztBQUVELFNBQU9BLE1BQVA7QUFDRCIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBuYW1lVXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvbmFtZScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBGaWxlIGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRklMRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7ICAgICAgICAgIFxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgY29uc3Qgc3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cbiAgXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGUoZmlsZSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZSwgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdleHBsb3JlcidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZTtcblxuZnVuY3Rpb24gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSkge1xuICBsZXQgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG4gIFxuICBjb25zdCBuYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsLmV4dGVuc2lvbkZyb21OYW1lKGVudHJ5TmFtZSksXG4gICAgICAgIG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9IG5hbWVVVGlsLm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZUV4dGVuc2lvblByZXNlbnQgPSAobmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQgPSAoZW50cnlOYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9PT0gbnVsbCksXG4gICAgICAgIGV4dGVuc2lvbnNCb3RoUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uUHJlc2VudCAmJiBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSxcbiAgICAgICAgbmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyAmJiBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyk7XG5cbiAgaWYgKG5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZykge1xuICAgIC8vL1xuICB9IGVsc2UgaWYgKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcpIHtcbiAgICBiZWZvcmUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZXh0ZW5zaW9uc0JvdGhQcmVzZW50KSB7XG4gICAgICBjb25zdCBleHRlbnNpb25zRGlmZmVyID0gKG5hbWVFeHRlbnNpb24gIT09IGVudHJ5TmFtZUV4dGVuc2lvbik7XG5cbiAgICAgIGlmIChleHRlbnNpb25zRGlmZmVyKSB7XG4gICAgICAgIGJlZm9yZSA9IChuYW1lRXh0ZW5zaW9uLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lRXh0ZW5zaW9uKSA8IDApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmFtZUV4dGVuc2lvblByZXNlbnQpIHtcbiAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBiZWZvcmU7XG59Il19