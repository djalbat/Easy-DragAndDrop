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
    TopmostDirectoryNameDraggableEntry = require('./explorer/draggableEntry/directoryName/topmost');

var Element = easy.Element,
    React = easy.React,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    path = necessary.path,
    array = necessary.array,
    second = array.second,
    isPathTopmostDirectoryName = path.isPathTopmostDirectoryName,
    pathWithoutBottommostNameFromPath = path.pathWithoutBottommostNameFromPath;

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

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerEntryPath = draggableEntryPath;

        this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
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
      var childListElements = this.getChildElements('li'),
          topmostDirectoryNameMarkerEntry = childListElements.find(function (childListElement) {
        var found = childListElement instanceof DirectoryNameMarkerEntry;

        return found;
      }) || null; /// 


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
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry();

      var targetPath = null;

      if (markedDirectoryNameDraggableEntry !== null) {
        var draggableEntryName = draggableEntry.getName(),
            name = draggableEntryName,
            ///
        draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);

        if (!draggableEntryPresent) {
          var markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry.getPath();

          targetPath = markedDirectoryNameDraggableEntryPath; ///
        }
      }

      var draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          ///
      duplicate = targetPath === null,
          unmoved = sourcePath === targetPath;

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
      var explorer = fileNameDraggableEntry.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {} else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);

        filePath = targetFilePath; ///

        var recognised = fileNameDraggableEntry.isRecognised();

        this.addFilePath(filePath, recognised);
      }
    }
  }, {
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
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

        this.addDirectoryPath(directoryPath, collapsed);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsInBhdGgiLCJhcnJheSIsInNlY29uZCIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJzb3VyY2VQYXRoIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsIm1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiZmlsZVBhdGhzIiwicmV0cmlldmVGaWxlUGF0aHMiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsIm1hcmtlckVudHJ5UGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJuYW1lIiwiYXBwZW5kIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwiZmluZCIsImNoaWxkTGlzdEVsZW1lbnQiLCJmb3VuZCIsInJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZSIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VyRW50cnlJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJ0YXJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwiZHVwbGljYXRlIiwidW5tb3ZlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZyIsImFkZE1hcmtlckVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwicmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZ2V0RXhwbG9yZXIiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwicmVjb2duaXNlZCIsImlzUmVjb2duaXNlZCIsImFkZEZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5UGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIiwidG9wbW9zdERpcmVjdG9yeSIsImFzc2lnbkNvbnRleHQiLCJvbk1vdmUiLCJvbk9wZW4iLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5IiwicHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aCIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ01DLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxVQUFVRixRQUFRLFdBQVIsQ0FBaEI7QUFBQSxJQUNNRyxhQUFhSCxRQUFRLGNBQVIsQ0FEbkI7QUFBQSxJQUVNSSwyQkFBMkJKLFFBQVEsdUNBQVIsQ0FGakM7QUFBQSxJQUdNSyxxQ0FBcUNMLFFBQVEsaURBQVIsQ0FIM0M7O0lBS1FNLE8sR0FBbUJQLEksQ0FBbkJPLE87SUFBU0MsSyxHQUFVUixJLENBQVZRLEs7SUFDVEMsa0IsR0FBdUJOLE8sQ0FBdkJNLGtCO0lBQ0FDLEksR0FBZ0JSLFMsQ0FBaEJRLEk7SUFBTUMsSyxHQUFVVCxTLENBQVZTLEs7SUFDTkMsTSxHQUFXRCxLLENBQVhDLE07SUFDQUMsMEIsR0FBa0VILEksQ0FBbEVHLDBCO0lBQTRCQyxpQyxHQUFzQ0osSSxDQUF0Q0ksaUM7O0lBRTlCQyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBd0Y7QUFBQSxRQUFyREMsV0FBcUQsdUVBQXZDLFVBQVNDLFVBQVQsRUFBcUIsQ0FBRSxDQUFnQjtBQUFBLFFBQWRoQixPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsb0hBQ2hGYSxRQURnRixFQUN0RUMsV0FEc0U7O0FBR3RGLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtmLE9BQUwsR0FBZUEsT0FBZjtBQUxzRjtBQU12Rjs7Ozs4QkFFU2lCLE0sRUFBUTtBQUNoQixXQUFLakIsT0FBTCxDQUFhaUIsTUFBYixJQUF1QixJQUF2QjtBQUNEOzs7Z0NB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QWFzQixrQkFBYixDQVR5RSxDQVN2Qzs7QUFFbEMsTUFBTXFFLFVBQVU7QUFDZDNGLGdCQUFZQSxVQURFO0FBRWQ0QyxnQkFBWUEsVUFGRTtBQUdkb0UsZUFBV0E7QUFIRyxHQUFoQjs7QUFNQSxTQUFPckIsT0FBUDtBQUNEOztBQUVELFNBQVNzQixxQ0FBVCxDQUErQzNGLGtCQUEvQyxFQUFvRXNCLFVBQXBFLEVBQWdGO0FBQzlFdEIsdUJBQXFCc0IsYUFBYSxHQUFiLEdBQW1CdEIsa0JBQXhDOztBQUVBLFNBQU9BLGtCQUFQO0FBQ0Q7O0FBRUQsU0FBUzRGLG1EQUFULENBQTZENUYsa0JBQTdELEVBQWlGdEIsVUFBakYsRUFBNkY0QyxVQUE3RixFQUF5RztBQUN2RzVDLGVBQWFBLFdBQVdtSCxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDQSxPQUFqQyxDQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxTQUFTLElBQUlDLE1BQUosQ0FBVyxNQUFNckgsVUFBTixHQUFtQixPQUE5QixDQUFmO0FBQUEsTUFDTXNILFVBQVVoRyxtQkFBbUJpRyxLQUFuQixDQUF5QkgsTUFBekIsQ0FEaEI7QUFBQSxNQUVNSSxjQUFjL0gsT0FBTzZILE9BQVAsQ0FGcEI7O0FBSUFoRyx1QkFBcUJzQixhQUFhNEUsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU9sRyxrQkFBUDtBQUNEIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeU5hbWUvdG9wbW9zdCcpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBOT19EUkFHR0lOR19XSVRISU4gfSA9IG9wdGlvbnMsXG4gICAgICB7IHBhdGgsIGFycmF5IH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHNlY29uZCB9ID0gYXJyYXksXG4gICAgICB7IGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lLCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSA9IHBhdGg7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTtcblxuICAgIHJldHVybiBvcHRpb25QcmVzZW50O1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuICBcbiAgYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBjaGlsZExpc3RFbGVtZW50cy5maW5kKGZ1bmN0aW9uKGNoaWxkTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gKGNoaWxkTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLyBcblxuICAgIFxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGw7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmICghZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLCAvLy9cbiAgICAgICAgICBkdXBsaWNhdGUgPSAodGFyZ2V0UGF0aCA9PT0gbnVsbCksXG4gICAgICAgICAgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQ7XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCByZWNvZ25pc2VkID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pc1JlY29nbmlzZWQoKTtcblxuICAgICAgdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCwgcmVjb2duaXNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lLCB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IDxUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+O1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3RvcG1vc3REaXJlY3RvcnlOYW1lJyxcbiAgICAndG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCcsXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aDogc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeTogZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlUGF0aCArICcoLiokKScpLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==