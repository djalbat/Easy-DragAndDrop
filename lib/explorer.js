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
    value: function addFile(filePath) {
      this.rootDirectory.addFile(filePath);
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
          entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);

      if (!entryPathTopmostDirectoryName) {
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
          startDragging = !marked;

      if (startDragging) {
        this.addMarkerInPlace(entry);
      }

      return startDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry, done) {
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

          done();
        }.bind(this));
      } else {
        this.removeMarkerGlobally();

        done();
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
          entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath),
          entryTopmostDirectory = entryPathTopmostDirectoryName; ///

      if (entryTopmostDirectory) {
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

        var filePath = movedPath; ///

        this.addFile(filePath);
      }
    }
  }, {
    key: 'activateFileEventHandler',
    value: function activateFileEventHandler(activateFileEvent) {
      var file = activateFileEvent.getFile(),
          filePath = file.getPath(this.rootDirectory),
          sourcePath = filePath,
          ///
      result = this.activateHandler(sourcePath, callback);

      callback(result);

      function callback(result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJlbnRyeU5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJnZXRQYXRoIiwibWFya2VyUGF0aCIsImFkZE1hcmtlciIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsIm1hcmtlZCIsImVudHJ5UGF0aCIsImVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJzdGFydERyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm5vTWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsInRvQmVNYXJrZWQiLCJlbnRyeVRvcG1vc3REaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJtb3ZlZFBhdGgiLCJyZW1vdmUiLCJpc0NvbGxhcHNlZCIsImZpbGUiLCJhY3RpdmF0ZUZpbGVFdmVudCIsImdldEZpbGUiLCJyZXN1bHQiLCJjYWxsYmFjayIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsbUJBQW1CSCxRQUFRLG9CQUFSLENBRHZCO0FBQUEsSUFFSUksZ0JBQWdCSixRQUFRLHlDQUFSLENBRnBCOztJQUlNSyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXlDQyxlQUF6QyxFQUEwREMsV0FBMUQsRUFBdUU7QUFBQTs7QUFBQSxvSEFDL0RILFFBRCtELEVBQ3JERyxXQURxRDs7QUFHckUsUUFBSUMsZ0JBQWdCTixjQUFjTyxLQUFkLENBQW9CSixpQkFBcEIsRUFBdUMsTUFBS0ssZ0JBQUwsQ0FBc0JDLElBQXRCLE9BQXZDLEVBQXlFLE1BQUtDLHdCQUFMLENBQThCRCxJQUE5QixPQUF6RSxDQUFwQjs7QUFFQSxVQUFLTCxlQUFMLEdBQXVCQSxlQUF2Qjs7QUFFQSxVQUFLRSxhQUFMLEdBQXFCQSxhQUFyQjs7QUFFQSxVQUFLSyxNQUFMLENBQVlMLGFBQVo7QUFUcUU7QUFVdEU7Ozs7NEJBRU9NLFEsRUFBVTtBQUFFLFdBQUtOLGFBQUwsQ0FBbUJPLE9BQW5CLENBQTJCRCxRQUEzQjtBQUF1Qzs7O2lDQUM5Q0Us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QUFjTixRQUFkLEVBQXdCQyxRQUF4QixFQUFrQ0MsaUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWU4RCxJLEVBQU0vRCxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVFzRSxRQUFSLENBQWlCbEUsUUFBakIsRUFBMkJpRSxJQUEzQixFQUFpQy9ELGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQW5Nb0JMLGdCOztBQXNNdkJxRSxPQUFPQyxPQUFQLEdBQWlCcEUsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBzdGFydERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG5vTWFya2VkRGlyZWN0b3J5ID0gKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSBub01hcmtlZERpcmVjdG9yeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmICgoc291cmNlUGF0aCAhPT0gdGFyZ2V0UGF0aCkgfHwgKHNvdXJjZVBhdGggPT09IG51bGwpICYmICh0YXJnZXRQYXRoID09PSBudWxsKSAmJiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCAhPT0gdGhpcykpIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzO1xuXG4gICAgICBlbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGVudHJpZXMucHVzaChlbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmICgoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbClcbiAgICAgJiYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG1hcmtlZERpcmVjdG9yeSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5kcmFnZ2luZyhlbnRyeSk7XG4gICAgfVxuICB9XG4gIFxuICBlc2NhcGVEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciB0b0JlTWFya2VkLFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBlbnRyeVRvcG1vc3REaXJlY3RvcnkgPSBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZTsgIC8vL1xuXG4gICAgaWYgKGVudHJ5VG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgdG9CZU1hcmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgICBcbiAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGZpbGVQYXRoID0gbW92ZWRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==