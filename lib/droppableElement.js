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
      var entryPathMaps = entryPathMapsFromEntries(entries, sourcePath, targetPath);

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

function entryPathMapsFromEntries(entries, sourcePath, targetPath) {
  var entryPathMaps = entries.map(function (entry) {
    var entryPathMap = {},
        entryPath = entry.getPath(),
        sourceEntryPath = entryPath,
        ///
    targetEntryPath = targetPath === null ? null : util.replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath);

    entryPathMap[sourceEntryPath] = targetEntryPath;

    return entryPathMap;
  });

  return entryPathMaps;
}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwidXRpbCIsIkVudHJ5IiwiRHJhZ0V2ZW50IiwiRmlsZU1hcmtlciIsIkRpcmVjdG9yeU1hcmtlciIsIkRyb3BwYWJsZUVsZW1lbnQiLCJzZWxlY3RvciIsIm1vdmVIYW5kbGVyIiwiZHJvcHBhYmxlRWxlbWVudHMiLCJkcm9wcGFibGVFbGVtZW50IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsImZvdW5kIiwic3BsaWNlIiwiZHJhZ2dhYmxlRWxlbWVudERyYWdnaW5nQm91bmRzIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50IiwiYXJlT3ZlcmxhcHBpbmciLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQiLCJkcmFnRXZlbnQiLCJkb25lIiwiYWN0aW9uIiwiZ2V0QWN0aW9uIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldERyYWdnYWJsZUVsZW1lbnQiLCJlbnRyeSIsInN0YXJ0RHJhZ2dpbmciLCJhY3Rpb25zIiwiU1RBUlRfRFJBR0dJTkciLCJTVE9QX0RSQUdHSU5HIiwic3RvcERyYWdnaW5nIiwiRFJBR0dJTkciLCJkcmFnZ2luZyIsIkVTQ0FQRV9EUkFHR0lORyIsImVzY2FwZURyYWdnaW5nIiwiZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQiLCJyZWR1Y2UiLCJpc1RvQmVNYXJrZWQiLCJtYXJrZWREcm9wcGFibGVFbGVtZW50IiwiZHJvcHBhYmxlRWxlbWVudE1hcmtlZCIsImlzTWFya2VkIiwiZW50cnlOYW1lIiwiZ2V0TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJtYXJrZXJOYW1lIiwibWFya2VyIiwidHlwZXMiLCJGSUxFIiwiY2xvbmUiLCJESVJFQ1RPUlkiLCJhcHBlbmQiLCJyZXRyaWV2ZU1hcmtlciIsInJlbW92ZSIsIm1hcmtlZCIsInJlbW92ZU1hcmtlciIsImdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQiLCJjaGlsZEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50IiwiZW50cmllcyIsInNvdXJjZVBhdGgiLCJ0YXJnZXRQYXRoIiwiZW50cnlQYXRoTWFwcyIsImVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyIsIm1vdmVFbnRyaWVzRG9uZSIsImZvckVhY2giLCJlbnRyeVBhdGgiLCJnZXRQYXRoIiwicGF0aE1hcCIsImZpbmQiLCJlbnRyeVBhdGhNYXAiLCJzb3VyY2VFbnRyeVBhdGgiLCJtb3ZlZFBhdGgiLCJ1bmRlZmluZWQiLCJtb3ZlRW50cnkiLCJiaW5kIiwiZW50cnlJc0RpcmVjdG9yeSIsImlzRGlyZWN0b3J5IiwibW92ZURpcmVjdG9yeSIsIm1vdmVGaWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1hcCIsInRhcmdldEVudHJ5UGF0aCIsInJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgiLCJhcnJheSIsImVsZW1lbnQiLCJzb21lIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50RWxlbWVudEluZGV4IiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxPQUFPRixRQUFRLFFBQVIsQ0FBWDtBQUFBLElBQ0lHLFFBQVFILFFBQVEsa0JBQVIsQ0FEWjtBQUFBLElBRUlJLFlBQVlKLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lLLGFBQWFMLFFBQVEsNkJBQVIsQ0FIakI7QUFBQSxJQUlJTSxrQkFBa0JOLFFBQVEsa0NBQVIsQ0FKdEI7O0lBTU1PLGdCOzs7QUFDSiw0QkFBWUMsUUFBWixFQUFzQkMsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0JELFFBRDJCOztBQUdqQyxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxVQUFLQyxpQkFBTCxHQUF5QixFQUF6QjtBQUxpQztBQU1sQzs7Ozt3Q0FFbUJDLGdCLEVBQWtCO0FBQ3BDLFdBQUtELGlCQUFMLENBQXVCRSxJQUF2QixDQUE0QkQsZ0JBQTVCO0FBQ0Q7OzsyQ0FFc0JBLGdCLEVBQWtCO0FBQ3ZDLFVBQUlFLFFBQVFDLFFBQVEsS0FBS0osaUJBQWIsRUFBZ0NDLGdCQUFoQyxDQUFaO0FBQUEsVUFDSUksUUFBU0YsVUFBVSxDQUFDLENBRHhCOztBQUdBLFVBQUlFLEtBQUosRUFBVztBQUNULGFBQUtMLGlCQUFMLENBQXVCTSxNQUF2QixDQUE4QkgsS0FBOUIsRUFBcUMsQ0FBckM7QUFDRDtBQUNGOzs7a0RBRTZCSSw4QixFQUFnQztBQUM1RCxVQUFJQyxTQUFTLEtBQUtDLFNBQUwsRUFBYjtBQUFBLFVBQ0lDLG9DQUFvQ0YsT0FBT0csY0FBUCxDQUFzQkosOEJBQXRCLENBRHhDO0FBQUEsVUFFSUssOEJBQThCRixpQ0FGbEM7O0FBSUEsYUFBT0UsMkJBQVA7QUFDRDs7O3FDQUVnQkMsUyxFQUFXQyxJLEVBQU07QUFDaEMsVUFBSUMsU0FBU0YsVUFBVUcsU0FBVixFQUFiO0FBQUEsVUFDSUMsbUJBQW1CSixVQUFVSyxtQkFBVixFQUR2QjtBQUFBLFVBRUlDLFFBQVFGLGdCQUZaO0FBQUEsVUFFK0I7QUFDM0JHLHNCQUFnQixLQUhwQjs7QUFLQSxjQUFRTCxNQUFSO0FBQ0UsYUFBS3JCLFVBQVUyQixPQUFWLENBQWtCQyxjQUF2QjtBQUNFRiwwQkFBZ0IsS0FBS0EsYUFBTCxDQUFtQkQsS0FBbkIsQ0FBaEI7QUFDQTs7QUFFRixhQUFLekIsVUFBVTJCLE9BQVYsQ0FBa0JFLGFBQXZCO0FBQ0UsZUFBS0MsWUFBTCxDQUFrQkwsS0FBbEIsRUFBeUJMLElBQXpCO0FBQ0E7O0FBRUYsYUFBS3BCLFVBQVUyQixPQUFWLENBQWtCSSxRQUF2QjtBQUNFLGVBQUtDLFFBQUwsQ0FBY1AsS0FBZDtBQUNBOztBQUVGLGFBQUt6QixVQUFVMkIsT0FBVixDQUFrQk0sZUFBdkI7QUFDRSxlQUFLQyxjQUFMLENBQW9CVCxLQUFwQjtBQUNBO0FBZko7O0FBa0JBLGFBQU9DLGFBQVA7QUFDRDs7O2tEQUU2QkQsSyxFQUFPO0FBQ25DLFVBQUlVLDZCQUE2QixLQUFLN0IsaUJBQUwsQ0FBdUI4QixNQUF2QixDQUE4QixVQUFTRCwwQkFBVCxFQUFxQzVCLGdCQUFyQyxFQUF1RDtBQUNwSCxZQUFJNEIsK0JBQStCLElBQW5DLEVBQXlDO0FBQ3ZDLGNBQUk1QixpQkFBaUI4QixZQUFqQixDQUE4QlosS0FBOUIsQ0FBSixFQUEwQztBQUFFO0FBQzFDVSx5Q0FBNkI1QixnQkFBN0I7QUFDRDtBQUNGOztBQUVELGVBQU80QiwwQkFBUDtBQUNELE9BUmdDLEVBUTlCLElBUjhCLENBQWpDOztBQVVBLGFBQU9BLDBCQUFQO0FBQ0Q7OztnREFFMkI7QUFDMUIsVUFBSUcseUJBQXlCLEtBQUtoQyxpQkFBTCxDQUF1QjhCLE1BQXZCLENBQThCLFVBQVNFLHNCQUFULEVBQWlDL0IsZ0JBQWpDLEVBQW1EO0FBQzVHLFlBQUkrQiwyQkFBMkIsSUFBL0IsRUFBcUM7QUFDbkMsY0FBSUMseUJBQXlCaEMsaUJBQWlCaUMsUUFBakIsRUFBN0I7O0FBRUEsY0FBSUQsc0JBQUosRUFBNEI7QUFDMUJELHFDQUF5Qi9CLGdCQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsZUFBTytCLHNCQUFQO0FBQ0QsT0FWNEIsRUFVMUIsSUFWMEIsQ0FBN0I7O0FBWUEsYUFBT0Esc0JBQVA7QUFDRDs7OzhCQUVTYixLLEVBQU87QUFDZixVQUFJZ0IsWUFBWWhCLE1BQU1pQixPQUFOLEVBQWhCO0FBQUEsVUFDSUMsWUFBWWxCLE1BQU1tQixPQUFOLEVBRGhCO0FBQUEsVUFFSUMsYUFBYUosU0FGakI7QUFBQSxVQUU0QjtBQUN4QkssWUFISjs7QUFLQSxjQUFRSCxTQUFSO0FBQ0UsYUFBSzVDLE1BQU1nRCxLQUFOLENBQVlDLElBQWpCO0FBQ0VGLG1CQUFTN0MsV0FBV2dELEtBQVgsQ0FBaUJKLFVBQWpCLENBQVQ7QUFDQTs7QUFFRixhQUFLOUMsTUFBTWdELEtBQU4sQ0FBWUcsU0FBakI7QUFDRUosbUJBQVM1QyxnQkFBZ0IrQyxLQUFoQixDQUFzQkosVUFBdEIsQ0FBVDtBQUNBO0FBUEo7O0FBVUEsV0FBS00sTUFBTCxDQUFZTCxNQUFaO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQUlBLFNBQVMsS0FBS00sY0FBTCxFQUFiOztBQUVBTixhQUFPTyxNQUFQO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsVUFBSUMsU0FBUyxLQUFLZCxRQUFMLEVBQWI7O0FBRUEsVUFBSWMsTUFBSixFQUFZO0FBQ1YsYUFBS0MsWUFBTDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlqQix5QkFBeUIsS0FBS2tCLHlCQUFMLEVBQTdCOztBQUVBbEIsK0JBQXVCaUIsWUFBdkI7QUFDRDtBQUNGOzs7K0JBRVU7QUFDVCxVQUFJVCxTQUFTLEtBQUtNLGNBQUwsRUFBYjtBQUFBLFVBQ0lFLFNBQVVSLFdBQVcsSUFEekIsQ0FEUyxDQUV1Qjs7QUFFaEMsYUFBT1EsTUFBUDtBQUNEOzs7cUNBRWdCO0FBQ2YsVUFBSUcsZ0JBQWdCLEtBQUtBLGFBQUwsRUFBcEI7QUFBQSxVQUNJWCxTQUFTVyxjQUFjckIsTUFBZCxDQUFxQixVQUFTVSxNQUFULEVBQWlCWSxZQUFqQixFQUErQjtBQUMzRCxZQUFJWixXQUFXLElBQWYsRUFBcUI7QUFDbkIsY0FBS1ksd0JBQXdCekQsVUFBekIsSUFDQ3lELHdCQUF3QnhELGVBRDdCLEVBQytDO0FBQzdDNEMscUJBQVNZLFlBQVQsQ0FENkMsQ0FDckI7QUFDekI7QUFDRjs7QUFFRCxlQUFPWixNQUFQO0FBQ0QsT0FUUSxFQVNOLElBVE0sQ0FEYjs7QUFZQSxhQUFPQSxNQUFQO0FBQ0Q7OztnQ0FFV2EsTyxFQUFTQyxVLEVBQVlDLFUsRUFBWXpDLEksRUFBTTtBQUNqRCxVQUFJMEMsZ0JBQWdCQyx5QkFBeUJKLE9BQXpCLEVBQWtDQyxVQUFsQyxFQUE4Q0MsVUFBOUMsQ0FBcEI7O0FBRUEsZUFBU0csZUFBVCxHQUEyQjtBQUN6QkwsZ0JBQVFNLE9BQVIsQ0FBZ0IsVUFBU3hDLEtBQVQsRUFBZ0I7QUFDOUIsY0FBSXlDLFlBQVl6QyxNQUFNMEMsT0FBTixFQUFoQjtBQUFBLGNBQ0lQLGFBQWFNLFNBRGpCO0FBQUEsY0FDNkI7QUFDekJFLG9CQUFVQyxLQUFLUCxhQUFMLEVBQW9CLFVBQVNRLFlBQVQsRUFBdUI7QUFDbkQsZ0JBQUlDLGtCQUFrQlgsVUFBdEI7QUFBQSxnQkFDSVksWUFBWUYsYUFBYUMsZUFBYixDQURoQjtBQUFBLGdCQUVJNUQsUUFBUzZELGNBQWNDLFNBRjNCOztBQUlBLG1CQUFPOUQsS0FBUDtBQUNELFdBTlMsQ0FGZDtBQUFBLGNBU0k2RCxZQUFZSixRQUFRUixVQUFSLENBVGhCOztBQVdBLGVBQUtjLFNBQUwsQ0FBZWpELEtBQWYsRUFBc0JtQyxVQUF0QixFQUFrQ1ksU0FBbEM7QUFDRCxTQWJlLENBYWRHLElBYmMsQ0FhVCxJQWJTLENBQWhCOztBQWVBdkQ7QUFDRDs7QUFFRCxXQUFLZixXQUFMLENBQWlCeUQsYUFBakIsRUFBZ0NFLGdCQUFnQlcsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBaEM7QUFDRDs7OzhCQUVTbEQsSyxFQUFPbUMsVSxFQUFZWSxTLEVBQVc7QUFDdEMsVUFBSUksbUJBQW1CbkQsTUFBTW9ELFdBQU4sRUFBdkI7O0FBRUFELHlCQUNFLEtBQUtFLGFBQUwsQ0FBbUJyRCxLQUFuQixFQUEwQm1DLFVBQTFCLEVBQXNDWSxTQUF0QyxDQURGLEdBRUksS0FBS08sUUFBTCxDQUFjdEQsS0FBZCxFQUFxQm1DLFVBQXJCLEVBQWlDWSxTQUFqQyxDQUZKO0FBR0Q7Ozs7RUFsTDRCM0UsTzs7QUFxTC9CbUYsT0FBT0MsT0FBUCxHQUFpQjlFLGdCQUFqQjs7QUFFQSxTQUFTNEQsd0JBQVQsQ0FBa0NKLE9BQWxDLEVBQTJDQyxVQUEzQyxFQUF1REMsVUFBdkQsRUFBbUU7QUFDakUsTUFBSUMsZ0JBQWdCSCxRQUFRdUIsR0FBUixDQUFZLFVBQVN6RCxLQUFULEVBQWdCO0FBQzlDLFFBQUk2QyxlQUFlLEVBQW5CO0FBQUEsUUFDSUosWUFBWXpDLE1BQU0wQyxPQUFOLEVBRGhCO0FBQUEsUUFFSUksa0JBQWtCTCxTQUZ0QjtBQUFBLFFBRWtDO0FBQzlCaUIsc0JBQWtCdEIsZUFBZSxJQUFmLEdBQ0UsSUFERixHQUVJL0QsS0FBS3NGLCtCQUFMLENBQXFDbEIsU0FBckMsRUFBZ0ROLFVBQWhELEVBQTREQyxVQUE1RCxDQUwxQjs7QUFPQVMsaUJBQWFDLGVBQWIsSUFBZ0NZLGVBQWhDOztBQUVBLFdBQU9iLFlBQVA7QUFDRCxHQVhtQixDQUFwQjs7QUFhQSxTQUFPUixhQUFQO0FBQ0Q7O0FBRUQsU0FBU3BELE9BQVQsQ0FBaUIyRSxLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUM7QUFDL0IsTUFBSTdFLFFBQVEsQ0FBQyxDQUFiOztBQUVBNEUsUUFBTUUsSUFBTixDQUFXLFVBQVNDLGNBQVQsRUFBeUJDLG1CQUF6QixFQUE4QztBQUN2RCxRQUFJRCxtQkFBbUJGLE9BQXZCLEVBQWdDO0FBQzlCN0UsY0FBUWdGLG1CQUFSOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FSRDs7QUFVQSxTQUFPaEYsS0FBUDtBQUNEOztBQUVELFNBQVM0RCxJQUFULENBQWNnQixLQUFkLEVBQXFCSyxRQUFyQixFQUErQjtBQUM3QixNQUFJSixVQUFVLElBQWQ7O0FBRUFELFFBQU1FLElBQU4sQ0FBVyxVQUFTQyxjQUFULEVBQXlCO0FBQ2xDLFFBQUlFLFNBQVNGLGNBQVQsQ0FBSixFQUE4QjtBQUM1QkYsZ0JBQVVFLGNBQVY7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU9GLE9BQVA7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIEVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9lbnRyeScpLFxuICAgIERyYWdFdmVudCA9IHJlcXVpcmUoJy4vZHJhZ0V2ZW50JyksXG4gICAgRmlsZU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZmlsZU1hcmtlcicpLFxuICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvZGlyZWN0b3J5TWFya2VyJyk7XG5cbmNsYXNzIERyb3BwYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YodGhpcy5kcm9wcGFibGVFbGVtZW50cywgZHJvcHBhYmxlRWxlbWVudCksXG4gICAgICAgIGZvdW5kID0gKGluZGV4ICE9PSAtMSk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudChkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbGVtZW50ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVsZW1lbnREcmFnZ2luZ0JvdW5kcyksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQ7XG4gIH1cblxuICBkcmFnRXZlbnRIYW5kbGVyKGRyYWdFdmVudCwgZG9uZSkge1xuICAgIHZhciBhY3Rpb24gPSBkcmFnRXZlbnQuZ2V0QWN0aW9uKCksXG4gICAgICAgIGRyYWdnYWJsZUVsZW1lbnQgPSBkcmFnRXZlbnQuZ2V0RHJhZ2dhYmxlRWxlbWVudCgpLFxuICAgICAgICBlbnRyeSA9IGRyYWdnYWJsZUVsZW1lbnQsICAvLy9cbiAgICAgICAgc3RhcnREcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuU1RBUlRfRFJBR0dJTkc6XG4gICAgICAgIHN0YXJ0RHJhZ2dpbmcgPSB0aGlzLnN0YXJ0RHJhZ2dpbmcoZW50cnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBEcmFnRXZlbnQuYWN0aW9ucy5TVE9QX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZyhlbnRyeSwgZG9uZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERyYWdFdmVudC5hY3Rpb25zLkRSQUdHSU5HOlxuICAgICAgICB0aGlzLmRyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRHJhZ0V2ZW50LmFjdGlvbnMuRVNDQVBFX0RSQUdHSU5HOlxuICAgICAgICB0aGlzLmVzY2FwZURyYWdnaW5nKGVudHJ5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdGFydERyYWdnaW5nO1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZW50cnkpIHtcbiAgICB2YXIgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChlbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgdmFyIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wcGFibGVFbGVtZW50LCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAobWFya2VkRHJvcHBhYmxlRWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHZhciBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgbWFya2VyTmFtZSA9IGVudHJ5TmFtZSwgLy8vXG4gICAgICAgIG1hcmtlcjtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IEZpbGVNYXJrZXIuY2xvbmUobWFya2VyTmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gRGlyZWN0b3J5TWFya2VyLmNsb25lKG1hcmtlck5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZChtYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHZhciBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICB2YXIgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgbWFya2VkID0gKG1hcmtlciAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIHZhciBjaGlsZEVsZW1lbnRzID0gdGhpcy5jaGlsZEVsZW1lbnRzKCksXG4gICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlciwgY2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBGaWxlTWFya2VyKVxuICAgICAgICAgICAgIHx8IChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpKSB7XG4gICAgICAgICAgICAgIG1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVFbnRyaWVzKGVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJ5UGF0aE1hcHNGcm9tRW50cmllcyhlbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIGZ1bmN0aW9uIG1vdmVFbnRyaWVzRG9uZSgpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlUGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgcGF0aE1hcCA9IGZpbmQoZW50cnlQYXRoTWFwcywgZnVuY3Rpb24oZW50cnlQYXRoTWFwKSB7XG4gICAgICAgICAgICAgIHZhciBzb3VyY2VFbnRyeVBhdGggPSBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICBmb3VuZCA9IChtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZVBhdGhdO1xuXG4gICAgICAgIHRoaXMubW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIoZW50cnlQYXRoTWFwcywgbW92ZUVudHJpZXNEb25lLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbW92ZUVudHJ5KGVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSA6XG4gICAgICAgIHRoaXMubW92ZUZpbGUoZW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBlbnRyeVBhdGhNYXBzRnJvbUVudHJpZXMoZW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICB2YXIgZW50cnlQYXRoTWFwcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5UGF0aE1hcCA9IHt9LFxuICAgICAgICBlbnRyeVBhdGggPSBlbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIHNvdXJjZUVudHJ5UGF0aCA9IGVudHJ5UGF0aCwgIC8vL1xuICAgICAgICB0YXJnZXRFbnRyeVBhdGggPSB0YXJnZXRQYXRoID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgZW50cnlQYXRoTWFwW3NvdXJjZUVudHJ5UGF0aF0gPSB0YXJnZXRFbnRyeVBhdGg7XG5cbiAgICByZXR1cm4gZW50cnlQYXRoTWFwO1xuICB9KTtcblxuICByZXR1cm4gZW50cnlQYXRoTWFwcztcbn1cblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgZWxlbWVudCkge1xuICB2YXIgaW5kZXggPSAtMTtcblxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICBpbmRleCA9IGN1cnJlbnRFbGVtZW50SW5kZXg7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBlbGVtZW50OyAgXG59XG4iXX0=