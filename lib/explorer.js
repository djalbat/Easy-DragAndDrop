'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var easy = require('easy'),
    necessary = require('necessary');

var types = require('./types'),
    options = require('./options'),
    Entries = require('./entries'),
    DropTarget = require('./dropTarget'),
    DirectoryNameDraggableEntry = require('./entry/draggable/directoryName');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    React = easy.React,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    pathWithoutBottommostNameFromPath = pathUtilities.pathWithoutBottommostNameFromPath;

var Explorer = /*#__PURE__*/function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  function Explorer(selector, dropTargets, moveHandler, openHandler, options) {
    var _this;

    _classCallCheck(this, Explorer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Explorer).call(this, selector, dropTargets, moveHandler));
    _this.openHandler = openHandler;
    _this.options = options;
    return _this;
  }

  _createClass(Explorer, [{
    key: "setOption",
    value: function setOption(option) {
      this.options[option] = true;
    }
  }, {
    key: "unsetOption",
    value: function unsetOption(option) {
      delete this.options[option];
    }
  }, {
    key: "isOptionPresent",
    value: function isOptionPresent(option) {
      var optionPresent = !!this.options[option]; ///

      return optionPresent;
    }
  }, {
    key: "getFilePaths",
    value: function getFilePaths() {
      var filePaths = this.retrieveFilePaths();
      return filePaths;
    }
  }, {
    key: "getDirectoryPaths",
    value: function getDirectoryPaths() {
      var directoryPaths = this.retrieveDirectoryPaths();
      return directoryPaths;
    }
  }, {
    key: "getTopmostDirectoryName",
    value: function getTopmostDirectoryName() {
      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(),
          topmostDirectoryNameDraggableEntryName = topmostDirectoryNameDraggableEntry.getName(),
          topmostDirectoryName = topmostDirectoryNameDraggableEntryName; ///

      return topmostDirectoryName;
    }
  }, {
    key: "getDirectoryNameDraggableEntry",
    value: function getDirectoryNameDraggableEntry() {
      return DirectoryNameDraggableEntry; ///
    }
  }, {
    key: "mark",
    value: function mark(draggableEntry, previousDraggableEntry) {
      var markerEntryPath, draggableEntryType;
      var draggableEntryPath = draggableEntry.getPath();

      if (previousDraggableEntry !== null) {
        var previousDraggableEntryName = previousDraggableEntry.getName(),
            previousDraggableEntryType = previousDraggableEntry.getType();
        markerEntryPath = "".concat(draggableEntryPath, "/").concat(previousDraggableEntryName);
        draggableEntryType = previousDraggableEntryType; ///
      } else {
        draggableEntryType = draggableEntry.getType();
        markerEntryPath = draggableEntryPath; ///
      }

      this.addMarker(markerEntryPath, draggableEntryType);
    }
  }, {
    key: "unmark",
    value: function unmark() {
      this.removeMarker();
    }
  }, {
    key: "isMarked",
    value: function isMarked() {
      var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
          marked = markedDirectoryNameDraggableEntry !== null;
      return marked;
    }
  }, {
    key: "isToBeMarked",
    value: function isToBeMarked(draggableEntry) {
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry !== null;
      return toBeMarked;
    }
  }, {
    key: "startDragging",
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        var previousDraggableEntry = null;
        this.mark(draggableEntry, previousDraggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: "dragging",
    value: function dragging(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget !== this) {
        markedDropTarget.dragging(draggableEntry);
        return;
      }

      var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

      if (dropTargetToBeMarked === this) {
        var draggingWithin = explorer === this,
            ///
        noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

        if (draggingWithin && noDraggingWithinOptionPresent) {
          return;
        }

        var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
          var previousDraggableEntry = draggableEntry; ///

          draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

          this.unmark();
          this.mark(draggableEntry, previousDraggableEntry);
        }
      } else if (dropTargetToBeMarked !== null) {
        dropTargetToBeMarked.markDraggableEntry(draggableEntry);
        this.unmark();
      } else {
        var _dropTargetToBeMarked = explorer,
            ///
        _previousDraggableEntry = null;

        _dropTargetToBeMarked.mark(draggableEntry, _previousDraggableEntry);

        this.unmark();
      }
    }
  }, {
    key: "stopDragging",
    value: function stopDragging(draggableEntry, done) {
      var markedDropTarget = this.getMarkedDropTarget(),
          draggableEntryPath = draggableEntry.getPath(),
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName; ///

      var targetPath = null,
          duplicate = false;

      if (markedDirectoryNameDraggableEntry !== null) {
        var draggableEntryName = draggableEntry.getName(),
            name = draggableEntryName,
            ///
        draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);

        if (draggableEntryPresent) {
          duplicate = true;
        } else {
          var markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry.getPath();
          targetPath = markedDirectoryNameDraggableEntryPath; ///
        }
      }

      var unmoved = sourcePath === targetPath;

      if (duplicate || unmoved) {
        markedDropTarget.unmark();
        done();
      } else {
        var draggableEntrySubEntries = draggableEntry.retrieveDraggableSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);
        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.unmark();
          done();
        });
      }
    }
  }, {
    key: "escapeDragging",
    value: function escapeDragging() {
      this.unmarkGlobally();
    }
  }, {
    key: "markDraggableEntry",
    value: function markDraggableEntry(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          draggingWithin = explorer === this,
          ///
      noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

      if (draggingWithin && noDraggingWithinOptionPresent) {
        var previousDraggableEntry = null;
        this.mark(draggableEntry, previousDraggableEntry);
      } else {
        var _previousDraggableEntry2 = draggableEntry,
            ///
        bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
        draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

        this.mark(draggableEntry, _previousDraggableEntry2);
      }
    }
  }, {
    key: "moveFileNameDraggableEntry",
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;
      var explorer = fileNameDraggableEntry.getExplorer();
      var filePath;

      if (targetFilePath === sourceFilePath) {///
      } else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
        filePath = targetFilePath; ///

        fileNameDraggableEntry = this.addFilePath(filePath);
        draggableEntry = fileNameDraggableEntry; ///
      }

      return draggableEntry;
    }
  }, {
    key: "moveDirectoryNameDraggableEntry",
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;
      var explorer = directoryNameDraggableEntry.getExplorer();
      var directoryPath;

      if (targetDirectoryPath === sourceDirectoryPath) {///
      } else if (targetDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
        directoryPath = targetDirectoryPath; ///

        var collapsed = directoryNameDraggableEntry.isCollapsed();
        directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);
        draggableEntry = directoryNameDraggableEntry; ///
      }

      return draggableEntry;
    }
  }, {
    key: "openFileNameDraggableEntry",
    value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
      var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
          filePath = fileNameDraggableEntryPath; ///

      this.openHandler(filePath);
    }
  }, {
    key: "pathMapsFromDraggableEntries",
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
        return pathMap;
      });
      return pathMaps;
    }
  }, {
    key: "childElements",
    value: function childElements(properties) {
      var topmostDirectoryName = properties.topmostDirectoryName,
          topmostDirectoryCollapsed = properties.topmostDirectoryCollapsed,
          explorer = this,
          collapsed = topmostDirectoryCollapsed,
          directoryName = topmostDirectoryName,
          entries = React.createElement(Entries, {
        explorer: explorer
      });
      entries.addDirectoryNameDraggableEntry(directoryName, collapsed);
      var childElements = entries; ///

      return childElements;
    }
  }, {
    key: "initialise",
    value: function initialise() {
      this.assignContext();
    }
  }], [{
    key: "fromProperties",
    value: function fromProperties(properties) {
      var onMove = properties.onMove,
          onOpen = properties.onOpen,
          _properties$options = properties.options,
          options = _properties$options === void 0 ? {} : _properties$options,
          moveHandler = onMove || defaultMoveHandler,
          openHandler = onOpen || defaultOpenHandler,
          explorer = DropTarget.fromProperties(Explorer, properties, moveHandler, openHandler, options);
      explorer.initialise();
      return explorer;
    }
  }]);

  return Explorer;
}(DropTarget);

