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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Explorer).call(this, selector, moveHandler));

    var rootDirectory = RootDirectory.clone(rootDirectoryName, _this.onDragEvent.bind(_this), _this.onActivateEvent.bind(_this));

    _this.activateHandler = activateHandler;

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
    key: 'onActivateEvent',
    value: function onActivateEvent(activateFileEvent) {
      var file = activateFileEvent.getFile(),
          filePath = file.getPath(this.rootDirectory);

      this.activateHandler(filePath);
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
        var subEntries = entry.getSubEntries(),
            entries = subEntries;

        entries.reverse();
        entries.push(entry);

        droppableElementHavingMarker.moveEntries(entries, sourcePath, targetPath, function () {
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

        var readOnly = file.getReadOnly(),
            filePath = movedPath;

        this.addFile(filePath, readOnly);
      }
    }
  }]);

  return Explorer;
}(DroppableElement);

Explorer.clone = function (selector, rootDirectoryName, moveHandler, activateHandler) {
  return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
};

Explorer.fromHTML = function (html, rootDirectoryName, moveHandler, activateHandler) {
  return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
};

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsZUFBekMsRUFBMEQsV0FBMUQsRUFBdUU7QUFBQTs7QUFBQSw0RkFDL0QsUUFEK0QsRUFDckQsV0FEcUQ7O0FBR3JFLFFBQUksZ0JBQWdCLGNBQWMsS0FBZCxDQUFvQixpQkFBcEIsRUFBdUMsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQXZDLEVBQW9FLE1BQUssZUFBTCxDQUFxQixJQUFyQixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBRUEsVUFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBLFVBQUssTUFBTCxDQUFZLGFBQVo7QUFUcUU7QUFVdEU7Ozs7NEJBRU8sUSxFQUFVLFEsRUFBVTtBQUFFLFdBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixRQUEzQixFQUFxQyxRQUFyQztBQUFpRDs7O2lDQUNsRSxhLEVBQWUsUyxFQUFXO0FBQUUsV0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLGFBQWhDLEVBQStDLFNBQS9DO0FBQTREOzs7b0NBQ3JGLGEsRUFBZTtBQUFFLFdBQUssYUFBTCxDQUFtQixlQUFuQixDQUFtQyxhQUFuQztBQUFvRDs7OzJDQUU5RDtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLE9BQW5CLEVBQVA7QUFBc0M7OzsrQ0FDcEM7QUFBRSxhQUFPLEtBQUssYUFBTCxDQUFtQix3QkFBbkIsRUFBUDtBQUF1RDs7O2lEQUN2RCxLLEVBQU87QUFBRSxhQUFPLEtB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QixRQUF2QjtBQUNEO0FBQ0Y7Ozs7RUFoTG9CLGdCOztBQW1MdkIsU0FBUyxLQUFULEdBQWlCLFVBQVMsUUFBVCxFQUFtQixpQkFBbkIsRUFBc0MsV0FBdEMsRUFBbUQsZUFBbkQsRUFBb0U7QUFDbkYsU0FBTyxRQUFRLEtBQVIsQ0FBYyxRQUFkLEVBQXdCLFFBQXhCLEVBQWtDLGlCQUFsQyxFQUFxRCxXQUFyRCxFQUFrRSxlQUFsRSxDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxTQUFTLFFBQVQsR0FBb0IsVUFBUyxJQUFULEVBQWUsaUJBQWYsRUFBa0MsV0FBbEMsRUFBK0MsZUFBL0MsRUFBZ0U7QUFDbEYsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUMsaUJBQWpDLEVBQW9ELFdBQXBELEVBQWlFLGVBQWpFLENBQVA7QUFDRCxDQUZEOztBQUlBLE9BQU8sT0FBUCxHQUFpQixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLm9uRHJhZ0V2ZW50LmJpbmQodGhpcyksIHRoaXMub25BY3RpdmF0ZUV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7IH1cblxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuICAgIH1cblxuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5SGFzTWFya2VyID0gdGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlIYXNNYXJrZXIpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5SGFzTWFya2VyID0gdGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlIYXNNYXJrZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIuaGFzTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBvbkFjdGl2YXRlRXZlbnQoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KTtcblxuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKTtcblxuICAgIGlmIChtYXJrZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoSGF2aW5nTWFya2VyID0gKGRpcmVjdG9yeUhhdmluZ01hcmtlciA9PT0gbnVsbCApID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyLmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBkaXJlY3RvcnlQYXRoSGF2aW5nTWFya2VyO1xuXG4gICAgaWYgKChzb3VyY2VQYXRoICE9PSB0YXJnZXRQYXRoKVxuICAgICB8fCAoc291cmNlUGF0aCA9PT0gbnVsbCkgJiYgKHRhcmdldFBhdGggPT09IG51bGwpICYmIChkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyICE9PSB0aGlzKSkge1xuICAgICAgdmFyIHN1YkVudHJpZXMgPSBlbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllcyA9IHN1YkVudHJpZXM7XG5cbiAgICAgIGVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZW50cmllcy5wdXNoKGVudHJ5KTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5tb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKVxuICAgICAmJiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gZGlyZWN0b3J5SGF2aW5nTWFya2VyKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmRyYWdnaW5nKGVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBpc1RvSGF2ZU1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5ID0gdXRpbC5pc1RvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZW50cnlJc1RvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICAgIHRvSGF2ZU1hcmtlciA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcblxuICAgICAgcmV0dXJuIHRvSGF2ZU1hcmtlcjtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTtcbiAgICB9XG4gIH1cbn1cblxuRXhwbG9yZXIuY2xvbmUgPSBmdW5jdGlvbihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG59O1xuXG5FeHBsb3Jlci5mcm9tSFRNTCA9IGZ1bmN0aW9uKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19
