'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    Entry = require('./entry'),
    FileNameMarkerEntry = require('./entry/marker/fileName'),
    FileNameDraggableEntry = require('./entry/draggable/fileName'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName');

var Element = easy.Element,
    React = easy.React,
    types = Entry.types,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var Entries = function (_Element) {
  _inherits(Entries, _Element);

  function Entries(selector, DirectoryNameDraggableEntry) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, selector));

    _this.DirectoryNameDraggableEntry = DirectoryNameDraggableEntry;
    return _this;
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
    value: function addDirectoryNameDraggableEntry(directoryName, explorer, collapsed) {
      var name = directoryName,
          directoryNameDraggableEntry = React.createElement(this.DirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed }),
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
    key: 'isMarked',
    value: function isMarked() {
      var markerEntry = this.findMarkerEntry(),
          marked = markerEntry !== null;

      return marked;
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
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var DirectoryNameDraggableEntry = properties.DirectoryNameDraggableEntry,
          entries = Element.fromProperties(Entries, properties, DirectoryNameDraggableEntry);


      return entries;
    }
  }]);

  return Entries;
}(Element);

Object.assign(Entries, {
  tagName: 'ul',
  defaultProperties: {
    className: 'entries'
  },
  ignoredProperties: ['DirectoryNameDraggableEntry']
});

module.exports = Entries;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJ0eXBlcyIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkVudHJpZXMiLCJzZWxlY3RvciIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lIiwiZXhwbG9yZXIiLCJuYW1lIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImVudHJ5IiwiYWRkRW50cnkiLCJkaXJlY3RvcnlOYW1lIiwiY29sbGFwc2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXRFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsInJlbW92ZSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkcmFnZ2FibGVFbnRyeSIsImZpbmREcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlck5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXJFbnRyeSIsImZpbmRNYXJrZXJFbnRyeSIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsImZpbmRFbnRyeSIsIm5leHRFbnRyeUJlZm9yZUVudHJ5IiwiaXNCZWZvcmUiLCJmb3VuZCIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsImZpbmRFbnRyeUJ5VHlwZXMiLCJmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInNvbWVFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJjYWxsYmFjayIsImZvckVhY2hFbnRyeUJ5VHlwZXMiLCJzb21lRW50cnlCeVR5cGVzIiwiZm9yRWFjaCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJ0eXBlc0luY2x1ZGVzRW50cnlUeXBlIiwiaW5jbHVkZXMiLCJzb21lIiwicmVzdWx0IiwiZmluZCIsImNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxl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QyxVQUFMLEVBQWhCO0FBQUEsVUFDTXpCLFFBQVF3QixRQUFRb0MsSUFBUixDQUFhVixRQUFiLEtBQTBCLElBRHhDLENBRGtCLENBRTRCOztBQUU5QyxhQUFPbEQsS0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFNNkQsNkJBQTZCLEtBQUtDLGdCQUFMLENBQXNCLFVBQXRCLENBQW5DO0FBQUEsVUFDTXRDLFVBQVVxQywwQkFEaEIsQ0FEVyxDQUVrQzs7QUFFN0MsYUFBT3JDLE9BQVA7QUFDRDs7O21DQUVxQnVDLFUsRUFBWTtBQUMxQixVQUFFcEUsMkJBQUYsR0FBa0NvRSxVQUFsQyxDQUFFcEUsMkJBQUY7QUFBQSxVQUNBNkIsT0FEQSxHQUNVdkMsUUFBUStFLGNBQVIsQ0FBdUJ2RSxPQUF2QixFQUFnQ3NFLFVBQWhDLEVBQTRDcEUsMkJBQTVDLENBRFY7OztBQUdOLGFBQU82QixPQUFQO0FBQ0Q7Ozs7RUEzVG1CdkMsTzs7QUE4VHRCZ0YsT0FBT0MsTUFBUCxDQUFjekUsT0FBZCxFQUF1QjtBQUNyQjBFLFdBQVMsSUFEWTtBQUVyQkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRTtBQUtyQkMscUJBQW1CLENBQ2pCLDZCQURpQjtBQUxFLENBQXZCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCL0UsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2ZpbGVOYW1lJyksXG4gICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgdHlwZXMgfSA9IEVudHJ5LFxuICAgICAgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IDx0aGlzLkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIFxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudDsgLy8vXG5cbiAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG4gICAgXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLCAgICBcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlck5hbWU7ICAvLy9cblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIG1hcmtlckVudHJ5ID0gPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXJFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG4gIFxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlckVudHJ5IT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuICBcbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KSxcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gbmV4dEVudHJ5QmVmb3JlRW50cnk7IC8vL1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudHJ5Lmluc2VydEJlZm9yZShwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdHJ1ZTsgLy8vXG4gIFxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpIH1cblxuICBmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRklMRV9OQU1FX1RZUEUpIH1cblxuICBmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZGlyZWN0b3J5TmFtZSwgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpIH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGZvdW5kID0gKGVudHJ5TmFtZSA9PT0gbmFtZSk7XG4gICAgICBcbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsOyAvLy87XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lKG5hbWUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBmb3VuZCA9IChlbnRyeU5hbWUgPT09IG5hbWUpO1xuXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoY2FsbGJhY2spIHx8IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGkuZW50cnknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRFbnRyeUxpc3RJdGVtRWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBlbnRyaWVzID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpO1xuICAgIFxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2VudHJpZXMnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==