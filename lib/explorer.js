'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    Entry = require('./explorer/entry'),
    DropTarget = require('./dropTarget'),
    DirectoryNameMarkerEntry = require('./explorer/entry/marker/directoryName'),
    TopmostDirectoryNameDraggableEntry = require('./explorer/entry/draggable/directoryName/topmost');

var Element = easy.Element,
    React = easy.React,
    types = Entry.types,
    pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE,
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
      var childListEntryElements = this.getChildElements('li.entry'),
          childEntries = childListEntryElements,
          ///
      topmostDirectoryNameMarkerEntry = childEntries.find(function (childEntry) {
        var childEntryType = childEntry.getType(),
            found = childEntryType === DIRECTORY_NAME_MARKER_TYPE;

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

        var _fileNameDraggableEntry = this.addFilePath(filePath);

        draggableEntry = _fileNameDraggableEntry; ///
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

        var collapsed = _directoryNameDraggableEntry.isCollapsed(),
            _directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);

        draggableEntry = _directoryNameDraggableEntry; ///
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

  var regExp = new RegExp('\'^' + sourcePath + '(.*$)'),
      matches = draggableEntryPath.match(regExp),
      secondMatch = second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIm9wdGlvbnMiLCJFbnRyeSIsIkRyb3BUYXJnZXQiLCJEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiRWxlbWVudCIsIlJlYWN0IiwidHlwZXMiLCJwYXRoVXRpbGl0aWVzIiwiYXJyYXlVdGlsaXRpZXMiLCJzZWNvbmQiLCJOT19EUkFHR0lOR19XSVRISU4iLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJzb3VyY2VQYXRoIiwib3B0aW9uIiwib3B0aW9uUHJlc2VudCIsIm1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJyZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiZmlsZVBhdGhzIiwicmV0cmlldmVGaWxlUGF0aHMiLCJkaXJlY3RvcnlQYXRocyIsInJldHJpZXZlRGlyZWN0b3J5UGF0aHMiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsIm1hcmtlckVudHJ5UGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyRW50cnkiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsIm5hbWUiLCJhcHBlbmQiLCJjaGlsZExpc3RFbnRyeUVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsImNoaWxkRW50cmllcyIsImZpbmQiLCJjaGlsZEVudHJ5IiwiY2hpbGRFbnRyeVR5cGUiLCJmb3VuZCIsInJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZSIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VyRW50cnlJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJ0YXJnZXRQYXRoIiwiZHVwbGljYXRlIiwiZHJhZ2dhYmxlRW50cnlQcmVzZW50IiwiaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwidW5tb3ZlZCIsInJlbW92ZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzIiwicmV0cmlldmVTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZyIsImFkZE1hcmtlckVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwicmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZ2V0RXhwbG9yZXIiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQiLCJ0b3Btb3N0RGlyZWN0b3J5IiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiLCJwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZSIsInJlZ0V4cCIsIlJlZ0V4cCIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLFVBQVVGLFFBQVEsV0FBUixDQUFoQjtBQUFBLElBQ01HLFFBQVFILFFBQVEsa0JBQVIsQ0FEZDtBQUFBLElBRU1JLGFBQWFKLFFBQVEsY0FBUixDQUZuQjtBQUFBLElBR01LLDJCQUEyQkwsUUFBUSx1Q0FBUixDQUhqQztBQUFBLElBSU1NLHFDQUFxQ04sUUFBUSxrREFBUixDQUozQzs7SUFNUU8sTyxHQUFtQlIsSSxDQUFuQlEsTztJQUFTQyxLLEdBQVVULEksQ0FBVlMsSztJQUNUQyxLLEdBQVVOLEssQ0FBVk0sSztJQUNBQyxhLEdBQWtDVCxTLENBQWxDUyxhO0lBQWVDLGMsR0FBbUJWLFMsQ0FBbkJVLGM7SUFDZkMsTSxHQUFXRCxjLENBQVhDLE07SUFDQUMsa0IsR0FBdUJYLE8sQ0FBdkJXLGtCO0lBQ0FDLDBCLEdBQStCTCxLLENBQS9CSywwQjtJQUNBQywwQixHQUFrRUwsYSxDQUFsRUssMEI7SUFBNEJDLGlDLEdBQXNDTixhLENBQXRDTSxpQzs7SUFFOUJDLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUF3RjtBQUFBLFFBQXJEQyxXQUFxRCx1RUFBdkMsVUFBU0MsVUFBVCxFQUFxQixDQUFFLENBQWdCO0FBQUEsUUFB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QUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxTQUFTLElBQUlDLE1BQUosU0FBZ0J2SCxVQUFoQixXQUFmO0FBQUEsTUFDTXdILFVBQVVoRyxtQkFBbUJpRyxLQUFuQixDQUF5QkgsTUFBekIsQ0FEaEI7QUFBQSxNQUVNSSxjQUFjbkksT0FBT2lJLE9BQVAsQ0FGcEI7O0FBSUFoRyx1QkFBcUJ5QixhQUFheUUsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU9sRyxrQkFBUDtBQUNEIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgICAgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpLFxuICAgICAgVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUvdG9wbW9zdCcpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyB0eXBlcyB9ID0gRW50cnksXG4gICAgICB7IHBhdGhVdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9ID0gb3B0aW9ucyxcbiAgICAgIHsgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSA9IHR5cGVzLFxuICAgICAgeyBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSwgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyID0gZnVuY3Rpb24oc291cmNlUGF0aCkge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBpc09wdGlvblByZXNlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uUHJlc2VudCA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7XG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICBtYXJrZWQgPSAodG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhzID0gdGhpcy5yZXRyaWV2ZUZpbGVQYXRocygpO1xuICAgIFxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG4gIFxuICBhZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aH0vJHtkcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyRW50cnkodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyRW50cnkodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVudHJ5RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpLmVudHJ5JyksXG4gICAgICAgICAgY2hpbGRFbnRyaWVzID0gY2hpbGRMaXN0RW50cnlFbGVtZW50cywgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBjaGlsZEVudHJpZXMuZmluZChmdW5jdGlvbihjaGlsZEVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVudHJ5VHlwZSA9IGNoaWxkRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSAoY2hpbGRFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9KSB8fCBudWxsOyAvLy8gXG5cbiAgICBcbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7IC8vL1xuXG4gICAgbGV0IHRhcmdldFBhdGggPSBudWxsLFxuICAgICAgICBkdXBsaWNhdGUgPSBmYWxzZTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIG5hbWUgPSBkcmFnZ2FibGVFbnRyeU5hbWUsICAvLy9cbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBkdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAoZHVwbGljYXRlIHx8IHVubW92ZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgICAgXG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCB3aXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50O1xuXG4gICAgICAgIGlmICghbm9EcmFnZ2luZykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5R2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQsIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSA8VG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPjtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUsIG9uT3Blbiwgb3B0aW9ucyB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4sIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICd0b3Btb3N0RGlyZWN0b3J5TmFtZScsXG4gICAgJ3RvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQnLFxuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3Rvcnk6IGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCAnXFxcXCgnKS5yZXBsYWNlKC9cXCkvZywgJ1xcXFwpJyk7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGAnXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==