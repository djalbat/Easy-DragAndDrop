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
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, dragEventHandler, activateFileEventHandler) {
      var directory = this.Directory.clone(directoryName, collapsed, dragEventHandler, activateFileEventHandler),
          entry = directory; ///

      this.addEntry(entry);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiZmlsZSIsImNsb25lIiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnkiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJlbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsInJlbW92ZSIsIm1hcmtlZCIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJ1bmRlZmluZWQiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsInByZXBlbmRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJjaGlsZExpc3RFbGVtZW50cyIsImNoaWxkRWxlbWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVB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QUFjRixJQUFsQixFQUF3QjtBQUN0QkMsdUJBQWF2QyxLQUFiOztBQUVBLGlCQUFPLElBQVA7QUFDRCxTQUpELE1BSU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQVZELEVBVUcwQixJQVZIOztBQVlBLFVBQUkxQixRQUFRdUMsVUFBWixDQWY4QixDQWVOOztBQUV4QixhQUFPdkMsS0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFJMEMsb0JBQW9CLEtBQUtDLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBeEI7QUFBQSxVQUNJekIsVUFBVXdCLGlCQURkLENBRFcsQ0FFdUI7O0FBRWxDLGFBQU94QixPQUFQO0FBQ0Q7Ozs7RUF0TW1CL0IsTzs7QUF5TXRCeUQsT0FBT0MsT0FBUCxHQUFpQnJELE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+LmVudHJpZXMnXSk7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuICBcbiAgYWRkRmlsZShmaWxlTmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBGaWxlLmNsb25lKGZpbGVOYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgIFxuICAgIGRpcmVjdG9yeSA9IChkaXJlY3RvcnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICB2YXIgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgIHByZXZpb3VzRW50cnkgPSB1bmRlZmluZWQsXG4gICAgICAgIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIG5leHRFbnRyeUJlZm9yZSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmIChuZXh0RW50cnlCZWZvcmUpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNFbnRyeS5wcmVwZW5kQmVmb3JlKG5leHRFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IG51bGwsXG4gICAgICAgIHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5ID0gZGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgdmFyIGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIHZhciBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=