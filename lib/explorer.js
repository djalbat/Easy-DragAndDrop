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

  function Explorer(selector, rootDirectoryName, moveFileHandler, moveDirectoryHandler, activateFileHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Explorer).call(this, selector));

    var rootDirectory = RootDirectory.clone(rootDirectoryName, _this.onDragEvent.bind(_this), _this.onActivateFileEvent.bind(_this));

    _this.moveFileHandler = moveFileHandler;
    _this.moveDirectoryHandler = moveDirectoryHandler;
    _this.activateFileHandler = activateFileHandler;

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
    key: 'hasDirectory',
    value: function hasDirectory(directoryPath) {
      return this.rootDirectory.hasDirectory(directoryPath);
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryPath) {
      return this.rootDirectory.retrieveDirectory(directoryPath);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      this.rootDirectory.removeDirectory(directoryPath);
    }
  }, {
    key: 'getRootDirectoryName',
    value: function getRootDirectoryName() {
      return this.rootDirectory.getName();
    }
  }, {
    key: 'getDirectoryHavingMarker',
    value: function getDirectoryHavingMarker() {
      return this.rootDirectory.getDirectoryHavingMarker();
    }
  }, {
    key: 'getDirectoryOverlappingEntry',
    value: function getDirectoryOverlappingEntry(entry) {
      return this.rootDirectory.getDirectoryOverlappingEntry(entry);
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry, directoryOverlappingEntry) {
      if (directoryOverlappingEntry === undefined) {
        directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);
      }

      var entryName = entry.getName(),
          entryType = entry.getType(),
          directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
          markerPath = directoryPathOverlappingEntry + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryHasMarker = this.rootDirectory.hasMarker();

      if (rootDirectoryHasMarker) {
        this.rootDirectory.removeMarker();
      } else {
        _get(Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      var rootDirectoryHasMarker = this.rootDirectory.hasMarker();

      if (rootDirectoryHasMarker) {
        return true;
      } else {
        return _get(Object.getPrototypeOf(Explorer.prototype), 'hasMarker', this).call(this);
      }
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
        _get(Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, entry);
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
      var marker = this.hasMarker();

      if (marker) {
        return false;
      }

      this.addMarkerInPlace(entry);

      return true;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      var entryPath = entry.getPath(),
          droppableElementHavingMarker = this.hasMarker() ? this : this.getDroppableElementHavingMarker(),
          directoryHavingMarker = droppableElementHavingMarker.getDirectoryHavingMarker(),
          directoryPathHavingMarker = directoryHavingMarker === null ? null : directoryHavingMarker.getPath(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = directoryPathHavingMarker;

      if (sourcePath !== targetPath || sourcePath === null && targetPath === null && droppableElementHavingMarker !== this) {
        var subEntries = entry.getSubEntries();

        droppableElementHavingMarker.moveEntries(entry, subEntries, sourcePath, targetPath, function () {
          this.removeMarkerGlobally();
        }.bind(this));
      } else {
        this.removeMarkerGlobally();
      }
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var directoryHavingMarker = this.getDirectoryHavingMarker(),
          directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingEntry !== null && directoryOverlappingEntry !== directoryHavingMarker) {
        this.removeMarkerGlobally();

        this.addMarker(entry, directoryOverlappingEntry);
      } else {
        _get(Object.getPrototypeOf(Explorer.prototype), 'dragging', this).call(this, entry);
      }
    }
  }, {
    key: 'isToHaveMarker',
    value: function isToHaveMarker(entry) {
      var entryPath = entry.getPath(),
          entryIsTopmostDirectory = util.isTopmostDirectoryName(entryPath);

      if (entryIsTopmostDirectory) {
        return false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
            toHaveMarker = directoryOverlappingEntry !== null;

        return toHaveMarker;
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsZUFBekMsRUFBMEQsb0JBQTFELEVBQWdGLG1CQUFoRixFQUFxRztBQUFBOztBQUFBLDRGQUM3RixRQUQ2Rjs7QUFHbkcsUUFBSSxnQkFBZ0IsY0FBYyxLQUFkLENBQW9CLGlCQUFwQixFQUF1QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBdkMsRUFBb0UsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxVQUFLLG9CQUFMLEdBQTRCLG9CQUE1QjtBQUNBLFVBQUssbUJBQUwsR0FBMkIsbUJBQTNCOztBQUVBLFVBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxVQUFLLE1BQUwsQ0FBWSxhQUFaO0FBWG1HO0FBWXBHOzs7OzRCQUVPLFEsRUFBVSxRLEVBQVU7QUFBRSxXQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsUUFBckM7QUFBaUQ7OztpQ0FDbEUsYSxFQUFlLFMsRUFBVztBQUFFLFdBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxhQUFoQyxFQUErQyxTQUEvQztBQUE0RDs7O2lDQUN4RixhLEVBQWU7QUFBRSxhQUFPLEtBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxhQUFoQyxDQUFQO0FBQXdEOzs7c0NBQ3BFLGEsRUFBZTtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLGlCQUFuQixDQUFxQyxhQUFyQyxD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QUFlLGlCQUFmLEVBQWtDLG1CQUFsQyxFQUF1RCxlQUF2RCxFQUF3RSxvQkFBeEUsRUFBOEY7QUFDaEgsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUMsaUJBQWpDLEVBQW9ELG1CQUFwRCxFQUF5RSxlQUF6RSxFQUEwRixvQkFBMUYsQ0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlciwgYWN0aXZhdGVGaWxlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5vbkRyYWdFdmVudC5iaW5kKHRoaXMpLCB0aGlzLm9uQWN0aXZhdGVGaWxlRXZlbnQuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLm1vdmVGaWxlSGFuZGxlciA9IG1vdmVGaWxlSGFuZGxlcjtcbiAgICB0aGlzLm1vdmVEaXJlY3RvcnlIYW5kbGVyID0gbW92ZURpcmVjdG9yeUhhbmRsZXI7XG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVIYW5kbGVyID0gYWN0aXZhdGVGaWxlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7IH1cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpOyB9XG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7IH1cblxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuICAgIH1cblxuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5SGFzTWFya2VyID0gdGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlIYXNNYXJrZXIpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5SGFzTWFya2VyID0gdGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlIYXNNYXJrZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIuaGFzTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBvbkFjdGl2YXRlRmlsZUV2ZW50KGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpO1xuXG4gICAgaWYgKG1hcmtlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXIgPSAoZGlyZWN0b3J5SGF2aW5nTWFya2VyID09PSBudWxsICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXI7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5tb3ZlRW50cmllcyhlbnRyeSwgc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSB0aGlzLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmICgoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbClcbiAgICAgJiYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IGRpcmVjdG9yeUhhdmluZ01hcmtlcikpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5kcmFnZ2luZyhlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgaXNUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgICB0b0hhdmVNYXJrZXIgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICAgIHJldHVybiB0b0hhdmVNYXJrZXI7XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlck1vdmUobW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHRhcmdldFBhdGgpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgICB0aGlzLmFkZERpcmVjdG9yeShtb3ZlZFBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG4gICAgICBcbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRGlyZWN0b3J5SGFuZGxlcihzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBhZnRlck1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFmdGVyTW92ZS5jYWxsKHRoaXMsIG1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyTW92ZShtb3ZlZFBhdGgpIHtcbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHRhcmdldFBhdGgpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcmVhZE9ubHkgPSBmaWxlLmdldFJlYWRPbmx5KCk7XG5cbiAgICAgICAgdGhpcy5hZGRGaWxlKG1vdmVkUGF0aCwgcmVhZE9ubHkpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuICAgICAgXG4gICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgdmFyIG1vdmVkUGF0aCA9IHRoaXMubW92ZUZpbGVIYW5kbGVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGFmdGVyTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJNb3ZlLmNhbGwodGhpcywgbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxuRXhwbG9yZXIuY2xvbmUgPSBmdW5jdGlvbihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5FeHBsb3Jlci5mcm9tSFRNTCA9IGZ1bmN0aW9uKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19
