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

  function Entries() {
    _classCallCheck(this, Entries);

    return _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).apply(this, arguments));
  }

  _createClass(Entries, [{
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
    value: function addFileNameDraggableEntry(fileName, explorer) {
      var name = fileName,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);

      return fileNameDraggableEntry;
    }
  }, {
    key: 'removeFileNameDraggableEntry',
    value: function removeFileNameDraggableEntry(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES),
          removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent; ///

      fileNameDraggableEntry.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'addDirectoryNameDraggableEntry',
    value: function addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry) {
      var name = directoryName,
          directoryNameDraggableEntry = React.createElement(DirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeDirectoryNameDraggableEntry',
    value: function removeDirectoryNameDraggableEntry(directoryName) {
      var removeEmptyParentDirectories = false;

      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

      if (directoryNameDraggableEntryEmpty) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

        removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent; ///

        directoryNameDraggableEntry.remove();
      }

      return removeEmptyParentDirectories;
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
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry) {
          var dragIntoSubDirectories = true;

          var directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry = directoryNameDraggableEntry.isTopmostDirectoryNameDraggableEntry();

          if (directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry) {
            var topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry,
                ///
            explorer = topmostDirectoryNameDraggableEntry.getExplorer(),
                noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

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
      var isEmpty = this.isEmpty.bind(this),
          isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this),
          isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this),
          isFileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent.bind(this),
          isDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent.bind(this),
          addMarker = this.addMarker.bind(this),
          removeMarker = this.removeMarker.bind(this),
          addFileNameDraggableEntry = this.addFileNameDraggableEntry.bind(this),
          removeFileNameDraggableEntry = this.removeFileNameDraggableEntry.bind(this),
          addDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry.bind(this),
          removeDirectoryNameDraggableEntry = this.removeDirectoryNameDraggableEntry.bind(this),
          forEachFileNameDraggableEntry = this.forEachFileNameDraggableEntry.bind(this),
          forEachDirectoryNameDraggableEntry = this.forEachDirectoryNameDraggableEntry.bind(this),
          someDirectoryNameDraggableEntry = this.someDirectoryNameDraggableEntry.bind(this),
          findDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry.bind(this),
          retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this),
          retrieveFilePaths = this.retrieveFilePaths.bind(this),
          retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this),
          retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          retrieveDraggableSubEntries = this.retrieveDraggableSubEntries.bind(this),
          retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this);

      return {
        isEmpty: isEmpty,
        isMarkerEntryPresent: isMarkerEntryPresent,
        isDraggableEntryPresent: isDraggableEntryPresent,
        isFileNameDraggableEntryPresent: isFileNameDraggableEntryPresent,
        isDirectoryNameDraggableEntryPresent: isDirectoryNameDraggableEntryPresent,
        addMarker: addMarker,
        removeMarker: removeMarker,
        addFileNameDraggableEntry: addFileNameDraggableEntry,
        removeFileNameDraggableEntry: removeFileNameDraggableEntry,
        addDirectoryNameDraggableEntry: addDirectoryNameDraggableEntry,
        removeDirectoryNameDraggableEntry: removeDirectoryNameDraggableEntry,
        forEachFileNameDraggableEntry: forEachFileNameDraggableEntry,
        forEachDirectoryNameDraggableEntry: forEachDirectoryNameDraggableEntry,
        someDirectoryNameDraggableEntry: someDirectoryNameDraggableEntry,
        findDirectoryNameDraggableEntry: findDirectoryNameDraggableEntry,
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
      return Element.fromProperties(Entries, properties);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5Iiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsInBhdGhVdGlsaXRpZXMiLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJFbnRyaWVzIiwiZW50cmllcyIsImdldEVudHJpZXMiLCJlbnRyaWVzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJtYXJrZXJFbnRyeSIsImZpbmRNYXJrZXJFbnRyeSIsIm1hcmtlckVudHJ5UHJlc2VudCIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeSIsImZpbmREcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImZpbGVOYW1lIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJkaXJlY3RvcnlOYW1lIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJlbnRyeSIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJmaW5kRW50cnkiLCJuZXh0RW50cnlCZWZvcmVFbnRyeSIsImlzQmVmb3JlIiwiYXBwZW5kIiwiaW5zZXJ0QmVmb3JlIiwibWFya2VyRW50cnlOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwidHlwZSIsImZpbGVOYW1lTWFya2VyRW50cnkiLCJkaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJhZGRFbnRyeSIsInJldHJpZXZlTWFya2VyRW50cnkiLCJyZW1vdmUiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwiY29sbGFwc2VkIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwibWFya2VyRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbmRFbnRyeUJ5VHlwZXMiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzTWFya2VkIiwiZmlsZVBhdGhzIiwiZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJmaWxlUGF0aCIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVGaWxlUGF0aHMiLCJkaXJlY3RvcnlQYXRocyIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImZpbmREcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUiLCJzdWJFbnRyaWVzIiwic3ViRW50cnkiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnSW50b1N1YkRpcmVjdG9yaWVzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwicmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlcyIsInNvbWVFbnRyeUJ5VHlwZXMiLCJmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyIsInR5cGVzIiwiZm9yRWFjaCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJ0eXBlc0luY2x1ZGVzRW50cnlUeXBlIiwiaW5jbHVkZXMiLCJzb21lIiwicmVzdWx0IiwiZmluZCIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImJpbmQiLCJpc01hcmtlckVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsInJlbW92ZU1hcmtlciIsImFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxVQUFVRixRQUFRLFdBQVIsQ0FBaEI7QUFBQSxJQUNNRyxhQUFhSCxRQUFRLGNBQVIsQ0FEbkI7QUFBQSxJQUVNSSxzQkFBc0JKLFFBQVEseUJBQVIsQ0FGNUI7QUFBQSxJQUdNSyx5QkFBeUJMLFFBQVEsNEJBQVIsQ0FIL0I7QUFBQSxJQUlNTSwyQkFBMkJOLFFBQVEsOEJBQVIsQ0FKakM7O0lBTVFPLE8sR0FBbUJSLEksQ0FBbkJRLE87SUFBU0MsSyxHQUFVVCxJLENBQVZTLEs7SUFDVEMsYSxHQUFrQlIsUyxDQUFsQlEsYTtJQUNBQywrQixHQUFzRVIsTyxDQUF0RVEsK0I7SUFBaUNDLGdDLEdBQXFDVCxPLENBQXJDUyxnQztJQUNqQ0MsNEIsR0FBMEVILGEsQ0FBMUVHLDRCO0lBQThCQyx1QyxHQUE0Q0osYSxDQUE1Q0ksdUM7SUFD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RixDQXJCaEY7O0FBdUJDLGFBQVE7QUFDTjVELHdCQURNO0FBRU42RCxrREFGTTtBQUdOQyx3REFITTtBQUlOQyx3RUFKTTtBQUtOQyxrRkFMTTtBQU1OMUQsNEJBTk07QUFPTjJELGtDQVBNO0FBUU5DLDREQVJNO0FBU05DLGtFQVRNO0FBVU5DLHNFQVZNO0FBV05DLDRFQVhNO0FBWU5uRCxvRUFaTTtBQWFOSyw4RUFiTTtBQWNOVCx3RUFkTTtBQWVOeEMsd0VBZk07QUFnQk5nQixnREFoQk07QUFpQk5rQyw0Q0FqQk07QUFrQk5JLHNEQWxCTTtBQW1CTkUsOERBbkJNO0FBb0JOSSxnRUFwQk07QUFxQk5FLDRGQXJCTTtBQXNCTlE7QUF0Qk0sT0FBUjtBQXdCRDs7O21DQUVxQjBCLFUsRUFBWTtBQUFFLGFBQU85SCxRQUFRK0gsY0FBUixDQUF1QnBILE9BQXZCLEVBQWdDbUgsVUFBaEMsQ0FBUDtBQUFxRDs7OztFQXpmckU5SCxPOztBQTRmdEJnSSxPQUFPQyxNQUFQLENBQWN0SCxPQUFkLEVBQXVCO0FBQ3JCdUgsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQUZFLENBQXZCOztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCM0gsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi9lbnRyeVR5cGVzJyksXG4gICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUnKSxcbiAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZScpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMsIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zLFxuICAgICAgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgaXNNYXJrZXJFbnRyeVByZXNlbnQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlckVudHJ5UHJlc2VudCA9IChtYXJrZXJFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRHJhZ2dhYmxlRW50cnkobmFtZSksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LCAgLy8vXG4gICAgICAgICAgcHJldmlvdXNFbnRyeSA9IHRoaXMuZmluZEVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgIHR5cGUgPSBkcmFnZ2FibGVFbnRyeVR5cGU7ICAvLy9cblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgPEZpbGVOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBmaWxlTmFtZU1hcmtlckVudHJ5OyAgLy8vXG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5OyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAvLy9cblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIGlmIChtYXJrZXJFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7ZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZX0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKHN1YkVudHJpZXMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgbGV0IGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGNhbGxiYWNrKSB8fCBudWxsOyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpLmVudHJ5JyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuICBcbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBpc0VtcHR5ID0gdGhpcy5pc0VtcHR5LmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNYXJrZXJFbnRyeVByZXNlbnQgPSB0aGlzLmlzTWFya2VyRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkTWFya2VyID0gdGhpcy5hZGRNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICByZW1vdmVNYXJrZXIgPSB0aGlzLnJlbW92ZU1hcmtlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGlzRW1wdHksXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCxcbiAgICAgIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2VudHJpZXMnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=