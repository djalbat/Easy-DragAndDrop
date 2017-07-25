'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('./options'),
    pathUtil = require('./util/path'),
    arrayUtil = require('./util/array'),
    DropTarget = require('./dropTarget'),
    DirectoryNameMarker = require('./explorer/entry/marker/directoryName'),
    RootDirectoryNameDraggableEntry = require('./explorer/draggableEntry/directoryName/root');

var Element = easy.Element,
    React = easy.React;

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

      var rootDirectoryNameDraggableEntryMarked = this.isRootDirectoryNameDraggableEntryMarked();

      if (rootDirectoryNameDraggableEntryMarked) {
        marked = true;
      } else {
        var topmostDirectoryNameMarkerEntry = this.retrieveTopmostDirectoryNameMarkerEntry();

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

      this.addRootDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
    }
  }, {
    key: 'addMarkerEntryInPlace',
    value: function addMarkerEntryInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = pathUtil.isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerEntryPath = draggableEntryPath;

        this.addRootDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryNameMarkerEntry = React.createElement(DirectoryNameMarker, { name: name });

      this.append(topmostDirectoryNameMarkerEntry);
    }
  }, {
    key: 'retrieveTopmostDirectoryNameMarkerEntry',
    value: function retrieveTopmostDirectoryNameMarkerEntry() {
      var topmostDirectoryNameMarkerEntry = null;

      var childListElements = this.getChildElements('li');

      childListElements.some(function (childElement) {
        if (childElement instanceof DirectoryNameMarker) {
          topmostDirectoryNameMarkerEntry = childElement; ///

          return true;
        }
      });

      return topmostDirectoryNameMarkerEntry;
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var rootDirectoryNameDraggableEntryMarked = this.isRootDirectoryNameDraggableEntryMarked();

      if (rootDirectoryNameDraggableEntryMarked) {
        this.removeRootDirectoryNameDraggableEntryMarkerEntry();
      } else {
        var topmostDirectoryNameMarkerEntry = this.retrieveTopmostDirectoryNameMarkerEntry();

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
          draggableEntryPathWithoutBottommostName = pathUtil.pathWithoutBottommostNameFromPath(draggableEntryPath),
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

        var recognised = fileNameDraggableEntry.isRecognised(),
            hidden = fileNameDraggableEntry.isHidden();

        this.addFilePath(filePath, recognised, hidden);
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

        var collapsed = directoryNameDraggableEntry.isCollapsed(),
            hidden = directoryNameDraggableEntry.isHidden();

        this.addDirectoryPath(directoryPath, collapsed, hidden);
      }
    }
  }, {
    key: 'openFileNameDraggableEntry',
    value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
      var rootDirectoryNameDraggableEntry = this.retrieveRootDirectoryNameDraggableEntry(),
          fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(rootDirectoryNameDraggableEntry),
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
      var rootDirectoryName = properties.rootDirectoryName,
          rootDirectoryCollapsed = properties.rootDirectoryCollapsed,
          name = rootDirectoryName,
          collapsed = rootDirectoryCollapsed,
          explorer = this,
          rootDirectory = React.createElement(RootDirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed });


      return rootDirectory;
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
  ignoredProperties: ['rootDirectoryName', 'rootDirectoryCollapsed', 'onOpen', 'onMove', 'options']
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
      secondMatch = arrayUtil.second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJwYXRoVXRpbCIsImFycmF5VXRpbCIsIkRyb3BUYXJnZXQiLCJEaXJlY3RvcnlOYW1lTWFya2VyIiwiUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkVsZW1lbnQiLCJSZWFjdCIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsIm9wZW5IYW5kbGVyIiwic291cmNlUGF0aCIsIm9wdGlvbiIsIm1hcmtlZCIsInJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQiLCJ0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsImZpbGVQYXRocyIsInJldHJpZXZlRmlsZVBhdGhzIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJFbnRyeVBhdGgiLCJhZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJuYW1lIiwiYXBwZW5kIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwic29tZSIsImNoaWxkRWxlbWVudCIsInJlbW92ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSIsInJlbW92ZSIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VyRW50cnlJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwibWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwicmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIiwidGFyZ2V0UGF0aCIsInVubW92ZWQiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyIsInJldHJpZXZlU3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwiZXhwbG9yZXIiLCJpc1RvQmVNYXJrZWQiLCJ3aXRoaW4iLCJub0RyYWdnaW5nV2l0aGluIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwibm9EcmFnZ2luZyIsImFkZE1hcmtlckVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwicmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwiZ2V0RXhwbG9yZXIiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwicmVjb2duaXNlZCIsImlzUmVjb2duaXNlZCIsImhpZGRlbiIsImlzSGlkZGVuIiwiYWRkRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnlQYXRoIiwicm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJyb290RGlyZWN0b3J5TmFtZSIsInJvb3REaXJlY3RvcnlDb2xsYXBzZWQiLCJyb290RGlyZWN0b3J5IiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiLCJwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoIiwicmVwbGFjZSIsInJlZ0V4cCIsIlJlZ0V4cCIsIm1hdGNoZXMiLCJtYXRj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LEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDQSxPQUFqQyxDQUF5QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxTQUFTLElBQUlDLE1BQUosQ0FBVyxNQUFNckgsVUFBTixHQUFtQixPQUE5QixDQUFmO0FBQUEsTUFDTXNILFVBQVVqRyxtQkFBbUJrRyxLQUFuQixDQUF5QkgsTUFBekIsQ0FEaEI7QUFBQSxNQUVNSSxjQUFjbEksVUFBVW1JLE1BQVYsQ0FBaUJILE9BQWpCLENBRnBCOztBQUlBakcsdUJBQXFCeUIsYUFBYTBFLFdBQWxDLENBUHVHLENBT3hEOztBQUUvQyxTQUFPbkcsa0JBQVA7QUFDRCIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgcGF0aFV0aWwgPSByZXF1aXJlKCcuL3V0aWwvcGF0aCcpLFxuICAgICAgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi91dGlsL2FycmF5JyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlOYW1lTWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpLFxuICAgICAgUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5TmFtZS9yb290Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG4gICAgXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuICBcbiAgYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IDxEaXJlY3RvcnlOYW1lTWFya2VyIG5hbWU9e25hbWV9IC8+O1xuXG4gICAgdGhpcy5hcHBlbmQodG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSk7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlOYW1lTWFya2VyKSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbWFya2VkRHJvcFRhcmdldC5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICAgICAgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChtYXJrZWQgJiYgdW5tb3ZlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCByZWNvZ25pc2VkID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pc1JlY29nbmlzZWQoKSxcbiAgICAgICAgICAgIGhpZGRlbiA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuaXNIaWRkZW4oKTtcblxuICAgICAgdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCwgcmVjb2duaXNlZCwgaGlkZGVuKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5UGF0aCA9IHRhcmdldERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNDb2xsYXBzZWQoKSxcbiAgICAgICAgICAgIGhpZGRlbiA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0hpZGRlbigpO1xuICAgICAgXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkLCBoaWRkZW4pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aChyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHJvb3REaXJlY3RvcnlOYW1lLCByb290RGlyZWN0b3J5Q29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gcm9vdERpcmVjdG9yeUNvbGxhcHNlZCwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+O1xuXG4gICAgcmV0dXJuIHJvb3REaXJlY3Rvcnk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJyxcbiAgICAncm9vdERpcmVjdG9yeUNvbGxhcHNlZCcsXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aDogc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeTogZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlUGF0aCArICcoLiokKScpLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iXX0=