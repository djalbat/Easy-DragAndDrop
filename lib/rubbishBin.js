'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var DropTarget = require('./dropTarget');

var Element = easy.Element;

var RubbishBin = function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  function RubbishBin(selector) {
    var removeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, RubbishBin);

    var dropTargetMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, dropTargetMoveHandler));

    _this.close();
    return _this;
  }

  _createClass(RubbishBin, [{
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = null;

      return markedDirectory;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null; ///

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      this.open();
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      this.close();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var open = this.isOpen(),
          marked = open; ///

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

      return toBeMarked;
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry, explorer) {
      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (!toBeMarked) {
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            var directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
      if (movedDirectoryPath === null) {
        var explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath) {
      if (movedFilePath === null) {
        var explorer = file.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.addClass('open');
    }
  }, {
    key: 'close',
    value: function close() {
      this.removeClass('open');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      var open = this.hasClass('open');

      return open;
    }
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = null;

        pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return pathMap;
      });

      return pathMaps;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove; ///

      return Element.fromProperties(RubbishBin, properties, removeHandler);
    }
  }]);

  return RubbishBin;
}(DropTarget);

Object.assign(RubbishBin, {
  tagName: 'div',
  defaultProperties: {
    className: 'rubbishBin'
  },
  ignoredProperties: ['onRemove']
});

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiRHJvcFRhcmdldCIsIkVsZW1lbnQiLCJSdWJiaXNoQmluIiwic2VsZWN0b3IiLCJyZW1vdmVIYW5kbGVyIiwicGF0aE1hcHMiLCJkb25lIiwiZHJvcFRhcmdldE1vdmVIYW5kbGVyIiwiY2xvc2UiLCJtYXJrZWREaXJlY3RvcnkiLCJkcmFnZ2FibGVFbnRyeSIsImRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJvcGVuIiwiaXNPcGVuIiwibWFya2VkIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJ0b0JlTWFya2VkIiwiZXhwbG9yZXIiLCJpc01hcmtlZCIsImlzVG9CZU1hcmtlZCIsImRyb3BUYXJnZXRUb0JlTWFya2VkIiwiZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQiLCJnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYWRkTWFya2VyIiwiYWRkTWFya2VySW5QbGFjZSIsInJlbW92ZU1hcmtlciIsImRpcmVjdG9yeSIsInNvdXJjZURpcmVjdG9yeVBhdGgiLCJtb3ZlZERpcmVjdG9yeVBhdGgiLCJnZXRFeHBsb3JlciIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnkiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJtb3ZlZEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwibWFwIiwicGF0aE1hcCIsImRyYWdnYWJsZUVudHJ5UGF0aCIsImdldFBhdGgiLCJzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGgiLCJ0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJwcm9wZXJ0aWVzIiwib25SZW1vdmUiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGNBQVIsQ0FBbkI7O0lBRVFFLE8sR0FBWUgsSSxDQUFaRyxPOztJQUVGQyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUE2RTtBQUFBLFFBQXZEQyxhQUF1RCx1RUFBdkMsVUFBU0MsUUFBVCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFBRUE7QUFBUyxLQUFHOztBQUFBOztBQUMzRSxRQUFNQyx3QkFBd0JILGFBQTlCLENBRDJFLENBQzdCOztBQUQ2Qix3SEFHckVELFFBSHFFLEVBRzNESSxxQkFIMkQ7O0FBSzNFLFVBQUtDLEtBQUw7QUFMMkU7QUFNNUU7Ozs7eUNBRW9CO0FBQ25CLFVBQU1DLGtCQUFrQixJQUF4Qjs7QUFFQSxhQUFPQSxlQUFQO0FBQ0Q7OzswREFFcUNDLGMsRUFBZ0I7QUFDcEQsVUFBTUMscUNBQXFDLElBQTNDLENBRG9ELENBQ0g7O0FBRWpELGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4QkFFU0QsYyxFQUFnQkMsa0MsRUFBb0M7QUFDNUQsV0FBS0MsSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLSixLQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1JLE9BQU8sS0FBS0MsTUFBTCxFQUFiO0FBQUEsVUFDTUMsU0FBU0YsSUFEZixDQURTLENBRWE7O0FBRXRCLGFBQU9FLE1BQVA7QUFDRDs7O2lDQUVZSixjLEVBQWdCO0FBQzNCLFVBQU1LLFNBQVMsS0FBS0MsU0FBTCxFQUFmO0FBQUEsVUFDTUMsZ0NBQWdDUCxlQUFlUSxrQkFBZixFQUR0QztBQUFBLFVBRU1DLDJDQUEyQ0osT0FBT0ssY0FBUCxDQUFzQkgsNkJBQXRCLENBRmpEO0FBQUEsVUFHTUksYUFBYUYsd0NBSG5CLENBRDJCLENBSWtDOztBQUU3RCxhQUFPRSxVQUFQO0FBQ0Q7Ozs2QkFFUVgsYyxFQUFnQlksUSxFQUFVO0FBQ2pDLFVBQU1SLFNBQVMsS0FBS1MsUUFBTCxFQUFmOztBQUVBLFVBQUlULE1BQUosRUFBWTtBQUNWLFlBQU1PLGFBQWEsS0FBS0csWUFBTCxDQUFrQmQsY0FBbEIsQ0FBbkI7O0FBRUEsWUFBSSxDQUFDVyxVQUFMLEVBQWlCO0FBQ2YsY0FBTUksdUJBQXVCLEtBQUtDLHVCQUFMLENBQTZCaEIsY0FBN0IsQ0FBN0I7O0FBRUEsY0FBSWUseUJBQXlCLElBQTdCLEVBQW1DO0FBQ2pDLGdCQUFNZCxxQ0FBcUNjLHFCQUFxQkUscUNBQXJCLENBQTJEakIsY0FBM0QsQ0FBM0M7O0FBRUFlLGlDQUFxQkcsU0FBckIsQ0FBK0JsQixjQUEvQixFQUErQ0Msa0NBQS9DO0FBQ0QsV0FKRCxNQUlPO0FBQ0xXLHFCQUFTTyxnQkFBVCxDQUEwQm5CLGNBQTFCO0FBQ0Q7O0FBRUQsZUFBS29CLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7OztrQ0FFYUMsUyxFQUFXQyxtQixFQUFxQkMsa0IsRUFBb0I7QUFDaEUsVUFBSUEsdUJBQXVCLElBQTNCLEVBQWlDO0FBQy9CLFlBQU1YLFdBQVdTLFVBQVVHLFdBQVYsRUFBakI7QUFBQSxZQUNNQyxnQkFBZ0JILG1CQUR0QixDQUQrQixDQUVhOztBQUU1Q1YsaUJBQVNjLGVBQVQsQ0FBeUJELGFBQXpCO0FBQ0Q7QUFDRjs7OzZCQUVRRSxJLEVBQU1DLGMsRUFBZ0JDLGEsRUFBZTtBQUM1QyxVQUFJQSxrQkFBa0IsSUFBdEIsRUFBNEI7QUFDMUIsWUFBTWpCLFdBQVdlLEtBQUtILFdBQUwsRUFBakI7QUFBQSxZQUNNTSxXQUFXRixjQURqQixDQUQwQixDQUVROztBQUVsQ2hCLGlCQUFTbUIsVUFBVCxDQUFvQkQsUUFBcEI7QUFDRDtBQUNGOzs7MkJBRU07QUFDTCxXQUFLRSxRQUFMLENBQWMsTUFBZDtBQUNEOzs7NEJBRU87QUFDTixXQUFLQyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU0vQixPQUFPLEtBQUtnQyxRQUFMLENBQWMsTUFBZCxDQUFiOztBQUVBLGFBQU9oQyxJQUFQO0FBQ0Q7OztpREFFNEJpQyxnQixFQUFrQkMsVSxFQUFZQyxVLEVBQVk7QUFDckUsVUFBTTFDLFdBQVd3QyxpQkFBaUJHLEdBQWpCLENBQXFCLFVBQVN0QyxjQUFULEVBQXlCO0FBQzdELFlBQU11QyxVQUFVLEVBQWhCO0FBQUEsWUFDTUMscUJBQXFCeEMsZUFBZXlDLE9BQWYsRUFEM0I7QUFBQSxZQUVNQywyQkFBMkJGLGtCQUZqQztBQUFBLFlBRXNEO0FBQ2hERyxtQ0FBMkIsSUFIakM7O0FBS0FKLGdCQUFRRyx3QkFBUixJQUFvQ0Msd0JBQXBDOztBQUVBLGVBQU9KLE9BQVA7QUFDRCxPQVRnQixDQUFqQjs7QUFXQSxhQUFPNUMsUUFBUDtBQUNEOzs7bUNBRXFCaUQsVSxFQUFZO0FBQzFCLFVBQUVDLFFBQUYsR0FBZUQsVUFBZixDQUFFQyxRQUFGO0FBQUEsVUFDQW5ELGFBREEsR0FDZ0JtRCxRQURoQixDQUQwQixDQUVBOztBQUVoQyxhQUFPdEQsUUFBUXVELGNBQVIsQ0FBdUJ0RCxVQUF2QixFQUFtQ29ELFVBQW5DLEVBQStDbEQsYUFBL0MsQ0FBUDtBQUNEOzs7O0VBdkhzQkosVTs7QUEwSHpCeUQsT0FBT0MsTUFBUCxDQUFjeEQsVUFBZCxFQUEwQjtBQUN4QnlELFdBQVMsS0FEZTtBQUV4QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGSztBQUt4QkMscUJBQW1CLENBQ2pCLFVBRGlCO0FBTEssQ0FBMUI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUI5RCxVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBEcm9wVGFyZ2V0ID0gcmVxdWlyZSgnLi9kcm9wVGFyZ2V0Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCB9ID0gZWFzeTtcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgcmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKHBhdGhNYXBzLCBkb25lKSB7IGRvbmUoKTsgfSApIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0TW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyOyAgLy8vXG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BUYXJnZXRNb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpIHtcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgaWYgKG1vdmVkRmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICAgIFxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZTsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSdWJiaXNoQmluLCBwcm9wZXJ0aWVzLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFJ1YmJpc2hCaW4sIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAncnViYmlzaEJpbidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25SZW1vdmUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=