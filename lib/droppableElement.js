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
    value: function isOverlappingDraggableElement(draggableElementCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableElement = bounds.areOverlapping(draggableElementCollapsedBounds),
          overlappingDraggableElement = boundsOverlappingDraggableElement;

      return overlappingDraggableElement;
    }
  }, {
    key: 'dragEventHandler',
    value: function dragEventHandler(dragEvent, done) {
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
          this.stopDragging(entry, done);
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
      var entryPathMaps = this.entryPathMapsFromEntries(entries, sourcePath, targetPath);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudENvbGxhcHNlZEJvdW5kcyIsImJvdW5kcyIsImdldEJvdW5kcyIsImJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCIsImFyZU92ZXJsYXBwaW5nIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiZHJhZ0V2ZW50IiwiZG9uZSIsImFjdGlvbiIsImdldEFjdGlvbiIsImRyYWdnYWJsZUVsZW1lbnQiLCJnZXREcmFnZ2FibGVFbGVtZW50IiwiZW50cnkiLCJzdGFydERyYWdnaW5nIiwiYWN0aW9ucyIsIlNUQVJUX0RSQUdHSU5HIiwiU1RPUF9EUkFHR0lORyIsInN0b3BEcmFnZ2luZyIsIkRSQUdHSU5HIiwiZHJhZ2dpbmciLCJFU0NBUEVfRFJBR0dJTkciLCJlc2NhcGVEcmFnZ2luZyIsImRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkIiwicmVkdWNlIiwiaXNUb0JlTWFya2VkIiwibWFya2VkRHJvcHBhYmxlRWxlbWVudCIsImRyb3BwYWJsZUVsZW1lbnRNYXJrZWQiLCJpc01hcmtlZCIsImVudHJ5TmFtZSIsImdldE5hbWUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibWFya2VyTmFtZSIsIm1hcmtlciIsInR5cGVzIiwiRklMRSIsImNsb25lIiwiRElSRUNUT1JZIiwiYXBwZW5kIiwicmV0cmlldmVNYXJrZXIiLCJyZW1vdmUiLCJtYXJrZWQiLCJyZW1vdmVNYXJrZXIiLCJnZXRNYXJrZWREcm9wcGFibGVFbGVtZW50IiwiY2hpbGRFbGVtZW50cyIsImNoaWxkRWxlbWVudCIsImVudHJpZXMiLCJzb3VyY2VQYXRoIiwidGFyZ2V0UGF0aCIsImVudHJ5UGF0aE1hcHMiLCJlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMiLCJtb3ZlRW50cmllc0RvbmUiLCJmb3JFYWNoIiwiZW50cnlQYXRoIiwiZ2V0UGF0aCIsInBhdGhNYXAiLCJmaW5kIiwiZW50cnlQYXRoTWFwIiwic291cmNlRW50cnlQYXRoIiwibW92ZWRQYXRoIiwidW5kZWZpbmVkIiwibW92ZUVudHJ5IiwiYmluZCIsImVudHJ5SXNEaXJlY3RvcnkiLCJpc0RpcmVjdG9yeSIsIm1vdmVEaXJlY3RvcnkiLCJtb3ZlRmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JELFFBRDJCOztBQUdqQyxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLQyxpQkFBTCxHQUF5QixFQUF6QjtBQUxpQztBQU1sQzs7Ozt3Q0FFbUJDLGdCLEVBQWtCO0FBQ3BDLFdBQUtELGlCQUFMLENBQXVCRSxJQUF2QixDQUE0QkQsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0JBLGdCLEVBQWtCO0FBQ3ZDLFVBQUlFLFFBQVFDLFFBQVEsS0FBS0osaUJBQWIsRUFBZ0NDLGdCQUFoQyxDQUFaO0FBQUEsVUFDSUksUUFBU0YsVUFBVSxDQUFDLENBRHhCOztBQUdBLFVBQUlFLEtBQUosRUFBVztBQUNULGFBQUtMLGlCQUFMLENBQXVCTSxNQUF2QixDQUE4QkgsS0FBOUIsRUFBcUMsQ0FBckM7QUFDRDtBQUNGOzs7a0RBRTZCSSwrQixFQUFpQztBQUM3RCxVQUFJQyxTQUFTLEtBQUtDLFNBQUwsRUFBYjtBQUFBLFVBQ0lDLG9DQUFvQ0YsT0FBT0csY0FBUCxDQUFzQkosK0JBQXRCLENBRHhDO0FBQUEsVUFFSUssOEJBQThCRixpQ0FGbEM7O0FBSUEsYUFBT0UsMkJBQVA7QUFDRDs7O3FDQUVnQkMsUyxFQUFXQyxJLEVBQU07QUFDaEMsVUFBSUMsU0FBU0YsVUFBVUcsU0FBVixFQUFiO0FBQUEsVUFDSUMsbUJBQW1CSixVQUFVSyxtQkFBVixFQUR2QjtBQUFBLFVBRUlDLFFBQVFGLGdCQUZaO0FBQUEsVUFFK0I7QUFDM0JHLHNCQUFnQixLQUhwQjs7QUFLQSxjQUFRTCxNQUFSO0FBQ0UsYUFBS3JCLFVBQVUyQixPQUFWLENBQWtCQyxjQUF2QjtBQUNFRiwwQkFBZ0IsS0FBS0EsYUFBTCxDQUFtQkQsS0FBbkIsQ0FBaEI7QUFDQTs7QUFFRixhQUFLekIsVUFBVTJCLE9BQVYsQ0FBa0JFLGFBQXZCO0FBQ0UsZUFBS0MsWUFBTCxDQUFrQkwsS0FBbEIsRUFBeUJMLElBQXpCO0FBQ0E7O0FBRUYsYUFBS3BCLFVBQVUyQixPQUFWLENBQWtCSSxRQUF2QjtBQUNFLGVBQUtDLFFBQUwsQ0FBY1AsS0FBZDtBQUNBOztBQUVGLGFBQUt6QixVQUFVMkIsT0FBVixDQUFrQk0sZUFBdkI7QUFDRSxlQUFLQyxjQUFMLENBQW9CVCxLQUFwQjtBQUNBO0FBZko7O0FBa0JBLGFBQU9DLGFBQVA7QUFDRDs7O2tEQUU2QkQsSyxFQUFPO0FBQ25DLFVBQUlVLDZCQUE2QixLQUFLN0IsaUJBQUwsQ0FBdUI4QixNQUF2QixDQUE4QixVQUFTRCwwQkFBVCxFQUFxQzVCLGdCQUFyQyxFQUF1RDtBQUNwSCxZQUFJNEIsK0JBQStCLElBQW5DLEVBQXlDO0FBQ3ZDLGNBQUk1QixpQkFBaUI4QixZQUFqQixDQUE4QlosS0FBOUIsQ0FBSixFQUEwQztBQUFFO0FBQzFDVSx5Q0FBNkI1QixnQkFBN0I7QUFDRDtBQUNGOztBQUVELGVBQU80QiwwQkFBUDtBQUNELE9BUmdDLEVBUTlCLElBUjhCLENBQWpDOztBQVVBLGFBQU9BLDBCQUFQO0FBQ0Q7OztnREFFMkI7QUFDMUIsVUFBSUcseUJBQXlCLEtBQUtoQyxpQkFBTCxDQUF1QjhCLE1BQXZCLENBQThCLFVBQVNFLHNCQUFULEVBQWlDL0IsZ0JBQWpDLEVBQW1EO0FBQzVHLFlBQUkrQiwyQkFBMkIsSUFBL0IsRUFBcUM7QUFDbkMsY0FBSUMseUJBQXlCaEMsaUJBQWlCaUMsUUFBakIsRUFBN0I7O0FBRUEsY0FBSUQsc0JBQUosRUFBNEI7QUFDMUJELHFDQUF5Qi9CLGdCQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsZUFBTytCLHNCQUFQO0FBQ0QsT0FWNEIsRUFVMUIsSUFWMEIsQ0FBN0I7O0FBWUEsYUFBT0Esc0JBQVA7QUFDRDs7OzhCQUVTYixLLEVBQU87QUFDZixVQUFJZ0IsWUFBWWhCLE1BQU1pQixPQUFOLEVBQWhCO0FBQUEsVUFDSUMsWUFBWWxCLE1BQU1tQixPQUFOLEVBRGhCO0FBQUEsVUFFSUMsYUFBYUosU0FGakI7QUFBQSxVQUU0QjtBQUN4QkssWUFISjs7QUFLQSxjQUFRSCxTQUFSO0FBQ0UsYUFBSzVDLE1BQU1nRCxLQUFOLENBQVlDLElBQWpCO0FBQ0VGLG1CQUFTN0MsV0FBV2dELEtBQVgsQ0FBaUJKLFVBQWpCLENBQVQ7QUFDQTs7QUFFRixhQUFLOUMsTUFBTWdELEtBQU4sQ0FBWUcsU0FBakI7QUFDRUosbUJBQVM1QyxnQkFBZ0IrQyxLQUFoQixDQUFzQkosVUFBdEIsQ0FBVDtBQUNBO0FBUEo7O0FBVUEsV0FBS00sTUFBTCxDQUFZTCxNQUFaO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQUlBLFNBQVMsS0FBS00sY0FBTCxFQUFiOztBQUVBTixhQUFPTyxNQUFQO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsVUFBSUMsU0FBUyxLQUFLZCxRQUFMLEVBQWI7O0FBRUEsVUFBSWMsTUFBSixFQUFZO0FBQ1YsYUFBS0MsWUFBTDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlqQix5QkFBeUIsS0FBS2tCLHlCQUFMLEVBQTdCOztBQUVBbEIsK0JBQXVCaUIsWUFBdkI7QUFDRDtBQUNGOzs7K0JBRVU7QUFDVCxVQUFJVCxTQUFTLEtBQUtNLGNBQUwsRUFBYjtBQUFBLFVBQ0lFLFNBQVVSLFdBQVcsSUFEekIsQ0FEUyxDQUV1Qjs7QUFFaEMsYUFBT1EsTUFBUDtBQUNEOzs7cUNBRWdCO0FBQ2YsVUFBSUcsZ0JBQWdCLEtBQUtBLGFBQUwsRUFBcEI7QUFBQSxVQUNJWCxTQUFTVyxjQUFjckIsTUFBZCxDQUFxQixVQUFTVSxNQUFULEVBQWlCWSxZQUFqQixFQUErQjtBQUMzRCxZQUFJWixXQUFXLElBQWYsRUFBcUI7QUFDbkIsY0FBS1ksd0JBQXdCekQsVUFBekIsSUFDQ3lELHdCQUF3QnhELGVBRDdCLEVBQytDO0FBQzdDNEMscUJBQVNZLFlBQVQsQ0FENkMsQ0FDckI7QUFDekI7QUFDRjs7QUFFRCxlQUFPWixNQUFQO0FBQ0QsT0FUUSxFQVNOLElBVE0sQ0FEYjs7QUFZQSxhQUFPQSxNQUFQO0FBQ0Q7OztnQ0FFV2EsTyxFQUFTQyxVLEVBQVlDLFUsRUFBWXpDLEksRUFBTTtBQUNqRCxVQUFJMEMsZ0JBQWdCLEtBQUtDLHdCQUFMLENBQThCSixPQUE5QixFQUF1Q0MsVUFBdkMsRUFBbURDLFVBQW5ELENBQXBCOztBQUVBLGVBQVNHLGVBQVQsR0FBMkI7QUFDekJMLGdCQUFRTSxPQUFSLENBQWdCLFVBQVN4QyxLQUFULEVBQWdCO0FBQzlCLGNBQUl5QyxZQUFZekMsTUFBTTBDLE9BQU4sRUFBaEI7QUFBQSxjQUNJUCxhQUFhTSxTQURqQjtBQUFBLGNBQzZCO0FBQ3pCRSxvQkFBVUMsS0FBS1AsYUFBTCxFQUFvQixVQUFTUSxZQUFULEVBQXVCO0FBQ25ELGdCQUFJQyxrQkFBa0JYLFVBQXRCO0FBQUEsZ0JBQ0lZLFlBQVlGLGFBQWFDLGVBQWIsQ0FEaEI7QUFBQSxnQkFFSTVELFFBQVM2RCxjQUFjQyxTQUYzQjs7QUFJQSxtQkFBTzlELEtBQVA7QUFDRCxXQU5TLENBRmQ7QUFBQSxjQVNJNkQsWUFBWUosUUFBUVIsVUFBUixDQVRoQjs7QUFXQSxlQUFLYyxTQUFMLENBQWVqRCxLQUFmLEVBQXNCbUMsVUFBdEIsRUFBa0NZLFNBQWxDO0FBQ0QsU0FiZSxDQWFkRyxJQWJjLENBYVQsSUFiUyxDQUFoQjs7QUFlQXZEO0FBQ0Q7O0FBRUQsV0FBS2YsV0FBTCxDQUFpQnlELGFBQWpCLEVBQWdDRSxnQkFBZ0JXLElBQWhCLENBQXFCLElBQXJCLENBQWhDO0FBQ0Q7Ozs4QkFFU2xELEssRUFBT21DLFUsRUFBWVksUyxFQUFXO0FBQ3RDLFVBQUlJLG1CQUFtQm5ELE1BQU1vRCxXQUFOLEVBQXZCOztBQUVBRCx5QkFDRSxLQUFLRSxhQUFMLENBQW1CckQsS0FBbkIsRUFBMEJtQyxVQUExQixFQUFzQ1ksU0FBdEMsQ0FERixHQUVJLEtBQUtPLFFBQUwsQ0FBY3RELEtBQWQsRUFBcUJtQyxVQUFyQixFQUFpQ1ksU0FBakMsQ0FGSjtBQUdEOzs7O0VBbEw0QjNFLE87O0FBcUwvQm1GLE9BQU9DLE9BQVAsR0FBaUI5RSxnQkFBakI7O0FBRUEsU0FBU08sT0FBVCxDQUFpQndFLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQztBQUMvQixNQUFJMUUsUUFBUSxDQUFDLENBQWI7O0FBRUF5RSxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QkMsbUJBQXpCLEVBQThDO0FBQ3ZELFFBQUlELG1CQUFtQkYsT0FBdkIsRUFBZ0M7QUFDOUIxRSxjQUFRNkUsbUJBQVI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU83RSxLQUFQO0FBQ0Q7O0FBRUQsU0FBUzRELElBQVQsQ0FBY2EsS0FBZCxFQUFxQkssUUFBckIsRUFBK0I7QUFDN0IsTUFBSUosVUFBVSxJQUFkOztBQUVBRCxRQUFNRSxJQUFOLENBQVcsVUFBU0MsY0FBVCxFQUF5QjtBQUNsQyxRQUFJRSxTQUFTRixjQUFULENBQUosRUFBOEI7QUFDNUJGLGdCQUFVRSxjQUFWOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0QiLCJmaWxlIjoiZHJvcHBhYmxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnknKSxcbiAgICBEcmFnRXZlbnQgPSByZXF1aXJlKCcuL2RyYWdFdmVudCcpLFxuICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2ZpbGVNYXJrZXInKSxcbiAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RpcmVjdG9yeU1hcmtlcicpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuZHJvcHBhYmxlRWxlbWVudHMsIGRyb3BwYWJsZUVsZW1lbnQpLFxuICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudENvbGxhcHNlZEJvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRWxlbWVudENvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBkcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCwgZG9uZSkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQsICAvLy9cbiAgICAgICAgc3RhcnREcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RBUlRfRFJBR0dJTkc6XG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuRVNDQVBFX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLmVzY2FwZURyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChlbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICB2YXIgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICBtYXJrZWQgPSAobWFya2VyICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgdmFyIGNoaWxkRWxlbWVudHMgPSB0aGlzLmNoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VyLCBjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIEZpbGVNYXJrZXIpXG4gICAgICAgICAgICAgfHwgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikpIHtcbiAgICAgICAgICAgICAgbWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgbW92ZUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIHZhciBlbnRyeVBhdGhNYXBzID0gdGhpcy5lbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICBmdW5jdGlvbiBtb3ZlRW50cmllc0RvbmUoKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgdmFyIGVudHJ5UGF0aCA9IGVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKGVudHJ5UGF0aE1hcHMsIGZ1bmN0aW9uKGVudHJ5UGF0aE1hcCkge1xuICAgICAgICAgICAgICB2YXIgc291cmNlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgIG1vdmVkUGF0aCA9IGVudHJ5UGF0aE1hcFtzb3VyY2VFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcblxuICAgICAgICB0aGlzLm1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gICAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyKGVudHJ5UGF0aE1hcHMsIG1vdmVFbnRyaWVzRG9uZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVFbnRyeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIGVudHJ5SXNEaXJlY3RvcnkgPSBlbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgZW50cnlJc0RpcmVjdG9yeSA/XG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkgOlxuICAgICAgICB0aGlzLm1vdmVGaWxlKGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=