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
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath, removeEmptyParentDirectories) {
      if (movedDirectoryPath === null) {
        var explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(sourceDirectoryPath, removeEmptyParentDirectories);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath, removeEmptyParentDirectories) {
      if (movedFilePath === null) {
        var explorer = file.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFile(filePath, removeEmptyParentDirectories);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImRyYWdnYWJsZUVudHJ5IiwiZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsIm9wZW4iLCJpc09wZW4iLCJtYXJrZWQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsImdldENvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvQmVNYXJrZWQiLCJleHBsb3JlciIsImlzTWFya2VkIiwiaXNUb0JlTWFya2VkIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJnZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsImdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkiLCJhZGRNYXJrZXIiLCJhZGRNYXJrZXJJblBsYWNlIiwicmVtb3ZlTWFya2VyIiwiZGlyZWN0b3J5Iiwic291cmNlRGlyZWN0b3J5UGF0aCIsIm1vdmVkRGlyZWN0b3J5UGF0aCIsInJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMiLCJnZXRFeHBsb3JlciIsImRpcmVjdG9yeVBhdGgiLCJyZW1vdmVEaXJlY3RvcnkiLCJmaWxlIiwic291cmNlRmlsZVBhdGgiLCJtb3ZlZEZpbGVQYXRoIiwiZmlsZVBhdGgiLCJyZW1vdmVGaWxlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwicGF0aE1hcHMiLCJtYXAiLCJwYXRoTWFwIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsInNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCIsInRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCIsImNsb25lIiwiaHRtbCIsImZyb21IVE1MIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLG1CQUFtQkYsUUFBUSxvQkFBUixDQUF2Qjs7SUFFTUcsVTs7O0FBQ0osc0JBQVlDLFFBQVosRUFBc0JDLGFBQXRCLEVBQXFDO0FBQUE7O0FBQ25DLFFBQUlDLDhCQUE4QkQsYUFBbEMsQ0FEbUMsQ0FDZTs7QUFEZix3SEFHN0JELFFBSDZCLEVBR25CRSwyQkFIbUI7O0FBS25DLFVBQUtDLEtBQUw7QUFMbUM7QUFNcEM7Ozs7eUNBRW9CO0FBQ25CLFVBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxhQUFPQSxlQUFQO0FBQ0Q7OzswREFFcUNDLGMsRUFBZ0I7QUFDcEQsVUFBSUMscUNBQXFDLElBQXpDLENBRG9ELENBQ0w7O0FBRS9DLGFBQU9BLGtDQUFQO0FBQ0Q7Ozs4QkFFU0QsYyxFQUFnQkMsa0MsRUFBb0M7QUFDNUQsV0FBS0MsSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLSixLQUFMO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQUlJLE9BQU8sS0FBS0MsTUFBTCxFQUFYO0FBQUEsVUFDSUMsU0FBU0YsSUFEYixDQURTLENBRVc7O0FBRXBCLGFBQU9FLE1BQVA7QUFDRDs7O2lDQUVZSixjLEVBQWdCO0FBQzNCLFVBQUlLLFNBQVMsS0FBS0MsU0FBTCxFQUFiO0FBQUEsVUFDSUMsZ0NBQWdDUCxlQUFlUSxrQkFBZixFQURwQztBQUFBLFVBRUlDLDJDQUEyQ0osT0FBT0ssY0FBUCxDQUFzQkgsNkJBQXRCLENBRi9DO0FBQUEsVUFHSUksYUFBYUYsd0NBSGpCLENBRDJCLENBSWdDOztBQUUzRCxhQUFPRSxVQUFQO0FBQ0Q7Ozs2QkFFUVgsYyxFQUFnQlksUSxFQUFVO0FBQ2pDLFVBQUlSLFNBQVMsS0FBS1MsUUFBTCxFQUFiOztBQUVBLFVBQUlULE1BQUosRUFBWTtBQUNWLFlBQUlPLGFBQWEsS0FBS0csWUFBTCxDQUFrQmQsY0FBbEIsQ0FBakI7O0FBRUEsWUFBSSxDQUFDVyxVQUFMLEVBQWlCO0FBQ2YsY0FBSUksNkJBQTZCLEtBQUtDLDZCQUFMLENBQW1DaEIsY0FBbkMsQ0FBakM7O0FBRUEsY0FBSWUsK0JBQStCLElBQW5DLEVBQXlDO0FBQ3ZDLGdCQUFJZCxxQ0FBcUNjLDJCQUEyQkUscUNBQTNCLENBQWlFakIsY0FBakUsQ0FBekM7O0FBRUFlLHVDQUEyQkcsU0FBM0IsQ0FBcUNsQixjQUFyQyxFQUFxREMsa0NBQXJEO0FBQ0QsV0FKRCxNQUlPO0FBQ0xXLHFCQUFTTyxnQkFBVCxDQUEwQm5CLGNBQTFCO0FBQ0Q7O0FBRUQsZUFBS29CLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7OztrQ0FFYUMsUyxFQUFXQyxtQixFQUFxQkMsa0IsRUFBb0JDLDRCLEVBQThCO0FBQzlGLFVBQUlELHVCQUF1QixJQUEzQixFQUFpQztBQUMvQixZQUFJWCxXQUFXUyxVQUFVSSxXQUFWLEVBQWY7QUFBQSxZQUNJQyxnQkFBZ0JKLG1CQURwQixDQUQrQixDQUVXOztBQUUxQ1YsaUJBQVNlLGVBQVQsQ0FBeUJMLG1CQUF6QixFQUE4Q0UsNEJBQTlDO0FBQ0Q7QUFDRjs7OzZCQUVRSSxJLEVBQU1DLGMsRUFBZ0JDLGEsRUFBZU4sNEIsRUFBOEI7QUFDMUUsVUFBSU0sa0JBQWtCLElBQXRCLEVBQTRCO0FBQzFCLFlBQUlsQixXQUFXZ0IsS0FBS0gsV0FBTCxFQUFmO0FBQUEsWUFDSU0sV0FBV0YsY0FEZixDQUQwQixDQUVNOztBQUVoQ2pCLGlCQUFTb0IsVUFBVCxDQUFvQkQsUUFBcEIsRUFBOEJQLDRCQUE5QjtBQUNEO0FBQ0Y7OzsyQkFFTTtBQUNMLFdBQUtTLFFBQUwsQ0FBYyxNQUFkO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUtDLFdBQUwsQ0FBaUIsTUFBakI7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBSWhDLE9BQU8sS0FBS2lDLFFBQUwsQ0FBYyxNQUFkLENBQVg7O0FBRUEsYUFBT2pDLElBQVA7QUFDRDs7O2lEQUU0QmtDLGdCLEVBQWtCQyxVLEVBQVlDLFUsRUFBWTtBQUNyRSxVQUFJQyxXQUFXSCxpQkFBaUJJLEdBQWpCLENBQXFCLFVBQVN4QyxjQUFULEVBQXlCO0FBQzNELFlBQUl5QyxVQUFVLEVBQWQ7QUFBQSxZQUNJQyxxQkFBcUIxQyxlQUFlMkMsT0FBZixFQUR6QjtBQUFBLFlBRUlDLDJCQUEyQkYsa0JBRi9CO0FBQUEsWUFFb0Q7QUFDaERHLG1DQUEyQixJQUgvQjs7QUFLQUosZ0JBQVFHLHdCQUFSLElBQW9DQyx3QkFBcEM7O0FBRUEsZUFBT0osT0FBUDtBQUNELE9BVGMsQ0FBZjs7QUFXQSxhQUFPRixRQUFQO0FBQ0Q7OzswQkFFWTVDLFEsRUFBVUMsYSxFQUFlO0FBQ3BDLGFBQU9KLFFBQVFzRCxLQUFSLENBQWNwRCxVQUFkLEVBQTBCQyxRQUExQixFQUFvQ0MsYUFBcEMsQ0FBUDtBQUNEOzs7NkJBRWVtRCxJLEVBQU1uRCxhLEVBQWU7QUFDbkMsYUFBT0osUUFBUXdELFFBQVIsQ0FBaUJ0RCxVQUFqQixFQUE2QnFELElBQTdCLEVBQW1DbkQsYUFBbkMsQ0FBUDtBQUNEOzs7O0VBeEhzQkgsZ0I7O0FBMkh6QndELE9BQU9DLE9BQVAsR0FBaUJ4RCxVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIHZhciBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgbWFya2VkID0gb3BlbjsgIC8vL1xuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICghdG9CZU1hcmtlZCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICB2YXIgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHZhciBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShzb3VyY2VEaXJlY3RvcnlQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCwgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICB2YXIgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoLCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICB2YXIgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICBcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICB2YXIgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=