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
  ignoredProperties: ['rootDirectoryName', 'onOpen', 'onMove', 'options']
});

module.exports = Explorer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVsZW1lbnQiLCJSZWFjdCIsInV0aWwiLCJvcHRpb25zIiwiRHJvcFRhcmdldCIsIkRpcmVjdG9yeU1hcmtlciIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsInNvdXJjZVBhdGgiLCJvcHRpb24iLCJtYXJrZWQiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNSb290RGlyZWN0b3J5TWFya2VkIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkUm9vdERpcmVjdG9yeU1hcmtlciIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsIm5hbWUiLCJhcHBlbmQiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJzb21lIiwiY2hpbGRFbGVtZW50IiwicmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlciIsInJlbW92ZSIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwidGFyZ2V0UGF0aCIsInVubW92ZWQiLCJyZW1vdmVNYXJrZXIiLCJzdWJEcmFnZ2FibGVFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwiZXhwbG9yZXIiLCJpc1RvQmVNYXJrZWQiLCJ3aXRoaW4iLCJub0RyYWdnaW5nV2l0aGluIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwibm9EcmFnZ2luZyIsImFkZE1hcmtlciIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsImdldEV4cGxvcmVyIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlIiwiYWRkRmlsZSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5IiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyb290RGlyZWN0b3J5IiwiZ2V0Um9vdERpcmVjdG9yeSIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsInRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCIsInByZXBlbmRUYXJnZXRQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aCIsInByb3BlcnRpZXMiLCJyb290RGlyZWN0b3J5TmFtZSIsImFyZ3VtZW50cyIsImFzc2lnbkNvbnRleHQiLCJvbk1vdmUiLCJvbk9wZW4iLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQUEsSUFDTUMsVUFBVUYsS0FBS0UsT0FEckI7QUFBQSxJQUVNQyxRQUFRSCxLQUFLRyxLQUZuQjs7QUFJQSxJQUFNQyxPQUFPSCxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01JLFVBQVVKLFFBQVEsV0FBUixDQURoQjtBQUFBLElBRU1LLGFBQWFMLFFBQVEsY0FBUixDQUZuQjtBQUFBLElBR01NLGtCQUFrQk4sUUFBUSxtQ0FBUixDQUh4QjtBQUFBLElBSU1PLGdCQUFnQlAsUUFBUSwwQ0FBUixDQUp0Qjs7SUFNTVEsUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLFdBQXRCLEVBQXdGO0FBQUEsUUFBckRDLFdBQXFELHVFQUF2QyxVQUFTQyxVQUFULEVBQXFCLENBQUUsQ0FBZ0I7QUFBQSxRQUFkUixPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsb0hBQ2hGSyxRQURnRixFQUN0RUMsV0FEc0U7O0FBR3RGLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtQLE9BQUwsR0FBZUEsT0FBZjtBQUxzRjtBQU12Rjs7Ozs4QkFFU1MsTSxFQUFRO0FBQ2hCLFdBQUtULE9BQUwsQ0FBYVMsTUFBYixJQUF1QixJQUF2QjtBQUNEOzs7Z0NBRVdBLE0sRUFBUTtBQUNsQixhQUFPLEtBQUtULE9BQUwsQ0FBYVMsTUFBYixDQUFQO0FBQ0Q7Ozs4QkFFU0EsTSxFQUFRO0FBQ2hCQSxl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clNvQkMsVTs7QUF3U3ZCdUcsT0FBT0MsTUFBUCxDQUFjckcsUUFBZCxFQUF3QjtBQUN0QnNHLFdBQVMsSUFEYTtBQUV0QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRztBQUt0QkMscUJBQW1CLENBQ2pCLG1CQURpQixFQUVqQixRQUZpQixFQUdqQixRQUhpQixFQUlqQixTQUppQjtBQUxHLENBQXhCOztBQWFBQyxPQUFPQyxPQUFQLEdBQWlCM0csUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBFbGVtZW50ID0gZWFzeS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5LlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0JyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKSxcbiAgICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS9yb290Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIgPSBmdW5jdGlvbihzb3VyY2VQYXRoKSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGhhc09wdGlvbihvcHRpb24pIHtcbiAgICBvcHRpb24gPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpOyAvLy9cblxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMuaXNSb290RGlyZWN0b3J5TWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TWFya2VyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRSb290RGlyZWN0b3J5TWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gPERpcmVjdG9yeU1hcmtlciBuYW1lPXtuYW1lfSAvPjtcblxuICAgIHRoaXMuYXBwZW5kKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIpO1xuICB9XG5cbiAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKTtcblxuICAgIGNoaWxkTGlzdEVsZW1lbnRzLnNvbWUoZnVuY3Rpb24oY2hpbGRFbGVtZW50KSB7XG4gICAgICBpZiAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TWFya2VyO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmlzUm9vdERpcmVjdG9yeU1hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcFRhcmdldC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoLFxuICAgICAgICAgIHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAobWFya2VkICYmIHVubW92ZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5GaWxlKGZpbGUpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5nZXRSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgocm9vdERpcmVjdG9yeSk7XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHJvb3REaXJlY3RvcnlOYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz47XG5cbiAgICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbiAgfVxuXG4gIGFwcGx5UHJvcGVydGllcygpIHtcbiAgICBzdXBlci5hcHBseVByb3BlcnRpZXMoLi4uYXJndW1lbnRzKTtcblxuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbjsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19