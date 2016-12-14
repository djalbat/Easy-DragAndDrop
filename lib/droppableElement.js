'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    Entry = require('./explorer/entry'),
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
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

      return overlappingDraggableEntry;
    }
  }, {
    key: 'getDroppableElementToBeMarked',
    value: function getDroppableElementToBeMarked(draggableEntry) {
      var droppableElementToBeMarked = this.droppableElements.reduce(function (droppableElementToBeMarked, droppableElement) {
        if (droppableElementToBeMarked === null) {
          if (droppableElement.isToBeMarked(draggableEntry)) {
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
    key: 'moveDraggableEntries',
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

      this.moveHandler(pathMaps, function () {
        draggableEntries.forEach(function (draggableEntry) {
          var draggableEntryPath = draggableEntry.getPath(),
              sourcePath = draggableEntryPath,
              ///
          pathMap = find(pathMaps, function (pathMap) {
            var sourceDraggableEntryPath = sourcePath,
                movedPath = pathMap[sourceDraggableEntryPath],
                found = movedPath !== undefined;

            return found;
          }),
              movedPath = pathMap[sourcePath];

          this.moveDraggableEntry(draggableEntry, sourcePath, movedPath);
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, movedPath) {
      var draggableEntryDirectory = draggableEntry.isDirectory();

      if (draggableEntryDirectory) {
        var directory = draggableEntry; ///

        this.moveDirectory(directory, sourcePath, movedPath);
      } else {
        var file = draggableEntry; ///

        this.moveFile(file, sourcePath, movedPath);
      }
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

function find(array, callback) {
  var element = null;

  array.some(function (currentElement) {
    if (callback(currentElement)) {
      element = currentElement;

      return true;
    } else {
      return false;
    }
  });

  return element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsInJlZHVjZSIsImlzVG9CZU1hcmtlZCIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJkcm9wcGFibGVFbGVtZW50TWFya2VkIiwiaXNNYXJrZWQiLCJlbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImRyYWdnYWJsZUVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImRvbmUiLCJwYXRoTWFwcyIsInBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMiLCJmb3JFYWNoIiwiZHJhZ2dhYmxlRW50cnlQYXRoIiwiZ2V0UGF0aCIsInBhdGhNYXAiLCJmaW5kIiwic291cmNlRHJhZ2dhYmxlRW50cnlQYXRoIiwibW92ZWRQYXRoIiwidW5kZWZpbmVkIiwibW92ZURyYWdnYWJsZUVudHJ5IiwiYmluZCIsImRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5IiwiaXNEaXJlY3RvcnkiLCJkaXJlY3RvcnkiLCJtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5IiwiZWxlbWVudCIsInNvbWUiLCJjdXJyZW50RWxlbWVudCIsImN1cnJlbnRFbGVtZW50SW5kZXgiLCJjYWxsYmFjayJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLE9BQU9GLFFBQVEsUUFBUixDQUFYO0FBQUEsSUFDSUcsUUFBUUgsUUFBUSxrQkFBUixDQURaO0FBQUEsSUFFSUksYUFBYUosUUFBUSw2QkFBUixDQUZqQjtBQUFBLElBR0lLLGtCQUFrQkwsUUFBUSxrQ0FBUixDQUh0Qjs7SUFLTU0sZ0I7OztBQUNKLDRCQUFZQyxRQUFaLEVBQXNCQyxXQUF0QixFQUFtQztBQUFBOztBQUFBLG9JQUMzQkQsUUFEMkI7O0FBR2pDLFVBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFVBQUtDLGlCQUFMLEdBQXlCLEVBQXpCO0FBTGlDO0FBTWxDOzs7O3dDQUVtQkMsZ0IsRUFBa0I7QUFDcEMsV0FBS0QsaUJBQUwsQ0FBdUJFLElBQXZCLENBQTRCRCxnQkFBNUI7QUFDRDs7OzJDQUVzQkEsZ0IsRUFBa0I7QUFDdkMsVUFBSUUsUUFBUUMsUUFBUSxLQUFLSixpQkFBYixFQUFnQ0MsZ0JBQWhDLENBQVo7QUFBQSxVQUNJSSxRQUFTRixVQUFVLENBQUMsQ0FEeEI7O0FBR0EsVUFBSUUsS0FBSixFQUFXO0FBQ1QsYUFBS0wsaUJBQUwsQ0FBdUJNLE1BQXZCLENBQThCSCxLQUE5QixFQUFxQyxDQUFyQztBQUNEO0FBQ0Y7Oztn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Si9CcUUsT0FBT0MsT0FBUCxHQUFpQmpFLGdCQUFqQjs7QUFFQSxTQUFTTyxPQUFULENBQWlCMkQsS0FBakIsRUFBd0JDLE9BQXhCLEVBQWlDO0FBQy9CLE1BQUk3RCxRQUFRLENBQUMsQ0FBYjs7QUFFQTRELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCQyxtQkFBekIsRUFBOEM7QUFDdkQsUUFBSUQsbUJBQW1CRixPQUF2QixFQUFnQztBQUM5QjdELGNBQVFnRSxtQkFBUjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT2hFLEtBQVA7QUFDRDs7QUFFRCxTQUFTOEMsSUFBVCxDQUFjYyxLQUFkLEVBQXFCSyxRQUFyQixFQUErQjtBQUM3QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLFNBQVNGLGNBQVQsQ0FBSixFQUE4QjtBQUM1QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHZhciBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIHZhciBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBwYXRoTWFwID0gZmluZChwYXRoTWFwcywgZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICB2YXIgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSxcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgICAgdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgdmFyIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlID0gZHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICB0aGlzLm1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=