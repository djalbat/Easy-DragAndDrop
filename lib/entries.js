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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

_defineProperty(Entries, "tagName", "ul");

_defineProperty(Entries, "defaultProperties", {
  className: "entries"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJpZXMuanMiXSwibmFtZXMiOlsidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJleHBsb3JlciIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZW50cnkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5IiwiZmluZEVudHJ5IiwibmV4dEVudHJ5QmVmb3JlRW50cnkiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsIm1hcmtlckVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImZpbGVOYW1lTWFya2VyRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiYWRkRW50cnkiLCJyZXRyaWV2ZU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRGaWxlUGF0aCIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiZmluZEVudHJ5QnlUeXBlcyIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCIsImlzVG9wbW9zdCIsImZpbGVQYXRocyIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJmaW5kRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ0ludG9TdWJEaXJlY3RvcmllcyIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwidHlwZXMiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzSW5jbHVkZXNFbnRyeVR5cGUiLCJpbmNsdWRlcyIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiZ2V0RXhwbG9yZXIiLCJiaW5kIiwicmVtb3ZlTWFya2VyIiwiaXNNYXJrZXJFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIkNsYXNzIiwicHJvcGVydGllcyIsIkVsZW1lbnQiLCJmcm9tQ2xhc3MiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFUUEsNEIsR0FBMEVDLHdCLENBQTFFRCw0QjtJQUE4QkUsdUMsR0FBNENELHdCLENBQTVDQyx1Qzs7SUFFakJDLE87Ozs7O0FBQ25CLG1CQUFZQyxRQUFaLEVBQXNCQyxRQUF0QixFQUFnQztBQUFBOztBQUFBOztBQUM5Qiw4QkFBTUQsUUFBTjtBQUVBLFVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBSDhCO0FBSS9COzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLQSxRQUFaO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQU1DLDBCQUEwQixHQUFHLEtBQUtDLGdCQUFMLENBQXNCLFVBQXRCLENBQW5DO0FBQUEsVUFDTUMsT0FBTyxHQUFHRiwwQkFEaEIsQ0FEVyxDQUVrQzs7QUFFN0MsYUFBT0UsT0FBUDtBQUNEOzs7OEJBRVM7QUFDUixVQUFNQSxPQUFPLEdBQUcsS0FBS0MsVUFBTCxFQUFoQjtBQUFBLFVBQ01DLGFBQWEsR0FBR0YsT0FBTyxD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TTtBQU1OSSxRQUFBQSxjQUFjLEVBQWRBLGNBTk07QUFPTlEsUUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFQTTtBQVFORyxRQUFBQSxtQkFBbUIsRUFBbkJBLG1CQVJNO0FBU05zRCxRQUFBQSxvQkFBb0IsRUFBcEJBLG9CQVRNO0FBVU5DLFFBQUFBLHVCQUF1QixFQUF2QkEsdUJBVk07QUFXTjFFLFFBQUFBLHNDQUFzQyxFQUF0Q0Esc0NBWE07QUFZTmQsUUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFaTTtBQWFOb0QsUUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFiTTtBQWNORyxRQUFBQSxzQkFBc0IsRUFBdEJBLHNCQWRNO0FBZU5FLFFBQUFBLDBCQUEwQixFQUExQkEsMEJBZk07QUFnQk5JLFFBQUFBLDJCQUEyQixFQUEzQkEsMkJBaEJNO0FBaUJORSxRQUFBQSx5Q0FBeUMsRUFBekNBLHlDQWpCTTtBQWtCTk8sUUFBQUEsc0VBQXNFLEVBQXRFQTtBQWxCTSxPQUFSO0FBb0JEOzs7OEJBUWdCbUIsSyxFQUFPQyxVLEVBQVk7QUFDNUIsVUFBRWpJLFFBQUYsR0FBZWlJLFVBQWYsQ0FBRWpJLFFBQUY7QUFBQSxVQUNBRyxPQURBLEdBQ1UrSCxjQUFRQyxTQUFSLENBQWtCSCxLQUFsQixFQUF5QkMsVUFBekIsRUFBcUNqSSxRQUFyQyxDQURWOztBQUdOLGFBQU9HLE9BQVA7QUFDRDs7OztFQWpxQmtDK0gsYTs7OztnQkFBaEJwSSxPLGFBc3BCRixJOztnQkF0cEJFQSxPLHVCQXdwQlE7QUFDekJzSSxFQUFBQSxTQUFTLEVBQUU7QUFEYyxDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xuaW1wb3J0IHsgcGF0aFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IEZpbGVOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWVcIjtcblxuaW1wb3J0IHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUywgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCwgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cyhcImxpLmVudHJ5XCIpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc01hcmtlckVudHJ5UHJlc2VudCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VyRW50cnlQcmVzZW50ID0gKG1hcmtlckVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksICAvLy9cbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgICAgdHlwZSA9IGRyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZmlsZU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGZpbGVOYW1lTWFya2VyRW50cnk7ICAvLy9cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlcixcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlciwgLy8vXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIGlmIChtYXJrZXJFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZXJFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lfS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBsZXQgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICAgIGNvbnN0IG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRW1wdHkgPSB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGRNYXJrZXIgPSB0aGlzLmFkZE1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRGlyZWN0b3J5UGF0aCA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVGaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyA9IHRoaXMucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFeHBsb3JlcixcbiAgICAgIGlzRW1wdHksXG4gICAgICBhZGRNYXJrZXIsXG4gICAgICByZW1vdmVNYXJrZXIsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBleHBsb3Jlcik7XG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuIl19