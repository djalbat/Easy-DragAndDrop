'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var options = require('../options'),
    Entry = require('./entry'),
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
    value: function addFile(fileName, explorer, activateFileEventHandler) {
      var file = File.clone(fileName, explorer, activateFileEventHandler),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, explorer, activateFileEventHandler) {
      var directory = this.Directory.clone(directoryName, collapsed, explorer, activateFileEventHandler),
          entry = directory; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(fileName) {
      var file = this.retrieveFile(fileName),
          explorer = file.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      file.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName),
          explorer = directory.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directory.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'hasFile',
    value: function hasFile(fileName) {
      var file = this.retrieveFile(fileName);

      file = file !== null; ///

      return file;
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
    value: function addMarker(markerName, draggableEntryType) {
      var marker;

      switch (draggableEntryType) {
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
    key: 'isEmpty',
    value: function isEmpty() {
      var entries = this.getEntries(),
          entriesLength = entries.length,
          empty = entriesLength === 0;

      return empty;
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
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = null;

      this.someEntry(function (entry) {
        if (entry === draggableEntry) {
          ///
          var entryName = entry.getName();

          draggableEntryPath = entryName; ///

          return true;
        } else {
          return false;
        }
      });

      if (draggableEntryPath === null) {
        this.someDirectory(function (directory) {
          var directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
          } else {
            return false;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null;

      this.someDirectory(function (directory) {
        directoryOverlappingDraggableEntry = directory.getDirectoryOverlappingDraggableEntry(draggableEntry);

        if (directoryOverlappingDraggableEntry !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryOverlappingDraggableEntry;
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
    key: 'someFile',
    value: function someFile(callback) {
      return this.someEntryByType(callback, Entry.types.FILE);
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
    key: 'someEntry',
    value: function someEntry(callback, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        return callback(entry);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50Iiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZSIsIkZpbGVNYXJrZXIiLCJEaXJlY3RvcnlNYXJrZXIiLCJFbnRyaWVzIiwicGFyZW50RWxlbWVudCIsIkRpcmVjdG9yeSIsImZpbGVOYW1lIiwiZXhwbG9yZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJmaWxlIiwiY2xvbmUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRmlsZSIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJyZW1vdmUiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInVuZGVmaW5lZCIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsInByZXBlbmRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInNvbWVFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxVQUFVRixRQUFRLFlBQVIsQ0FBZDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsU0FBUixDQURaO0FBQUEsSUFFSUksT0FBT0osUUFBUSx1QkFBUixDQUZYO0FBQUEsSUFHSUssYUFBYUwsUUFBUSxvQkFBUixDQUhqQjtBQUFBLElBSUlNLGtCQUFrQk4sUUFBUSx5QkFBUixDQUp0Qjs7SUFNTU8sTzs7O0FBQ0osbUJBQVlDLGFBQVosRUFBMkJDLFNBQTNCLEVBQXNDO0FBQUE7O0FBQUEsa0hBQzlCLENBQUNELGFBQUQsRUFBZ0IsV0FBaEIsQ0FEOEI7O0FBR3BDLFVBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBSG9DO0FBSXJDOzs7OzRCQUVPQyxRLEVBQVVDLFEsRUFBVUMsd0IsRUFBMEI7QUFDcEQsVUFBSUMsT0FBT1QsS0FBS1UsS0FBTCxDQUFXSixRQUFYLEVBQXFCQyxRQUFyQixFQUErQkMsd0JBQS9CLENBQVg7QUFBQSxVQUNJRyxRQUFRRixJQURaLENBRG9ELENBRWxDOztBQUVsQixXQUFLRyxRQUFMLENBQWNELEtBQWQ7QUFDRDs7O2lDQUVZRSxhLEVBQWVDLFMsRUFBV1AsUSxFQUFVQyx3QixFQUEwQjtBQUN6RSxVQUFJTyxZQUFZLEtBQUtWLFNBQUwsQ0FBZUssS0FB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QUlPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FWRCxFQVVHa0MsSUFWSDs7QUFZQSxVQUFJbEMsUUFBUXVELFVBQVosQ0FmOEIsQ0FlTjs7QUFFeEIsYUFBT3ZELEtBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBSXdELG9CQUFvQixLQUFLQyxhQUFMLENBQW1CLElBQW5CLENBQXhCO0FBQUEsVUFDSXJDLFVBQVVvQyxpQkFEZCxDQURXLENBRXVCOztBQUVsQyxhQUFPcEMsT0FBUDtBQUNEOzs7O0VBcFJtQmxDLE87O0FBdVJ0QndFLE9BQU9DLE9BQVAsR0FBaUJuRSxPQUFqQiIsImZpbGUiOiJlbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoW3BhcmVudEVsZW1lbnQsICc+LmVudHJpZXMnXSk7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuICBcbiAgYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBmaWxlID0gRmlsZS5jbG9uZShmaWxlTmFtZSwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciksXG4gICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIHZhciBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpLFxuICAgICAgICBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaGFzRmlsZShmaWxlTmFtZSkge1xuICAgIHZhciBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZSA9IChmaWxlICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG4gIFxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICBwcmV2aW91c0VudHJ5ID0gdW5kZWZpbmVkLFxuICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRW50cnkucHJlcGVuZEJlZm9yZShuZXh0RW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSBudWxsLFxuICAgICAgICB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHNvbWVGaWxlKGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaywgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIHZhciBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICB2YXIgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19