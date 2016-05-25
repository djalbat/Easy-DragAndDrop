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

      this.draggedEntry = entry;

      return true;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry, done) {
      this.draggedEntry = null;

      var entryPath = entry.getPath(),
          elementHavingMarker = this.hasMarker() ? this : this.droppableElementHavingMarker(),
          directoryPathContainingMarker = elementHavingMarker.directoryPathContainingMarker(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = directoryPathContainingMarker;

      if (sourcePath !== targetPath || sourcePath === null && targetPath === null && elementHavingMarker !== this) {
        var subEntries = entry.getSubEntries();

        elementHavingMarker.moveEntries(entry, subEntries, sourcePath, targetPath, function () {
          this.removeMarkerGlobally();

          done();
        }.bind(this));
      } else {
        this.removeMarkerGlobally();

        done();
      }
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
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourcePath, targetPath, isSubEntry, next) {
      function afterMove(movedPath) {
        if (false) {} else if (movedPath === null) {
          directory.remove();
        } else if (movedPath === targetPath) {
          directory.remove();

          var collapsed = directory.isCollapsed();

          this.addDirectory(movedPath, collapsed);
        } else if (movedPath === sourcePath) {}

        next();
      }

      var movedPath = this.moveDirectoryHandler(sourcePath, targetPath, isSubEntry, afterMove.bind(this));

      if (movedPath !== undefined) {
        afterMove.call(this, movedPath);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, targetPath, isSubEntry, next) {
      function afterMove(movedPath) {
        if (false) {} else if (movedPath === null) {
          file.remove();
        } else if (movedPath === targetPath) {
          file.remove();

          var readOnly = file.getReadOnly();

          this.addFile(movedPath, readOnly);
        } else if (movedPath === sourcePath) {}

        next();
      }

      var movedPath = this.moveFileHandler(sourcePath, targetPath, isSubEntry, afterMove.bind(this));

      if (movedPath !== undefined) {
        afterMove.call(this, movedPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsbUJBQXpDLEVBQThELGVBQTlELEVBQStFLG9CQUEvRSxFQUFxRztBQUFBOztBQUFBLDRGQUM3RixRQUQ2Rjs7QUFHbkcsUUFBSSxnQkFBZ0IsY0FBYyxLQUFkLENBQW9CLGlCQUFwQixFQUF1QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBdkMsRUFBb0UsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLG1CQUFMLEdBQTJCLG1CQUEzQjtBQUNBLFVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLFVBQUssb0JBQUwsR0FBNEIsb0JBQTVCOztBQUVBLFVBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxVQUFLLE1BQUwsQ0FBWSxhQUFaO0FBWG1HO0FBWXBHOzs7OzRCQUVPLFEsRUFBVSxRLEVBQVU7QUFBRSxXQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsUUFBckM7QUFBaUQ7OztpQ0FDbEUsYSxFQUFlLFMsRUFBVztBQUFFLFdBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxhQUFoQyxFQUErQyxTQUEvQztBQUE0RDs7O29EQUNyRTtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLDZCQUFuQixFQUFQO0FBQTREOzs7cUNBRTdFLEssRUFBTztBQUN0QixVQUFJLFlBQVksTUFBTSxPQUFOLEVBQWhCO1VBQ0ksWUFBWSxNQUFNLE9BQU4sRUFEaEI7VUFFSSxp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YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5vbkRyYWdFdmVudC5iaW5kKHRoaXMpLCB0aGlzLm9uQWN0aXZhdGVGaWxlRXZlbnQuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVIYW5kbGVyO1xuICAgIHRoaXMubW92ZUZpbGVIYW5kbGVyID0gbW92ZUZpbGVIYW5kbGVyO1xuICAgIHRoaXMubW92ZURpcmVjdG9yeUhhbmRsZXIgPSBtb3ZlRGlyZWN0b3J5SGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdCA9IHV0aWwuaXNUb3Btb3N0KGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5SXNUb3Btb3N0KSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIHJvb3REaXJlY3RvcnlOYW1lID0gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICAgIG1hcmtlclBhdGggPSAoZW50cnlUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gcm9vdERpcmVjdG9yeU5hbWUpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICByb290RGlyZWN0b3J5TmFtZSArICcvJyArIGVudHJ5TmFtZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSArICcvJyArIGVudHJ5TmFtZTtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBpZiAodGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmhhc01hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWN0aXZhdGVGaWxlRXZlbnQoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgaWYgKHRoaXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuXG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBlbnRyeTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5LCBkb25lKSB7XG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBudWxsO1xuXG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuaGFzTWFya2VyKCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIgPSBlbGVtZW50SGF2aW5nTWFya2VyLmRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCksXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXI7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKGVsZW1lbnRIYXZpbmdNYXJrZXIgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgZWxlbWVudEhhdmluZ01hcmtlci5tb3ZlRW50cmllcyhlbnRyeSwgc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH1cblxuICBpc0tlZXBpbmdNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLnJvb3REaXJlY3RvcnkuZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBrZWVwaW5nTWFya2VyO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgIGtlZXBpbmdNYXJrZXIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZWVwaW5nTWFya2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtlZXBpbmdNYXJrZXI7XG4gIH1cblxuICB0b0FkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0ID0gdXRpbC5pc1RvcG1vc3QoZW50cnlQYXRoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLnJvb3REaXJlY3RvcnkuZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBhZGRNYXJrZXIgPSAhZW50cnlJc1RvcG1vc3QgJiYgKGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBhZGRNYXJrZXI7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyTW92ZShtb3ZlZFBhdGgpIHtcbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gdGFyZ2V0UGF0aCkge1xuICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KG1vdmVkUGF0aCwgY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cbiAgICAgIFxuICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIHZhciBtb3ZlZFBhdGggPSB0aGlzLm1vdmVEaXJlY3RvcnlIYW5kbGVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGFmdGVyTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJNb3ZlLmNhbGwodGhpcywgbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgZnVuY3Rpb24gYWZ0ZXJNb3ZlKG1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gdGFyZ2V0UGF0aCkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciByZWFkT25seSA9IGZpbGUuZ2V0UmVhZE9ubHkoKTtcblxuICAgICAgICB0aGlzLmFkZEZpbGUobW92ZWRQYXRoLCByZWFkT25seSk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG4gICAgICBcbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRmlsZUhhbmRsZXIoc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgYWZ0ZXJNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlck1vdmUuY2FsbCh0aGlzLCBtb3ZlZFBhdGgpO1xuICAgIH1cbiAgfVxufVxuXG5FeHBsb3Jlci5jbG9uZSA9IGZ1bmN0aW9uKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cbkV4cGxvcmVyLmZyb21IVE1MID0gZnVuY3Rpb24oaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=
