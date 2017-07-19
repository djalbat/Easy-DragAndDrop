'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/marker/file'),
    DirectoryMarker = require('./entry/marker/directory');

var Element = easy.Element,
    React = easy.React;

var Entries = function (_Element) {
  _inherits(Entries, _Element);

  function Entries(selector, Directory) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, selector));

    _this.Directory = Directory;
    return _this;
  }

  _createClass(Entries, [{
    key: 'addFile',
    value: function addFile(fileName, explorer) {
      var name = fileName,
          file = React.createElement(File, { name: name, explorer: explorer }),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, explorer, collapsed) {
      var name = directoryName,
          directory = React.createElement(this.Directory, { name: name, explorer: explorer, collapsed: collapsed }),
          entry = directory; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(fileName) {
      var file = this.retrieveFile(fileName),
          explorer = file.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      file.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName),
          explorer = directory.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directory.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'hasFile',
    value: function hasFile(fileName) {
      var file = this.retrieveFile(fileName);

      file = file !== null; ///

      return file;
    }
  }, {
    key: 'hasDirectory',
    value: function hasDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName);

      directory = directory !== null; ///

      return directory;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerName, draggableEntryType) {
      var marker = void 0;

      var name = markerName; ///

      switch (draggableEntryType) {
        case Entry.types.FILE:
          marker = React.createElement(FileMarker, { name: name });
          break;

        case Entry.types.DIRECTORY:
          marker = React.createElement(DirectoryMarker, { name: name });
          break;
      }

      var entry = marker; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var marker = this.retrieveMarker();

      marker.remove();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marker = this.retrieveMarker(),
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
    key: 'retrieveFile',
    value: function retrieveFile(fileName) {
      return this.retrieveEntryByType(fileName, Entry.types.FILE);
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryName) {
      return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY);
    }
  }, {
    key: 'retrieveMarker',
    value: function retrieveMarker() {
      var marker = null;

      var type = Entry.types.MARKER;

      this.someEntryByType(function (entry) {
        marker = entry; ///

        return true;
      }, type);

      return marker;
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = null;

      this.someDirectory(function (directory) {
        markedDirectory = directory.getMarkedDirectory();

        if (markedDirectory !== null) {
          return true;
        }
      });

      return markedDirectory;
    }
  }, {
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
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
        this.someDirectory(function (directory) {
          var directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null;

      this.someDirectory(function (directory) {
        directoryOverlappingDraggableEntry = directory.getDirectoryOverlappingDraggableEntry(draggableEntry);

        if (directoryOverlappingDraggableEntry !== null) {
          return true;
        }
      });

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(callback) {
      this.forEachEntryByType(callback, Entry.types.FILE);
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(callback) {
      this.forEachEntryByType(callback, Entry.types.DIRECTORY);
    }
  }, {
    key: 'someFile',
    value: function someFile(callback) {
      return this.someEntryByType(callback, Entry.types.FILE);
    }
  }, {
    key: 'someDirectory',
    value: function someDirectory(callback) {
      return this.someEntryByType(callback, Entry.types.DIRECTORY);
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
      var Directory = properties.Directory;


      return Element.fromProperties(Entries, properties, Directory);
    }
  }]);

  return Entries;
}(Element);

Object.assign(Entries, {
  tagName: 'ul',
  defaultProperties: {
    className: 'entries'
  },
  ignoredProperties: ['Directory']
});

module.exports = Entries;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZSIsIkZpbGVNYXJrZXIiLCJEaXJlY3RvcnlNYXJrZXIiLCJFbGVtZW50IiwiUmVhY3QiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwibmFtZSIsImZpbGUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRmlsZSIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJyZW1vdmUiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwibWFya2VkRGlyZWN0b3J5Iiwic29tZURpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCIsImdldERyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsInJlc3VsdCIsImZvdW5kRW50cnkiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUUsUUFBUUYsUUFBUSxTQUFSLENBRGQ7QUFBQSxJQUVNRyxPQUFPSCxRQUFRLHVCQUFSLENBRmI7QUFBQSxJQUdNSSxhQUFhSixRQUFRLHFCQUFSLENBSG5CO0FBQUEsSUFJTUssa0JBQWtCTCxRQUFRLDBCQUFSLENBSnhCOztJQU1RTSxPLEdBQW1CUCxJLENBQW5CTyxPO0lBQVNDLEssR0FBVVIsSSxDQUFWUSxLOztJQUVYQyxPOzs7QUFDSixtQkFBWUMsUUFBWixFQUFzQkMsU0FBdEIsRUFBaUM7QUFBQTs7QUFBQSxrSEFDekJELFFBRHlCOztBQUcvQixVQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUgrQjtBQUloQzs7Ozs0QkFFT0MsUSxFQUFVQyxRLEVBQVU7QUFDMUIsVUFBTUMsT0FBT0YsUUFBYjtBQUFBLFVBQ01HLE9BQU8sb0JBQUMsSUFBRCxJQUFNLE1BQU1ELElBQVosRUFBa0IsVUFBVUQsUUFBNUIsR0FEYjtBQUFBLFVBRU1HLFFBQVFELElBRmQsQ0FEMEIsQ0FHTjs7QUFFcEIsV0FBS0UsUUFBTCxDQUFjRCxLQUFkO0FB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LFFBQVFzRCxVQUFkLENBYjhCLENBYUo7O0FBRTFCLGFBQU90RCxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQU11RCxvQkFBb0IsS0FBS0MsZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMUI7QUFBQSxVQUNNcEMsVUFBVW1DLGlCQURoQixDQURXLENBRXlCOztBQUVwQyxhQUFPbkMsT0FBUDtBQUNEOzs7bUNBRXFCcUMsVSxFQUFZO0FBQUEsVUFDeEI5RCxTQUR3QixHQUNWOEQsVUFEVSxDQUN4QjlELFNBRHdCOzs7QUFHaEMsYUFBT0osUUFBUW1FLGNBQVIsQ0FBdUJqRSxPQUF2QixFQUFnQ2dFLFVBQWhDLEVBQTRDOUQsU0FBNUMsQ0FBUDtBQUNEOzs7O0VBcFJtQkosTzs7QUF1UnRCb0UsT0FBT0MsTUFBUCxDQUFjbkUsT0FBZCxFQUF1QjtBQUNyQm9FLFdBQVMsSUFEWTtBQUVyQkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRTtBQUtyQkMscUJBQW1CLENBQ2pCLFdBRGlCO0FBTEUsQ0FBdkI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUJ6RSxPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZScpLFxuICAgICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBmaWxlID0gPEZpbGUgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGRpcmVjdG9yeSA9IDx0aGlzLkRpcmVjdG9yeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuICAgIFxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaGFzRmlsZShmaWxlTmFtZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZSA9IChmaWxlICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgbGV0IGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyO1xuICAgIFxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJOYW1lOyAgLy8vXG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSA8RmlsZU1hcmtlciBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSA8RGlyZWN0b3J5TWFya2VyIG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgbGV0IHByZXZpb3VzRW50cnkgPSBudWxsO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5ID0gZGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZUZpbGUoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgbGV0IGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICBjb25zdCBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeSB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzLCBEaXJlY3RvcnkpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2VudHJpZXMnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ0RpcmVjdG9yeSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==