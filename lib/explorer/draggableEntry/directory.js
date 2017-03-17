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

  function Directory(selector, name) {
    var collapsed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var explorer = arguments[3];

    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    var updateHandler = _this.toggleButtonUpdateHandler.bind(_this),
        toggleButton = React.createElement(ToggleButton, { updateHandler: updateHandler, className: 'toggle' }),
        entries = React.createElement(Entries, { Directory: Directory });

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.entries = entries;

    _this.toggleButton = toggleButton;

    _this.append(toggleButton);

    _this.append(entries);

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

          this.entries.addDirectory(directoryName, collapsed, explorer);
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
          collapsed = _properties.collapsed,
          explorer = _properties.explorer;


      return DraggableEntry.fromProperties(Class, properties, name, collapsed, explorer);
    }
  }]);

  return Directory;
}(DraggableEntry);

Object.assign(Directory, {
  ignoredAttributes: ['name', 'collapsed', 'explorer']
});

module.exports = Directory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIlJlYWN0IiwidXRpbCIsIkVudHJ5IiwiRW50cmllcyIsIlRvZ2dsZUJ1dHRvbiIsIkRyYWdnYWJsZUVudHJ5IiwiRGlyZWN0b3J5Iiwic2VsZWN0b3IiLCJuYW1lIiwiY29sbGFwc2VkIiwiZXhwbG9yZXIiLCJ0eXBlIiwidHlwZXMiLCJESVJFQ1RPUlkiLCJ1cGRhdGVIYW5kbGVyIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJ0b2dnbGVCdXR0b24iLCJlbnRyaWVzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImFwcGVuZCIsImV4cGFuZCIsImNvbGxhcHNlIiwiZW50cnkiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiRklMRSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwic3ViRW50cmllcyIsImZvckVhY2hGaWxlIiwiZmlsZSIsInN1YkVudHJ5IiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJkaXJlY3RvcnlTdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImNvbmNhdCIsImZpbGVQYXRocyIsImZpbGVQYXRoIiwiZ2V0UGF0aCIsImRpcmVjdG9yeUZpbGVQYXRocyIsImdldEZpbGVQYXRocyIsImlzQ29sbGFwc2VkIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZHJhZ2dhYmxlRW50cnkiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYWRkSWZOZWNlc3NhcnkiLCJ0b3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImZpbGVOYW1lIiwiZW50cmllc0ZpbGUiLCJoYXNGaWxlIiwiZ2V0RXhwbG9yZXIiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeSIsImRpcmVjdG9yeU5hbWUiLCJlbnRyaWVzRGlyZWN0b3J5IiwiaGFzRGlyZWN0b3J5IiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyIsInJlbW92ZUZpbGUiLCJyb290RGlyZWN0b3J5IiwiaXNSb290RGlyZWN0b3J5IiwiZW1wdHkiLCJpc0VtcHR5IiwicmVtb3ZlIiwicmVtb3ZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInJlbW92ZWQiLCJlbnRyaWVzTWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJzb21lRGlyZWN0b3J5IiwibWFya2VkIiwiZGlyZWN0b3J5TWFya2VkIiwiY2FsbGJhY2siLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoIiwibWFya2VkRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidG9nZ2xlIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJpZ25vcmVkQXR0cmlidXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLFFBQVFGLE9BQU9FLEtBRHJCOztBQUdBLElBQU1DLE9BQU9GLFFBQVEsWUFBUixDQUFiO0FBQUEsSUFDTUcsUUFBUUgsUUFBUSxVQUFSLENBRGQ7QUFBQSxJQUVNSSxVQUFVSixRQUFRLFlBQVIsQ0FGaEI7QUFBQSxJQUdNSyxlQUFlTCxRQUFRLGlCQUFSLENBSHJCO0FBQUEsSUFJTU0saUJBQWlCTixRQUFRLG1CQUFSLENBSnZCOztJQU1NTyxTOzs7QUFDSixxQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBeUQ7QUFBQSxRQUE3QkMsU0FBNkIsdUVBQWpCLEtBQWlCO0FBQUEsUUFBVkMsUUFBVTs7QUFBQTs7QUFDdkQsUUFBTUMsT0FBT1QsTUFBTVUsS0FBTixDQUFZQyxTQUF6Qjs7QUFEdUQsc0hBR2pETixRQUhpRCxFQUd2Q0MsSUFIdUMsRUFHakNFLFFBSGlDLEVBR3ZCQyxJQUh1Qjs7QUFLdkQsUUFBTUcsZ0JBQWdCLE1BQUtDLHlCQUFMLENBQStCQyxJQUEvQixPQUF0QjtBQUFBLFFBQ01DLGVBQWUsb0JBQUMsWUFBRCxJQUFjLGVBQWVILGFBQTdCLEVBQTRDLFdBQVUsUUFBdEQsR0FEckI7QUFBQSxRQUVNSSxVQUFVLG9CQUFDLE9BQUQsSUFBUyxXQUFXWixTQUFwQixHQUZoQjs7QUFJQSxVQUFLYSxhQUFMLENBQW1CLE1BQUtDLGtCQUFMLENBQXdCSixJQUF4QixPQUFuQjs7QUFFQSxVQUFLRSxPQUFMLEdBQWVBLE9BQWY7O0FBRUEsVUFBS0QsWUFBTCxHQUFvQkEsWUFBcEI7O0FBRUEsVUFBS0ksTUFBTCxDQUFZSixZQUFaOztBQUVBLFVBQUtJLE1BQUwsQ0FBWUgsT0FBWjs7QUFFQSxLQUFDVCxTQUFELEdBQ0UsTUFBS2Es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QURJLENBQXpCOztBQVFBQyxPQUFPQyxPQUFQLEdBQWlCNUcsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQgPSBmYWxzZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uID0gPFRvZ2dsZUJ1dHRvbiB1cGRhdGVIYW5kbGVyPXt1cGRhdGVIYW5kbGVyfSBjbGFzc05hbWU9XCJ0b2dnbGVcIiAvPixcbiAgICAgICAgICBlbnRyaWVzID0gPEVudHJpZXMgRGlyZWN0b3J5PXtEaXJlY3Rvcnl9IC8+O1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IHRvZ2dsZUJ1dHRvbjtcbiAgICBcbiAgICB0aGlzLmFwcGVuZCh0b2dnbGVCdXR0b24pOyAgICBcbiAgICBcbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBsZXQgZmlsZVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKCk7XG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3Rvcnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uLnRvZ2dsZSgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB7IG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeSwge1xuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICduYW1lJyxcbiAgICAnY29sbGFwc2VkJyxcbiAgICAnZXhwbG9yZXInXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==