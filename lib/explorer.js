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
    DirectoryNameDraggableEntry = require('./entry/draggable/directoryName'),
    TopmostDirectoryNameDraggableEntry = require('./entry/draggable/directoryName/topmost');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    Element = easy.Element,
    React = easy.React,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
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
    value: function mark(draggableEntry) {
      var previousDraggableEntry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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
        this.mark(draggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget === this) {
        var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = void 0;

        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var within = explorer === this,
              ///
          noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithinOptionPresent;

          if (!noDragging) {
            var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry();

            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
              this.unmark();

              var previousDraggableEntry = draggableEntry; ///

              draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

              this.mark(draggableEntry, previousDraggableEntry);
            }
          }
        } else {
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            var _previousDraggableEntry = draggableEntry; ///

            draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

            dropTargetToBeMarked.mark(draggableEntry, _previousDraggableEntry);
          } else {
            explorer.mark(draggableEntry);
          }

          this.unmark();
        }
      } else {
        markedDropTarget.dragging(draggableEntry, explorer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJFbnRyaWVzIiwiRHJvcFRhcmdldCIsImVudHJ5VHlwZXMiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicGF0aFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwiRWxlbWVudCIsIlJlYWN0Iiwic2Vjb25kIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsIm9wZW5IYW5kbGVyIiwiZGVmYXVsdE9wZW5IYW5kbGVyIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZGlyZWN0b3J5UGF0aHMiLCJyZXRyaWV2ZURpcmVjdG9yeVBhdGhzIiwiZHJhZ2dhYmxlRW50cnkiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJtYXJrZXJFbnRyeVBhdGgiLCJwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZSIsImdldE5hbWUiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlZCIsImJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJpc01hcmtlZCIsInN0YXJ0ZWREcmFnZ2luZyIsIm1hcmsiLCJleHBsb3JlciIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwiaXNUb0JlTWFya2VkIiwid2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQiLCJpc09wdGlvblByZXNlbnQiLCJub0RyYWdnaW5nIiwidW5tYXJrIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZG9uZSIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZHVwbGljYXRlIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwibmFtZSIsImRyYWdnYWJsZUVudHJ5UHJlc2VudCIsImlzRHJhZ2dhYmxlRW50cnlQcmVzZW50IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInVubW92ZWQiLCJkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMiLCJyZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInVubWFya0dsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJnZXRFeHBsb3JlciIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJhZGRGaWxlUGF0aCIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImFkZERpcmVjdG9yeVBhdGgiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIiwiZGlyZWN0b3J5TmFtZSIsImVudHJpZXMiLCJhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJjaGlsZEVsZW1lbnRzIiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5IiwicHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxVQUFVRixRQUFRLFdBQVIsQ0FBaEI7QUFBQSxJQUNNRyxVQUFVSCxRQUFRLFdBQVIsQ0FEaEI7QUFBQSxJQUVNSSxhQUFhSixRQUFRLGNBQVIsQ0FGbkI7QUFBQSxJQUdNSyxhQUFhTCxRQUFRLGNBQVIsQ0FIbkI7QUFBQSxJQUlNTSw4QkFBOEJOLFFBQVEsaUNBQVIsQ0FKcEM7QUFBQSxJQUtNTyxxQ0FBcUNQLFFBQVEseUNBQVIsQ0FMM0M7O0lBT1FRLGEs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OztBQUVuSEQsZUFBYWhDLGtCQUFiLENBVnlFLENBVXZDOztBQUVsQyxNQUFNa0UsVUFBVTtBQUNkbEMsMEJBRGM7QUFFZEMsMEJBRmM7QUFHZHdEO0FBSGMsR0FBaEI7O0FBTUEsU0FBT3ZCLE9BQVA7QUFDRDs7QUFFRCxTQUFTd0IscUNBQVQsQ0FBK0MxRixrQkFBL0MsRUFBb0VpQyxVQUFwRSxFQUFnRjtBQUM5RWpDLHVCQUF3QmlDLFVBQXhCLFNBQXNDakMsa0JBQXRDOztBQUVBLFNBQU9BLGtCQUFQO0FBQ0Q7O0FBRUQsU0FBUzJGLG1EQUFULENBQTZEM0Ysa0JBQTdELEVBQWlGZ0MsVUFBakYsRUFBNkZDLFVBQTdGLEVBQXlHO0FBQ3ZHRCxlQUFhQSxXQUFXNEQsT0FBWCxDQUFtQixLQUFuQixFQUEwQixLQUExQixFQUFpQ0EsT0FBakMsQ0FBeUMsS0FBekMsRUFBZ0QsS0FBaEQsQ0FBYixDQUR1RyxDQUNqQzs7QUFFdEUsTUFBTUMsU0FBUyxJQUFJQyxNQUFKLE9BQWU5RCxVQUFmLFdBQWY7QUFBQSxNQUNNK0QsVUFBVS9GLG1CQUFtQmdHLEtBQW5CLENBQXlCSCxNQUF6QixDQURoQjtBQUFBLE1BRU1JLGNBQWNsSCxPQUFPZ0gsT0FBUCxDQUZwQjs7QUFJQS9GLHVCQUFxQmlDLGFBQWFnRSxXQUFsQyxDQVB1RyxDQU94RDs7QUFFL0MsU0FBT2pHLGtCQUFQO0FBQ0Q7O0FBRUQsU0FBU1Qsa0JBQVQsQ0FBNEJ5QyxVQUE1QixFQUF3QztBQUN0QztBQUNEIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuL2VudHJpZXMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuL2VudHJ5VHlwZXMnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lL3RvcG1vc3QnKTtcblxuY29uc3QgeyBwYXRoVXRpbGl0aWVzLCBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgTk9fRFJBR0dJTkdfV0lUSElOIH0gPSBvcHRpb25zLFxuICAgICAgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSBlbnRyeVR5cGVzLFxuICAgICAgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIgPSBkZWZhdWx0T3BlbkhhbmRsZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICEhdGhpcy5vcHRpb25zW29wdGlvbl07IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeVBhdGhzKCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgbGV0IG1hcmtlckVudHJ5UGF0aDtcblxuICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuXG4gIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICBsZXQgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSAod2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KTtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy51bm1hcmsoKTtcblxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIubWFyayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVubWFyaygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZW50cmllcyA9XG5cbiAgICAgICAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgIDtcblxuICAgIGVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gZW50cmllczsgIC8vL1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdE9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpIHtcbiAgLy8vXG59XG4iXX0=