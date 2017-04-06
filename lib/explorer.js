'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var util = require('./util'),
    options = require('./options'),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsInV0aWwiLCJvcHRpb25zIiwiRHJvcFRhcmdldCIsIkRpcmVjdG9yeU1hcmtlciIsIlJvb3REaXJlY3RvcnkiLCJFbGVtZW50IiwiUmVhY3QiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwibW92ZUhhbmRsZXIiLCJvcGVuSGFuZGxlciIsInNvdXJjZVBhdGgiLCJvcHRpb24iLCJtYXJrZWQiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNSb290RGlyZWN0b3J5TWFya2VkIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlciIsInJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlciIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJ0b0JlTWFya2VkIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkUm9vdERpcmVjdG9yeU1hcmtlciIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSIsIm5hbWUiLCJhcHBlbmQiLCJjaGlsZExpc3RFbGVtZW50cyIsImdldENoaWxkRWxlbWVudHMiLCJzb21lIiwiY2hpbGRFbGVtZW50IiwicmVtb3ZlUm9vdERpcmVjdG9yeU1hcmtlciIsInJlbW92ZSIsImlzTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsIm1hcmtlZERpcmVjdG9yeSIsImdldE1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwidGFyZ2V0UGF0aCIsInVubW92ZWQiLCJyZW1vdmVNYXJrZXIiLCJzdWJEcmFnZ2FibGVFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVEcmFnZ2FibGVFbnRyaWVzIiwiZXhwbG9yZXIiLCJpc1RvQmVNYXJrZWQiLCJ3aXRoaW4iLCJub0RyYWdnaW5nV2l0aGluIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfV0lUSElOIiwibm9EcmFnZ2luZyIsImFkZE1hcmtlciIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiZmlsZSIsInNvdXJjZUZpbGVQYXRoIiwibW92ZWRGaWxlUGF0aCIsImdldEV4cGxvcmVyIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlIiwiYWRkRmlsZSIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5IiwiY29sbGFwc2VkIiwiaXNDb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyb290RGlyZWN0b3J5IiwiZ2V0Um9vdERpcmVjdG9yeSIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsInRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCIsInByZXBlbmRUYXJnZXRQYXRoIiwicmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aCIsInByb3BlcnRpZXMiLCJyb290RGlyZWN0b3J5TmFtZSIsImFyZ3VtZW50cyIsImFzc2lnbkNvbnRleHQiLCJvbk1vdmUiLCJvbk9wZW4iLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUUsVUFBVUYsUUFBUSxXQUFSLENBRGhCO0FBQUEsSUFFTUcsYUFBYUgsUUFBUSxjQUFSLENBRm5CO0FBQUEsSUFHTUksa0JBQWtCSixRQUFRLG1DQUFSLENBSHhCO0FBQUEsSUFJTUssZ0JBQWdCTCxRQUFRLDBDQUFSLENBSnRCOztJQU1RTSxPLEdBQW1CUCxJLENBQW5CTyxPO0lBQVNDLEssR0FBVVIsSSxDQUFWUSxLOztJQUVYQyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBd0Y7QUFBQSxRQUFyREMsV0FBcUQsdUVBQXZDLFVBQVNDLFVBQVQsRUFBcUIsQ0FBRSxDQUFnQjtBQUFBLFFBQWRWLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFBQSxvSEFDaEZPLFFBRGdGLEVBQ3RFQyxXQURzRTs7QUFHdEYsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsVUFBS1QsT0FBTCxHQUFlQSxPQUFmO0FBTHNGO0FBTXZGOzs7OzhCQUVTVyxNLEVBQVE7QUFDaEIsV0FBS1gsT0FBTCxDQUFhVyxNQUFiLElBQXVCLElBQXZCO0FBQ0Q7OztnQ0FFV0EsTSxFQUFRO0FBQ2xCLGFBQU8sS0FBS1gsT0FBTCxDQUFhVyxNQUFiLENBQVA7QUFDRDs7OzhCQUVTQSxNLEVBQVE7QUFDaEJBLGVBQVUsS0FB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QUF3U3ZCeUcsT0FBT0MsTUFBUCxDQUFjckcsUUFBZCxFQUF3QjtBQUN0QnNHLFdBQVMsSUFEYTtBQUV0QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGRztBQUt0QkMscUJBQW1CLENBQ2pCLG1CQURpQixFQUVqQixRQUZpQixFQUdqQixRQUhpQixFQUlqQixTQUppQjtBQUxHLENBQXhCOztBQWFBQyxPQUFPQyxPQUFQLEdBQWlCM0csUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeScpLFxuICAgICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5L3Jvb3QnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5hZGRSb290RGlyZWN0b3J5TWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkUm9vdERpcmVjdG9yeU1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BUYXJnZXQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aCxcbiAgICAgICAgICB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKG1hcmtlZCAmJiB1bm1vdmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN1YkRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gc3ViRHJhZ2dhYmxlRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgICAgXG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCB3aXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbiA9IHRoaXMuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHdpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluO1xuXG4gICAgICAgIGlmICghbm9EcmFnZ2luZykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAobW92ZWRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSBtb3ZlZEZpbGVQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZShmaWxlKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuZ2V0Um9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0ge30sXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHJvb3REaXJlY3RvcnlOYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz47XG5cbiAgICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbiAgfVxuXG4gIGFwcGx5UHJvcGVydGllcygpIHtcbiAgICBzdXBlci5hcHBseVByb3BlcnRpZXMoLi4uYXJndW1lbnRzKTtcblxuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbjsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19