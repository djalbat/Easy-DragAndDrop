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

  function Entries(selectorOrDOMElement, explorer) {
    var _this;

    _classCallCheck(this, Entries);

    _this = _super.call(this, selectorOrDOMElement);
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
            var FileNameMarkerEntry = this.explorer.getFileNameMarkerEntry(),
                fileNameMarkerEntry = /*#__PURE__*/React.createElement(FileNameMarkerEntry, {
              name: name
            });
            markerEntry = fileNameMarkerEntry; ///

            break;
          }

        case _types.DIRECTORY_NAME_TYPE:
          {
            var DirectoryNameMarkerEntry = this.explorer.getDirectoryNameMarkerEntry(),
                directoryNameMarkerEntry = /*#__PURE__*/React.createElement(DirectoryNameMarkerEntry, {
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
          explorer = this.explorer,
          FileNameDraggableEntry = this.explorer.getFileNameDraggableEntry(),
          fileNameDraggableEntry = /*#__PURE__*/React.createElement(FileNameDraggableEntry, {
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

_defineProperty(Entries, "tagName", "ul");

_defineProperty(Entries, "defaultProperties", {
  className: "entries"
});

var _default = (0, _easyWithStyle["default"])(Entries)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJpZXMuanMiXSwibmFtZXMiOlsidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhVdGlsaXRpZXMiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJFbnRyaWVzIiwic2VsZWN0b3JPckRPTUVsZW1lbnQiLCJleHBsb3JlciIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImVudHJ5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsImZpbmRFbnRyeSIsIm5leHRFbnRyeUJlZm9yZUVudHJ5IiwiaXNCZWZvcmUiLCJhcHBlbmQiLCJpbnNlcnRCZWZvcmUiLCJtYXJrZXJFbnRyeU5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0eXBlIiwiRklMRV9OQU1FX1RZUEUiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiZ2V0RmlsZU5hbWVNYXJrZXJFbnRyeSIsImZpbGVOYW1lTWFya2VyRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZ2V0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiYWRkRW50cnkiLCJyZXRyaWV2ZU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImdldEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJjb2xsYXBzZWQiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZE1hcmtlckVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlckVudHJ5IiwiZmlsZVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5IiwiZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lIiwiZ2V0TmFtZSIsImFkZEZpbGVQYXRoIiwiYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVGaWxlUGF0aCIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5IiwiaXNFbXB0eSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5UGF0aCIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsInNldENvbGxhcHNlZCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJmaW5kRW50cnlCeVR5cGVzIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNNYXJrZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0IiwiaXNUb3Btb3N0IiwiZmlsZVBhdGhzIiwiZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImZpbmREcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJzdWJFbnRyaWVzIiwic3ViRW50cnkiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnSW50b1N1YkRpcmVjdG9yaWVzIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJjYWxsYmFjayIsImZvckVhY2hFbnRyeUJ5VHlwZXMiLCJzb21lRW50cnlCeVR5cGVzIiwiZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMiLCJ0eXBlcyIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwidHlwZXNJbmNsdWRlc0VudHJ5VHlwZSIsImluY2x1ZGVzIiwic29tZSIsInJlc3VsdCIsImZpbmQiLCJnZXRFeHBsb3JlciIsImJpbmQiLCJyZW1vdmVNYXJrZXIiLCJleHBhbmRFbnRyaWVzIiwiZXhwYW5kIiwiY29sbGFwc2VFbnRyaWVzIiwiY29sbGFwc2UiLCJpc01hcmtlckVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiRWxlbWVudCIsImZyb21DbGFzcyIsImNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVRQSw0QixHQUEwRUMsd0IsQ0FBMUVELDRCO0lBQThCRSx1QyxHQUE0Q0Qsd0IsQ0FBNUNDLHVDOztJQUVoQ0MsTzs7Ozs7QUFDSixtQkFBWUMsb0JBQVosRUFBa0NDLFFBQWxDLEVBQTRDO0FBQUE7O0FBQUE7O0FBQzFDLDhCQUFNRCxvQkFBTjtBQUVBLFVBQUtDLFFBQUwsR0FBZ0JBLFFB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TTtBQWFOOUUsUUFBQUEsc0NBQXNDLEVBQXRDQSxzQ0FiTTtBQWNOaEIsUUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFkTTtBQWVOc0QsUUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFmTTtBQWdCTkcsUUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFoQk07QUFpQk5FLFFBQUFBLDBCQUEwQixFQUExQkEsMEJBakJNO0FBa0JOSSxRQUFBQSwyQkFBMkIsRUFBM0JBLDJCQWxCTTtBQW1CTkUsUUFBQUEseUNBQXlDLEVBQXpDQSx5Q0FuQk07QUFvQk5PLFFBQUFBLHNFQUFzRSxFQUF0RUE7QUFwQk0sT0FBUjtBQXNCRDs7OzhCQVFnQnVCLEssRUFBT0MsVSxFQUFZO0FBQzVCLFVBQUU3SSxRQUFGLEdBQWU2SSxVQUFmLENBQUU3SSxRQUFGO0FBQUEsVUFDQUcsT0FEQSxHQUNVMkksY0FBUUMsU0FBUixDQUFrQkgsS0FBbEIsRUFBeUJDLFVBQXpCLEVBQXFDN0ksUUFBckMsQ0FEVjs7QUFHTixhQUFPRyxPQUFQO0FBQ0Q7Ozs7RUFqckJtQjJJLGE7O2dCQUFoQmhKLE8sYUFzcUJhLEk7O2dCQXRxQmJBLE8sdUJBd3FCdUI7QUFDekJrSixFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztlQVlkLCtCQUFVbEosT0FBVixDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xuaW1wb3J0IHsgcGF0aFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUywgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCwgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50LCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yT3JET01FbGVtZW50KTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cyhcImxpLmVudHJ5XCIpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc01hcmtlckVudHJ5UHJlc2VudCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VyRW50cnlQcmVzZW50ID0gKG1hcmtlckVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksICAvLy9cbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgICAgdHlwZSA9IGRyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDoge1xuICAgICAgICBjb25zdCBGaWxlTmFtZU1hcmtlckVudHJ5ID0gdGhpcy5leHBsb3Jlci5nZXRGaWxlTmFtZU1hcmtlckVudHJ5KCksXG4gICAgICAgICAgICAgIGZpbGVOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgICAgICAgPEZpbGVOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBmaWxlTmFtZU1hcmtlckVudHJ5OyAgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6IHtcbiAgICAgICAgY29uc3QgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5leHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlcixcbiAgICAgICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5nZXRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZXhwbG9yZXIsIC8vL1xuICAgICAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZXhwbG9yZXIuZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyRW50cnlOYW1lID0gbWFya2VyRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQgPSBmYWxzZSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWV9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGxldCBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgICAgY29uc3Qgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHJhZ0ludG9TdWJEaXJlY3Rvcmllcykge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnkobmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGRpcmVjdG9yeU5hbWUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSwgLi4udHlwZXMpO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcblxuICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsOyAvLy87XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lKG5hbWUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGNhbGxiYWNrKSB8fCBudWxsOyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgZ2V0RXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGFkZE1hcmtlciA9IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlTWFya2VyID0gdGhpcy5yZW1vdmVNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBleHBhbmRFbnRyaWVzID0gdGhpcy5leHBhbmQuYmluZCh0aGlzKSwgLy8vXG4gICAgICAgICAgY29sbGFwc2VFbnRyaWVzID0gdGhpcy5jb2xsYXBzZS5iaW5kKHRoaXMpLCAvLy9cbiAgICAgICAgICBhZGRGaWxlUGF0aCA9IHRoaXMuYWRkRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGREaXJlY3RvcnlQYXRoID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aCA9IHRoaXMucmVtb3ZlRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldEV4cGxvcmVyLFxuICAgICAgaXNFbXB0eSxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGV4cGFuZEVudHJpZXMsXG4gICAgICBjb2xsYXBzZUVudHJpZXMsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBleHBsb3Jlcik7XG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRW50cmllcylgXG5cbiAgd2lkdGg6IGF1dG87XG4gIHBhZGRpbmctbGVmdDogMi40cmVtO1xuICBcbiAgLmNvbGxhcHNlZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG5gO1xuIl19