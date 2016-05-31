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

        retrievedDirectory = this.entries.retrieveDirectory(directoryName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLFVBQVUsT0FBTyxPQURyQjs7QUFHQSxJQUFJLE9BQU8sUUFBUSxZQUFSLENBQVg7SUFDSSxRQUFRLFFBQVEsVUFBUixDQURaO0lBRUksVUFBVSxRQUFRLFlBQVIsQ0FGZDtJQUdJLGVBQWUsUUFBUSxpQkFBUixDQUhuQjtJQUlJLGlCQUFpQixRQUFRLG1CQUFSLENBSnJCOztJQU1NLFM7OztBQUNKLHFCQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsU0FBNUIsRUFBdUMsZ0JBQXZDLEVBQXlELHdCQUF6RCxFQUFtRjtBQUFBOztBQUNqRixRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksU0FBdkI7O0FBRGlGLDZGQUczRSxRQUgyRSxFQUdqRSxJQUhpRSxFQUczRCxJQUgyRCxFQUdyRCxnQkFIcUQ7O0FBS2pGLFVBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCOztBQUVBLFVBQUssd0JBQUwsR0FBZ0Msd0JBQWhDOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFJLFlBQUosUUFBdUIsVUFBUyxTQUFULEVBQW9CO0FBQUUsa0JBQVksS0FBSyxRQUFMLENBQWMsV0FBZCxDQUFaLEdBQXlDLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUF6QztBQUF5RSxLQUEvRixDQUFnRyxJQUFoRyxPQUF2QixDQUFwQjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFJLE9BQUosUUFBa0IsU0FBbEIsQ0FBZjs7QUFFQSxLQUFDLFNBQUQsR0FDRSxNQUFLLE1BQUwsRUFERixHQUVJLE1BQUssUUFBTCxFQUZKO0FBYmlGO0FBZ0JsRjs7OztrQ0FFYTtBQUNaLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVEsSyxFQUFPO0FBQ2QsVUFBSSxZQUFZLE1BQU0sT0FBTixF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QUEwQixnQkFBMUIsRUFBNEMsd0JBQTVDLEVBQXNFO0FBQ3RGLE1BQUksWUFBWSxRQUFRLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLFlBQXpCLEVBQXVDLElBQXZDLEVBQTZDLFNBQTdDLEVBQXdELGdCQUF4RCxFQUEwRSx3QkFBMUUsQ0FBaEI7O0FBRUEsWUFBVSxlQUFWLENBQTBCLElBQTFCOztBQUVBLFNBQU8sU0FBUDtBQUNELENBTkQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgVG9nZ2xlQnV0dG9uID0gcmVxdWlyZSgnLi4vdG9nZ2xlQnV0dG9uJyksXG4gICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyID0gZHJhZ0V2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyID0gYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBuZXcgVG9nZ2xlQnV0dG9uKHRoaXMsIGZ1bmN0aW9uKGNvbGxhcHNlZCkgeyBjb2xsYXBzZWQgPyB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpOyB9LmJpbmQodGhpcykgKTtcblxuICAgIHRoaXMuZW50cmllcyA9IG5ldyBFbnRyaWVzKHRoaXMsIERpcmVjdG9yeSk7XG5cbiAgICAhY29sbGFwc2VkID9cbiAgICAgIHRoaXMuZXhwYW5kKCkgOlxuICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuICAgIH1cbiAgfVxuICBcbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTtcbiAgfVxuXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldERyYWdnaW5nQm91bmRzKCkge1xuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICB2YXIgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gYm91bmRzO1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgaWYgKHRoaXMgPT09IGVudHJ5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKTtcblxuICAgIHJldHVybiBzdXBlci5pc092ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMoZHJhZ2dpbmdCb3VuZHMpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCByZWFkT25seSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgaWYgKCF0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgY29sbGFwc2VkID8gZGlyZWN0b3J5LmNvbGxhcHNlKCkgOiBkaXJlY3RvcnkuZXhwYW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZXR1cm4gdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lmhhc0RpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciByZXRyaWV2ZWREaXJlY3RvcnkgPSBudWxsLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZXR1cm4gdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXRyaWV2ZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHJldHJpZXZlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICByZXRyaWV2ZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXRyaWV2ZWREaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGUoY2IpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeShjYik7IH1cblxuICBzb21lRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGNiKTsgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZW50cmllc0hhc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNIYXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgICB9XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgIGlmIChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcykge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cbn1cblxuRGlyZWN0b3J5LmNsb25lID0gZnVuY3Rpb24obmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3Rvcnk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==
