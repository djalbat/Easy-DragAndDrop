'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Entries = function (_Element) {
  _inherits(Entries, _Element);

  function Entries(selector, explorer) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, selector));

    _this.explorer = explorer;
    return _this;
  }

  _createClass(Entries, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: 'getEntries',
    value: function getEntries() {
      var childEntryListItemElements = this.getChildElements('li.entry'),
          entries = childEntryListItemElements; ///

      return entries;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var entries = this.getEntries(),
          entriesLength = entries.length,
          empty = entriesLength === 0;

      return empty;
    }
  }, {
    key: 'isMarkerEntryPresent',
    value: function isMarkerEntryPresent() {
      var markerEntry = this.findMarkerEntry(),
          markerEntryPresent = markerEntry !== null;

      return markerEntryPresent;
    }
  }, {
    key: 'isDraggableEntryPresent',
    value: function isDraggableEntryPresent(name) {
      var draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = draggableEntry !== null;

      return draggableEntryPresent;
    }
  }, {
    key: 'isFileNameDraggableEntryPresent',
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null;

      return fileNameDraggableEntryPresent;
    }
  }, {
    key: 'isDirectoryNameDraggableEntryPresent',
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null;

      return directoryNameDraggableEntryPresent;
    }
  }, {
    key: 'addEntry',
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
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerEntryName, draggableEntryType) {
      var markerEntry = void 0;

      var name = markerEntryName,
          ///
      type = draggableEntryType; ///

      switch (type) {
        case FILE_NAME_TYPE:
          var fileNameMarkerEntry = React.createElement(FileNameMarkerEntry, { name: name });

          markerEntry = fileNameMarkerEntry; ///

          break;

        case DIRECTORY_NAME_TYPE:
          var directoryNameMarkerEntry = React.createElement(DirectoryNameMarkerEntry, { name: name });

          markerEntry = directoryNameMarkerEntry; ///

          break;
      }

      var entry = markerEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var markerEntry = this.retrieveMarkerEntry();

      markerEntry.remove();
    }
  }, {
    key: 'addFileNameDraggableEntry',
    value: function addFileNameDraggableEntry(fileName) {
      var name = fileName,
          explorer = this.explorer,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryNameDraggableEntry',
    value: function addDirectoryNameDraggableEntry(directoryName, collapsed) {
      var name = directoryName,
          explorer = this.explorer,
          ///
      DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry(),
          directoryNameDraggableEntry = React.createElement(DirectoryNameDraggableEntry, { name: name, collapsed: collapsed, explorer: explorer }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'addMarker',
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
    key: 'removeMarker',
    value: function removeMarker() {
      this.removeMarkerEntry();
    }
  }, {
    key: 'addFilePath',
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
    key: 'removeFilePath',
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
    key: 'addDirectoryPath',
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
    key: 'removeDirectoryPath',
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
    key: 'findMarkerEntry',
    value: function findMarkerEntry() {
      var markerEntry = this.findEntryByTypes(function (entry) {
        return true; ///
      }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

      return markerEntry;
    }
  }, {
    key: 'findDraggableEntryPath',
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
    key: 'findMarkedDirectoryNameDraggableEntry',
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
    key: 'findTopmostDirectoryNameDraggableEntry',
    value: function findTopmostDirectoryNameDraggableEntry() {
      var topmostDirectoryNameDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry = directoryNameDraggableEntry.isTopmostDirectoryNameDraggableEntry();

        if (directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry) {
          topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///

          return true;
        }
      });

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveMarkerEntry',
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
    key: 'retrieveFilePaths',
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
    key: 'retrieveDirectoryPaths',
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
    key: 'retrieveDraggableEntryPath',
    value: function retrieveDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = this.findDraggableEntryPath(draggableEntry);

      if (draggableEntryPath === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          draggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);

          if (draggableEntryPath !== null) {
            var directoryNameDraggableEntryName = directoryNameDraggableEntry.getName();

            draggableEntryPath = directoryNameDraggableEntryName + '/' + draggableEntryPath;

            return true;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: 'retrieveDraggableSubEntries',
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
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
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
    key: 'retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var _this2 = this;

      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry) {
          var dragIntoSubDirectories = true;

          var directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry = directoryNameDraggableEntry.isTopmostDirectoryNameDraggableEntry();

          if (directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry) {
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
    key: 'forEachFileNameDraggableEntry',
    value: function forEachFileNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, FILE_NAME_TYPE);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'someFileNameDraggableEntry',
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, FILE_NAME_TYPE);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'findDraggableEntry',
    value: function findDraggableEntry(name) {
      return this.findEntryByNameAndTypes(name, FILE_NAME_TYPE, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'findFileNameDraggableEntry',
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndTypes(fileName, FILE_NAME_TYPE);
    }
  }, {
    key: 'findDirectoryNameDraggableEntry',
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndTypes(directoryName, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'forEachEntryByTypes',
    value: function forEachEntryByTypes(callback) {
      for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
    key: 'forEachEntry',
    value: function forEachEntry(callback) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        callback(entry);
      });
    }
  }, {
    key: 'someEntryByTypes',
    value: function someEntryByTypes(callback) {
      for (var _len2 = arguments.length, types = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
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
    key: 'someEntry',
    value: function someEntry(callback) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: 'findEntryByNameAndTypes',
    value: function findEntryByNameAndTypes(name) {
      for (var _len3 = arguments.length, types = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
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
    key: 'findEntryByTypes',
    value: function findEntryByTypes(callback) {
      for (var _len4 = arguments.length, types = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
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
    key: 'findEntryByName',
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
    key: 'findEntry',
    value: function findEntry(callback) {
      var entries = this.getEntries(),
          entry = entries.find(callback) || null; ///

      return entry;
    }
  }, {
    key: 'parentContext',
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
    key: 'fromProperties',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwidHlwZXMiLCJvcHRpb25zIiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJwYXRoVXRpbGl0aWVzIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIiwidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsIkZJTEVfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiRW50cmllcyIsInNlbGVjdG9yIiwiZXhwbG9yZXIiLCJjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm1hcmtlckVudHJ5IiwiZmluZE1hcmtlckVudHJ5IiwibWFya2VyRW50cnlQcmVzZW50IiwibmFtZSIsImRyYWdnYWJsZUVudHJ5IiwiZmluZERyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZmlsZU5hbWUiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImRpcmVjdG9yeU5hbWUiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImVudHJ5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsImZpbmRFbnRyeSIsIm5leHRFbnRyeUJlZm9yZUVudHJ5IiwiaXNCZWZvcmUiLCJhcHBlbmQiLCJpbnNlcnRCZWZvcmUiLCJtYXJrZXJFbnRyeU5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0eXBlIiwiZmlsZU5hbWVNYXJrZXJFbnRyeSIsImRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImFkZEVudHJ5IiwicmV0cmlldmVNYXJrZXJFbnRyeSIsInJlbW92ZSIsImNvbGxhcHNlZCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlckVudHJ5UGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkTWFya2VyRW50cnkiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyRW50cnkiLCJmaWxlUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkiLCJmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUiLCJnZXROYW1lIiwiYWRkRmlsZVBhdGgiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInJlbW92ZUZpbGVQYXRoIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiZmluZEVudHJ5QnlUeXBlcyIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInNvbWVFbnRyeSIsImVudHJ5TmFtZSIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJpc01hcmtlZCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aHMiLCJmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVGaWxlUGF0aHMiLCJkaXJlY3RvcnlQYXRocyIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwiZmluZERyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSIsInN1YkVudHJpZXMiLCJzdWJFbnRyeSIsInJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyIsImZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdJbnRvU3ViRGlyZWN0b3JpZXMiLCJub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJjYWxsYmFjayIsImZvckVhY2hFbnRyeUJ5VHlwZXMiLCJzb21lRW50cnlCeVR5cGVzIiwiZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzSW5jbHVkZXNFbnRyeVR5cGUiLCJpbmNsdWRlcyIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiZ2V0RXhwbG9yZXIiLCJiaW5kIiwicmVtb3ZlTWFya2VyIiwiaXNNYXJrZXJFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7QUFBQSxJQUNNRyxVQUFVSCxRQUFRLFdBQVIsQ0FEaEI7QUFBQSxJQUVNSSxzQkFBc0JKLFFBQVEseUJBQVIsQ0FGNUI7QUFBQSxJQUdNSyx5QkFBeUJMLFFBQVEsNEJBQVIsQ0FIL0I7QUFBQSxJQUlNTSwyQkFBMkJOLFFBQVEsOEJBQVIs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QkQ7OzttQ0FFcUJrQixVLEVBQVk7QUFDMUIsVUFBRXpILFFBQUYsR0FBZXlILFVBQWYsQ0FBRXpILFFBQUY7QUFBQSxVQUNBRyxPQURBLEdBQ1VoQixRQUFRdUksY0FBUixDQUF1QjVILE9BQXZCLEVBQWdDMkgsVUFBaEMsRUFBNEN6SCxRQUE1QyxDQURWOzs7QUFHTixhQUFPRyxPQUFQO0FBQ0Q7Ozs7RUEzcEJtQmhCLE87O0FBOHBCdEJ3SSxPQUFPQyxNQUFQLENBQWM5SCxPQUFkLEVBQXVCO0FBQ3JCK0gsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQUZFLENBQXZCOztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCbkksT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIEZpbGVOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlTmFtZScpLFxuICAgICAgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lJyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IHBhdGhVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUywgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnMsXG4gICAgICB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IHR5cGVzO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGkuZW50cnknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgaXNNYXJrZXJFbnRyeVByZXNlbnQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlckVudHJ5UHJlc2VudCA9IChtYXJrZXJFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRHJhZ2dhYmxlRW50cnkobmFtZSksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LCAgLy8vXG4gICAgICAgICAgcHJldmlvdXNFbnRyeSA9IHRoaXMuZmluZEVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlRW50cnkgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuXG4gICAgICAgICAgICBpZiAobmV4dEVudHJ5QmVmb3JlRW50cnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudHJ5Lmluc2VydEJlZm9yZShwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcblxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJFbnRyeU5hbWUsIC8vL1xuICAgICAgICAgIHR5cGUgPSBkcmFnZ2FibGVFbnRyeVR5cGU7ICAvLy9cblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgPEZpbGVOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBmaWxlTmFtZU1hcmtlckVudHJ5OyAgLy8vXG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5OyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZXhwbG9yZXIsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZXhwbG9yZXIsIC8vL1xuICAgICAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZXhwbG9yZXIuZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyRW50cnlOYW1lID0gbWFya2VyRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQgPSBmYWxzZSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgICBjb25zdCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcygoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgLy8vXG4gICAgICAgICAgfSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNNYXJrZWQoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlckVudHJ5KCkge1xuICAgIGxldCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCk7XG5cbiAgICBpZiAobWFya2VyRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICBpZiAobWFya2VyRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZGlyZWN0b3J5UGF0aHMucHVzaChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5maW5kRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7ZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZX0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKHN1YkVudHJpZXMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKHN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgbGV0IGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBjb25zdCBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnSW50b1N1YkRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGZpbGVOYW1lLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZGlyZWN0b3J5TmFtZSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcygoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoY2FsbGJhY2spIHx8IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBnZXRFeHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0VtcHR5ID0gdGhpcy5pc0VtcHR5LmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkTWFya2VyID0gdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICByZW1vdmVNYXJrZXIgPSB0aGlzLnJlbW92ZU1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGFkZEZpbGVQYXRoID0gdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZUZpbGVQYXRoID0gdGhpcy5yZW1vdmVGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGFkZERpcmVjdG9yeVBhdGggPSB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICByZW1vdmVEaXJlY3RvcnlQYXRoID0gdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNYXJrZXJFbnRyeVByZXNlbnQgPSB0aGlzLmlzTWFya2VyRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVNYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMgPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoe1xuICAgICAgZ2V0RXhwbG9yZXIsXG4gICAgICBpc0VtcHR5LFxuICAgICAgYWRkTWFya2VyLFxuICAgICAgcmVtb3ZlTWFya2VyLFxuICAgICAgYWRkRmlsZVBhdGgsXG4gICAgICByZW1vdmVGaWxlUGF0aCxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGgsXG4gICAgICByZW1vdmVEaXJlY3RvcnlQYXRoLFxuICAgICAgaXNNYXJrZXJFbnRyeVByZXNlbnQsXG4gICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCxcbiAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmV0cmlldmVNYXJrZXJFbnRyeSxcbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLFxuICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgZXhwbG9yZXIpO1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cmllcydcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==