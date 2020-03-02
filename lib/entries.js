'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var easy = require('easy'),
    necessary = require('necessary');

var types = require('./types'),
    options = require('./options'),
    FileNameMarkerEntry = require('./entry/marker/fileName'),
    FileNameDraggableEntry = require('./entry/draggable/fileName'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName');

var Element = easy.Element,
    React = easy.React,
    pathUtilities = necessary.pathUtilities,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES,
    NO_DRAGGING_INTO_SUB_DIRECTORIES = options.NO_DRAGGING_INTO_SUB_DIRECTORIES,
    topmostDirectoryNameFromPath = pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var Entries = /*#__PURE__*/function (_Element) {
  _inherits(Entries, _Element);

  function Entries(selector, explorer) {
    var _this;

    _classCallCheck(this, Entries);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Entries).call(this, selector));
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
      var childEntryListItemElements = this.getChildElements('li.entry'),
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
        case FILE_NAME_TYPE:
          var fileNameMarkerEntry = React.createElement(FileNameMarkerEntry, {
            name: name
          });
          markerEntry = fileNameMarkerEntry; ///

          break;

        case DIRECTORY_NAME_TYPE:
          var directoryNameMarkerEntry = React.createElement(DirectoryNameMarkerEntry, {
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
          explorer = this.explorer,
          ///
      DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry(),
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
          var removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

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
          var removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

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
      }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);
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
            var noDraggingIntoSubdirectoriesOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

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
      this.forEachEntryByTypes(callback, FILE_NAME_TYPE);
    }
  }, {
    key: "forEachDirectoryNameDraggableEntry",
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "someFileNameDraggableEntry",
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, FILE_NAME_TYPE);
    }
  }, {
    key: "someDirectoryNameDraggableEntry",
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "findDraggableEntry",
    value: function findDraggableEntry(name) {
      return this.findEntryByNameAndTypes(name, FILE_NAME_TYPE, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "findFileNameDraggableEntry",
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndTypes(fileName, FILE_NAME_TYPE);
    }
  }, {
    key: "findDirectoryNameDraggableEntry",
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndTypes(directoryName, DIRECTORY_NAME_TYPE);
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
    key: "fromProperties",
    value: function fromProperties(properties) {
      var explorer = properties.explorer,
          entries = Element.fromProperties(Entries, properties, explorer);
      return entries;
    }
  }]);

  return Entries;
}(Element);

Object.assign(Entries, {
  tagName: 'ul',
  defaultProperties: {
    className: 'entries'
  }
});
module.exports = Entries;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJpZXMuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJ0eXBlcyIsIm9wdGlvbnMiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsInBhdGhVdGlsaXRpZXMiLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJleHBsb3JlciIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZW50cnkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5IiwiZmluZEVudHJ5IiwibmV4dEVudHJ5QmVmb3JlRW50cnkiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsIm1hcmtlckVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInR5cGUiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiYWRkRW50cnkiLCJyZXRyaWV2ZU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRGaWxlUGF0aCIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5IiwiaXNFbXB0eSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5UGF0aCIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsInNldENvbGxhcHNlZCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJmaW5kRW50cnlCeVR5cGVzIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCIsImlzVG9wbW9zdCIsImZpbGVQYXRocyIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJmaW5kRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ0ludG9TdWJEaXJlY3RvcmllcyIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwicmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlcyIsInNvbWVFbnRyeUJ5VHlwZXMiLCJmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwidHlwZXNJbmNsdWRlc0VudHJ5VHlwZSIsImluY2x1ZGVzIiwic29tZSIsInJlc3VsdCIsImZpbmQiLCJnZXRFeHBsb3JlciIsImJpbmQiLCJyZW1vdmVNYXJrZXIiLCJpc01hcmtlckVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjtBQUFBLElBQ01DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLFdBQUQsQ0FEekI7O0FBR0EsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsU0FBRCxDQUFyQjtBQUFBLElBQ01HLE9BQU8sR0FBR0gsT0FBTyxDQUFDLFdBQUQsQ0FEdkI7QUFBQSxJQUVNSSxtQkFBbUIsR0FBR0osT0FBTyxDQUFDLHlCQUFELENBRm5DO0FBQUEsSUFHTUssc0JBQXNCLEdBQUdMLE9BQU8sQ0FBQyw0QkFBRCxDQUh0QztBQUFBLElBSU1NLHdCQUF3QixH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QW1CLEVBQW5CQSxtQkFaTTtBQWFOaUQsUUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFiTTtBQWNORyxRQUFBQSxzQkFBc0IsRUFBdEJBLHNCQWRNO0FBZU5FLFFBQUFBLDBCQUEwQixFQUExQkEsMEJBZk07QUFnQk5JLFFBQUFBLDJCQUEyQixFQUEzQkEsMkJBaEJNO0FBaUJORSxRQUFBQSx5Q0FBeUMsRUFBekNBLHlDQWpCTTtBQWtCTk0sUUFBQUEsc0VBQXNFLEVBQXRFQTtBQWxCTSxPQUFSO0FBb0JEOzs7bUNBRXFCa0IsVSxFQUFZO0FBQzFCLFVBQUV6SCxRQUFGLEdBQWV5SCxVQUFmLENBQUV6SCxRQUFGO0FBQUEsVUFDQUcsT0FEQSxHQUNVaEIsT0FBTyxDQUFDdUksY0FBUixDQUF1QjVILE9BQXZCLEVBQWdDMkgsVUFBaEMsRUFBNEN6SCxRQUE1QyxDQURWO0FBR04sYUFBT0csT0FBUDtBQUNEOzs7O0VBM3BCbUJoQixPOztBQThwQnRCd0ksTUFBTSxDQUFDQyxNQUFQLENBQWM5SCxPQUFkLEVBQXVCO0FBQ3JCK0gsRUFBQUEsT0FBTyxFQUFFLElBRFk7QUFFckJDLEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFETTtBQUZFLENBQXZCO0FBT0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5JLE9BQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2ZpbGVOYW1lJyksXG4gICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgcGF0aFV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTLCBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyB9ID0gb3B0aW9ucyxcbiAgICAgIHsgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCwgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaS5lbnRyeScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc01hcmtlckVudHJ5UHJlc2VudCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VyRW50cnlQcmVzZW50ID0gKG1hcmtlckVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksICAvLy9cbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgICAgdHlwZSA9IGRyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZmlsZU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGZpbGVOYW1lTWFya2VyRW50cnk7ICAvLy9cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlcixcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlciwgLy8vXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIGlmIChtYXJrZXJFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZXJFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lfS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBsZXQgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICAgIGNvbnN0IG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRW1wdHkgPSB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGRNYXJrZXIgPSB0aGlzLmFkZE1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRGlyZWN0b3J5UGF0aCA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVGaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyA9IHRoaXMucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFeHBsb3JlcixcbiAgICAgIGlzRW1wdHksXG4gICAgICBhZGRNYXJrZXIsXG4gICAgICByZW1vdmVNYXJrZXIsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBlbnRyaWVzID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzLCBleHBsb3Jlcik7XG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19