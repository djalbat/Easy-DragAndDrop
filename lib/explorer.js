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
Object.assign(Explorer, {
  tagName: "div",
  defaultProperties: {
    className: "explorer"
  },
  ignoredProperties: ["onOpen", "onMove", "options", "topmostDirectoryName", "topmostDirectoryCollapsed"]
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGxvcmVyLmpzIl0sIm5hbWVzIjpbInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwicGF0aFV0aWxpdGllcyIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJvcHRpb25zIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlZCIsImJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJpc01hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsIm1hcmsiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2luZyIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZ1dpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiTk9fRFJBR0dJTkdfV0lUSElOIiwidW5tYXJrIiwibWFya0RyYWdnYWJsZUVudHJ5IiwiZG9uZSIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZHVwbGljYXRlIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwibmFtZSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInVubW92ZWQiLCJkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInVubWFya0dsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0IiwiQ2xhc3MiLCJvbk1vdmUiLCJvbk9wZW4iLCJkZWZhdWx0TW92ZUhhbmRsZXIiLCJkZWZhdWx0T3BlbkhhbmRsZXIiLCJEcm9wVGFyZ2V0IiwiZnJvbUNsYXNzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZGlyZWN0b3J5IiwicHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFFQSxNQUFGLEdBQWFDLHlCQUFiLENBQUVELE1BQUY7QUFBQSxJQUNFRSxpQ0FERixHQUN3Q0Msd0JBRHhDLENBQ0VELGlDQURGOztJQUdlRSxROzs7OztBQUNuQixvQkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUNDLFdBQW5DLEVBQWdEQyxXQUFoRCxFQUE2REMsT0FBN0QsRUFB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TSxHQUFHLElBQUlDLE1BQUosWUFBZS9ELFVBQWYsV0FBZjtBQUFBLE1BQ01nRSxPQUFPLEdBQUcvRixrQkFBa0IsQ0FBQ2dHLEtBQW5CLENBQXlCSCxNQUF6QixDQURoQjtBQUFBLE1BRU1JLFdBQVcsR0FBRzNILE1BQU0sQ0FBQ3lILE9BQUQsQ0FGMUI7QUFJQS9GLEVBQUFBLGtCQUFrQixHQUFHZ0MsVUFBVSxHQUFHaUUsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU9qRyxrQkFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi9lbnRyaWVzXCI7XG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tIFwiLi9kcm9wVGFyZ2V0XCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lXCI7XG5cbmltcG9ydCB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG1hcmtlckVudHJ5UGF0aCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgaWYgKHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG5cbiAgICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUsIG9uT3Blbiwgb3B0aW9ucyA9IHt9fSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlIHx8IGRlZmF1bHRNb3ZlSGFuZGxlciwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4gfHwgZGVmYXVsdE9wZW5IYW5kbGVyLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6IFwiZGl2XCIsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcImV4cGxvcmVyXCJcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICBcIm9uT3BlblwiLFxuICAgIFwib25Nb3ZlXCIsXG4gICAgXCJvcHRpb25zXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5TmFtZVwiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZFwiXG4gIF1cbn0pO1xuXG5mdW5jdGlvbiBkZWZhdWx0T3BlbkhhbmRsZXIoc291cmNlUGF0aCkge1xuICAvLy9cbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgXCJcXFxcKFwiKS5yZXBsYWNlKC9cXCkvZywgXCJcXFxcKVwiKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdnYWJsZUVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iXX0=