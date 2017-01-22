'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    ToggleButton = require('../toggleButton'),
    DraggableEntry = require('../draggableEntry');

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selector, name, collapsed, explorer) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    _this.toggleButton = new ToggleButton(_this, _this.toggleButtonUpdateHandler.bind(_this));

    _this.entries = new Entries(_this, Directory);

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    !collapsed ? _this.expand() : _this.collapse();
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
      var overlappingDraggableEntry;

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

          this.entries.addDirectory(directoryName, collapsed, explorer);
        }
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary),
          removeEmptyParentDirectories = undefined; ///

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
      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary),
          removeEmptyParentDirectories = undefined; ///;

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
      var removed,
          entriesMarked = this.entries.isMarked();

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
      var marked,
          entriesMarked = this.entries.isMarked();

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
      var name = this.getName(),
          draggableEntryPath;

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
      var topmostDirectory,
          topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        topmostDirectory = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

          if (!entriesDirectory) {
            var collapsed = true,
                explorer = this.getExplorer();

            this.entries.addDirectory(topmostDirectoryName, collapsed, explorer);
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
      var directoryOverlappingDraggableEntry = null,
          overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

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
    key: 'clone',
    value: function clone(name, collapsed, explorer) {
      var directory = Element.clone(Directory, '#directory', name, collapsed, explorer);

      directory.removeAttribute('id');

      return directory;
    }
  }]);

  return Directory;
}(DraggableEntry);

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJleHBsb3JlciIsInR5cGUiLCJ0eXBlcyIsIkRJUkVDVE9SWSIsInRvZ2dsZUJ1dHRvbiIsInRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIiLCJiaW5kIiwiZW50cmllcyIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJleHBhbmQiLCJjb2xsYXBzZSIsImVudHJ5IiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIkZJTEUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiYmVmb3JlIiwibG9jYWxlQ29tcGFyZSIsInN1YkVudHJpZXMiLCJmb3JFYWNoRmlsZSIsImZpbGUiLCJzdWJFbnRyeSIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwiZGlyZWN0b3J5U3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJjb25jYXQiLCJmaWxlUGF0aHMiLCJmaWxlUGF0aCIsImdldFBhdGgiLCJkaXJlY3RvcnlGaWxlUGF0aHMiLCJnZXRGaWxlUGF0aHMiLCJpc0NvbGxhcHNlZCIsImJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGUiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaGFzRmlsZSIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJ1bmRlZmluZWQiLCJyZW1vdmVGaWxlIiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeSIsIm1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBw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aUQ7QUFDL0NBLCtDQUFxQyxJQUFyQztBQUNEO0FBQ0Y7O0FBRUQsYUFBT0Esa0NBQVA7QUFDRDs7OzhDQUV5QnpGLFMsRUFBVztBQUNuQ0Esa0JBQ0UsS0FBSzRGLFFBQUwsQ0FBYyxXQUFkLENBREYsR0FFSSxLQUFLQyxXQUFMLENBQWlCLFdBQWpCLENBRko7QUFHRDs7O3lDQUVvQjtBQUNuQixXQUFLeEYsWUFBTCxDQUFrQnlGLE1BQWxCO0FBQ0Q7OzswQkFFWS9GLEksRUFBTUMsUyxFQUFXQyxRLEVBQVU7QUFDdEMsVUFBSTJCLFlBQVlyQyxRQUFRd0csS0FBUixDQUFjbEcsU0FBZCxFQUF5QixZQUF6QixFQUF1Q0UsSUFBdkMsRUFBNkNDLFNBQTdDLEVBQXdEQyxRQUF4RCxDQUFoQjs7QUFFQTJCLGdCQUFVb0UsZUFBVixDQUEwQixJQUExQjs7QUFFQSxhQUFPcEUsU0FBUDtBQUNEOzs7O0VBdFhxQmhDLGM7O0FBeVh4QnFHLE9BQU9DLE9BQVAsR0FBaUJyRyxTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcykgKTtcblxuICAgIHRoaXMuZW50cmllcyA9IG5ldyBFbnRyaWVzKHRoaXMsIERpcmVjdG9yeSk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAhY29sbGFwc2VkID9cbiAgICAgIHRoaXMuZXhwYW5kKCkgOlxuICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIHZhciBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKCk7XG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnkuZ2V0RmlsZVBhdGhzKCk7XG4gICAgICBcbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIHZhciBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgdmFyIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIHZhciBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSksXG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB1bmRlZmluZWQ7IC8vL1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0ZpbGUpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVGaWxlKGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSksXG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB1bmRlZmluZWQ7IC8vLztcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIHZhciByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyKG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcmVtb3ZlZCxcbiAgICAgICAgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciByZW1vdmVkID0gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICB2YXIgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlLFxuICAgICAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=