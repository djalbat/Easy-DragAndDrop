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
    key: 'moveEntries',
    value: function moveEntries(entries, sourcePath, targetPath, done) {
      var entryPathMaps = this.draggableEntryPathMapsFromDraggableEntries(entries, sourcePath, targetPath);

      function moveEntriesDone() {
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

        done();
      }

      this.moveHandler(entryPathMaps, moveEntriesDone.bind(this));
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, movedPath) {
      var entryDirectory = entry.isDirectory();

      if (entryDirectory) {
        var directory = entry; ///

        this.moveDirectory(directory, sourcePath, movedPath);
      } else {
        var file = entry; ///

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCIsInJlZHVjZSIsImlzVG9CZU1hcmtlZCIsIm1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJkcm9wcGFibGVFbGVtZW50TWFya2VkIiwiaXNNYXJrZWQiLCJlbnRyeSIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImRvbmUiLCJlbnRyeVBhdGhNYXBzIiwiZHJhZ2dhYmxlRW50cnlQYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzIiwibW92ZUVudHJpZXNEb25lIiwiZm9yRWFjaCIsImVudHJ5UGF0aCIsImdldFBhdGgiLCJwYXRoTWFwIiwiZmluZCIsImVudHJ5UGF0aE1hcCIsInNvdXJjZUVudHJ5UGF0aCIsIm1vdmVkUGF0aCIsInVuZGVmaW5lZCIsIm1vdmVFbnRyeSIsImJpbmQiLCJlbnRyeURpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwiZGlyZWN0b3J5IiwibW92ZURpcmVjdG9yeSIsImZpbGUiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLGFBQWFKLFFBQVEsNkJBQVIsQ0FGakI7QUFBQSxJQUdJSyxrQkFBa0JMLFFBQVEsa0NBQVIsQ0FIdEI7O0lBS01NLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JELFFBRDJCOztBQUdqQyxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLQyxpQkFBTCxHQUF5QixFQUF6QjtBQUxpQztBQU1sQzs7Ozt3Q0FFbUJDLGdCLEVBQWtCO0FBQ3BDLFdBQUtELGlCQUFMLENBQXVCRSxJQUF2QixDQUE0QkQsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0JBLGdCLEVBQWtCO0FBQ3ZDLFVBQUlFLFFBQVFDLFFBQVEsS0FBS0osaUJBQWIsRUFBZ0NDLGdCQUFoQyxDQUFaO0FBQUEsVUFDSUksUUFBU0YsVUFBVSxDQUFDLENBRHhCOztBQUdBLFVBQUlFLEtBQUosRUFBVztBQUNULGFBQUtMLGlCQUFMLENBQXVCTSxNQUF2QixDQUE4QkgsS0FBOUIsRUFBcUMsQ0FBckM7QUFDRDtB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dUUsT0FBT0MsT0FBUCxHQUFpQm5FLGdCQUFqQjs7QUFFQSxTQUFTTyxPQUFULENBQWlCNkQsS0FBakIsRUFBd0JDLE9BQXhCLEVBQWlDO0FBQy9CLE1BQUkvRCxRQUFRLENBQUMsQ0FBYjs7QUFFQThELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCQyxtQkFBekIsRUFBOEM7QUFDdkQsUUFBSUQsbUJBQW1CRixPQUF2QixFQUFnQztBQUM5Qi9ELGNBQVFrRSxtQkFBUjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQUpELE1BSU87QUFDTCxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQ7O0FBVUEsU0FBT2xFLEtBQVA7QUFDRDs7QUFFRCxTQUFTK0MsSUFBVCxDQUFjZSxLQUFkLEVBQXFCSyxRQUFyQixFQUErQjtBQUM3QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLFNBQVNGLGNBQVQsQ0FBSixFQUE4QjtBQUM1QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgbW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHZhciBlbnRyeVBhdGhNYXBzID0gdGhpcy5kcmFnZ2FibGVFbnRyeVBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICBmdW5jdGlvbiBtb3ZlRW50cmllc0RvbmUoKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKGVudHJ5UGF0aE1hcCkge1xuICAgICAgICAgICAgICB2YXIgc291cmNlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcblxuICAgICAgICB0aGlzLm1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gICAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyKGVudHJ5UGF0aE1hcHMsIG1vdmVFbnRyaWVzRG9uZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5RGlyZWN0b3J5ID0gZW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChlbnRyeURpcmVjdG9yeSkge1xuICAgICAgdmFyIGRpcmVjdG9yeSA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmaWxlID0gZW50cnk7IC8vL1xuXG4gICAgICB0aGlzLm1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=