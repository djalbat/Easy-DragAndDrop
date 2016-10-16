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
    value: function addFile(filePath, readOnly) {
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName, readOnly);
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

      var marker = _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, entryType);

      return marker;
    }
  }, {
    key: 'pathWithoutRootDirectoryName',
    value: function pathWithoutRootDirectoryName(path) {
      var topmostDirectoryName = util.topmostDirectoryName(path),
          rootDirectoryName = this.getName();

      var pathWithoutRootDirectoryName = topmostDirectoryName === rootDirectoryName ? util.pathWithoutTopmostDirectoryName(path) : null; ///

      return pathWithoutRootDirectoryName;
    }
  }]);

  return RootDirectory;
}(Directory);

RootDirectory.clone = function (name, dragEventHandler, activateFileEventHandler) {
  var rootDirectory = Element.clone(RootDirectory, '#directory', name, dragEventHandler, activateFileEventHandler);

  rootDirectory.removeAttribute('id');

  return rootDirectory;
};

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkRpcmVjdG9yeSIsIlJvb3REaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiY29sbGFwc2VkIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwibWFya2VyUGF0aCIsImVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJtYXJrZXIiLCJwYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyb290RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiY2xvbmUiLCJyb290RGlyZWN0b3J5IiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxZQUFZSCxRQUFRLGFBQVIsQ0FEaEI7O0lBR01JLGE7OztBQUNKLHlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsZ0JBQTVCLEVBQThDQyx3QkFBOUMsRUFBd0U7QUFBQTs7QUFDdEUsUUFBSUMsWUFBWSxLQUFoQixDQURzRSxDQUM5Qzs7QUFEOEMseUhBR2hFSixRQUhnRSxFQUd0REMsSUFIc0QsRUFHaERHLFNBSGdELEVBR3JDRixnQkFIcUMsRUFHbkJDLHdCQUhtQjtBQUl2RTs7Ozs0QkFFT0UsUSxFQUFVQyxRLEVBQVU7QUFDMUIsVUFBSUMsbUNBQW1DLEtBQUtDLDRCQUFMLENBQWtDSCxRQUFsQyxDQUF2Qzs7QUFFQSw0SEFBY0UsZ0NBQWQsRUFBZ0RELFFBQWhEO0FBQ0Q7OztpQ0FFWUcsYSxFQUFlTCxTLEVBQVc7QUFDckMsVUFBSU0sd0NBQXdDLEtBQUtGLDRCQUFMLENBQWtDQyxhQUFsQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsbUlBQW1CQSxxQ0FBbkIsRUFBMEROLFNBQTFEO0FBQ0Q7QUFDRjs7OzhCQUVTTyxVLEVBQVlDLFMsRUFBVztBQUMvQixVQUFJQyxxQ0FBcUMsS0FBS0wsNEJBQUwsQ0FBa0NHLFVBQWxDLENBQXpDOztBQUVBLFVBQUlHLGlJQUF5QkQsa0NBQXpCLEVBQTZERCxTQUE3RCxDQUFKOztBQUVBLGFBQU9FLE1BQVA7QUFDRDs7O2lEQUU0QkMsSSxFQUFNO0FBQ2pDLFVBQUlDLHVCQUF1Qm5CLEtBQUttQixvQkFBTCxDQUEwQkQsSUFBMUIsQ0FBM0I7QUFBQSxVQUNJRSxvQkFBb0IsS0FBS0MsT0FBTCxFQUR4Qjs7QUFHQSxVQUFJViwrQkFBK0JRLHlCQUF5QkMsaUJBQXpCLEdBQ0VwQixLQUFLc0IsK0JBQUwsQ0FBcUNKLElBQXJDLENBREYsR0FFSSxJQUZ2QyxDQUppQyxDQU1hOztBQUU5QyxhQUFPUCw0QkFBUDtBQUNEOzs7O0VBdEN5QlYsUzs7QUF5QzVCQyxjQUFjcUIsS0FBZCxHQUFzQixVQUFTbkIsSUFBVCxFQUFlQyxnQkFBZixFQUFpQ0Msd0JBQWpDLEVBQTJEO0FBQy9FLE1BQUlrQixnQkFBZ0J6QixRQUFRd0IsS0FBUixDQUFjckIsYUFBZCxFQUE2QixZQUE3QixFQUEyQ0UsSUFBM0MsRUFBaURDLGdCQUFqRCxFQUFtRUMsd0JBQW5FLENBQXBCOztBQUVBa0IsZ0JBQWNDLGVBQWQsQ0FBOEIsSUFBOUI7O0FBRUEsU0FBT0QsYUFBUDtBQUNELENBTkQ7O0FBUUFFLE9BQU9DLE9BQVAsR0FBaUJ6QixhQUFqQiIsImZpbGUiOiJyb290RGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5IGV4dGVuZHMgRGlyZWN0b3J5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZTsgIC8vL1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7XG4gICAgdmFyIGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgIHN1cGVyLmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIHJlYWRPbmx5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIHZhciBtYXJrZXIgPSBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpLFxuICAgICAgICByb290RGlyZWN0b3J5TmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgdmFyIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gcm9vdERpcmVjdG9yeU5hbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lO1xuICB9XG59XG5cblJvb3REaXJlY3RvcnkuY2xvbmUgPSBmdW5jdGlvbihuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIHJvb3REaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKFJvb3REaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==