'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

var Explorer = function (_DroppableElement) {
  _inherits(Explorer, _DroppableElement);

  function Explorer(selector, rootDirectoryName, activateHandler, moveHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var rootDirectory = RootDirectory.clone(rootDirectoryName, _this.dragEventHandler.bind(_this), _this.activateFileEventHandler.bind(_this));

    _this.activateHandler = activateHandler;

    _this.rootDirectory = rootDirectory;

    _this.append(rootDirectory);
    return _this;
  }

  _createClass(Explorer, [{
    key: 'addFile',
    value: function addFile(filePath, readOnly) {
      this.rootDirectory.addFile(filePath, readOnly);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      this.rootDirectory.addDirectory(directoryPath, collapsed);
    }
  }, {
    key: 'getRootDirectoryName',
    value: function getRootDirectoryName() {
      return this.rootDirectory.getName();
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      return this.rootDirectory.getMarkedDirectory();
    }
  }, {
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      return this.rootDirectory.getDirectoryOverlappingEntry(entry);
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry) {
      var directoryOverlappingEntry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDirectoryOverlappingEntry(entry);

      var entryName = entry.getName(),
          entryType = entry.getType(),
          directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
          markerPath = directoryOverlappingEntryPath + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        this.rootDirectory.removeMarker();
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var rootDirectoryMarked = this.rootDirectory.isMarked(),
          marked = rootDirectoryMarked ? true : _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'isMarked', this).call(this);

      return marked;
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(entry) {
      var entryPath = entry.getPath(),
          entryType = entry.getType(),
          entryIsTopmost = util.isTopmostDirectoryName(entryPath);

      if (!entryIsTopmost) {
        var markerPath = entryPath;

        this.rootDirectory.addMarker(markerPath, entryType);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, entry);
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      var marked = this.isMarked(),
          startingDragging = !marked;

      if (startingDragging) {
        this.addMarkerInPlace(entry);
      }

      return startingDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      var entryPath = entry.getPath(),
          marked = this.isMarked(),
          markedDroppableElement = marked ? this : this.getMarkedDroppableElement(),
          markedDirectory = markedDroppableElement.getMarkedDirectory(),
          noMarkedDirectory = markedDirectory === null,
          markedDirectoryPath = noMarkedDirectory ? null : markedDirectory.getPath(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = markedDirectoryPath;

      if (sourcePath !== targetPath || sourcePath === null && targetPath === null && markedDroppableElement !== this) {
        var subEntries = entry.getSubEntries(),
            entries = subEntries;

        entries.reverse();
        entries.push(entry);

        markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function () {
          this.removeMarkerGlobally();
        }.bind(this));
      } else {
        this.removeMarkerGlobally();
      }
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var markedDirectory = this.getMarkedDirectory(),
          directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingEntry !== null && directoryOverlappingEntry !== markedDirectory) {
        this.removeMarkerGlobally();

        this.addMarker(entry, directoryOverlappingEntry);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'dragging', this).call(this, entry);
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var toBeMarked,
          entryPath = entry.getPath(),
          entryIsTopmostDirectory = util.isTopmostDirectoryName(entryPath);

      if (entryIsTopmostDirectory) {
        toBeMarked = false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        toBeMarked = directoryOverlappingEntry !== null;
      }

      return toBeMarked;
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourcePath, movedPath) {
      if (false) {} else if (movedPath === sourcePath) {} else if (movedPath === null) {
        directory.remove();
      } else {
        directory.remove();

        var collapsed = directory.isCollapsed(),
            directoryPath = movedPath;

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, movedPath) {
      if (false) {} else if (movedPath === sourcePath) {} else if (movedPath === null) {
        file.remove();
      } else {
        file.remove();

        var readOnly = file.getReadOnly(),
            filePath = movedPath;

        this.addFile(filePath, readOnly);
      }
    }
  }, {
    key: 'activateFileEventHandler',
    value: function activateFileEventHandler(activateFileEvent) {
      var file = activateFileEvent.getFile(),
          filePath = file.getPath(this.rootDirectory),
          sourcePath = filePath,
          ///
      result = this.activateHandler(sourcePath, cb);

      cb(result);

      function cb(result) {
        if (result === false) {
          file.remove();
        }
      }
    }
  }], [{
    key: 'clone',
    value: function clone(selector, rootDirectoryName, moveHandler, activateHandler) {
      return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, rootDirectoryName, moveHandler, activateHandler) {
      return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
    }
  }]);

  return Explorer;
}(DroppableElement);

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsInJlYWRPbmx5IiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJnZXROYW1lIiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwiZW50cnlQYXRoIiwiZW50cnlJc1RvcG1vc3QiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lIiwic3RhcnRpbmdEcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm5vTWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsInRvQmVNYXJrZWQiLCJlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImdldFJlYWRPbmx5IiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwicmVzdWx0IiwiY2IiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLG1CQUFtQkgsUUFBUSxvQkFBUixDQUR2QjtBQUFBLElBRUlJLGdCQUFnQkosUUFBUSx5Q0FBUixDQUZwQjs7SUFJTUssUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLGlCQUF0QixFQUF5Q0MsZUFBekMsRUFBMERDLFdBQTFELEVBQXVFO0FBQUE7O0FBQUEsb0hBQy9ESCxRQUQrRCxFQUNyREcsV0FEcUQ7O0FBR3JFLFFBQUlDLGdCQUFnQk4sY0FBY08sS0FBZCxDQUFvQkosaUJBQXBCLEVBQXVDLE1BQUtLLGdCQUFMLENBQXNCQyxJQUF0QixPQUF2QyxFQUF5RSxNQUFLQyx3QkFBTCxDQUE4QkQsSUFBOUIsT0FBekUsQ0FBcEI7O0FBRUEsVUFBS0wsZUFBTCxHQUF1QkEsZUFBdkI7O0FBRUEsVUFBS0UsYUFBTCxHQUFxQkEsYUFBckI7O0FBRUEsVUFBS0ssTUFBTCxDQUFZTCxhQUFaO0FBVHFFO0FBVXRFOzs7OzRCQUVPTSxRLEVBQVVDLFEsRUFBVTtBQUFFLFdBQUtQLGFBQUwsQ0FBbUJRLE9BQW5CLENBQTJCRixRQUEzQixFQUFxQ0MsUUFB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QXdCQyxRQUF4QixFQUFrQ0MsaUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWUrRCxJLEVBQU1oRSxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVF1RSxRQUFSLENBQWlCbkUsUUFBakIsRUFBMkJrRSxJQUEzQixFQUFpQ2hFLGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQWhNb0JMLGdCOztBQW1NdkJzRSxPQUFPQyxPQUFQLEdBQWlCckUsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWQgPSByb290RGlyZWN0b3J5TWFya2VkID9cbiAgICAgICAgICAgICAgICAgICB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgIHN1cGVyLmlzTWFya2VkKCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgc3RhcnRpbmdEcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRpbmdEcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRpbmdEcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBub01hcmtlZERpcmVjdG9yeSA9IChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gbm9NYXJrZWREaXJlY3RvcnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGg7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzID0gc3ViRW50cmllcztcblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAoKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpXG4gICAgICYmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBtYXJrZWREaXJlY3RvcnkpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuZHJhZ2dpbmcoZW50cnkpO1xuICAgIH1cbiAgfVxuICBcbiAgZXNjYXBlRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgdG9CZU1hcmtlZCxcbiAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICB0b0JlTWFya2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgcmVhZE9ubHkgPSBmaWxlLmdldFJlYWRPbmx5KCksXG4gICAgICAgICAgZmlsZVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgcmVzdWx0ID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgY2IpO1xuXG4gICAgY2IocmVzdWx0KTtcbiAgICBcbiAgICBmdW5jdGlvbiBjYihyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19