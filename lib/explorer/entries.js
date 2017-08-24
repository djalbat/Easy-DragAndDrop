'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    Entry = require('./entry'),
    FileNameMarkerEntry = require('./entry/marker/fileName'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName'),
    FileNameDraggableEntry = require('./draggableEntry/fileName');

var Element = easy.Element,
    React = easy.React,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES;

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
    value: function addFileNameDraggableEntry(fileName, explorer, recognised) {
      var name = fileName,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer, recognised: recognised }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectoryNameDraggableEntry',
    value: function addDirectoryNameDraggableEntry(directoryName, explorer, collapsed) {
      var name = directoryName,
          directoryNameDraggableEntry = React.createElement(this.DirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);
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
        case Entry.types.FILE_NAME:
          markerEntry = React.createElement(FileNameMarkerEntry, { name: name });
          break;

        case Entry.types.DIRECTORY_NAME:
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
      }, Entry.types.MARKER);

      return markerEntry;
    }
  }, {
    key: 'findDraggableEntry',
    value: function findDraggableEntry(name) {
      return this.findEntryByNameAndTypes(name, Entry.types.FILE_NAME, Entry.types.DIRECTORY_NAME);
    }
  }, {
    key: 'findFileNameDraggableEntry',
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndTypes(fileName, Entry.types.FILE_NAME);
    }
  }, {
    key: 'findDirectoryNameDraggableEntry',
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndTypes(directoryName, Entry.types.DIRECTORY_NAME);
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
      this.forEachEntryByTypes(callback, Entry.types.FILE_NAME);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, Entry.types.DIRECTORY_NAME);
    }
  }, {
    key: 'someFileNameDraggableEntry',
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, Entry.types.FILE_NAME);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, Entry.types.DIRECTORY_NAME);
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
      var childListElements = this.getChildElements('li'),
          entries = childListElements; ///

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwiRW50cmllcyIsInNlbGVjdG9yIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWUiLCJleHBsb3JlciIsInJlY29nbmlzZWQiLCJuYW1lIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImVudHJ5IiwiYWRkRW50cnkiLCJkaXJlY3RvcnlOYW1lIiwiY29sbGFwc2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXRFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsInJlbW92ZSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJkcmFnZ2FibGVFbnRyeSIsImZpbmREcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlck5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXJFbnRyeSIsInR5cGVzIiwiRklMRV9OQU1FIiwiRElSRUNUT1JZX05BTUUiLCJmaW5kTWFya2VyRW50cnkiLCJtYXJrZWQiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJmaW5kRW50cnkiLCJuZXh0RW50cnlCZWZvcmVFbnRyeSIsImlzQmVmb3JlIiwiZm91bmQiLCJhcHBlbmQiLCJpbnNlcnRCZWZvcmUiLCJmaW5kRW50cnlCeVR5cGVzIiwiTUFSS0VSIiwiZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGVzIiwic29tZUVudHJ5QnlUeXBlcyIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwidHlwZXNJbmNsdWRlc0VudHJ5VHlwZSIsImluY2x1ZGVzIiwic29tZSIsInJlc3VsdCIsImZpbmQiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEs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O0FBQUEsVUFDTTVCLFFBQVEyQixRQUFRcUMsSUFBUixDQUFhVixRQUFiLEtBQTBCLElBRHhDLENBRGtCLENBRTRCOztBQUU5QyxhQUFPdEQsS0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFNaUUsb0JBQW9CLEtBQUtDLGdCQUFMLENBQXNCLElBQXRCLENBQTFCO0FBQUEsVUFDTXZDLFVBQVVzQyxpQkFEaEIsQ0FEVyxDQUV5Qjs7QUFFcEMsYUFBT3RDLE9BQVA7QUFDRDs7O21DQUVxQndDLFUsRUFBWTtBQUMxQixVQUFFekUsMkJBQUYsR0FBa0N5RSxVQUFsQyxDQUFFekUsMkJBQUY7QUFBQSxVQUNBaUMsT0FEQSxHQUNVdEMsUUFBUStFLGNBQVIsQ0FBdUI1RSxPQUF2QixFQUFnQzJFLFVBQWhDLEVBQTRDekUsMkJBQTVDLENBRFY7OztBQUdOLGFBQU9pQyxPQUFQO0FBQ0Q7Ozs7RUF2VG1CdEMsTzs7QUEwVHRCZ0YsT0FBT0MsTUFBUCxDQUFjOUUsT0FBZCxFQUF1QjtBQUNyQitFLFdBQVMsSUFEWTtBQUVyQkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRTtBQUtyQkMscUJBQW1CLENBQ2pCLDZCQURpQjtBQUxFLENBQXZCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCcEYsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2ZpbGVOYW1lJyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyksXG4gICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIsIHJlY29nbmlzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gcmVjb2duaXNlZD17cmVjb2duaXNlZH0gLz4sXG4gICAgICAgICAgZW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSA8dGhpcy5EaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gLz4sXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICBcbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAvLy9cblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcbiAgICBcbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksICAgIFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRTpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyRW50cnkhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG4gIFxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlRW50cnkgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSBuZXh0RW50cnlCZWZvcmVFbnRyeTsgLy8vXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcyhmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSB0cnVlOyAvLy9cbiAgXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfSwgRW50cnkudHlwZXMuTUFSS0VSKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIEVudHJ5LnR5cGVzLkZJTEVfTkFNRSwgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUUpIH1cblxuICBmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRSkgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGZvdW5kID0gKGVudHJ5TmFtZSA9PT0gbmFtZSk7XG4gICAgICBcbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9LCAuLi50eXBlcyk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZm91bmQgPSAoZW50cnlOYW1lID09PSBuYW1lKTtcblxuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGNhbGxiYWNrKSB8fCBudWxsOyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICBcbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnknXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=