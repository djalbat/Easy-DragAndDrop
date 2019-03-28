'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary');

var options = require('../../../options'),
    DirectoryNameDraggableEntry = require('../../../entry/draggable/directoryName');

var pathUtilities = necessary.pathUtilities,
    NO_DRAGGING_INTO_SUB_DIRECTORIES = options.NO_DRAGGING_INTO_SUB_DIRECTORIES,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var TopmostDirectoryNameDraggableEntry = function (_DirectoryNameDraggab) {
  _inherits(TopmostDirectoryNameDraggableEntry, _DirectoryNameDraggab);

  function TopmostDirectoryNameDraggableEntry() {
    _classCallCheck(this, TopmostDirectoryNameDraggableEntry);

    return _possibleConstructorReturn(this, (TopmostDirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry)).apply(this, arguments));
  }

  _createClass(TopmostDirectoryNameDraggableEntry, [{
    key: 'retrieve',
    value: function retrieve() {
      return this; ///
    }
  }, {
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = void 0;

      var explorer = this.getExplorer(),
          noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

      if (noDraggingIntoSubdirectoriesOptionPresent) {
        var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

        directoryNameDraggableEntryOverlappingDraggableEntry = overlappingDraggableEntry ? this : null;
      } else {
        directoryNameDraggableEntryOverlappingDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry', this).call(this, draggableEntry);
      }

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerPath, draggableEntryType) {
      var markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

      markerPath = markerPathWithoutTopmostDirectoryName; ///

      _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addMarkerEntry', this).call(this, markerPath, draggableEntryType);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      var addFilePath = this.addFilePath.bind(this),
          removeFilePath = this.removeFilePath.bind(this),
          addDirectoryPath = this.addDirectoryPath.bind(this),
          removeDirectoryPath = this.removeDirectoryPath.bind(this),
          retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          retrieveTopmostDirectoryNameDraggableEntry = this.retrieve.bind(this),
          ///
      retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
          addTopmostDirectoryNameDraggableEntryMarkerEntry = this.addMarkerEntry.bind(this),
          ///
      removeTopmostDirectoryNameDraggableEntryMarkerEntry = this.removeMarkerEntry.bind(this),
          ///
      isTopmostDirectoryNameDraggableEntryMarked = this.isMarked.bind(this),
          ///
      getTopmostDirectoryName = this.getName.bind(this),
          ///
      retrieveFilePaths = this.retrieveFilePaths.bind(this),
          retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this);

      return {
        addFilePath: addFilePath,
        removeFilePath: removeFilePath,
        addDirectoryPath: addDirectoryPath,
        removeDirectoryPath: removeDirectoryPath,
        retrieveDraggableEntryPath: retrieveDraggableEntryPath,
        retrieveTopmostDirectoryNameDraggableEntry: retrieveTopmostDirectoryNameDraggableEntry,
        retrieveMarkedDirectoryNameDraggableEntry: retrieveMarkedDirectoryNameDraggableEntry,
        retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry,
        addTopmostDirectoryNameDraggableEntryMarkerEntry: addTopmostDirectoryNameDraggableEntryMarkerEntry,
        removeTopmostDirectoryNameDraggableEntryMarkerEntry: removeTopmostDirectoryNameDraggableEntryMarkerEntry,
        isTopmostDirectoryNameDraggableEntryMarked: isTopmostDirectoryNameDraggableEntryMarked,
        getTopmostDirectoryName: getTopmostDirectoryName,
        retrieveFilePaths: retrieveFilePaths,
        retrieveDirectoryPaths: retrieveDirectoryPaths
      };
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return DirectoryNameDraggableEntry.fromProperties(TopmostDirectoryNameDraggableEntry, properties);
    }
  }]);

  return TopmostDirectoryNameDraggableEntry;
}(DirectoryNameDraggableEntry);

module.exports = TopmostDirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS90b3Btb3N0LmpzIl0sIm5hbWVzIjpbIm5lY2Vzc2FyeSIsInJlcXVpcmUiLCJvcHRpb25zIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGVQYXRoIiwiYmluZCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlIiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeSIsInJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNNYXJrZWQiLCJnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJyZXRyaWV2ZUZpbGVQYXRocyIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztBQUVBLElBQU1DLFVBQVVELFFBQVEsa0JBQVIsQ0FBaEI7QUFBQSxJQUNNRSw4QkFBOEJGLFFBQVEsd0NBQVIsQ0FEcEM7O0FBR00sSUFBRUcsYUFBRixHQUFvQkosU0FBcEIsQ0FBRUksYUFBRjtBQUFBLElBQ0VDLGdDQURGLEdBQ3VDSCxPQUR2QyxDQUNFRyxnQ0FERjtBQUFBLElBRUVDLHVDQUZGLEdBRThDRixhQUY5QyxDQUVFRSx1Q0FGRjs7SUFJQUMsa0M7Ozs7Ozs7Ozs7OytCQUNPO0FBQ1QsYUFBTyxJQUFQLENBRFMsQ0FDSztBQUNmOzs7MkRBRXNDO0FBQ3JDLGFBQU8sSUFBUDtBQUNEOzs7aUZBRTREQyxjLEVBQWdCO0FBQzNFLFVBQUlDLDZEQUFKOztBQUVBLFVBQU1DLFdBQVcsS0FBS0MsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLDRDQUE0Q0YsU0FBU0csZUFBVCxDQUF5QlIsZ0NBQXpCLENBRGxEOztBQUdBLFVBQUlPLHlDQUFKLEVBQStDO0FBQzdDLFlBQU1FLDRCQUE0QixLQUFLQywyQkFBTCxDQUFpQ1AsY0FBakMsQ0FBbEM7O0FBRUFDLCtEQUF1REssNEJBQ0UsSUFERixHQUVJLElBRjNEO0FBR0QsT0FORCxNQU1PO0FBQ0xMLG9SQUEwSEQsY0FBMUg7QUFDRDs7QUFFRCxhQUFPQyxvREFBUDtBQUNEOzs7bUNBRWNPLFUsRUFBWUMsa0IsRUFBb0I7QUFDN0MsVUFBTUMsd0NBQXdDWix3Q0FBd0NVLFVBQXhDLENBQTlDOztBQUVBQSxtQkFBYUUscUNBQWIsQ0FINkMsQ0FHTzs7QUFFcEQsNktBQXFCRixVQUFyQixFQUFpQ0Msa0JBQWpDO0FBQ0Q7OztvQ0FFZTtBQUNmLFVBQU1FLGNBQWMsS0FBS0EsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBcEI7QUFBQSxVQUNHQyxpQkFBaUIsS0FBS0EsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBeUIsSUFBekIsQ0FEcEI7QUFBQSxVQUVHRSxtQkFBbUIsS0FBS0EsZ0JBQUwsQ0FBc0JGLElBQXRCLENBQTJCLElBQTNCLENBRnRCO0FBQUEsVUFHR0csc0JBQXNCLEtBQUtBLG1CQUFMLENBQXlCSCxJQUF6QixDQUE4QixJQUE5QixDQUh6QjtBQUFBLFVBSUdJLDZCQUE2QixLQUFLQSwwQkFBTCxDQUFnQ0osSUFBaEMsQ0FBcUMsSUFBckMsQ0FKaEM7QUFBQSxVQUtHSyw2Q0FBNkMsS0FBS0MsUUFBTCxDQUFjTixJQUFkLENBQW1CLElBQW5CLENBTGhEO0FBQUEsVUFLMkU7QUFDeEVPLGtEQUE0QyxLQUFLQSx5Q0FBTCxDQUErQ1AsSUFBL0MsQ0FBb0QsSUFBcEQsQ0FOL0M7QUFBQSxVQU9HUSwrREFBK0QsS0FBS0EsNERBQUwsQ0FBa0VSLElBQWxFLENBQXVFLElBQXZFLENBUGxFO0FBQUEsVUFRR1MsbURBQW1ELEtBQUtDLGNBQUwsQ0FBb0JWLElBQXBCLENBQXlCLElBQXpCLENBUnREO0FBQUEsVUFRc0Y7QUFDbkZXLDREQUFzRCxLQUFLQyxpQkFBTCxDQUF1QlosSUFBdkIsQ0FBNEIsSUFBNUIsQ0FUekQ7QUFBQSxVQVM0RjtBQUN6RmEsbURBQTZDLEtBQUtDLFFBQUwsQ0FBY2QsSUFBZCxDQUFtQixJQUFuQixDQVZoRDtBQUFBLFVBVTJFO0FBQ3hFZSxnQ0FBMEIsS0FBS0MsT0FBTCxDQUFhaEIsSUFBYixDQUFrQixJQUFsQixDQVg3QjtBQUFBLFVBV3VEO0FBQ3BEaUIsMEJBQW9CLEtBQUtBLGlCQUFMLENBQXVCakIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FadkI7QUFBQSxVQWFHa0IseUJBQXlCLEtBQUtBLHNCQUFMLENBQTRCbEIsSUFBNUIsQ0FBaUMsSUFBakMsQ0FiNUI7O0FBZUMsYUFBUTtBQUNORCxnQ0FETTtBQUVORSxzQ0FGTTtBQUdOQywwQ0FITTtBQUlOQyxnREFKTTtBQUtOQyw4REFMTTtBQU1OQyw4RkFOTTtBQU9ORSw0RkFQTTtBQVFOQyxrSUFSTTtBQVNOQywwR0FUTTtBQVVORSxnSEFWTTtBQVdORSw4RkFYTTtBQVlORSx3REFaTTtBQWFORSw0Q0FiTTtBQWNOQztBQWRNLE9BQVI7QUFnQkQ7OzttQ0FFcUJDLFUsRUFBWTtBQUFFLGFBQU9wQyw0QkFBNEJxQyxjQUE1QixDQUEyQ2pDLGtDQUEzQyxFQUErRWdDLFVBQS9FLENBQVA7QUFBb0c7Ozs7RUF0RXpGcEMsMkI7O0FBeUVqRHNDLE9BQU9DLE9BQVAsR0FBaUJuQyxrQ0FBakIiLCJmaWxlIjoidG9wbW9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IHBhdGhVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnMsXG4gICAgICB7IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB7XG4gIHJldHJpZXZlKCkge1xuICAgIHJldHVybiB0aGlzOyAgLy8vXG4gIH1cbiAgXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgbWFya2VyUGF0aCA9IG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgc3VwZXIuYWRkTWFya2VyRW50cnkobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgYWRkRGlyZWN0b3J5UGF0aCA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlLmJpbmQodGhpcyksICAvLy9cblx0XHRcdFx0ICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSA9IHRoaXMuYWRkTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG5cdFx0XHRcdCAgcmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5ID0gdGhpcy5yZW1vdmVNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAvLy9cblx0XHRcdFx0ICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksICAvLy9cblx0XHRcdFx0ICBnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLCAgLy8vXG5cdFx0XHRcdCAgcmV0cmlldmVGaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCxcbiAgICAgIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LFxuICAgICAgYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5LFxuICAgICAgcmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5LFxuICAgICAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkLFxuICAgICAgZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUsXG4gICAgICByZXRyaWV2ZUZpbGVQYXRocyxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHNcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcyk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuIl19