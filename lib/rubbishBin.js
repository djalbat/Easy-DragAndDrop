"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _dropTarget = _interopRequireDefault(require("./dropTarget"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  background-image: url(\"image/rubbish-bin.png\");\n  background-repeat: no-repeat;\n  width: 4rem;\n  height: 4rem;\n  \n  .open {\n    background-image: url(\"image/open-rubbish-bin.png\");\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
    value: function initialise(properties) {
      this.close();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onRemove = properties.onRemove,
          onRemove = _properties$onRemove === void 0 ? defaultRemoveHandler : _properties$onRemove,
          removeHandler = onRemove,
          moveHandler = removeHandler,
          rubbishBin = _dropTarget["default"].fromClass(Class, properties, moveHandler);

      rubbishBin.initialise(properties);
      return rubbishBin;
    }
  }]);

  return RubbishBin;
}(_dropTarget["default"]);

_defineProperty(RubbishBin, "tagName", "div");

_defineProperty(RubbishBin, "defaultProperties", {
  className: "rubbish-bin"
});

_defineProperty(RubbishBin, "ignoredProperties", ["onRemove"]);

var _default = (0, _easyWithStyle["default"])(RubbishBin)(_templateObject());

exports["default"] = _default;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1YmJpc2hCaW4uanMiXSwibmFtZXMiOlsiUnViYmlzaEJpbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJvcGVuIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyeSIsInByZXZpb3VzRHJhZ2dhYmxlRW50cnkiLCJjbG9zZSIsImlzT3BlbiIsIm1hcmtlZCIsImJvdW5kcyIsImdldEJvdW5kcyIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwidG9CZU1hcmtlZCIsImV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJtYXJrZWREcm9wVGFyZ2V0IiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJtYXJrRHJhZ2dhYmxlRW50cnkiLCJ1bm1hcmsiLCJtYXJrIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNvdXJjZUZpbGVQYXRoIiwidGFyZ2V0RmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGVQYXRoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsInRhcmdldERpcmVjdG9yeVBhdGgiLCJkaXJlY3RvcnlQYXRoIiwicmVtb3ZlRGlyZWN0b3J5UGF0aCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsInBhdGhNYXBzIiwibWFwIiwicGF0aE1hcCIsInBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkiLCJtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsInByb3BlcnRpZXMiLCJDbGFzcyIsIm9uUmVtb3ZlIiwiZGVmYXVsdFJlbW92ZUhhbmRsZXIiLCJyZW1vdmVIYW5kbGVyIiwibW92ZUhhbmRsZXIiLCJydWJiaXNoQmluIiwiRHJvcFRhcmdldCIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiLCJkb25lIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJkaXJlY3RvcnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVTs7Ozs7Ozs7Ozs7OzsyQkFDRztBQUNMLFdBQUtDLFFBQUwsQ0FBYyxNQUFkO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUtDLFdBQUwsQ0FBaUIsTUFBakI7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUMsSUFBSSxHQUFHLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLENBQWI7QUFFQSxhQUFPRCxJQUFQO0FBQ0Q7Ozt5QkFFSUUsYyxFQUFnQkMsc0IsRUFBd0I7QUFDM0MsV0FBS0gsSUFBTDtBQUNEOzs7NkJBRVE7QUFDUCxXQUFLSSxLQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1KLElBQUksR0FBRyxLQUFLSyxNQUFMLEVBQWI7QUFBQSxVQUNNQyxNQUFNLEdBQUdOLElBRGYsQ0FEUyxDQUVhOztBQUV0QixhQUFPTSxNQUFQO0FBQ0Q7OztpQ0FFWUosYyxFQUFnQjtBQUMzQixVQUFNSyxNQUFNLEdBQUcsS0FBS0MsU0FBTCxFQUFmO0FBQUEsVUFDTUMsNkJBQTZCLEdBQUdQLGNBQWMsQ0FBQ1Esa0JBQWYsRUFEdEM7QUFBQSxVQUVNQyx3Q0FBd0MsR0FBR0osTUFBTSxDQUFDSyxjQUFQLENBQXNCSCw2QkFBdEIsQ0FGakQ7QUFBQSxVQUdNSSxVQUFVLEdBQUdGLHdDQUhuQixDQUQy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LENBQXFCUCxLQUFyQixFQUE0QkQsVUFBNUIsRUFBd0NLLFdBQXhDLENBSmU7O0FBTWxDQyxNQUFBQSxVQUFVLENBQUNHLFVBQVgsQ0FBc0JULFVBQXRCO0FBRUEsYUFBT00sVUFBUDtBQUNEOzs7O0VBOUlzQkMsc0I7O2dCQUFuQnBELFUsYUEySGEsSzs7Z0JBM0hiQSxVLHVCQTZIdUI7QUFDekJ1RCxFQUFBQSxTQUFTLEVBQUU7QUFEYyxDOztnQkE3SHZCdkQsVSx1QkFpSXVCLENBQ3pCLFVBRHlCLEM7O2VBZ0JkLCtCQUFVQSxVQUFWLEM7Ozs7QUFhZixTQUFTZ0Qsb0JBQVQsQ0FBOEJULFFBQTlCLEVBQXdDaUIsSUFBeEMsRUFBOEM7QUFDNUNBLEVBQUFBLElBQUk7QUFDTDs7QUFFRCxTQUFTZCx5QkFBVCxDQUFtQ3JDLGNBQW5DLEVBQW1EZ0MsVUFBbkQsRUFBK0RDLFVBQS9ELEVBQTJFO0FBQ3pFLE1BQU1tQixrQkFBa0IsR0FBR3BELGNBQWMsQ0FBQ3FELE9BQWYsRUFBM0I7QUFBQSxNQUNNQyxrQkFBa0IsR0FBR3RELGNBQWMsQ0FBQ3VELE9BQWYsRUFEM0I7QUFBQSxNQUVNQyx5Q0FBeUMsR0FBSUYsa0JBQWtCLEtBQUtHLDBCQUYxRTtBQUFBLE1BR01DLFNBQVMsR0FBR0YseUNBSGxCLENBRHlFLENBSVg7O0FBRTlEdkIsRUFBQUEsVUFBVSxHQUFHLElBQWIsQ0FOeUUsQ0FNckQ7O0FBRXBCRCxFQUFBQSxVQUFVLEdBQUdvQixrQkFBYixDQVJ5RSxDQVF2Qzs7QUFFbEMsTUFBTWhCLE9BQU8sR0FBRztBQUNkSixJQUFBQSxVQUFVLEVBQVZBLFVBRGM7QUFFZEMsSUFBQUEsVUFBVSxFQUFWQSxVQUZjO0FBR2R5QixJQUFBQSxTQUFTLEVBQVRBO0FBSGMsR0FBaEI7QUFNQSxTQUFPdEIsT0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcblxuaW1wb3J0IHsgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwib3BlblwiKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmhhc0NsYXNzKFwib3BlblwiKTtcblxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UocHJvcGVydGllcykge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcInJ1YmJpc2gtYmluXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvblJlbW92ZVwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgPSBkZWZhdWx0UmVtb3ZlSGFuZGxlcn0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSwgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyLCAgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICBydWJiaXNoQmluLmluaXRpYWxpc2UocHJvcGVydGllcyk7XG4gICAgXG4gICAgcmV0dXJuIHJ1YmJpc2hCaW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKFJ1YmJpc2hCaW4pYFxuXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImltYWdlL3J1YmJpc2gtYmluLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgd2lkdGg6IDRyZW07XG4gIGhlaWdodDogNHJlbTtcbiAgXG4gIC5vcGVuIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJpbWFnZS9vcGVuLXJ1YmJpc2gtYmluLnBuZ1wiKTtcbiAgfVxuXG5gO1xuXG5mdW5jdGlvbiBkZWZhdWx0UmVtb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gKGRyYWdnYWJsZUVudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IG51bGw7ICAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iXX0=