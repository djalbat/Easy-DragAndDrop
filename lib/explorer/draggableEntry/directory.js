'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    Entries = require('../entries'),
    pathUtil = require('../../util/path'),
    DraggableEntry = require('../draggableEntry');

var Button = easy.Button,
    React = easy.React;

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selector, name, explorer) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    var entries = React.createElement(Entries, { Directory: Directory }),
        toggleButton = React.createElement(Button, { className: 'toggle', onClick: _this.toggleButtonClickHandler.bind(_this) });

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.entries = entries;

    _this.append(entries);

    _this.prepend(toggleButton);
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
    key: 'addFile',
    value: function addFile(filePath) {
      var addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

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
        var directoryPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

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
        var filePathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

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
        var directoryPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

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
      var topmostDirectoryName = pathUtil.topmostDirectoryName(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarker(markerName, draggableEntryType);
      } else {
        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(markerPath);

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

      var topmostDirectoryName = pathUtil.topmostDirectoryName(path);

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
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
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


      var directory = DraggableEntry.fromProperties(Class, properties, name, explorer);

      collapsed ? ///
      directory.collapse() : directory.expand();

      return directory;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIkVudHJpZXMiLCJwYXRoVXRpbCIsIkRyYWdnYWJsZUVudHJ5IiwiQnV0dG9uIiwiUmVhY3QiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJ0eXBlcyIsIkRJUkVDVE9SWSIsImVudHJpZXMiLCJ0b2dnbGVCdXR0b24iLCJ0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIiLCJiaW5kIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImFwcGVuZCIsInByZXBlbmQiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiZmlsZVBhdGhzIiwiZmlsZVBhdGgiLCJnZXRQYXRoIiwiZGlyZWN0b3J5RmlsZVBhdGhzIiwiZ2V0RmlsZVBhdGhzIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJjb2xsYXBzZSIsImJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsImV4cGFuZCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZEZpbGUiLCJmaWxlTmFtZSIsImVudHJpZXNGaWxlIiwiaGFzRmlsZSIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJyZW1vdmVGaWxlIiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsImVtcHR5IiwiaXNFbXB0eSIsInJlbW92ZSIsInJlbW92ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeSIsIm1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9nZ2xlIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsUUFBUUQsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNRSxVQUFVRixRQUFRLFlBQVIsQ0FEaEI7QUFBQSxJQUVNRyxXQUFXSCxRQUFRLGlCQUFSLENBRmpCO0FBQUEsSUFHTUksaUJBQWlCSixRQUFRLG1CQUFSLENBSHZCOztJQUtRSyxNLEdBQWtCTixJLENBQWxCTSxNO0lBQVFDLEssR0FBVVAsSSxDQUFWTyxLOztJQUVWQyxTOzs7QUFDSixxQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQUE7O0FBQ3BDLFFBQU1DLE9BQU9WLE1BQU1XLEtBQU4sQ0FBWUMsU0FBekI7O0FBRG9DLHNIQUc5QkwsUUFIOEIsRUFHcEJDLElBSG9CLEVBR2RDLFFBSGMsRUFHSkMsSUFISTs7QUFLcEMsUUFBTUcsVUFBVSxvQkFBQyxPQUFELElBQVMsV0FBV1AsU0FBcEIsR0FBaEI7QUFBQSxRQUNNUSxlQUFlLG9CQUFDLE1BQUQsSUFBUSxXQUFVLFFBQWxCLEVBQTJCLFNBQVMsTUFBS0Msd0JBQUwsQ0FBOEJDLElBQTlCLE9BQXBDLEdBRHJCOztBQUdBLFVBQUtDLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JGLElBQXhCLE9BQW5COztBQUVBLFVBQUtILE9BQUwsR0FBZUEsT0FBZjs7QUFFQSxVQUFLTSxNQUFMLENBQVlOLE9BQVo7O0FBRUEsVUFBS08sT0FBTCxDQUFhTixZQUFiO0FBZG9DO0FBZXJDOzs7O2tDQUVhO0FBQ1osYUFBTyxJQUFQO0FBQ0Q7Ozs2QkFFUU8sSyxFQUFPO0FBQ2QsVUFBTUMsWUFBWUQsTUFBTUUsT0FBTixF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ImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgICBwYXRoVXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvcGF0aCcpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jb25zdCB7IEJ1dHRvbiwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgY29uc3QgZW50cmllcyA9IDxFbnRyaWVzIERpcmVjdG9yeT17RGlyZWN0b3J5fSAvPixcbiAgICAgICAgICB0b2dnbGVCdXR0b24gPSA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyl9IC8+O1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgIHRoaXMucHJlcGVuZCh0b2dnbGVCdXR0b24pO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBsZXQgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgoKTtcblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5RmlsZVBhdGhzID0gZGlyZWN0b3J5LmdldEZpbGVQYXRocygpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aHMgPSBmaWxlUGF0aHMuY29uY2F0KGRpcmVjdG9yeUZpbGVQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IG51bGw7IC8vL1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0ZpbGUpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVGaWxlKGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyKG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBsZXQgcmVtb3ZlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gZGlyZWN0b3J5LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IGRpcmVjdG9yeU1hcmtlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSB0aGlzKSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZW50cmllcy5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWUgKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IERpcmVjdG9yeTtcbiAgICB9XG5cbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQgfSA9IHByb3BlcnRpZXM7XG5cbiAgICBjb25zdCBkaXJlY3RvcnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgY29sbGFwc2VkID8gLy8vXG4gICAgICBkaXJlY3RvcnkuY29sbGFwc2UoKSA6XG4gICAgICAgIGRpcmVjdG9yeS5leHBhbmQoKTtcblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnknXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnLFxuICAgICdleHBsb3JlcicsXG4gICAgJ2NvbGxhcHNlZCdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5O1xuIl19