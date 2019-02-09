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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkVudHJpZXMiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwibmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmUiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm1hcmtlZCIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJmaW5kRW50cnkiLCJuZXh0RW50cnlCZWZvcmVFbnRyeSIsImlzQmVmb3JlIiwiYXBwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiZmluZEVudHJ5QnlUeXBlcyIsImZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlcyIsInNvbWVFbnRyeUJ5VHlwZXMiLCJ0eXBlcyIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwidHlwZXNJbmNsdWRlc0VudHJ5VHlwZSIsImluY2x1ZGVzIiwic29tZSIsInJlc3VsdCIsImZpbmQiLCJjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJiaW5kIiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJhcmVFbnRyaWVzTWFya2VkIiwiaXNNYXJrZWQiLCJlbnRyaWVzQWRkTWFya2VyRW50cnkiLCJhZGRNYXJrZXJFbnRyeSIsImVudHJpZXNSZW1vdmVNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiZW50cmllc1JldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiZW50cmllc1JldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cmllc1JldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUUsYUFBYUYsUUFBUSxlQUFSLENBRG5CO0FBQUEsSUFFTUcsc0JBQXNCSCxRQUFRLHlCQUFSLENBRjVCO0FBQUEsSUFHTUkseUJBQXlCSixRQUFRLDRCQUFSLENBSC9CO0FBQUEsSUFJTUssMkJBQTJCTCxRQUFRLDhCQUFSLENBSmpDOztJQU1RTSxPLEdBQW1CUCxJLENBQW5CTyxPO0lBQVNDLEssR0FBVVIsSSxDQUFWUSxLO0lBQ1RDLCtCLEdBQW9DUCxPLENBQXBDTywrQjtJQUNBQyxjLEdBQTJGUCxVLENBQTNGTyxjO0lBQWdC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a0J3STs7QUFFdEosYUFBUTtBQUNObEQsd0JBRE07QUFFTm1ELHdEQUZNO0FBR05DLHdFQUhNO0FBSU5DLGtGQUpNO0FBS05DLDREQUxNO0FBTU5DLGtFQU5NO0FBT05DLHNFQVBNO0FBUU5DLDRFQVJNO0FBU05DLG9FQVRNO0FBVU5DLDhFQVZNO0FBV05qQyx3RUFYTTtBQVlONUIsd0VBWk07QUFhTjhELDBDQWJNO0FBY05FLG9EQWRNO0FBZU5FLDBEQWZNO0FBZ0JORSw0RUFoQk07QUFpQk5DLDBHQWpCTTtBQWtCTkM7QUFsQk0sT0FBUjtBQW9CRDs7O21DQUVxQkMsVSxFQUFZO0FBQUUsYUFBTy9GLFFBQVFnRyxjQUFSLENBQXVCekYsT0FBdkIsRUFBZ0N3RixVQUFoQyxDQUFQO0FBQXFEOzs7O0VBN1ZyRS9GLE87O0FBZ1d0QmlHLE9BQU9DLE1BQVAsQ0FBYzNGLE9BQWQsRUFBdUI7QUFDckI0RixXQUFTLElBRFk7QUFFckJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNO0FBRkUsQ0FBdkI7O0FBT0FDLE9BQU9DLE9BQVAsR0FBaUJoRyxPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4uL2VudHJ5VHlwZXMnKSxcbiAgICAgIEZpbGVOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlTmFtZScpLFxuICAgICAgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lJyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgICBcbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAvLy9cblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcbiAgICBcbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksICAgIFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlckVudHJ5IT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgICAgcHJldmlvdXNFbnRyeSA9IHRoaXMuZmluZEVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcyhmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFKSB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKSB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGRpcmVjdG9yeU5hbWUsIERJUkVDVE9SWV9OQU1FX1RZUEUpIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKSB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpIH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSwgLi4udHlwZXMpO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaS5lbnRyeScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbiAgXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG5cdFx0XHRcdCAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuXHRcdFx0XHQgIGFyZUVudHJpZXNNYXJrZWQgPSB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksIC8vL1xuXHRcdFx0XHQgIGVudHJpZXNBZGRNYXJrZXJFbnRyeSA9IHRoaXMuYWRkTWFya2VyRW50cnkuYmluZCh0aGlzKSwgIC8vL1xuXHRcdFx0XHQgIGVudHJpZXNSZW1vdmVNYXJrZXJFbnRyeSA9IHRoaXMucmVtb3ZlTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG5cdFx0XHRcdCAgZW50cmllc1JldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLCAgLy8vXG5cdFx0XHRcdCAgZW50cmllc1JldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLCAgLy8vXG5cdFx0XHRcdCAgZW50cmllc1JldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7IC8vL1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBpc0VtcHR5LFxuICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQsXG4gICAgICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIGFyZUVudHJpZXNNYXJrZWQsXG4gICAgICBlbnRyaWVzQWRkTWFya2VyRW50cnksXG4gICAgICBlbnRyaWVzUmVtb3ZlTWFya2VyRW50cnksXG4gICAgICBlbnRyaWVzUmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICBlbnRyaWVzUmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICBlbnRyaWVzUmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19