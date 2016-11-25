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

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var rootDirectory = RootDirectory.clone(rootDirectoryName, _this.dragEventHandler.bind(_this), _this.activateFileEventHandler.bind(_this));

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
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      var rootDirectoryHasMarker = this.rootDirectory.hasMarker();

      if (rootDirectoryHasMarker) {
        return true;
      } else {
        return _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'hasMarker', this).call(this);
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
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'addMarker', this).call(this, entry);
      }
    }
  }, {
    key: 'activateFileEventHandler',
    value: function activateFileEventHandler(activateFileEvent) {
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
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'dragging', this).call(this, entry);
      }
    }
  }, {
    key: 'isToHaveMarker',
    value: function isToHaveMarker(entry) {
      var toHaveMarker,
          entryPath = entry.getPath(),
          entryIsTopmostDirectory = util.isTopmostDirectoryName(entryPath);

      if (entryIsTopmostDirectory) {
        toHaveMarker = false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        toHaveMarker = directoryOverlappingEntry !== null;
      }

      return toHaveMarker;
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
  }], [{
    key: 'clone',
    value: function clone(selector, rootDirectoryName, moveHandler, activateHandler) {
      return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, rootDirectoryName, moveHandler, activateHandler) {
      return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
    }
  }]);

  return Explorer;
}(DroppableElement);

module.exports = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsInJlYWRPbmx5IiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJnZXROYW1lIiwiZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyIiwiZW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsInVuZGVmaW5lZCIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwicm9vdERpcmVjdG9yeUhhc01hcmtlciIsImhhc01hcmtlciIsInJlbW92ZU1hcmtlciIsImVudHJ5UGF0aCIsImVudHJ5SXNUb3Btb3N0IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZmlsZSIsImdldEZpbGUiLCJzb3VyY2VQYXRoIiwic3VjY2VzcyIsImZhaWwiLCJmYWlsdXJlIiwicmVtb3ZlIiwibWFya2VyIiwiYWRkTWFya2VySW5QbGFjZSIsImRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIiLCJnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyIiwiZGlyZWN0b3J5SGF2aW5nTWFya2VyIiwiZGlyZWN0b3J5UGF0aEhhdmluZ01hcmtlciIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJ0YXJnZXRQYXRoIiwic3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJlbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwidG9IYXZlTWFya2VyIiwiZW50cnlJc1RvcG1vc3REaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJtb3ZlZFBhdGgiLCJpc0NvbGxhcHNlZCIsImdldFJlYWRPbmx5IiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE1BQUwsQ0FBWUwsYUFBWjtBQVRxRTtBQVV0RTs7Ozs0QkFFT00sUSxFQUFVQyxRLEVBQVU7QUFBRSxXQUFLUCxhQUFMLENBQW1CUSxPQUFuQixD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aUJBQWxDLEVBQXFERSxXQUFyRCxFQUFrRUQsZUFBbEUsQ0FBUDtBQUNEOzs7NkJBRWUrRCxJLEVBQU1oRSxpQixFQUFtQkUsVyxFQUFhRCxlLEVBQWlCO0FBQ3JFLGFBQU9QLFFBQVF1RSxRQUFSLENBQWlCbkUsUUFBakIsRUFBMkJrRSxJQUEzQixFQUFpQ2hFLGlCQUFqQyxFQUFvREUsV0FBcEQsRUFBaUVELGVBQWpFLENBQVA7QUFDRDs7OztFQWpNb0JMLGdCOztBQW9NdkJzRSxPQUFPQyxPQUFQLEdBQWlCckUsUUFBakIiLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpLFxuICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L3Jvb3REaXJlY3RvcnknKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBhY3RpdmF0ZUhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHZhciByb290RGlyZWN0b3J5ID0gUm9vdERpcmVjdG9yeS5jbG9uZShyb290RGlyZWN0b3J5TmFtZSwgdGhpcy5kcmFnRXZlbnRIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXIgPSBhY3RpdmF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkgPSByb290RGlyZWN0b3J5O1xuXG4gICAgdGhpcy5hcHBlbmQocm9vdERpcmVjdG9yeSk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpOyB9XG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG4gIGdldFJvb3REaXJlY3RvcnlOYW1lKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldE5hbWUoKTsgfVxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCk7IH1cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KSB7XG4gICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgfVxuXG4gICAgdmFyIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgKyAnLycgKyBlbnRyeU5hbWU7XG5cbiAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlIYXNNYXJrZXIgPSB0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeUhhc01hcmtlcikge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlIYXNNYXJrZXIgPSB0aGlzLnJvb3REaXJlY3RvcnkuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeUhhc01hcmtlcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5oYXNNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdCA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKCFlbnRyeUlzVG9wbW9zdCkge1xuICAgICAgdmFyIG1hcmtlclBhdGggPSBlbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkTWFya2VyKGVudHJ5KVxuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCkge1xuICAgIHZhciBmaWxlID0gYWN0aXZhdGVGaWxlRXZlbnQuZ2V0RmlsZSgpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgc3VjY2VzcyA9IHRoaXMuYWN0aXZhdGVIYW5kbGVyKHNvdXJjZVBhdGgsIGZhaWwpLFxuICAgICAgICBmYWlsdXJlID0gKHN1Y2Nlc3MgPT09IGZhbHNlKTtcbiAgICBcbiAgICBpZiAoZmFpbHVyZSkge1xuICAgICAgZmFpbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhaWwoKSB7XG4gICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKTtcblxuICAgIGlmIChtYXJrZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZW50cnkpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5oYXNNYXJrZXIoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoSGF2aW5nTWFya2VyID0gKGRpcmVjdG9yeUhhdmluZ01hcmtlciA9PT0gbnVsbCApID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyLmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGVudHJ5UGF0aCksXG4gICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgIHRhcmdldFBhdGggPSBkaXJlY3RvcnlQYXRoSGF2aW5nTWFya2VyO1xuXG4gICAgaWYgKChzb3VyY2VQYXRoICE9PSB0YXJnZXRQYXRoKVxuICAgICB8fCAoc291cmNlUGF0aCA9PT0gbnVsbCkgJiYgKHRhcmdldFBhdGggPT09IG51bGwpICYmIChkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyICE9PSB0aGlzKSkge1xuICAgICAgdmFyIHN1YkVudHJpZXMgPSBlbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllcyA9IHN1YkVudHJpZXM7XG5cbiAgICAgIGVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZW50cmllcy5wdXNoKGVudHJ5KTtcblxuICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5tb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuXG4gICAgaWYgKChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ICE9PSBudWxsKVxuICAgICAmJiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gZGlyZWN0b3J5SGF2aW5nTWFya2VyKSkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuXG4gICAgICB0aGlzLmFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmRyYWdnaW5nKGVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBpc1RvSGF2ZU1hcmtlcihlbnRyeSkge1xuICAgIHZhciB0b0hhdmVNYXJrZXIsXG4gICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3REaXJlY3RvcnkgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmIChlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgdG9IYXZlTWFya2VyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcbiAgICAgIFxuICAgICAgdG9IYXZlTWFya2VyID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0b0hhdmVNYXJrZXI7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=