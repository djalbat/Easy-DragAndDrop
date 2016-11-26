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

    _this.append(rootDirectory);
    return _this;
  }

  _createClass(Explorer, [{
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
      return this.rootDirectory.getDirectoryOverlappingEntry(entry);
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry) {
      var directoryOverlappingEntry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDirectoryOverlappingEntry(entry);

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
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(entry) {
      var entryPath = entry.getPath(),
          entryType = entry.getType(),
          entryIsTopmost = util.isTopmostDirectoryName(entryPath);

      if (!entryIsTopmost) {
        var markerPath = entryPath;

        this.rootDirectory.addMarker(markerPath, entryType);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, entry);
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      var marked = this.isMarked(),
          startingDragging = !marked;

      if (startingDragging) {
        this.addMarkerInPlace(entry);
      }

      return startingDragging;
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
    key: 'dragging',
    value: function dragging(entry) {
      var markedDirectory = this.getMarkedDirectory(),
          directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingEntry !== null && directoryOverlappingEntry !== markedDirectory) {
        this.removeMarkerGlobally();

        this.addMarker(entry, directoryOverlappingEntry);
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'dragging', this).call(this, entry);
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var toBeMarked,
          entryPath = entry.getPath(),
          entryIsTopmostDirectory = util.isTopmostDirectoryName(entryPath);

      if (entryIsTopmostDirectory) {
        toBeMarked = false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        toBeMarked = directoryOverlappingEntry !== null;
      }

      return toBeMarked;
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
      result = this.activateHandler(sourcePath, cb);

      cb(result);

      function cb(result) {
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

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJlbnRyeU5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJnZXRQYXRoIiwibWFya2VyUGF0aCIsImFkZE1hcmtlciIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsIm1hcmtlZCIsImVudHJ5UGF0aCIsImVudHJ5SXNUb3Btb3N0IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInN0YXJ0aW5nRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwiZG9uZSIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwibWFya2VkRGlyZWN0b3J5Iiwibm9NYXJrZWREaXJlY3RvcnkiLCJtYXJrZWREaXJlY3RvcnlQYXRoIiwiZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwic3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJlbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwidG9CZU1hcmtlZCIsImVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwibW92ZWRQYXRoIiwicmVtb3ZlIiwiaXNDb2xsYXBzZWQiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJnZXRGaWxlIiwicmVzdWx0IiwiY2IiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLG1CQUFtQkgsUUFBUSxvQkFBUixDQUR2QjtBQUFBLElBRUlJLGdCQUFnQkosUUFBUSx5Q0FBUixDQUZwQjs7SUFJTUssUTs7O0FBQ0osb0JBQVlDLFFBQVosRUFBc0JDLGlCQUF0QixFQUF5Q0MsZUFBekMsRUFBMERDLFdBQTFELEVBQXVFO0FBQUE7O0FBQUEsb0hBQy9ESCxRQUQrRCxFQUNyREcsV0FEcUQ7O0FBR3JFLFFBQUlDLGdCQUFnQk4sY0FBY08sS0FBZCxDQUFvQkosaUJBQXBCLEVBQXVDLE1BQUtLLGdCQUFMLENBQXNCQyxJQUF0QixPQUF2QyxFQUF5RSxNQUFLQyx3QkFBTCxDQUE4QkQsSUFBOUIsT0FBekUsQ0FBcEI7O0FBRUEsVUFBS0wsZUFBTCxHQUF1QkEsZUFBdkI7O0FBRUEsVUFBS0UsYUFBTCxHQUFxQkEsYUFBckI7O0FBRUEsVUFBS0ssTUFBTCxDQUFZTCxhQUFaO0FBVHFFO0FBVXRFOzs7OzRCQUVPTSxRLEVBQVU7QUFBRSxXQUFLTixhQUFMLENBQW1CTyxPQUFuQixDQUEyQkQsUUFBM0I7QUFBdUM7OztpQ0FDOUNFLGEsRUFBZUMsUyxFQUFXO0FBQUUs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RSxDQUFQO0FBQ0Q7Ozs2QkFFZThELEksRUFBTS9ELGlCLEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDckUsYUFBT1AsUUFBUXNFLFFBQVIsQ0FBaUJsRSxRQUFqQixFQUEyQmlFLElBQTNCLEVBQWlDL0QsaUJBQWpDLEVBQW9ERSxXQUFwRCxFQUFpRUQsZUFBakUsQ0FBUDtBQUNEOzs7O0VBbE1vQkwsZ0I7O0FBcU12QnFFLE9BQU9DLE9BQVAsR0FBaUJwRSxRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIuYmluZCh0aGlzKSwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWQgPSByb290RGlyZWN0b3J5TWFya2VkID9cbiAgICAgICAgICAgICAgICAgICB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgIHN1cGVyLmlzTWFya2VkKCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgc3RhcnRpbmdEcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRpbmdEcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRpbmdEcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBub01hcmtlZERpcmVjdG9yeSA9IChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gbm9NYXJrZWREaXJlY3RvcnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGg7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzID0gc3ViRW50cmllcztcblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAoKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpXG4gICAgICYmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBtYXJrZWREaXJlY3RvcnkpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuZHJhZ2dpbmcoZW50cnkpO1xuICAgIH1cbiAgfVxuICBcbiAgZXNjYXBlRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgdG9CZU1hcmtlZCxcbiAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICB0b0JlTWFya2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgZmlsZVBhdGggPSBtb3ZlZFBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgcmVzdWx0ID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgY2IpO1xuXG4gICAgY2IocmVzdWx0KTtcbiAgICBcbiAgICBmdW5jdGlvbiBjYihyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19