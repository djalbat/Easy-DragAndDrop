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

      return !!directory; ///
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
    key: 'hasMarker',
    value: function hasMarker() {
      var marker = this.retrieveMarker();

      return !!marker; ///
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
      var marker = undefined,
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
      var foundEntry = undefined;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJyZWFkT25seSIsImRyYWdFdmVudEhhbmRsZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJmaWxlIiwiY2xvbmUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyTmFtZSIsImVudHJ5VHlwZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsIkRJUkVDVE9SWSIsInJldHJpZXZlTWFya2VyIiwicmVtb3ZlIiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInVuZGVmaW5lZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwic29tZSIsImlzQmVmb3JlIiwiYXBwZW5kIiwicHJlcGVuZEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwiZGlyZWN0b3J5SGF2aW5nTWFya2VyIiwic29tZURpcmVjdG9yeSIsImdldERpcmVjdG9yeUhhdmluZ01hcmtlciIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiY2IiLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZ2V0VHlwZSIsIm5hbWUiLCJmb3VuZEVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEs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QWI7O0FBRUEsaUJBQU8sSUFBUDtBQUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BVkQsRUFVR3dCLElBVkg7O0FBWUEsVUFBSXhCLFFBQVFxQyxVQUFaLENBZjhCLENBZU47O0FBRXhCLGFBQU9yQyxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUl3QyxvQkFBb0IsS0FBS0MsYUFBTCxDQUFtQixJQUFuQixDQUF4QjtBQUFBLFVBQ0l4QixVQUFVdUIsaUJBRGQsQ0FEVyxDQUV1Qjs7QUFFbEMsYUFBT3ZCLE9BQVA7QUFDRDs7OztFQWpNbUIvQixPOztBQW9NdEJ3RCxPQUFPQyxPQUFQLEdBQWlCcEQsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz4uZW50cmllcyddKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBGaWxlLmNsb25lKGZpbGVOYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBmaWxlOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuRGlyZWN0b3J5LmNsb25lKGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgIHJldHVybiAhIWRpcmVjdG9yeTsgLy8vXG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgcmV0dXJuICEhbWFya2VyOyAgLy8vXG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIHZhciBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IHVuZGVmaW5lZCxcbiAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAobmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0VudHJ5LnByZXBlbmRCZWZvcmUobmV4dEVudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdW5kZWZpbmVkLFxuICAgICAgICB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpIHtcbiAgICB2YXIgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeUhhdmluZ01hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlIYXZpbmdNYXJrZXI7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYikge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNiKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZShjYiwgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2IoZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNiLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNiKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIHZhciBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=