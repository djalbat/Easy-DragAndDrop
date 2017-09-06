'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker'),
    nameUtilities = require('../../../utilities/name');

var types = Entry.types,
    nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJuYW1lVXRpbGl0aWVzIiwidHlwZXMiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJGSUxFX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGaWxlTmFtZU1hcmtlckVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsImRyYWdnYWJsZUVudHJ5IiwiYmVmb3JlIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJwcm9wZXJ0aWVzIiwiZmlsZU5hbWVNYXJrZXJFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLGFBQVIsQ0FBZDtBQUFBLElBQ01DLGNBQWNELFFBQVEsb0JBQVIsQ0FEcEI7QUFBQSxJQUVNRSxnQkFBZ0JGLFFBQVEseUJBQVIsQ0FGdEI7O0FBSU0sSUFBRUcsS0FBRixHQUFZSixLQUFaLENBQUVJLEtBQUY7QUFBQSxJQUNFQyxxQkFERixHQUM0QkYsYUFENUIsQ0FDRUUscUJBREY7QUFBQSxJQUVFQyxjQUZGLEdBRWlFRixLQUZqRSxDQUVFRSxjQUZGO0FBQUEsSUFFa0JDLHFCQUZsQixHQUVpRUgsS0FGakUsQ0FFa0JHLHFCQUZsQjtBQUFBLElBRXlDQyxtQkFGekMsR0FFaUVKLEtBRmpFLENBRXlDSSxtQkFGekM7O0lBSUFDLG1COzs7QUFDSiwrQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEI7QUFBQTs7QUFDMUIsUUFBTUMsT0FBT0wscUJBQWI7O0FBRDBCLHFJQUdwQkcsUUFIb0IsRUFHVkMsSUFIVSxFQUdKQyxJQUhJO0FBSTNCOzs7OzZCQUVRQyxjLEVBQWdCO0FBQ3ZCLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMscUJBQXFCRixlQUFlRyxPQUFmLEVBQTNCOztBQUVBLGNBQVFELGtCQUFSO0FBQ0UsYUFBS1QsY0FBTDtBQUNFLGNBQU1LLE9BQU8sS0FBS00sT0FBTCxFQUFiO0FBQUEsY0FDTUMscUJBQXFCTCxlQUFlSSxPQUFmLEVBRDNCOztBQUdBSCxtQkFBU1Qsc0JBQXNCTSxJQUF0QixFQUE0Qk8sa0JBQTVCLENBQVQ7QUFDQTs7QUFFRixhQUFLVixtQkFBTDtBQUNFTSxtQkFBUyxLQUFUO0FBQ0E7QUFWSjs7QUFhQSxhQUFPQSxNQUFQO0FBQ0Q7OzttQ0FFcUJLLFUsRUFBWTtBQUNoQyxVQUFNQyxzQkFBc0JsQixZQUFZbUIsY0FBWixDQUEyQlosbUJBQTNCLEVBQWdEVSxVQUFoRCxDQUE1Qjs7QUFFQUMsMEJBQW9CRSxVQUFwQjs7QUFFQSxhQUFPRixtQkFBUDtBQUNEOzs7O0VBbEMrQmxCLFc7O0FBcUNsQ3FCLE9BQU9DLE1BQVAsQ0FBY2YsbUJBQWQsRUFBbUM7QUFDakNnQixxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQURjLENBQW5DOztBQU1BQyxPQUFPQyxPQUFQLEdBQWlCbkIsbUJBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L21hcmtlcicpLFxuICAgICAgbmFtZVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxpdGllcy9uYW1lJyk7XG5cbmNvbnN0IHsgdHlwZXMgfSA9IEVudHJ5LFxuICAgICAgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSA9IG5hbWVVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IHR5cGVzO1xuXG5jbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBGSUxFX05BTUVfTUFSS0VSX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSk7XG4gIH1cblxuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGRyYWdnYWJsZUVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyBcbiAgICBjb25zdCBmaWxlTmFtZU1hcmtlckVudHJ5ID0gTWFya2VyRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVNYXJrZXJFbnRyeSwgcHJvcGVydGllcyk7XG5cbiAgICBmaWxlTmFtZU1hcmtlckVudHJ5LmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lTWFya2VyRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlTmFtZSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiJdfQ==