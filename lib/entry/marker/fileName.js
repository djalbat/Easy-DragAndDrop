'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = require('../../types'),
    MarkerEntry = require('../../entry/marker'),
    nameUtilities = require('../../utilities/name');

var nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).apply(this, arguments));
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

          before = nameIsBeforeEntryName(name, draggableEntryName);
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
      var type = FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = MarkerEntry.fromProperties(FileNameMarkerEntry, properties, type);

      return fileNameMarkerEntry;
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: 'file-name'
  }
});

module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJuYW1lVXRpbGl0aWVzIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRklMRV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiYmVmb3JlIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwicHJvcGVydGllcyIsInR5cGUiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFBQSxJQUNNQyxjQUFjRCxRQUFRLG9CQUFSLENBRHBCO0FBQUEsSUFFTUUsZ0JBQWdCRixRQUFRLHNCQUFSLENBRnRCOztBQUlNLElBQUVHLHFCQUFGLEdBQTRCRCxhQUE1QixDQUFFQyxxQkFBRjtBQUFBLElBQ0VDLGNBREYsR0FDaUVMLEtBRGpFLENBQ0VLLGNBREY7QUFBQSxJQUNrQkMscUJBRGxCLEdBQ2lFTixLQURqRSxDQUNrQk0scUJBRGxCO0FBQUEsSUFDeUNDLG1CQUR6QyxHQUNpRVAsS0FEakUsQ0FDeUNPLG1CQUR6Qzs7SUFHQUMsbUI7Ozs7Ozs7Ozs7OzZCQUNLQyxjLEVBQWdCO0FBQ3ZCLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMscUJBQXFCRixlQUFlRyxPQUFmLEVBQTNCOztBQUVBLGNBQVFELGtCQUFSO0FBQ0UsYUFBS04sY0FBTDtBQUNFLGNBQU1RLE9BQU8sS0FBS0MsT0FBTCxFQUFiO0FBQUEsY0FDTUMscUJBQXFCTixlQUFlSyxPQUFmLEVBRDNCOztBQUdBSixtQkFBU04sc0JBQXNCUyxJQUF0QixFQUE0QkUsa0JBQTVCLENBQVQ7QUFDQTs7QUFFRixhQUFLUixtQkFBTDtBQUNFRyxtQkFBUyxLQUFUO0FBQ0E7QUFWSjs7QUFhQSxhQUFPQSxNQUFQO0FBQ0Q7OzttQ0FFcUJNLFUsRUFBWTtBQUNoQyxVQUFNQyxPQUFPWCxxQkFBYjtBQUFBLFVBQ01ZLHNCQUFzQmhCLFlBQVlpQixjQUFaLENBQTJCWCxtQkFBM0IsRUFBZ0RRLFVBQWhELEVBQTREQyxJQUE1RCxDQUQ1Qjs7QUFHQSxhQUFPQyxtQkFBUDtBQUNEOzs7O0VBM0IrQmhCLFc7O0FBOEJsQ2tCLE9BQU9DLE1BQVAsQ0FBY2IsbUJBQWQsRUFBbUM7QUFDakNjLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNO0FBRGMsQ0FBbkM7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUJqQixtQkFBakIiLCJmaWxlIjoiZmlsZU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi4vLi4vdHlwZXMnKSxcbiAgICAgIE1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvbWFya2VyJyksXG4gICAgICBuYW1lVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL25hbWUnKTtcblxuY29uc3QgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSA9IG5hbWVVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IHR5cGVzO1xuXG5jbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGRyYWdnYWJsZUVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHR5cGUgPSBGSUxFX05BTUVfTUFSS0VSX1RZUEUsXG4gICAgICAgICAgZmlsZU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGVOYW1lTWFya2VyRW50cnksIHByb3BlcnRpZXMsIHR5cGUpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lTWFya2VyRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlTmFtZU1hcmtlckVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZmlsZS1uYW1lJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuIl19