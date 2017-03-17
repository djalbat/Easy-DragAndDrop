'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    React = easyui.React;

var options = require('../options'),
    Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/marker/file'),
    DirectoryMarker = require('./entry/marker/directory');

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
      var file = React.createElement(File, { fileName: fileName, explorer: explorer, className: 'file' }),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, explorer) {
      var name = directoryName,
          directory = React.createElement(this.Directory, { name: name, collapsed: collapsed, explorer: explorer, className: 'directory' }),
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

      var name = markerName; ///

      switch (draggableEntryType) {
        case Entry.types.FILE:
          marker = React.createElement(FileMarker, { name: name, className: 'marker' });
          break;

        case Entry.types.DIRECTORY:
          marker = React.createElement(DirectoryMarker, { name: name, className: 'marker' });
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
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var Directory = properties.Directory;


      return Element.fromProperties(Entries, properties, Directory);
    }
  }]);

  return Entries;
}(Element);

Object.assign(Entries, {
  tagName: 'ul',
  ignoredAttributes: ['Directory']
});

module.exports = Entries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiUmVhY3QiLCJvcHRpb25zIiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJzZWxlY3RvciIsIkRpcmVjdG9yeSIsImZpbGVOYW1lIiwiZXhwbG9yZXIiLCJmaWxlIiwiZW50cnkiLCJhZGRFbnRyeSIsImRpcmVjdG9yeU5hbWUiLCJjb2xsYXBzZWQiLCJuYW1lIiwiZGlyZWN0b3J5IiwicmV0cmlldmVGaWxlIiwiZ2V0RXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInJlbW92ZSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyTmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsIkRJUkVDVE9SWSIsInJldHJpZXZlTWFya2VyIiwibWFya2VkIiwiZW50cmllcyIsImdldEVudHJpZXMiLCJlbnRyaWVzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5Iiwic29tZSIsIm5leHRFbnRyeUJlZm9yZSIsImlzQmVmb3JlIiwiYXBwZW5kIiwiaW5zZXJ0QmVmb3JlIiwicmV0cmlldmVFbnRyeUJ5VHlwZSIsInR5cGUiLCJNQVJLRVIiLCJzb21lRW50cnlCeVR5cGUiLCJtYXJrZWREaXJlY3RvcnkiLCJzb21lRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJjYWxsYmFjayIsImZvckVhY2hFbnRyeUJ5VHlwZSIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZm91bmRFbnRyeSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxVQUFVRixPQUFPRSxPQUR2QjtBQUFBLElBRU1DLFFBQVFILE9BQU9HLEtBRnJCOztBQUlBLElBQU1DLFVBQVVILFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01JLFFBQVFKLFFBQVEsU0FBUixDQURkO0FBQUEsSUFFTUssT0FBT0wsUUFBUSx1QkFBUixDQUZiO0FBQUEsSUFHTU0sYUFBYU4sUUFBUSxxQkFBUixDQUhuQjtBQUFBLElBSU1PLGtCQUFrQlAsUUFBUSwwQkFBUixDQUp4Qjs7SUFNTVEsTzs7O0FBQ0osbUJBQVlDLFFBQVosRUFBc0JDLFNBQXRCLEVBQWlDO0FBQUE7O0FBQUEsa0hBQ3pCRCxRQUR5Qjs7QUFHL0IsVUFBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFIK0I7QUFJaEM7Ozs7NEJBRU9DLFEsRUFBVUMsUSxFQUFVO0FBQzFCLFVBQU1DLE9BQU8sb0JBQUMsSUFBRCxJQUFNLFVBQVVGLFFBQWhCLEVBQTBCLFVBQVVDLFFBQXBDLEVBQThDLFdBQVUsTUFBeEQsR0FBYjtBQUFBLFVBQ01FLFFBQVFELElBRGQsQ0FEMEIsQ0FFTjs7QUFFcEIsV0FBS0UsUUFBTCxDQUFjRCxLQUFkO0FBQ0Q7OztpQ0FFWUUsYSxFQUFlQyxTLEVBQVdMLFEsRUFBVTtB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TCxDQUFxQixVQUFTcEMsS0FBVCxFQUFnQjtBQUNuQyxZQUFNMkMsWUFBWTNDLE1BQU00QyxPQUFOLEVBQWxCOztBQUVBLFlBQUlELGNBQWN2QyxJQUFsQixFQUF3QjtBQUN0QmtELHVCQUFhdEQsS0FBYjs7QUFFQSxpQkFBTyxJQUFQO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FWRCxFQVVHa0MsSUFWSDs7QUFZQSxVQUFNbEMsUUFBUXNELFVBQWQsQ0FmOEIsQ0FlSjs7QUFFMUIsYUFBT3RELEtBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBTXVELG9CQUFvQixLQUFLQyxnQkFBTCxDQUFzQixJQUF0QixDQUExQjtBQUFBLFVBQ01uQyxVQUFVa0MsaUJBRGhCLENBRFcsQ0FFeUI7O0FBRXBDLGFBQU9sQyxPQUFQO0FBQ0Q7OzttQ0FFcUJvQyxVLEVBQVk7QUFBQSxVQUN4QjdELFNBRHdCLEdBQ1Y2RCxVQURVLENBQ3hCN0QsU0FEd0I7OztBQUdoQyxhQUFPVCxRQUFRdUUsY0FBUixDQUF1QmhFLE9BQXZCLEVBQWdDK0QsVUFBaEMsRUFBNEM3RCxTQUE1QyxDQUFQO0FBQ0Q7Ozs7RUEvUm1CVCxPOztBQWtTdEJ3RSxPQUFPQyxNQUFQLENBQWNsRSxPQUFkLEVBQXVCO0FBQ3JCbUUsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUIsQ0FDakIsV0FEaUI7QUFGRSxDQUF2Qjs7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQnRFLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlJyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgZmlsZSA9IDxGaWxlIGZpbGVOYW1lPXtmaWxlTmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjbGFzc05hbWU9XCJmaWxlXCIgLz4sXG4gICAgICAgICAgZW50cnkgPSBmaWxlOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBuYW1lID0gZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICBkaXJlY3RvcnkgPSA8dGhpcy5EaXJlY3RvcnkgbmFtZT17bmFtZX0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY2xhc3NOYW1lPVwiZGlyZWN0b3J5XCIgLz4sXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaGFzRmlsZShmaWxlTmFtZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZSA9IChmaWxlICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgbGV0IGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyO1xuICAgIFxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJOYW1lOyAgLy8vXG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSA8RmlsZU1hcmtlciBuYW1lPXtuYW1lfSBjbGFzc05hbWU9XCJtYXJrZXJcIiAvPjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSA8RGlyZWN0b3J5TWFya2VyIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm1hcmtlclwiIC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgbGV0IHByZXZpb3VzRW50cnkgPSBudWxsO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5ID0gZGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHNvbWVGaWxlKGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIGxldCBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgY29uc3QgZW50cnkgPSBmb3VuZEVudHJ5OyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnkgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgRGlyZWN0b3J5KTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnRGlyZWN0b3J5J1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIl19