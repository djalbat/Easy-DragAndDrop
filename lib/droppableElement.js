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

        case DragEvent.actions.ESCAPE_DRAGGING:
          this.escapeDragging(entry);
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
        var toBeMarked = this.isToBeMarked(entry);

        if (!toBeMarked) {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

          if (droppableElementToBeMarked !== null) {
            droppableElementToBeMarked.addMarker(entry);

            this.removeMarker();
          }
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(entry);
      }
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(entry) {
      var bounds = this.getBounds(),
          draggingBounds = entry.getDraggingBounds(),
          overlappingDraggingBounds = bounds.areOverlapping(draggingBounds),
          toBeMarked = overlappingDraggingBounds; ///

      return toBeMarked;
    }
  }, {
    key: 'getDroppableElementToBeMarked',
    value: function getDroppableElementToBeMarked(entry) {
      var droppableElementToBeMarked = this.droppableElements.reduce(function (droppableElementToBeMarked, droppableElement) {
        if (droppableElementToBeMarked === null) {
          if (droppableElement.isToBeMarked(entry)) {
            ///
            droppableElementToBeMarked = droppableElement;
          }
        }

        return droppableElementToBeMarked;
      }, null);

      return droppableElementToBeMarked;
    }
  }, {
    key: 'getMarkedDroppableElement',
    value: function getMarkedDroppableElement() {
      var markedDroppableElement = this.droppableElements.reduce(function (markedDroppableElement, droppableElement) {
        if (markedDroppableElement === null) {
          var droppableElementMarked = droppableElement.isMarked();

          if (droppableElementMarked) {
            markedDroppableElement = droppableElement;
          }
        }

        return markedDroppableElement;
      }, null);

      return markedDroppableElement;
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
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.removeMarker();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJhY3Rpb24iLCJnZXRBY3Rpb24iLCJkcmFnZ2FibGVFbGVtZW50IiwiZ2V0RHJhZ2dhYmxlRWxlbWVudCIsImVudHJ5Iiwic3RhcnREcmFnZ2luZyIsImFjdGlvbnMiLCJTVEFSVF9EUkFHR0lORyIsIlNUT1BfRFJBR0dJTkciLCJzdG9wRHJhZ2dpbmciLCJEUkFHR0lORyIsImRyYWdnaW5nIiwiRVNDQVBFX0RSQUdHSU5HIiwiZXNjYXBlRHJhZ2dpbmciLCJtYXJrZWQiLCJpc01hcmtlZCIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlckdsb2JhbGx5IiwidG9CZU1hcmtlZCIsImlzVG9CZU1hcmtlZCIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwiZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImRyYWdnaW5nQm91bmRzIiwiZ2V0RHJhZ2dpbmdCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnaW5nQm91bmRzIiwicmVkdWNlIiwiZHJvcHBhYmxlRWxlbWVudE1hcmtlZCIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJjaGlsZEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50IiwiZW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZG9uZSIsImVudHJ5UGF0aE1hcHMiLCJtYXAiLCJlbnRyeVBhdGgiLCJnZXRQYXRoIiwic291cmNlRW50cnlQYXRoIiwidGFyZ2V0RW50cnlQYXRoIiwicmVwbGFjZVRvcFBhdGgiLCJlbnRyeVBhdGhNYXAiLCJmb3JFYWNoIiwicGF0aE1hcCIsImZpbmQiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRW50cnkiLCJiaW5kIiwiZW50cnlJc0RpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwibW92ZURpcmVjdG9yeSIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxrQkFBUixDQURaO0FBQUEsSUFFSUksWUFBWUosUUFBUSxhQUFSLENBRmhCO0FBQUEsSUFHSUssYUFBYUwsUUFBUSw2QkFBUixDQUhqQjtBQUFBLElBSUlNLGtCQUFrQk4sUUFBUSxrQ0FBUixDQUp0Qjs7SUFNTU8sZ0I7OztBQUNKLDRCQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUFtQztBQUFBOztBQUFBLG9JQUMzQkQs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LGdCQUFqQjs7QUFFQSxTQUFTTyxPQUFULENBQWlCZ0YsS0FBakIsRUFBd0JDLE9BQXhCLEVBQWlDO0FBQy9CLE1BQUlsRixRQUFRLENBQUMsQ0FBYjs7QUFFQWlGLFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCQyxtQkFBekIsRUFBOEM7QUFDdkQsUUFBSUQsbUJBQW1CRixPQUF2QixFQUFnQztBQUM5QmxGLGNBQVFxRixtQkFBUjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT3JGLEtBQVA7QUFDRDs7QUFFRCxTQUFTc0UsSUFBVCxDQUFjVyxLQUFkLEVBQXFCSyxFQUFyQixFQUF5QjtBQUN2QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLEdBQUdGLGNBQUgsQ0FBSixFQUF3QjtBQUN0QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50JyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIERyb3BwYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YodGhpcy5kcm9wcGFibGVFbGVtZW50cywgZHJvcHBhYmxlRWxlbWVudCksXG4gICAgICAgIGZvdW5kID0gKGluZGV4ICE9PSAtMSk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudChkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBkcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQsICAvLy9cbiAgICAgICAgc3RhcnREcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RBUlRfRFJBR0dJTkc6XG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuRVNDQVBFX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLmVzY2FwZURyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhlbnRyeSkge1xuICAgIHZhciBzdGFydERyYWdnaW5nID0gZmFsc2UsXG4gICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoIW1hcmtlZCkge1xuICAgICAgdGhpcy5hZGRNYXJrZXIoZW50cnkpO1xuXG4gICAgICBzdGFydERyYWdnaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhlbnRyeSkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGVudHJ5KSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB2YXIgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihlbnRyeSk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZHJhZ2dpbmcoZW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChlbnRyeSkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2luZ0JvdW5kcyA9IGVudHJ5LmdldERyYWdnaW5nQm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dpbmdCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dpbmdCb3VuZHMpLFxuICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2luZ0JvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGVudHJ5KSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5pc1RvQmVNYXJrZWQoZW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gZHJvcHBhYmxlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCkge1xuICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcHBhYmxlRWxlbWVudCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB2YXIgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIG1hcmtlck5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICBtYXJrZXI7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSBGaWxlTWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IERpcmVjdG9yeU1hcmtlci5jbG9uZShtYXJrZXJOYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQobWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyR2xvYmFsbHkoKSB7XG4gICAgdmFyIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgIG1hcmtlZCA9IChtYXJrZXIgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICB2YXIgY2hpbGRFbGVtZW50cyA9IHRoaXMuY2hpbGRFbGVtZW50cygpLFxuICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZXIsIGNoaWxkRWxlbWVudCkge1xuICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRmlsZU1hcmtlcilcbiAgICAgICAgICAgICB8fCAoY2hpbGRFbGVtZW50IGluc3RhbmNlb2YgRGlyZWN0b3J5TWFya2VyKSkge1xuICAgICAgICAgICAgICBtYXJrZXIgPSBjaGlsZEVsZW1lbnQ7ICAvLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBtb3ZlRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcHMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3BQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuICAgICAgXG4gICAgICB2YXIgZW50cnlQYXRoTWFwID0ge307XG5cbiAgICAgIGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdID0gdGFyZ2V0RW50cnlQYXRoO1xuICAgICAgXG4gICAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICAgIH0pO1xuICAgICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihlbnRyeVBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oZW50cnlQYXRoTWFwKSB7XG4gICAgICAgICAgICAgIHZhciBzb3VyY2VFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7ICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIFxuICAgIGRvbmUoKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNiKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2IoY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=