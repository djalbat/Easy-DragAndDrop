"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _necessary = require("necessary");
var _entries = _interopRequireDefault(require("./entries"));
var _dropTarget = _interopRequireDefault(require("./dropTarget"));
var _fileName = _interopRequireDefault(require("./entry/drag/fileName"));
var _fileName1 = _interopRequireDefault(require("./entry/marker/fileName"));
var _directoryName = _interopRequireDefault(require("./entry/drag/directoryName"));
var _directoryName1 = _interopRequireDefault(require("./entry/marker/directoryName"));
var _options = require("./options");
var _types = require("./types");
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  width: auto;\n  display: inline-block;\n  position: relative;\n  overflow: hidden;\n  margin-left: -2.4rem;\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var second = _necessary.arrayUtilities.second, pathWithoutBottommostNameFromPath = _necessary.pathUtilities.pathWithoutBottommostNameFromPath;
var Explorer = /*#__PURE__*/ function(DropTarget) {
    _inherits(Explorer, DropTarget);
    function Explorer(selector, dropTargets, moveHandler, openHandler, options) {
        _classCallCheck(this, Explorer);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Explorer).call(this, selector, dropTargets, moveHandler));
        _this.openHandler = openHandler;
        _this.options = options;
        return _this;
    }
    _createClass(Explorer, [
        {
            key: "isOptionPresent",
            value: function isOptionPresent(option) {
                var optionPresent = !!this.options[option];
                return optionPresent;
            }
        },
        {
            key: "setOptions",
            value: function setOptions(options) {
                this.options = options;
            }
        },
        {
            key: "setOption",
            value: function setOption(option) {
                this.options[option] = true;
            }
        },
        {
            key: "unsetOption",
            value: function unsetOption(option) {
                delete this.options[option];
            }
        },
        {
            key: "getFilePaths",
            value: function getFilePaths() {
                var filePaths = this.retrieveFilePaths();
                return filePaths;
            }
        },
        {
            key: "getDirectoryPaths",
            value: function getDirectoryPaths() {
                var directoryPaths = this.retrieveDirectoryPaths();
                return directoryPaths;
            }
        },
        {
            key: "getTopmostDirectoryName",
            value: function getTopmostDirectoryName() {
                var topmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry(), topmostDirectoryNameDragEntryName = topmostDirectoryNameDragEntry.getName(), topmostDirectoryName = topmostDirectoryNameDragEntryName; ///
                return topmostDirectoryName;
            }
        },
        {
            key: "getEntries",
            value: function getEntries() {
                var _constructor = this.constructor, Entries = _constructor.Entries;
                return Entries;
            }
        },
        {
            key: "getFileNameMarkerEntry",
            value: function getFileNameMarkerEntry() {
                var _constructor = this.constructor, FileNameMarkerEntry = _constructor.FileNameMarkerEntry;
                return FileNameMarkerEntry;
            }
        },
        {
            key: "getFileNameDragEntry",
            value: function getFileNameDragEntry() {
                var _constructor = this.constructor, FileNameDragEntry = _constructor.FileNameDragEntry;
                return FileNameDragEntry;
            }
        },
        {
            key: "getDirectoryNameMarkerEntry",
            value: function getDirectoryNameMarkerEntry() {
                var _constructor = this.constructor, DirectoryNameMarkerEntry = _constructor.DirectoryNameMarkerEntry;
                return DirectoryNameMarkerEntry;
            }
        },
        {
            key: "getDirectoryNameDragEntry",
            value: function getDirectoryNameDragEntry() {
                var _constructor = this.constructor, DirectoryNameDragEntry = _constructor.DirectoryNameDragEntry;
                return DirectoryNameDragEntry;
            }
        },
        {
            key: "mark",
            value: function mark(dragEntry, previousDragEntry) {
                var markerEntryPath, dragEntryType;
                var dragEntryPath = dragEntry.getPath();
                if (previousDragEntry !== null) {
                    var previousDragEntryName = previousDragEntry.getName(), previousDragEntryType = previousDragEntry.getType();
                    markerEntryPath = "".concat(dragEntryPath, "/").concat(previousDragEntryName);
                    dragEntryType = previousDragEntryType; ///
                } else {
                    dragEntryType = dragEntry.getType();
                    markerEntryPath = dragEntryPath; ///
                }
                this.addMarker(markerEntryPath, dragEntryType);
            }
        },
        {
            key: "unmark",
            value: function unmark() {
                this.removeMarker();
            }
        },
        {
            key: "isMarked",
            value: function isMarked() {
                var markedDirectoryNameDragEntry = this.retrieveMarkedDirectoryNameDragEntry(), marked = markedDirectoryNameDragEntry !== null;
                return marked;
            }
        },
        {
            key: "isToBeMarked",
            value: function isToBeMarked(dragEntry) {
                var bottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry), toBeMarked = bottommostDirectoryNameDragEntryOverlappingDragEntry !== null;
                return toBeMarked;
            }
        },
        {
            key: "hasStartedDragging",
            value: function hasStartedDragging(dragEntry) {
                var marked = this.isMarked(), startedDragging = !marked;
                if (startedDragging) {
                    var previousDragEntry = null;
                    this.mark(dragEntry, previousDragEntry);
                }
                return startedDragging;
            }
        },
        {
            key: "dragging",
            value: function dragging(dragEntry) {
                var explorer = dragEntry.getExplorer(), markedDropTarget = this.getMarkedDropTarget();
                if (markedDropTarget !== this) {
                    markedDropTarget.dragging(dragEntry);
                    return;
                }
                var dropTargetToBeMarked = this.getDropTargetToBeMarked(dragEntry);
                if (dropTargetToBeMarked === this) {
                    var draggingWithin = explorer === this, noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);
                    if (draggingWithin && noDraggingWithinOptionPresent) {
                        return;
                    }
                    var markedDirectoryNameDragEntry = this.retrieveMarkedDirectoryNameDragEntry(), bottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry);
                    if (markedDirectoryNameDragEntry !== bottommostDirectoryNameDragEntryOverlappingDragEntry) {
                        var previousDragEntry = dragEntry; ///
                        dragEntry = bottommostDirectoryNameDragEntryOverlappingDragEntry; ///
                        this.unmark();
                        this.mark(dragEntry, previousDragEntry);
                    }
                } else if (dropTargetToBeMarked !== null) {
                    dropTargetToBeMarked.markDragEntry(dragEntry);
                    this.unmark();
                } else {
                    var dropTargetToBeMarked1 = explorer, previousDragEntry = null;
                    dropTargetToBeMarked1.mark(dragEntry, previousDragEntry);
                    this.unmark();
                }
            }
        },
        {
            key: "stopDragging",
            value: function stopDragging(dragEntry, done) {
                var markedDropTarget = this.getMarkedDropTarget(), dragEntryPath = dragEntry.getPath(), markedDirectoryNameDragEntry = markedDropTarget.retrieveMarkedDirectoryNameDragEntry(), dragEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(dragEntryPath), sourcePath = dragEntryPathWithoutBottommostName; ///
                var targetPath = null, duplicate = false;
                if (markedDirectoryNameDragEntry !== null) {
                    var dragEntryName = dragEntry.getName(), name = dragEntryName, dragEntryPresent = markedDirectoryNameDragEntry.isDragEntryPresent(name);
                    if (dragEntryPresent) {
                        duplicate = true;
                    } else {
                        var markedDirectoryNameDragEntryPath = markedDirectoryNameDragEntry.getPath();
                        targetPath = markedDirectoryNameDragEntryPath; ///
                    }
                }
                var unmoved = sourcePath === targetPath;
                if (duplicate || unmoved) {
                    markedDropTarget.unmark();
                    done();
                } else {
                    var dragEntrySubEntries = dragEntry.retrieveDragSubEntries(), dragEntries = dragEntrySubEntries; ///
                    dragEntries.reverse();
                    dragEntries.push(dragEntry);
                    markedDropTarget.moveDragEntries(dragEntries, sourcePath, targetPath, function() {
                        markedDropTarget.unmark();
                        done();
                    });
                }
            }
        },
        {
            key: "escapeDragging",
            value: function escapeDragging() {
                this.unmarkGlobally();
            }
        },
        {
            key: "markDragEntry",
            value: function markDragEntry(dragEntry) {
                var explorer = dragEntry.getExplorer(), draggingWithin = explorer === this, noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);
                if (draggingWithin && noDraggingWithinOptionPresent) {
                    var previousDragEntry = null;
                    this.mark(dragEntry, previousDragEntry);
                } else {
                    var previousDragEntry = dragEntry, bottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry);
                    dragEntry = bottommostDirectoryNameDragEntryOverlappingDragEntry; ///
                    this.mark(dragEntry, previousDragEntry);
                }
            }
        },
        {
            key: "moveFileNameDragEntry",
            value: function moveFileNameDragEntry(fileNameDragEntry, sourceFilePath, targetFilePath) {
                var dragEntry = null;
                var explorer = fileNameDragEntry.getExplorer();
                var filePath;
                if (targetFilePath === sourceFilePath) {
                ///
                } else if (targetFilePath === null) {
                    filePath = sourceFilePath; ///
                    explorer.removeFilePath(filePath);
                } else {
                    filePath = sourceFilePath; ///
                    explorer.removeFilePath(filePath);
                    filePath = targetFilePath; ///
                    fileNameDragEntry = this.addFilePath(filePath);
                    dragEntry = fileNameDragEntry; ///
                }
                return dragEntry;
            }
        },
        {
            key: "moveDirectoryNameDragEntry",
            value: function moveDirectoryNameDragEntry(directoryNameDragEntry, sourceDirectoryPath, targetDirectoryPath) {
                var dragEntry = null;
                var explorer = directoryNameDragEntry.getExplorer();
                var directoryPath;
                if (targetDirectoryPath === sourceDirectoryPath) {
                ///
                } else if (targetDirectoryPath === null) {
                    directoryPath = sourceDirectoryPath; ///
                    explorer.removeDirectoryPath(directoryPath);
                } else {
                    directoryPath = sourceDirectoryPath; ///
                    explorer.removeDirectoryPath(directoryPath);
                    directoryPath = targetDirectoryPath; ///
                    var collapsed = directoryNameDragEntry.isCollapsed();
                    directoryNameDragEntry = this.addDirectoryPath(directoryPath, collapsed);
                    dragEntry = directoryNameDragEntry; ///
                }
                return dragEntry;
            }
        },
        {
            key: "openFileNameDragEntry",
            value: function openFileNameDragEntry(fileNameDragEntry) {
                var fileNameDragEntryPath = fileNameDragEntry.getPath(), filePath = fileNameDragEntryPath; ///
                this.openHandler(filePath);
            }
        },
        {
            key: "pathMapsFromDragEntries",
            value: function pathMapsFromDragEntries(dragEntries, sourcePath, targetPath) {
                var pathMaps = dragEntries.map(function(dragEntry) {
                    var pathMap = pathMapFromDragEntry(dragEntry, sourcePath, targetPath);
                    return pathMap;
                });
                return pathMaps;
            }
        },
        {
            key: "childElements",
            value: function childElements() {
                var _properties = this.properties, topmostDirectoryName = _properties.topmostDirectoryName, topmostDirectoryCollapsed = _properties.topmostDirectoryCollapsed, Entries = this.getEntries(), explorer = this, collapsed = topmostDirectoryCollapsed, directoryName = topmostDirectoryName, entries = /*#__PURE__*/ React.createElement(Entries, {
                    explorer: explorer
                });
                var directoryNameDragEntry = entries.createDirectoryNameDragEntry(directoryName, collapsed);
                entries.addEntry(directoryNameDragEntry);
                var childElements1 = entries; ///
                return childElements1;
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                this.assignContext();
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties) {
                var _onMove = properties.onMove, onMove = _onMove === void 0 ? defaultMoveHandler : _onMove, _onOpen = properties.onOpen, onOpen = _onOpen === void 0 ? defaultOpenHandler : _onOpen, _options1 = properties.options, options = _options1 === void 0 ? {
                } : _options1, moveHandler = onMove, openHandler = onOpen, explorer = _dropTarget.default.fromClass(Class, properties, moveHandler, openHandler, options);
                return explorer;
            }
        }
    ]);
    return Explorer;
}(_dropTarget.default);
_defineProperty(Explorer, "Entries", _entries.default);
_defineProperty(Explorer, "FileNameMarkerEntry", _fileName1.default);
_defineProperty(Explorer, "FileNameDragEntry", _fileName.default);
_defineProperty(Explorer, "DirectoryNameMarkerEntry", _directoryName1.default);
_defineProperty(Explorer, "DirectoryNameDragEntry", _directoryName.default);
_defineProperty(Explorer, "tagName", "div");
_defineProperty(Explorer, "defaultProperties", {
    className: "explorer"
});
_defineProperty(Explorer, "ignoredProperties", [
    "onOpen",
    "onMove",
    "options",
    "topmostDirectoryName",
    "topmostDirectoryCollapsed"
]);
var _default = (0, _easyWithStyle).default(Explorer)(_templateObject());
exports.default = _default;
function defaultOpenHandler(sourcePath) {
}
function defaultMoveHandler(pathMaps, done) {
    done();
}
function pathMapFromDragEntry(dragEntry, sourcePath, targetPath) {
    var dragEntryPath = dragEntry.getPath(), dragEntryType = dragEntry.getType(), dragEntryDirectoryNameDragEntry = dragEntryType === _types.DIRECTORY_NAME_TYPE, directory = dragEntryDirectoryNameDragEntry; ///
    targetPath = sourcePath === null ? prependTargetPathToDragEntryPath(dragEntryPath, targetPath) : replaceSourcePathWithTargetPathInDragEntryPath(dragEntryPath, sourcePath, targetPath); ///
    sourcePath = dragEntryPath; ///
    var pathMap = {
        sourcePath: sourcePath,
        targetPath: targetPath,
        directory: directory
    };
    return pathMap;
}
function prependTargetPathToDragEntryPath(dragEntryPath, targetPath) {
    dragEntryPath = "".concat(targetPath, "/").concat(dragEntryPath);
    return dragEntryPath;
}
function replaceSourcePathWithTargetPathInDragEntryPath(dragEntryPath, sourcePath, targetPath) {
    sourcePath = sourcePath.replace(/\(/g, "\\(").replace(/\)/g, "\\)"); ///
    var regExp = new RegExp("^".concat(sourcePath, "(.*$)")), matches = dragEntryPath.match(regExp), secondMatch = second(matches);
    dragEntryPath = targetPath + secondMatch; ///
    return dragEntryPath;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3Jlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBGaWxlTmFtZURyYWdFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWcvZGlyZWN0b3J5TmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZVwiO1xuXG5pbXBvcnQgeyBOT19EUkFHR0lOR19XSVRISU4gfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgaXNPcHRpb25QcmVzZW50KG9wdGlvbikge1xuICAgIGNvbnN0IG9wdGlvblByZXNlbnQgPSAhIXRoaXMub3B0aW9uc1tvcHRpb25dO1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeVBhdGhzKCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IHsgRW50cmllcyB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldEZpbGVOYW1lRHJhZ0VudHJ5KCkge1xuICAgIGNvbnN0IHsgRmlsZU5hbWVEcmFnRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVEcmFnRW50cnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeU5hbWVEcmFnRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdFbnRyeTtcbiAgfVxuXG4gIG1hcmsoZHJhZ0VudHJ5LCBwcmV2aW91c0RyYWdFbnRyeSkge1xuICAgIGxldCBtYXJrZXJFbnRyeVBhdGgsXG4gICAgICAgIGRyYWdFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnRW50cnlQYXRoID0gZHJhZ0VudHJ5LmdldFBhdGgoKTtcblxuICAgIGlmIChwcmV2aW91c0RyYWdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnRW50cnlOYW1lID0gcHJldmlvdXNEcmFnRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgcHJldmlvdXNEcmFnRW50cnlUeXBlID0gcHJldmlvdXNEcmFnRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnRW50cnlQYXRofS8ke3ByZXZpb3VzRHJhZ0VudHJ5TmFtZX1gO1xuXG4gICAgICBkcmFnRW50cnlUeXBlID0gcHJldmlvdXNEcmFnRW50cnlUeXBlOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdFbnRyeVR5cGUgPSBkcmFnRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnRW50cnlQYXRoOyAvLy9cbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeShkcmFnRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIGhhc1N0YXJ0ZWREcmFnZ2luZyhkcmFnRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ0VudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdFbnRyeSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ0VudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgY29uc3QgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkoZHJhZ0VudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnRW50cnkgPSBkcmFnRW50cnk7ICAvLy9cblxuICAgICAgICBkcmFnRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5OyAgLy8vXG5cbiAgICAgICAgdGhpcy51bm1hcmsoKTtcblxuICAgICAgICB0aGlzLm1hcmsoZHJhZ0VudHJ5LCBwcmV2aW91c0RyYWdFbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdFbnRyeShkcmFnRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ0VudHJ5LCBwcmV2aW91c0RyYWdFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBkcmFnRW50cnlQYXRoID0gZHJhZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSxcbiAgICAgICAgICBkcmFnRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ0VudHJ5TmFtZSA9IGRyYWdFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ0VudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ0VudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkuaXNEcmFnRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ0VudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ0VudHJ5U3ViRW50cmllcyA9IGRyYWdFbnRyeS5yZXRyaWV2ZURyYWdTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnRW50cmllcyA9IGRyYWdFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnRW50cmllcy5yZXZlcnNlKCk7XG5cbiAgICAgIGRyYWdFbnRyaWVzLnB1c2goZHJhZ0VudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ0VudHJpZXMoZHJhZ0VudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtYXJrRHJhZ0VudHJ5KGRyYWdFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ0VudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ0VudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdFbnRyeSA9IGRyYWdFbnRyeSwgIC8vL1xuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5KGRyYWdFbnRyeSk7XG5cbiAgICAgIGRyYWdFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnk7ICAvLy9cblxuICAgICAgdGhpcy5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdFbnRyeShmaWxlTmFtZURyYWdFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ0VudHJ5ID0gZmlsZU5hbWVEcmFnRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ0VudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ0VudHJ5KGZpbGVOYW1lRHJhZ0VudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdFbnRyaWVzKGRyYWdFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnRW50cmllcy5tYXAoKGRyYWdFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ0VudHJ5KGRyYWdFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cygpIHtcbiAgICBjb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lLCB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIH0gPSB0aGlzLnByb3BlcnRpZXMsXG4gICAgICAgICAgRW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQsICAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGVudHJpZXMgPVxuXG4gICAgICAgICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICA7XG5cbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gZW50cmllcy5jcmVhdGVEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICBlbnRyaWVzLmFkZEVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnRW50cnkpO1xuXG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGVudHJpZXM7ICAvLy9cblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBFbnRyaWVzID0gRW50cmllcztcblxuICBzdGF0aWMgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IEZpbGVOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIEZpbGVOYW1lRHJhZ0VudHJ5ID0gRmlsZU5hbWVEcmFnRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IERpcmVjdG9yeU5hbWVEcmFnRW50cnk7XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImRpdlwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZXhwbG9yZXJcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uT3BlblwiLFxuICAgIFwib25Nb3ZlXCIsXG4gICAgXCJvcHRpb25zXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5TmFtZVwiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZFwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlID0gZGVmYXVsdE1vdmVIYW5kbGVyLCBvbk9wZW4gPSBkZWZhdWx0T3BlbkhhbmRsZXIsIG9wdGlvbnMgPSB7fSB9ID0gcHJvcGVydGllcywgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFeHBsb3JlcilgXG5cbiAgd2lkdGg6IGF1dG87XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tbGVmdDogLTIuNHJlbTtcblxuYDtcblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ0VudHJ5KGRyYWdFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnRW50cnlQYXRoID0gZHJhZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ0VudHJ5VHlwZSA9IGRyYWdFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdFbnRyeURpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSAoZHJhZ0VudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdFbnRyeURpcmVjdG9yeU5hbWVEcmFnRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnRW50cnlQYXRoKGRyYWdFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnRW50cnlQYXRoKGRyYWdFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ0VudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ0VudHJ5UGF0aChkcmFnRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdFbnRyeVBhdGgoZHJhZ0VudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgXCJcXFxcKFwiKS5yZXBsYWNlKC9cXCkvZywgXCJcXFxcKVwiKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ0VudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdFbnRyeVBhdGg7XG59XG4i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