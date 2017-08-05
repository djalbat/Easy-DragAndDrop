'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary');

var options = require('../../../options'),
    DirectoryNameDraggableEntry = require('../../draggableEntry/directoryName');

var path = necessary.path,
    pathWithoutTopmostDirectoryNameFromPath = path.pathWithoutTopmostDirectoryNameFromPath;

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
      var recognised = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutTopmostDirectoryName !== null) {
        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutTopmostDirectoryName, recognised);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutTopmostDirectoryName, collapsed);
      }
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
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

      if (noDraggingIntoSubdirectories) {
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
        retrieveFilePaths: this.retrieveFilePaths.bind(this)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lL3RvcG1vc3QuanMiXSwibmFtZXMiOlsibmVjZXNzYXJ5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoIiwicmVjb2duaXNlZCIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZVBhdGgiLCJiaW5kIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGREaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmUiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsImFkZE1hcmtlckVudHJ5IiwicmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwicmVtb3ZlTWFya2VyRW50cnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJpc01hcmtlZCIsImdldFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZ2V0TmFtZSIsInJldHJpZXZlRmlsZVBhdGhzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLGtCQUFSLENBQWhCO0FBQUEsSUFDTUUsOEJBQThCRixRQUFRLG9DQUFSLENBRHBDOztBQUdNLElBQUVHLElBQUYsR0FBV0osU0FBWCxDQUFFSSxJQUFGO0FBQUEsSUFDRUMsdUNBREYsR0FDOENELElBRDlDLENBQ0VDLHVDQURGOztJQUdBQyxrQzs7Ozs7Ozs7Ozs7K0JBQ087QUFDVCxhQUFPLElBQVAsQ0FEUyxDQUNLO0FBQ2Y7OzsyREFFc0M7QUFDckMsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FFV0MsUSxFQUE2QjtBQUFBLFVBQW5CQyxVQUFtQix1RUFBTixJQUFNOztBQUN2QyxVQUFNQyxzQ0FBc0NKLHdDQUF3Q0UsUUFBeEMsQ0FBNUM7O0FBRUEsVUFBSUUsd0NBQXdDLElBQTVDLEVBQWtEO0FBQ2hELDRLQUFrQkEsbUNBQWxCLEVBQXVERCxVQUF2RDtBQUNEO0FBQ0Y7OztxQ0FFZ0JFLGEsRUFBa0M7QUFBQSxVQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDakQsVUFBTUMsMkNBQTJDUCx3Q0FBd0NLLGFBQXhDLENBQWpEOztBQUVBLFVBQUlFLDZDQUE2QyxJQUFqRCxFQUF1RDtBQUNyRCxpTEFBdUJBLHdDQUF2QixFQUFpRUQsU0FBakU7QUFDRDtBQUNGOzs7bUNBRWNKLFEsRUFBVTtBQUN2QixVQUFNRSxzQ0FBc0NKLHdDQUF3Q0UsUUFBeEMsQ0FBNUM7O0FBRUEsVUFBSUUsd0NBQXdDLElBQTVDLEVBQWtEO0FBQ2hELCtLQUFxQkEsbUNBQXJCO0FBQ0Q7QUFDRjs7O3dDQUVtQkMsYSxFQUFlO0FBQ2pDLFVBQU1FLDJDQUEyQ1Asd0NBQXdDSyxhQUF4QyxDQUFqRDs7QUFFQSxVQUFJRSw2Q0FBNkMsSUFBakQsRUFBdUQ7QUFDckQsb0xBQTBCQSx3Q0FBMUI7QUFDRDtBQUNGOzs7aUZBRTREQyxjLEVBQWdCO0FBQzNFLFVBQUlDLDZEQUFKOztBQUVBLFVBQU1DLFdBQVcsS0FBS0MsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLCtCQUErQkYsU0FBU0csU0FBVCxDQUFtQmhCLFFBQVFpQixnQ0FBM0IsQ0FEckM7O0FBR0EsVUFBSUYsNEJBQUosRUFBa0M7QUFDaEMsWUFBTUcsNEJBQTRCLEtBQUtDLDJCQUFMLENBQWlDUixjQUFqQyxDQUFsQzs7QUFFQUMsK0RBQXVETSw0QkFDckQsSUFEcUQsR0FFbkQsSUFGSjtBQUdELE9BTkQsTUFNTztBQUNMTixvUkFBMEhELGNBQTFIO0FBQ0Q7O0FBRUQsYUFBT0Msb0RBQVA7QUFDRDs7O21DQUVjUSxVLEVBQVlDLGtCLEVBQW9CO0FBQzdDLFVBQU1DLHdDQUF3Q25CLHdDQUF3Q2lCLFVBQXhDLENBQTlDOztBQUVBLDZLQUFxQkUscUNBQXJCLEVBQTRERCxrQkFBNUQ7QUFDRDs7O29DQUVlO0FBQ2QsYUFBUTtBQUNORSxxQkFBYSxLQUFLQSxXQUFMLENBQWlCQyxJQUFqQixDQUFzQixJQUF0QixDQURQO0FBRU5DLHdCQUFnQixLQUFLQSxjQUFMLENBQW9CRCxJQUFwQixDQUF5QixJQUF6QixDQUZWO0FBR05FLDBCQUFrQixLQUFLQSxnQkFBTCxDQUFzQkYsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FIWjtBQUlORyw2QkFBcUIsS0FBS0EsbUJBQUwsQ0FBeUJILElBQXpCLENBQThCLElBQTlCLENBSmY7QUFLTkksb0NBQTRCLEtBQUtBLDBCQUFMLENBQWdDSixJQUFoQyxDQUFxQyxJQUFyQyxDQUx0QjtBQU1OSyxvREFBNEMsS0FBS0MsUUFBTCxDQUFjTixJQUFkLENBQW1CLElBQW5CLENBTnRDLEVBTWlFO0FBQ3ZFTyxtREFBMkMsS0FBS0EseUNBQUwsQ0FBK0NQLElBQS9DLENBQW9ELElBQXBELENBUHJDO0FBUU5RLHNFQUE4RCxLQUFLQSw0REFBTCxDQUFrRVIsSUFBbEUsQ0FBdUUsSUFBdkUsQ0FSeEQ7QUFTTlMsMERBQWtELEtBQUtDLGNBQUwsQ0FBb0JWLElBQXBCLENBQXlCLElBQXpCLENBVDVDLEVBUzRFO0FBQ2xGVyw2REFBcUQsS0FBS0MsaUJBQUwsQ0FBdUJaLElBQXZCLENBQTRCLElBQTVCLENBVi9DLEVBVWtGO0FBQ3hGYSxvREFBNEMsS0FBS0MsUUFBTCxDQUFjZCxJQUFkLENBQW1CLElBQW5CLENBWHRDLEVBV2lFO0FBQ3ZFZSxpQ0FBeUIsS0FBS0MsT0FBTCxDQUFhaEIsSUFBYixDQUFrQixJQUFsQixDQVpuQixFQVk2QztBQUNuRGlCLDJCQUFtQixLQUFLQSxpQkFBTCxDQUF1QmpCLElBQXZCLENBQTRCLElBQTVCO0FBYmIsT0FBUjtBQWVEOzs7bUNBRXFCa0IsVSxFQUFZO0FBQUUsYUFBT3pDLDRCQUE0QjBDLGNBQTVCLENBQTJDdkMsa0NBQTNDLEVBQStFc0MsVUFBL0UsQ0FBUDtBQUFvRzs7OztFQXBGekZ6QywyQjs7QUF1RmpEMkMsT0FBT0MsT0FBUCxHQUFpQnpDLGtDQUFqQiIsImZpbGUiOiJ0b3Btb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uL29wdGlvbnMnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeU5hbWUnKTtcblxuY29uc3QgeyBwYXRoIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aDtcblxuY2xhc3MgVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB7XG4gIHJldHJpZXZlKCkge1xuICAgIHJldHVybiB0aGlzOyAgLy8vXG4gIH1cbiAgXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoLCByZWNvZ25pc2VkID0gdHJ1ZSkge1xuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlY29nbmlzZWQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG5cbiAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllcykge1xuICAgICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgP1xuICAgICAgICB0aGlzIDpcbiAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gc3VwZXIucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICByZXR1cm4gKHtcbiAgICAgIGFkZEZpbGVQYXRoOiB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICByZW1vdmVGaWxlUGF0aDogdGhpcy5yZW1vdmVGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aDogdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZW1vdmVEaXJlY3RvcnlQYXRoOiB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoOiB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIGFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeTogdGhpcy5hZGRNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIHJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeTogdGhpcy5yZW1vdmVNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZDogdGhpcy5pc01hcmtlZC5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZTogdGhpcy5nZXROYW1lLmJpbmQodGhpcyksICAvLy9cbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzOiB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcylcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgcHJvcGVydGllcyk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuIl19