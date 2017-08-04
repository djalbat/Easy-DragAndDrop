'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var Entry = require('../entry'),
    Entries = require('../entries'),
    DraggableEntry = require('../draggableEntry');

var path = necessary.path,
    Button = easy.Button,
    React = easy.React;

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry(selector, name, explorer) {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    var type = Entry.types.DIRECTORY_NAME;

    var _this = _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).call(this, selector, name, explorer, type));

    var toggleButtonClickHandler = _this.toggleButtonClickHandler.bind(_this);

    _this.entries = React.createElement(Entries, { DirectoryNameDraggableEntry: DirectoryNameDraggableEntry });

    _this.toggleButton = React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler });
    return _this;
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.MARKER:
        case Entry.types.FILE_NAME:
          before = true;

          break;

        case Entry.types.DIRECTORY_NAME:
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

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        marked = entriesMarked;
      } else {
        var directoryNameDraggableEntryMarked = this.entries.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

          return directoryNameDraggableEntryMarked;
        });

        marked = directoryNameDraggableEntryMarked; ///
      }

      return marked;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.entries.isEmpty();
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
    value: function addFilePath(filePath, recognised) {
      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(filePath);

        topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName, recognised);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

        if (!entriesFile) {
          var explorer = this.getExplorer();

          this.entries.addFileNameDraggableEntry(fileName, explorer, recognised);
        }
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed) {
      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(directoryName),
            entriesDirectoryNameDraggableEntryPresent = entriesDirectoryNameDraggableEntry !== null;

        if (entriesDirectoryNameDraggableEntryPresent) {
          entriesDirectoryNameDraggableEntry.setCollapsed(collapsed);
        } else {
          var explorer = this.getExplorer();

          this.entries.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed);
        }
      }
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var removeEmptyParentDirectoryNameDraggableEntries = null; ///

      var addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(filePath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

        if (entriesFile) {
          removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeFileNameDraggableEntry(fileName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var rootDirectory = this.isRootDirectoryNameDraggableEntry();

        if (!rootDirectory) {
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
        var directoryPathWithoutTopmostDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(directoryName);

        if (entriesDirectoryNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeDirectoryNameDraggableEntry(directoryName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var rootDirectory = this.isRootDirectoryNameDraggableEntry();

        if (!rootDirectory) {
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
      var topmostDirectoryName = path.topmostDirectoryNameFromPath(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarkerEntry(markerName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = path.pathWithoutTopmostDirectoryNameFromPath(markerPath);

        topmostDirectoryNameDraggableEntry.addMarkerEntry(markerPathWithoutTopmostDirectoryName, draggableEntryType);
      }
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var removed = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        this.entries.removeMarkerEntry();

        removed = true;
      } else {
        removed = this.entries.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var removed = directoryNameDraggableEntry.removeMarkerEntry();

          return removed;
        });
      }

      return removed;
    }
  }, {
    key: 'forEachFileNameDraggableEntry',
    value: function forEachFileNameDraggableEntry(callback) {
      this.entries.forEachFileNameDraggableEntry(callback);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.entries.forEachDirectoryNameDraggableEntry(callback);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      this.entries.someDirectoryNameDraggableEntry(callback);
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
        draggableEntryPath = this.entries.retrieveDraggableEntryPath(draggableEntry);

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

      var topmostDirectoryName = path.topmostDirectoryNameFromPath(path);

      if (topmostDirectoryName === null) {
        topmostDirectoryNameDraggableEntry = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

          if (!entriesDirectoryNameDraggableEntryPresent) {
            var collapsed = true,
                ///
            explorer = this.getExplorer();

            this.entries.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed);
          }
        }

        var directoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName);

        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
      }

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = this.entries.retrieveMarkedDirectoryNameDraggableEntry();

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
        directoryNameDraggableEntryOverlappingDraggableEntry = this.entries.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

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
    key: 'initialise',
    value: function initialise(collapsed) {
      _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'initialise', this).call(this);

      this.onDoubleClick(this.doubleClickHandler.bind(this));

      this.append(this.entries);

      this.prepend(this.toggleButton);

      this.setCollapsed(collapsed);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          name = _properties.name,
          explorer = _properties.explorer,
          collapsed = _properties.collapsed,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, name, explorer);


      directoryNameDraggableEntry.initialise(collapsed);

      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directoryName'
  },
  ignoredProperties: ['name', 'explorer', 'collapsed']
});

