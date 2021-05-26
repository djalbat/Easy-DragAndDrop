"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _easy = require("easy");
var _necessary = require("necessary");
var _options = require("./options");
var _types = require("./types");
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++){
            arr2[i] = arr[i];
        }
        return arr2;
    }
}
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
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
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
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
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
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  width: auto;\n  padding-left: 2.4rem;\n  \n  .collapsed {\n    display: none;\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var topmostDirectoryNameFromPath = _necessary.pathUtilities.topmostDirectoryNameFromPath, pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;
var Entries = /*#__PURE__*/ function(Element1) {
    _inherits(Entries, Element1);
    function Entries() {
        _classCallCheck(this, Entries);
        return _possibleConstructorReturn(this, _getPrototypeOf(Entries).apply(this, arguments));
    }
    _createClass(Entries, [
        {
            key: "getExplorer",
            value: function getExplorer() {
                var _properties = this.properties, explorer = _properties.explorer;
                return explorer;
            }
        },
        {
            key: "getEntries",
            value: function getEntries() {
                var childEntryListItemElements = this.getChildElements("li.entry"), entries = childEntryListItemElements; ///
                return entries;
            }
        },
        {
            key: "isEmpty",
            value: function isEmpty() {
                var entries = this.getEntries(), entriesLength = entries.length, empty = entriesLength === 0;
                return empty;
            }
        },
        {
            key: "isMarkerEntryPresent",
            value: function isMarkerEntryPresent() {
                var markerEntry = this.findMarkerEntry(), markerEntryPresent = markerEntry !== null;
                return markerEntryPresent;
            }
        },
        {
            key: "isDragEntryPresent",
            value: function isDragEntryPresent(name) {
                var dragEntry = this.findDragEntry(name), dragEntryPresent = dragEntry !== null;
                return dragEntryPresent;
            }
        },
        {
            key: "isFileNameDragEntryPresent",
            value: function isFileNameDragEntryPresent(fileName) {
                var fileNameDragEntry = this.findFileNameDragEntry(fileName), fileNameDragEntryPresent = fileNameDragEntry !== null;
                return fileNameDragEntryPresent;
            }
        },
        {
            key: "isDirectoryNameDragEntryPresent",
            value: function isDirectoryNameDragEntryPresent(directoryName) {
                var directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName), directoryNameDragEntryPresent = directoryNameDragEntry !== null;
                return directoryNameDragEntryPresent;
            }
        },
        {
            key: "expand",
            value: function expand() {
                this.removeClass("collapsed");
            }
        },
        {
            key: "collapse",
            value: function collapse() {
                this.addClass("collapsed");
            }
        },
        {
            key: "addEntry",
            value: function addEntry(entry) {
                var nextEntry = entry, previousEntry = this.findEntry(function(entry1) {
                    var nextEntryBeforeEntry = nextEntry.isBefore(entry1);
                    if (nextEntryBeforeEntry) {
                        return true;
                    }
                });
                if (previousEntry === null) {
                    this.append(entry);
                } else {
                    entry.insertBefore(previousEntry);
                }
                entry.didMount && entry.didMount(); ///
            }
        },
        {
            key: "removeEntry",
            value: function removeEntry(entry) {
                entry.willUnmount && entry.willUnmount(); ///
                entry.remove();
            }
        },
        {
            key: "addMarkerEntry",
            value: function addMarkerEntry(markerEntryName, dragEntryType) {
                var markerEntry;
                var name = markerEntryName, type = dragEntryType; ///
                switch(type){
                    case _types.FILE_NAME_TYPE:
                        {
                            var explorer = this.getExplorer(), FileNameMarkerEntry = explorer.getFileNameMarkerEntry(), fileNameMarkerEntry = /*#__PURE__*/ React.createElement(FileNameMarkerEntry, {
                                name: name
                            });
                            markerEntry = fileNameMarkerEntry; ///
                            break;
                        }
                    case _types.DIRECTORY_NAME_TYPE:
                        {
                            var explorer = this.getExplorer(), DirectoryNameMarkerEntry = explorer.getDirectoryNameMarkerEntry(), directoryNameMarkerEntry = /*#__PURE__*/ React.createElement(DirectoryNameMarkerEntry, {
                                name: name
                            });
                            markerEntry = directoryNameMarkerEntry; ///
                            break;
                        }
                }
                var entry = markerEntry; ///
                this.addEntry(entry);
            }
        },
        {
            key: "removeMarkerEntry",
            value: function removeMarkerEntry() {
                var markerEntry = this.retrieveMarkerEntry();
                markerEntry.remove();
            }
        },
        {
            key: "addMarker",
            value: function addMarker(markerEntryPath, dragEntryType) {
                var topmostDirectoryName = topmostDirectoryNameFromPath(markerEntryPath);
                if (topmostDirectoryName === null) {
                    var markerEntryName = markerEntryPath; ///
                    this.addMarkerEntry(markerEntryName, dragEntryType);
                } else {
                    var topmostDirectoryNameDragEntry = this.findDirectoryNameDragEntry(topmostDirectoryName), markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);
                    markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///
                    topmostDirectoryNameDragEntry.addMarker(markerEntryPath, dragEntryType);
                }
            }
        },
        {
            key: "removeMarker",
            value: function removeMarker() {
                this.removeMarkerEntry();
            }
        },
        {
            key: "addFilePath",
            value: function addFilePath(filePath) {
                var fileNameDragEntry = null;
                var topmostDirectoryName = topmostDirectoryNameFromPath(filePath), topmostDirectoryNameEntry = this.findTopmostDirectoryNameDragEntry(), filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);
                if (topmostDirectoryNameEntry !== null) {
                    if (filePathWithoutTopmostDirectoryName !== null) {
                        var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();
                        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
                            filePath = filePathWithoutTopmostDirectoryName; ///
                            fileNameDragEntry = topmostDirectoryNameEntry.addFilePath(filePath);
                        }
                    }
                } else {
                    if (topmostDirectoryName !== null) {
                        var topmostDirectoryNameDragEntry = this.findDirectoryNameDragEntry(topmostDirectoryName);
                        if (topmostDirectoryNameDragEntry === null) {
                            var collapsed = true; ///
                            topmostDirectoryNameDragEntry = this.createDirectoryNameDragEntry(topmostDirectoryName, collapsed);
                            this.addEntry(topmostDirectoryNameDragEntry);
                        }
                        var filePath1 = filePathWithoutTopmostDirectoryName; ///
                        fileNameDragEntry = topmostDirectoryNameDragEntry.addFilePath(filePath1);
                    } else {
                        var fileName = filePath, fileNameDragEntryPresent = this.isFileNameDragEntryPresent(fileName);
                        if (fileNameDragEntryPresent) {
                            fileNameDragEntry = this.findFileNameDragEntry(fileName);
                        } else {
                            fileNameDragEntry = this.createFileNameDragEntry(fileName);
                            this.addEntry(fileNameDragEntry);
                        }
                    }
                }
                return fileNameDragEntry;
            }
        },
        {
            key: "removeFilePath",
            value: function removeFilePath(filePath2) {
                var topmostDirectoryName = topmostDirectoryNameFromPath(filePath2), filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath2);
                if (topmostDirectoryName !== null) {
                    var directoryName = topmostDirectoryName, directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);
                    if (directoryNameDragEntry !== null) {
                        filePath2 = filePathWithoutTopmostDirectoryName; ///
                        directoryNameDragEntry.removeFilePath(filePath2);
                        var explorer = this.getExplorer(), removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                        if (removeEmptyParentDirectoriesOptionPresent) {
                            var topmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry();
                            if (directoryNameDragEntry !== topmostDirectoryNameDragEntry) {
                                var directoryNameDragEntryEmpty = directoryNameDragEntry.isEmpty();
                                if (directoryNameDragEntryEmpty) {
                                    this.removeEntry(directoryNameDragEntry);
                                }
                            }
                        }
                    }
                } else {
                    var fileName = filePath2, fileNameDragEntry = this.findFileNameDragEntry(fileName);
                    if (fileNameDragEntry !== null) {
                        this.removeEntry(fileNameDragEntry);
                    }
                }
            }
        },
        {
            key: "addDirectoryPath",
            value: function addDirectoryPath(directoryPath, param) {
                var collapsed = param === void 0 ? false : param;
                var directoryNameDragEntry = null;
                var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath), topmostDirectoryNameEntry = this.findTopmostDirectoryNameDragEntry(), directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);
                if (topmostDirectoryNameEntry !== null) {
                    if (directoryPathWithoutTopmostDirectoryName !== null) {
                        var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();
                        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
                            directoryPath = directoryPathWithoutTopmostDirectoryName; ///
                            directoryNameDragEntry = topmostDirectoryNameEntry.addDirectoryPath(directoryPath, collapsed);
                        }
                    }
                } else {
                    if (topmostDirectoryName !== null) {
                        var topmostDirectoryNameDragEntry = this.findDirectoryNameDragEntry(topmostDirectoryName);
                        if (topmostDirectoryNameDragEntry === null) {
                            var collapsed1 = true; ///
                            topmostDirectoryNameDragEntry = this.createDirectoryNameDragEntry(topmostDirectoryName, collapsed1);
                            this.addEntry(topmostDirectoryNameDragEntry);
                        }
                        var directoryPath1 = directoryPathWithoutTopmostDirectoryName; ///
                        directoryNameDragEntry = topmostDirectoryNameDragEntry.addDirectoryPath(directoryPath1, collapsed);
                    } else {
                        var directoryName = directoryPath, directoryNameDragEntryPresent = this.isDirectoryNameDragEntryPresent(directoryName);
                        if (directoryNameDragEntryPresent) {
                            directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);
                        } else {
                            directoryNameDragEntry = this.createDirectoryNameDragEntry(directoryName, collapsed);
                            this.addEntry(directoryNameDragEntry);
                        }
                        directoryNameDragEntry.setCollapsed(collapsed);
                    }
                }
                return directoryNameDragEntry;
            }
        },
        {
            key: "removeDirectoryPath",
            value: function removeDirectoryPath(directoryPath2) {
                var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath2), directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath2);
                if (topmostDirectoryName !== null) {
                    var directoryName = topmostDirectoryName, directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);
                    if (directoryNameDragEntry !== null) {
                        directoryPath2 = directoryPathWithoutTopmostDirectoryName; ///
                        directoryNameDragEntry.removeDirectoryPath(directoryPath2);
                        var explorer = this.getExplorer(), removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                        if (removeEmptyParentDirectoriesOptionPresent) {
                            var topmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry();
                            if (directoryNameDragEntry !== topmostDirectoryNameDragEntry) {
                                var directoryNameDragEntryEmpty = directoryNameDragEntry.isEmpty();
                                if (directoryNameDragEntryEmpty) {
                                    this.removeEntry(directoryNameDragEntry);
                                }
                            }
                        }
                    }
                } else {
                    var directoryName = directoryPath2, directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);
                    if (directoryNameDragEntry !== null) {
                        this.removeEntry(directoryNameDragEntry);
                    }
                }
            }
        },
        {
            key: "createFileNameDragEntry",
            value: function createFileNameDragEntry(fileName) {
                var name = fileName, explorer = this.getExplorer(), FileNameDragEntry = explorer.getFileNameDragEntry(), fileNameDragEntry = /*#__PURE__*/ React.createElement(FileNameDragEntry, {
                    name: name,
                    explorer: explorer
                });
                return fileNameDragEntry;
            }
        },
        {
            key: "createDirectoryNameDragEntry",
            value: function createDirectoryNameDragEntry(directoryName, collapsed2) {
                var name = directoryName, explorer = this.getExplorer(), DirectoryNameDragEntry = explorer.getDirectoryNameDragEntry(), directoryNameDragEntry = /*#__PURE__*/ React.createElement(DirectoryNameDragEntry, {
                    name: name,
                    collapsed: collapsed2,
                    explorer: explorer
                });
                return directoryNameDragEntry;
            }
        },
        {
            key: "findMarkerEntry",
            value: function findMarkerEntry() {
                var markerEntry = this.findEntryByTypes(function(entry) {
                    return true; ///
                }, _types.FILE_NAME_MARKER_TYPE, _types.DIRECTORY_NAME_MARKER_TYPE);
                return markerEntry;
            }
        },
        {
            key: "findDragEntryPath",
            value: function findDragEntryPath(dragEntry) {
                var dragEntryPath = null;
                this.someEntry(function(entry) {
                    if (entry === dragEntry) {
                        var entryName = entry.getName();
                        dragEntryPath = entryName; ///
                        return true;
                    }
                });
                return dragEntryPath;
            }
        },
        {
            key: "findMarkedDirectoryNameDragEntry",
            value: function findMarkedDirectoryNameDragEntry() {
                var markedDirectoryNameDragEntry = null;
                this.someDirectoryNameDragEntry(function(directoryNameDragEntry) {
                    var directoryNameDragEntryMarked = directoryNameDragEntry.isMarked();
                    if (directoryNameDragEntryMarked) {
                        markedDirectoryNameDragEntry = directoryNameDragEntry; ///
                        return true;
                    }
                });
                return markedDirectoryNameDragEntry;
            }
        },
        {
            key: "findTopmostDirectoryNameDragEntry",
            value: function findTopmostDirectoryNameDragEntry() {
                var topmostDirectoryNameDragEntry = null;
                this.someDirectoryNameDragEntry(function(directoryNameDragEntry) {
                    var directoryNameDragEntryTopmost = directoryNameDragEntry.isTopmost();
                    if (directoryNameDragEntryTopmost) {
                        topmostDirectoryNameDragEntry = directoryNameDragEntry; ///
                        return true;
                    }
                });
                return topmostDirectoryNameDragEntry;
            }
        },
        {
            key: "retrieveMarkerEntry",
            value: function retrieveMarkerEntry() {
                var markerEntry = this.findMarkerEntry();
                if (markerEntry === null) {
                    this.someDirectoryNameDragEntry(function(directoryNameDragEntry) {
                        markerEntry = directoryNameDragEntry.retrieveMarkerEntry();
                        if (markerEntry !== null) {
                            return true;
                        }
                    });
                }
                return markerEntry;
            }
        },
        {
            key: "retrieveFilePaths",
            value: function retrieveFilePaths(param) {
                var filePaths = param === void 0 ? [] : param;
                this.forEachFileNameDragEntry(function(fileNameDragEntry) {
                    var fileNameDragEntryPath = fileNameDragEntry.getPath(), filePath2 = fileNameDragEntryPath; ///
                    filePaths.push(filePath2);
                });
                this.forEachDirectoryNameDragEntry(function(directoryNameDragEntry) {
                    directoryNameDragEntry.retrieveFilePaths(filePaths);
                });
                return filePaths;
            }
        },
        {
            key: "retrieveDirectoryPaths",
            value: function retrieveDirectoryPaths(param) {
                var directoryPaths = param === void 0 ? [] : param;
                this.forEachDirectoryNameDragEntry(function(directoryNameDragEntry) {
                    var directoryNameDragEntryPath = directoryNameDragEntry.getPath(), directoryPath2 = directoryNameDragEntryPath; ///
                    directoryPaths.push(directoryPath2);
                    directoryNameDragEntry.retrieveDirectoryPaths(directoryPaths);
                });
                return directoryPaths;
            }
        },
        {
            key: "retrieveDragEntryPath",
            value: function retrieveDragEntryPath(dragEntry) {
                var dragEntryPath = this.findDragEntryPath(dragEntry);
                if (dragEntryPath === null) {
                    this.someDirectoryNameDragEntry(function(directoryNameDragEntry) {
                        dragEntryPath = directoryNameDragEntry.retrieveDragEntryPath(dragEntry);
                        if (dragEntryPath !== null) {
                            var directoryNameDragEntryName = directoryNameDragEntry.getName();
                            dragEntryPath = "".concat(directoryNameDragEntryName, "/").concat(dragEntryPath);
                            return true;
                        }
                    });
                }
                return dragEntryPath;
            }
        },
        {
            key: "retrieveDragSubEntries",
            value: function retrieveDragSubEntries(param) {
                var subEntries = param === void 0 ? [] : param;
                this.forEachFileNameDragEntry(function(fileNameDragEntry) {
                    var subEntry = fileNameDragEntry; ///
                    subEntries.push(subEntry);
                });
                this.forEachDirectoryNameDragEntry(function(directoryNameDragEntry) {
                    var subEntry = directoryNameDragEntry; ///
                    subEntries.push(subEntry);
                    directoryNameDragEntry.retrieveDragSubEntries(subEntries);
                });
                return subEntries;
            }
        },
        {
            key: "retrieveMarkedDirectoryNameDragEntry",
            value: function retrieveMarkedDirectoryNameDragEntry() {
                var markedDirectoryNameDragEntry = this.findMarkedDirectoryNameDragEntry();
                if (markedDirectoryNameDragEntry === null) {
                    this.someDirectoryNameDragEntry(function(directoryNameDragEntry) {
                        markedDirectoryNameDragEntry = directoryNameDragEntry.retrieveMarkedDirectoryNameDragEntry();
                        if (markedDirectoryNameDragEntry !== null) {
                            return true;
                        }
                    });
                }
                return markedDirectoryNameDragEntry;
            }
        },
        {
            key: "retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry",
            value: function retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry) {
                var bottommostDirectoryNameDragEntryOverlappingDragEntry = null;
                this.someDirectoryNameDragEntry((function(directoryNameDragEntry) {
                    var directoryNameDragEntryOverlappingDragEntry = directoryNameDragEntry.isOverlappingDragEntry(dragEntry);
                    if (directoryNameDragEntryOverlappingDragEntry) {
                        var dragIntoSubDirectories = true;
                        var directoryNameDragEntryTopmost = directoryNameDragEntry.isTopmost();
                        if (directoryNameDragEntryTopmost) {
                            var explorer = this.getExplorer(), noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(_options.NO_DRAGGING_INTO_SUB_DIRECTORIES);
                            if (noDraggingIntoSubdirectoriesOptionPresent) {
                                dragIntoSubDirectories = false;
                            }
                        }
                        if (dragIntoSubDirectories) {
                            bottommostDirectoryNameDragEntryOverlappingDragEntry = directoryNameDragEntry.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry);
                        }
                        if (bottommostDirectoryNameDragEntryOverlappingDragEntry === null) {
                            bottommostDirectoryNameDragEntryOverlappingDragEntry = directoryNameDragEntry; ///
                        }
                    }
                }).bind(this));
                return bottommostDirectoryNameDragEntryOverlappingDragEntry;
            }
        },
        {
            key: "forEachFileNameDragEntry",
            value: function forEachFileNameDragEntry(callback) {
                this.forEachEntryByTypes(callback, _types.FILE_NAME_TYPE);
            }
        },
        {
            key: "forEachDirectoryNameDragEntry",
            value: function forEachDirectoryNameDragEntry(callback) {
                this.forEachEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "someFileNameDragEntry",
            value: function someFileNameDragEntry(callback) {
                return this.someEntryByTypes(callback, _types.FILE_NAME_TYPE);
            }
        },
        {
            key: "someDirectoryNameDragEntry",
            value: function someDirectoryNameDragEntry(callback) {
                return this.someEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "findDragEntry",
            value: function findDragEntry(name) {
                return this.findEntryByNameAndTypes(name, _types.FILE_NAME_TYPE, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "findFileNameDragEntry",
            value: function findFileNameDragEntry(fileName) {
                return this.findEntryByNameAndTypes(fileName, _types.FILE_NAME_TYPE);
            }
        },
        {
            key: "findDirectoryNameDragEntry",
            value: function findDirectoryNameDragEntry(directoryName) {
                return this.findEntryByNameAndTypes(directoryName, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "forEachEntryByTypes",
            value: function forEachEntryByTypes(callback) {
                for(var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    types[_key - 1] = arguments[_key];
                }
                var entries = this.getEntries();
                entries.forEach(function(entry) {
                    var entryType = entry.getType(), typesIncludesEntryType = types.includes(entryType);
                    if (typesIncludesEntryType) {
                        callback(entry);
                    }
                });
            }
        },
        {
            key: "forEachEntry",
            value: function forEachEntry(callback) {
                var entries = this.getEntries();
                entries.forEach(function(entry) {
                    callback(entry);
                });
            }
        },
        {
            key: "someEntryByTypes",
            value: function someEntryByTypes(callback) {
                for(var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    types[_key - 1] = arguments[_key];
                }
                var entries = this.getEntries();
                return entries.some(function(entry) {
                    var entryType = entry.getType(), typesIncludesEntryType = types.includes(entryType);
                    if (typesIncludesEntryType) {
                        var result = callback(entry);
                        return result;
                    }
                });
            }
        },
        {
            key: "someEntry",
            value: function someEntry(callback) {
                var entries = this.getEntries();
                return entries.some(function(entry) {
                    return callback(entry);
                });
            }
        },
        {
            key: "findEntryByNameAndTypes",
            value: function findEntryByNameAndTypes(name) {
                for(var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    types[_key - 1] = arguments[_key];
                }
                var entry = this.findEntryByTypes.apply(this, [
                    function(entry1) {
                        var entryName = entry1.getName();
                        if (entryName === name) {
                            return true;
                        }
                    }
                ].concat(_toConsumableArray(types)));
                return entry;
            }
        },
        {
            key: "findEntryByTypes",
            value: function findEntryByTypes(callback) {
                for(var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    types[_key - 1] = arguments[_key];
                }
                var entries = this.getEntries(), entry = entries.find(function(entry1) {
                    var entryType = entry1.getType(), typesIncludesEntryType = types.includes(entryType);
                    if (typesIncludesEntryType) {
                        var result = callback(entry1);
                        if (result) {
                            return true;
                        }
                    }
                }) || null; ///;
                return entry;
            }
        },
        {
            key: "findEntryByName",
            value: function findEntryByName(name) {
                var entry = this.findEntry(function(entry1) {
                    var entryName = entry1.getName();
                    if (entryName === name) {
                        return true;
                    }
                });
                return entry;
            }
        },
        {
            key: "findEntry",
            value: function findEntry(callback) {
                var entries = this.getEntries(), entry = entries.find(callback) || null; ///
                return entry;
            }
        },
        {
            key: "parentContext",
            value: function parentContext() {
                var getExplorer = this.getExplorer.bind(this), isEmpty = this.isEmpty.bind(this), addMarker = this.addMarker.bind(this), removeMarker = this.removeMarker.bind(this), expandEntries = this.expand.bind(this), collapseEntries = this.collapse.bind(this), addFilePath = this.addFilePath.bind(this), removeFilePath = this.removeFilePath.bind(this), addDirectoryPath = this.addDirectoryPath.bind(this), removeDirectoryPath = this.removeDirectoryPath.bind(this), isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this), isDragEntryPresent = this.isDragEntryPresent.bind(this), findTopmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry.bind(this), retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this), retrieveFilePaths = this.retrieveFilePaths.bind(this), retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this), retrieveDragEntryPath = this.retrieveDragEntryPath.bind(this), retrieveDragSubEntries = this.retrieveDragSubEntries.bind(this), retrieveMarkedDirectoryNameDragEntry = this.retrieveMarkedDirectoryNameDragEntry.bind(this), retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry.bind(this);
                return {
                    getExplorer: getExplorer,
                    isEmpty: isEmpty,
                    addMarker: addMarker,
                    removeMarker: removeMarker,
                    expandEntries: expandEntries,
                    collapseEntries: collapseEntries,
                    addFilePath: addFilePath,
                    removeFilePath: removeFilePath,
                    addDirectoryPath: addDirectoryPath,
                    removeDirectoryPath: removeDirectoryPath,
                    isMarkerEntryPresent: isMarkerEntryPresent,
                    isDragEntryPresent: isDragEntryPresent,
                    findTopmostDirectoryNameDragEntry: findTopmostDirectoryNameDragEntry,
                    retrieveMarkerEntry: retrieveMarkerEntry,
                    retrieveFilePaths: retrieveFilePaths,
                    retrieveDirectoryPaths: retrieveDirectoryPaths,
                    retrieveDragEntryPath: retrieveDragEntryPath,
                    retrieveDragSubEntries: retrieveDragSubEntries,
                    retrieveMarkedDirectoryNameDragEntry: retrieveMarkedDirectoryNameDragEntry,
                    retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry: retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry
                };
            }
        }
    ]);
    return Entries;
}(_wrapNativeSuper(_easy.Element));
_defineProperty(Entries, "tagName", "ul");
_defineProperty(Entries, "defaultProperties", {
    className: "entries"
});
var _default = (0, _easyWithStyle).default(Entries)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRyaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ0VudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ0VudHJ5ID0gdGhpcy5maW5kRHJhZ0VudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdFbnRyeVByZXNlbnQgPSAoZHJhZ0VudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkcmFnRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ0VudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ0VudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnRW50cnlQcmVzZW50O1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKGVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cblxuICAgIGVudHJ5LmRpZE1vdW50ICYmIGVudHJ5LmRpZE1vdW50KCk7IC8vL1xuICB9XG5cbiAgcmVtb3ZlRW50cnkoZW50cnkpIHtcbiAgICBlbnRyeS53aWxsVW5tb3VudCAmJiBlbnRyeS53aWxsVW5tb3VudCgpOyAgLy8vXG5cbiAgICBlbnRyeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ0VudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcblxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJFbnRyeU5hbWUsIC8vL1xuICAgICAgICAgIHR5cGUgPSBkcmFnRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gZXhwbG9yZXIuZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgICAgICBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5TmFtZSA9IG1hcmtlckVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ0VudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ0VudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVOYW1lRHJhZ0VudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ0VudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmNyZWF0ZURpcmVjdG9yeU5hbWVEcmFnRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGZpbGVOYW1lRHJhZ0VudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICBmaWxlTmFtZURyYWdFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBpZiAoZmlsZU5hbWVEcmFnRW50cnlQcmVzZW50KSB7XG4gICAgICAgICAgZmlsZU5hbWVEcmFnRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdFbnRyeShmaWxlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZU5hbWVEcmFnRW50cnkgPSB0aGlzLmNyZWF0ZUZpbGVOYW1lRHJhZ0VudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoZmlsZU5hbWVEcmFnRW50cnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ0VudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnRW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBmaWxlTmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ0VudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ0VudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRW50cnkoZmlsZU5hbWVEcmFnRW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmNyZWF0ZURpcmVjdG9yeU5hbWVEcmFnRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnRW50cnlQcmVzZW50KSB7XG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnRW50cnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuY3JlYXRlRGlyZWN0b3J5TmFtZURyYWdFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgICAgICAgdGhpcy5hZGRFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnRW50cnkuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnRW50cnk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVGaWxlTmFtZURyYWdFbnRyeShmaWxlTmFtZSkge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBGaWxlTmFtZURyYWdFbnRyeSA9IGV4cGxvcmVyLmdldEZpbGVOYW1lRHJhZ0VudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnRW50cnkgPVxuXG4gICAgICAgICAgICA8RmlsZU5hbWVEcmFnRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgIDtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdFbnRyeTtcbiAgfVxuXG4gIGNyZWF0ZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IGV4cGxvcmVyLmdldERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID1cblxuICAgICAgICAgICAgPERpcmVjdG9yeU5hbWVEcmFnRW50cnkgbmFtZT17bmFtZX0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5O1xuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnRW50cnlQYXRoKGRyYWdFbnRyeSkge1xuICAgIGxldCBkcmFnRW50cnlQYXRoID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgZHJhZ0VudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdFbnRyeVBhdGg7XG4gIH1cblxuICBmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdFbnRyeU1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnk7XG4gIH1cblxuICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnRW50cnkoKGZpbGVOYW1lRHJhZ0VudHJ5KSA9PiB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ0VudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KSA9PiB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LnJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnRW50cnlQYXRoKGRyYWdFbnRyeSkge1xuICAgIGxldCBkcmFnRW50cnlQYXRoID0gdGhpcy5maW5kRHJhZ0VudHJ5UGF0aChkcmFnRW50cnkpO1xuXG4gICAgaWYgKGRyYWdFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkpID0+IHtcbiAgICAgICAgZHJhZ0VudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkucmV0cmlldmVEcmFnRW50cnlQYXRoKGRyYWdFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyYWdFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5TmFtZSA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgZHJhZ0VudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnRW50cnlOYW1lfS8ke2RyYWdFbnRyeVBhdGh9YDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ0VudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ1N1YkVudHJpZXMoc3ViRW50cmllcyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnRW50cnkoKGZpbGVOYW1lRHJhZ0VudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ0VudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnRW50cnkucmV0cmlldmVEcmFnU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcy5maW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeShkcmFnRW50cnkpIHtcbiAgICBsZXQgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnRW50cnkoZHJhZ0VudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSkge1xuICAgICAgICBsZXQgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5VG9wbW9zdCkge1xuICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnSW50b1N1YkRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5KGRyYWdFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ0VudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgYWRkTWFya2VyID0gdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgICBleHBhbmRFbnRyaWVzID0gdGhpcy5leHBhbmQuYmluZCh0aGlzKSwgLy8vXG4gICAgICAgICAgICBjb2xsYXBzZUVudHJpZXMgPSB0aGlzLmNvbGxhcHNlLmJpbmQodGhpcyksIC8vL1xuICAgICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZERpcmVjdG9yeVBhdGggPSB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNEcmFnRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRHJhZ0VudHJ5UGF0aCA9IHRoaXMucmV0cmlldmVEcmFnRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZURyYWdTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdTdWJFbnRyaWVzLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnkuYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoe1xuICAgICAgZ2V0RXhwbG9yZXIsXG4gICAgICBpc0VtcHR5LFxuICAgICAgYWRkTWFya2VyLFxuICAgICAgcmVtb3ZlTWFya2VyLFxuICAgICAgZXhwYW5kRW50cmllcyxcbiAgICAgIGNvbGxhcHNlRW50cmllcyxcbiAgICAgIGFkZEZpbGVQYXRoLFxuICAgICAgcmVtb3ZlRmlsZVBhdGgsXG4gICAgICBhZGREaXJlY3RvcnlQYXRoLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aCxcbiAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50LFxuICAgICAgaXNEcmFnRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LFxuICAgICAgcmV0cmlldmVNYXJrZXJFbnRyeSxcbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyxcbiAgICAgIHJldHJpZXZlRHJhZ0VudHJ5UGF0aCxcbiAgICAgIHJldHJpZXZlRHJhZ1N1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnRW50cnksXG4gICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5T3ZlcmxhcHBpbmdEcmFnRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFbnRyaWVzKWBcblxuICB3aWR0aDogYXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyLjRyZW07XG4gIFxuICAuY29sbGFwc2VkIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFVSxjQUFpQjtJQUVmLEtBQU07SUFDQSxVQUFXO0lBRXlDLFFBQVc7SUFDVSxNQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBZ3NCOUUsNEZBU2xDOzs7Ozs7O0lBdnNCUSw0QkFBNEIsR0FMTixVQUFXLGVBS2pDLDRCQUE0QixFQUFFLHVDQUF1QyxHQUwvQyxVQUFXLGVBS0gsdUNBQXVDO0lBRXZFLE9BQU87Y0FBUCxPQUFPO2FBQVAsT0FBTzs4QkFBUCxPQUFPO2dFQUFQLE9BQU87O2lCQUFQLE9BQU87O1lBQ1gsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVztvQkFDWSxXQUFlLFFBQVYsVUFBVSxFQUE1QixRQUFRLEdBQUssV0FBZSxDQUE1QixRQUFRO3VCQUVULFFBQVE7Ozs7WUFHakIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTtvQkFDRiwwQkFBMEIsUUFBUSxnQkFBZ0IsRUFBQyxRQUFVLElBQzdELE9BQU8sR0FBRywwQkFBMEIsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRXpDLE9BQU87Ozs7WUFHaEIsR0FBTyxHQUFQLE9BQU87NEJBQVAsT0FBTztvQkFDQyxPQUFPLFFBQVEsVUFBVSxJQUN6QixhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFDOUIsS0FBSyxHQUFJLGFBQWEsS0FBSyxDQUFDO3VCQUUzQixLQUFLOzs7O1lBR2QsR0FBb0IsR0FBcEIsb0JBQW9COzRCQUFwQixvQkFBb0I7b0JB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