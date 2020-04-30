"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dropTarget = _interopRequireDefault(require("./dropTarget"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          rubbishBin = _dropTarget["default"].fromClass(Class, properties, moveHandler);

      rubbishBin.initialise();
      return rubbishBin;
    }
  }]);

  return RubbishBin;
}(_dropTarget["default"]);

exports["default"] = RubbishBin;

_defineProperty(RubbishBin, "tagName", "div");

_defineProperty(RubbishBin, "defaultProperties", {
  className: "rubbish-bin"
});

_defineProperty(RubbishBin, "ignoredProperties", ["onRemove"]);

function defaultRemoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === _types.DIRECTORY_NAME_TYPE,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1YmJpc2hCaW4uanMiXSwibmFtZXMiOlsiUnViYmlzaEJpbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcGVuIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyeSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnkiLCJjbG9zZSIsImlzT3BlbiIsIm1hcmtlZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9CZU1hcmtlZCIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJtYXJrRHJhZ2dhYmxlRW50cnkiLCJ1bm1hcmsiLCJtYXJrIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIkNsYXNzIiwicHJvcGVydGllcyIsIm9uUmVtb3ZlIiwicmVtb3ZlSGFuZGxlciIsImRlZmF1bHRSZW1vdmVIYW5kbGVyIiwibW92ZUhhbmRsZXIiLCJydWJiaXNoQmluIiwiRHJvcFRhcmdldCIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiLCJkb25lIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7MkJBQ1o7QUFDTCxXQUFLQyxRQUFMLENBQWMsTUFBZDtBQUNEOzs7NEJBRU87QUFDTixXQUFLQyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1DLElBQUksR0FBRyxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFiO0FBRUEsYUFBT0QsSUFBUDtBQUNEOzs7eUJBRUlFLGMsRUFBZ0JDLHNCLEVBQXdCO0FBQzNDLFdBQUtILElBQUw7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS0ksS0FBTDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNSixJQUFJLEdBQUcsS0FBS0ssTUFBTCxFQUFiO0FBQUEsVUFDTUMsTUFBTSxHQUFHTixJQURmLENBRFMsQ0FFYTs7QUFFdEIsYUFBT00sTUFBUDtBQUNEOzs7aUNBRVlKLGMsRUFBZ0I7QUFDM0IsVUFBTUssTUFBTSxHQUFHLEtBQUtDLFNBQUwsRUFBZjtBQUFBLFVBQ01DLDZCQUE2QixHQUFHUCxjQUFjLENBQUNRLGtCQUFmLEVBRHRDO0FBQUEsVUFFTUMsd0NBQXdDLEdBQUdKLE1BQU0sQ0FBQ0ssY0FBUCxDQUFzQkgsNkJBQXRCLENBRmpEO0FBQUEsVUFHTUksVUFBVSxHQUFHRix3Q0FIbkIsQ0FEMkIsQ0FJa0M7O0FBRTdELGFB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Q0FIYjs7QUFLTkMsTUFBQUEsVUFBVSxDQUFDRyxVQUFYO0FBRUEsYUFBT0gsVUFBUDtBQUNEOzs7O0VBOUlxQ0Msc0I7Ozs7Z0JBQW5CcEQsVSxhQTJIRixLOztnQkEzSEVBLFUsdUJBNkhRO0FBQ3pCdUQsRUFBQUEsU0FBUyxFQUFFO0FBRGMsQzs7Z0JBN0hSdkQsVSx1QkFpSVEsQ0FDekIsVUFEeUIsQzs7QUFnQjdCLFNBQVNpRCxvQkFBVCxDQUE4QlYsUUFBOUIsRUFBd0NpQixJQUF4QyxFQUE4QztBQUM1Q0EsRUFBQUEsSUFBSTtBQUNMOztBQUVELFNBQVNkLHlCQUFULENBQW1DckMsY0FBbkMsRUFBbURnQyxVQUFuRCxFQUErREMsVUFBL0QsRUFBMkU7QUFDekUsTUFBTW1CLGtCQUFrQixHQUFHcEQsY0FBYyxDQUFDcUQsT0FBZixFQUEzQjtBQUFBLE1BQ01DLGtCQUFrQixHQUFHdEQsY0FBYyxDQUFDdUQsT0FBZixFQUQzQjtBQUFBLE1BRU1DLHlDQUF5QyxHQUFJRixrQkFBa0IsS0FBS0csMEJBRjFFO0FBQUEsTUFHTUMsU0FBUyxHQUFHRix5Q0FIbEIsQ0FEeUUsQ0FJWDs7QUFFOUR2QixFQUFBQSxVQUFVLEdBQUcsSUFBYixDQU55RSxDQU1yRDs7QUFFcEJELEVBQUFBLFVBQVUsR0FBR29CLGtCQUFiLENBUnlFLENBUXZDOztBQUVsQyxNQUFNaEIsT0FBTyxHQUFHO0FBQ2RKLElBQUFBLFVBQVUsRUFBVkEsVUFEYztBQUVkQyxJQUFBQSxVQUFVLEVBQVZBLFVBRmM7QUFHZHlCLElBQUFBLFNBQVMsRUFBVEE7QUFIYyxHQUFoQjtBQU1BLFNBQU90QixPQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IERyb3BUYXJnZXQgZnJvbSBcIi4vZHJvcFRhcmdldFwiO1xuXG5pbXBvcnQgeyBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BUYXJnZXQge1xuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoXCJvcGVuXCIpO1xuXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICB1bm1hcmsoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiZGl2XCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJydWJiaXNoLWJpblwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25SZW1vdmVcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSB8fCBkZWZhdWx0UmVtb3ZlSGFuZGxlciwgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyLCAgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICBydWJiaXNoQmluLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gcnViYmlzaEJpbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0UmVtb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IG51bGw7ICAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iXX0=