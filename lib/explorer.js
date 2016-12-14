'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    options = require('./options'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

var Explorer = function (_DroppableElement) {
  _inherits(Explorer, _DroppableElement);

  function Explorer(selector, rootDirectoryName, activateHandler, moveHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var explorer = _this,
        ///
    rootDirectory = RootDirectory.clone(rootDirectoryName, explorer, _this.activateFileEventHandler.bind(_this));

    _this.activateHandler = activateHandler;

    _this.rootDirectory = rootDirectory;

    _this.options = {};

    _this.append(rootDirectory);
    return _this;
  }

  _createClass(Explorer, [{
    key: 'setOption',
    value: function setOption(option) {
      this.options[option] = true;
    }
  }, {
    key: 'unsetOption',
    value: function unsetOption(option) {
      delete this.options[option];
    }
  }, {
    key: 'hasOption',
    value: function hasOption(option) {
      option = this.options[option] === true; ///

      return option;
    }
  }, {
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
    key: 'removeFile',
    value: function removeFile(filePath, removeEmptyParentDirectories) {
      this.rootDirectory.removeFile(filePath, removeEmptyParentDirectories);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath, removeEmptyParentDirectories) {
      this.rootDirectory.removeDirectory(directoryPath, removeEmptyParentDirectories);
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
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      return this.rootDirectory.getDirectoryOverlappingDraggableEntry(draggableEntry);
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

      if (!draggableEntryPathTopmostDirectoryName) {
        var markerPath = draggableEntryPath;

        this.rootDirectory.addMarker(markerPath, draggableEntryType);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, draggableEntry);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
          markerPath = directoryOverlappingEntryPath + '/' + draggableEntryName;

      this.rootDirectory.addMarker(markerPath, draggableEntryType);
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
    value: function isToBeMarked(draggableEntry) {
      var directoryOverlappingEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryOverlappingEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var startedDragging,
          noDragging = this.hasOption(options.NO_DRAGGING);

      if (noDragging) {
        startedDragging = false;
      } else {
        var marked = this.isMarked();

        startedDragging = !marked;

        if (startedDragging) {
          this.addMarkerInPlace(draggableEntry);
        }
      }

      return startedDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableEntry, done) {
      var draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDroppableElement = marked ? this : this.getMarkedDroppableElement(),
          markedDirectory = markedDroppableElement.getMarkedDirectory(),
          markedDirectoryPath = markedDirectory !== null ? markedDirectory.getPath() : null,
          draggableEntryPathWithoutBottommostName = util.pathWithoutBottommostName(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryPath;

      if (marked && sourcePath === targetPath) {
        this.removeMarker();

        done();
      } else {
        var subDraggableEntries = draggableEntry.getSubEntries(),
            draggableEntries = subDraggableEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);

        markedDroppableElement.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDroppableElement.removeMarker();

          done();
        });
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging(draggableEntry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(draggbleEntry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var draggableEntryToBeMarked = this.isToBeMarked(draggbleEntry),
            directoryOverlappingEntry;

        if (draggableEntryToBeMarked) {
          var markedDirectory = this.getMarkedDirectory();

          directoryOverlappingEntry = this.getDirectoryOverlappingDraggableEntry(draggbleEntry);

          if (markedDirectory !== directoryOverlappingEntry) {
            this.removeMarker();

            this.addMarker(draggbleEntry, directoryOverlappingEntry);
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggbleEntry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggbleEntry);

            droppableElementToBeMarked.addMarker(draggbleEntry, directoryOverlappingEntry);
          } else {
            explorer.addMarkerInPlace(draggbleEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(draggbleEntry, explorer);
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourcePath, movedPath) {
      if (movedPath === sourcePath) {} else if (movedPath === null) {
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
      if (movedPath === sourcePath) {} else if (movedPath === null) {
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
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = sourcePath === null ? util.prependTargetPath(draggableEntryPath, targetPath) : util.replaceSourcePathWithTargetPath(draggableEntryPath, sourcePath, targetPath);

        pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return pathMap;
      });

      return pathMaps;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJhY3RpdmF0ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiYmluZCIsImFwcGVuZCIsIm9wdGlvbiIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwidG9CZU1hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsIm5vRHJhZ2dpbmciLCJoYXNPcHRpb24iLCJOT19EUkFHR0lORyIsImFkZE1hcmtlckluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwic3ViRHJhZ2dhYmxlRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiZHJhZ2dibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5VG9CZU1hcmtlZCIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxVQUFVSCxRQUFRLFdBQVIsQ0FEZDtBQUFBLElBRUlJLG1CQUFtQkosUUFBUSxvQkFB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LGVBQWpFLENBQVA7QUFDRDs7OztFQXZQb0JMLGdCOztBQTBQdkJ1RixPQUFPQyxPQUFQLEdBQWlCdEYsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcykgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7IH1cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9ICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpOyB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZCA9IHJvb3REaXJlY3RvcnlNYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgc3VwZXIuaXNNYXJrZWQoKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgc3RhcnRlZERyYWdnaW5nLFxuICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyk7XG5cbiAgICBpZiAobm9EcmFnZ2luZykge1xuICAgICAgc3RhcnRlZERyYWdnaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgZHJhZ2dhYmxlRW50cnlUb0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dibGVFbnRyeSksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICAgIFxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5VG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2JsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZHJhZ2dpbmcoZHJhZ2dibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICB2YXIgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgdmFyIHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19