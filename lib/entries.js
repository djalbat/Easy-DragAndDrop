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
            key: "isDraggableEntryPresent",
            value: function isDraggableEntryPresent(name) {
                var draggableEntry = this.findDraggableEntry(name), draggableEntryPresent = draggableEntry !== null;
                return draggableEntryPresent;
            }
        },
        {
            key: "isFileNameDraggableEntryPresent",
            value: function isFileNameDraggableEntryPresent(fileName) {
                var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName), fileNameDraggableEntryPresent = fileNameDraggableEntry !== null;
                return fileNameDraggableEntryPresent;
            }
        },
        {
            key: "isDirectoryNameDraggableEntryPresent",
            value: function isDirectoryNameDraggableEntryPresent(directoryName) {
                var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName), directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null;
                return directoryNameDraggableEntryPresent;
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
            value: function addMarkerEntry(markerEntryName, draggableEntryType) {
                var markerEntry;
                var name = markerEntryName, type = draggableEntryType; ///
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
            value: function addMarker(markerEntryPath, draggableEntryType) {
                var topmostDirectoryName = topmostDirectoryNameFromPath(markerEntryPath);
                if (topmostDirectoryName === null) {
                    var markerEntryName = markerEntryPath; ///
                    this.addMarkerEntry(markerEntryName, draggableEntryType);
                } else {
                    var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName), markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);
                    markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///
                    topmostDirectoryNameDraggableEntry.addMarker(markerEntryPath, draggableEntryType);
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
                var fileNameDraggableEntry = null;
                var topmostDirectoryName = topmostDirectoryNameFromPath(filePath), topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(), filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);
                if (topmostDirectoryNameEntry !== null) {
                    if (filePathWithoutTopmostDirectoryName !== null) {
                        var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();
                        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
                            filePath = filePathWithoutTopmostDirectoryName; ///
                            fileNameDraggableEntry = topmostDirectoryNameEntry.addFilePath(filePath);
                        }
                    }
                } else {
                    if (topmostDirectoryName !== null) {
                        var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);
                        if (topmostDirectoryNameDraggableEntry === null) {
                            var collapsed = true; ///
                            topmostDirectoryNameDraggableEntry = this.createDirectoryNameDraggableEntry(topmostDirectoryName, collapsed);
                            this.addEntry(topmostDirectoryNameDraggableEntry);
                        }
                        var filePath1 = filePathWithoutTopmostDirectoryName; ///
                        fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePath1);
                    } else {
                        var fileName = filePath, fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);
                        if (fileNameDraggableEntryPresent) {
                            fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName);
                        } else {
                            fileNameDraggableEntry = this.createFileNameDraggableEntry(fileName);
                            this.addEntry(fileNameDraggableEntry);
                        }
                    }
                }
                return fileNameDraggableEntry;
            }
        },
        {
            key: "removeFilePath",
            value: function removeFilePath(filePath2) {
                var topmostDirectoryName = topmostDirectoryNameFromPath(filePath2), filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath2);
                if (topmostDirectoryName !== null) {
                    var directoryName = topmostDirectoryName, directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);
                    if (directoryNameDraggableEntry !== null) {
                        filePath2 = filePathWithoutTopmostDirectoryName; ///
                        directoryNameDraggableEntry.removeFilePath(filePath2);
                        var explorer = this.getExplorer(), removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                        if (removeEmptyParentDirectoriesOptionPresent) {
                            var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry();
                            if (directoryNameDraggableEntry !== topmostDirectoryNameDraggableEntry) {
                                var directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();
                                if (directoryNameDraggableEntryEmpty) {
                                    this.removeEntry(directoryNameDraggableEntry);
                                }
                            }
                        }
                    }
                } else {
                    var fileName = filePath2, fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName);
                    if (fileNameDraggableEntry !== null) {
                        this.removeEntry(fileNameDraggableEntry);
                    }
                }
            }
        },
        {
            key: "addDirectoryPath",
            value: function addDirectoryPath(directoryPath, param) {
                var collapsed = param === void 0 ? false : param;
                var directoryNameDraggableEntry = null;
                var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath), topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(), directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);
                if (topmostDirectoryNameEntry !== null) {
                    if (directoryPathWithoutTopmostDirectoryName !== null) {
                        var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();
                        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
                            directoryPath = directoryPathWithoutTopmostDirectoryName; ///
                            directoryNameDraggableEntry = topmostDirectoryNameEntry.addDirectoryPath(directoryPath, collapsed);
                        }
                    }
                } else {
                    if (topmostDirectoryName !== null) {
                        var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);
                        if (topmostDirectoryNameDraggableEntry === null) {
                            var collapsed1 = true; ///
                            topmostDirectoryNameDraggableEntry = this.createDirectoryNameDraggableEntry(topmostDirectoryName, collapsed1);
                            this.addEntry(topmostDirectoryNameDraggableEntry);
                        }
                        var directoryPath1 = directoryPathWithoutTopmostDirectoryName; ///
                        directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPath1, collapsed);
                    } else {
                        var directoryName = directoryPath, directoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);
                        if (directoryNameDraggableEntryPresent) {
                            directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);
                        } else {
                            directoryNameDraggableEntry = this.createDirectoryNameDraggableEntry(directoryName, collapsed);
                            this.addEntry(directoryNameDraggableEntry);
                        }
                        directoryNameDraggableEntry.setCollapsed(collapsed);
                    }
                }
                return directoryNameDraggableEntry;
            }
        },
        {
            key: "removeDirectoryPath",
            value: function removeDirectoryPath(directoryPath2) {
                var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath2), directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath2);
                if (topmostDirectoryName !== null) {
                    var directoryName = topmostDirectoryName, directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);
                    if (directoryNameDraggableEntry !== null) {
                        directoryPath2 = directoryPathWithoutTopmostDirectoryName; ///
                        directoryNameDraggableEntry.removeDirectoryPath(directoryPath2);
                        var explorer = this.getExplorer(), removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                        if (removeEmptyParentDirectoriesOptionPresent) {
                            var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry();
                            if (directoryNameDraggableEntry !== topmostDirectoryNameDraggableEntry) {
                                var directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();
                                if (directoryNameDraggableEntryEmpty) {
                                    this.removeEntry(directoryNameDraggableEntry);
                                }
                            }
                        }
                    }
                } else {
                    var directoryName = directoryPath2, directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);
                    if (directoryNameDraggableEntry !== null) {
                        this.removeEntry(directoryNameDraggableEntry);
                    }
                }
            }
        },
        {
            key: "createFileNameDraggableEntry",
            value: function createFileNameDraggableEntry(fileName) {
                var name = fileName, explorer = this.getExplorer(), FileNameDraggableEntry = explorer.getFileNameDraggableEntry(), fileNameDraggableEntry = /*#__PURE__*/ React.createElement(FileNameDraggableEntry, {
                    name: name,
                    explorer: explorer
                });
                return fileNameDraggableEntry;
            }
        },
        {
            key: "createDirectoryNameDraggableEntry",
            value: function createDirectoryNameDraggableEntry(directoryName, collapsed2) {
                var name = directoryName, explorer = this.getExplorer(), DirectoryNameDraggableEntry = explorer.getDirectoryNameDraggableEntry(), directoryNameDraggableEntry = /*#__PURE__*/ React.createElement(DirectoryNameDraggableEntry, {
                    name: name,
                    collapsed: collapsed2,
                    explorer: explorer
                });
                return directoryNameDraggableEntry;
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
            key: "findDraggableEntryPath",
            value: function findDraggableEntryPath(draggableEntry) {
                var draggableEntryPath = null;
                this.someEntry(function(entry) {
                    if (entry === draggableEntry) {
                        var entryName = entry.getName();
                        draggableEntryPath = entryName; ///
                        return true;
                    }
                });
                return draggableEntryPath;
            }
        },
        {
            key: "findMarkedDirectoryNameDraggableEntry",
            value: function findMarkedDirectoryNameDraggableEntry() {
                var markedDirectoryNameDraggableEntry = null;
                this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                    var directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();
                    if (directoryNameDraggableEntryMarked) {
                        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
                        return true;
                    }
                });
                return markedDirectoryNameDraggableEntry;
            }
        },
        {
            key: "findTopmostDirectoryNameDraggableEntry",
            value: function findTopmostDirectoryNameDraggableEntry() {
                var topmostDirectoryNameDraggableEntry = null;
                this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                    var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();
                    if (directoryNameDraggableEntryTopmost) {
                        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
                        return true;
                    }
                });
                return topmostDirectoryNameDraggableEntry;
            }
        },
        {
            key: "retrieveMarkerEntry",
            value: function retrieveMarkerEntry() {
                var markerEntry = this.findMarkerEntry();
                if (markerEntry === null) {
                    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                        markerEntry = directoryNameDraggableEntry.retrieveMarkerEntry();
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
                this.forEachFileNameDraggableEntry(function(fileNameDraggableEntry) {
                    var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(), filePath2 = fileNameDraggableEntryPath; ///
                    filePaths.push(filePath2);
                });
                this.forEachDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                    directoryNameDraggableEntry.retrieveFilePaths(filePaths);
                });
                return filePaths;
            }
        },
        {
            key: "retrieveDirectoryPaths",
            value: function retrieveDirectoryPaths(param) {
                var directoryPaths = param === void 0 ? [] : param;
                this.forEachDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                    var directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(), directoryPath2 = directoryNameDraggableEntryPath; ///
                    directoryPaths.push(directoryPath2);
                    directoryNameDraggableEntry.retrieveDirectoryPaths(directoryPaths);
                });
                return directoryPaths;
            }
        },
        {
            key: "retrieveDraggableEntryPath",
            value: function retrieveDraggableEntryPath(draggableEntry) {
                var draggableEntryPath = this.findDraggableEntryPath(draggableEntry);
                if (draggableEntryPath === null) {
                    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                        draggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);
                        if (draggableEntryPath !== null) {
                            var directoryNameDraggableEntryName = directoryNameDraggableEntry.getName();
                            draggableEntryPath = "".concat(directoryNameDraggableEntryName, "/").concat(draggableEntryPath);
                            return true;
                        }
                    });
                }
                return draggableEntryPath;
            }
        },
        {
            key: "retrieveDraggableSubEntries",
            value: function retrieveDraggableSubEntries(param) {
                var subEntries = param === void 0 ? [] : param;
                this.forEachFileNameDraggableEntry(function(fileNameDraggableEntry) {
                    var subEntry = fileNameDraggableEntry; ///
                    subEntries.push(subEntry);
                });
                this.forEachDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                    var subEntry = directoryNameDraggableEntry; ///
                    subEntries.push(subEntry);
                    directoryNameDraggableEntry.retrieveDraggableSubEntries(subEntries);
                });
                return subEntries;
            }
        },
        {
            key: "retrieveMarkedDirectoryNameDraggableEntry",
            value: function retrieveMarkedDirectoryNameDraggableEntry() {
                var markedDirectoryNameDraggableEntry = this.findMarkedDirectoryNameDraggableEntry();
                if (markedDirectoryNameDraggableEntry === null) {
                    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
                        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();
                        if (markedDirectoryNameDraggableEntry !== null) {
                            return true;
                        }
                    });
                }
                return markedDirectoryNameDraggableEntry;
            }
        },
        {
            key: "retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry",
            value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
                var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;
                this.someDirectoryNameDraggableEntry((function(directoryNameDraggableEntry) {
                    var directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);
                    if (directoryNameDraggableEntryOverlappingDraggableEntry) {
                        var dragIntoSubDirectories = true;
                        var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();
                        if (directoryNameDraggableEntryTopmost) {
                            var explorer = this.getExplorer(), noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(_options.NO_DRAGGING_INTO_SUB_DIRECTORIES);
                            if (noDraggingIntoSubdirectoriesOptionPresent) {
                                dragIntoSubDirectories = false;
                            }
                        }
                        if (dragIntoSubDirectories) {
                            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
                        }
                        if (bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry === null) {
                            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry; ///
                        }
                    }
                }).bind(this));
                return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
            }
        },
        {
            key: "forEachFileNameDraggableEntry",
            value: function forEachFileNameDraggableEntry(callback) {
                this.forEachEntryByTypes(callback, _types.FILE_NAME_TYPE);
            }
        },
        {
            key: "forEachDirectoryNameDraggableEntry",
            value: function forEachDirectoryNameDraggableEntry(callback) {
                this.forEachEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "someFileNameDraggableEntry",
            value: function someFileNameDraggableEntry(callback) {
                return this.someEntryByTypes(callback, _types.FILE_NAME_TYPE);
            }
        },
        {
            key: "someDirectoryNameDraggableEntry",
            value: function someDirectoryNameDraggableEntry(callback) {
                return this.someEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "findDraggableEntry",
            value: function findDraggableEntry(name) {
                return this.findEntryByNameAndTypes(name, _types.FILE_NAME_TYPE, _types.DIRECTORY_NAME_TYPE);
            }
        },
        {
            key: "findFileNameDraggableEntry",
            value: function findFileNameDraggableEntry(fileName) {
                return this.findEntryByNameAndTypes(fileName, _types.FILE_NAME_TYPE);
            }
        },
        {
            key: "findDirectoryNameDraggableEntry",
            value: function findDirectoryNameDraggableEntry(directoryName) {
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
                var getExplorer = this.getExplorer.bind(this), isEmpty = this.isEmpty.bind(this), addMarker = this.addMarker.bind(this), removeMarker = this.removeMarker.bind(this), expandEntries = this.expand.bind(this), collapseEntries = this.collapse.bind(this), addFilePath = this.addFilePath.bind(this), removeFilePath = this.removeFilePath.bind(this), addDirectoryPath = this.addDirectoryPath.bind(this), removeDirectoryPath = this.removeDirectoryPath.bind(this), isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this), isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this), findTopmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry.bind(this), retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this), retrieveFilePaths = this.retrieveFilePaths.bind(this), retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this), retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this), retrieveDraggableSubEntries = this.retrieveDraggableSubEntries.bind(this), retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this), retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this);
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
                    isDraggableEntryPresent: isDraggableEntryPresent,
                    findTopmostDirectoryNameDraggableEntry: findTopmostDirectoryNameDraggableEntry,
                    retrieveMarkerEntry: retrieveMarkerEntry,
                    retrieveFilePaths: retrieveFilePaths,
                    retrieveDirectoryPaths: retrieveDirectoryPaths,
                    retrieveDraggableEntryPath: retrieveDraggableEntryPath,
                    retrieveDraggableSubEntries: retrieveDraggableSubEntries,
                    retrieveMarkedDirectoryNameDraggableEntry: retrieveMarkedDirectoryNameDraggableEntry,
                    retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry: retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRyaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKGVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cblxuICAgIGVudHJ5LmRpZE1vdW50ICYmIGVudHJ5LmRpZE1vdW50KCk7IC8vL1xuICB9XG5cbiAgcmVtb3ZlRW50cnkoZW50cnkpIHtcbiAgICBlbnRyeS53aWxsVW5tb3VudCAmJiBlbnRyeS53aWxsVW5tb3VudCgpOyAgLy8vXG5cbiAgICBlbnRyeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgICAgdHlwZSA9IGRyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDoge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IGV4cGxvcmVyLmdldEZpbGVOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZmlsZU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICAgICAgICA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGZpbGVOYW1lTWFya2VyRW50cnk7ICAvLy9cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDoge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gZXhwbG9yZXIuZ2V0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCksXG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICAgICAgICA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5OyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5TmFtZSA9IG1hcmtlckVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmNyZWF0ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgICAgICAgIHRoaXMuYWRkRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuY3JlYXRlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmNyZWF0ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgICAgICAgIHRoaXMuYWRkRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5jcmVhdGVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICA7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGNyZWF0ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICA7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIGlmIChtYXJrZXJFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZXJFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lfS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBsZXQgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnSW50b1N1YkRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGZpbGVOYW1lLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZGlyZWN0b3J5TmFtZSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcygoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoY2FsbGJhY2spIHx8IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBnZXRFeHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzRW1wdHkgPSB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZE1hcmtlciA9IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVNYXJrZXIgPSB0aGlzLnJlbW92ZU1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZXhwYW5kRW50cmllcyA9IHRoaXMuZXhwYW5kLmJpbmQodGhpcyksIC8vL1xuICAgICAgICAgICAgY29sbGFwc2VFbnRyaWVzID0gdGhpcy5jb2xsYXBzZS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgICAgICAgIGFkZEZpbGVQYXRoID0gdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICBhZGREaXJlY3RvcnlQYXRoID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlQYXRoID0gdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICBpc01hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFeHBsb3JlcixcbiAgICAgIGlzRW1wdHksXG4gICAgICBhZGRNYXJrZXIsXG4gICAgICByZW1vdmVNYXJrZXIsXG4gICAgICBleHBhbmRFbnRyaWVzLFxuICAgICAgY29sbGFwc2VFbnRyaWVzLFxuICAgICAgYWRkRmlsZVBhdGgsXG4gICAgICByZW1vdmVGaWxlUGF0aCxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGgsXG4gICAgICByZW1vdmVEaXJlY3RvcnlQYXRoLFxuICAgICAgaXNNYXJrZXJFbnRyeVByZXNlbnQsXG4gICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCxcbiAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmV0cmlldmVNYXJrZXJFbnRyeSxcbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLFxuICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwidWxcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImVudHJpZXNcIlxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRW50cmllcylgXG5cbiAgd2lkdGg6IGF1dG87XG4gIHBhZGRpbmctbGVmdDogMi40cmVtO1xuICBcbiAgLmNvbGxhcHNlZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG5gO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVUsY0FBaUI7SUFFZixLQUFNO0lBQ0EsVUFBVztJQUV5QyxRQUFXO0lBQ1UsTUFBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWdzQjlFLDRGQVNsQzs7Ozs7OztJQXZzQlEsNEJBQTRCLEdBTE4sVUFBVyxlQUtqQyw0QkFBNEIsRUFBRSx1Q0FBdUMsR0FML0MsVUFBVyxlQUtILHVDQUF1QztJQUV2RSxPQUFPO2NBQVAsT0FBTzthQUFQLE9BQU87OEJBQVAsT0FBTztnRUFBUCxPQUFPOztpQkFBUCxPQUFPOztZQUNYLEdBQVcsR0FBWCxXQUFXOzRCQUFYLFdBQVc7b0JBQ1ksV0FBZSxRQUFWLFVB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