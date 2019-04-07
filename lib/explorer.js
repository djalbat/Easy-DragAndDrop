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
    DirectoryNameDraggableEntry = require('./entry/draggable/directoryName');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    React = easy.React,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    pathWithoutBottommostNameFromPath = pathUtilities.pathWithoutBottommostNameFromPath;

var Explorer = function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  function Explorer(selector, dropTargets, moveHandler, openHandler, options) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, dropTargets, moveHandler));

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
    key: 'getTopmostDirectoryName',
    value: function getTopmostDirectoryName() {
      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(),
          topmostDirectoryNameDraggableEntryName = topmostDirectoryNameDraggableEntry.getName(),
          topmostDirectoryName = topmostDirectoryNameDraggableEntryName; ///

      return topmostDirectoryName;
    }
  }, {
    key: 'getDirectoryNameDraggableEntry',
    value: function getDirectoryNameDraggableEntry() {
      return DirectoryNameDraggableEntry; ///
    }
  }, {
    key: 'mark',
    value: function mark(draggableEntry, previousDraggableEntry) {
      var markerEntryPath = void 0,
          draggableEntryType = void 0;

      var draggableEntryPath = draggableEntry.getPath();

      if (previousDraggableEntry !== null) {
        var previousDraggableEntryName = previousDraggableEntry.getName(),
            previousDraggableEntryType = previousDraggableEntry.getType();

        markerEntryPath = draggableEntryPath + '/' + previousDraggableEntryName;

        draggableEntryType = previousDraggableEntryType; ///
      } else {
        draggableEntryType = draggableEntry.getType();

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
        var draggingWithin = explorer === this,
            ///
        noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

        if (draggingWithin && noDraggingWithinOptionPresent) {
          return;
        }

        var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
          var previousDraggableEntry = draggableEntry; ///

          draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

          this.unmark();

          this.mark(draggableEntry, previousDraggableEntry);
        }
      } else if (dropTargetToBeMarked !== null) {
        dropTargetToBeMarked.markDraggableEntry(draggableEntry);

        this.unmark();
      } else {
        var _dropTargetToBeMarked = explorer,
            ///
        _previousDraggableEntry = null;

        _dropTargetToBeMarked.mark(draggableEntry, _previousDraggableEntry);

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
    key: 'markDraggableEntry',
    value: function markDraggableEntry(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          draggingWithin = explorer === this,
          ///
      noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

      if (draggingWithin && noDraggingWithinOptionPresent) {
        var previousDraggableEntry = null;

        this.mark(draggableEntry, previousDraggableEntry);
      } else {
        var _previousDraggableEntry2 = draggableEntry,
            ///
        bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

        this.mark(draggableEntry, _previousDraggableEntry2);
      }
    }
  }, {
    key: 'moveFileNameDraggableEntry',
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;

      var explorer = fileNameDraggableEntry.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {
        ///
      } else if (targetFilePath === null) {
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

      if (targetDirectoryPath === sourceDirectoryPath) {
        ///
      } else if (targetDirectoryPath === null) {
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


      entries.addDirectoryNameDraggableEntry(directoryName, collapsed);

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
          _properties$options = properties.options,
          options = _properties$options === undefined ? {} : _properties$options,
          moveHandler = onMove || defaultMoveHandler,
          openHandler = onOpen || defaultOpenHandler,
          explorer = DropTarget.fromProperties(Explorer, properties, moveHandler, openHandler, options);


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

function defaultOpenHandler(sourcePath) {
  ///
}

function defaultMoveHandler(pathMaps, done) {
  done();
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsInR5cGVzIiwib3B0aW9ucyIsIkVudHJpZXMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwiUmVhY3QiLCJzZWNvbmQiLCJOT19EUkFHR0lOR19XSVRISU4iLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsImRyb3BUYXJnZXRzIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsIm9wdGlvbiIsIm9wdGlvblByZXNlbnQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWQiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJtYXJrIiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwiZHJhZ2dpbmciLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmdXaXRoaW4iLCJub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVubWFyayIsIm1hcmtEcmFnZ2FibGVFbnRyeSIsImRvbmUiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImR1cGxpY2F0ZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJ1bm1vdmVkIiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJ1bm1hcmtHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlUGF0aCIsImFkZEZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5UGF0aCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXMiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJjaGlsZEVsZW1lbnRzIiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImRlZmF1bHRNb3ZlSGFuZGxlciIsImRlZmF1bHRPcGVuSGFuZGxlciIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5IiwicHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxRQUFRRixRQUFRLFNBQVIsQ0FBZDtBQUFBLElBQ01HLFVBQVVILFFBQVEsV0FBUixDQURoQjtBQUFBLElBRU1JLFVBQVVK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QW9FK0IsVUFBcEUsRUFBZ0Y7QUFDOUUvQix1QkFBd0IrQixVQUF4QixTQUFzQy9CLGtCQUF0Qzs7QUFFQSxTQUFPQSxrQkFBUDtBQUNEOztBQUVELFNBQVN5RixtREFBVCxDQUE2RHpGLGtCQUE3RCxFQUFpRjhCLFVBQWpGLEVBQTZGQyxVQUE3RixFQUF5RztBQUN2R0QsZUFBYUEsV0FBVzRELE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsS0FBMUIsRUFBaUNBLE9BQWpDLENBQXlDLEtBQXpDLEVBQWdELEtBQWhELENBQWIsQ0FEdUcsQ0FDakM7O0FBRXRFLE1BQU1DLFNBQVMsSUFBSUMsTUFBSixPQUFlOUQsVUFBZixXQUFmO0FBQUEsTUFDTStELFVBQVU3RixtQkFBbUI4RixLQUFuQixDQUF5QkgsTUFBekIsQ0FEaEI7QUFBQSxNQUVNSSxjQUFjdkgsT0FBT3FILE9BQVAsQ0FGcEI7O0FBSUE3Rix1QkFBcUIrQixhQUFhZ0UsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU8vRixrQkFBUDtBQUNEIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4vZW50cmllcycpLFxuICAgICAgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpLFxuICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IHBhdGhVdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBOT19EUkFHR0lOR19XSVRISU4gfSA9IG9wdGlvbnMsXG4gICAgICB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IHR5cGVzLFxuICAgICAgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeVBhdGhzKCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXRUb3Btb3N0RGlyZWN0b3J5TmFtZSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBtYXJrZXJFbnRyeVBhdGgsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgIGlmIChwcmV2aW91c0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gYCR7ZHJhZ2dhYmxlRW50cnlQYXRofS8ke3ByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lfWA7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICB1bm1hcmsoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSB0aGlzKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuXG4gICAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7IC8vL1xuXG4gICAgbGV0IHRhcmdldFBhdGggPSBudWxsLFxuICAgICAgICBkdXBsaWNhdGUgPSBmYWxzZTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIG5hbWUgPSBkcmFnZ2FibGVFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgKCkgPT4ge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMudW5tYXJrR2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2luZ1dpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZW50cmllcyA9XG5cbiAgICAgICAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zID0ge319ID0gcHJvcGVydGllcywgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUgfHwgZGVmYXVsdE1vdmVIYW5kbGVyLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiB8fCBkZWZhdWx0T3BlbkhhbmRsZXIsIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gRHJvcFRhcmdldC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAnZGl2JyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdleHBsb3JlcidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25PcGVuJyxcbiAgICAnb25Nb3ZlJyxcbiAgICAnb3B0aW9ucycsXG4gICAgJ3RvcG1vc3REaXJlY3RvcnlOYW1lJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG5cbmZ1bmN0aW9uIGRlZmF1bHRPcGVuSGFuZGxlcihzb3VyY2VQYXRoKSB7XG4gIC8vL1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCAnXFxcXCgnKS5yZXBsYWNlKC9cXCkvZywgJ1xcXFwpJyk7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuIl19