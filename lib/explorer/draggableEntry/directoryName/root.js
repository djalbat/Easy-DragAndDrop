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
    value: function addFilePath(filePath, recognised, hidden) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutRootDirectoryName, recognised, hidden);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed, hidden) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lL3Jvb3QuanMiXSwibmFtZXMiOlsib3B0aW9ucyIsInJlcXVpcmUiLCJwYXRoVXRpbCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIlJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsInJlY29nbmlzZWQiLCJoaWRkZW4iLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImFkZEZpbGVQYXRoIiwiYmluZCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlIiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeSIsInJlbW92ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNNYXJrZWQiLCJnZXRSb290RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJyZXRyaWV2ZUZpbGVQYXRocyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVQyxRQUFRLGtCQUFSLENBQWhCO0FBQUEsSUFDTUMsV0FBV0QsUUFBUSxvQkFBUixDQURqQjtBQUFBLElBRU1FLDhCQUE4QkYsUUFBUSxvQ0FBUixDQUZwQzs7SUFJTUcsK0I7Ozs7Ozs7Ozs7OytCQUNPO0FBQ1QsYUFBTyxJQUFQLENBRFMsQ0FDSztBQUNmOzs7d0RBRW1DO0FBQ2xDLGFBQU8sSUFBUDtBQUNEOzs7Z0NBRVdDLFEsRUFBVUMsVSxFQUFZQyxNLEVBQVE7QUFDeEMsVUFBTUMsbUNBQW1DTixTQUFTTyx1Q0FBVCxDQUFpREosUUFBakQsQ0FBekM7O0FBRUEsVUFBSUcscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLHNLQUFrQkEsZ0NBQWxCLEVBQW9ERixVQUFwRCxFQUFnRUMsTUFBaEU7QUFDRDtBQUNGOzs7cUNBRWdCRyxhLEVBQWVDLFMsRUFBV0osTSxFQUFRO0FBQ2pELFVBQU1LLHdDQUF3Q1YsU0FBU08sdUNBQVQsQ0FBaURDLGFBQWpELENBQTlDOztBQUVBLFVBQUlFLDBDQUEwQyxJQUE5QyxFQUFvRDtBQUNsRCwyS0FBdUJBLHFDQUF2QixFQUE4REQsU0FBOUQsRUFBeUVKLE1BQXpFO0FBQ0Q7QUFDRjs7O21DQUVjRixRLEVBQVU7QUFDdkIsVUFBTUcsbUNBQW1DTixTQUFTTyx1Q0FBVCxDQUFpREosUUFBakQsQ0FBekM7O0FBRUEsVUFBSUcscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLHlLQUFxQkEsZ0NBQXJCO0FBQ0Q7QUFDRjs7O3dDQUVtQkUsYSxFQUFlO0FBQ2pDLFVBQU1FLHdDQUF3Q1YsU0FBU08sdUNBQVQsQ0FBaURDLGFBQWpELENBQTlDOztBQUVBLFVBQUlFLDBDQUEwQyxJQUE5QyxFQUFvRDtBQUNsRCw4S0FBMEJBLHFDQUExQjtBQUNEO0FBQ0Y7OztpRkFFNERDLGMsRUFBZ0I7QUFDM0UsVUFBSUMsNkRBQUo7O0FBRUEsVUFBTUMsV0FBVyxLQUFLQyxXQUFMLEVBQWpCO0FBQUEsVUFDTUMsK0JBQStCRixTQUFTRyxTQUFULENBQW1CbEIsUUFBUW1CLGdDQUEzQixDQURyQzs7QUFHQSxVQUFJRiw0QkFBSixFQUFrQztBQUNoQyxZQUFNRyw0QkFBNEIsS0FBS0MsMkJBQUwsQ0FBaUNSLGNBQWpDLENBQWxDOztBQUVBQywrREFBdURNLDRCQUNyRCxJQURxRCxHQUVuRCxJQUZKO0FBR0QsT0FORCxNQU1PO0FBQ0xOLDhRQUEwSEQsY0FBMUg7QUFDRDs7QUFFRCxhQUFPQyxvREFBUDtBQUNEOzs7bUNBRWNRLFUsRUFBWUMsa0IsRUFBb0I7QUFDN0MsVUFBTUMscUNBQXFDdEIsU0FBU08sdUNBQVQsQ0FBaURhLFVBQWpELENBQTNDOztBQUVBLHVLQUFxQkUsa0NBQXJCLEVBQXlERCxrQkFBekQ7QUFDRDs7O29DQUVlO0FBQ2QsYUFBUTtBQUNORSxxQkFBYSxLQUFLQSxXQUFMLENBQWlCQyxJQUFqQixDQUFzQixJQUF0QixDQURQO0FBRU5DLHdCQUFnQixLQUFLQSxjQUFMLENBQW9CRCxJQUFwQixDQUF5QixJQUF6QixDQUZWO0FBR05FLDBCQUFrQixLQUFLQSxnQkFBTCxDQUFzQkYsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FIWjtBQUlORyw2QkFBcUIsS0FBS0EsbUJBQUwsQ0FBeUJILElBQXpCLENBQThCLElBQTlCLENBSmY7QUFLTkksb0NBQTRCLEtBQUtBLDBCQUFMLENBQWdDSixJQUFoQyxDQUFxQyxJQUFyQyxDQUx0QjtBQU1OSyxpREFBeUMsS0FBS0MsUUFBTCxDQUFjTixJQUFkLENBQW1CLElBQW5CLENBTm5DLEVBTThEO0FBQ3BFTyxtREFBMkMsS0FBS0EseUNBQUwsQ0FBK0NQLElBQS9DLENBQW9ELElBQXBELENBUHJDO0FBUU5RLHNFQUE4RCxLQUFLQSw0REFBTCxDQUFrRVIsSUFBbEUsQ0FBdUUsSUFBdkUsQ0FSeEQ7QUFTTlMsdURBQStDLEtBQUtDLGNBQUwsQ0FBb0JWLElBQXBCLENBQXlCLElBQXpCLENBVHpDLEVBU3lFO0FBQy9FVywwREFBa0QsS0FBS0MsaUJBQUwsQ0FBdUJaLElBQXZCLENBQTRCLElBQTVCLENBVjVDLEVBVStFO0FBQ3JGYSxpREFBeUMsS0FBS0MsUUFBTCxDQUFjZCxJQUFkLENBQW1CLElBQW5CLENBWG5DLEVBVzhEO0FBQ3BFZSw4QkFBc0IsS0FBS0MsT0FBTCxDQUFhaEIsSUFBYixDQUFrQixJQUFsQixDQVpoQixFQVkwQztBQUNoRGlCLDJCQUFtQixLQUFLQSxpQkFBTCxDQUF1QmpCLElBQXZCLENBQTRCLElBQTVCO0FBYmIsT0FBUjtBQWVEOzs7bUNBRXFCa0IsVSxFQUFZO0FBQUUsYUFBT3pDLDRCQUE0QjBDLGNBQTVCLENBQTJDekMsK0JBQTNDLEVBQTRFd0MsVUFBNUUsQ0FBUDtBQUFpRzs7OztFQXBGekZ6QywyQjs7QUF1RjlDMkMsT0FBT0MsT0FBUCxHQUFpQjNDLCtCQUFqQiIsImZpbGUiOiJyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vLi4vLi4vb3B0aW9ucycpLFxuICAgICAgcGF0aFV0aWwgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlsL3BhdGgnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeU5hbWUnKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB7XG4gIHJldHJpZXZlKCkge1xuICAgIHJldHVybiB0aGlzOyAgLy8vXG4gIH1cbiAgXG4gIGlzUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoLCByZWNvZ25pc2VkLCBoaWRkZW4pIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZWNvZ25pc2VkLCBoaWRkZW4pO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkLCBoaWRkZW4pIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBoaWRkZW4pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA/XG4gICAgICAgIHRoaXMgOlxuICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBzdXBlci5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIHN1cGVyLmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIHJldHVybiAoe1xuICAgICAgYWRkRmlsZVBhdGg6IHRoaXMuYWRkRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZUZpbGVQYXRoOiB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICBhZGREaXJlY3RvcnlQYXRoOiB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGg6IHRoaXMucmVtb3ZlRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGg6IHRoaXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgYWRkUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5OiB0aGlzLmFkZE1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuICAgICAgcmVtb3ZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5OiB0aGlzLnJlbW92ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuICAgICAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkOiB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFJvb3REaXJlY3RvcnlOYW1lOiB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgcmV0cmlldmVGaWxlUGF0aHM6IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=