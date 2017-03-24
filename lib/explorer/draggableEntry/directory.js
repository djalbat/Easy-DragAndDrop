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
        toggleButton = React.createElement(ToggleButton, { updateHandler: updateHandler }),
        entries = React.createElement(Entries, { Directory: Directory });

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
  defaultProperties: {
    className: 'directory'
  },
  ignoredProperties: ['name', 'explorer', 'collapsed']
});

module.exports = Directory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJSZWFjdCIsInV0aWwiLCJFbnRyeSIsIkVudHJpZXMiLCJUb2dnbGVCdXR0b24iLCJEcmFnZ2FibGVFbnRyeSIsIkRpcmVjdG9yeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwiY29sbGFwc2VkIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidXBkYXRlSGFuZGxlciIsInRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIiLCJiaW5kIiwidG9nZ2xlQnV0dG9uIiwiZW50cmllcyIsIm9uRG91YmxlQ2xpY2siLCJkb3VibGVDbGlja0hhbmRsZXIiLCJhcHBlbmQiLCJwcmVwZW5kIiwiY29sbGFwc2UiLCJleHBhbmQiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiZmlsZVBhdGhzIiwiZmlsZVBhdGgiLCJnZXRQYXRoIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiZ2V0RmlsZVBhdGhzIiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeSIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhZGRJZk5lY2Vzc2FyeSIsInRvcG1vc3REaXJlY3RvcnkiLCJmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlIiwiZmlsZU5hbWUiLCJlbnRyaWVzRmlsZSIsImhhc0ZpbGUiLCJnZXRFeHBsb3JlciIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnkiLCJoYXNEaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJvb3REaXJlY3RvcnkiLCJpc1Jvb3REaXJlY3RvcnkiLCJlbXB0eSIsImlzRW1wdHkiLCJyZW1vdmUiLCJyZW1vdmVEaXJlY3RvcnkiLCJtYXJrZXJQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJOYW1lIiwiYWRkTWFya2VyIiwicmV0cmlldmVEaXJlY3RvcnkiLCJtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicmVtb3ZlZCIsImVudHJpZXNNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsInNvbWVEaXJlY3RvcnkiLCJtYXJrZWQiLCJkaXJlY3RvcnlNYXJrZWQiLCJjYWxsYmFjayIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldERyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGgiLCJtYXJrZWREaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGUiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxRQUFRRixLQUFLRSxLQURuQjs7QUFHQSxJQUFNQyxPQUFPRixRQUFRLFlBQVIsQ0FBYjtBQUFBLElBQ01HLFFBQVFILFFBQVEsVUFBUixDQURkO0FBQUEsSUFFTUksVUFBVUosUUFBUSxZQUFSLENBRmhCO0FBQUEsSUFHTUssZUFBZUwsUUFBUSxpQkFBUixDQUhyQjtBQUFBLElBSU1NLGlCQUFpQk4sUUFBUSxtQkFBUixDQUp2Qjs7SUFNTU8sUzs7O0FBQ0oscUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUF5RDtBQUFBLFFBQW5CQyxTQUFtQix1RUFBUCxLQUFPOztBQUFBOztBQUN2RCxRQUFNQyxPQUFPVCxNQUFNVSxLQUFOLENBQVlDLFNBQXpCOztBQUR1RCxzSEFHakROLFFBSGlELEVBR3ZDQyxJQUh1QyxFQUdqQ0MsUUFIaUMsRUFHdkJFLElBSHVCOztBQUt2RCxRQUFNRyxnQkFBZ0IsTUFBS0MseUJBQUwsQ0FBK0JDLElBQS9CLE9BQXRCO0FBQUEsUUFDTUMsZUFBZSxvQkFBQyxZQUFELElBQWMsZUFBZUgsYUFBN0IsR0FEckI7QUFBQSxRQUVNSSxVQUFVLG9CQUFDLE9BQUQsSUFBUyxXQUFXWixTQUFwQixHQUZoQjs7QUFJQSxVQUFLYSxhQUFMLENBQW1CLE1BQUtDLGtCQUFMLENBQXdCSixJQUF4QixPQUFuQjs7QUFFQSxVQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjs7QUFFQSxVQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUEsVUFBS0csTUFBTCxDQUFZSCxPQUFaOztBQUVBLFVBQUtJLE9BQUwsQ0FBYUwsWUFBYjs7QUFFQVAsZ0JB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QkMscUJBQW1CLENBQ2pCLE1BRGlCLEVBRWpCLFVBRmlCLEVBR2pCLFdBSGlCO0FBSkksQ0FBekI7O0FBV0FDLE9BQU9DLE9BQVAsR0FBaUIvRyxTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBSZWFjdCA9IGVhc3kuUmVhY3Q7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgICAgVG9nZ2xlQnV0dG9uID0gcmVxdWlyZSgnLi4vdG9nZ2xlQnV0dG9uJyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpO1xuICAgIFxuICAgIGNvbnN0IHVwZGF0ZUhhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICB0b2dnbGVCdXR0b24gPSA8VG9nZ2xlQnV0dG9uIHVwZGF0ZUhhbmRsZXI9e3VwZGF0ZUhhbmRsZXJ9IC8+LFxuICAgICAgICAgIGVudHJpZXMgPSA8RW50cmllcyBEaXJlY3Rvcnk9e0RpcmVjdG9yeX0gLz47XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSB0b2dnbGVCdXR0b247XG5cbiAgICB0aGlzLmVudHJpZXMgPSBlbnRyaWVzO1xuXG4gICAgdGhpcy5hcHBlbmQoZW50cmllcyk7XG5cbiAgICB0aGlzLnByZXBlbmQodG9nZ2xlQnV0dG9uKTtcblxuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBsZXQgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgoKTtcblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5RmlsZVBhdGhzID0gZGlyZWN0b3J5LmdldEZpbGVQYXRocygpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aHMgPSBmaWxlUGF0aHMuY29uY2F0KGRpcmVjdG9yeUZpbGVQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3Rvcnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/IFxuICAgICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJykgOiBcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24udG9nZ2xlKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcGVydGllcyA9IENsYXNzO1xuICAgICAgQ2xhc3MgPSBEaXJlY3Rvcnk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZGlyZWN0b3J5J1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==