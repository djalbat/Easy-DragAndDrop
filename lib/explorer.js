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
    key: 'getRootDirectoryName',
    value: function getRootDirectoryName() {
      return this.rootDirectory.getName();
    }
  }, {
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
            markerPath = directoryPathOverlappingEntry + '/' + entryName;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsbUJBQXpDLEVBQThELGVBQTlELEVBQStFLG9CQUEvRSxFQUFxRztBQUFBOztBQUFBLDRGQUM3RixRQUQ2Rjs7QUFHbkcsUUFBSSxnQkFBZ0IsY0FBYyxLQUFkLENBQW9CLGlCQUFwQixFQUF1QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBdkMsRUFBb0UsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLG1CQUFMLEdBQTJCLG1CQUEzQjtBQUNBLFVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLFVBQUssb0JBQUwsR0FBNEIsb0JBQTVCOztBQUVBLFVBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxVQUFLLE1BQUwsQ0FBWSxhQUFaO0FBWG1HO0FBWXBHOzs7OzJDQUVzQjtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLE9BQW5CLEVBQVA7QUFBc0M7Ozs0QkFDdkQsUSxFQUFVLFEsRUFBVTtBQUFFLFdBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixRQUEzQixFQUFxQyxRQUFyQztBQUFpRDs7O2lDQUNsRSxhLEVBQWUsUyxFQUFXO0FBQUUsV0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLGFBQWhDLEVBQStDLFNBQS9DO0FBQTREOzs7b0RBQ3JFO0FBQUUsYUFBTyxLQUFLLGFBQUwsQ0FBbUIsNkJBQW5CLEVBQVA7QUFBNEQ7OztxQ0FFN0UsSyxFQUFPO0FBQ3RCLFVBQUks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QUFFQSxjQUFJLFdBQVcsS0FBSyxXQUFMLEVBQWY7O0FBRUEsZUFBSyxPQUFMLENBQWEsU0FBYixFQUF3QixRQUF4QjtBQUNELFNBTk0sTUFNQSxJQUFJLGNBQWMsVUFBbEIsRUFBOEIsQ0FFcEM7O0FBRUQ7QUFDRDs7QUFFRCxVQUFJLFlBQVksS0FBSyxlQUFMLENBQXFCLFVBQXJCLEVBQWlDLFVBQWpDLEVBQTZDLFVBQTdDLEVBQXlELFVBQVUsSUFBVixDQUFlLElBQWYsQ0FBekQsQ0FBaEI7O0FBRUEsVUFBSSxjQUFjLFNBQWxCLEVBQTZCO0FBQzNCLGtCQUFVLElBQVYsQ0FBZSxJQUFmLEVBQXFCLFNBQXJCO0FBQ0Q7QUFDRjs7OztFQTNMb0IsZ0I7O0FBOEx2QixTQUFTLEtBQVQsR0FBaUIsVUFBUyxRQUFULEVBQW1CLGlCQUFuQixFQUFzQyxtQkFBdEMsRUFBMkQsZUFBM0QsRUFBNEUsb0JBQTVFLEVBQWtHO0FBQ2pILFNBQU8sUUFBUSxLQUFSLENBQWMsUUFBZCxFQUF3QixRQUF4QixFQUFrQyxpQkFBbEMsRUFBcUQsbUJBQXJELEVBQTBFLGVBQTFFLEVBQTJGLG9CQUEzRixDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxTQUFTLFFBQVQsR0FBb0IsVUFBUyxJQUFULEVBQWUsaUJBQWYsRUFBa0MsbUJBQWxDLEVBQXVELGVBQXZELEVBQXdFLG9CQUF4RSxFQUE4RjtBQUNoSCxTQUFPLFFBQVEsUUFBUixDQUFpQixRQUFqQixFQUEyQixJQUEzQixFQUFpQyxpQkFBakMsRUFBb0QsbUJBQXBELEVBQXlFLGVBQXpFLEVBQTBGLG9CQUExRixDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLm9uRHJhZ0V2ZW50LmJpbmQodGhpcyksIHRoaXMub25BY3RpdmF0ZUZpbGVFdmVudC5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlSGFuZGxlciA9IGFjdGl2YXRlRmlsZUhhbmRsZXI7XG4gICAgdGhpcy5tb3ZlRmlsZUhhbmRsZXIgPSBtb3ZlRmlsZUhhbmRsZXI7XG4gICAgdGhpcy5tb3ZlRGlyZWN0b3J5SGFuZGxlciA9IG1vdmVEaXJlY3RvcnlIYW5kbGVyO1xuICAgIFxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdCA9IHV0aWwuaXNUb3Btb3N0KGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5SXNUb3Btb3N0KSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGlmICh0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIGlmICh0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIuaGFzTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgb25BY3RpdmF0ZUZpbGVFdmVudChhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVIYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXIoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnksIGRvbmUpIHtcbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IG51bGw7XG5cbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlciA9IGVsZW1lbnRIYXZpbmdNYXJrZXIuZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlcjtcblxuICAgIGlmICgoc291cmNlUGF0aCAhPT0gdGFyZ2V0UGF0aClcbiAgICAgfHwgKHNvdXJjZVBhdGggPT09IG51bGwpICYmICh0YXJnZXRQYXRoID09PSBudWxsKSAmJiAoZWxlbWVudEhhdmluZ01hcmtlciAhPT0gdGhpcykpIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBlbGVtZW50SGF2aW5nTWFya2VyLm1vdmVFbnRyaWVzKGVudHJ5LCBzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlzS2VlcGluZ01hcmtlcihlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMucm9vdERpcmVjdG9yeS5kaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGtlZXBpbmdNYXJrZXI7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAga2VlcGluZ01hcmtlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtlZXBpbmdNYXJrZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2VlcGluZ01hcmtlcjtcbiAgfVxuXG4gIHRvQWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdChlbnRyeVBhdGgpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMucm9vdERpcmVjdG9yeS5kaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgIGFkZE1hcmtlciA9ICFlbnRyeUlzVG9wbW9zdCAmJiAoZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGFkZE1hcmtlcjtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgZnVuY3Rpb24gYWZ0ZXJNb3ZlKG1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSB0YXJnZXRQYXRoKSB7XG4gICAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgICAgdGhpcy5hZGREaXJlY3RvcnkobW92ZWRQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuICAgICAgXG4gICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgdmFyIG1vdmVkUGF0aCA9IHRoaXMubW92ZURpcmVjdG9yeUhhbmRsZXIoc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgYWZ0ZXJNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlck1vdmUuY2FsbCh0aGlzLCBtb3ZlZFBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlck1vdmUobW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSB0YXJnZXRQYXRoKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpO1xuXG4gICAgICAgIHRoaXMuYWRkRmlsZShtb3ZlZFBhdGgsIHJlYWRPbmx5KTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cbiAgICAgIFxuICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIHZhciBtb3ZlZFBhdGggPSB0aGlzLm1vdmVGaWxlSGFuZGxlcihzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBhZnRlck1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFmdGVyTW92ZS5jYWxsKHRoaXMsIG1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG59XG5cbkV4cGxvcmVyLmNsb25lID0gZnVuY3Rpb24oc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpO1xufTtcblxuRXhwbG9yZXIuZnJvbUhUTUwgPSBmdW5jdGlvbihodG1sLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiJdfQ==
