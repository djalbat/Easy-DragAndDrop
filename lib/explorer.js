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
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

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
      var directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryOverlappingDraggableEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        this.addMarkerInPlace(draggableEntry);
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
    value: function dragging(draggableEntry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var directoryOverlappingDraggableEntry,
            toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var noDraggingWithin = explorer === this && this.hasOption(options.NO_DRAGGING_WITHIN),
              ///
          draggingWithin = !noDraggingWithin;

          if (draggingWithin) {
            var markedDirectory = this.getMarkedDirectory();

            directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectory !== directoryOverlappingDraggableEntry) {
              this.removeMarker();

              this.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
            }
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(draggableEntry, explorer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJhY3RpdmF0ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiYmluZCIsImFwcGVuZCIsIm9wdGlvbiIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwidG9CZU1hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwic3ViRHJhZ2dhYmxlRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiaXNUb0JlTWFya2VkIiwibm9EcmFnZ2luZ1dpdGhpbiIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsImRyYWdnaW5nV2l0aGluIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZGlyZWN0b3J5IiwibW92ZWRQYXRoIiwicmVtb3ZlIiwiaXNDb2xsYXBzZWQiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwicmVzdWx0IiwiY2FsbGJhY2siLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwcmVwZW5kVGFyZ2V0UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFVBQVVILFFBQVEsV0FBUixDQURkO0FBQUEsSUFFSUksbUJBQW1CSixRQUFR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QUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQXBQb0JMLGdCOztBQXVQdkJzRixPQUFPQyxPQUFQLEdBQWlCckYsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcykgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7IH1cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9ICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpOyB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZCA9IHJvb3REaXJlY3RvcnlNYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgc3VwZXIuaXNNYXJrZWQoKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIG5vRHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpICYmIHRoaXMuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfV0lUSElOKSwgLy8vXG4gICAgICAgICAgICBkcmFnZ2luZ1dpdGhpbiA9ICFub0RyYWdnaW5nV2l0aGluO1xuXG4gICAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbikge1xuICAgICAgICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICB2YXIgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgdmFyIHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19