'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var Entries = require('../../entries'),
    entryTypes = require('../../entryTypes'),
    DraggableEntry = require('../../entry/draggable');

var pathUtilities = necessary.pathUtilities,
    Button = easy.Button,
    React = easy.React,
    topmostDirectoryNameFromPath = pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath,
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    var type = DIRECTORY_NAME_TYPE;

    return _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).call(this, selector, type, explorer));
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          before = true;

          break;

        case DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;

          break;
      }

      return before;
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'getBounds', this).call(this),
          collapsedBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var entriesMarked = this.areEntriesMarked();

      if (entriesMarked) {
        marked = entriesMarked;
      } else {
        var directoryNameDraggableEntryMarked = this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

          return directoryNameDraggableEntryMarked;
        });

        marked = directoryNameDraggableEntryMarked; ///
      }

      return marked;
    }
  }, {
    key: 'isFileNameDraggableEntry',
    value: function isFileNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntry) {
      var overlappingDraggableEntry = void 0;

      if (this === draggableEntry) {
        overlappingDraggableEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingDraggableEntry = false;
        } else {
          var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'isOverlappingCollapsedBounds', this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;

      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

        if (!fileNameDraggableEntryPresent) {
          var explorer = this.getExplorer();

          fileNameDraggableEntry = this.addFileNameDraggableEntry(fileName, explorer);
        }
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed) {
      var directoryNameDraggableEntry = null;

      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
            entriesDirectoryNameDraggableEntryPresent = entriesDirectoryNameDraggableEntry !== null;

        if (entriesDirectoryNameDraggableEntryPresent) {
          entriesDirectoryNameDraggableEntry.setCollapsed(collapsed);
        } else {
          var explorer = this.getExplorer();

          directoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry);
        }
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var removeEmptyParentDirectoryNameDraggableEntries = null; ///

      var addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

        if (fileNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.removeFileNameDraggableEntry(fileName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var topmostDirectory = this.isTopmostDirectoryNameDraggableEntry();

        if (!topmostDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectoryNameDraggableEntries;
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var removeEmptyParentDirectoryNameDraggableEntries = false;

      var addIfNecessary = false,
          ///
      topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);

        if (entriesDirectoryNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.removeDirectoryNameDraggableEntry(directoryName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var topmostDirectory = this.isTopmostDirectoryNameDraggableEntry();

        if (!topmostDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectoryNameDraggableEntries;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerPath, draggableEntryType) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entriesAddMarkerEntry(markerName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

        topmostDirectoryNameDraggableEntry.addMarkerEntry(markerPathWithoutTopmostDirectoryName, draggableEntryType);
      }
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var removed = void 0;

      var entriesMarked = this.areEntriesMarked();

      if (entriesMarked) {
        this.entriesRemoveMarkerEntry();

        removed = true;
      } else {
        removed = this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var removed = directoryNameDraggableEntry.removeMarkerEntry();

          return removed;
        });
      }

      return removed;
    }
  }, {
    key: 'retrieveFilePaths',
    value: function retrieveFilePaths() {
      var filePaths = [];

      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
            filePath = fileNameDraggableEntryPath; ///

        filePaths.push(filePath);
      });

      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryFilePaths = directoryNameDraggableEntry.retrieveFilePaths(),
            directoryFilePaths = directoryNameDraggableEntryFilePaths;

        filePaths = filePaths.concat(directoryFilePaths);
      });

      return filePaths;
    }
  }, {
    key: 'retrieveDirectoryPaths',
    value: function retrieveDirectoryPaths() {
      var directoryPaths = [];

      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(),
            directoryNameDraggableEntryDirectoryPaths = directoryNameDraggableEntry.retrieveDirectoryPaths(),
            directoryPath = directoryNameDraggableEntryPath,
            ///
        directoryDirectoryPaths = directoryNameDraggableEntryDirectoryPaths;

        directoryPaths.push(directoryPath);

        directoryPaths = directoryPaths.concat(directoryDirectoryPaths);
      });

      return directoryPaths;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = [];

      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var subEntry = fileNameDraggableEntry; ///

        subEntries.push(subEntry);
      });

      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var subEntry = directoryNameDraggableEntry,
            ///
        directoryNameDraggableEntrySubEntries = directoryNameDraggableEntry.retrieveSubEntries();

        subEntries.push(subEntry);

        subEntries = subEntries.concat(directoryNameDraggableEntrySubEntries);
      });

      return subEntries;
    }
  }, {
    key: 'retrieveDraggableEntryPath',
    value: function retrieveDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = void 0;

      var name = this.getName();

      if (draggableEntry === this) {
        draggableEntryPath = name; ///
      } else {
        draggableEntryPath = this.entriesRetrieveDraggableEntryPath(draggableEntry);

        if (draggableEntryPath !== null) {
          draggableEntryPath = name + '/' + draggableEntryPath;
        }
      }

      return draggableEntryPath;
    }
  }, {
    key: 'retrieveTopmostDirectoryNameDraggableEntry',
    value: function retrieveTopmostDirectoryNameDraggableEntry(path, addIfNecessary) {
      var topmostDirectoryNameDraggableEntry = void 0;

      var topmostDirectoryName = topmostDirectoryNameFromPath(path);

      if (topmostDirectoryName === null) {
        topmostDirectoryNameDraggableEntry = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

          if (!entriesDirectoryNameDraggableEntryPresent) {
            var collapsed = true,
                ///
            explorer = this.getExplorer();

            this.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed, DirectoryNameDraggableEntry);
          }
        }

        var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
      }

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = this.entriesRetrieveMarkedDirectoryNameDraggableEntry();

      if (markedDirectoryNameDraggableEntry === null) {
        var marked = this.isMarked();

        if (marked) {
          markedDirectoryNameDraggableEntry = this;
        }
      }

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = null;

      var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

      if (overlappingDraggableEntry) {
        directoryNameDraggableEntryOverlappingDraggableEntry = this.entriesRetrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry === null) {
          directoryNameDraggableEntryOverlappingDraggableEntry = this;
        }
      }

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'toggleButtonClickHandler',
    value: function toggleButtonClickHandler() {
      this.toggle();
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      this.toggle();
    }
  }, {
    key: 'setCollapsed',
    value: function setCollapsed(collapsed) {
      collapsed ? this.collapse() : this.expand();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.addClass('collapsed');
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.removeClass('collapsed');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.toggleClass('collapsed');
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var childElement = void 0;

      var childElements = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'childElements', this).call(this, properties),
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this),
          button = React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler });

      childElement = button; ///

      childElements.unshift(childElement);

      var entries = React.createElement(Entries, null);

      childElement = entries; ///

      childElements.push(childElement);

      return childElements;
    }
  }, {
    key: 'initialise',
    value: function initialise(collapsed) {
      this.setCollapsed(collapsed);

      _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'initialise', this).call(this);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          _properties$collapsed = _properties.collapsed,
          collapsed = _properties$collapsed === undefined ? false : _properties$collapsed,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);


      directoryNameDraggableEntry.initialise(collapsed);

      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directory-name'
  },
  ignoredProperties: ['collapsed']
});

