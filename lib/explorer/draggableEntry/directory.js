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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwiZXhwYW5kIiwiY29sbGFwc2UiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsInRvcG1vc3REaXJlY3RvcnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJoYXNNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJzb21lRGlyZWN0b3J5IiwiY2IiLCJwYXRoIiwiZW50cmllc0hhc0RpcmVjdG9yeSIsImRpcmVjdG9yeUhhdmluZ01hcmtlciIsImdldERpcmVjdG9yeUhhdmluZ01hcmtlciIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsWUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxVQUFSLENBRFo7QUFBQSxJQUVJSSxVQUFVSixRQUFRLFlBQVIsQ0FGZDtBQUFBLElBR0lLLGVBQWVMLFFBQVEsaUJBQVIsQ0FIbkI7QUFBQSxJQUlJTSxpQkFBaUJOLFFBQVEsbUJBQVIsQ0FKckI7O0lBTU1PLFM7OztBQUNKLHFCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsU0FBNUIsRUFBdUNDLGdCQUF2QyxFQUF5REMsd0JBQXpELEVBQW1GO0FBQUE7O0FBQ2pGLFFBQUlDLE9BQU9WLE1BQU1XLEtBQU4sQ0FBWUMsU0FBdkI7O0FBRGlGLHNIQUczRVAsUUFIMkUsRUFHakVDLElBSGlFLEVBRzNESSxJQUgyRCxFQUdyREYsZ0JBSHFEOztBQUtqRixVQUFL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eUIsWUFBekIsRUFBdUNFLElBQXZDLEVBQTZDQyxTQUE3QyxFQUF3REMsZ0JBQXhELEVBQTBFQyx3QkFBMUUsQ0FBaEI7O0FBRUF5QixnQkFBVXlDLGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsYUFBT3pDLFNBQVA7QUFDRDs7OztFQTFPcUIvQixjOztBQTZPeEJ5RSxPQUFPQyxPQUFQLEdBQWlCekUsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcykgKTtcblxuICAgIHRoaXMuZW50cmllcyA9IG5ldyBFbnRyaWVzKHRoaXMsIERpcmVjdG9yeSk7XG5cbiAgICAhY29sbGFwc2VkID9cbiAgICAgIHRoaXMuZXhwYW5kKCkgOlxuICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RHJhZ2dpbmdCb3VuZHMoKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIHZhciBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBib3VuZHM7XG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICBpZiAodGhpcyA9PT0gZW50cnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZHJhZ2dpbmdCb3VuZHMgPSBlbnRyeS5nZXREcmFnZ2luZ0JvdW5kcygpO1xuXG4gICAgcmV0dXJuIHN1cGVyLmlzT3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyhkcmFnZ2luZ0JvdW5kcyk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlYWRPbmx5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5LCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBpZiAoIXRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBjb2xsYXBzZWQgPyBkaXJlY3RvcnkuY29sbGFwc2UoKSA6IGRpcmVjdG9yeS5leHBhbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuZW50cmllcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkuaGFzTWFya2VyKCk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYik7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNiKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2IpIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2IpOyB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeShwYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlbnRyaWVzSGFzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0hhc0RpcmVjdG9yeSkge1xuICAgICAgICB2YXIgY29sbGFwc2VkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICAgIH1cbiAgfVxuXG4gIGdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpIHtcbiAgICB2YXIgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpO1xuXG4gICAgaWYgKGRpcmVjdG9yeUhhdmluZ01hcmtlciA9PT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5SGF2aW5nTWFya2VyO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gbnVsbCxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcztcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5O1xuIl19