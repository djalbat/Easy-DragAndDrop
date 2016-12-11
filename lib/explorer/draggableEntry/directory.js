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

  function Directory(selector, name, collapsed, dragEventHandler, activateFileEventHandler) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, type, dragEventHandler));

    _this.dragEventHandler = dragEventHandler;

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
    key: 'isOverlappingEntry',
    value: function isOverlappingEntry(entry) {
      var overlappingEntry;

      if (this === entry) {
        overlappingEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingEntry = false;
        } else {
          var entryCollapsedBounds = entry.getCollapsedBounds(),
              overlappingCollapsedBounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'isOverlappingCollapsedBounds', this).call(this, entryCollapsedBounds);

          overlappingEntry = overlappingCollapsedBounds;
        }
      }

      return overlappingEntry;
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
          this.entries.addFile(fileName, this.dragEventHandler, this.activateFileEventHandler);
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
          this.entries.addDirectory(directoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
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
        var empty = this.isEmpty();

        if (empty) {
          this.remove();
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
        var empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, entryType) {
      var topmostDirectoryName = util.topmostDirectoryName(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarker(markerName, entryType);
      } else {
        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

        topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, entryType);
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
            var collapsed = true;

            this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
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
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      var directoryOverlappingEntry = null,
          overlappingEntry = this.isOverlappingEntry(entry);

      if (overlappingEntry) {
        directoryOverlappingEntry = this.entries.getDirectoryOverlappingEntry(entry);

        if (directoryOverlappingEntry === null) {
          directoryOverlappingEntry = this;
        }
      }

      return directoryOverlappingEntry;
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
    value: function clone(name, collapsed, dragEventHandler, activateFileEventHandler) {
      var directory = Element.clone(Directory, '#directory', name, collapsed, dragEventHandler, activateFileEventHandler);

      directory.removeAttribute('id');

      return directory;
    }
  }]);

  return Directory;
}(DraggableEntry);

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImV4cGFuZCIsImNvbGxhcHNlIiwiZW50cnkiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiRklMRSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwic3ViRW50cmllcyIsImZvckVhY2hGaWxlIiwiZmlsZSIsInN1YkVudHJ5IiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJkaXJlY3RvcnlTdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImNvbmNhdCIsImlzQ29sbGFwc2VkIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJmaWxlUGF0aCIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGUiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaGFzRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnkiLCJoYXNEaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQiLCJzb21lRGlyZWN0b3J5IiwibWFya2VkIiwic29tZURpcmVjdG9yeU1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJpc092ZXJsYXBwaW5nRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLFVBQVIsQ0FEWjtBQUFBLElBRUlJLFVBQVVKLFFBQVEsWUFB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QWQsQ0FERixHQUVJLEtBQUtDLFdBQUwsQ0FBaUIsV0FBakIsQ0FGSjtBQUdEOzs7eUNBRW9CO0FBQ25CLFdBQUs5RSxZQUFMLENBQWtCK0UsTUFBbEI7QUFDRDs7OzBCQUVZdEYsSSxFQUFNQyxTLEVBQVdDLGdCLEVBQWtCQyx3QixFQUEwQjtBQUN4RSxVQUFJMkIsWUFBWXRDLFFBQVErRixLQUFSLENBQWN6RixTQUFkLEVBQXlCLFlBQXpCLEVBQXVDRSxJQUF2QyxFQUE2Q0MsU0FBN0MsRUFBd0RDLGdCQUF4RCxFQUEwRUMsd0JBQTFFLENBQWhCOztBQUVBMkIsZ0JBQVUwRCxlQUFWLENBQTBCLElBQTFCOztBQUVBLGFBQU8xRCxTQUFQO0FBQ0Q7Ozs7RUFwVXFCakMsYzs7QUF1VXhCNEYsT0FBT0MsT0FBUCxHQUFpQjVGLFNBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgVG9nZ2xlQnV0dG9uID0gcmVxdWlyZSgnLi4vdG9nZ2xlQnV0dG9uJyksXG4gICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyID0gZHJhZ0V2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyID0gYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBuZXcgVG9nZ2xlQnV0dG9uKHRoaXMsIHRoaXMudG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlci5iaW5kKHRoaXMpICk7XG5cbiAgICB0aGlzLmVudHJpZXMgPSBuZXcgRW50cmllcyh0aGlzLCBEaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgIWNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmV4cGFuZCgpIDpcbiAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmdFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0VudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZW50cnlDb2xsYXBzZWRCb3VuZHMgPSBlbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhlbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdFbnRyeSA9IG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIHZhciBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNGaWxlKSB7XG4gICAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlKGZpbGVOYW1lLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICB2YXIgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRmlsZSkge1xuICAgICAgICB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgIHZhciBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgIHZhciBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICB0aGlzLmVudHJpZXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICB2YXIgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByZW1vdmVkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHJlbW92ZWQgPSBzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb21lRGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnlNYXJrZWQgPSBkaXJlY3RvcnkuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgICB9KTtcblxuICAgICAgbWFya2VkID0gc29tZURpcmVjdG9yeU1hcmtlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICB2YXIgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBudWxsLFxuICAgICAgICBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/IFxuICAgICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJykgOiBcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24udG9nZ2xlKCk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShEaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=