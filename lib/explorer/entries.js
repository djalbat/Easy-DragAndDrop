'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    entryTypes = require('../entryTypes'),
    FileNameMarkerEntry = require('./entry/marker/fileName'),
    FileNameDraggableEntry = require('./entry/draggable/fileName'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName');

var Element = easy.Element,
    React = easy.React,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES,
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
    key: 'addFileNameDraggableEntry',
    value: function addFileNameDraggableEntry(fileName, explorer) {
      var name = fileName,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);

      return fileNameDraggableEntry;
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
    key: 'isDraggableEntryPresent',
    value: function isDraggableEntryPresent(name) {
      var draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = draggableEntry !== null; ///

      return draggableEntryPresent;
    }
  }, {
    key: 'isFileNameDraggableEntryPresent',
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null; ///

      return fileNameDraggableEntryPresent;
    }
  }, {
    key: 'isDirectoryNameDraggableEntryPresent',
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null; ///

      return directoryNameDraggableEntryPresent;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerName, draggableEntryType) {
      var markerEntry = void 0;

      var name = markerName; ///

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          markerEntry = React.createElement(FileNameMarkerEntry, { name: name });
          break;

        case DIRECTORY_NAME_TYPE:
          markerEntry = React.createElement(DirectoryNameMarkerEntry, { name: name });
          break;
      }

      var entry = markerEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var markerEntry = this.findMarkerEntry();

      markerEntry.remove();
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
    key: 'isMarked',
    value: function isMarked() {
      var markerEntry = this.findMarkerEntry(),
          marked = markerEntry !== null;

      return marked;
    }
  }, {
    key: 'addEntry',
    value: function addEntry(entry) {
      var nextEntry = entry,
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
    key: 'findMarkerEntry',
    value: function findMarkerEntry() {
      var markerEntry = this.findEntryByTypes(function (entry) {
        return true; ///
      }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

      return markerEntry;
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
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();

        if (markedDirectoryNameDraggableEntry !== null) {
          return true;
        }
      });

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveDraggableEntryPath',
    value: function retrieveDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = null;

      this.someEntry(function (entry) {
        if (entry === draggableEntry) {
          ///
          var entryName = entry.getName();

          draggableEntryPath = entryName; ///

          return true;
        }
      });

      if (draggableEntryPath === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var directoryDraggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry !== null) {
          return true;
        }
      });

      return directoryNameDraggableEntryOverlappingDraggableEntry;
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
          isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this),
          isFileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent.bind(this),
          isDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent.bind(this),
          addFileNameDraggableEntry = this.addFileNameDraggableEntry.bind(this),
          removeFileNameDraggableEntry = this.removeFileNameDraggableEntry.bind(this),
          addDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry.bind(this),
          removeDirectoryNameDraggableEntry = this.removeDirectoryNameDraggableEntry.bind(this),
          forEachFileNameDraggableEntry = this.forEachFileNameDraggableEntry.bind(this),
          forEachDirectoryNameDraggableEntry = this.forEachDirectoryNameDraggableEntry.bind(this),
          someDirectoryNameDraggableEntry = this.someDirectoryNameDraggableEntry.bind(this),
          findDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry.bind(this),
          areEntriesMarked = this.isMarked.bind(this),
          ///
      entriesAddMarkerEntry = this.addMarkerEntry.bind(this),
          ///
      entriesRemoveMarkerEntry = this.removeMarkerEntry.bind(this),
          ///
      entriesRetrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          ///
      entriesRetrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          ///
      entriesRetrieveDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this); ///

      return {
        isEmpty: isEmpty,
        isDraggableEntryPresent: isDraggableEntryPresent,
        isFileNameDraggableEntryPresent: isFileNameDraggableEntryPresent,
        isDirectoryNameDraggableEntryPresent: isDirectoryNameDraggableEntryPresent,
        addFileNameDraggableEntry: addFileNameDraggableEntry,
        removeFileNameDraggableEntry: removeFileNameDraggableEntry,
        addDirectoryNameDraggableEntry: addDirectoryNameDraggableEntry,
        removeDirectoryNameDraggableEntry: removeDirectoryNameDraggableEntry,
        forEachFileNameDraggableEntry: forEachFileNameDraggableEntry,
        forEachDirectoryNameDraggableEntry: forEachDirectoryNameDraggableEntry,
        someDirectoryNameDraggableEntry: someDirectoryNameDraggableEntry,
        findDirectoryNameDraggableEntry: findDirectoryNameDraggableEntry,
        areEntriesMarked: areEntriesMarked,
        entriesAddMarkerEntry: entriesAddMarkerEntry,
        entriesRemoveMarkerEntry: entriesRemoveMarkerEntry,
        entriesRetrieveDraggableEntryPath: entriesRetrieveDraggableEntryPath,
        entriesRetrieveMarkedDirectoryNameDraggableEntry: entriesRetrieveMarkedDirectoryNameDraggableEntry,
        entriesRetrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: entriesRetrieveDirectoryNameDraggableEntryOverlappingDraggableEntry
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkVudHJpZXMiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwibmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmUiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm1hcmtlZCIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJmaW5kRW50cnkiLCJuZXh0RW50cnlCZWZvcmVFbnRyeSIsImlzQmVmb3JlIiwiYXBwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiZmluZEVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlcyIsInNvbWVFbnRyeUJ5VHlwZXMiLCJ0eXBlcyIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwidHlwZXNJbmNsdWRlc0VudHJ5VHlwZSIsImluY2x1ZGVzIiwic29tZSIsInJlc3VsdCIsImZpbmQiLCJjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJiaW5kIiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJhcmVFbnRyaWVzTWFya2VkIiwiaXNNYXJrZWQiLCJlbnRyaWVzQWRkTWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeSIsImVudHJpZXNSZW1vdmVNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiZW50cmllc1JldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiZW50cmllc1JldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cmllc1JldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUUsYUFBYUYsUUFBUSxlQUFSLENBRG5CO0FBQUEsSUFFTUcsc0JBQXNCSCxRQUFRLHlCQUFSLENBRjVCO0FBQUEsSUFHTUkseUJBQXlCSixRQUFRLDRCQUFSLENBSC9CO0FBQUEsSUFJTUssMkJBQTJCTCxRQUFRLDhCQUFSLENBSmpDOztJQU1RTSxPLEdBQW1CUCxJLENBQW5CTyxPO0lBQVNDLEssR0FBVVIsSSxDQUFWUSxLO0lBQ1RDLCtCLEdBQW9DUCxPLENBQXBDTywrQjtJQUNBQyxjLEdBQTJGUCxVLENBQTNGTyxjO0lBQWdC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QndJOztBQUV0SixhQUFRO0FBQ05sRCx3QkFETTtBQUVObUQsd0RBRk07QUFHTkMsd0VBSE07QUFJTkMsa0ZBSk07QUFLTkMsNERBTE07QUFNTkMsa0VBTk07QUFPTkMsc0VBUE07QUFRTkMsNEVBUk07QUFTTkMsb0VBVE07QUFVTkMsOEVBVk07QUFXTmpDLHdFQVhNO0FBWU41Qix3RUFaTTtBQWFOOEQsMENBYk07QUFjTkUsb0RBZE07QUFlTkUsMERBZk07QUFnQk5FLDRFQWhCTTtBQWlCTkMsMEdBakJNO0FBa0JOQztBQWxCTSxPQUFSO0FBb0JEOzs7bUNBRXFCQyxVLEVBQVk7QUFBRSxhQUFPL0YsUUFBUWdHLGNBQVIsQ0FBdUJ6RixPQUF2QixFQUFnQ3dGLFVBQWhDLENBQVA7QUFBcUQ7Ozs7RUE3V3JFL0YsTzs7QUFnWHRCaUcsT0FBT0MsTUFBUCxDQUFjM0YsT0FBZCxFQUF1QjtBQUNyQjRGLFdBQVMsSUFEWTtBQUVyQkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE07QUFGRSxDQUF2Qjs7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQmhHLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi4vZW50cnlUeXBlcycpLFxuICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2ZpbGVOYW1lJyksXG4gICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyB9ID0gb3B0aW9ucyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IGVudHJ5VHlwZXM7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAvLy9cblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcbiAgICBcbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksICAgIFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBtYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIG1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCk7XG5cbiAgICBtYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyRW50cnkhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpIH1cblxuICBmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRklMRV9OQU1FX1RZUEUpIH1cblxuICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZGlyZWN0b3J5TmFtZSwgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpIH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGNhbGxiYWNrKSB8fCBudWxsOyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpLmVudHJ5JyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuICBcbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBpc0VtcHR5ID0gdGhpcy5pc0VtcHR5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIHJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgYXJlRW50cmllc01hcmtlZCA9IHRoaXMuaXNNYXJrZWQuYmluZCh0aGlzKSwgLy8vXG5cdFx0XHRcdCAgZW50cmllc0FkZE1hcmtlckVudHJ5ID0gdGhpcy5hZGRNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAgLy8vXG5cdFx0XHRcdCAgZW50cmllc1JlbW92ZU1hcmtlckVudHJ5ID0gdGhpcy5yZW1vdmVNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAvLy9cblx0XHRcdFx0ICBlbnRyaWVzUmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksICAvLy9cblx0XHRcdFx0ICBlbnRyaWVzUmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksICAvLy9cblx0XHRcdFx0ICBlbnRyaWVzUmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKTsgLy8vXG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGlzRW1wdHksXG4gICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCxcbiAgICAgIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQsXG4gICAgICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQsXG4gICAgICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgYXJlRW50cmllc01hcmtlZCxcbiAgICAgIGVudHJpZXNBZGRNYXJrZXJFbnRyeSxcbiAgICAgIGVudHJpZXNSZW1vdmVNYXJrZXJFbnRyeSxcbiAgICAgIGVudHJpZXNSZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCxcbiAgICAgIGVudHJpZXNSZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGVudHJpZXNSZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2VudHJpZXMnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=