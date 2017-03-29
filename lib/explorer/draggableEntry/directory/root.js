'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('../../../util'),
    options = require('../../../options'),
    Directory = require('../directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory() {
    _classCallCheck(this, RootDirectory);

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).apply(this, arguments));
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
  }, {
    key: 'parentContext',
    value: function parentContext() {
      function getRootDirectory() {
        return this;
      }

      var parentContext = {
        addFile: this.addFile.bind(this),
        addDirectory: this.addDirectory.bind(this),
        removeFile: this.removeFile.bind(this),
        removeDirectory: this.removeDirectory.bind(this),
        getMarkedDirectory: this.getMarkedDirectory.bind(this),
        getFilePaths: this.getFilePaths.bind(this),
        getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
        getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
        addRootDirectoryMarker: this.addMarker.bind(this), ///
        removeRootDirectoryMarker: this.removeMarker.bind(this), ///
        isRootDirectoryMarked: this.isMarked.bind(this), ///
        getRootDirectoryName: this.getName.bind(this), ///
        getRootDirectory: getRootDirectory
      };

      return parentContext;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Directory.fromProperties(RootDirectory, properties);
    }
  }]);

  return RootDirectory;
}(Directory);

module.exports = RootDirectory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5IiwiZHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsIm92ZXJsYXBwaW5nRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aCIsImZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJnZXRSb290RGlyZWN0b3J5IiwicGFyZW50Q29udGV4dCIsImFkZEZpbGUiLCJiaW5kIiwiYWRkRGlyZWN0b3J5IiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImdldEZpbGVQYXRocyIsImdldERyYWdnYWJsZUVudHJ5UGF0aCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRSb290RGlyZWN0b3J5TWFya2VyIiwiYWRkTWFya2VyIiwicmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlciIsInJlbW92ZU1hcmtlciIsImlzUm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwiZ2V0Um9vdERpcmVjdG9yeU5hbWUi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Q0FBdUIsSUFBdkIsQ0FWUCxFQVVxQztBQUN6RFksK0JBQXVCLEtBQUtDLFFBQUwsQ0FBY2IsSUFBZCxDQUFtQixJQUFuQixDQVhILEVBVzhCO0FBQ2xEYyw4QkFBc0IsS0FBS0MsT0FBTCxDQUFhZixJQUFiLENBQWtCLElBQWxCLENBWkYsRUFZNEI7QUFDaERILDBCQUFrQkE7QUFiRSxPQUF0Qjs7QUFnQkEsYUFBT0MsYUFBUDtBQUNEOzs7bUNBRXFCa0IsVSxFQUFZO0FBQ2hDLGFBQU92QyxVQUFVd0MsY0FBVixDQUF5QnZDLGFBQXpCLEVBQXdDc0MsVUFBeEMsQ0FBUDtBQUNEOzs7O0VBeEZ5QnZDLFM7O0FBMkY1QnlDLE9BQU9DLE9BQVAsR0FBaUJ6QyxhQUFqQiIsImZpbGUiOiJyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbCcpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uL29wdGlvbnMnKSxcbiAgICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4uL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5IGV4dGVuZHMgRGlyZWN0b3J5IHtcbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG4gICAgXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBvdmVybGFwcGluZ0VudHJ5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gc3VwZXIuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5OyAgICBcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgZnVuY3Rpb24gZ2V0Um9vdERpcmVjdG9yeSgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBwYXJlbnRDb250ZXh0ID0ge1xuICAgICAgYWRkRmlsZTogdGhpcy5hZGRGaWxlLmJpbmQodGhpcyksXG4gICAgICBhZGREaXJlY3Rvcnk6IHRoaXMuYWRkRGlyZWN0b3J5LmJpbmQodGhpcyksXG4gICAgICByZW1vdmVGaWxlOiB0aGlzLnJlbW92ZUZpbGUuYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZURpcmVjdG9yeTogdGhpcy5yZW1vdmVEaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIGdldE1hcmtlZERpcmVjdG9yeTogdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIGdldEZpbGVQYXRoczogdGhpcy5nZXRGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgIGdldERyYWdnYWJsZUVudHJ5UGF0aDogdGhpcy5nZXREcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk6IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgYWRkUm9vdERpcmVjdG9yeU1hcmtlcjogdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSwgLy8vXG4gICAgICByZW1vdmVSb290RGlyZWN0b3J5TWFya2VyOiB0aGlzLnJlbW92ZU1hcmtlci5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIGlzUm9vdERpcmVjdG9yeU1hcmtlZDogdGhpcy5pc01hcmtlZC5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRSb290RGlyZWN0b3J5TmFtZTogdGhpcy5nZXROYW1lLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFJvb3REaXJlY3Rvcnk6IGdldFJvb3REaXJlY3RvcnlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBhcmVudENvbnRleHQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBEaXJlY3RvcnkuZnJvbVByb3BlcnRpZXMoUm9vdERpcmVjdG9yeSwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5O1xuIl19