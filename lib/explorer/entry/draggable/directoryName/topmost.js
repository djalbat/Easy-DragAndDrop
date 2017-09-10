'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary');

var options = require('../../../../options'),
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
        fileNameDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutTopmostDirectoryName);
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var directoryNameDraggableEntry = null;

      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        directoryNameDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutTopmostDirectoryName, collapsed);
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutTopmostDirectoryName !== null) {
        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'removeFilePath', this).call(this, filePathWithoutTopmostDirectoryName);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'removeDirectoryPath', this).call(this, directoryPathWithoutTopmostDirectoryName);
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

      _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addMarkerEntry', this).call(this, markerPathWithoutTopmostDirectoryName, draggableEntryType);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      return {
        addFilePath: this.addFilePath.bind(this),
        removeFilePath: this.removeFilePath.bind(this),
        addDirectoryPath: this.addDirectoryPath.bind(this),
        removeDirectoryPath: this.removeDirectoryPath.bind(this),
        retrieveDraggableEntryPath: this.retrieveDraggableEntryPath.bind(this),
        retrieveTopmostDirectoryNameDraggableEntry: this.retrieve.bind(this), ///
        retrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
        retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
        addTopmostDirectoryNameDraggableEntryMarkerEntry: this.addMarkerEntry.bind(this), ///
        removeTopmostDirectoryNameDraggableEntryMarkerEntry: this.removeMarkerEntry.bind(this), ///
        isTopmostDirectoryNameDraggableEntryMarked: this.isMarked.bind(this), ///
        getTopmostDirectoryName: this.getName.bind(this), ///
        retrieveFilePaths: this.retrieveFilePaths.bind(this),
        retrieveDirectoryPaths: this.retrieveDirectoryPaths.bind(this)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS90b3Btb3N0LmpzIl0sIm5hbWVzIjpbIm5lY2Vzc2FyeSIsInJlcXVpcmUiLCJvcHRpb25zIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlUGF0aCIsImJpbmQiLCJyZW1vdmVGaWxlUGF0aCIsImFkZERpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwiYWRkTWFya2VyRW50cnkiLCJyZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJnZXROYW1lIiwicmV0cmlldmVGaWxlUGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLHFCQUFSLENBQWhCO0FBQUEsSUFDTUUsOEJBQThCRixRQUFRLHdDQUFSLENBRHBDOztBQUdNLElBQUVHLGFBQUYsR0FBb0JKLFNBQXBCLENBQUVJLGFBQUY7QUFBQSxJQUNFQyxnQ0FERixHQUN1Q0gsT0FEdkMsQ0FDRUcsZ0NBREY7QUFBQSxJQUVFQyx1Q0FGRixHQUU4Q0YsYUFGOUMsQ0FFRUUsdUNBRkY7O0lBSUFDLGtDOzs7Ozs7Ozs7OzsrQkFDTztBQUNULGFBQU8sSUFBUCxDQURTLENBQ0s7QUFDZjs7OzJEQUVzQztBQUNyQyxhQUFPLElBQVA7QUFDRDs7O2dDQUVXQyxRLEVBQVU7QUFDcEIsVUFBSUMseUJBQXlCLElBQTdCOztBQUVBLFVBQU1DLHNDQUFzQ0osd0NBQXdDRSxRQUF4QyxDQUE1Qzs7QUFFQSxVQUFJRSx3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QyxrQ0FBM0MsRUFBK0V1QyxVQUEvRSxDQUFQO0FBQW9HOzs7O0VBN0Z6RjNDLDJCOztBQWdHakQ2QyxPQUFPQyxPQUFQLEdBQWlCMUMsa0NBQWpCIiwiZmlsZSI6InRvcG1vc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vb3B0aW9ucycpLFxuICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUnKTtcblxuY29uc3QgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zLFxuICAgICAgeyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkge1xuICByZXRyaWV2ZSgpIHtcbiAgICByZXR1cm4gdGhpczsgIC8vL1xuICB9XG4gIFxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyRW50cnkobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgcmV0dXJuICh7XG4gICAgICBhZGRGaWxlUGF0aDogdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRmlsZVBhdGg6IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGg6IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aDogdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aDogdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlLmJpbmQodGhpcyksICAvLy9cbiAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBhZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnk6IHRoaXMuYWRkTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICByZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnk6IHRoaXMucmVtb3ZlTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ6IHRoaXMuaXNNYXJrZWQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWU6IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICByZXRyaWV2ZUZpbGVQYXRoczogdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRoczogdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzLmJpbmQodGhpcylcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcyk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuIl19