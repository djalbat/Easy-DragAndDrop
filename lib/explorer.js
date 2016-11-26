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
      success = this.activateHandler(sourcePath, fail),
          failure = success === false;

      if (failure) {
        fail();
      }

      function fail() {
        file.remove();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsInJlYWRPbmx5IiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJnZXROYW1lIiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwiZW50cnlQYXRoIiwiZW50cnlJc1RvcG1vc3QiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lIiwic3RhcnRpbmdEcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm5vTWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsInRvQmVNYXJrZWQiLCJlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImdldFJlYWRPbmx5IiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwic3VjY2VzcyIsImZhaWwiLCJmYWlsdXJlIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE1BQUwsQ0FBWUwsYUFBWjtBQVRxRTtBQVV0RTs7Ozs0QkFFT00sUSxFQUFVQyxRLEVBQVU7QUFBRSxXQUFLUCxhQUFMLENBQW1CUSxPQUFuQixDQUEyQkYsUUFB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QUFjTixRQUFkLEVBQXdCQyxRQUF4QixFQUFrQ0MsaUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWVnRSxJLEVBQU1qRSxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVF3RSxRQUFSLENBQWlCcEUsUUFBakIsRUFBMkJtRSxJQUEzQixFQUFpQ2pFLGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQWpNb0JMLGdCOztBQW9NdkJ1RSxPQUFPQyxPQUFQLEdBQWlCdEUsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWQgPSByb290RGlyZWN0b3J5TWFya2VkID9cbiAgICAgICAgICAgICAgICAgICB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgIHN1cGVyLmlzTWFya2VkKCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgc3RhcnRpbmdEcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRpbmdEcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRpbmdEcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBub01hcmtlZERpcmVjdG9yeSA9IChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gbm9NYXJrZWREaXJlY3RvcnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGg7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzID0gc3ViRW50cmllcztcblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAoKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpXG4gICAgICYmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBtYXJrZWREaXJlY3RvcnkpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuZHJhZ2dpbmcoZW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIHRvQmVNYXJrZWQsXG4gICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3REaXJlY3RvcnkgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmIChlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgdG9CZU1hcmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgICBcbiAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBmYWlsKSxcbiAgICAgICAgZmFpbHVyZSA9IChzdWNjZXNzID09PSBmYWxzZSk7XG5cbiAgICBpZiAoZmFpbHVyZSkge1xuICAgICAgZmFpbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhaWwoKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==