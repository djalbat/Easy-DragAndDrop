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
var Entries = function(Element1) {
    _inherits(Entries, _easy.Element);
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
                            var explorer = this.getExplorer(), FileNameMarkerEntry = explorer.getFileNameMarkerEntry(), fileNameMarkerEntry = React.createElement(FileNameMarkerEntry, {
                                name: name
                            });
                            markerEntry = fileNameMarkerEntry; ///
                            break;
                        }
                    case _types.DIRECTORY_NAME_TYPE:
                        {
                            var explorer = this.getExplorer(), DirectoryNameMarkerEntry = explorer.getDirectoryNameMarkerEntry(), directoryNameMarkerEntry = React.createElement(DirectoryNameMarkerEntry, {
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
                var name = fileName, explorer = this.getExplorer(), FileNameDraggableEntry = explorer.getFileNameDraggableEntry(), fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, {
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
                var name = directoryName, explorer = this.getExplorer(), DirectoryNameDraggableEntry = explorer.getDirectoryNameDraggableEntry(), directoryNameDraggableEntry = React.createElement(DirectoryNameDraggableEntry, {
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
var _default = _easyWithStyle.default(Entries)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRyaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG5cbiAgICBjb25zdCBuYW1lID0gbWFya2VyRW50cnlOYW1lLCAvLy9cbiAgICAgICAgICB0eXBlID0gZHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gZXhwbG9yZXIuZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgICAgICBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWV9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGxldCBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgYWRkTWFya2VyID0gdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgICBleHBhbmRFbnRyaWVzID0gdGhpcy5leHBhbmQuYmluZCh0aGlzKSwgLy8vXG4gICAgICAgICAgICBjb2xsYXBzZUVudHJpZXMgPSB0aGlzLmNvbGxhcHNlLmJpbmQodGhpcyksIC8vL1xuICAgICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZERpcmVjdG9yeVBhdGggPSB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMgPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldEV4cGxvcmVyLFxuICAgICAgaXNFbXB0eSxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGV4cGFuZEVudHJpZXMsXG4gICAgICBjb2xsYXBzZUVudHJpZXMsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFbnRyaWVzKWBcblxuICB3aWR0aDogYXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyLjRyZW07XG4gIFxuICAuY29sbGFwc2VkIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxjQUFBO0lBRUEsS0FBQTtJQUNBLFVBQUE7SUFFQSxRQUFBO0lBQ0EsTUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtyQkEsNEZBU0E7Ozs7Ozs7SUF6ckJBLDRCQUFBLEdBTEEsVUFBQSxlQUtBLDRCQUFBLEVBQUEsdUNBQUEsR0FMQSxVQUFBLGVBS0EsdUNBQUE7SUFFQSxPQUFBLFlBQUEsUUFBQTtjQUFBLE9BQUEsRUFSQSxLQUFBO2FBUUEsT0FBQTs4QkFBQSxPQUFBO2dFQUFBLE9BQUE7O2lCQUFBLE9BQUE7O0FBQ0EsZUFBQSxHQUFBLFdBQUE7NEJBQUEsV0FBQTtvQkFDQSxXQUFBLFFBQUEsVUFBQSxFQUFBLFFBQUEsR0FBQSxXQUFBLENBQUEsUUFBQTt1QkFFQSxRQUFBOzs7O0FBR0EsZUFBQSxHQUFBLFVBQUE7NEJBQUEsVUFBQTtvQkFDQSwwQkFBQSxRQUFBLGdCQUFBLEVBQUEsUUFBQSxJQUNBLE9BQUEsR0FBQSwwQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBO3VCQUVBLE9BQUE7Ozs7QUFHQSxlQUFBLEdBQUEsT0FBQTs0QkFBQSxPQUFBO29CQUNBLE9BQUEsUUFBQSxVQUFBLElBQ0EsYUFBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQ0EsS0FBQSxHQUFBLGFBQUEsS0FBQSxD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