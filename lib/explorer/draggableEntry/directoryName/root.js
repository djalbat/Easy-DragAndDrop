'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary');

var options = require('../../../options'),
    DirectoryNameDraggableEntry = require('../../draggableEntry/directoryName');

var path = necessary.path;

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

      var filePathWithoutRootDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutRootDirectoryName, recognised);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var directoryPathWithoutRootDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var filePathWithoutRootDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'removeFilePath', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var directoryPathWithoutRootDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

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
      var markerPathWithoutRootDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(markerPath);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lL3Jvb3QuanMiXSwibmFtZXMiOlsibmVjZXNzYXJ5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwiUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoIiwicmVjb2duaXNlZCIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZVBhdGgiLCJiaW5kIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGREaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmUiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFkZFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsImFkZE1hcmtlckVudHJ5IiwicmVtb3ZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwicmVtb3ZlTWFya2VyRW50cnkiLCJpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJpc01hcmtlZCIsImdldFJvb3REaXJlY3RvcnlOYW1lIiwiZ2V0TmFtZSIsInJldHJpZXZlRmlsZVBhdGhzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLGtCQUFSLENBQWhCO0FBQUEsSUFDTUUsOEJBQThCRixRQUFRLG9DQUFSLENBRHBDOztJQUdRRyxJLEdBQVNKLFMsQ0FBVEksSTs7SUFFRkMsK0I7Ozs7Ozs7Ozs7OytCQUNPO0FBQ1QsYUFBTyxJQUFQLENBRFMsQ0FDSztBQUNmOzs7d0RBRW1DO0FBQ2xDLGFBQU8sSUFBUDtBQUNEOzs7Z0NBRVdDLFEsRUFBNkI7QUFBQSxVQUFuQkMsVUFBbUIsdUVBQU4sSUFBTTs7QUFDdkMsVUFBTUMsbUNBQW1DSixLQUFLSyx1Q0FBTCxDQUE2Q0gsUUFBN0MsQ0FBekM7O0FBRUEsVUFBSUUscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLHNLQUFrQkEsZ0NBQWxCLEVBQW9ERCxVQUFwRDtBQUNEO0FBQ0Y7OztxQ0FFZ0JHLGEsRUFBa0M7QUFBQSxVQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDakQsVUFBTUMsd0NBQXdDUixLQUFLSyx1Q0FBTCxDQUE2Q0MsYUFBN0MsQ0FBOUM7O0FBRUEsVUFBSUUsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELDJLQUF1QkEscUNBQXZCLEVBQThERCxTQUE5RDtBQUNEO0FBQ0Y7OzttQ0FFY0wsUSxFQUFVO0FBQ3ZCLFVBQU1FLG1DQUFtQ0osS0FBS0ssdUNBQUwsQ0FBNkNILFFBQTdDLENBQXpDOztBQUVBLFVBQUlFLHFDQUFxQyxJQUF6QyxFQUErQztBQUM3Qyx5S0FBcUJBLGdDQUFyQjtBQUNEO0FBQ0Y7Ozt3Q0FFbUJFLGEsRUFBZTtBQUNqQyxVQUFNRSx3Q0FBd0NSLEtBQUtLLHVDQUFMLENBQTZDQyxhQUE3QyxDQUE5Qzs7QUFFQSxVQUFJRSwwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsOEtBQTBCQSxxQ0FBMUI7QUFDRDtBQUNGOzs7aUZBRTREQyxjLEVBQWdCO0FBQzNFLFVBQUlDLDZEQUFKOztBQUVBLFVBQU1DLFdBQVcsS0FBS0MsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLCtCQUErQkYsU0FBU0csU0FBVCxDQUFtQmhCLFFBQVFpQixnQ0FBM0IsQ0FEckM7O0FBR0EsVUFBSUYsNEJBQUosRUFBa0M7QUFDaEMsWUFBTUcsNEJBQTRCLEtBQUtDLDJCQUFMLENBQWlDUixjQUFqQyxDQUFsQzs7QUFFQUMsK0RBQXVETSw0QkFDckQsSUFEcUQsR0FFbkQsSUFGSjtBQUdELE9BTkQsTUFNTztBQUNMTiw4UUFBMEhELGNBQTFIO0FBQ0Q7O0FBRUQsYUFBT0Msb0RBQVA7QUFDRDs7O21DQUVjUSxVLEVBQVlDLGtCLEVBQW9CO0FBQzdDLFVBQU1DLHFDQUFxQ3BCLEtBQUtLLHVDQUFMLENBQTZDYSxVQUE3QyxDQUEzQzs7QUFFQSx1S0FBcUJFLGtDQUFyQixFQUF5REQsa0JBQXpEO0FBQ0Q7OztvQ0FFZTtBQUNkLGFBQVE7QUFDTkUscUJBQWEsS0FBS0EsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FEUDtBQUVOQyx3QkFBZ0IsS0FBS0EsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBeUIsSUFBekIsQ0FGVjtBQUdORSwwQkFBa0IsS0FBS0EsZ0JBQUwsQ0FBc0JGLElBQXRCLENBQTJCLElBQTNCLENBSFo7QUFJTkcsNkJBQXFCLEtBQUtBLG1CQUFMLENBQXlCSCxJQUF6QixDQUE4QixJQUE5QixDQUpmO0FBS05JLG9DQUE0QixLQUFLQSwwQkFBTCxDQUFnQ0osSUFBaEMsQ0FBcUMsSUFBckMsQ0FMdEI7QUFNTkssaURBQXlDLEtBQUtDLFFBQUwsQ0FBY04sSUFBZCxDQUFtQixJQUFuQixDQU5uQyxFQU04RDtBQUNwRU8sbURBQTJDLEtBQUtBLHlDQUFMLENBQStDUCxJQUEvQyxDQUFvRCxJQUFwRCxDQVByQztBQVFOUSxzRUFBOEQsS0FBS0EsNERBQUwsQ0FBa0VSLElBQWxFLENBQXVFLElBQXZFLENBUnhEO0FBU05TLHVEQUErQyxLQUFLQyxjQUFMLENBQW9CVixJQUFwQixDQUF5QixJQUF6QixDQVR6QyxFQVN5RTtBQUMvRVcsMERBQWtELEtBQUtDLGlCQUFMLENBQXVCWixJQUF2QixDQUE0QixJQUE1QixDQVY1QyxFQVUrRTtBQUNyRmEsaURBQXlDLEtBQUtDLFFBQUwsQ0FBY2QsSUFBZCxDQUFtQixJQUFuQixDQVhuQyxFQVc4RDtBQUNwRWUsOEJBQXNCLEtBQUtDLE9BQUwsQ0FBYWhCLElBQWIsQ0FBa0IsSUFBbEIsQ0FaaEIsRUFZMEM7QUFDaERpQiwyQkFBbUIsS0FBS0EsaUJBQUwsQ0FBdUJqQixJQUF2QixDQUE0QixJQUE1QjtBQWJiLE9BQVI7QUFlRDs7O21DQUVxQmtCLFUsRUFBWTtBQUFFLGFBQU96Qyw0QkFBNEIwQyxjQUE1QixDQUEyQ3hDLCtCQUEzQyxFQUE0RXVDLFVBQTVFLENBQVA7QUFBaUc7Ozs7RUFwRnpGekMsMkI7O0FBdUY5QzJDLE9BQU9DLE9BQVAsR0FBaUIxQywrQkFBakIiLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgcGF0aCB9ID0gbmVjZXNzYXJ5O1xuXG5jbGFzcyBSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IHtcbiAgcmV0cmlldmUoKSB7XG4gICAgcmV0dXJuIHRoaXM7ICAvLy9cbiAgfVxuICBcbiAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgsIHJlY29nbmlzZWQgPSB0cnVlKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZWNvZ25pc2VkKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGgucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGgucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID9cbiAgICAgICAgdGhpcyA6XG4gICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICByZXR1cm4gKHtcbiAgICAgIGFkZEZpbGVQYXRoOiB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICByZW1vdmVGaWxlUGF0aDogdGhpcy5yZW1vdmVGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aDogdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZW1vdmVEaXJlY3RvcnlQYXRoOiB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoOiB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIGFkZFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeTogdGhpcy5hZGRNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIHJlbW92ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeTogdGhpcy5yZW1vdmVNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIGlzUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZDogdGhpcy5pc01hcmtlZC5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRSb290RGlyZWN0b3J5TmFtZTogdGhpcy5nZXROYW1lLmJpbmQodGhpcyksICAvLy9cbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzOiB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcylcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcyk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuIl19