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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJyZWFkT25seSIsImRyYWdFdmVudEhhbmRsZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJmaWxlIiwiY2xvbmUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyTmFtZSIsImVudHJ5VHlwZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsIkRJUkVDVE9SWSIsInJldHJpZXZlTWFya2VyIiwicmVtb3ZlIiwibWFya2VkIiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInVuZGVmaW5lZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwic29tZSIsImlzQmVmb3JlIiwiYXBwZW5kIiwicHJlcGVuZEJlZm9yZSIsInJldHJpZXZlRW50cnlCeVR5cGUiLCJ0eXBlIiwiTUFSS0VSIiwic29tZUVudHJ5QnlUeXBlIiwibWFya2VkRGlyZWN0b3J5Iiwic29tZURpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiY2IiLCJmb3JFYWNoRW50cnlCeVR5cGUiLCJmb3JFYWNoIiwiZ2V0VHlwZSIsIm5hbWUiLCJmb3VuZEVudHJ5IiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0Ms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LHVCQUFhdEMsS0FBYjs7QUFFQSxpQkFBTyxJQUFQO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FWRCxFQVVHeUIsSUFWSDs7QUFZQSxVQUFJekIsUUFBUXNDLFVBQVosQ0FmOEIsQ0FlTjs7QUFFeEIsYUFBT3RDLEtBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBSXlDLG9CQUFvQixLQUFLQyxhQUFMLENBQW1CLElBQW5CLENBQXhCO0FBQUEsVUFDSXhCLFVBQVV1QixpQkFEZCxDQURXLENBRXVCOztBQUVsQyxhQUFPdkIsT0FBUDtBQUNEOzs7O0VBcE1tQmhDLE87O0FBdU10QnlELE9BQU9DLE9BQVAsR0FBaUJyRCxPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgRmlsZSA9IHJlcXVpcmUoJy4vZHJhZ2dhYmxlRW50cnkvZmlsZScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKFtwYXJlbnRFbGVtZW50LCAnPi5lbnRyaWVzJ10pO1xuXG4gICAgdGhpcy5EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGFkZEZpbGUoZmlsZU5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEZpbGUuY2xvbmUoZmlsZU5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgIFxuICAgIGRpcmVjdG9yeSA9IChkaXJlY3RvcnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICB2YXIgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgIHByZXZpb3VzRW50cnkgPSB1bmRlZmluZWQsXG4gICAgICAgIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSkpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNFbnRyeS5wcmVwZW5kQmVmb3JlKG5leHRFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IG51bGwsXG4gICAgICAgIHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5ID0gZGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRGlyZWN0b3J5KGNiKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNiKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2IoZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2IoZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgdmFyIGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIHZhciBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=