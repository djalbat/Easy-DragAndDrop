"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _necessary = require("necessary");

var _entries = _interopRequireDefault(require("./entries"));

var _dropTarget = _interopRequireDefault(require("./dropTarget"));

var _fileName = _interopRequireDefault(require("./entry/marker/fileName"));

var _fileName2 = _interopRequireDefault(require("./entry/draggable/fileName"));

var _directoryName = _interopRequireDefault(require("./entry/marker/directoryName"));

var _directoryName2 = _interopRequireDefault(require("./entry/draggable/directoryName"));

var _options = require("./options");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  width: auto;\n  display: inline-block;\n  position: relative;\n  overflow: hidden;\n  margin-left: -2.4rem;\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var second = _necessary.arrayUtilities.second,
    pathWithoutBottommostNameFromPath = _necessary.pathUtilities.pathWithoutBottommostNameFromPath;

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
    key: "isOptionPresent",
    value: function isOptionPresent(option) {
      var optionPresent = !!this.options[option];
      return optionPresent;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
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
    key: "getEntries",
    value: function getEntries() {
      var Entries = this.constructor.Entries;
      return Entries;
    }
  }, {
    key: "getFileNameMarkerEntry",
    value: function getFileNameMarkerEntry() {
      var FileNameMarkerEntry = this.constructor.FileNameMarkerEntry;
      return FileNameMarkerEntry;
    }
  }, {
    key: "getFileNameDraggableEntry",
    value: function getFileNameDraggableEntry() {
      var FileNameDraggableEntry = this.constructor.FileNameDraggableEntry;
      return FileNameDraggableEntry;
    }
  }, {
    key: "getDirectoryNameMarkerEntry",
    value: function getDirectoryNameMarkerEntry() {
      var DirectoryNameMarkerEntry = this.constructor.DirectoryNameMarkerEntry;
      return DirectoryNameMarkerEntry;
    }
  }, {
    key: "getDirectoryNameDraggableEntry",
    value: function getDirectoryNameDraggableEntry() {
      var DirectoryNameDraggableEntry = this.constructor.DirectoryNameDraggableEntry;
      return DirectoryNameDraggableEntry;
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
        noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);

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
      noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);

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
    value: function childElements() {
      var _this$properties = this.properties,
          topmostDirectoryName = _this$properties.topmostDirectoryName,
          topmostDirectoryCollapsed = _this$properties.topmostDirectoryCollapsed,
          Entries = this.getEntries(),
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
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onMove = properties.onMove,
          onMove = _properties$onMove === void 0 ? defaultMoveHandler : _properties$onMove,
          _properties$onOpen = properties.onOpen,
          onOpen = _properties$onOpen === void 0 ? defaultOpenHandler : _properties$onOpen,
          _properties$options = properties.options,
          options = _properties$options === void 0 ? {} : _properties$options,
          moveHandler = onMove,
          openHandler = onOpen,
          explorer = _dropTarget["default"].fromClass(Class, properties, moveHandler, openHandler, options);

      explorer.initialise();
      return explorer;
    }
  }]);

  return Explorer;
}(_dropTarget["default"]);

_defineProperty(Explorer, "Entries", _entries["default"]);

_defineProperty(Explorer, "FileNameMarkerEntry", _fileName["default"]);

_defineProperty(Explorer, "FileNameDraggableEntry", _fileName2["default"]);

_defineProperty(Explorer, "DirectoryNameMarkerEntry", _directoryName["default"]);

_defineProperty(Explorer, "DirectoryNameDraggableEntry", _directoryName2["default"]);

_defineProperty(Explorer, "tagName", "div");

_defineProperty(Explorer, "defaultProperties", {
  className: "explorer"
});

_defineProperty(Explorer, "ignoredProperties", ["onOpen", "onMove", "options", "topmostDirectoryName", "topmostDirectoryCollapsed"]);

var _default = (0, _easyWithStyle["default"])(Explorer)(_templateObject());

exports["default"] = _default;

function defaultOpenHandler(sourcePath) {///
}

function defaultMoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === _types.DIRECTORY_NAME_TYPE,
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
  sourcePath = sourcePath.replace(/\(/g, "\\(").replace(/\)/g, "\\)"); ///

  var regExp = new RegExp("^".concat(sourcePath, "(.*$)")),
      matches = draggableEntryPath.match(regExp),
      secondMatch = second(matches);
  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJvcHRpb25zIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJFbnRyaWVzIiwiY29uc3RydWN0b3IiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeSIsIm1hcmtlckVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlciIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VkIiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwibWFyayIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnaW5nIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nV2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJOT19EUkFHR0lOR19XSVRISU4iLCJ1bm1hcmsiLCJtYXJrRHJhZ2dhYmxlRW50cnkiLCJkb25lIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkdXBsaWNhdGUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwidW5tb3ZlZCIsImRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwidW5tYXJrR2xvYmFsbHkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGRGaWxlUGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImFkZERpcmVjdG9yeVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCIsImdldEVudHJpZXMiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0IiwiQ2xhc3MiLCJvbk1vdmUiLCJkZWZhdWx0TW92ZUhhbmRsZXIiLCJvbk9wZW4iLCJkZWZhdWx0T3BlbkhhbmRsZXIiLCJEcm9wVGFyZ2V0IiwiZnJvbUNsYXNzIiwiaW5pdGlhbGlzZSIsImNsYXNzTmFtZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUVBLE1BQUYsR0FBYUMseUJBQWIsQ0FBRUQsTUFBRjtBQUFBLElBQ0VFLGlDQURGLEdBQ3dDQyx3QkFEeEMsQ0FDRUQsaUNBREY7O0lBR0FFLFE7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bUQsQ0FBQ3ZGLGtCQUFELEVBQXFCK0IsVUFBckIsRUFBaUNDLFVBQWpDLENBRnJFLENBTnlFLENBUTBDOztBQUVuSEQsRUFBQUEsVUFBVSxHQUFHL0Isa0JBQWIsQ0FWeUUsQ0FVdkM7O0FBRWxDLE1BQU1nRSxPQUFPLEdBQUc7QUFDZGpDLElBQUFBLFVBQVUsRUFBVkEsVUFEYztBQUVkQyxJQUFBQSxVQUFVLEVBQVZBLFVBRmM7QUFHZHFELElBQUFBLFNBQVMsRUFBVEE7QUFIYyxHQUFoQjtBQU1BLFNBQU9yQixPQUFQO0FBQ0Q7O0FBRUQsU0FBU3NCLHFDQUFULENBQStDdEYsa0JBQS9DLEVBQW9FZ0MsVUFBcEUsRUFBZ0Y7QUFDOUVoQyxFQUFBQSxrQkFBa0IsYUFBTWdDLFVBQU4sY0FBb0JoQyxrQkFBcEIsQ0FBbEI7QUFFQSxTQUFPQSxrQkFBUDtBQUNEOztBQUVELFNBQVN1RixtREFBVCxDQUE2RHZGLGtCQUE3RCxFQUFpRitCLFVBQWpGLEVBQTZGQyxVQUE3RixFQUF5RztBQUN2R0QsRUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUN5RCxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDQSxPQUFqQyxDQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsTUFBSixZQUFlM0QsVUFBZixXQUFmO0FBQUEsTUFDTTRELE9BQU8sR0FBRzNGLGtCQUFrQixDQUFDNEYsS0FBbkIsQ0FBeUJILE1BQXpCLENBRGhCO0FBQUEsTUFFTUksV0FBVyxHQUFHNUgsTUFBTSxDQUFDMEgsT0FBRCxDQUYxQjtBQUlBM0YsRUFBQUEsa0JBQWtCLEdBQUdnQyxVQUFVLEdBQUc2RCxXQUFsQyxDQVB1RyxDQU94RDs7QUFFL0MsU0FBTzdGLGtCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBGaWxlTmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9maWxlTmFtZVwiO1xuaW1wb3J0IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lXCI7XG5cbmltcG9ydCB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07XG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IHsgRW50cmllcyB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgbWFya2VyRW50cnlQYXRoLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RyYWdnYWJsZUVudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgY29uc3QgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgdGhpcy51bm1hcmsoKTtcblxuICAgICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBFbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZW50cmllcyA9XG5cbiAgICAgICAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIEVudHJpZXMgPSBFbnRyaWVzO1xuXG4gIHN0YXRpYyBGaWxlTmFtZU1hcmtlckVudHJ5ID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImV4cGxvcmVyXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbk9wZW5cIixcbiAgICBcIm9uTW92ZVwiLFxuICAgIFwib3B0aW9uc1wiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeU5hbWVcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWRcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSA9IGRlZmF1bHRNb3ZlSGFuZGxlciwgb25PcGVuID0gZGVmYXVsdE9wZW5IYW5kbGVyLCBvcHRpb25zID0ge30gfSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKEV4cGxvcmVyKWBcblxuICB3aWR0aDogYXV0bztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbi1sZWZ0OiAtMi40cmVtO1xuXG5gO1xuXG5mdW5jdGlvbiBkZWZhdWx0T3BlbkhhbmRsZXIoc291cmNlUGF0aCkge1xuICAvLy9cbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgXCJcXFxcKFwiKS5yZXBsYWNlKC9cXCkvZywgXCJcXFxcKVwiKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdnYWJsZUVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iXX0=