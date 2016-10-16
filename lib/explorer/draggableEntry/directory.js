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
  }]);

  return Directory;
}(DraggableEntry);

Directory.clone = function (name, collapsed, dragEventHandler, activateFileEventHandler) {
  var directory = Element.clone(Directory, '#directory', name, collapsed, dragEventHandler, activateFileEventHandler);

  directory.removeAttribute('id');

  return directory;
};

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ1dGlsIiwiRW50cnkiLCJFbnRyaWVzIiwiVG9nZ2xlQnV0dG9uIiwiRHJhZ2dhYmxlRW50cnkiLCJEaXJlY3RvcnkiLCJzZWxlY3RvciIsIm5hbWUiLCJjb2xsYXBzZWQiLCJkcmFnRXZlbnRIYW5kbGVyIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwidHlwZSIsInR5cGVzIiwiRElSRUNUT1JZIiwidG9nZ2xlQnV0dG9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImJpbmQiLCJlbnRyaWVzIiwiZXhwYW5kIiwiY29sbGFwc2UiLCJlbnRyeSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImJlZm9yZSIsImxvY2FsZUNvbXBhcmUiLCJzdWJFbnRyaWVzIiwiZm9yRWFjaEZpbGUiLCJmaWxlIiwic3ViRW50cnkiLCJwdXNoIiwiZm9yRWFjaERpcmVjdG9yeSIsImRpcmVjdG9yeSIsImRpcmVjdG9yeVN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiY29uY2F0IiwiaXNDb2xsYXBzZWQiLCJib3VuZHMiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwiZmlsZVBhdGgiLCJyZWFkT25seSIsInRvcG1vc3REaXJlY3RvcnkiLCJhZGRUb3Btb3N0RGlyZWN0b3J5IiwiZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRGlyZWN0b3J5IiwiZGlyZWN0b3J5TmFtZSIsImhhc0RpcmVjdG9yeSIsInJldHJpZXZlRGlyZWN0b3J5IiwibWFya2VyUGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyTmFtZSIsImFkZE1hcmtlciIsIm1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJoYXNNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJzb21lRGlyZWN0b3J5IiwiY2IiLCJwYXRoIiwiZW50cmllc0hhc0RpcmVjdG9yeSIsImRpcmVjdG9yeUhhdmluZ01hcmtlciIsImdldERpcmVjdG9yeUhhdmluZ01hcmtlciIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwiaXNPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxZQUFSLENBQVg7QUFBQSxJQUNJRyxRQUFRSCxRQUFRLFVBQVIsQ0FEWjtBQUFBLElBRUlJLFVBQVVKLFFBQVEsWUFBUixDQUZkO0FBQUEsSUFHSUssZUFBZUwsUUFBUSxpQkFBUixDQUhuQjtBQUFBLElBSUlNLGlCQUFpQk4sUUFBUSxtQkFBUixDQUpyQjs7SUFNTU8sUzs7O0FBQ0oscUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxTQUE1QixFQUF1Q0MsZ0JBQXZDLEVBQXlEQyx3QkFBekQsRUFBbUY7QUFBQTs7QUFDakYsUUFBSUMsT0FBT1YsTUFBTVcsS0FBTixDQUFZQyxTQUF2Qjs7QUFEaUYsc0hBRzNFUCxRQUgyRSxFQUdqRUMsSUFIaUUsRUFHM0RJLElBSDJELEVBR3JERixnQkFIcUQ7O0FBS2pGLFVBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7O0FBRUEsVUFBS0Msd0JBQUwsR0FBZ0NBLHdCQUFoQzs7QUFFQSxVQUFLSSxZQUFMLEdBQW9CLElBQUlYLFlBQUosUUFBdUIsVUFBU0ssU0FBVCxFQUFvQjtBQUFFQSxrQkFBWSxLQUFLTyxRQUFMLENBQWMsV0FBZCxDQUFaLEdBQXlDLEtBQUtDLFdBQUwsQ0FBaUIsV0FBakIsQ0FBekM7QUFBeUUsS0FBL0YsQ0FBZ0dDLElBQWhHLE9BQXZCLENBQXBCOztBQUVBLFVBQUtDLE9BQUwsR0FBZSxJQUFJaEIsT0FBSixRQUFrQkcsU0FBbEIsQ0FBZjs7QUFFQSxLQUFDRyxTQUFELEdBQ0UsTUFBS1csTUFBTCxFQURGLEdBRUksTUFBS0MsUUFBTCxFQUZKO0FBYmlGO0FBZ0JsRjs7OztrQ0FFYTtBQUNaLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLFlBQVlELE1BQU1FLE9BQU4sRUFBaEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtyQixNQUFNVyxLQUFOLENBQVlZLElBQWpCO0FBQ0EsYUFBS3ZCLE1BQU1XLEtBQU4sQ0FBWWEsTUFBakI7O0FBRUUsaUJBQU8sSUFBUDs7QUFFRixhQUFLeEIsTUFBTVcsS0FBTixDQUFZQyxTQUFqQjs7QUFFRSxjQUFJTixPQUFPLEtBQUttQixPQUFMLEVBQVg7QUFBQSxjQUNJQyxZQUFZTixNQUFNSyxPQUFOLEVBRGhCO0FBQUEsY0FFSUUsU0FBU3JCLEtBQUtzQixhQUFMLENBQW1CRixTQUFuQixJQUFnQyxDQUY3Qzs7QUFJQSxpQkFBT0MsTUFBUDtBQVpKO0FBY0Q7OztvQ0FFZTtBQUNkLFVBQUlFLGFBQWEsRUFBakI7O0FBRUEsV0FBS0MsV0FBTCxDQUFpQixVQUFTQyxJQUFULEVBQWU7QUFDOUIsWUFBSUMsV0FBV0QsSUFBZixDQUQ4QixDQUNUOztBQUVyQkYsbUJBQVdJLElBQVgsQ0FBZ0JELFFBQWhCO0FBQ0QsT0FKRDs7QUFNQSxXQUFLRSxnQkFBTCxDQUFzQixVQUFTQyxTQUFULEVBQW9CO0FBQ3hDLFlBQUlILFdBQVdHLFNBQWY7QUFBQSxZQUEwQjtBQUN0QkMsOEJBQXNCRCxVQUFVRSxhQUFWLEVBRDFCOztBQUdBUixtQkFBV0ksSUFBWCxDQUFnQkQsUUFBaEI7O0FBRUFILHFCQUFhQSxXQUFXUyxNQUFYLENBQWtCRixtQkFBbEIsQ0FBYjtBQUNELE9BUEQ7O0FBU0EsYUFBT1AsVUFBUDtBQUNEOzs7d0NBRW1CO0FBQ2xCLFVBQUl0QixZQUFZLEtBQUtnQyxXQUFMLEVBQWhCOztBQUVBLFdBQUtwQixRQUFMOztBQUVBLFVBQUlxQix3SEFBSjtBQUFBLFVBQ0lDLGlCQUFpQkQsTUFEckI7O0FBR0EsVUFBSSxDQUFDakMsU0FBTCxFQUFnQjtBQUNkLGFBQUtXLE1BQUw7QUFDRDs7QUFFRCxhQUFPdUIsY0FBUDtBQUNEOzs7dUNBRWtCckIsSyxFQUFPO0FBQ3hCLFVBQUksU0FBU0EsS0FBYixFQUFvQjtBQUNsQixlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFJYixZQUFZLEtBQUtnQyxXQUFMLEVBQWhCOztBQUVBLFVBQUloQyxTQUFKLEVBQWU7QUFDYixlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFJa0MsaUJBQWlCckIsTUFBTXNCLGlCQUFOLEVBQXJCOztBQUVBLCtJQUF5Q0QsY0FBekM7QUFDRDs7O2tDQUVhO0FBQUUsYUFBTyxLQUFLNUIsWUFBTCxDQUFrQjBCLFdBQWxCLEVBQVA7QUFBeUM7Ozs2QkFFaEQ7QUFBRSxXQUFLMUIsWUFBTCxDQUFrQkssTUFBbEI7QUFBNkI7OzsrQkFFN0I7QUFBRSxXQUFLTCxZQUFMLENBQWtCTSxRQUFsQjtBQUErQjs7OzRCQUVwQ3dCLFEsRUFBVUMsUSxFQUFVO0FBQzFCLFVBQUlDLG1CQUFtQixLQUFLQyxtQkFBTCxDQUF5QkgsUUFBekIsQ0FBdkI7O0FBRUEsVUFBSUUscUJBQXFCLElBQXpCLEVBQStCO0FBQzdCLFlBQUlFLHNDQUFzQ2hELEtBQUtpRCwrQkFBTCxDQUFxQ0wsUUFBckMsQ0FBMUM7O0FBRUFFLHlCQUFpQkksT0FBakIsQ0FBeUJGLG1DQUF6QixFQUE4REgsUUFBOUQ7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLM0IsT0FBTCxDQUFhZ0MsT0FBYixDQUFxQk4sUUFBckIsRUFBK0JDLFFBQS9CLEVBQXlDLEtBQUtwQyxnQkFBOUMsRUFBZ0UsS0FBS0Msd0JBQXJFO0FBQ0Q7QUFDRjs7O2lDQUVZeUMsYSxFQUFlM0MsUyxFQUFXO0FBQ3JDLFVBQUlzQyxtQkFBbUIsS0FBS0MsbUJBQUwsQ0FBeUJJLGFBQXpCLENBQXZCOztBQUVBLFVBQUlMLHFCQUFxQixJQUF6QixFQUErQjtBQUM3QixZQUFJTSwyQ0FBMkNwRCxLQUFLaUQsK0JBQUwsQ0FBcUNFLGFBQXJDLENBQS9DOztBQUVBTCx5QkFBaUJPLFlBQWpCLENBQThCRCx3Q0FBOUIsRUFBd0U1QyxTQUF4RTtBQUNELE9BSkQsTUFJTztBQUNMLFlBQUk4QyxnQkFBZ0JILGFBQXBCLENBREssQ0FDK0I7O0FBRXBDLFlBQUksQ0FBQyxLQUFLakMsT0FBTCxDQUFhcUMsWUFBYixDQUEwQkQsYUFBMUIsQ0FBTCxFQUErQztBQUM3QyxlQUFLcEMsT0FBTCxDQUFhbUMsWUFBYixDQUEwQkMsYUFBMUIsRUFBeUM5QyxTQUF6QyxFQUFvRCxLQUFLQyxnQkFBekQsRUFBMkUsS0FBS0Msd0JBQWhGO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSTBCLFlBQVksS0FBS2xCLE9BQUwsQ0FBYXNDLGlCQUFiLENBQStCRixhQUEvQixDQUFoQjs7QUFFQTlDLHNCQUFZNEIsVUFBVWhCLFFBQVYsRUFBWixHQUFtQ2dCLFVBQVVqQixNQUFWLEVBQW5DO0FBQ0Q7QUFDRjtBQUNGOzs7OEJBRVNzQyxVLEVBQVluQyxTLEVBQVc7QUFDL0IsVUFBSW9DLHVCQUF1QjFELEtBQUswRCxvQkFBTCxDQUEwQkQsVUFBMUIsQ0FBM0I7O0FBRUEsVUFBSUMseUJBQXlCLElBQTdCLEVBQW1DO0FBQ2pDLFlBQUlDLGFBQWFGLFVBQWpCLENBRGlDLENBQ0g7O0FBRTlCLGFBQUt2QyxPQUFMLENBQWEwQyxTQUFiLENBQXVCRCxVQUF2QixFQUFtQ3JDLFNBQW5DO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSXdCLG1CQUFtQixLQUFLNUIsT0FBTCxDQUFhc0MsaUJBQWIsQ0FBK0JFLG9CQUEvQixDQUF2QjtBQUFBLFlBQ0lHLHdDQUF3QzdELEtBQUtpRCwrQkFBTCxDQUFxQ1EsVUFBckMsQ0FENUM7O0FBR0FYLHlCQUFpQmMsU0FBakIsQ0FBMkJDLHFDQUEzQixFQUFrRXZDLFNBQWxFO0FBQ0Q7QUFDRjs7O21DQUVjO0FBQ2IsVUFBSSxLQUFLSixPQUFMLENBQWE0QyxTQUFiLEVBQUosRUFBOEI7QUFDNUIsYUFBSzVDLE9BQUwsQ0FBYTZDLFlBQWI7O0FBRUEsZUFBTyxJQUFQO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsZUFBTyxLQUFLN0MsT0FBTCxDQUFhOEMsYUFBYixDQUEyQixVQUFTNUIsU0FBVCxFQUFvQjtBQUNwRCxpQkFBT0EsVUFBVTJCLFlBQVYsRUFBUDtBQUNELFNBRk0sQ0FBUDtBQUdEO0FBQ0Y7OztnQ0FFVztBQUNWLFVBQUksS0FBSzdDLE9BQUwsQ0FBYTRDLFNBQWIsRUFBSixFQUE4QjtBQUM1QixlQUFPLElBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEtBQUs1QyxPQUFMLENBQWE4QyxhQUFiLENBQTJCLFVBQVM1QixTQUFULEVBQW9CO0FBQ3BELGlCQUFPQSxVQUFVMEIsU0FBVixFQUFQO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7QUFDRjs7O2dDQUVXRyxFLEVBQUk7QUFBRSxXQUFLL0MsT0FBTCxDQUFhYSxXQUFiLENBQXlCa0MsRUFBekI7QUFBK0I7OztxQ0FFaENBLEUsRUFBSTtBQUFFLFdBQUsvQyxPQUFMLENBQWFpQixnQkFBYixDQUE4QjhCLEVBQTlCO0FBQW9DOzs7a0NBRTdDQSxFLEVBQUk7QUFBRSxXQUFLL0MsT0FBTCxDQUFhOEMsYUFBYixDQUEyQkMsRUFBM0I7QUFBaUM7Ozt3Q0FFakNDLEksRUFBTTtBQUN4QixVQUFJUix1QkFBdUIxRCxLQUFLMEQsb0JBQUwsQ0FBMEJRLElBQTFCLENBQTNCOztBQUVBLFVBQUlSLHlCQUF5QixJQUE3QixFQUFtQztBQUNqQyxlQUFPLElBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJUyxzQkFBc0IsS0FBS2pELE9BQUwsQ0FBYXFDLFlBQWIsQ0FBMEJHLG9CQUExQixDQUExQjs7QUFFQSxZQUFJLENBQUNTLG1CQUFMLEVBQTBCO0FBQ3hCLGNBQUkzRCxZQUFZLElBQWhCOztBQUVBLGVBQUtVLE9BQUwsQ0FBYW1DLFlBQWIsQ0FBMEJLLG9CQUExQixFQUFnRGxELFNBQWhELEVBQTJELEtBQUtDLGdCQUFoRSxFQUFrRixLQUFLQyx3QkFBdkY7QUFDRDs7QUFFRCxZQUFJb0MsbUJBQW1CLEtBQUs1QixPQUFMLENBQWFzQyxpQkFBYixDQUErQkUsb0JBQS9CLENBQXZCOztBQUVBLGVBQU9aLGdCQUFQO0FBQ0Q7QUFDRjs7OytDQUUwQjtBQUN6QixVQUFJc0Isd0JBQXdCLEtBQUtsRCxPQUFMLENBQWFtRCx3QkFBYixFQUE1Qjs7QUFFQSxVQUFJRCwwQkFBMEIsSUFBOUIsRUFBb0M7QUFDbEMsWUFBSSxLQUFLTixTQUFMLEVBQUosRUFBc0I7QUFDcEJNLGtDQUF3QixJQUF4QjtBQUNEO0FBQ0Y7O0FBRUQsYUFBT0EscUJBQVA7QUFDRDs7O2lEQUU0Qi9DLEssRUFBTztBQUNsQyxVQUFJaUQscUNBQXFDLElBQXpDO0FBQUEsVUFDSUMsNEJBQTRCLEtBQUtDLGtCQUFMLENBQXdCbkQsS0FBeEIsQ0FEaEM7O0FBR0EsVUFBSWtELHlCQUFKLEVBQStCO0FBQzdCRCw2Q0FBcUMsS0FBS3BELE9BQUwsQ0FBYXVELDRCQUFiLENBQTBDcEQsS0FBMUMsQ0FBckM7O0FBRUEsWUFBSWlELHVDQUF1QyxJQUEzQyxFQUFpRDtBQUMvQ0EsK0NBQXFDLElBQXJDO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPQSxrQ0FBUDtBQUNEOzs7O0VBNU5xQmxFLGM7O0FBK054QkMsVUFBVXFFLEtBQVYsR0FBa0IsVUFBU25FLElBQVQsRUFBZUMsU0FBZixFQUEwQkMsZ0JBQTFCLEVBQTRDQyx3QkFBNUMsRUFBc0U7QUFDdEYsTUFBSTBCLFlBQVlyQyxRQUFRMkUsS0FBUixDQUFjckUsU0FBZCxFQUF5QixZQUF6QixFQUF1Q0UsSUFBdkMsRUFBNkNDLFNBQTdDLEVBQXdEQyxnQkFBeEQsRUFBMEVDLHdCQUExRSxDQUFoQjs7QUFFQTBCLFlBQVV1QyxlQUFWLENBQTBCLElBQTFCOztBQUVBLFNBQU92QyxTQUFQO0FBQ0QsQ0FORDs7QUFRQXdDLE9BQU9DLE9BQVAsR0FBaUJ4RSxTQUFqQiIsImZpbGUiOiJkaXJlY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlLCBkcmFnRXZlbnRIYW5kbGVyKTtcblxuICAgIHRoaXMuZHJhZ0V2ZW50SGFuZGxlciA9IGRyYWdFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gbmV3IFRvZ2dsZUJ1dHRvbih0aGlzLCBmdW5jdGlvbihjb2xsYXBzZWQpIHsgY29sbGFwc2VkID8gdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJykgOiB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTsgfS5iaW5kKHRoaXMpICk7XG5cbiAgICB0aGlzLmVudHJpZXMgPSBuZXcgRW50cmllcyh0aGlzLCBEaXJlY3RvcnkpO1xuXG4gICAgIWNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmV4cGFuZCgpIDpcbiAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgdmFyIHN1YkVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICB2YXIgc3ViRW50cnkgPSBkaXJlY3RvcnksIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldERyYWdnaW5nQm91bmRzKCkge1xuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICB2YXIgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgIGRyYWdnaW5nQm91bmRzID0gYm91bmRzO1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnaW5nQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgaWYgKHRoaXMgPT09IGVudHJ5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHZhciBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGRyYWdnaW5nQm91bmRzID0gZW50cnkuZ2V0RHJhZ2dpbmdCb3VuZHMoKTtcblxuICAgIHJldHVybiBzdXBlci5pc092ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMoZHJhZ2dpbmdCb3VuZHMpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCByZWFkT25seSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgaWYgKCF0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgY29sbGFwc2VkID8gZGlyZWN0b3J5LmNvbGxhcHNlKCkgOiBkaXJlY3RvcnkuZXhwYW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaEZpbGUoY2IpOyB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeShjYik7IH1cblxuICBzb21lRGlyZWN0b3J5KGNiKSB7IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGNiKTsgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZW50cmllc0hhc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNIYXNEaXJlY3RvcnkpIHtcbiAgICAgICAgdmFyIGNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgICB9XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgIGlmIChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmhhc01hcmtlcigpKSB7XG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IG51bGwsXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSB0aGlzLmlzT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcykge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHM7XG4gIH1cbn1cblxuRGlyZWN0b3J5LmNsb25lID0gZnVuY3Rpb24obmFtZSwgY29sbGFwc2VkLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgdmFyIGRpcmVjdG9yeSA9IEVsZW1lbnQuY2xvbmUoRGlyZWN0b3J5LCAnI2RpcmVjdG9yeScsIG5hbWUsIGNvbGxhcHNlZCwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICBkaXJlY3RvcnkucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3Rvcnk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiJdfQ==