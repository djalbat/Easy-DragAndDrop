"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

var _options = require("./options");

var _types = require("./types");

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

var first = _necessary.arrayUtilities.first,
    last = _necessary.arrayUtilities.last;

var DropTarget = /*#__PURE__*/function (_Element) {
  _inherits(DropTarget, _Element);

  var _super = _createSuper(DropTarget);

  function DropTarget(selectorOrDOMElement, dropTargets, moveHandler) {
    var _this;

    _classCallCheck(this, DropTarget);

    _this = _super.call(this, selectorOrDOMElement);
    _this.dropTargets = dropTargets;
    _this.moveHandler = moveHandler;
    return _this;
  }

  _createClass(DropTarget, [{
    key: "isOverlappingDraggableEntry",
    value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;
      return overlappingDraggableEntry;
    }
  }, {
    key: "getDropTargetToBeMarked",
    value: function getDropTargetToBeMarked(draggableEntry) {
      var dropTargetToBeMarked = null;
      var toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        dropTargetToBeMarked = this; ///
      } else {
        this.dropTargets.some(function (dropTarget) {
          var toBeMarked = dropTarget.isToBeMarked(draggableEntry);

          if (toBeMarked) {
            dropTargetToBeMarked = dropTarget; ///

            return true;
          }
        });
      }

      return dropTargetToBeMarked;
    }
  }, {
    key: "getMarkedDropTarget",
    value: function getMarkedDropTarget() {
      var markedDropTarget = null;
      var marked = this.isMarked();

      if (marked) {
        markedDropTarget = this; ///
      } else {
        this.dropTargets.some(function (dropTarget) {
          var dropTargetMarked = dropTarget.isMarked();

          if (dropTargetMarked) {
            markedDropTarget = dropTarget;
            return true;
          }
        });
      }

      return markedDropTarget;
    }
  }, {
    key: "unmarkGlobally",
    value: function unmarkGlobally() {
      var markedDropTarget = this.getMarkedDropTarget();
      markedDropTarget.unmark();
    }
  }, {
    key: "moveDraggableEntries",
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var _this2 = this;

      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);
      this.moveHandler(pathMaps, function () {
        var lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoriesOptionPresent) {
          draggableEntriesExplorer.unsetOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoriesOptionPresent) {
              draggableEntriesExplorer.setOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = pathMaps.find(function (pathMap) {
              var sourcePath = pathMap.sourcePath;

              if (sourcePath === draggableEntryPath) {
                return true;
              }
            }),
                _sourcePath = pathMap.sourcePath,
                _targetPath = pathMap.targetPath,
                callback = pathMap.callback;
            draggableEntry = _this2.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);

            if (callback) {
              callback(draggableEntry);
            }
          }
        });
        done();
      });
    }
  }, {
    key: "moveDraggableEntry",
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var type = draggableEntry.getType();

      switch (type) {
        case _types.FILE_NAME_TYPE:
          var fileNameDraggableEntry = draggableEntry,
              ///
          sourceFilePath = sourcePath,
              ///
          targetFilePath = targetPath;
          draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath); ///

          break;

        case _types.DIRECTORY_NAME_TYPE:
          var directoryDraggableEntry = draggableEntry,
              ///
          sourceDirectoryPath = sourcePath,
              ///
          targetDirectoryPath = targetPath; ///

          draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath); ///

          break;
      }

      return draggableEntry;
    }
  }, {
    key: "addDropTarget",
    value: function addDropTarget(dropTarget) {
      var reciprocated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.dropTargets.push(dropTarget);

      if (reciprocated) {
        dropTarget.addDropTarget(this); ///
      }
    }
  }, {
    key: "removeDropTarget",
    value: function removeDropTarget(dropTarget) {
      var reciprocated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var index = this.dropTargets.indexOf(dropTarget);

      if (index !== -1) {
        var start = index,
            ///
        deleteCount = 1;
        this.dropTargets.splice(start, deleteCount);
      }

      if (reciprocated) {
        dropTarget.removeDropTarget(this); ///
      }
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties, moveHandler) {
      for (var _len = arguments.length, remainingArguments = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var dropTargets = [],
          dropTarget = _easy.Element.fromClass.apply(_easy.Element, [Class, properties, dropTargets, moveHandler].concat(remainingArguments));

      return dropTarget;
    }
  }]);

  return DropTarget;
}(_easy.Element);

