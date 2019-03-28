'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var Entries = require('../../entries'),
    NameButton = require('../../nameButton'),
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
      var name = properties.name,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);


      return [React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler }), React.createElement(
        NameButton,
        null,
        name
      ), React.createElement(Entries, null)];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIkVudHJpZXMiLCJOYW1lQnV0dG9uIiwiZW50cnlUeXBlcyIsIkRyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsIkJ1dHRvbiIsIlJlYWN0IiwidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsIkZJTEVfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJleHBsb3JlciIsInR5cGUiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZXhwYW5kIiwiaGFzQ2xhc3MiLCJtYXJrZWQiLCJlbnRyaWVzTWFya2VkIiwiYXJlRW50cmllc01hcmtlZCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsInNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc01hcmtlZCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImZpbGVQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZVBhdGgiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImdldEV4cGxvcmVyIiwiYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeU5hbWUiLCJlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50Iiwic2V0Q29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZUZpbGVQYXRoIiwicmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInRvcG1vc3REaXJlY3RvcnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbXB0eSIsImlzRW1wdHkiLCJyZW1vdmUiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwicmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImVudHJpZXNBZGRNYXJrZXJFbnRyeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRNYXJrZXJFbnRyeSIsInJlbW92ZWQiLCJlbnRyaWVzUmVtb3ZlTWFya2VyRW50cnkiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImZpbGVQYXRocyIsImZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeUZpbGVQYXRocyIsImNvbmNhdCIsImRpcmVjdG9yeVBhdGhzIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeURpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImRpcmVjdG9yeURpcmVjdG9yeVBhdGhzIiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImVudHJpZXNSZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGgiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbnRyaWVzUmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZW50cmllc1JldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvZ2dsZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsInByb3BlcnRpZXMiLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwiQ2xhc3MiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFVBQVVGLFFBQVEsZUFBUixDQUFoQjtBQUFBLElBQ01HLGFBQWFILFFBQVEsa0JBQVIsQ0FEbkI7QUFBQSxJQUVNSSxhQUFhSixRQUFRLGtCQUFSLENBRm5CO0FBQUEsSUFHTUssaUJBQWlCTCxRQUFRLHVCQUFSLENBSHZCOztBQUtNLElBQUVNLGFBQUYsR0FBb0JMLFNBQXBCLENBQUVLLGFBQUY7QUFBQSxJQUNFQyxNQURGLEdBQ29CUixJQURwQixDQUNFUSxNQURGO0FBQUEsSUFDVUMsS0FEVixHQUNvQlQsSUFEcEIsQ0FDVVMsS0FEVjtBQUFBLElBRUVDLDRCQUZGLEdBRTRFSCxhQUY1RSxDQUVFRyw0QkFGRjtBQUFBLElBRWdDQyx1Q0FGaEMsR0FFNEVKLGFBRjVFLENBRWdDSSx1Q0FGaEM7QUFBQSxJQUdFQyxjQUhGLEdBRzZGUCxVQUg3RixDQUdFTyxjQUhGO0FBQUEsSUFHa0JDLG1CQUhsQixHQUc2RlIsVUFIN0YsQ0FHa0JRLG1CQUhsQjtBQUFBLElBR3VDQyxxQkFIdkMsR0FHNkZULFVBSDdGLENBR3VDUyxxQkFIdkM7QUFBQSxJQUc4REMsMEJBSDlELEdBRzZGVixVQUg3RixDQUc4RFUsMEJBSDlEOztJQUtBQywyQjs7O0FBQ0osdUNBQVlDLFFBQVosRUFBc0JDLFFBQXRCLEVBQWdDO0FB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QUQsSUFBUSxXQUFVLFFBQWxCLEVBQTJCLFNBQVNELHdCQUFwQyxHQUZNLEVBR047QUFBQyxrQkFBRDtBQUFBO0FBQWFqRztBQUFiLE9BSE0sRUFJTixvQkFBQyxPQUFELE9BSk0sQ0FBUjtBQU9EOzs7K0JBRVVJLFMsRUFBVztBQUNwQixXQUFLc0MsWUFBTCxDQUFrQnRDLFNBQWxCOztBQUVBO0FBQ0Q7OzttQ0FFcUIrRixLLEVBQU9ILFUsRUFBWTtBQUN2QyxVQUFJSSxVQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCTCxxQkFBYUcsS0FBYjtBQUNBQSxnQkFBUTNHLDJCQUFSO0FBQ0Q7O0FBSnNDLHdCQU1Ud0csVUFOUztBQUFBLDhDQU0vQjVGLFNBTitCO0FBQUEsVUFNL0JBLFNBTitCLHlDQU1uQixLQU5tQjtBQUFBLFVBT2pDWSwyQkFQaUMsR0FPSGxDLGVBQWV3SCxjQUFmLENBQThCSCxLQUE5QixFQUFxQ0gsVUFBckMsQ0FQRzs7O0FBU3ZDaEYsa0NBQTRCdUYsVUFBNUIsQ0FBdUNuRyxTQUF2Qzs7QUFFQSxhQUFPWSwyQkFBUDtBQUNEOzs7O0VBOWJ1Q2xDLGM7O0FBaWMxQzBILE9BQU9DLE1BQVAsQ0FBY2pILDJCQUFkLEVBQTJDO0FBQ3pDa0gscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FEc0I7QUFJekNDLHFCQUFtQixDQUNqQixXQURpQjtBQUpzQixDQUEzQzs7QUFTQUMsT0FBT0MsT0FBUCxHQUFpQnRILDJCQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVudHJpZXMgPSByZXF1aXJlKCcuLi8uLi9lbnRyaWVzJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi4vLi4vbmFtZUJ1dHRvbicpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5VHlwZXMnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvZHJhZ2dhYmxlJyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9UWVBFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUsIGV4cGxvcmVyKTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmFyZUVudHJpZXNNYXJrZWQoKTtcblxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ7XG4gICAgICB9KTtcblxuICAgICAgbWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkOyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCF0b3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdGhpcy5yZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAoIXRvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzQWRkTWFya2VyRW50cnkobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5hcmVFbnRyaWVzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllc1JlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RmlsZVBhdGhzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRmlsZVBhdGhzKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHM7XG5cbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCkge1xuICAgIGxldCBkaXJlY3RvcnlQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlQYXRocyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5RGlyZWN0b3J5UGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlQYXRocztcblxuICAgICAgZGlyZWN0b3J5UGF0aHMucHVzaChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aHMgPSBkaXJlY3RvcnlQYXRocy5jb25jYXQoZGlyZWN0b3J5RGlyZWN0b3J5UGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVTdWJFbnRyaWVzKCkge1xuICAgIGxldCBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlU3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXNSZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7bmFtZX0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsIC8vL1xuICAgICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzUmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXNSZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJ0b2dnbGVcIiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+LFxuICAgICAgPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPixcbiAgICAgIDxFbnRyaWVzIC8+XG5cbiAgICBdKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZShjb2xsYXBzZWQpIHtcbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuXG4gICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcGVydGllcyA9IENsYXNzO1xuICAgICAgQ2xhc3MgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb2xsYXBzZWQgPSBmYWxzZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShjb2xsYXBzZWQpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RpcmVjdG9yeS1uYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==