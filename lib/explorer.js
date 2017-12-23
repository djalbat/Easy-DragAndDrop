'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    DropTarget = require('./dropTarget'),
    DirectoryNameMarkerEntry = require('./explorer/entry/marker/directoryName'),
    TopmostDirectoryNameDraggableEntry = require('./explorer/entry/draggable/directoryName/topmost');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    Element = easy.Element,
    React = easy.React,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
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
  ignoredProperties: ['topmostDirectoryName', 'topmostDirectoryCollapsed', 'onOpen', 'onMove', 'options']
});

module.exports = Explorer;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInBhdGhVdGlsaXRpZXMiLCJhcnJheVV0aWxpdGllcyIsIkVsZW1lbnQiLCJSZWFjdCIsImZpcnN0Iiwic2Vjb25kIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsInNvdXJjZVBhdGgiLCJvcHRpb24iLCJvcHRpb25QcmVzZW50IiwibWFya2VkIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwibWFya2VyRW50cnlQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXJFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lIiwibmFtZSIsImFwcGVuZCIsImNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHNMZW5ndGgiLCJsZW5ndGgiLCJmaXJzdENoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50IiwicmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJFbnRyeUluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInRhcmdldFBhdGgiLCJkdXBsaWNhdGUiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJ1bm1vdmVkIiwicmVtb3ZlTWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMiLCJyZXRyaWV2ZVN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsImV4cGxvcmVyIiwiaXNUb0JlTWFya2VkIiwid2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJub0RyYWdnaW5nIiwiYWRkTWFya2VyRW50cnkiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJyZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJnZXRFeHBsb3JlciIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGRGaWxlUGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImFkZERpcmVjdG9yeVBhdGgiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCIsInRvcG1vc3REaXJlY3RvcnkiLCJhc3NpZ25Db250ZXh0Iiwib25Nb3ZlIiwib25PcGVuIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsVUFBVUYsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUcsYUFBYUgsUUFBUSxjQUFSLENBRG5CO0FBQUEsSUFFTUksMkJBQTJCSixRQUFRLHVDQUFSLENBRmpDO0FBQUEsSUFHTUsscUNBQXFDTCxRQUFRLGtEQUFSLENBSDNDOztJQUtRTSxhLEdBQWtDTCxTLENBQWxDSyxhO0lBQWVDLGMsR0FBbUJOLFMsQ0FBbkJNLGM7SUFDZkMsTyxHQUFtQlQsSSxDQUFuQlMsTztJQUFTQyxLLEdBQVVWLEksQ0FBVlUsSztJQUNUQyxLLEdBQWtCSCxjLENBQWxCRyxLO0lBQU9DLE0sR0FBV0osYyxDQUFYSSxNO0lBQ1BDLGtCLEdBQXVCVixPLENBQXZCVSxrQjtJQUNBQywwQixHQUFrRVAsYSxDQUFsRU8sMEI7SUFBNEJDLGlDLEdBQXNDUixhLENBQXRDUSxpQzs7SUFFOUJDLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUF3RjtBQUFBLFFBQXJEQyxXQUFxRCx1RUFBdkMsVUFBU0MsVUFBVCxFQUFxQixDQUFFLENBQWdCO0FBQUEsUUFBZGpCLE9BQWMsdUVBQUosRUFB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QUFBLE1BQ01zSCxVQUFVOUYsbUJBQW1CK0YsS0FBbkIsQ0FBeUJILE1BQXpCLENBRGhCO0FBQUEsTUFFTUksY0FBY2hJLE9BQU84SCxPQUFQLENBRnBCOztBQUlBOUYsdUJBQXFCdUIsYUFBYXlFLFdBQWxDLENBUHVHLENBT3hEOztBQUUvQyxTQUFPaEcsa0JBQVA7QUFDRCIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyksXG4gICAgICBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS90b3Btb3N0Jyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IGZpcnN0LCBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBOT19EUkFHR0lOR19XSVRISU4gfSA9IG9wdGlvbnMsXG4gICAgICB7IGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lLCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTtcblxuICAgIHJldHVybiBvcHRpb25QcmVzZW50O1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeVBhdGhzKCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRofS8ke2RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuXG4gICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXJFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXJFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcblxuICAgIHRoaXMuYXBwZW5kKHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkpO1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaS5kaXJlY3RvcnlOYW1lIG1hcmtlciBlbnRyeScpLFxuICAgICAgICAgY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzTGVuZ3RoID0gY2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnRzLmxlbmd0aDtcblxuICAgIGlmIChjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHNMZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IGZpcnN0Q2hpbGREaXJlY3RvcnlOYW1lTWFya2VyRW50cnlMaXN0SXRlbUVsZW1lbnQgPSBmaXJzdChjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHMpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gZmlyc3RDaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudDsgIC8vL1xuXG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQ7XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gPFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gLz47XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBleHBsb3Jlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdleHBsb3JlcidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJyxcbiAgICAnb25PcGVuJyxcbiAgICAnb25Nb3ZlJyxcbiAgICAnb3B0aW9ucydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGg6IHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5OiBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==