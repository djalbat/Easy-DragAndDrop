'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    Element = easy.Element,
    React = easy.React;

var util = require('./util'),
    options = require('./options'),
    DropTarget = require('./dropTarget'),
    DirectoryMarker = require('./explorer/entry/marker/directory'),
    RootDirectory = require('./explorer/draggableEntry/directory/root');

var Explorer = function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  function Explorer(selector, rootDirectoryName) {
    var openHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (sourcePath) {};
    var moveHandler = arguments[3];
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

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
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerPath = draggableEntryPath;

        this.addRootDirectoryMarker(markerPath, draggableEntryType);
      }
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
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryOverlappingDraggableEntry !== null;

      return toBeMarked;
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
          draggableEntryPathWithoutBottommostName = util.pathWithoutBottommostName(draggableEntryPath),
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
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.removeMarkerGlobally();
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
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
      var explorer = directory.getExplorer();

      var directoryPath = void 0;

      if (movedDirectoryPath === sourceDirectoryPath) {} else if (movedDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);

        var collapsed = directory.isCollapsed();

        directoryPath = movedDirectoryPath; ///

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath) {
      var explorer = file.getExplorer();

      var filePath = void 0;

      if (movedFilePath === sourceFilePath) {} else if (movedFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);

        filePath = movedFilePath; ///

        this.addFile(filePath);
      }
    }
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = sourcePath === null ? util.prependTargetPath(draggableEntryPath, targetPath) : util.replaceSourcePathWithTargetPath(draggableEntryPath, sourcePath, targetPath);

        pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return pathMap;
      });

      return pathMaps;
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var rootDirectoryName = properties.rootDirectoryName,
          name = rootDirectoryName,
          explorer = this,
          rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer });


      return rootDirectory;
    }
  }, {
    key: 'openFile',
    value: function openFile(file) {
      var rootDirectory = this.getRootDirectory(),
          filePath = file.getPath(rootDirectory);

      this.openHandler(filePath);
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
    key: 'applyProperties',
    value: function applyProperties() {
      _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'applyProperties', this).apply(this, arguments);

      this.assignContext(['addFile', 'addDirectory', 'removeFile', 'removeDirectory', 'getMarkedDirectory', 'getFilePaths', 'getDraggableEntryPath', 'getDirectoryOverlappingDraggableEntry', 'addRootDirectoryMarker', 'removeRootDirectoryMarker', 'isRootDirectoryMarked', 'getRootDirectoryName', 'getRootDirectory']);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var rootDirectoryName = properties.rootDirectoryName,
          onOpen = properties.onOpen,
          onMove = properties.onMove,
          options = properties.options,
          openHandler = onOpen,
          moveHandler = onMove; ///

      return Element.fromProperties(Explorer, properties, rootDirectoryName, openHandler, moveHandler, options);
    }
  }]);

  return Explorer;
}(DropTarget);

Object.assign(Explorer, {
  tagName: 'ul',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: ['rootDirectoryName', 'onOpen', 'onMove']
});

