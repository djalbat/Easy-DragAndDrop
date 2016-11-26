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
    value: function stopDragging(entry) {
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
        }.bind(this));
      } else {
        this.removeMarkerGlobally();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsImFkZEZpbGUiLCJkaXJlY3RvcnlQYXRoIiwiY29sbGFwc2VkIiwiYWRkRGlyZWN0b3J5IiwiZ2V0TmFtZSIsImdldE1hcmtlZERpcmVjdG9yeSIsImVudHJ5IiwiZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkiLCJlbnRyeU5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGgiLCJnZXRQYXRoIiwibWFya2VyUGF0aCIsImFkZE1hcmtlciIsInJvb3REaXJlY3RvcnlNYXJrZWQiLCJpc01hcmtlZCIsInJlbW92ZU1hcmtlciIsIm1hcmtlZCIsImVudHJ5UGF0aCIsImVudHJ5SXNUb3Btb3N0IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZSIsInN0YXJ0aW5nRHJhZ2dpbmciLCJhZGRNYXJrZXJJblBsYWNlIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJtYXJrZWREaXJlY3RvcnkiLCJub01hcmtlZERpcmVjdG9yeSIsIm1hcmtlZERpcmVjdG9yeVBhdGgiLCJlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJzdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJ0b0JlTWFya2VkIiwiZW50cnlJc1RvcG1vc3REaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJtb3ZlZFBhdGgiLCJyZW1vdmUiLCJpc0NvbGxhcHNlZCIsImZpbGUiLCJhY3RpdmF0ZUZpbGVFdmVudCIsImdldEZpbGUiLCJyZXN1bHQiLCJjYiIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsbUJBQW1CSCxRQUFRLG9CQUFSLENBRHZCO0FBQUEsSUFFSUksZ0JBQWdCSixRQUFRLHlDQUFSLENBRnBCOztJQUlNSyxROzs7QUFDSixvQkFBWUMsUUFBWixFQUFzQkMsaUJBQXRCLEVBQXlDQyxlQUF6QyxFQUEwREMsV0FBMUQsRUFBdUU7QUFBQTs7QUFBQSxvSEFDL0RILFFBRCtELEVBQ3JERyxXQURxRDs7QUFHckUsUUFBSUMsZ0JBQWdCTixjQUFjTyxLQUFkLENBQW9CSixpQkFBcEIsRUFBdUMsTUFBS0ssZ0JBQUwsQ0FBc0JDLElBQXRCLE9BQXZDLEVBQXlFLE1BQUtDLHdCQUFMLENBQThCRCxJQUE5QixPQUF6RSxDQUFwQjs7QUFFQSxVQUFLTCxlQUFMLEdBQXVCQSxlQUF2Qjs7QUFFQSxVQUFLRSxhQUFMLEdBQXFCQSxhQUFyQjs7QUFFQSxVQUFLSyxNQUFMLENBQVlMLGFBQVo7QUFUcUU7QUFVdEU7Ozs7NEJBRU9NLFEsRUFBVTtBQUFFLFdBQUtOLGFBQUwsQ0FBbUJPLE9BQW5CLENBQTJCRCxRQUEzQjtBQUF1Qzs7O2lDQUM5Q0UsYSxFQUFlQyxTLEVBQVc7QUFBRSxXQUFLVCxh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LEVBQW1CRSxXLEVBQWFELGUsRUFBaUI7QUFDckUsYUFBT1AsUUFBUXFFLFFBQVIsQ0FBaUJqRSxRQUFqQixFQUEyQmdFLElBQTNCLEVBQWlDOUQsaUJBQWpDLEVBQW9ERSxXQUFwRCxFQUFpRUQsZUFBakUsQ0FBUDtBQUNEOzs7O0VBL0xvQkwsZ0I7O0FBa012Qm9FLE9BQU9DLE9BQVAsR0FBaUJuRSxRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLmRyYWdFdmVudEhhbmRsZXIuYmluZCh0aGlzKSwgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpLFxuICAgICAgICBtYXJrZWQgPSByb290RGlyZWN0b3J5TWFya2VkID9cbiAgICAgICAgICAgICAgICAgICB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgIHN1cGVyLmlzTWFya2VkKCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgc3RhcnRpbmdEcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRpbmdEcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRpbmdEcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICBub01hcmtlZERpcmVjdG9yeSA9IChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpLFxuICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gbm9NYXJrZWREaXJlY3RvcnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGg7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzID0gc3ViRW50cmllcztcblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAoKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpXG4gICAgICYmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBtYXJrZWREaXJlY3RvcnkpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuZHJhZ2dpbmcoZW50cnkpO1xuICAgIH1cbiAgfVxuICBcbiAgZXNjYXBlRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgdG9CZU1hcmtlZCxcbiAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICB0b0JlTWFya2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9CZU1hcmtlZCA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgZmlsZVBhdGggPSBtb3ZlZFBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgcmVzdWx0ID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgY2IpO1xuXG4gICAgY2IocmVzdWx0KTtcbiAgICBcbiAgICBmdW5jdGlvbiBjYihyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19