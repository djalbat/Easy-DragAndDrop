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
      function getRootDirectory() {
        return this;
      }

      var parentContext = {
        addFile: this.addFile.bind(this),
        addDirectory: this.addDirectory.bind(this),
        removeFile: this.removeFile.bind(this),
        removeDirectory: this.removeDirectory.bind(this),
        getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
        getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
        getMarkedDirectory: this.getMarkedDirectory.bind(this),
        getFilePaths: this.getFilePaths.bind(this),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJEaXJlY3RvcnkiLCJSb290RGlyZWN0b3J5IiwiZmlsZVBhdGgiLCJmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJvdmVybGFwcGluZ0VudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUiLCJnZXRSb290RGlyZWN0b3J5IiwicGFyZW50Q29udGV4dCIsImFkZEZpbGUiLCJiaW5kIiwiYWRkRGlyZWN0b3J5IiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJnZXRGaWxlUGF0aHMiLCJhZGRSb290RGlyZWN0b3J5TWFya2VyIiwiYWRkTWFya2VyIiwicmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlciIsInJlbW92ZU1hcmtlciIsImlzUm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwiZ2V0Um9vdERpcmVjdG9yeU5hbWUi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LElBQXZCLENBVlAsRUFVcUM7QUFDekRZLCtCQUF1QixLQUFLQyxRQUFMLENBQWNiLElBQWQsQ0FBbUIsSUFBbkIsQ0FYSCxFQVc4QjtBQUNsRGMsOEJBQXNCLEtBQUtDLE9BQUwsQ0FBYWYsSUFBYixDQUFrQixJQUFsQixDQVpGLEVBWTRCO0FBQ2hESCwwQkFBa0JBO0FBYkUsT0FBdEI7O0FBZ0JBLGFBQU9DLGFBQVA7QUFDRDs7O21DQUVxQmtCLFUsRUFBWTtBQUNoQyxhQUFPdkMsVUFBVXdDLGNBQVYsQ0FBeUJ2QyxhQUF6QixFQUF3Q3NDLFVBQXhDLENBQVA7QUFDRDs7OztFQXhGeUJ2QyxTOztBQTJGNUJ5QyxPQUFPQyxPQUFQLEdBQWlCekMsYUFBakIiLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG5cbiAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllcykge1xuICAgICAgY29uc3Qgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG92ZXJsYXBwaW5nRW50cnkgP1xuICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBzdXBlci5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIGZ1bmN0aW9uIGdldFJvb3REaXJlY3RvcnkoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcGFyZW50Q29udGV4dCA9IHtcbiAgICAgIGFkZEZpbGU6IHRoaXMuYWRkRmlsZS5iaW5kKHRoaXMpLFxuICAgICAgYWRkRGlyZWN0b3J5OiB0aGlzLmFkZERpcmVjdG9yeS5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRmlsZTogdGhpcy5yZW1vdmVGaWxlLmJpbmQodGhpcyksXG4gICAgICByZW1vdmVEaXJlY3Rvcnk6IHRoaXMucmVtb3ZlRGlyZWN0b3J5LmJpbmQodGhpcyksXG4gICAgICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OiB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIGdldERyYWdnYWJsZUVudHJ5UGF0aDogdGhpcy5nZXREcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIGdldE1hcmtlZERpcmVjdG9yeTogdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIGdldEZpbGVQYXRoczogdGhpcy5nZXRGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgIGFkZFJvb3REaXJlY3RvcnlNYXJrZXI6IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksIC8vL1xuICAgICAgcmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlcjogdGhpcy5yZW1vdmVNYXJrZXIuYmluZCh0aGlzKSwgLy8vXG4gICAgICBpc1Jvb3REaXJlY3RvcnlNYXJrZWQ6IHRoaXMuaXNNYXJrZWQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0Um9vdERpcmVjdG9yeU5hbWU6IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBnZXRSb290RGlyZWN0b3J5OiBnZXRSb290RGlyZWN0b3J5XG4gICAgfTtcblxuICAgIHJldHVybiBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gRGlyZWN0b3J5LmZyb21Qcm9wZXJ0aWVzKFJvb3REaXJlY3RvcnksIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeTtcbiJdfQ==