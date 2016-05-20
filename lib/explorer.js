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

  function Explorer(selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Explorer).call(this, selector));

    var rootDirectory = RootDirectory.clone(rootDirectoryName, _this.onDragEvent.bind(_this), _this.onActivateFileEvent.bind(_this));

    _this.activateFileHandler = activateFileHandler;
    _this.moveFileHandler = moveFileHandler;
    _this.moveDirectoryHandler = moveDirectoryHandler;

    _this.rootDirectory = rootDirectory;

    _this.append(rootDirectory);
    return _this;
  }

  _createClass(Explorer, [{
    key: 'addFile',
    value: function addFile(filePath, readOnly) {
      this.rootDirectory.addFile(filePath, readOnly);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      this.rootDirectory.addDirectory(directoryPath, collapsed);
    }
  }, {
    key: 'directoryPathContainingMarker',
    value: function directoryPathContainingMarker() {
      return this.rootDirectory.directoryPathContainingMarker();
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(entry) {
      var entryPath = entry.getPath(),
          entryType = entry.getType(),
          entryIsTopmost = util.isTopmost(entryPath);

      if (!entryIsTopmost) {
        var markerPath = entryPath;

        this.rootDirectory.addMarker(markerPath, entryType);
      } else {
        _get(Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, entry);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry) {
      var directoryPathOverlappingEntry = this.rootDirectory.directoryPathOverlappingEntry(entry);

      if (directoryPathOverlappingEntry === null) {
        this.addMarkerInPlace(entry);
      } else {
        var entryName = entry.getName(),
            entryType = entry.getType(),
            entryPath = entry.getPath(),
            rootDirectoryName = this.rootDirectory.getName(),
            entryTopmostDirectoryName = util.topmostDirectoryName(entryPath),
            markerPath = entryTopmostDirectoryName !== rootDirectoryName ? rootDirectoryName + '/' + entryName : directoryPathOverlappingEntry + '/' + entryName;

        this.rootDirectory.addMarker(markerPath, entryType);
      }
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      if (this.rootDirectory.hasMarker()) {
        this.rootDirectory.removeMarker();
      } else {
        _get(Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      if (this.rootDirectory.hasMarker()) {
        return true;
      } else {
        return _get(Object.getPrototypeOf(Explorer.prototype), 'hasMarker', this).call(this);
      }
    }
  }, {
    key: 'onActivateFileEvent',
    value: function onActivateFileEvent(activateFileEvent) {
      var file = activateFileEvent.getFile(),
          filePath = file.getPath(this.rootDirectory);

      this.activateFileHandler(filePath);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      if (this.hasMarker()) {
        return false;
      }

      this.addMarkerInPlace(entry);

      return true;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      var entryPath = entry.getPath(),
          elementHavingMarker = this.hasMarker() ? this : this.droppableElementHavingMarker(),
          directoryPathContainingMarker = elementHavingMarker.directoryPathContainingMarker(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = directoryPathContainingMarker;

      if (sourcePath === null || sourcePath !== targetPath) {
        var entries = entry.getEntries();

        elementHavingMarker.dragEntries(entries, sourcePath, targetPath);
      }

      _get(Object.getPrototypeOf(Explorer.prototype), 'stopDragging', this).call(this);
    }
  }, {
    key: 'isKeepingMarker',
    value: function isKeepingMarker(entry) {
      var directoryPathOverlappingEntry = this.rootDirectory.directoryPathOverlappingEntry(entry),
          keepingMarker;

      if (directoryPathOverlappingEntry !== null) {
        this.removeMarker();

        this.addMarker(entry);

        keepingMarker = true;
      } else {
        keepingMarker = false;
      }

      return keepingMarker;
    }
  }, {
    key: 'toAddMarker',
    value: function toAddMarker(entry) {
      var entryPath = entry.getPath(),
          entryIsTopmost = util.isTopmost(entryPath),
          directoryPathOverlappingEntry = this.rootDirectory.directoryPathOverlappingEntry(entry),
          addMarker = !entryIsTopmost && directoryPathOverlappingEntry !== null;

      return addMarker;
    }
  }, {
    key: 'dragDirectory',
    value: function dragDirectory(directory, sourcePath, targetPath) {
      function afterMove(movedPath) {
        if (false) {} else if (movedPath === null) {
          directory.remove();
        } else if (movedPath === targetPath) {
          directory.remove();

          var collapsed = directory.isCollapsed();

          this.addDirectory(movedPath, collapsed);
        } else if (movedPath === sourcePath) {}
      }

      var movedPath = this.moveDirectoryHandler(sourcePath, targetPath, afterMove.bind(this));

      if (movedPath !== undefined) {
        afterMove(movedPath);
      }
    }
  }, {
    key: 'dragFile',
    value: function dragFile(file, sourcePath, targetPath) {
      function afterMove(movedPath) {
        if (false) {} else if (movedPath === null) {
          file.remove();
        } else if (movedPath === targetPath) {
          file.remove();

          var readOnly = file.getReadOnly();

          this.addFile(movedPath, readOnly);
        } else if (movedPath === sourcePath) {}
      }

      var movedPath = this.moveFileHandler(sourcePath, targetPath, afterMove.bind(this));

      if (movedPath !== undefined) {
        afterMove(movedPath);
      }
    }
  }]);

  return Explorer;
}(DroppableElement);

Explorer.clone = function (selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
  return Element.clone(Explorer, selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler);
};

Explorer.fromHTML = function (html, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
  return Element.fromHTML(Explorer, html, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler);
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsbUJBQXpDLEVBQThELGVBQTlELEVBQStFLG9CQUEvRSxFQUFxRztBQUFBOztBQUFBLDRGQUM3RixRQUQ2Rjs7QUFHbkcsUUFBSSxnQkFBZ0IsY0FBYyxLQUFkLENBQW9CLGlCQUFwQixFQUF1QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBdkMsRUFBb0UsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLG1CQUFMLEdBQTJCLG1CQUEzQjtBQUNBLFVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLFVBQUssb0JBQUwsR0FBNEIsb0JBQTVCOztBQUVBLFVBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxVQUFLLE1BQUwsQ0FBWSxhQUFaO0FBWG1HO0FBWXBHOzs7OzRCQUVPLFEsRUFBVSxRLEVBQVU7QUFBRSxXQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsUUFBckM7QUFBaUQ7OztpQ0FDbEUsYSxFQUFlLFMsRUFBVztBQUFFLFdBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxhQUFoQyxFQUErQyxTQUEvQztBQUE0RDs7O29EQUNyRTtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLDZCQUFuQixFQUFQO0FBQTREOzs7cUNBRTdFLEssRUFBTztBQUN0QixVQUFJLFlBQVksTUFBTSxPQUFOLEVBQWhCO1VBQ0ksWUFBWSxNQUFNLE9BQU4sRUFEaEI7VUFFSSxp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QUFlLElBQWYsQ0FBN0MsQ0FBaEI7O0FBRUEsVUFBSSxjQUFjLFNBQWxCLEVBQTZCO0FBQzNCLGtCQUFVLFNBQVY7QUFDRDtBQUNGOzs7O0VBakxvQixnQjs7QUFvTHZCLFNBQVMsS0FBVCxHQUFpQixVQUFTLFFBQVQsRUFBbUIsaUJBQW5CLEVBQXNDLG1CQUF0QyxFQUEyRCxlQUEzRCxFQUE0RSxvQkFBNUUsRUFBa0c7QUFDakgsU0FBTyxRQUFRLEtBQVIsQ0FBYyxRQUFkLEVBQXdCLFFBQXhCLEVBQWtDLGlCQUFsQyxFQUFxRCxtQkFBckQsRUFBMEUsZUFBMUUsRUFBMkYsb0JBQTNGLENBQVA7QUFDRCxDQUZEOztBQUlBLFNBQVMsUUFBVCxHQUFvQixVQUFTLElBQVQsRUFBZSxpQkFBZixFQUFrQyxtQkFBbEMsRUFBdUQsZUFBdkQsRUFBd0Usb0JBQXhFLEVBQThGO0FBQ2hILFNBQU8sUUFBUSxRQUFSLENBQWlCLFFBQWpCLEVBQTJCLElBQTNCLEVBQWlDLGlCQUFqQyxFQUFvRCxtQkFBcEQsRUFBeUUsZUFBekUsRUFBMEYsb0JBQTFGLENBQVA7QUFDRCxDQUZEOztBQUlBLE9BQU8sT0FBUCxHQUFpQixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIHRoaXMub25EcmFnRXZlbnQuYmluZCh0aGlzKSwgdGhpcy5vbkFjdGl2YXRlRmlsZUV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVIYW5kbGVyID0gYWN0aXZhdGVGaWxlSGFuZGxlcjtcbiAgICB0aGlzLm1vdmVGaWxlSGFuZGxlciA9IG1vdmVGaWxlSGFuZGxlcjtcbiAgICB0aGlzLm1vdmVEaXJlY3RvcnlIYW5kbGVyID0gbW92ZURpcmVjdG9yeUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdCA9IHV0aWwuaXNUb3Btb3N0KGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5SXNUb3Btb3N0KSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICAgIG1hcmtlclBhdGggPSAoZW50cnlUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gcm9vdERpcmVjdG9yeU5hbWUpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICByb290RGlyZWN0b3J5TmFtZSArICcvJyArIGVudHJ5TmFtZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSArICcvJyArIGVudHJ5TmFtZTtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBpZiAodGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmhhc01hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWN0aXZhdGVGaWxlRXZlbnQoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlciA9IGVsZW1lbnRIYXZpbmdNYXJrZXIuZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlcjtcblxuICAgIGlmICgoc291cmNlUGF0aCA9PT0gbnVsbClcbiAgICAgfHwgKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpKSB7XG4gICAgICB2YXIgZW50cmllcyA9IGVudHJ5LmdldEVudHJpZXMoKTtcblxuICAgICAgZWxlbWVudEhhdmluZ01hcmtlci5kcmFnRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICB9XG5cbiAgICBzdXBlci5zdG9wRHJhZ2dpbmcoKTtcbiAgfVxuXG4gIGlzS2VlcGluZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMucm9vdERpcmVjdG9yeS5kaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGtlZXBpbmdNYXJrZXI7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAga2VlcGluZ01hcmtlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtlZXBpbmdNYXJrZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2VlcGluZ01hcmtlcjtcbiAgfVxuXG4gIHRvQWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdChlbnRyeVBhdGgpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMucm9vdERpcmVjdG9yeS5kaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGFkZE1hcmtlciA9ICFlbnRyeUlzVG9wbW9zdCAmJiAoZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGFkZE1hcmtlcjtcbiAgfVxuXG4gIGRyYWdEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgZnVuY3Rpb24gYWZ0ZXJNb3ZlKG1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSB0YXJnZXRQYXRoKSB7XG4gICAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgICAgdGhpcy5hZGREaXJlY3RvcnkobW92ZWRQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRGlyZWN0b3J5SGFuZGxlcihzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBhZnRlck1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFmdGVyTW92ZShtb3ZlZFBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBmdW5jdGlvbiBhZnRlck1vdmUobW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSB0YXJnZXRQYXRoKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpO1xuXG4gICAgICAgIHRoaXMuYWRkRmlsZShtb3ZlZFBhdGgsIHJlYWRPbmx5KTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRmlsZUhhbmRsZXIoc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgYWZ0ZXJNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlck1vdmUobW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxuRXhwbG9yZXIuY2xvbmUgPSBmdW5jdGlvbihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5FeHBsb3Jlci5mcm9tSFRNTCA9IGZ1bmN0aW9uKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19
