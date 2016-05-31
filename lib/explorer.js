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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsZUFBekMsRUFBMEQsV0FBMUQsRUFBdUU7QUFBQTs7QUFBQSw0RkFDL0QsUUFEK0QsRUFDckQsV0FEcUQ7O0FBR3JFLFFBQUksZ0JBQWdCLGNBQWMsS0FBZCxDQUFvQixpQkFBcEIsRUFBdUMsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQXZDLEVBQW9FLE1BQUssZUFBTCxDQUFxQixJQUFyQixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBRUEsVUFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBLFVBQUssTUFBTCxDQUFZLGFBQVo7QUFUcUU7QUFVdEU7Ozs7NEJBRU8sUSxFQUFVLFEsRUFBVTtBQUFFLFdBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixRQUEzQixFQUFxQyxRQUFyQztBQUFpRDs7O2lDQUNsRSxhLEVBQWUsUyxFQUFXO0FBQUUsV0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLGFBQWhDLEVBQStDLFNBQS9DO0FBQTREOzs7b0NBQ3JGLGEsRUFBZTtBQUFFLFdBQUssYUFBTCxDQUFtQixlQUFuQixDQUFtQyxhQUFuQztBQUFvRDs7OzJDQUU5RDtBQUFFLGFBQU8sS0FBSyxhQUFMLENBQW1CLE9BQW5CLEVBQVA7QUFBc0M7OzsrQ0FDcEM7QUFBRSxhQUFPLEtBQUssYUFBTCxDQUFtQix3QkFBbkIsRUFBUDtBQUF1RDs7O2lEQUN2RCxLLEVBQU87QUFBRSxhQUFPLEtB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Rjs7OztFQS9Lb0IsZ0I7O0FBa0x2QixTQUFTLEtBQVQsR0FBaUIsVUFBUyxRQUFULEVBQW1CLGlCQUFuQixFQUFzQyxXQUF0QyxFQUFtRCxlQUFuRCxFQUFvRTtBQUNuRixTQUFPLFFBQVEsS0FBUixDQUFjLFFBQWQsRUFBd0IsUUFBeEIsRUFBa0MsaUJBQWxDLEVBQXFELFdBQXJELEVBQWtFLGVBQWxFLENBQVA7QUFDRCxDQUZEOztBQUlBLFNBQVMsUUFBVCxHQUFvQixVQUFTLElBQVQsRUFBZSxpQkFBZixFQUFrQyxXQUFsQyxFQUErQyxlQUEvQyxFQUFnRTtBQUNsRixTQUFPLFFBQVEsUUFBUixDQUFpQixRQUFqQixFQUEyQixJQUEzQixFQUFpQyxpQkFBakMsRUFBb0QsV0FBcEQsRUFBaUUsZUFBakUsQ0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIHRoaXMub25EcmFnRXZlbnQuYmluZCh0aGlzKSwgdGhpcy5vbkFjdGl2YXRlRXZlbnQuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlciA9IGFjdGl2YXRlSGFuZGxlcjtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTsgfVxuXG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KSB7XG4gICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgKyAnLycgKyBlbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlIYXNNYXJrZXIgPSB0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeUhhc01hcmtlcikge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlIYXNNYXJrZXIgPSB0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeUhhc01hcmtlcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5oYXNNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdCA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeUlzVG9wbW9zdCkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIG9uQWN0aXZhdGVFdmVudChhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpO1xuXG4gICAgaWYgKG1hcmtlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXIgPSAoZGlyZWN0b3J5SGF2aW5nTWFya2VyID09PSBudWxsICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXI7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzID0gc3ViRW50cmllcztcbiAgICAgIFxuICAgICAgZW50cmllcy5wdXNoKGVudHJ5KTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5tb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKVxuICAgICAmJiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gZGlyZWN0b3J5SGF2aW5nTWFya2VyKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmRyYWdnaW5nKGVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBpc1RvSGF2ZU1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5ID0gdXRpbC5pc1RvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZW50cnlJc1RvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICAgIHRvSGF2ZU1hcmtlciA9IChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKTtcblxuICAgICAgcmV0dXJuIHRvSGF2ZU1hcmtlcjtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTtcbiAgICB9XG4gIH1cbn1cblxuRXhwbG9yZXIuY2xvbmUgPSBmdW5jdGlvbihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG59O1xuXG5FeHBsb3Jlci5mcm9tSFRNTCA9IGZ1bmN0aW9uKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19
