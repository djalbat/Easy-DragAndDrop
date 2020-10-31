"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

var _necessary = require("necessary");

var _options = require("./options");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  width: auto;\n  padding-left: 2.4rem;\n  \n  .collapsed {\n    display: none;\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var topmostDirectoryNameFromPath = _necessary.pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var Entries = /*#__PURE__*/function (_Element) {
  _inherits(Entries, _Element);

  var _super = _createSuper(Entries);

  function Entries() {
    _classCallCheck(this, Entries);

    return _super.apply(this, arguments);
  }

  _createClass(Entries, [{
    key: "getExplorer",
    value: function getExplorer() {
      var explorer = this.properties.explorer;
      return explorer;
    }
  }, {
    key: "getEntries",
    value: function getEntries() {
      var childEntryListItemElements = this.getChildElements("li.entry"),
          entries = childEntryListItemElements; ///

      return entries;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var entries = this.getEntries(),
          entriesLength = entries.length,
          empty = entriesLength === 0;
      return empty;
    }
  }, {
    key: "isMarkerEntryPresent",
    value: function isMarkerEntryPresent() {
      var markerEntry = this.findMarkerEntry(),
          markerEntryPresent = markerEntry !== null;
      return markerEntryPresent;
    }
  }, {
    key: "isDraggableEntryPresent",
    value: function isDraggableEntryPresent(name) {
      var draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = draggableEntry !== null;
      return draggableEntryPresent;
    }
  }, {
    key: "isFileNameDraggableEntryPresent",
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null;
      return fileNameDraggableEntryPresent;
    }
  }, {
    key: "isDirectoryNameDraggableEntryPresent",
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null;
      return directoryNameDraggableEntryPresent;
    }
  }, {
    key: "expand",
    value: function expand() {
      this.removeClass("collapsed");
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.addClass("collapsed");
    }
  }, {
    key: "addEntry",
    value: function addEntry(entry) {
      var nextEntry = entry,
          ///
      previousEntry = this.findEntry(function (entry) {
        var nextEntryBeforeEntry = nextEntry.isBefore(entry);

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
  }, {
    key: "addMarkerEntry",
    value: function addMarkerEntry(markerEntryName, draggableEntryType) {
      var markerEntry;
      var name = markerEntryName,
          ///
      type = draggableEntryType; ///

      switch (type) {
        case _types.FILE_NAME_TYPE:
          {
            var explorer = this.getExplorer(),
                FileNameMarkerEntry = explorer.getFileNameMarkerEntry(),
                fileNameMarkerEntry = React.createElement(FileNameMarkerEntry, {
              name: name
            });
            markerEntry = fileNameMarkerEntry; ///

            break;
          }

        case _types.DIRECTORY_NAME_TYPE:
          {
            var _explorer = this.getExplorer(),
                DirectoryNameMarkerEntry = _explorer.getDirectoryNameMarkerEntry(),
                directoryNameMarkerEntry = React.createElement(DirectoryNameMarkerEntry, {
              name: name
            });

            markerEntry = directoryNameMarkerEntry; ///

            break;
          }
      }

      var entry = markerEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: "removeMarkerEntry",
    value: function removeMarkerEntry() {
      var markerEntry = this.retrieveMarkerEntry();
      markerEntry.remove();
    }
  }, {
    key: "addFileNameDraggableEntry",
    value: function addFileNameDraggableEntry(fileName) {
      var name = fileName,
          explorer = this.getExplorer(),
          FileNameDraggableEntry = explorer.getFileNameDraggableEntry(),
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, {
        name: name,
        explorer: explorer
      }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);
      return fileNameDraggableEntry;
    }
  }, {
    key: "addDirectoryNameDraggableEntry",
    value: function addDirectoryNameDraggableEntry(directoryName, collapsed) {
      var name = directoryName,
          explorer = this.getExplorer(),
          DirectoryNameDraggableEntry = explorer.getDirectoryNameDraggableEntry(),
          directoryNameDraggableEntry = React.createElement(DirectoryNameDraggableEntry, {
        name: name,
        collapsed: collapsed,
        explorer: explorer
      }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);
      return directoryNameDraggableEntry;
    }
  }, {
    key: "addMarker",
    value: function addMarker(markerEntryPath, draggableEntryType) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(markerEntryPath);

      if (topmostDirectoryName === null) {
        var markerEntryName = markerEntryPath; ///

        this.addMarkerEntry(markerEntryName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);
        markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///

        topmostDirectoryNameDraggableEntry.addMarker(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: "removeMarker",
    value: function removeMarker() {
      this.removeMarkerEntry();
    }
  }, {
    key: "addFilePath",
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;
      var topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

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

          var _filePath = filePathWithoutTopmostDirectoryName; ///

          fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(_filePath);
        } else {
          var fileName = filePath,
              ///
          fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);
          fileNameDraggableEntry = fileNameDraggableEntryPresent ? this.findFileNameDraggableEntry(fileName) : this.addFileNameDraggableEntry(fileName);
        }
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: "removeFilePath",
    value: function removeFilePath(filePath) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (topmostDirectoryName !== null) {
        var directoryName = topmostDirectoryName,
            ///
        directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

        if (directoryNameDraggableEntry !== null) {
          filePath = filePathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry.removeFilePath(filePath);
          var explorer = this.getExplorer(),
              removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);

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
        var fileName = filePath,
            ///
        fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName);

        if (fileNameDraggableEntry !== null) {
          fileNameDraggableEntry.remove();
        }
      }
    }
  }, {
    key: "addDirectoryPath",
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var directoryNameDraggableEntry = null;
      var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

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
            var _collapsed = true; ///

            topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, _collapsed);
          }

          var _directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(_directoryPath, collapsed);
        } else {
          var directoryName = directoryPath,
              ///
          directoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);
          directoryNameDraggableEntry = directoryNameDraggableEntryPresent ? this.findDirectoryNameDraggableEntry(directoryName) : this.addDirectoryNameDraggableEntry(directoryName, collapsed);
          directoryNameDraggableEntry.setCollapsed(collapsed);
        }
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: "removeDirectoryPath",
    value: function removeDirectoryPath(directoryPath) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (topmostDirectoryName !== null) {
        var directoryName = topmostDirectoryName,
            ///
        directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

        if (directoryNameDraggableEntry !== null) {
          directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry.removeDirectoryPath(directoryPath);
          var explorer = this.getExplorer(),
              removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);

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
        var _directoryName = directoryPath,
            ///
        _directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(_directoryName);

        if (_directoryNameDraggableEntry !== null) {
          _directoryNameDraggableEntry.remove();
        }
      }
    }
  }, {
    key: "findMarkerEntry",
    value: function findMarkerEntry() {
      var markerEntry = this.findEntryByTypes(function (entry) {
        return true; ///
      }, _types.FILE_NAME_MARKER_TYPE, _types.DIRECTORY_NAME_MARKER_TYPE);
      return markerEntry;
    }
  }, {
    key: "findDraggableEntryPath",
    value: function findDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = null;
      this.someEntry(function (entry) {
        if (entry === draggableEntry) {
          ///
          var entryName = entry.getName();
          draggableEntryPath = entryName; ///

          return true;
        }
      });
      return draggableEntryPath;
    }
  }, {
    key: "findMarkedDirectoryNameDraggableEntry",
    value: function findMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

        if (directoryNameDraggableEntryMarked) {
          markedDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///

          return true;
        }
      });
      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: "findTopmostDirectoryNameDraggableEntry",
    value: function findTopmostDirectoryNameDraggableEntry() {
      var topmostDirectoryNameDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

        if (directoryNameDraggableEntryTopmost) {
          topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///

          return true;
        }
      });
      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: "retrieveMarkerEntry",
    value: function retrieveMarkerEntry() {
      var markerEntry = this.findMarkerEntry();

      if (markerEntry === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          markerEntry = directoryNameDraggableEntry.retrieveMarkerEntry();

          if (markerEntry !== null) {
            return true;
          }
        });
      }

      return markerEntry;
    }
  }, {
    key: "retrieveFilePaths",
    value: function retrieveFilePaths() {
      var filePaths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
            filePath = fileNameDraggableEntryPath; ///

        filePaths.push(filePath);
      });
      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        directoryNameDraggableEntry.retrieveFilePaths(filePaths);
      });
      return filePaths;
    }
  }, {
    key: "retrieveDirectoryPaths",
    value: function retrieveDirectoryPaths() {
      var directoryPaths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(),
            directoryPath = directoryNameDraggableEntryPath; ///

        directoryPaths.push(directoryPath);
        directoryNameDraggableEntry.retrieveDirectoryPaths(directoryPaths);
      });
      return directoryPaths;
    }
  }, {
    key: "retrieveDraggableEntryPath",
    value: function retrieveDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = this.findDraggableEntryPath(draggableEntry);

      if (draggableEntryPath === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
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
  }, {
    key: "retrieveDraggableSubEntries",
    value: function retrieveDraggableSubEntries() {
      var subEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var subEntry = fileNameDraggableEntry; ///

        subEntries.push(subEntry);
      });
      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var subEntry = directoryNameDraggableEntry; ///

        subEntries.push(subEntry);
        directoryNameDraggableEntry.retrieveDraggableSubEntries(subEntries);
      });
      return subEntries;
    }
  }, {
    key: "retrieveMarkedDirectoryNameDraggableEntry",
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = this.findMarkedDirectoryNameDraggableEntry();

      if (markedDirectoryNameDraggableEntry === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();

          if (markedDirectoryNameDraggableEntry !== null) {
            return true;
          }
        });
      }

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: "retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry",
    value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var _this = this;

      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry) {
          var dragIntoSubDirectories = true;
          var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

          if (directoryNameDraggableEntryTopmost) {
            var explorer = _this.getExplorer(),
                noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(_options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

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
      });
      return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: "forEachFileNameDraggableEntry",
    value: function forEachFileNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, _types.FILE_NAME_TYPE);
    }
  }, {
    key: "forEachDirectoryNameDraggableEntry",
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "someFileNameDraggableEntry",
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, _types.FILE_NAME_TYPE);
    }
  }, {
    key: "someDirectoryNameDraggableEntry",
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "findDraggableEntry",
    value: function findDraggableEntry(name) {
      return this.findEntryByNameAndTypes(name, _types.FILE_NAME_TYPE, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "findFileNameDraggableEntry",
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndTypes(fileName, _types.FILE_NAME_TYPE);
    }
  }, {
    key: "findDirectoryNameDraggableEntry",
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndTypes(directoryName, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "forEachEntryByTypes",
    value: function forEachEntryByTypes(callback) {
      for (var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        types[_key - 1] = arguments[_key];
      }

      var entries = this.getEntries();
      entries.forEach(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          callback(entry);
        }
      });
    }
  }, {
    key: "forEachEntry",
    value: function forEachEntry(callback) {
      var entries = this.getEntries();
      entries.forEach(function (entry) {
        callback(entry);
      });
    }
  }, {
    key: "someEntryByTypes",
    value: function someEntryByTypes(callback) {
      for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        types[_key2 - 1] = arguments[_key2];
      }

      var entries = this.getEntries();
      return entries.some(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          var result = callback(entry);
          return result;
        }
      });
    }
  }, {
    key: "someEntry",
    value: function someEntry(callback) {
      var entries = this.getEntries();
      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: "findEntryByNameAndTypes",
    value: function findEntryByNameAndTypes(name) {
      for (var _len3 = arguments.length, types = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        types[_key3 - 1] = arguments[_key3];
      }

      var entry = this.findEntryByTypes.apply(this, [function (entry) {
        var entryName = entry.getName();

        if (entryName === name) {
          return true;
        }
      }].concat(types));
      return entry;
    }
  }, {
    key: "findEntryByTypes",
    value: function findEntryByTypes(callback) {
      for (var _len4 = arguments.length, types = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        types[_key4 - 1] = arguments[_key4];
      }

      var entries = this.getEntries(),
          entry = entries.find(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          var result = callback(entry);

          if (result) {
            return true;
          }
        }
      }) || null; ///;

      return entry;
    }
  }, {
    key: "findEntryByName",
    value: function findEntryByName(name) {
      var entry = this.findEntry(function (entry) {
        var entryName = entry.getName();

        if (entryName === name) {
          return true;
        }
      });
      return entry;
    }
  }, {
    key: "findEntry",
    value: function findEntry(callback) {
      var entries = this.getEntries(),
          entry = entries.find(callback) || null; ///

      return entry;
    }
  }, {
    key: "parentContext",
    value: function parentContext() {
      var getExplorer = this.getExplorer.bind(this),
          isEmpty = this.isEmpty.bind(this),
          addMarker = this.addMarker.bind(this),
          removeMarker = this.removeMarker.bind(this),
          expandEntries = this.expand.bind(this),
          ///
      collapseEntries = this.collapse.bind(this),
          ///
      addFilePath = this.addFilePath.bind(this),
          removeFilePath = this.removeFilePath.bind(this),
          addDirectoryPath = this.addDirectoryPath.bind(this),
          removeDirectoryPath = this.removeDirectoryPath.bind(this),
          isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this),
          isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this),
          findTopmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry.bind(this),
          retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this),
          retrieveFilePaths = this.retrieveFilePaths.bind(this),
          retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this),
          retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          retrieveDraggableSubEntries = this.retrieveDraggableSubEntries.bind(this),
          retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this);
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
  }]);

  return Entries;
}(_easy.Element);

