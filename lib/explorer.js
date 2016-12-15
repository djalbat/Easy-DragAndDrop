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
            noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
            toBeMarked = noDraggingWithin ? false : this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var markedDirectory = this.getMarkedDirectory();

          directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry);

          if (markedDirectory !== directoryOverlappingDraggableEntry) {
            this.removeMarker();

            this.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJhY3RpdmF0ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiYmluZCIsImFwcGVuZCIsIm9wdGlvbiIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwidG9CZU1hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwic3ViRHJhZ2dhYmxlRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5Iiwibm9EcmFnZ2luZ1dpdGhpbiIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxVQUFVSCxRQUFRLFdBQVIsQ0FEZDtBQUFBLElBRUlJLG1CQUFtQkosUUFBUSxvQkFBUixDQUZ2QjtBQUFB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bGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyID0gYWN0aXZhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICByZW1vdmVGaWxlKGZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVGaWxlKGZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTsgfVxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcykgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH0gIFxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmICghZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSlcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCArICcvJyArIGRyYWdnYWJsZUVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoO1xuXG4gICAgaWYgKG1hcmtlZCAmJiAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN1YkRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSxcbiAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBub0RyYWdnaW5nV2l0aGluID9cbiAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICBcbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICB2YXIgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgdmFyIHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19