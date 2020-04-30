"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

var _fileName = _interopRequireDefault(require("./entry/marker/fileName"));

var _fileName2 = _interopRequireDefault(require("./entry/draggable/fileName"));

var _directoryName2 = _interopRequireDefault(require("./entry/marker/directoryName"));

var _options = require("./options");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var topmostDirectoryNameFromPath = _necessary.pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var Entries = /*#__PURE__*/function (_Element) {
  _inherits(Entries, _Element);

  var _super = _createSuper(Entries);

  function Entries(selector, explorer) {
    var _this;

    _classCallCheck(this, Entries);

    _this = _super.call(this, selector);
    _this.explorer = explorer;
    return _this;
  }

  _createClass(Entries, [{
    key: "getExplorer",
    value: function getExplorer() {
      return this.explorer;
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
          var fileNameMarkerEntry = /*#__PURE__*/React.createElement(_fileName["default"], {
            name: name
          });
          markerEntry = fileNameMarkerEntry; ///

          break;

        case _types.DIRECTORY_NAME_TYPE:
          var directoryNameMarkerEntry = /*#__PURE__*/React.createElement(_directoryName2["default"], {
            name: name
          });
          markerEntry = directoryNameMarkerEntry; ///

          break;
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
          explorer = this.explorer,
          fileNameDraggableEntry = /*#__PURE__*/React.createElement(_fileName2["default"], {
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
          explorer = this.explorer,
          ///
      DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry(),
          directoryNameDraggableEntry = /*#__PURE__*/React.createElement(DirectoryNameDraggableEntry, {
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
          var removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);

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
          var removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);

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
      var _this2 = this;

      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry) {
          var dragIntoSubDirectories = true;
          var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

          if (directoryNameDraggableEntryTopmost) {
            var noDraggingIntoSubdirectoriesOptionPresent = _this2.explorer.isOptionPresent(_options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

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
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var explorer = properties.explorer,
          entries = _easy.Element.fromClass(Class, properties, explorer);

      return entries;
    }
  }]);

  return Entries;
}(_easy.Element);

exports["default"] = Entries;
Object.assign(Entries, {
  tagName: "ul",
  defaultProperties: {
    className: "entries"
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJpZXMuanMiXSwibmFtZXMiOlsidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJleHBsb3JlciIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZW50cnkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5IiwiZmluZEVudHJ5IiwibmV4dEVudHJ5QmVmb3JlRW50cnkiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsIm1hcmtlckVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImZpbGVOYW1lTWFya2VyRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiYWRkRW50cnkiLCJyZXRyaWV2ZU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRGaWxlUGF0aCIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiZmluZEVudHJ5QnlUeXBlcyIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCIsImlzVG9wbW9zdCIsImZpbGVQYXRocyIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJmaW5kRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ0ludG9TdWJEaXJlY3RvcmllcyIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwidHlwZXMiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzSW5jbHVkZXNFbnRyeVR5cGUiLCJpbmNsdWRlcyIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiZ2V0RXhwbG9yZXIiLCJiaW5kIiwicmVtb3ZlTWFya2VyIiwiaXNNYXJrZXJFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIkNsYXNzIiwicHJvcGVydGllcyIsIkVsZW1lbnQiLCJmcm9tQ2xhc3MiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLDRCLEdBQTBFQyx3QixDQUExRUQsNEI7SUFBOEJFLHVDLEdBQTRDRCx3QixDQUE1Q0MsdUM7O0lBRWpCQyxPOzs7OztBQUNuQixtQkFBWUMsUUFBWixFQUFzQkMsUUFBdEIsRUFBZ0M7QUFBQTs7QUFBQTs7QUFDOUIsOEJBQU1ELFFBQU47QUFFQSxVQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUg4QjtBQUkvQjs7OztrQ0FFYTtBQUNaLGFBQU8sS0FBS0EsUUFBWjtBQUNEOzs7aUNBRVk7QUFDWCxVQUFNQywwQkFBMEIsR0FBRyxLQUFLQyxnQkFBTCxDQUFzQixVQUF0QixDQUFuQztBQUFBLFVBQ01DLE9BQU8sR0FBR0YsMEJBRGhCLENBRFcsQ0FFa0M7O0FBRTdDLGFBQU9FLE9BQVA7QUFDRDs7OzhCQUVTO0FBQ1IsVUFBTUEsT0FBTyxHQUFH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QUEsWUFBWSxFQUFaQSxZQUpNO0FBS05wRSxRQUFBQSxXQUFXLEVBQVhBLFdBTE07QUFNTkksUUFBQUEsY0FBYyxFQUFkQSxjQU5NO0FBT05RLFFBQUFBLGdCQUFnQixFQUFoQkEsZ0JBUE07QUFRTkcsUUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFSTTtBQVNOc0QsUUFBQUEsb0JBQW9CLEVBQXBCQSxvQkFUTTtBQVVOQyxRQUFBQSx1QkFBdUIsRUFBdkJBLHVCQVZNO0FBV04xRSxRQUFBQSxzQ0FBc0MsRUFBdENBLHNDQVhNO0FBWU5kLFFBQUFBLG1CQUFtQixFQUFuQkEsbUJBWk07QUFhTm9ELFFBQUFBLGlCQUFpQixFQUFqQkEsaUJBYk07QUFjTkcsUUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFkTTtBQWVORSxRQUFBQSwwQkFBMEIsRUFBMUJBLDBCQWZNO0FBZ0JOSSxRQUFBQSwyQkFBMkIsRUFBM0JBLDJCQWhCTTtBQWlCTkUsUUFBQUEseUNBQXlDLEVBQXpDQSx5Q0FqQk07QUFrQk5PLFFBQUFBLHNFQUFzRSxFQUF0RUE7QUFsQk0sT0FBUjtBQW9CRDs7OzhCQUVnQm1CLEssRUFBT0MsVSxFQUFZO0FBQzVCLFVBQUVqSSxRQUFGLEdBQWVpSSxVQUFmLENBQUVqSSxRQUFGO0FBQUEsVUFDQUcsT0FEQSxHQUNVK0gsY0FBUUMsU0FBUixDQUFrQkgsS0FBbEIsRUFBeUJDLFVBQXpCLEVBQXFDakksUUFBckMsQ0FEVjs7QUFHTixhQUFPRyxPQUFQO0FBQ0Q7Ozs7RUEzcEJrQytILGE7OztBQThwQnJDRSxNQUFNLENBQUNDLE1BQVAsQ0FBY3ZJLE9BQWQsRUFBdUI7QUFDckJ3SSxFQUFBQSxPQUFPLEVBQUUsSUFEWTtBQUVyQkMsRUFBQUEsaUJBQWlCLEVBQUU7QUFDakJDLElBQUFBLFNBQVMsRUFBRTtBQURNO0FBRkUsQ0FBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRmlsZU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWVcIjtcbmltcG9ydCBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTLCBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG5cbiAgICBjb25zdCBuYW1lID0gbWFya2VyRW50cnlOYW1lLCAvLy9cbiAgICAgICAgICB0eXBlID0gZHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXJFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICBtYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmV4cGxvcmVyLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmV4cGxvcmVyLCAvLy9cbiAgICAgICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmV4cGxvcmVyLmdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5TmFtZSA9IG1hcmtlckVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWV9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGxldCBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgICAgY29uc3Qgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHJhZ0ludG9TdWJEaXJlY3Rvcmllcykge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnkobmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGRpcmVjdG9yeU5hbWUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSwgLi4udHlwZXMpO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcblxuICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsOyAvLy87XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lKG5hbWUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGNhbGxiYWNrKSB8fCBudWxsOyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgZ2V0RXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGFkZE1hcmtlciA9IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlTWFya2VyID0gdGhpcy5yZW1vdmVNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGRGaWxlUGF0aCA9IHRoaXMuYWRkRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGREaXJlY3RvcnlQYXRoID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aCA9IHRoaXMucmVtb3ZlRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldEV4cGxvcmVyLFxuICAgICAgaXNFbXB0eSxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGFkZEZpbGVQYXRoLFxuICAgICAgcmVtb3ZlRmlsZVBhdGgsXG4gICAgICBhZGREaXJlY3RvcnlQYXRoLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aCxcbiAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50LFxuICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQsXG4gICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlTWFya2VyRW50cnksXG4gICAgICByZXRyaWV2ZUZpbGVQYXRocyxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyxcbiAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBleHBsb3Jlcik7XG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogXCJ1bFwiLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogXCJlbnRyaWVzXCJcbiAgfVxufSk7XG4iXX0=