module.exports = DirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIkVudHJpZXMiLCJlbnRyeVR5cGVzIiwiRHJhZ2dhYmxlRW50cnkiLCJwYXRoVXRpbGl0aWVzIiwiQnV0dG9uIiwiUmVhY3QiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsImV4cGxvcmVyIiwidHlwZSIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibG9jYWxlQ29tcGFyZSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJoYXNDbGFzcyIsIm1hcmtlZCIsImVudHJpZXNNYXJrZWQiLCJhcmVFbnRyaWVzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzTWFya2VkIiwiZHJhZ2dhYmxlRW50cnkiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZmlsZVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiYWRkSWZOZWNlc3NhcnkiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlUGF0aCIsImZpbGVOYW1lIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZ2V0RXhwbG9yZXIiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzIiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJyZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJOYW1lIiwiZW50cmllc0FkZE1hcmtlckVudHJ5IiwibWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZE1hcmtlckVudHJ5IiwicmVtb3ZlZCIsImVudHJpZXNSZW1vdmVNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiZmlsZVBhdGhzIiwiZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiY29uY2F0IiwiZGlyZWN0b3J5UGF0aHMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5RGlyZWN0b3J5UGF0aHMiLCJzdWJFbnRyaWVzIiwic3ViRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZW50cmllc1JldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVudHJpZXNSZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJlbnRyaWVzUmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9nZ2xlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwicHJvcGVydGllcyIsImNoaWxkRWxlbWVudCIsImNoaWxkRWxlbWVudHMiLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwiYnV0dG9uIiwidW5zaGlmdCIsImVudHJpZXMiLCJDbGFzcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsVUFBVUYsUUFBUSxlQUFSLENBQWhCO0FBQUEsSUFDTUcsYUFBYUgsUUFBUSxrQkFBUixDQURuQjtBQUFBLElBRU1JLGlCQUFpQkosUUFBUSx1QkFBUixDQUZ2Qjs7QUFJTSxJQUFFSyxhQUFGLEdBQW9CSixTQUFwQixDQUFFSSxhQUFGO0FBQUEsSUFDRUMsTUFERixHQUNvQlAsSUFEcEIsQ0FDRU8sTUFERjtBQUFBLElBQ1VDLEtBRFYsR0FDb0JSLElBRHBCLENBQ1VRLEtBRFY7QUFBQSxJQUVFQyw0QkFGRixHQUU0RUgsYUFGNUUsQ0FFRUcsNEJBRkY7QUFBQSxJQUVnQ0MsdUNBRmhDLEdBRTRFSixhQUY1RSxDQUVnQ0ksdUNBRmhDO0FBQUEsSUFHRUMsY0FIRixHQUc2RlAsVUFIN0YsQ0FHRU8sY0FIRjtBQUFBLElBR2tCQyxtQkFIbEIsR0FHNkZSLFVBSDdGLENBR2tCUSxtQkFIbEI7QUFBQSxJQUd1Q0MscUJBSHZDLEdBRzZGVCxVQUg3RixDQUd1Q1MscUJBSHZDO0FBQUEsSUFHOERDLDBCQUg5RCxHQUc2RlYsVUFIN0YsQ0FHOERVLDBCQUg5RDs7SUFLQUMsMkI7OztBQUNKLHVDQUFZQyxRQUFaLEVBQXNCQyxR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U0FFRSxvQkFBQyxNQUFELElBQVEsV0FBVSxRQUFsQixFQUEyQixTQUFTRix3QkFBcEMsR0FKUjs7QUFRQUYscUJBQWVJLE1BQWYsQ0FYd0IsQ0FXQTs7QUFFeEJILG9CQUFjSSxPQUFkLENBQXNCTCxZQUF0Qjs7QUFFQSxVQUFNTSxVQUVKLG9CQUFDLE9BQUQsT0FGRjs7QUFNQU4scUJBQWVNLE9BQWYsQ0FyQndCLENBcUJBOztBQUV4Qkwsb0JBQWM3QixJQUFkLENBQW1CNEIsWUFBbkI7O0FBRUEsYUFBT0MsYUFBUDtBQUNEOzs7K0JBRVU5RixTLEVBQVc7QUFDcEIsV0FBS3NDLFlBQUwsQ0FBa0J0QyxTQUFsQjs7QUFFQTtBQUNEOzs7bUNBRXFCb0csSyxFQUFPUixVLEVBQVk7QUFDdkMsVUFBSVMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQlYscUJBQWFRLEtBQWI7QUFDQUEsZ0JBQVFoSCwyQkFBUjtBQUNEOztBQUpzQyx3QkFNVHdHLFVBTlM7QUFBQSw4Q0FNL0I1RixTQU4rQjtBQUFBLFVBTS9CQSxTQU4rQix5Q0FNbkIsS0FObUI7QUFBQSxVQU9qQ1ksMkJBUGlDLEdBT0hsQyxlQUFlNkgsY0FBZixDQUE4QkgsS0FBOUIsRUFBcUNSLFVBQXJDLENBUEc7OztBQVN2Q2hGLGtDQUE0QjRGLFVBQTVCLENBQXVDeEcsU0FBdkM7O0FBRUEsYUFBT1ksMkJBQVA7QUFDRDs7OztFQTdjdUNsQyxjOztBQWdkMUMrSCxPQUFPQyxNQUFQLENBQWN0SCwyQkFBZCxFQUEyQztBQUN6Q3VILHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRHNCO0FBSXpDQyxxQkFBbUIsQ0FDakIsV0FEaUI7QUFKc0IsQ0FBM0M7O0FBU0FDLE9BQU9DLE9BQVAsR0FBaUIzSCwyQkFBakIiLCJmaWxlIjoiZGlyZWN0b3J5TmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBFbnRyaWVzID0gcmVxdWlyZSgnLi4vLi4vZW50cmllcycpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5VHlwZXMnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvZHJhZ2dhYmxlJyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9UWVBFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUsIGV4cGxvcmVyKTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmFyZUVudHJpZXNNYXJrZWQoKTtcblxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ7XG4gICAgICB9KTtcblxuICAgICAgbWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkOyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCF0b3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdGhpcy5yZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAoIXRvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzQWRkTWFya2VyRW50cnkobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5hcmVFbnRyaWVzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllc1JlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RmlsZVBhdGhzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRmlsZVBhdGhzKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHM7XG5cbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCkge1xuICAgIGxldCBkaXJlY3RvcnlQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlQYXRocyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5RGlyZWN0b3J5UGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlQYXRocztcblxuICAgICAgZGlyZWN0b3J5UGF0aHMucHVzaChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aHMgPSBkaXJlY3RvcnlQYXRocy5jb25jYXQoZGlyZWN0b3J5RGlyZWN0b3J5UGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVTdWJFbnRyaWVzKCkge1xuICAgIGxldCBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlU3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXNSZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7bmFtZX0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsIC8vL1xuICAgICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzUmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXNSZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgbGV0IGNoaWxkRWxlbWVudDtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBzdXBlci5jaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgYnV0dG9uID1cblxuICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJ0b2dnbGVcIiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+XG5cbiAgICAgICAgICA7XG5cbiAgICBjaGlsZEVsZW1lbnQgPSBidXR0b247ICAvLy9cblxuICAgIGNoaWxkRWxlbWVudHMudW5zaGlmdChjaGlsZEVsZW1lbnQpO1xuXG4gICAgY29uc3QgZW50cmllcyA9XG5cbiAgICAgIDxFbnRyaWVzIC8+XG5cbiAgICA7XG5cbiAgICBjaGlsZEVsZW1lbnQgPSBlbnRyaWVzOyAvLy9cblxuICAgIGNoaWxkRWxlbWVudHMucHVzaChjaGlsZEVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY29sbGFwc2VkKSB7XG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcblxuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoY29sbGFwc2VkKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnktbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnY29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=