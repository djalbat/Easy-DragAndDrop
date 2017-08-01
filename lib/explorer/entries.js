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
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

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
        var explorer = directoryNameDraggableEntry.getExplorer();

        removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

        directoryNameDraggableEntry.remove();
      }

      return removeEmptyParentDirectories;
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
      var type = Entry.types.MARKER,
          markerEntry = this.findEntryByType(function (entry) {
        var found = true; ///

        return found;
      }, type);

      return markerEntry;
    }
  }, {
    key: 'findFileNameDraggableEntry',
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndType(fileName, Entry.types.FILE_NAME);
    }
  }, {
    key: 'findDirectoryNameDraggableEntry',
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndType(directoryName, Entry.types.DIRECTORY_NAME);
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
    key: 'forEachEntry',
    value: function forEachEntry(callback) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        callback(entry);
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
    key: 'someEntry',
    value: function someEntry(callback, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: 'findEntryByNameAndType',
    value: function findEntryByNameAndType(name, type) {
      var entry = this.findEntryByType(function (entry) {
        var entryName = entry.getName(),
            found = entryName === name;

        return found;
      }, type);

      return entry;
    }
  }, {
    key: 'findEntryByType',
    value: function findEntryByType(callback, type) {
      var entries = this.getEntries(),
          entry = entries.find(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          var found = callback(entry);

          return found;
        }
      }) || null;

      return entry;
    }
  }, {
    key: 'findEntry',
    value: function findEntry(callback) {
      var entries = this.getEntries(),
          entry = entries.find(callback) || null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwicmVjb2duaXNlZCIsIm5hbWUiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJyZW1vdmUiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VyTmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlckVudHJ5IiwidHlwZXMiLCJGSUxFX05BTUUiLCJESVJFQ1RPUllfTkFNRSIsImZpbmRNYXJrZXJFbnRyeSIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsImZpbmRFbnRyeSIsIm5leHRFbnRyeUJlZm9yZUVudHJ5IiwiaXNCZWZvcmUiLCJmb3VuZCIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsInR5cGUiLCJNQVJLRVIiLCJmaW5kRW50cnlCeVR5cGUiLCJmaW5kRW50cnlCeU5hbWVBbmRUeXBlIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJzb21lRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLFVBQVVELFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01FLFFBQVFGLFFBQVEsU0FBUixDQURkO0FBQUEsSUFFTUcsc0JBQXNCSCxRQUFRLHlCQUFSLENBRjVCO0FBQUEs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UUFBUXdCLFFBQVFxQyxJQUFSLENBQWFSLFFBQWIsS0FBMEIsSUFEeEM7O0FBR0EsYUFBT3JELEtBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBTThELG9CQUFvQixLQUFLQyxnQkFBTCxDQUFzQixJQUF0QixDQUExQjtBQUFBLFVBQ012QyxVQUFVc0MsaUJBRGhCLENBRFcsQ0FFeUI7O0FBRXBDLGFBQU90QyxPQUFQO0FBQ0Q7OzttQ0FFcUJ3QyxVLEVBQVk7QUFDMUIsVUFBRXRFLDJCQUFGLEdBQWtDc0UsVUFBbEMsQ0FBRXRFLDJCQUFGO0FBQUEsVUFDQThCLE9BREEsR0FDVWxDLFFBQVEyRSxjQUFSLENBQXVCekUsT0FBdkIsRUFBZ0N3RSxVQUFoQyxFQUE0Q3RFLDJCQUE1QyxDQURWOzs7QUFHTixhQUFPOEIsT0FBUDtBQUNEOzs7O0VBL1JtQmxDLE87O0FBa1N0QjRFLE9BQU9DLE1BQVAsQ0FBYzNFLE9BQWQsRUFBdUI7QUFDckI0RSxXQUFTLElBRFk7QUFFckJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRkU7QUFLckJDLHFCQUFtQixDQUNqQiw2QkFEaUI7QUFMRSxDQUF2Qjs7QUFVQUMsT0FBT0MsT0FBUCxHQUFpQmpGLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICAgIEZpbGVOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlTmFtZScpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpLFxuICAgICAgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZHJhZ2dhYmxlRW50cnkvZmlsZU5hbWUnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5EaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUsIGV4cGxvcmVyLCByZWNvZ25pc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IHJlY29nbmlzZWQ9e3JlY29nbmlzZWR9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gPHRoaXMuRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcbiAgICBcbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgICBcbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSwgICAgXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuICAgIFxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJOYW1lOyAgLy8vXG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIG1hcmtlckVudHJ5ID0gPEZpbGVOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCk7XG5cbiAgICBtYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXJFbnRyeSE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlRW50cnkgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSBuZXh0RW50cnlCZWZvcmVFbnRyeTsgLy8vXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSLFxuICAgICAgICAgIG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdHJ1ZTsgLy8vXG4gIFxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUUpIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEVfTkFNRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgc29tZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFX05BTUUpIH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUUpIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGUobmFtZSwgdHlwZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGZvdW5kID0gKGVudHJ5TmFtZSA9PT0gbmFtZSk7XG4gICAgICBcbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9LCB0eXBlKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICBcbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnknXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=