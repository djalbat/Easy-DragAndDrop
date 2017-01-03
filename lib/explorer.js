'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    options = require('./options'),
    DirectoryMarker = require('./explorer/entry/directoryMarker'),
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
    key: 'getFilePaths',
    value: function getFilePaths() {
      return this.rootDirectory.getFilePaths();
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
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      return this.rootDirectory.getDraggableEntryPath(draggableEntry);
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerPath = draggableEntryPath;

        this.rootDirectory.addMarker(markerPath, draggableEntryType);
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
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      topmostDirectoryMarker = DirectoryMarker.clone(topmostDirectoryMarkerName);

      this.append(topmostDirectoryMarker);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        this.rootDirectory.removeMarker();
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        topmostDirectoryMarker.remove();
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked,
          rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        marked = true;
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        marked = topmostDirectoryMarker !== null;
      }

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
    key: 'retrieveTopmostDirectoryMarker',
    value: function retrieveTopmostDirectoryMarker() {
      var topmostDirectoryMarker = null,
          childListElements = this.childElements('li');

      childListElements.some(function (childElement) {
        if (childElement instanceof DirectoryMarker) {
          topmostDirectoryMarker = childElement; ///

          return true;
        } else {
          return false;
        }
      });

      return topmostDirectoryMarker;
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
    value: function escapeDragging() {
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
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath, removeEmptyParentDirectories) {
      var explorer = directory.getExplorer(),
          directoryPath;

      if (movedDirectoryPath === sourceDirectoryPath) {} else if (movedDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath, removeEmptyParentDirectories);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath, removeEmptyParentDirectories);

        var collapsed = directory.isCollapsed();

        directoryPath = movedDirectoryPath; ///

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath, removeEmptyParentDirectories) {
      var explorer = file.getExplorer(),
          filePath;

      if (movedFilePath === sourceFilePath) {} else if (movedFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath, removeEmptyParentDirectories);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath, removeEmptyParentDirectories);

        filePath = movedFilePath; ///

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRGlyZWN0b3J5TWFya2VyIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJhY3RpdmF0ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiYmluZCIsImFwcGVuZCIsIm9wdGlvbiIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldEZpbGVQYXRocyIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlIiwibWFya2VkIiwidG9CZU1hcmtlZCIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsInNvbWUiLCJjaGlsZEVsZW1lbnQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwibWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkRyYWdnYWJsZUVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsImlzVG9CZU1hcmtlZCIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJkcmFnZ2luZ1dpdGhpbiIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJnZXRFeHBsb3JlciIsImlzQ29sbGFwc2VkIiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsVUFBVUgsUUFBUSxXQUFSLENBRGQ7QUFBQSxJQUVJSSxrQkFBa0JKLFFBQVEsa0NBQVIsQ0FGdEI7QUFBQSxJQUdJSyxtQkFBbUJMLFFBQVEsb0JBQVIsQ0FIdkI7QUFBQSxJQUlJTSxnQkFBZ0JOLFFBQVEseUNBQVIsQ0FKcEI7O0lBTU1PLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBSjtBQUFBLFFBQXNCO0FBQ2xCQyxvQkFBZ0JQLGNBQWNRLEtBQWQsQ0FBb0JMLGlCQUFwQixFQUF1Q0csUUFBdkMsRUFBaUQsTUFBS0csd0JBQUwsQ0FBOEJDLElBQTlCLE9BQWpELENBRHBCOztBQUdBLFVBQUtOLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtHLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtWLE9BQUwsR0FBZSxFQUFmOztBQUVBLFVBQUtjLE1BQUwsQ0FBWUosYUFBWjtBQVpxRTtBQWF0RTs7Ozs4QkFFU0ssTSxFQUFRO0FBQ2hCLFdBQUtmLE9BQUwsQ0FBYWUsTUFBYixJQUF1QixJQUF2QjtBQUNEOzs7Z0NBRVdBLE0sRUFBUTtBQUNsQixhQUFPLEtBQUtmLE9BQUwsQ0FBYWUsTUFBYixDQUFQ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QUFULEVBQXlCO0FBQzNELFlBQUlxRSxVQUFVLEVBQWQ7QUFBQSxZQUNJbEUscUJBQXFCSCxlQUFlSSxPQUFmLEVBRHpCO0FBQUEsWUFFSWtFLDJCQUEyQm5FLGtCQUYvQjtBQUFBLFlBRW9EO0FBQ2hEb0UsbUNBQTRCakMsZUFBZSxJQUFoQixHQUNFbEUsS0FBS29HLGlCQUFMLENBQXVCckUsa0JBQXZCLEVBQTJDb0MsVUFBM0MsQ0FERixHQUVJbkUsS0FBS3FHLCtCQUFMLENBQXFDdEUsa0JBQXJDLEVBQXlEbUMsVUFBekQsRUFBcUVDLFVBQXJFLENBTG5DOztBQU9BOEIsZ0JBQVFDLHdCQUFSLElBQW9DQyx3QkFBcEM7O0FBRUEsZUFBT0YsT0FBUDtBQUNELE9BWGMsQ0FBZjs7QUFhQSxhQUFPRixRQUFQO0FBQ0Q7OzswQkFFWXpGLFEsRUFBVUMsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUN0RSxhQUFPVCxRQUFRYSxLQUFSLENBQWNQLFFBQWQsRUFBd0JDLFFBQXhCLEVBQWtDQyxpQkFBbEMsRUFBcURFLFdBQXJELEVBQWtFRCxlQUFsRSxDQUFQO0FBQ0Q7Ozs2QkFFZThGLEksRUFBTS9GLGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDckUsYUFBT1QsUUFBUXdHLFFBQVIsQ0FBaUJsRyxRQUFqQixFQUEyQmlHLElBQTNCLEVBQWlDL0YsaUJBQWpDLEVBQW9ERSxXQUFwRCxFQUFpRUQsZUFBakUsQ0FBUDtBQUNEOzs7O0VBdlNvQkwsZ0I7O0FBMFN2QnFHLE9BQU9DLE9BQVAsR0FBaUJwRyxRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5vcHRpb25zID0ge307XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpOyB9XG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7IH1cbiAgZ2V0RmlsZVBhdGhzKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldEZpbGVQYXRocygpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH0gIFxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7IH0gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpOyB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCArICcvJyArIGRyYWdnYWJsZUVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCwgIC8vL1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lKTtcblxuICAgIHRoaXMuYXBwZW5kKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlZCxcbiAgICAgICAgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGwsXG4gICAgICAgIGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlNYXJrZXI7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGg7XG5cbiAgICBpZiAobWFya2VkICYmIChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gc3ViRHJhZ2dhYmxlRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgbm9EcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcykgJiYgdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLCAvLy9cbiAgICAgICAgICAgIGRyYWdnaW5nV2l0aGluID0gIW5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKGRyYWdnaW5nV2l0aGluKSB7XG4gICAgICAgICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgdmFyIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgdmFyIGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgcmVzdWx0ID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgY2FsbGJhY2spO1xuXG4gICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICBcbiAgICBmdW5jdGlvbiBjYWxsYmFjayhyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIHZhciBwYXRoTWFwID0ge30sXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnByZXBlbmRUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdID0gdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==