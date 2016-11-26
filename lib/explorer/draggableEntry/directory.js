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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwidG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlciIsImJpbmQiLCJlbnRyaWVzIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImV4cGFuZCIsImNvbGxhcHNlIiwiZW50cnkiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiRklMRSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwic3ViRW50cmllcyIsImZvckVhY2hGaWxlIiwiZmlsZSIsInN1YkVudHJ5IiwicHVzaCIsImZvckVhY2hEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJkaXJlY3RvcnlTdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImNvbmNhdCIsImlzQ29sbGFwc2VkIiwiYm91bmRzIiwiZHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZyIsImdldERyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsImZpbGVQYXRoIiwidG9wbW9zdERpcmVjdG9yeSIsImFkZFRvcG1vc3REaXJlY3RvcnkiLCJmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJhZGREaXJlY3RvcnkiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJyZW1vdmVkIiwiZW50cmllc01hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwic29tZURpcmVjdG9yeU1hcmtlclJlbW92ZWQiLCJzb21lRGlyZWN0b3J5IiwibWFya2VkIiwic29tZURpcmVjdG9yeU1hcmtlZCIsImNiIiwicGF0aCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJpc092ZXJsYXBwaW5nRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLFVBQVIsQ0FEWjtBQUFBLElBRUlJLFVBQVVKLFFBQVEsWUFBUixDQUZkO0FBQUEsSUFHSUssZUFBZUwsUUFBUSxpQkFBUixDQUhuQjtBQUFBLElBSUlNLGlCQUFpQk4sUUFBUSxtQkFBUixDQUpyQjs7SUFNTU8sUzs7O0FBQ0oscUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxTQUE1QixFQUF1Q0MsZ0JBQXZDLEVBQXlEQyx3QkFBekQsRUFBbUY7QUFBQTs7QUFDakYsUUFBSUMsT0FBT1YsTUFBTVcsS0FBTixDQUFZQyxTQUF2Qjs7QUFEaUYsc0hBRzNFUCxRQUgyRSxFQUdqRUMsSUFIaUUsRUFHM0RJLElBSDJELEVBR3JERixnQkFIcUQ7O0FBS2pGLFVBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7O0FBRUEsVUFBS0Msd0JBQUwsR0FBZ0NBLHdCQUFoQzs7QUFFQSxVQUFLSSxZQUFMLEdBQW9CLElBQUlYLFlBQUosUUFBdUIsTUFBS1kseUJBQUwsQ0FBK0JDLElBQS9CLE9BQXZCLENBQXBCOztBQUVBLFVBQUtDLE9BQUwsR0FBZSxJQUFJZixPQUFKLFFBQWtCRyxTQUFsQixDQUFmOztBQUVBLFVBQUthLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JILElBQXhCLE9BQW5COztBQUVBLEtBQUNSLFNBQUQsR0FDRSxNQUFLWSxNQUFMLEVBREYsR0FFSSxNQUFLQyxRQUFMLEVBRko7QUFmaUY7QUFrQmxGOzs7O2tDQUVhO0FBQ1osYUFBTyxJQUFQO0FBQ0Q7Ozs2QkFFUUMsSyxFQUFPO0FBQ2QsVUFBSUMsWUFBWUQsTUFBTUUsT0FBTixFQUFoQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS3RCLE1BQU1XLEtBQU4sQ0FBWWEsSUFBakI7QUFDQSxhQUFLeEIsTUFBTVcsS0FBTixDQUFZYyxNQUFqQjs7QUFFRSxpQkFBTyxJQUFQOztBQUVGLGFBQUt6QixNQUFNVyxLQUFOLENBQVlDLFNBQWpCOztBQUVFLGNBQUlOLE9BQU8sS0FBS29CLE9BQUwsRUFBWDtBQUFBLGNBQ0lDLFlBQVlOLE1BQU1LLE9BQU4sRUFEaEI7QUFBQSxjQUVJRSxTQUFTdEIsS0FBS3VCLGFBQUwsQ0FBbUJGLFNBQW5CLElBQWdDLENBRjdDOztBQUlBLGlCQUFPQyxNQUFQO0FBWko7QUFjRDs7O29DQUVlO0FBQ2QsVUFBSUUsYUFBYSxFQUFqQjs7QUFFQSxXQUFLQyxXQUFMLENBQWlCLFVBQVNDLElBQVQsRUFBZTtBQUM5QixZQUFJQyxXQUFXRCxJQUFmLENBRDhCLENBQ1Q7O0FBRXJCRixtQkFBV0ksSUFBWCxDQUFnQkQsUUFBaEI7QUFDRCxPQUpEOztBQU1BLFdBQUtFLGdCQUFMLENBQXNCLFVBQVNDLFNBQVQsRUFBb0I7QUFDeEMsWUFBSUgsV0FBV0csU0FBZjtBQUFBLFlBQTBCO0FBQ3RCQyw4QkFBc0JELFVBQVVFLGFBQVYsRUFEMUI7O0FBR0FSLG1CQUFXSSxJQUFYLENBQWdCRCxRQUFoQjs7QUFFQUgscUJBQWFBLFdBQVdTLE1BQVgsQ0FBa0JGLG1CQUFsQixDQUFiO0FBQ0QsT0FQRDs7QUFTQSxhQUFPUCxVQUFQO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsVUFBSXZCLFlBQVksS0FBS2lDLFdBQUwsRUFBaEI7O0FBRUEsV0FBS3BCLFFBQUw7O0FBRUEsVUFBSXFCLHdIQUFKO0FBQUEsVUFDSUMsaUJBQWlCRCxNQURyQixDQUxrQixDQU1ZOztBQUU5QixVQUFJLENBQUNsQyxTQUFMLEVBQWdCO0FBQ2QsYUFBS1ksTUFBTDtBQUNEOztBQUVELGFBQU91QixjQUFQO0FBQ0Q7Ozt1Q0FFa0JyQixLLEVBQU87QUFDeEIsVUFBSXNCLFdBQUo7O0FBRUEsVUFBSSxTQUFTdEIsS0FBYixFQUFvQjtBQUNsQnNCLHNCQUFjLEtBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJcEMsWUFBWSxLQUFLaUMsV0FBTCxFQUFoQjs7QUFFQSxZQUFJakMsU0FBSixFQUFlO0FBQ2JvQyx3QkFBYyxLQUFkO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSUQsaUJBQWlCckIsTUFBTXVCLGlCQUFOLEVBQXJCO0FBQUEsY0FDSUMsOEpBQThESCxjQUE5RCxDQURKOztBQUdBQyx3QkFBY0UseUJBQWQ7QUFDRDtBQUNGOztBQUVELGFBQU9GLFdBQVA7QUFDRDs7O2tDQUVhO0FBQUUsYUFBTyxLQUFLOUIsWUFBTCxDQUFrQjJCLFdBQWxCLEVBQVA7QUFBeUM7Ozs2QkFFaEQ7QUFBRSxXQUFLM0IsWUFBTCxDQUFrQk0sTUFBbEI7QUFBNkI7OzsrQkFFN0I7QUFBRSxXQUFLTixZQUFMLENBQWtCTyxRQUFsQjtBQUErQjs7OzRCQUVwQzBCLFEsRUFBVTtBQUNoQixVQUFJQyxtQkFBbUIsS0FBS0MsbUJBQUwsQ0FBeUJGLFFBQXpCLENBQXZCOztBQUVBLFVBQUlDLHFCQUFxQixJQUF6QixFQUErQjtBQUM3QixZQUFJRSxzQ0FBc0NsRCxLQUFLbUQsK0JBQUwsQ0FBcUNKLFFBQXJDLENBQTFDOztBQUVBQyx5QkFBaUJJLE9BQWpCLENBQXlCRixtQ0FBekI7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLakMsT0FBTCxDQUFhbUMsT0FBYixDQUFxQkwsUUFBckIsRUFBK0IsS0FBS3RDLGdCQUFwQyxFQUFzRCxLQUFLQyx3QkFBM0Q7QUFDRDtBQUNGOzs7aUNBRVkyQyxhLEVBQWU3QyxTLEVBQVc7QUFDckMsVUFBSXdDLG1CQUFtQixLQUFLQyxtQkFBTCxDQUF5QkksYUFBekIsQ0FBdkI7O0FBRUEsVUFBSUwscUJBQXFCLElBQXpCLEVBQStCO0FBQzdCLFlBQUlNLDJDQUEyQ3RELEtBQUttRCwrQkFBTCxDQUFxQ0UsYUFBckMsQ0FBL0M7O0FBRUFMLHlCQUFpQk8sWUFBakIsQ0FBOEJELHdDQUE5QixFQUF3RTlDLFNBQXhFO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSWdELGdCQUFnQkgsYUFBcEI7QUFBQSxZQUFvQztBQUNoQ0ksMkJBQW1CLEtBQUt4QyxPQUFMLENBQWF5QyxZQUFiLENBQTBCRixhQUExQixDQUR2Qjs7QUFHQSxZQUFJLENBQUNDLGdCQUFMLEVBQXVCO0FBQ3JCLGVBQUt4QyxPQUFMLENBQWFzQyxZQUFiLENBQTBCQyxhQUExQixFQUF5Q2hELFNBQXpDLEVBQW9ELEtBQUtDLGdCQUF6RCxFQUEyRSxLQUFLQyx3QkFBaEY7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJMkIsWUFBWSxLQUFLcEIsT0FBTCxDQUFhMEMsaUJBQWIsQ0FBK0JILGFBQS9CLENBQWhCOztBQUVBaEQsc0JBQ0U2QixVQUFVaEIsUUFBVixFQURGLEdBRUlnQixVQUFVakIsTUFBVixFQUZKO0FBR0Q7QUFDRjtBQUNGOzs7OEJBRVN3QyxVLEVBQVlyQyxTLEVBQVc7QUFDL0IsVUFBSXNDLHVCQUF1QjdELEtBQUs2RCxvQkFBTCxDQUEwQkQsVUFBMUIsQ0FBM0I7O0FBRUEsVUFBSUMseUJBQXlCLElBQTdCLEVBQW1DO0FBQ2pDLFlBQUlDLGFBQWFGLFVBQWpCLENBRGlDLENBQ0g7O0FBRTlCLGFBQUszQyxPQUFMLENBQWE4QyxTQUFiLENBQXVCRCxVQUF2QixFQUFtQ3ZDLFNBQW5DO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSXlCLG1CQUFtQixLQUFLL0IsT0FBTCxDQUFhMEMsaUJBQWIsQ0FBK0JFLG9CQUEvQixDQUF2QjtBQUFBLFlBQ0lHLHdDQUF3Q2hFLEtBQUttRCwrQkFBTCxDQUFxQ1MsVUFBckMsQ0FENUM7O0FBR0FaLHlCQUFpQmUsU0FBakIsQ0FBMkJDLHFDQUEzQixFQUFrRXpDLFNBQWxFO0FBQ0Q7QUFDRjs7O21DQUVjO0FBQ2IsVUFBSTBDLE9BQUo7QUFBQSxVQUNJQyxnQkFBZ0IsS0FBS2pELE9BQUwsQ0FBYWtELFFBQWIsRUFEcEI7O0FBR0EsVUFBSUQsYUFBSixFQUFtQjtBQUNqQixhQUFLakQsT0FBTCxDQUFhbUQsWUFBYjs7QUFFQUgsa0JBQVUsSUFBVjtBQUNELE9BSkQsTUFJTztBQUNMLFlBQUlJLDZCQUE2QixLQUFLcEQsT0FBTCxDQUFhcUQsYUFBYixDQUEyQixVQUFTakMsU0FBVCxFQUFvQjtBQUM5RSxpQkFBT0EsVUFBVStCLFlBQVYsRUFBUDtBQUNELFNBRmdDLENBQWpDOztBQUlBSCxrQkFBVUksMEJBQVY7QUFDRDs7QUFFRCxhQUFPSixPQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQUlNLE1BQUo7QUFBQSxVQUNJTCxnQkFBZ0IsS0FBS2pELE9BQUwsQ0FBYWtELFFBQWIsRUFEcEI7O0FBR0EsVUFBSUQsYUFBSixFQUFtQjtBQUNqQkssaUJBQVNMLGFBQVQ7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJTSxzQkFBc0IsS0FBS3ZELE9BQUwsQ0FBYXFELGFBQWIsQ0FBMkIsVUFBU2pDLFNBQVQsRUFBb0I7QUFDdkUsaUJBQU9BLFVBQVU4QixRQUFWLEVBQVA7QUFDRCxTQUZ5QixDQUExQjs7QUFJQUksaUJBQVNDLG1CQUFUO0FBQ0Q7O0FBRUQsYUFBT0QsTUFBUDtBQUNEOzs7Z0NBRVdFLEUsRUFBSTtBQUFFLFdBQUt4RCxPQUFMLENBQWFlLFdBQWIsQ0FBeUJ5QyxFQUF6QjtBQUErQjs7O3FDQUVoQ0EsRSxFQUFJO0FBQUUsV0FBS3hELE9BQUwsQ0FBYW1CLGdCQUFiLENBQThCcUMsRUFBOUI7QUFBb0M7OztrQ0FFN0NBLEUsRUFBSTtBQUFFLFdBQUt4RCxPQUFMLENBQWFxRCxhQUFiLENBQTJCRyxFQUEzQjtBQUFpQzs7O3dDQUVqQ0MsSSxFQUFNO0FBQ3hCLFVBQUkxQixnQkFBSjtBQUFBLFVBQ0lhLHVCQUF1QjdELEtBQUs2RCxvQkFBTCxDQUEwQmEsSUFBMUIsQ0FEM0I7O0FBR0EsVUFBSWIseUJBQXlCLElBQTdCLEVBQW1DO0FBQ2pDYiwyQkFBbUIsSUFBbkI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJUyxtQkFBbUIsS0FBS3hDLE9BQUwsQ0FBYXlDLFlBQWIsQ0FBMEJHLG9CQUExQixDQUF2Qjs7QUFFQSxZQUFJLENBQUNKLGdCQUFMLEVBQXVCO0FBQ3JCLGNBQUlqRCxZQUFZLElBQWhCOztBQUVBLGVBQUtTLE9BQUwsQ0FBYXNDLFlBQWIsQ0FBMEJNLG9CQUExQixFQUFnRHJELFNBQWhELEVBQTJELEtBQUtDLGdCQUFoRSxFQUFrRixLQUFLQyx3QkFBdkY7QUFDRDs7QUFFRHNDLDJCQUFtQixLQUFLL0IsT0FBTCxDQUFhMEMsaUJBQWIsQ0FBK0JFLG9CQUEvQixDQUFuQjtBQUNEOztBQUVELGFBQU9iLGdCQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBSTJCLGtCQUFrQixLQUFLMUQsT0FBTCxDQUFhMkQsa0JBQWIsRUFBdEI7O0FBRUEsVUFBSUQsb0JBQW9CLElBQXhCLEVBQThCO0FBQzVCLFlBQUlKLFNBQVMsS0FBS0osUUFBTCxFQUFiOztBQUVBLFlBQUlJLE1BQUosRUFBWTtBQUNWSSw0QkFBa0IsSUFBbEI7QUFDRDtBQUNGOztBQUVELGFBQU9BLGVBQVA7QUFDRDs7O2lEQUU0QnJELEssRUFBTztBQUNsQyxVQUFJdUQscUNBQXFDLElBQXpDO0FBQUEsVUFDSS9CLDRCQUE0QixLQUFLZ0Msa0JBQUwsQ0FBd0J4RCxLQUF4QixDQURoQzs7QUFHQSxVQUFJd0IseUJBQUosRUFBK0I7QUFDN0IrQiw2Q0FBcUMsS0FBSzVELE9BQUwsQ0FBYThELDRCQUFiLENBQTBDekQsS0FBMUMsQ0FBckM7O0FBRUEsWUFBSXVELHVDQUF1QyxJQUEzQyxFQUFpRDtBQUMvQ0EsK0NBQXFDLElBQXJDO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPQSxrQ0FBUDtBQUNEOzs7OENBRXlCckUsUyxFQUFXO0FBQ25DQSxrQkFDRSxLQUFLd0UsUUFBTCxDQUFjLFdBQWQsQ0FERixHQUVJLEtBQUtDLFdBQUwsQ0FBaUIsV0FBakIsQ0FGSjtBQUdEOzs7eUNBRW9CO0FBQ25CLFdBQUtuRSxZQUFMLENBQWtCb0UsTUFBbEI7QUFDRDs7OzBCQUVZM0UsSSxFQUFNQyxTLEVBQVdDLGdCLEVBQWtCQyx3QixFQUEwQjtBQUN4RSxVQUFJMkIsWUFBWXRDLFFBQVFvRixLQUFSLENBQWM5RSxTQUFkLEVBQXlCLFlBQXpCLEVBQXVDRSxJQUF2QyxFQUE2Q0MsU0FBN0MsRUFBd0RDLGdCQUF4RCxFQUEwRUMsd0JBQTFFLENBQWhCOztBQUVBMkIsZ0JBQVUrQyxlQUFWLENBQTBCLElBQTFCOztBQUVBLGFBQU8vQyxTQUFQO0FBQ0Q7Ozs7RUF6UXFCakMsYzs7QUE0UXhCaUYsT0FBT0MsT0FBUCxHQUFpQmpGLFNBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsJyksXG4gICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgVG9nZ2xlQnV0dG9uID0gcmVxdWlyZSgnLi4vdG9nZ2xlQnV0dG9uJyksXG4gICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5kcmFnRXZlbnRIYW5kbGVyID0gZHJhZ0V2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyID0gYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyO1xuXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBuZXcgVG9nZ2xlQnV0dG9uKHRoaXMsIHRoaXMudG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlci5iaW5kKHRoaXMpICk7XG5cbiAgICB0aGlzLmVudHJpZXMgPSBuZXcgRW50cmllcyh0aGlzLCBEaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgIWNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmV4cGFuZCgpIDpcbiAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldERyYWdnaW5nQm91bmRzKCkge1xuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICB2YXIgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dpbmdCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgb3ZlcmxhcHBpbmc7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJhZ2dpbmdCb3VuZHMgPSBlbnRyeS5nZXREcmFnZ2luZ0JvdW5kcygpLFxuICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyhkcmFnZ2luZ0JvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmcgPSBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZztcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkgeyByZXR1cm4gdGhpcy50b2dnbGVCdXR0b24uaXNDb2xsYXBzZWQoKTsgfVxuXG4gIGV4cGFuZCgpIHsgdGhpcy50b2dnbGVCdXR0b24uZXhwYW5kKCk7IH1cblxuICBjb2xsYXBzZSgpIHsgdGhpcy50b2dnbGVCdXR0b24uY29sbGFwc2UoKTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZVBhdGgsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGNvbGxhcHNlZCA/IFxuICAgICAgICAgIGRpcmVjdG9yeS5jb2xsYXBzZSgpIDogXG4gICAgICAgICAgICBkaXJlY3RvcnkuZXhwYW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByZW1vdmVkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHJlbW92ZWQgPSBzb21lRGlyZWN0b3J5TWFya2VyUmVtb3ZlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VkLFxuICAgICAgICBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IGVudHJpZXNNYXJrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb21lRGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnkuaXNNYXJrZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBzb21lRGlyZWN0b3J5TWFya2VkO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNiKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2IpOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYik7IH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5KHBhdGgpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcykge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvblVwZGF0ZUhhbmRsZXIoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID8gXG4gICAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IFxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi50b2dnbGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG5cbiAgICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==