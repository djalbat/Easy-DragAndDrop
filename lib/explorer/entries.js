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
    key: 'hasDirectory',
    value: function hasDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName);

      return !!directory; ///
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
    key: 'directoryOverlappingEntry',
    value: function directoryOverlappingEntry(entry) {
      var directoryOverlappingEntry = null;

      this.someDirectory(function (directory) {
        directoryOverlappingEntry = directory.directoryOverlappingEntry(entry);

        if (directoryOverlappingEntry !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryOverlappingEntry;
    }
  }, {
    key: 'directoryHavingMarker',
    value: function directoryHavingMarker(entry) {
      var directoryHavingMarker = null;

      this.someDirectory(function (directory) {
        directoryHavingMarker = directory.directoryHavingMarker(entry);

        if (directoryHavingMarker !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryHavingMarker;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksUUFBUSxRQUFRLFNBQVIsQ0FBWjtJQUNJLE9BQU8sUUFBUSx1QkFBUixDQURYO0lBRUksYUFBYSxRQUFRLG9CQUFSLENBRmpCO0lBR0ksa0JBQWtCLFFBQVEseUJBQVIsQ0FIdEI7O0lBS00sTzs7O0FBQ0osbUJBQVksYUFBWixFQUEyQixTQUEzQixFQUFzQztBQUFBOztBQUFBLDJGQUM5QixDQUFDLGFBQUQsRUFBZ0IsV0FBaEIsQ0FEOEI7O0FBR3BDLFVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUhvQztBQUlyQzs7Ozs0QkFFTyxRLEVBQVUsUSxFQUFVLGdCLEVBQWtCLHdCLEVBQTBCO0FBQ3RFLFVBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLFFBQXJCLEVBQStCLGdCQUEvQixFQUFpRCx3QkFBakQsQ0FBWDtVQUNJLFFBQVEsSUFEWixDOztBQUdBLFdBQUssUUFBTCxDQUFjLEtBQWQ7QUFDRDs7O2lDQUVZLGEsRUFBZSxTLEVBQVcsZ0IsRUFBa0Isd0IsRUFBMEI7QUFDakYsVUFBSSxZQUFZLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsYUFBckIsRUFBb0MsU0FBcEMsRUFBK0MsZ0JBQS9DLEVBQWlFLHdCQUFqRSxDQUFoQjtVQUNJLFFBQVEsU0FEWixDOztBQUdBLFdBQUssUUFBTCxDQUFjLEtBQWQ7QUFDRDs7OzhCQUVTLFUsRUFBWSxTLEVBQVc7QUFDL0IsVUFBSSxNQUFKOztBQUVBLGNBQVEsU0FBUjtBQUNFLGFBQUssTUFBTSxLQUFOLENBQVksSUFBakI7QUFDRSxtQkFBUyxXQUFXLEtBQVgsQ0FBaUIsVUFBakIsQ0FBVDtBQUNBOztBQUVGLGFBQUssTUFBTSxLQUFOLENBQVksU0FB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TXRCLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgRmlsZSA9IHJlcXVpcmUoJy4vZHJhZ2dhYmxlRW50cnkvZmlsZScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKFtwYXJlbnRFbGVtZW50LCAnPi5lbnRyaWVzJ10pO1xuXG4gICAgdGhpcy5EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVOYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGZpbGUgPSBGaWxlLmNsb25lKGZpbGVOYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBmaWxlOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuRGlyZWN0b3J5LmNsb25lKGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSkge1xuICAgIHZhciBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIHJldHVybiAhIW1hcmtlcjsgIC8vL1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgIHJldHVybiAhIWRpcmVjdG9yeTsgLy8vXG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIHZhciBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IHVuZGVmaW5lZCxcbiAgICAgICAgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSkpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNFbnRyeS5wcmVwZW5kQmVmb3JlKG5leHRFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHVuZGVmaW5lZCxcbiAgICAgICAgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeS5kaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRpcmVjdG9yeS5kaXJlY3RvcnlIYXZpbmdNYXJrZXIoZW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5SGF2aW5nTWFya2VyICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYikge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRFbGVtZW50czsgIC8vL1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYihlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNiKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19
