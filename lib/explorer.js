'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('./options'),
    pathUtil = require('./util/path'),
    arrayUtil = require('./util/array'),
    DropTarget = require('./dropTarget'),
    DirectoryMarker = require('./explorer/entry/marker/directory'),
    RootDirectory = require('./explorer/draggableEntry/directory/root');

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

      var rootDirectoryMarked = this.isRootDirectoryMarked();

      if (rootDirectoryMarked) {
        marked = true;
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        marked = topmostDirectoryMarker !== null;
      }

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryOverlappingDraggableEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'getFilePaths',
    value: function getFilePaths() {
      return this.rootDirectory.getFilePaths();
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.addRootDirectoryMarker(markerPath, draggableEntryType);
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = pathUtil.isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerPath = draggableEntryPath;

        this.addRootDirectoryMarker(markerPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryMarker = React.createElement(DirectoryMarker, { name: name });

      this.append(topmostDirectoryMarker);
    }
  }, {
    key: 'retrieveTopmostDirectoryMarker',
    value: function retrieveTopmostDirectoryMarker() {
      var topmostDirectoryMarker = null;

      var childListElements = this.getChildElements('li');

      childListElements.some(function (childElement) {
        if (childElement instanceof DirectoryMarker) {
          topmostDirectoryMarker = childElement; ///

          return true;
        } else {
          return false;
        }
      });

      return topmostDirectoryMarker;
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.isRootDirectoryMarked();

      if (rootDirectoryMarked) {
        this.removeRootDirectoryMarker();
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        topmostDirectoryMarker.remove();
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        this.addMarkerInPlace(draggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableEntry, done) {
      var draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDropTarget = marked ? this : this.getMarkedDropTarget(),
          markedDirectory = markedDropTarget.getMarkedDirectory(),
          markedDirectoryPath = markedDirectory !== null ? markedDirectory.getPath() : null,
          draggableEntryPathWithoutBottommostName = pathUtil.pathWithoutBottommostName(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryPath,
          unmoved = sourcePath === targetPath;

      if (marked && unmoved) {
        this.removeMarker();

        done();
      } else {
        var subDraggableEntries = draggableEntry.getSubEntries(),
            draggableEntries = subDraggableEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);

        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.removeMarker();

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
        var directoryOverlappingDraggableEntry = void 0;

        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var within = explorer === this,
              ///
          noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

          if (!noDragging) {
            var markedDirectory = this.getMarkedDirectory();

            directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectory !== directoryOverlappingDraggableEntry) {
              this.removeMarker();

              this.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
            }
          }
        } else {
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.dragging(draggableEntry, explorer);
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, targetFilePath) {
      var explorer = file.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {} else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);

        filePath = targetFilePath; ///

        this.addFile(filePath);
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
      var explorer = directory.getExplorer();

      var directoryPath = void 0;

      if (targetDirectoryPath === sourceDirectoryPath) {} else if (targetDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);

        var collapsed = directory.isCollapsed();

        directoryPath = targetDirectoryPath; ///

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'openFile',
    value: function openFile(file) {
      var rootDirectory = this.getRootDirectory(),
          filePath = file.getPath(rootDirectory);

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
          rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer, collapsed: collapsed });


      return rootDirectory;
    }
  }, {
    key: 'applyProperties',
    value: function applyProperties() {
      _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'applyProperties', this).apply(this, arguments);

      this.assignContext();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onMove = properties.onMove,
          onOpen = properties.onOpen,
          options = properties.options,
          moveHandler = onMove,
          openHandler = onOpen; ///

      return Element.fromProperties(Explorer, properties, moveHandler, openHandler, options);
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
      draggableEntryDirectory = draggableEntry.isDirectory(),
      directory = draggableEntryDirectory; ///

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJwYXRoVXRpbCIsImFycmF5VXRpbCIsIkRyb3BUYXJnZXQiLCJEaXJlY3RvcnlNYXJrZXIiLCJSb290RGlyZWN0b3J5IiwiRWxlbWVudCIsIlJlYWN0IiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJzb3VyY2VQYXRoIiwib3B0aW9uIiwibWFya2VkIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzUm9vdERpcmVjdG9yeU1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsInJvb3REaXJlY3RvcnkiLCJnZXRGaWxlUGF0aHMiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsIm1hcmtlclBhdGgiLCJhZGRSb290RGlyZWN0b3J5TWFya2VyIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lIiwibmFtZSIsImFwcGVuZCIsImNoaWxkTGlzdEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInNvbWUiLCJjaGlsZEVsZW1lbnQiLCJyZW1vdmVSb290RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwibWFya2VkRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJ0YXJnZXRQYXRoIiwidW5tb3ZlZCIsInJlbW92ZU1hcmtlciIsInN1YkRyYWdnYWJsZUVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJub0RyYWdnaW5nIiwiYWRkTWFya2VyIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImdldEV4cGxvcmVyIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlIiwiYWRkRmlsZSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0Um9vdERpcmVjdG9yeSIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJwcm9wZXJ0aWVzIiwicm9vdERpcmVjdG9yeU5hbWUiLCJyb290RGlyZWN0b3J5Q29sbGFwc2VkIiwiYXJndW1lbnRzIiwiYXNzaWduQ29udGV4dCIsIm9uTW92ZSIsIm9uT3BlbiIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlIiwicmVnRXhwIiwiUmVnRXhwIiwibWF0Y2hlcyIsIm1hdGNoIiwic2Vjb25kTWF0Y2giLCJzZWNvbmQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLFdBQVIsQ0FBaEI7QUFBQSxJQUNNRSxXQUFXRixRQUFRLGFBQVIsQ0FEakI7QUFBQSxJQUVNRyxZQUFZSCxRQUFRLGNBQVIsQ0FGbEI7QUFBQSxJQUdNSSxhQUFhSixRQUFRLGNBQVIsQ0FIbkI7QUFBQSxJQUlNSyxrQkFBa0JMLFFBQVEsbUNBQVIsQ0FKeEI7QUFBQSxJQUtNTSxnQkFBZ0JOLFFBQVEsMENBQVIsQ0FMdEI7O0lBT1FPLE8sR0FBbUJSLEksQ0FBbkJRLE87SUFBU0MsSyxHQUFVVCxJLENBQVZTLEs7O0lBRVhDLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUF3RjtBQUFBLFFBQXJEQyxXQUFxRCx1RUFBdkMsVUFBU0MsVUFBVCxFQUFxQixDQUFFLENBQWdCO0FBQUEsUUFBZFosT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUFBLG9IQUNoRlMsUUFEZ0YsRUFDdEVDLFdBRHNFOztBQUd0RixV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QUFhLEdBQWIsR0FBbUJ6QixrQkFBeEM7O0FBRUEsU0FBT0Esa0JBQVA7QUFDRDs7QUFFRCxTQUFTcUYsbURBQVQsQ0FBNkRyRixrQkFBN0QsRUFBaUZyQixVQUFqRixFQUE2RjhDLFVBQTdGLEVBQXlHO0FBQ3ZHOUMsZUFBYUEsV0FBVzJHLE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsS0FBMUIsRUFBaUNBLE9BQWpDLENBQXlDLEtBQXpDLEVBQWdELEtBQWhELENBQWIsQ0FEdUcsQ0FDakM7O0FBRXRFLE1BQU1DLFNBQVMsSUFBSUMsTUFBSixDQUFXLE1BQU03RyxVQUFOLEdBQW1CLE9BQTlCLENBQWY7QUFBQSxNQUNNOEcsVUFBVXpGLG1CQUFtQjBGLEtBQW5CLENBQXlCSCxNQUF6QixDQURoQjtBQUFBLE1BRU1JLGNBQWMxSCxVQUFVMkgsTUFBVixDQUFpQkgsT0FBakIsQ0FGcEI7O0FBSUF6Rix1QkFBcUJ5QixhQUFha0UsV0FBbEMsQ0FQdUcsQ0FPeEQ7O0FBRS9DLFNBQU8zRixrQkFBUDtBQUNEIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBwYXRoVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9wYXRoJyksXG4gICAgICBhcnJheVV0aWwgPSByZXF1aXJlKCcuL3V0aWwvYXJyYXknKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeScpLFxuICAgICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5L3Jvb3QnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGdldEZpbGVQYXRocygpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTsgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkUm9vdERpcmVjdG9yeU1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BUYXJnZXQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGgsXG4gICAgICAgICAgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChtYXJrZWQgJiYgdW5tb3ZlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZShmaWxlKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuZ2V0Um9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyByb290RGlyZWN0b3J5TmFtZSwgcm9vdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBuYW1lID0gcm9vdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHJvb3REaXJlY3RvcnlDb2xsYXBzZWQsIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIHJvb3REaXJlY3RvcnkgPSA8Um9vdERpcmVjdG9yeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPjtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG5cbiAgYXBwbHlQcm9wZXJ0aWVzKCkge1xuICAgIHN1cGVyLmFwcGx5UHJvcGVydGllcyguLi5hcmd1bWVudHMpO1xuXG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdleHBsb3JlcidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAncm9vdERpcmVjdG9yeU5hbWUnLFxuICAgICdyb290RGlyZWN0b3J5Q29sbGFwc2VkJyxcbiAgICAnb25PcGVuJyxcbiAgICAnb25Nb3ZlJyxcbiAgICAnb3B0aW9ucydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5KCksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGg6IHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5OiBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2VQYXRoICsgJyguKiQpJyksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==