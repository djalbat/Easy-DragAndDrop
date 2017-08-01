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

      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutRootDirectoryName, recognised);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lL3Jvb3QuanMiXSwibmFtZXMiOlsib3B0aW9ucyIsInJlcXVpcmUiLCJwYXRoVXRpbCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIlJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsInJlY29nbmlzZWQiLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImFkZEZpbGVQYXRoIiwiYmluZCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlIiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeSIsInJlbW92ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNNYXJrZWQiLCJnZXRSb290RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJyZXRyaWV2ZUZpbGVQYXRocyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVQyxRQUFRLGtCQUFSLENBQWhCO0FBQUEsSUFDTUMsV0FBV0QsUUFBUSxvQkFBUixDQURqQjtBQUFBLElBRU1FLDhCQUE4QkYsUUFBUSxvQ0FBUixDQUZwQzs7SUFJTUcsK0I7Ozs7Ozs7Ozs7OytCQUNPO0FBQ1QsYUFBTyxJQUFQLENBRFMsQ0FDSztBQUNmOzs7d0RBRW1DO0FBQ2xDLGFBQU8sSUFBUDtBQUNEOzs7Z0NBRVdDLFEsRUFBNkI7QUFBQSxVQUFuQkMsVUFBbUIsdUVBQU4sSUFBTTs7QUFDdkMsVUFBTUMsbUNBQW1DTCxTQUFTTSx1Q0FBVCxDQUFpREgsUUFBakQsQ0FBekM7O0FBRUEsVUFBSUUscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLHNLQUFrQkEsZ0NBQWxCLEVBQW9ERCxVQUFwRDtBQUNEO0FBQ0Y7OztxQ0FFZ0JHLGEsRUFBa0M7QUFBQSxVQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDakQsVUFBTUMsd0NBQXdDVCxTQUFTTSx1Q0FBVCxDQUFpREMsYUFBakQsQ0FBOUM7O0FBRUEsVUFBSUUsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELDJLQUF1QkEscUNBQXZCLEVBQThERCxTQUE5RDtBQUNEO0FBQ0Y7OzttQ0FFY0wsUSxFQUFVO0FBQ3ZCLFVBQU1FLG1DQUFtQ0wsU0FBU00sdUNBQVQsQ0FBaURILFFBQWpELENBQXpDOztBQUVBLFVBQUlFLHFDQUFxQyxJQUF6QyxFQUErQztBQUM3Qyx5S0FBcUJBLGdDQUFyQjtBQUNEO0FBQ0Y7Ozt3Q0FFbUJFLGEsRUFBZTtBQUNqQyxVQUFNRSx3Q0FBd0NULFNBQVNNLHVDQUFULENBQWlEQyxhQUFqRCxDQUE5Qzs7QUFFQSxVQUFJRSwwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsOEtBQTBCQSxxQ0FBMUI7QUFDRDtBQUNGOzs7aUZBRTREQyxjLEVBQWdCO0FBQzNFLFVBQUlDLDZEQUFKOztBQUVBLFVBQU1DLFdBQVcsS0FBS0MsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLCtCQUErQkYsU0FBU0csU0FBVCxDQUFtQmpCLFFBQVFrQixnQ0FBM0IsQ0FEckM7O0FBR0EsVUFBSUYsNEJBQUosRUFBa0M7QUFDaEMsWUFBTUcsNEJBQTRCLEtBQUtDLDJCQUFMLENBQWlDUixjQUFqQyxDQUFsQzs7QUFFQUMsK0RBQXVETSw0QkFDckQsSUFEcUQsR0FFbkQsSUFGSjtBQUdELE9BTkQsTUFNTztBQUNMTiw4UUFBMEhELGNBQTFIO0FBQ0Q7O0FBRUQsYUFBT0Msb0RBQVA7QUFDRDs7O21DQUVjUSxVLEVBQVlDLGtCLEVBQW9CO0FBQzdDLFVBQU1DLHFDQUFxQ3JCLFNBQVNNLHVDQUFULENBQWlEYSxVQUFqRCxDQUEzQzs7QUFFQSx1S0FBcUJFLGtDQUFyQixFQUF5REQsa0JBQXpEO0FBQ0Q7OztvQ0FFZTtBQUNkLGFBQVE7QUFDTkUscUJBQWEsS0FBS0EsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FEUDtBQUVOQyx3QkFBZ0IsS0FBS0EsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBeUIsSUFBekIsQ0FGVjtBQUdORSwwQkFBa0IsS0FBS0EsZ0JBQUwsQ0FBc0JGLElBQXRCLENBQTJCLElBQTNCLENBSFo7QUFJTkcsNkJBQXFCLEtBQUtBLG1CQUFMLENBQXlCSCxJQUF6QixDQUE4QixJQUE5QixDQUpmO0FBS05JLG9DQUE0QixLQUFLQSwwQkFBTCxDQUFnQ0osSUFBaEMsQ0FBcUMsSUFBckMsQ0FMdEI7QUFNTkssaURBQXlDLEtBQUtDLFFBQUwsQ0FBY04sSUFBZCxDQUFtQixJQUFuQixDQU5uQyxFQU04RDtBQUNwRU8sbURBQTJDLEtBQUtBLHlDQUFMLENBQStDUCxJQUEvQyxDQUFvRCxJQUFwRCxDQVByQztBQVFOUSxzRUFBOEQsS0FBS0EsNERBQUwsQ0FBa0VSLElBQWxFLENBQXVFLElBQXZFLENBUnhEO0FBU05TLHVEQUErQyxLQUFLQyxjQUFMLENBQW9CVixJQUFwQixDQUF5QixJQUF6QixDQVR6QyxFQVN5RTtBQUMvRVcsMERBQWtELEtBQUtDLGlCQUFMLENBQXVCWixJQUF2QixDQUE0QixJQUE1QixDQVY1QyxFQVUrRTtBQUNyRmEsaURBQXlDLEtBQUtDLFFBQUwsQ0FBY2QsSUFBZCxDQUFtQixJQUFuQixDQVhuQyxFQVc4RDtBQUNwRWUsOEJBQXNCLEtBQUtDLE9BQUwsQ0FBYWhCLElBQWIsQ0FBa0IsSUFBbEIsQ0FaaEIsRUFZMEM7QUFDaERpQiwyQkFBbUIsS0FBS0EsaUJBQUwsQ0FBdUJqQixJQUF2QixDQUE0QixJQUE1QjtBQWJiLE9BQVI7QUFlRDs7O21DQUVxQmtCLFUsRUFBWTtBQUFFLGFBQU94Qyw0QkFBNEJ5QyxjQUE1QixDQUEyQ3hDLCtCQUEzQyxFQUE0RXVDLFVBQTVFLENBQVA7QUFBaUc7Ozs7RUFwRnpGeEMsMkI7O0FBdUY5QzBDLE9BQU9DLE9BQVAsR0FBaUIxQywrQkFBakIiLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uL29wdGlvbnMnKSxcbiAgICAgIHBhdGhVdGlsID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbC9wYXRoJyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkge1xuICByZXRyaWV2ZSgpIHtcbiAgICByZXR1cm4gdGhpczsgIC8vL1xuICB9XG4gIFxuICBpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCwgcmVjb2duaXNlZCA9IHRydWUpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZWNvZ25pc2VkKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID9cbiAgICAgICAgdGhpcyA6XG4gICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyRW50cnkobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgcmV0dXJuICh7XG4gICAgICBhZGRGaWxlUGF0aDogdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRmlsZVBhdGg6IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGg6IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aDogdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aDogdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlLmJpbmQodGhpcyksICAvLy9cbiAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBhZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnk6IHRoaXMuYWRkTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICByZW1vdmVSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnk6IHRoaXMucmVtb3ZlTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICBpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ6IHRoaXMuaXNNYXJrZWQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0Um9vdERpcmVjdG9yeU5hbWU6IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICByZXRyaWV2ZUZpbGVQYXRoczogdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==