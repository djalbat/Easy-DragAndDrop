'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    entryTypes = require('./entryTypes'),
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
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

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
    value: function addDirectoryNameDraggableEntry(directoryName, collapsed, DirectoryNameDraggableEntry) {
      var name = directoryName,
          explorer = this.explorer,
          ///
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
      var topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (topmostDirectoryNameEntry !== null) {
        if (filePathWithoutTopmostDirectoryName !== null) {
          var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

          if (topmostDirectoryName === topmostDirectoryNameEntryName) {
            filePath = filePathWithoutTopmostDirectoryName; ///

            topmostDirectoryNameEntry.addFilePath(filePath);
          }
        }
      } else {
        if (topmostDirectoryName !== null) {
          var directoryName = topmostDirectoryName; ///

          var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

          if (directoryNameDraggableEntry === null) {
            var collapsed = true,
                ///
            DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry();

            directoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(directoryName, collapsed, DirectoryNameDraggableEntry);
          }

          var _filePath = filePathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry.addFilePath(_filePath);
        } else {
          var fileName = filePath; ///

          this.addFileNameDraggableEntry(fileName);
        }
      }
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

      var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (topmostDirectoryNameEntry !== null) {
        if (directoryPathWithoutTopmostDirectoryName !== null) {
          var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

          if (topmostDirectoryName === topmostDirectoryNameEntryName) {
            directoryPath = directoryPathWithoutTopmostDirectoryName; ///

            topmostDirectoryNameEntry.addDirectoryPath(directoryPath, collapsed);
          }
        }
      } else {
        var directoryName = topmostDirectoryName !== null ? topmostDirectoryName : directoryPath,
            directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

        if (directoryNameDraggableEntry === null) {
          var DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry();

          this.addDirectoryNameDraggableEntry(directoryName, collapsed, DirectoryNameDraggableEntry);
        }

        if (directoryPathWithoutTopmostDirectoryName !== null) {
          var _directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          this.addDirectoryPath(_directoryPath, collapsed);
        }
      }
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
    key: 'getEntries',
    value: function getEntries() {
      var childEntryListItemElements = this.getChildElements('li.entry'),
          entries = childEntryListItemElements; ///

      return entries;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5Iiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsInBhdGhVdGlsaXRpZXMiLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJleHBsb3JlciIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJuYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZW50cnkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5IiwiZmluZEVudHJ5IiwibmV4dEVudHJ5QmVmb3JlRW50cnkiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsIm1hcmtlckVudHJ5TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInR5cGUiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiYWRkRW50cnkiLCJyZXRyaWV2ZU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRGaWxlUGF0aCIsImdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVGaWxlUGF0aCIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImZpbmRFbnRyeUJ5VHlwZXMiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNNYXJrZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhzIiwiZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImZpbmREcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJzdWJFbnRyaWVzIiwic3ViRW50cnkiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnSW50b1N1YkRpcmVjdG9yaWVzIiwibm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJyZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwidHlwZXMiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInR5cGVzSW5jbHVkZXNFbnRyeVR5cGUiLCJpbmNsdWRlcyIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZ2V0RXhwbG9yZXIiLCJiaW5kIiwicmVtb3ZlTWFya2VyIiwiaXNNYXJrZXJFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsVUFBVUYsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUcsYUFBYUgsUUFBUSxjQUFSLENBRG5CO0FBQUEsSUFFTUksc0JBQXNCSixRQUFRLHlCQUFSLENBRjVCO0FBQUEsSUFHTUsseUJBQXlCTCxRQUFRLDRCQUFSLENBSC9CO0FBQUEsSUFJTU0sMkJBQTJCTixRQUFRLDhCQUFSLENBSmpDOztJQU1RTyxPLEdBQW1CUixJLENBQW5CUSxPO0lBQVNDLEssR0FBVVQsSSxDQUFWUyxLO0lBQ1RDLGEsR0FBa0JSLFMs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Q0FkckM7QUFBQSxVQWVPdkIsNENBQTRDLEtBQUtBLHlDQUFMLENBQStDdUIsSUFBL0MsQ0FBb0QsSUFBcEQsQ0FmbkQ7QUFBQSxVQWdCT2pCLHlFQUF5RSxLQUFLQSxzRUFBTCxDQUE0RWlCLElBQTVFLENBQWlGLElBQWpGLENBaEJoRjs7QUFrQkMsYUFBUTtBQUNORCxnQ0FETTtBQUVOdEQsd0JBRk07QUFHTmhCLDRCQUhNO0FBSU53RSxrQ0FKTTtBQUtOaEUsZ0NBTE07QUFNTkksc0NBTk07QUFPTk8sMENBUE07QUFRTkMsZ0RBUk07QUFTTnFELGtEQVRNO0FBVU5DLHdEQVZNO0FBV05uRixnREFYTTtBQVlOOEMsNENBWk07QUFhTkcsc0RBYk07QUFjTkUsOERBZE07QUFlTkksZ0VBZk07QUFnQk5FLDRGQWhCTTtBQWlCTk07QUFqQk0sT0FBUjtBQW1CRDs7O21DQUVxQnFCLFUsRUFBWTtBQUMxQixVQUFFdkgsUUFBRixHQUFldUgsVUFBZixDQUFFdkgsUUFBRjtBQUFBLFVBQ0FDLE9BREEsR0FDVWQsUUFBUXFJLGNBQVIsQ0FBdUIxSCxPQUF2QixFQUFnQ3lILFVBQWhDLEVBQTRDdkgsUUFBNUMsQ0FEVjs7O0FBR04sYUFBT0MsT0FBUDtBQUNEOzs7O0VBem9CbUJkLE87O0FBNG9CdEJzSSxPQUFPQyxNQUFQLENBQWM1SCxPQUFkLEVBQXVCO0FBQ3JCNkgsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQUZFLENBQXZCOztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCakksT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi9lbnRyeVR5cGVzJyksXG4gICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUnKSxcbiAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZScpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zLFxuICAgICAgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgaXNNYXJrZXJFbnRyeVByZXNlbnQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlckVudHJ5UHJlc2VudCA9IChtYXJrZXJFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRHJhZ2dhYmxlRW50cnkobmFtZSksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LCAgLy8vXG4gICAgICAgICAgcHJldmlvdXNFbnRyeSA9IHRoaXMuZmluZEVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlRW50cnkgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuXG4gICAgICAgICAgICBpZiAobmV4dEVudHJ5QmVmb3JlRW50cnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudHJ5Lmluc2VydEJlZm9yZShwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcblxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJFbnRyeU5hbWUsIC8vL1xuICAgICAgICB0eXBlID0gZHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXJFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICBtYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmV4cGxvcmVyLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZXhwbG9yZXIsIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5TmFtZSA9IG1hcmtlckVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZTsgIC8vL1xuXG4gICAgICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsIC8vL1xuICAgICAgICAgICAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZXhwbG9yZXIuZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aDsgIC8vL1xuXG4gICAgICAgIHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCxcbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmV4cGxvcmVyLmdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgIHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgICBjb25zdCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcygoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgLy8vXG4gICAgICAgICAgfSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNNYXJrZWQoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlckVudHJ5KCkge1xuICAgIGxldCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCk7XG5cbiAgICBpZiAobWFya2VyRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICBpZiAobWFya2VyRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZGlyZWN0b3J5UGF0aHMucHVzaChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5maW5kRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7ZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZX0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKHN1YkVudHJpZXMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKHN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgbGV0IGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBjb25zdCBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnSW50b1N1YkRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGZpbGVOYW1lLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZGlyZWN0b3J5TmFtZSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcygoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoY2FsbGJhY2spIHx8IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGkuZW50cnknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG4gIFxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRW1wdHkgPSB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGRNYXJrZXIgPSB0aGlzLmFkZE1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRGlyZWN0b3J5UGF0aCA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVGaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyA9IHRoaXMucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFeHBsb3JlcixcbiAgICAgIGlzRW1wdHksXG4gICAgICBhZGRNYXJrZXIsXG4gICAgICByZW1vdmVNYXJrZXIsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgcmV0cmlldmVNYXJrZXJFbnRyeSxcbiAgICAgIHJldHJpZXZlRmlsZVBhdGhzLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLFxuICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgZXhwbG9yZXIpO1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cmllcydcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==