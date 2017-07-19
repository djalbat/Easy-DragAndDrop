'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = require('../../../options'),
    pathUtil = require('../../../util/path'),
    DirectoryNameDraggableEntry = require('../../draggableEntry/directoryName');

var RootDirectoryNameDraggableEntry = function (_DirectoryNameDraggab) {
  _inherits(RootDirectoryNameDraggableEntry, _DirectoryNameDraggab);

  function RootDirectoryNameDraggableEntry() {
    _classCallCheck(this, RootDirectoryNameDraggableEntry);

    return _possibleConstructorReturn(this, (RootDirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry)).apply(this, arguments));
  }

  _createClass(RootDirectoryNameDraggableEntry, [{
    key: 'retrieve',
    value: function retrieve() {
      return this; ///
    }
  }, {
    key: 'isRootDirectoryNameDraggableEntry',
    value: function isRootDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var recognised = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var hidden = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutRootDirectoryName, recognised, hidden);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var hidden = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutRootDirectoryName, collapsed, hidden);
      }
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'removeFilePath', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'removeDirectoryPath', this).call(this, directoryPathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = void 0;

      var explorer = this.getExplorer(),
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

      if (noDraggingIntoSubdirectories) {
        var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

        directoryNameDraggableEntryOverlappingDraggableEntry = overlappingDraggableEntry ? this : null;
      } else {
        directoryNameDraggableEntryOverlappingDraggableEntry = _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry', this).call(this, draggableEntry);
      }

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(markerPath);

      _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addMarkerEntry', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
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
        retrieveRootDirectoryNameDraggableEntry: this.retrieve.bind(this), ///
        retrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
        retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
        addRootDirectoryNameDraggableEntryMarkerEntry: this.addMarkerEntry.bind(this), ///
        removeRootDirectoryNameDraggableEntryMarkerEntry: this.removeMarkerEntry.bind(this), ///
        isRootDirectoryNameDraggableEntryMarked: this.isMarked.bind(this), ///
        getRootDirectoryName: this.getName.bind(this), ///
        retrieveFilePaths: this.retrieveFilePaths.bind(this)
      };
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return DirectoryNameDraggableEntry.fromProperties(RootDirectoryNameDraggableEntry, properties);
    }
  }]);

  return RootDirectoryNameDraggableEntry;
}(DirectoryNameDraggableEntry);

