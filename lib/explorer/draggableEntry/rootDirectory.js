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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RootDirectory).call(this, selector, name, collapsed, dragEventHandler, activateFileEventHandler));
  }

  _createClass(RootDirectory, [{
    key: 'addFile',
    value: function addFile(filePath, readOnly) {
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName, readOnly);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, entryType) {
      var markerPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(markerPath);

      var marker = _get(Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, entryType);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7SUFDSSxVQUFVLE9BQU8sT0FEckI7O0FBR0EsSUFBSSxPQUFPLFFBQVEsWUFBUixDQUFYO0lBQ0ksWUFBWSxRQUFRLGFBQVIsQ0FEaEI7O0lBR00sYTs7O0FBQ0oseUJBQVksUUFBWixFQUFzQixJQUF0QixFQUE0QixnQkFBNUIsRUFBOEMsd0JBQTlDLEVBQXdFO0FBQUE7O0FBQ3RFLFFBQUksWUFBWSxLQUFoQixDOztBQURzRSw0RkFHaEUsUUFIZ0UsRUFHdEQsSUFIc0QsRUFHaEQsU0FIZ0QsRUFHckMsZ0JBSHFDLEVBR25CLHdCQUhtQjtBQUl2RTs7Ozs0QkFFTyxRLEVBQVUsUSxFQUFVO0FBQzFCLFVBQUksbUNBQW1DLEtBQUssNEJBQUwsQ0FBa0MsUUFBbEMsQ0FBdkM7O0FBRUEsdUZBQWMsZ0NBQWQsRUFBZ0QsUUFBaEQ7QUFDRDs7O2lDQUVZLGEsRUFBZSxTLEVBQVc7QUFDckMsVUFBSSx3Q0FBd0MsS0FBSyw0QkFBTCxDQUFrQyxhQUFsQyxDQUE1Qzs7QUFFQSxVQUFJLDBDQUEwQyxJQUE5QyxFQUFvRDtBQUNsRCw4RkFBbUIscUNBQW5CLEVBQTBELFNBQTFEO0FBQ0Q7QUFDRjs7OzhCQUVTLFUsRUFBWSxTLEVBQVc7QUFDL0IsVUFBSSxxQ0FBcUMsS0FBSyw0QkFBTCxDQUFrQyxVQUFsQyxDQUF6Qzs7QUFFQSxVQUFJLDRGQUF5QixrQ0FBekIsRUFBNkQsU0FBN0QsQ0FBSjs7QUFFQSxhQUFPLE1BQVA7QUFDRDs7O2lEQUU0QixJLEVBQU07QUFDakMsVUFBSSx1QkFBdUIsS0FBSyxvQkFBTCxDQUEwQixJQUExQixDQUEzQjtVQUNJLG9CQUFvQixLQUFLLE9BQUwsRUFEeEI7O0FBR0EsVUFBSSwrQkFBK0IseUJBQXlCLGlCQUF6QixHQUNFLEtBQUssK0JBQUwsQ0FBcUMsSUFBckMsQ0FERixHQUVJLElBRnZDLEM7O0FBSUEsYUFBTyw0QkFBUDtBQUNEOzs7O0VBdEN5QixTOztBQXlDNUIsY0FBYyxLQUFkLEdBQXNCLFVBQVMsSUFBVCxFQUFlLGdCQUFmLEVBQWlDLHdCQUFqQyxFQUEyRDtBQUMvRSxNQUFJLGdCQUFnQixRQUFRLEtBQVIsQ0FBYyxhQUFkLEVBQTZCLFlBQTdCLEVBQTJDLElBQTNDLEVBQWlELGdCQUFqRCxFQUFtRSx3QkFBbkUsQ0FBcEI7O0FBRUEsZ0JBQWMsZUFBZCxDQUE4QixJQUE5Qjs7QUFFQSxTQUFPLGFBQVA7QUFDRCxDQU5EOztBQVFBLE9BQU8sT0FBUCxHQUFpQixhQUFqQiIsImZpbGUiOiJyb290RGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5IGV4dGVuZHMgRGlyZWN0b3J5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZTsgIC8vL1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7XG4gICAgdmFyIGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgIHN1cGVyLmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIHJlYWRPbmx5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIHZhciBtYXJrZXIgPSBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpLFxuICAgICAgICByb290RGlyZWN0b3J5TmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgdmFyIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gcm9vdERpcmVjdG9yeU5hbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lO1xuICB9XG59XG5cblJvb3REaXJlY3RvcnkuY2xvbmUgPSBmdW5jdGlvbihuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIHJvb3REaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKFJvb3REaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==
