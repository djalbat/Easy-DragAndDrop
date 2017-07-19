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
      var directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),
          explorer = directoryNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directoryNameDraggableEntry.remove();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwicmVjb2duaXNlZCIsImhpZGRlbiIsIm5hbWUiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJnZXRFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwicmVtb3ZlIiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyRW50cnkiLCJ0eXBlcyIsIkZJTEVfTkFNRSIsIkRJUkVDVE9SWV9OQU1FIiwicmV0cmlldmVNYXJrZXJFbnRyeSIsIm1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInJlc3VsdCIsImZvdW5kRW50cnkiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUUsUUFBUUYsUUFBUSxTQUFSLENBRGQ7QUFBQSxJQUVNRyxzQkFBc0JILFFBQVEseUJBQVIsQ0FGNUI7QUFBQSxJQUdNSSwyQkFBMkJKLFFBQVEsOEJBQVIsQ0FIakM7QUFBQSxJQUlNSyx5QkFBeUJMLFFBQVEs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LE1BQVAsQ0FBY3hFLE9BQWQsRUFBdUI7QUFDckJ5RSxXQUFTLElBRFk7QUFFckJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRkU7QUFLckJDLHFCQUFtQixDQUNqQiw2QkFEaUI7QUFMRSxDQUF2Qjs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQjlFLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICAgIEZpbGVOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlTmFtZScpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpLFxuICAgICAgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZHJhZ2dhYmxlRW50cnkvZmlsZU5hbWUnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5EaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUsIGV4cGxvcmVyLCByZWNvZ25pc2VkLCBoaWRkZW4pIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IDxGaWxlTmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gcmVjb2duaXNlZD17cmVjb2duaXNlZH0gaGlkZGVuPXtoaWRkZW59IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkLCBoaWRkZW4pIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSA8dGhpcy5EaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gaGlkZGVuPXtoaWRkZW59IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksICAgIFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRTpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkoKTtcblxuICAgIG1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICB9XG4gIFxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgbGV0IHByZXZpb3VzRW50cnkgPSBudWxsO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFX05BTUUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUUpIH1cblxuICByZXRyaWV2ZU1hcmtlckVudHJ5KCkge1xuICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFX05BTUUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRSkgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICBsZXQgZm91bmRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGVudHJpZXMgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cmllcydcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5J1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19