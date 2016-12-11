'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/fileMarker'),
    DirectoryMarker = require('./entry/directoryMarker');

var Entries = function (_Element) {
  _inherits(Entries, _Element);

  function Entries(parentElement, Directory) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, [parentElement, '>.entries']));

    _this.Directory = Directory;
    return _this;
  }

  _createClass(Entries, [{
    key: 'addFile',
    value: function addFile(fileName, dragEventHandler, activateFileEventHandler) {
      var file = File.clone(fileName, dragEventHandler, activateFileEventHandler),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(fileName) {
      var file = this.retrieveFile(fileName);

      file.remove();
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, dragEventHandler, activateFileEventHandler) {
      var directory = this.Directory.clone(directoryName, collapsed, dragEventHandler, activateFileEventHandler),
          entry = directory; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName);

      directory.remove();
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
    value: function addMarker(markerName, entryType) {
      var marker;

      switch (entryType) {
        case Entry.types.FILE:
          marker = FileMarker.clone(markerName);
          break;

        case Entry.types.DIRECTORY:
          marker = DirectoryMarker.clone(markerName);
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
          previousEntry = undefined,
          entries = this.getEntries();

      entries.some(function (entry) {
        var nextEntryBefore = nextEntry.isBefore(entry);

        if (nextEntryBefore) {
          previousEntry = entry;

          return true;
        } else {
          return false;
        }
      });

      if (previousEntry === undefined) {
        this.append(nextEntry);
      } else {
        previousEntry.prependBefore(nextEntry);
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
      var marker = null,
          type = Entry.types.MARKER;

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
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      var directoryOverlappingEntry = null;

      this.someDirectory(function (directory) {
        directoryOverlappingEntry = directory.getDirectoryOverlappingEntry(entry);

        if (directoryOverlappingEntry !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryOverlappingEntry;
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
      var childListElements = this.childElements('li'),
          entries = childListElements; ///

      return entries;
    }
  }]);

  return Entries;
}(Element);

module.exports = Entries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiZmlsZSIsImNsb25lIiwiZW50cnkiLCJhZGRFbnRyeSIsInJldHJpZXZlRmlsZSIsInJlbW92ZSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnkiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJlbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInVuZGVmaW5lZCIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsInByZXBlbmRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJjaGlsZExpc3RFbGVtZW50cyIsImNoaWxkRWxlbWVudHMiLCJt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RUEsWUFBSWhDLGNBQWNxQixJQUFsQixFQUF3QjtBQUN0QlEsbUJBQVN0QyxLQUFUO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7OztvQ0FFZXNDLFEsRUFBVVIsSSxFQUFNO0FBQzlCLFVBQUlkLFVBQVUsS0FBS0MsVUFBTCxFQUFkOztBQUVBLGFBQU9ELFFBQVFRLElBQVIsQ0FBYSxVQUFTeEIsS0FBVCxFQUFnQjtBQUNsQyxZQUFJUyxZQUFZVCxNQUFNeUMsT0FBTixFQUFoQjs7QUFFQSxZQUFJaEMsY0FBY3FCLElBQWxCLEVBQXdCO0FBQ3RCLGlCQUFPUSxTQUFTdEMsS0FBVCxDQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FSTSxDQUFQO0FBU0Q7Ozt3Q0FFbUIwQyxJLEVBQU1aLEksRUFBTTtBQUM5QixVQUFJYSxhQUFhLElBQWpCOztBQUVBLFdBQUtYLGVBQUwsQ0FBcUIsVUFBU2hDLEtBQVQsRUFBZ0I7QUFDbkMsWUFBSTRDLFlBQVk1QyxNQUFNNkMsT0FBTixFQUFoQjs7QUFFQSxZQUFJRCxjQUFjRixJQUFsQixFQUF3QjtBQUN0QkMsdUJBQWEzQyxLQUFiOztBQUVBLGlCQUFPLElBQVA7QUFDRCxTQUpELE1BSU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQVZELEVBVUc4QixJQVZIOztBQVlBLFVBQUk5QixRQUFRMkMsVUFBWixDQWY4QixDQWVOOztBQUV4QixhQUFPM0MsS0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFJOEMsb0JBQW9CLEtBQUtDLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBeEI7QUFBQSxVQUNJL0IsVUFBVThCLGlCQURkLENBRFcsQ0FFdUI7O0FBRWxDLGFBQU85QixPQUFQO0FBQ0Q7Ozs7RUFsT21CN0IsTzs7QUFxT3RCNkQsT0FBT0MsT0FBUCxHQUFpQnpELE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+LmVudHJpZXMnXSk7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuICBcbiAgYWRkRmlsZShmaWxlTmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBGaWxlLmNsb25lKGZpbGVOYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVOYW1lKSB7XG4gICAgdmFyIGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSk7XG5cbiAgICBmaWxlLnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuRGlyZWN0b3J5LmNsb25lKGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc0ZpbGUoZmlsZU5hbWUpIHtcbiAgICB2YXIgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKTtcblxuICAgIGZpbGUgPSAoZmlsZSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgIFxuICAgIGRpcmVjdG9yeSA9IChkaXJlY3RvcnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIHZhciBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IHVuZGVmaW5lZCxcbiAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgbmV4dEVudHJ5QmVmb3JlID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcbiAgICAgIFxuICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0VudHJ5LnByZXBlbmRCZWZvcmUobmV4dEVudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gbnVsbCxcbiAgICAgICAgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICB2YXIgZm91bmRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICB2YXIgZW50cnkgPSBmb3VuZEVudHJ5OyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgdmFyIGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==