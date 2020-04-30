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

var easy = require("easy"),
    necessary = require("necessary");

var types = require("./types"),
    options = require("./options");

var Element = easy.Element,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first,
    last = arrayUtilities.last,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var DropTarget = /*#__PURE__*/function (_Element) {
  _inherits(DropTarget, _Element);

  var _super = _createSuper(DropTarget);

  function DropTarget(selector, dropTargets, moveHandler) {
    var _this;

    _classCallCheck(this, DropTarget);

    _this = _super.call(this, selector);
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
        removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoriesOptionPresent) {
          draggableEntriesExplorer.unsetOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoriesOptionPresent) {
              draggableEntriesExplorer.setOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
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
        case FILE_NAME_TYPE:
          var fileNameDraggableEntry = draggableEntry,
              ///
          sourceFilePath = sourcePath,
              ///
          targetFilePath = targetPath;
          draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath); ///

          break;

        case DIRECTORY_NAME_TYPE:
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
          dropTarget = Element.fromClass.apply(Element, [Class, properties, dropTargets, moveHandler].concat(remainingArguments));
      return dropTarget;
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyb3BUYXJnZXQuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJ0eXBlcyIsIm9wdGlvbnMiLCJFbGVtZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaXJzdCIsImxhc3QiLCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRHJvcFRhcmdldCIsInNlbGVjdG9yIiwiZHJvcFRhcmdldHMiLCJtb3ZlSGFuZGxlciIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcFRhcmdldFRvQmVNYXJrZWQiLCJ0b0JlTWFya2VkIiwiaXNUb0JlTWFya2VkIiwic29tZSIsImRyb3BUYXJnZXQiLCJtYXJrZWREcm9wVGFyZ2V0IiwibWFya2VkIiwiaXNNYXJrZWQiLCJkcm9wVGFyZ2V0TWFya2VkIiwiZ2V0TWFya2VkRHJvcFRhcmdldCIsInVubWFyayIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImRvbmUiLCJwYXRoTWFwcyIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJsYXN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5IiwiZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyIiwiZ2V0RXhwbG9yZXIiLCJkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIiLCJyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsImNhbGxiYWNrIiwibW92ZURyYWdnYWJsZUVudHJ5IiwidHlwZSIsImdldFR5cGUiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsIm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZWNpcHJvY2F0ZWQiLCJwdXNoIiwiYWRkRHJvcFRhcmdldCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJyZW1vdmVEcm9wVGFyZ2V0IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiZnJvbUNsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7QUFBQSxJQUNNQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBRHpCOztBQUdBLElBQU1FLEtBQUssR0FBR0YsT0FBTyxDQUFDLFNBQUQsQ0FBckI7QUFBQSxJQUNNRyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxXQUFELENBRHZCOztBQUdNLElBQUVJLE9BQUYsR0FBY0wsSUFBZCxDQUFFSyxPQUFGO0FBQUEsSUFDRUMsY0FERixHQUNxQkosU0FEckIsQ0FDRUksY0FERjtBQUFBLElBRUVDLEtBRkYsR0FFa0JELGNBRmxCLENBRUVDLEtBRkY7QUFBQSxJQUVTQyxJQUZULEdBRWtCRixjQUZsQixDQUVTRSxJQUZUO0FBQUEsSUFHRUMsK0JBSEYsR0FHc0NMLE9BSHRDLENBR0VLLCtCQUhGO0FBQUEsSUFJRUMsY0FKRixHQUkwQ1AsS0FKMUMsQ0FJRU8sY0FK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QUF3QkYsS0FBeEIsRUFBK0JDLFdBQS9CO0FBQ0Q7O0FBRUQsVUFBSU4sWUFBSixFQUFrQjtBQUNoQnZDLFFBQUFBLFVBQVUsQ0FBQytDLGdCQUFYLENBQTRCLElBQTVCLEVBRGdCLENBQ21CO0FBQ3BDO0FBQ0Y7Ozs4QkFFZ0JDLEssRUFBT0MsVSxFQUFZN0QsVyxFQUFvQztBQUFBLHdDQUFwQjhELGtCQUFvQjtBQUFwQkEsUUFBQUEsa0JBQW9CO0FBQUE7O0FBQ3RFLFVBQU0vRCxXQUFXLEdBQUcsRUFBcEI7QUFBQSxVQUNNYSxVQUFVLEdBQUd0QixPQUFPLENBQUN5RSxTQUFSLE9BQUF6RSxPQUFPLEdBQVdzRSxLQUFYLEVBQWtCQyxVQUFsQixFQUE4QjlELFdBQTlCLEVBQTJDQyxXQUEzQyxTQUEyRDhELGtCQUEzRCxFQUQxQjtBQUdBLGFBQU9sRCxVQUFQO0FBQ0Q7Ozs7RUF0S3NCdEIsTzs7QUF5S3pCMEUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcEUsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoXCJlYXN5XCIpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZShcIm5lY2Vzc2FyeVwiKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKFwiLi90eXBlc1wiKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKFwiLi9vcHRpb25zXCIpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyB9ID0gb3B0aW9ucyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSA9IHR5cGVzO1xuXG5jbGFzcyBEcm9wVGFyZ2V0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRyb3BUYXJnZXRzID0gZHJvcFRhcmdldHM7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IG51bGw7XG5cbiAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldDsgIC8vL1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcm9wVGFyZ2V0VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BUYXJnZXQoKSB7XG4gICAgbGV0IG1hcmtlZERyb3BUYXJnZXQgPSBudWxsO1xuXG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgfVxuXG4gIHVubWFya0dsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTsgLy8vXG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMuZm9yRWFjaCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcHMuZmluZCgocGF0aE1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgeyBzb3VyY2VQYXRoIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGF0aCA9PT0gZHJhZ2dhYmxlRW50cnlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHsgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgY2FsbGJhY2sgfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCB0eXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgICAgc291cmNlRmlsZVBhdGggPSBzb3VyY2VQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIHRhcmdldEZpbGVQYXRoID0gdGFyZ2V0UGF0aDtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCwgcmVjaXByb2NhdGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG5cbiAgICBpZiAocmVjaXByb2NhdGVkKSB7XG4gICAgICBkcm9wVGFyZ2V0LmFkZERyb3BUYXJnZXQodGhpcyk7IC8vL1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCwgcmVjaXByb2NhdGVkID0gZmFsc2UpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZHJvcFRhcmdldHMuaW5kZXhPZihkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcbiAgICAgIFxuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG5cbiAgICBpZiAocmVjaXByb2NhdGVkKSB7XG4gICAgICBkcm9wVGFyZ2V0LnJlbW92ZURyb3BUYXJnZXQodGhpcyk7IC8vL1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IFtdLFxuICAgICAgICAgIGRyb3BUYXJnZXQgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuIl19