'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

var Explorer = function (_DroppableElement) {
  _inherits(Explorer, _DroppableElement);

  function Explorer(selector, rootDirectoryName, activateHandler, moveHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var rootDirectory = RootDirectory.clone(rootDirectoryName, _this.dragEventHandler.bind(_this), _this.activateFileEventHandler.bind(_this));

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
    key: 'removeFile',
    value: function removeFile(filePath) {
      this.rootDirectory.removeFile(filePath);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      this.rootDirectory.addDirectory(directoryPath, collapsed);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath, collapsed) {
      this.rootDirectory.removeDirectory(directoryPath);
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
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      var noDraggingIntoSubdirectories = this.hasOption(Explorer.options.NO_DRAGGING_INTO_SUBDIRECTORIES),
          directoryOverlappingEntry = this.rootDirectory.getDirectoryOverlappingEntry(entry, noDraggingIntoSubdirectories);

      return directoryOverlappingEntry;
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(entry) {
      var entryPath = entry.getPath(),
          entryType = entry.getType(),
          entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);

      if (!entryPathTopmostDirectoryName) {
        var markerPath = entryPath;

        this.rootDirectory.addMarker(markerPath, entryType);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, entry);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry, directoryOverlappingEntry) {
      var entryName = entry.getName(),
          entryType = entry.getType(),
          directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
          markerPath = directoryOverlappingEntryPath + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        this.rootDirectory.removeMarker();
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var rootDirectoryMarked = this.rootDirectory.isMarked(),
          marked = rootDirectoryMarked ? true : _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'isMarked', this).call(this);

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var toBeMarked,
          entryPath = entry.getPath(),
          noExplorerDrags = this.hasOption(Explorer.options.NO_EXPLORER_DRAGS),
          entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);

      if (noExplorerDrags && entryPathTopmostDirectoryName) {
        toBeMarked = false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        toBeMarked = directoryOverlappingEntry !== null;
      }

      return toBeMarked;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      var startDragging,
          noDraggingEntries = this.hasOption(Explorer.options.NO_DRAGGING);

      if (noDraggingEntries) {
        startDragging = false;
      } else {
        var marked = this.isMarked();

        startDragging = !marked;

        if (startDragging) {
          this.addMarkerInPlace(entry);
        }
      }

      return startDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry, done) {
      var entryPath = entry.getPath(),
          marked = this.isMarked(),
          markedDroppableElement = marked ? this : this.getMarkedDroppableElement(),
          markedDirectory = markedDroppableElement.getMarkedDirectory(),
          markedDirectoryPath = markedDirectory !== null ? markedDirectory.getPath() : null,
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = markedDirectoryPath;

      if (marked && sourcePath === targetPath) {
        this.removeMarker();

        done();
      } else {
        var subEntries = entry.getSubEntries(),
            entries = subEntries; ///

        entries.reverse();
        entries.push(entry);

        markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function () {
          markedDroppableElement.removeMarker();

          done();
        });
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(entry),
            directoryOverlappingEntry;

        if (toBeMarked) {
          var markedDirectory = this.getMarkedDirectory();

          directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

          if (markedDirectory !== directoryOverlappingEntry) {
            this.removeMarker();

            this.addMarker(entry, directoryOverlappingEntry);
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingEntry(entry);

            droppableElementToBeMarked.addMarker(entry, directoryOverlappingEntry);
          } else {
            explorer.addMarkerInPlace(entry);
          }

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(entry, explorer);
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
    key: 'entryPathMapsFromEntries',
    value: function entryPathMapsFromEntries(entries, sourcePath, targetPath) {
      var entryPathMaps = entries.map(function (entry) {
        var entryPathMap = {},
            entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = sourcePath === null ? util.prependTargetPath(entryPath, targetPath) : util.replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath);

        entryPathMap[sourceEntryPath] = targetEntryPath;

        return entryPathMap;
      });

      return entryPathMaps;
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

Explorer.options = {
  NO_DRAGGING: 'NO_DRAGGING',
  NO_EXPLORER_DRAGS: 'NO_EXPLORER_DRAGS',
  NO_DRAGGING_INTO_SUBDIRECTORIES: 'NO_DRAGGING_INTO_SUBDIRECTORIES'
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJvcHRpb25zIiwiYXBwZW5kIiwib3B0aW9uIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwicmVtb3ZlRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVEaXJlY3RvcnkiLCJnZXROYW1lIiwiZ2V0TWFya2VkRGlyZWN0b3J5IiwiZW50cnkiLCJub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfSU5UT19TVUJESVJFQ1RPUklFUyIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwibWFya2VyUGF0aCIsImFkZE1hcmtlciIsImVudHJ5TmFtZSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwidG9CZU1hcmtlZCIsIm5vRXhwbG9yZXJEcmFncyIsIk5PX0VYUExPUkVSX0RSQUdTIiwic3RhcnREcmFnZ2luZyIsIm5vRHJhZ2dpbmdFbnRyaWVzIiwiTk9fRFJBR0dJTkciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwibWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsImV4cGxvcmVyIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZGlyZWN0b3J5IiwibW92ZWRQYXRoIiwicmVtb3ZlIiwiaXNDb2xsYXBzZWQiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwicmVzdWx0IiwiY2FsbGJhY2siLCJlbnRyeVBhdGhNYXBzIiwibWFwIiwiZW50cnlQYXRoTWFwIiwic291cmNlRW50cnlQYXRoIiwidGFyZ2V0RW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE9BQUwsR0FBZSxFQUFmOztBQUVBLFVBQUtDLE1BQUwsQ0FBWU4sYUFBWjtBQVhxRTtBQVl0RTs7Ozs4QkFFU08sTSxFQUFRO0FBQ2hCLFdBQUtGLE9BQUwsQ0FBYUUsTUFBYixJQUF1QixJQUF2QjtBQUNEOzs7Z0NBRVdBLE0sRUFBUTtBQUNsQixhQUFPLEtBQUtGLE9BQUwsQ0FBYUUsTUFBYixDQUFQO0FBQ0Q7Ozs4QkFFU0EsTSxFQUFRO0FBQ2hCQSxlQUFVLEtBQUtGLE9BQUwsQ0FBYUUsTUFBYixNQUF5QixJQUFuQyxDQURnQixDQUMwQjs7QUFFMUMsYUFBT0EsTUFBUDtBQUNEOzs7NEJBRU9DLFEsRUFBVTtBQUFFLFdBQUtSLGFBQUwsQ0FBbUJTLE9BQW5CLENBQTJCRCxRQUEzQjtBQUF1Qzs7OytCQUNoREEsUSxFQUFVO0FBQUUsV0FBS1IsYUFBTCxDQUFtQlUsVUFBbkIsQ0FBOEJGLFFBQTlCO0FBQTBDOzs7aUNBQ3BERyxhLEVBQWVDLFMsRUFBVztBQUFFLFdBQUtaLGFBQUwsQ0FBbUJhLFlBQW5CLENBQWdDRixhQUFoQyxFQUErQ0MsU0FBL0M7QUFBNEQ7OztvQ0FDckZELGEsRUFBZUMsUyxFQUFXO0FBQUUsV0FBS1osYUFBTCxDQUFtQmMsZUFBbkIsQ0FBbUNILGFBQW5DO0FBQW9EOzs7MkNBQ3pFO0FBQUUsYUFBTyxLQUFLWCxhQUFMLENBQW1CZSxPQUFuQixFQUFQO0FBQXNDOzs7eUNBQzFDO0FBQUUsYUFBTyxLQUFLZixhQUFMLENBQW1CZ0Isa0JBQW5CLEVBQVA7QUFBaUQ7OztpREFFM0NDLEssRUFBTztBQUNsQyxVQUFJQywrQkFBK0IsS0FBS0MsU0FBTCxDQUFleEIsU0FBU1UsT0FBVCxDQUFpQmUsK0JBQWhDLENBQW5DO0FBQUEsVUFDSUMsNEJBQTRCLEtBQUtyQixhQUFMLENBQW1Cc0IsNEJBQW5CLENBQWdETCxLQUFoRCxFQUF1REMsNEJBQXZELENBRGhDOztBQUdBLGFBQU9HLHlCQUFQO0FBQ0Q7OztxQ0FFZ0JKLEssRUFBTztBQUN0QixVQUFJTSxZQUFZTixNQUFNTyxPQUFOLEVBQWhCO0FBQUEsVUFDSUMsWUFBWVIsTUFBTVMsT0FBTixFQURoQjtBQUFBLFVBRUlDLGdDQUFnQ25DLEtBQUtvQywwQkFBTCxDQUFnQ0wsU0FBaEMsQ0FGcEM7O0FBSUEsVUFBSSxDQUFDSSw2QkFBTCxFQUFvQztBQUNsQyxZQUFJRSxhQUFhTixTQUFqQjs7QUFFQSxhQUFLdkIsYUFBTCxDQUFtQjhCLFNBQW5CLENBQTZCRCxVQUE3QixFQUF5Q0osU0FBekM7QUFDRCxPQUpELE1BSU87QUFDTCxzSEFBZ0JSLEtBQWhCO0FBQ0Q7QUFDRjs7OzhCQUVTQSxLLEVBQU9JLHlCLEVBQTJCO0FBQzFDLFVBQUlVLFlBQVlkLE1BQU1GLE9BQU4sRUFBaEI7QUFBQSxVQUNJVSxZQUFZUixNQUFNUyxPQUFOLEVBRGhCO0FBQUEsVUFFSU0sZ0NBQWdDWCwwQkFBMEJHLE9BQTFCLEVBRnBDO0FBQUEsVUFHSUssYUFBYUcsZ0NBQWdDLEdBQWhDLEdBQXNDRCxTQUh2RDs7QUFLQSxXQUFLL0IsYUFBTCxDQUFtQjhCLFNBQW5CLENBQTZCRCxVQUE3QixFQUF5Q0osU0FBekM7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSVEsc0JBQXNCLEtBQUtqQyxhQUFMLENBQW1Ca0MsUUFBbkIsRUFBMUI7O0FBRUEsVUFBSUQsbUJBQUosRUFBeUI7QUFDdkIsYUFBS2pDLGFBQUwsQ0FBbUJtQyxZQUFuQjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0Q7QUFDRjs7OytCQUVVO0FBQ1QsVUFBSUYsc0JBQXNCLEtBQUtqQyxhQUFMLENBQW1Ca0MsUUFBbkIsRUFBMUI7QUFBQSxVQUNJRSxTQUFTSCxzQkFDRSxJQURGLCtHQURiOztBQUtBLGFBQU9HLE1BQVA7QUFDRDs7O2lDQUVZbkIsSyxFQUFPO0FBQ2xCLFVBQUlvQixVQUFKO0FBQUEsVUFDSWQsWUFBWU4sTUFBTU8sT0FBTixFQURoQjtBQUFBLFVBRUljLGtCQUFrQixLQUFLbkIsU0FBTCxDQUFleEIsU0FBU1UsT0FBVCxDQUFpQmtDLGlCQUFoQyxDQUZ0QjtBQUFBLFVBR0laLGdDQUFnQ25DLEtBQUtvQywwQkFBTCxDQUFnQ0wsU0FBaEMsQ0FIcEM7O0FBS0EsVUFBSWUsbUJBQW1CWCw2QkFBdkIsRUFBc0Q7QUFDcERVLHFCQUFhLEtBQWI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJaEIsNEJBQTRCLEtBQUtDLDRCQUFMLENBQWtDTCxLQUFsQyxDQUFoQzs7QUFFQW9CLHFCQUFjaEIsOEJBQThCLElBQTVDO0FBQ0Q7O0FBRUQsYUFBT2dCLFVBQVA7QUFDRDs7O2tDQUVhcEIsSyxFQUFPO0FBQ25CLFVBQUl1QixhQUFKO0FBQUEsVUFDSUMsb0JBQW9CLEtBQUt0QixTQUFMLENBQWV4QixTQUFTVSxPQUFULENBQWlCcUMsV0FBaEMsQ0FEeEI7O0FBR0EsVUFBSUQsaUJBQUosRUFBdUI7QUFDckJELHdCQUFnQixLQUFoQjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlKLFNBQVMsS0FBS0YsUUFBTCxFQUFiOztBQUVBTSx3QkFBZ0IsQ0FBQ0osTUFBakI7O0FBRUEsWUFBSUksYUFBSixFQUFtQjtBQUNqQixlQUFLRyxnQkFBTCxDQUFzQjFCLEtBQXRCO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPdUIsYUFBUDtBQUNEOzs7aUNBRVl2QixLLEVBQU8yQixJLEVBQU07QUFDeEIsVUFBSXJCLFlBQVlOLE1BQU1PLE9BQU4sRUFBaEI7QUFBQSxVQUNJWSxTQUFTLEtBQUtGLFFBQUwsRUFEYjtBQUFBLFVBRUlXLHlCQUF5QlQsU0FDRSxJQURGLEdBRUksS0FBS1UseUJBQUwsRUFKakM7QUFBQSxVQUtJQyxrQkFBa0JGLHVCQUF1QjdCLGtCQUF2QixFQUx0QjtBQUFBLFVBTUlnQyxzQkFBdUJELG9CQUFvQixJQUFyQixHQUNFQSxnQkFBZ0J2QixPQUFoQixFQURGLEdBRUksSUFSOUI7QUFBQSxVQVNJeUIsaUNBQWlDekQsS0FBSzBELHlCQUFMLENBQStCM0IsU0FBL0IsQ0FUckM7QUFBQSxVQVVJNEIsYUFBYUYsOEJBVmpCO0FBQUEsVUFXSUcsYUFBYUosbUJBWGpCOztBQWFBLFVBQUlaLFVBQVdlLGVBQWVDLFVBQTlCLEVBQTJDO0FBQ3pDLGFBQUtqQixZQUFMOztBQUVBUztBQUNELE9BSkQsTUFJTztBQUNMLFlBQUlTLGFBQWFwQyxNQUFNcUMsYUFBTixFQUFqQjtBQUFBLFlBQ0lDLFVBQVVGLFVBRGQsQ0FESyxDQUVxQjs7QUFFMUJFLGdCQUFRQyxPQUFSO0FBQ0FELGdCQUFRRSxJQUFSLENBQWF4QyxLQUFiOztBQUVBNEIsK0JBQXVCYSxXQUF2QixDQUFtQ0gsT0FBbkMsRUFBNENKLFVBQTVDLEVBQXdEQyxVQUF4RCxFQUFvRSxZQUFXO0FBQzdFUCxpQ0FBdUJWLFlBQXZCOztBQUVBUztBQUNELFNBSkQ7QUFLRDtBQUNGOzs7bUNBRWMzQixLLEVBQU87QUFDcEIsV0FBSzBDLG9CQUFMO0FBQ0Q7Ozs2QkFFUTFDLEssRUFBd0I7QUFBQSxVQUFqQjJDLFFBQWlCLHVFQUFOLElBQU07O0FBQy9CLFVBQUl4QixTQUFTLEtBQUtGLFFBQUwsRUFBYjs7QUFFQSxVQUFJRSxNQUFKLEVBQVk7QUFDVixZQUFJQyxhQUFhLEtBQUt3QixZQUFMLENBQWtCNUMsS0FBbEIsQ0FBakI7QUFBQSxZQUNJSSx5QkFESjs7QUFHQSxZQUFJZ0IsVUFBSixFQUFnQjtBQUNkLGNBQUlVLGtCQUFrQixLQUFLL0Isa0JBQUwsRUFBdEI7O0FBRUFLLHNDQUE0QixLQUFLQyw0QkFBTCxDQUFrQ0wsS0FBbEMsQ0FBNUI7O0FBRUEsY0FBSThCLG9CQUFvQjFCLHlCQUF4QixFQUFtRDtBQUNqRCxpQkFBS2MsWUFBTDs7QUFFQSxpQkFBS0wsU0FBTCxDQUFlYixLQUFmLEVBQXNCSSx5QkFBdEI7QUFDRDtBQUNGLFNBVkQsTUFVTztBQUNMLGNBQUl5Qyw2QkFBNkIsS0FBS0MsNkJBQUwsQ0FBbUM5QyxLQUFuQyxDQUFqQzs7QUFFQSxjQUFJNkMsK0JBQStCLElBQW5DLEVBQXlDO0FBQ3ZDekMsd0NBQTRCeUMsMkJBQTJCeEMsNEJBQTNCLENBQXdETCxLQUF4RCxDQUE1Qjs7QUFFQTZDLHVDQUEyQmhDLFNBQTNCLENBQXFDYixLQUFyQyxFQUE0Q0kseUJBQTVDO0FBQ0QsV0FKRCxNQUlPO0FBQ0x1QyxxQkFBU2pCLGdCQUFULENBQTBCMUIsS0FBMUI7QUFDRDs7QUFFRCxlQUFLa0IsWUFBTDtBQUNEO0FBQ0YsT0EzQkQsTUEyQk87QUFDTCxZQUFJVSx5QkFBeUIsS0FBS0MseUJBQUwsRUFBN0I7O0FBRUFELCtCQUF1Qm1CLFFBQXZCLENBQWdDL0MsS0FBaEMsRUFBdUMyQyxRQUF2QztBQUNEO0FBQ0Y7OztrQ0FFYUssUyxFQUFXZCxVLEVBQVllLFMsRUFBVztBQUM5QyxVQUFJQSxjQUFjZixVQUFsQixFQUE4QixDQUU3QixDQUZELE1BRU8sSUFBSWUsY0FBYyxJQUFsQixFQUF3QjtBQUM3QkQsa0JBQVVFLE1BQVY7QUFDRCxPQUZNLE1BRUE7QUFDTEYsa0JBQVVFLE1BQVY7O0FBRUEsWUFBSXZELFlBQVlxRCxVQUFVRyxXQUFWLEVBQWhCO0FBQUEsWUFDSXpELGdCQUFnQnVELFNBRHBCOztBQUdBLGFBQUtyRCxZQUFMLENBQWtCRixhQUFsQixFQUFpQ0MsU0FBakM7QUFDRDtBQUNGOzs7NkJBRVF5RCxJLEVBQU1sQixVLEVBQVllLFMsRUFBVztBQUNwQyxVQUFJQSxjQUFjZixVQUFsQixFQUE4QixDQUU3QixDQUZELE1BRU8sSUFBSWUsY0FBYyxJQUFsQixFQUF3QjtBQUM3QkcsYUFBS0YsTUFBTDtBQUNELE9BRk0sTUFFQTtBQUNMRSxhQUFLRixNQUFMOztBQUVBLFlBQUkzRCxXQUFXMEQsU0FBZixDQUhLLENBR3FCOztBQUUxQixhQUFLekQsT0FBTCxDQUFhRCxRQUFiO0FBQ0Q7QUFDRjs7OzZDQUV3QjhELGlCLEVBQW1CO0FBQzFDLFVBQUlELE9BQU9DLGtCQUFrQkMsT0FBbEIsRUFBWDtBQUFBLFVBQ0kvRCxXQUFXNkQsS0FBSzdDLE9BQUwsQ0FBYSxLQUFLeEIsYUFBbEIsQ0FEZjtBQUFBLFVBRUltRCxhQUFhM0MsUUFGakI7QUFBQSxVQUU0QjtBQUN4QmdFLGVBQVMsS0FBSzFFLGVBQUwsQ0FBcUJxRCxVQUFyQixFQUFpQ3NCLFFBQWpDLENBSGI7O0FBS0FBLGVBQVNELE1BQVQ7O0FBRUEsZUFBU0MsUUFBVCxDQUFrQkQsTUFBbEIsRUFBMEI7QUFDeEIsWUFBSUEsV0FBVyxLQUFmLEVBQXNCO0FBQ3BCSCxlQUFLRixNQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7NkNBRXdCWixPLEVBQVNKLFUsRUFBWUMsVSxFQUFZO0FBQ3hELFVBQUlzQixnQkFBZ0JuQixRQUFRb0IsR0FBUixDQUFZLFVBQVMxRCxLQUFULEVBQWdCO0FBQzlDLFlBQUkyRCxlQUFlLEVBQW5CO0FBQUEsWUFDSXJELFlBQVlOLE1BQU1PLE9BQU4sRUFEaEI7QUFBQSxZQUVJcUQsa0JBQWtCdEQsU0FGdEI7QUFBQSxZQUVrQztBQUM5QnVELDBCQUFtQjNCLGVBQWUsSUFBaEIsR0FDRTNELEtBQUt1RixpQkFBTCxDQUF1QnhELFNBQXZCLEVBQWtDNkIsVUFBbEMsQ0FERixHQUVJNUQsS0FBS3dGLCtCQUFMLENBQXFDekQsU0FBckMsRUFBZ0Q0QixVQUFoRCxFQUE0REMsVUFBNUQsQ0FMMUI7O0FBT0F3QixxQkFBYUMsZUFBYixJQUFnQ0MsZUFBaEM7O0FBRUEsZUFBT0YsWUFBUDtBQUNELE9BWG1CLENBQXBCOztBQWFBLGFBQU9GLGFBQVA7QUFDRDs7OzBCQUVZOUUsUSxFQUFVQyxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3RFLGFBQU9QLFFBQVFVLEtBQVIsQ0FBY04sUUFBZCxFQUF3QkMsUUFBeEIsRUFBa0NDLGlCQUFsQyxFQUFxREUsV0FBckQsRUFBa0VELGVBQWxFLENBQVA7QUFDRDs7OzZCQUVlbUYsSSxFQUFNcEYsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUNyRSxhQUFPUCxRQUFRMkYsUUFBUixDQUFpQnZGLFFBQWpCLEVBQTJCc0YsSUFBM0IsRUFBaUNwRixpQkFBakMsRUFBb0RFLFdBQXBELEVBQWlFRCxlQUFqRSxDQUFQO0FBQ0Q7Ozs7RUF0UW9CTCxnQjs7QUF5UXZCRSxTQUFTVSxPQUFULEdBQW1CO0FBQ2pCcUMsZUFBYSxhQURJO0FBRWpCSCxxQkFBbUIsbUJBRkY7QUFHakJuQixtQ0FBaUM7QUFIaEIsQ0FBbkI7O0FBTUErRCxPQUFPQyxPQUFQLEdBQWlCekYsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5vcHRpb25zID0ge307XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpOyB9XG4gIFxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSB0aGlzLmhhc09wdGlvbihFeHBsb3Jlci5vcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnksIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciB0b0JlTWFya2VkLFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG5vRXhwbG9yZXJEcmFncyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRVhQTE9SRVJfRFJBR1MpLFxuICAgICAgICBlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcbiAgICBcbiAgICBpZiAobm9FeHBsb3JlckRyYWdzICYmIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB0b0JlTWFya2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcbiAgICB9XG4gICAgICAgIFxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBzdGFydERyYWdnaW5nLFxuICAgICAgICBub0RyYWdnaW5nRW50cmllcyA9IHRoaXMuaGFzT3B0aW9uKEV4cGxvcmVyLm9wdGlvbnMuTk9fRFJBR0dJTkcpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdFbnRyaWVzKSB7XG4gICAgICBzdGFydERyYWdnaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICAgIHN0YXJ0RHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgICBpZiAoc3RhcnREcmFnZ2luZykge1xuICAgICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICAgIFxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGZpbGVQYXRoID0gbW92ZWRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5UGF0aE1hcCA9IHt9LFxuICAgICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5wcmVwZW5kVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHRhcmdldFBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbkV4cGxvcmVyLm9wdGlvbnMgPSB7XG4gIE5PX0RSQUdHSU5HOiAnTk9fRFJBR0dJTkcnLFxuICBOT19FWFBMT1JFUl9EUkFHUzogJ05PX0VYUExPUkVSX0RSQUdTJyxcbiAgTk9fRFJBR0dJTkdfSU5UT19TVUJESVJFQ1RPUklFUzogJ05PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVMnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19