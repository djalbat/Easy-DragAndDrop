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
    key: 'addFile',
    value: function addFile(filePath) {
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkRpcmVjdG9yeSIsIlJvb3REaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiY29sbGFwc2VkIiwiZmlsZVBhdGgiLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJlbnRyeVR5cGUiLCJtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwicm9vdERpcmVjdG9yeU5hbWUiLCJnZXROYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInJvb3REaXJlY3RvcnkiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsWUFBUixDQUFYO0FBQUEsSUFDSUcsWUFBWUgsUUFBUSxhQUFSLENBRGhCOztJQUdNSSxhOzs7QUFDSix5QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLGdCQUE1QixFQUE4Q0Msd0JBQTlDLEVBQXdFO0FBQUE7O0FBQ3RFLFFBQUlDLFlBQVksS0FBaEIsQ0FEc0UsQ0FDOUM7O0FBRDhDLHlIQUdoRUosUUFIZ0UsRUFHdERDLElBSHNELEVBR2hERyxTQUhnRCxFQUdyQ0YsZ0JBSHFDLEVBR25CQyx3QkFIbUI7QUFJdkU7Ozs7NEJBRU9FLFEsRUFBVTtBQUNoQixVQUFJQyxtQ0FBbUMsS0FBS0MsNEJBQUwsQ0FBa0NGLFFBQWxDLENBQXZDOztBQUVBLDRIQUFjQyxnQ0FBZDtBQUNEOzs7aUNBRVlFLGEsRUFBZUosUyxFQUFXO0FBQ3JDLFVBQUlLLHdDQUF3QyxLQUFLRiw0QkFBTCxDQUFrQ0MsYUFBbEMsQ0FBNUM7O0FBRUEsVUFBSUMsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELG1JQUFtQkEscUNBQW5CLEVBQTBETCxTQUExRDtBQUNEO0FBQ0Y7Ozs4QkFFU00sVSxFQUFZQyxTLEVBQVc7QUFDL0IsVUFBSUMscUNBQXFDLEtBQUtMLDRCQUFMLENBQWtDRyxVQUFsQyxDQUF6Qzs7QUFFQSw4SEFBZ0JFLGtDQUFoQixFQUFvREQsU0FBcEQ7QUFDRDs7O2lEQUU0QkUsSSxFQUFNO0FBQ2pDLFVBQUlDLHVCQUF1QmpCLEtBQUtpQixvQkFBTCxDQUEwQkQsSUFBMUIsQ0FBM0I7QUFBQSxVQUNJRSxvQkFBb0IsS0FBS0MsT0FBTCxFQUR4QjtBQUFBLFVBRUlULCtCQUErQk8seUJBQXlCQyxpQkFBekIsR0FDRWxCLEtBQUtvQiwrQkFBTCxDQUFxQ0osSUFBckMsQ0FERixHQUVJLElBSnZDLENBRGlDLENBS2E7O0FBRTlDLGFBQU9OLDRCQUFQO0FBQ0Q7OzswQkFFWU4sSSxFQUFNQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDN0QsVUFBSWUsZ0JBQWdCdEIsUUFBUXVCLEtBQVIsQ0FBY3BCLGFBQWQsRUFBNkIsWUFBN0IsRUFBMkNFLElBQTNDLEVBQWlEQyxnQkFBakQsRUFBbUVDLHdCQUFuRSxDQUFwQjs7QUFFQWUsb0JBQWNFLGVBQWQsQ0FBOEIsSUFBOUI7O0FBRUEsYUFBT0YsYUFBUDtBQUNEOzs7O0VBM0N5QnBCLFM7O0FBOEM1QnVCLE9BQU9DLE9BQVAsR0FBaUJ2QixhQUFqQiIsImZpbGUiOiJyb290RGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5IGV4dGVuZHMgRGlyZWN0b3J5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZTsgIC8vL1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgc3VwZXIuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gcm9vdERpcmVjdG9yeU5hbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciByb290RGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShSb290RGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==