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
    value: function addFile(fileName, explorer, activateFileEventHandler) {
      var file = File.clone(fileName, explorer, activateFileEventHandler),
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
    value: function addDirectory(directoryName, collapsed, explorer, activateFileEventHandler) {
      var directory = this.Directory.clone(directoryName, collapsed, explorer, activateFileEventHandler),
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
    value: function addMarker(markerName, draggableEntryType) {
      var marker;

      switch (draggableEntryType) {
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
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggbleEntry) {
      var directoryOverlappingDraggableEntry = null;

      this.someDirectory(function (directory) {
        directoryOverlappingDraggableEntry = directory.getDirectoryOverlappingDraggableEntry(draggbleEntry);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJleHBsb3JlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsImZpbGUiLCJjbG9uZSIsImVudHJ5IiwiYWRkRW50cnkiLCJyZXRyaWV2ZUZpbGUiLCJyZW1vdmUiLCJkaXJlY3RvcnlOYW1lIiwiY29sbGFwc2VkIiwiZGlyZWN0b3J5IiwicmV0cmlldmVEaXJlY3RvcnkiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyIiwidHlwZXMiLCJGSUxFIiwiRElSRUNUT1JZIiwicmV0cmlldmVNYXJrZXIiLCJtYXJrZWQiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJ1bmRlZmluZWQiLCJzb21lIiwibmV4dEVudHJ5QmVmb3JlIiwiaXNCZWZvcmUiLCJhcHBlbmQiLCJwcmVwZW5kQmVmb3JlIiwicmV0cmlldmVFbnRyeUJ5VHlwZSIsInR5cGUiLCJNQVJLRVIiLCJzb21lRW50cnlCeVR5cGUiLCJtYXJrZWREaXJlY3RvcnkiLCJzb21lRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZHJhZ2dibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJmb3VuZEVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxRQUFRRixRQUFRLFNBQVIsQ0FBWjtBQUFBLElBQ0lHLE9BQU9ILFFBQVEsdUJBQVIsQ0FEWDtBQUFBLElBRUlJLGFBQWFKLFFBQVEsb0JBQVIsQ0FGakI7QUFBQSxJQUdJSyxrQkFBa0JMLFFBQVEseUJBQVIsQ0FIdEI7O0lBS01NLE87OztBQUNKLG1CQUFZQyxhQUFaLEVBQTJCQyxTQUEzQixFQUFzQztBQUFBOztBQUFBLGtIQUM5QixDQUFDRCxhQUFELEVBQWdCLFdBQWhCLENBRDhCOztBQUdwQyxVQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUhvQztBQUlyQzs7Ozs0QkFFT0MsUSxFQUFVQyxRLEVBQVVDLHdCLEVBQTBCO0FBQ3BELFVBQUlDLE9BQU9ULEtBQUtVLEtBQUwsQ0FBV0osUUFBWCxFQUFxQkMsUUFBckIsRUFBK0JDLHdCQUEvQixDQUFYO0FBQUEsVUFDSUcsUUFBUUYsSUFEWixDQURvRCxDQUVsQzs7QUFFbEIsV0FBS0csUUFBTCxDQUFjRCxLQUFkO0FBQ0Q7OzsrQkFFVUwsUSxFQUFVO0FBQ25CLFVBQUlHLE9BQU8sS0FBS0ksWUFBTCxDQUFrQlAsUUFBbEIsQ0FBWDs7QUFFQUcsV0FBS0ssTUFBTDtBQUNEOzs7aUNBRVlDLGEsRUFBZUMsUyxFQUFXVCxRLEVBQVVDLHdCLEVBQTBCO0FBQ3pFLFVBQUlTLFlBQVksS0FBS1osU0FBTCxDQUFlSyxLQUFmLENBQXFCSyxhQUFyQixFQUFvQ0MsU0FBcEMsRUFBK0NULFFBQS9DLEVBQXlEQyx3QkFBekQsQ0FBaEI7QUFBQSxVQUNJRyxRQUFRTSxTQURaLENBRHlFLENBRWpEOztBQUV4QixXQUFLTCxRQUFMLENBQWNELEtBQWQ7QUFDRDs7O29DQUVl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blxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz4uZW50cmllcyddKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBGaWxlLmNsb25lKGZpbGVOYW1lLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBmaWxlOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIHZhciBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc0ZpbGUoZmlsZU5hbWUpIHtcbiAgICB2YXIgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKTtcblxuICAgIGZpbGUgPSAoZmlsZSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgIFxuICAgIGRpcmVjdG9yeSA9IChkaXJlY3RvcnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIHZhciBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IHVuZGVmaW5lZCxcbiAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgbmV4dEVudHJ5QmVmb3JlID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcbiAgICAgIFxuICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0VudHJ5LnByZXBlbmRCZWZvcmUobmV4dEVudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gbnVsbCxcbiAgICAgICAgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2JsZUVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgdmFyIGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIHZhciBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=