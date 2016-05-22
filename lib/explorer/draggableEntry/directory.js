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

    _this.toggleButton = new ToggleButton(_this, _this.onToggleUpdate.bind(_this));

    _this.entries = new Entries(_this, Directory);

    !collapsed ? _this.expand() : _this.collapse(); ///
    return _this;
  }

  _createClass(Directory, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return true;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this.toggleButton.isCollapsed();
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

      var bounds = _get(Object.getPrototypeOf(Directory.prototype), 'getBounds', this).call(this);

      if (!collapsed) {
        this.expand();
      }

      return bounds;
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
      var topmostDirectory = this.topmostDirectory(filePath);

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
      var topmostDirectory = this.topmostDirectory(directoryPath);

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
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryPath) {
      var topmostDirectoryName = util.topmostDirectoryName(directoryPath);

      if (topmostDirectoryName === null) {
        var name = this.getName(),
            directoryName = directoryPath; ///

        if (name === directoryName) {
          return this;
        } else {
          return null;
        }
      } else {
        var directorPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath),
            retrievedDirectory = null;

        this.entries.someDirectory(function (directory) {
          retrievedDirectory = directory.retrieveDirectory(directorPathWithoutTopmostDirectoryName);

          if (retrievedDirectory !== null) {
            return true;
          } else {
            return false;
          }
        });

        return retrievedDirectory;
      }
    }
  }, {
    key: 'directoryPathContainingMarker',
    value: function directoryPathContainingMarker(directoryPath) {
      var name = this.getName(),
          directoryPathContainingMarker = null;

      directoryPath = directoryPath ? directoryPath + '/' + name : name; ///

      if (this.entries.hasMarker()) {
        directoryPathContainingMarker = directoryPath;
      } else {
        this.entries.someDirectory(function (directory) {
          directoryPathContainingMarker = directory.directoryPathContainingMarker(directoryPath);

          if (directoryPathContainingMarker !== null) {
            return true;
          } else {
            return false;
          }
        });
      }

      return directoryPathContainingMarker;
    }
  }, {
    key: 'directoryPathOverlappingEntry',
    value: function directoryPathOverlappingEntry(entry, directoryPath) {
      if (entry === this) {
        return null;
      }

      var name = this.getName();

      directoryPath = directoryPath ? directoryPath + '/' + name : name; ///

      var collapsed = this.isCollapsed();

      if (collapsed) {
        return null;
      }

      var bounds = this.getBounds(),
          entryIsDirectory = entry.isDirectory(),
          entryBounds = entryIsDirectory ? entry.getCollapsedBounds() : entry.getBounds(),
          overlapping = bounds.areOverlapping(entryBounds);

      if (!overlapping) {
        return null;
      }

      var directoryPathOverlappingEntry = null;

      this.entries.someDirectory(function (directory) {
        directoryPathOverlappingEntry = directory.directoryPathOverlappingEntry(entry, directoryPath);

        if (directoryPathOverlappingEntry !== null) {
          return true;
        } else {
          return false;
        }
      });

      if (directoryPathOverlappingEntry === null) {
        directoryPathOverlappingEntry = directoryPath;
      }

      return directoryPathOverlappingEntry;
    }
  }, {
    key: 'topmostDirectory',
    value: function topmostDirectory(path) {
      var topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        return null;
      } else {
        if (!this.entries.hasDirectory(topmostDirectoryName)) {
          var collapsed = true; ///

          this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
        }

        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);

        return topmostDirectory;
      }
    }
  }, {
    key: 'onToggleUpdate',
    value: function onToggleUpdate(collapsed) {
      collapsed ? this.addClass('collapsed') : this.removeClass('collapsed');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLFVBQVUsT0FBTyxPQURyQjs7QUFHQSxJQUFJLE9BQU8sUUFBUSxZQUFSLENBQVg7SUFDSSxRQUFRLFFBQVEsVUFBUixDQURaO0lBRUksVUFBVSxRQUFRLFlBQVIsQ0FGZDtJQUdJLGVBQWUsUUFBUSxpQkFBUixDQUhuQjtJQUlJLGlCQUFpQixRQUFRLG1CQUFSLENBSnJCOztJQU1NLFM7OztBQUNKLHFCQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsU0FBNUIsRUFBdUMsZ0JBQXZDLEVBQXlELHdCQUF6RCxFQUFtRjtBQUFBOztBQUNqRixRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksU0FBdkI7O0FBRGlGLDZGQUczRSxRQUgyRSxFQUdqRSxJQUhpRSxFQUczRCxJQUgyRCxFQUdyRCxnQkFIcUQ7O0FBS2pGLFVBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCOztBQUVBLFVBQUssd0JBQUwsR0FBZ0Msd0JBQWhDOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFJLFlBQUosUUFBdUIsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXZCLENBQXBCOztBQUVBLFVBQUssT0FBTCxHQUFlLElBQUksT0FBSixRQUFrQixTQUFsQixDQUFmOztBQUVBLEtBQUMsU0FBRCxHQUFhLE1BQUssTUFBTCxFQUFiLEdBQTZCLE1BQUssUUFBTCxFQUE3QixDO0FBYmlGO0FBY2xGOzs7O2tDQUVhO0FBQ1osYUFBTyxJQUFQO0FBQ0Q7OztrQ0FFYTtBQUFFLGFBQU8sS0FBSyxZQUFMLENBQWtCLFdBQWxCLEVBQVA7QUFBeUM7Ozs2QkFFaEQsSyxFQUFPO0FBQ2QsVUFBSSxZQUFZLE1BQU0sT0FBTixFQUFoQjs7QUFFQSxjQUFRLFNBQVI7QUFDRSxhQUFLLE1B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LENBQWMsV0FBZCxDQUFaLEdBQXlDLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUF6QztBQUNEOzs7O0VBaFJxQixjOztBQW1SeEIsVUFBVSxLQUFWLEdBQWtCLFVBQVMsSUFBVCxFQUFlLFNBQWYsRUFBMEIsZ0JBQTFCLEVBQTRDLHdCQUE1QyxFQUFzRTtBQUN0RixNQUFJLFlBQVksUUFBUSxLQUFSLENBQWMsU0FBZCxFQUF5QixZQUF6QixFQUF1QyxJQUF2QyxFQUE2QyxTQUE3QyxFQUF3RCxnQkFBeEQsRUFBMEUsd0JBQTFFLENBQWhCOztBQUVBLFlBQVUsZUFBVixDQUEwQixJQUExQjs7QUFFQSxTQUFPLFNBQVA7QUFDRCxDQU5EOztBQVFBLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlLCBkcmFnRXZlbnRIYW5kbGVyKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCB0aGlzLm9uVG9nZ2xlVXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgICFjb2xsYXBzZWQgPyB0aGlzLmV4cGFuZCgpIDogdGhpcy5jb2xsYXBzZSgpOyAvLy9cbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICB2YXIgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCByZWFkT25seSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgaWYgKCF0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgY29sbGFwc2VkID8gZGlyZWN0b3J5LmNvbGxhcHNlKCkgOiBkaXJlY3RvcnkuZXhwYW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHZhciBtYXJrZXJOYW1lID0gbWFya2VyUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmVudHJpZXMuYWRkTWFya2VyKG1hcmtlck5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLmVudHJpZXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuZW50cmllcy5oYXNNYXJrZXIoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5oYXNNYXJrZXIoKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNiKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2IpOyB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgaWYgKG5hbWUgPT09IGRpcmVjdG9yeU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICByZXRyaWV2ZWREaXJlY3RvcnkgPSBudWxsO1xuXG4gICAgICB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0cmlldmVkRGlyZWN0b3J5ID0gZGlyZWN0b3J5LnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHJldHJpZXZlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXRyaWV2ZWREaXJlY3Rvcnk7XG4gICAgfVxuICB9XG5cbiAgZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIoZGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyID0gbnVsbDtcblxuICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoID8gZGlyZWN0b3J5UGF0aCArICcvJyArIG5hbWUgOiBuYW1lOyAgLy8vXG5cbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlciA9IGRpcmVjdG9yeVBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlciA9IGRpcmVjdG9yeS5kaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlcihkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlcjtcbiAgfVxuXG4gIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5KGVudHJ5LCBkaXJlY3RvcnlQYXRoKSB7XG4gICAgaWYgKGVudHJ5ID09PSB0aGlzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGggPyBkaXJlY3RvcnlQYXRoICsgJy8nICsgbmFtZSA6IG5hbWU7ICAvLy9cblxuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCksXG4gICAgICAgIGVudHJ5Qm91bmRzID0gZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhlbnRyeUJvdW5kcyk7XG5cbiAgICBpZiAoIW92ZXJsYXBwaW5nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeS5kaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSwgZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlQYXRoO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICAgIH1cbiAgfVxuXG4gIG9uVG9nZ2xlVXBkYXRlKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/IHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cbn1cblxuRGlyZWN0b3J5LmNsb25lID0gZnVuY3Rpb24obmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3Rvcnk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==
