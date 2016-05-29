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
    key: 'isOverlappingDraggableElement',
    value: function isOverlappingDraggableElement(draggableElement) {
      if (this === draggableElement) {
        return false;
      }

      var collapsed = this.isCollapsed();

      if (collapsed) {
        return false;
      }

      return _get(Object.getPrototypeOf(Directory.prototype), 'isOverlappingDraggableElement', this).call(this, draggableElement);
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
    key: 'directoryOverlappingEntry',
    value: function directoryOverlappingEntry(entry) {
      var directoryOverlappingEntry = this.entries.directoryOverlappingEntry(entry);

      if (directoryOverlappingEntry === null) {
        var draggableElement = entry,
            ///
        overlappingDraggableElement = this.isOverlappingDraggableElement(draggableElement);

        if (overlappingDraggableElement) {
          directoryOverlappingEntry = this;
        }
      }

      return directoryOverlappingEntry;
    }
  }, {
    key: 'directoryHavingMarker',
    value: function directoryHavingMarker() {
      var directoryHavingMarker = this.entries.directoryHavingMarker();

      if (directoryHavingMarker === null) {
        if (this.hasMarker()) {
          directoryHavingMarker = this;
        }
      }

      return directoryHavingMarker;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtJQUNJLFVBQVUsT0FBTyxPQURyQjs7QUFHQSxJQUFJLE9BQU8sUUFBUSxZQUFSLENBQVg7SUFDSSxRQUFRLFFBQVEsVUFBUixDQURaO0lBRUksVUFBVSxRQUFRLFlBQVIsQ0FGZDtJQUdJLGVBQWUsUUFBUSxpQkFBUixDQUhuQjtJQUlJLGlCQUFpQixRQUFRLG1CQUFSLENBSnJCOztJQU1NLFM7OztBQUNKLHFCQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsU0FBNUIsRUFBdUMsZ0JBQXZDLEVBQXlELHdCQUF6RCxFQUFtRjtBQUFBOztBQUNqRixRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksU0FBdkI7O0FBRGlGLDZGQUczRSxRQUgyRSxFQUdqRSxJQUhpRSxFQUczRCxJQUgyRCxFQUdyRCxnQkFIcUQ7O0FBS2pGLFVBQUssZ0JBQUwsR0FBd0IsZ0JBQXhCOztBQUVBLFVBQUssd0JBQUwsR0FBZ0Msd0JBQWhDOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFJLFlBQUosUUFBdUIsVUFBUyxTQUFULEVBQW9CO0FBQUUsa0JBQVksS0FBSyxRQUFMLENBQWMsV0FBZCxDQUFaLEdBQXlDLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUF6QztBQUF5RSxLQUEvRixDQUFnRyxJQUFoRyxPQUF2QixDQUFwQjs7QUFFQSxVQUFLLE9BQUwsR0FBZSxJQUFJLE9BQUosUUFBa0IsU0FBbEIsQ0FBZjs7QUFFQSxLQUFDLFNBQUQsR0FDRSxNQUFLLE1BQUwsRUFERixHQUVJLE1BQUssUUFBTCxFQUZKO0FBYmlGO0FBZ0JsRjs7OztrQ0FFYTtBQUNaLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVEsSyxFQUFPO0FBQ2QsVUFBSSxZQUFZLE1BQU0sT0FBTixF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QUV5QixLLEVBQU87QUFDL0IsVUFBSSw0QkFBNEIsS0FBSyxPQUFMLENBQWEseUJBQWIsQ0FBdUMsS0FBdkMsQ0FBaEM7O0FBRUEsVUFBSSw4QkFBOEIsSUFBbEMsRUFBd0M7QUFDdEMsWUFBSSxtQkFBbUIsS0FBdkI7O0FBQ0ksc0NBQThCLEtBQUssNkJBQUwsQ0FBbUMsZ0JBQW5DLENBRGxDOztBQUdBLFlBQUksMkJBQUosRUFBaUM7QUFDL0Isc0NBQTRCLElBQTVCO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPLHlCQUFQO0FBQ0Q7Ozs0Q0FFdUI7QUFDdEIsVUFBSSx3QkFBd0IsS0FBSyxPQUFMLENBQWEscUJBQWIsRUFBNUI7O0FBRUEsVUFBSSwwQkFBMEIsSUFBOUIsRUFBb0M7QUFDbEMsWUFBSSxLQUFLLFNBQUwsRUFBSixFQUFzQjtBQUNwQixrQ0FBd0IsSUFBeEI7QUFDRDtBQUNGOztBQUVELGFBQU8scUJBQVA7QUFDRDs7OztFQXBQcUIsYzs7QUF1UHhCLFVBQVUsS0FBVixHQUFrQixVQUFTLElBQVQsRUFBZSxTQUFmLEVBQTBCLGdCQUExQixFQUE0Qyx3QkFBNUMsRUFBc0U7QUFDdEYsTUFBSSxZQUFZLFFBQVEsS0FBUixDQUFjLFNBQWQsRUFBeUIsWUFBekIsRUFBdUMsSUFBdkMsRUFBNkMsU0FBN0MsRUFBd0QsZ0JBQXhELEVBQTBFLHdCQUExRSxDQUFoQjs7QUFFQSxZQUFVLGVBQVYsQ0FBMEIsSUFBMUI7O0FBRUEsU0FBTyxTQUFQO0FBQ0QsQ0FORDs7QUFRQSxPQUFPLE9BQVAsR0FBaUIsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLi90b2dnbGVCdXR0b24nKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSwgZHJhZ0V2ZW50SGFuZGxlcik7XG5cbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSBkcmFnRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgZnVuY3Rpb24oY29sbGFwc2VkKSB7IGNvbGxhcHNlZCA/IHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7IH0uYmluZCh0aGlzKSApO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IEVudHJpZXModGhpcywgRGlyZWN0b3J5KTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICB2YXIgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5U3ViRW50cmllcyA9IGRpcmVjdG9yeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgICBcbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgZ2V0RHJhZ2dpbmdCb3VuZHMoKSB7XG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIHZhciBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBib3VuZHM7XG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudChkcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudChkcmFnZ2FibGVFbGVtZW50KTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcmVhZE9ubHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHksIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGlmICghdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSkge1xuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGNvbGxhcHNlZCA/IGRpcmVjdG9yeS5jb2xsYXBzZSgpIDogZGlyZWN0b3J5LmV4cGFuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuZW50cmllcy5oYXNNYXJrZXIoKSkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkuaGFzTWFya2VyKCk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNiKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYik7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNiKTsgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGlmIChuYW1lID09PSBkaXJlY3RvcnlOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgcmV0cmlldmVkRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgICAgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHJpZXZlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmIChyZXRyaWV2ZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmV0cmlldmVkRGlyZWN0b3J5O1xuICAgIH1cbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICAgIH1cbiAgfVxuXG4gIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZW50cmllcy5kaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICBcbiAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdmFyIGRyYWdnYWJsZUVsZW1lbnQgPSBlbnRyeSwgLy8vXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudChkcmFnZ2FibGVFbGVtZW50KTtcbiAgICAgIFxuICAgICAgaWYgKG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZW50cmllcy5kaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgIGlmIChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxufVxuXG5EaXJlY3RvcnkuY2xvbmUgPSBmdW5jdGlvbihuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICB2YXIgZGlyZWN0b3J5ID0gRWxlbWVudC5jbG9uZShEaXJlY3RvcnksICcjZGlyZWN0b3J5JywgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuXG4gIGRpcmVjdG9yeS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgcmV0dXJuIGRpcmVjdG9yeTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5O1xuIl19
