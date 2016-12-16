'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    options = require('./options'),
    DirectoryMarker = require('./explorer/entry/directoryMarker'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

var Explorer = function (_DroppableElement) {
  _inherits(Explorer, _DroppableElement);

  function Explorer(selector, rootDirectoryName, activateHandler, moveHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var explorer = _this,
        ///
    rootDirectory = RootDirectory.clone(rootDirectoryName, explorer, _this.activateFileEventHandler.bind(_this));

    _this.activateHandler = activateHandler;

    _this.rootDirectory = rootDirectory;

    _this.options = {};

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
    value: function removeFile(filePath, removeEmptyParentDirectories) {
      this.rootDirectory.removeFile(filePath, removeEmptyParentDirectories);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath, removeEmptyParentDirectories) {
      this.rootDirectory.removeDirectory(directoryPath, removeEmptyParentDirectories);
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
      topmostDirectoryMarker = DirectoryMarker.clone(topmostDirectoryMarkerName);

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
      var marked,
          rootDirectoryMarked = this.rootDirectory.isMarked();

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
      var topmostDirectoryMarker = null,
          childListElements = this.childElements('li');

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
          markedDroppableElement = marked ? this : this.getMarkedDroppableElement(),
          markedDirectory = markedDroppableElement.getMarkedDirectory(),
          markedDirectoryPath = markedDirectory !== null ? markedDirectory.getPath() : null,
          draggableEntryPathWithoutBottommostName = util.pathWithoutBottommostName(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryPath;

      if (marked && sourcePath === targetPath) {
        this.removeMarker();

        done();
      } else {
        var subDraggableEntries = draggableEntry.getSubEntries(),
            draggableEntries = subDraggableEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);

        markedDroppableElement.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDroppableElement.removeMarker();

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
        var directoryOverlappingDraggableEntry,
            toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var noDraggingWithin = explorer === this && this.hasOption(options.NO_DRAGGING_WITHIN),
              ///
          draggingWithin = !noDraggingWithin;

          if (draggingWithin) {
            var markedDirectory = this.getMarkedDirectory();

            directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectory !== directoryOverlappingDraggableEntry) {
              this.removeMarker();

              this.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
            }
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(draggableEntry, explorer);
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourcePath, movedPath) {
      if (movedPath === sourcePath) {} else if (movedPath === null) {
        directory.remove();
      } else {
        directory.remove();

        var collapsed = directory.isCollapsed(),
            directoryPath = movedPath;

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, movedPath) {
      if (movedPath === sourcePath) {} else if (movedPath === null) {
        file.remove();
      } else {
        file.remove();

        var filePath = movedPath; ///

        this.addFile(filePath);
      }
    }
  }, {
    key: 'activateFileEventHandler',
    value: function activateFileEventHandler(activateFileEvent) {
      var file = activateFileEvent.getFile(),
          filePath = file.getPath(this.rootDirectory),
          sourcePath = filePath,
          ///
      result = this.activateHandler(sourcePath, callback);

      callback(result);

      function callback(result) {
        if (result === false) {
          file.remove();
        }
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
  }], [{
    key: 'clone',
    value: function clone(selector, rootDirectoryName, moveHandler, activateHandler) {
      return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, rootDirectoryName, moveHandler, activateHandler) {
      return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
    }
  }]);

  return Explorer;
}(DroppableElement);

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJvcHRpb25zIiwiRGlyZWN0b3J5TWFya2VyIiwiRHJvcHBhYmxlRWxlbWVudCIsIlJvb3REaXJlY3RvcnkiLCJFeHBsb3JlciIsInNlbGVjdG9yIiwicm9vdERpcmVjdG9yeU5hbWUiLCJhY3RpdmF0ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImV4cGxvcmVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyIiwiYmluZCIsImFwcGVuZCIsIm9wdGlvbiIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCIsImFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoIiwidG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUiLCJ0b3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwicmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyIiwicmVtb3ZlIiwibWFya2VkIiwidG9CZU1hcmtlZCIsImNoaWxkTGlzdEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50cyIsInNvbWUiLCJjaGlsZEVsZW1lbnQiLCJzdGFydGVkRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwibWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkRyYWdnYWJsZUVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZHJhZ2dhYmxlRW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZURyYWdnYWJsZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsImlzVG9CZU1hcmtlZCIsIm5vRHJhZ2dpbmdXaXRoaW4iLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19XSVRISU4iLCJkcmFnZ2luZ1dpdGhpbiIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJkcmFnZ2luZyIsImRpcmVjdG9yeSIsIm1vdmVkUGF0aCIsImlzQ29sbGFwc2VkIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZ2V0RmlsZSIsInJlc3VsdCIsImNhbGxiYWNrIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsVUFBVUgsUUFBUSxXQUFSLENBRGQ7QUFBQSxJQUVJSSxrQkFBa0JKLFFBQVEsa0NBQVIsQ0FGdEI7QUFBQSxJQUdJSyxtQkFBbUJMLFFBQVEsb0JBQVIsQ0FIdkI7QUFBQSxJQUlJTSxnQkFBZ0JOLFFBQVEseUNBQVIsQ0FKcEI7O0lBTU1PLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBSjtBQUFBLFFBQXNCO0FBQ2xCQyxvQkFBZ0JQLGNBQWNRLEtBQWQsQ0FBb0JMLGlCQUFwQixFQUF1Q0csUUFBdkMsRUFBaUQsTUFBS0csd0JBQUwsQ0FBOEJDLElBQTlCLE9BQWpELENBRHBCOztBQUdBLFVBQUtOLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtHLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtWLE9BQUwsR0FBZSxFQUFmOztBQUVBLFVBQUtjLE1BQUwsQ0FBWUosYUFBWjtBQVpxRTtBQWF0RTs7Ozs4QkFFU0ssTSxFQUFRO0FBQ2hCLFdBQUtmLE9BQUwsQ0FBYWUsTUFBYixJQUF1QixJQUF2QjtBQUNEOzs7Z0NBRVdBLE0sRUFBUTtBQUNsQixhQUFPLEtBQUtmLE9BQUwsQ0FBYWUsTUFBYixDQUFQO0FBQ0Q7Ozs4QkFFU0EsTSxFQUFRO0FBQ2hCQSxlQUFVLEtBQUtmLE9BQUwsQ0FBYWUsTUFBYixNQUF5QixJQUFuQyxDQURnQixDQUMwQjs7QUFFMUMsYUFBT0EsTUFBUDtBQUNEOzs7NEJBRU9DLFEsRUFBVTtBQUFFLFdBQUtOLGFBQUwsQ0FBbUJPLE9BQW5CLENBQTJCRCxRQUEzQjtBQUF1Qzs7O2lDQUM5Q0UsYSxFQUFlQyxTLEVBQVc7QUFBRSxXQUFLVCxhQUFMLENBQW1CVSxZQUFuQixDQUFnQ0YsYUFBaEMsRUFBK0NDLFNBQS9DO0FBQTREOzs7K0JBQzFGSCxRLEVBQVVLLDRCLEVBQThCO0FBQUUsV0FBS1gsYUFBTCxDQUFtQlksVUFBbkIsQ0FBOEJOLFFBQTlCLEVBQXdDSyw0QkFBeEM7QUFBd0U7OztvQ0FDN0dILGEsRUFBZUcsNEIsRUFBOEI7QUFBRSxXQUFLWCxhQUFMLENBQW1CYSxlQUFuQixDQUFtQ0wsYUFBbkMsRUFBa0RHLDRCQUFsRDtBQUFrRjs7OzJDQUMxSDtBQUFFLGFBQU8sS0FBS1gsYUFBTCxDQUFtQmMsT0FBbkIsRUFBUDtBQUFzQzs7O3lDQUMxQztBQUFFLGFBQU8sS0FBS2QsYUFBTCxDQUFtQmUsa0JBQW5CLEVBQVA7QUFBaUQ7OzswREFDbENDLGMsRUFBZ0I7QUFBRSxhQUFPLEtBQUtoQixhQUFMLENBQW1CaUIscUNBQW5CLENBQXlERCxjQUF6RCxDQUFQO0FBQWtGOzs7MENBQ3BIQSxjLEVBQWdCO0FBQUUsYUFBTyxLQUFLaEIsYUFBTCxDQUFtQmtCLHFCQUFuQixDQUF5Q0YsY0FBekMsQ0FBUDtBQUFrRTs7O3FDQUV6RkEsYyxFQUFnQjtBQUMvQixVQUFJRyxxQkFBcUJILGVBQWVJLE9BQWYsRUFBekI7QUFBQSxVQUNJQyxxQkFBcUJMLGVBQWVNLE9BQWYsRUFEekI7QUFBQSxVQUVJQyx5Q0FBeUNsQyxLQUFLbUMsMEJBQUwsQ0FBZ0NMLGtCQUFoQyxDQUY3Qzs7QUFJQSxVQUFJSSxzQ0FBSixFQUE0QztBQUMxQyxZQUFJRSw2QkFBNkJOLGtCQUFqQzs7QUFFQSxhQUFLTyx5QkFBTCxDQUErQkQsMEJBQS9CO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSUUsYUFBYVIsa0JBQWpCOztBQUVBLGFBQUtuQixhQUFMLENBQW1CNEIsU0FBbkIsQ0FBNkJELFVBQTdCLEVBQXlDTixrQkFBekM7QUFDRDtBQUNGOzs7OEJBRVNMLGMsRUFBZ0JhLGtDLEVBQW9DO0FBQzVELFVBQUlDLHFCQUFxQmQsZUFBZUYsT0FBZixFQUF6QjtBQUFBLFVBQ0lPLHFCQUFxQkwsZUFBZU0sT0FBZixFQUR6QjtBQUFBLFVBRUlTLHlDQUF5Q0YsbUNBQW1DVCxPQUFuQyxFQUY3QztBQUFBLFVBR0lPLGFBQWFJLHlDQUF5QyxHQUF6QyxHQUErQ0Qsa0JBSGhFOztBQUtBLFdBQUs5QixhQUFMLENBQW1CNEIsU0FBbkIsQ0FBNkJELFVBQTdCLEVBQXlDTixrQkFBekM7QUFDRDs7OzhDQUV5QkksMEIsRUFBNEI7QUFDcEQsVUFBSU8sNkJBQTZCUCwwQkFBakM7QUFBQSxVQUE4RDtBQUMxRFEsK0JBQXlCMUMsZ0JBQWdCVSxLQUFoQixDQUFzQitCLDBCQUF0QixDQUQ3Qjs7QUFHQSxXQUFLNUIsTUFBTCxDQUFZNkIsc0JBQVo7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSUMsc0JBQXNCLEtBQUtsQyxhQUFMLENBQW1CbUMsUUFBbkIsRUFBMUI7O0FBRUEsVUFBSUQsbUJBQUosRUFBeUI7QUFDdkIsYUFBS2xDLGFBQUwsQ0FBbUJvQyxZQUFuQjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlILHlCQUF5QixLQUFLSSw4QkFBTCxFQUE3Qjs7QUFFQUosK0JBQXVCSyxNQUF2QjtBQUNEO0FBQ0Y7OzsrQkFFVTtBQUNULFVBQUlDLE1BQUo7QUFBQSxVQUNJTCxzQkFBc0IsS0FBS2xDLGFBQUwsQ0FBbUJtQyxRQUFuQixFQUQxQjs7QUFHQSxVQUFJRCxtQkFBSixFQUF5QjtBQUN2QkssaUJBQVMsSUFBVDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlOLHlCQUF5QixLQUFLSSw4QkFBTCxFQUE3Qjs7QUFFQUUsaUJBQVVOLDJCQUEyQixJQUFyQztBQUNEOztBQUVELGFBQU9NLE1BQVA7QUFDRDs7O2lDQUVZdkIsYyxFQUFnQjtBQUMzQixVQUFJYSxxQ0FBcUMsS0FBS1oscUNBQUwsQ0FBMkNELGNBQTNDLENBQXpDO0FBQUEsVUFDSXdCLGFBQWNYLHVDQUF1QyxJQUR6RDs7QUFHQSxhQUFPVyxVQUFQO0FBQ0Q7OztxREFFZ0M7QUFDL0IsVUFBSVAseUJBQXlCLElBQTdCO0FBQUEsVUFDSVEsb0JBQW9CLEtBQUtDLGFBQUwsQ0FBbUIsSUFBbkIsQ0FEeEI7O0FBR0FELHdCQUFrQkUsSUFBbEIsQ0FBdUIsVUFBU0MsWUFBVCxFQUF1QjtBQUM1QyxZQUFJQSx3QkFBd0JyRCxlQUE1QixFQUE2QztBQUMzQzBDLG1DQUF5QlcsWUFBekIsQ0FEMkMsQ0FDSDs7QUFFeEMsaUJBQU8sSUFBUDtBQUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BUkQ7O0FBVUEsYUFBT1gsc0JBQVA7QUFDRDs7O2tDQUVhakIsYyxFQUFnQjtBQUM1QixVQUFJdUIsU0FBUyxLQUFLSixRQUFMLEVBQWI7QUFBQSxVQUNJVSxrQkFBa0IsQ0FBQ04sTUFEdkI7O0FBR0EsVUFBSU0sZUFBSixFQUFxQjtBQUNuQixhQUFLQyxnQkFBTCxDQUFzQjlCLGNBQXRCO0FBQ0Q7O0FBRUQsYUFBTzZCLGVBQVA7QUFDRDs7O2lDQUVZN0IsYyxFQUFnQitCLEksRUFBTTtBQUNqQyxVQUFJNUIscUJBQXFCSCxlQUFlSSxPQUFmLEVBQXpCO0FBQUEsVUFDSW1CLFNBQVMsS0FBS0osUUFBTCxFQURiO0FBQUEsVUFFSWEseUJBQXlCVCxTQUNFLElBREYsR0FFSSxLQUFLVSx5QkFBTCxFQUpqQztBQUFBLFVBS0lDLGtCQUFrQkYsdUJBQXVCakMsa0JBQXZCLEVBTHRCO0FBQUEsVUFNSW9DLHNCQUF1QkQsb0JBQW9CLElBQXJCLEdBQ0VBLGdCQUFnQjlCLE9BQWhCLEVBREYsR0FFSSxJQVI5QjtBQUFBLFVBU0lnQywwQ0FBMEMvRCxLQUFLZ0UseUJBQUwsQ0FBK0JsQyxrQkFBL0IsQ0FUOUM7QUFBQSxVQVVJbUMsYUFBYUYsdUNBVmpCO0FBQUEsVUFXSUcsYUFBYUosbUJBWGpCOztBQWFBLFVBQUlaLFVBQVdlLGVBQWVDLFVBQTlCLEVBQTJDO0FBQ3pDLGFBQUtuQixZQUFMOztBQUVBVztBQUNELE9BSkQsTUFJTztBQUNMLFlBQUlTLHNCQUFzQnhDLGVBQWV5QyxhQUFmLEVBQTFCO0FBQUEsWUFDSUMsbUJBQW1CRixtQkFEdkIsQ0FESyxDQUV1Qzs7QUFFNUNFLHlCQUFpQkMsT0FBakI7QUFDQUQseUJBQWlCRSxJQUFqQixDQUFzQjVDLGNBQXRCOztBQUVBZ0MsK0JBQXVCYSxvQkFBdkIsQ0FBNENILGdCQUE1QyxFQUE4REosVUFBOUQsRUFBMEVDLFVBQTFFLEVBQXNGLFlBQVc7QUFDL0ZQLGlDQUF1QlosWUFBdkI7O0FBRUFXO0FBQ0QsU0FKRDtBQUtEO0FBQ0Y7OztxQ0FFZ0I7QUFDZixXQUFLZSxvQkFBTDtBQUNEOzs7NkJBRVE5QyxjLEVBQWlDO0FBQUEsVUFBakJqQixRQUFpQix1RUFBTixJQUFNOztBQUN4QyxVQUFJd0MsU0FBUyxLQUFLSixRQUFMLEVBQWI7O0FBRUEsVUFBSUksTUFBSixFQUFZO0FBQ1YsWUFBSVYsa0NBQUo7QUFBQSxZQUNJVyxhQUFhLEtBQUt1QixZQUFMLENBQWtCL0MsY0FBbEIsQ0FEakI7O0FBR0EsWUFBSXdCLFVBQUosRUFBZ0I7QUFDZCxjQUFJd0IsbUJBQW9CakUsYUFBYSxJQUFkLElBQXVCLEtBQUtrRSxTQUFMLENBQWUzRSxRQUFRNEUsa0JBQXZCLENBQTlDO0FBQUEsY0FBMEY7QUFDdEZDLDJCQUFpQixDQUFDSCxnQkFEdEI7O0FBR0EsY0FBSUcsY0FBSixFQUFvQjtBQUNsQixnQkFBSWpCLGtCQUFrQixLQUFLbkMsa0JBQUwsRUFBdEI7O0FBRUFjLGlEQUFxQyxLQUFLWixxQ0FBTCxDQUEyQ0QsY0FBM0MsQ0FBckM7O0FBRUEsZ0JBQUlrQyxvQkFBb0JyQixrQ0FBeEIsRUFBNEQ7QUFDMUQsbUJBQUtPLFlBQUw7O0FBRUEsbUJBQUtSLFNBQUwsQ0FBZVosY0FBZixFQUErQmEsa0NBQS9CO0FBQ0Q7QUFDRjtBQUNGLFNBZkQsTUFlTztBQUNMLGNBQUl1Qyw2QkFBNkIsS0FBS0MsNkJBQUwsQ0FBbUNyRCxjQUFuQyxDQUFqQzs7QUFFQSxjQUFJb0QsK0JBQStCLElBQW5DLEVBQXlDO0FBQ3ZDdkMsaURBQXFDdUMsMkJBQTJCbkQscUNBQTNCLENBQWlFRCxjQUFqRSxDQUFyQzs7QUFFQW9ELHVDQUEyQnhDLFNBQTNCLENBQXFDWixjQUFyQyxFQUFxRGEsa0NBQXJEO0FBQ0QsV0FKRCxNQUlPO0FBQ0w5QixxQkFBUytDLGdCQUFULENBQTBCOUIsY0FBMUI7QUFDRDs7QUFFRCxlQUFLb0IsWUFBTDtBQUNEO0FBQ0YsT0FoQ0QsTUFnQ087QUFDTCxZQUFJWSx5QkFBeUIsS0FBS0MseUJBQUwsRUFBN0I7O0FBRUFELCtCQUF1QnNCLFFBQXZCLENBQWdDdEQsY0FBaEMsRUFBZ0RqQixRQUFoRDtBQUNEO0FBQ0Y7OztrQ0FFYXdFLFMsRUFBV2pCLFUsRUFBWWtCLFMsRUFBVztBQUM5QyxVQUFJQSxjQUFjbEIsVUFBbEIsRUFBOEIsQ0FFN0IsQ0FGRCxNQUVPLElBQUlrQixjQUFjLElBQWxCLEVBQXdCO0FBQzdCRCxrQkFBVWpDLE1BQVY7QUFDRCxPQUZNLE1BRUE7QUFDTGlDLGtCQUFVakMsTUFBVjs7QUFFQSxZQUFJN0IsWUFBWThELFVBQVVFLFdBQVYsRUFBaEI7QUFBQSxZQUNJakUsZ0JBQWdCZ0UsU0FEcEI7O0FBR0EsYUFBSzlELFlBQUwsQ0FBa0JGLGFBQWxCLEVBQWlDQyxTQUFqQztBQUNEO0FBQ0Y7Ozs2QkFFUWlFLEksRUFBTXBCLFUsRUFBWWtCLFMsRUFBVztBQUNwQyxVQUFJQSxjQUFjbEIsVUFBbEIsRUFBOEIsQ0FFN0IsQ0FGRCxNQUVPLElBQUlrQixjQUFjLElBQWxCLEVBQXdCO0FBQzdCRSxhQUFLcEMsTUFBTDtBQUNELE9BRk0sTUFFQTtBQUNMb0MsYUFBS3BDLE1BQUw7O0FBRUEsWUFBSWhDLFdBQVdrRSxTQUFmLENBSEssQ0FHcUI7O0FBRTFCLGFBQUtqRSxPQUFMLENBQWFELFFBQWI7QUFDRDtBQUNGOzs7NkNBRXdCcUUsaUIsRUFBbUI7QUFDMUMsVUFBSUQsT0FBT0Msa0JBQWtCQyxPQUFsQixFQUFYO0FBQUEsVUFDSXRFLFdBQVdvRSxLQUFLdEQsT0FBTCxDQUFhLEtBQUtwQixhQUFsQixDQURmO0FBQUEsVUFFSXNELGFBQWFoRCxRQUZqQjtBQUFBLFVBRTRCO0FBQ3hCdUUsZUFBUyxLQUFLaEYsZUFBTCxDQUFxQnlELFVBQXJCLEVBQWlDd0IsUUFBakMsQ0FIYjs7QUFLQUEsZUFBU0QsTUFBVDs7QUFFQSxlQUFTQyxRQUFULENBQWtCRCxNQUFsQixFQUEwQjtBQUN4QixZQUFJQSxXQUFXLEtBQWYsRUFBc0I7QUFDcEJILGVBQUtwQyxNQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7aURBRTRCb0IsZ0IsRUFBa0JKLFUsRUFBWUMsVSxFQUFZO0FBQ3JFLFVBQUl3QixXQUFXckIsaUJBQWlCc0IsR0FBakIsQ0FBcUIsVUFBU2hFLGNBQVQsRUFBeUI7QUFDM0QsWUFBSWlFLFVBQVUsRUFBZDtBQUFBLFlBQ0k5RCxxQkFBcUJILGVBQWVJLE9BQWYsRUFEekI7QUFBQSxZQUVJOEQsMkJBQTJCL0Qsa0JBRi9CO0FBQUEsWUFFb0Q7QUFDaERnRSxtQ0FBNEI3QixlQUFlLElBQWhCLEdBQ0VqRSxLQUFLK0YsaUJBQUwsQ0FBdUJqRSxrQkFBdkIsRUFBMkNvQyxVQUEzQyxDQURGLEdBRUlsRSxLQUFLZ0csK0JBQUwsQ0FBcUNsRSxrQkFBckMsRUFBeURtQyxVQUF6RCxFQUFxRUMsVUFBckUsQ0FMbkM7O0FBT0EwQixnQkFBUUMsd0JBQVIsSUFBb0NDLHdCQUFwQzs7QUFFQSxlQUFPRixPQUFQO0FBQ0QsT0FYYyxDQUFmOztBQWFBLGFBQU9GLFFBQVA7QUFDRDs7OzBCQUVZcEYsUSxFQUFVQyxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3RFLGFBQU9ULFFBQVFhLEtBQVIsQ0FBY1AsUUFBZCxFQUF3QkMsUUFBeEIsRUFBa0NDLGlCQUFsQyxFQUFxREUsV0FBckQsRUFBa0VELGVBQWxFLENBQVA7QUFDRDs7OzZCQUVleUYsSSxFQUFNMUYsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUNyRSxhQUFPVCxRQUFRbUcsUUFBUixDQUFpQjdGLFFBQWpCLEVBQTJCNEYsSUFBM0IsRUFBaUMxRixpQkFBakMsRUFBb0RFLFdBQXBELEVBQWlFRCxlQUFqRSxDQUFQO0FBQ0Q7Ozs7RUF2Um9CTCxnQjs7QUEwUnZCZ0csT0FBT0MsT0FBUCxHQUFpQi9GLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcykgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7IH1cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9ICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpOyB9ICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZSh0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSk7XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZWQsXG4gICAgICAgIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIG1hcmtlZCA9ICh0b3Btb3N0RGlyZWN0b3J5TWFya2VyICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsLFxuICAgICAgICBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygnbGknKTtcblxuICAgIGNoaWxkTGlzdEVsZW1lbnRzLnNvbWUoZnVuY3Rpb24oY2hpbGRFbGVtZW50KSB7XG4gICAgICBpZiAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TWFya2VyO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICB2YXIgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoO1xuXG4gICAgaWYgKG1hcmtlZCAmJiAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN1YkRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIG5vRHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpICYmIHRoaXMuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfV0lUSElOKSwgLy8vXG4gICAgICAgICAgICBkcmFnZ2luZ1dpdGhpbiA9ICFub0RyYWdnaW5nV2l0aGluO1xuXG4gICAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbikge1xuICAgICAgICAgIHZhciBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICB2YXIgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgdmFyIHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19