exports["default"] = DropTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyb3BUYXJnZXQuanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsImxhc3QiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3JPckRPTUVsZW1lbnQiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsInRvQmVNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJzb21lIiwiZHJvcFRhcmdldCIsIm1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWQiLCJpc01hcmtlZCIsImRyb3BUYXJnZXRNYXJrZWQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwidW5tYXJrIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsInBhdGhNYXBzIiwicGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyIsImxhc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsImRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsImNhbGxiYWNrIiwibW92ZURyYWdnYWJsZUVudHJ5IiwidHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwibW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZWNpcHJvY2F0ZWQiLCJwdXNoIiwiYWRkRHJvcFRhcmdldCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJyZW1vdmVEcm9wVGFyZ2V0IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiRWxlbWVudCIsImZyb21DbGFzcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLEssR0FBZ0JDLHlCLENBQWhCRCxLO0lBQU9FLEksR0FBU0QseUIsQ0FBVEMsSTs7SUFFTUMsVTs7Ozs7QUFDbkIsc0JBQVlDLG9CQUFaLEVBQWtDQyxXQUFsQyxFQUErQ0MsV0FBL0MsRUFBNEQ7QUFBQTs7QUFBQTs7QUFDMUQsOEJBQU1GLG9CQUFOO0FBRUEsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFFQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUwwRDtBQU0zRDs7OztnREFFMkJDLDZCLEVBQStCO0FBQ3pELFVBQU1DLE1BQU0sR0FBRyxLQUFLQyxTQUFMLEVBQWY7QUFBQSxVQUNNQywrQkFBK0IsR0FBR0YsTUFBTSxDQUFDRyxjQUFQLENBQXNCSiw2QkFBdEIsQ0FEeEM7QUFBQSxVQUVNSyx5QkFBeUIsR0FBR0YsK0JBRmxDO0FBSUEsYUFBT0UseUJBQVA7QUFDRDs7OzRDQUV1QkMsYyxFQUFnQjtBQUN0QyxVQUFJQyxvQkFBb0IsR0FBRyxJQUEzQjtB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cm9tIFwiZWFzeVwiO1xuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHsgZmlyc3QsIGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wVGFyZ2V0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50LCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XG5cbiAgICB0aGlzLmRyb3BUYXJnZXRzID0gZHJvcFRhcmdldHM7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IG51bGw7XG5cbiAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldDsgIC8vL1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgbGV0IG1hcmtlZERyb3BUYXJnZXQgPSBudWxsO1xuXG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgfVxuXG4gIHVubWFya0dsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTsgLy8vXG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMuZm9yRWFjaCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcHMuZmluZCgocGF0aE1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgeyBzb3VyY2VQYXRoIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGF0aCA9PT0gZHJhZ2dhYmxlRW50cnlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHsgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgY2FsbGJhY2sgfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCB0eXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgICAgc291cmNlRmlsZVBhdGggPSBzb3VyY2VQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIHRhcmdldEZpbGVQYXRoID0gdGFyZ2V0UGF0aDtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCwgcmVjaXByb2NhdGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG5cbiAgICBpZiAocmVjaXByb2NhdGVkKSB7XG4gICAgICBkcm9wVGFyZ2V0LmFkZERyb3BUYXJnZXQodGhpcyk7IC8vL1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCwgcmVjaXByb2NhdGVkID0gZmFsc2UpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZHJvcFRhcmdldHMuaW5kZXhPZihkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcbiAgICAgIFxuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG5cbiAgICBpZiAocmVjaXByb2NhdGVkKSB7XG4gICAgICBkcm9wVGFyZ2V0LnJlbW92ZURyb3BUYXJnZXQodGhpcyk7IC8vL1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IFtdLFxuICAgICAgICAgIGRyb3BUYXJnZXQgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXQ7XG4gIH1cbn1cbiJdfQ==