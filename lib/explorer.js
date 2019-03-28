'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    DropTarget = require('./dropTarget'),
    entryTypes = require('./entryTypes'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName'),
    TopmostDirectoryNameDraggableEntry = require('./entry/draggable/directoryName/topmost');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    Element = easy.Element,
    React = easy.React,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    isPathTopmostDirectoryName = pathUtilities.isPathTopmostDirectoryName,
    pathWithoutBottommostNameFromPath = pathUtilities.pathWithoutBottommostNameFromPath;

var Explorer = function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  function Explorer(selector, moveHandler) {
    var openHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (sourcePath) {};
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    _this.openHandler = openHandler;

    _this.options = options;
    return _this;
  }

  _createClass(Explorer, [{
    key: 'setOption',
    value: function setOption(option) {
      this.options[option] = true;
    }
  }, {
    key: 'unsetOption',
    value: function unsetOption(option) {
      delete this.options[option];
    }
  }, {
    key: 'isOptionPresent',
    value: function isOptionPresent(option) {
      var optionPresent = this.options[option] === true;

      return optionPresent;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var topmostDirectoryNameDraggableEntryMarked = this.isTopmostDirectoryNameDraggableEntryMarked();

      if (topmostDirectoryNameDraggableEntryMarked) {
        marked = true;
      } else {
        var topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

        marked = topmostDirectoryNameMarkerEntry !== null;
      }

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryNameDraggableEntryOverlappingDraggableEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'getFilePaths',
    value: function getFilePaths() {
      var filePaths = this.retrieveFilePaths();

      return filePaths;
    }
  }, {
    key: 'getDirectoryPaths',
    value: function getDirectoryPaths() {
      var directoryPaths = this.retrieveDirectoryPaths();

      return directoryPaths;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryNameDraggableEntryOverlappingDraggableEntry.getPath(),
          markerEntryPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
    }
  }, {
    key: 'addMarkerEntryInPlace',
    value: function addMarkerEntryInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarkerEntry(topmostDirectoryMarkerPath);
      } else {
        var markerEntryPath = draggableEntryPath;

        this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarkerEntry',
    value: function addTopmostDirectoryMarkerEntry(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryNameMarkerEntry = React.createElement(DirectoryNameMarkerEntry, { name: name });

      this.append(topmostDirectoryNameMarkerEntry);
    }
  }, {
    key: 'findTopmostDirectoryNameMarkerEntry',
    value: function findTopmostDirectoryNameMarkerEntry() {
      var topmostDirectoryNameMarkerEntry = null;

      var childDirectoryNameMarkerEntryListItemElements = this.getChildElements('li.directoryName marker entry'),
          childDirectoryNameMarkerEntryListItemElementsLength = childDirectoryNameMarkerEntryListItemElements.length;

      if (childDirectoryNameMarkerEntryListItemElementsLength === 1) {
        var firstChildDirectoryNameMarkerEntryListItemElement = first(childDirectoryNameMarkerEntryListItemElements);

        topmostDirectoryNameMarkerEntry = firstChildDirectoryNameMarkerEntryListItemElement; ///
      }

      return topmostDirectoryNameMarkerEntry;
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var topmostDirectoryNameDraggableEntryMarked = this.isTopmostDirectoryNameDraggableEntryMarked();

      if (topmostDirectoryNameDraggableEntryMarked) {
        this.removeTopmostDirectoryNameDraggableEntryMarkerEntry();
      } else {
        var topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

        topmostDirectoryNameMarkerEntry.remove();
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        this.addMarkerEntryInPlace(draggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableEntry, done) {
      var draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDropTarget = marked ? this : this.getMarkedDropTarget(),
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName; ///

      var targetPath = null,
          duplicate = false;

      if (markedDirectoryNameDraggableEntry !== null) {
        var draggableEntryName = draggableEntry.getName(),
            name = draggableEntryName,
            ///
        draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);

        if (draggableEntryPresent) {
          duplicate = true;
        } else {
          var markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry.getPath();

          targetPath = markedDirectoryNameDraggableEntryPath; ///
        }
      }

      var unmoved = sourcePath === targetPath;

      if (duplicate || unmoved) {
        markedDropTarget.removeMarkerEntry();

        done();
      } else {
        var draggableEntrySubEntries = draggableEntry.retrieveSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);

        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.removeMarkerEntry();

          done();
        });
      }
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var directoryNameDraggableEntryOverlappingDraggableEntry = void 0;

        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var within = explorer === this,
              ///
          noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithinOptionPresent;

          if (!noDragging) {
            var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry();

            directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectoryNameDraggableEntry !== directoryNameDraggableEntryOverlappingDraggableEntry) {
              this.removeMarkerEntry();

              this.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
            }
          }
        } else {
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            directoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerEntryInPlace(draggableEntry);
          }

          this.removeMarkerEntry();
        }
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.dragging(draggableEntry, explorer);
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.removeMarkerEntryGlobally();
    }
  }, {
    key: 'moveFileNameDraggableEntry',
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;

      var explorer = fileNameDraggableEntry.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {} else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);

        filePath = targetFilePath; ///

        fileNameDraggableEntry = this.addFilePath(filePath);

        draggableEntry = fileNameDraggableEntry; ///
      }

      return draggableEntry;
    }
  }, {
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;

      var explorer = directoryNameDraggableEntry.getExplorer();

      var directoryPath = void 0;

      if (targetDirectoryPath === sourceDirectoryPath) {} else if (targetDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);

        directoryPath = targetDirectoryPath; ///

        var collapsed = directoryNameDraggableEntry.isCollapsed();

        directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);

        draggableEntry = directoryNameDraggableEntry; ///
      }

      return draggableEntry;
    }
  }, {
    key: 'openFileNameDraggableEntry',
    value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
      var topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(),
          fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(topmostDirectoryNameDraggableEntry),
          filePath = fileNameDraggableEntryPath; ///

      this.openHandler(filePath);
    }
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

        return pathMap;
      });

      return pathMaps;
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var topmostDirectoryName = properties.topmostDirectoryName,
          topmostDirectoryCollapsed = properties.topmostDirectoryCollapsed,
          name = topmostDirectoryName,
          collapsed = topmostDirectoryCollapsed,
          explorer = this,
          topmostDirectory = React.createElement(TopmostDirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed });


      return topmostDirectory;
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      this.assignContext();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onMove = properties.onMove,
          onOpen = properties.onOpen,
          options = properties.options,
          moveHandler = onMove,
          openHandler = onOpen,
          explorer = Element.fromProperties(Explorer, properties, moveHandler, openHandler, options);


      explorer.initialise();

      return explorer;
    }
  }]);

  return Explorer;
}(DropTarget);

Object.assign(Explorer, {
  tagName: 'ul',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: ['onOpen', 'onMove', 'options', 'topmostDirectoryName', 'topmostDirectoryCollapsed']
});

module.exports = Explorer;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === DIRECTORY_NAME_TYPE,
      directory = draggableEntryDirectoryNameDraggableEntry; ///

  targetPath = sourcePath === null ? prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) : ///
  replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };

  return pathMap;
}

function prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) {
  draggableEntryPath = targetPath + '/' + draggableEntryPath;

  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)'); ///

  var regExp = new RegExp('^' + sourcePath + '(.*$)'),
      matches = draggableEntryPath.match(regExp),
      secondMatch = second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJEcm9wVGFyZ2V0IiwiZW50cnlUeXBlcyIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsIlRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwYXRoVXRpbGl0aWVzIiwiYXJyYXlVdGlsaXRpZXMiLCJFbGVtZW50IiwiUmVhY3QiLCJmaXJzdCIsInNlY29uZCIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsIm9wZW5IYW5kbGVyIiwic291cmNlUGF0aCIsIm9wdGlvbiIsIm9wdGlvblByZXNlbnQiLCJtYXJrZWQiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkIiwidG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJFbnRyeVBhdGgiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlckVudHJ5IiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJuYW1lIiwiYXBwZW5kIiwiY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50c0xlbmd0aCIsImxlbmd0aCIsImZpcnN0Q2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnQiLCJyZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJyZW1vdmUiLCJpc01hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsImFkZE1hcmtlckVudHJ5SW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwidGFyZ2V0UGF0aCIsImR1cGxpY2F0ZSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInVubW92ZWQiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwiZXhwbG9yZXIiLCJpc1RvQmVNYXJrZWQiLCJ3aXRoaW4iLCJub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsIm5vRHJhZ2dpbmciLCJhZGRNYXJrZXJFbnRyeSIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsInJlbW92ZU1hcmtlckVudHJ5R2xvYmFsbHkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImdldEV4cGxvcmVyIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlUGF0aCIsImFkZEZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5UGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIiwidG9wbW9zdERpcmVjdG9yeSIsImFzc2lnbkNvbnRleHQiLCJvbk1vdmUiLCJvbk9wZW4iLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsVUFBVUYsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUcsYUFBYUgsUUFBUSxjQUFSLENBRG5CO0FBQUEsSUFFTUksYUFBYUosUUFBUSxjQUFSLENBRm5CO0FBQUEsSUFHTUssMkJBQTJCTCxRQUFRLDhCQUFSLENBSGpDO0FBQUEsSUFJTU0scUNBQXFDTixRQUFRLHlDQUFSLENBSjNDOztJQU1RTyxhLEdBQWtDTixTLENBQWxDTSxhO0lBQWVDLGMsR0FBbUJQLFMsQ0FBbkJPLGM7SUFDZkMsTyxHQUFtQlYsSSxDQUFuQlUsTztJQUFTQyxLLEdBQVVYLEksQ0FBVlcsSztJQUNUQyxLLEdBQWtCSCxjLENBQWxCRyxLO0lBQU9DLE0sR0FBV0osYyxDQUFYSSxNO0lBQ1BDLGtCLEdBQXVCWCxPLENBQXZCVyxrQjtJQUNBQyxtQixHQUF3QlYsVSxDQUF4QlUsbUI7SUFDQUMsMEIsR0FBa0VSLGEsQ0FBbEVRLDBCO0lBQTRCQyxpQyxHQUFzQ1QsYSxDQUF0Q1MsaUM7O0lBRTlCQyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBd0Y7QUFBQSxRQUFyREMsV0FB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S0FBekMsRUFBZ0QsS0FBaEQsQ0FBYixDQUR1RyxDQUNqQzs7QUFFdEUsTUFBTUMsU0FBUyxJQUFJQyxNQUFKLE9BQWVwSCxVQUFmLFdBQWY7QUFBQSxNQUNNcUgsVUFBVTdGLG1CQUFtQjhGLEtBQW5CLENBQXlCSCxNQUF6QixDQURoQjtBQUFBLE1BRU1JLGNBQWNoSSxPQUFPOEgsT0FBUCxDQUZwQjs7QUFJQTdGLHVCQUFxQnVCLGFBQWF3RSxXQUFsQyxDQVB1RyxDQU94RDs7QUFFL0MsU0FBTy9GLGtCQUFQO0FBQ0QiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpLFxuICAgICAgZW50cnlUeXBlcyA9IHJlcXVpcmUoJy4vZW50cnlUeXBlcycpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpLFxuICAgICAgVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUvdG9wbW9zdCcpO1xuXG5jb25zdCB7IHBhdGhVdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBmaXJzdCwgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgTk9fRFJBR0dJTkdfV0lUSElOIH0gPSBvcHRpb25zLFxuICAgICAgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSBlbnRyeVR5cGVzLFxuICAgICAgeyBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyID0gZnVuY3Rpb24oc291cmNlUGF0aCkge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7XG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICBtYXJrZWQgPSAodG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuICAgIFxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG4gIFxuICBhZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aH0vJHtkcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyRW50cnkodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyRW50cnkodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICAgIDtcblxuICAgIHRoaXMuYXBwZW5kKHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkpO1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaS5kaXJlY3RvcnlOYW1lIG1hcmtlciBlbnRyeScpLFxuICAgICAgICAgIGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50c0xlbmd0aCA9IGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50cy5sZW5ndGg7XG5cbiAgICBpZiAoY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzTGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBmaXJzdENoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50ID0gZmlyc3QoY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IGZpcnN0Q2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnQ7ICAvLy9cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7IC8vL1xuXG4gICAgbGV0IHRhcmdldFBhdGggPSBudWxsLFxuICAgICAgICBkdXBsaWNhdGUgPSBmYWxzZTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIG5hbWUgPSBkcmFnZ2FibGVFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgICAgXG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCB3aXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gKHdpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCk7XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID1cblxuICAgICAgICAgICAgPFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gLz5cblxuICAgICAgICAgIDtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUsIG9uT3Blbiwgb3B0aW9ucyB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4sIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==