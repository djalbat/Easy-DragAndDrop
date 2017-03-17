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

  function Explorer(selector, rootDirectoryName, openHandler, moveHandler) {
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
      var filePath = file.getPath(this.rootDirectory),
          sourcePath = filePath;

      this.openHandler(sourcePath);
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
      var rootDirectoryName = properties.rootDirectoryName;
      var openHandler = properties.openHandler;
      var onMove = properties.onMove;
      var moveHandler = onMove; ///

      return Element.fromProperties(Explorer, properties, rootDirectoryName, openHandler, moveHandler);
    }
  }]);

  return Explorer;
}(DroppableElement);

Object.assign(Explorer, {
  tagName: 'div',
  ignoredAttributes: ['rootDirectoryName', 'openHandler', 'onMove']
});

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIlJlYWN0IiwidXRpbCIsIm9wdGlvbnMiLCJEcm9wcGFibGVFbGVtZW50IiwiRGlyZWN0b3J5TWFya2VyIiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsIm9wZW5IYW5kbGVyIiwibW92ZUhhbmRsZXIiLCJuYW1lIiwiZXhwbG9yZXIiLCJyb290RGlyZWN0b3J5IiwiYXBwZW5kIiwib3B0aW9uIiwiZ2V0RmlsZVBhdGhzIiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERyYWdnYWJsZUVudHJ5UGF0aCIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVGaWxlIiwicmVtb3ZlRGlyZWN0b3J5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwibWFya2VyUGF0aCIsImFkZE1hcmtlciIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInJlbW92ZSIsIm1hcmtlZCIsInRvQmVNYXJrZWQiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJzb21lIiwiY2hpbGRFbGVtZW50Iiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJ1bm1vdmVkIiwic3ViRHJhZ2dhYmxlRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiaXNUb0JlTWFya2VkIiwid2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbiIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIm5vRHJhZ2dpbmciLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJkaXJlY3RvcnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwibW92ZWREaXJlY3RvcnlQYXRoIiwiZ2V0RXhwbG9yZXIiLCJpc0NvbGxhcHNlZCIsImZpbGUiLCJzb3VyY2VGaWxlUGF0aCIsIm1vdmVkRmlsZVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwcmVwZW5kVGFyZ2V0UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJjbG9uZSIsImh0bWwiLCJmcm9tSFRNTCIsInByb3BlcnRpZXMiLCJvbk1vdmUiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxVQUFVRixPQUFPRSxPQUR2QjtBQUFBLElBRU1DLFFBQVFILE9BQU9HLEtBRnJCOztBQUlBLElBQU1DLE9BQU9ILFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUksVUFBVUosUUFBUSxXQUFSLENBRGhCO0FBQUEsSUFFTUssbUJBQW1CTCxRQUFRLG9CQUFSLENBRnpCO0FBQUEsSUFHTU0sa0JBQWtCTixRQUFRLG1DQUFSLENBSHhCO0FBQUEsSUFJTU8sZ0JBQWdCUCxRQUFRLDBDQUFSLENBSnRCOztJQU1NUSxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXlDQyxXQUF6QyxFQUFzREMsV0FBdEQsRUFBbUU7QUFBQTs7QUFBQSxvSEFDM0RILFFBRDJELEVBQ2pERyxXQURpRDs7QUFHakUsUUFBTUMsT0FBT0gsaUJBQWI7QUFBQSxRQUFnQztBQUMxQkksb0JBRE47QUFBQSxRQUN3QjtBQUNsQkMsb0JBQWdCLG9CQUFDLGFBQUQsSUFBZSxNQUFNRixJQUFyQixFQUEyQixVQUFVQyxRQUFyQyxFQUErQyxXQUFVLFdBQXpELEdBRnRCOztBQUlBLFVBQUtILFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtQLE9BQUwsR0FBZSxFQUFmOztBQUVBLFVBQUtXLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtDLE1BQUwsQ0FBWUQsYUFBWjtBQWJpRTtBQWNsRTs7Ozs4QkFFU0UsTSxFQUFRO0FBQ2hCLFdBQUtiLE9BQUwsQ0FBYWEsTUFBYixJQUF1QixJQUF2QjtBQUNEOzs7Z0NB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QUFTQUMsT0FBT0MsT0FBUCxHQUFpQnZHLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKSxcbiAgICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS9yb290Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIGNvbnN0IG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY2xhc3NOYW1lPVwiZGlyZWN0b3J5XCIgLz47XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTsgfVxuICBcbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIFxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTsgfVxuICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIFxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgpOyB9XG4gIFxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpOyB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCArICcvJyArIGRyYWdnYWJsZUVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuICAgIFxuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlNYXJrZXI7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoLFxuICAgICAgICAgIHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAobWFya2VkICYmIHVubW92ZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5GaWxlKGZpbGUpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aDtcbiAgICBcbiAgICB0aGlzLm9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnByZXBlbmRUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBvbk1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmU7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29wZW5IYW5kbGVyJywgXG4gICAgJ29uTW92ZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=