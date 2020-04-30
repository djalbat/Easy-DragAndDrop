"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _necessary = require("necessary");

var _entries = _interopRequireDefault(require("./entries"));

var _dropTarget = _interopRequireDefault(require("./dropTarget"));

var _directoryName = _interopRequireDefault(require("./entry/draggable/directoryName"));

var _options = require("./options");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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
      return _directoryName["default"]; ///
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
    value: function childElements(properties) {
      var topmostDirectoryName = properties.topmostDirectoryName,
          topmostDirectoryCollapsed = properties.topmostDirectoryCollapsed,
          explorer = this,
          collapsed = topmostDirectoryCollapsed,
          directoryName = topmostDirectoryName,
          entries = /*#__PURE__*/React.createElement(_entries["default"], {
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
      var onMove = properties.onMove,
          onOpen = properties.onOpen,
          _properties$options = properties.options,
          options = _properties$options === void 0 ? {} : _properties$options,
          moveHandler = onMove || defaultMoveHandler,
          openHandler = onOpen || defaultOpenHandler,
          explorer = _dropTarget["default"].fromClass(Class, properties, moveHandler, openHandler, options);

      explorer.initialise();
      return explorer;
    }
  }]);

  return Explorer;
}(_dropTarget["default"]);

exports["default"] = Explorer;

_defineProperty(Explorer, "tagName", "div");

_defineProperty(Explorer, "defaultProperties", {
  className: "explorer"
});

_defineProperty(Explorer, "ignoredProperties", ["onOpen", "onMove", "options", "topmostDirectoryName", "topmostDirectoryCollapsed"]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJvcHRpb25zIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlZCIsImJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJpc01hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsIm1hcmsiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2luZyIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZ1dpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiTk9fRFJBR0dJTkdfV0lUSElOIiwidW5tYXJrIiwibWFya0RyYWdnYWJsZUVudHJ5IiwiZG9uZSIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZHVwbGljYXRlIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwibmFtZSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInVubW92ZWQiLCJkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInVubWFya0dsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0IiwiQ2xhc3MiLCJvbk1vdmUiLCJvbk9wZW4iLCJkZWZhdWx0TW92ZUhhbmRsZXIiLCJkZWZhdWx0T3BlbkhhbmRsZXIiLCJEcm9wVGFyZ2V0IiwiZnJvbUNsYXNzIiwiaW5pdGlhbGlzZSIsImNsYXNzTmFtZSIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFFQSxNQUFGLEdBQWFDLHlCQUFiLENBQUVELE1BQUY7QUFBQSxJQUNFRSxpQ0FERixHQUN3Q0Msd0JBRHhDLENBQ0VELGlDQURGOztJQUdlRSxROzs7OztBQUNuQixvQkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUNDLFdBQW5DLEVBQWdEQyxXQUFoRCxFQUE2REMsT0FBN0QsRUFBc0U7QUFBQTs7QUFBQTs7QUFDcEUsOEJBQU1KLFFBQU4sRUFBZ0JDLFdBQWhCLEVBQTZCQyxXQUE3QjtBQUVBLFVB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LENBRjFCO0FBSUExRixFQUFBQSxrQkFBa0IsR0FBR2dDLFVBQVUsR0FBRzRELFdBQWxDLENBUHVHLENBT3hEOztBQUUvQyxTQUFPNUYsa0JBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzLCBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4vZW50cmllc1wiO1xuaW1wb3J0IERyb3BUYXJnZXQgZnJvbSBcIi4vZHJvcFRhcmdldFwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZVwiO1xuXG5pbXBvcnQgeyBOT19EUkFHR0lOR19XSVRISU4gfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeVBhdGhzKCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBtYXJrZXJFbnRyeVBhdGgsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgIGlmIChwcmV2aW91c0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gYCR7ZHJhZ2dhYmxlRW50cnlQYXRofS8ke3ByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lfWA7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICB1bm1hcmsoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSB0aGlzKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuXG4gICAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7IC8vL1xuXG4gICAgbGV0IHRhcmdldFBhdGggPSBudWxsLFxuICAgICAgICBkdXBsaWNhdGUgPSBmYWxzZTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIG5hbWUgPSBkcmFnZ2FibGVFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgKCkgPT4ge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMudW5tYXJrR2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZW50cmllcyA9XG5cbiAgICAgICAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImRpdlwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZXhwbG9yZXJcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uT3BlblwiLFxuICAgIFwib25Nb3ZlXCIsXG4gICAgXCJvcHRpb25zXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5TmFtZVwiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZFwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgPSB7fX0gPSBwcm9wZXJ0aWVzLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSB8fCBkZWZhdWx0TW92ZUhhbmRsZXIsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuIHx8IGRlZmF1bHRPcGVuSGFuZGxlciwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHt0YXJnZXRQYXRofS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csIFwiXFxcXChcIikucmVwbGFjZSgvXFwpL2csIFwiXFxcXClcIik7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuIl19