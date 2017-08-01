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
        var entryBeforeNextEntry = entry.isBefore(nextEntry),
            found = entryBeforeNextEntry; ///

        return found;
      });

      if (previousEntry === null) {
        this.prepend(nextEntry);
      } else {
        nextEntry.insertAfter(previousEntry);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZU5hbWVNYXJrZXJFbnRyeSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwicmVjb2duaXNlZCIsIm5hbWUiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJyZW1vdmUiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkiLCJpc0VtcHR5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VyTmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlckVudHJ5IiwidHlwZXMiLCJGSUxFX05BTUUiLCJESVJFQ1RPUllfTkFNRSIsImZpbmRNYXJrZXJFbnRyeSIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsImZpbmRFbnRyeSIsImVudHJ5QmVmb3JlTmV4dEVudHJ5IiwiaXNCZWZvcmUiLCJmb3VuZCIsInByZXBlbmQiLCJpbnNlcnRBZnRlciIsInR5cGUiLCJNQVJLRVIiLCJmaW5kRW50cnlCeVR5cGUiLCJmaW5kRW50cnlCeU5hbWVBbmRUeXBlIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJzb21lRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInNvbWUiLCJyZXN1bHQiLCJmaW5kIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwicHJvcGVydGllcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLFVBQVVELFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01FLFFBQVFGLFFBQVEsU0FBUixDQURkO0FBQUEsSUFFTUcsc0JBQXNCSCxRQUFRLHlCQUFSLENBRjVCO0FBQUEs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QVF3QixRQUFRcUMsSUFBUixDQUFhUixRQUFiLEtBQTBCLElBRHhDOztBQUdBLGFBQU9yRCxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQU04RCxvQkFBb0IsS0FBS0MsZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMUI7QUFBQSxVQUNNdkMsVUFBVXNDLGlCQURoQixDQURXLENBRXlCOztBQUVwQyxhQUFPdEMsT0FBUDtBQUNEOzs7bUNBRXFCd0MsVSxFQUFZO0FBQzFCLFVBQUV0RSwyQkFBRixHQUFrQ3NFLFVBQWxDLENBQUV0RSwyQkFBRjtBQUFBLFVBQ0E4QixPQURBLEdBQ1VsQyxRQUFRMkUsY0FBUixDQUF1QnpFLE9BQXZCLEVBQWdDd0UsVUFBaEMsRUFBNEN0RSwyQkFBNUMsQ0FEVjs7O0FBR04sYUFBTzhCLE9BQVA7QUFDRDs7OztFQS9SbUJsQyxPOztBQWtTdEI0RSxPQUFPQyxNQUFQLENBQWMzRSxPQUFkLEVBQXVCO0FBQ3JCNEUsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQUZFO0FBS3JCQyxxQkFBbUIsQ0FDakIsNkJBRGlCO0FBTEUsQ0FBdkI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUJqRixPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGVOYW1lJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSByZWNvZ25pc2VkPXtyZWNvZ25pc2VkfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IDx0aGlzLkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIFxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGZhbHNlO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG4gICAgXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgICAgXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksICAgIFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRTpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyRW50cnkhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5QmVmb3JlTmV4dEVudHJ5ID0gZW50cnkuaXNCZWZvcmUobmV4dEVudHJ5KSxcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gZW50cnlCZWZvcmVOZXh0RW50cnk7IC8vL1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5wcmVwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRBZnRlcihwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUixcbiAgICAgICAgICBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZCA9IHRydWU7IC8vL1xuICBcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEVfTkFNRSkgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFX05BTUUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRSkgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBmb3VuZCA9IChlbnRyeU5hbWUgPT09IG5hbWUpO1xuICAgICAgXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfSwgdHlwZSk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cnkgPSBlbnRyaWVzLmZpbmQoY2FsbGJhY2spIHx8IG51bGw7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGVudHJpZXMgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cmllcydcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5J1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19