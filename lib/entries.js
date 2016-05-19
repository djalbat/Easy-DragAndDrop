'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('./entry'),
    File = require('./explorer/draggableEntry/file'),
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
    value: function addFile(fileName, readOnly, eventHandler) {
      var file = File.clone(fileName, readOnly, eventHandler),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(fileName) {
      this.removeEntryByType(fileName, Entry.types.FILE);
    }
  }, {
    key: 'retrieveFile',
    value: function retrieveFile(fileName) {
      return this.retrieveEntryByType(fileName, Entry.types.FILE);
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(cb) {
      this.forEachEntryByType(cb, Entry.types.FILE);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, eventHandler) {
      var directory = this.Directory.clone(directoryName, collapsed, eventHandler),
          entry = directory; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryName) {
      this.removeEntryByType(directoryName, Entry.types.DIRECTORY);
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryName) {
      return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY);
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
    key: 'hasDirectory',
    value: function hasDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName);

      return !!directory; ///
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerName, entryType) {
      var entry, marker;

      switch (entryType) {
        case Entry.types.FILE:
          marker = FileMarker.clone(markerName);
          break;

        case Entry.types.DIRECTORY:
          marker = DirectoryMarker.clone(markerName);
          break;
      }

      entry = marker; ///

      this.addEntry(entry);

      return marker;
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var marker = this.retrieveMarker();

      marker.remove();
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
  }, {
    key: 'removeEntryByType',
    value: function removeEntryByType(name, type) {
      var entry = this.retrieveEntryByType(name, type);

      entry.remove();
    }
  }]);

  return Entries;
}(Element);

module.exports = Entries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFUO0lBQ0EsVUFBVSxPQUFPLE9BQVA7O0FBRWQsSUFBSSxRQUFRLFFBQVEsU0FBUixDQUFSO0lBQ0EsT0FBTyxRQUFRLGdDQUFSLENBQVA7SUFDQSxhQUFhLFFBQVEsb0JBQVIsQ0FBYjtJQUNBLGtCQUFrQixRQUFRLHlCQUFSLENBQWxCOztJQUVFOzs7QUFDSixXQURJLE9BQ0osQ0FBWSxhQUFaLEVBQTJCLFNBQTNCLEVBQXNDOzBCQURsQyxTQUNrQzs7dUVBRGxDLG9CQUVJLENBQUMsYUFBRCxFQUFnQixXQUFoQixJQUQ4Qjs7QUFHcEMsVUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBSG9DOztHQUF0Qzs7ZUFESTs7NEJBT0ksVUFBVSxVQUFVLGNBQWM7QUFDeEMsVUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUIsUUFBckIsRUFBK0IsWUFBL0IsQ0FBUDtVQUNBLFFBQVEsSUFBUjs7QUFGb0MsVUFJeEMsQ0FBSyxRQUFMLENBQWMsS0FBZCxFQUp3Qzs7OzsrQkFPL0IsVUFBVTtBQUNuQixXQUFLLGlCQUFMLENBQXVCLFFBQXZCLEVBQWlDLE1BQU0sS0FBTixDQUFZLElBQVosQ0FBakMsQ0FEbUI7Ozs7aUNBSVIsVUFBVTtBQUFFLGFBQU8sS0FBSyxtQkFBTCxDQUF5QixRQUF6QixFQUFtQyxNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQTFDLENBQUY7Ozs7Z0NBRVgsSUFBSTtBQUFFLFdBQUssa0JBQUwsQ0FBd0IsRUFBeEIsRUFBNEIsTUFBTSxLQUFOLENBQVksSUFBWixDQUE1QixDQUFGOzs7O2lDQUVILGVBQWUsV0FBVyxjQUFjO0FBQ25ELFVBQUksWUFBWSxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLGFBQXJCLEVBQW9DLFNBQXBDLEVBQStDLFlBQS9DLENBQVo7VUFDQSxRQUFR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WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICBGaWxlID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+LmVudHJpZXMnXSk7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZU5hbWUsIHJlYWRPbmx5LCBldmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEZpbGUuY2xvbmUoZmlsZU5hbWUsIHJlYWRPbmx5LCBldmVudEhhbmRsZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVOYW1lKSB7XG4gICAgdGhpcy5yZW1vdmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSk7XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNiLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuRGlyZWN0b3J5LmNsb25lKGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICB0aGlzLnJlbW92ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSk7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYiwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2IsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICByZXR1cm4gISFkaXJlY3Rvcnk7IC8vL1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSkge1xuICAgIHZhciBlbnRyeSxcbiAgICAgICAgbWFya2VyO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHVuZGVmaW5lZCxcbiAgICAgICAgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIHJldHVybiAhIW1hcmtlcjsgIC8vL1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICB2YXIgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgIHByZXZpb3VzRW50cnkgPSB1bmRlZmluZWQsXG4gICAgICAgIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgIGVudHJpZXMgPSBjaGlsZEVsZW1lbnRzOyAgLy8vXG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRW50cnkucHJlcGVuZEJlZm9yZShuZXh0RW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYikge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICBlbnRyaWVzID0gY2hpbGRFbGVtZW50czsgIC8vL1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYihlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2IsIHR5cGUpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgZW50cmllcyA9IGNoaWxkRWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNiKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgdmFyIGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICByZW1vdmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpO1xuXG4gICAgZW50cnkucmVtb3ZlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19