_defineProperty(Entries, "tagName", "ul");

_defineProperty(Entries, "defaultProperties", {
  className: "entries"
});

var _default = (0, _easyWithStyle["default"])(Entries)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJpZXMuanMiXSwibmFtZXMiOlsidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJFbnRyaWVzIiwiZXhwbG9yZXIiLCJwcm9wZXJ0aWVzIiwiY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZW50cmllcyIsImdldEVudHJpZXMiLCJlbnRyaWVzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJtYXJrZXJFbnRyeSIsImZpbmRNYXJrZXJFbnRyeSIsIm1hcmtlckVudHJ5UHJlc2VudCIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImZpbmREcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImZpbGVOYW1lIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJkaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZW50cnkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5IiwiZmluZEVudHJ5IiwibmV4dEVudHJ5QmVmb3JlRW50cnkiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsIm1hcmtlckVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImdldEV4cGxvcmVyIiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsImdldEZpbGVOYW1lTWFya2VyRW50cnkiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImdldERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImFkZEVudHJ5IiwicmV0cmlldmVNYXJrZXJFbnRyeSIsInJlbW92ZSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRGaWxlUGF0aCIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiZmluZEVudHJ5QnlUeXBlcyIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCIsImlzVG9wbW9zdCIsImZpbGVQYXRocyIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJmaW5kRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ0ludG9TdWJEaXJlY3RvcmllcyIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwidHlwZXMiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzSW5jbHVkZXNFbnRyeVR5cGUiLCJpbmNsdWRlcyIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiYmluZCIsInJlbW92ZU1hcmtlciIsImV4cGFuZEVudHJpZXMiLCJleHBhbmQiLCJjb2xsYXBzZUVudHJpZXMiLCJjb2xsYXBzZSIsImlzTWFya2VyRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJFbGVtZW50IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFUUEsNEIsR0FBMEVDLHdCLENBQTFFRCw0QjtJQUE4QkUsdUMsR0FBNENELHdCLENBQTVDQyx1Qzs7SUFFaENDLE87Ozs7Ozs7Ozs7Ozs7a0NBQ1U7QUFBQSxVQUNKQyxRQURJLEdBQ1MsS0FBS0MsVUFEZCxDQUNKRCxRQURJO0FBR1osYUFBT0EsUUFBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFNRSwwQkFBMEIsR0FBRyxL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bUJBQW1CLEVBQW5CQSxtQkFWTTtBQVdOeUQsUUFBQUEsb0JBQW9CLEVBQXBCQSxvQkFYTTtBQVlOQyxRQUFBQSx1QkFBdUIsRUFBdkJBLHVCQVpNO0FBYU43RSxRQUFBQSxzQ0FBc0MsRUFBdENBLHNDQWJNO0FBY05oQixRQUFBQSxtQkFBbUIsRUFBbkJBLG1CQWRNO0FBZU5zRCxRQUFBQSxpQkFBaUIsRUFBakJBLGlCQWZNO0FBZ0JORyxRQUFBQSxzQkFBc0IsRUFBdEJBLHNCQWhCTTtBQWlCTkUsUUFBQUEsMEJBQTBCLEVBQTFCQSwwQkFqQk07QUFrQk5JLFFBQUFBLDJCQUEyQixFQUEzQkEsMkJBbEJNO0FBbUJORSxRQUFBQSx5Q0FBeUMsRUFBekNBLHlDQW5CTTtBQW9CTk8sUUFBQUEsc0VBQXNFLEVBQXRFQTtBQXBCTSxPQUFSO0FBc0JEOzs7O0VBcnFCbUJzQixhOztnQkFBaEI5SSxPLGFBdXFCYSxJOztnQkF2cUJiQSxPLHVCQXlxQnVCO0FBQ3pCK0ksRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7ZUFLZCwrQkFBVS9JLE9BQVYsQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG5cbiAgICBjb25zdCBuYW1lID0gbWFya2VyRW50cnlOYW1lLCAvLy9cbiAgICAgICAgICB0eXBlID0gZHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gZXhwbG9yZXIuZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgICAgICBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOiB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBleHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWV9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGxldCBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgYWRkTWFya2VyID0gdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgICBleHBhbmRFbnRyaWVzID0gdGhpcy5leHBhbmQuYmluZCh0aGlzKSwgLy8vXG4gICAgICAgICAgICBjb2xsYXBzZUVudHJpZXMgPSB0aGlzLmNvbGxhcHNlLmJpbmQodGhpcyksIC8vL1xuICAgICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZERpcmVjdG9yeVBhdGggPSB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMgPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldEV4cGxvcmVyLFxuICAgICAgaXNFbXB0eSxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGV4cGFuZEVudHJpZXMsXG4gICAgICBjb2xsYXBzZUVudHJpZXMsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShFbnRyaWVzKWBcblxuICB3aWR0aDogYXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyLjRyZW07XG4gIFxuICAuY29sbGFwc2VkIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbmA7XG4iXX0=