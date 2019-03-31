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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsInR5cGVzIiwib3B0aW9ucyIsIkVudHJpZXMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInBhdGhVdGlsaXRpZXMiLCJhcnJheVV0aWxpdGllcyIsIkVsZW1lbnQiLCJSZWFjdCIsInNlY29uZCIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsImRlZmF1bHRPcGVuSGFuZGxlciIsIm9wdGlvbiIsIm9wdGlvblByZXNlbnQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEaXJlY3RvcnlQYXRocyIsImRyYWdnYWJsZUVudHJ5IiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyRW50cnlQYXRoIiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyIiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWQiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJtYXJrIiwiZXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZyIsInVubWFyayIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRvbmUiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImR1cGxpY2F0ZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsIm5hbWUiLCJkcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJ1bm1vdmVkIiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJ1bm1hcmtHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZ2V0RXhwbG9yZXIiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCIsImRpcmVjdG9yeU5hbWUiLCJlbnRyaWVzIiwiYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiY2hpbGRFbGVtZW50cyIsImFzc2lnbkNvbnRleHQiLCJvbk1vdmUiLCJvbk9wZW4iLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7QUFBQSxJQUNNRyxVQUFVSCxRQUFRLFdBQVIsQ0FEaEI7QUFBQSxJQUVNSSxVQUFVSixRQUFRLFdBQVIsQ0FGaEI7QUFBQSxJQUdNSyxhQUFhTCxRQUFRLGNBQVIsQ0FIbkI7QUFBQSxJQUlNTSw4QkFBOEJOLFFBQVEsaUNBQVIsQ0FKcEM7QUFBQSxJQUtNTyxxQ0FBcUNQLFFBQVEseUNBQVIsQ0FMM0M7O0lBT1FRLGEsR0FBa0NQ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RCxlQUFhaEMsa0JBQWIsQ0FWeUUsQ0FVdkM7O0FBRWxDLE1BQU1rRSxVQUFVO0FBQ2RsQywwQkFEYztBQUVkQywwQkFGYztBQUdkd0Q7QUFIYyxHQUFoQjs7QUFNQSxTQUFPdkIsT0FBUDtBQUNEOztBQUVELFNBQVN3QixxQ0FBVCxDQUErQzFGLGtCQUEvQyxFQUFvRWlDLFVBQXBFLEVBQWdGO0FBQzlFakMsdUJBQXdCaUMsVUFBeEIsU0FBc0NqQyxrQkFBdEM7O0FBRUEsU0FBT0Esa0JBQVA7QUFDRDs7QUFFRCxTQUFTMkYsbURBQVQsQ0FBNkQzRixrQkFBN0QsRUFBaUZnQyxVQUFqRixFQUE2RkMsVUFBN0YsRUFBeUc7QUFDdkdELGVBQWFBLFdBQVc0RCxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDQSxPQUFqQyxDQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxTQUFTLElBQUlDLE1BQUosT0FBZTlELFVBQWYsV0FBZjtBQUFBLE1BQ00rRCxVQUFVL0YsbUJBQW1CZ0csS0FBbkIsQ0FBeUJILE1BQXpCLENBRGhCO0FBQUEsTUFFTUksY0FBY2xILE9BQU9nSCxPQUFQLENBRnBCOztBQUlBL0YsdUJBQXFCaUMsYUFBYWdFLFdBQWxDLENBUHVHLENBT3hEOztBQUUvQyxTQUFPakcsa0JBQVA7QUFDRDs7QUFFRCxTQUFTVCxrQkFBVCxDQUE0QnlDLFVBQTVCLEVBQXdDO0FBQ3RDO0FBQ0QiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi9lbnRyaWVzJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lJyksXG4gICAgICBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS90b3Btb3N0Jyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9ID0gb3B0aW9ucyxcbiAgICAgIHsgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGRlZmF1bHRPcGVuSGFuZGxlciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICBsZXQgbWFya2VyRW50cnlQYXRoO1xuXG4gIGlmIChwcmV2aW91c0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RyYWdnYWJsZUVudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuICB9IGVsc2Uge1xuICAgIG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG5cbiAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgPT09IHRoaXMpIHtcbiAgICAgIGxldCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9ICh3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpO1xuXG4gICAgICAgIGlmICghbm9EcmFnZ2luZykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnVubWFyaygpO1xuXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5tYXJrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBleHBsb3Jlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5TmFtZScsXG4gICAgJ3RvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCAnXFxcXCgnKS5yZXBsYWNlKC9cXCkvZywgJ1xcXFwpJyk7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0T3BlbkhhbmRsZXIoc291cmNlUGF0aCkge1xuICAvLy9cbn1cbiJdfQ==