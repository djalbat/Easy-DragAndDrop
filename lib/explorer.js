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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var second = _necessary.arrayUtilities.second,
    pathWithoutBottommostNameFromPath = _necessary.pathUtilities.pathWithoutBottommostNameFromPath;

var Explorer = /*#__PURE__*/function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  var _super = _createSuper(Explorer);

  function Explorer(selector, dropTargets, moveHandler, openHandler, options) {
    var _this;

    _classCallCheck(this, Explorer);

    _this = _super.call(this, selector, dropTargets, moveHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJvcHRpb25zIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJFbnRyaWVzIiwiY29uc3RydWN0b3IiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeSIsIm1hcmtlckVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlciIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VkIiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwibWFyayIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnaW5nIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nV2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJOT19EUkFHR0lOR19XSVRISU4iLCJ1bm1hcmsiLCJtYXJrRHJhZ2dhYmxlRW50cnkiLCJkb25lIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkdXBsaWNhdGUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwidW5tb3ZlZCIsImRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwidW5tYXJrR2xvYmFsbHkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGRGaWxlUGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImFkZERpcmVjdG9yeVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCIsImdldEVudHJpZXMiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0IiwiQ2xhc3MiLCJvbk1vdmUiLCJkZWZhdWx0TW92ZUhhbmRsZXIiLCJvbk9wZW4iLCJkZWZhdWx0T3BlbkhhbmRsZXIiLCJEcm9wVGFyZ2V0IiwiZnJvbUNsYXNzIiwiaW5pdGlhbGlzZSIsImNsYXNzTmFtZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUVBLE1BQUYsR0FBYUMseUJBQWIsQ0FBRUQsTUFBRjtBQUFBLElBQ0VFLGlDQURGLEdBQ3dD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LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzLCBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4vZW50cmllc1wiO1xuaW1wb3J0IERyb3BUYXJnZXQgZnJvbSBcIi4vZHJvcFRhcmdldFwiO1xuaW1wb3J0IEZpbGVOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWVcIjtcblxuaW1wb3J0IHsgTk9fRFJBR0dJTkdfV0lUSElOIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucykge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTtcblxuICAgIHJldHVybiBvcHRpb25QcmVzZW50O1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWU7ICAvLy9cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgeyBFbnRyaWVzIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEVudHJpZXM7XG4gIH1cblxuICBnZXRGaWxlTmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IHsgRmlsZU5hbWVNYXJrZXJFbnRyeSB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBGaWxlTmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBtYXJrZXJFbnRyeVBhdGgsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgIGlmIChwcmV2aW91c0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gYCR7ZHJhZ2dhYmxlRW50cnlQYXRofS8ke3ByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lfWA7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICB1bm1hcmsoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSB0aGlzKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuXG4gICAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7IC8vL1xuXG4gICAgbGV0IHRhcmdldFBhdGggPSBudWxsLFxuICAgICAgICBkdXBsaWNhdGUgPSBmYWxzZTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIG5hbWUgPSBkcmFnZ2FibGVFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgKCkgPT4ge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMudW5tYXJrR2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgIEVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgRW50cmllcyA9IEVudHJpZXM7XG5cbiAgc3RhdGljIEZpbGVOYW1lTWFya2VyRW50cnkgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuXG4gIHN0YXRpYyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImRpdlwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZXhwbG9yZXJcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uT3BlblwiLFxuICAgIFwib25Nb3ZlXCIsXG4gICAgXCJvcHRpb25zXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5TmFtZVwiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZFwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlID0gZGVmYXVsdE1vdmVIYW5kbGVyLCBvbk9wZW4gPSBkZWZhdWx0T3BlbkhhbmRsZXIsIG9wdGlvbnMgPSB7fSB9ID0gcHJvcGVydGllcywgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRXhwbG9yZXIpYFxuXG4gIHdpZHRoOiBhdXRvO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luLWxlZnQ6IC0yLjRyZW07XG5cbmA7XG5cbmZ1bmN0aW9uIGRlZmF1bHRPcGVuSGFuZGxlcihzb3VyY2VQYXRoKSB7XG4gIC8vL1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCBcIlxcXFwoXCIpLnJlcGxhY2UoL1xcKS9nLCBcIlxcXFwpXCIpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==