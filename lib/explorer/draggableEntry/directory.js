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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJleHBsb3JlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsInR5cGUiLCJ0eXBlcyIsIkRJUkVDVE9SWSIsInRvZ2dsZUJ1dHRvbiIsInRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIiLCJiaW5kIiwiZW50cmllcyIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJleHBhbmQiLCJjb2xsYXBzZSIsImVudHJ5IiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIkZJTEUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiYmVmb3JlIiwibG9jYWxlQ29tcGFyZSIsInN1YkVudHJpZXMiLCJmb3JFYWNoRmlsZSIsImZpbGUiLCJzdWJFbnRyeSIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwiZGlyZWN0b3J5U3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJjb25jYXQiLCJmaWxlUGF0aHMiLCJmaWxlUGF0aCIsImdldFBhdGgiLCJkaXJlY3RvcnlGaWxlUGF0aHMiLCJnZXRGaWxlUGF0aHMiLCJpc0NvbGxhcHNlZCIsImJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGUiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaGFzRmlsZSIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJ1bmRlZmluZWQiLCJyZW1vdmVGaWxlIiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeSIsIm1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRl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Q0FBaUNsRCxjQUFqQyxDQURoQzs7QUFHQSxVQUFJQyx5QkFBSixFQUErQjtBQUM3QmdELDZDQUFxQyxLQUFLakYsT0FBTCxDQUFhbUYscUNBQWIsQ0FBbURuRCxjQUFuRCxDQUFyQzs7QUFFQSxZQUFJaUQsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DQSwrQ0FBcUMsSUFBckM7QUFDRDtBQUNGOztBQUVELGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4Q0FFeUIxRixTLEVBQVc7QUFDbkNBLGtCQUNFLEtBQUs2RixRQUFMLENBQWMsV0FBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixXQUFqQixDQUZKO0FBR0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBS3hGLFlBQUwsQ0FBa0J5RixNQUFsQjtBQUNEOzs7MEJBRVloRyxJLEVBQU1DLFMsRUFBV0MsUSxFQUFVQyx3QixFQUEwQjtBQUNoRSxVQUFJMkIsWUFBWXRDLFFBQVF5RyxLQUFSLENBQWNuRyxTQUFkLEVBQXlCLFlBQXpCLEVBQXVDRSxJQUF2QyxFQUE2Q0MsU0FBN0MsRUFBd0RDLFFBQXhELEVBQWtFQyx3QkFBbEUsQ0FBaEI7O0FBRUEyQixnQkFBVW9FLGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsYUFBT3BFLFNBQVA7QUFDRDs7OztFQXhYcUJqQyxjOztBQTJYeEJzRyxPQUFPQyxPQUFQLEdBQWlCdEcsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCB0aGlzLnRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIuYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgdmFyIGZpbGVQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgoKTtcblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRmlsZSkge1xuICAgICAgICB2YXIgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpLFxuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gdW5kZWZpbmVkOyAvLy9cblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gdG9wbW9zdERpcmVjdG9yeS5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIHZhciByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpLFxuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gdW5kZWZpbmVkOyAvLy87XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID09PSB0cnVlKSB7XG4gICAgICB2YXIgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJlbW92ZWQsXG4gICAgICAgIGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlZCxcbiAgICAgICAgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnlNYXJrZWQgPSBkaXJlY3RvcnkuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgICB9KTtcblxuICAgICAgbWFya2VkID0gZGlyZWN0b3J5TWFya2VkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHsgcmV0dXJuIHRoaXMuZW50cmllcy5pc0VtcHR5KCk7IH1cblxuICBmb3JFYWNoRmlsZShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGUoY2FsbGJhY2spOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBzb21lRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgICBcbiAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IHRoaXMpIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5lbnRyaWVzLmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZSArICcvJyArIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgdG9wbW9zdERpcmVjdG9yeShwYXRoLCBhZGRJZk5lY2Vzc2FyeSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5LFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgdmFyIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICB2YXIgY29sbGFwc2VkID0gdHJ1ZSxcbiAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbCxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uLnRvZ2dsZSgpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=