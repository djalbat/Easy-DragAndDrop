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
        var nextEntryBeforeEntry = nextEntry.isBefore(entry),
            found = nextEntryBeforeEntry; ///

        return found;
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
        var found = true; ///

        return found;
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
        var entryName = entry.getName(),
            found = entryName === name;

        return found;
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
          var found = callback(entry);

          return found;
        }
      }) || null; ///;

      return entry;
    }
  }, {
    key: 'findEntryByName',
    value: function findEntryByName(name) {
      var entry = this.findEntry(function (entry) {
        var entryName = entry.getName(),
            found = entryName === name;

        return found;
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
      return {
        isEmpty: this.isEmpty.bind(this),
        isDraggableEntryPresent: this.isDraggableEntryPresent.bind(this),
        isFileNameDraggableEntryPresent: this.isFileNameDraggableEntryPresent.bind(this),
        isDirectoryNameDraggableEntryPresent: this.isDirectoryNameDraggableEntryPresent.bind(this),
        addFileNameDraggableEntry: this.addFileNameDraggableEntry.bind(this),
        removeFileNameDraggableEntry: this.removeFileNameDraggableEntry.bind(this),
        addDirectoryNameDraggableEntry: this.addDirectoryNameDraggableEntry.bind(this),
        removeDirectoryNameDraggableEntry: this.removeDirectoryNameDraggableEntry.bind(this),
        forEachFileNameDraggableEntry: this.forEachFileNameDraggableEntry.bind(this),
        forEachDirectoryNameDraggableEntry: this.forEachDirectoryNameDraggableEntry.bind(this),
        someDirectoryNameDraggableEntry: this.someDirectoryNameDraggableEntry.bind(this),
        findDirectoryNameDraggableEntry: this.findDirectoryNameDraggableEntry.bind(this),
        areEntriesMarked: this.isMarked.bind(this), ///
        entriesAddMarkerEntry: this.addMarkerEntry.bind(this), ///
        entriesRemoveMarkerEntry: this.removeMarkerEntry.bind(this), ///
        entriesRetrieveDraggableEntryPath: this.retrieveDraggableEntryPath.bind(this), ///
        entriesRetrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this), ///
        entriesRetrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this) ///
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsImVudHJ5VHlwZXMiLCJGaWxlTmFtZU1hcmtlckVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkVudHJpZXMiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwibmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZ2V0RXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmUiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwiZHJhZ2dhYmxlRW50cnkiLCJmaW5kRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyRW50cnkiLCJmaW5kTWFya2VyRW50cnkiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm1hcmtlZCIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJmaW5kRW50cnkiLCJuZXh0RW50cnlCZWZvcmVFbnRyeSIsImlzQmVmb3JlIiwiZm91bmQiLCJhcHBlbmQiLCJpbnNlcnRCZWZvcmUiLCJmaW5kRW50cnlCeVR5cGVzIiwiZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsInR5cGVzIiwiZm9yRWFjaCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJ0eXBlc0luY2x1ZGVzRW50cnlUeXBlIiwiaW5jbHVkZXMiLCJzb21lIiwicmVzdWx0IiwiZmluZCIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImJpbmQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImFyZUVudHJpZXNNYXJrZWQiLCJpc01hcmtlZCIsImVudHJpZXNBZGRNYXJrZXJFbnRyeSIsImFkZE1hcmtlckVudHJ5IiwiZW50cmllc1JlbW92ZU1hcmtlckVudHJ5IiwicmVtb3ZlTWFya2VyRW50cnkiLCJlbnRyaWVzUmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJlbnRyaWVzUmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbnRyaWVzUmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGVBQVIsQ0FEbkI7QUFBQSxJQUVNRyxzQkFBc0JILFFBQVEseUJBQVIsQ0FGNUI7QUFBQSxJQUdNSSx5QkFBeUJKLFFBQVEsNEJBQVIsQ0FIL0I7QUFBQSxJQUlNSywyQkFBMkJMLFFBQVEsOEJBQVIsQ0FKakM7O0lBTVFNLE8sR0FBbUJQLEksQ0FBbkJPLE87SUFBU0MsSyxHQUFVUixJLENBQVZRLEs7SUFDVEMsK0IsR0FBb0NQLE8sQ0FBcENPLCtCO0lBQ0FDLGMsR0FBMkZQLFUsQ0FBM0ZP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QXZCLEVBQWdDeUYsVUFBaEMsQ0FBUDtBQUFxRDs7OztFQXZVckVoRyxPOztBQTBVdEJrRyxPQUFPQyxNQUFQLENBQWM1RixPQUFkLEVBQXVCO0FBQ3JCNkYsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETTtBQUZFLENBQXZCOztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCakcsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuLi9lbnRyeVR5cGVzJyksXG4gICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUnKSxcbiAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZScpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gZW50cnlUeXBlcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gPERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIFxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudDsgLy8vXG5cbiAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG4gICAgXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLCAgICBcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlck5hbWU7ICAvLy9cblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIG1hcmtlckVudHJ5ID0gPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXJFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXJFbnRyeSE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlRW50cnkgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSBuZXh0RW50cnlCZWZvcmVFbnRyeTsgLy8vXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcyhmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSB0cnVlOyAvLy9cbiAgXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnkobmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGZpbGVOYW1lLCBGSUxFX05BTUVfVFlQRSkgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKSB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKSB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKSB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcyhmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZm91bmQgPSAoZW50cnlOYW1lID09PSBuYW1lKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGZvdW5kID0gKGVudHJ5TmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaS5lbnRyeScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbiAgXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgcmV0dXJuICh7XG4gICAgICBpc0VtcHR5OiB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50OiB0aGlzLmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LmJpbmQodGhpcyksXG4gICAgICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50OiB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDogdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMucmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk6IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgYXJlRW50cmllc01hcmtlZDogdGhpcy5pc01hcmtlZC5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIGVudHJpZXNBZGRNYXJrZXJFbnRyeTogdGhpcy5hZGRNYXJrZXJFbnRyeS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICBlbnRyaWVzUmVtb3ZlTWFya2VyRW50cnk6IHRoaXMucmVtb3ZlTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICBlbnRyaWVzUmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGg6IHRoaXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZW50cmllc1JldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksICAvLy9cbiAgICAgIGVudHJpZXNSZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcykgLy8vXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19