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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsInJlYWRPbmx5IiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJnZXROYW1lIiwiZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyIiwiZW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsInVuZGVmaW5lZCIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwicm9vdERpcmVjdG9yeUhhc01hcmtlciIsImhhc01hcmtlciIsInJlbW92ZU1hcmtlciIsImVudHJ5UGF0aCIsImVudHJ5SXNUb3Btb3N0IiwiaXNUb3Btb3N0RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiZmlsZSIsImdldEZpbGUiLCJzb3VyY2VQYXRoIiwic3VjY2VzcyIsImZhaWwiLCJmYWlsdXJlIiwicmVtb3ZlIiwibWFya2VyIiwiYWRkTWFya2VySW5QbGFjZSIsImRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIiLCJnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyIiwiZGlyZWN0b3J5SGF2aW5nTWFya2VyIiwiZGlyZWN0b3J5UGF0aEhhdmluZ01hcmtlciIsImVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJ0YXJnZXRQYXRoIiwic3ViRW50cmllcyIsImdldFN1YkVudHJpZXMiLCJlbnRyaWVzIiwicmV2ZXJzZSIsInB1c2giLCJtb3ZlRW50cmllcyIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwiZW50cnlJc1RvcG1vc3REaXJlY3RvcnkiLCJ0b0hhdmVNYXJrZXIiLCJkaXJlY3RvcnkiLCJtb3ZlZFBhdGgiLCJpc0NvbGxhcHNlZCIsImdldFJlYWRPbmx5IiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE1BQUwsQ0FBWUwsYUFBWjtBQVRxRTtBQVV0RTs7Ozs0QkFFT00sUSxFQUFVQyxRLEVBQVU7QUFBRSxXQUFLUCxhQUFMLENBQW1CUSxPQUFuQixD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ckQsRUFBa0VELGVBQWxFLENBQVA7QUFDRDs7OzZCQUVlK0QsSSxFQUFNaEUsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUNyRSxhQUFPUCxRQUFRdUUsUUFBUixDQUFpQm5FLFFBQWpCLEVBQTJCa0UsSUFBM0IsRUFBaUNoRSxpQkFBakMsRUFBb0RFLFdBQXBELEVBQWlFRCxlQUFqRSxDQUFQO0FBQ0Q7Ozs7RUEvTG9CTCxnQjs7QUFrTXZCc0UsT0FBT0MsT0FBUCxHQUFpQnJFLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyID0gYWN0aXZhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSkge1xuICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpO1xuICAgIH1cblxuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeVBhdGhPdmVybGFwcGluZ0VudHJ5ICsgJy8nICsgZW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5SGFzTWFya2VyID0gdGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlIYXNNYXJrZXIpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHZhciByb290RGlyZWN0b3J5SGFzTWFya2VyID0gdGhpcy5yb290RGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlIYXNNYXJrZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3VwZXIuaGFzTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3QgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmICghZW50cnlJc1RvcG1vc3QpIHtcbiAgICAgIHZhciBtYXJrZXJQYXRoID0gZW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZE1hcmtlcihlbnRyeSlcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIoYWN0aXZhdGVGaWxlRXZlbnQpIHtcbiAgICB2YXIgZmlsZSA9IGFjdGl2YXRlRmlsZUV2ZW50LmdldEZpbGUoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlLmdldFBhdGgodGhpcy5yb290RGlyZWN0b3J5KSxcbiAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmFjdGl2YXRlSGFuZGxlcihzb3VyY2VQYXRoLCBmYWlsKSxcbiAgICAgICAgZmFpbHVyZSA9IChzdWNjZXNzID09PSBmYWxzZSk7XG4gICAgXG4gICAgaWYgKGZhaWx1cmUpIHtcbiAgICAgIGZhaWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWlsKCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMuaGFzTWFya2VyKCk7XG5cbiAgICBpZiAobWFya2VyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGVudHJ5KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuaGFzTWFya2VyKCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aEhhdmluZ01hcmtlciA9IChkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPT09IG51bGwgKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlci5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gZGlyZWN0b3J5UGF0aEhhdmluZ01hcmtlcjtcblxuICAgIGlmICgoc291cmNlUGF0aCAhPT0gdGFyZ2V0UGF0aClcbiAgICAgfHwgKHNvdXJjZVBhdGggPT09IG51bGwpICYmICh0YXJnZXRQYXRoID09PSBudWxsKSAmJiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciAhPT0gdGhpcykpIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzO1xuXG4gICAgICBlbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGVudHJpZXMucHVzaChlbnRyeSk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIubW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSB0aGlzLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmICgoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbClcbiAgICAgJiYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IGRpcmVjdG9yeUhhdmluZ01hcmtlcikpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5kcmFnZ2luZyhlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgaXNUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSA9IHV0aWwuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZShlbnRyeVBhdGgpO1xuXG4gICAgaWYgKGVudHJ5SXNUb3Btb3N0RGlyZWN0b3J5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSxcbiAgICAgICAgICB0b0hhdmVNYXJrZXIgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICAgIHJldHVybiB0b0hhdmVNYXJrZXI7XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgICAgdmFyIGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZFBhdGg7XG5cbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG5cbiAgICAgIHZhciByZWFkT25seSA9IGZpbGUuZ2V0UmVhZE9ubHkoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEV4cGxvcmVyLCBzZWxlY3Rvciwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIl19