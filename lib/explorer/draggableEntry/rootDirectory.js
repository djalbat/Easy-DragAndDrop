'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    Directory = require('./directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory(selector, name, dragEventHandler, activateFileEventHandler) {
    _classCallCheck(this, RootDirectory);

    var collapsed = false; ///

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).call(this, selector, name, collapsed, dragEventHandler, activateFileEventHandler));
  }

  _createClass(RootDirectory, [{
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry, noDragsToSubdirectories) {
      var directoryOverlappingEntry;

      if (noDragsToSubdirectories) {
        var overlappingEntry = this.isOverlappingEntry(entry);

        directoryOverlappingEntry = overlappingEntry ? this : null;
      } else {
        directoryOverlappingEntry = _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'getDirectoryOverlappingEntry', this).call(this, entry);
      }

      return directoryOverlappingEntry;
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath, removeEmptyParentDirectories) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName, removeEmptyParentDirectories);
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
    value: function addMarker(markerPath, entryType) {
      var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, entryType);
    }
  }], [{
    key: 'clone',
    value: function clone(name, dragEventHandler, activateFileEventHandler) {
      var rootDirectory = Element.clone(RootDirectory, '#directory', name, dragEventHandler, activateFileEventHandler);

      rootDirectory.removeAttribute('id');

      return rootDirectory;
    }
  }]);

  return RootDirectory;
}(Directory);

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkRpcmVjdG9yeSIsIlJvb3REaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiY29sbGFwc2VkIiwiZW50cnkiLCJub0RyYWdzVG9TdWJkaXJlY3RvcmllcyIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJvdmVybGFwcGluZ0VudHJ5IiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZmlsZVBhdGgiLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJtYXJrZXJQYXRoIiwiZW50cnlUeXBlIiwibWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInJvb3REaXJlY3RvcnkiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsWUFBUixDQUFYO0FBQUEsSUFDSUcsWUFBWUgsUUFBUSxhQUFSLENBRGhCOztJQUdNSSxhOzs7QUFDSix5QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLGdCQUE1QixFQUE4Q0Msd0JBQTlDLEVBQXdFO0FBQUE7O0FBQ3RFLFFBQUlDLFlBQVksS0FBaEIsQ0FEc0UsQ0FDOUM7O0FBRDhDLHlIQUdoRUosUUFIZ0UsRUFHdERDLElBSHNELEVBR2hERyxTQUhnRCxFQUdyQ0YsZ0JBSHFDLEVBR25CQyx3QkFIbUI7QUFJdkU7Ozs7c0NBRWlCO0FBQ2hCLGFBQU8sSUFBUDtBQUNEOzs7aURBRTRCRSxLLEVBQU9DLHVCLEVBQXlCO0FBQzNELFVBQUlDLHlCQUFKOztBQUVBLFVBQUlELHVCQUFKLEVBQTZCO0FBQzNCLFlBQUlFLG1CQUFtQixLQUFLQyxrQkFBTCxDQUF3QkosS0FBeEIsQ0FBdkI7O0FBRUFFLG9DQUE0QkMsbUJBQ0UsSUFERixHQUVJLElBRmhDO0FBR0QsT0FORCxNQU1PO0FBQ0xELCtLQUErREYsS0FBL0Q7QUFDRDs7QUFFRCxhQUFPRSx5QkFBUDtBQUNEOzs7NEJBRU9HLFEsRUFBVTtBQUNoQixVQUFJQyxtQ0FBbUNkLEtBQUtlLCtCQUFMLENBQXFDRixRQUFyQyxDQUF2Qzs7QUFFQSw0SEFBY0MsZ0NBQWQ7QUFDRDs7O2lDQUVZRSxhLEVBQWVULFMsRUFBVztBQUNyQyxVQUFJVSx3Q0FBd0NqQixLQUFLZSwrQkFBTCxDQUFxQ0MsYUFBckMsQ0FBNUM7O0FBRUEsaUlBQW1CQyxxQ0FBbkIsRUFBMERWLFNBQTFEO0FBQ0Q7OzsrQkFFVU0sUSxFQUFVSyw0QixFQUE4QjtBQUNqRCxVQUFJSixtQ0FBbUNkLEtBQUtlLCtCQUFMLENBQXFDRixRQUFyQyxDQUF2Qzs7QUFFQSwrSEFBaUJDLGdDQUFqQixFQUFtREksNEJBQW5EO0FBQ0Q7OztvQ0FFZUYsYSxFQUFlRSw0QixFQUE4QjtBQUMzRCxVQUFJRCx3Q0FBd0NqQixLQUFLZSwrQkFBTCxDQUFxQ0MsYUFBckMsQ0FBNUM7O0FBRUEsVUFBSUMsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELHNJQUFzQkEscUNBQXRCLEVBQTZEQyw0QkFBN0Q7QUFDRDtBQUNGOzs7OEJBRVNDLFUsRUFBWUMsUyxFQUFXO0FBQy9CLFVBQUlDLHFDQUFxQ3JCLEtBQUtlLCtCQUFMLENBQXFDSSxVQUFyQyxDQUF6Qzs7QUFFQSw4SEFBZ0JFLGtDQUFoQixFQUFvREQsU0FBcEQ7QUFDRDs7OzBCQUVZaEIsSSxFQUFNQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDN0QsVUFBSWdCLGdCQUFnQnZCLFFBQVF3QixLQUFSLENBQWNyQixhQUFkLEVBQTZCLFlBQTdCLEVBQTJDRSxJQUEzQyxFQUFpREMsZ0JBQWpELEVBQW1FQyx3QkFBbkUsQ0FBcEI7O0FBRUFnQixvQkFBY0UsZUFBZCxDQUE4QixJQUE5Qjs7QUFFQSxhQUFPRixhQUFQO0FBQ0Q7Ozs7RUFqRXlCckIsUzs7QUFvRTVCd0IsT0FBT0MsT0FBUCxHQUFpQnhCLGFBQWpCIiwiZmlsZSI6InJvb3REaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnkgZXh0ZW5kcyBEaXJlY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IGZhbHNlOyAgLy8vXG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICB9XG4gIFxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5LCBub0RyYWdzVG9TdWJkaXJlY3Rvcmllcykge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICAgIFxuICAgIGlmIChub0RyYWdzVG9TdWJkaXJlY3Rvcmllcykge1xuICAgICAgdmFyIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBvdmVybGFwcGluZ0VudHJ5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gc3VwZXIuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5OyAgICBcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgc3VwZXIuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgc3VwZXIucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoUm9vdERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgcm9vdERpcmVjdG9yeS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3Rvcnk7XG4iXX0=