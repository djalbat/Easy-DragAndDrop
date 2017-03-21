'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    var moveHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var name = rootDirectoryName,
        ///
    explorer = _this,
        ///
    rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer, className: 'directory' });

    _this.openHandler = openHandler;

    _this.options = {};

    _this.rootDirectory = rootDirectory;

    _this.append(rootDirectory);
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
    key: 'getFilePaths',
    value: function getFilePaths() {
      return this.rootDirectory.getFilePaths();
    }
  }, {
    key: 'getRootDirectoryName',
    value: function getRootDirectoryName() {
      return this.rootDirectory.getName();
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      return this.rootDirectory.getMarkedDirectory();
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      return this.rootDirectory.getDirectoryOverlappingDraggableEntry(draggableEntry);
    }
  }, {
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      return this.rootDirectory.getDraggableEntryPath(draggableEntry);
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      this.rootDirectory.addFile(filePath);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      this.rootDirectory.addDirectory(directoryPath, collapsed);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      this.rootDirectory.removeFile(filePath);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      this.rootDirectory.removeDirectory(directoryPath);
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

        this.rootDirectory.addMarker(markerPath, draggableEntryType);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.rootDirectory.addMarker(markerPath, draggableEntryType);
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryMarker = React.createElement(DirectoryMarker, { name: name, className: 'marker' });

      this.append(topmostDirectoryMarker);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        this.rootDirectory.removeMarker();
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        topmostDirectoryMarker.remove();
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var rootDirectoryMarked = this.rootDirectory.isMarked();

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
    key: 'openFile',
    value: function openFile(file) {
      var filePath = file.getPath(this.rootDirectory);

      this.openHandler(filePath);
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
  }], [{
    key: 'clone',
    value: function clone(selector, rootDirectoryName, openHandler, moveHandler) {
      return Element.clone(Explorer, selector, rootDirectoryName, openHandler, moveHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, rootDirectoryName, openHandler, moveHandler) {
      return Element.fromHTML(Explorer, html, rootDirectoryName, openHandler, moveHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var rootDirectoryName = properties.rootDirectoryName,
          onOpen = properties.onOpen,
          onMove = properties.onMove,
          openHandler = onOpen,
          moveHandler = onMove; ///

      return Element.fromProperties(Explorer, properties, rootDirectoryName, openHandler, moveHandler);
    }
  }]);

  return Explorer;
}(DropTarget);

Object.assign(Explorer, {
  tagName: 'ul',
  ignoredAttributes: ['rootDirectoryName', 'onOpen', 'onMove']
});

