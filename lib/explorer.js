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
    key: 'hasOption',
    value: function hasOption(option) {
      option = this.options[option] === true; ///

      return option;
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
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry !== null ? markedDirectoryNameDraggableEntry.getPath() : null,
          draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryNameDraggableEntryPath,
          unmoved = sourcePath === targetPath;

      if (marked && unmoved) {
        this.removeMarkerEntry();

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
          noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJEcm9wVGFyZ2V0IiwiRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsInBhdGgiLCJhcnJheSIsInNlY29uZCIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJzb3VyY2VQYXRoIiwib3B0aW9uIiwibWFya2VkIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInRvQmVNYXJrZWQiLCJmaWxlUGF0aHMiLCJyZXRyaWV2ZUZpbGVQYXRocyIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwibWFya2VyRW50cnlQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsIm5hbWUiLCJhcHBlbmQiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJmaW5kIiwiY2hpbGRMaXN0RWxlbWVudCIsImZvdW5kIiwicmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5IiwicmVtb3ZlIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJFbnRyeUluUGxhY2UiLCJkb25lIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJ0YXJnZXRQYXRoIiwidW5tb3ZlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJub0RyYWdnaW5nIiwiYWRkTWFya2VyRW50cnkiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJyZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5IiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJnZXRFeHBsb3JlciIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJyZWNvZ25pc2VkIiwiaXNSZWNvZ25pc2VkIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJ0b3Btb3N0RGlyZWN0b3J5IiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiLCJwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFj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QTBCLEtBQTFCLEVBQWlDQSxPQUFqQyxDQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxTQUFTLElBQUlDLE1BQUosQ0FBVyxNQUFNbEgsVUFBTixHQUFtQixPQUE5QixDQUFmO0FBQUEsTUFDTW1ILFVBQVU5RixtQkFBbUIrRixLQUFuQixDQUF5QkgsTUFBekIsQ0FEaEI7QUFBQSxNQUVNSSxjQUFjNUgsT0FBTzBILE9BQVAsQ0FGcEI7O0FBSUE5Rix1QkFBcUJ3QixhQUFhd0UsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU9oRyxrQkFBUDtBQUNEIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeU5hbWUvdG9wbW9zdCcpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBwYXRoLCBhcnJheSB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBzZWNvbmQgfSA9IGFycmF5LFxuICAgICAgeyBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gPSBwYXRoO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyID0gZnVuY3Rpb24oc291cmNlUGF0aCkge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuICBcbiAgYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBjaGlsZExpc3RFbGVtZW50cy5maW5kKGZ1bmN0aW9uKGNoaWxkTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gKGNoaWxkTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLyBcblxuICAgIFxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCxcbiAgICAgICAgICB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKG1hcmtlZCAmJiB1bm1vdmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IHJlY29nbmlzZWQgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmlzUmVjb2duaXNlZCgpO1xuXG4gICAgICB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoLCByZWNvZ25pc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgdGhpcy5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWUsIHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gPFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gLz47XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBleHBsb3Jlci5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdleHBsb3JlcidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAndG9wbW9zdERpcmVjdG9yeU5hbWUnLFxuICAgICd0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkJyxcbiAgICAnb25PcGVuJyxcbiAgICAnb25Nb3ZlJyxcbiAgICAnb3B0aW9ucydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGg6IHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5OiBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2VQYXRoICsgJyguKiQpJyksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuIl19