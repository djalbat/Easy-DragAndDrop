'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../util'),
    Directory = require('./directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory(selectorOr$Element, name, eventHandler) {
    _classCallCheck(this, RootDirectory);

    var collapsed = false; ///

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RootDirectory).call(this, selectorOr$Element, name, collapsed, eventHandler));
  }

  _createClass(RootDirectory, [{
    key: 'addFile',
    value: function addFile(filePath, readOnly) {
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName, readOnly);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

      _get(Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

      _get(Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
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

RootDirectory.clone = function (name, eventHandler) {
  var rootDirectory = Element.clone(RootDirectory, '#directory', name, eventHandler);

  rootDirectory.removeAttribute('id');

  return rootDirectory;
};

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQVQ7SUFDQSxVQUFVLE9BQU8sT0FBUDs7QUFFZCxJQUFJLE9BQU8sUUFBUSxTQUFSLENBQVA7SUFDQSxZQUFZLFFBQVEsYUFBUixDQUFaOztJQUVFOzs7QUFDSixXQURJLGFBQ0osQ0FBWSxrQkFBWixFQUFnQyxJQUFoQyxFQUFzQyxZQUF0QyxFQUFvRDswQkFEaEQsZUFDZ0Q7O0FBQ2xELFFBQUksWUFBWSxLQUFaOztBQUQ4QyxrRUFEaEQsMEJBSUksb0JBQW9CLE1BQU0sV0FBVyxlQUhPO0dBQXBEOztlQURJOzs0QkFPSSxVQUFVLFVBQVU7QUFDMUIsVUFBSSxtQ0FBbUMsS0FBSyw0QkFBTCxDQUFrQyxRQUFsQyxDQUFuQyxDQURzQjs7QUFHMUIsaUNBVkUsc0RBVVksa0NBQWtDLFNBQWhELENBSDBCOzs7OytCQU1qQixVQUFVO0FBQ25CLFVBQUksbUNBQW1DLEtBQUssNEJBQUwsQ0FBa0MsUUFBbEMsQ0FBbkMsQ0FEZTs7QUFHbkIsaUNBaEJFLHlEQWdCZSxpQ0FBakIsQ0FIbUI7Ozs7aUNBTVIsZUFBZSxXQUFXO0FBQ3JDLFVBQUksd0NBQXdDLEtBQUssNEJBQUwsQ0FBa0MsYUFBbEMsQ0FBeEMsQ0FEaUM7O0FBR3JDLGlDQXRCRSwyREFzQmlCLHVDQUF1QyxVQUExRCxDQUhxQzs7OztvQ0FNdkIsZUFBZTtBQUM3QixVQUFJLHdDQUF3QyxLQUFLLDRCQUFMLENBQWtDLGFBQWxDLENBQXhDLENBRHlCOztBQUc3QixpQ0E1QkUsOERBNEJvQixzQ0FBdEIsQ0FINkI7Ozs7OEJBTXJCLFlBQVksV0FBVztBQUMvQixVQUFJLHFDQUFxQyxLQUFLLDRCQUFMLENBQWtDLFVBQWxDLENBQXJDLENBRDJCOztBQUcvQixVQUFJLG9DQWxDRix3REFrQzJCLG9DQUFvQyxVQUE3RCxDQUgyQjs7QUFLL0IsYUFBTyxNQUFQLENBTCtCOzs7O2lEQVFKLE1BQU07QUFDakMsVUFBSSx1QkFBdUIsS0FBSyxvQkFBTCxDQUEwQixJQUExQixDQUF2QjtVQUNBLG9CQUFvQixLQUFLLE9BQUwsRUFBcEIsQ0FGNkI7O0FBSWpDLFVBQUksK0JBQStCLHlCQUF5QixpQkFBekIsR0FDRSxLQUFLLCtCQUFMLENBQXFDLElBQXJDLENBREYsR0FFSSxJQUZKOztBQUpGLGFBUTFCLDRCQUFQLENBUmlDOzs7O1NBdkMvQjtFQUFzQjs7QUFtRDVCLGNBQWMsS0FBZCxHQUFzQixVQUFTLElBQVQsRUFBZSxZQUFmLEVBQTZCO0FBQ2pELE1BQUksZ0JBQWdCLFFBQVEsS0FBUixDQUFjLGFBQWQsRUFBNkIsWUFBN0IsRUFBMkMsSUFBM0MsRUFBaUQsWUFBakQsQ0FBaEIsQ0FENkM7O0FBR2pELGdCQUFjLGVBQWQsQ0FBOEIsSUFBOUIsRUFIaUQ7O0FBS2pELFNBQU8sYUFBUCxDQUxpRDtDQUE3Qjs7QUFRdEIsT0FBTyxPQUFQLEdBQWlCLGFBQWpCIiwiZmlsZSI6InJvb3REaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpLFxuICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnkgZXh0ZW5kcyBEaXJlY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIGV2ZW50SGFuZGxlcikge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZTsgIC8vL1xuXG4gICAgc3VwZXIoc2VsZWN0b3JPciRFbGVtZW50LCBuYW1lLCBjb2xsYXBzZWQsIGV2ZW50SGFuZGxlcik7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkge1xuICAgIHZhciBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZWFkT25seSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgdmFyIGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgIHN1cGVyLnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgc3VwZXIuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgdmFyIG1hcmtlciA9IHN1cGVyLmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBlbnRyeVR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICB2YXIgcGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSByb290RGlyZWN0b3J5TmFtZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDsgIC8vL1xuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWU7XG4gIH1cbn1cblxuUm9vdERpcmVjdG9yeS5jbG9uZSA9IGZ1bmN0aW9uKG5hbWUsIGV2ZW50SGFuZGxlcikge1xuICB2YXIgcm9vdERpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoUm9vdERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBldmVudEhhbmRsZXIpO1xuXG4gIHJvb3REaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiByb290RGlyZWN0b3J5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5O1xuIl19
