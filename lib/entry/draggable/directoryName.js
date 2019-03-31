'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var Entries = require('../../entries'),
    NameButton = require('../../nameButton'),
    entryTypes = require('../../entryTypes'),
    DraggableEntry = require('../../entry/draggable');

var Button = easy.Button,
    React = easy.React,
    pathUtilities = necessary.pathUtilities,
    topmostDirectoryNameFromPath = pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath,
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    var type = DIRECTORY_NAME_TYPE;

    return _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).call(this, selector, type, explorer));
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'getBounds', this).call(this),
          collapsedBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          before = true;

          break;

        case DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;

          break;
      }

      return before;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var markerEntryPresent = this.isMarkerEntryPresent(),
          marked = markerEntryPresent; ///

      return marked;
    }
  }, {
    key: 'isFileNameDraggableEntry',
    value: function isFileNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntry) {
      var overlappingDraggableEntry = void 0;

      if (this === draggableEntry) {
        overlappingDraggableEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingDraggableEntry = false;
        } else {
          var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'isOverlappingCollapsedBounds', this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;

      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

        if (!fileNameDraggableEntryPresent) {
          var explorer = this.getExplorer();

          fileNameDraggableEntry = this.addFileNameDraggableEntry(fileName, explorer);
        }
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var removeEmptyParentDirectoryNameDraggableEntries = null; ///

      var addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

        if (fileNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.removeFileNameDraggableEntry(fileName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var _topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry();

        if (!_topmostDirectoryNameDraggableEntry) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectoryNameDraggableEntries;
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed) {
      var directoryNameDraggableEntry = null;

      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
            entriesDirectoryNameDraggableEntryPresent = entriesDirectoryNameDraggableEntry !== null;

        if (entriesDirectoryNameDraggableEntryPresent) {
          entriesDirectoryNameDraggableEntry.setCollapsed(collapsed);
        } else {
          var explorer = this.getExplorer();

          directoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry);
        }
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var removeEmptyParentDirectoryNameDraggableEntries = false;

      var addIfNecessary = false,
          ///
      topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);

        if (entriesDirectoryNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.removeDirectoryNameDraggableEntry(directoryName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var _topmostDirectoryNameDraggableEntry2 = this.isTopmostDirectoryNameDraggableEntry();

        if (!_topmostDirectoryNameDraggableEntry2) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectoryNameDraggableEntries;
    }
  }, {
    key: 'retrieveTopmostDirectoryNameDraggableEntry',
    value: function retrieveTopmostDirectoryNameDraggableEntry(path, addIfNecessary) {
      var topmostDirectoryNameDraggableEntry = void 0;

      var topmostDirectoryName = topmostDirectoryNameFromPath(path);

      if (topmostDirectoryName === null) {
        topmostDirectoryNameDraggableEntry = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

          if (!entriesDirectoryNameDraggableEntryPresent) {
            var collapsed = true,
                ///
            explorer = this.getExplorer();

            this.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed, DirectoryNameDraggableEntry);
          }
        }

        var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
      }

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'toggleButtonClickHandler',
    value: function toggleButtonClickHandler() {
      this.toggle();
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      this.toggle();
    }
  }, {
    key: 'setCollapsed',
    value: function setCollapsed(collapsed) {
      collapsed ? this.collapse() : this.expand();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.addClass('collapsed');
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.removeClass('collapsed');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.toggleClass('collapsed');
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var name = properties.name,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);


      return [React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler }), React.createElement(
        NameButton,
        null,
        name
      ), React.createElement(Entries, null)];
    }
  }, {
    key: 'initialise',
    value: function initialise(collapsed) {
      this.setCollapsed(collapsed);

      _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'initialise', this).call(this);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          _properties$collapsed = _properties.collapsed,
          collapsed = _properties$collapsed === undefined ? false : _properties$collapsed,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);


      directoryNameDraggableEntry.initialise(collapsed);

      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directory-name'
  },
  ignoredProperties: ['collapsed']
});