module.exports = Explorer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVsZW1lbnQiLCJSZWFjdCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcFRhcmdldCIsIkRpcmVjdG9yeU1hcmtlciIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJvcGVuSGFuZGxlciIsInNvdXJjZVBhdGgiLCJtb3ZlSGFuZGxlciIsInBhdGhNYXBzIiwiZG9uZSIsIm5hbWUiLCJleHBsb3JlciIsInJvb3REaXJlY3RvcnkiLCJhcHBlbmQiLCJvcHRpb24iLCJnZXRGaWxlUGF0aHMiLCJnZXROYW1lIiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZHJhZ2dhYmxlRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImFkZERpcmVjdG9yeSIsInJlbW92ZUZpbGUiLCJyZW1vdmVEaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlIiwibWFya2VkIiwidG9CZU1hcmtlZCIsImNoaWxkTGlzdEVsZW1lbnRzIiwiZ2V0Q2hpbGRFbGVtZW50cyIsInNvbWUiLCJjaGlsZEVsZW1lbnQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwibWFya2VkRHJvcFRhcmdldCIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInRhcmdldFBhdGgiLCJ1bm1vdmVkIiwic3ViRHJhZ2dhYmxlRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJkcmFnZ2FibGVFbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRHJhZ2dhYmxlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiaXNUb0JlTWFya2VkIiwid2l0aGluIiwibm9EcmFnZ2luZ1dpdGhpbiIsImhhc09wdGlvbiIsIk5PX0RSQUdHSU5HX1dJVEhJTiIsIm5vRHJhZ2dpbmciLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsImdldERyb3BUYXJnZXRUb0JlTWFya2VkIiwiZHJhZ2dpbmciLCJkaXJlY3RvcnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwibW92ZWREaXJlY3RvcnlQYXRoIiwiZ2V0RXhwbG9yZXIiLCJpc0NvbGxhcHNlZCIsImZpbGUiLCJzb3VyY2VGaWxlUGF0aCIsIm1vdmVkRmlsZVBhdGgiLCJtYXAiLCJwYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiY2xvbmUiLCJodG1sIiwiZnJvbUhUTUwiLCJwcm9wZXJ0aWVzIiwib25PcGVuIiwib25Nb3ZlIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsVUFBVUYsS0FBS0UsT0FEckI7QUFBQSxJQUVNQyxRQUFRSCxLQUFLRyxLQUZuQjs7QUFJQSxJQUFNQyxPQUFPSCxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01JLFVBQVVKLFFBQVEsV0FBUixDQURoQjtBQUFBLElBRU1LLGFBQWFMLFFBQVEsY0FBUixDQUZuQjtBQUFBLElBR01NLGtCQUFrQk4sUUFBUSxtQ0FBUixDQUh4QjtBQUFBLElBSU1PLGdCQUFnQlAsUUFBUSwwQ0FBUixDQUp0Qjs7SUFNTVEsUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLGlCQUF0QixFQUFxSTtBQUFBLFFBQTVGQyxXQUE0Rix1RUFBOUUsVUFBU0MsVUFBVCxFQUFxQixDQUFFLENBQXVEO0FBQUEsUUFBckRDLFdBQXFELHVFQUF2QyxVQUFTQyxRQUFULEVBQW1CQyxJQUFuQixFQUF5QjtBQUFFQTtBQUFTLEtBQUc7O0FBQUE7O0FBQUEsb0hBQzdITixRQUQ2SCxFQUNuSEksV0FEbUg7O0FBR25JLFFBQU1HLE9BQU9OLGlCQUFiO0FBQUEsUUFBZ0M7QUFDMUJPLG9CQUROO0FBQUEsUUFDd0I7QUFDbEJDLG9CQUFnQixvQkFBQyxhQUFELElBQWUsTUFBTUYsSUFBckIsRUFBMkIsVUFBVUMsUUFBckMsRUFBK0MsV0FBVSxXQUF6RCxHQUZ0Qjs7QUFJQSxVQUFLTixXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLUCxPQUFMLEdBQWUsRUFBZjs7QUFFQSxVQUFLYyxhQUFMLEdBQXFCQSxhQUFyQjs7QUFFQSxVQUFLQyxNQUFMLENBQVlELGFBQVo7QUFibUk7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RUFBd0I7QUFDdEJxRyxXQUFTLElBRGE7QUFFdEJDLHFCQUFtQixDQUNqQixtQkFEaUIsRUFFakIsUUFGaUIsRUFHakIsUUFIaUI7QUFGRyxDQUF4Qjs7QUFTQUMsT0FBT0MsT0FBUCxHQUFpQnhHLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgRWxlbWVudCA9IGVhc3kuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeS5SZWFjdDtcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpLFxuICAgICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5JyksXG4gICAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdCcpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyID0gZnVuY3Rpb24oc291cmNlUGF0aCkge30sIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9ICkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICBjb25zdCBuYW1lID0gcm9vdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIHJvb3REaXJlY3RvcnkgPSA8Um9vdERpcmVjdG9yeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNsYXNzTmFtZT1cImRpcmVjdG9yeVwiIC8+O1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge307XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RmlsZVBhdGhzKCk7IH1cbiAgXG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBcbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIFxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7IH1cbiAgXG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoKTsgfVxuICBcbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVGaWxlKGZpbGVQYXRoKTsgfVxuICBcbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTsgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCwgIC8vL1xuICAgICAgICAgIG5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSwgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSA8RGlyZWN0b3J5TWFya2VyIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm1hcmtlclwiIC8+O1xuXG4gICAgdGhpcy5hcHBlbmQodG9wbW9zdERpcmVjdG9yeU1hcmtlcik7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcbiAgICBcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TWFya2VyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKTtcblxuICAgIGNoaWxkTGlzdEVsZW1lbnRzLnNvbWUoZnVuY3Rpb24oY2hpbGRFbGVtZW50KSB7XG4gICAgICBpZiAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TWFya2VyO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BUYXJnZXQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aCxcbiAgICAgICAgICB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKG1hcmtlZCAmJiB1bm1vdmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN1YkRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gc3ViRHJhZ2dhYmxlRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgICAgXG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCB3aXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbiA9IHRoaXMuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHdpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluO1xuXG4gICAgICAgIGlmICghbm9EcmFnZ2luZykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGRpcmVjdG9yeVBhdGg7XG4gICAgXG4gICAgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkRGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAobW92ZWRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGggPSBtb3ZlZEZpbGVQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZShmaWxlKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KTtcbiAgICBcbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdID0gdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHJvb3REaXJlY3RvcnlOYW1lLCBvbk9wZW4sIG9uTW92ZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmU7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAncm9vdERpcmVjdG9yeU5hbWUnLCBcbiAgICAnb25PcGVuJyxcbiAgICAnb25Nb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==