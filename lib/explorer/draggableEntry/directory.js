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
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var topmostDirectoryName = util.topmostDirectoryName(directoryPath);

      if (topmostDirectoryName !== null) {
        var topmostDirectory = null;

        this.someDirectory(function (directory) {
          var directoryName = directory.getName();

          if (directoryName === topmostDirectoryName) {
            topmostDirectory = directory;

            return true;
          } else {
            return false;
          }
        });

        if (topmostDirectory !== null) {
          var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

          return topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName);
        } else {
          return false;
        }
      } else {
        var directoryName = directoryPath; ///

        return this.entries.removeDirectory(directoryName);
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
  }]);

  return Directory;
}(DraggableEntry);

Directory.clone = function (name, collapsed, dragEventHandler, activateFileEventHandler) {
  var directory = Element.clone(Directory, '#directory', name, collapsed, dragEventHandler, activateFileEventHandler);

  directory.removeAttribute('id');

  return directory;
};

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLFVBQVUsT0FBTyxPQURyQjs7QUFHQSxJQUFJLE9BQU8sUUFBUSxZQUFSLENBQVg7SUFDSSxRQUFRLFFBQVEsVUFBUixDQURaO0lBRUksVUFBVSxRQUFRLFlBQVIsQ0FGZDtJQUdJLGVBQWUsUUFBUSxpQkFBUixDQUhuQjtJQUlJLGlCQUFpQixRQUFRLG1CQUFSLENBSnJCOztJQU1NLFM7OztBQUNKLHFCQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsU0FBNUIsRUFBdUMsZ0JBQXZDLEVBQXlELHdCQUF6RCxFQUFtRjtBQUFBOztBQUNqRixRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksU0FBdkI7O0FBRGlGLDZGQUczRSxRQUgyRSxFQUdqRSxJQUhpRSxFQUczRCxJQUgyRCxFQUdyRCxnQkFIcUQ7O0FBS2pGLFVBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCOztBQUVBLFVBQUssd0JBQUwsR0FBZ0Msd0JBQWhDOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFJLFlBQUosUUFBdUIsVUFBUyxTQUFULEVBQW9CO0FBQUUsa0JBQVksS0FBSyxRQUFMLENBQWMsV0FBZCxDQUFaLEdBQXlDLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUF6QztBQUF5RSxLQUEvRixDQUFnRyxJQUFoRyxPQUF2QixDQUFwQjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFJLE9BQUosUUFBa0IsU0FBbEIsQ0FBZjs7QUFFQSxLQUFDLFNBQUQsR0FDRSxNQUFLLE1BQUwsRUFERixHQUVJLE1BQUssUUFBTCxFQUZKO0FBYmlGO0FBZ0JsRjs7OztrQ0FFYTtBQUNaLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVEsSyxFQUFPO0FBQ2QsVUFBSSxZQUFZLE1BQU0sT0FBTixF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LCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlLCBkcmFnRXZlbnRIYW5kbGVyKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCBmdW5jdGlvbihjb2xsYXBzZWQpIHsgY29sbGFwc2VkID8gdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJykgOiB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTsgfS5iaW5kKHRoaXMpICk7XG5cbiAgICB0aGlzLmVudHJpZXMgPSBuZXcgRW50cmllcyh0aGlzLCBEaXJlY3RvcnkpO1xuXG4gICAgIWNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmV4cGFuZCgpIDpcbiAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW50cmllcy5pc0VtcHR5KCk7XG4gIH1cblxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIHZhciBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXREcmFnZ2luZ0JvdW5kcygpIHtcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGJvdW5kcztcblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2luZ0JvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkge1xuICAgIGlmICh0aGlzID09PSBlbnRyeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCk7XG5cbiAgICByZXR1cm4gc3VwZXIuaXNPdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzKGRyYWdnaW5nQm91bmRzKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVhZE9ubHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHksIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGlmICghdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSkge1xuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGNvbGxhcHNlZCA/IGRpcmVjdG9yeS5jb2xsYXBzZSgpIDogZGlyZWN0b3J5LmV4cGFuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBkaXJlY3Rvcnk7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGUoY2IpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeShjYik7IH1cblxuICBzb21lRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGNiKTsgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZW50cmllc0hhc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNIYXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgICB9XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgIGlmIChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcykge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cbn1cblxuRGlyZWN0b3J5LmNsb25lID0gZnVuY3Rpb24obmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3Rvcnk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==
