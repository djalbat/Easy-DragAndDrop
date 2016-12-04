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
      var noDragsToSubdirectories = this.hasOption(Explorer.options.NO_DRAGS_TO_SUBDIRECTORIES),
          directoryOverlappingEntry = this.rootDirectory.getDirectoryOverlappingEntry(entry, noDragsToSubdirectories);

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

      if (marked) {
        if (sourcePath === targetPath) {
          this.removeMarker();

          done();
        }
      }

      var subEntries = entry.getSubEntries(),
          entries = subEntries; ///

      entries.reverse();
      entries.push(entry);

      markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function () {
        markedDroppableElement.removeMarker();

        done();
      });
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
  NO_DRAGS_TO_SUBDIRECTORIES: 'NO_DRAGS_TO_SUBDIRECTORIES'
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJvcHRpb25zIiwiYXBwZW5kIiwib3B0aW9uIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImFkZERpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJlbnRyeSIsIm5vRHJhZ3NUb1N1YmRpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiTk9fRFJBR1NfVE9fU1VCRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJlbnRyeU5hbWUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsIm1hcmtlZCIsInRvQmVNYXJrZWQiLCJub0V4cGxvcmVyRHJhZ3MiLCJOT19FWFBMT1JFUl9EUkFHUyIsInN0YXJ0RHJhZ2dpbmciLCJub0RyYWdnaW5nRW50cmllcyIsIk5PX0RSQUdHSU5HIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJzdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwiZW50cnlQYXRoTWFwcyIsIm1hcCIsImVudHJ5UGF0aE1hcCIsInNvdXJjZUVudHJ5UGF0aCIsInRhcmdldEVudHJ5UGF0aCIsInByZXBlbmRUYXJnZXRQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aCIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsbUJBQW1CSCxRQUFRLG9CQUFSLENBRHZCO0FBQUEsSUFFSUksZ0JBQWdCSixRQUFRLHlDQUFSLENBRnBCOztJQUlNSyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXlDQyxlQUF6QyxFQUEwREMsV0FBMUQsRUFBdUU7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akMsRUFBb0RFLFdBQXBELEVBQWlFRCxlQUFqRSxDQUFQO0FBQ0Q7Ozs7RUF0UW9CTCxnQjs7QUF5UXZCRSxTQUFTVSxPQUFULEdBQW1CO0FBQ2pCbUMsZUFBYSxhQURJO0FBRWpCSCxxQkFBbUIsbUJBRkY7QUFHakJuQiw4QkFBNEI7QUFIWCxDQUFuQjs7QUFNQStELE9BQU9DLE9BQVAsR0FBaUJ2RixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIuYmluZCh0aGlzKSwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTsgfVxuICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBub0RyYWdzVG9TdWJkaXJlY3RvcmllcyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRFJBR1NfVE9fU1VCRElSRUNUT1JJRVMpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnksIG5vRHJhZ3NUb1N1YmRpcmVjdG9yaWVzKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggKyAnLycgKyBlbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZCA9IHJvb3REaXJlY3RvcnlNYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgc3VwZXIuaXNNYXJrZWQoKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgdG9CZU1hcmtlZCxcbiAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBub0V4cGxvcmVyRHJhZ3MgPSB0aGlzLmhhc09wdGlvbihFeHBsb3Jlci5vcHRpb25zLk5PX0VYUExPUkVSX0RSQUdTKSxcbiAgICAgICAgZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG4gICAgXG4gICAgaWYgKG5vRXhwbG9yZXJEcmFncyAmJiBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgdG9CZU1hcmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgICBcbiAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuICAgICAgICBcbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgc3RhcnREcmFnZ2luZyxcbiAgICAgICAgbm9EcmFnZ2luZ0VudHJpZXMgPSB0aGlzLmhhc09wdGlvbihFeHBsb3Jlci5vcHRpb25zLk5PX0RSQUdHSU5HKTtcblxuICAgIGlmIChub0RyYWdnaW5nRW50cmllcykge1xuICAgICAgc3RhcnREcmFnZ2luZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgICBzdGFydERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgICAgaWYgKHN0YXJ0RHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGg7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBpZiAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgZW50cmllcyA9IHN1YkVudHJpZXM7IC8vL1xuXG4gICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgZW50cmllcy5wdXNoKGVudHJ5KTtcblxuICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZW50cnkpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gICAgICBcbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhlbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciBlbnRyeVBhdGhNYXBzID0gZW50cmllcy5tYXAoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRW50cnlQYXRoID0gZW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBlbnRyeVBhdGhNYXBbc291cmNlRW50cnlQYXRoXSA9IHRhcmdldEVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIGVudHJ5UGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeVBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5FeHBsb3Jlci5vcHRpb25zID0ge1xuICBOT19EUkFHR0lORzogJ05PX0RSQUdHSU5HJyxcbiAgTk9fRVhQTE9SRVJfRFJBR1M6ICdOT19FWFBMT1JFUl9EUkFHUycsXG4gIE5PX0RSQUdTX1RPX1NVQkRJUkVDVE9SSUVTOiAnTk9fRFJBR1NfVE9fU1VCRElSRUNUT1JJRVMnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19