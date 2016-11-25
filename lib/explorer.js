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
    value: function addMarker(entry) {
      var directoryOverlappingEntry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDirectoryOverlappingEntry(entry);

      var entryName = entry.getName(),
          entryType = entry.getType(),
          directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
          markerPath = directoryOverlappingEntryPath + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        this.rootDirectory.removeMarker();
      } else {
        _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'removeMarker', this).call(this);
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var rootDirectoryMarked = this.rootDirectory.isMarked(),
          marked = rootDirectoryMarked ? true : _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'isMarked', this).call(this);

      return marked;
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
      var marked = this.isMarked(),
          startingDragging = !marked;

      if (startingDragging) {
        this.addMarkerInPlace(entry);
      }

      return startingDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      var entryPath = entry.getPath(),
          marked = this.isMarked(),
          droppableElementHavingMarker = marked ? this : this.getDroppableElementHavingMarker(),
          directoryHavingMarker = droppableElementHavingMarker.getDirectoryHavingMarker(),
          noDirectoryHasMarker = directoryHavingMarker === null,
          directoryHavingMarkerPath = noDirectoryHasMarker ? null : directoryHavingMarker.getPath(),
          entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
          sourcePath = entryPathWithoutBottommostName,
          targetPath = directoryHavingMarkerPath;

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
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var toBeMarked,
          entryPath = entry.getPath(),
          entryIsTopmostDirectory = util.isTopmostDirectoryName(entryPath);

      if (entryIsTopmostDirectory) {
        toBeMarked = false;
      } else {
        var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        toBeMarked = directoryOverlappingEntry !== null;
      }

      return toBeMarked;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leHBsb3Jlci5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsInV0aWwiLCJEcm9wcGFibGVFbGVtZW50IiwiUm9vdERpcmVjdG9yeSIsIkV4cGxvcmVyIiwic2VsZWN0b3IiLCJyb290RGlyZWN0b3J5TmFtZSIsImFjdGl2YXRlSGFuZGxlciIsIm1vdmVIYW5kbGVyIiwicm9vdERpcmVjdG9yeSIsImNsb25lIiwiZHJhZ0V2ZW50SGFuZGxlciIsImJpbmQiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJhcHBlbmQiLCJmaWxlUGF0aCIsInJlYWRPbmx5IiwiYWRkRmlsZSIsImRpcmVjdG9yeVBhdGgiLCJjb2xsYXBzZWQiLCJhZGREaXJlY3RvcnkiLCJnZXROYW1lIiwiZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyIiwiZW50cnkiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCIsImdldFBhdGgiLCJtYXJrZXJQYXRoIiwiYWRkTWFya2VyIiwicm9vdERpcmVjdG9yeU1hcmtlZCIsImlzTWFya2VkIiwicmVtb3ZlTWFya2VyIiwibWFya2VkIiwiZW50cnlQYXRoIiwiZW50cnlJc1RvcG1vc3QiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJmaWxlIiwiZ2V0RmlsZSIsInNvdXJjZVBhdGgiLCJzdWNjZXNzIiwiZmFpbCIsImZhaWx1cmUiLCJyZW1vdmUiLCJzdGFydGluZ0RyYWdnaW5nIiwiYWRkTWFya2VySW5QbGFjZSIsImRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIiLCJnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyIiwiZGlyZWN0b3J5SGF2aW5nTWFya2VyIiwibm9EaXJlY3RvcnlIYXNNYXJrZXIiLCJkaXJlY3RvcnlIYXZpbmdNYXJrZXJQYXRoIiwiZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInRhcmdldFBhdGgiLCJzdWJFbnRyaWVzIiwiZ2V0U3ViRW50cmllcyIsImVudHJpZXMiLCJyZXZlcnNlIiwicHVzaCIsIm1vdmVFbnRyaWVzIiwicmVtb3ZlTWFya2VyR2xvYmFsbHkiLCJ0b0JlTWFya2VkIiwiZW50cnlJc1RvcG1vc3REaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJtb3ZlZFBhdGgiLCJpc0NvbGxhcHNlZCIsImdldFJlYWRPbmx5IiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsT0FBT0YsUUFBUSxRQUFSLENBQVg7QUFBQSxJQUNJRyxtQkFBbUJILFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVJSSxnQkFBZ0JKLFFBQVEseUNBQVIsQ0FGcEI7O0lBSU1LLFE7OztBQUNKLG9CQUFZQyxRQUFaLEVBQXNCQyxpQkFBdEIsRUFBeUNDLGVBQXpDLEVBQTBEQyxXQUExRCxFQUF1RTtBQUFBOztBQUFBLG9IQUMvREgsUUFEK0QsRUFDckRHLFdBRHFEOztBQUdyRSxRQUFJQyxnQkFBZ0JOLGNBQWNPLEtBQWQsQ0FBb0JKLGlCQUFwQixFQUF1QyxNQUFLSyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBdkMsRUFBeUUsTUFBS0Msd0JBQUwsQ0FBOEJELElBQTlCLE9BQXpFLENBQXBCOztBQUVBLFVBQUtMLGVBQUwsR0FBdUJBLGVBQXZCOztBQUVBLFVBQUtFLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtLLE1BQUwsQ0FBWUwsYUFBWjtBQVRxRTtBQVV0RTs7Ozs0QkFFT00sUSxFQUFVQyxRLEVBQVU7QUFBRSxX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LEtBQVIsQ0FBY04sUUFBZCxFQUF3QkMsUUFBeEIsRUFBa0NDLGlCQUFsQyxFQUFxREUsV0FBckQsRUFBa0VELGVBQWxFLENBQVA7QUFDRDs7OzZCQUVlZ0UsSSxFQUFNakUsaUIsRUFBbUJFLFcsRUFBYUQsZSxFQUFpQjtBQUNyRSxhQUFPUCxRQUFRd0UsUUFBUixDQUFpQnBFLFFBQWpCLEVBQTJCbUUsSUFBM0IsRUFBaUNqRSxpQkFBakMsRUFBb0RFLFdBQXBELEVBQWlFRCxlQUFqRSxDQUFQO0FBQ0Q7Ozs7RUE3TG9CTCxnQjs7QUFnTXZCdUUsT0FBT0MsT0FBUCxHQUFpQnRFLFFBQWpCIiwiZmlsZSI6ImV4cGxvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICBSb290RGlyZWN0b3J5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9yb290RGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgYWN0aXZhdGVIYW5kbGVyLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB2YXIgcm9vdERpcmVjdG9yeSA9IFJvb3REaXJlY3RvcnkuY2xvbmUocm9vdERpcmVjdG9yeU5hbWUsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpLCB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyID0gYWN0aXZhdGVIYW5kbGVyO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCwgcmVhZE9ubHkpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTsgfVxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgZ2V0RGlyZWN0b3J5SGF2aW5nTWFya2VyKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpOyB9XG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkoZW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTsgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5UGF0aCArICcvJyArIGVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKSxcbiAgICAgICAgbWFya2VkID0gcm9vdERpcmVjdG9yeU1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICBzdXBlci5pc01hcmtlZCgpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGVudHJ5SXNUb3Btb3N0ID0gdXRpbC5pc1RvcG1vc3REaXJlY3RvcnlOYW1lKGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoIWVudHJ5SXNUb3Btb3N0KSB7XG4gICAgICB2YXIgbWFya2VyUGF0aCA9IGVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRNYXJrZXIoZW50cnkpXG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KSB7XG4gICAgdmFyIGZpbGUgPSBhY3RpdmF0ZUZpbGVFdmVudC5nZXRGaWxlKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICBzdWNjZXNzID0gdGhpcy5hY3RpdmF0ZUhhbmRsZXIoc291cmNlUGF0aCwgZmFpbCksXG4gICAgICAgIGZhaWx1cmUgPSAoc3VjY2VzcyA9PT0gZmFsc2UpO1xuICAgIFxuICAgIGlmIChmYWlsdXJlKSB7XG4gICAgICBmYWlsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFpbCgpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIHN0YXJ0aW5nRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0aW5nRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0aW5nRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgZGlyZWN0b3J5SGF2aW5nTWFya2VyID0gZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlci5nZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSxcbiAgICAgICAgbm9EaXJlY3RvcnlIYXNNYXJrZXIgPSAoZGlyZWN0b3J5SGF2aW5nTWFya2VyID09PSBudWxsICksXG4gICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlclBhdGggPSBub0RpcmVjdG9yeUhhc01hcmtlciA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeUhhdmluZ01hcmtlci5nZXRQYXRoKCksXG4gICAgICAgIGVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShlbnRyeVBhdGgpLFxuICAgICAgICBzb3VyY2VQYXRoID0gZW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICB0YXJnZXRQYXRoID0gZGlyZWN0b3J5SGF2aW5nTWFya2VyUGF0aDtcblxuICAgIGlmICgoc291cmNlUGF0aCAhPT0gdGFyZ2V0UGF0aClcbiAgICAgfHwgKHNvdXJjZVBhdGggPT09IG51bGwpICYmICh0YXJnZXRQYXRoID09PSBudWxsKSAmJiAoZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciAhPT0gdGhpcykpIHtcbiAgICAgIHZhciBzdWJFbnRyaWVzID0gZW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXMgPSBzdWJFbnRyaWVzO1xuXG4gICAgICBlbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGVudHJpZXMucHVzaChlbnRyeSk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIubW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlIYXZpbmdNYXJrZXIgPSB0aGlzLmdldERpcmVjdG9yeUhhdmluZ01hcmtlcigpLFxuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5KGVudHJ5KTtcblxuICAgIGlmICgoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbClcbiAgICAgJiYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgIT09IGRpcmVjdG9yeUhhdmluZ01hcmtlcikpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcblxuICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5kcmFnZ2luZyhlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgaXNUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIHRvQmVNYXJrZWQsXG4gICAgICAgIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZW50cnlJc1RvcG1vc3REaXJlY3RvcnkgPSB1dGlsLmlzVG9wbW9zdERpcmVjdG9yeU5hbWUoZW50cnlQYXRoKTtcblxuICAgIGlmIChlbnRyeUlzVG9wbW9zdERpcmVjdG9yeSkge1xuICAgICAgdG9CZU1hcmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeShlbnRyeSk7XG4gICAgICBcbiAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgICB2YXIgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcblxuICAgICAgdmFyIHJlYWRPbmx5ID0gZmlsZS5nZXRSZWFkT25seSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBtb3ZlSGFuZGxlciwgYWN0aXZhdGVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgbW92ZUhhbmRsZXIsIGFjdGl2YXRlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG1vdmVIYW5kbGVyLCBhY3RpdmF0ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iXX0=