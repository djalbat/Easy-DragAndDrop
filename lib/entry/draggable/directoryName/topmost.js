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
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;

      var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutTopmostDirectoryName !== null) {
        filePath = filePathWithoutTopmostDirectoryName; ///

        fileNameDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePath);
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed) {
      var directoryNameDraggableEntry = null;

      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        directoryNameDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPath, collapsed);
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutTopmostDirectoryName !== null) {
        filePath = filePathWithoutTopmostDirectoryName; ///

        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'removeFilePath', this).call(this, filePath);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'removeDirectoryPath', this).call(this, directoryPath);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS90b3Btb3N0LmpzIl0sIm5hbWVzIjpbIm5lY2Vzc2FyeSIsInJlcXVpcmUiLCJvcHRpb25zIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlUGF0aCIsImJpbmQiLCJyZW1vdmVGaWxlUGF0aCIsImFkZERpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwiYWRkTWFya2VyRW50cnkiLCJyZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJnZXROYW1lIiwicmV0cmlldmVGaWxlUGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLGtCQUFSLENBQWhCO0FBQUEsSUFDTUUsOEJBQThCRixRQUFRLHdDQUFSLENBRHBDOztBQUdNLElBQUVHLGFBQUYsR0FBb0JKLFNBQXBCLENBQUVJLGFBQUY7QUFBQSxJQUNFQyxnQ0FERixHQUN1Q0gsT0FEdkMsQ0FDRUcsZ0NBREY7QUFBQSxJQUVFQyx1Q0FGRixHQUU4Q0YsYUFGOUMsQ0FFRUUsdUNBRkY7O0lBSUFDLGtDOzs7Ozs7Ozs7OzsrQkFDTztBQUNULGFBQU8sSUFBUCxDQURTLENBQ0s7QUFDZjs7OzJEQUVzQztBQUNyQyxhQUFPLElBQVA7QUFDRDs7O2dDQUVXQyxRLEVBQVU7QUFDcEIsVUFBSUMseUJBQXlCLElBQTdCOztBQUVBLFVBQU1DLHNDQUFzQ0osd0NBQXdDRSxRQUF4QyxDQUE1Qzs7QUFFQSxVQUFJRSx3Q0FBd0MsSUFBNUMsRUFBa0Q7QUFDaERGLG1CQUFXRSxtQ0FBWCxDQURnRCxDQUNBOztBQUVoREQscU1BQTJDRCxRQUEzQztBQUNEOztBQUVELGFBQU9DLHNCQUFQO0FBQ0Q7OztxQ0FFZ0JFLGEsRUFBZUMsUyxFQUFXO0FBQ3pDLFVBQUlDLDhCQUE4QixJQUFsQzs7QUFFQSxVQUFNQywyQ0FBMkNSLHdDQUF3Q0ssYUFBeEMsQ0FBakQ7O0FBRUEsVUFBSUcsNkNBQTZDLElBQWpELEVBQXVEO0FBQ3JESCx3QkFBZ0JHLHdDQUFoQixDQURxRCxDQUNLOztBQUUxREQsK01BQXFERixhQUFyRCxFQUFvRUMsU0FBcEU7QUFDRDs7QUFFRCxhQUFPQywyQkFBUDtBQUNEOzs7bUNBRWNMLFEsRUFBVTtBQUN2QixVQUFNRSxzQ0FBc0NKLHdDQUF3Q0UsUUFBeEMsQ0FBNUM7O0FBRUEsVUFBSUUsd0NBQXdDLElBQTVDLEVBQWtEO0FBQ2hERixtQkFBV0UsbUNBQVgsQ0FEZ0QsQ0FDQTs7QUFFaEQsK0tBQXFCRixRQUFyQjtBQUNEO0FBQ0Y7Ozt3Q0FFbUJHLGEsRUFBZTtBQUNqQyxVQUFNRywyQ0FBMkNSLHdDQUF3Q0ssYUFBeEMsQ0FBakQ7O0FBRUEsVUFBSUcsNkNBQTZDLElBQWpELEVBQXVEO0FBQ3JESCx3QkFBZ0JHLHdDQUFoQixDQURxRCxDQUNNOztBQUUzRCxvTEFBMEJILGFBQTFCO0FBQ0Q7QUFDRjs7O2lGQUU0REksYyxFQUFnQjtBQUMzRSxVQUFJQyw2REFBSjs7QUFFQSxVQUFNQyxXQUFXLEtBQUtDLFdBQUwsRUFBakI7QUFBQSxVQUNNQyw0Q0FBNENGLFNBQVNHLGVBQVQsQ0FBeUJmLGdDQUF6QixDQURsRDs7QUFHQSxVQUFJYyx5Q0FBSixFQUErQztBQUM3QyxZQUFNRSw0QkFBNEIsS0FBS0MsMkJBQUwsQ0FBaUNQLGNBQWpDLENBQWxDOztBQUVBQywrREFBdURLLDRCQUNFLElBREYsR0FFSSxJQUYzRDtBQUdELE9BTkQsTUFNTztBQUNMTCxvUkFBMEhELGNBQTFIO0FBQ0Q7O0FBRUQsYUFBT0Msb0RBQVA7QUFDRDs7O21DQUVjTyxVLEVBQVlDLGtCLEVBQW9CO0FBQzdDLFVBQU1DLHdDQUF3Q25CLHdDQUF3Q2lCLFVBQXhDLENBQTlDOztBQUVBQSxtQkFBYUUscUNBQWIsQ0FINkMsQ0FHTzs7QUFFcEQsNktBQXFCRixVQUFyQixFQUFpQ0Msa0JBQWpDO0FBQ0Q7OztvQ0FFZTtBQUNmLFVBQU1FLGNBQWMsS0FBS0EsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBcEI7QUFBQSxVQUNHQyxpQkFBaUIsS0FBS0EsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBeUIsSUFBekIsQ0FEcEI7QUFBQSxVQUVHRSxtQkFBbUIsS0FBS0EsZ0JBQUwsQ0FBc0JGLElBQXRCLENBQTJCLElBQTNCLENBRnRCO0FBQUEsVUFHR0csc0JBQXNCLEtBQUtBLG1CQUFMLENBQXlCSCxJQUF6QixDQUE4QixJQUE5QixDQUh6QjtBQUFBLFVBSUdJLDZCQUE2QixLQUFLQSwwQkFBTCxDQUFnQ0osSUFBaEMsQ0FBcUMsSUFBckMsQ0FKaEM7QUFBQSxVQUtHSyw2Q0FBNkMsS0FBS0MsUUFBTCxDQUFjTixJQUFkLENBQW1CLElBQW5CLENBTGhEO0FBQUEsVUFLMkU7QUFDeEVPLGtEQUE0QyxLQUFLQSx5Q0FBTCxDQUErQ1AsSUFBL0MsQ0FBb0QsSUFBcEQsQ0FOL0M7QUFBQSxVQU9HUSwrREFBK0QsS0FBS0EsNERBQUwsQ0FBa0VSLElBQWxFLENBQXVFLElBQXZFLENBUGxFO0FBQUEsVUFRR1MsbURBQW1ELEtBQUtDLGNBQUwsQ0FBb0JWLElBQXBCLENBQXlCLElBQXpCLENBUnREO0FBQUEsVUFRc0Y7QUFDbkZXLDREQUFzRCxLQUFLQyxpQkFBTCxDQUF1QlosSUFBdkIsQ0FBNEIsSUFBNUIsQ0FUekQ7QUFBQSxVQVM0RjtBQUN6RmEsbURBQTZDLEtBQUtDLFFBQUwsQ0FBY2QsSUFBZCxDQUFtQixJQUFuQixDQVZoRDtBQUFBLFVBVTJFO0FBQ3hFZSxnQ0FBMEIsS0FBS0MsT0FBTCxDQUFhaEIsSUFBYixDQUFrQixJQUFsQixDQVg3QjtBQUFBLFVBV3VEO0FBQ3BEaUIsMEJBQW9CLEtBQUtBLGlCQUFMLENBQXVCakIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FadkI7QUFBQSxVQWFHa0IseUJBQXlCLEtBQUtBLHNCQUFMLENBQTRCbEIsSUFBNUIsQ0FBaUMsSUFBakMsQ0FiNUI7O0FBZUMsYUFBUTtBQUNORCxnQ0FETTtBQUVORSxzQ0FGTTtBQUdOQywwQ0FITTtBQUlOQyxnREFKTTtBQUtOQyw4REFMTTtBQU1OQyw4RkFOTTtBQU9ORSw0RkFQTTtBQVFOQyxrSUFSTTtBQVNOQywwR0FUTTtBQVVORSxnSEFWTTtBQVdORSw4RkFYTTtBQVlORSx3REFaTTtBQWFORSw0Q0FiTTtBQWNOQztBQWRNLE9BQVI7QUFnQkQ7OzttQ0FFcUJDLFUsRUFBWTtBQUFFLGFBQU8zQyw0QkFBNEI0QyxjQUE1QixDQUEyQ3hDLGtDQUEzQyxFQUErRXVDLFVBQS9FLENBQVA7QUFBb0c7Ozs7RUF0SHpGM0MsMkI7O0FBeUhqRDZDLE9BQU9DLE9BQVAsR0FBaUIxQyxrQ0FBakIiLCJmaWxlIjoidG9wbW9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IHBhdGhVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnMsXG4gICAgICB7IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB7XG4gIHJldHJpZXZlKCkge1xuICAgIHJldHVybiB0aGlzOyAgLy8vXG4gIH1cbiAgXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgc3VwZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7ICAvLy9cblxuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBzdXBlci5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIG1hcmtlclBhdGggPSBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgIHN1cGVyLmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGFkZEZpbGVQYXRoID0gdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIHJlbW92ZUZpbGVQYXRoID0gdGhpcy5yZW1vdmVGaWxlUGF0aC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGFkZERpcmVjdG9yeVBhdGggPSB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZW1vdmVEaXJlY3RvcnlQYXRoID0gdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZS5iaW5kKHRoaXMpLCAgLy8vXG5cdFx0XHRcdCAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBhZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkgPSB0aGlzLmFkZE1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuXHRcdFx0XHQgIHJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSA9IHRoaXMucmVtb3ZlTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG5cdFx0XHRcdCAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc01hcmtlZC5iaW5kKHRoaXMpLCAgLy8vXG5cdFx0XHRcdCAgZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSwgIC8vL1xuXHRcdFx0XHQgIHJldHJpZXZlRmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMuYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoe1xuICAgICAgYWRkRmlsZVBhdGgsXG4gICAgICByZW1vdmVGaWxlUGF0aCxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGgsXG4gICAgICByZW1vdmVEaXJlY3RvcnlQYXRoLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSxcbiAgICAgIHJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSxcbiAgICAgIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCxcbiAgICAgIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lLFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==