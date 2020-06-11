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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
          entries = /*#__PURE__*/React.createElement(Entries, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJvcHRpb25zIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJFbnRyaWVzIiwiY29uc3RydWN0b3IiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeSIsIm1hcmtlckVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlciIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VkIiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwibWFyayIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyYWdnaW5nIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nV2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJOT19EUkFHR0lOR19XSVRISU4iLCJ1bm1hcmsiLCJtYXJrRHJhZ2dhYmxlRW50cnkiLCJkb25lIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJkdXBsaWNhdGUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwidW5tb3ZlZCIsImRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwidW5tYXJrR2xvYmFsbHkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGRGaWxlUGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImFkZERpcmVjdG9yeVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCIsImdldEVudHJpZXMiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0IiwiQ2xhc3MiLCJvbk1vdmUiLCJkZWZhdWx0TW92ZUhhbmRsZXIiLCJvbk9wZW4iLCJkZWZhdWx0T3BlbkhhbmRsZXIiLCJEcm9wVGFyZ2V0IiwiZnJvbUNsYXNzIiwiaW5pdGlhbGlzZSIsImNsYXNzTmFtZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFFQSxNQUFGLEdBQWFDLHlCQUFiLENBQUVELE1BQUY7QUFBQSxJQUNFRSxpQ0FERixHQUN3Q0Msd0JBRHhDLENBQ0VELGlDQURGOztJQUdB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QUEsbURBQW1ELENBQUN2RixrQkFBRCxFQUFxQitCLFVBQXJCLEVBQWlDQyxVQUFqQyxDQUZyRSxDQU55RSxDQVEwQzs7QUFFbkhELEVBQUFBLFVBQVUsR0FBRy9CLGtCQUFiLENBVnlFLENBVXZDOztBQUVsQyxNQUFNZ0UsT0FBTyxHQUFHO0FBQ2RqQyxJQUFBQSxVQUFVLEVBQVZBLFVBRGM7QUFFZEMsSUFBQUEsVUFBVSxFQUFWQSxVQUZjO0FBR2RxRCxJQUFBQSxTQUFTLEVBQVRBO0FBSGMsR0FBaEI7QUFNQSxTQUFPckIsT0FBUDtBQUNEOztBQUVELFNBQVNzQixxQ0FBVCxDQUErQ3RGLGtCQUEvQyxFQUFvRWdDLFVBQXBFLEVBQWdGO0FBQzlFaEMsRUFBQUEsa0JBQWtCLGFBQU1nQyxVQUFOLGNBQW9CaEMsa0JBQXBCLENBQWxCO0FBRUEsU0FBT0Esa0JBQVA7QUFDRDs7QUFFRCxTQUFTdUYsbURBQVQsQ0FBNkR2RixrQkFBN0QsRUFBaUYrQixVQUFqRixFQUE2RkMsVUFBN0YsRUFBeUc7QUFDdkdELEVBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDeUQsT0FBWCxDQUFtQixLQUFuQixFQUEwQixLQUExQixFQUFpQ0EsT0FBakMsQ0FBeUMsS0FBekMsRUFBZ0QsS0FBaEQsQ0FBYixDQUR1RyxDQUNqQzs7QUFFdEUsTUFBTUMsTUFBTSxHQUFHLElBQUlDLE1BQUosWUFBZTNELFVBQWYsV0FBZjtBQUFBLE1BQ000RCxPQUFPLEdBQUczRixrQkFBa0IsQ0FBQzRGLEtBQW5CLENBQXlCSCxNQUF6QixDQURoQjtBQUFBLE1BRU1JLFdBQVcsR0FBRzVILE1BQU0sQ0FBQzBILE9BQUQsQ0FGMUI7QUFJQTNGLEVBQUFBLGtCQUFrQixHQUFHZ0MsVUFBVSxHQUFHNkQsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU83RixrQkFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi9lbnRyaWVzXCI7XG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tIFwiLi9kcm9wVGFyZ2V0XCI7XG5pbXBvcnQgRmlsZU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWVcIjtcbmltcG9ydCBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZVwiO1xuXG5pbXBvcnQgeyBOT19EUkFHR0lOR19XSVRISU4gfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgaXNPcHRpb25QcmVzZW50KG9wdGlvbikge1xuICAgIGNvbnN0IG9wdGlvblByZXNlbnQgPSAhIXRoaXMub3B0aW9uc1tvcHRpb25dO1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeVBhdGhzKCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCB7IEVudHJpZXMgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRW50cmllcztcbiAgfVxuXG4gIGdldEZpbGVOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZU1hcmtlckVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICBnZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHsgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG1hcmtlckVudHJ5UGF0aCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgaWYgKHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG5cbiAgICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cygpIHtcbiAgICBjb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lLCB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIH0gPSB0aGlzLnByb3BlcnRpZXMsXG4gICAgICAgICAgRW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQsICAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGVudHJpZXMgPVxuXG4gICAgICAgICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICA7XG5cbiAgICBlbnRyaWVzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGVudHJpZXM7ICAvLy9cblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBFbnRyaWVzID0gRW50cmllcztcblxuICBzdGF0aWMgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IEZpbGVOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiZGl2XCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJleHBsb3JlclwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25PcGVuXCIsXG4gICAgXCJvbk1vdmVcIixcbiAgICBcIm9wdGlvbnNcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlOYW1lXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUgPSBkZWZhdWx0TW92ZUhhbmRsZXIsIG9uT3BlbiA9IGRlZmF1bHRPcGVuSGFuZGxlciwgb3B0aW9ucyA9IHt9IH0gPSBwcm9wZXJ0aWVzLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4sIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gRHJvcFRhcmdldC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBleHBsb3Jlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFeHBsb3JlcilgXG5cbiAgd2lkdGg6IGF1dG87XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tbGVmdDogLTIuNHJlbTtcblxuYDtcblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHt0YXJnZXRQYXRofS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csIFwiXFxcXChcIikucmVwbGFjZSgvXFwpL2csIFwiXFxcXClcIik7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuIl19