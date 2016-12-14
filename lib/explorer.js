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
      var noDraggingIntoSubdirectories = this.hasOption(Explorer.options.NO_DRAGGING_INTO_SUBDIRECTORIES),
          directoryOverlappingEntry = this.rootDirectory.getDirectoryOverlappingDraggableEntry(draggableEntry, noDraggingIntoSubdirectories);

      return directoryOverlappingEntry;
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

      if (!draggableEntryPathTopmostDirectoryName) {
        var markerPath = draggableEntryPath;

        this.rootDirectory.addMarker(markerPath, draggableEntryType);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, draggableEntry);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
          markerPath = directoryOverlappingEntryPath + '/' + draggableEntryName;

      this.rootDirectory.addMarker(markerPath, draggableEntryType);
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
    value: function isToBeMarked(draggableEntry) {
      var directoryOverlappingEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryOverlappingEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var startedDragging,
          noDragging = this.hasOption(Explorer.options.NO_DRAGGING);

      if (noDragging) {
        startedDragging = false;
      } else {
        var marked = this.isMarked();

        startedDragging = !marked;

        if (startedDragging) {
          this.addMarkerInPlace(draggableEntry);
        }
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

        markedDroppableElement.moveEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDroppableElement.removeMarker();

          done();
        });
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging(draggableEntry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(draggbleEntry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var draggableEntryToBeMarked = this.isToBeMarked(draggbleEntry),
            directoryOverlappingEntry;

        if (draggableEntryToBeMarked) {
          var markedDirectory = this.getMarkedDirectory();

          directoryOverlappingEntry = this.getDirectoryOverlappingDraggableEntry(draggbleEntry);

          if (markedDirectory !== directoryOverlappingEntry) {
            this.removeMarker();

            this.addMarker(draggbleEntry, directoryOverlappingEntry);
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggbleEntry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggbleEntry);

            droppableElementToBeMarked.addMarker(draggbleEntry, directoryOverlappingEntry);
          } else {
            explorer.addMarkerInPlace(draggbleEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(draggbleEntry, explorer);
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
    key: 'draggableEntryPathMapsFromDraggableEntries',
    value: function draggableEntryPathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var draggableEntryPathMaps = draggableEntries.map(function (draggableEntry) {
        var draggableEntryPathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = sourcePath === null ? util.prependTargetPath(draggableEntryPath, targetPath) : util.replaceSourcePathWithTargetPath(draggableEntryPath, sourcePath, targetPath);

        draggableEntryPathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return draggableEntryPathMap;
      });

      return draggableEntryPathMaps;
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
  NO_DRAGGING_SUB_ENTRIES: 'NO_DRAGGING_SUB_ENTRIES',
  NO_DRAGGING_INTO_SUBDIRECTORIES: 'NO_DRAGGING_INTO_SUBDIRECTORIES'
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwiZXhwbG9yZXIiLCJyb290RGlyZWN0b3J5IiwiY2xvbmUiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJiaW5kIiwib3B0aW9ucyIsImFwcGVuZCIsIm9wdGlvbiIsImZpbGVQYXRoIiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzIiwicmVtb3ZlRmlsZSIsInJlbW92ZURpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsIm5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMiLCJoYXNPcHRpb24iLCJOT19EUkFHR0lOR19JTlRPX1NVQkRJUkVDVE9SSUVTIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsImRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJyb290RGlyZWN0b3J5TWFya2VkIiwiaXNNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWQiLCJ0b0JlTWFya2VkIiwic3RhcnRlZERyYWdnaW5nIiwibm9EcmFnZ2luZyIsIk5PX0RSQUdHSU5HIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJzdWJEcmFnZ2FibGVFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImRyYWdnYWJsZUVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJkcmFnZ2JsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlUb0JlTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZGlyZWN0b3J5IiwibW92ZWRQYXRoIiwicmVtb3ZlIiwiaXNDb2xsYXBzZWQiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwicmVzdWx0IiwiY2FsbGJhY2siLCJkcmFnZ2FibGVFbnRyeVBhdGhNYXBzIiwibWFwIiwiZHJhZ2dhYmxlRW50cnlQYXRoTWFwIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwicHJlcGVuZFRhcmdldFBhdGgiLCJyZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoIiwiaHRtbCIsImZyb21IVE1MIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxV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VyxLQUFSLENBQWNQLFFBQWQsRUFBd0JDLFFBQXhCLEVBQWtDQyxpQkFBbEMsRUFBcURFLFdBQXJELEVBQWtFRCxlQUFsRSxDQUFQO0FBQ0Q7Ozs2QkFFZW1GLEksRUFBTXBGLGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDckUsYUFBT1AsUUFBUTJGLFFBQVIsQ0FBaUJ2RixRQUFqQixFQUEyQnNGLElBQTNCLEVBQWlDcEYsaUJBQWpDLEVBQW9ERSxXQUFwRCxFQUFpRUQsZUFBakUsQ0FBUDtBQUNEOzs7O0VBN1BvQkwsZ0I7O0FBZ1F2QkUsU0FBU1UsT0FBVCxHQUFtQjtBQUNqQm9DLGVBQWEsYUFESTtBQUVqQjBDLDJCQUF5Qix5QkFGUjtBQUdqQjlELG1DQUFpQztBQUhoQixDQUFuQjs7QUFNQStELE9BQU9DLE9BQVAsR0FBaUIxRixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5vcHRpb25zID0ge307XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgsIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpOyB9XG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcyk7IH1cbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTsgfVxuICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gdGhpcy5oYXNPcHRpb24oRXhwbG9yZXIub3B0aW9ucy5OT19EUkFHR0lOR19JTlRPX1NVQkRJUkVDVE9SSUVTKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZCA9IHJvb3REaXJlY3RvcnlNYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgc3VwZXIuaXNNYXJrZWQoKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSksXG4gICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgc3RhcnRlZERyYWdnaW5nLFxuICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5oYXNPcHRpb24oRXhwbG9yZXIub3B0aW9ucy5OT19EUkFHR0lORyk7XG5cbiAgICBpZiAobm9EcmFnZ2luZykge1xuICAgICAgc3RhcnRlZERyYWdnaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aDtcblxuICAgIGlmIChtYXJrZWQgJiYgKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgZHJhZ2dhYmxlRW50cnlUb0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dibGVFbnRyeSksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICAgIFxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5VG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2JsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZHJhZ2dpbmcoZHJhZ2dibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBmaWxlUGF0aCA9IG1vdmVkUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICByZXN1bHQgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmFnZ2FibGVFbnRyeVBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGhNYXAgPSB7fSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5FeHBsb3Jlci5vcHRpb25zID0ge1xuICBOT19EUkFHR0lORzogJ05PX0RSQUdHSU5HJyxcbiAgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVM6ICdOT19EUkFHR0lOR19TVUJfRU5UUklFUycsXG4gIE5PX0RSQUdHSU5HX0lOVE9fU1VCRElSRUNUT1JJRVM6ICdOT19EUkFHR0lOR19JTlRPX1NVQkRJUkVDVE9SSUVTJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==