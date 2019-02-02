'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var Entries = require('../../entries'),
    entryTypes = require('../../../entryTypes'),
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
        entriesFile = this.isFileNameDraggableEntryPresent(fileName);

        if (!entriesFile) {
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
        entriesFile = this.isFileNameDraggableEntryPresent(fileName);

        if (entriesFile) {
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
      var childElements = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'childElements', this).call(this, properties),
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);

      childElements.unshift(React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler }));

      childElements.push(React.createElement(Entries, null));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIkVudHJpZXMiLCJlbnRyeVR5cGVzIiwiRHJhZ2dhYmxlRW50cnkiLCJwYXRoVXRpbGl0aWVzIiwiQnV0dG9uIiwiUmVhY3QiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsImV4cGxvcmVyIiwidHlwZSIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibG9jYWxlQ29tcGFyZSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJoYXNDbGFzcyIsIm1hcmtlZCIsImVudHJpZXNNYXJrZWQiLCJhcmVFbnRyaWVzTWFya2VkIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwic29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzTWFya2VkIiwiZHJhZ2dhYmxlRW50cnkiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZmlsZVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiYWRkSWZOZWNlc3NhcnkiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlUGF0aCIsImZpbGVOYW1lIiwiZW50cmllc0ZpbGUiLCJpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZ2V0RXhwbG9yZXIiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzIiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJyZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJOYW1lIiwiZW50cmllc0FkZE1hcmtlckVudHJ5IiwibWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZE1hcmtlckVudHJ5IiwicmVtb3ZlZCIsImVudHJpZXNSZW1vdmVNYXJrZXJFbnRyeSIsInJlbW92ZU1hcmtlckVudHJ5IiwiZmlsZVBhdGhzIiwiZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiY29uY2F0IiwiZGlyZWN0b3J5UGF0aHMiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5RGlyZWN0b3J5UGF0aHMiLCJzdWJFbnRyaWVzIiwic3ViRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZW50cmllc1JldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVudHJpZXNSZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJlbnRyaWVzUmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9nZ2xlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwicHJvcGVydGllcyIsImNoaWxkRWxlbWVudHMiLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwidW5zaGlmdCIsIkNsYXNzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxVQUFVRixRQUFRLGVBQVIsQ0FBaEI7QUFBQSxJQUNNRyxhQUFhSCxRQUFRLHFCQUFSLENBRG5CO0FBQUEsSUFFTUksaUJBQWlCSixRQUFRLHVCQUFSLENBRnZCOztBQUlNLElBQUVLLGFBQUYsR0FBb0JKLFNBQXBCLENBQUVJLGFBQUY7QUFBQSxJQUNFQyxNQURGLEdBQ29CUCxJQURwQixDQUNFTyxNQURGO0FBQUEsSUFDVUMsS0FEVixHQUNvQlIsSUFEcEIsQ0FDVVEsS0FEVjtBQUFBLElBRUVDLDRCQUZGLEdBRTRFSCxhQUY1RSxDQUVFRyw0QkFGRjtBQUFBLElBRWdDQyx1Q0FGaEMsR0FFNEVKLGFBRjVFLENBRWdDSSx1Q0FGaEM7QUFBQSxJQUdFQyxjQUhGLEdBRzZGUCxVQUg3RixDQUdFTyxjQUhGO0FBQUEsSUFHa0JDLG1CQUhsQixHQUc2RlIsVUFIN0YsQ0FHa0JRLG1CQUhsQjtBQUFBLElBR3VDQyxxQkFIdkMsR0FHNkZULFVBSDdGLENBR3VDUyxxQkFIdkM7QUFBQSxJQUc4REMsMEJBSDlELEdBRzZGVixVQUg3RixDQUc4RFUsMEJBSDlEOztJQUtBQywyQjs7O0FBQ0osdUNBQVlDLFFBQVosRUFBc0JDLFFBQXRCLEVBQWdDO0FBQUE7O0FBQzlCLFFBQU1DLE9BQU9OLG1CQUFi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QUFQO0FBQ0Q7OzsrQkFFVTdGLFMsRUFBVztBQUNwQixXQUFLc0MsWUFBTCxDQUFrQnRDLFNBQWxCOztBQUVBO0FBQ0Q7OzttQ0FFcUJpRyxLLEVBQU9MLFUsRUFBWTtBQUN2QyxVQUFJTSxVQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCUCxxQkFBYUssS0FBYjtBQUNBQSxnQkFBUTdHLDJCQUFSO0FBQ0Q7O0FBSnNDLHdCQU1Ud0csVUFOUztBQUFBLDhDQU0vQjVGLFNBTitCO0FBQUEsVUFNL0JBLFNBTitCLHlDQU1uQixLQU5tQjtBQUFBLFVBT2pDWSwyQkFQaUMsR0FPSGxDLGVBQWUwSCxjQUFmLENBQThCSCxLQUE5QixFQUFxQ0wsVUFBckMsQ0FQRzs7O0FBU3ZDaEYsa0NBQTRCeUYsVUFBNUIsQ0FBdUNyRyxTQUF2Qzs7QUFFQSxhQUFPWSwyQkFBUDtBQUNEOzs7O0VBcGJ1Q2xDLGM7O0FBdWIxQzRILE9BQU9DLE1BQVAsQ0FBY25ILDJCQUFkLEVBQTJDO0FBQ3pDb0gscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FEc0I7QUFJekNDLHFCQUFtQixDQUNqQixXQURpQjtBQUpzQixDQUEzQzs7QUFTQUMsT0FBT0MsT0FBUCxHQUFpQnhILDJCQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVudHJpZXMgPSByZXF1aXJlKCcuLi8uLi9lbnRyaWVzJyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vZW50cnlUeXBlcycpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9kcmFnZ2FibGUnKTtcblxuY29uc3QgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IEJ1dHRvbiwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IGVudHJ5VHlwZXM7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgY2FzZSBGSUxFX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuICAgICAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuYXJlRW50cmllc01hcmtlZCgpO1xuXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICAgIGlmIChlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IG51bGw7IC8vL1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0ZpbGUpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRoaXMucmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAoIXRvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IGZhbHNlO1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSwgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLnJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgIGlmICghdG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcztcbiAgfVxuICBcbiAgYWRkTWFya2VyRW50cnkobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXNBZGRNYXJrZXJFbnRyeShtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyRW50cnkobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgcmVtb3ZlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmFyZUVudHJpZXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzUmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgcmV0cmlldmVGaWxlUGF0aHMoKSB7XG4gICAgbGV0IGZpbGVQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUZpbGVQYXRocztcblxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgbGV0IGRpcmVjdG9yeVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeURpcmVjdG9yeVBhdGhzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlEaXJlY3RvcnlQYXRocyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeURpcmVjdG9yeVBhdGhzO1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRocyA9IGRpcmVjdG9yeVBhdGhzLmNvbmNhdChkaXJlY3RvcnlEaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZVN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSB0aGlzKSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZW50cmllc1JldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHtuYW1lfS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICBjb25zdCBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZSwgLy8vXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXNSZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllc1JldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gc3VwZXIuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgY2hpbGRFbGVtZW50cy51bnNoaWZ0KDxCdXR0b24gY2xhc3NOYW1lPVwidG9nZ2xlXCIgb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPik7XG5cbiAgICBjaGlsZEVsZW1lbnRzLnB1c2goPEVudHJpZXMgLz4pO1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY29sbGFwc2VkKSB7XG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcblxuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoY29sbGFwc2VkKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnktbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnY29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=