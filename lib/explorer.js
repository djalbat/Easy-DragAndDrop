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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsZUFBekMsRUFBMEQsb0JBQTFELEVBQWdGLG1CQUFoRixFQUFxRztBQUFBOztBQUFBLDRGQUM3RixRQUQ2Rjs7QUFHbkcsUUFBSSxnQkFBZ0IsY0FBYyxLQUFkLENBQW9CLGlCQUFwQixFQUF1QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBdkMsRUFBb0UsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxVQUFLLG9CQUFMLEdBQTRCLG9CQUE1QjtBQUNBLFVBQUssbUJBQUwsR0FBMkIsbUJBQTNCOztBQUVBLFVBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxVQUFLLE1BQUwsQ0FBWSxhQUFaO0FBWG1HO0FBWXBHOzs7OzRCQUVPLFEsRUFBVSxRLEVBQVU7QUFBRSxXQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsUUFBckM7QUFBaUQ7OztpQ0FDbEUsYSxFQUFlLFMsRUFBVztBQUFFLFdBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxhQUFoQyxFQUErQyxTQUEvQztBQUE0RDs7OzJDQUU5RTtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLE9BQW5CLEVBQVA7QUFBc0M7OzsrQ0FDcEM7QUFBRSxhQUFPLEtBQUssYUFBTCxDQUFtQix3QkFBbkIsRUFBUDtBQUF1RDs7O2lEQUN2RCxLLEVBQU87QUFBRSxhQUFPLEtB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cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlciwgYWN0aXZhdGVGaWxlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5vbkRyYWdFdmVudC5iaW5kKHRoaXMpLCB0aGlzLm9uQWN0aXZhdGVGaWxlRXZlbnQuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLm1vdmVGaWxlSGFuZGxlciA9IG1vdmVGaWxlSGFuZGxlcjtcbiAgICB0aGlzLm1vdmVEaXJlY3RvcnlIYW5kbGVyID0gbW92ZURpcmVjdG9yeUhhbmRsZXI7XG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVIYW5kbGVyID0gYWN0aXZhdGVGaWxlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgXG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KSB7XG4gICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgKyAnLycgKyBlbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlIYXNNYXJrZXIgPSB0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeUhhc01hcmtlcikge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlIYXNNYXJrZXIgPSB0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeUhhc01hcmtlcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5oYXNNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdCA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeUlzVG9wbW9zdCkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIG9uQWN0aXZhdGVGaWxlRXZlbnQoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAobWFya2VyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuaGFzTWFya2VyKCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aEhhdmluZ01hcmtlciA9IChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwgKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlci5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gZGlyZWN0b3J5UGF0aEhhdmluZ01hcmtlcjtcblxuICAgIGlmICgoc291cmNlUGF0aCAhPT0gdGFyZ2V0UGF0aClcbiAgICAgfHwgKHNvdXJjZVBhdGggPT09IG51bGwpICYmICh0YXJnZXRQYXRoID09PSBudWxsKSAmJiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciAhPT0gdGhpcykpIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLm1vdmVFbnRyaWVzKGVudHJ5LCBzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKVxuICAgICAmJiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gZGlyZWN0b3J5SGF2aW5nTWFya2VyKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmRyYWdnaW5nKGVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBpc1RvSGF2ZU1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5ID0gdXRpbC5pc1RvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZW50cnlJc1RvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICAgIHRvSGF2ZU1hcmtlciA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcblxuICAgICAgcmV0dXJuIHRvSGF2ZU1hcmtlcjtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyTW92ZShtb3ZlZFBhdGgpIHtcbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gdGFyZ2V0UGF0aCkge1xuICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KG1vdmVkUGF0aCwgY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cbiAgICAgIFxuICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIHZhciBtb3ZlZFBhdGggPSB0aGlzLm1vdmVEaXJlY3RvcnlIYW5kbGVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGFmdGVyTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJNb3ZlLmNhbGwodGhpcywgbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgZnVuY3Rpb24gYWZ0ZXJNb3ZlKG1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gdGFyZ2V0UGF0aCkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciByZWFkT25seSA9IGZpbGUuZ2V0UmVhZE9ubHkoKTtcblxuICAgICAgICB0aGlzLmFkZEZpbGUobW92ZWRQYXRoLCByZWFkT25seSk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG4gICAgICBcbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRmlsZUhhbmRsZXIoc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgYWZ0ZXJNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlck1vdmUuY2FsbCh0aGlzLCBtb3ZlZFBhdGgpO1xuICAgIH1cbiAgfVxufVxuXG5FeHBsb3Jlci5jbG9uZSA9IGZ1bmN0aW9uKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cbkV4cGxvcmVyLmZyb21IVE1MID0gZnVuY3Rpb24oaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=
