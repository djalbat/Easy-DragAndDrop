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

  function RootDirectory(selector, name, explorer) {
    _classCallCheck(this, RootDirectory);

    var collapsed = false; ///

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).call(this, selector, name, collapsed, explorer));
  }

  _createClass(RootDirectory, [{
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingEntry = void 0;

      var explorer = this.getExplorer(),
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
    value: function clone(name, explorer) {
      var rootDirectory = new RootDirectory('#directory', name, explorer);

      rootDirectory = Element.clone(RootDirectory, rootDirectory, name, explorer); ///

      rootDirectory.removeAttribute('id');

      return rootDirectory;
    }
  }]);

  return RootDirectory;
}(Directory);

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJjb2xsYXBzZWQiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJyb290RGlyZWN0b3J5IiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxVQUFVRixPQUFPRSxPQUR2Qjs7QUFHQSxJQUFNQyxPQUFPRixRQUFRLFlBQVIsQ0FBYjtBQUFBLElBQ01HLFVBQVVILFFBQVEsZUFBUixDQURoQjtBQUFBLElBRU1JLFlBQVlKLFFBQVEsYUFBUixDQUZsQjs7SUFJTUssYTs7O0FBQ0oseUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUNwQyxRQUFNQyxZQUFZLEtBQWxCLENBRG9DLENBQ1Y7O0FBRFUseUhBRzlCSCxRQUg4QixFQUdwQkMsSUFIb0IsRUFHZEUsU0FIYyxFQUdIRCxRQUhHO0FBSXJDOzs7O3NDQUVpQjtBQUNoQixhQUFPLElBQVA7QUFDRDs7OzBEQUVxQ0UsYyxFQUFnQjtBQUNwRCxVQUFJQyxrQ0FBSjs7QUFFQSxVQUFNSCxXQUFXLEtBQUtJLFdBQUwsRUFBakI7QUFBQSxVQUNNQywrQkFBK0JMLFNBQVNNLFNBQVQsQ0FBbUJYLFFBQVFZLGdDQUEzQixDQURyQzs7QUFHQSxVQUFJRiw0QkFBSixFQUFrQztBQUNoQyxZQUFNRyxtQkFBbUIsS0FBS0MsMkJBQUwsQ0FBaUNQLGNBQWpDLENBQXpCOztBQUVBQyxvQ0FBNEJLLG1CQUNFLElBREYsR0FFSSxJQUZoQztBQUdELE9BTkQsTUFNTztBQUNMTCx3TEFBd0VELGNBQXhFO0FBQ0Q7O0FBRUQsYUFBT0MseUJBQVA7QUFDRDs7OzRCQUVPTyxRLEVBQVU7QUFDaEIsVUFBTUMsbUNBQW1DakIsS0FBS2tCLCtCQUFMLENBQXFDRixRQUFyQyxDQUF6Qzs7QUFFQSxVQUFJQyxxQ0FBcUMsSUFBekMsRUFBK0M7QUFDN0MsOEhBQWNBLGdDQUFkO0FBQ0Q7QUFDRjs7O2lDQUVZRSxhLEVBQWVaLFMsRUFBVztBQUNyQyxVQUFNYSx3Q0FBd0NwQixLQUFLa0IsK0JBQUwsQ0FBcUNDLGFBQXJDLENBQTlDOztBQUVBLFVBQUlDLDBDQUEwQyxJQUE5QyxFQUFvRDtBQUNsRCxtSUFBbUJBLHFDQUFuQixFQUEwRGIsU0FBMUQ7QUFDRDtBQUNGOzs7K0JBRVVTLFEsRUFBVTtBQUNuQixVQUFNQyxtQ0FBbUNqQixLQUFLa0IsK0JBQUwsQ0FBcUNGLFFBQXJDLENBQXpDOztBQUVBLFVBQUlDLHFDQUFxQyxJQUF6QyxFQUErQztBQUM3QyxpSUFBaUJBLGdDQUFqQjtBQUNEO0FBQ0Y7OztvQ0FFZUUsYSxFQUFlO0FBQzdCLFVBQU1DLHdDQUF3Q3BCLEtBQUtrQiwrQkFBTCxDQUFxQ0MsYUFBckMsQ0FBOUM7O0FBRUEsVUFBSUMsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELHNJQUFzQkEscUNBQXRCO0FBQ0Q7QUFDRjs7OzhCQUVTQyxVLEVBQVlDLGtCLEVBQW9CO0FBQ3hDLFVBQU1DLHFDQUFxQ3ZCLEtBQUtrQiwrQkFBTCxDQUFxQ0csVUFBckMsQ0FBM0M7O0FBRUEsOEhBQWdCRSxrQ0FBaEIsRUFBb0RELGtCQUFwRDtBQUNEOzs7MEJBRVlqQixJLEVBQU1DLFEsRUFBVTtBQUMzQixVQUFJa0IsZ0JBQWdCLElBQUlyQixhQUFKLENBQWtCLFlBQWxCLEVBQWdDRSxJQUFoQyxFQUFzQ0MsUUFBdEMsQ0FBcEI7O0FBRUFrQixzQkFBZ0J6QixRQUFRMEIsS0FBUixDQUFjdEIsYUFBZCxFQUE2QnFCLGFBQTdCLEVBQTRDbkIsSUFBNUMsRUFBa0RDLFFBQWxELENBQWhCLENBSDJCLENBR21EOztBQUU5RWtCLG9CQUFjRSxlQUFkLENBQThCLElBQTlCOztBQUVBLGFBQU9GLGFBQVA7QUFDRDs7OztFQTVFeUJ0QixTOztBQStFNUJ5QixPQUFPQyxPQUFQLEdBQWlCekIsYUFBakIiLCJmaWxlIjoicm9vdERpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vLi4vb3B0aW9ucycpLFxuICAgICAgRGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IGZhbHNlOyAgLy8vXG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gIH1cbiAgXG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuICAgIFxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gb3ZlcmxhcHBpbmdFbnRyeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHN1cGVyLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTsgICAgXG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgZXhwbG9yZXIpIHtcbiAgICBsZXQgcm9vdERpcmVjdG9yeSA9IG5ldyBSb290RGlyZWN0b3J5KCcjZGlyZWN0b3J5JywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgcm9vdERpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoUm9vdERpcmVjdG9yeSwgcm9vdERpcmVjdG9yeSwgbmFtZSwgZXhwbG9yZXIpOyAgLy8vXG5cbiAgICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==