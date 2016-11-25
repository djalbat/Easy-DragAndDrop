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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkRpcmVjdG9yeSIsIlJvb3REaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiY29sbGFwc2VkIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwibWFya2VyUGF0aCIsImVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJtYXJrZXIiLCJwYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyb290RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxZQUFZSCxRQUFRLGFBQVIsQ0FEaEI7O0lBR01JLGE7OztBQUNKLHlCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsZ0JBQTVCLEVBQThDQyx3QkFBOUMsRUFBd0U7QUFBQTs7QUFDdEUsUUFBSUMsWUFBWSxLQUFoQixDQURzRSxDQUM5Qzs7QUFEOEMseUhBR2hFSixRQUhnRSxFQUd0REMsSUFIc0QsRUFHaERHLFNBSGdELEVBR3JDRixnQkFIcUMsRUFHbkJDLHdCQUhtQjtBQUl2RTs7Ozs0QkFFT0UsUSxFQUFVQyxRLEVBQVU7QUFDMUIsVUFBSUMsbUNBQW1DLEtBQUtDLDRCQUFMLENBQWtDSCxRQUFsQyxDQUF2Qzs7QUFFQSw0SEFBY0UsZ0NBQWQsRUFBZ0RELFFBQWhEO0FBQ0Q7OztpQ0FFWUcsYSxFQUFlTCxTLEVBQVc7QUFDckMsVUFBSU0sd0NBQXdDLEtBQUtGLDRCQUFMLENBQWtDQyxhQUFsQyxDQUE1Qzs7QUFFQSxVQUFJQywwQ0FBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsbUlBQW1CQSxxQ0FBbkIsRUFBMEROLFNBQTFEO0FBQ0Q7QUFDRjs7OzhCQUVTTyxVLEVBQVlDLFMsRUFBVztBQUMvQixVQUFJQyxxQ0FBcUMsS0FBS0wsNEJBQUwsQ0FBa0NHLFVBQWxDLENBQXpDOztBQUVBLFVBQUlHLGlJQUF5QkQsa0NBQXpCLEVBQTZERCxTQUE3RCxDQUFKOztBQUVBLGFBQU9FLE1BQVA7QUFDRDs7O2lEQUU0QkMsSSxFQUFNO0FBQ2pDLFVBQUlDLHVCQUF1Qm5CLEtBQUttQixvQkFBTCxDQUEwQkQsSUFBMUIsQ0FBM0I7QUFBQSxVQUNJRSxvQkFBb0IsS0FBS0MsT0FBTCxFQUR4QjtBQUFBLFVBRUlWLCtCQUErQlEseUJBQXlCQyxpQkFBekIsR0FDRXBCLEtBQUtzQiwrQkFBTCxDQUFxQ0osSUFBckMsQ0FERixHQUVJLElBSnZDLENBRGlDLENBS2E7O0FBRTlDLGFBQU9QLDRCQUFQO0FBQ0Q7OzswQkFFWVAsSSxFQUFNQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDN0QsVUFBSWlCLGdCQUFnQnhCLFFBQVF5QixLQUFSLENBQWN0QixhQUFkLEVBQTZCLFlBQTdCLEVBQTJDRSxJQUEzQyxFQUFpREMsZ0JBQWpELEVBQW1FQyx3QkFBbkUsQ0FBcEI7O0FBRUFpQixvQkFBY0UsZUFBZCxDQUE4QixJQUE5Qjs7QUFFQSxhQUFPRixhQUFQO0FBQ0Q7Ozs7RUE3Q3lCdEIsUzs7QUFnRDVCeUIsT0FBT0MsT0FBUCxHQUFpQnpCLGFBQWpCIiwiZmlsZSI6InJvb3REaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnkgZXh0ZW5kcyBEaXJlY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IGZhbHNlOyAgLy8vXG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgc3VwZXIuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgcmVhZE9ubHkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgdmFyIG1hcmtlciA9IHN1cGVyLmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBlbnRyeVR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gcm9vdERpcmVjdG9yeU5hbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciByb290RGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShSb290RGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==