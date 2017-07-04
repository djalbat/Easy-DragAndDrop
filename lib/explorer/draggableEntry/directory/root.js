'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = require('../../../options'),
    pathUtil = require('../../../util/path'),
    Directory = require('../directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory() {
    _classCallCheck(this, RootDirectory);

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).apply(this, arguments));
  }

  _createClass(RootDirectory, [{
    key: 'get',
    value: function get() {
      return this; ///
    }
  }, {
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
      }
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
    key: 'addMarker',
    value: function addMarker(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      return {
        addFile: this.addFile.bind(this),
        removeFile: this.removeFile.bind(this),
        addDirectory: this.addDirectory.bind(this),
        removeDirectory: this.removeDirectory.bind(this),
        getMarkedDirectory: this.getMarkedDirectory.bind(this),
        getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
        getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
        addRootDirectoryMarker: this.addMarker.bind(this), ///
        removeRootDirectoryMarker: this.removeMarker.bind(this), ///
        isRootDirectoryMarked: this.isMarked.bind(this), ///
        getRootDirectoryName: this.getName.bind(this), ///
        getRootDirectory: this.get.bind(this), ///
        getFilePaths: this.getFilePaths.bind(this)
      };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZSIsInBhdGhVdGlsIiwiRGlyZWN0b3J5IiwiUm9vdERpcmVjdG9yeSIsImZpbGVQYXRoIiwiZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwib3ZlcmxhcHBpbmdFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImJpbmQiLCJyZW1vdmVGaWxlIiwiYWRkRGlyZWN0b3J5IiwicmVtb3ZlRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFkZFJvb3REaXJlY3RvcnlNYXJrZXIiLCJhZGRNYXJrZXIiLCJyZW1vdmVSb290RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlTWFya2VyIiwiaXNSb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJnZXRSb290RGlyZWN0b3J5TmFtZSIsImdldE5hbWUiLCJnZXRSb290RGlyZWN0b3J5IiwiZ2V0IiwiZ2V0RmlsZVBh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NkM7QUFDbERhLDhCQUFzQixLQUFLQyxPQUFMLENBQWFkLElBQWIsQ0FBa0IsSUFBbEIsQ0FYakIsRUFXMkM7QUFDaERlLDBCQUFrQixLQUFLQyxHQUFMLENBQVNoQixJQUFULENBQWMsSUFBZCxDQVpiLEVBWW1DO0FBQ3hDaUIsc0JBQWMsS0FBS0EsWUFBTCxDQUFrQmpCLElBQWxCLENBQXVCLElBQXZCO0FBYlQsT0FBUDtBQWVEOzs7bUNBRXFCa0IsVSxFQUFZO0FBQ2hDLGFBQU92QyxVQUFVd0MsY0FBVixDQUF5QnZDLGFBQXpCLEVBQXdDc0MsVUFBeEMsQ0FBUDtBQUNEOzs7O0VBdEZ5QnZDLFM7O0FBeUY1QnlDLE9BQU9DLE9BQVAsR0FBaUJ6QyxhQUFqQiIsImZpbGUiOiJyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vLi4vLi4vb3B0aW9ucycpLFxuICAgICAgcGF0aFV0aWwgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlsL3BhdGgnKSxcbiAgICAgIERpcmVjdG9yeSA9IHJlcXVpcmUoJy4uL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBSb290RGlyZWN0b3J5IGV4dGVuZHMgRGlyZWN0b3J5IHtcbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzOyAgLy8vXG4gIH1cbiAgXG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBvdmVybGFwcGluZ0VudHJ5ID9cbiAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gc3VwZXIuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBzdXBlci5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZEZpbGU6IHRoaXMuYWRkRmlsZS5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRmlsZTogdGhpcy5yZW1vdmVGaWxlLmJpbmQodGhpcyksXG4gICAgICBhZGREaXJlY3Rvcnk6IHRoaXMuYWRkRGlyZWN0b3J5LmJpbmQodGhpcyksXG4gICAgICByZW1vdmVEaXJlY3Rvcnk6IHRoaXMucmVtb3ZlRGlyZWN0b3J5LmJpbmQodGhpcyksXG4gICAgICBnZXRNYXJrZWREaXJlY3Rvcnk6IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5LmJpbmQodGhpcyksXG4gICAgICBnZXREcmFnZ2FibGVFbnRyeVBhdGg6IHRoaXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OiB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIGFkZFJvb3REaXJlY3RvcnlNYXJrZXI6IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksIC8vL1xuICAgICAgcmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlcjogdGhpcy5yZW1vdmVNYXJrZXIuYmluZCh0aGlzKSwgLy8vXG4gICAgICBpc1Jvb3REaXJlY3RvcnlNYXJrZWQ6IHRoaXMuaXNNYXJrZWQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0Um9vdERpcmVjdG9yeU5hbWU6IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRSb290RGlyZWN0b3J5OiB0aGlzLmdldC5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRGaWxlUGF0aHM6IHRoaXMuZ2V0RmlsZVBhdGhzLmJpbmQodGhpcylcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gRGlyZWN0b3J5LmZyb21Qcm9wZXJ0aWVzKFJvb3REaXJlY3RvcnksIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==