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
      var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5IiwiZmlsZVBhdGgiLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJvdmVybGFwcGluZ0VudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlIiwiYmluZCIsInJlbW92ZUZpbGUiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkUm9vdERpcmVjdG9yeU1hcmtlciIsImFkZE1hcmtlciIsInJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJpc1Jvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsImdldFJvb3REaXJlY3RvcnlOYW1lIiwiZ2V0TmFtZSIsImdldFJvb3REaXJlY3RvcnkiLCJnZXQiLCJnZXRGaWxlUGF0aHMi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YSw4QkFBc0IsS0FBS0MsT0FBTCxDQUFhZCxJQUFiLENBQWtCLElBQWxCLENBWGpCLEVBVzJDO0FBQ2hEZSwwQkFBa0IsS0FBS0MsR0FBTCxDQUFTaEIsSUFBVCxDQUFjLElBQWQsQ0FaYixFQVltQztBQUN4Q2lCLHNCQUFjLEtBQUtBLFlBQUwsQ0FBa0JqQixJQUFsQixDQUF1QixJQUF2QjtBQWJULE9BQVA7QUFlRDs7O21DQUVxQmtCLFUsRUFBWTtBQUNoQyxhQUFPdkMsVUFBVXdDLGNBQVYsQ0FBeUJ2QyxhQUF6QixFQUF3Q3NDLFVBQXhDLENBQVA7QUFDRDs7OztFQXRGeUJ2QyxTOztBQXlGNUJ5QyxPQUFPQyxPQUFQLEdBQWlCekMsYUFBakIiLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGhpczsgIC8vL1xuICB9XG4gIFxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBvdmVybGFwcGluZ0VudHJ5ID9cbiAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gc3VwZXIuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgbWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIHN1cGVyLmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkRmlsZTogdGhpcy5hZGRGaWxlLmJpbmQodGhpcyksXG4gICAgICByZW1vdmVGaWxlOiB0aGlzLnJlbW92ZUZpbGUuYmluZCh0aGlzKSxcbiAgICAgIGFkZERpcmVjdG9yeTogdGhpcy5hZGREaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZURpcmVjdG9yeTogdGhpcy5yZW1vdmVEaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIGdldE1hcmtlZERpcmVjdG9yeTogdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIGdldERyYWdnYWJsZUVudHJ5UGF0aDogdGhpcy5nZXREcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk6IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgYWRkUm9vdERpcmVjdG9yeU1hcmtlcjogdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSwgLy8vXG4gICAgICByZW1vdmVSb290RGlyZWN0b3J5TWFya2VyOiB0aGlzLnJlbW92ZU1hcmtlci5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIGlzUm9vdERpcmVjdG9yeU1hcmtlZDogdGhpcy5pc01hcmtlZC5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRSb290RGlyZWN0b3J5TmFtZTogdGhpcy5nZXROYW1lLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFJvb3REaXJlY3Rvcnk6IHRoaXMuZ2V0LmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldEZpbGVQYXRoczogdGhpcy5nZXRGaWxlUGF0aHMuYmluZCh0aGlzKVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBEaXJlY3RvcnkuZnJvbVByb3BlcnRpZXMoUm9vdERpcmVjdG9yeSwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5O1xuIl19