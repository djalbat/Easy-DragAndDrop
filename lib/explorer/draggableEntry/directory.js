'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    React = easy.React;

var util = require('../../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    ToggleButton = require('../toggleButton'),
    DraggableEntry = require('../draggableEntry');

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selector, name, explorer) {
    var collapsed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    var updateHandler = _this.toggleButtonUpdateHandler.bind(_this),
        toggleButton = React.createElement(ToggleButton, { updateHandler: updateHandler, className: 'toggle' }),
        entries = React.createElement(Entries, { Directory: Directory, className: 'entries' });

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.toggleButton = toggleButton;

    _this.entries = entries;

    _this.append(entries);

    _this.prepend(toggleButton);

    collapsed ? _this.collapse() : _this.expand();
    return _this;
  }

  _createClass(Directory, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return true;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          return true;

        case Entry.types.DIRECTORY:

          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;
      }
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = [];

      this.forEachFile(function (file) {
        var subEntry = file; ///

        subEntries.push(subEntry);
      });

      this.forEachDirectory(function (directory) {
        var subEntry = directory,
            ///
        directorySubEntries = directory.getSubEntries();

        subEntries.push(subEntry);

        subEntries = subEntries.concat(directorySubEntries);
      });

      return subEntries;
    }
  }, {
    key: 'getFilePaths',
    value: function getFilePaths() {
      var filePaths = [];

      this.forEachFile(function (file) {
        var filePath = file.getPath();

        filePaths.push(filePath);
      });

      this.forEachDirectory(function (directory) {
        var directoryFilePaths = directory.getFilePaths();

        filePaths = filePaths.concat(directoryFilePaths);
      });

      return filePaths;
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'getBounds', this).call(this),
          collapsedBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
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
              overlappingDraggableEntryCollapsedBounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'isOverlappingCollapsedBounds', this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this.toggleButton.isCollapsed();
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.toggleButton.expand();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.toggleButton.collapse();
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.addFile(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.hasFile(fileName);

        if (!entriesFile) {
          var explorer = this.getExplorer();

          this.entries.addFile(fileName, explorer);
        }
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (!entriesDirectory) {
          var explorer = this.getExplorer();

          this.entries.addDirectory(directoryName, explorer, collapsed);
        }
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var removeEmptyParentDirectories = null; ///

      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        removeEmptyParentDirectories = topmostDirectory.removeFile(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.hasFile(fileName);

        if (entriesFile) {
          removeEmptyParentDirectories = this.entries.removeFile(fileName);
        }
      }

      if (removeEmptyParentDirectories === true) {
        var rootDirectory = this.isRootDirectory();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var removeEmptyParentDirectories = null; ///

      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        removeEmptyParentDirectories = topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (entriesDirectory) {
          removeEmptyParentDirectories = this.entries.removeDirectory(directoryName);
        }
      }

      if (removeEmptyParentDirectories === true) {
        var rootDirectory = this.isRootDirectory();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, draggableEntryType) {
      var topmostDirectoryName = util.topmostDirectoryName(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarker(markerName, draggableEntryType);
      } else {
        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

        topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, draggableEntryType);
      }
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var removed = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        this.entries.removeMarker();

        removed = true;
      } else {
        removed = this.entries.someDirectory(function (directory) {
          var removed = directory.removeMarker();

          return removed;
        });
      }

      return removed;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        marked = entriesMarked;
      } else {
        var directoryMarked = this.entries.someDirectory(function (directory) {
          var directoryMarked = directory.isMarked();

          return directoryMarked;
        });

        marked = directoryMarked;
      }

      return marked;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.entries.isEmpty();
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(callback) {
      this.entries.forEachFile(callback);
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(callback) {
      this.entries.forEachDirectory(callback);
    }
  }, {
    key: 'someDirectory',
    value: function someDirectory(callback) {
      this.entries.someDirectory(callback);
    }
  }, {
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = void 0;

      var name = this.getName();

      if (draggableEntry === this) {
        draggableEntryPath = name; ///
      } else {
        draggableEntryPath = this.entries.getDraggableEntryPath(draggableEntry);

        if (draggableEntryPath !== null) {
          draggableEntryPath = name + '/' + draggableEntryPath;
        }
      }

      return draggableEntryPath;
    }
  }, {
    key: 'topmostDirectory',
    value: function topmostDirectory(path, addIfNecessary) {
      var topmostDirectory = void 0;

      var topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        topmostDirectory = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

          if (!entriesDirectory) {
            var collapsed = true,
                explorer = this.getExplorer();

            this.entries.addDirectory(topmostDirectoryName, explorer, collapsed);
          }
        }

        topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);
      }

      return topmostDirectory;
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = this.entries.getMarkedDirectory();

      if (markedDirectory === null) {
        var marked = this.isMarked();

        if (marked) {
          markedDirectory = this;
        }
      }

      return markedDirectory;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null;

      var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

      if (overlappingDraggableEntry) {
        directoryOverlappingDraggableEntry = this.entries.getDirectoryOverlappingDraggableEntry(draggableEntry);

        if (directoryOverlappingDraggableEntry === null) {
          directoryOverlappingDraggableEntry = this;
        }
      }

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'toggleButtonUpdateHandler',
    value: function toggleButtonUpdateHandler(collapsed) {
      collapsed ? this.addClass('collapsed') : this.removeClass('collapsed');
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      this.toggleButton.toggle();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = Directory;
      }

      var _properties = properties,
          name = _properties.name,
          explorer = _properties.explorer,
          collapsed = _properties.collapsed;


      return DraggableEntry.fromProperties(Class, properties, name, explorer, collapsed);
    }
  }]);

  return Directory;
}(DraggableEntry);

