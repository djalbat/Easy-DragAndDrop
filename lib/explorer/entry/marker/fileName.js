'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker'),
    nameUtilities = require('../../../utilities/name');

var types = Entry.types,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry(selector, name) {
    _classCallCheck(this, FileNameMarkerEntry);

    var type = FILE_NAME_MARKER_TYPE;

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).call(this, selector, name, type));
  }

  _createClass(FileNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();

          before = nameUtilities.nameIsBeforeEntryName(name, draggableEntryName);
          break;

        case DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var fileNameMarkerEntry = MarkerEntry.fromProperties(FileNameMarkerEntry, properties);

      fileNameMarkerEntry.initialise();

      return fileNameMarkerEntry;
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJuYW1lVXRpbGl0aWVzIiwidHlwZXMiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGaWxlTmFtZU1hcmtlckVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsImRyYWdnYWJsZUVudHJ5IiwiYmVmb3JlIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJwcm9wZXJ0aWVzIiwiZmlsZU5hbWVNYXJrZXJFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFBQSxJQUNNQyxjQUFjRCxRQUFRLG9CQUFSLENBRHBCO0FBQUEsSUFFTUUsZ0JBQWdCRixRQUFRLHlCQUFSLENBRnRCOztBQUlNLElBQUVHLEtBQUYsR0FBWUosS0FBWixDQUFFSSxLQUFGO0FBQUEsSUFDRUMsY0FERixHQUNpRUQsS0FEakUsQ0FDRUMsY0FERjtBQUFBLElBQ2tCQyxxQkFEbEIsR0FDaUVGLEtBRGpFLENBQ2tCRSxxQkFEbEI7QUFBQSxJQUN5Q0MsbUJBRHpDLEdBQ2lFSCxLQURqRSxDQUN5Q0csbUJBRHpDOztJQUdBQyxtQjs7O0FBQ0osK0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCO0FBQUE7O0FBQzFCLFFBQU1DLE9BQU9MLHFCQUFiOztBQUQwQixxSUFHcEJHLFFBSG9CLEVBR1ZDLElBSFUsRUFHSkMsSUFISTtBQUkzQjs7Ozs2QkFFUUMsYyxFQUFnQjtBQUN2QixVQUFJQyxlQUFKOztBQUVBLFVBQU1DLHFCQUFxQkYsZUFBZUcsT0FBZixFQUEzQjs7QUFFQSxjQUFRRCxrQkFBUjtBQUNFLGFBQUtULGNBQUw7QUFDRSxjQUFNSyxPQUFPLEtBQUtNLE9BQUwsRUFBYjtBQUFBLGNBQ01DLHFCQUFxQkwsZUFBZUksT0FBZixFQUQzQjs7QUFHQUgsbUJBQVNWLGNBQWNlLHFCQUFkLENBQW9DUixJQUFwQyxFQUEwQ08sa0JBQTFDLENBQVQ7QUFDQTs7QUFFRixhQUFLVixtQkFBTDtBQUNFTSxtQkFBUyxLQUFUO0FBQ0E7QUFWSjs7QUFhQSxhQUFPQSxNQUFQO0FBQ0Q7OzttQ0FFcUJNLFUsRUFBWTtBQUNoQyxVQUFNQyxzQkFBc0JsQixZQUFZbUIsY0FBWixDQUEyQmIsbUJBQTNCLEVBQWdEVyxVQUFoRCxDQUE1Qjs7QUFFQUMsMEJBQW9CRSxVQUFwQjs7QUFFQSxhQUFPRixtQkFBUDtBQUNEOzs7O0VBbEMrQmxCLFc7O0FBcUNsQ3FCLE9BQU9DLE9BQVAsR0FBaUJoQixtQkFBakIiLCJmaWxlIjoiZmlsZU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnknKSxcbiAgICAgIE1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvbWFya2VyJyksXG4gICAgICBuYW1lVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbGl0aWVzL25hbWUnKTtcblxuY29uc3QgeyB0eXBlcyB9ID0gRW50cnksXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IHR5cGVzO1xuXG5jbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBGSUxFX05BTUVfTUFSS0VSX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSk7XG4gIH1cblxuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gbmFtZVV0aWxpdGllcy5uYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZHJhZ2dhYmxlRW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IFxuICAgIGNvbnN0IGZpbGVOYW1lTWFya2VyRW50cnkgPSBNYXJrZXJFbnRyeS5mcm9tUHJvcGVydGllcyhGaWxlTmFtZU1hcmtlckVudHJ5LCBwcm9wZXJ0aWVzKTtcblxuICAgIGZpbGVOYW1lTWFya2VyRW50cnkuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBmaWxlTmFtZU1hcmtlckVudHJ5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiJdfQ==