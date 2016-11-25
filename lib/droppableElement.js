'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    Entry = require('./explorer/entry'),
    DragEvent = require('./dragEvent'),
    FileMarker = require('./explorer/entry/fileMarker'),
    DirectoryMarker = require('./explorer/entry/directoryMarker');

var DroppableElement = function (_Element) {
  _inherits(DroppableElement, _Element);

  function DroppableElement(selector, moveHandler) {
    _classCallCheck(this, DroppableElement);

    var _this = _possibleConstructorReturn(this, (DroppableElement.__proto__ || Object.getPrototypeOf(DroppableElement)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.droppableElements = [];
    return _this;
  }

  _createClass(DroppableElement, [{
    key: 'addDroppableElement',
    value: function addDroppableElement(droppableElement) {
      this.droppableElements.push(droppableElement);
    }
  }, {
    key: 'removeDroppableElement',
    value: function removeDroppableElement(droppableElement) {
      var index = indexOf(this.droppableElements, droppableElement),
          found = index !== -1;

      if (found) {
        this.droppableElements.splice(index, 1);
      }
    }
  }, {
    key: 'isOverlappingDraggableElement',
    value: function isOverlappingDraggableElement(draggableElementDraggingBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds),
          overlappingDraggableElement = boundsOverlappingDraggableElement;

      return overlappingDraggableElement;
    }
  }, {
    key: 'dragEventHandler',
    value: function dragEventHandler(dragEvent) {
      var action = dragEvent.getAction(),
          draggableElement = dragEvent.getDraggableElement(),
          entry = draggableElement,
          ///
      startDragging = false;

      switch (action) {
        case DragEvent.actions.START_DRAGGING:
          startDragging = this.startDragging(entry);
          break;

        case DragEvent.actions.STOP_DRAGGING:
          this.stopDragging(entry);
          break;

        case DragEvent.actions.DRAGGING:
          this.dragging(entry);
          break;
      }

      return startDragging;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(entry) {
      var startDragging = false,
          marked = this.isMarked();

      if (!marked) {
        this.addMarker(entry);

        startDragging = true;
      }

      return startDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(entry) {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(entry) {
      var marked = this.isMarked();

      if (marked) {
        var notToHaveMarker = !this.isToHaveMarker(entry);

        if (notToHaveMarker) {
          var droppableElementToHaveMarker = this.getDroppableElementToHaveMarker(entry);

          if (droppableElementToHaveMarker !== null) {
            droppableElementToHaveMarker.addMarker(entry);

            this.removeMarker();
          }
        }
      } else {
        var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

        droppableElementHavingMarker.dragging(entry);

        var droppableElementHavingMarkerIsNotToHaveMarker = !droppableElementHavingMarker.isToBeMarked(entry);

        if (droppableElementHavingMarkerIsNotToHaveMarker) {
          droppableElementHavingMarker.removeMarker();

          this.addMarkerInPlace(entry);
        }
      }
    }
  }, {
    key: 'isToHaveMarker',
    value: function isToHaveMarker(entry) {
      var bounds = this.getBounds(),
          draggingBounds = entry.getDraggingBounds(),
          overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
          toHaveMarker = overlappingDraggingBounds; ///

      return toHaveMarker;
    }
  }, {
    key: 'getDroppableElementToHaveMarker',
    value: function getDroppableElementToHaveMarker(entry) {
      var droppableElementToHaveMarker = this.droppableElements.reduce(function (droppableElementToHaveMarker, droppableElement) {
        if (droppableElementToHaveMarker === null) {
          if (droppableElement.isToBeMarked(entry)) {
            droppableElementToHaveMarker = droppableElement;
          }
        }

        return droppableElementToHaveMarker;
      }, null);

      return droppableElementToHaveMarker;
    }
  }, {
    key: 'getDroppableElementHavingMarker',
    value: function getDroppableElementHavingMarker() {
      var droppableElementHavingMarker = this.droppableElements.reduce(function (droppableElementHavingMarker, droppableElement) {
        if (droppableElementHavingMarker === null) {
          if (droppableElement.isMarked()) {
            droppableElementHavingMarker = droppableElement;
          }
        }

        return droppableElementHavingMarker;
      }, null);

      return droppableElementHavingMarker;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry) {
      var entryName = entry.getName(),
          entryType = entry.getType(),
          markerName = entryName,
          ///
      marker;

      switch (entryType) {
        case Entry.types.FILE:
          marker = FileMarker.clone(markerName);
          break;

        case Entry.types.DIRECTORY:
          marker = DirectoryMarker.clone(markerName);
          break;
      }

      this.append(marker);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var marker = this.retrieveMarker();

      marker.remove();
    }
  }, {
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarker();
      } else {
        var droppableElementHavingMarker = this.getDroppableElementHavingMarker();

        droppableElementHavingMarker.removeMarker();
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marker = this.retrieveMarker(),
          marked = marker !== null; ///

      return marked;
    }
  }, {
    key: 'retrieveMarker',
    value: function retrieveMarker() {
      var childElements = this.childElements(),
          marker = childElements.reduce(function (marker, childElement) {
        if (marker === null) {
          if (childElement instanceof FileMarker || childElement instanceof DirectoryMarker) {
            marker = childElement; ///
          }
        }

        return marker;
      }, null);

      return marker;
    }
  }, {
    key: 'moveEntries',
    value: function moveEntries(entries, sourcePath, targetPath, done) {
      var entryPathMaps = entries.map(function (entry) {
        var entryPath = entry.getPath(),
            sourceEntryPath = entryPath,
            ///
        targetEntryPath = targetPath === null ? null : util.replaceTopPath(entryPath, sourcePath, targetPath); ///

        var entryPathMap = {};

        entryPathMap[sourceEntryPath] = targetEntryPath;

        return entryPathMap;
      });

      this.moveHandler(entryPathMaps, function () {
        entries.forEach(function (entry) {
          var entryPath = entry.getPath(),
              sourcePath = entryPath,
              ///
          pathMap = find(entryPathMaps, function (entryPathMap) {
            var sourceEntryPath = sourcePath,
                movedPath = entryPathMap[sourceEntryPath],
                found = movedPath !== undefined;

            return found;
          }),
              movedPath = pathMap[sourcePath];

          this.moveEntry(entry, sourcePath, movedPath);
        }.bind(this));
      }.bind(this));

      done();
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, movedPath) {
      var entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourcePath, movedPath) : this.moveFile(entry, sourcePath, movedPath);
    }
  }]);

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

function indexOf(array, element) {
  var index = -1;

  array.some(function (currentElement, currentElementIndex) {
    if (currentElement === element) {
      index = currentElementIndex;

      return true;
    } else {
      return false;
    }
  });

  return index;
}

function find(array, cb) {
  var element = null;

  array.some(function (currentElement) {
    if (cb(currentElement)) {
      element = currentElement;

      return true;
    } else {
      return false;
    }
  });

  return element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJhY3Rpb24iLCJnZXRBY3Rpb24iLCJkcmFnZ2FibGVFbGVtZW50IiwiZ2V0RHJhZ2dhYmxlRWxlbWVudCIsImVudHJ5Iiwic3RhcnREcmFnZ2luZyIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsIlNUT1BfRFJBR0dJTkciLCJzdG9wRHJhZ2dpbmciLCJEUkFHR0lORyIsImRyYWdnaW5nIiwibWFya2VkIiwiaXNNYXJrZWQiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJHbG9iYWxseSIsIm5vdFRvSGF2ZU1hcmtlciIsImlzVG9IYXZlTWFya2VyIiwiZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciIsImdldERyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIiLCJyZW1vdmVNYXJrZXIiLCJkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyIiwiZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciIsImRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXJJc05vdFRvSGF2ZU1hcmtlciIsImlzVG9CZU1hcmtlZCIsImFkZE1hcmtlckluUGxhY2UiLCJkcmFnZ2luZ0JvdW5kcyIsImdldERyYWdnaW5nQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kcyIsInRvSGF2ZU1hcmtlciIsInJlZHVjZSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJjaGlsZEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50IiwiZW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsImVudHJ5UGF0aE1hcHMiLCJtYXAiLCJlbnRyeVBhdGgiLCJnZXRQYXRoIiwic291cmNlRW50cnlQYXRoIiwidGFyZ2V0RW50cnlQYXRoIiwicmVwbGFjZVRvcFBhdGgiLCJlbnRyeVBhdGhNYXAiLCJmb3JFYWNoIiwicGF0aE1hcCIsImZpbmQiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRW50cnkiLCJiaW5kIiwiZW50cnlJc0RpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwibW92ZURpcmVjdG9yeSIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxrQkFBUixDQURaO0FBQUEsSUFFSUksWUFBWUosUUFBUSxhQUFSLENBRmhCO0FBQUEsSUFHSUssYUFBYUwsUUFBUSw2QkFBUixDQUhqQjtBQUFBLElBSUlNLGtCQUFrQk4sUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTU8s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QUtPLFFBQUwsQ0FBY2hFLEtBQWQsRUFBcUIyQyxVQUFyQixFQUFpQ2MsU0FBakMsQ0FGSjtBQUdEOzs7O0VBOU80QnBGLE87O0FBaVAvQjRGLE9BQU9DLE9BQVAsR0FBaUJ2RixnQkFBakI7O0FBRUEsU0FBU08sT0FBVCxDQUFpQmlGLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQztBQUMvQixNQUFJbkYsUUFBUSxDQUFDLENBQWI7O0FBRUFrRixRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QkMsbUJBQXpCLEVBQThDO0FBQ3ZELFFBQUlELG1CQUFtQkYsT0FBdkIsRUFBZ0M7QUFDOUJuRixjQUFRc0YsbUJBQVI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU90RixLQUFQO0FBQ0Q7O0FBRUQsU0FBU3VFLElBQVQsQ0FBY1csS0FBZCxFQUFxQkssRUFBckIsRUFBeUI7QUFDdkIsTUFBSUosVUFBVSxJQUFkOztBQUVBRCxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QjtBQUNsQyxRQUFJRSxHQUFHRixjQUFILENBQUosRUFBd0I7QUFDdEJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0QiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50O1xuICB9XG5cbiAgZHJhZ0V2ZW50SGFuZGxlcihkcmFnRXZlbnQpIHtcbiAgICB2YXIgYWN0aW9uID0gZHJhZ0V2ZW50LmdldEFjdGlvbigpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50ID0gZHJhZ0V2ZW50LmdldERyYWdnYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgZW50cnkgPSBkcmFnZ2FibGVFbGVtZW50LCAgLy8vXG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLlNUQVJUX0RSQUdHSU5HOlxuICAgICAgICBzdGFydERyYWdnaW5nID0gdGhpcy5zdGFydERyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RPUF9EUkFHR0lORzpcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5EUkFHR0lORzpcbiAgICAgICAgdGhpcy5kcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZW50cnkpIHtcbiAgICB2YXIgc3RhcnREcmFnZ2luZyA9IGZhbHNlLFxuICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKCFtYXJrZWQpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VyKGVudHJ5KTtcblxuICAgICAgc3RhcnREcmFnZ2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0RHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZW50cnkpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBkcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdmFyIG5vdFRvSGF2ZU1hcmtlciA9ICF0aGlzLmlzVG9IYXZlTWFya2VyKGVudHJ5KTtcblxuICAgICAgaWYgKG5vdFRvSGF2ZU1hcmtlcikge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCk7XG5cbiAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuZHJhZ2dpbmcoZW50cnkpO1xuXG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcklzTm90VG9IYXZlTWFya2VyID0gIWRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIuaXNUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXJJc05vdFRvSGF2ZU1hcmtlcikge1xuICAgICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShlbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNUb0hhdmVNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZHJhZ2dpbmdCb3VuZHMgPSBlbnRyeS5nZXREcmFnZ2luZ0JvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnaW5nQm91bmRzKSxcbiAgICAgICAgdG9IYXZlTWFya2VyID0gb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9IYXZlTWFya2VyO1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlcihlbnRyeSkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvSGF2ZU1hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaXNUb0JlTWFya2VkKGVudHJ5KSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9IYXZlTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0hhdmVNYXJrZXI7XG4gIH1cblxuICBnZXREcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyKCkge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKSkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXIgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRIYXZpbmdNYXJrZXI7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlciA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudEhhdmluZ01hcmtlcigpO1xuXG4gICAgICBkcm9wcGFibGVFbGVtZW50SGF2aW5nTWFya2VyLnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgIG1hcmtlZCA9IChtYXJrZXIgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygpLFxuICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZXIsIGNoaWxkRWxlbWVudCkge1xuICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRmlsZU1hcmtlcilcbiAgICAgICAgICAgICAgICB8fCAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSkge1xuICAgICAgICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3BQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuICAgICAgXG4gICAgICB2YXIgZW50cnlQYXRoTWFwID0ge307XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuICAgICAgXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuICAgICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oZW50cnlQYXRoTWFwKSB7XG4gICAgICAgICAgICAgIHZhciBzb3VyY2VFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7ICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIFxuICAgIGRvbmUoKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNiKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2IoY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=