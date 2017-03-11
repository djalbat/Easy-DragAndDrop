'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

var RubbishBin = function (_DroppableElement) {
  _inherits(RubbishBin, _DroppableElement);

  function RubbishBin(selector, removeHandler) {
    _classCallCheck(this, RubbishBin);

    var droppableElementMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, droppableElementMoveHandler));

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
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

          if (droppableElementToBeMarked !== null) {
            var directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
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
    key: 'clone',
    value: function clone(selector, removeHandler) {
      return Element.clone(RubbishBin, selector, removeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, removeHandler) {
      return Element.fromHTML(RubbishBin, html, removeHandler);
    }
  }]);

  return RubbishBin;
}(DroppableElement);

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvQmVNYXJrZWQiLCJleHBsb3JlciIsImlzTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRNYXJrZXIiLCJhZGRNYXJrZXJJblBsYWNlIiwicmVtb3ZlTWFya2VyIiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsImdldEV4cGxvcmVyIiwiZGlyZWN0b3J5UGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImZpbGUiLCJzb3VyY2VGaWxlUGF0aCIsIm1vdmVkRmlsZVBhdGgiLCJmaWxlUGF0aCIsInJlbW92ZUZpbGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJkcmFnZ2FibGVFbnRyaWVzIiwic291cmNlUGF0aCIsInRhcmdldFBhdGgiLCJwYXRoTWFwcyIsIm1hcCIsInBhdGhNYXAiLCJkcmFnZ2FibGVFbnRyeVBhdGgiLCJnZXRQYXRoIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwidGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiY2xvbmUiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7O0FBR0EsSUFBTUMsbUJBQW1CRixRQUFRLG9CQUFSLENBQXpCOztJQUVNRyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUM7QUFBQTs7QUFDbkMsUUFBTUMsOEJBQThCRCxhQUFwQyxDQURtQyxDQUNpQjs7QUFEakIsd0hBRzdCRCxRQUg2QixFQUduQkUsMkJBSG1COztBQUtuQyxVQUFLQyxLQUFMO0FBTG1DO0FBTXBDOzs7O3lDQUVvQjtBQUNuQixVQUFNQyxrQkFBa0IsSUFBeEI7O0FBRUEsYUFBT0EsZUFBUDtBQUNEOzs7MERBRXFDQyxjLEVBQWdCO0FBQ3BELFVBQU1DLHFDQUFxQyxJQUEzQyxDQURvRCxDQUNIOztBQUVqRCxhQUFPQSxrQ0FBUDtBQUNEOzs7OEJBRVNELGMsRUFBZ0JDLGtDLEVBQW9DO0FBQzVELFdBQUtDLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS0osS0FBTDtBQUNEOzs7K0JBRVU7QUFDVCxVQUFNSSxPQUFPLEtBQUtDLE1BQUwsRUFBYjtBQUFBLFVBQ01DLFNBQVNGLElBRGYsQ0FEUyxDQUVhOztBQUV0QixhQUFPRSxNQUFQO0FBQ0Q7OztpQ0FFWUosYyxFQUFnQjtBQUMzQixVQUFNSyxTQUFTLEtBQUtDLFNBQUwsRUFBZjtBQUFBLFVBQ01DLGdDQUFnQ1AsZUFBZVEsa0JBQWYsRUFEdEM7QUFBQSxVQUVNQywyQ0FBMkNKLE9BQU9LLGNBQVAsQ0FBc0JILDZCQUF0QixDQUZqRDtBQUFBLFVBR01JLGFBQWFGLHdDQUhuQixDQUQyQixDQUlrQzs7QUFFN0QsYUFBT0UsVUFBUDtBQUNEOzs7NkJBRVFYLGMsRUFBZ0JZLFEsRUFBVTtBQUNqQyxVQUFNUixTQUFTLEtBQUtTLFFBQUwsRUFBZjs7QUFFQSxVQUFJVCxNQUFKLEVBQVk7QUFDVixZQUFNTyxhQUFhLEtBQUtHLFlBQUwsQ0FBa0JkLGNBQWxCLENBQW5COztBQUVBLFlBQUksQ0FBQ1csVUFBTCxFQUFpQjtBQUNmLGNBQU1JLDZCQUE2QixLQUFLQyw2QkFBTCxDQUFtQ2hCLGNBQW5DLENBQW5DOztBQUVBLGNBQUllLCtCQUErQixJQUFuQyxFQUF5QztBQUN2QyxnQkFBTWQscUNBQXFDYywyQkFBMkJFLHFDQUEzQixDQUFpRWpCLGNBQWpFLENBQTNDOztBQUVBZSx1Q0FBMkJHLFNBQTNCLENBQXFDbEIsY0FBckMsRUFBcURDLGtDQUFyRDtBQUNELFdBSkQsTUFJTztBQUNMVyxxQkFBU08sZ0JBQVQsQ0FBMEJuQixjQUExQjtBQUNEOztBQUVELGVBQUtvQixZQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7a0NBRWFDLFMsRUFBV0MsbUIsRUFBcUJDLGtCLEVBQW9CO0FBQ2hFLFVBQUlBLHVCQUF1QixJQUEzQixFQUFpQztBQUMvQixZQUFNWCxXQUFXUyxVQUFVRyxXQUFWLEVBQWpCO0FBQUEsWUFDTUMsZ0JBQWdCSCxtQkFEdEIsQ0FEK0IsQ0FFYTs7QUFFNUNWLGlCQUFTYyxlQUFULENBQXlCRCxhQUF6QjtBQUNEO0FBQ0Y7Ozs2QkFFUUUsSSxFQUFNQyxjLEVBQWdCQyxhLEVBQWU7QUFDNUMsVUFBSUEsa0JBQWtCLElBQXRCLEVBQTRCO0FBQzFCLFlBQU1qQixXQUFXZSxLQUFLSCxXQUFMLEVBQWpCO0FBQUEsWUFDTU0sV0FBV0YsY0FEakIsQ0FEMEIsQ0FFUTs7QUFFbENoQixpQkFBU21CLFVBQVQsQ0FBb0JELFFBQXBCO0FBQ0Q7QUFDRjs7OzJCQUVNO0FBQ0wsV0FBS0UsUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0MsV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNL0IsT0FBTyxLQUFLZ0MsUUFBTCxDQUFjLE1BQWQsQ0FBYjs7QUFFQSxhQUFPaEMsSUFBUDtBQUNEOzs7aURBRTRCaUMsZ0IsRUFBa0JDLFUsRUFBWUMsVSxFQUFZO0FBQ3JFLFVBQU1DLFdBQVdILGlCQUFpQkksR0FBakIsQ0FBcUIsVUFBU3ZDLGNBQVQsRUFBeUI7QUFDN0QsWUFBTXdDLFVBQVUsRUFBaEI7QUFBQSxZQUNNQyxxQkFBcUJ6QyxlQUFlMEMsT0FBZixFQUQzQjtBQUFBLFlBRU1DLDJCQUEyQkYsa0JBRmpDO0FBQUEsWUFFc0Q7QUFDaERHLG1DQUEyQixJQUhqQzs7QUFLQUosZ0JBQVFHLHdCQUFSLElBQW9DQyx3QkFBcEM7O0FBRUEsZUFBT0osT0FBUDtBQUNELE9BVGdCLENBQWpCOztBQVdBLGFBQU9GLFFBQVA7QUFDRDs7OzBCQUVZM0MsUSxFQUFVQyxhLEVBQWU7QUFDcEMsYUFBT0osUUFBUXFELEtBQVIsQ0FBY25ELFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxhQUFwQyxDQUFQO0FBQ0Q7Ozs2QkFFZWtELEksRUFBTWxELGEsRUFBZTtBQUNuQyxhQUFPSixRQUFRdUQsUUFBUixDQUFpQnJELFVBQWpCLEVBQTZCb0QsSUFBN0IsRUFBbUNsRCxhQUFuQyxDQUFQO0FBQ0Q7Ozs7RUF4SHNCSCxnQjs7QUEySHpCdUQsT0FBT0MsT0FBUCxHQUFpQnZELFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG5jb25zdCBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICBjb25zdCBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyOyAgLy8vXG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaXNPcGVuKCksXG4gICAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpIHtcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgaWYgKG1vdmVkRmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICAgIFxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=