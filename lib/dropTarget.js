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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyb3BUYXJnZXQuanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsImxhc3QiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsInRvQmVNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJzb21lIiwiZHJvcFRhcmdldCIsIm1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWQiLCJpc01hcmtlZCIsImRyb3BUYXJnZXRNYXJrZWQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwidW5tYXJrIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsInBhdGhNYXBzIiwicGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyIsImxhc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsImRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsImNhbGxiYWNrIiwibW92ZURyYWdnYWJsZUVudHJ5IiwidHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwibW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZWNpcHJvY2F0ZWQiLCJwdXNoIiwiYWRkRHJvcFRhcmdldCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJyZW1vdmVEcm9wVGFyZ2V0IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiRWxlbWVudCIsImZyb21DbGFzcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVFBLEssR0FBZ0JDLHlCLENBQWhCRCxLO0lBQU9FLEksR0FBU0QseUIsQ0FBVEMsSTs7SUFFTUMsVTs7Ozs7QUFDbkIsc0JBQVlDLFFBQVosRUFBc0JDLFdBQXRCLEVBQW1DQyxXQUFuQyxFQUFnRDtBQUFBOztBQUFBOztBQUM5Qyw4QkFBTUYsUUFBTjtBQUVBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBRUEsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFMOEM7QUFNL0M7Ozs7Z0RBRTJCQyw2QixFQUErQjtBQUN6RCxVQUFNQyxNQUFNLEdBQUcsS0FBS0MsU0FBTCxFQUFmO0FBQUEsVUFDTUMsK0JBQStCLEdBQUdGLE1BQU0sQ0FBQ0csY0FBUCxDQUFzQkosNkJBQXRCLENBRHhDO0FBQUEsVUFFTUsseUJBQXlCLEdBQUdGLCtCQUZsQztBQUlBLGFBQU9FLHlCQUFQO0FBQ0Q7Ozs0Q0FFdUJDLGMsRUFBZ0I7QUFDdEMsVUFBSUMsb0JBQW9CLEdBQUcsSUFBM0I7QUFFQSxVQUFNQyxVQUFV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bmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcm9wVGFyZ2V0cyA9IGRyb3BUYXJnZXRzO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7ICAvLy9cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGxldCBtYXJrZWREcm9wVGFyZ2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5hZGREcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5yZW1vdmVEcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXSxcbiAgICAgICAgICBkcm9wVGFyZ2V0ID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0O1xuICB9XG59XG4iXX0=