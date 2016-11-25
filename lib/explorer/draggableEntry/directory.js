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
    value: function addFile(filePath, readOnly) {
      var topmostDirectory = this.addTopmostDirectory(filePath);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.addFile(filePathWithoutTopmostDirectoryName, readOnly);
      } else {
        this.entries.addFile(filePath, readOnly, this.dragEventHandler, this.activateFileEventHandler);
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
          return directory.isMarked();
        });

        marked = someDirectoryMarked;
      }

      return marked;
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(cb) {
      this.entries.forEachFile(cb);
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(cb) {
      this.entries.forEachDirectory(cb);
    }
  }, {
    key: 'someDirectory',
    value: function someDirectory(cb) {
      this.entries.someDirectory(cb);
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
      var directoryOverlappingDraggingBounds = null,
          overlappingDraggingBounds = this.isOverlappingEntry(entry);

      if (overlappingDraggingBounds) {
        directoryOverlappingDraggingBounds = this.entries.getDirectoryOverlappingEntry(entry);

        if (directoryOverlappingDraggingBounds === null) {
          directoryOverlappingDraggingBounds = this;
        }
      }

      return directoryOverlappingDraggingBounds;
    }
  }, {
    key: 'toggleButtonUpdateHandler',
    value: function toggleButtonUpdateHandler(collapsed) {
      collapsed ? this.addClass('collapsed') : this.removeClass('collapsed');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwiZXhwYW5kIiwiY29sbGFwc2UiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsIm92ZXJsYXBwaW5nIiwiZ2V0RHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsInRvcG1vc3REaXJlY3RvcnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXNEaXJlY3RvcnkiLCJoYXNEaXJlY3RvcnkiLCJyZXRyaWV2ZURpcmVjdG9yeSIsIm1hcmtlclBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlck5hbWUiLCJhZGRNYXJrZXIiLCJtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicmVtb3ZlZCIsImVudHJpZXNNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsInNvbWVEaXJlY3RvcnlNYXJrZXJSZW1vdmVkIiwic29tZURpcmVjdG9yeSIsIm1hcmtlZCIsInNvbWVEaXJlY3RvcnlNYXJrZWQiLCJjYiIsInBhdGgiLCJtYXJrZWREaXJlY3RvcnkiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsWUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxVQUFSLENBRFo7QUFBQSxJQUVJSSxVQUFVSixRQUFRLFlBQVIsQ0FGZDtBQUFBLElBR0lLLGVBQWVMLFFBQVEsaUJBQVIsQ0FIbkI7QUFBQSxJQUlJTSxpQkFBaUJOLFFBQVEsbUJBQVIsQ0FKckI7O0lBTU1PLFM7OztBQUNKLHFCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsU0FBNUIsRUFBdUNDLGdCQUF2QyxFQUF5REMsd0JBQXpELEVBQW1GO0FBQUE7O0FBQ2pGLFFBQUlDLE9BQU9WLE1BQU1XLEtBQU4s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QUFPO0FBQ2xDLFVBQUl3RCxxQ0FBcUMsSUFBekM7QUFBQSxVQUNJaEMsNEJBQTRCLEtBQUtpQyxrQkFBTCxDQUF3QnpELEtBQXhCLENBRGhDOztBQUdBLFVBQUl3Qix5QkFBSixFQUErQjtBQUM3QmdDLDZDQUFxQyxLQUFLM0QsT0FBTCxDQUFhNkQsNEJBQWIsQ0FBMEMxRCxLQUExQyxDQUFyQzs7QUFFQSxZQUFJd0QsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DQSwrQ0FBcUMsSUFBckM7QUFDRDtBQUNGOztBQUVELGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4Q0FFeUJwRSxTLEVBQVc7QUFDbkNBLGtCQUNFLEtBQUt1RSxRQUFMLENBQWMsV0FBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixXQUFqQixDQUZKO0FBR0Q7OzswQkFFWXpFLEksRUFBTUMsUyxFQUFXQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDeEUsVUFBSXlCLFlBQVlwQyxRQUFRa0YsS0FBUixDQUFjNUUsU0FBZCxFQUF5QixZQUF6QixFQUF1Q0UsSUFBdkMsRUFBNkNDLFNBQTdDLEVBQXdEQyxnQkFBeEQsRUFBMEVDLHdCQUExRSxDQUFoQjs7QUFFQXlCLGdCQUFVK0MsZUFBVixDQUEwQixJQUExQjs7QUFFQSxhQUFPL0MsU0FBUDtBQUNEOzs7O0VBblFxQi9CLGM7O0FBc1F4QitFLE9BQU9DLE9BQVAsR0FBaUIvRSxTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlLCBkcmFnRXZlbnRIYW5kbGVyKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCB0aGlzLnRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIuYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG92ZXJsYXBwaW5nO1xuICAgIFxuICAgIGlmICh0aGlzID09PSBlbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMoZHJhZ2dpbmdCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nID0gb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmc7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlYWRPbmx5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5LCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBjb2xsYXBzZWQgPyBcbiAgICAgICAgICBkaXJlY3RvcnkuY29sbGFwc2UoKSA6IFxuICAgICAgICAgICAgZGlyZWN0b3J5LmV4cGFuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcmVtb3ZlZCxcbiAgICAgICAgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICByZW1vdmVkID0gc29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlZCxcbiAgICAgICAgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc29tZURpcmVjdG9yeU1hcmtlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5LmlzTWFya2VkKCk7XG4gICAgICB9KTtcblxuICAgICAgbWFya2VkID0gc29tZURpcmVjdG9yeU1hcmtlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYik7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNiKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2IpIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2IpOyB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeShwYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICB2YXIgY29sbGFwc2VkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBudWxsLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzO1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/IFxuICAgICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJykgOiBcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShEaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=