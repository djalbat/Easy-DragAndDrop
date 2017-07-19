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
  var before = void 0;

  var nameExtension = nameUtil.extensionFromName(name),
      entryNameExtension = nameUtil.extensionFromName(entryName),
      nameExtensionPresent = nameExtension !== null,
      entryNameExtensionPresent = entryNameExtension !== null,
      extensionsBothPresent = nameExtensionPresent && entryNameExtensionPresent;

  if (extensionsBothPresent) {
    var extensionsEqual = nameExtension === entryNameExtension;

    if (extensionsEqual) {
      before = name.localeCompare(entryName) < 0;
    } else {
      before = nameExtension.localeCompare(entryNameExtension) < 0;
    }
  } else if (nameExtensionPresent) {
    before = false;
  } else if (entryNameExtensionPresent) {
    before = true;
  } else {
    before = name.localeCompare(entryName) < 0;
  }

  return before;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbIkVudHJ5IiwicmVxdWlyZSIsIm5hbWVVdGlsIiwiRHJhZ2dhYmxlRW50cnkiLCJGaWxlIiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwidHlwZXMiLCJGSUxFIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJuYW1lRXh0ZW5zaW9uIiwiZXh0ZW5zaW9uRnJvbU5hbWUiLCJlbnRyeU5hbWVFeHRlbnNpb24iLCJuYW1lRXh0ZW5zaW9uUHJlc2VudCIsImVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQiLCJleHRlbnNpb25zQm90aFByZXNlbnQiLCJleHRlbnNpb25zRXF1YWwiLCJsb2NhbGVDb21wYXJlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUMsV0FBV0QsUUFBUSxpQkFBUixDQURqQjtBQUFBLElBRU1FLGlCQUFpQkYsUUFBUSxtQkFBUixDQUZ2Qjs7SUFJTUcsSTs7O0FBQ0osZ0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUNwQyxRQUFNQyxPQUFPUixNQUFNUyxLQUFOLENBQVlDLElBQXpCOztBQURvQyw0R0FHOUJMLFFBSDhCLEVBR3BCQyxJQUhvQixFQUdkQyxRQUhjLEVBR0pDLElBSEk7O0FBS3BDLFVBQUtHLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCLE9BQW5CO0FBTG9DO0FBTXJDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFQO0FBQ0Q7Ozs2QkFFUUMsSyxFQUFPO0FBQ2QsVUFBSUMsZUFBSjs7QUFFQSxVQUFNQyxZQUFZRixNQUFNRyxPQUFOLEVBQWxCOztBQUVBLGNBQVFELFNBQVI7QUFDRSxhQUFLaEIsTUFBTVMsS0FBTixDQUFZQyxJQUFqQjtBQUNBLGFBQUtWLE1BQU1TLEtBQU4sQ0FBWVMsTUFBakI7QUFDRSxjQUFNWixPQUFPLEtBQUthLE9BQUwsRUFBYjtBQUFBLGNBQ01DLFlBQVlOLE1BQU1LLE9BQU4sRUFEbEI7O0FBR0FKLG1CQUFTTSxzQkFBc0JmLElBQXRCLEVBQTRCYyxTQUE1QixDQUFUO0FBQ0E7O0FBRUYsYUFBS3BCLE1BQU1TLEtBQU4sQ0FBWWEsU0FBakI7QUFDRVAsbUJBQVMsS0FBVDtBQUNBO0FBWEo7O0FBY0EsYUFBT0EsTUFBUDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFNUSxhQUFhLEVBQW5CLENBRGMsQ0FDVTs7QUFFeEIsYUFBT0EsVUFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQU1oQixXQUFXLEtBQUtpQixXQUFMLEVBQWpCO0FBQUEsVUFDTUMsT0FBTyxJQURiLENBRG1CLENBRUE7O0FBRW5CbEIsZUFBU21CLFFBQVQsQ0FBa0JELElBQWxCO0FBQ0Q7OzttQ0FFcUJFLFUsRUFBWTtBQUFBLFVBQ3hCckIsSUFEd0IsR0FDTHFCLFVBREssQ0FDeEJyQixJQUR3QjtBQUFBLFVBQ2xCQyxRQURrQixHQUNMb0IsVUFESyxDQUNsQnBCLFFBRGtCOzs7QUFHaEMsYUFBT0osZUFBZXlCLGNBQWYsQ0FBOEJ4QixJQUE5QixFQUFvQ3VCLFVBQXBDLEVBQWdEckIsSUFBaEQsRUFBc0RDLFFBQXRELENBQVA7QUFDRDs7OztFQXBEZ0JKLGM7O0FBdURuQjBCLE9BQU9DLE1BQVAsQ0FBYzFCLElBQWQsRUFBb0I7QUFDbEIyQixxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQUREO0FBSWxCQyxxQkFBbUIsQ0FDakIsTUFEaUIsRUFFakIsVUFGaUI7QUFKRCxDQUFwQjs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQi9CLElBQWpCOztBQUVBLFNBQVNpQixxQkFBVCxDQUErQmYsSUFBL0IsRUFBcUNjLFNBQXJDLEVBQWdEO0FBQzlDLE1BQUlMLGVBQUo7O0FBRUEsTUFBTXFCLGdCQUFnQmxDLFNBQVNtQyxpQkFBVCxDQUEyQi9CLElBQTNCLENBQXRCO0FBQUEsTUFDTWdDLHFCQUFxQnBDLFNBQVNtQyxpQkFBVCxDQUEyQmpCLFNBQTNCLENBRDNCO0FBQUEsTUFFTW1CLHVCQUF3Qkgsa0JBQWtCLElBRmhEO0FBQUEsTUFHTUksNEJBQTZCRix1QkFBdUIsSUFIMUQ7QUFBQSxNQUlNRyx3QkFBeUJGLHdCQUF3QkMseUJBSnZEOztBQU1BLE1BQUlDLHFCQUFKLEVBQTJCO0FBQ3pCLFFBQU1DLGtCQUFtQk4sa0JBQWtCRSxrQkFBM0M7O0FBRUEsUUFBSUksZUFBSixFQUFxQjtBQUNuQjNCLGVBQVVULEtBQUtxQyxhQUFMLENBQW1CdkIsU0FBbkIsSUFBZ0MsQ0FBMUM7QUFDRCxLQUZELE1BRU87QUFDTEwsZUFBVXFCLGNBQWNPLGFBQWQsQ0FBNEJMLGtCQUE1QixJQUFrRCxDQUE1RDtBQUNEO0FBQ0YsR0FSRCxNQVFPLElBQUlDLG9CQUFKLEVBQTBCO0FBQy9CeEIsYUFBUyxLQUFUO0FBQ0QsR0FGTSxNQUVBLElBQUl5Qix5QkFBSixFQUErQjtBQUNwQ3pCLGFBQVMsSUFBVDtBQUNELEdBRk0sTUFFQTtBQUNMQSxhQUFVVCxLQUFLcUMsYUFBTCxDQUFtQnZCLFNBQW5CLElBQWdDLENBQTFDO0FBQ0Q7O0FBRUQsU0FBT0wsTUFBUDtBQUNEIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG5hbWVVdGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9uYW1lJyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICAgIFxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZShmaWxlKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhGaWxlLCBwcm9wZXJ0aWVzLCBuYW1lLCBleHBsb3Jlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlLCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZmlsZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuXG5mdW5jdGlvbiBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKSB7XG4gIGxldCBiZWZvcmU7XG4gIFxuICBjb25zdCBuYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsLmV4dGVuc2lvbkZyb21OYW1lKGVudHJ5TmFtZSksXG4gICAgICAgIG5hbWVFeHRlbnNpb25QcmVzZW50ID0gKG5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50ID0gKGVudHJ5TmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIGV4dGVuc2lvbnNCb3RoUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uUHJlc2VudCAmJiBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KTtcblxuICBpZiAoZXh0ZW5zaW9uc0JvdGhQcmVzZW50KSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uc0VxdWFsID0gKG5hbWVFeHRlbnNpb24gPT09IGVudHJ5TmFtZUV4dGVuc2lvbik7XG5cbiAgICBpZiAoZXh0ZW5zaW9uc0VxdWFsKSB7XG4gICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgYmVmb3JlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgIGJlZm9yZSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG4gIH1cblxuICByZXR1cm4gYmVmb3JlO1xufSJdfQ==