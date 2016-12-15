'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175,
    NAMESPACE = 'EasyUI-DragAndDrop/dragging';

var body = new Body();

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    _this.nameButton = new NameButton(_this, name);

    _this.explorer = explorer;

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.onMouseDown(_this.mouseDownHandler.bind(_this));
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
    }
  }, {
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
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
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return false;
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

          var rootDirectory = this.isRootDirectory(),
              noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectory = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);

          if (noDragging || !rootDirectory && noDraggingSubEntries || rootDirectory && noDraggingRootDirectory) {
            return;
          }

          var mouseOver = this.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = this.explorer.startDragging(this);

            if (startedDragging) {
              this.startDragging(mouseTop, mouseLeft);
            }
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
    key: 'isMouseOver',
    value: function isMouseOver(mouseTop, mouseLeft) {
      var collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;

      return mouseOver;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
      body.onMouseUp(this.mouseUpHandler.bind(this), NAMESPACE); ///
      body.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE); ///

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
      body.offMouseMove(NAMESPACE); ///
      body.offMouseUp(NAMESPACE); ///

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiQm9keSIsIkVsZW1lbnQiLCJvcHRpb25zIiwiTmFtZUJ1dHRvbiIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhcmVudEVsZW1lbnRzIiwicGF0aCIsInJlZHVjZSIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnRFbGVtZW50TmFtZSIsImJvdW5kcyIsImdldEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJzZXROYW1lIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwidG9wIiwiZ2V0VG9wIiwibGVmdCIsImdldExlZnQiLCJjc3MiLCJhZGRDbGFzcyIsIm9uIiwia2V5RG93bkhhbmRsZXIiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsIm5vRHJhZ2dpbmciLCJoYXNPcHRpb24iLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwib25Nb3VzZVVwIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJvZmZNb3VzZVVwIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJldmVudCIsImtleUNvZGUiLCJ3aGljaCIsImVzY2FwZURyYWdnaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLE9BQU9GLE9BQU9FLElBRGxCO0FBQUEsSUFFSUMsVUFBVUgsT0FBT0csT0FGckI7O0FBSUEsSUFBSUMsVUFBVUgsUUFBUSxZQUFSLENBQWQ7QUFBQSxJQUNJSSxhQUFhSixRQUFRLGNBQVIsQ0FEakI7O0FBR0EsSUFBTUssaUJBQWlCLEVBQXZCO0FBQUEsSUFDTUMsdUJBQXVCLEdBRDdCO0FBQUEsSUFFTUMsWUFBWSw2QkFGbEI7O0FBSUEsSUFBSUMsT0FBTyxJQUFJUCxJQUFKLEVBQVg7O0lBRU1RLGM7OztBQUNKLDBCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0NDLElBQXRDLEVBQTRDO0FBQUE7O0FBQUEsZ0lBQ3BDSCxRQURvQzs7QUFHMUMsVUFBS0ksVUFBTCxHQUFrQixJQUFJVixVQUFKLFFBQXFCTyxJQUFyQixDQUFsQjs7QUFFQSxVQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7O0FBRUEsVUFBS0UsT0FBTCxHQUFlLElBQWY7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VUFBSTFCLFFBQUosRUFBYztBQUNaLGFBQUtBLFFBQUwsQ0FBY1osUUFBZCxFQUF3QkMsU0FBeEI7QUFDRDtBQUNGOzs7bUNBRWMyQyxLLEVBQU87QUFDcEIsVUFBSUMsVUFBVUQsTUFBTUMsT0FBTixJQUFpQkQsTUFBTUUsS0FBckM7O0FBRUEsVUFBSUQsWUFBWTNFLGNBQWhCLEVBQWdDO0FBQzlCLFlBQUkwQyxXQUFXLEtBQUswQixVQUFMLEVBQWY7O0FBRUEsWUFBSTFCLFFBQUosRUFBYztBQUNaLGVBQUtuQyxRQUFMLENBQWNzRSxjQUFkLENBQTZCLElBQTdCOztBQUVBLGVBQUtMLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7Ozs7RUF0TTBCM0UsTzs7QUF5TTdCaUYsT0FBT0MsT0FBUCxHQUFpQjNFLGNBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgQm9keSA9IGVhc3l1aS5Cb2R5LFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzUsXG4gICAgICBOQU1FU1BBQ0UgPSAnRWFzeVVJLURyYWdBbmREcm9wL2RyYWdnaW5nJztcblxudmFyIGJvZHkgPSBuZXcgQm9keSgpO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuZXcgTmFtZUJ1dHRvbih0aGlzLCBuYW1lKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgdmFyIHBhcmVudEVsZW1lbnRzID0gdGhpcy5wYXJlbnRFbGVtZW50cygndWwuZXhwbG9yZXIgbGknKSwgLy8vXG4gICAgICAgIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgcGF0aCA9IHBhcmVudEVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihwYXRoLCBwYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdmFyIHBhcmVudEVsZW1lbnROYW1lID0gcGFyZW50RWxlbWVudC5nZXROYW1lKCk7XG5cbiAgICAgICAgICBwYXRoID0gcGFyZW50RWxlbWVudE5hbWUgKyAnLycgKyBwYXRoO1xuXG4gICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH0sIG5hbWUpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIHRvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQsXG4gICAgICAgIGNzcyA9IHtcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgdmFyIHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXMgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7XG5cbiAgICAgICAgaWYgKChub0RyYWdnaW5nKSB8fCAoIXJvb3REaXJlY3RvcnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXMpIHx8IChyb290RGlyZWN0b3J5ICYmIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICB2YXIgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTsgIC8vL1xuICAgIGJvZHkub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7ICAvLy9cblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9mZk1vdXNlTW92ZShOQU1FU1BBQ0UpOyAvLy9cbiAgICBib2R5Lm9mZk1vdXNlVXAoTkFNRVNQQUNFKTsgLy8vXG5cbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgdmFyIGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==