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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Directory).call(this, selector, name, type, dragEventHandler));

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
    key: 'isEmpty',
    value: function isEmpty() {
      return this.entries.isEmpty();
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

      var bounds = _get(Object.getPrototypeOf(Directory.prototype), 'getBounds', this).call(this),
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

      return _get(Object.getPrototypeOf(Directory.prototype), 'isOverlappingDraggingBounds', this).call(this, draggingBounds);
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
    key: 'hasDirectory',
    value: function hasDirectory(directoryPath) {
      var topmostDirectory = this.addTopmostDirectory(directoryPath);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        return this.someDirectory(function (directory) {
          return directory.hasDirectory(directoryPathWithoutTopmostDirectoryName);
        });
      } else {
        var directoryName = directoryPath; ///

        return this.entries.hasDirectory(directoryName);
      }
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryPath) {
      var retrievedDirectory = null,
          topmostDirectory = this.addTopmostDirectory(directoryPath);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        return this.someDirectory(function (directory) {
          retrievedDirectory = directory.retrieveDirectory(directoryPathWithoutTopmostDirectoryName);

          if (retrievedDirectory !== null) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        var directoryName = directoryPath; ///

        retrievedDirectory = entries.retrieveDirectory(directoryName);
      }

      return retrievedDirectory;
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
  }]);

  return Directory;
}(DraggableEntry);

Directory.clone = function (name, collapsed, dragEventHandler, activateFileEventHandler) {
  var directory = Element.clone(Directory, '#directory', name, collapsed, dragEventHandler, activateFileEventHandler);

  directory.removeAttribute('id');

  return directory;
};

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLFVBQVUsT0FBTyxPQURyQjs7QUFHQSxJQUFJLE9BQU8sUUFBUSxZQUFSLENBQVg7SUFDSSxRQUFRLFFBQVEsVUFBUixDQURaO0lBRUksVUFBVSxRQUFRLFlBQVIsQ0FGZDtJQUdJLGVBQWUsUUFBUSxpQkFBUixDQUhuQjtJQUlJLGlCQUFpQixRQUFRLG1CQUFSLENBSnJCOztJQU1NLFM7OztBQUNKLHFCQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsU0FBNUIsRUFBdUMsZ0JBQXZDLEVBQXlELHdCQUF6RCxFQUFtRjtBQUFBOztBQUNqRixRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksU0FBdkI7O0FBRGlGLDZGQUczRSxRQUgyRSxFQUdqRSxJQUhpRSxFQUczRCxJQUgyRCxFQUdyRCxnQkFIcUQ7O0FBS2pGLFVBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCOztBQUVBLFVBQUssd0JBQUwsR0FBZ0Msd0JBQWhDOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFJLFlBQUosUUFBdUIsVUFBUyxTQUFULEVBQW9CO0FBQUUsa0JBQVksS0FBSyxRQUFMLENBQWMsV0FBZCxDQUFaLEdBQXlDLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUF6QztBQUF5RSxLQUEvRixDQUFnRyxJQUFoRyxPQUF2QixDQUFwQjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFJLE9BQUosUUFBa0IsU0FBbEIsQ0FBZjs7QUFFQSxLQUFDLFNBQUQsR0FDRSxNQUFLLE1BQUwsRUFERixHQUVJLE1BQUssUUFBTCxFQUZKO0FBYmlGO0FBZ0JsRjs7OztrQ0FFYTtBQUNaLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVEsSyxFQUFPO0FBQ2QsVUFBSSxZQUFZLE1BQU0sT0FBTixF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QixFQUE0Qyx3QkFBNUMsRUFBc0U7QUFDdEYsTUFBSSxZQUFZLFFBQVEsS0FBUixDQUFjLFNBQWQsRUFBeUIsWUFBekIsRUFBdUMsSUFBdkMsRUFBNkMsU0FBN0MsRUFBd0QsZ0JBQXhELEVBQTBFLHdCQUExRSxDQUFoQjs7QUFFQSxZQUFVLGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsU0FBTyxTQUFQO0FBQ0QsQ0FORDs7QUFRQSxPQUFPLE9BQVAsR0FBaUIsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgZnVuY3Rpb24oY29sbGFwc2VkKSB7IGNvbGxhcHNlZCA/IHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7IH0uYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpO1xuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RHJhZ2dpbmdCb3VuZHMoKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIHZhciBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBib3VuZHM7XG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICBpZiAodGhpcyA9PT0gZW50cnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZHJhZ2dpbmdCb3VuZHMgPSBlbnRyeS5nZXREcmFnZ2luZ0JvdW5kcygpO1xuXG4gICAgcmV0dXJuIHN1cGVyLmlzT3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyhkcmFnZ2luZ0JvdW5kcyk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHsgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uLmlzQ29sbGFwc2VkKCk7IH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlYWRPbmx5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5LCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBpZiAoIXRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBjb2xsYXBzZWQgPyBkaXJlY3RvcnkuY29sbGFwc2UoKSA6IGRpcmVjdG9yeS5leHBhbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIHJldHJpZXZlZERpcmVjdG9yeSA9IG51bGwsXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHJpZXZlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAocmV0cmlldmVkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIHJldHJpZXZlZERpcmVjdG9yeSA9IGVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXRyaWV2ZWREaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGUoY2IpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeShjYik7IH1cblxuICBzb21lRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGNiKTsgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZW50cmllc0hhc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNIYXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgICB9XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgIGlmIChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcykge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cbn1cblxuRGlyZWN0b3J5LmNsb25lID0gZnVuY3Rpb24obmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3Rvcnk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==
