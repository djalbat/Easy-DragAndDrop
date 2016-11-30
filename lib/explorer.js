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

          this.removeMarker();

          droppableElementToBeMarked !== null ? droppableElementToBeMarked.addMarker(entry) : explorer.addMarkerInPlace(entry);
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(entry, explorer);
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWQiLCJzdGFydERyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm5vTWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsImV4cGxvcmVyIiwidG9CZU1hcmtlZCIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImVudHJ5VG9wbW9zdERpcmVjdG9yeSIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE1BQUws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QjtBQUM3QkcsYUFBS0YsTUFBTDtBQUNELE9BRk0sTUFFQTtBQUNMRSxhQUFLRixNQUFMOztBQUVBLFlBQUlwRCxXQUFXbUQsU0FBZixDQUhLLENBR3FCOztBQUUxQixhQUFLbEQsT0FBTCxDQUFhRCxRQUFiO0FBQ0Q7QUFDRjs7OzZDQUV3QnVELGlCLEVBQW1CO0FBQzFDLFVBQUlELE9BQU9DLGtCQUFrQkMsT0FBbEIsRUFBWDtBQUFBLFVBQ0l4RCxXQUFXc0QsS0FBSzVDLE9BQUwsQ0FBYSxLQUFLaEIsYUFBbEIsQ0FEZjtBQUFBLFVBRUl3QyxhQUFhbEMsUUFGakI7QUFBQSxVQUU0QjtBQUN4QnlELGVBQVMsS0FBS2pFLGVBQUwsQ0FBcUIwQyxVQUFyQixFQUFpQ3dCLFFBQWpDLENBSGI7O0FBS0FBLGVBQVNELE1BQVQ7O0FBRUEsZUFBU0MsUUFBVCxDQUFrQkQsTUFBbEIsRUFBMEI7QUFDeEIsWUFBSUEsV0FBVyxLQUFmLEVBQXNCO0FBQ3BCSCxlQUFLRixNQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7MEJBRVk5RCxRLEVBQVVDLGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDdEUsYUFBT1AsUUFBUVUsS0FBUixDQUFjTixRQUFkLEVBQXdCQyxRQUF4QixFQUFrQ0MsaUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWVtRSxJLEVBQU1wRSxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVEyRSxRQUFSLENBQWlCdkUsUUFBakIsRUFBMkJzRSxJQUEzQixFQUFpQ3BFLGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQXBOb0JMLGdCOztBQXVOdkIwRSxPQUFPQyxPQUFQLEdBQWlCekUsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBzdGFydERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG5vTWFya2VkRGlyZWN0b3J5ID0gKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSBub01hcmtlZERpcmVjdG9yeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmICgoc291cmNlUGF0aCAhPT0gdGFyZ2V0UGF0aCkgfHwgKHNvdXJjZVBhdGggPT09IG51bGwpICYmICh0YXJnZXRQYXRoID09PSBudWxsKSAmJiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCAhPT0gdGhpcykpIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzO1xuXG4gICAgICBlbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGVudHJpZXMucHVzaChlbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkgP1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSkgOlxuICAgICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cbiAgXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciB0b0JlTWFya2VkLFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBlbnRyeVRvcG1vc3REaXJlY3RvcnkgPSBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZTsgIC8vL1xuXG4gICAgaWYgKGVudHJ5VG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgdG9CZU1hcmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgICBcbiAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGZpbGVQYXRoID0gbW92ZWRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==