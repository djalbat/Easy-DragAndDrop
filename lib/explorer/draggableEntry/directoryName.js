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
    React = easy.React,
    topmostDirectoryNameFromPath = path.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = path.pathWithoutTopmostDirectoryNameFromPath;

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
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

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
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

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
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

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
        entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(directoryName);

        if (entriesDirectoryNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeDirectoryNameDraggableEntry(directoryName);
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

        this.entries.addMarkerEntry(markerName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

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

      var topmostDirectoryName = topmostDirectoryNameFromPath(path);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwibmVjZXNzYXJ5IiwiRW50cnkiLCJFbnRyaWVzIiwiRHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwiQnV0dG9uIiwiUmVhY3QiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwidHlwZXMiLCJESVJFQ1RPUllfTkFNRSIsInRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwidG9nZ2xlQnV0dG9uIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiTUFSS0VSIiwiRklMRV9OQU1FIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZXhwYW5kIiwiaGFzQ2xhc3MiLCJtYXJrZWQiLCJlbnRyaWVzTWFya2VkIiwiaXNNYXJrZWQiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNFbXB0eSIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImZpbGVQYXRoIiwicmVjb2duaXNlZCIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZVBhdGgiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImdldEV4cGxvcmVyIiwiYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeU5hbWUiLCJlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50Iiwic2V0Q29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZUZpbGVQYXRoIiwicmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInRvcG1vc3REaXJlY3RvcnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJyZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJOYW1lIiwiYWRkTWFya2VyRW50cnkiLCJtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiY2FsbGJhY2siLCJmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aHMiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicHVzaCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiY29uY2F0Iiwic3ViRW50cmllcyIsInN1YkVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJ5UGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9nZ2xlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImFwcGVuZCIsInByZXBlbmQiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFFBQVFGLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxZQUFSLENBRGhCO0FBQUEsSUFFTUksaUJBQWlCSixRQUFRLG1CQUFSLENBRnZCOztBQUlNLElBQUVLLElBQUYsR0FBV0osU0FBWCxDQUFFSSxJQUFGO0FBQUEsSUFDRUMsTUFERixHQUNvQlAsSUFEcEIsQ0FDRU8sTUFERjtBQUFBLElBQ1VDLEtBRFYsR0FDb0JSLElBRHBCLENBQ1VRLEtBRFY7QUFBQSxJQUVFQyw0QkFGRixHQUU0RUgsSUFGNUUsQ0FFRUcsNEJBRkY7QUFBQSxJQUVnQ0MsdUNBRmhDLEdBRTRFSixJQUY1RSxDQUVnQ0ksdUNBRmhDOztJQUlBQywyQjs7O0FBQ0osdUNBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUNwQyxRQUFNQyxPQUFPWixNQUFNYSxLQUFOLENBQVlDLGNBQXpCOztBQURvQywwSkFHOUJMLFFBSDhCLEVBR3BCQyxJQUhvQixFQUdkQyxRQUhjLEVBR0pDLElBSEk7O0FBS3BDLFFBQU1HLDJCQUEyQixNQUFLQSx3QkFBTCxDQUE4QkMsSUFBOUIsT0FBakM7O0FBRUEsVUFBS0MsT0FBTCxHQUFlLG9CQUFDLE9BQUQsSUFBUyw2QkFBNkJULDJCQUF0QyxHQUFmOztBQUVBLFVBQUtVLFlBQUwsR0FBb0Isb0JBQUMsTUFBRCxJQUFRLFdBQVUsUUFBbEIsRUFBMkIsU0FBU0gsd0JBQXBDLEdBQXBCO0FBVG9DO0FBVXJDOzs7O29EQUUrQjtBQUM5QixhQUFPLElBQVA7QUFDRDs7OzZCQUVRSSxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtyQixNQUFNYSxLQUFOLENBQVlVLE1BQWpCO0FBQ0EsYUFBS3ZCLE1BQU1hLEtBQU4sQ0FBWVcsU0FBakI7QUFDRUosbUJBQVMsSUFBVDs7QUFFQTs7QUFFRixhQUFLcEIsTUFBTWEsS0FBTixDQUFZQyxjQUFqQjtBQUNFLGNBQU1KLE9BQU8sS0FBS2UsT0FBTCxFQUFiO0FBQUEsY0FDTUMsWUFBWVAsTUFBTU0sT0FBTixFQURsQjs7QUFHQUwsbUJBQVVWLEtBQUtpQixhQUFMLENBQW1CRCxTQUFuQixJQUFnQyxDQUExQzs7QUFFQTtBQWJKOztBQWdCQSxhQUFPTixNQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVEsWUFBWSxLQUFLQyxXQUFMLEVBQWxCOztBQUVBLFdBQUtDLFFBQUw7O0FBRUEsVUFBTUMsNEpBQU47QUFBQSxVQUNNQyxrQkFBa0JELE1BRHhCLENBTG1CLENBTWM7O0FBRWpDLFVBQUksQ0FBQ0gsU0FBTCxFQUFnQjtBQUNkLGFBQUtLLE1BQUw7QUFDRDs7QUFFRCxhQUFPRCxlQUFQO0FBQ0Q7OztrQ0FFYTtBQUNaLFVBQU1KLFlBQVksS0FBS00sUUFBTCxDQUFjLFdBQWQsQ0FBbEI7O0FBRUEsYUFBT04sU0FBUDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFJTyxlQUFKOztBQUVBLFVBQU1DLGdCQUFnQixLQUFLbkIsT0FBTCxDQUFhb0IsUUFBYixFQUF0Qjs7QUFFQSxVQUFJRCxhQUFKLEVBQW1CO0FBQ2pCRCxpQkFBU0MsYUFBVDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQU1FLG9DQUFvQyxLQUFLckIsT0FBTCxDQUFhc0IsK0JBQWIsQ0FBNkMsVUFBU0MsMkJBQVQsRUFBc0M7QUFDM0gsY0FBTUYsb0NBQW9DRSw0QkFBNEJILFFBQTVCLEVBQTFDOztBQUVBLGlCQUFPQyxpQ0FBUDtBQUNELFNBSnlDLENBQTFDOztBQU1BSCxpQkFBU0csaUNBQVQsQ0FQSyxDQU91QztBQUM3Qzs7QUFFRCxhQUFPSCxNQUFQO0FBQ0Q7Ozs4QkFFUztBQUFFLGFBQU8sS0FBS2xCLE9BQUwsQ0FBYXdCLE9BQWIsRUFBUDtBQUFnQzs7O2dEQUVoQkMsYyxFQUFnQjtBQUMxQyxVQUFJQyxrQ0FBSjs7QUFFQSxVQUFJLFNBQVNELGNBQWIsRUFBNkI7QUFDM0JDLG9DQUE0QixLQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQU1mLFlBQVksS0FBS0MsV0FBTCxFQUFsQjs7QUFFQSxZQUFJRCxTQUFKLEVBQWU7QUFDYmUsc0NBQTRCLEtBQTVCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBTUMsZ0NBQWdDRixlQUFlRyxrQkFBZixFQUF0QztBQUFBLGNBQ01DLGtOQUE4RUYsNkJBQTlFLENBRE47O0FBR0FELHNDQUE0Qkcsd0NBQTVCO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPSCx5QkFBUDtBQUNEOzs7Z0NBRVdJLFEsRUFBVUMsVSxFQUFZO0FBQ2hDLFVBQU1DLGlCQUFpQixJQUF2QjtBQUFBLFVBQ01DLHFDQUFxQyxLQUFLQywwQ0FBTCxDQUFnREosUUFBaEQsRUFBMERFLGNBQTFELENBRDNDOztBQUdBLFVBQUlDLHVDQUF1QyxJQUEzQyxFQUFpRDtBQUMvQyxZQUFNRSxzQ0FBc0M3Qyx3Q0FBd0N3QyxRQUF4QyxDQUE1Qzs7QUFFQUcsMkNBQW1DRyxXQUFuQyxDQUErQ0QsbUNBQS9DLEVBQW9GSixVQUFwRjtBQUNELE9BSkQsTUFJTztBQUNMLFlBQU1NLFdBQVdQLFFBQWpCO0FBQUEsWUFBNEI7QUFDdEJRLHNCQUFjLEtBQUt0QyxPQUFMLENBQWF1QywrQkFBYixDQUE2Q0YsUUFBN0MsQ0FEcEI7O0FBR0EsWUFBSSxDQUFDQyxXQUFMLEVBQWtCO0FBQ2hCLGNBQU01QyxXQUFXLEtBQUs4QyxXQUFMLEVBQWpCOztBQUVBLGVBQUt4QyxPQUFMLENBQWF5Qyx5QkFBYixDQUF1Q0osUUFBdkMsRUFBaUQzQyxRQUFqRCxFQUEyRHFDLFVBQTNEO0FBQ0Q7QUFDRjtBQUNGOzs7cUNBRWdCVyxhLEVBQWUvQixTLEVBQVc7QUFDekMsVUFBTXFCLGlCQUFpQixJQUF2QjtBQUFBLFVBQ01DLHFDQUFxQyxLQUFLQywwQ0FBTCxDQUFnRFEsYUFBaEQsRUFBK0RWLGNBQS9ELENBRDNDOztBQUdBLFVBQUlDLHVDQUF1QyxJQUEzQyxFQUFpRDtBQUMvQyxZQUFNVSwyQ0FBMkNyRCx3Q0FBd0NvRCxhQUF4QyxDQUFqRDs7QUFFQVQsMkNBQW1DVyxnQkFBbkMsQ0FBb0RELHdDQUFwRCxFQUE4RmhDLFNBQTlGO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBTWtDLGdCQUFnQkgsYUFBdEI7QUFBQSxZQUFzQztBQUNoQ0ksNkNBQXFDLEtBQUs5QyxPQUFMLENBQWErQywrQkFBYixDQUE2Q0YsYUFBN0MsQ0FEM0M7QUFBQSxZQUVNRyw0Q0FBNkNGLHVDQUF1QyxJQUYxRjs7QUFJQSxZQUFJRSx5Q0FBSixFQUErQztBQUM3Q0YsNkNBQW1DRyxZQUFuQyxDQUFnRHRDLFNBQWhEO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBTWpCLFdBQVcsS0FBSzhDLFdBQUwsRUFBakI7O0FBRUEsZUFBS3hDLE9BQUwsQ0FBYWtELDhCQUFiLENBQTRDTCxhQUE1QyxFQUEyRG5ELFFBQTNELEVBQXFFaUIsU0FBckU7QUFDRDtBQUNGO0FBQ0Y7OzttQ0FFY21CLFEsRUFBVTtBQUN2QixVQUFJcUIsaURBQWlELElBQXJELENBRHVCLENBQ29DOztBQUUzRCxVQUFNbkIsaUJBQWlCLEtBQXZCO0FBQUEsVUFDTUMscUNBQXFDLEtBQUtDLDBDQUFMLENBQWdESixRQUFoRCxFQUEwREUsY0FBMUQsQ0FEM0M7O0FBR0EsVUFBSUMsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DLFlBQU1FLHNDQUFzQzdDLHdDQUF3Q3dDLFFBQXhDLENBQTVDOztBQUVBcUIseURBQWlEbEIsbUNBQW1DbUIsY0FBbkMsQ0FBa0RqQixtQ0FBbEQsQ0FBakQ7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFNRSxXQUFXUCxRQUFqQjtBQUFBLFlBQTRCO0FBQ3RCUSxzQkFBYyxLQUFLdEMsT0FBTCxDQUFhdUMsK0JBQWIsQ0FBNkNGLFFBQTdDLENBRHBCOztBQUdBLFlBQUlDLFdBQUosRUFBaUI7QUFDZmEsMkRBQWlELEtBQUtuRCxPQUFMLENBQWFxRCw0QkFBYixDQUEwQ2hCLFFBQTFDLENBQWpEO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJYyxtREFBbUQsSUFBdkQsRUFBNkQ7QUFDM0QsWUFBTUcsbUJBQW1CLEtBQUtDLG9DQUFMLEVBQXpCOztBQUVBLFlBQUksQ0FBQ0QsZ0JBQUwsRUFBdUI7QUFDckIsY0FBTUUsUUFBUSxLQUFLaEMsT0FBTCxFQUFkOztBQUVBLGNBQUlnQyxLQUFKLEVBQVc7QUFDVCxpQkFBS0MsTUFBTDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxhQUFPTiw4Q0FBUDtBQUNEOzs7d0NBRW1CVCxhLEVBQWU7QUFDakMsVUFBSVMsaURBQWlELEtBQXJEOztBQUVBLFVBQU1uQixpQkFBaUIsS0FBdkI7QUFBQSxVQUE4QjtBQUN4QkMsMkNBQXFDLEtBQUtDLDBDQUFMLENBQWdEUSxhQUFoRCxFQUErRFYsY0FBL0QsQ0FEM0M7O0FBR0EsVUFBSUMsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DLFlBQU1VLDJDQUEyQ3JELHdDQUF3Q29ELGFBQXhDLENBQWpEOztBQUVBUyx5REFBaURsQixtQ0FBbUN5QixtQkFBbkMsQ0FBdURmLHdDQUF2RCxDQUFqRDtBQUNELE9BSkQsTUFJTztBQUNMLFlBQU1FLGdCQUFnQkgsYUFBdEI7QUFBQSxZQUFzQztBQUNoQ00sb0RBQTRDLEtBQUtoRCxPQUFMLENBQWEyRCxvQ0FBYixDQUFrRGQsYUFBbEQsQ0FEbEQ7O0FBR0EsWUFBSUcseUNBQUosRUFBK0M7QUFDN0NHLDJEQUFpRCxLQUFLbkQsT0FBTCxDQUFhNEQsaUNBQWIsQ0FBK0NmLGFBQS9DLENBQWpEO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJTSxtREFBbUQsSUFBdkQsRUFBNkQ7QUFDM0QsWUFBTUcsbUJBQW1CLEtBQUtDLG9DQUFMLEVBQXpCOztBQUVBLFlBQUksQ0FBQ0QsZ0JBQUwsRUFBdUI7QUFDckIsY0FBTUUsUUFBUSxLQUFLaEMsT0FBTCxFQUFkOztBQUVBLGNBQUlnQyxLQUFKLEVBQVc7QUFDVCxpQkFBS0MsTUFBTDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxhQUFPTiw4Q0FBUDtBQUNEOzs7bUNBRWNVLFUsRUFBWUMsa0IsRUFBb0I7QUFDN0MsVUFBTUMsdUJBQXVCMUUsNkJBQTZCd0UsVUFBN0IsQ0FBN0I7O0FBRUEsVUFBSUUseUJBQXlCLElBQTdCLEVBQW1DO0FBQ2pDLFlBQU1DLGFBQWFILFVBQW5CLENBRGlDLENBQ0Q7O0FBRWhDLGFBQUs3RCxPQUFMLENBQWFpRSxjQUFiLENBQTRCRCxVQUE1QixFQUF3Q0Ysa0JBQXhDO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBTTdCLHFDQUFxQyxLQUFLakMsT0FBTCxDQUFhK0MsK0JBQWIsQ0FBNkNnQixvQkFBN0MsQ0FBM0M7QUFBQSxZQUNNRyx3Q0FBd0M1RSx3Q0FBd0N1RSxVQUF4QyxDQUQ5Qzs7QUFHQTVCLDJDQUFtQ2dDLGNBQW5DLENBQWtEQyxxQ0FBbEQsRUFBeUZKLGtCQUF6RjtBQUNEO0FBQ0Y7Ozt3Q0FFbUI7QUFDbEIsVUFBSUssZ0JBQUo7O0FBRUEsVUFBTWhELGdCQUFnQixLQUFLbkIsT0FBTCxDQUFhb0IsUUFBYixFQUF0Qjs7QUFFQSxVQUFJRCxhQUFKLEVBQW1CO0FBQ2pCLGFBQUtuQixPQUFMLENBQWFvRSxpQkFBYjs7QUFFQUQsa0JBQVUsSUFBVjtBQUNELE9BSkQsTUFJTztBQUNMQSxrQkFBVSxLQUFLbkUsT0FBTCxDQUFhc0IsK0JBQWIsQ0FBNkMsVUFBU0MsMkJBQVQsRUFBc0M7QUFDM0YsY0FBTTRDLFVBQVU1Qyw0QkFBNEI2QyxpQkFBNUIsRUFBaEI7O0FBRUEsaUJBQU9ELE9BQVA7QUFDRCxTQUpTLENBQVY7QUFLRDs7QUFFRCxhQUFPQSxPQUFQO0FBQ0Q7OztrREFFNkJFLFEsRUFBVTtBQUFFLFdBQUtyRSxPQUFMLENBQWFzRSw2QkFBYixDQUEyQ0QsUUFBM0M7QUFBdUQ7Ozt1REFFOURBLFEsRUFBVTtBQUFFLFdBQUtyRSxPQUFMLENBQWF1RSxrQ0FBYixDQUFnREYsUUFBaEQ7QUFBNEQ7OztvREFFM0VBLFEsRUFBVTtBQUFFLFdBQUtyRSxPQUFMLENBQWFzQiwrQkFBYixDQUE2QytDLFFBQTdDO0FBQXlEOzs7d0NBRWpGO0FBQ2xCLFVBQUlHLFlBQVksRUFBaEI7O0FBRUEsV0FBS0YsNkJBQUwsQ0FBbUMsVUFBU0csc0JBQVQsRUFBaUM7QUFDbEUsWUFBTUMsNkJBQTZCRCx1QkFBdUJFLE9BQXZCLEVBQW5DO0FBQUEsWUFDTTdDLFdBQVc0QywwQkFEakIsQ0FEa0UsQ0FFcEI7O0FBRTlDRixrQkFBVUksSUFBVixDQUFlOUMsUUFBZjtBQUNELE9BTEQ7O0FBT0EsV0FBS3lDLGtDQUFMLENBQXdDLFVBQVNoRCwyQkFBVCxFQUFzQztBQUM1RSxZQUFNc0QsdUNBQXVDdEQsNEJBQTRCdUQsaUJBQTVCLEVBQTdDO0FBQUEsWUFDTUMscUJBQXFCRixvQ0FEM0I7O0FBR0FMLG9CQUFZQSxVQUFVUSxNQUFWLENBQWlCRCxrQkFBakIsQ0FBWjtBQUNELE9BTEQ7O0FBT0EsYUFBT1AsU0FBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQUlTLGFBQWEsRUFBakI7O0FBRUEsV0FBS1gsNkJBQUwsQ0FBbUMsVUFBU0csc0JBQVQsRUFBaUM7QUFDbEUsWUFBTVMsV0FBV1Qsc0JBQWpCLENBRGtFLENBQ3pCOztBQUV6Q1EsbUJBQVdMLElBQVgsQ0FBZ0JNLFFBQWhCO0FBQ0QsT0FKRDs7QUFNQSxXQUFLWCxrQ0FBTCxDQUF3QyxVQUFTaEQsMkJBQVQsRUFBc0M7QUFDNUUsWUFBTTJELFdBQVczRCwyQkFBakI7QUFBQSxZQUE4QztBQUN6QzRELGdEQUF3QzVELDRCQUE0QjZELGtCQUE1QixFQUQ3Qzs7QUFHQUgsbUJBQVdMLElBQVgsQ0FBZ0JNLFFBQWhCOztBQUVBRCxxQkFBYUEsV0FBV0QsTUFBWCxDQUFrQkcscUNBQWxCLENBQWI7QUFDRCxPQVBEOztBQVNBLGFBQU9GLFVBQVA7QUFDRDs7OytDQUUwQnhELGMsRUFBZ0I7QUFDekMsVUFBSTRELDJCQUFKOztBQUVBLFVBQU01RixPQUFPLEtBQUtlLE9BQUwsRUFBYjs7QUFFQSxVQUFJaUIsbUJBQW1CLElBQXZCLEVBQTZCO0FBQzNCNEQsNkJBQXFCNUYsSUFBckIsQ0FEMkIsQ0FDQztBQUM3QixPQUZELE1BRU87QUFDTDRGLDZCQUFxQixLQUFLckYsT0FBTCxDQUFhc0YsMEJBQWIsQ0FBd0M3RCxjQUF4QyxDQUFyQjs7QUFFQSxZQUFJNEQsdUJBQXVCLElBQTNCLEVBQWlDO0FBQy9CQSwrQkFBcUI1RixPQUFPLEdBQVAsR0FBYTRGLGtCQUFsQztBQUNEO0FBQ0Y7O0FBRUQsYUFBT0Esa0JBQVA7QUFDRDs7OytEQUUwQ25HLEksRUFBTThDLGMsRUFBZ0I7QUFDL0QsVUFBSUMsMkNBQUo7O0FBRUEsVUFBTThCLHVCQUF1QjFFLDZCQUE2QkgsSUFBN0IsQ0FBN0I7O0FBRUEsVUFBSTZFLHlCQUF5QixJQUE3QixFQUFtQztBQUNqQzlCLDZDQUFxQyxJQUFyQztBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlELGNBQUosRUFBb0I7QUFDbEIsY0FBTWdCLDRDQUE0QyxLQUFLaEQsT0FBTCxDQUFhMkQsb0NBQWIsQ0FBa0RJLG9CQUFsRCxDQUFsRDs7QUFFQSxjQUFJLENBQUNmLHlDQUFMLEVBQWdEO0FBQzlDLGdCQUFNckMsWUFBWSxJQUFsQjtBQUFBLGdCQUF3QjtBQUNsQmpCLHVCQUFXLEtBQUs4QyxXQUFMLEVBRGpCOztBQUdBLGlCQUFLeEMsT0FBTCxDQUFha0QsOEJBQWIsQ0FBNENhLG9CQUE1QyxFQUFrRXJFLFFBQWxFLEVBQTRFaUIsU0FBNUU7QUFDRDtBQUNGOztBQUVELFlBQU1ZLDhCQUE4QixLQUFLdkIsT0FBTCxDQUFhK0MsK0JBQWIsQ0FBNkNnQixvQkFBN0MsQ0FBcEM7O0FBRUE5Qiw2Q0FBcUNWLDJCQUFyQyxDQWRLLENBYzZEO0FBQ25FOztBQUVELGFBQU9VLGtDQUFQO0FBQ0Q7OztnRUFFMkM7QUFDMUMsVUFBSXNELG9DQUFvQyxLQUFLdkYsT0FBTCxDQUFhd0YseUNBQWIsRUFBeEM7O0FBRUEsVUFBSUQsc0NBQXNDLElBQTFDLEVBQWdEO0FBQzlDLFlBQU1yRSxTQUFTLEtBQUtFLFFBQUwsRUFBZjs7QUFFQSxZQUFJRixNQUFKLEVBQVk7QUFDVnFFLDhDQUFvQyxJQUFwQztBQUNEO0FBQ0Y7O0FBRUQsYUFBT0EsaUNBQVA7QUFDRDs7O2lGQUU0RDlELGMsRUFBZ0I7QUFDM0UsVUFBSWdFLHVEQUF1RCxJQUEzRDs7QUFFQSxVQUFNL0QsNEJBQTRCLEtBQUtnRSwyQkFBTCxDQUFpQ2pFLGNBQWpDLENBQWxDOztBQUVBLFVBQUlDLHlCQUFKLEVBQStCO0FBQzdCK0QsK0RBQXVELEtBQUt6RixPQUFMLENBQWEyRiw0REFBYixDQUEwRWxFLGNBQTFFLENBQXZEOztBQUVBLFlBQUlnRSx5REFBeUQsSUFBN0QsRUFBbUU7QUFDakVBLGlFQUF1RCxJQUF2RDtBQUNEO0FBQ0Y7O0FBRUQsYUFBT0Esb0RBQVA7QUFDRDs7OytDQUUwQjtBQUN6QixXQUFLRyxNQUFMO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBS0EsTUFBTDtBQUNEOzs7aUNBRVlqRixTLEVBQVc7QUFDdEJBLGtCQUNFLEtBQUtFLFFBQUwsRUFERixHQUVJLEtBQUtHLE1BQUwsRUFGSjtBQUdEOzs7K0JBRVU7QUFDVCxXQUFLNkUsUUFBTCxDQUFjLFdBQWQ7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0MsV0FBTCxDQUFpQixXQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLQyxXQUFMLENBQWlCLFdBQWpCO0FBQ0Q7OzsrQkFFVXBGLFMsRUFBVztBQUNwQjs7QUFFQSxXQUFLcUYsYUFBTCxDQUFtQixLQUFLQyxrQkFBTCxDQUF3QmxHLElBQXhCLENBQTZCLElBQTdCLENBQW5COztBQUVBLFdBQUttRyxNQUFMLENBQVksS0FBS2xHLE9BQWpCOztBQUVBLFdBQUttRyxPQUFMLENBQWEsS0FBS2xHLFlBQWxCOztBQUVBLFdBQUtnRCxZQUFMLENBQWtCdEMsU0FBbEI7QUFDRDs7O21DQUVxQnlGLEssRUFBT0MsVSxFQUFZO0FBQ3ZDLFVBQUlDLFVBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJGLHFCQUFhRCxLQUFiO0FBQ0FBLGdCQUFRN0csMkJBQVI7QUFDRDs7QUFKc0Msd0JBTUQ4RyxVQU5DO0FBQUEsVUFNL0I1RyxJQU4rQixlQU0vQkEsSUFOK0I7QUFBQSxVQU16QkMsUUFOeUIsZUFNekJBLFFBTnlCO0FBQUEsVUFNZmlCLFNBTmUsZUFNZkEsU0FOZTtBQUFBLFVBT2pDWSwyQkFQaUMsR0FPSHRDLGVBQWV1SCxjQUFmLENBQThCSixLQUE5QixFQUFxQ0MsVUFBckMsRUFBaUQ1RyxJQUFqRCxFQUF1REMsUUFBdkQsQ0FQRzs7O0FBU3ZDNkIsa0NBQTRCa0YsVUFBNUIsQ0FBdUM5RixTQUF2Qzs7QUFFQSxhQUFPWSwyQkFBUDtBQUNEOzs7O0VBdmF1Q3RDLGM7O0FBMGExQ3lILE9BQU9DLE1BQVAsQ0FBY3BILDJCQUFkLEVBQTJDO0FBQ3pDcUgscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FEc0I7QUFJekNDLHFCQUFtQixDQUNqQixNQURpQixFQUVqQixVQUZpQixFQUdqQixXQUhpQjtBQUpzQixDQUEzQzs7QUFXQUMsT0FBT0MsT0FBUCxHQUFpQnpILDJCQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNvbnN0IHsgcGF0aCB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGg7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5lbnRyaWVzID0gPEVudHJpZXMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5PXtEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnl9IC8+O1xuICAgIFxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gPEJ1dHRvbiBjbGFzc05hbWU9XCJ0b2dnbGVcIiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNNYXJrZWQoKTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCwgcmVjb2duaXNlZCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlY29nbmlzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRmlsZSkge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IG51bGw7IC8vL1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRmlsZSkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdGhpcy5lbnRyaWVzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCF0b3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5lbnRyaWVzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCF0b3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG4gIFxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGxldCByZW1vdmVkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjayk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKTsgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RmlsZVBhdGhzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRmlsZVBhdGhzKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHM7XG5cbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZVN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZVN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IHRoaXMpIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICBjb25zdCBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuZW50cmllcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlLCAvLy9cbiAgICAgICAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY29sbGFwc2VkKSB7XG4gICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYXBwZW5kKHRoaXMuZW50cmllcyk7XG5cbiAgICB0aGlzLnByZXBlbmQodGhpcy50b2dnbGVCdXR0b24pO1xuXG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoY29sbGFwc2VkKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnlOYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==