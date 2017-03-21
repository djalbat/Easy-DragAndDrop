'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    Element = easy.Element,
    React = easy.React;

var options = require('../options'),
    Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/marker/file'),
    DirectoryMarker = require('./entry/marker/directory');

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
          file = React.createElement(File, { name: name, explorer: explorer, className: 'file' }),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, explorer, collapsed) {
      var name = directoryName,
          directory = React.createElement(this.Directory, { name: name, explorer: explorer, collapsed: collapsed, className: 'directory' }),
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
          marker = React.createElement(FileMarker, { name: name, className: 'marker' });
          break;

        case Entry.types.DIRECTORY:
          marker = React.createElement(DirectoryMarker, { name: name, className: 'marker' });
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
        } else {
          return false;
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
        } else {
          return false;
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
        } else {
          return false;
        }
      });

      if (draggableEntryPath === null) {
        this.someDirectory(function (directory) {
          var directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
          } else {
            return false;
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
        } else {
          return false;
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
          return callback(entry);
        } else {
          return false;
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
        } else {
          return false;
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
  ignoredAttributes: ['Directory']
});

module.exports = Entries;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRWxlbWVudCIsIlJlYWN0Iiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZSIsIkZpbGVNYXJrZXIiLCJEaXJlY3RvcnlNYXJrZXIiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwibmFtZSIsImZpbGUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRmlsZSIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJyZW1vdmUiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsImluc2VydEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwibWFya2VkRGlyZWN0b3J5Iiwic29tZURpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwic29tZUVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCIsImdldERyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsImZvdW5kRW50cnkiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsVUFBVUYsS0FBS0UsT0FEckI7QUFBQSxJQUVNQyxRQUFRSCxLQUFLRyxLQUZuQjs7QUFJQSxJQUFNQyxVQUFVSCxRQUFRLFlBQVIsQ0FBaEI7QUFBQSxJQUNNSSxRQUFRSixRQUFRLFNBQVIsQ0FEZDtBQUFBLElBRU1LLE9BQU9MLFFBQVEsdUJBQVIsQ0FGYjtBQUFBLElBR01NLGFBQWFOLFFBQVEscUJBQVIsQ0FIbkI7QUFBQSxJQUlNTyxrQkFBa0JQLFFBQVEsMEJBQVIsQ0FKeEI7O0lBTU1RLE87OztBQUNKLG1CQUFZQyxRQUFaLEVBQXNCQyxTQUF0QixFQUFpQztBQUFBOztBQUFBLGtIQUN6QkQsUUFEeUI7O0FBRy9CLFVBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBSCtCO0FBSWhDOzs7OzRCQUVPQyxRLEVBQVVDLFEsRUFBVTtBQUMxQixVQUFNQyxPQUFPRixRQUFiO0FBQUEsVUFDTUcsT0FBTyxvQkFBQyxJQUFELElBQU0sTUFBTUQsSUFBWixFQUFrQixVQUFVRCxRQUE1QixFQUFzQyxXQUFVLE1BQWhELEdBRGI7QUFBQSxVQUVNRyxRQUFRRCxJQUZkLENBRDBCLENBR047O0FBRXBCLFdBQUtFLFFBQUwsQ0FBY0QsS0FBZDtBQUNEOzs7aUNBRVlFLGEsRUFB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SUFBakI7O0FBRUEsV0FBS2xCLGVBQUwsQ0FBcUIsVUFBU25DLEtBQVQsRUFBZ0I7QUFDbkMsWUFBTTBDLFlBQVkxQyxNQUFNMkMsT0FBTixFQUFsQjs7QUFFQSxZQUFJRCxjQUFjNUMsSUFBbEIsRUFBd0I7QUFDdEJ1RCx1QkFBYXJELEtBQWI7O0FBRUEsaUJBQU8sSUFBUDtBQUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BVkQsRUFVR2lDLElBVkg7O0FBWUEsVUFBTWpDLFFBQVFxRCxVQUFkLENBZjhCLENBZUo7O0FBRTFCLGFBQU9yRCxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQU1zRCxvQkFBb0IsS0FBS0MsZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMUI7QUFBQSxVQUNNbkMsVUFBVWtDLGlCQURoQixDQURXLENBRXlCOztBQUVwQyxhQUFPbEMsT0FBUDtBQUNEOzs7bUNBRXFCb0MsVSxFQUFZO0FBQUEsVUFDeEI3RCxTQUR3QixHQUNWNkQsVUFEVSxDQUN4QjdELFNBRHdCOzs7QUFHaEMsYUFBT1QsUUFBUXVFLGNBQVIsQ0FBdUJoRSxPQUF2QixFQUFnQytELFVBQWhDLEVBQTRDN0QsU0FBNUMsQ0FBUDtBQUNEOzs7O0VBaFNtQlQsTzs7QUFtU3RCd0UsT0FBT0MsTUFBUCxDQUFjbEUsT0FBZCxFQUF1QjtBQUNyQm1FLFdBQVMsSUFEWTtBQUVyQkMscUJBQW1CLENBQ2pCLFdBRGlCO0FBRkUsQ0FBdkI7O0FBT0FDLE9BQU9DLE9BQVAsR0FBaUJ0RSxPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgRWxlbWVudCA9IGVhc3kuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeS5SZWFjdDtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgICAgRmlsZSA9IHJlcXVpcmUoJy4vZHJhZ2dhYmxlRW50cnkvZmlsZScpLFxuICAgICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2ZpbGUnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2RpcmVjdG9yeScpO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuICBcbiAgYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZmlsZSA9IDxGaWxlIG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY2xhc3NOYW1lPVwiZmlsZVwiIC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5ID0gPHRoaXMuRGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGNsYXNzTmFtZT1cImRpcmVjdG9yeVwiIC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5OyAgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGhhc0ZpbGUoZmlsZU5hbWUpIHtcbiAgICBsZXQgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKTtcblxuICAgIGZpbGUgPSAoZmlsZSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgIFxuICAgIGRpcmVjdG9yeSA9IChkaXJlY3RvcnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlcjtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gPEZpbGVNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gPERpcmVjdG9yeU1hcmtlciBuYW1lPXtuYW1lfSBjbGFzc05hbWU9XCJtYXJrZXJcIiAvPjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG4gIFxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlciE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGxldCBwcmV2aW91c0VudHJ5ID0gbnVsbDtcblxuICAgIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcbiAgICAgIFxuICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudHJ5Lmluc2VydEJlZm9yZShwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeS5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRmlsZShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBzb21lRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICBsZXQgZm91bmRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5IH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMsIERpcmVjdG9yeSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ0RpcmVjdG9yeSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==