Object.assign(Directory, {
  ignoredAttributes: ['name', 'explorer', 'collapsed']
});

module.exports = Directory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJSZWFjdCIsInV0aWwiLCJFbnRyeSIsIkVudHJpZXMiLCJUb2dnbGVCdXR0b24iLCJEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwiY29sbGFwc2VkIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidXBkYXRlSGFuZGxlciIsInRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIiLCJiaW5kIiwidG9nZ2xlQnV0dG9uIiwiZW50cmllcyIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJhcHBlbmQiLCJwcmVwZW5kIiwiY29sbGFwc2UiLCJleHBhbmQiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiZmlsZVBhdGhzIiwiZmlsZVBhdGgiLCJnZXRQYXRoIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiZ2V0RmlsZVBhdGhzIiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeSIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhZGRJZk5lY2Vzc2FyeSIsInRvcG1vc3REaXJlY3RvcnkiLCJmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlIiwiZmlsZU5hbWUiLCJlbnRyaWVzRmlsZSIsImhhc0ZpbGUiLCJnZXRFeHBsb3JlciIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnkiLCJoYXNEaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJvb3REaXJlY3RvcnkiLCJpc1Jvb3REaXJlY3RvcnkiLCJlbXB0eSIsImlzRW1wdHkiLCJyZW1vdmUiLCJyZW1vdmVEaXJlY3RvcnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJOYW1lIiwiYWRkTWFya2VyIiwicmV0cmlldmVEaXJlY3RvcnkiLCJtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicmVtb3ZlZCIsImVudHJpZXNNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsInNvbWVEaXJlY3RvcnkiLCJtYXJrZWQiLCJkaXJlY3RvcnlNYXJrZWQiLCJjYWxsYmFjayIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldERyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGgiLCJtYXJrZWREaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGUiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImlnbm9yZWRBdHRyaWJ1dGVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsUUFBUUYsS0FBS0UsS0FEbkI7O0FBR0EsSUFBTUMsT0FBT0YsUUFBUSxZQUFSLENBQWI7QUFBQSxJQUNNRyxRQUFRSCxRQUFRLFVBQVIsQ0FEZDtBQUFBLElBRU1JLFVBQVVKLFFBQVEsWUFBUixDQUZoQjtBQUFBLElBR01LLGVBQWVMLFFBQVEsaUJBQVIsQ0FIckI7QUFBQSxJQUlNTSxpQkFBaUJOLFFBQVEsbUJBQVIsQ0FKdkI7O0lBTU1PLFM7OztBQUNKLHFCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBeUQ7QUFBQSxRQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFBQTs7QUFDdkQsUUFBTUMsT0FBT1QsTUFBTVUsS0FBTixDQUFZQyxTQUF6Qjs7QUFEdUQsc0hBR2pETixRQUhpRCxFQUd2Q0MsSUFIdUMsRUFHakNDLFFBSGlDLEVBR3ZCRSxJQUh1Qjs7QUFLdkQsUUFBTUcsZ0JBQWdCLE1BQUtDLHlCQUFMLENBQStCQyxJQUEvQixPQUF0QjtBQUFBLFFBQ01DLGVBQWUsb0JBQUMsWUFBRCxJQUFjLGVBQWVILGFBQTdCLEVBQTRDLFdBQVUsUUFBdEQsR0FEckI7QUFBQSxRQUVNSSxVQUFVLG9CQUFDLE9BQUQsSUFBUyxXQUFXWixTQUFwQixFQUErQixXQUFVLFNBQXpDLEdBRmhCOztBQUlBLFVBQUthLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JKLElBQXhCLE9BQW5COztBQUVBLFVBQUtDLFlBQUwsR0FBb0JBLFlBQXBCOztBQUVBLFVBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQSxVQUFLRyxNQUFMLENBQVlILE9BQVo7O0FBRUEsVUFBS0ksT0FBTCxDQUFhTCxZQUFiOztBQUVBUCxn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RUFHakIsV0FIaUI7QUFESSxDQUF6Qjs7QUFRQUMsT0FBT0MsT0FBUCxHQUFpQjdHLFNBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIFJlYWN0ID0gZWFzeS5SZWFjdDtcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbiA9IDxUb2dnbGVCdXR0b24gdXBkYXRlSGFuZGxlcj17dXBkYXRlSGFuZGxlcn0gY2xhc3NOYW1lPVwidG9nZ2xlXCIgLz4sXG4gICAgICAgICAgZW50cmllcyA9IDxFbnRyaWVzIERpcmVjdG9yeT17RGlyZWN0b3J5fSBjbGFzc05hbWU9XCJlbnRyaWVzXCIgLz47XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSB0b2dnbGVCdXR0b247XG5cbiAgICB0aGlzLmVudHJpZXMgPSBlbnRyaWVzO1xuXG4gICAgdGhpcy5hcHBlbmQoZW50cmllcyk7XG5cbiAgICB0aGlzLnByZXBlbmQodG9nZ2xlQnV0dG9uKTtcblxuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBsZXQgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgoKTtcblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5RmlsZVBhdGhzID0gZGlyZWN0b3J5LmdldEZpbGVQYXRocygpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aHMgPSBmaWxlUGF0aHMuY29uY2F0KGRpcmVjdG9yeUZpbGVQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3Rvcnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/IFxuICAgICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJykgOiBcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24udG9nZ2xlKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcGVydGllcyA9IENsYXNzO1xuICAgICAgQ2xhc3MgPSBEaXJlY3Rvcnk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5LCB7XG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdleHBsb3JlcicsXG4gICAgJ2NvbGxhcHNlZCdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5O1xuIl19