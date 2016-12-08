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
      var noDraggingIntoSubdirectories = this.hasOption(Explorer.options.NO_DRAGGING_INTO_SUBDIRECTORIES),
          directoryOverlappingEntry = this.rootDirectory.getDirectoryOverlappingEntry(entry, noDraggingIntoSubdirectories);

      return directoryOverlappingEntry;
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
    value: function addMarker(entry, directoryOverlappingEntry) {
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
      var toBeMarked,
          entryPath = entry.getPath(),
          noExplorerDrags = this.hasOption(Explorer.options.NO_EXPLORER_DRAGS),
          entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);

      if (noExplorerDrags && entryPathTopmostDirectoryName) {
        toBeMarked = false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        toBeMarked = directoryOverlappingEntry !== null;
      }

      return toBeMarked;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      var startDragging,
          noDraggingEntries = this.hasOption(Explorer.options.NO_DRAGGING);

      if (noDraggingEntries) {
        startDragging = false;
      } else {
        var marked = this.isMarked();

        startDragging = !marked;

        if (startDragging) {
          this.addMarkerInPlace(entry);
        }
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
          markedDirectoryPath = markedDirectory !== null ? markedDirectory.getPath() : null,
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = markedDirectoryPath;

      if (marked && sourcePath === targetPath) {
        this.removeMarker();

        done();
      } else {
        var subEntries = entry.getSubEntries(),
            entries = subEntries; ///

        entries.reverse();
        entries.push(entry);

        markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function () {
          markedDroppableElement.removeMarker();

          done();
        });
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
        var toBeMarked = this.isToBeMarked(entry),
            directoryOverlappingEntry;

        if (toBeMarked) {
          var markedDirectory = this.getMarkedDirectory();

          directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

          if (markedDirectory !== directoryOverlappingEntry) {
            this.removeMarker();

            this.addMarker(entry, directoryOverlappingEntry);
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingEntry(entry);

            droppableElementToBeMarked.addMarker(entry, directoryOverlappingEntry);
          } else {
            explorer.addMarkerInPlace(entry);
          }

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
    key: 'entryPathMapsFromEntries',
    value: function entryPathMapsFromEntries(entries, sourcePath, targetPath) {
      var entryPathMaps = entries.map(function (entry) {
        var entryPathMap = {},
            entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = sourcePath === null ? util.prependTargetPath(entryPath, targetPath) : util.replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath);

        entryPathMap[sourceEntryPath] = targetEntryPath;

        return entryPathMap;
      });

      return entryPathMaps;
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

Explorer.options = {
  NO_DRAGGING: 'NO_DRAGGING',
  NO_EXPLORER_DRAGS: 'NO_EXPLORER_DRAGS',
  NO_DRAGGING_INTO_SUBDIRECTORIES: 'NO_DRAGGING_INTO_SUBDIRECTORIES'
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJvcHRpb25zIiwiYXBwZW5kIiwib3B0aW9uIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImFkZERpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJlbnRyeSIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQkRJUkVDVE9SSUVTIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJlbnRyeVBhdGgiLCJnZXRQYXRoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsImVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWQiLCJ0b0JlTWFya2VkIiwibm9FeHBsb3JlckRyYWdzIiwiTk9fRVhQTE9SRVJfRFJBR1MiLCJzdGFydERyYWdnaW5nIiwibm9EcmFnZ2luZ0VudHJpZXMiLCJOT19EUkFHR0lORyIsImFkZE1hcmtlckluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwic3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJlbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiZXhwbG9yZXIiLCJpc1RvQmVNYXJrZWQiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJkaXJlY3RvcnkiLCJtb3ZlZFBhdGgiLCJyZW1vdmUiLCJpc0NvbGxhcHNlZCIsImZpbGUiLCJhY3RpdmF0ZUZpbGVFdmVudCIsImdldEZpbGUiLCJyZXN1bHQiLCJjYWxsYmFjayIsImVudHJ5UGF0aE1hcHMiLCJtYXAiLCJlbnRyeVBhdGhNYXAiLCJzb3VyY2VFbnRyeVBhdGgiLCJ0YXJnZXRFbnRyeVBhdGgiLCJwcmVwZW5kVGFyZ2V0UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLG1CQUFtQkgsUUFBUSxvQkFBUixDQUR2QjtBQUFBLElBRUlJLGdCQUFnQkosUUFBUSx5Q0FBUixDQUZwQjs7SUFJTUssUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLGlCQUF0QixFQUF5Q0MsZUFBekMsRUFBMERDLFdB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aUJBQWpDLEVBQW9ERSxXQUFwRCxFQUFpRUQsZUFBakUsQ0FBUDtBQUNEOzs7O0VBcFFvQkwsZ0I7O0FBdVF2QkUsU0FBU1UsT0FBVCxHQUFtQjtBQUNqQm1DLGVBQWEsYUFESTtBQUVqQkgscUJBQW1CLG1CQUZGO0FBR2pCbkIsbUNBQWlDO0FBSGhCLENBQW5COztBQU1BK0QsT0FBT0MsT0FBUCxHQUFpQnZGLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyID0gYWN0aXZhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIFxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSB0aGlzLmhhc09wdGlvbihFeHBsb3Jlci5vcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnksIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciB0b0JlTWFya2VkLFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG5vRXhwbG9yZXJEcmFncyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRVhQTE9SRVJfRFJBR1MpLFxuICAgICAgICBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcbiAgICBcbiAgICBpZiAobm9FeHBsb3JlckRyYWdzICYmIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB0b0JlTWFya2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcbiAgICB9XG4gICAgICAgIFxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBzdGFydERyYWdnaW5nLFxuICAgICAgICBub0RyYWdnaW5nRW50cmllcyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRFJBR0dJTkcpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdFbnRyaWVzKSB7XG4gICAgICBzdGFydERyYWdnaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICAgIHN0YXJ0RHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgICBpZiAoc3RhcnREcmFnZ2luZykge1xuICAgICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICAgIFxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGZpbGVQYXRoID0gbW92ZWRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5UGF0aE1hcCA9IHt9LFxuICAgICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbkV4cGxvcmVyLm9wdGlvbnMgPSB7XG4gIE5PX0RSQUdHSU5HOiAnTk9fRFJBR0dJTkcnLFxuICBOT19FWFBMT1JFUl9EUkFHUzogJ05PX0VYUExPUkVSX0RSQUdTJyxcbiAgTk9fRFJBR0dJTkdfSU5UT19TVUJESVJFQ1RPUklFUzogJ05PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19