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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entries).call(this, [parentElement, '>.entries']));

    _this.Directory = Directory;
    return _this;
  }

  _createClass(Entries, [{
    key: 'isEmpty',
    value: function isEmpty() {
      var entries = this.getEntries(),
          empty = entries.length === 0;

      return empty;
    }
  }, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksUUFBUSxRQUFRLFNBQVIsQ0FBWjtJQUNJLE9BQU8sUUFBUSx1QkFBUixDQURYO0lBRUksYUFBYSxRQUFRLG9CQUFSLENBRmpCO0lBR0ksa0JBQWtCLFFBQVEseUJBQVIsQ0FIdEI7O0lBS00sTzs7O0FBQ0osbUJBQVksYUFBWixFQUEyQixTQUEzQixFQUFzQztBQUFBOztBQUFBLDJGQUM5QixDQUFDLGFBQUQsRUFBZ0IsV0FBaEIsQ0FEOEI7O0FBR3BDLFVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUhvQztBQUlyQzs7Ozs4QkFFUztBQUNSLFVBQUksVUFBVSxLQUFLLFVBQUwsRUFBZDtVQUNJLFFBQVMsUUFBUSxNQUFSLEtBQW1CLENBRGhDOztBQUdBLGFBQU8sS0FBUDtBQUNEOzs7NEJBRU8sUSxFQUFVLFEsRUFBVSxnQixFQUFrQix3QixFQUEwQjtBQUN0RSxVQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixnQkFBL0IsRUFBaUQsd0JBQWpELENBQVg7VUFDSSxRQUFRLElBRFosQzs7QUFHQSxXQUFLLFFBQUwsQ0FBYyxLQUFkO0FBQ0Q7OztpQ0FFWSxhLEVBQWUsUyxFQUFXLGdCLEVBQWtCLHdCLEVBQTBCO0FBQ2pGLFVBQUksWUFBWSxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLGFBQXJCLEVBQW9DLFNBQXBDLEVBQStDLGdCQUEvQyxFQUFpRSx3QkFBakUsQ0FBaEI7VUFDSSxRQUFRLFNBRFosQzs7QUFHQSxXQUFLLFFBQUwsQ0FBYyxLQUFkO0FBQ0Q7OztpQ0FFWSxhLEVBQWU7QUFDMUIsVUFBSSxZQUFZLEtBQUssaUJBQUwsQ0FBdUIsYUFBdkIsQ0FBaEI7O0FBRUEs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QUFHQSxhQUFPLE9BQVA7QUFDRDs7OztFQXhNbUIsTzs7QUEyTXRCLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgRmlsZSA9IHJlcXVpcmUoJy4vZHJhZ2dhYmxlRW50cnkvZmlsZScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKFtwYXJlbnRFbGVtZW50LCAnPi5lbnRyaWVzJ10pO1xuXG4gICAgdGhpcy5EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGlzRW1wdHkoKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgZW1wdHkgPSAoZW50cmllcy5sZW5ndGggPT09IDApO1xuICAgIFxuICAgIHJldHVybiBlbXB0eTsgICAgXG4gIH1cbiAgXG4gIGFkZEZpbGUoZmlsZU5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEZpbGUuY2xvbmUoZmlsZU5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgcmV0dXJuICEhZGlyZWN0b3J5OyAvLy9cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICByZXR1cm4gISFtYXJrZXI7ICAvLy9cbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICBwcmV2aW91c0VudHJ5ID0gdW5kZWZpbmVkLFxuICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRW50cnkucHJlcGVuZEJlZm9yZShuZXh0RW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB1bmRlZmluZWQsXG4gICAgICAgIHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5SGF2aW5nTWFya2VyICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRGlyZWN0b3J5KGNiKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNiKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2IoZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2IoZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgdmFyIGZvdW5kRW50cnkgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICB2YXIgZW50cnkgPSBmb3VuZEVudHJ5OyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgdmFyIGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==
