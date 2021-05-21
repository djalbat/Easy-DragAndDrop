"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _necessary = require("necessary");
var _entries = _interopRequireDefault(require("./entries"));
var _dropTarget = _interopRequireDefault(require("./dropTarget"));
var _fileName = _interopRequireDefault(require("./entry/marker/fileName"));
var _fileName1 = _interopRequireDefault(require("./entry/draggable/fileName"));
var _directoryName = _interopRequireDefault(require("./entry/marker/directoryName"));
var _directoryName1 = _interopRequireDefault(require("./entry/draggable/directoryName"));
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
                var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(), topmostDirectoryNameDraggableEntryName = topmostDirectoryNameDraggableEntry.getName(), topmostDirectoryName = topmostDirectoryNameDraggableEntryName; ///
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
            key: "getFileNameDraggableEntry",
            value: function getFileNameDraggableEntry() {
                var _constructor = this.constructor, FileNameDraggableEntry = _constructor.FileNameDraggableEntry;
                return FileNameDraggableEntry;
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
            key: "getDirectoryNameDraggableEntry",
            value: function getDirectoryNameDraggableEntry() {
                var _constructor = this.constructor, DirectoryNameDraggableEntry = _constructor.DirectoryNameDraggableEntry;
                return DirectoryNameDraggableEntry;
            }
        },
        {
            key: "mark",
            value: function mark(draggableEntry, previousDraggableEntry) {
                var markerEntryPath, draggableEntryType;
                var draggableEntryPath = draggableEntry.getPath();
                if (previousDraggableEntry !== null) {
                    var previousDraggableEntryName = previousDraggableEntry.getName(), previousDraggableEntryType = previousDraggableEntry.getType();
                    markerEntryPath = "".concat(draggableEntryPath, "/").concat(previousDraggableEntryName);
                    draggableEntryType = previousDraggableEntryType; ///
                } else {
                    draggableEntryType = draggableEntry.getType();
                    markerEntryPath = draggableEntryPath; ///
                }
                this.addMarker(markerEntryPath, draggableEntryType);
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
                var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(), marked = markedDirectoryNameDraggableEntry !== null;
                return marked;
            }
        },
        {
            key: "isToBeMarked",
            value: function isToBeMarked(draggableEntry) {
                var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry), toBeMarked = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry !== null;
                return toBeMarked;
            }
        },
        {
            key: "startDragging",
            value: function startDragging(draggableEntry) {
                var marked = this.isMarked(), startedDragging = !marked;
                if (startedDragging) {
                    var previousDraggableEntry = null;
                    this.mark(draggableEntry, previousDraggableEntry);
                }
                return startedDragging;
            }
        },
        {
            key: "dragging",
            value: function dragging(draggableEntry) {
                var explorer = draggableEntry.getExplorer(), markedDropTarget = this.getMarkedDropTarget();
                if (markedDropTarget !== this) {
                    markedDropTarget.dragging(draggableEntry);
                    return;
                }
                var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);
                if (dropTargetToBeMarked === this) {
                    var draggingWithin = explorer === this, noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);
                    if (draggingWithin && noDraggingWithinOptionPresent) {
                        return;
                    }
                    var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(), bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
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
                    var dropTargetToBeMarked1 = explorer, previousDraggableEntry = null;
                    dropTargetToBeMarked1.mark(draggableEntry, previousDraggableEntry);
                    this.unmark();
                }
            }
        },
        {
            key: "stopDragging",
            value: function stopDragging(draggableEntry, done) {
                var markedDropTarget = this.getMarkedDropTarget(), draggableEntryPath = draggableEntry.getPath(), markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(), draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath), sourcePath = draggableEntryPathWithoutBottommostName; ///
                var targetPath = null, duplicate = false;
                if (markedDirectoryNameDraggableEntry !== null) {
                    var draggableEntryName = draggableEntry.getName(), name = draggableEntryName, draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);
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
                    var draggableEntrySubEntries = draggableEntry.retrieveDraggableSubEntries(), draggableEntries = draggableEntrySubEntries; ///
                    draggableEntries.reverse();
                    draggableEntries.push(draggableEntry);
                    markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function() {
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
            key: "markDraggableEntry",
            value: function markDraggableEntry(draggableEntry) {
                var explorer = draggableEntry.getExplorer(), draggingWithin = explorer === this, noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);
                if (draggingWithin && noDraggingWithinOptionPresent) {
                    var previousDraggableEntry = null;
                    this.mark(draggableEntry, previousDraggableEntry);
                } else {
                    var previousDraggableEntry = draggableEntry, bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
                    draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///
                    this.mark(draggableEntry, previousDraggableEntry);
                }
            }
        },
        {
            key: "moveFileNameDraggableEntry",
            value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
                var draggableEntry = null;
                var explorer = fileNameDraggableEntry.getExplorer();
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
                    fileNameDraggableEntry = this.addFilePath(filePath);
                    draggableEntry = fileNameDraggableEntry; ///
                }
                return draggableEntry;
            }
        },
        {
            key: "moveDirectoryNameDraggableEntry",
            value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
                var draggableEntry = null;
                var explorer = directoryNameDraggableEntry.getExplorer();
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
                    var collapsed = directoryNameDraggableEntry.isCollapsed();
                    directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);
                    draggableEntry = directoryNameDraggableEntry; ///
                }
                return draggableEntry;
            }
        },
        {
            key: "openFileNameDraggableEntry",
            value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
                var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(), filePath = fileNameDraggableEntryPath; ///
                this.openHandler(filePath);
            }
        },
        {
            key: "pathMapsFromDraggableEntries",
            value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
                var pathMaps = draggableEntries.map(function(draggableEntry) {
                    var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
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
                entries.addDirectoryNameDraggableEntry(directoryName, collapsed);
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
_defineProperty(Explorer, "FileNameMarkerEntry", _fileName.default);
_defineProperty(Explorer, "FileNameDraggableEntry", _fileName1.default);
_defineProperty(Explorer, "DirectoryNameMarkerEntry", _directoryName.default);
_defineProperty(Explorer, "DirectoryNameDraggableEntry", _directoryName1.default);
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
function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
    var draggableEntryPath = draggableEntry.getPath(), draggableEntryType = draggableEntry.getType(), draggableEntryDirectoryNameDraggableEntry = draggableEntryType === _types.DIRECTORY_NAME_TYPE, directory = draggableEntryDirectoryNameDraggableEntry; ///
    targetPath = sourcePath === null ? prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) : replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///
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
    var regExp = new RegExp("^".concat(sourcePath, "(.*$)")), matches = draggableEntryPath.match(regExp), secondMatch = second(matches);
    draggableEntryPath = targetPath + secondMatch; ///
    return draggableEntryPath;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3Jlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBGaWxlTmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9maWxlTmFtZVwiO1xuaW1wb3J0IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lXCI7XG5cbmltcG9ydCB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07XG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IHsgRW50cmllcyB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgbWFya2VyRW50cnlQYXRoLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RyYWdnYWJsZUVudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgY29uc3QgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgdGhpcy51bm1hcmsoKTtcblxuICAgICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBFbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZW50cmllcyA9XG5cbiAgICAgICAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIEVudHJpZXMgPSBFbnRyaWVzO1xuXG4gIHN0YXRpYyBGaWxlTmFtZU1hcmtlckVudHJ5ID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImV4cGxvcmVyXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbk9wZW5cIixcbiAgICBcIm9uTW92ZVwiLFxuICAgIFwib3B0aW9uc1wiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeU5hbWVcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWRcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSA9IGRlZmF1bHRNb3ZlSGFuZGxlciwgb25PcGVuID0gZGVmYXVsdE9wZW5IYW5kbGVyLCBvcHRpb25zID0ge30gfSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRXhwbG9yZXIpYFxuXG4gIHdpZHRoOiBhdXRvO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luLWxlZnQ6IC0yLjRyZW07XG5cbmA7XG5cbmZ1bmN0aW9uIGRlZmF1bHRPcGVuSGFuZGxlcihzb3VyY2VQYXRoKSB7XG4gIC8vL1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCBcIlxcXFwoXCIpLnJlcGxhY2UoL1xcKS9nLCBcIlxcXFwpXCIpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVVLGNBQWlCO0lBRU8sVUFBVztJQUVyQyxRQUFXO0lBQ1IsV0FBYztJQUNMLFNB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