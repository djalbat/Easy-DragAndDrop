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
          childElements = this.childElements('li'),
          entries = childElements; ///

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
      var childElements = this.childElements('li'),
          entries = childElements; ///

      entries.forEach(function (entry) {
        cb(entry);
      });
    }
  }, {
    key: 'forEachEntryByType',
    value: function forEachEntryByType(cb, type) {
      var childElements = this.childElements('li'),
          entries = childElements; ///

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
      var childElements = this.childElements('li'),
          entries = childElements; ///

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
  }]);

  return Entries;
}(Element);

module.exports = Entries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksUUFBUSxRQUFRLFNBQVIsQ0FBWjtJQUNJLE9BQU8sUUFBUSx1QkFBUixDQURYO0lBRUksYUFBYSxRQUFRLG9CQUFSLENBRmpCO0lBR0ksa0JBQWtCLFFBQVEseUJBQVIsQ0FIdEI7O0lBS00sTzs7O0FBQ0osbUJBQVksYUFBWixFQUEyQixTQUEzQixFQUFzQztBQUFBOztBQUFBLDJGQUM5QixDQUFDLGFBQUQsRUFBZ0IsV0FBaEIsQ0FEOEI7O0FBR3BDLFVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUhvQztBQUlyQzs7Ozs0QkFFTyxRLEVBQVUsUSxFQUFVLGdCLEVBQWtCLHdCLEVBQTBCO0FBQ3RFLFVBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLFFBQXJCLEVBQStCLGdCQUEvQixFQUFpRCx3QkFBakQsQ0FBWDtVQUNJLFFBQVEsSUFEWixDOztBQUdBLFdBQUssUUFBTCxDQUFjLEtBQWQ7QUFDRDs7O2lDQUVZLGEsRUFBZSxTLEVBQVcsZ0IsRUFBa0Isd0IsRUFBMEI7QUFDakYsVUFBSSxZQUFZLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsYUFBckIsRUFBb0MsU0FBcEMsRUFBK0MsZ0JBQS9DLEVBQWlFLHdCQUFqRSxDQUFoQjtVQUNJLFFBQVEsU0FEWixDOztBQUdBLFdBQUssUUFBTCxDQUFjLEtBQWQ7QUFDRDs7O2lDQUVZLGEsRUFBZTtBQUMxQixVQUFJLFlBQVksS0FBSyxpQkFBTCxDQUF1QixhQUF2QixDQUFoQjs7QUFFQSxhQUFPLENBQUMsQ0FBQyxTQUFULEM7QUFDRDs7OzhCQUVTLFUsRUFBWSxTLEVBQVc7QUFDL0IsVUFBSSxNQUFKOztBQUVBLGNBQVEsU0FBUjtBQUNFLGFBQUss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LE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+LmVudHJpZXMnXSk7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZU5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEZpbGUuY2xvbmUoZmlsZU5hbWUsIHJlYWRPbmx5LCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgcmV0dXJuICEhZGlyZWN0b3J5OyAvLy9cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICByZXR1cm4gISFtYXJrZXI7ICAvLy9cbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICBwcmV2aW91c0VudHJ5ID0gdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRFbGVtZW50czsgIC8vL1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAobmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0VudHJ5LnByZXBlbmRCZWZvcmUobmV4dEVudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdW5kZWZpbmVkLFxuICAgICAgICB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpIHtcbiAgICB2YXIgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeUhhdmluZ01hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlIYXZpbmdNYXJrZXI7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYikge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRFbGVtZW50czsgIC8vL1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYihlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNiKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19
