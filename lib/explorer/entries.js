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
    React = easy.React;

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
    value: function addFileNameDraggableEntry(fileName, explorer, recognised, hidden) {
      var name = fileName,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer, recognised: recognised, hidden: hidden }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectoryNameDraggableEntry',
    value: function addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, hidden) {
      var name = directoryName,
          directoryNameDraggableEntry = React.createElement(this.DirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed, hidden: hidden }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFileNameDraggableEntry',
    value: function removeFileNameDraggableEntry(fileName) {
      var fileNameDraggableEntry = this.retrieveFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      fileNameDraggableEntry.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectoryNameDraggableEntry',
    value: function removeDirectoryNameDraggableEntry(directoryName) {
      var removeEmptyParentDirectories = false;

      var directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

      if (directoryNameDraggableEntryEmpty) {
        var explorer = directoryNameDraggableEntry.getExplorer();

        removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

        directoryNameDraggableEntry.remove();
      }

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'isFileNameDraggableEntryPresent',
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.retrieveFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null; ///

      return fileNameDraggableEntryPresent;
    }
  }, {
    key: 'isDirectoryNameDraggableEntryPresent',
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),
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
      var markerEntry = this.retrieveMarkerEntry();

      markerEntry.remove();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marker = this.retrieveMarkerEntry(),
          marked = marker !== null;

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
          entries = this.getEntries();

      var previousEntry = null;

      entries.some(function (entry) {
        var nextEntryBefore = nextEntry.isBefore(entry);

        if (nextEntryBefore) {
          previousEntry = entry;

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
    key: 'retrieveFileNameDraggableEntry',
    value: function retrieveFileNameDraggableEntry(fileName) {
      return this.retrieveEntryByType(fileName, Entry.types.FILE_NAME);
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntry(directoryName) {
      return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY_NAME);
    }
  }, {
    key: 'retrieveMarkerEntry',
    value: function retrieveMarkerEntry() {
      var marker = null;

      var type = Entry.types.MARKER;

      this.someEntryByType(function (entry) {
        marker = entry; ///

        return true;
      }, type);

      return marker;
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
      this.forEachEntryByType(callback, Entry.types.FILE_NAME);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByType(callback, Entry.types.DIRECTORY_NAME);
    }
  }, {
    key: 'someFileNameDraggableEntry',
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByType(callback, Entry.types.FILE_NAME);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByType(callback, Entry.types.DIRECTORY_NAME);
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
    key: 'forEachEntryByType',
    value: function forEachEntryByType(callback, type) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          callback(entry);
        }
      });
    }
  }, {
    key: 'someEntry',
    value: function someEntry(callback, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: 'someEntryByType',
    value: function someEntryByType(callback, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          var result = callback(entry);

          return result;
        }
      });
    }
  }, {
    key: 'retrieveEntryByType',
    value: function retrieveEntryByType(name, type) {
      var foundEntry = null;

      this.someEntryByType(function (entry) {
        var entryName = entry.getName();

        if (entryName === name) {
          foundEntry = entry;

          return true;
        }
      }, type);

      var entry = foundEntry; ///

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwicmVjb2duaXNlZCIsImhpZGRlbiIsIm5hbWUiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXRFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwicmVtb3ZlIiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSIsImlzRW1wdHkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyRW50cnkiLCJ0eXBlcyIsIkZJTEVfTkFNRSIsIkRJUkVDVE9SWV9OQU1FIiwicmV0cmlldmVNYXJrZXJFbnRyeSIsIm1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInJlc3VsdCIsImZvdW5kRW50cnkiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUUsUUFBUUYsUUFBUSxTQUFSLENBRGQ7QUFBQSxJQUVNRyxzQkFBc0JILFFBQVEseUJBQVIsQ0FGNUI7QUFBQSxJQUdNSSwyQkFB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QUFBQSxVQUNBZ0MsT0FEQSxHQUNVcEMsUUFBUTBFLGNBQVIsQ0FBdUJ4RSxPQUF2QixFQUFnQ3VFLFVBQWhDLEVBQTRDckUsMkJBQTVDLENBRFY7OztBQUdOLGFBQU9nQyxPQUFQO0FBQ0Q7Ozs7RUExUm1CcEMsTzs7QUE2UnRCMkUsT0FBT0MsTUFBUCxDQUFjMUUsT0FBZCxFQUF1QjtBQUNyQjJFLFdBQVMsSUFEWTtBQUVyQkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRTtBQUtyQkMscUJBQW1CLENBQ2pCLDZCQURpQjtBQUxFLENBQXZCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCaEYsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgICAgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2ZpbGVOYW1lJyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyksXG4gICAgICBGaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIsIHJlY29nbmlzZWQsIGhpZGRlbikge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSByZWNvZ25pc2VkPXtyZWNvZ25pc2VkfSBoaWRkZW49e2hpZGRlbn0gLz4sXG4gICAgICAgICAgZW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIGhpZGRlbikge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IDx0aGlzLkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBoaWRkZW49e2hpZGRlbn0gLz4sXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICBcbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG4gICAgXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgICAgXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSwgICAgXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuICAgIFxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJOYW1lOyAgLy8vXG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIG1hcmtlckVudHJ5ID0gPEZpbGVOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBsZXQgcHJldmlvdXNFbnRyeSA9IG51bGw7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmIChuZXh0RW50cnlCZWZvcmUpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEVfTkFNRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRSkgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEVfTkFNRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFX05BTUUpIH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUUpIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIGxldCBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgY29uc3QgZW50cnkgPSBmb3VuZEVudHJ5OyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICBcbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnknXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=