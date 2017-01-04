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
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

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
    value: function removeFile(filePath) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJjb2xsYXBzZWQiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJyb290RGlyZWN0b3J5IiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFlBQVIsQ0FBWDtBQUFBLElBQ0lHLFVBQVVILFFBQVEsZUFBUixDQURkO0FBQUEsSUFFSUksWUFBWUosUUFBUSxhQUFSLENBRmhCOztJQUlNSyxhOzs7QUFDSix5QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDQyx3QkFBdEMsRUFBZ0U7QUFBQTs7QUFDOUQsUUFBSUMsWUFBWSxLQUFoQixDQUQ4RCxDQUN0Qzs7QUFEc0MseUhBR3hESixRQUh3RCxFQUc5Q0MsSUFIOEMsRUFHeENHLFNBSHdDLEVBRzdCRixRQUg2QixFQUduQkMsd0JBSG1CO0FBSS9EOzs7O3NDQUVpQjtBQUNoQixhQUFPLElBQVA7QUFDRDs7OzBEQUVxQ0UsYyxFQUFnQjtBQUNwRCxVQUFJQyx5QkFBSjtBQUFBLFVBQ0lKLFdBQVcsS0FBS0ssV0FBTCxFQURmO0FBQUEsVUFFSUMsK0JBQStCTixTQUFTTyxTQUFULENBQW1CWixRQUFRYSxnQ0FBM0IsQ0FGbkM7O0FBSUEsVUFBSUYsNEJBQUosRUFBa0M7QUFDaEMsWUFBSUcsbUJBQW1CLEtBQUtDLDJCQUFMLENBQWlDUCxjQUFqQyxDQUF2Qjs7QUFFQUMsb0NBQTRCSyxtQkFDRSxJQURGLEdBRUksSUFGaEM7QUFHRCxPQU5ELE1BTU87QUFDTEwsd0xBQXdFRCxjQUF4RTtBQUNEOztBQUVELGFBQU9DLHlCQUFQO0FBQ0Q7Ozs0QkFFT08sUSxFQUFVO0FBQ2hCLFVBQUlDLG1DQUFtQ2xCLEtBQUttQiwrQkFBTCxDQUFxQ0YsUUFBckMsQ0FBdkM7O0FBRUEsVUFBSUMscUNBQXFDLElBQXpDLEVBQStDO0FBQzdDLDhIQUFjQSxnQ0FBZDtBQUNEO0FBQ0Y7OztpQ0FFWUUsYSxFQUFlWixTLEVBQVc7QUFDckMsVUFBSWEsd0NBQXdDckIsS0FBS21CLCtCQUFMLENBQXFDQyxhQUFyQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsbUlBQW1CQSxxQ0FBbkIsRUFBMERiLFNBQTFEO0FBQ0Q7QUFDRjs7OytCQUVVUyxRLEVBQVU7QUFDbkIsVUFBSUMsbUNBQW1DbEIsS0FBS21CLCtCQUFMLENBQXFDRixRQUFyQyxDQUF2Qzs7QUFFQSxVQUFJQyxxQ0FBcUMsSUFBekMsRUFBK0M7QUFDN0MsaUlBQWlCQSxnQ0FBakI7QUFDRDtBQUNGOzs7b0NBRWVFLGEsRUFBZTtBQUM3QixVQUFJQyx3Q0FBd0NyQixLQUFLbUIsK0JBQUwsQ0FBcUNDLGFBQXJDLENBQTVDOztBQUVBLFVBQUlDLDBDQUEwQyxJQUE5QyxFQUFvRDtBQUNsRCxzSUFBc0JBLHFDQUF0QjtBQUNEO0FBQ0Y7Ozs4QkFFU0MsVSxFQUFZQyxrQixFQUFvQjtBQUN4QyxVQUFJQyxxQ0FBcUN4QixLQUFLbUIsK0JBQUwsQ0FBcUNHLFVBQXJDLENBQXpDOztBQUVBLDhIQUFnQkUsa0NBQWhCLEVBQW9ERCxrQkFBcEQ7QUFDRDs7OzBCQUVZbEIsSSxFQUFNQyxRLEVBQVVDLHdCLEVBQTBCO0FBQ3JELFVBQUlrQixnQkFBZ0IxQixRQUFRMkIsS0FBUixDQUFjdkIsYUFBZCxFQUE2QixZQUE3QixFQUEyQ0UsSUFBM0MsRUFBaURDLFFBQWpELEVBQTJEQyx3QkFBM0QsQ0FBcEI7O0FBRUFrQixvQkFBY0UsZUFBZCxDQUE4QixJQUE5Qjs7QUFFQSxhQUFPRixhQUFQO0FBQ0Q7Ozs7RUF6RXlCdkIsUzs7QUE0RTVCMEIsT0FBT0MsT0FBUCxHQUFpQjFCLGFBQWpCIiwiZmlsZSI6InJvb3REaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcHRpb25zJyksXG4gICAgRGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IGZhbHNlOyAgLy8vXG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgfVxuICBcbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LFxuICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcbiAgICBcbiAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllcykge1xuICAgICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBvdmVybGFwcGluZ0VudHJ5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gc3VwZXIuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5OyAgICBcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIHZhciBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIHN1cGVyLmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoUm9vdERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIHJvb3REaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIHJvb3REaXJlY3Rvcnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5O1xuIl19