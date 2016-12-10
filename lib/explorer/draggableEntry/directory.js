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
      var topmostDirectory = this.addTopmostDirectory(filePath);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.addFile(filePathWithoutTopmostDirectoryName);
      } else {
        this.entries.addFile(filePath, this.dragEventHandler, this.activateFileEventHandler);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var topmostDirectory = this.removeTopmostDirectory(filePath);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.removeFile(filePathWithoutTopmostDirectoryName);
      } else {
        this.entries.removeFile(filePath);
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var topmostDirectory = this.addTopmostDirectory(directoryPath);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (!entriesDirectory) {
          this.entries.addDirectory(directoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
        } else {
          var directory = this.entries.retrieveDirectory(directoryName);

          collapsed ? directory.collapse() : directory.expand();
        }
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var topmostDirectory = this.removeTopmostDirectory(directoryPath);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (entriesDirectory) {
          this.entries.removeDirectory(directoryName);
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
    key: 'addTopmostDirectory',
    value: function addTopmostDirectory(path) {
      var topmostDirectory,
          topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        topmostDirectory = null;
      } else {
        var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

        if (!entriesDirectory) {
          var collapsed = true;

          this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImV4cGFuZCIsImNvbGxhcHNlIiwiZW50cnkiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiRklMRSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwic3ViRW50cmllcyIsImZvckVhY2hGaWxlIiwiZmlsZSIsInN1YkVudHJ5IiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJkaXJlY3RvcnlTdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImNvbmNhdCIsImlzQ29sbGFwc2VkIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJmaWxlUGF0aCIsInRvcG1vc3REaXJlY3RvcnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsInJlbW92ZVRvcG1vc3REaXJlY3RvcnkiLCJyZW1vdmVGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwicmVtb3ZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQiLCJzb21lRGlyZWN0b3J5IiwibWFya2VkIiwic29tZURpcmVjdG9yeU1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJpc092ZXJsYXBwaW5nRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLFVBQVIsQ0FEWjtBQUFBLElBRUlJLFVBQVVKLFFBQVEsWUFBUixDQUZkO0FBQUEsSUFHSUssZUFBZUwsUUFBUSxpQkFBUixDQUhuQjtBQUFBLElBSUlNLGlCQUFpQk4sUUFB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LENBRHZCOztBQUdBLFVBQUlzQixnQkFBSixFQUFzQjtBQUNwQnNDLG9DQUE0QixLQUFLakUsT0FBTCxDQUFhbUUsNEJBQWIsQ0FBMEM5RCxLQUExQyxDQUE1Qjs7QUFFQSxZQUFJNEQsOEJBQThCLElBQWxDLEVBQXdDO0FBQ3RDQSxzQ0FBNEIsSUFBNUI7QUFDRDtBQUNGOztBQUVELGFBQU9BLHlCQUFQO0FBQ0Q7Ozs4Q0FFeUIxRSxTLEVBQVc7QUFDbkNBLGtCQUNFLEtBQUs2RSxRQUFMLENBQWMsV0FBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixXQUFqQixDQUZKO0FBR0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBS3hFLFlBQUwsQ0FBa0J5RSxNQUFsQjtBQUNEOzs7MEJBRVloRixJLEVBQU1DLFMsRUFBV0MsZ0IsRUFBa0JDLHdCLEVBQTBCO0FBQ3hFLFVBQUkyQixZQUFZdEMsUUFBUXlGLEtBQVIsQ0FBY25GLFNBQWQsRUFBeUIsWUFBekIsRUFBdUNFLElBQXZDLEVBQTZDQyxTQUE3QyxFQUF3REMsZ0JBQXhELEVBQTBFQyx3QkFBMUUsQ0FBaEI7O0FBRUEyQixnQkFBVW9ELGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsYUFBT3BELFNBQVA7QUFDRDs7OztFQXhTcUJqQyxjOztBQTJTeEJzRixPQUFPQyxPQUFQLEdBQWlCdEYsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcykgKTtcblxuICAgIHRoaXMuZW50cmllcyA9IG5ldyBFbnRyaWVzKHRoaXMsIERpcmVjdG9yeSk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAhY29sbGFwc2VkID9cbiAgICAgIHRoaXMuZXhwYW5kKCkgOlxuICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICB2YXIgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZ0VudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBlbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0VudHJ5ID0gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlKGZpbGVQYXRoLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnJlbW92ZVRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBjb2xsYXBzZWQgPyBcbiAgICAgICAgICBkaXJlY3RvcnkuY29sbGFwc2UoKSA6IFxuICAgICAgICAgICAgZGlyZWN0b3J5LmV4cGFuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnJlbW92ZVRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJlbW92ZWQsXG4gICAgICAgIGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvbWVEaXJlY3RvcnlNYXJrZXJSZW1vdmVkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgcmVtb3ZlZCA9IHNvbWVEaXJlY3RvcnlNYXJrZXJSZW1vdmVkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZWQsXG4gICAgICAgIGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvbWVEaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBzb21lRGlyZWN0b3J5TWFya2VkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5KHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==