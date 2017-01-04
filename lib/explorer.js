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
    value: function removeFile(filePath) {
      this.rootDirectory.removeFile(filePath);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      this.rootDirectory.removeDirectory(directoryPath);
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
          var within = explorer === this,
              ///
          noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

          if (!noDragging) {
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
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
      var explorer = directory.getExplorer(),
          directoryPath;

      if (movedDirectoryPath === sourceDirectoryPath) {} else if (movedDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);

        var collapsed = directory.isCollapsed();

        directoryPath = movedDirectoryPath; ///

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath) {
      var explorer = file.getExplorer(),
          filePath;

      if (movedFilePath === sourceFilePath) {} else if (movedFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRGlyZWN0b3J5TWFya2VyIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJhY3RpdmF0ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiYmluZCIsImFwcGVuZCIsIm9wdGlvbiIsImdldEZpbGVQYXRocyIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJ0b0JlTWFya2VkIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJjaGlsZEVsZW1lbnRzIiwic29tZSIsImNoaWxkRWxlbWVudCIsInN0YXJ0ZWREcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwic3ViRHJhZ2dhYmxlRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiaXNUb0JlTWFya2VkIiwid2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbiIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIm5vRHJhZ2dpbmciLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJkaXJlY3RvcnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwibW92ZWREaXJlY3RvcnlQYXRoIiwiZ2V0RXhwbG9yZXIiLCJpc0NvbGxhcHNlZCIsImZpbGUiLCJzb3VyY2VGaWxlUGF0aCIsIm1vdmVkRmlsZVBhdGgiLCJhY3RpdmF0ZUZpbGVFdmVudCIsImdldEZpbGUiLCJyZXN1bHQiLCJjYWxsYmFjayIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsInRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCIsInByZXBlbmRUYXJnZXRQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aCIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFVBQVVILFFBQVEsV0FBUixDQURkO0FBQUEsSUFFSUksa0JBQWtCSixRQUFRLGtDQUFSLENBRnRCO0FBQUEsSUFHSUssbUJBQW1CTCxRQUFRLG9CQUFSLENBSHZCO0FBQUEsSUFJSU0sZ0JBQWdCTixRQUFRLHlDQUFSLENBSnBCOztJQU1NTyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXlDQyxlQUF6QyxFQUEwREMsV0FBMUQsRUFBdUU7QUFBQTs7QUFBQSxvSEFDL0RILFFBRCtELEVBQ3JERyxXQURxRDs7QUFHckUsUUFBSUMsZ0JBQUo7QUFBQSxRQUFzQjtBQUNsQkMsb0JBQWdCUCxjQUFjUSxLQUFkLENBQW9CTCxpQkFBcEIsRUFBdUNHLFFBQXZDLEVBQWlELE1BQUtHLHdCQUFMLENBQThCQyxJQUE5QixPQUFqRCxDQURwQjs7QUFHQSxVQUFLTixlQUFMLEdBQXVCQSxlQUF2Qjs7QUFFQSxVQUFLRyxhQUFMLEdBQXFCQSxhQUFyQjs7QUFFQSxVQUFLVixPQUFMLEdBQWUsRUFBZjs7QUFFQSxVQUFLYyxNQUFMLENBQVlKLGFBQVo7QUFacUU7QUFhdEU7Ozs7OEJBRVNLLE0sRUFBUTtBQUNoQixXQUFLZixPQUFMLENBQWFlLE1BQWIsSUFBdUIsSUFBdkI7QUFDRDs7O2dDQUVXQSxNLEVBQVE7QUFDbEIsYUFBTyxLQUFLZixPQUFMLENBQWFlLE1BQWIsQ0FBUDtBQUNEOzs7OEJBRVNBLE0sRUFBUTtBQUNo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QyxlQUFlLElBQWhCLEdBQ0VqRSxLQUFLb0csaUJBQUwsQ0FBdUJ0RSxrQkFBdkIsRUFBMkNvQyxVQUEzQyxDQURGLEdBRUlsRSxLQUFLcUcsK0JBQUwsQ0FBcUN2RSxrQkFBckMsRUFBeURtQyxVQUF6RCxFQUFxRUMsVUFBckUsQ0FMbkM7O0FBT0ErQixnQkFBUUMsd0JBQVIsSUFBb0NDLHdCQUFwQzs7QUFFQSxlQUFPRixPQUFQO0FBQ0QsT0FYYyxDQUFmOztBQWFBLGFBQU9GLFFBQVA7QUFDRDs7OzBCQUVZekYsUSxFQUFVQyxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3RFLGFBQU9ULFFBQVFhLEtBQVIsQ0FBY1AsUUFBZCxFQUF3QkMsUUFBeEIsRUFBa0NDLGlCQUFsQyxFQUFxREUsV0FBckQsRUFBa0VELGVBQWxFLENBQVA7QUFDRDs7OzZCQUVlOEYsSSxFQUFNL0YsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUNyRSxhQUFPVCxRQUFRd0csUUFBUixDQUFpQmxHLFFBQWpCLEVBQTJCaUcsSUFBM0IsRUFBaUMvRixpQkFBakMsRUFBb0RFLFdBQXBELEVBQWlFRCxlQUFqRSxDQUFQO0FBQ0Q7Ozs7RUExU29CTCxnQjs7QUE2U3ZCcUcsT0FBT0MsT0FBUCxHQUFpQnBHLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldEZpbGVQYXRocygpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpOyB9XG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgpOyB9XG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUodG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUpO1xuXG4gICAgdGhpcy5hcHBlbmQodG9wbW9zdERpcmVjdG9yeU1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VkLFxuICAgICAgICByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICBtYXJrZWQgPSAodG9wbW9zdERpcmVjdG9yeU1hcmtlciAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gbnVsbCxcbiAgICAgICAgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciB3aXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgdmFyIGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgcmVzdWx0ID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgY2FsbGJhY2spO1xuXG4gICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICBcbiAgICBmdW5jdGlvbiBjYWxsYmFjayhyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIHZhciBwYXRoTWFwID0ge30sXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnByZXBlbmRUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdID0gdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==