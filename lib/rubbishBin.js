"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var types = require("./types"),
    DropTarget = require("./dropTarget");

var DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var RubbishBin = /*#__PURE__*/function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  var _super = _createSuper(RubbishBin);

  function RubbishBin() {
    _classCallCheck(this, RubbishBin);

    return _super.apply(this, arguments);
  }

  _createClass(RubbishBin, [{
    key: "open",
    value: function open() {
      this.addClass("open");
    }
  }, {
    key: "close",
    value: function close() {
      this.removeClass("open");
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      var open = this.hasClass("open");
      return open;
    }
  }, {
    key: "mark",
    value: function mark(draggableEntry, previousDraggableEntry) {
      this.open();
    }
  }, {
    key: "unmark",
    value: function unmark() {
      this.close();
    }
  }, {
    key: "isMarked",
    value: function isMarked() {
      var open = this.isOpen(),
          marked = open; ///

      return marked;
    }
  }, {
    key: "isToBeMarked",
    value: function isToBeMarked(draggableEntry) {
      var bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

      return toBeMarked;
    }
  }, {
    key: "dragging",
    value: function dragging(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget !== this) {
        return;
      }

      var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

      if (dropTargetToBeMarked === this) {///
      } else if (dropTargetToBeMarked !== null) {
        dropTargetToBeMarked.markDraggableEntry(draggableEntry);
        this.unmark();
      } else {
        var _dropTargetToBeMarked = explorer,
            ///
        previousDraggableEntry = null;

        _dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);

        this.unmark();
      }
    }
  }, {
    key: "markDraggableEntry",
    value: function markDraggableEntry(draggableEntry) {
      var previousDraggableEntry = null;
      this.mark(draggableEntry, previousDraggableEntry);
    }
  }, {
    key: "moveFileNameDraggableEntry",
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;

      if (targetFilePath === null) {
        var explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      }

      return draggableEntry;
    }
  }, {
    key: "moveDirectoryNameDraggableEntry",
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;

      if (targetDirectoryPath === null) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      }

      return draggableEntry;
    }
  }, {
    key: "pathMapsFromDraggableEntries",
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
        return pathMap;
      });
      return pathMaps;
    }
  }, {
    key: "retrieveMarkedDirectoryNameDraggableEntry",
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null; ///

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: "retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry",
    value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null; ///

      return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: "initialise",
    value: function initialise() {
      this.close();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove || defaultRemoveHandler,
          moveHandler = removeHandler,
          rubbishBin = DropTarget.fromClass(Class, properties, moveHandler);
      rubbishBin.initialise();
      return rubbishBin;
    }
  }]);

  return RubbishBin;
}(DropTarget);

Object.assign(RubbishBin, {
  tagName: "div",
  defaultProperties: {
    className: "rubbish-bin"
  },
  ignoredProperties: ["onRemove"]
});
module.exports = RubbishBin;

function defaultRemoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === DIRECTORY_NAME_TYPE,
      directory = draggableEntryDirectoryNameDraggableEntry; ///

  targetPath = null; ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };
  return pathMap;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1YmJpc2hCaW4uanMiXSwibmFtZXMiOlsidHlwZXMiLCJyZXF1aXJlIiwiRHJvcFRhcmdldCIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJSdWJiaXNoQmluIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm9wZW4iLCJoYXNDbGFzcyIsImRyYWdnYWJsZUVudHJ5IiwicHJldmlvdXNEcmFnZ2FibGVFbnRyeSIsImNsb3NlIiwiaXNPcGVuIiwibWFya2VkIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b0JlTWFya2VkIiwiZXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsIm1hcmtlZERyb3BUYXJnZXQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZCIsIm1hcmtEcmFnZ2FibGVFbnRyeSIsInVubWFyayIsIm1hcmsiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsImZpbGVQYXRoIiwicmVtb3ZlRmlsZVBhdGgiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnlQYXRoIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwicGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeSIsIm1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwib25SZW1vdmUiLCJyZW1vdmVIYW5kbGVyIiwiZGVmYXVsdFJlbW92ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsInJ1YmJpc2hCaW4iLCJmcm9tQ2xhc3MiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9uZSIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCO0FBQUEsSUFDTUMsVUFBVSxHQUFHRCxPQUFPLENBQUMsY0FBRCxDQUQxQjs7SUFHUUUsbUIsR0FBd0JILEssQ0FBeEJHLG1COztJQUVGQyxVOzs7Ozs7Ozs7Ozs7OzJCQUNHO0FBQ0wsV0FBS0MsUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0MsV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxJQUFJLEdBQUcsS0FBS0MsUUFBTCxDQUFjLE1BQWQsQ0FBYjtBQUVBLGFBQU9ELElBQVA7QUFDRDs7O3lCQUVJRSxjLEVBQWdCQyxzQixFQUF3QjtBQUMzQyxXQUFLSCxJQUFMO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtJLEtBQUw7QUFDRDs7OytCQUVVO0FBQ1QsVUFBTUosSUFBSSxHQUFHLEtBQUtLLE1BQUwsRUFBYjtBQUFBLFVBQ01DLE1BQU0sR0FBR04sSUFEZixDQURTLENBRWE7O0FBRXRCLGFBQU9NLE1BQVA7QUFDRDs7O2lDQUVZSixjLEVB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QUFFbEMsTUFBTXRCLE9BQU8sR0FBRztBQUNkSixJQUFBQSxVQUFVLEVBQVZBLFVBRGM7QUFFZEMsSUFBQUEsVUFBVSxFQUFWQSxVQUZjO0FBR2Q4QixJQUFBQSxTQUFTLEVBQVRBO0FBSGMsR0FBaEI7QUFNQSxTQUFPM0IsT0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHR5cGVzID0gcmVxdWlyZShcIi4vdHlwZXNcIiksXG4gICAgICBEcm9wVGFyZ2V0ID0gcmVxdWlyZShcIi4vZHJvcFRhcmdldFwiKTtcblxuY29uc3QgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BUYXJnZXQge1xuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoXCJvcGVuXCIpO1xuXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICB1bm1hcmsoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvblJlbW92ZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmVIYW5kbGVyID0gb25SZW1vdmUgfHwgZGVmYXVsdFJlbW92ZUhhbmRsZXIsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlciwgIC8vL1xuICAgICAgICAgIHJ1YmJpc2hCaW4gPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIpO1xuXG4gICAgcnViYmlzaEJpbi5pbml0aWFsaXNlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJ1YmJpc2hCaW47XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihSdWJiaXNoQmluLCB7XG4gIHRhZ05hbWU6IFwiZGl2XCIsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcInJ1YmJpc2gtYmluXCJcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICBcIm9uUmVtb3ZlXCJcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcblxuZnVuY3Rpb24gZGVmYXVsdFJlbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSBudWxsOyAgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuIl19