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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJwYXRoVXRpbCIsImFycmF5VXRpbCIsIkRyb3BUYXJnZXQiLCJEaXJlY3RvcnlNYXJrZXIiLCJSb290RGlyZWN0b3J5IiwiRWxlbWVudCIsIlJlYWN0IiwiRXhwbG9yZXIiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwib3BlbkhhbmRsZXIiLCJzb3VyY2VQYXRoIiwib3B0aW9uIiwibWFya2VkIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzUm9vdERpcmVjdG9yeU1hcmtlZCIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJyZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwidG9CZU1hcmtlZCIsInJvb3REaXJlY3RvcnkiLCJnZXRGaWxlUGF0aHMiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsIm1hcmtlclBhdGgiLCJhZGRSb290RGlyZWN0b3J5TWFya2VyIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoIiwiYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lIiwibmFtZSIsImFwcGVuZCIsImNoaWxkTGlzdEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInNvbWUiLCJjaGlsZEVsZW1lbnQiLCJyZW1vdmVSb290RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlIiwiaXNNYXJrZWQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwibWFya2VkRGlyZWN0b3J5IiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJ0YXJnZXRQYXRoIiwidW5tb3ZlZCIsInJlbW92ZU1hcmtlciIsInN1YkRyYWdnYWJsZUVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJub0RyYWdnaW5nIiwiYWRkTWFya2VyIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImdldEV4cGxvcmVyIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlIiwiYWRkRmlsZSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJ0YXJnZXREaXJlY3RvcnlQYXRoIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0Um9vdERpcmVjdG9yeSIsInBhdGhNYXBzIiwibWFwIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsInByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgiLCJwYXRoTWFwIiwicHJvcGVydGllcyIsInJvb3REaXJlY3RvcnlOYW1lIiwicm9vdERpcmVjdG9yeUNvbGxhcHNlZCIsImFyZ3VtZW50cyIsImFzc2lnbkNvbnRleHQiLCJvbk1vdmUiLCJvbk9wZW4iLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCIsInNlY29uZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLFVBQVVELFFBQVEsV0FBUixDQUFoQjtBQUFBLElBQ01FLFdBQVdGLFFBQVEsYUFBUixDQURqQjtBQUFBLElBRU1HLFlBQVlILFFBQVEsY0FBUixDQUZsQjtBQUFBLElBR01JLGFBQWFKLFFBQVEsY0FBUixDQUhuQjtBQUFBLElBSU1LLGtCQUFrQkwsUUFBUSxtQ0FBUixDQUp4QjtBQUFBLElBS01NLGdCQUFnQk4sUUFBUSwwQ0FBUixDQUx0Qjs7SUFPUU8sTyxHQUFtQlIsSSxDQUFuQlEsTztJQUFTQyxLLEdBQVVULEksQ0FBVlMsSzs7SUFFWEMsUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLFdBQXRCLEVBQXdGO0FBQUEsUUFBckRDLFdBQXFELHVFQUF2QyxVQUFTQyxVQUFULEVBQXFCLENBQUUsQ0FBZ0I7QUFBQSxRQUFkWixPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsb0hBQ2hGUyxRQURnRixFQUN0RUMsV0FEc0U7O0FBR3RGLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVB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QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFiLENBRHVHLENBQ2pDOztBQUV0RSxNQUFNQyxTQUFTLElBQUlDLE1BQUosQ0FBVyxNQUFNNUcsVUFBTixHQUFtQixPQUE5QixDQUFmO0FBQUEsTUFDTTZHLFVBQVV4RixtQkFBbUJ5RixLQUFuQixDQUF5QkgsTUFBekIsQ0FEaEI7QUFBQSxNQUVNSSxjQUFjekgsVUFBVTBILE1BQVYsQ0FBaUJILE9BQWpCLENBRnBCOztBQUlBeEYsdUJBQXFCeUIsYUFBYWlFLFdBQWxDLENBUHVHLENBT3hEOztBQUUvQyxTQUFPMUYsa0JBQVA7QUFDRCIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgcGF0aFV0aWwgPSByZXF1aXJlKCcuL3V0aWwvcGF0aCcpLFxuICAgICAgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi91dGlsL2FycmF5JyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKSxcbiAgICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS9yb290Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMuaXNSb290RGlyZWN0b3J5TWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TWFya2VyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBnZXRGaWxlUGF0aHMoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RmlsZVBhdGhzKCk7IH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5hZGRSb290RGlyZWN0b3J5TWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCwgIC8vL1xuICAgICAgICAgIG5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSwgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSA8RGlyZWN0b3J5TWFya2VyIG5hbWU9e25hbWV9IC8+O1xuXG4gICAgdGhpcy5hcHBlbmQodG9wbW9zdERpcmVjdG9yeU1hcmtlcik7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlNYXJrZXI7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMuaXNSb290RGlyZWN0b3J5TWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVSb290RGlyZWN0b3J5TWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wVGFyZ2V0LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoLFxuICAgICAgICAgIHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAobWFya2VkICYmIHVubW92ZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGUoZmlsZSkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmdldFJvb3REaXJlY3RvcnkoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aChyb290RGlyZWN0b3J5KTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeSgpLFxuICAgICAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3Rvcnk7ICAvLy9cblxuICAgICAgICAgICAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cbiAgICAgIFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuICAgICAgXG4gICAgICBjb25zdCBwYXRoTWFwID0ge1xuICAgICAgICAgICAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgICAgICAgICAgICBkaXJlY3Rvcnk6IGRpcmVjdG9yeVxuICAgICAgICAgICAgfTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHJvb3REaXJlY3RvcnlOYW1lLCByb290RGlyZWN0b3J5Q29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgY29sbGFwc2VkID0gcm9vdERpcmVjdG9yeUNvbGxhcHNlZCwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+O1xuXG4gICAgcmV0dXJuIHJvb3REaXJlY3Rvcnk7XG4gIH1cblxuICBhcHBseVByb3BlcnRpZXMoKSB7XG4gICAgc3VwZXIuYXBwbHlQcm9wZXJ0aWVzKC4uLmFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUsIG9uT3Blbiwgb3B0aW9ucyB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW47IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdyb290RGlyZWN0b3J5TmFtZScsXG4gICAgJ3Jvb3REaXJlY3RvcnlDb2xsYXBzZWQnLFxuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2VQYXRoICsgJyguKiQpJyksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiJdfQ==