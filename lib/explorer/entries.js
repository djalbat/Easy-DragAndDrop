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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJwYXJlbnRFbGVtZW50IiwiRGlyZWN0b3J5IiwiZmlsZU5hbWUiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiZmlsZSIsImNsb25lIiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnkiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJlbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsInJlbW92ZSIsIm1hcmtlZCIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJ1bmRlZmluZWQiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsInNvbWUiLCJpc0JlZm9yZSIsImFwcGVuZCIsInByZXBlbmRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImNiIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJjaGlsZExpc3RFbGVtZW50cyIsImNoaWxkRWxlbWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixD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QUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BVkQsRUFVR3lCLElBVkg7O0FBWUEsVUFBSXpCLFFBQVFzQyxVQUFaLENBZjhCLENBZU47O0FBRXhCLGFBQU90QyxLQUFQO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUl5QyxvQkFBb0IsS0FBS0MsYUFBTCxDQUFtQixJQUFuQixDQUF4QjtBQUFBLFVBQ0l4QixVQUFVdUIsaUJBRGQsQ0FEVyxDQUV1Qjs7QUFFbEMsYUFBT3ZCLE9BQVA7QUFDRDs7OztFQXBNbUIvQixPOztBQXVNdEJ3RCxPQUFPQyxPQUFQLEdBQWlCcEQsT0FBakIiLCJmaWxlIjoiZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz4uZW50cmllcyddKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEZpbGUuY2xvbmUoZmlsZU5hbWUsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciksXG4gICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLkRpcmVjdG9yeS5jbG9uZShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciksXG4gICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5OyAgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIHZhciBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IHVuZGVmaW5lZCxcbiAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAobmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0VudHJ5LnByZXBlbmRCZWZvcmUobmV4dEVudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gbnVsbCxcbiAgICAgICAgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYikgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2IpIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2IpIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBmb3JFYWNoRW50cnkoY2IpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYihlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNiKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYiwgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIHJldHVybiBjYihlbnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICB2YXIgZm91bmRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICB2YXIgZW50cnkgPSBmb3VuZEVudHJ5OyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgdmFyIGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==