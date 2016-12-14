'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175,
    NAMESPACE = 'EasyUI-DragAndDrop/dragging';

var body = new Body();

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    _this.explorer = explorer;

    _this.nameButton = new NameButton(_this, name);

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.onMouseDown(_this.mouseDownHandler.bind(_this));
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var parentElements = this.parentElements('ul.explorer li'),
          ///
      name = this.getName(),
          path = parentElements.reduce(function (path, parentElement) {
        var parentElementName = parentElement.getName();

        path = parentElementName + '/' + path;

        return path;
      }, name);

      return path;
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var bounds = this.getBounds(),
          collapsedBounds = bounds; ///

      return collapsedBounds;
    }
  }, {
    key: 'isOverlappingCollapsedBounds',
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

      return overlappingCollapsedBounds;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.nameButton.setName(name);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(doubleClickHandler) {
      this.nameButton.onDoubleClick(doubleClickHandler);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var bounds = this.getBounds(),
          top = bounds.getTop(),
          left = bounds.getLeft(),
          css = {
        top: top,
        left: left
      };

      this.css(css);

      this.topOffset = top - mouseTop;
      this.leftOffset = left - mouseLeft;

      this.addClass('dragging');

      this.on('keydown', this.keyDownHandler.bind(this));
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.off('keydown', this.keyDownHandler.bind(this));

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      var top = mouseTop + this.topOffset,
          left = mouseLeft + this.leftOffset,
          css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
    }
  }, {
    key: 'startWaitingToDrag',
    value: function startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
      if (this.timeout === null) {
        this.timeout = setTimeout(function () {
          this.timeout = null;

          var startedDragging = this.explorer.startDragging(this);

          if (startedDragging) {
            this.startDragging(mouseTop, mouseLeft);
          }
        }.bind(this), START_DRAGGING_DELAY);
      }
    }
  }, {
    key: 'stopWaitingToDrag',
    value: function stopWaitingToDrag() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);

        this.timeout = null;
      }
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
    }
  }, {
    key: 'isWaitingToDrag',
    value: function isWaitingToDrag() {
      var waitingToDrag = this.timeout !== null;

      return waitingToDrag;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
      body.onMouseUp(this.mouseUpHandler.bind(this), NAMESPACE);
      body.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE);

      if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
      body.offMouseMove(NAMESPACE);
      body.offMouseUp(NAMESPACE);

      var dragging = this.isDragging();

      if (dragging) {
        this.explorer.stopDragging(this, function () {
          this.stopDragging();
        }.bind(this));
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler(event) {
      var keyCode = event.keyCode || event.which;

      if (keyCode === ESCAPE_KEYCODE) {
        var dragging = this.isDragging();

        if (dragging) {
          this.explorer.escapeDragging(this);

          this.stopDragging();
        }
      }
    }
  }]);

  return DraggableEntry;
}(Element);

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiQm9keSIsIkVsZW1lbnQiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIk5BTUVTUEFDRSIsImJvZHkiLCJEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsIm5hbWVCdXR0b24iLCJ0aW1lb3V0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm9uTW91c2VEb3duIiwibW91c2VEb3duSGFuZGxlciIsImJpbmQiLCJnZXROYW1lIiwicGFyZW50RWxlbWVudHMiLCJwYXRoIiwicmVkdWNlIiwicGFyZW50RWxlbWVudCIsInBhcmVudEVsZW1lbnROYW1lIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInNldE5hbWUiLCJkb3VibGVDbGlja0hhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJ0b3AiLCJnZXRUb3AiLCJsZWZ0IiwiZ2V0TGVmdCIsImNzcyIsImFkZENsYXNzIiwib24iLCJrZXlEb3duSGFuZGxlciIsIm9mZiIsInJlbW92ZUNsYXNzIiwiZHJhZ2dpbmciLCJtb3VzZUJ1dHRvbiIsInNldFRpbWVvdXQiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJ3YWl0aW5nVG9EcmFnIiwib25Nb3VzZVVwIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJvZmZNb3VzZVVwIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJldmVudCIsImtleUNvZGUiLCJ3aGljaCIsImVzY2FwZURyYWdnaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLE9BQU9GLE9BQU9FLElBRGxCO0FBQUEsSUFFSUMsVUFBVUgsT0FBT0csT0FGckI7O0FBSUEsSUFBSUMsYUFBYUgsUUFBUSxjQUFSLENBQWpCOztBQUVBLElBQU1JLGlCQUFpQixFQUF2QjtBQUFBLElBQ01DLHVCQUF1QixHQUQ3QjtBQUFBLElBRU1DLFlBQVksNkJBRmxCOztBQUlBLElBQUlDLE9BQU8sSUFBSU4sSUFBSixFQUFYOztJQUVNTyxjOzs7QUFDSiwwQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDQyxJQUF0QyxFQUE0QztBQUFBOztBQUFBLGdJQUNwQ0gsUUFEb0M7O0FBRzFDLFVBQUtFLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLFVBQUtFLFVBQUwsR0FBa0IsSUFBSVYsVUFBSixRQUFxQk8sSUFBckIsQ0FBbEI7O0FBRUEsVUFBS0UsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFVBQUtFLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUEsVUFBS0MsV0FBTCxDQUFpQixNQUFLQyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBakI7QUFiMEM7QUFjM0M7Ozs7a0NBRWE7QUFDWixhQUFPLEtBQUtSLFFBQVo7QUFDRDs7OzhCQUVTO0FBQUUsYUFBTyxLQUFLRSxVQUFMLENBQWdCTyxPQUFoQixFQUFQO0FBQW1DOzs7OEJBRXJDO0FBQ1IsYUFBTyxLQUFLUixJQUFaO0FBQ0Q7Ozs4QkFFUztBQUNSLFVBQUlTLGlCQUFpQixLQUFLQSxjQUFMLENBQW9CLGdCQUFwQixDQUFyQjtBQUFBLFVBQTREO0FBQ3hEWCxhQUFPLEtBQUtVLE9BQUwsRUFEWDtBQUFBLFVBRUlFLE9BQU9ELGVBQWVFLE1BQWYsQ0FBc0IsVUFBU0QsSUFBVCxFQUFlRSxhQUFmLEVBQThCO0FBQ3pELFlBQUlDLG9CQUFvQkQsY0FBY0osT0FBZCxFQUF4Qjs7QUFFQUUsZUFBT0csb0JBQW9CLEdBQXBCLEdBQTBCSCxJQUFqQzs7QUFFQSxlQUFPQSxJQUFQO0FBQ0QsT0FOTSxFQU1KWixJQU5JLENBRlg7O0FBVUEsYUFBT1ksSUFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQUlJLFNBQVMsS0FBS0MsU0FBTCxFQUFiO0FBQUEsVUFDSUMsa0JBQWtCRixNQUR0QixDQURtQixDQUVZOztBQUUvQixhQUFPRSxlQUFQO0FBQ0Q7OztpREFFNEJBLGUsRUFBaUI7QUFDNUMsVUFBSUYsU0FBUyxLQUFLQyxTQUFMLEVBQWI7QUFBQSxVQUNJRSw2QkFBNkJILE9BQU9JLGNBQVAsQ0FBc0JGLGVBQXRCLENBRGpDOztBQUdBLGFBQU9DLDBCQUFQO0FBQ0Q7Ozs0QkFFT25CLEksRUFBTTtBQUFFLFdBQUtHLFVBQUwsQ0FBZ0JrQixPQUFoQixDQUF3QnJCLElBQXhCO0FBQWdDOzs7a0NBRWxDc0Isa0IsRUFBb0I7QUFBRSxXQUFLbkIsVUFBTCxDQUFnQm9CLGFBQWhCLENBQThCRCxrQkFBOUI7QUFBb0Q7OztrQ0FFMUVFLFEsRUFBVUMsUyxFQUFXO0FBQ2pDLFVBQUlULFNBQVMsS0FBS0MsU0FBTCxFQUFiO0FBQUEsVUFDSVMsTUFBTVYsT0FBT1csTUFBUCxFQURWO0FBQUEsVUFFSUMsT0FBT1osT0FBT2EsT0FBUCxFQUZYO0FBQUEsVUFHSUMsTUFBTTtBQUNKSixhQUFLQSxHQUREO0FBRUpFLGNBQU1BO0FBRkYsT0FIVjs7QUFRQSxXQUFLRSxHQUFMLENBQVNBLEdBQVQ7O0FBRUEsV0FBS3pCLFNBQUwsR0FBaUJxQixNQUFNRixRQUF2QjtBQUNBLFdBQUtsQixVQUFMLEdBQWtCc0IsT0FBT0gsU0FBekI7O0FBRUEsV0FBS00sUUFBTCxDQUFjLFVBQWQ7O0FBRUEsV0FBS0MsRUFBTCxDQUFRLFNBQVIsRUFBbUIsS0FBS0MsY0FBTCxDQUFvQnhCLElBQXBCLENBQXlCLElBQXpCLENBQW5CO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUt5QixHQUFMLENBQVMsU0FBVCxFQUFvQixLQUFLRCxjQUFMLENBQW9CeEIsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBcEI7O0FBRUEsV0FBSzBCLFdBQUwsQ0FBaUIsVUFBakI7QUFDRDs7OzZCQUVRWCxRLEVBQVVDLFMsRUFBVztBQUM1QixVQUFJQyxNQUFNRixXQUFXLEtBQUtuQixTQUExQjtBQUFBLFVBQ0l1QixPQUFPSCxZQUFZLEtBQUtuQixVQUQ1QjtBQUFBLFVBRUl3QixNQUFNO0FBQ0pKLGFBQUtBLEdBREQ7QUFFSkUsY0FBTUE7QUFGRixPQUZWOztBQU9BLFdBQUtFLEdBQUwsQ0FBU0EsR0FBVDs7QUFFQSxXQUFLN0IsUUFBTCxDQUFjbUMsUUFBZCxDQUF1QixJQUF2QjtBQUNEOzs7dUNBRWtCWixRLEVBQVVDLFMsRUFBV1ksVyxFQUFhO0FBQ25ELFVBQUksS0FBS2pDLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekIsYUFBS0EsT0FBTCxHQUFla0MsV0FBVyxZQUFXO0FBQ25DLGVBQUtsQyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxjQUFJbUMsa0JBQWtCLEtBQUt0QyxRQUFMLENBQWN1QyxhQUFkLENBQTRCLElBQTVCLENBQXRCOztBQUVBLGNBQUlELGVBQUosRUFBcUI7QUFDbkIsaUJBQUtDLGFBQUwsQ0FBbUJoQixRQUFuQixFQUE2QkMsU0FBN0I7QUFDRDtBQUNGLFNBUnlCLENBUXhCaEIsSUFSd0IsQ0FRbkIsSUFSbUIsQ0FBWCxFQVFEZCxvQkFSQyxDQUFmO0FBU0Q7QUFDRjs7O3dDQUVtQjtBQUNsQixVQUFJLEtBQUtTLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekJxQyxxQkFBYSxLQUFLckMsT0FBbEI7O0FBRUEsYUFBS0EsT0FBTCxHQUFlLElBQWY7QUFDRDtBQUNGOzs7aUNBRVk7QUFDWCxVQUFJZ0MsV0FBVyxLQUFLTSxRQUFMLENBQWMsVUFBZCxDQUFmOztBQUVBLGFBQU9OLFFBQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFJTyxnQkFBaUIsS0FBS3ZDLE9BQUwsS0FBaUIsSUFBdEM7O0FBRUEsYUFBT3VDLGFBQVA7QUFDRDs7O3FDQUVnQm5CLFEsRUFBVUMsUyxFQUFXWSxXLEVBQWE7QUFDakR4QyxXQUFLK0MsU0FBTCxDQUFlLEtBQUtDLGNBQUwsQ0FBb0JwQyxJQUFwQixDQUF5QixJQUF6QixDQUFmLEVBQStDYixTQUEvQztBQUNBQyxXQUFLaUQsV0FBTCxDQUFpQixLQUFLQyxnQkFBTCxDQUFzQnRDLElBQXRCLENBQTJCLElBQTNCLENBQWpCLEVBQW1EYixTQUFuRDs7QUFFQSxVQUFJeUMsZ0JBQWdCN0MsUUFBUXdELGlCQUE1QixFQUErQztBQUM3QyxZQUFJWixXQUFXLEtBQUthLFVBQUwsRUFBZjs7QUFFQSxZQUFJLENBQUNiLFFBQUwsRUFBZTtBQUNiLGVBQUtjLGtCQUFMLENBQXdCMUIsUUFBeEIsRUFBa0NDLFNBQWxDO0FBQ0Q7QUFDRjtBQUNGOzs7bUNBRWNELFEsRUFBVUMsUyxFQUFXWSxXLEVBQWE7QUFDL0N4QyxXQUFLc0QsWUFBTCxDQUFrQnZELFNBQWxCO0FBQ0FDLFdBQUt1RCxVQUFMLENBQWdCeEQsU0FBaEI7O0FBRUEsVUFBSXdDLFdBQVcsS0FBS2EsVUFBTCxFQUFmOztBQUVBLFVBQUliLFFBQUosRUFBYztBQUNaLGFBQUtuQyxRQUFMLENBQWNvRCxZQUFkLENBQTJCLElBQTNCLEVBQWlDLFlBQVc7QUFDMUMsZUFBS0EsWUFBTDtBQUNELFNBRmdDLENBRS9CNUMsSUFGK0IsQ0FFMUIsSUFGMEIsQ0FBakM7QUFHRCxPQUpELE1BSU87QUFDTCxhQUFLNkMsaUJBQUw7QUFDRDtBQUNGOzs7cUNBRWdCOUIsUSxFQUFVQyxTLEVBQVdZLFcsRUFBYTtBQUNqRCxVQUFJRCxXQUFXLEtBQUthLFVBQUwsRUFBZjs7QUFFQSxVQUFJYixRQUFKLEVBQWM7QUFDWixhQUFLQSxRQUFMLENBQWNaLFFBQWQsRUFBd0JDLFNBQXhCO0FBQ0Q7QUFDRjs7O21DQUVjOEIsSyxFQUFPO0FBQ3BCLFVBQUlDLFVBQVVELE1BQU1DLE9BQU4sSUFBaUJELE1BQU1FLEtBQXJDOztBQUVBLFVBQUlELFlBQVk5RCxjQUFoQixFQUFnQztBQUM5QixZQUFJMEMsV0FBVyxLQUFLYSxVQUFMLEVBQWY7O0FBRUEsWUFBSWIsUUFBSixFQUFjO0FBQ1osZUFBS25DLFFBQUwsQ0FBY3lELGNBQWQsQ0FBNkIsSUFBN0I7O0FBRUEsZUFBS0wsWUFBTDtBQUNEO0FBQ0Y7QUFDRjs7OztFQW5MMEI3RCxPOztBQXNMN0JtRSxPQUFPQyxPQUFQLEdBQWlCOUQsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzUsXG4gICAgICBOQU1FU1BBQ0UgPSAnRWFzeVVJLURyYWdBbmREcm9wL2RyYWdnaW5nJztcblxudmFyIGJvZHkgPSBuZXcgQm9keSgpO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuZXcgTmFtZUJ1dHRvbih0aGlzLCBuYW1lKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIHZhciBwYXJlbnRFbGVtZW50cyA9IHRoaXMucGFyZW50RWxlbWVudHMoJ3VsLmV4cGxvcmVyIGxpJyksIC8vL1xuICAgICAgICBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgIHBhdGggPSBwYXJlbnRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24ocGF0aCwgcGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHZhciBwYXJlbnRFbGVtZW50TmFtZSA9IHBhcmVudEVsZW1lbnQuZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgcGF0aCA9IHBhcmVudEVsZW1lbnROYW1lICsgJy8nICsgcGF0aDtcblxuICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9LCBuYW1lKTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIHRvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQsXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICB2YXIgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc1dhaXRpbmdUb0RyYWcoKSB7XG4gICAgdmFyIHdhaXRpbmdUb0RyYWcgPSAodGhpcy50aW1lb3V0ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB3YWl0aW5nVG9EcmFnO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcbiAgICBib2R5Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7XG4gICAgYm9keS5vZmZNb3VzZVVwKE5BTUVTUEFDRSk7XG5cbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgdmFyIGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==