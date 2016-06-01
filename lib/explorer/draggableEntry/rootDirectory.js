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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7SUFDSSxVQUFVLE9BQU8sT0FEckI7O0FBR0EsSUFBSSxPQUFPLFFBQVEsWUFBUixDQUFYO0lBQ0ksWUFBWSxRQUFRLGFBQVIsQ0FEaEI7O0lBR00sYTs7O0FBQ0oseUJBQVksUUFBWixFQUFzQixJQUF0QixFQUE0QixnQkFBNUIsRUFBOEMsd0JBQTlDLEVBQXdFO0FBQUE7O0FBQ3RFLFFBQUksWUFBWSxLQUFoQixDOztBQURzRSw0RkFHaEUsUUFIZ0UsRUFHdEQsSUFIc0QsRUFHaEQsU0FIZ0QsRUFHckMsZ0JBSHFDLEVBR25CLHdCQUhtQjtBQUl2RTs7Ozs0QkFFTyxRLEVBQVUsUSxFQUFVO0FBQzFCLFVBQUksbUNBQW1DLEtBQUssNEJBQUwsQ0FBa0MsUUFBbEMsQ0FBdkM7O0FBRUEsdUZBQWMsZ0NBQWQsRUFBZ0QsUUFBaEQ7QUFDRDs7O2lDQUVZLGEsRUFBZSxTLEVBQVc7QUFDckMsVUFBSSx3Q0FBd0MsS0FBSyw0QkFBTCxDQUFrQyxhQUFsQyxDQUE1Qzs7QUFFQSw0RkFBbUIscUNBQW5CLEVBQTBELFNBQTFEO0FBQ0Q7Ozs4QkFFUyxVLEVBQVksUyxFQUFXO0FBQy9CLFVBQUkscUNBQXFDLEtBQUssNEJBQUwsQ0FBa0MsVUFBbEMsQ0FBekM7O0FBRUEsVUFBSSw0RkFBeUIsa0NBQXpCLEVBQTZELFNBQTdELENBQUo7O0FBRUEsYUFBTyxNQUFQO0FBQ0Q7OztpREFFNEIsSSxFQUFNO0FBQ2pDLFVBQUksdUJBQXVCLEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsQ0FBM0I7VUFDSSxvQkFBb0IsS0FBSyxPQUFMLEVBRHhCOztBQUdBLFVBQUksK0JBQStCLHlCQUF5QixpQkFBekIsR0FDRSxLQUFLLCtCQUFMLENBQXFDLElBQXJDLENBREYsR0FFSSxJQUZ2QyxDOztBQUlBLGFBQU8sNEJBQVA7QUFDRDs7OztFQXBDeUIsUzs7QUF1QzVCLGNBQWMsS0FBZCxHQUFzQixVQUFTLElBQVQsRUFBZSxnQkFBZixFQUFpQyx3QkFBakMsRUFBMkQ7QUFDL0UsTUFBSSxnQkFBZ0IsUUFBUSxLQUFSLENBQWMsYUFBZCxFQUE2QixZQUE3QixFQUEyQyxJQUEzQyxFQUFpRCxnQkFBakQsRUFBbUUsd0JBQW5FLENBQXBCOztBQUVBLGdCQUFjLGVBQWQsQ0FBOEIsSUFBOUI7O0FBRUEsU0FBTyxhQUFQO0FBQ0QsQ0FORDs7QUFRQSxPQUFPLE9BQVAsR0FBaUIsYUFBakIiLCJmaWxlIjoicm9vdERpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyksXG4gICAgRGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gZmFsc2U7ICAvLy9cblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkge1xuICAgIHZhciBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRoaXMucGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZWFkT25seSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB0aGlzLnBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5wYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgdmFyIG1hcmtlciA9IHN1cGVyLmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBlbnRyeVR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICB2YXIgcGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSByb290RGlyZWN0b3J5TmFtZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDsgIC8vL1xuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWU7XG4gIH1cbn1cblxuUm9vdERpcmVjdG9yeS5jbG9uZSA9IGZ1bmN0aW9uKG5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICB2YXIgcm9vdERpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoUm9vdERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gIHJvb3REaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiByb290RGlyZWN0b3J5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5O1xuIl19
