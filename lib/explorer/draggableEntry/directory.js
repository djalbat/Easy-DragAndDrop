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
          draggingBounds = bounds;

      if (!collapsed) {
        this.expand();
      }

      return draggingBounds;
    }
  }, {
    key: 'isOverlappingEntry',
    value: function isOverlappingEntry(entry) {
      if (this === entry) {
        return false;
      }

      var collapsed = this.isCollapsed();

      if (collapsed) {
        return false;
      }

      var draggingBounds = entry.getDraggingBounds();

      return _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'isOverlappingDraggingBounds', this).call(this, draggingBounds);
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
        var directoryName = directoryPath; ///

        if (!this.entries.hasDirectory(directoryName)) {
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
      var markerRemoved,
          entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        this.entries.removeMarker();

        markerRemoved = true;
      } else {
        var someDirectoryMarkerRemoved = this.entries.someDirectory(function (directory) {
          return directory.removeMarker();
        });

        markerRemoved = someDirectoryMarkerRemoved;
      }

      return markerRemoved;
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
    key: 'getDirectoryHavingMarker',
    value: function getDirectoryHavingMarker() {
      var directoryHavingMarker = this.entries.getDirectoryHavingMarker();

      if (directoryHavingMarker === null) {
        var marked = this.isMarked();

        if (marked) {
          directoryHavingMarker = this;
        }
      }

      return directoryHavingMarker;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwiZXhwYW5kIiwiY29sbGFwc2UiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsInRvcG1vc3REaXJlY3RvcnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJSZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQiLCJzb21lRGlyZWN0b3J5IiwibWFya2VkIiwic29tZURpcmVjdG9yeU1hcmtlZCIsImNiIiwicGF0aCIsImVudHJpZXNEaXJlY3RvcnkiLCJkaXJlY3RvcnlIYXZpbmdNYXJrZXIiLCJnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsImlzT3ZlcmxhcHBpbmdFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFlBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsVUFBUixDQURaO0FBQUEsSUFFSUksVUFBVUosUUFBUSxZQUFSLENBRmQ7QUFBQSxJQUdJSyxlQUFlTCxRQUFRLGlCQUFSLENBSG5CO0FBQUEsSUFJSU0saUJBQWlCTixRQUFRLG1CQUFSLENBSnJCOztJQU1NTyxTOzs7QUFDSixxQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFNBQTVCLEVBQXVDQyxnQkFBdkMsRUFBeURDLHdCQUF6RCxFQUFtRjtBQUFBOztBQUNqRixRQUFJQyxPQUFPVixNQUFNVyxL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ekQsT0FBTCxDQUFhNEQsNEJBQWIsQ0FBMEN6RCxLQUExQyxDQUFyQzs7QUFFQSxZQUFJc0QsdUNBQXVDLElBQTNDLEVBQWlEO0FBQy9DQSwrQ0FBcUMsSUFBckM7QUFDRDtBQUNGOztBQUVELGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4Q0FFeUJsRSxTLEVBQVc7QUFDbkNBLGtCQUNFLEtBQUtzRSxRQUFMLENBQWMsV0FBZCxDQURGLEdBRUksS0FBS0MsV0FBTCxDQUFpQixXQUFqQixDQUZKO0FBR0Q7OzswQkFFWXhFLEksRUFBTUMsUyxFQUFXQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDeEUsVUFBSXlCLFlBQVlwQyxRQUFRaUYsS0FBUixDQUFjM0UsU0FBZCxFQUF5QixZQUF6QixFQUF1Q0UsSUFBdkMsRUFBNkNDLFNBQTdDLEVBQXdEQyxnQkFBeEQsRUFBMEVDLHdCQUExRSxDQUFoQjs7QUFFQXlCLGdCQUFVOEMsZUFBVixDQUEwQixJQUExQjs7QUFFQSxhQUFPOUMsU0FBUDtBQUNEOzs7O0VBN1BxQi9CLGM7O0FBZ1F4QjhFLE9BQU9DLE9BQVAsR0FBaUI5RSxTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlLCBkcmFnRXZlbnRIYW5kbGVyKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCB0aGlzLnRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIuYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcztcblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIGlmICh0aGlzID09PSBlbnRyeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCk7XG5cbiAgICByZXR1cm4gc3VwZXIuaXNPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKGRyYWdnaW5nQm91bmRzKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVhZE9ubHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHksIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGlmICghdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSkge1xuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGNvbGxhcHNlZCA/IFxuICAgICAgICAgIGRpcmVjdG9yeS5jb2xsYXBzZSgpIDogXG4gICAgICAgICAgICBkaXJlY3RvcnkuZXhwYW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXJSZW1vdmVkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgbWFya2VyUmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIG1hcmtlclJlbW92ZWQgPSBzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlclJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb21lRGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkuaXNNYXJrZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBzb21lRGlyZWN0b3J5TWFya2VkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNiKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2IpOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYik7IH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5KHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5SGF2aW5nTWFya2VyID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcykge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==