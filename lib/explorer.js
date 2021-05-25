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
            key: "hasStartedDragging",
            value: function hasStartedDragging(draggableEntry) {
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
                var directoryNameDraggableEntry = entries.createDirectoryNameDraggableEntry(directoryName, collapsed);
                entries.addEntry(directoryNameDraggableEntry);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3Jlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBGaWxlTmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9maWxlTmFtZVwiO1xuaW1wb3J0IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lXCI7XG5cbmltcG9ydCB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07XG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IHsgRW50cmllcyB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgbWFya2VyRW50cnlQYXRoLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RyYWdnYWJsZUVudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBoYXNTdGFydGVkRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSB0aGlzKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuXG4gICAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7IC8vL1xuXG4gICAgbGV0IHRhcmdldFBhdGggPSBudWxsLFxuICAgICAgICBkdXBsaWNhdGUgPSBmYWxzZTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIG5hbWUgPSBkcmFnZ2FibGVFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgKCkgPT4ge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMudW5tYXJrR2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgIEVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZW50cmllcy5jcmVhdGVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgIGVudHJpZXMuYWRkRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgRW50cmllcyA9IEVudHJpZXM7XG5cbiAgc3RhdGljIEZpbGVOYW1lTWFya2VyRW50cnkgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuXG4gIHN0YXRpYyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImRpdlwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZXhwbG9yZXJcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uT3BlblwiLFxuICAgIFwib25Nb3ZlXCIsXG4gICAgXCJvcHRpb25zXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5TmFtZVwiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZFwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlID0gZGVmYXVsdE1vdmVIYW5kbGVyLCBvbk9wZW4gPSBkZWZhdWx0T3BlbkhhbmRsZXIsIG9wdGlvbnMgPSB7fSB9ID0gcHJvcGVydGllcywgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFeHBsb3JlcilgXG5cbiAgd2lkdGg6IGF1dG87XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tbGVmdDogLTIuNHJlbTtcblxuYDtcblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHt0YXJnZXRQYXRofS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csIFwiXFxcXChcIikucmVwbGFjZSgvXFwpL2csIFwiXFxcXClcIik7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQ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