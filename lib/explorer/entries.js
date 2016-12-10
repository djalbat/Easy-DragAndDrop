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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiZmlsZSIsImNsb25lIiwiZW50cnkiLCJhZGRFbnRyeSIsInJldHJpZXZlRmlsZSIsInJlbW92ZSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnkiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJlbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsIm1hcmtlZCIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJ1bmRlZmluZWQiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsInByZXBlbmRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJjaGlsZExpc3RFbGVtZW50cyIsImNoaWxkRWxlbWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFB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QUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQVJNLENBQVA7QUFTRDs7O3dDQUVtQnVDLEksRUFBTVosSSxFQUFNO0FBQzlCLFVBQUlhLGFBQWEsSUFBakI7O0FBRUEsV0FBS1gsZUFBTCxDQUFxQixVQUFTN0IsS0FBVCxFQUFnQjtBQUNuQyxZQUFJeUMsWUFBWXpDLE1BQU0wQyxPQUFOLEVBQWhCOztBQUVBLFlBQUlELGNBQWNGLElBQWxCLEVBQXdCO0FBQ3RCQyx1QkFBYXhDLEtBQWI7O0FBRUEsaUJBQU8sSUFBUDtBQUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BVkQsRUFVRzJCLElBVkg7O0FBWUEsVUFBSTNCLFFBQVF3QyxVQUFaLENBZjhCLENBZU47O0FBRXhCLGFBQU94QyxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUkyQyxvQkFBb0IsS0FBS0MsYUFBTCxDQUFtQixJQUFuQixDQUF4QjtBQUFBLFVBQ0l6QixVQUFVd0IsaUJBRGQsQ0FEVyxDQUV1Qjs7QUFFbEMsYUFBT3hCLE9BQVA7QUFDRDs7OztFQWxObUJoQyxPOztBQXFOdEIwRCxPQUFPQyxPQUFQLEdBQWlCdEQsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz4uZW50cmllcyddKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEZpbGUuY2xvbmUoZmlsZU5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciksXG4gICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZU5hbWUpIHtcbiAgICB2YXIgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKTtcblxuICAgIGZpbGUucmVtb3ZlKCk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICBcbiAgICBkaXJlY3RvcnkgPSAoZGlyZWN0b3J5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICBwcmV2aW91c0VudHJ5ID0gdW5kZWZpbmVkLFxuICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRW50cnkucHJlcGVuZEJlZm9yZShuZXh0RW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSBudWxsLFxuICAgICAgICB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIHZhciBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICB2YXIgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19