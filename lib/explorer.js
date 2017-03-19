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
    DropTarget = require('./dropTarget'),
    DirectoryMarker = require('./explorer/entry/marker/directory'),
    RootDirectory = require('./explorer/draggableEntry/directory/root');

var Explorer = function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

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
          markedDropTarget = marked ? this : this.getMarkedDropTarget(),
          markedDirectory = markedDropTarget.getMarkedDirectory(),
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

        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.removeMarker();

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
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.dragging(draggableEntry, explorer);
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
}(DropTarget);

Object.assign(Explorer, {
  tagName: 'ul',
  ignoredAttributes: ['rootDirectoryName', 'onOpen', 'onMove']
});

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIlJlYWN0IiwidXRpbCIsIm9wdGlvbnMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TWFya2VyIiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsIm9wZW5IYW5kbGVyIiwic291cmNlUGF0aCIsIm1vdmVIYW5kbGVyIiwicGF0aE1hcHMiLCJkb25lIiwibmFtZSIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImFwcGVuZCIsIm9wdGlvbiIsImdldEZpbGVQYXRocyIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJ0b0JlTWFya2VkIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwic29tZSIsImNoaWxkRWxlbWVudCIsInN0YXJ0ZWREcmFnZ2luZyIsImFkZE1hcmtlckluUGxhY2UiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwidGFyZ2V0UGF0aCIsInVubW92ZWQiLCJzdWJEcmFnZ2FibGVFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJpc1RvQmVNYXJrZWQiLCJ3aXRoaW4iLCJub0RyYWdnaW5nV2l0aGluIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwibm9EcmFnZ2luZyIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJnZXRFeHBsb3JlciIsImlzQ29sbGFwc2VkIiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsIm1hcCIsInBhdGhNYXAiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwcmVwZW5kVGFyZ2V0UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJjbG9uZSIsImh0bWwiLCJmcm9tSFRNTCIsInByb3BlcnRpZXMiLCJvbk9wZW4iLCJvbk1vdmUiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxVQUFVRixPQUFPRSxPQUR2QjtBQUFBLElBRU1DLFFBQVFILE9BQU9HLEtBRnJCOztBQUlBLElBQU1DLE9BQU9ILFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUksVUFBVUosUUFBUSxXQUFSLENBRGhCO0FBQUEsSUFFTUssYUFBYUwsUUFBUSxjQUFSLENBRm5CO0FBQUEsSUFHTU0sa0JBQWtCTixRQUFRLG1DQUFSLENBSHhCO0FBQUEsSUFJTU8sZ0JBQWdCUCxRQUFRLDBDQUFSLENBSnRCOztJQU1NUSxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXFJO0FBQUEsUUFBNUZDLFdBQTRGLHVFQUE5RSxVQUFTQyxVQUFULEVBQXFCLENBQUUsQ0FBdUQ7QUFBQSxRQUFyREMsV0FBcUQsdUVBQXZDLFVBQVNDLFFBQVQsRUFBbUJDLElBQW5CLEVBQXlCO0FBQUVBO0FBQVMsS0FBRzs7QUFBQTs7QUFBQSxvSEFDN0hOLFFBRDZILEVBQ25ISSxXQURtSDs7QUFHbkksUUFBTUcsT0FBT04saUJBQWI7QUFBQSxRQUFnQztBQUMxQk8sb0JBRE47QUFBQSxRQUN3QjtBQUNsQkMsb0JBQWdCLG9CQUFDLGFBQUQsSUFBZSxNQUFNRixJQUFyQixFQUEyQixVQUFVQyxRQUFyQyxFQUErQyxXQUFVLFdBQXpELEdBRnRCOztBQUlBLFVBQUtOLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtQLE9BQUwsR0FBZSxFQUFmOztBQUVBLFVBQUtjLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtDLE1BQUwsQ0FBWUQsYUFBWjtBQWJt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ZCxFQUF3QjtBQUN0QnFHLFdBQVMsSUFEYTtBQUV0QkMscUJBQW1CLENBQ2pCLG1CQURpQixFQUVqQixRQUZpQixFQUdqQixRQUhpQjtBQUZHLENBQXhCOztBQVNBQyxPQUFPQyxPQUFQLEdBQWlCeEcsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeScpLFxuICAgICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5L3Jvb3QnKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKHBhdGhNYXBzLCBkb25lKSB7IGRvbmUoKTsgfSApIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgY29uc3QgbmFtZSA9IHJvb3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICByb290RGlyZWN0b3J5ID0gPFJvb3REaXJlY3RvcnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjbGFzc05hbWU9XCJkaXJlY3RvcnlcIiAvPjtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldEZpbGVQYXRocygpOyB9XG4gIFxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTsgfVxuICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpOyB9XG4gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCk7IH1cbiAgXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gPERpcmVjdG9yeU1hcmtlciBuYW1lPXtuYW1lfSBjbGFzc05hbWU9XCJtYXJrZXJcIiAvPjtcblxuICAgIHRoaXMuYXBwZW5kKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG4gICAgXG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICBtYXJrZWQgPSAodG9wbW9zdERpcmVjdG9yeU1hcmtlciAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wVGFyZ2V0LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGgsXG4gICAgICAgICAgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChtYXJrZWQgJiYgdW5tb3ZlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKG1vdmVkRmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgICBcbiAgICAgIGZpbGVQYXRoID0gbW92ZWRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGUoZmlsZSkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSk7XG4gICAgXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0ge30sXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcik7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyByb290RGlyZWN0b3J5TmFtZSwgb25PcGVuLCBvbk1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4sIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=