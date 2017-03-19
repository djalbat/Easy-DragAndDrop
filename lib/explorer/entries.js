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
      var name = fileName,
          file = React.createElement(File, { name: name, explorer: explorer, className: 'file' }),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, explorer, collapsed) {
      var name = directoryName,
          directory = React.createElement(this.Directory, { name: name, explorer: explorer, collapsed: collapsed, className: 'directory' }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiUmVhY3QiLCJvcHRpb25zIiwiRW50cnkiLCJGaWxlIiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkVudHJpZXMiLCJzZWxlY3RvciIsIkRpcmVjdG9yeSIsImZpbGVOYW1lIiwiZXhwbG9yZXIiLCJuYW1lIiwiZmlsZSIsImVudHJ5IiwiYWRkRW50cnkiLCJkaXJlY3RvcnlOYW1lIiwiY29sbGFwc2VkIiwiZGlyZWN0b3J5IiwicmV0cmlldmVGaWxlIiwiZ2V0RXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInJlbW92ZSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyTmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsIkRJUkVDVE9SWSIsInJldHJpZXZlTWFya2VyIiwibWFya2VkIiwiZW50cmllcyIsImdldEVudHJpZXMiLCJlbnRyaWVzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJuZXh0RW50cnkiLCJwcmV2aW91c0VudHJ5Iiwic29tZSIsIm5leHRFbnRyeUJlZm9yZSIsImlzQmVmb3JlIiwiYXBwZW5kIiwiaW5zZXJ0QmVmb3JlIiwicmV0cmlldmVFbnRyeUJ5VHlwZSIsInR5cGUiLCJNQVJLRVIiLCJzb21lRW50cnlCeVR5cGUiLCJtYXJrZWREaXJlY3RvcnkiLCJzb21lRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJzb21lRW50cnkiLCJlbnRyeU5hbWUiLCJnZXROYW1lIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJjYWxsYmFjayIsImZvckVhY2hFbnRyeUJ5VHlwZSIsImZvckVhY2giLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZm91bmRFbnRyeSIsImNoaWxkTGlzdEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxVQUFVRixPQUFPRSxPQUR2QjtBQUFBLElBRU1DLFFBQVFILE9BQU9HLEtBRnJCOztBQUlBLElBQU1DLFVBQVVILFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01JLFFBQVFKLFFBQVEsU0FBUixDQURkO0FBQUEsSUFFTUssT0FBT0wsUUFBUSx1QkFBUixDQUZiO0FBQUEsSUFHTU0sYUFBYU4sUUFBUSxxQkFBUixDQUhuQjtBQUFBLElBSU1PLGtCQUFrQlAsUUFBUSwwQkFBUixDQUp4Qjs7SUFNTVEsTzs7O0FBQ0osbUJBQVlDLFFBQVosRUFBc0JDLFNBQXRCLEVBQWlDO0FBQUE7O0FBQUEsa0hBQ3pCRCxRQUR5Qjs7QUFHL0IsVUFBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFIK0I7QUFJaEM7Ozs7NEJBRU9DLFEsRUFBVUMsUSxFQUFVO0FBQzFCLFVBQU1DLE9BQU9GLFFBQWI7QUFBQSxVQUNNRyxPQUFPLG9CQUFDLElBQUQsSUFBTSxNQUFNRCxJQUFaLEVBQWtCLFVBQVVELFFBQTVCLEVBQXNDLFdBQVUsTUFBaEQsR0FEYjtBQUFBLFVBRU1HLFFBQVFELElBRmQsQ0FEMEIsQ0FHTjs7QUFFcEIsV0FBS0UsUUFBTCxDQUFjRCxLQUFkO0FBQ0Q7OztpQ0FFWUUsYSxF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YSxJQUFqQjs7QUFFQSxXQUFLbEIsZUFBTCxDQUFxQixVQUFTbkMsS0FBVCxFQUFnQjtBQUNuQyxZQUFNMEMsWUFBWTFDLE1BQU0yQyxPQUFOLEVBQWxCOztBQUVBLFlBQUlELGNBQWM1QyxJQUFsQixFQUF3QjtBQUN0QnVELHVCQUFhckQsS0FBYjs7QUFFQSxpQkFBTyxJQUFQO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FWRCxFQVVHaUMsSUFWSDs7QUFZQSxVQUFNakMsUUFBUXFELFVBQWQsQ0FmOEIsQ0FlSjs7QUFFMUIsYUFBT3JELEtBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsVUFBTXNELG9CQUFvQixLQUFLQyxnQkFBTCxDQUFzQixJQUF0QixDQUExQjtBQUFBLFVBQ01uQyxVQUFVa0MsaUJBRGhCLENBRFcsQ0FFeUI7O0FBRXBDLGFBQU9sQyxPQUFQO0FBQ0Q7OzttQ0FFcUJvQyxVLEVBQVk7QUFBQSxVQUN4QjdELFNBRHdCLEdBQ1Y2RCxVQURVLENBQ3hCN0QsU0FEd0I7OztBQUdoQyxhQUFPVCxRQUFRdUUsY0FBUixDQUF1QmhFLE9BQXZCLEVBQWdDK0QsVUFBaEMsRUFBNEM3RCxTQUE1QyxDQUFQO0FBQ0Q7Ozs7RUFoU21CVCxPOztBQW1TdEJ3RSxPQUFPQyxNQUFQLENBQWNsRSxPQUFkLEVBQXVCO0FBQ3JCbUUsV0FBUyxJQURZO0FBRXJCQyxxQkFBbUIsQ0FDakIsV0FEaUI7QUFGRSxDQUF2Qjs7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQnRFLE9BQWpCIiwiZmlsZSI6ImVudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlJyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGZpbGUgPSA8RmlsZSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNsYXNzTmFtZT1cImZpbGVcIiAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGRpcmVjdG9yeSA9IDx0aGlzLkRpcmVjdG9yeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBjbGFzc05hbWU9XCJkaXJlY3RvcnlcIiAvPixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBmaWxlLnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICBoYXNGaWxlKGZpbGVOYW1lKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSk7XG5cbiAgICBmaWxlID0gKGZpbGUgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBsZXQgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICBcbiAgICBkaXJlY3RvcnkgPSAoZGlyZWN0b3J5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXI7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlck5hbWU7ICAvLy9cblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IDxGaWxlTWFya2VyIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm1hcmtlclwiIC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBsZXQgcHJldmlvdXNFbnRyeSA9IG51bGw7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmIChuZXh0RW50cnlCZWZvcmUpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG4gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZUZpbGUoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgbGV0IGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICBjb25zdCBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeSB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzLCBEaXJlY3RvcnkpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICdEaXJlY3RvcnknXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iXX0=