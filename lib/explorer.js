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
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
          toBeMarked = directoryOverlappingEntry !== null;

      return toBeMarked;
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
    key: 'escapeDragging',
    value: function escapeDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(entry);

        if (toBeMarked) {
          var markedDirectory = this.getMarkedDirectory(),
              directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

          if (markedDirectory !== directoryOverlappingEntry) {
            this.removeMarker();

            this.addMarker(entry, directoryOverlappingEntry);
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          droppableElementToBeMarked !== null ? droppableElementToBeMarked.addMarker(entry) : explorer.addMarkerInPlace(entry);

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(entry, explorer);
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWQiLCJ0b0JlTWFya2VkIiwic3RhcnREcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJub01hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJzdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE1BQUwsQ0FBWUwsYUFBWjtBQVRxRTtBQVV0RTs7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QUFBLFVBRUl5QyxhQUFhbkMsUUFGakI7QUFBQSxVQUU0QjtBQUN4QndELGVBQVMsS0FBS2hFLGVBQUwsQ0FBcUIyQyxVQUFyQixFQUFpQ3NCLFFBQWpDLENBSGI7O0FBS0FBLGVBQVNELE1BQVQ7O0FBRUEsZUFBU0MsUUFBVCxDQUFrQkQsTUFBbEIsRUFBMEI7QUFDeEIsWUFBSUEsV0FBVyxLQUFmLEVBQXNCO0FBQ3BCSCxlQUFLRixNQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7MEJBRVk3RCxRLEVBQVVDLGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDdEUsYUFBT1AsUUFBUVUsS0FBUixDQUFjTixRQUFkLEVBQXdCQyxRQUF4QixFQUFrQ0MsaUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWVrRSxJLEVBQU1uRSxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVEwRSxRQUFSLENBQWlCdEUsUUFBakIsRUFBMkJxRSxJQUEzQixFQUFpQ25FLGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQTFNb0JMLGdCOztBQTZNdkJ5RSxPQUFPQyxPQUFQLEdBQWlCeEUsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0RHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgbm9NYXJrZWREaXJlY3RvcnkgPSAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IG5vTWFya2VkRGlyZWN0b3J5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoO1xuXG4gICAgaWYgKChzb3VyY2VQYXRoICE9PSB0YXJnZXRQYXRoKSB8fCAoc291cmNlUGF0aCA9PT0gbnVsbCkgJiYgKHRhcmdldFBhdGggPT09IG51bGwpICYmIChtYXJrZWREcm9wcGFibGVFbGVtZW50ICE9PSB0aGlzKSkge1xuICAgICAgdmFyIHN1YkVudHJpZXMgPSBlbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllcyA9IHN1YkVudHJpZXM7XG5cbiAgICAgIGVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZW50cmllcy5wdXNoKGVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5tb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkgP1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSkgOlxuICAgICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhlbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=