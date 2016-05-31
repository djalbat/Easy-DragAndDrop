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

      _get(Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
    }
  }, {
    key: 'hasDirectory',
    value: function hasDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      return _get(Object.getPrototypeOf(RootDirectory.prototype), 'hasDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      return _get(Object.getPrototypeOf(RootDirectory.prototype), 'retrieveDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      _get(Object.getPrototypeOf(RootDirectory.prototype), 'removeDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7SUFDSSxVQUFVLE9BQU8sT0FEckI7O0FBR0EsSUFBSSxPQUFPLFFBQVEsWUFBUixDQUFYO0lBQ0ksWUFBWSxRQUFRLGFBQVIsQ0FEaEI7O0lBR00sYTs7O0FBQ0oseUJBQVksUUFBWixFQUFzQixJQUF0QixFQUE0QixnQkFBNUIsRUFBOEMsd0JBQTlDLEVBQXdFO0FBQUE7O0FBQ3RFLFFBQUksWUFBWSxLQUFoQixDOztBQURzRSw0RkFHaEUsUUFIZ0UsRUFHdEQsSUFIc0QsRUFHaEQsU0FIZ0QsRUFHckMsZ0JBSHFDLEVBR25CLHdCQUhtQjtBQUl2RTs7Ozs0QkFFTyxRLEVBQVUsUSxFQUFVO0FBQzFCLFVBQUksbUNBQW1DLEtBQUssNEJBQUwsQ0FBa0MsUUFBbEMsQ0FBdkM7O0FBRUEsdUZBQWMsZ0NBQWQsRUFBZ0QsUUFBaEQ7QUFDRDs7O2lDQUVZLGEsRUFBZSxTLEVBQVc7QUFDckMsVUFBSSx3Q0FBd0MsS0FBSyw0QkFBTCxDQUFrQyxhQUFsQyxDQUE1Qzs7QUFFQSw0RkFBbUIscUNBQW5CLEVBQTBELFNBQTFEO0FBQ0Q7OztpQ0FFWSxhLEVBQWU7QUFDMUIsVUFBSSx3Q0FBd0MsS0FBSyw0QkFBTCxDQUFrQyxhQUFsQyxDQUE1Qzs7QUFFQSxtR0FBMEIscUNBQTFCO0FBQ0Q7OztzQ0FFaUIsYSxFQUFlO0FBQy9CLFVBQUksd0NBQXdDLEtBQUssNEJBQUwsQ0FBa0MsYUFBbEMsQ0FBNUM7O0FBRUEsd0dBQStCLHFDQUEvQjtBQUNEOzs7b0NBRWUsYSxFQUFlO0FBQzdCLFVBQUksd0NBQXdDLEtBQUssNEJBQUwsQ0FBa0MsYUFBbEMsQ0FBNUM7O0FBRUEsK0ZBQXNCLHFDQUF0QjtBQUNEOzs7OEJBRVMsVSxFQUFZLFMsRUFBVztBQUMvQixVQUFJLHFDQUFxQyxLQUFLLDRCQUFMLENBQWtDLFVBQWxDLENBQXpDOztBQUVBLFVBQUksNEZBQXlCLGtDQUF6QixFQUE2RCxTQUE3RCxDQUFKOztBQUVBLGFBQU8sTUFBUDtBQUNEOzs7aURBRTRCLEksRUFBTTtBQUNqQyxVQUFJLHVCQUF1QixLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQTNCO1VBQ0ksb0JBQW9CLEtBQUssT0FBTCxFQUR4Qjs7QUFHQSxVQUFJLCtCQUErQix5QkFBeUIsaUJBQXpCLEdBQ0UsS0FBSywrQkFBTCxDQUFxQyxJQUFyQyxDQURGLEdBRUksSUFGdkMsQzs7QUFJQSxhQUFPLDRCQUFQO0FBQ0Q7Ozs7RUF0RHlCLFM7O0FBeUQ1QixjQUFjLEtBQWQsR0FBc0IsVUFBUyxJQUFULEVBQWUsZ0JBQWYsRUFBaUMsd0JBQWpDLEVBQTJEO0FBQy9FLE1BQUksZ0JBQWdCLFFBQVEsS0FBUixDQUFjLGFBQWQsRUFBNkIsWUFBN0IsRUFBMkMsSUFBM0MsRUFBaUQsZ0JBQWpELEVBQW1FLHdCQUFuRSxDQUFwQjs7QUFFQSxnQkFBYyxlQUFkLENBQThCLElBQTlCOztBQUVBLFNBQU8sYUFBUDtBQUNELENBTkQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6InJvb3REaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnkgZXh0ZW5kcyBEaXJlY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IGZhbHNlOyAgLy8vXG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgc3VwZXIuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgcmVhZE9ubHkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgc3VwZXIuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gIH1cbiAgXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICByZXR1cm4gc3VwZXIuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgcmV0dXJuIHN1cGVyLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIHZhciBtYXJrZXIgPSBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpLFxuICAgICAgICByb290RGlyZWN0b3J5TmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgdmFyIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gcm9vdERpcmVjdG9yeU5hbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lO1xuICB9XG59XG5cblJvb3REaXJlY3RvcnkuY2xvbmUgPSBmdW5jdGlvbihuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIHJvb3REaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKFJvb3REaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==