module.exports = Explorer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVsZW1lbnQiLCJSZWFjdCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcFRhcmdldCIsIkRpcmVjdG9yeU1hcmtlciIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJvcGVuSGFuZGxlciIsInNvdXJjZVBhdGgiLCJtb3ZlSGFuZGxlciIsIm9wdGlvbiIsImRyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgiLCJhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwibWFya2VyUGF0aCIsImFkZFJvb3REaXJlY3RvcnlNYXJrZXIiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJuYW1lIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlciIsImFwcGVuZCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiY2hpbGRMaXN0RWxlbWVudHMiLCJnZXRDaGlsZEVsZW1lbnRzIiwic29tZSIsImNoaWxkRWxlbWVudCIsIm1hcmtlZCIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwidGFyZ2V0UGF0aCIsInVubW92ZWQiLCJyZW1vdmVNYXJrZXIiLCJzdWJEcmFnZ2FibGVFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJleHBsb3JlciIsImlzVG9CZU1hcmtlZCIsIndpdGhpbiIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJub0RyYWdnaW5nIiwiYWRkTWFya2VyIiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZSIsImFkZEZpbGUiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwcmVwZW5kVGFyZ2V0UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJwcm9wZXJ0aWVzIiwicm9vdERpcmVjdG9yeSIsImdldFJvb3REaXJlY3RvcnkiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNSb290RGlyZWN0b3J5TWFya2VkIiwicmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlciIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInJlbW92ZSIsImFyZ3VtZW50cyIsImFzc2lnbkNvbnRleHQiLCJvbk9wZW4iLCJvbk1vdmUiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsVUFBVUYsS0FBS0UsT0FEckI7QUFBQSxJQUVNQyxRQUFRSCxLQUFLRyxLQUZuQjs7QUFJQSxJQUFNQyxPQUFPSCxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01JLFVBQVVKLFFBQVEsV0FBUixDQURoQjtBQUFBLElBRU1LLGFBQWFMLFFBQVEsY0FBUixDQUZuQjtBQUFBLElBR01NLGtCQUFrQk4sUUFBUSxtQ0FBUixDQUh4QjtBQUFBLElBSU1PLGdCQUFnQlAsUUFBUSwwQ0FBUixDQUp0Qjs7SUFNTVEsUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLGlCQUF0QixFQUEyRztBQUFBLFFBQWxFQyxXQUFrRSx1RUFBcEQsVUFBU0MsVUFBVCxFQUFxQixDQUFFLENBQTZCO0FBQUEsUUFBM0JDLFdBQTJCO0FBQUEsUUFBZFQsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUFBLG9IQUNuR0ssUUFEbUcsRUFDekZJLFdBRHlGOztBQUd6RyxVQUFLRixXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLUCxPQUFMLEdBQWVBLE9BQWY7QUFMeUc7QUFNMUc7Ozs7OEJBRVNVLE0sRUFBUTtBQUNoQixXQUFLVixPQUFMLENBQWFVLE1BQWIsSUFBdUIsSUFBdkI7QUFDRDs7O2dDQUVXQSxNLEVBQVE7QUFDbEIsYUFBTyxLQUFLVixPQUFMLENBQWFVLE1BQWIsQ0FBUDtBQUNEOzs7OEJB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SCxHQUN1QlgsVUFEdkIsQ0FDR1csTUFESDtBQUFBLFVBQ1d0RyxPQURYLEdBQ3VCMkYsVUFEdkIsQ0FDVzNGLE9BRFg7QUFBQSxVQUUxQk8sV0FGMEIsR0FFWjhGLE1BRlk7QUFBQSxVQUcxQjVGLFdBSDBCLEdBR1o2RixNQUhZLEVBR0o7O0FBRTVCLGFBQU96RyxRQUFRMEcsY0FBUixDQUF1Qm5HLFFBQXZCLEVBQWlDdUYsVUFBakMsRUFBNkNyRixpQkFBN0MsRUFBZ0VDLFdBQWhFLEVBQTZFRSxXQUE3RSxFQUEwRlQsT0FBMUYsQ0FBUDtBQUNEOzs7O0VBblRvQkMsVTs7QUFzVHZCdUcsT0FBT0MsTUFBUCxDQUFjckcsUUFBZCxFQUF3QjtBQUN0QnNHLFdBQVMsSUFEYTtBQUV0QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRztBQUt0QkMscUJBQW1CLENBQ2pCLG1CQURpQixFQUVqQixRQUZpQixFQUdqQixRQUhpQjtBQUxHLENBQXhCOztBQVlBQyxPQUFPQyxPQUFQLEdBQWlCM0csUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBFbGVtZW50ID0gZWFzeS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5LlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKSxcbiAgICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS9yb290Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgbW92ZUhhbmRsZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5hZGRSb290RGlyZWN0b3J5TWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCwgIC8vL1xuICAgICAgICAgIG5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSwgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSA8RGlyZWN0b3J5TWFya2VyIG5hbWU9e25hbWV9IC8+O1xuXG4gICAgdGhpcy5hcHBlbmQodG9wbW9zdERpcmVjdG9yeU1hcmtlcik7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlNYXJrZXI7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcFRhcmdldC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoLFxuICAgICAgICAgIHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAobWFya2VkICYmIHVubW92ZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdID0gdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgcm9vdERpcmVjdG9yeU5hbWUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbmFtZSA9IHJvb3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICByb290RGlyZWN0b3J5ID0gPFJvb3REaXJlY3RvcnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPjtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG5cbiAgb3BlbkZpbGUoZmlsZSkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmdldFJvb3REaXJlY3RvcnkoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aChyb290RGlyZWN0b3J5KTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmlzUm9vdERpcmVjdG9yeU1hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMuaXNSb290RGlyZWN0b3J5TWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TWFya2VyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYXBwbHlQcm9wZXJ0aWVzKCkge1xuICAgIHN1cGVyLmFwcGx5UHJvcGVydGllcyguLi5hcmd1bWVudHMpO1xuXG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KFtcbiAgICAgICdhZGRGaWxlJyxcbiAgICAgICdhZGREaXJlY3RvcnknLFxuICAgICAgJ3JlbW92ZUZpbGUnLFxuICAgICAgJ3JlbW92ZURpcmVjdG9yeScsXG4gICAgICAnZ2V0TWFya2VkRGlyZWN0b3J5JyxcbiAgICAgICdnZXRGaWxlUGF0aHMnLFxuICAgICAgJ2dldERyYWdnYWJsZUVudHJ5UGF0aCcsXG4gICAgICAnZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeScsXG4gICAgICAnYWRkUm9vdERpcmVjdG9yeU1hcmtlcicsXG4gICAgICAncmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlcicsXG4gICAgICAnaXNSb290RGlyZWN0b3J5TWFya2VkJyxcbiAgICAgICdnZXRSb290RGlyZWN0b3J5TmFtZScsXG4gICAgICAnZ2V0Um9vdERpcmVjdG9yeSdcbiAgICBdKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyByb290RGlyZWN0b3J5TmFtZSwgb25PcGVuLCBvbk1vdmUsIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4sIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyLCBvcHRpb25zKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=