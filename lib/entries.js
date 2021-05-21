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
                    this.append(nextEntry);
                } else {
                    nextEntry.insertBefore(previousEntry);
                }
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
            key: "addFileNameDraggableEntry",
            value: function addFileNameDraggableEntry(fileName) {
                var name = fileName, explorer = this.getExplorer(), FileNameDraggableEntry = explorer.getFileNameDraggableEntry(), fileNameDraggableEntry = /*#__PURE__*/ React.createElement(FileNameDraggableEntry, {
                    name: name,
                    explorer: explorer
                }), entry = fileNameDraggableEntry; ///
                this.addEntry(entry);
                return fileNameDraggableEntry;
            }
        },
        {
            key: "addDirectoryNameDraggableEntry",
            value: function addDirectoryNameDraggableEntry(directoryName, collapsed) {
                var name = directoryName, explorer = this.getExplorer(), DirectoryNameDraggableEntry = explorer.getDirectoryNameDraggableEntry(), directoryNameDraggableEntry = /*#__PURE__*/ React.createElement(DirectoryNameDraggableEntry, {
                    name: name,
                    collapsed: collapsed,
                    explorer: explorer
                }), entry = directoryNameDraggableEntry; ///
                this.addEntry(entry);
                return directoryNameDraggableEntry;
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
                            topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, collapsed);
                        }
                        var filePath1 = filePathWithoutTopmostDirectoryName; ///
                        fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePath1);
                    } else {
                        var fileName = filePath, fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);
                        fileNameDraggableEntry = fileNameDraggableEntryPresent ? this.findFileNameDraggableEntry(fileName) : this.addFileNameDraggableEntry(fileName);
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
                                    directoryNameDraggableEntry.remove();
                                }
                            }
                        }
                    }
                } else {
                    var fileName = filePath2, fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName);
                    if (fileNameDraggableEntry !== null) {
                        fileNameDraggableEntry.remove();
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
                            topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, collapsed1);
                        }
                        var directoryPath1 = directoryPathWithoutTopmostDirectoryName; ///
                        directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPath1, collapsed);
                    } else {
                        var directoryName = directoryPath, directoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);
                        directoryNameDraggableEntry = directoryNameDraggableEntryPresent ? this.findDirectoryNameDraggableEntry(directoryName) : this.addDirectoryNameDraggableEntry(directoryName, collapsed);
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
                                    directoryNameDraggableEntry.remove();
                                }
                            }
                        }
                    }
                } else {
                    var directoryName = directoryPath2, directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);
                    if (directoryNameDraggableEntry !== null) {
                        directoryNameDraggableEntry.remove();
                    }
                }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRyaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG5cbiAgICBjb25zdCBuYW1lID0gbWFya2VyRW50cnlOYW1lLCAvLy9cbiAgICAgICAgICB0eXBlID0gZHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gZXhwbG9yZXIuZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgICAgICBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWV9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGxldCBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgYWRkTWFya2VyID0gdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgICBleHBhbmRFbnRyaWVzID0gdGhpcy5leHBhbmQuYmluZCh0aGlzKSwgLy8vXG4gICAgICAgICAgICBjb2xsYXBzZUVudHJpZXMgPSB0aGlzLmNvbGxhcHNlLmJpbmQodGhpcyksIC8vL1xuICAgICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZERpcmVjdG9yeVBhdGggPSB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMgPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldEV4cGxvcmVyLFxuICAgICAgaXNFbXB0eSxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGV4cGFuZEVudHJpZXMsXG4gICAgICBjb2xsYXBzZUVudHJpZXMsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFbnRyaWVzKWBcblxuICB3aWR0aDogYXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyLjRyZW07XG4gIFxuICAuY29sbGFwc2VkIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFVSxjQUFpQjtJQUVmLEtBQU07SUFDQSxVQUFXO0lBRXlDLFFBQVc7SUFDVSxNQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBa3JCOUUsNEZBU2xDOzs7Ozs7O0lBenJCUSw0QkFBNEIsR0FMTixVQUFXLGVBS2pDLDRCQUE0QixFQUFFLHVDQUF1QyxHQUwvQyxVQUFXLGVBS0gsdUNBQXVDO0lBRXZFLE9BQU87Y0FBUCxPQUFPO2FBQVAsT0FBTzs4QkFBUCxPQUFPO2dFQUFQLE9BQU87O2lCQUFQLE9BQU87O1lBQ1gsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVztvQkFDWSxXQUFlLFFBQVYsVUFBVSxFQUE1QixRQUFRLEdBQUssV0FBZSxDQUE1QixRQUFRO3VCQUVULFFBQVE7Ozs7WUFHakIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTtvQkFDRiwwQkFBMEIsUUFBUSxnQkFBZ0IsRUFBQyxRQUFVLElBQzdELE9BQU8sR0FBRywwQkFBMEIsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRXpDLE9BQU87Ozs7WUFHaEIsR0FBTyxHQUFQLE9BQU87NEJBQVAsT0FBTztvQkFDQyxPQUFPLFFBQVEsVUFBVSxJQUN6QixhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFDOUIsS0FBSyxHQUFJ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