module.exports = DirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwiRW50cnkiLCJFbnRyaWVzIiwiRHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwiQnV0dG9uIiwiUmVhY3QiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJ0eXBlcyIsIkRJUkVDVE9SWV9OQU1FIiwidG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyIiwiYmluZCIsImVudHJpZXMiLCJ0b2dnbGVCdXR0b24iLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJGSUxFX05BTUUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibG9jYWxlQ29tcGFyZSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJoYXNDbGFzcyIsIm1hcmtlZCIsImVudHJpZXNNYXJrZWQiLCJpc01hcmtlZCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsInNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc0VtcHR5IiwiZHJhZ2dhYmxlRW50cnkiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZmlsZVBhdGgiLCJyZWNvZ25pc2VkIiwiYWRkSWZOZWNlc3NhcnkiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJhZGRGaWxlUGF0aCIsImZpbGVOYW1lIiwiZW50cmllc0ZpbGUiLCJpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiZ2V0RXhwbG9yZXIiLCJhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJzZXRDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzIiwicmVtb3ZlRmlsZVBhdGgiLCJyZW1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVtcHR5IiwicmVtb3ZlIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsInJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJtYXJrZXJOYW1lIiwiYWRkTWFya2VyRW50cnkiLCJtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aHMiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiY29uY2F0Iiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9nZ2xlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImFwcGVuZCIsInByZXBlbmQiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFFBQVFGLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxZQUFSLENBRGhCO0FBQUEsSUFFTUksaUJBQWlCSixRQUFRLG1CQUFSLENBRnZCOztBQUlNLElBQUVLLElBQUYsR0FBV0osU0FBWCxDQUFFSSxJQUFGO0FBQUEsSUFDRUMsTUFERixHQUNvQlAsSUFEcEIsQ0FDRU8sTUFERjtBQUFBLElBQ1VDLEtBRFYsR0FDb0JSLElBRHBCLENBQ1VRLEtBRFY7O0lBR0FDLDJCOzs7QUFDSix1Q0FBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQUE7O0FBQ3BDLFFBQU1DLE9BQU9WLE1BQU1XLEtBQU4sQ0FBWUMsY0FBekI7O0FBRG9DLDBKQUc5QkwsUUFIOEIsRUFHcEJDLElBSG9CLEVBR2RDLFFBSGMsRUFHSkMsSUFISTs7QUFLcEMsUUFBTUcsMkJBQTJCLE1BQUtBLHdCQUFMLENBQThCQyxJQUE5QixPQUFqQzs7QUFFQSxVQUFLQyxPQUFMLEdBQWUsb0JBQUMsT0FBRCxJQUFTLDZCQUE2QlQsMkJBQXRDLEdBQWY7O0FBRUEsVUFBS1UsWUFBTCxHQUFvQixvQkFBQyxNQUFELElBQVEsV0FBVSxRQUFsQixFQUEyQixTQUFTSCx3QkFBcEMsR0FBcEI7QUFUb0M7QUFVckM7Ozs7b0RBRStCO0FBQzlCLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVFJLEssRUFBTztBQUNkLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMsWUFBWUYsTUFBTUcsT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS25CLE1BQU1XLEtBQU4sQ0FBWVUsTUFBakI7QUFDQSxhQUFLckIsTUFBTVcsS0FBTixDQUFZVyxTQUFqQjtBQUNFSixtQkFBUyxJQUFUOztBQUVBOztBQUVGLGFBQUtsQixNQUFNVyxLQUFOLENBQVlDLGNBQWpCO0FBQ0UsY0FBTUosT0FBTyxLQUFLZSxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZUCxNQUFNTSxPQUFOLEVBRGxCOztBQUdBTCxtQkFBVVYsS0FBS2lCLGFBQUwsQ0FBbUJELFNBQW5CLElBQWdDLENBQTFDOztBQUVBO0FBYko7O0FBZ0JBLGFBQU9OLE1BQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNUSxZQUFZLEtBQUtDLFdBQUwsRUFBbEI7O0FBRUEsV0FBS0MsUUFBTDs7QUFFQSxVQUFNQyw0SkFBTjtBQUFBLFVBQ01DLGtCQUFrQkQsTUFEeEIsQ0FMbUIsQ0FNYzs7QUFFakMsVUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ2QsYUFBS0ssTUFBTDtBQUNEOztBQUVELGFBQU9ELGVBQVA7QUFDRDs7O2tDQUVhO0FBQ1osVUFBTUosWUFBWSxLQUFLTSxRQUFMLENBQWMsV0FBZCxDQUFsQjs7QUFFQSxhQUFPTixTQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQUlPLGVBQUo7O0FBRUEsVUFBTUMsZ0JBQWdCLEtBQUtuQixPQUFMLENBQWFvQixRQUFiLEVBQXRCOztBQUVBLFVBQUlELGFBQUosRUFBbUI7QUFDakJELGlCQUFTQyxhQUFUO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBTUUsb0NBQW9DLEtBQUtyQixPQUFMLENBQWFzQiwrQkFBYixDQUE2QyxVQUFTQywyQkFBVCxFQUFzQztBQUMzSCxjQUFNRixvQ0FBb0NFLDRCQUE0QkgsUUFBNUIsRUFBMUM7O0FBRUEsaUJBQU9DLGlDQUFQO0FBQ0QsU0FKeUMsQ0FBMUM7O0FBTUFILGlCQUFTRyxpQ0FBVCxDQVBLLENBT3VDO0FBQzdDOztBQUVELGFBQU9ILE1BQVA7QUFDRDs7OzhCQUVTO0FBQUUsYUFBTyxLQUFLbEIsT0FBTCxDQUFhd0IsT0FBYixFQUFQO0FBQWdDOzs7Z0RBRWhCQyxjLEVBQWdCO0FBQzFDLFVBQUlDLGtDQUFKOztBQUVBLFVBQUksU0FBU0QsY0FBYixFQUE2QjtBQUMzQkMsb0NBQTRCLEtBQTVCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBTWYsWUFBWSxLQUFLQyxXQUFMLEVBQWxCOztBQUVBLFlBQUlELFNBQUosRUFBZTtBQUNiZSxzQ0FBNEIsS0FBNUI7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFNQyxnQ0FBZ0NGLGVBQWVHLGtCQUFmLEVBQXRDO0FBQUEsY0FDTUMsa05BQThFRiw2QkFBOUUsQ0FETjs7QUFHQUQsc0NBQTRCRyx3Q0FBNUI7QUFDRDtBQUNGOztBQUVELGFBQU9ILHlCQUFQO0FBQ0Q7OztnQ0FFV0ksUSxFQUFVQyxVLEVBQVk7QUFDaEMsVUFBTUMsaUJBQWlCLElBQXZCO0FBQUEsVUFDTUMscUNBQXFDLEtBQUtDLDBDQUFMLENBQWdESixRQUFoRCxFQUEwREUsY0FBMUQsQ0FEM0M7O0FBR0EsVUFBSUMsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DLFlBQU1FLHNDQUFzQy9DLEtBQUtnRCx1Q0FBTCxDQUE2Q04sUUFBN0MsQ0FBNUM7O0FBRUFHLDJDQUFtQ0ksV0FBbkMsQ0FBK0NGLG1DQUEvQyxFQUFvRkosVUFBcEY7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFNTyxXQUFXUixRQUFqQjtBQUFBLFlBQTRCO0FBQ3RCUyxzQkFBYyxLQUFLdkMsT0FBTCxDQUFhd0MsK0JBQWIsQ0FBNkNGLFFBQTdDLENBRHBCOztBQUdBLFlBQUksQ0FBQ0MsV0FBTCxFQUFrQjtBQUNoQixjQUFNN0MsV0FBVyxLQUFLK0MsV0FBTCxFQUFqQjs7QUFFQSxlQUFLekMsT0FBTCxDQUFhMEMseUJBQWIsQ0FBdUNKLFFBQXZDLEVBQWlENUMsUUFBakQsRUFBMkRxQyxVQUEzRDtBQUNEO0FBQ0Y7QUFDRjs7O3FDQUVnQlksYSxFQUFlaEMsUyxFQUFXO0FBQ3pDLFVBQU1xQixpQkFBaUIsSUFBdkI7QUFBQSxVQUNNQyxxQ0FBcUMsS0FBS0MsMENBQUwsQ0FBZ0RTLGFBQWhELEVBQStEWCxjQUEvRCxDQUQzQzs7QUFHQSxVQUFJQyx1Q0FBdUMsSUFBM0MsRUFBaUQ7QUFDL0MsWUFBTVcsMkNBQTJDeEQsS0FBS2dELHVDQUFMLENBQTZDTyxhQUE3QyxDQUFqRDs7QUFFQVYsMkNBQW1DWSxnQkFBbkMsQ0FBb0RELHdDQUFwRCxFQUE4RmpDLFNBQTlGO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBTW1DLGdCQUFnQkgsYUFBdEI7QUFBQSxZQUFzQztBQUNoQ0ksNkNBQXFDLEtBQUsvQyxPQUFMLENBQWFnRCwrQkFBYixDQUE2Q0YsYUFBN0MsQ0FEM0M7QUFBQSxZQUVNRyw0Q0FBNkNGLHVDQUF1QyxJQUYxRjs7QUFJQSxZQUFJRSx5Q0FBSixFQUErQztBQUM3Q0YsNkNBQW1DRyxZQUFuQyxDQUFnRHZDLFNBQWhEO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBTWpCLFdBQVcsS0FBSytDLFdBQUwsRUFBakI7O0FBRUEsZUFBS3pDLE9BQUwsQ0FBYW1ELDhCQUFiLENBQTRDTCxhQUE1QyxFQUEyRHBELFFBQTNELEVBQXFFaUIsU0FBckU7QUFDRDtBQUNGO0FBQ0Y7OzttQ0FFY21CLFEsRUFBVTtBQUN2QixVQUFJc0IsaURBQWlELElBQXJELENBRHVCLENBQ29DOztBQUUzRCxVQUFNcEIsaUJBQWlCLEtBQXZCO0FBQUEsVUFDTUMscUNBQXFDLEtBQUtDLDBDQUFMLENBQWdESixRQUFoRCxFQUEwREUsY0FBMUQsQ0FEM0M7O0FBR0EsVUFBSUMsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DLFlBQU1FLHNDQUFzQy9DLEtBQUtnRCx1Q0FBTCxDQUE2Q04sUUFBN0MsQ0FBNUM7O0FBRUFzQix5REFBaURuQixtQ0FBbUNvQixjQUFuQyxDQUFrRGxCLG1DQUFsRCxDQUFqRDtBQUNELE9BSkQsTUFJTztBQUNMLFlBQU1HLFdBQVdSLFFBQWpCO0FBQUEsWUFBNEI7QUFDdEJTLHNCQUFjLEtBQUt2QyxPQUFMLENBQWF3QywrQkFBYixDQUE2Q0YsUUFBN0MsQ0FEcEI7O0FBR0EsWUFBSUMsV0FBSixFQUFpQjtBQUNmYSwyREFBaUQsS0FBS3BELE9BQUwsQ0FBYXNELDRCQUFiLENBQTBDaEIsUUFBMUMsQ0FBakQ7QUFDRDtBQUNGOztBQUVELFVBQUljLG1EQUFtRCxJQUF2RCxFQUE2RDtBQUMzRCxZQUFNRyxnQkFBZ0IsS0FBS0MsaUNBQUwsRUFBdEI7O0FBRUEsWUFBSSxDQUFDRCxhQUFMLEVBQW9CO0FBQ2xCLGNBQU1FLFFBQVEsS0FBS2pDLE9BQUwsRUFBZDs7QUFFQSxjQUFJaUMsS0FBSixFQUFXO0FBQ1QsaUJBQUtDLE1BQUw7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsYUFBT04sOENBQVA7QUFDRDs7O3dDQUVtQlQsYSxFQUFlO0FBQ2pDLFVBQUlTLGlEQUFpRCxLQUFyRDs7QUFFQSxVQUFNcEIsaUJBQWlCLEtBQXZCO0FBQUEsVUFBOEI7QUFDeEJDLDJDQUFxQyxLQUFLQywwQ0FBTCxDQUFnRFMsYUFBaEQsRUFBK0RYLGNBQS9ELENBRDNDOztBQUdBLFVBQUlDLHVDQUF1QyxJQUEzQyxFQUFpRDtBQUMvQyxZQUFNVywyQ0FBMkN4RCxLQUFLZ0QsdUNBQUwsQ0FBNkNPLGFBQTdDLENBQWpEOztBQUVBUyx5REFBaURuQixtQ0FBbUMwQixtQkFBbkMsQ0FBdURmLHdDQUF2RCxDQUFqRDtBQUNELE9BSkQsTUFJTztBQUNMLFlBQU1FLGdCQUFnQkgsYUFBdEI7QUFBQSxZQUFzQztBQUNoQ00sb0RBQTRDLEtBQUtqRCxPQUFMLENBQWE0RCxvQ0FBYixDQUFrRGQsYUFBbEQsQ0FEbEQ7O0FBR0EsWUFBSUcseUNBQUosRUFBK0M7QUFDN0NHLDJEQUFpRCxLQUFLcEQsT0FBTCxDQUFhNkQsaUNBQWIsQ0FBK0NmLGFBQS9DLENBQWpEO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJTSxtREFBbUQsSUFBdkQsRUFBNkQ7QUFDM0QsWUFBTUcsZ0JBQWdCLEtBQUtDLGlDQUFMLEVBQXRCOztBQUVBLFlBQUksQ0FBQ0QsYUFBTCxFQUFvQjtBQUNsQixjQUFNRSxRQUFRLEtBQUtqQyxPQUFMLEVBQWQ7O0FBRUEsY0FBSWlDLEtBQUosRUFBVztBQUNULGlCQUFLQyxNQUFMO0FBQ0Q7QUFDRjtBQUNGOztBQUVELGFBQU9OLDhDQUFQO0FBQ0Q7OzttQ0FFY1UsVSxFQUFZQyxrQixFQUFvQjtBQUM3QyxVQUFNQyx1QkFBdUI1RSxLQUFLNkUsNEJBQUwsQ0FBa0NILFVBQWxDLENBQTdCOztBQUVBLFVBQUlFLHlCQUF5QixJQUE3QixFQUFtQztBQUNqQyxZQUFNRSxhQUFhSixVQUFuQixDQURpQyxDQUNEOztBQUVoQyxhQUFLOUQsT0FBTCxDQUFhbUUsY0FBYixDQUE0QkQsVUFBNUIsRUFBd0NILGtCQUF4QztBQUNELE9BSkQsTUFJTztBQUNMLFlBQU05QixxQ0FBcUMsS0FBS2pDLE9BQUwsQ0FBYWdELCtCQUFiLENBQTZDZ0Isb0JBQTdDLENBQTNDO0FBQUEsWUFDTUksd0NBQXdDaEYsS0FBS2dELHVDQUFMLENBQTZDMEIsVUFBN0MsQ0FEOUM7O0FBR0E3QiwyQ0FBbUNrQyxjQUFuQyxDQUFrREMscUNBQWxELEVBQXlGTCxrQkFBekY7QUFDRDtBQUNGOzs7d0NBRW1CO0FBQ2xCLFVBQUlNLGdCQUFKOztBQUVBLFVBQU1sRCxnQkFBZ0IsS0FBS25CLE9BQUwsQ0FBYW9CLFFBQWIsRUFBdEI7O0FBRUEsVUFBSUQsYUFBSixFQUFtQjtBQUNqQixhQUFLbkIsT0FBTCxDQUFhc0UsaUJBQWI7O0FBRUFELGtCQUFVLElBQVY7QUFDRCxPQUpELE1BSU87QUFDTEEsa0JBQVUsS0FBS3JFLE9BQUwsQ0FBYXNCLCtCQUFiLENBQTZDLFVBQVNDLDJCQUFULEVBQXNDO0FBQzNGLGNBQU04QyxVQUFVOUMsNEJBQTRCK0MsaUJBQTVCLEVBQWhCOztBQUVBLGlCQUFPRCxPQUFQO0FBQ0QsU0FKUyxDQUFWO0FBS0Q7O0FBRUQsYUFBT0EsT0FBUDtBQUNEOzs7a0RBRTZCRSxRLEVBQVU7QUFBRSxXQUFLdkUsT0FBTCxDQUFhd0UsNkJBQWIsQ0FBMkNELFFBQTNDO0FBQXVEOzs7dURBRTlEQSxRLEVBQVU7QUFBRSxXQUFLdkUsT0FBTCxDQUFheUUsa0NBQWIsQ0FBZ0RGLFFBQWhEO0FBQTREOzs7b0RBRTNFQSxRLEVBQVU7QUFBRSxXQUFLdkUsT0FBTCxDQUFhc0IsK0JBQWIsQ0FBNkNpRCxRQUE3QztBQUF5RDs7O3dDQUVqRjtBQUNsQixVQUFJRyxZQUFZLEVBQWhCOztBQUVBLFdBQUtGLDZCQUFMLENBQW1DLFVBQVNHLHNCQUFULEVBQWlDO0FBQ2xFLFlBQU1DLDZCQUE2QkQsdUJBQXVCRSxPQUF2QixFQUFuQztBQUFBLFlBQ00vQyxXQUFXOEMsMEJBRGpCLENBRGtFLENBRXBCOztBQUU5Q0Ysa0JBQVVJLElBQVYsQ0FBZWhELFFBQWY7QUFDRCxPQUxEOztBQU9BLFdBQUsyQyxrQ0FBTCxDQUF3QyxVQUFTbEQsMkJBQVQsRUFBc0M7QUFDNUUsWUFBTXdELHVDQUF1Q3hELDRCQUE0QnlELGlCQUE1QixFQUE3QztBQUFBLFlBQ01DLHFCQUFxQkYsb0NBRDNCOztBQUdBTCxvQkFBWUEsVUFBVVEsTUFBVixDQUFpQkQsa0JBQWpCLENBQVo7QUFDRCxPQUxEOztBQU9BLGFBQU9QLFNBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFJUyxhQUFhLEVBQWpCOztBQUVBLFdBQUtYLDZCQUFMLENBQW1DLFVBQVNHLHNCQUFULEVBQWlDO0FBQ2xFLFlBQU1TLFdBQVdULHNCQUFqQixDQURrRSxDQUN6Qjs7QUFFekNRLG1CQUFXTCxJQUFYLENBQWdCTSxRQUFoQjtBQUNELE9BSkQ7O0FBTUEsV0FBS1gsa0NBQUwsQ0FBd0MsVUFBU2xELDJCQUFULEVBQXNDO0FBQzVFLFlBQU02RCxXQUFXN0QsMkJBQWpCO0FBQUEsWUFBOEM7QUFDekM4RCxnREFBd0M5RCw0QkFBNEIrRCxrQkFBNUIsRUFEN0M7O0FBR0FILG1CQUFXTCxJQUFYLENBQWdCTSxRQUFoQjs7QUFFQUQscUJBQWFBLFdBQVdELE1BQVgsQ0FBa0JHLHFDQUFsQixDQUFiO0FBQ0QsT0FQRDs7QUFTQSxhQUFPRixVQUFQO0FBQ0Q7OzsrQ0FFMEIxRCxjLEVBQWdCO0FBQ3pDLFVBQUk4RCwyQkFBSjs7QUFFQSxVQUFNOUYsT0FBTyxLQUFLZSxPQUFMLEVBQWI7O0FBRUEsVUFBSWlCLG1CQUFtQixJQUF2QixFQUE2QjtBQUMzQjhELDZCQUFxQjlGLElBQXJCLENBRDJCLENBQ0M7QUFDN0IsT0FGRCxNQUVPO0FBQ0w4Riw2QkFBcUIsS0FBS3ZGLE9BQUwsQ0FBYXdGLDBCQUFiLENBQXdDL0QsY0FBeEMsQ0FBckI7O0FBRUEsWUFBSThELHVCQUF1QixJQUEzQixFQUFpQztBQUMvQkEsK0JBQXFCOUYsT0FBTyxHQUFQLEdBQWE4RixrQkFBbEM7QUFDRDtBQUNGOztBQUVELGFBQU9BLGtCQUFQO0FBQ0Q7OzsrREFFMENuRyxJLEVBQU00QyxjLEVBQWdCO0FBQy9ELFVBQUlDLDJDQUFKOztBQUVBLFVBQU0rQix1QkFBdUI1RSxLQUFLNkUsNEJBQUwsQ0FBa0M3RSxJQUFsQyxDQUE3Qjs7QUFFQSxVQUFJNEUseUJBQXlCLElBQTdCLEVBQW1DO0FBQ2pDL0IsNkNBQXFDLElBQXJDO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSUQsY0FBSixFQUFvQjtBQUNsQixjQUFNaUIsNENBQTRDLEtBQUtqRCxPQUFMLENBQWE0RCxvQ0FBYixDQUFrREksb0JBQWxELENBQWxEOztBQUVBLGNBQUksQ0FBQ2YseUNBQUwsRUFBZ0Q7QUFDOUMsZ0JBQU10QyxZQUFZLElBQWxCO0FBQUEsZ0JBQXdCO0FBQ2xCakIsdUJBQVcsS0FBSytDLFdBQUwsRUFEakI7O0FBR0EsaUJBQUt6QyxPQUFMLENBQWFtRCw4QkFBYixDQUE0Q2Esb0JBQTVDLEVBQWtFdEUsUUFBbEUsRUFBNEVpQixTQUE1RTtBQUNEO0FBQ0Y7O0FBRUQsWUFBTVksOEJBQThCLEtBQUt2QixPQUFMLENBQWFnRCwrQkFBYixDQUE2Q2dCLG9CQUE3QyxDQUFwQzs7QUFFQS9CLDZDQUFxQ1YsMkJBQXJDLENBZEssQ0FjNkQ7QUFDbkU7O0FBRUQsYUFBT1Usa0NBQVA7QUFDRDs7O2dFQUUyQztBQUMxQyxVQUFJd0Qsb0NBQW9DLEtBQUt6RixPQUFMLENBQWEwRix5Q0FBYixFQUF4Qzs7QUFFQSxVQUFJRCxzQ0FBc0MsSUFBMUMsRUFBZ0Q7QUFDOUMsWUFBTXZFLFNBQVMsS0FBS0UsUUFBTCxFQUFmOztBQUVBLFlBQUlGLE1BQUosRUFBWTtBQUNWdUUsOENBQW9DLElBQXBDO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPQSxpQ0FBUDtBQUNEOzs7aUZBRTREaEUsYyxFQUFnQjtBQUMzRSxVQUFJa0UsdURBQXVELElBQTNEOztBQUVBLFVBQU1qRSw0QkFBNEIsS0FBS2tFLDJCQUFMLENBQWlDbkUsY0FBakMsQ0FBbEM7O0FBRUEsVUFBSUMseUJBQUosRUFBK0I7QUFDN0JpRSwrREFBdUQsS0FBSzNGLE9BQUwsQ0FBYTZGLDREQUFiLENBQTBFcEUsY0FBMUUsQ0FBdkQ7O0FBRUEsWUFBSWtFLHlEQUF5RCxJQUE3RCxFQUFtRTtBQUNqRUEsaUVBQXVELElBQXZEO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPQSxvREFBUDtBQUNEOzs7K0NBRTBCO0FBQ3pCLFdBQUtHLE1BQUw7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLQSxNQUFMO0FBQ0Q7OztpQ0FFWW5GLFMsRUFBVztBQUN0QkEsa0JBQ0UsS0FBS0UsUUFBTCxFQURGLEdBRUksS0FBS0csTUFBTCxFQUZKO0FBR0Q7OzsrQkFFVTtBQUNULFdBQUsrRSxRQUFMLENBQWMsV0FBZDtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLQyxXQUFMLENBQWlCLFdBQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtDLFdBQUwsQ0FBaUIsV0FBakI7QUFDRDs7OytCQUVVdEYsUyxFQUFXO0FBQ3BCOztBQUVBLFdBQUt1RixhQUFMLENBQW1CLEtBQUtDLGtCQUFMLENBQXdCcEcsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBbkI7O0FBRUEsV0FBS3FHLE1BQUwsQ0FBWSxLQUFLcEcsT0FBakI7O0FBRUEsV0FBS3FHLE9BQUwsQ0FBYSxLQUFLcEcsWUFBbEI7O0FBRUEsV0FBS2lELFlBQUwsQ0FBa0J2QyxTQUFsQjtBQUNEOzs7bUNBRXFCMkYsSyxFQUFPQyxVLEVBQVk7QUFDdkMsVUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQkYscUJBQWFELEtBQWI7QUFDQUEsZ0JBQVEvRywyQkFBUjtBQUNEOztBQUpzQyx3QkFNRGdILFVBTkM7QUFBQSxVQU0vQjlHLElBTitCLGVBTS9CQSxJQU4rQjtBQUFBLFVBTXpCQyxRQU55QixlQU16QkEsUUFOeUI7QUFBQSxVQU1maUIsU0FOZSxlQU1mQSxTQU5lO0FBQUEsVUFPakNZLDJCQVBpQyxHQU9IcEMsZUFBZXVILGNBQWYsQ0FBOEJKLEtBQTlCLEVBQXFDQyxVQUFyQyxFQUFpRDlHLElBQWpELEVBQXVEQyxRQUF2RCxDQVBHOzs7QUFTdkM2QixrQ0FBNEJvRixVQUE1QixDQUF1Q2hHLFNBQXZDOztBQUVBLGFBQU9ZLDJCQUFQO0FBQ0Q7Ozs7RUF2YXVDcEMsYzs7QUEwYTFDeUgsT0FBT0MsTUFBUCxDQUFjdEgsMkJBQWQsRUFBMkM7QUFDekN1SCxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQURzQjtBQUl6Q0MscUJBQW1CLENBQ2pCLE1BRGlCLEVBRWpCLFVBRmlCLEVBR2pCLFdBSGlCO0FBSnNCLENBQTNDOztBQVdBQyxPQUFPQyxPQUFQLEdBQWlCM0gsMkJBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY29uc3QgeyBwYXRoIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IEJ1dHRvbiwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5lbnRyaWVzID0gPEVudHJpZXMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5PXtEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnl9IC8+O1xuICAgIFxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gPEJ1dHRvbiBjbGFzc05hbWU9XCJ0b2dnbGVcIiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNNYXJrZWQoKTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCwgcmVjb2duaXNlZCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGgucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVjb2duaXNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUsIGV4cGxvcmVyLCByZWNvZ25pc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRmlsZSkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdGhpcy5lbnRyaWVzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGgucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmVudHJpZXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aC50b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyRW50cnkobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGxldCByZW1vdmVkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjayk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKTsgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RmlsZVBhdGhzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRmlsZVBhdGhzKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHM7XG5cbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZVN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZVN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IHRoaXMpIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aC50b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5lbnRyaWVzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsIC8vL1xuICAgICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID9cbiAgICAgIHRoaXMuY29sbGFwc2UoKSA6XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZShjb2xsYXBzZWQpIHtcbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hcHBlbmQodGhpcy5lbnRyaWVzKTtcblxuICAgIHRoaXMucHJlcGVuZCh0aGlzLnRvZ2dsZUJ1dHRvbik7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcGVydGllcyA9IENsYXNzO1xuICAgICAgQ2xhc3MgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciwgY29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lLCBleHBsb3Jlcik7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShjb2xsYXBzZWQpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RpcmVjdG9yeU5hbWUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdleHBsb3JlcicsXG4gICAgJ2NvbGxhcHNlZCdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuIl19