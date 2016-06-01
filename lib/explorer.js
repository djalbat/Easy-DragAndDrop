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
          filePath = file.getPath(this.rootDirectory),
          sourcePath = filePath,
          ///
      success = this.activateHandler(sourcePath, fail),
          failure = success === false;

      if (failure) {
        fail();
      }

      function fail() {
        file.remove();
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsZUFBekMsRUFBMEQsV0FBMUQsRUFBdUU7QUFBQTs7QUFBQSw0RkFDL0QsUUFEK0QsRUFDckQsV0FEcUQ7O0FBR3JFLFFBQUksZ0JBQWdCLGNBQWMsS0FBZCxDQUFvQixpQkFBcEIsRUFBdUMsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQXZDLEVBQW9FLE1BQUssZUFBTCxDQUFxQixJQUFyQixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBRUEsVUFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBLFVBQUssTUFBTCxDQUFZLGFBQVo7QUFUcUU7QUFVdEU7Ozs7NEJBRU8sUSxFQUFVLFEsRUFBVTtBQUFFLFdBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixRQUEzQixFQUFxQyxRQUFyQztBQUFpRDs7O2lDQUNsRSxhLEVBQWUsUyxFQUFXO0FBQUUsV0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLGFBQWhDLEVBQStDLFNBQS9DO0FBQTREOzs7MkNBRTlFO0FBQUUsYUFBTyxLQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFBUDtBQUFzQzs7OytDQUNwQztBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLHdCQUFuQixFQUFQO0FBQXVEOzs7aURBQ3ZELEssRUFBTztBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLDRCQUFuQixDQUFnRCxLQUFoRCxDQUFQO0FBQWdFOzs7OEJBRTVGLEssRUFBTyx5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QSxZQUFJLFdBQVcsS0FBSyxXQUFMLEVBQWY7WUFDSSxXQUFXLFNBRGY7O0FBR0EsYUFBSyxPQUFMLENBQWEsUUFBYixFQUF1QixRQUF2QjtBQUNEO0FBQ0Y7Ozs7RUF4TG9CLGdCOztBQTJMdkIsU0FBUyxLQUFULEdBQWlCLFVBQVMsUUFBVCxFQUFtQixpQkFBbkIsRUFBc0MsV0FBdEMsRUFBbUQsZUFBbkQsRUFBb0U7QUFDbkYsU0FBTyxRQUFRLEtBQVIsQ0FBYyxRQUFkLEVBQXdCLFFBQXhCLEVBQWtDLGlCQUFsQyxFQUFxRCxXQUFyRCxFQUFrRSxlQUFsRSxDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxTQUFTLFFBQVQsR0FBb0IsVUFBUyxJQUFULEVBQWUsaUJBQWYsRUFBa0MsV0FBbEMsRUFBK0MsZUFBL0MsRUFBZ0U7QUFDbEYsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUMsaUJBQWpDLEVBQW9ELFdBQXBELEVBQWlFLGVBQWpFLENBQVA7QUFDRCxDQUZEOztBQUlBLE9BQU8sT0FBUCxHQUFpQixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLm9uRHJhZ0V2ZW50LmJpbmQodGhpcyksIHRoaXMub25BY3RpdmF0ZUV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG5cbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIGdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTsgfVxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7IH1cblxuICBhZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpIHtcbiAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICB9XG5cbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeUhhc01hcmtlciA9IHRoaXMucm9vdERpcmVjdG9yeS5oYXNNYXJrZXIoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5SGFzTWFya2VyKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeUhhc01hcmtlciA9IHRoaXMucm9vdERpcmVjdG9yeS5oYXNNYXJrZXIoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5SGFzTWFya2VyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmhhc01hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0ID0gdXRpbC5pc1RvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5SXNUb3Btb3N0KSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgb25BY3RpdmF0ZUV2ZW50KGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICBzdWNjZXNzID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgZmFpbCksXG4gICAgICAgIGZhaWx1cmUgPSAoc3VjY2VzcyA9PT0gZmFsc2UpO1xuICAgIFxuICAgIGlmIChmYWlsdXJlKSB7XG4gICAgICBmYWlsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFpbCgpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpO1xuXG4gICAgaWYgKG1hcmtlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXIgPSAoZGlyZWN0b3J5SGF2aW5nTWFya2VyID09PSBudWxsICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXI7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzID0gc3ViRW50cmllcztcblxuICAgICAgZW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLm1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gdGhpcy5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAoKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpXG4gICAgICYmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBkaXJlY3RvcnlIYXZpbmdNYXJrZXIpKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuZHJhZ2dpbmcoZW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGlzVG9IYXZlTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3REaXJlY3RvcnkgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmIChlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gICAgICAgICAgdG9IYXZlTWFya2VyID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpO1xuXG4gICAgICByZXR1cm4gdG9IYXZlTWFya2VyO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgcmVhZE9ubHkgPSBmaWxlLmdldFJlYWRPbmx5KCksXG4gICAgICAgICAgZmlsZVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpO1xuICAgIH1cbiAgfVxufVxuXG5FeHBsb3Jlci5jbG9uZSA9IGZ1bmN0aW9uKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbn07XG5cbkV4cGxvcmVyLmZyb21IVE1MID0gZnVuY3Rpb24oaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=
