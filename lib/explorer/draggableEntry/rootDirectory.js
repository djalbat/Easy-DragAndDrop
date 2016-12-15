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

  function RootDirectory(selector, name, explorer, activateFileEventHandler) {
    _classCallCheck(this, RootDirectory);

    var collapsed = false; ///

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).call(this, selector, name, collapsed, explorer, activateFileEventHandler));
  }

  _createClass(RootDirectory, [{
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingEntry,
          explorer = this.getExplorer(),
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
    value: function removeFile(filePath, removeEmptyParentDirectories) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName, removeEmptyParentDirectories);
      }
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
    value: function addMarker(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }], [{
    key: 'clone',
    value: function clone(name, explorer, activateFileEventHandler) {
      var rootDirectory = Element.clone(RootDirectory, '#directory', name, explorer, activateFileEventHandler);

      rootDirectory.removeAttribute('id');

      return rootDirectory;
    }
  }]);

  return RootDirectory;
}(Directory);

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJjb2xsYXBzZWQiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxVQUFVSCxRQUFRLGVBQVIsQ0FEZDtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjs7SUFJTUssYTs7O0FBQ0oseUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0Msd0JBQXRDLEVBQWdFO0FBQUE7O0FBQzlELFFBQUlDLFlBQVksS0FBaEIsQ0FEOEQsQ0FDdEM7O0FBRHNDLHlIQUd4REosUUFId0QsRUFHOUNDLElBSDhDLEVBR3hDRyxTQUh3QyxFQUc3QkYsUUFINkIsRUFHbkJDLHdCQUhtQjtBQUkvRDs7OztzQ0FFaUI7QUFDaEIsYUFBTyxJQUFQO0FBQ0Q7OzswREFFcUNFLGMsRUFBZ0I7QUFDcEQsVUFBSUMseUJBQUo7QUFBQSxVQUNJSixXQUFXLEtBQUtLLFdBQUwsRUFEZjtBQUFBLFVBRUlDLCtCQUErQk4sU0FBU08sU0FBVCxDQUFtQlosUUFBUWEsZ0NBQTNCLENBRm5DOztBQUlBLFVBQUlGLDRCQUFKLEVBQWtDO0FBQ2hDLFlBQUlHLG1CQUFtQixLQUFLQywyQkFBTCxDQUFpQ1AsY0FBakMsQ0FBdkI7O0FBRUFDLG9DQUE0QkssbUJBQ0UsSUFERixHQUVJLElBRmhDO0FBR0QsT0FORCxNQU1PO0FBQ0xMLHdMQUF3RUQsY0FBeEU7QUFDRDs7QUFFRCxhQUFPQyx5QkFBUDtBQUNEOzs7NEJBRU9PLFEsRUFBVTtBQUNoQixVQUFJQyxtQ0FBbUNsQixLQUFLbUIsK0JBQUwsQ0FBcUNGLFFBQXJDLENBQXZDOztBQUVBLFVBQUlDLHFDQUFxQyxJQUF6QyxFQUErQztBQUM3Qyw4SEFBY0EsZ0NBQWQ7QUFDRDtBQUNGOzs7aUNBRVlFLGEsRUFBZVosUyxFQUFXO0FBQ3JDLFVBQUlhLHdDQUF3Q3JCLEtBQUttQiwrQkFBTCxDQUFxQ0MsYUFBckMsQ0FBNUM7O0FBRUEsVUFBSUMsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELG1JQUFtQkEscUNBQW5CLEVBQTBEYixTQUExRDtBQUNEO0FBQ0Y7OzsrQkFFVVMsUSxFQUFVSyw0QixFQUE4QjtBQUNqRCxVQUFJSixtQ0FBbUNsQixLQUFLbUIsK0JBQUwsQ0FBcUNGLFFBQXJDLENBQXZDOztBQUVBLFVBQUlDLHFDQUFxQyxJQUF6QyxFQUErQztBQUM3QyxpSUFBaUJBLGdDQUFqQixFQUFtREksNEJBQW5EO0FBQ0Q7QUFDRjs7O29DQUVlRixhLEVBQWVFLDRCLEVBQThCO0FBQzNELFVBQUlELHdDQUF3Q3JCLEtBQUttQiwrQkFBTCxDQUFxQ0MsYUFBckMsQ0FBNUM7O0FBRUEsVUFBSUMsMENBQTBDLElBQTlDLEVBQW9EO0FBQ2xELHNJQUFzQkEscUNBQXRCLEVBQTZEQyw0QkFBN0Q7QUFDRDtBQUNGOzs7OEJBRVNDLFUsRUFBWUMsa0IsRUFBb0I7QUFDeEMsVUFBSUMscUNBQXFDekIsS0FBS21CLCtCQUFMLENBQXFDSSxVQUFyQyxDQUF6Qzs7QUFFQSw4SEFBZ0JFLGtDQUFoQixFQUFvREQsa0JBQXBEO0FBQ0Q7OzswQkFFWW5CLEksRUFBTUMsUSxFQUFVQyx3QixFQUEwQjtBQUNyRCxVQUFJbUIsZ0JBQWdCM0IsUUFBUTRCLEtBQVIsQ0FBY3hCLGFBQWQsRUFBNkIsWUFBN0IsRUFBMkNFLElBQTNDLEVBQWlEQyxRQUFqRCxFQUEyREMsd0JBQTNELENBQXBCOztBQUVBbUIsb0JBQWNFLGVBQWQsQ0FBOEIsSUFBOUI7O0FBRUEsYUFBT0YsYUFBUDtBQUNEOzs7O0VBekV5QnhCLFM7O0FBNEU1QjJCLE9BQU9DLE9BQVAsR0FBaUIzQixhQUFqQiIsImZpbGUiOiJyb290RGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vLi4vb3B0aW9ucycpLFxuICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnkgZXh0ZW5kcyBEaXJlY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZTsgIC8vL1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gIH1cbiAgXG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSxcbiAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG4gICAgXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIHZhciBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gb3ZlcmxhcHBpbmdFbnRyeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHN1cGVyLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTsgICAgXG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgdmFyIGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICB2YXIgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKFJvb3REaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICByb290RGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==