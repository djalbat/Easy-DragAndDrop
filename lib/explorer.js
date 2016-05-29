'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DragEvent = require('./dragEvent'),
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

    _this.draggedEntry = null;

    _this.previousDirectoryOverlappingEntry = null;

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
    key: 'directoryOverlappingEntry',
    value: function directoryOverlappingEntry(entry) {
      return this.rootDirectory.directoryOverlappingEntry(entry);
    }
  }, {
    key: 'directoryHavingMarker',
    value: function directoryHavingMarker() {
      return this.rootDirectory.directoryHavingMarker();
    }
  }, {
    key: 'getRootDirectoryName',
    value: function getRootDirectoryName() {
      return this.rootDirectory.getName();
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
    value: function addMarker(directoryOverlappingEntry, entry) {
      var entryName = entry.getName(),
          entryType = entry.getType(),
          directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
          markerPath = directoryPathOverlappingEntry + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }, {
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      this.removeMarker(); ///
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      if (this.previousDirectoryOverlappingEntry !== null) {
        this.previousDirectoryOverlappingEntry.removeMarker();

        this.previousDirectoryOverlappingEntry = null;
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
    key: 'onDragEvent',
    value: function onDragEvent(dragEvent) {
      var action = dragEvent.getAction(),
          draggableElement = dragEvent.getDraggableElement(),
          entry = draggableElement; ///

      switch (action) {
        case DragEvent.actions.START_DRAGGING:
          return this.startDragging(entry);

        case DragEvent.actions.STOP_DRAGGING:
          this.stopDragging(entry);
          break;

        case DragEvent.actions.DRAGGING:
          this.dragging(entry);
          break;
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      if (this.draggedEntry !== null) {
        return false;
      }

      this.addMarkerInPlace(entry);

      this.draggedEntry = entry;

      this.previousDirectoryOverlappingEntry = this.directoryOverlappingEntry(entry);

      return true;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      this.draggedEntry = null;

      var entryPath = entry.getPath(),
          droppableElementlementHavingMarker = this,
          ///
      // droppableElementlementHavingMarker = this.hasMarker() ?
      //                         this :
      //                           this.droppableElementHavingMarker(),
      directoryHavingMarker = droppableElementlementHavingMarker.directoryHavingMarker(),
          directoryPathHavingMarker = directoryHavingMarker.getPath(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = directoryPathHavingMarker;

      if (sourcePath !== targetPath || sourcePath === null && targetPath === null && droppableElementlementHavingMarker !== this) {
        var subEntries = entry.getSubEntries();

        droppableElementlementHavingMarker.moveEntries(entry, subEntries, sourcePath, targetPath, function () {
          this.removeMarkerGlobally();
        }.bind(this));
      } else {
        this.removeMarkerGlobally();
      }
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var directoryOverlappingEntry = this.directoryOverlappingEntry(entry);

      if (directoryOverlappingEntry !== this.previousDirectoryOverlappingEntry) {
        if (this.previousDirectoryOverlappingEntry !== null) {
          this.previousDirectoryOverlappingEntry.removeMarker();
        }

        if (directoryOverlappingEntry !== null) {
          this.addMarker(directoryOverlappingEntry, entry);
        }
      }

      this.previousDirectoryOverlappingEntry = directoryOverlappingEntry;
    }
  }, {
    key: 'isKeepingMarker',
    value: function isKeepingMarker(entry) {
      var directoryOverlappingEntry = this.directoryOverlappingEntry(entry),
          keepingMarker;

      if (directoryOverlappingEntry !== null) {
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
          directoryOverlappingEntry = this.directoryOverlappingEntry(entry),
          directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLFlBQVksUUFBUSxhQUFSLENBRGhCO0lBRUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FGdkI7SUFHSSxnQkFBZ0IsUUFBUSx5Q0FBUixDQUhwQjs7SUFLTSxROzs7QUFDSixvQkFBWSxRQUFaLEVBQXNCLGlCQUF0QixFQUF5QyxlQUF6QyxFQUEwRCxvQkFBMUQsRUFBZ0YsbUJBQWhGLEVBQXFHO0FBQUE7O0FBQUEsNEZBQzdGLFFBRDZGOztBQUduRyxRQUFJLGdCQUFnQixjQUFjLEtBQWQsQ0FBb0IsaUJBQXBCLEVBQXVDLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUF2QyxFQUFvRSxNQUFLLG1CQUFMLENBQXlCLElBQXpCLE9BQXBFLENBQXBCOztBQUVBLFVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLFVBQUssb0JBQUwsR0FBNEIsb0JBQTVCO0FBQ0EsVUFBSyxtQkFBTCxHQUEyQixtQkFBM0I7O0FBRUEsVUFBSyxZQUFMLEdBQW9CLElBQXBCOztBQUVBLFVBQUssaUNBQUwsR0FBeUMsSUFBekM7O0FBRUEsVUFBSyxhQUFMLEdBQXFCLGFBQXJCOztBQUVBLFVBQUssTUFBTCxDQUFZLGFBQVo7QUFmbUc7QUFnQnBHOzs7OzRCQUVPLFEsRUFBVSxRLEVBQVU7QUFBRSxXQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsUUFBckM7QUFBaUQ7OztpQ0FDbEUsYSxFQUFlLFMsRUFBVztBQUFFLFdBQUssYUFBTCxDQUFtQixZQUFuQixDQUFnQyxhQUFoQyxFQUErQyxTQUEvQztBQUE0RDs7OzhDQUUzRSxLLEVBQU87QUFBRSxhQUFPLEtBQUssYUFBTCxDQUFtQix5QkFBbkIs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QUFyQixFQUFpQyxVQUFqQyxFQUE2QyxVQUE3QyxFQUF5RCxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQXpELENBQWhCOztBQUVBLFVBQUksY0FBYyxTQUFsQixFQUE2QjtBQUMzQixrQkFBVSxJQUFWLENBQWUsSUFBZixFQUFxQixTQUFyQjtBQUNEO0FBQ0Y7Ozs7RUFwT29CLGdCOztBQXVPdkIsU0FBUyxLQUFULEdBQWlCLFVBQVMsUUFBVCxFQUFtQixpQkFBbkIsRUFBc0MsbUJBQXRDLEVBQTJELGVBQTNELEVBQTRFLG9CQUE1RSxFQUFrRztBQUNqSCxTQUFPLFFBQVEsS0FBUixDQUFjLFFBQWQsRUFBd0IsUUFBeEIsRUFBa0MsaUJBQWxDLEVBQXFELG1CQUFyRCxFQUEwRSxlQUExRSxFQUEyRixvQkFBM0YsQ0FBUDtBQUNELENBRkQ7O0FBSUEsU0FBUyxRQUFULEdBQW9CLFVBQVMsSUFBVCxFQUFlLGlCQUFmLEVBQWtDLG1CQUFsQyxFQUF1RCxlQUF2RCxFQUF3RSxvQkFBeEUsRUFBOEY7QUFDaEgsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUMsaUJBQWpDLEVBQW9ELG1CQUFwRCxFQUF5RSxlQUF6RSxFQUEwRixvQkFBMUYsQ0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50JyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyLCBhY3RpdmF0ZUZpbGVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdmFyIHJvb3REaXJlY3RvcnkgPSBSb290RGlyZWN0b3J5LmNsb25lKHJvb3REaXJlY3RvcnlOYW1lLCB0aGlzLm9uRHJhZ0V2ZW50LmJpbmQodGhpcyksIHRoaXMub25BY3RpdmF0ZUZpbGVFdmVudC5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMubW92ZUZpbGVIYW5kbGVyID0gbW92ZUZpbGVIYW5kbGVyO1xuICAgIHRoaXMubW92ZURpcmVjdG9yeUhhbmRsZXIgPSBtb3ZlRGlyZWN0b3J5SGFuZGxlcjtcbiAgICB0aGlzLmFjdGl2YXRlRmlsZUhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVIYW5kbGVyO1xuXG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBudWxsO1xuICAgIFxuICAgIHRoaXMucHJldmlvdXNEaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSk7IH1cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7IH1cblxuICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7IH1cbiAgZGlyZWN0b3J5SGF2aW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmRpcmVjdG9yeUhhdmluZ01hcmtlcigpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0ID0gdXRpbC5pc1RvcG1vc3QoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSwgZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7ICAvLy9cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c0RpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldmlvdXNEaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICB0aGlzLnByZXZpb3VzRGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIGlmICh0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIuaGFzTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgb25BY3RpdmF0ZUZpbGVFdmVudChhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVIYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIG9uRHJhZ0V2ZW50KGRyYWdFdmVudCkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQ7ICAvLy9cblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIGlmICh0aGlzLmRyYWdnZWRFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG5cbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IGVudHJ5O1xuXG4gICAgdGhpcy5wcmV2aW91c0RpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IG51bGw7XG5cbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcm9wcGFibGVFbGVtZW50bGVtZW50SGF2aW5nTWFya2VyID0gdGhpcywgLy8vXG4gICAgICAgIC8vIGRyb3BwYWJsZUVsZW1lbnRsZW1lbnRIYXZpbmdNYXJrZXIgPSB0aGlzLmhhc01hcmtlcigpID9cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IGRyb3BwYWJsZUVsZW1lbnRsZW1lbnRIYXZpbmdNYXJrZXIuZGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXIgPSBkaXJlY3RvcnlIYXZpbmdNYXJrZXIuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZW50cnlQYXRoKSxcbiAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgdGFyZ2V0UGF0aCA9IGRpcmVjdG9yeVBhdGhIYXZpbmdNYXJrZXI7XG5cbiAgICBpZiAoKHNvdXJjZVBhdGggIT09IHRhcmdldFBhdGgpXG4gICAgIHx8IChzb3VyY2VQYXRoID09PSBudWxsKSAmJiAodGFyZ2V0UGF0aCA9PT0gbnVsbCkgJiYgKGRyb3BwYWJsZUVsZW1lbnRsZW1lbnRIYXZpbmdNYXJrZXIgIT09IHRoaXMpKSB7XG4gICAgICB2YXIgc3ViRW50cmllcyA9IGVudHJ5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudGxlbWVudEhhdmluZ01hcmtlci5tb3ZlRW50cmllcyhlbnRyeSwgc3ViRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5kaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSB0aGlzLnByZXZpb3VzRGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgICAgaWYgKHRoaXMucHJldmlvdXNEaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNEaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFkZE1hcmtlcihkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LCBlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2aW91c0RpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgaXNLZWVwaW5nTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpLFxuICAgICAgICBrZWVwaW5nTWFya2VyO1xuXG4gICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAga2VlcGluZ01hcmtlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtlZXBpbmdNYXJrZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2VlcGluZ01hcmtlcjtcbiAgfVxuXG4gIHRvQWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdChlbnRyeVBhdGgpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5kaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgYWRkTWFya2VyID0gIWVudHJ5SXNUb3Btb3N0ICYmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gYWRkTWFya2VyO1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlck1vdmUobW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHRhcmdldFBhdGgpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgICB0aGlzLmFkZERpcmVjdG9yeShtb3ZlZFBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG4gICAgICBcbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRGlyZWN0b3J5SGFuZGxlcihzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBhZnRlck1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFmdGVyTW92ZS5jYWxsKHRoaXMsIG1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyTW92ZShtb3ZlZFBhdGgpIHtcbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHRhcmdldFBhdGgpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcmVhZE9ubHkgPSBmaWxlLmdldFJlYWRPbmx5KCk7XG5cbiAgICAgICAgdGhpcy5hZGRGaWxlKG1vdmVkUGF0aCwgcmVhZE9ubHkpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuICAgICAgXG4gICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgdmFyIG1vdmVkUGF0aCA9IHRoaXMubW92ZUZpbGVIYW5kbGVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGFmdGVyTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJNb3ZlLmNhbGwodGhpcywgbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxuRXhwbG9yZXIuY2xvbmUgPSBmdW5jdGlvbihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5FeHBsb3Jlci5mcm9tSFRNTCA9IGZ1bmN0aW9uKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19