module.exports = DirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIkVudHJpZXMiLCJOYW1lQnV0dG9uIiwiZW50cnlUeXBlcyIsIkRyYWdnYWJsZUVudHJ5IiwiQnV0dG9uIiwiUmVhY3QiLCJwYXRoVXRpbGl0aWVzIiwidG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCIsIkZJTEVfTkFNRV9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkZJTEVfTkFNRV9NQVJLRVJfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJleHBsb3JlciIsInR5cGUiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZXhwYW5kIiwiaGFzQ2xhc3MiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImxvY2FsZUNvbXBhcmUiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJpc01hcmtlckVudHJ5UHJlc2VudCIsIm1hcmtlZCIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImZpbGVQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImFkZElmTmVjZXNzYXJ5IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWRkRmlsZVBhdGgiLCJmaWxlTmFtZSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsImdldEV4cGxvcmVyIiwiYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMiLCJyZW1vdmVGaWxlUGF0aCIsInJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbXB0eSIsImlzRW1wdHkiLCJyZW1vdmUiLCJkaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFkZERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCIsInNldENvbGxhcHNlZCIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJyZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b2dnbGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJwcm9wZXJ0aWVzIiwidG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyIiwiYmluZCIsIkNsYXNzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxVQUFVRixRQUFRLGVBQVIsQ0FBaEI7QUFBQSxJQUNNRyxhQUFhSCxRQUFRLGtCQUFSLENBRG5CO0FBQUEsSUFFTUksYUFBYUosUUFBUSxrQkFBUixDQUZuQjtBQUFBLElBR01LLGlCQUFpQkwsUUFBUSx1QkFBUixDQUh2Qjs7SUFLUU0sTSxHQUFrQlAsSSxDQUFsQk8sTTtJQUFRQyxLLEdBQVVSLEksQ0FBVlEsSztJQUNSQyxhLEdBQWtCUCxTLENBQWxCTyxhO0lBQ0FDLDRCLEdBQTBFRCxhLENBQTFFQyw0QjtJQUE4QkMsdUMsR0FBNENGLGEsQ0FBNUNFLHVDO0lBQzlCQyxjLEdBQTJGUCxVLENBQTNGTyxjO0lBQWdCQyxtQixHQUEyRVIsVSxDQUEzRVEsbUI7SUFBcUJDLHFCLEdBQXNEVCxVLENBQXREUyxxQjtJQUF1QkMsMEIsR0FBK0JWLFUsQ0FBL0JVLDBCOztJQUU5REMsMkI7OztBQUNKLHVDQUFZQyxRQUFaLEVBQXNCQyxRQUF0QixFQUFnQztBQUFBOztBQUM5QixRQUFNQyxPQUFPTixtQkFBYjs7QUFEOEIscUpBR3hCSSxRQUh3QixFQUdkRSxJQUhjLEVBR1JELFFBSFE7QUFJL0I7Ozs7eUNBRW9CO0FBQ25CLFVBQU1FLFlBQVksS0FBS0MsV0FBTCxFQUFsQjs7QUFFQSxXQUFLQyxRQUFMOztBQUVBLFVBQU1DLDRKQUFOO0FBQUEsVUFDTUMsa0JBQWtCRCxNQUR4QixDQUxtQixDQU1jOztBQUVqQyxVQUFJLENBQUNILFNBQUwsRUFBZ0I7QUFDZCxhQUFLSyxNQUFMO0FBQ0Q7O0FBRUQsYUFBT0QsZUFBUDtB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QUNBQSxnQkFBUXBFLDJCQUFSO0FBQ0Q7O0FBSnNDLHdCQU1UaUUsVUFOUztBQUFBLDhDQU0vQjdELFNBTitCO0FBQUEsVUFNL0JBLFNBTitCLHlDQU1uQixLQU5tQjtBQUFBLFVBT2pDMkMsMkJBUGlDLEdBT0h6RCxlQUFlaUYsY0FBZixDQUE4QkgsS0FBOUIsRUFBcUNILFVBQXJDLENBUEc7OztBQVN2Q2xCLGtDQUE0QnlCLFVBQTVCLENBQXVDcEUsU0FBdkM7O0FBRUEsYUFBTzJDLDJCQUFQO0FBQ0Q7Ozs7RUFwU3VDekQsYzs7QUF1UzFDbUYsT0FBT0MsTUFBUCxDQUFjMUUsMkJBQWQsRUFBMkM7QUFDekMyRSxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQURzQjtBQUl6Q0MscUJBQW1CLENBQ2pCLFdBRGlCO0FBSnNCLENBQTNDOztBQVNBQyxPQUFPQyxPQUFQLEdBQWlCL0UsMkJBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRW50cmllcyA9IHJlcXVpcmUoJy4uLy4uL2VudHJpZXMnKSxcbiAgICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuLi8uLi9uYW1lQnV0dG9uJyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi4vLi4vZW50cnlUeXBlcycpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9kcmFnZ2FibGUnKTtcblxuY29uc3QgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IGVudHJ5VHlwZXM7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeVByZXNlbnQgPSB0aGlzLmlzTWFya2VyRW50cnlQcmVzZW50KCksXG4gICAgICAgICAgbWFya2VkID0gbWFya2VyRW50cnlQcmVzZW50OyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IG51bGw7IC8vL1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gZmFsc2U7XG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLCAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRoaXMucmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG4gIFxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICBjb25zdCBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZSwgLy8vXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID9cbiAgICAgIHRoaXMuY29sbGFwc2UoKSA6XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwidG9nZ2xlXCIgb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPixcbiAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj4sXG4gICAgICA8RW50cmllcyAvPlxuXG4gICAgXSk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY29sbGFwc2VkKSB7XG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcblxuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoY29sbGFwc2VkKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnktbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnY29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=