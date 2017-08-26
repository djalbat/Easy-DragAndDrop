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

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: 'fileName'
  }
});

module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJuYW1lVXRpbGl0aWVzIiwidHlwZXMiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGaWxlTmFtZU1hcmtlckVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsImRyYWdnYWJsZUVudHJ5IiwiYmVmb3JlIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJwcm9wZXJ0aWVzIiwiZmlsZU5hbWVNYXJrZXJFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLGFBQVIsQ0FBZDtBQUFBLElBQ01DLGNBQWNELFFBQVEsb0JBQVIsQ0FEcEI7QUFBQSxJQUVNRSxnQkFBZ0JGLFFBQVEseUJBQVIsQ0FGdEI7O0FBSU0sSUFBRUcsS0FBRixHQUFZSixLQUFaLENBQUVJLEtBQUY7QUFBQSxJQUNFQyxjQURGLEdBQ2lFRCxLQURqRSxDQUNFQyxjQURGO0FBQUEsSUFDa0JDLHFCQURsQixHQUNpRUYsS0FEakUsQ0FDa0JFLHFCQURsQjtBQUFBLElBQ3lDQyxtQkFEekMsR0FDaUVILEtBRGpFLENBQ3lDRyxtQkFEekM7O0lBR0FDLG1COzs7QUFDSiwrQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEI7QUFBQTs7QUFDMUIsUUFBTUMsT0FBT0wscUJBQWI7O0FBRDBCLHFJQUdwQkcsUUFIb0IsRUFHVkMsSUFIVSxFQUdKQyxJQUhJO0FBSTNCOzs7OzZCQUVRQyxjLEVBQWdCO0FBQ3ZCLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMscUJBQXFCRixlQUFlRyxPQUFmLEVBQTNCOztBQUVBLGNBQVFELGtCQUFSO0FBQ0UsYUFBS1QsY0FBTDtBQUNFLGNBQU1LLE9BQU8sS0FBS00sT0FBTCxFQUFiO0FBQUEsY0FDTUMscUJBQXFCTCxlQUFlSSxPQUFmLEVBRDNCOztBQUdBSCxtQkFBU1YsY0FBY2UscUJBQWQsQ0FBb0NSLElBQXBDLEVBQTBDTyxrQkFBMUMsQ0FBVDtBQUNBOztBQUVGLGFBQUtWLG1CQUFMO0FBQ0VNLG1CQUFTLEtBQVQ7QUFDQTtBQVZKOztBQWFBLGFBQU9BLE1BQVA7QUFDRDs7O21DQUVxQk0sVSxFQUFZO0FBQ2hDLFVBQU1DLHNCQUFzQmxCLFlBQVltQixjQUFaLENBQTJCYixtQkFBM0IsRUFBZ0RXLFVBQWhELENBQTVCOztBQUVBQywwQkFBb0JFLFVBQXBCOztBQUVBLGFBQU9GLG1CQUFQO0FBQ0Q7Ozs7RUFsQytCbEIsVzs7QUFxQ2xDcUIsT0FBT0MsTUFBUCxDQUFjaEIsbUJBQWQsRUFBbUM7QUFDakNpQixxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQURjLENBQW5DOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCcEIsbUJBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L21hcmtlcicpLFxuICAgICAgbmFtZVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxpdGllcy9uYW1lJyk7XG5cbmNvbnN0IHsgdHlwZXMgfSA9IEVudHJ5LFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRmlsZU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVVdGlsaXRpZXMubmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGRyYWdnYWJsZUVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyBcbiAgICBjb25zdCBmaWxlTmFtZU1hcmtlckVudHJ5ID0gTWFya2VyRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVNYXJrZXJFbnRyeSwgcHJvcGVydGllcyk7XG5cbiAgICBmaWxlTmFtZU1hcmtlckVudHJ5LmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lTWFya2VyRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlTmFtZSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiJdfQ==