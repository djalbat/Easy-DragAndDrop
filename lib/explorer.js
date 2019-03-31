'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var types = require('./types'),
    options = require('./options'),
    Entries = require('./entries'),
    DropTarget = require('./dropTarget'),
    DirectoryNameDraggableEntry = require('./entry/draggable/directoryName'),
    TopmostDirectoryNameDraggableEntry = require('./entry/draggable/directoryName/topmost');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    Element = easy.Element,
    React = easy.React,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    pathWithoutBottommostNameFromPath = pathUtilities.pathWithoutBottommostNameFromPath;

var Explorer = function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  function Explorer(selector, moveHandler) {
    var openHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOpenHandler;
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
      var optionPresent = !!this.options[option]; ///

      return optionPresent;
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
    key: 'getDirectoryNameDraggableEntry',
    value: function getDirectoryNameDraggableEntry() {
      return DirectoryNameDraggableEntry; ///
    }
  }, {
    key: 'mark',
    value: function mark(draggableEntry, previousDraggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType();

      var markerEntryPath = void 0;

      if (previousDraggableEntry !== null) {
        var previousDraggableEntryName = previousDraggableEntry.getName();

        markerEntryPath = draggableEntryPath + '/' + previousDraggableEntryName;
      } else {
        markerEntryPath = draggableEntryPath; ///
      }

      this.addMarker(markerEntryPath, draggableEntryType);
    }
  }, {
    key: 'unmark',
    value: function unmark() {
      this.removeMarker();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
          marked = markedDirectoryNameDraggableEntry !== null;

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        var previousDraggableEntry = null;

        this.mark(draggableEntry, previousDraggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget !== this) {
        markedDropTarget.dragging(draggableEntry);

        return;
      }

      var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

      if (dropTargetToBeMarked === this) {
        var draggingWithin = explorer === this; ///

        if (draggingWithin) {
          var noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

          if (noDraggingWithinOptionPresent) {
            return;
          }
        }

        var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
          var _dropTargetToBeMarked = this,
              ///
          previousDraggableEntry = draggableEntry; ///

          draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

          _dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);

          this.unmark();
        }
      } else if (dropTargetToBeMarked !== null) {
        var _noDraggingWithinOptionPresent = dropTargetToBeMarked.isOptionPresent(NO_DRAGGING_WITHIN);

        if (_noDraggingWithinOptionPresent) {
          var _previousDraggableEntry = null;

          dropTargetToBeMarked.mark(draggableEntry, _previousDraggableEntry);

          this.unmark();
        } else {
          var _previousDraggableEntry2 = draggableEntry,
              ///
          _bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

          draggableEntry = _bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

          dropTargetToBeMarked.mark(draggableEntry, _previousDraggableEntry2);

          this.unmark();
        }
      } else {
        var _dropTargetToBeMarked2 = explorer,
            ///
        _previousDraggableEntry3 = null;

        _dropTargetToBeMarked2.mark(draggableEntry, _previousDraggableEntry3);

        this.unmark();
      }
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableEntry, done) {
      var markedDropTarget = this.getMarkedDropTarget(),
          draggableEntryPath = draggableEntry.getPath(),
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
        markedDropTarget.unmark();

        done();
      } else {
        var draggableEntrySubEntries = draggableEntry.retrieveDraggableSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

        draggableEntries.reverse();

        draggableEntries.push(draggableEntry);

        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.unmark();

          done();
        });
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.unmarkGlobally();
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
      var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
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
          explorer = this,
          collapsed = topmostDirectoryCollapsed,
          directoryName = topmostDirectoryName,
          entries = React.createElement(Entries, { explorer: explorer });


      entries.addDirectoryNameDraggableEntry(directoryName, collapsed, TopmostDirectoryNameDraggableEntry);

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

function defaultOpenHandler(sourcePath) {
  ///
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsInR5cGVzIiwib3B0aW9ucyIsIkVudHJpZXMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInBhdGhVdGlsaXRpZXMiLCJhcnJheVV0aWxpdGllcyIsIkVsZW1lbnQiLCJSZWFjdCIsInNlY29uZCIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsImRlZmF1bHRPcGVuSGFuZGxlciIsIm9wdGlvbiIsIm9wdGlvblByZXNlbnQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImRyYWdnYWJsZUVudHJ5IiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyRW50cnlQYXRoIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWQiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJtYXJrIiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwiZHJhZ2dpbmciLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmdXaXRoaW4iLCJub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVubWFyayIsImRvbmUiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImR1cGxpY2F0ZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJ1bm1vdmVkIiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJ1bm1hcmtHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlUGF0aCIsImFkZEZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5UGF0aCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJkaXJlY3RvcnlOYW1lIiwiZW50cmllcyIsImFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImNoaWxkRWxlbWVudHMiLCJhc3NpZ25Db250ZXh0Iiwib25Nb3ZlIiwib25PcGVuIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiLCJwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZSIsInJlZ0V4cCIsIlJlZ0V4cCIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFFBQVFGLFFBQVEsU0FBUixDQUFkO0FBQUEsSUFDTUcsVUFBVUgsUUFBUSxXQUFSLENBRGhCO0FBQUEsSUFFTUksVUFBVUosUUFBUSxXQUFSLENBRmhCO0FBQUEsSUFHTUssYUFBYUwsUUFBUSxjQUFSLENBSG5CO0FBQUEsSUFJTU0sOEJBQThCTixRQUFRLGlDQUFSLENBSnBDO0FBQUEsSUFLTU8scUNBQXFDUCxRQUFRLHlDQUFSLENBTDNDOztJQU9RUSxhLEdBQWtDUCxTLENBQWxDTyxhO0lBQWVDLGMs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ImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuL2VudHJpZXMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lL3RvcG1vc3QnKTtcblxuY29uc3QgeyBwYXRoVXRpbGl0aWVzLCBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgTk9fRFJBR0dJTkdfV0lUSElOIH0gPSBvcHRpb25zLFxuICAgICAgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSB0eXBlcyxcbiAgICAgIHsgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyID0gZGVmYXVsdE9wZW5IYW5kbGVyLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaXNPcHRpb25QcmVzZW50KG9wdGlvbikge1xuICAgIGNvbnN0IG9wdGlvblByZXNlbnQgPSAhIXRoaXMub3B0aW9uc1tvcHRpb25dOyAvLy9cblxuICAgIHJldHVybiBvcHRpb25QcmVzZW50O1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgbGV0IG1hcmtlckVudHJ5UGF0aDtcblxuICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuXG4gIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKTsgLy8vXG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbikge1xuICAgICAgICBjb25zdCBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgICAgaWYgKG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgIGlmIChub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBleHBsb3Jlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5TmFtZScsXG4gICAgJ3RvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCAnXFxcXCgnKS5yZXBsYWNlKC9cXCkvZywgJ1xcXFwpJyk7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0T3BlbkhhbmRsZXIoc291cmNlUGF0aCkge1xuICAvLy9cbn1cbiJdfQ==