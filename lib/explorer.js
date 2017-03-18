'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    React = easyui.React;

var util = require('./util'),
    options = require('./options'),
    DroppableElement = require('./droppableElement'),
    DirectoryMarker = require('./explorer/entry/marker/directory'),
    RootDirectory = require('./explorer/draggableEntry/directory/root');

var Explorer = function (_DroppableElement) {
  _inherits(Explorer, _DroppableElement);

  function Explorer(selector, rootDirectoryName) {
    var openHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (sourcePath) {};
    var moveHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var name = rootDirectoryName,
        ///
    explorer = _this,
        ///
    rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer, className: 'directory' });

    _this.openHandler = openHandler;

    _this.options = {};

    _this.rootDirectory = rootDirectory;

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
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryMarker = React.createElement(DirectoryMarker, { name: name, className: 'marker' });

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
      var marked = void 0;

      var rootDirectoryMarked = this.rootDirectory.isMarked();

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
      var topmostDirectoryMarker = null;

      var childListElements = this.getChildElements('li');

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
          targetPath = markedDirectoryPath,
          unmoved = sourcePath === targetPath;

      if (marked && unmoved) {
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
        var directoryOverlappingDraggableEntry = void 0;

        var toBeMarked = this.isToBeMarked(draggableEntry);

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
      var explorer = directory.getExplorer();

      var directoryPath = void 0;

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
      var explorer = file.getExplorer();

      var filePath = void 0;

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
    key: 'openFile',
    value: function openFile(file) {
      var filePath = file.getPath(this.rootDirectory);

      this.openHandler(filePath);
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
    value: function clone(selector, rootDirectoryName, openHandler, moveHandler) {
      return Element.clone(Explorer, selector, rootDirectoryName, openHandler, moveHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, rootDirectoryName, openHandler, moveHandler) {
      return Element.fromHTML(Explorer, html, rootDirectoryName, openHandler, moveHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var rootDirectoryName = properties.rootDirectoryName,
          onOpen = properties.onOpen,
          onMove = properties.onMove,
          openHandler = onOpen,
          moveHandler = onMove; ///

      return Element.fromProperties(Explorer, properties, rootDirectoryName, openHandler, moveHandler);
    }
  }]);

  return Explorer;
}(DroppableElement);

Object.assign(Explorer, {
  tagName: 'ul',
  ignoredAttributes: ['rootDirectoryName', 'onOpen', 'onMove']
});

module.exports = Explorer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIlJlYWN0IiwidXRpbCIsIm9wdGlvbnMiLCJEcm9wcGFibGVFbGVtZW50IiwiRGlyZWN0b3J5TWFya2VyIiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsIm9wZW5IYW5kbGVyIiwic291cmNlUGF0aCIsIm1vdmVIYW5kbGVyIiwicGF0aE1hcHMiLCJkb25lIiwibmFtZSIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImFwcGVuZCIsIm9wdGlvbiIsImdldEZpbGVQYXRocyIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJ0b0JlTWFya2VkIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwic29tZSIsImNoaWxkRWxlbWVudCIsInN0YXJ0ZWREcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwidGFyZ2V0UGF0aCIsInVubW92ZWQiLCJzdWJEcmFnZ2FibGVFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJpc1RvQmVNYXJrZWQiLCJ3aXRoaW4iLCJub0RyYWdnaW5nV2l0aGluIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwibm9EcmFnZ2luZyIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJnZXRFeHBsb3JlciIsImlzQ29sbGFwc2VkIiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsIm1hcCIsInBhdGhNYXAiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwcmVwZW5kVGFyZ2V0UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJjbG9uZSIsImh0bWwiLCJmcm9tSFRNTCIsInByb3BlcnRpZXMiLCJvbk9wZW4iLCJvbk1vdmUiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxVQUFVRixPQUFPRSxPQUR2QjtBQUFBLElBRU1DLFFBQVFILE9BQU9HLEtBRnJCOztBQUlBLElBQU1DLE9BQU9ILFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUksVUFBVUosUUFBUSxXQUFSLENBRGhCO0FBQUEsSUFFTUssbUJBQW1CTCxRQUFRLG9CQUFSLENBRnpCO0FBQUEsSUFHTU0sa0JBQWtCTixRQUFRLG1DQUFSLENBSHhCO0FBQUEsSUFJTU8sZ0JBQWdCUCxRQUFRLDBDQUFSLENBSnRCOztJQU1NUSxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXFJO0FBQUEsUUFBNUZDLFdBQTRGLHVFQUE5RSxVQUFTQyxVQUFULEVBQXFCLENBQUUsQ0FBdUQ7QUFBQSxRQUFyREMsV0FBcUQsdUVBQXZDLFVBQVNDLFFBQVQsRUFBbUJDLElBQW5CLEVBQXlCO0FBQUVBO0FBQVMsS0FBRzs7QUFBQTs7QUFBQSxvSEFDN0hOLFFBRDZILEVBQ25ISSxXQURtSDs7QUFHbkksUUFBTUcsT0FBT04saUJBQWI7QUFBQSxRQUFnQztBQUMxQk8sb0JBRE47QUFBQSxRQUN3QjtBQUNsQkMsb0JBQWdCLG9CQUFDLGFBQUQsSUFBZSxNQUFNRixJQUFyQixFQUEyQixVQUFVQyxRQUFyQyxFQUErQyxXQUFVLFdBQXpELEdBRnRCOztBQUlBLFVBQUtOLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtQLE9BQUwsR0FBZSxFQUFmOztBQUVBLFVBQUtjLGFBQUwsR0FBcUJBLGFBQXJC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Z0I7O0FBMFR2QnNHLE9BQU9DLE1BQVAsQ0FBY3BHLFFBQWQsRUFBd0I7QUFDdEJxRyxXQUFTLElBRGE7QUFFdEJDLHFCQUFtQixDQUNqQixtQkFEaUIsRUFFakIsUUFGaUIsRUFHakIsUUFIaUI7QUFGRyxDQUF4Qjs7QUFTQUMsT0FBT0MsT0FBUCxHQUFpQnhHLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKSxcbiAgICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS9yb290Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgbW92ZUhhbmRsZXIgPSBmdW5jdGlvbihwYXRoTWFwcywgZG9uZSkgeyBkb25lKCk7IH0gKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIGNvbnN0IG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY2xhc3NOYW1lPVwiZGlyZWN0b3J5XCIgLz47XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTsgfVxuICBcbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIFxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTsgfVxuICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIFxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgpOyB9XG4gIFxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpOyB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCArICcvJyArIGRyYWdnYWJsZUVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuICAgIFxuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlNYXJrZXI7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoLFxuICAgICAgICAgIHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAobWFya2VkICYmIHVubW92ZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5GaWxlKGZpbGUpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpO1xuICAgIFxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnByZXBlbmRUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgcm9vdERpcmVjdG9yeU5hbWUsIG9uT3Blbiwgb25Nb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZTsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAndWwnLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICdyb290RGlyZWN0b3J5TmFtZScsIFxuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19