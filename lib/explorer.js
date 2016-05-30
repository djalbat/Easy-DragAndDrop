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

    _this.draggedEntry = null;

    _this.directoryHavingMarker = null;

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
    value: function addMarker(directoryOverlappingEntry, entry) {
      var entryName = entry.getName(),
          entryType = entry.getType(),
          directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
          markerPath = directoryPathOverlappingEntry + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      if (this.directoryHavingMarker !== null) {
        this.directoryHavingMarker.removeMarker();

        this.directoryHavingMarker = null;
      } else {
        _get(Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      if (this.directoryHavingMarker !== null) {
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
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      this.removeMarker(); ///
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
      if (this.draggedEntry !== null) {
        return false;
      }

      this.addMarkerInPlace(entry);

      this.draggedEntry = entry;

      this.directoryHavingMarker = this.getDirectoryHavingMarker();

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
      directoryHavingMarker = droppableElementlementHavingMarker.getDirectoryHavingMarker(),
          directoryPathHavingMarker = directoryHavingMarker === null ? null : directoryHavingMarker.getPath(),
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
      var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingEntry !== this.directoryHavingMarker) {
        this.directoryHavingMarker.removeMarker();

        if (directoryOverlappingEntry !== null) {
          this.addMarker(directoryOverlappingEntry, entry);
        } else {
          this.addMarkerInPlace(entry);
        }

        this.directoryHavingMarker = this.getDirectoryHavingMarker();
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

    // isKeepingMarker(entry) {
    //   var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
    //       keepingMarker;
    //
    //   if (directoryOverlappingEntry !== null) {
    //     this.removeMarker();
    //
    //     this.addMarker(entry);
    //
    //     keepingMarker = true;
    //   } else {
    //     keepingMarker = false;
    //   }
    //
    //   return keepingMarker;
    // }

    // toAddMarker(entry) {
    //   var entryPath = entry.getPath(),
    //       entryIsTopmost = util.isTopmostDirectoryName(entryPath),
    //       directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
    //       directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
    //       addMarker = !entryIsTopmost && (directoryPathOverlappingEntry !== null);
    //
    //   return addMarker;
    // }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9leHBsb3Jlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDtJQUNJLG1CQUFtQixRQUFRLG9CQUFSLENBRHZCO0lBRUksZ0JBQWdCLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU0sUTs7O0FBQ0osb0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsZUFBekMsRUFBMEQsb0JBQTFELEVBQWdGLG1CQUFoRixFQUFxRztBQUFBOztBQUFBLDRGQUM3RixRQUQ2Rjs7QUFHbkcsUUFBSSxnQkFBZ0IsY0FBYyxLQUFkLENBQW9CLGlCQUFwQixFQUF1QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBdkMsRUFBb0UsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUFwRSxDQUFwQjs7QUFFQSxVQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxVQUFLLG9CQUFMLEdBQTRCLG9CQUE1QjtBQUNBLFVBQUssbUJBQUwsR0FBMkIsbUJBQTNCOztBQUVBLFVBQUssWUFBTCxHQUFvQixJQUFwQjs7QUFFQSxVQUFLLHFCQUFMLEdBQTZCLElBQTdCOztBQUVBLFVBQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxVQUFLLE1BQUwsQ0FBWSxhQUFaO0FBZm1HO0FBZ0JwRzs7Ozs0QkFFTyxRLEVBQVUsUSxFQUFVO0FBQUUsV0FBSyxhQUFMLENBQW1CLE9BQW5CLENBQTJCLFFBQTNCLEVBQXFDLFFBQXJDO0FBQWlEOzs7aUNBQ2xFLGEsRUFBZSxTLEVBQVc7QUFBRSxXQUFLLGFBQUwsQ0FBbUIsWUFBbkIsQ0FBZ0MsYUFBaEMsRUFBK0MsU0FBL0M7QUFBNEQ7OzsyQ0FFOUU7QUFBRSxhQUFPLEtBQUssYUFBTCxDQUFtQixPQUFuQixFQUFQO0FBQXNDOzs7K0NBQ3BDO0FBQUUsYUFBTyxLQUFL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LE1BQUw7O0FBRUEsY0FBSSxXQUFXLEtBQUssV0FBTCxFQUFmOztBQUVBLGVBQUssT0FBTCxDQUFhLFNBQWIsRUFBd0IsUUFBeEI7QUFDRCxTQU5NLE1BTUEsSUFBSSxjQUFjLFVBQWxCLEVBQThCLENBRXBDOztBQUVEO0FBQ0Q7O0FBRUQsVUFBSSxZQUFZLEtBQUssZUFBTCxDQUFxQixVQUFyQixFQUFpQyxVQUFqQyxFQUE2QyxVQUE3QyxFQUF5RCxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQXpELENBQWhCOztBQUVBLFVBQUksY0FBYyxTQUFsQixFQUE2QjtBQUMzQixrQkFBVSxJQUFWLENBQWUsSUFBZixFQUFxQixTQUFyQjtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUxvQixnQjs7QUF3TnZCLFNBQVMsS0FBVCxHQUFpQixVQUFTLFFBQVQsRUFBbUIsaUJBQW5CLEVBQXNDLG1CQUF0QyxFQUEyRCxlQUEzRCxFQUE0RSxvQkFBNUUsRUFBa0c7QUFDakgsU0FBTyxRQUFRLEtBQVIsQ0FBYyxRQUFkLEVBQXdCLFFBQXhCLEVBQWtDLGlCQUFsQyxFQUFxRCxtQkFBckQsRUFBMEUsZUFBMUUsRUFBMkYsb0JBQTNGLENBQVA7QUFDRCxDQUZEOztBQUlBLFNBQVMsUUFBVCxHQUFvQixVQUFTLElBQVQsRUFBZSxpQkFBZixFQUFrQyxtQkFBbEMsRUFBdUQsZUFBdkQsRUFBd0Usb0JBQXhFLEVBQThGO0FBQ2hILFNBQU8sUUFBUSxRQUFSLENBQWlCLFFBQWpCLEVBQTJCLElBQTNCLEVBQWlDLGlCQUFqQyxFQUFvRCxtQkFBcEQsRUFBeUUsZUFBekUsRUFBMEYsb0JBQTFGLENBQVA7QUFDRCxDQUZEOztBQUlBLE9BQU8sT0FBUCxHQUFpQixRQUFqQiIsImZpbGUiOiJleHBsb3Jlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvcm9vdERpcmVjdG9yeScpO1xuXG5jbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIsIGFjdGl2YXRlRmlsZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIHRoaXMub25EcmFnRXZlbnQuYmluZCh0aGlzKSwgdGhpcy5vbkFjdGl2YXRlRmlsZUV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5tb3ZlRmlsZUhhbmRsZXIgPSBtb3ZlRmlsZUhhbmRsZXI7XG4gICAgdGhpcy5tb3ZlRGlyZWN0b3J5SGFuZGxlciA9IG1vdmVEaXJlY3RvcnlIYW5kbGVyO1xuICAgIHRoaXMuYWN0aXZhdGVGaWxlSGFuZGxlciA9IGFjdGl2YXRlRmlsZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyYWdnZWRFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5kaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSBudWxsO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuXG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnksIGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgKyAnLycgKyBlbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuZGlyZWN0b3J5SGF2aW5nTWFya2VyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmRpcmVjdG9yeUhhdmluZ01hcmtlci5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgdGhpcy5kaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgaWYgKHRoaXMuZGlyZWN0b3J5SGF2aW5nTWFya2VyICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmhhc01hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0ID0gdXRpbC5pc1RvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5SXNUb3Btb3N0KSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXIoKTsgIC8vL1xuICB9XG5cbiAgb25BY3RpdmF0ZUZpbGVFdmVudChhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVIYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2VkRW50cnkgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuXG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBlbnRyeTtcblxuICAgIHRoaXMuZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gdGhpcy5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdGhpcy5kcmFnZ2VkRW50cnkgPSBudWxsO1xuXG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudGxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMsIC8vL1xuICAgICAgICAvLyBkcm9wcGFibGVFbGVtZW50bGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKSA/XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50bGVtZW50SGF2aW5nTWFya2VyLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoSGF2aW5nTWFya2VyID0gKGRpcmVjdG9yeUhhdmluZ01hcmtlciA9PT0gbnVsbCApID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyLmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBkaXJlY3RvcnlQYXRoSGF2aW5nTWFya2VyO1xuXG4gICAgaWYgKChzb3VyY2VQYXRoICE9PSB0YXJnZXRQYXRoKVxuICAgICB8fCAoc291cmNlUGF0aCA9PT0gbnVsbCkgJiYgKHRhcmdldFBhdGggPT09IG51bGwpICYmIChkcm9wcGFibGVFbGVtZW50bGVtZW50SGF2aW5nTWFya2VyICE9PSB0aGlzKSkge1xuICAgICAgdmFyIHN1YkVudHJpZXMgPSBlbnRyeS5nZXRTdWJFbnRyaWVzKCk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRsZW1lbnRIYXZpbmdNYXJrZXIubW92ZUVudHJpZXMoZW50cnksIHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG5cbiAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gdGhpcy5kaXJlY3RvcnlIYXZpbmdNYXJrZXIpIHtcbiAgICAgIHRoaXMuZGlyZWN0b3J5SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFkZE1hcmtlcihkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LCBlbnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlck1vdmUobW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHRhcmdldFBhdGgpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSBkaXJlY3RvcnkuaXNDb2xsYXBzZWQoKTtcblxuICAgICAgICB0aGlzLmFkZERpcmVjdG9yeShtb3ZlZFBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG4gICAgICBcbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgbW92ZWRQYXRoID0gdGhpcy5tb3ZlRGlyZWN0b3J5SGFuZGxlcihzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBhZnRlck1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFmdGVyTW92ZS5jYWxsKHRoaXMsIG1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyTW92ZShtb3ZlZFBhdGgpIHtcbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHRhcmdldFBhdGgpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgcmVhZE9ubHkgPSBmaWxlLmdldFJlYWRPbmx5KCk7XG5cbiAgICAgICAgdGhpcy5hZGRGaWxlKG1vdmVkUGF0aCwgcmVhZE9ubHkpO1xuICAgICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuICAgICAgXG4gICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgdmFyIG1vdmVkUGF0aCA9IHRoaXMubW92ZUZpbGVIYW5kbGVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGFmdGVyTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJNb3ZlLmNhbGwodGhpcywgbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICAvLyBpc0tlZXBpbmdNYXJrZXIoZW50cnkpIHtcbiAgLy8gICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gIC8vICAgICAgIGtlZXBpbmdNYXJrZXI7XG4gIC8vXG4gIC8vICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpIHtcbiAgLy8gICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIC8vXG4gIC8vICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSk7XG4gIC8vXG4gIC8vICAgICBrZWVwaW5nTWFya2VyID0gdHJ1ZTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAga2VlcGluZ01hcmtlciA9IGZhbHNlO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICByZXR1cm4ga2VlcGluZ01hcmtlcjtcbiAgLy8gfVxuXG4gIC8vIHRvQWRkTWFya2VyKGVudHJ5KSB7XG4gIC8vICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgLy8gICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKSxcbiAgLy8gICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSksXG4gIC8vICAgICAgIGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gIC8vICAgICAgIGFkZE1hcmtlciA9ICFlbnRyeUlzVG9wbW9zdCAmJiAoZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpO1xuICAvL1xuICAvLyAgIHJldHVybiBhZGRNYXJrZXI7XG4gIC8vIH1cbn1cblxuRXhwbG9yZXIuY2xvbmUgPSBmdW5jdGlvbihzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIGFjdGl2YXRlRmlsZUhhbmRsZXIsIG1vdmVGaWxlSGFuZGxlciwgbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5FeHBsb3Jlci5mcm9tSFRNTCA9IGZ1bmN0aW9uKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUZpbGVIYW5kbGVyLCBtb3ZlRmlsZUhhbmRsZXIsIG1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEV4cGxvcmVyLCBodG1sLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVGaWxlSGFuZGxlciwgbW92ZUZpbGVIYW5kbGVyLCBtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19
