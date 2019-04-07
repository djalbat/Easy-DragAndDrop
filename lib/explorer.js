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
      var noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

      if (noDraggingWithinOptionPresent) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsInR5cGVzIiwib3B0aW9ucyIsIkVudHJpZXMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwiUmVhY3QiLCJzZWNvbmQiLCJOT19EUkFHR0lOR19XSVRISU4iLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsImRyb3BUYXJnZXRzIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsIm9wdGlvbiIsIm9wdGlvblByZXNlbnQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5IiwibWFya2VyRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWQiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJtYXJrIiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwiZHJhZ2dpbmciLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmdXaXRoaW4iLCJub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVubWFyayIsIm1hcmtEcmFnZ2FibGVFbnRyeSIsImRvbmUiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImR1cGxpY2F0ZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJ1bm1vdmVkIiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJ1bm1hcmtHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlUGF0aCIsImFkZEZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5UGF0aCIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXMiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJjaGlsZEVsZW1lbnRzIiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImRlZmF1bHRNb3ZlSGFuZGxlciIsImRlZmF1bHRPcGVuSGFuZGxlciIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5IiwicHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxRQUFRRixRQUFRLFNBQVIsQ0FBZDtBQUFBLElBQ01HLFVBQVVILFFBQVEsV0FBUixDQURoQjtBQUFBLElBRU1JLFVBQVVK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QUVBLFNBQU9BLGtCQUFQO0FBQ0Q7O0FBRUQsU0FBU3lGLG1EQUFULENBQTZEekYsa0JBQTdELEVBQWlGOEIsVUFBakYsRUFBNkZDLFVBQTdGLEVBQXlHO0FBQ3ZHRCxlQUFhQSxXQUFXNEQsT0FBWCxDQUFtQixLQUFuQixFQUEwQixLQUExQixFQUFpQ0EsT0FBakMsQ0FBeUMsS0FBekMsRUFBZ0QsS0FBaEQsQ0FBYixDQUR1RyxDQUNqQzs7QUFFdEUsTUFBTUMsU0FBUyxJQUFJQyxNQUFKLE9BQWU5RCxVQUFmLFdBQWY7QUFBQSxNQUNNK0QsVUFBVTdGLG1CQUFtQjhGLEtBQW5CLENBQXlCSCxNQUF6QixDQURoQjtBQUFBLE1BRU1JLGNBQWN2SCxPQUFPcUgsT0FBUCxDQUZwQjs7QUFJQTdGLHVCQUFxQitCLGFBQWFnRSxXQUFsQyxDQVB1RyxDQU94RDs7QUFFL0MsU0FBTy9GLGtCQUFQO0FBQ0QiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi9lbnRyaWVzJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9ID0gb3B0aW9ucyxcbiAgICAgIHsgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gIGxldCBtYXJrZXJFbnRyeVBhdGgsXG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgaWYgKHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG4gIH0gZWxzZSB7XG4gICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgfVxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKTsgLy8vXG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbikge1xuICAgICAgICBjb25zdCBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgICAgaWYgKG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG5cbiAgICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3Qgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgPSB7fX0gPSBwcm9wZXJ0aWVzLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSB8fCBkZWZhdWx0TW92ZUhhbmRsZXIsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuIHx8IGRlZmF1bHRPcGVuSGFuZGxlciwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHt0YXJnZXRQYXRofS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdnYWJsZUVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iXX0=