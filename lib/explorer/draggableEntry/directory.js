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

  function Directory(selector, name, collapsed, explorer, activateFileEventHandler) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    _this.activateFileEventHandler = activateFileEventHandler;

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

          this.entries.addFile(fileName, explorer, this.activateFileEventHandler);
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

          this.entries.addDirectory(directoryName, collapsed, explorer, this.activateFileEventHandler);
        }
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath, removeEmptyParentDirectories) {
      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.removeFile(filePathWithoutTopmostDirectoryName, removeEmptyParentDirectories);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.hasFile(fileName);

        if (entriesFile) {
          this.entries.removeFile(fileName);
        }
      }

      if (removeEmptyParentDirectories) {
        var rootDirectory = this.isRootDirectory();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath, removeEmptyParentDirectories) {
      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName, removeEmptyParentDirectories);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (entriesDirectory) {
          this.entries.removeDirectory(directoryName);
        }
      }

      if (removeEmptyParentDirectories) {
        var rootDirectory = this.isRootDirectory();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }
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

            this.entries.addDirectory(topmostDirectoryName, collapsed, explorer, this.activateFileEventHandler);
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
    value: function clone(name, collapsed, explorer, activateFileEventHandler) {
      var directory = Element.clone(Directory, '#directory', name, collapsed, explorer, activateFileEventHandler);

      directory.removeAttribute('id');

      return directory;
    }
  }]);

  return Directory;
}(DraggableEntry);

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJleHBsb3JlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsInR5cGUiLCJ0eXBlcyIsIkRJUkVDVE9SWSIsInRvZ2dsZUJ1dHRvbiIsInRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIiLCJiaW5kIiwiZW50cmllcyIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJleHBhbmQiLCJjb2xsYXBzZSIsImVudHJ5IiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIkZJTEUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiYmVmb3JlIiwibG9jYWxlQ29tcGFyZSIsInN1YkVudHJpZXMiLCJmb3JFYWNoRmlsZSIsImZpbGUiLCJzdWJFbnRyeSIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwiZGlyZWN0b3J5U3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJjb25jYXQiLCJmaWxlUGF0aHMiLCJmaWxlUGF0aCIsImdldFBhdGgiLCJkaXJlY3RvcnlGaWxlUGF0aHMiLCJnZXRGaWxlUGF0aHMiLCJpc0NvbGxhcHNlZCIsImJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGUiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaGFzRmlsZSIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmVGaWxlIiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeSIsIm1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwi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cUMsSUFBckM7QUFDRDtBQUNGOztBQUVELGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4Q0FFeUJ6RixTLEVBQVc7QUFDbkNBLGtCQUNFLEtBQUs0RixRQUFMLENBQWMsV0FBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixXQUFqQixDQUZKO0FBR0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBS3ZGLFlBQUwsQ0FBa0J3RixNQUFsQjtBQUNEOzs7MEJBRVkvRixJLEVBQU1DLFMsRUFBV0MsUSxFQUFVQyx3QixFQUEwQjtBQUNoRSxVQUFJMkIsWUFBWXRDLFFBQVF3RyxLQUFSLENBQWNsRyxTQUFkLEVBQXlCLFlBQXpCLEVBQXVDRSxJQUF2QyxFQUE2Q0MsU0FBN0MsRUFBd0RDLFFBQXhELEVBQWtFQyx3QkFBbEUsQ0FBaEI7O0FBRUEyQixnQkFBVW1FLGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsYUFBT25FLFNBQVA7QUFDRDs7OztFQWxYcUJqQyxjOztBQXFYeEJxRyxPQUFPQyxPQUFQLEdBQWlCckcsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCB0aGlzLnRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIuYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgdmFyIGZpbGVQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgoKTtcblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRmlsZSkge1xuICAgICAgICB2YXIgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRmlsZSkge1xuICAgICAgICB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgIHZhciByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgIHZhciBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICB0aGlzLmVudHJpZXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICB2YXIgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByZW1vdmVkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBkaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZWQsXG4gICAgICAgIGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU1hcmtlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZGlyZWN0b3J5TWFya2VkID0gZGlyZWN0b3J5LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IGRpcmVjdG9yeU1hcmtlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSB0aGlzKSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZW50cmllcy5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWUgKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgICAgIHZhciBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgdmFyIGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShEaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5O1xuIl19