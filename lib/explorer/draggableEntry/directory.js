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

    _this.toggleButton = new ToggleButton(_this, function (collapsed) {
      collapsed ? this.addClass('collapsed') : this.removeClass('collapsed');
    }.bind(_this));

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
      if (this.entries.hasMarker()) {
        this.entries.removeMarker();

        return true;
      } else {
        return this.entries.someDirectory(function (directory) {
          return directory.removeMarker();
        });
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      if (this.entries.hasMarker()) {
        return true;
      } else {
        return this.entries.someDirectory(function (directory) {
          return directory.hasMarker();
        });
      }
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
      var topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        return null;
      } else {
        var entriesHasDirectory = this.entries.hasDirectory(topmostDirectoryName);

        if (!entriesHasDirectory) {
          var collapsed = true;

          this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
        }

        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);

        return topmostDirectory;
      }
    }
  }, {
    key: 'getDirectoryHavingMarker',
    value: function getDirectoryHavingMarker() {
      var directoryHavingMarker = this.entries.getDirectoryHavingMarker();

      if (directoryHavingMarker === null) {
        if (this.hasMarker()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImJpbmQiLCJlbnRyaWVzIiwiZXhwYW5kIiwiY29sbGFwc2UiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsInRvcG1vc3REaXJlY3RvcnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJoYXNNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJzb21lRGlyZWN0b3J5IiwiY2IiLCJwYXRoIiwiZW50cmllc0hhc0RpcmVjdG9yeSIsImRpcmVjdG9yeUhhdmluZ01hcmtlciIsImdldERpcmVjdG9yeUhhdmluZ01hcmtlciIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLFVBQVIsQ0FEWjtBQUFBLElBRUlJLFVBQVVKLFFBQVEsWUFBUixDQUZkO0FBQUEsSUFHSUssZUFBZUwsUUFBUSxpQkFBUixDQUhuQjtBQUFBLElBSUlNLGlCQUFpQk4sUUFBUSxtQkFBUixDQUpyQjs7SUFNTU8sUzs7O0FBQ0oscUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxTQUE1QixFQUF1Q0MsZ0JBQXZDLEVBQXlEQyx3QkFBekQsRUFBbUY7QUFBQTs7QUFDakYsUUFBSUMsT0FBT1YsTUFBTVcsS0FBTixDQUFZQyxTQUF2Qjs7QUFEaUYsc0hBRzNFUCxRQUgyRSxFQUdqRUMsSUFIaUUsRUFHM0RJLElBSDJELEVBR3JERixnQkFIcUQ7O0FBS2pGLFVBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7O0FBRUEs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QyxFQUF3REMsZ0JBQXhELEVBQTBFQyx3QkFBMUUsQ0FBaEI7O0FBRUEwQixnQkFBVXVDLGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsYUFBT3ZDLFNBQVA7QUFDRDs7OztFQXBPcUJoQyxjOztBQXVPeEJ3RSxPQUFPQyxPQUFQLEdBQWlCeEUsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgZnVuY3Rpb24oY29sbGFwc2VkKSB7IGNvbGxhcHNlZCA/IHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7IH0uYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcztcblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIGlmICh0aGlzID09PSBlbnRyeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCk7XG5cbiAgICByZXR1cm4gc3VwZXIuaXNPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKGRyYWdnaW5nQm91bmRzKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVhZE9ubHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHksIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGlmICghdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSkge1xuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGNvbGxhcHNlZCA/IGRpcmVjdG9yeS5jb2xsYXBzZSgpIDogZGlyZWN0b3J5LmV4cGFuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuZW50cmllcy5oYXNNYXJrZXIoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5oYXNNYXJrZXIoKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNiKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2IpOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYik7IH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5KHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJpZXNIYXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzSGFzRGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5SGF2aW5nTWFya2VyID09PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlIYXZpbmdNYXJrZXI7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBudWxsLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gdGhpcy5pc092ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmVudHJpZXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5O1xuIl19