module.exports = RootDirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lL3Jvb3QuanMiXSwibmFtZXMiOlsib3B0aW9ucyIsInJlcXVpcmUiLCJwYXRoVXRpbCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIlJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsInJlY29nbmlzZWQiLCJoaWRkZW4iLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImFkZEZpbGVQYXRoIiwiYmluZCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlIiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeSIsInJlbW92ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNNYXJrZWQiLCJnZXRSb290RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJyZXRyaWV2ZUZpbGVQYXRocyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVQyxRQUFRLGtCQUFSLENBQWhCO0FBQUEsSUFDTUMsV0FBV0QsUUFBUSxvQkFBUixDQURqQjtBQUFBLElBRU1FLDhCQUE4QkYsUUFBUSxvQ0FBUixDQUZwQzs7SUFJTUcsK0I7Ozs7Ozs7Ozs7OytCQUNPO0FBQ1QsYUFBTyxJQUFQLENBRFMsQ0FDSztBQUNmOzs7d0RBRW1DO0FBQ2xDLGFBQU8sSUFBUDtBQUNEOzs7Z0NBRVdDLFEsRUFBNkM7QUFBQSxVQUFuQ0MsVUFBbUMsdUVBQXRCLElBQXNCO0FBQUEsVUFBaEJDLE1BQWdCLHVFQUFQLEtBQU87O0FBQ3ZELFVBQU1DLG1DQUFtQ04sU0FBU08sdUNBQVQsQ0FBaURKLFFBQWpELENBQXpDOztBQUVBLFVBQUlHLHFDQUFxQyxJQUF6QyxFQUErQztBQUM3QyxzS0FBa0JBLGdDQUFsQixFQUFvREYsVUFBcEQsRUFBZ0VDLE1BQWhFO0FBQ0Q7QUFDRjs7O3FDQUVnQkcsYSxFQUFrRDtBQUFBLFVBQW5DQyxTQUFtQyx1RUFBdkIsS0FBdUI7QUFBQSxVQUFoQkosTUFBZ0IsdUVBQVAsS0FBTzs7QUFDakUsVUFBTUssd0NBQXdDVixTQUFTTyx1Q0FBVCxDQUFpREMsYUFBakQsQ0FBOUM7O0FBRUEsVUFBSUUsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELDJLQUF1QkEscUNBQXZCLEVBQThERCxTQUE5RCxFQUF5RUosTUFBekU7QUFDRDtBQUNGOzs7bUNBRWNGLFEsRUFBVTtBQUN2QixVQUFNRyxtQ0FBbUNOLFNBQVNPLHVDQUFULENBQWlESixRQUFqRCxDQUF6Qzs7QUFFQSxVQUFJRyxxQ0FBcUMsSUFBekMsRUFBK0M7QUFDN0MseUtBQXFCQSxnQ0FBckI7QUFDRDtBQUNGOzs7d0NBRW1CRSxhLEVBQWU7QUFDakMsVUFBTUUsd0NBQXdDVixTQUFTTyx1Q0FBVCxDQUFpREMsYUFBakQsQ0FBOUM7O0FBRUEsVUFBSUUsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELDhLQUEwQkEscUNBQTFCO0FBQ0Q7QUFDRjs7O2lGQUU0REMsYyxFQUFnQjtBQUMzRSxVQUFJQyw2REFBSjs7QUFFQSxVQUFNQyxXQUFXLEtBQUtDLFdBQUwsRUFBakI7QUFBQSxVQUNNQywrQkFBK0JGLFNBQVNHLFNBQVQsQ0FBbUJsQixRQUFRbUIsZ0NBQTNCLENBRHJDOztBQUdBLFVBQUlGLDRCQUFKLEVBQWtDO0FBQ2hDLFlBQU1HLDRCQUE0QixLQUFLQywyQkFBTCxDQUFpQ1IsY0FBakMsQ0FBbEM7O0FBRUFDLCtEQUF1RE0sNEJBQ3JELElBRHFELEdBRW5ELElBRko7QUFHRCxPQU5ELE1BTU87QUFDTE4sOFFBQTBIRCxjQUExSDtBQUNEOztBQUVELGFBQU9DLG9EQUFQO0FBQ0Q7OzttQ0FFY1EsVSxFQUFZQyxrQixFQUFvQjtBQUM3QyxVQUFNQyxxQ0FBcUN0QixTQUFTTyx1Q0FBVCxDQUFpRGEsVUFBakQsQ0FBM0M7O0FBRUEsdUtBQXFCRSxrQ0FBckIsRUFBeURELGtCQUF6RDtBQUNEOzs7b0NBRWU7QUFDZCxhQUFRO0FBQ05FLHFCQUFhLEtBQUtBLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLENBRFA7QUFFTkMsd0JBQWdCLEtBQUtBLGNBQUwsQ0FBb0JELElBQXBCLENBQXlCLElBQXpCLENBRlY7QUFHTkUsMEJBQWtCLEtBQUtBLGdCQUFMLENBQXNCRixJQUF0QixDQUEyQixJQUEzQixDQUhaO0FBSU5HLDZCQUFxQixLQUFLQSxtQkFBTCxDQUF5QkgsSUFBekIsQ0FBOEIsSUFBOUIsQ0FKZjtBQUtOSSxvQ0FBNEIsS0FBS0EsMEJBQUwsQ0FBZ0NKLElBQWhDLENBQXFDLElBQXJDLENBTHRCO0FBTU5LLGlEQUF5QyxLQUFLQyxRQUFMLENBQWNOLElBQWQsQ0FBbUIsSUFBbkIsQ0FObkMsRUFNOEQ7QUFDcEVPLG1EQUEyQyxLQUFLQSx5Q0FBTCxDQUErQ1AsSUFBL0MsQ0FBb0QsSUFBcEQsQ0FQckM7QUFRTlEsc0VBQThELEtBQUtBLDREQUFMLENBQWtFUixJQUFsRSxDQUF1RSxJQUF2RSxDQVJ4RDtBQVNOUyx1REFBK0MsS0FBS0MsY0FBTCxDQUFvQlYsSUFBcEIsQ0FBeUIsSUFBekIsQ0FUekMsRUFTeUU7QUFDL0VXLDBEQUFrRCxLQUFLQyxpQkFBTCxDQUF1QlosSUFBdkIsQ0FBNEIsSUFBNUIsQ0FWNUMsRUFVK0U7QUFDckZhLGlEQUF5QyxLQUFLQyxRQUFMLENBQWNkLElBQWQsQ0FBbUIsSUFBbkIsQ0FYbkMsRUFXOEQ7QUFDcEVlLDhCQUFzQixLQUFLQyxPQUFMLENBQWFoQixJQUFiLENBQWtCLElBQWxCLENBWmhCLEVBWTBDO0FBQ2hEaUIsMkJBQW1CLEtBQUtBLGlCQUFMLENBQXVCakIsSUFBdkIsQ0FBNEIsSUFBNUI7QUFiYixPQUFSO0FBZUQ7OzttQ0FFcUJrQixVLEVBQVk7QUFBRSxhQUFPekMsNEJBQTRCMEMsY0FBNUIsQ0FBMkN6QywrQkFBM0MsRUFBNEV3QyxVQUE1RSxDQUFQO0FBQWlHOzs7O0VBcEZ6RnpDLDJCOztBQXVGOUMyQyxPQUFPQyxPQUFQLEdBQWlCM0MsK0JBQWpCIiwiZmlsZSI6InJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBwYXRoVXRpbCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWwvcGF0aCcpLFxuICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5TmFtZScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IHtcbiAgcmV0cmlldmUoKSB7XG4gICAgcmV0dXJuIHRoaXM7ICAvLy9cbiAgfVxuICBcbiAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgsIHJlY29nbmlzZWQgPSB0cnVlLCBoaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIHJlY29nbmlzZWQsIGhpZGRlbik7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQgPSBmYWxzZSwgaGlkZGVuID0gZmFsc2UpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBoaWRkZW4pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA/XG4gICAgICAgIHRoaXMgOlxuICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBzdXBlci5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIHN1cGVyLmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIHJldHVybiAoe1xuICAgICAgYWRkRmlsZVBhdGg6IHRoaXMuYWRkRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZUZpbGVQYXRoOiB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICBhZGREaXJlY3RvcnlQYXRoOiB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGg6IHRoaXMucmVtb3ZlRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGg6IHRoaXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgYWRkUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5OiB0aGlzLmFkZE1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuICAgICAgcmVtb3ZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5OiB0aGlzLnJlbW92ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuICAgICAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkOiB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFJvb3REaXJlY3RvcnlOYW1lOiB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgcmV0cmlldmVGaWxlUGF0aHM6IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=