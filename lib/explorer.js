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
var Explorer = function(DropTarget) {
    _inherits(Explorer, _dropTarget.default);
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
                var _properties = this.properties, topmostDirectoryName = _properties.topmostDirectoryName, topmostDirectoryCollapsed = _properties.topmostDirectoryCollapsed, Entries = this.getEntries(), explorer = this, collapsed = topmostDirectoryCollapsed, directoryName = topmostDirectoryName, entries = React.createElement(Entries, {
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
                explorer.initialise();
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
var _default = _easyWithStyle.default(Explorer)(_templateObject());
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3Jlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBGaWxlTmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9maWxlTmFtZVwiO1xuaW1wb3J0IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGZyb20gXCIuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lXCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lXCI7XG5cbmltcG9ydCB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07XG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IHsgRW50cmllcyB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgbWFya2VyRW50cnlQYXRoLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RyYWdnYWJsZUVudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgY29uc3QgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgdGhpcy51bm1hcmsoKTtcblxuICAgICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBFbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZW50cmllcyA9XG5cbiAgICAgICAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIEVudHJpZXMgPSBFbnRyaWVzO1xuXG4gIHN0YXRpYyBGaWxlTmFtZU1hcmtlckVudHJ5ID0gRmlsZU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImV4cGxvcmVyXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbk9wZW5cIixcbiAgICBcIm9uTW92ZVwiLFxuICAgIFwib3B0aW9uc1wiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeU5hbWVcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWRcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSA9IGRlZmF1bHRNb3ZlSGFuZGxlciwgb25PcGVuID0gZGVmYXVsdE9wZW5IYW5kbGVyLCBvcHRpb25zID0ge30gfSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKEV4cGxvcmVyKWBcblxuICB3aWR0aDogYXV0bztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbi1sZWZ0OiAtMi40cmVtO1xuXG5gO1xuXG5mdW5jdGlvbiBkZWZhdWx0T3BlbkhhbmRsZXIoc291cmNlUGF0aCkge1xuICAvLy9cbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgXCJcXFxcKFwiKS5yZXBsYWNlKC9cXCkvZywgXCJcXFxcKVwiKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdnYWJsZUVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxjQUFBO0lBRUEs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