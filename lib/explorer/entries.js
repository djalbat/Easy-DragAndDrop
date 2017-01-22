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
    value: function addFile(fileName, explorer) {
      var file = File.clone(fileName, explorer),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, explorer) {
      var directory = this.Directory.clone(directoryName, collapsed, explorer),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50Iiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZSIsIkZpbGVNYXJrZXIiLCJEaXJlY3RvcnlNYXJrZXIiLCJFbnRyaWVzIiwicGFyZW50RWxlbWVudCIsIkRpcmVjdG9yeSIsImZpbGVOYW1lIiwiZXhwbG9yZXIiLCJmaWxlIiwiY2xvbmUiLCJlbnRyeSIsImFkZEVudHJ5IiwiZGlyZWN0b3J5TmFtZSIsImNvbGxhcHNlZCIsImRpcmVjdG9yeSIsInJldHJpZXZlRmlsZSIsImdldEV4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJyZW1vdmUiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlck5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJtYXJrZXIiLCJ0eXBlcyIsIkZJTEUiLCJESVJFQ1RPUlkiLCJyZXRyaWV2ZU1hcmtlciIsIm1hcmtlZCIsImVudHJpZXMiLCJnZXRFbnRyaWVzIiwiZW50cmllc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwibmV4dEVudHJ5IiwicHJldmlvdXNFbnRyeSIsInVuZGVmaW5lZCIsInNvbWUiLCJuZXh0RW50cnlCZWZvcmUiLCJpc0JlZm9yZSIsImFwcGVuZCIsInByZXBlbmRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInNvbWVFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxVQUFVRixRQUFRLFlBQVIsQ0FBZDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsU0FBUixDQURaO0FBQUEsSUFFSUksT0FBT0osUUFBUSx1QkFBUixDQUZYO0FBQUEsSUFHSUssYUFBYUwsUUFBUSxvQkFBUixDQUhqQjtBQUFBLElBSUlNLGtCQUFrQk4sUUFBUSx5QkFBUixDQUp0Qjs7SUFNTU8sTzs7O0FBQ0osbUJBQVlDLGFBQVosRUFBMkJDLFNBQTNCLEVBQXNDO0FBQUE7O0FBQUEsa0hBQzlCLENBQUNELGFBQUQsRUFBZ0IsV0FBaEIsQ0FEOEI7O0FBR3BDLFVBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBSG9DO0FBSXJDOzs7OzRCQUVPQyxRLEVBQVVDLFEsRUFBVTtBQUMxQixVQUFJQyxPQUFPUixLQUFLUyxLQUFMLENBQVdILFFBQVgsRUFBcUJDLFFBQXJCLENBQVg7QUFBQSxVQUNJRyxRQUFRRixJQURaLENBRDBCLENBRVI7O0FBRWxCLFdBQUtHLFFBQUwsQ0FBY0QsS0FBZDtBQUNEOzs7aUNBRVlFLGEsRUFBZUMsUyxFQUFXTixRLEVBQVU7QUFDL0MsVUFBSU8sWUFBWSxLQUFLVCxTQUFMLENBQWVJLEtBQWYsQ0FBcUJHLGFBQXJCLEVBQW9DQyxTQUFwQyxFQUErQ04sUUFBL0MsQ0FBaEI7QUFBQSxVQUNJRyxRQUFR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QixDQWVOOztBQUV4QixhQUFPdkQsS0FBUDtBQUNEOzs7aUNBRVk7QUFDWCxVQUFJd0Qsb0JBQW9CLEtBQUtDLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBeEI7QUFBQSxVQUNJckMsVUFBVW9DLGlCQURkLENBRFcsQ0FFdUI7O0FBRWxDLGFBQU9wQyxPQUFQO0FBQ0Q7Ozs7RUFwUm1CakMsTzs7QUF1UnRCdUUsT0FBT0MsT0FBUCxHQUFpQmxFLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeScpLFxuICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9kaXJlY3RvcnlNYXJrZXInKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50LCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihbcGFyZW50RWxlbWVudCwgJz4uZW50cmllcyddKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIHZhciBmaWxlID0gRmlsZS5jbG9uZShmaWxlTmFtZSwgZXhwbG9yZXIpLFxuICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLkRpcmVjdG9yeS5jbG9uZShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKSxcbiAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIHZhciBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpLFxuICAgICAgICBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaGFzRmlsZShmaWxlTmFtZSkge1xuICAgIHZhciBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZSA9IChmaWxlICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICB2YXIgbWFya2VyO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG4gIFxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICBwcmV2aW91c0VudHJ5ID0gdW5kZWZpbmVkLFxuICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRW50cnkucHJlcGVuZEJlZm9yZShuZXh0RW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSBudWxsLFxuICAgICAgICB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHNvbWVGaWxlKGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaywgdHlwZSkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIHZhciBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIHZhciBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICB2YXIgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19