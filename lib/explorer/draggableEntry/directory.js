'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    React = easyui.React;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIlJlYWN0IiwidXRpbCIsIkVudHJ5IiwiRW50cmllcyIsIlRvZ2dsZUJ1dHRvbiIsIkRyYWdnYWJsZUVudHJ5IiwiRGlyZWN0b3J5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJjb2xsYXBzZWQiLCJ0eXBlIiwidHlwZXMiLCJESVJFQ1RPUlkiLCJ1cGRhdGVIYW5kbGVyIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJ0b2dnbGVCdXR0b24iLCJlbnRyaWVzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImFwcGVuZCIsInByZXBlbmQiLCJjb2xsYXBzZSIsImV4cGFuZCIsImVudHJ5IiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIkZJTEUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiYmVmb3JlIiwibG9jYWxlQ29tcGFyZSIsInN1YkVudHJpZXMiLCJmb3JFYWNoRmlsZSIsImZpbGUiLCJzdWJFbnRyeSIsInB1c2giLCJmb3JFYWNoRGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwiZGlyZWN0b3J5U3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJjb25jYXQiLCJmaWxlUGF0aHMiLCJmaWxlUGF0aCIsImdldFBhdGgiLCJkaXJlY3RvcnlGaWxlUGF0aHMiLCJnZXRGaWxlUGF0aHMiLCJpc0NvbGxhcHNlZCIsImJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGUiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaGFzRmlsZSIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmVGaWxlIiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeSIsIm1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsIkNsYXNzIiwicHJvcGVydGllcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFBQSxJQUNNQyxRQUFRRixPQUFPRSxLQURyQjs7QUFHQSxJQUFNQyxPQUFPRixRQUFRLFlBQVIsQ0FBYjtBQUFBLElBQ01HLFFBQVFILFFBQVEsVUFBUixDQURkO0FBQUEsSUFFTUksVUFBVUosUUFBUSxZQUFSLENBRmhCO0FBQUEsSUFHTUssZUFBZUwsUUFBUSxpQkFBUixDQUhyQjtBQUFBLElBSU1NLGlCQUFpQk4sUUFBUSxtQkFBUixDQUp2Qjs7SUFNTU8sUzs7O0FBQ0oscUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUF5RDtBQUFBLFFBQW5CQyxTQUFtQix1RUFBUCxLQUFPOztBQUFBOztBQUN2RCxRQUFNQyxPQUFPVCxNQUFNVSxLQUFOLENBQVlDLFNBQXpCOztBQUR1RCxzSEFHakROLFFBSGlELEVBR3ZDQyxJQUh1QyxFQUdqQ0MsUUFIaUMsRUFHdkJFLElBSHVCOztBQUt2RCxRQUFNRyxnQkFBZ0IsTUFBS0MseUJBQUwsQ0FBK0JDLElBQS9CLE9BQXRCO0FBQUEsUUFDTUMsZUFBZSxvQkFBQyxZQUFELElBQWMsZUFBZUgsYUFBN0IsRUFBNEMsV0FBVSxRQUF0RCxHQURyQjtBQUFBLFFBRU1JLFVBQVUsb0JBQUMsT0FBRCxJQUFTLFdBQVdaLFNBQXBCLEVBQStCLFdBQVUsU0FBekMsR0FGaEI7O0FBSUEsVUFBS2EsYUFBTCxDQUFtQixNQUFLQyxrQkFBTCxDQUF3QkosSUFBeEIsT0FBbkI7O0FBRUEsVUFBS0MsWUFBTCxHQUFvQkEsWUFBcEI7O0FBRUEsVUFBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBLFVBQUtHLE1BQUwsQ0FBWUgsT0FBWjs7QUFFQSxVQUFLSSxPQUFMLENBQWFMLFlBQWI7O0FBRUFQ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QixFQUdqQixXQUhpQjtBQURJLENBQXpCOztBQVFBQyxPQUFPQyxPQUFQLEdBQWlCN0csU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uID0gPFRvZ2dsZUJ1dHRvbiB1cGRhdGVIYW5kbGVyPXt1cGRhdGVIYW5kbGVyfSBjbGFzc05hbWU9XCJ0b2dnbGVcIiAvPixcbiAgICAgICAgICBlbnRyaWVzID0gPEVudHJpZXMgRGlyZWN0b3J5PXtEaXJlY3Rvcnl9IGNsYXNzTmFtZT1cImVudHJpZXNcIiAvPjtcbiAgICBcbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IHRvZ2dsZUJ1dHRvbjtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgIHRoaXMucHJlcGVuZCh0b2dnbGVCdXR0b24pO1xuXG4gICAgY29sbGFwc2VkID9cbiAgICAgIHRoaXMuY29sbGFwc2UoKSA6XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIGxldCBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgbGV0IGZpbGVQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCgpO1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnkuZ2V0RmlsZVBhdGhzKCk7XG4gICAgICBcbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0ZpbGUpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVGaWxlKGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gdGhpcy5lbnRyaWVzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBsZXQgcmVtb3ZlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gZGlyZWN0b3J5LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IGRpcmVjdG9yeU1hcmtlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSB0aGlzKSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZW50cmllcy5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWUgKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICBjb25zdCBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IERpcmVjdG9yeTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciwgY29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnksIHtcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJyxcbiAgICAnY29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=