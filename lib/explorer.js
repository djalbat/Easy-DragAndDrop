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
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      this.rootDirectory.addDirectory(directoryPath, collapsed);
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
      var noDragsToSubdirectories = this.hasOption(Explorer.options.NO_DRAGS_TO_SUBDIRECTORIES),
          directoryOverlappingEntry = this.rootDirectory.getDirectoryOverlappingEntry(entry, noDragsToSubdirectories);

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
          noMarkedDirectory = markedDirectory === null,
          markedDirectoryPath = noMarkedDirectory ? null : markedDirectory.getPath(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = markedDirectoryPath;

      if (sourcePath !== targetPath || sourcePath === null && targetPath === null && markedDroppableElement !== this) {
        var subEntries = entry.getSubEntries(),
            entries = subEntries;

        entries.reverse();
        entries.push(entry);

        markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function () {
          this.removeMarkerGlobally();

          done();
        }.bind(this));
      } else {
        this.removeMarkerGlobally();

        done();
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
      if (false) {} else if (movedPath === sourcePath) {} else if (movedPath === null) {
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
      if (false) {} else if (movedPath === sourcePath) {} else if (movedPath === null) {
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
  NO_DRAGS_TO_SUBDIRECTORIES: 'NO_DRAGS_TO_SUBDIRECTORIES'
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJvcHRpb25zIiwiYXBwZW5kIiwib3B0aW9uIiwiZmlsZVBhdGgiLCJhZGRGaWxlIiwiZGlyZWN0b3J5UGF0aCIsImNvbGxhcHNlZCIsImFkZERpcmVjdG9yeSIsImdldE5hbWUiLCJnZXRNYXJrZWREaXJlY3RvcnkiLCJlbnRyeSIsIm5vRHJhZ3NUb1N1YmRpcmVjdG9yaWVzIiwiaGFzT3B0aW9uIiwiTk9fRFJBR1NfVE9fU1VCRElSRUNUT1JJRVMiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSIsIm1hcmtlclBhdGgiLCJhZGRNYXJrZXIiLCJlbnRyeU5hbWUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsIm1hcmtlZCIsInRvQmVNYXJrZWQiLCJub0V4cGxvcmVyRHJhZ3MiLCJOT19FWFBMT1JFUl9EUkFHUyIsInN0YXJ0RHJhZ2dpbmciLCJub0RyYWdnaW5nRW50cmllcyIsIk5PX0RSQUdHSU5HIiwiYWRkTWFya2VySW5QbGFjZSIsImRvbmUiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsIm1hcmtlZERpcmVjdG9yeSIsIm5vTWFya2VkRGlyZWN0b3J5IiwibWFya2VkRGlyZWN0b3J5UGF0aCIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInN1YkVudHJpZXMiLCJnZXRTdWJFbnRyaWVzIiwiZW50cmllcyIsInJldmVyc2UiLCJwdXNoIiwibW92ZUVudHJpZXMiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsImV4cGxvcmVyIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImRyYWdnaW5nIiwiZGlyZWN0b3J5IiwibW92ZWRQYXRoIiwicmVtb3ZlIiwiaXNDb2xsYXBzZWQiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwicmVzdWx0IiwiY2FsbGJhY2siLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLG1CQUFtQkgsUUFBUSxvQkFBUixDQUR2QjtBQUFBLElBRUlJLGdCQUFnQkosUUFBUSx5Q0FBUixDQUZwQjs7SUFJTUssUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLGlCQUF0QixFQUF5Q0MsZUFBekMsRUFBMERDLFdBQTFELEVBQXVFO0FBQUE7O0FBQUEsb0hBQy9ESCxRQUQrRCxFQUNyREcsV0FEcUQ7O0FBR3JFLFFBQUlDLGdCQUFnQk4sY0FBY08sS0FBZCxDQUFvQkosaUJBQXBCLEVBQXVDLE1BQUtLLGdCQUFMLENBQXNC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O0FBQUEsVUFDSTlELFdBQVc0RCxLQUFLOUMsT0FBTCxDQUFhLEtBQUt0QixhQUFsQixDQURmO0FBQUEsVUFFSWtELGFBQWExQyxRQUZqQjtBQUFBLFVBRTRCO0FBQ3hCK0QsZUFBUyxLQUFLekUsZUFBTCxDQUFxQm9ELFVBQXJCLEVBQWlDc0IsUUFBakMsQ0FIYjs7QUFLQUEsZUFBU0QsTUFBVDs7QUFFQSxlQUFTQyxRQUFULENBQWtCRCxNQUFsQixFQUEwQjtBQUN4QixZQUFJQSxXQUFXLEtBQWYsRUFBc0I7QUFDcEJILGVBQUtGLE1BQUw7QUFDRDtBQUNGO0FBQ0Y7OzswQkFFWXRFLFEsRUFBVUMsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUN0RSxhQUFPUCxRQUFRVSxLQUFSLENBQWNOLFFBQWQsRUFBd0JDLFFBQXhCLEVBQWtDQyxpQkFBbEMsRUFBcURFLFdBQXJELEVBQWtFRCxlQUFsRSxDQUFQO0FBQ0Q7Ozs2QkFFZTJFLEksRUFBTTVFLGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDckUsYUFBT1AsUUFBUW1GLFFBQVIsQ0FBaUIvRSxRQUFqQixFQUEyQjhFLElBQTNCLEVBQWlDNUUsaUJBQWpDLEVBQW9ERSxXQUFwRCxFQUFpRUQsZUFBakUsQ0FBUDtBQUNEOzs7O0VBeFBvQkwsZ0I7O0FBMlB2QkUsU0FBU1UsT0FBVCxHQUFtQjtBQUNqQm1DLGVBQWEsYUFESTtBQUVqQkgscUJBQW1CLG1CQUZGO0FBR2pCbkIsOEJBQTRCO0FBSFgsQ0FBbkI7O0FBTUF5RCxPQUFPQyxPQUFQLEdBQWlCakYsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5vcHRpb25zID0ge307XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHtcbiAgICB2YXIgbm9EcmFnc1RvU3ViZGlyZWN0b3JpZXMgPSB0aGlzLmhhc09wdGlvbihFeHBsb3Jlci5vcHRpb25zLk5PX0RSQUdTX1RPX1NVQkRJUkVDVE9SSUVTKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5LCBub0RyYWdzVG9TdWJkaXJlY3Rvcmllcyk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWQgPSByb290RGlyZWN0b3J5TWFya2VkID9cbiAgICAgICAgICAgICAgICAgICB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgIHN1cGVyLmlzTWFya2VkKCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIHRvQmVNYXJrZWQsXG4gICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbm9FeHBsb3JlckRyYWdzID0gdGhpcy5oYXNPcHRpb24oRXhwbG9yZXIub3B0aW9ucy5OT19FWFBMT1JFUl9EUkFHUyksXG4gICAgICAgIGVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuICAgIFxuICAgIGlmIChub0V4cGxvcmVyRHJhZ3MgJiYgZW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIHRvQmVNYXJrZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuICAgICAgXG4gICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpO1xuICAgIH1cbiAgICAgICAgXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIHN0YXJ0RHJhZ2dpbmcsXG4gICAgICAgIG5vRHJhZ2dpbmdFbnRyaWVzID0gdGhpcy5oYXNPcHRpb24oRXhwbG9yZXIub3B0aW9ucy5OT19EUkFHR0lORyk7XG5cbiAgICBpZiAobm9EcmFnZ2luZ0VudHJpZXMpIHtcbiAgICAgIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgICAgc3RhcnREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICAgIGlmIChzdGFydERyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgbm9NYXJrZWREaXJlY3RvcnkgPSAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSxcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IG5vTWFya2VkRGlyZWN0b3J5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoO1xuXG4gICAgaWYgKChzb3VyY2VQYXRoICE9PSB0YXJnZXRQYXRoKSB8fCAoc291cmNlUGF0aCA9PT0gbnVsbCkgJiYgKHRhcmdldFBhdGggPT09IG51bGwpICYmIChtYXJrZWREcm9wcGFibGVFbGVtZW50ICE9PSB0aGlzKSkge1xuICAgICAgdmFyIHN1YkVudHJpZXMgPSBlbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllcyA9IHN1YkVudHJpZXM7XG5cbiAgICAgIGVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZW50cmllcy5wdXNoKGVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5tb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChlbnRyeSksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICAgIFxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgdmFyIG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGZpbGVQYXRoID0gbW92ZWRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cbn1cblxuRXhwbG9yZXIub3B0aW9ucyA9IHtcbiAgTk9fRFJBR0dJTkc6ICdOT19EUkFHR0lORycsXG4gIE5PX0VYUExPUkVSX0RSQUdTOiAnTk9fRVhQTE9SRVJfRFJBR1MnLFxuICBOT19EUkFHU19UT19TVUJESVJFQ1RPUklFUzogJ05PX0RSQUdTX1RPX1NVQkRJUkVDVE9SSUVTJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==