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
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return false;
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
        var someDirectoryMarkerRemoved = this.entries.someDirectory(function (directory) {
          return directory.removeMarker();
        });

        removed = someDirectoryMarkerRemoved;
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
        var someDirectoryMarked = this.entries.someDirectory(function (directory) {
          var directoryMarked = directory.isMarked();

          return directoryMarked;
        });

        marked = someDirectoryMarked;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJleHBsb3JlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsInR5cGUiLCJ0eXBlcyIsIkRJUkVDVE9SWSIsInRvZ2dsZUJ1dHRvbiIsInRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIiLCJiaW5kIiwiZW50cmllcyIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJleHBhbmQiLCJjb2xsYXBzZSIsImVudHJ5IiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIkZJTEUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiYmVmb3JlIiwibG9jYWxlQ29tcGFyZSIsInN1YkVudHJpZXMiLCJmb3JFYWNoRmlsZSIsImZpbGUiLCJzdWJFbnRyeSIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwiZGlyZWN0b3J5U3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJjb25jYXQiLCJpc0NvbGxhcHNlZCIsImJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImZpbGVQYXRoIiwiYWRkSWZOZWNlc3NhcnkiLCJ0b3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImZpbGVOYW1lIiwiZW50cmllc0ZpbGUiLCJoYXNGaWxlIiwiZ2V0RXhwbG9yZXIiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeSIsImRpcmVjdG9yeU5hbWUiLCJlbnRyaWVzRGlyZWN0b3J5IiwiaGFzRGlyZWN0b3J5IiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsInJlbW92ZUZpbGUiLCJyb290RGlyZWN0b3J5IiwiaXNSb290RGlyZWN0b3J5IiwiZW1wdHkiLCJpc0VtcHR5IiwicmVtb3ZlIiwicmVtb3ZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInJlbW92ZWQiLCJlbnRyaWVzTWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZCIsInNvbWVEaXJlY3RvcnkiLCJtYXJrZWQiLCJzb21lRGlyZWN0b3J5TWFya2VkIiwiZGlyZWN0b3J5TWFya2VkIiwiY2FsbGJhY2siLCJwYXRoIiwibWFya2VkRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidG9nZ2xlIiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FB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LElBQWxCO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPQSxlQUFQO0FBQ0Q7OzswREFFcUMvQyxjLEVBQWdCO0FBQ3BELFVBQUlpRCxxQ0FBcUMsSUFBekM7QUFBQSxVQUNJaEQsNEJBQTRCLEtBQUtpRCwyQkFBTCxDQUFpQ2xELGNBQWpDLENBRGhDOztBQUdBLFVBQUlDLHlCQUFKLEVBQStCO0FBQzdCZ0QsNkNBQXFDLEtBQUs1RSxPQUFMLENBQWE4RSxxQ0FBYixDQUFtRG5ELGNBQW5ELENBQXJDOztBQUVBLFlBQUlpRCx1Q0FBdUMsSUFBM0MsRUFBaUQ7QUFDL0NBLCtDQUFxQyxJQUFyQztBQUNEO0FBQ0Y7O0FBRUQsYUFBT0Esa0NBQVA7QUFDRDs7OzhDQUV5QnJGLFMsRUFBVztBQUNuQ0Esa0JBQ0UsS0FBS3dGLFFBQUwsQ0FBYyxXQUFkLENBREYsR0FFSSxLQUFLQyxXQUFMLENBQWlCLFdBQWpCLENBRko7QUFHRDs7O3lDQUVvQjtBQUNuQixXQUFLbkYsWUFBTCxDQUFrQm9GLE1BQWxCO0FBQ0Q7OzswQkFFWTNGLEksRUFBTUMsUyxFQUFXQyxRLEVBQVVDLHdCLEVBQTBCO0FBQ2hFLFVBQUkyQixZQUFZdEMsUUFBUW9HLEtBQVIsQ0FBYzlGLFNBQWQsRUFBeUIsWUFBekIsRUFBdUNFLElBQXZDLEVBQTZDQyxTQUE3QyxFQUF3REMsUUFBeEQsRUFBa0VDLHdCQUFsRSxDQUFoQjs7QUFFQTJCLGdCQUFVK0QsZUFBVixDQUEwQixJQUExQjs7QUFFQSxhQUFPL0QsU0FBUDtBQUNEOzs7O0VBblZxQmpDLGM7O0FBc1Z4QmlHLE9BQU9DLE9BQVAsR0FBaUJqRyxTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBleHBsb3JlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpO1xuICAgIFxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyID0gYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBuZXcgVG9nZ2xlQnV0dG9uKHRoaXMsIHRoaXMudG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlci5iaW5kKHRoaXMpICk7XG5cbiAgICB0aGlzLmVudHJpZXMgPSBuZXcgRW50cmllcyh0aGlzLCBEaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgIWNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmV4cGFuZCgpIDpcbiAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIHZhciBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgdmFyIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0ZpbGUpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZUZpbGUoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICB2YXIgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgdmFyIHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyKG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcmVtb3ZlZCxcbiAgICAgICAgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICByZW1vdmVkID0gc29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlZCxcbiAgICAgICAgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc29tZURpcmVjdG9yeU1hcmtlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICB2YXIgZGlyZWN0b3J5TWFya2VkID0gZGlyZWN0b3J5LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IHNvbWVEaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgdG9wbW9zdERpcmVjdG9yeShwYXRoLCBhZGRJZk5lY2Vzc2FyeSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5LFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgdmFyIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICB2YXIgY29sbGFwc2VkID0gdHJ1ZSxcbiAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbCxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uLnRvZ2dsZSgpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=