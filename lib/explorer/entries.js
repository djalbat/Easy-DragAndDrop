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

  function Entries(selector, Directory) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, selector));

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
      var marker = void 0;

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
          entries = this.getEntries();

      var previousEntry = null;

      entries.some(function (entry) {
        var nextEntryBefore = nextEntry.isBefore(entry);

        if (nextEntryBefore) {
          previousEntry = entry;

          return true;
        } else {
          return false;
        }
      });

      if (previousEntry === null) {
        this.append(nextEntry);
      } else {
        nextEntry.insertBefore(previousEntry);
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
      var marker = null;

      var type = Entry.types.MARKER;

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
      var childListElements = this.getChildElements('li'),
          entries = childListElements; ///

      return entries;
    }
  }], [{
    key: 'fromParentElement',
    value: function fromParentElement(parentElement, Directory) {
      var selector = '.entries',
          domElement = parentElement.domElement.querySelector(selector);

      return Element.fromDOMElement(Entries, domElement, Directory);
    }
  }]);

  return Entries;
}(Element);

module.exports = Entries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50Iiwib3B0aW9ucyIsIkVudHJ5IiwiRmlsZSIsIkZpbGVNYXJrZXIiLCJEaXJlY3RvcnlNYXJrZXIiLCJFbnRyaWVzIiwic2VsZWN0b3IiLCJEaXJlY3RvcnkiLCJmaWxlTmFtZSIsImV4cGxvcmVyIiwiZmlsZSIsImNsb25lIiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJkaXJlY3RvcnkiLCJyZXRyaWV2ZUZpbGUiLCJnZXRFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwicmVtb3ZlIiwicmV0cmlldmVEaXJlY3RvcnkiLCJtYXJrZXJOYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwibWFya2VyIiwidHlwZXMiLCJGSUxFIiwiRElSRUNUT1JZIiwicmV0cmlldmVNYXJrZXIiLCJtYXJrZWQiLCJlbnRyaWVzIiwiZ2V0RW50cmllcyIsImVudHJpZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsIm5leHRFbnRyeSIsInByZXZpb3VzRW50cnkiLCJzb21lIiwibmV4dEVudHJ5QmVmb3JlIiwiaXNCZWZvcmUiLCJhcHBlbmQiLCJpbnNlcnRCZWZvcmUiLCJyZXRyaWV2ZUVudHJ5QnlUeXBlIiwidHlwZSIsIk1BUktFUiIsInNvbWVFbnRyeUJ5VHlwZSIsIm1hcmtlZERpcmVjdG9yeSIsInNvbWVEaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInNvbWVFbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImNhbGxiYWNrIiwiZm9yRWFjaEVudHJ5QnlUeXBlIiwiZm9yRWFjaCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZm91bmRFbnRyeSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInBhcmVudEVsZW1lbnQiLCJkb21FbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImZyb21ET01FbGVtZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLFVBQVVGLE9BQU9FLE9BRHZCOztBQUdBLElBQU1DLFVBQVVGLFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01HLFFBQVFILFFBQVEsU0FBUixDQURkO0FBQUEsSUFFTUksT0FBT0osUUFBUSx1QkFBUixDQUZiO0FBQUEsSUFHTUssYUFBYUwsUUFBUSxvQkFBUixDQUhuQjtBQUFBLElBSU1NLGtCQUFrQk4sUUFBUSx5QkFBUixDQUp4Qjs7SUFNTU8sTzs7O0FBQ0osbUJBQVlDLFFBQVosRUFBc0JDLFNBQXRCLEVBQWlDO0FBQUE7O0FBQUEsa0hBQ3pCRCxRQUR5Qjs7QUFHL0IsVUFBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFIK0I7QUFJaEM7Ozs7NEJBRU9DLFEsRUFBVUMsUSxFQUFVO0FBQzFCLFVBQU1DLE9BQU9SLEtBQUtTLEtBQUwsQ0FBV0gsUUFBWCxFQUFxQkMsUUFBckIsQ0FBYjtBQUFBLFVBQ01HLFFBQVFGLElBRGQsQ0FEMEIsQ0FFTjs7QUFFcEIsV0FBS0csUUFBTCxDQUFjRCxLQUFkO0FBQ0Q7OztpQ0FFWUUsYSxFQUFlQyxTLEVBQVdOLFEsRUFBVTtBQUMvQyxVQUFNTyxZQUFZLEtBQUtULFNBQUwsQ0FBZUksS0FBZixDQUFxQkcsYUFBckIsRUFBb0NDLFNBQXBDLEVBQStDTixR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SUFWSDs7QUFZQSxVQUFNakMsUUFBUXNELFVBQWQsQ0FmOEIsQ0FlSjs7QUFFMUIsYUFBT3RELEtBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBTXVELG9CQUFvQixLQUFLQyxnQkFBTCxDQUFzQixJQUF0QixDQUExQjtBQUFBLFVBQ0twQyxVQUFVbUMsaUJBRGYsQ0FEVyxDQUV3Qjs7QUFFbkMsYUFBT25DLE9BQVA7QUFDRDs7O3NDQUV3QnFDLGEsRUFBZTlELFMsRUFBVztBQUNqRCxVQUFNRCxXQUFXLFVBQWpCO0FBQUEsVUFDTWdFLGFBQWFELGNBQWNDLFVBQWQsQ0FBeUJDLGFBQXpCLENBQXVDakUsUUFBdkMsQ0FEbkI7O0FBR0EsYUFBT1AsUUFBUXlFLGNBQVIsQ0FBdUJuRSxPQUF2QixFQUFnQ2lFLFVBQWhDLEVBQTRDL0QsU0FBNUMsQ0FBUDtBQUNEOzs7O0VBN1JtQlIsTzs7QUFnU3RCMEUsT0FBT0MsT0FBUCxHQUFpQnJFLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9maWxlTWFya2VyJyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBEaXJlY3RvcnkpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLkRpcmVjdG9yeSA9IERpcmVjdG9yeTtcbiAgfVxuICBcbiAgYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBmaWxlID0gRmlsZS5jbG9uZShmaWxlTmFtZSwgZXhwbG9yZXIpLFxuICAgICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5EaXJlY3RvcnkuY2xvbmUoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciksXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaGFzRmlsZShmaWxlTmFtZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZSA9IChmaWxlICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgbGV0IGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gRmlsZU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSBEaXJlY3RvcnlNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBsZXQgcHJldmlvdXNFbnRyeSA9IG51bGw7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmIChuZXh0RW50cnlCZWZvcmUpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG4gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZUZpbGUoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgbGV0IGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICBjb25zdCBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVBhcmVudEVsZW1lbnQocGFyZW50RWxlbWVudCwgRGlyZWN0b3J5KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSAnLmVudHJpZXMnLFxuICAgICAgICAgIGRvbUVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LmRvbUVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChFbnRyaWVzLCBkb21FbGVtZW50LCBEaXJlY3RvcnkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiJdfQ==