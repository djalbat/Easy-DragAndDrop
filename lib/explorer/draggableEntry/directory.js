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
    key: 'getDraggingBounds',
    value: function getDraggingBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'getBounds', this).call(this),
          draggingBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return draggingBounds;
    }
  }, {
    key: 'isOverlappingEntry',
    value: function isOverlappingEntry(entry) {
      var overlapping;

      if (this === entry) {
        overlapping = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlapping = false;
        } else {
          var draggingBounds = entry.getDraggingBounds(),
              overlappingDraggingBounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'isOverlappingDraggingBounds', this).call(this, draggingBounds);

          overlapping = overlappingDraggingBounds;
        }
      }

      return overlapping;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImV4cGFuZCIsImNvbGxhcHNlIiwiZW50cnkiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiRklMRSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwic3ViRW50cmllcyIsImZvckVhY2hGaWxlIiwiZmlsZSIsInN1YkVudHJ5IiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJkaXJlY3RvcnlTdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImNvbmNhdCIsImlzQ29sbGFwc2VkIiwiYm91bmRzIiwiZHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZyIsImdldERyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeSIsImFkZFRvcG1vc3REaXJlY3RvcnkiLCJmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQiLCJzb21lRGlyZWN0b3J5IiwibWFya2VkIiwic29tZURpcmVjdG9yeU1hcmtlZCIsImRpcmVjdG9yeU1hcmtlZCIsImNhbGxiYWNrIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJvdmVybGFwcGluZ0VudHJ5IiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGUiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsWUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxVQUFSLENBRFo7QUFBQSxJQUVJSSxVQUFVSixRQUFRLFlBQVIsQ0FGZDtBQUFBLElBR0lLLGVBQWVMLFFBQVEsaUJBQVIsQ0FIbkI7QUFBQSxJQUlJTSxpQkFBaUJOLFFBQVEsbUJBQVIsQ0FKckI7O0lBTU1PLFM7OztBQUNKLHFCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsU0FBNUIs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NUIsWUFBSUwsU0FBUyxLQUFLSixRQUFMLEVBQWI7O0FBRUEsWUFBSUksTUFBSixFQUFZO0FBQ1ZLLDRCQUFrQixJQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsYUFBT0EsZUFBUDtBQUNEOzs7aURBRTRCdEQsSyxFQUFPO0FBQ2xDLFVBQUl3RCw0QkFBNEIsSUFBaEM7QUFBQSxVQUNJQyxtQkFBbUIsS0FBS0Msa0JBQUwsQ0FBd0IxRCxLQUF4QixDQUR2Qjs7QUFHQSxVQUFJeUQsZ0JBQUosRUFBc0I7QUFDcEJELG9DQUE0QixLQUFLN0QsT0FBTCxDQUFhZ0UsNEJBQWIsQ0FBMEMzRCxLQUExQyxDQUE1Qjs7QUFFQSxZQUFJd0QsOEJBQThCLElBQWxDLEVBQXdDO0FBQ3RDQSxzQ0FBNEIsSUFBNUI7QUFDRDtBQUNGOztBQUVELGFBQU9BLHlCQUFQO0FBQ0Q7Ozs4Q0FFeUJ0RSxTLEVBQVc7QUFDbkNBLGtCQUNFLEtBQUswRSxRQUFMLENBQWMsV0FBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixXQUFqQixDQUZKO0FBR0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBS3JFLFlBQUwsQ0FBa0JzRSxNQUFsQjtBQUNEOzs7MEJBRVk3RSxJLEVBQU1DLFMsRUFBV0MsZ0IsRUFBa0JDLHdCLEVBQTBCO0FBQ3hFLFVBQUkyQixZQUFZdEMsUUFBUXNGLEtBQVIsQ0FBY2hGLFNBQWQsRUFBeUIsWUFBekIsRUFBdUNFLElBQXZDLEVBQTZDQyxTQUE3QyxFQUF3REMsZ0JBQXhELEVBQTBFQyx3QkFBMUUsQ0FBaEI7O0FBRUEyQixnQkFBVWlELGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsYUFBT2pELFNBQVA7QUFDRDs7OztFQTNRcUJqQyxjOztBQThReEJtRixPQUFPQyxPQUFQLEdBQWlCbkYsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcykgKTtcblxuICAgIHRoaXMuZW50cmllcyA9IG5ldyBFbnRyaWVzKHRoaXMsIERpcmVjdG9yeSk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAhY29sbGFwc2VkID9cbiAgICAgIHRoaXMuZXhwYW5kKCkgOlxuICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RHJhZ2dpbmdCb3VuZHMoKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIHZhciBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBvdmVybGFwcGluZztcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmcgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCksXG4gICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKGRyYWdnaW5nQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZyA9IG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlUGF0aCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgY29sbGFwc2VkID8gXG4gICAgICAgICAgZGlyZWN0b3J5LmNvbGxhcHNlKCkgOiBcbiAgICAgICAgICAgIGRpcmVjdG9yeS5leHBhbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJlbW92ZWQsXG4gICAgICAgIGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvbWVEaXJlY3RvcnlNYXJrZXJSZW1vdmVkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgcmVtb3ZlZCA9IHNvbWVEaXJlY3RvcnlNYXJrZXJSZW1vdmVkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZWQsXG4gICAgICAgIGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvbWVEaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBzb21lRGlyZWN0b3J5TWFya2VkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5KHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==