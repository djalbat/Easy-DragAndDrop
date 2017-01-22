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

  function Explorer(selector, rootDirectoryName, openHandler, moveHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var explorer = _this,
        ///
    rootDirectory = RootDirectory.clone(rootDirectoryName, explorer);

    _this.openHandler = openHandler;

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
  }]);

  return Explorer;
}(DroppableElement);

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRGlyZWN0b3J5TWFya2VyIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJvcGVuSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwiZXhwbG9yZXIiLCJyb290RGlyZWN0b3J5IiwiY2xvbmUiLCJhcHBlbmQiLCJvcHRpb24iLCJnZXRGaWxlUGF0aHMiLCJnZXROYW1lIiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImFkZERpcmVjdG9yeSIsInJlbW92ZUZpbGUiLCJyZW1vdmVEaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlIiwibWFya2VkIiwidG9CZU1hcmtlZCIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsInNvbWUiLCJjaGlsZEVsZW1lbnQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwibWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkRyYWdnYWJsZUVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJub0RyYWdnaW5nIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsImdldEV4cGxvcmVyIiwiaXNDb2xsYXBzZWQiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJtb3ZlZEZpbGVQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJn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a0NDLGlCQUFsQyxFQUFxREMsV0FBckQsRUFBa0VDLFdBQWxFLENBQVA7QUFDRDs7OzZCQUVldUYsSSxFQUFNekYsaUIsRUFBbUJDLFcsRUFBYUMsVyxFQUFhO0FBQ2pFLGFBQU9WLFFBQVFrRyxRQUFSLENBQWlCNUYsUUFBakIsRUFBMkIyRixJQUEzQixFQUFpQ3pGLGlCQUFqQyxFQUFvREMsV0FBcEQsRUFBaUVDLFdBQWpFLENBQVA7QUFDRDs7OztFQWxTb0JOLGdCOztBQXFTdkIrRixPQUFPQyxPQUFQLEdBQWlCOUYsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZGlyZWN0b3J5TWFya2VyJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RmlsZVBhdGhzKCk7IH1cbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTsgfVxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7IH1cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCk7IH1cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTsgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZSh0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSk7XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZWQsXG4gICAgICAgIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TWFya2VyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsLFxuICAgICAgICBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKTtcblxuICAgIGNoaWxkTGlzdEVsZW1lbnRzLnNvbWUoZnVuY3Rpb24oY2hpbGRFbGVtZW50KSB7XG4gICAgICBpZiAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TWFya2VyO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoO1xuXG4gICAgaWYgKG1hcmtlZCAmJiAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN1YkRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbiA9IHRoaXMuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpIHtcbiAgICB2YXIgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkRGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpIHtcbiAgICB2YXIgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgIGZpbGVQYXRoO1xuXG4gICAgaWYgKG1vdmVkRmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgICBcbiAgICAgIGZpbGVQYXRoID0gbW92ZWRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGUoZmlsZSkge1xuICAgIHZhciBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGg7XG4gICAgXG4gICAgdGhpcy5vcGVuSGFuZGxlcihzb3VyY2VQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICB2YXIgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==