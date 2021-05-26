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
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
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
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
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
    function Explorer(selector, moveHandler, openHandler, options) {
        _classCallCheck(this, Explorer);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Explorer).call(this, selector, moveHandler));
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
                _get(_getPrototypeOf(Explorer.prototype), "initialise", this).call(this);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3Jlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBGaWxlTmFtZURyYWdFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWcvZGlyZWN0b3J5TmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZVwiO1xuXG5pbXBvcnQgeyBOT19EUkFHR0lOR19XSVRISU4gfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTtcblxuICAgIHJldHVybiBvcHRpb25QcmVzZW50O1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCB7IEVudHJpZXMgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRW50cmllcztcbiAgfVxuXG4gIGdldEZpbGVOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgeyBGaWxlTmFtZU1hcmtlckVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICBnZXRGaWxlTmFtZURyYWdFbnRyeSgpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lRHJhZ0VudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lRHJhZ0VudHJ5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5IH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnRW50cnk7XG4gIH1cblxuICBtYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpIHtcbiAgICBsZXQgbWFya2VyRW50cnlQYXRoLFxuICAgICAgICBkcmFnRW50cnlUeXBlO1xuXG4gICAgY29uc3QgZHJhZ0VudHJ5UGF0aCA9IGRyYWdFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICBpZiAocHJldmlvdXNEcmFnRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ0VudHJ5TmFtZSA9IHByZXZpb3VzRHJhZ0VudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ0VudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ0VudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gYCR7ZHJhZ0VudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdFbnRyeU5hbWV9YDtcblxuICAgICAgZHJhZ0VudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ0VudHJ5VHlwZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnRW50cnlUeXBlID0gZHJhZ0VudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gZHJhZ0VudHJ5UGF0aDsgLy8vXG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkoZHJhZ0VudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBoYXNTdGFydGVkRHJhZ2dpbmcoZHJhZ0VudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnRW50cnksIHByZXZpb3VzRHJhZ0VudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ0VudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnRW50cnkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpLFxuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5KGRyYWdFbnRyeSk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ICE9PSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ0VudHJ5ID0gZHJhZ0VudHJ5OyAgLy8vXG5cbiAgICAgICAgZHJhZ0VudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeTsgIC8vL1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG5cbiAgICAgICAgdGhpcy5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnRW50cnkoZHJhZ0VudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ0VudHJ5UGF0aCA9IGRyYWdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgZHJhZ0VudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ0VudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdFbnRyeU5hbWUgPSBkcmFnRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmlzRHJhZ0VudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdFbnRyeVN1YkVudHJpZXMgPSBkcmFnRW50cnkucmV0cmlldmVEcmFnU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ0VudHJpZXMgPSBkcmFnRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ0VudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnRW50cmllcy5wdXNoKGRyYWdFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdFbnRyaWVzKGRyYWdFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbWFya0RyYWdFbnRyeShkcmFnRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnRW50cnksIHByZXZpb3VzRHJhZ0VudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnRW50cnkgPSBkcmFnRW50cnksICAvLy9cbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeShkcmFnRW50cnkpO1xuXG4gICAgICBkcmFnRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubWFyayhkcmFnRW50cnksIHByZXZpb3VzRHJhZ0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnRW50cnkoZmlsZU5hbWVEcmFnRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ0VudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdFbnRyeSA9IGZpbGVOYW1lRHJhZ0VudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KGRpcmVjdG9yeU5hbWVEcmFnRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ0VudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuXG4gICAgICBkcmFnRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdFbnRyeTtcbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdFbnRyeShmaWxlTmFtZURyYWdFbnRyeSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ0VudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ0VudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnRW50cmllcyhkcmFnRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ0VudHJpZXMubWFwKChkcmFnRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdFbnRyeShkcmFnRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgIEVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IGVudHJpZXMuY3JlYXRlRGlyZWN0b3J5TmFtZURyYWdFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgZW50cmllcy5hZGRFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG4gIH1cblxuICBzdGF0aWMgRW50cmllcyA9IEVudHJpZXM7XG5cbiAgc3RhdGljIEZpbGVOYW1lTWFya2VyRW50cnkgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuXG4gIHN0YXRpYyBGaWxlTmFtZURyYWdFbnRyeSA9IEZpbGVOYW1lRHJhZ0VudHJ5O1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSBEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5O1xuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImV4cGxvcmVyXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbk9wZW5cIixcbiAgICBcIm9uTW92ZVwiLFxuICAgIFwib3B0aW9uc1wiLFxuICAgIFwidG9wbW9zdERpcmVjdG9yeU5hbWVcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWRcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSA9IGRlZmF1bHRNb3ZlSGFuZGxlciwgb25PcGVuID0gZGVmYXVsdE9wZW5IYW5kbGVyLCBvcHRpb25zID0ge30gfSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRXhwbG9yZXIpYFxuXG4gIHdpZHRoOiBhdXRvO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luLWxlZnQ6IC0yLjRyZW07XG5cbmA7XG5cbmZ1bmN0aW9uIGRlZmF1bHRPcGVuSGFuZGxlcihzb3VyY2VQYXRoKSB7XG4gIC8vL1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdFbnRyeShkcmFnRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ0VudHJ5UGF0aCA9IGRyYWdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdFbnRyeVR5cGUgPSBkcmFnRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnRW50cnlEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gKGRyYWdFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnRW50cnlEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ0VudHJ5UGF0aChkcmFnRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ0VudHJ5UGF0aChkcmFnRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdFbnRyeVBhdGgoZHJhZ0VudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ0VudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ0VudHJ5UGF0aH1gO1xuXG4gIHJldHVybiBkcmFnRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnRW50cnlQYXRoKGRyYWdFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csIFwiXFxcXChcIikucmVwbGFjZSgvXFwpL2csIFwiXFxcXClcIik7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnRW50cnlQYXRoO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVUsY0FBaUI7SUFFTyxVQUFXO0lBRXJDLFFBQVc7SUFDUixXQUFjO0lBQ1AsU0FBdUI7SUFDckIsVUFBeUI7SUFDdEIsY0FBNEI7SUFDMUIsZUFBOEI7SUFFaEMsUUFBVztJQUNWLE1BQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtZVixxSEFRbkM7Ozs7Ozs7SUF4WVEsTUFBTSxHQVpnQyxVQUFXLGdCQVlqRCxNQUFNLEVBQ04saUNBQWlDLEdBYkssVUFBVyxlQWFqRCxpQ0FBaUM7SUFFbkMsUUFBUTtjQUFSLFFBQVE7YUFBUixRQUFRLENBQ0EsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTzs4QkFEbkQsUUFBUTs7aUVBQVIsUUFBUSxhQUVKLFFBQVEsRUFBRSxXQUFXO2NBRXRCLFdBQVcsR0FBRyxXQUFXO2NBRXpCLE9BQU8sR0FBRyxPQUFPOzs7aUJBTnBCLFFBQVE7O1lBU1osR0FBZSxHQUFmLGVBQWU7NEJBQWYsZUFBZSxDQUFDLE1BQU07b0JBQ2QsYUFBYSxVQUFVLE9BQU8sQ0FBQyxNQUFNO3VCQUVwQyxhQUFhOzs7O1lBR3RCLEdBQVUsR0FBVixVQUFVOzRCQUFWLFVBQVUsQ0FBQyxPQUFPO3FCQUNYLE9BQU8sR0FBRyxPQUFPOzs7O1lBR3hCLEdBQVMsR0FBVCxTQUFTOzRCQUFULFNBQVMsQ0FBQyxNQUFNO3FCQUNULE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSTs7OztZQUc3QixHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXLENBQUMsTUFBTTs0QkFDSixPQUFPLENBQUMsTUFBTTs7OztZQUc1QixHQUFZLEdBQVosWUFBWTs0QkFBWixZQUFZO29CQUNKLFNBQVMsUUFBUSxpQkFBaUI7dUJBRWpDLFNBQVM7Ozs7WUFHbEIsR0FBaUIsR0FBakIsaUJBQWlCOzRCQUFqQixpQkFBaUI7b0JBQ1QsY0FBYyxRQUFRLHNCQUFzQjt1QkFFM0MsY0FBYzs7OztZQUd2QixHQUF1QixHQUF2Qix1QkFBdUI7NEJBQXZCLHVCQUF1QjtvQkFDZiw2QkFBNkIsUUFBUSxpQ0FBaUMsSUFDdEUsaUNBQWlDLEdBQUcsNkJBQTZCLENBQUMsT0FBTyxJQUN6RSxvQkFBb0IsR0FBRyxpQ0FBaUMsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRTdELG9CQUFvQjs7OztZQUc3QixHQUFVLEdBQVYsVUFBVTs0QkFBVixVQUFVO29CQUNZLFlBQWdCLFFBQVgsV0FBVyxFQUE1QixPQUFPLEdBQUssWUFBZ0IsQ0FBNUIsT0FBTzt1QkFFUixPQUFPOzs7O1lBR2hCLEdBQXNCLEdBQXRCLHNCQUFzQjs0QkFBdEIsc0JBQXNCO29CQUNZLFlBQWdCLFFBQVgsV0FBVyxFQUF4QyxtQkFBbUIsR0FBSyxZQUFnQixDQUF4QyxtQkFBbUI7dUJBRXBCLG1CQUFtQjs7OztZQUc1QixHQUFvQixHQUFwQixvQkFBb0I7NEJBQXBCLG9CQUFvQjtvQkFDWSxZQUFnQixRQUFYLFdBQVcsRUFBdEMsaUJBQWlCLEdBQUssWUFBZ0IsQ0FBdEMsaUJBQWlCO3VCQUVsQixpQkFBaUI7Ozs7WUFHMUIsR0FBMkIsR0FBM0IsMkJBQTJCOzRCQUEzQiwyQkFBMkI7b0JBQ1ksWUFBZ0IsUUFBWCxXQUFXLEVBQTdDLHdCQUF3QixHQUFLLFlBQWdCLENBQTdDLHdCQUF3Qjt1QkFFekIsd0JBQXdCOzs7O1lBR2pDLEdBQXlCLEdBQXpCLHlCQUF5Qjs0QkFBekIseUJBQXlCO29CQUNZLFlBQWdCLFFBQVgsV0FBVyxFQUEzQyxzQkFBc0IsR0FBSyxZQUFnQixDQUEzQyxzQkFBc0I7dUJBRXZCLHNCQUFzQjs7OztZQUcvQixHQUFJLEdBQUosSUFBSTs0QkFBSixJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQjtvQkFDM0IsZUFBZSxFQUNmLGFBQWE7b0JBRVgsYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPO29CQUVuQyxpQkFBaUIsS0FBSyxJQUFJO3dCQUN0QixxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLElBQ2pELHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLE9BQU87b0JBRXZELGVBQWUsTUFBdUIsTUFBcUIsQ0FBdEMsYUFBYSxHQUFDLENBQUMsR0FBd0IsTUFBQSxDQUF0QixxQkFBcUI7b0JBRTNELGFBQWEsR0FBRyxxQkFBcUIsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7O29CQUUzQyxhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU87b0JBRWpDLGVBQWUsR0FBRyxhQUFhLENBQUUsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHOztxQkFHakMsU0FBUyxDQUFDLGVBQWUsRUFBRSxhQUFhOzs7O1lBRy9DLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU07cUJBQ0MsWUFBWTs7OztZQUduQixHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRO29CQUNBLDRCQUE0QixRQUFRLG9DQUFvQyxJQUN4RSxNQUFNLEdBQUksNEJBQTRCLEtBQUssSUFBSTt1QkFFOUMsTUFBTTs7OztZQUdmLEdBQVksR0FBWixZQUFZOzRCQUFaLFlBQVksQ0FBQyxTQUFTO29CQUNkLG9EQUFvRCxRQUFRLDREQUE0RCxDQUFDLFNBQVMsR0FDbEksVUFBVSxHQUFJLG9EQUFvRCxLQUFLLElBQUk7dUJBRTFFLFVBQVU7Ozs7WUFHbkIsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0IsQ0FBQyxTQUFTO29CQUNwQixNQUFNLFFBQVEsUUFBUSxJQUN0QixlQUFlLElBQUksTUFBTTtvQkFFM0IsZUFBZTt3QkFDWCxpQkFBaUIsR0FBRyxJQUFJO3lCQUV6QixJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQjs7dUJBR2pDLGVBQWU7Ozs7WUFHeEIsR0FBUSxHQUFSLFFBQVE7NEJBQVIsUUFBUSxDQUFDLFNBQVM7b0JBQ1YsUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLElBQ2hDLGdCQUFnQixRQUFRLG1CQUFtQjtvQkFFN0MsZ0JBQWdCO29CQUNsQixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUzs7O29CQUsvQixvQkFBb0IsUUFBUSx1QkFBdUIsQ0FBQyxTQUFTO29CQUUvRCxvQkFBb0I7d0JBQ2hCLGNBQWMsR0FBSSxRQUFRLFdBQzFCLDZCQUE2QixRQUFRLGVBQWUsQ0F0SjdCLFFBQVc7d0JBd0pwQyxjQUFjLElBQUksNkJBQTZCOzs7d0JBSTdDLDRCQUE0QixRQUFRLG9DQUFvQyxJQUN4RSxvREFBb0QsUUFBUSw0REFBNEQsQ0FBQyxTQUFTO3dCQUVwSSw0QkFBNEIsS0FBSyxvREFBb0Q7NEJBQ2pGLGlCQUFpQixHQUFHLFNBQVMsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7d0JBRXpDLFNBQVMsR0FBRyxvREFBb0QsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7NkJBRWpFLE1BQU07NkJBRU4sSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUI7OzJCQUUvQixvQkFBb0IsS0FBSyxJQUFJO29CQUN0QyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsU0FBUzt5QkFFdkMsTUFBTTs7d0JBRUwscUJBQW9CLEdBQUcsUUFBUSxFQUMvQixpQkFBaUIsR0FBRyxJQUFJO29CQUU5QixxQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQjt5QkFFakQsTUFBTTs7Ozs7WUFJZixHQUFZLEdBQVosWUFBWTs0QkFBWixZQUFZLENBQUMsU0FBUyxFQUFFLElBQUk7b0JBQ3BCLGdCQUFnQixRQUFRLG1CQUFtQixJQUMzQyxhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU8sSUFDakMsNEJBQTRCLEdBQUcsZ0JBQWdCLENBQUMsb0NBQW9DLElBQ3BGLGtDQUFrQyxHQUFHLGlDQUFpQyxDQUFDLGFBQWEsR0FDcEYsVUFBVSxHQUFHLGtDQUFrQyxDQUFFLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztvQkFFdEQsVUFBVSxHQUFHLElBQUksRUFDakIsU0FBUyxHQUFHLEtBQUs7b0JBRWpCLDRCQUE0QixLQUFLLElBQUk7d0JBQ2pDLGFBQWEsR0FBRyxTQUFTLENBQUMsT0FBTyxJQUNqQyxJQUFJLEdBQUcsYUFBYSxFQUNwQixnQkFBZ0IsR0FBRyw0QkFBNEIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJO3dCQUV6RSxnQkFBZ0I7d0JBQ2xCLFNBQVMsR0FBRyxJQUFJOzs0QkFFVixnQ0FBZ0MsR0FBRyw0QkFBNEIsQ0FBQyxPQUFPO3dCQUU3RSxVQUFVLEdBQUcsZ0NBQWdDLENBQUUsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHOzs7b0JBSWhELE9BQU8sR0FBSSxVQUFVLEtBQUssVUFBVTtvQkFFdEMsU0FBUyxJQUFJLE9BQU87b0JBQ3RCLGdCQUFnQixDQUFDLE1BQU07b0JBRXZCLElBQUk7O3dCQUVFLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsSUFDdEQsV0FBVyxHQUFHLG1CQUFtQixDQUFFLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztvQkFFNUMsV0FBVyxDQUFDLE9BQU87b0JBRW5CLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUztvQkFFMUIsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVTt3QkFDbEUsZ0JBQWdCLENBQUMsTUFBTTt3QkFFdkIsSUFBSTs7Ozs7O1lBS1YsR0FBYyxHQUFkLGNBQWM7NEJBQWQsY0FBYztxQkFDUCxjQUFjOzs7O1lBR3JCLEdBQWEsR0FBYixhQUFhOzRCQUFiLGFBQWEsQ0FBQyxTQUFTO29CQUNmLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxJQUNoQyxjQUFjLEdBQUksUUFBUSxXQUMxQiw2QkFBNkIsUUFBUSxlQUFlLENBM08zQixRQUFXO29CQTZPdEMsY0FBYyxJQUFJLDZCQUE2Qjt3QkFDM0MsaUJBQWlCLEdBQUcsSUFBSTt5QkFFekIsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUI7O3dCQUVoQyxpQkFBaUIsR0FBRyxTQUFTLEVBQzdCLG9EQUFvRCxRQUFRLDREQUE0RCxDQUFDLFNBQVM7b0JBRXhJLFNBQVMsR0FBRyxvREFBb0QsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7eUJBRWpFLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCOzs7OztZQUkxQyxHQUFxQixHQUFyQixxQkFBcUI7NEJBQXJCLHFCQUFxQixDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxjQUFjO29CQUNqRSxTQUFTLEdBQUcsSUFBSTtvQkFFZCxRQUFRLEdBQUcsaUJBQWlCLENBQUMsV0FBVztvQkFFMUMsUUFBUTtvQkFFUixjQUFjLEtBQUssY0FBYztnQkFDbkMsRUFBRyxBQUFILENBQUc7MkJBQ00sY0FBYyxLQUFLLElBQUk7b0JBQ2hDLFFBQVEsR0FBRyxjQUFjLENBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO29CQUUvQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVE7O29CQUVoQyxRQUFRLEdBQUcsY0FBYyxDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztvQkFFL0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRO29CQUVoQyxRQUFRLEdBQUcsY0FBYyxDQUFFLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztvQkFFOUIsaUJBQWlCLFFBQVEsV0FBVyxDQUFDLFFBQVE7b0JBRTdDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7O3VCQUc5QixTQUFTOzs7O1lBR2xCLEdBQTBCLEdBQTFCLDBCQUEwQjs0QkFBMUIsMEJBQTBCLENBQUMsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CO29CQUNyRixTQUFTLEdBQUcsSUFBSTtvQkFFZCxRQUFRLEdBQUcsc0JBQXNCLENBQUMsV0FBVztvQkFFL0MsYUFBYTtvQkFFYixtQkFBbUIsS0FBSyxtQkFBbUI7Z0JBQzdDLEVBQUcsQUFBSCxDQUFHOzJCQUNNLG1CQUFtQixLQUFLLElBQUk7b0JBQ3JDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7b0JBRXpDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhOztvQkFFMUMsYUFBYSxHQUFHLG1CQUFtQixDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztvQkFFekMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLGFBQWE7b0JBRTFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBRSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7d0JBRWxDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQyxXQUFXO29CQUVwRCxzQkFBc0IsUUFBUSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsU0FBUztvQkFFdkUsU0FBUyxHQUFHLHNCQUFzQixDQUFFLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRzs7dUJBR2xDLFNBQVM7Ozs7WUFHbEIsR0FBcUIsR0FBckIscUJBQXFCOzRCQUFyQixxQkFBcUIsQ0FBQyxpQkFBaUI7b0JBQy9CLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sSUFDakQsUUFBUSxHQUFHLHFCQUFxQixDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztxQkFFdkMsV0FBVyxDQUFDLFFBQVE7Ozs7WUFHM0IsR0FBdUIsR0FBdkIsdUJBQXVCOzRCQUF2Qix1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVU7b0JBQ25ELFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxVQUFFLFNBQVM7d0JBQ25DLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7MkJBRS9ELE9BQU87O3VCQUdULFFBQVE7Ozs7WUFHakIsR0FBYSxHQUFiLGFBQWE7NEJBQWIsYUFBYTtvQkFDaUQsV0FBZSxRQUFWLFVBQVUsRUFBbkUsb0JBQW9CLEdBQWdDLFdBQWUsQ0FBbkUsb0JBQW9CLEVBQUUseUJBQXlCLEdBQUssV0FBZSxDQUE3Qyx5QkFBeUIsRUFDakQsT0FBTyxRQUFRLFVBQVUsSUFDekIsUUFBUSxTQUNSLFNBQVMsR0FBRyx5QkFBeUIsRUFDckMsYUFBYSxHQUFHLG9CQUFvQixFQUNwQyxPQUFPLHFDQUVKLE9BQU87b0JBQUMsUUFBUSxFQUFFLFFBQVE7O29CQUk3QixzQkFBc0IsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsYUFBYSxFQUFFLFNBQVM7Z0JBRTVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsc0JBQXNCO29CQUVqQyxjQUFhLEdBQUcsT0FBTyxDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRzt1QkFFNUIsY0FBYTs7OztZQUd0QixHQUFVLEdBQVYsVUFBVTs0QkFBVixVQUFVO3FCQUNILGFBQWE7cUNBdFZoQixRQUFRLGNBd1ZKLFVBQVU7Ozs7O1lBMkJYLEdBQVMsR0FBVCxTQUFTOzRCQUFULFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVTs4QkFDbUQsVUFBVSxDQUFyRixNQUFNLEVBQU4sTUFBTSx3QkFBRyxrQkFBa0Isc0JBQWdELFVBQVUsQ0FBeEQsTUFBTSxFQUFOLE1BQU0sd0JBQUcsa0JBQWtCLHdCQUFtQixVQUFVLENBQTNCLE9BQU8sRUFBUCxPQUFPOytCQUNuRSxXQUFXLEdBQUcsTUFBTSxFQUNwQixXQUFXLEdBQUcsTUFBTSxFQUNwQixRQUFRLEdBbllLLFdBQWMsU0FtWUwsU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPO3VCQUVuRixRQUFROzs7O1dBelhiLFFBQVE7RUFaUyxXQUFjO2dCQVkvQixRQUFRLEdBMlZMLE9BQU8sR0F4V0ksUUFBVztnQkFhekIsUUFBUSxHQTZWTCxtQkFBbUIsR0F2V0ksVUFBeUI7Z0JBVW5ELFFBQVEsR0ErVkwsaUJBQWlCLEdBMVdJLFNBQXVCO2dCQVcvQyxRQUFRLEdBaVdMLHdCQUF3QixHQXpXSSxlQUE4QjtnQkFRN0QsUUFBUSxHQW1XTCxzQkFBc0IsR0E1V0ksY0FBNEI7Z0JBU3pELFFBQVEsR0FxV0wsT0FBTyxJQUFHLEdBQUs7Z0JBcldsQixRQUFRLEdBdVdMLGlCQUFpQjtJQUN0QixTQUFTLEdBQUUsUUFBVTs7Z0JBeFduQixRQUFRLEdBMldMLGlCQUFpQjtLQUN0QixNQUFRO0tBQ1IsTUFBUTtLQUNSLE9BQVM7S0FDVCxvQkFBc0I7S0FDdEIseUJBQTJCOzttQkFqWVQsY0FBaUIsVUE4WWQsUUFBUTs7U0FVeEIsa0JBQWtCLENBQUMsVUFBVTs7U0FJN0Isa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUk7SUFDeEMsSUFBSTs7U0FHRyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDdkQsYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQ2pDLGFBQWEsR0FBRyxTQUFTLENBQUMsT0FBTyxJQUNqQywrQkFBK0IsR0FBSSxhQUFhLEtBdlpwQixNQUFTLHNCQXdackMsU0FBUyxHQUFHLCtCQUErQixDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztJQUV2RCxVQUFVLEdBQUksVUFBVSxLQUFLLElBQUksR0FDakIsZ0NBQWdDLENBQUMsYUFBYSxFQUFFLFVBQVUsSUFDeEQsOENBQThDLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO0lBRTVHLFVBQVUsR0FBRyxhQUFhLENBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO1FBRTFCLE9BQU87UUFDWCxVQUFVLEVBQVYsVUFBVTtRQUNWLFVBQVUsRUFBVixVQUFVO1FBQ1YsU0FBUyxFQUFULFNBQVM7O1dBR0osT0FBTzs7U0FHUCxnQ0FBZ0MsQ0FBQyxhQUFhLEVBQUcsVUFBVTtJQUNsRSxhQUFhLE1BQW9CLE1BQWEsQ0FBM0IsVUFBVSxHQUFDLENBQUMsR0FBZ0IsTUFBQSxDQUFkLGFBQWE7V0FFdkMsYUFBYTs7U0FHYiw4Q0FBOEMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVU7SUFDM0YsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLFNBQVEsR0FBSyxHQUFFLE9BQU8sU0FBUSxHQUFLLEdBQUksQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO1FBRW5FLE1BQU0sT0FBTyxNQUFNLEVBQUUsQ0FBQyxFQUFhLE1BQUssQ0FBaEIsVUFBVSxHQUFDLEtBQUssS0FDeEMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUNwQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU87SUFFbEMsYUFBYSxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUUsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO1dBRXRDLGFBQWEifQ==