Object.assign(Explorer, {
  tagName: 'div',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: ['onOpen', 'onMove', 'options', 'topmostDirectoryName', 'topmostDirectoryCollapsed']
});
module.exports = Explorer;

function defaultOpenHandler(sourcePath) {///
}

function defaultMoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === DIRECTORY_NAME_TYPE,
      directory = draggableEntryDirectoryNameDraggableEntry; ///

  targetPath = sourcePath === null ? prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) : ///
  replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };
  return pathMap;
}

function prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) {
  draggableEntryPath = "".concat(targetPath, "/").concat(draggableEntryPath);
  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)'); ///

  var regExp = new RegExp("^".concat(sourcePath, "(.*$)")),
      matches = draggableEntryPath.match(regExp),
      secondMatch = second(matches);
  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwidHlwZXMiLCJvcHRpb25zIiwiRW50cmllcyIsIkRyb3BUYXJnZXQiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwYXRoVXRpbGl0aWVzIiwiYXJyYXlVdGlsaXRpZXMiLCJSZWFjdCIsInNlY29uZCIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwiZHJvcFRhcmdldHMiLCJtb3ZlSGFuZGxlciIsIm9wZW5IYW5kbGVyIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlZCIsImJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJpc01hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsIm1hcmsiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2luZyIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZ1dpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwidW5tYXJrIiwibWFya0RyYWdnYWJsZUVudHJ5IiwiZG9uZSIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZHVwbGljYXRlIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwibmFtZSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInVubW92ZWQiLCJkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInVubWFya0dsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0Iiwib25Nb3ZlIiwib25PcGVuIiwiZGVmYXVsdE1vdmVIYW5kbGVyIiwiZGVmYXVsdE9wZW5IYW5kbGVyIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiLCJwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZSIsInJlZ0V4cCIsIlJlZ0V4cCIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCO0FBQUEsSUFDTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUR6Qjs7QUFHQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxTQUFELENBQXJCO0FBQUEsSUFDTUcsT0FB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dkM7O0FBRWxDLE1BQU0rRCxPQUFPLEdBQUc7QUFDZGpDLElBQUFBLFVBQVUsRUFBVkEsVUFEYztBQUVkQyxJQUFBQSxVQUFVLEVBQVZBLFVBRmM7QUFHZHdELElBQUFBLFNBQVMsRUFBVEE7QUFIYyxHQUFoQjtBQU1BLFNBQU94QixPQUFQO0FBQ0Q7O0FBRUQsU0FBU3lCLHFDQUFULENBQStDeEYsa0JBQS9DLEVBQW9FK0IsVUFBcEUsRUFBZ0Y7QUFDOUUvQixFQUFBQSxrQkFBa0IsYUFBTStCLFVBQU4sY0FBb0IvQixrQkFBcEIsQ0FBbEI7QUFFQSxTQUFPQSxrQkFBUDtBQUNEOztBQUVELFNBQVN5RixtREFBVCxDQUE2RHpGLGtCQUE3RCxFQUFpRjhCLFVBQWpGLEVBQTZGQyxVQUE3RixFQUF5RztBQUN2R0QsRUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUM0RCxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDQSxPQUFqQyxDQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsTUFBSixZQUFlOUQsVUFBZixXQUFmO0FBQUEsTUFDTStELE9BQU8sR0FBRzdGLGtCQUFrQixDQUFDOEYsS0FBbkIsQ0FBeUJILE1BQXpCLENBRGhCO0FBQUEsTUFFTUksV0FBVyxHQUFHdkgsTUFBTSxDQUFDcUgsT0FBRCxDQUYxQjtBQUlBN0YsRUFBQUEsa0JBQWtCLEdBQUcrQixVQUFVLEdBQUdnRSxXQUFsQyxDQVB1RyxDQU94RDs7QUFFL0MsU0FBTy9GLGtCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi9lbnRyaWVzJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9ID0gb3B0aW9ucyxcbiAgICAgIHsgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG1hcmtlckVudHJ5UGF0aCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgaWYgKHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG5cbiAgICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgPSB7fX0gPSBwcm9wZXJ0aWVzLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSB8fCBkZWZhdWx0TW92ZUhhbmRsZXIsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuIHx8IGRlZmF1bHRPcGVuSGFuZGxlciwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHt0YXJnZXRQYXRofS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdnYWJsZUVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iXX0=