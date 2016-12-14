'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    options = require('../../options'),
    Directory = require('./directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory(selector, name, explorer, activateFileEventHandler) {
    _classCallCheck(this, RootDirectory);

    var collapsed = false; ///

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).call(this, selector, name, collapsed, explorer, activateFileEventHandler));
  }

  _createClass(RootDirectory, [{
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingEntry,
          explorer = this.getExplorer(),
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUBDIRECTORIES);

      if (noDraggingIntoSubdirectories) {
        var overlappingEntry = this.isOverlappingDraggableEntry(draggableEntry);

        directoryOverlappingEntry = overlappingEntry ? this : null;
      } else {
        directoryOverlappingEntry = _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'getDirectoryOverlappingDraggableEntry', this).call(this, draggableEntry);
      }

      return directoryOverlappingEntry;
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath, removeEmptyParentDirectories) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName, removeEmptyParentDirectories);
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath, removeEmptyParentDirectories) {
      var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeDirectory', this).call(this, directoryPathWithoutRootDirectoryName, removeEmptyParentDirectories);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }], [{
    key: 'clone',
    value: function clone(name, explorer, activateFileEventHandler) {
      var rootDirectory = Element.clone(RootDirectory, '#directory', name, explorer, activateFileEventHandler);

      rootDirectory.removeAttribute('id');

      return rootDirectory;
    }
  }]);

  return RootDirectory;
}(Directory);

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJjb2xsYXBzZWQiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQkRJUkVDVE9SSUVTIiwib3ZlcmxhcHBpbmdFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoIiwiZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJyb290RGlyZWN0b3J5IiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFlBQVIsQ0FBWDtBQUFBLElBQ0lHLFVBQVVILFFBQVEsZUFBUixDQURkO0FBQUEsSUFFSUksWUFBWUosUUFBUSxhQUFSLENBRmhCOztJQUlNSyxhOzs7QUFDSix5QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDQyx3QkFBdEMsRUFBZ0U7QUFBQTs7QUFDOUQsUUFBSUMsWUFBWSxLQUFoQixDQUQ4RCxDQUN0Qzs7QUFEc0MseUhBR3hESixRQUh3RCxFQUc5Q0MsSUFIOEMsRUFHeENHLFNBSHdDLEVBRzdCRixRQUg2QixFQUduQkMsd0JBSG1CO0FBSS9EOzs7O3NDQUVpQjtBQUNoQixhQUFPLElBQVA7QUFDRDs7OzBEQUVxQ0UsYyxFQUFnQjtBQUNwRCxVQUFJQyx5QkFBSjtBQUFBLFVBQ0lKLFdBQVcsS0FBS0ssV0FBTCxFQURmO0FBQUEsVUFFSUMsK0JBQStCTixTQUFTTyxTQUFULENBQW1CWixRQUFRYSwrQkFBM0IsQ0FGbkM7O0FBSUEsVUFBSUYsNEJBQUosRUFBa0M7QUFDaEMsWUFBSUcsbUJBQW1CLEtBQUtDLDJCQUFMLENBQWlDUCxjQUFqQyxDQUF2Qjs7QUFFQUMsb0NBQTRCSyxtQkFDRSxJQURGLEdBRUksSUFGaEM7QUFHRCxPQU5ELE1BTU87QUFDTEwsd0xBQXdFRCxjQUF4RTtBQUNEOztBQUVELGFBQU9DLHlCQUFQO0FBQ0Q7Ozs0QkFFT08sUSxFQUFVO0FBQ2hCLFVBQUlDLG1DQUFtQ2xCLEtBQUttQiwrQkFBTCxDQUFxQ0YsUUFBckMsQ0FBdkM7O0FBRUEsVUFBSUMscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLDhIQUFjQSxnQ0FBZDtBQUNEO0FBQ0Y7OztpQ0FFWUUsYSxFQUFlWixTLEVBQVc7QUFDckMsVUFBSWEsd0NBQXdDckIsS0FBS21CLCtCQUFMLENBQXFDQyxhQUFyQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsbUlBQW1CQSxxQ0FBbkIsRUFBMERiLFNBQTFEO0FBQ0Q7QUFDRjs7OytCQUVVUyxRLEVBQVVLLDRCLEVBQThCO0FBQ2pELFVBQUlKLG1DQUFtQ2xCLEtBQUttQiwrQkFBTCxDQUFxQ0YsUUFBckMsQ0FBdkM7O0FBRUEsVUFBSUMscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLGlJQUFpQkEsZ0NBQWpCLEVBQW1ESSw0QkFBbkQ7QUFDRDtBQUNGOzs7b0NBRWVGLGEsRUFBZUUsNEIsRUFBOEI7QUFDM0QsVUFBSUQsd0NBQXdDckIsS0FBS21CLCtCQUFMLENBQXFDQyxhQUFyQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsc0lBQXNCQSxxQ0FBdEIsRUFBNkRDLDRCQUE3RDtBQUNEO0FBQ0Y7Ozs4QkFFU0MsVSxFQUFZQyxrQixFQUFvQjtBQUN4QyxVQUFJQyxxQ0FBcUN6QixLQUFLbUIsK0JBQUwsQ0FBcUNJLFVBQXJDLENBQXpDOztBQUVBLDhIQUFnQkUsa0NBQWhCLEVBQW9ERCxrQkFBcEQ7QUFDRDs7OzBCQUVZbkIsSSxFQUFNQyxRLEVBQVVDLHdCLEVBQTBCO0FBQ3JELFVBQUltQixnQkFBZ0IzQixRQUFRNEIsS0FBUixDQUFjeEIsYUFBZCxFQUE2QixZQUE3QixFQUEyQ0UsSUFBM0MsRUFBaURDLFFBQWpELEVBQTJEQyx3QkFBM0QsQ0FBcEI7O0FBRUFtQixvQkFBY0UsZUFBZCxDQUE4QixJQUE5Qjs7QUFFQSxhQUFPRixhQUFQO0FBQ0Q7Ozs7RUF6RXlCeEIsUzs7QUE0RTVCMkIsT0FBT0MsT0FBUCxHQUFpQjNCLGFBQWpCIiwiZmlsZSI6InJvb3REaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcHRpb25zJyksXG4gICAgRGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IGZhbHNlOyAgLy8vXG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgfVxuICBcbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LFxuICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMpO1xuICAgIFxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG92ZXJsYXBwaW5nRW50cnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBzdXBlci5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7ICAgIFxuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIHZhciBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgdmFyIGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciByb290RGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShSb290RGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgcm9vdERpcmVjdG9yeS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3Rvcnk7XG4iXX0=