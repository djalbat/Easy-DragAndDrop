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
    value: function addFile(fileName, readOnly, dragEventHandler, activateFileEventHandler) {
      var file = File.clone(fileName, readOnly, dragEventHandler, activateFileEventHandler),
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
        if (nextEntry.isBefore(entry)) {
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
    key: 'getDirectoryHavingMarker',
    value: function getDirectoryHavingMarker() {
      var directoryHavingMarker = null;

      this.someDirectory(function (directory) {
        directoryHavingMarker = directory.getDirectoryHavingMarker();

        if (directoryHavingMarker !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryHavingMarker;
    }
  }, {
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      var directoryOverlappingDraggingBounds = null;

      this.someDirectory(function (directory) {
        directoryOverlappingDraggingBounds = directory.getDirectoryOverlappingEntry(entry);

        if (directoryOverlappingDraggingBounds !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryOverlappingDraggingBounds;
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(cb) {
      this.forEachEntryByType(cb, Entry.types.FILE);
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(cb) {
      this.forEachEntryByType(cb, Entry.types.DIRECTORY);
    }
  }, {
    key: 'someDirectory',
    value: function someDirectory(cb) {
      return this.someEntryByType(cb, Entry.types.DIRECTORY);
    }
  }, {
    key: 'forEachEntry',
    value: function forEachEntry(cb) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        cb(entry);
      });
    }
  }, {
    key: 'forEachEntryByType',
    value: function forEachEntryByType(cb, type) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          cb(entry);
        }
      });
    }
  }, {
    key: 'someEntryByType',
    value: function someEntryByType(cb, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          return cb(entry);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJyZWFkT25seSIsImRyYWdFdmVudEhhbmRsZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJmaWxlIiwiY2xvbmUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyTmFtZSIsImVudHJ5VHlwZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsIkRJUkVDVE9SWSIsInJldHJpZXZlTWFya2VyIiwicmVtb3ZlIiwibWFya2VkIiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInVuZGVmaW5lZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwic29tZSIsImlzQmVmb3JlIiwiYXBwZW5kIiwicHJlcGVuZEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwiZGlyZWN0b3J5SGF2aW5nTWFya2VyIiwic29tZURpcmVjdG9yeSIsImdldERpcmVjdG9yeUhhdmluZ01hcmtlciIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiY2IiLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZ2V0VHlwZSIsIm5hbWUiLCJmb3VuZEVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7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QWNGLElBQWxCLEVBQXdCO0FBQ3RCQyx1QkFBYXRDLEtBQWI7O0FBRUEsaUJBQU8sSUFBUDtBQUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BVkQsRUFVR3lCLElBVkg7O0FBWUEsVUFBSXpCLFFBQVFzQyxVQUFaLENBZjhCLENBZU47O0FBRXhCLGFBQU90QyxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUl5QyxvQkFBb0IsS0FBS0MsYUFBTCxDQUFtQixJQUFuQixDQUF4QjtBQUFBLFVBQ0l4QixVQUFVdUIsaUJBRGQsQ0FEVyxDQUV1Qjs7QUFFbEMsYUFBT3ZCLE9BQVA7QUFDRDs7OztFQXBNbUJoQyxPOztBQXVNdEJ5RCxPQUFPQyxPQUFQLEdBQWlCckQsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz4uZW50cmllcyddKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBGaWxlLmNsb25lKGZpbGVOYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBmaWxlOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuRGlyZWN0b3J5LmNsb25lKGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICBcbiAgICBkaXJlY3RvcnkgPSAoZGlyZWN0b3J5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICBwcmV2aW91c0VudHJ5ID0gdW5kZWZpbmVkLFxuICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRW50cnkucHJlcGVuZEJlZm9yZShuZXh0RW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSBudWxsLFxuICAgICAgICB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpIHtcbiAgICB2YXIgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeUhhdmluZ01hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlIYXZpbmdNYXJrZXI7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYikge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNiKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZShjYiwgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2IoZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNiLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNiKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIHZhciBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICB2YXIgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19