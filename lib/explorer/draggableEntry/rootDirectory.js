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
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, entryType) {
      var markerPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, entryType);
    }
  }, {
    key: 'pathWithoutRootDirectoryName',
    value: function pathWithoutRootDirectoryName(path) {
      var topmostDirectoryName = util.topmostDirectoryName(path),
          rootDirectoryName = this.getName(),
          pathWithoutRootDirectoryName = topmostDirectoryName === rootDirectoryName ? util.pathWithoutTopmostDirectoryName(path) : null; ///

      return pathWithoutRootDirectoryName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkRpcmVjdG9yeSIsIlJvb3REaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiY29sbGFwc2VkIiwiZW50cnkiLCJub0RyYWdzVG9TdWJkaXJlY3RvcmllcyIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJvdmVybGFwcGluZ0VudHJ5IiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZmlsZVBhdGgiLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJlbnRyeVR5cGUiLCJtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwicm9vdERpcmVjdG9yeU5hbWUiLCJnZXROYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInJvb3REaXJlY3RvcnkiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsWUFBUixDQUFYO0FBQUEsSUFDSUcsWUFBWUgsUUFBUSxhQUFSLENBRGhCOztJQUdNSSxhOzs7QUFDSix5QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLGdCQUE1QixFQUE4Q0Msd0JBQTlDLEVBQXdFO0FBQUE7O0FBQ3RFLFFBQUlDLFlBQVksS0FBaEIsQ0FEc0UsQ0FDOUM7O0FBRDhDLHlIQUdoRUosUUFIZ0UsRUFHdERDLElBSHNELEVBR2hERyxTQUhnRCxFQUdyQ0YsZ0JBSHFDLEVBR25CQyx3QkFIbUI7QUFJdkU7Ozs7aURBRTRCRSxLLEVBQU9DLHVCLEVBQXlCO0FBQzNELFVBQUlDLHlCQUFKOztBQUVBLFVBQUlELHVCQUFKLEVBQTZCO0FBQzNCLFlBQUlFLG1CQUFtQixLQUFLQyxrQkFBTCxDQUF3QkosS0FBeEIsQ0FBdkI7O0FBRUFFLG9DQUE0QkMsbUJBQ0UsSUFERixHQUVJLElBRmhDO0FBR0QsT0FORCxNQU1PO0FBQ0xELCtLQUErREYsS0FBL0Q7QUFDRDs7QUFFRCxhQUFPRSx5QkFBUDtBQUNEOzs7NEJBRU9HLFEsRUFBVTtBQUNoQixVQUFJQyxtQ0FBbUMsS0FBS0MsNEJBQUwsQ0FBa0NGLFFBQWxDLENBQXZDOztBQUVBLDRIQUFjQyxnQ0FBZDtBQUNEOzs7K0JBRVVELFEsRUFBVTtBQUNuQixVQUFJQyxtQ0FBbUMsS0FBS0MsNEJBQUwsQ0FBa0NGLFFBQWxDLENBQXZDOztBQUVBLCtIQUFpQkMsZ0NBQWpCO0FBQ0Q7OztpQ0FFWUUsYSxFQUFlVCxTLEVBQVc7QUFDckMsVUFBSVUsd0NBQXdDLEtBQUtGLDRCQUFMLENBQWtDQyxhQUFsQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsbUlBQW1CQSxxQ0FBbkIsRUFBMERWLFNBQTFEO0FBQ0Q7QUFDRjs7O29DQUVlUyxhLEVBQWU7QUFDN0IsVUFBSUMsd0NBQXdDLEtBQUtGLDRCQUFMLENBQWtDQyxhQUFsQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsc0lBQXNCQSxxQ0FBdEI7QUFDRDtBQUNGOzs7OEJBRVNDLFUsRUFBWUMsUyxFQUFXO0FBQy9CLFVBQUlDLHFDQUFxQyxLQUFLTCw0QkFBTCxDQUFrQ0csVUFBbEMsQ0FBekM7O0FBRUEsOEhBQWdCRSxrQ0FBaEIsRUFBb0RELFNBQXBEO0FBQ0Q7OztpREFFNEJFLEksRUFBTTtBQUNqQyxVQUFJQyx1QkFBdUJ0QixLQUFLc0Isb0JBQUwsQ0FBMEJELElBQTFCLENBQTNCO0FBQUEsVUFDSUUsb0JBQW9CLEtBQUtDLE9BQUwsRUFEeEI7QUFBQSxVQUVJVCwrQkFBZ0NPLHlCQUF5QkMsaUJBQTFCLEdBQ0V2QixLQUFLeUIsK0JBQUwsQ0FBcUNKLElBQXJDLENBREYsR0FFSSxJQUp2QyxDQURpQyxDQUthOztBQUU5QyxhQUFPTiw0QkFBUDtBQUNEOzs7MEJBRVlYLEksRUFBTUMsZ0IsRUFBa0JDLHdCLEVBQTBCO0FBQzdELFVBQUlvQixnQkFBZ0IzQixRQUFRNEIsS0FBUixDQUFjekIsYUFBZCxFQUE2QixZQUE3QixFQUEyQ0UsSUFBM0MsRUFBaURDLGdCQUFqRCxFQUFtRUMsd0JBQW5FLENBQXBCOztBQUVBb0Isb0JBQWNFLGVBQWQsQ0FBOEIsSUFBOUI7O0FBRUEsYUFBT0YsYUFBUDtBQUNEOzs7O0VBekV5QnpCLFM7O0FBNEU1QjRCLE9BQU9DLE9BQVAsR0FBaUI1QixhQUFqQiIsImZpbGUiOiJyb290RGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5IGV4dGVuZHMgRGlyZWN0b3J5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZTsgIC8vL1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnksIG5vRHJhZ3NUb1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gICAgXG4gICAgaWYgKG5vRHJhZ3NUb1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG92ZXJsYXBwaW5nRW50cnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBzdXBlci5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7ICAgIFxuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIHZhciBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgc3VwZXIucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpLFxuICAgICAgICByb290RGlyZWN0b3J5TmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSByb290RGlyZWN0b3J5TmFtZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciByb290RGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShSb290RGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==