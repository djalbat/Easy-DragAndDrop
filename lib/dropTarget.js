"use strict";

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

module.exports = DropTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyb3BUYXJnZXQuanMiXSwibmFtZXMiOlsiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsImxhc3QiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3IiLCJkcm9wVGFyZ2V0cyIsIm1vdmVIYW5kbGVyIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wVGFyZ2V0VG9CZU1hcmtlZCIsInRvQmVNYXJrZWQiLCJpc1RvQmVNYXJrZWQiLCJzb21lIiwiZHJvcFRhcmdldCIsIm1hcmtlZERyb3BUYXJnZXQiLCJtYXJrZWQiLCJpc01hcmtlZCIsImRyb3BUYXJnZXRNYXJrZWQiLCJnZXRNYXJrZWREcm9wVGFyZ2V0IiwidW5tYXJrIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsInBhdGhNYXBzIiwicGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyIsImxhc3REcmFnZ2FibGVFbnRyeSIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIiLCJnZXRFeHBsb3JlciIsImRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyIsInVuc2V0T3B0aW9uIiwiZm9yRWFjaCIsInNldE9wdGlvbiIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsImNhbGxiYWNrIiwibW92ZURyYWdnYWJsZUVudHJ5IiwidHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfVFlQRSIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VGaWxlUGF0aCIsInRhcmdldEZpbGVQYXRoIiwibW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJyZWNpcHJvY2F0ZWQiLCJwdXNoIiwiYWRkRHJvcFRhcmdldCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJyZW1vdmVEcm9wVGFyZ2V0IiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiRWxlbWVudCIsImZyb21DbGFzcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFUUEsSyxHQUFnQkMseUIsQ0FBaEJELEs7SUFBT0UsSSxHQUFTRCx5QixDQUFUQyxJOztJQUVUQyxVOzs7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUFtQ0MsV0FBbkMsRUFBZ0Q7QUFBQTs7QUFBQTs7QUFDOUMsOEJBQU1GLFFBQU47QUFFQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUVBLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBTDhDO0FBTS9DOzs7O2dEQUUyQkMsNkIsRUFBK0I7QUFDekQsVUFBTUMsTUFBTSxHQUFHLEtBQUtDLFNBQUwsRUFBZjtBQUFBLFVBQ01DLCtCQUErQixHQUFHRixNQUFNLENBQUNHLGNBQVAsQ0FBc0JKLDZCQUF0QixDQUR4QztBQUFBLFVBRU1LLHlCQUF5QixHQUFHRiwrQkFGbEM7QUFJQSxhQUFPRSx5QkFBUDtBQUNEOzs7NENBRXVCQyxjLEVBQWdCO0FBQ3RDLFVBQUlDLG9CQUFvQixHQUFHLElBQTNCO0FB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InVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyBmaXJzdCwgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJvcFRhcmdldHMgPSBkcm9wVGFyZ2V0cztcblxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gbnVsbDtcblxuICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCB0b0JlTWFya2VkID0gZHJvcFRhcmdldC5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0OyAgLy8vXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBsZXQgbWFya2VkRHJvcFRhcmdldCA9IG51bGw7XG5cbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgdW5tYXJrR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpOyAvLy9cblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwcy5maW5kKChwYXRoTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB7IHNvdXJjZVBhdGggfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VQYXRoID09PSBkcmFnZ2FibGVFbnRyeVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgeyBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBjYWxsYmFjayB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoOyAvLy9cblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgYWRkRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChyZWNpcHJvY2F0ZWQpIHtcbiAgICAgIGRyb3BUYXJnZXQuYWRkRHJvcFRhcmdldCh0aGlzKTsgLy8vXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kcm9wVGFyZ2V0cy5pbmRleE9mKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuICAgICAgXG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cblxuICAgIGlmIChyZWNpcHJvY2F0ZWQpIHtcbiAgICAgIGRyb3BUYXJnZXQucmVtb3ZlRHJvcFRhcmdldCh0aGlzKTsgLy8vXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gW10sXG4gICAgICAgICAgZHJvcFRhcmdldCA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BUYXJnZXQ7XG4iXX0=