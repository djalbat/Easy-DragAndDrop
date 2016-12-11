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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJvcHRpb25zIiwiYXBwZW5kIiwib3B0aW9uIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImFkZERpcmVjdG9yeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmVGaWxlIiwicmVtb3ZlRGlyZWN0b3J5IiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImVudHJ5Iiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJlbnRyeU5hbWUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsIm1hcmtlZCIsInRvQmVNYXJrZWQiLCJub0V4cGxvcmVyRHJhZ3MiLCJOT19FWFBMT1JFUl9EUkFHUyIsInN0YXJ0RHJhZ2dpbmciLCJub0RyYWdnaW5nRW50cmllcyIsIk5PX0RSQUdHSU5HIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJzdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwiZW50cnlQYXRoTWFwcyIsIm1hcCIsImVudHJ5UGF0aE1hcCIsInNvdXJjZUVudHJ5UGF0aCIsInRhcmdldEVudHJ5UGF0aCIsInByZXBlbmRUYXJnZXRQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aCIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsbUJBQW1CSCxRQUFRLG9CQUFSLENBRHZCO0FBQUEsSUFFSUksZ0JBQWdCSixRQUFRLHlDQUFSLENBRnBCOztJ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MEJBRVkvRSxRLEVBQVVDLGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDdEUsYUFBT1AsUUFBUVUsS0FBUixDQUFjTixRQUFkLEVBQXdCQyxRQUF4QixFQUFrQ0MsaUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWVvRixJLEVBQU1yRixpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVE0RixRQUFSLENBQWlCeEYsUUFBakIsRUFBMkJ1RixJQUEzQixFQUFpQ3JGLGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQXRRb0JMLGdCOztBQXlRdkJFLFNBQVNVLE9BQVQsR0FBbUI7QUFDakJzQyxlQUFhLGFBREk7QUFFakJILHFCQUFtQixtQkFGRjtBQUdqQm5CLG1DQUFpQztBQUhoQixDQUFuQjs7QUFNQStELE9BQU9DLE9BQVAsR0FBaUIxRixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIuYmluZCh0aGlzKSwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcykgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7IH1cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIFxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSB0aGlzLmhhc09wdGlvbihFeHBsb3Jlci5vcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnksIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciB0b0JlTWFya2VkLFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG5vRXhwbG9yZXJEcmFncyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRVhQTE9SRVJfRFJBR1MpLFxuICAgICAgICBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcbiAgICBcbiAgICBpZiAobm9FeHBsb3JlckRyYWdzICYmIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB0b0JlTWFya2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcbiAgICB9XG4gICAgICAgIFxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBzdGFydERyYWdnaW5nLFxuICAgICAgICBub0RyYWdnaW5nRW50cmllcyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRFJBR0dJTkcpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdFbnRyaWVzKSB7XG4gICAgICBzdGFydERyYWdnaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICAgIHN0YXJ0RHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgICBpZiAoc3RhcnREcmFnZ2luZykge1xuICAgICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICAgIFxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGZpbGVQYXRoID0gbW92ZWRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5UGF0aE1hcCA9IHt9LFxuICAgICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbkV4cGxvcmVyLm9wdGlvbnMgPSB7XG4gIE5PX0RSQUdHSU5HOiAnTk9fRFJBR0dJTkcnLFxuICBOT19FWFBMT1JFUl9EUkFHUzogJ05PX0VYUExPUkVSX0RSQUdTJyxcbiAgTk9fRFJBR0dJTkdfSU5UT19TVUJESVJFQ1RPUklFUzogJ05PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19