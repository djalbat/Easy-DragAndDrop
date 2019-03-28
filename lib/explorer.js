'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    Entries = require('./entries'),
    DropTarget = require('./dropTarget'),
    entryTypes = require('./entryTypes'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName'),
    DirectoryNameDraggableEntry = require('./entry/draggable/directoryName');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    Element = easy.Element,
    React = easy.React,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    isPathTopmostDirectoryName = pathUtilities.isPathTopmostDirectoryName,
    topmostDirectoryNameFromPath = pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutBottommostNameFromPath = pathUtilities.pathWithoutBottommostNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

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
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(filePath);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        filePath = filePathWithoutTopmostDirectoryName; ///

        topmostDirectoryNameDraggableEntry.addFilePath(filePath);
      }
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(filePath);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        filePath = filePathWithoutTopmostDirectoryName; ///

        topmostDirectoryNameDraggableEntry.removeFilePath(filePath);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(directoryPath);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPath, collapsed);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(directoryPath);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPath);
      }
    }
  }, {
    key: 'findTopmostDirectoryNameDraggableEntry',
    value: function findTopmostDirectoryNameDraggableEntry(path) {
      var topmostDirectoryNameDraggableEntry = null;

      var topmostDirectoryName = topmostDirectoryNameFromPath(path),
          directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

      if (directoryNameDraggableEntry !== null) {
        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
      }

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var topmostDirectoryName = properties.topmostDirectoryName,
          topmostDirectoryCollapsed = properties.topmostDirectoryCollapsed,
          explorer = this,
          collapsed = topmostDirectoryCollapsed,
          directoryName = topmostDirectoryName,
          entries = React.createElement(Entries, null);


      entries.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry);

      var childElements = entries; ///

      return childElements;
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
  tagName: 'div',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJFbnRyaWVzIiwiRHJvcFRhcmdldCIsImVudHJ5VHlwZXMiLCJEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJwYXRoVXRpbGl0aWVzIiwiYXJyYXlVdGlsaXRpZXMiLCJFbGVtZW50IiwiUmVhY3QiLCJmaXJzdCIsInNlY29uZCIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsInNvdXJjZVBhdGgiLCJvcHRpb24iLCJvcHRpb25QcmVzZW50IiwibWFya2VkIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwibWFya2VyRW50cnlQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lIiwibmFtZSIsImFwcGVuZCIsImNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHNMZW5ndGgiLCJsZW5ndGgiLCJmaXJzdENoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50IiwicmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJFbnRyeUluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInRhcmdldFBhdGgiLCJkdXBsaWNhdGUiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJ1bm1vdmVkIiwicmVtb3ZlTWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMiLCJyZXRyaWV2ZVN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsImV4cGxvcmVyIiwiaXNUb0JlTWFya2VkIiwid2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJub0RyYWdnaW5nIiwiYWRkTWFya2VyRW50cnkiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJyZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJnZXRFeHBsb3JlciIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGRGaWxlUGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImFkZERpcmVjdG9yeVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwiZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJmaW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0Iiwib25Nb3ZlIiwib25PcGVuIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiLCJwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZSIsInJlZ0V4cCIsIlJlZ0V4cCIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFVBQVVGLFFBQVEsV0FBUixDQUFoQjtBQUFBLElBQ01HLFVBQVVILFFBQVEsV0FBUixDQURoQjtBQUFBLElBRU1JLGFBQWFKLFFBQVEsY0FBUixDQUZuQjtBQUFBLElBR01LLGFBQWFMLFFBQVEsY0FBUixDQUhuQjtBQUFBLElBSU1NLDJCQUEyQk4sUUFBUSw4QkFBUixDQUpqQztBQUFBLElBS01PLDhCQUE4QlAsUUFBUSxpQ0FBUixDQUxwQzs7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QUUvQyxTQUFPdkcsa0JBQVA7QUFDRCIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi9lbnRyaWVzJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBlbnRyeVR5cGVzID0gcmVxdWlyZSgnLi9lbnRyeVR5cGVzJyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IGZpcnN0LCBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBOT19EUkFHR0lOR19XSVRISU4gfSA9IG9wdGlvbnMsXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IGVudHJ5VHlwZXMsXG4gICAgICB7IGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lLCB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgsIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaXNPcHRpb25QcmVzZW50KG9wdGlvbikge1xuICAgIGNvbnN0IG9wdGlvblByZXNlbnQgPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpO1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcbiAgICBcbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuICBcbiAgYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyRW50cnlQYXRoID0gYCR7ZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlOYW1lfWA7XG5cbiAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlckVudHJ5KHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlckVudHJ5KHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCwgIC8vL1xuICAgICAgICAgIG5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSwgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgICA7XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGkuZGlyZWN0b3J5TmFtZSBtYXJrZXIgZW50cnknKSxcbiAgICAgICAgICBjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHNMZW5ndGggPSBjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHMubGVuZ3RoO1xuXG4gICAgaWYgKGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50c0xlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZmlyc3RDaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudCA9IGZpcnN0KGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50cyk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBmaXJzdENoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50OyAgLy8vXG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9ICh3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpO1xuXG4gICAgICAgIGlmICghbm9EcmFnZ2luZykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5R2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHBhdGgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCksXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==