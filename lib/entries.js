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

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var topmostDirectoryNameFromPath = _necessary.pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var Entries = /*#__PURE__*/function (_Element) {
  _inherits(Entries, _Element);

  function Entries() {
    _classCallCheck(this, Entries);

    return _possibleConstructorReturn(this, _getPrototypeOf(Entries).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJpZXMuanMiXSwibmFtZXMiOlsidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJFbnRyaWVzIiwiZXhwbG9yZXIiLCJwcm9wZXJ0aWVzIiwiY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZW50cmllcyIsImdldEVudHJpZXMiLCJlbnRyaWVzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJtYXJrZXJFbnRyeSIsImZpbmRNYXJrZXJFbnRyeSIsIm1hcmtlckVudHJ5UHJlc2VudCIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImZpbmREcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImZpbGVOYW1lIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJkaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZW50cnkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5IiwiZmluZEVudHJ5IiwibmV4dEVudHJ5QmVmb3JlRW50cnkiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsIm1hcmtlckVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImdldEV4cGxvcmVyIiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsImdldEZpbGVOYW1lTWFya2VyRW50cnkiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImdldERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImFkZEVudHJ5IiwicmV0cmlldmVNYXJrZXJFbnRyeSIsInJlbW92ZSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRGaWxlUGF0aCIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiZmluZEVudHJ5QnlUeXBlcyIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCIsImlzVG9wbW9zdCIsImZpbGVQYXRocyIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJmaW5kRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ0ludG9TdWJEaXJlY3RvcmllcyIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwidHlwZXMiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzSW5jbHVkZXNFbnRyeVR5cGUiLCJpbmNsdWRlcyIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiYmluZCIsInJlbW92ZU1hcmtlciIsImV4cGFuZEVudHJpZXMiLCJleHBhbmQiLCJjb2xsYXBzZUVudHJpZXMiLCJjb2xsYXBzZSIsImlzTWFya2VyRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJFbGVtZW50IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFUUEsNEIsR0FBMEVDLHdCLENBQTFFRCw0QjtJQUE4QkUsdUMsR0FBNENELHdCLENBQTVDQyx1Qzs7SUFFaENDLE87Ozs7Ozs7Ozs7O2tDQUNVO0FBQUEsVUFDSkMsUUFESSxHQUNTLEtBQUtDLFVBRGQsQ0FDSkQsUUFESTtBQUdaLGFBQU9BLFFBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBTUUsMEJBQTBCLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0IsVUFBdEIsQ0FBbkM7QUFB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LG9CQUFvQixFQUFwQkEsb0JBWE07QUFZTkMsUUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFaTTtBQWFON0UsUUFBQUEsc0NBQXNDLEVBQXRDQSxzQ0FiTTtBQWNOaEIsUUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFkTTtBQWVOc0QsUUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFmTTtBQWdCTkcsUUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFoQk07QUFpQk5FLFFBQUFBLDBCQUEwQixFQUExQkEsMEJBakJNO0FBa0JOSSxRQUFBQSwyQkFBMkIsRUFBM0JBLDJCQWxCTTtBQW1CTkUsUUFBQUEseUNBQXlDLEVBQXpDQSx5Q0FuQk07QUFvQk5PLFFBQUFBLHNFQUFzRSxFQUF0RUE7QUFwQk0sT0FBUjtBQXNCRDs7OztFQXJxQm1Cc0IsYTs7Z0JBQWhCOUksTyxhQXVxQmEsSTs7Z0JBdnFCYkEsTyx1QkF5cUJ1QjtBQUN6QitJLEVBQUFBLFNBQVMsRUFBRTtBQURjLEM7O2VBS2QsK0JBQVUvSSxPQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTLCBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gdGhpcy5wcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cyhcImxpLmVudHJ5XCIpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc01hcmtlckVudHJ5UHJlc2VudCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VyRW50cnlQcmVzZW50ID0gKG1hcmtlckVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksICAvLy9cbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgICAgdHlwZSA9IGRyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDoge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IGV4cGxvcmVyLmdldEZpbGVOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZmlsZU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICAgICAgICA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGZpbGVOYW1lTWFya2VyRW50cnk7ICAvLy9cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDoge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gZXhwbG9yZXIuZ2V0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCksXG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICAgICAgICA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5OyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZXhwbG9yZXIuZ2V0RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZXhwbG9yZXIuZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyRW50cnlOYW1lID0gbWFya2VyRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIGlmIChtYXJrZXJFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZXJFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lfS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBsZXQgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnSW50b1N1YkRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGZpbGVOYW1lLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZGlyZWN0b3J5TmFtZSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcygoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoY2FsbGJhY2spIHx8IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBnZXRFeHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzRW1wdHkgPSB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZE1hcmtlciA9IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVNYXJrZXIgPSB0aGlzLnJlbW92ZU1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZXhwYW5kRW50cmllcyA9IHRoaXMuZXhwYW5kLmJpbmQodGhpcyksIC8vL1xuICAgICAgICAgICAgY29sbGFwc2VFbnRyaWVzID0gdGhpcy5jb2xsYXBzZS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgICAgICAgIGFkZEZpbGVQYXRoID0gdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICBhZGREaXJlY3RvcnlQYXRoID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlQYXRoID0gdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICBpc01hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFeHBsb3JlcixcbiAgICAgIGlzRW1wdHksXG4gICAgICBhZGRNYXJrZXIsXG4gICAgICByZW1vdmVNYXJrZXIsXG4gICAgICBleHBhbmRFbnRyaWVzLFxuICAgICAgY29sbGFwc2VFbnRyaWVzLFxuICAgICAgYWRkRmlsZVBhdGgsXG4gICAgICByZW1vdmVGaWxlUGF0aCxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGgsXG4gICAgICByZW1vdmVEaXJlY3RvcnlQYXRoLFxuICAgICAgaXNNYXJrZXJFbnRyeVByZXNlbnQsXG4gICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCxcbiAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmV0cmlldmVNYXJrZXJFbnRyeSxcbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLFxuICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwidWxcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImVudHJpZXNcIlxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRW50cmllcylgXG5cbiAgd2lkdGg6IGF1dG87XG4gIHBhZGRpbmctbGVmdDogMi40cmVtO1xuICBcbiAgLmNvbGxhcHNlZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG5gO1xuIl19