'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('./options'),
    arrayUtil = require('./util/array');

var Element = easy.Element;

var DropTarget = function (_Element) {
  _inherits(DropTarget, _Element);

  function DropTarget(selector) {
    var moveHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.setInitialState();
    return _this;
  }

  _createClass(DropTarget, [{
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

      return overlappingDraggableEntry;
    }
  }, {
    key: 'getDropTargetToBeMarked',
    value: function getDropTargetToBeMarked(draggableEntry) {
      var dropTargets = this.getDropTargets(),
          dropTargetToBeMarked = dropTargets.reduce(function (dropTargetToBeMarked, dropTarget) {
        if (dropTargetToBeMarked === null) {
          if (dropTarget.isToBeMarked(draggableEntry)) {
            ///
            dropTargetToBeMarked = dropTarget;
          }
        }

        return dropTargetToBeMarked;
      }, null);

      return dropTargetToBeMarked;
    }
  }, {
    key: 'getMarkedDropTarget',
    value: function getMarkedDropTarget() {
      var dropTargets = this.getDropTargets(),
          markedDropTarget = dropTargets.reduce(function (markedDropTarget, dropTarget) {
        if (markedDropTarget === null) {
          var dropTargetMarked = dropTarget.isMarked();

          if (dropTargetMarked) {
            markedDropTarget = dropTarget;
          }
        }

        return markedDropTarget;
      }, null);

      return markedDropTarget;
    }
  }, {
    key: 'removeMarkerEntryGlobally',
    value: function removeMarkerEntryGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarkerEntry();
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.removeMarkerEntry();
      }
    }
  }, {
    key: 'moveDraggableEntries',
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

      this.moveHandler(pathMaps, function () {
        var lastDraggableEntry = arrayUtil.last(draggableEntries),
            firstDraggableEntry = arrayUtil.first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectoryNameDraggableEntries = draggableEntriesExplorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoryNameDraggableEntries) {
          draggableEntriesExplorer.unsetOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoryNameDraggableEntries) {
              draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = pathMaps.find(function (pathMap) {
              var sourcePath = pathMap['sourcePath'],
                  found = sourcePath === draggableEntryPath;

              return found;
            }),
                _sourcePath = pathMap['sourcePath'],
                _targetPath = pathMap['targetPath'];

            this.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);
          }
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry();

      if (draggableEntryDirectoryNameDraggableEntry) {
        var directoryDraggableEntry = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        targetDirectoryPath = targetPath; ///

        this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath);
      } else {
        var fileNameDraggableEntry = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        targetFilePath = targetPath; ///

        this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath);
      }
    }
  }, {
    key: 'addDropTarget',
    value: function addDropTarget(dropTarget) {
      var dropTargets = this.getDropTargets();

      dropTargets.push(dropTarget);
    }
  }, {
    key: 'removeDropTarget',
    value: function removeDropTarget(dropTarget) {
      var dropTargets = this.getDropTargets();

      var index = dropTargets.indexOf(dropTarget),
          found = index !== -1;

      if (found) {
        var start = index,
            ///
        deleteCount = 1;

        dropTargets.splice(start, deleteCount);
      }
    }
  }, {
    key: 'getDropTargets',
    value: function getDropTargets() {
      return this.fromState('dropTargets');
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState() {
      var dropTargets = [];

      this.setState({
        dropTargets: dropTargets
      });
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wVGFyZ2V0LmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwib3B0aW9ucyIsImFycmF5VXRpbCIsIkVsZW1lbnQiLCJEcm9wVGFyZ2V0Iiwic2VsZWN0b3IiLCJtb3ZlSGFuZGxlciIsInBhdGhNYXBzIiwiZG9uZSIsInNldEluaXRpYWxTdGF0ZSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiZHJvcFRhcmdldHMiLCJnZXREcm9wVGFyZ2V0cyIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwicmVkdWNlIiwiZHJvcFRhcmdldCIsImlzVG9CZU1hcmtlZCIsIm1hcmtlZERyb3BUYXJnZXQiLCJkcm9wVGFyZ2V0TWFya2VkIiwiaXNNYXJrZWQiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXJFbnRyeSIsImdldE1hcmtlZERyb3BUYXJnZXQiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibGFzdERyYWdnYWJsZUVudHJ5IiwibGFzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnkiLCJmaXJzdCIsImZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciIsImdldEV4cGxvcmVyIiwiZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyIiwicmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyIsImhhc09wdGlvbiIsIlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMiLCJ1bnNldE9wdGlvbiIsImZvckVhY2giLCJzZXRPcHRpb24iLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJmb3VuZCIsIm1vdmVEcmFnZ2FibGVFbnRyeSIsImJpbmQiLCJkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkiLCJzb3VyY2VEaXJlY3RvcnlQYXRoIiwidGFyZ2V0RGlyZWN0b3J5UGF0aCIsIm1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5Iiwic291cmNlRmlsZVBhdGgiLCJ0YXJnZXRGaWxlUGF0aCIsIm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJmcm9tU3RhdGUiLCJzZXRTdGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsVUFBVUQsUUFBUSxXQUFSLENBQWhCO0FBQUEsSUFDTUUsWUFBWUYsUUFBUSxjQUFSLENBRGxCOztJQUdRRyxPLEdBQVlKLEksQ0FBWkksTzs7SUFFRkMsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBMEU7QUFBQSxRQUFwREMsV0FBb0QsdUVBQXRDLFVBQVNDLFFBQVQsRUFBbUJDLElBQW5CLEVBQXlCO0FBQUVBO0FBQVMsS0FBRTs7QUFBQTs7QUFBQSx3SEFDbEVILFFBRGtFOztBQUd4RSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLRyxlQUFMO0FBTHdFO0FBTXpFOzs7O2dEQUUyQkMsNkIsRUFBK0I7QUFDekQsVUFBTUMsU0FBUyxLQUFLQyxTQUFMLEVBQWY7QUFBQSxVQUNNQyxrQ0FBa0NGLE9BQU9HLGNBQVAsQ0FBc0JKLDZCQUF0QixDQUR4QztBQUFBLFVBRU1LLDRCQUE0QkYsK0JBRmxDOztBQUlBLGFBQU9FLHlCQUFQO0FBQ0Q7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Rjs7O3FDQUVnQjtBQUFFLGFBQU8sS0FBS0UsU0FBTCxDQUFlLGFBQWYsQ0FBUDtBQUF1Qzs7O3NDQUV4QztBQUNoQixVQUFNcEQsY0FBYyxFQUFwQjs7QUFFQSxXQUFLcUQsUUFBTCxDQUFjO0FBQ1pyRCxxQkFBYUE7QUFERCxPQUFkO0FBR0Q7Ozs7RUFwSnNCZCxPOztBQXVKekJvRSxPQUFPQyxPQUFQLEdBQWlCcEUsVUFBakIiLCJmaWxlIjoiZHJvcFRhcmdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpLFxuICAgICAgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi91dGlsL2FycmF5Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCB9ID0gZWFzeTtcblxuY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIgPSBmdW5jdGlvbihwYXRoTWFwcywgZG9uZSkgeyBkb25lKCk7IH0pIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICAgIFxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpLFxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BUYXJnZXRUb0JlTWFya2VkLCBkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICAgICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlZERyb3BUYXJnZXQsIGRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICAgICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBhcnJheVV0aWwubGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBhcnJheVV0aWwuZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTsgLy8vXG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IHBhdGhNYXBbJ3NvdXJjZVBhdGgnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCk7XG4gIFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHNvdXJjZVBhdGggPSBwYXRoTWFwWydzb3VyY2VQYXRoJ10sXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGF0aCA9IHBhdGhNYXBbJ3RhcmdldFBhdGgnXTtcblxuICAgICAgICAgIHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbiAgXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpO1xuICAgIFxuICAgIGRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcblxuICAgIGNvbnN0IGluZGV4ID0gZHJvcFRhcmdldHMuaW5kZXhPZihkcm9wVGFyZ2V0KSxcbiAgICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIGRyb3BUYXJnZXRzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldERyb3BUYXJnZXRzKCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ2Ryb3BUYXJnZXRzJyk7IH1cbiAgXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IFtdO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJvcFRhcmdldHM6IGRyb3BUYXJnZXRzXG4gICAgfSk7XG4gIH0gIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BUYXJnZXQ7XG4iXX0=