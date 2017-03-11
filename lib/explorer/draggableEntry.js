'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    window = easyui.window;

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    _this.nameButton = NameButton.fromParentElement(_this, name);

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
      var path = this.explorer.getDraggableEntryPath(this);

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
    value: function onDoubleClick(handler) {
      this.nameButton.onDoubleClick(handler);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds();

      var top = bounds.getTop(),
          left = bounds.getLeft();

      this.topOffset = top - mouseTop;
      this.leftOffset = left - mouseLeft;

      top = top + 'px';
      left = left + 'px';

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      if (escapeKeyStopsDragging) {
        this.on('keydown', this.keyDownHandler.bind(this));
      }

      this.addClass('dragging');
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDragging) {
        this.off('keydown', this.keyDownHandler.bind(this));
      }

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      var top = mouseTop + this.topOffset,
          left = mouseLeft + this.leftOffset;

      top = top + 'px';
      left = left + 'px';

      var css = {
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
              subEntry = !rootDirectory,
              ///
          noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectory = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);

          if (noDragging || subEntry && noDraggingSubEntries || rootDirectory && noDraggingRootDirectory) {
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
      window.on('mouseup blur', this.mouseUpHandler.bind(this));

      window.onMouseMove(this.mouseMoveHandler.bind(this));

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
      window.off('mouseup blur', this.mouseUpHandler.bind(this));

      window.offMouseMove(this.mouseMoveHandler.bind(this));

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
          this.explorer.escapeDragging();

          this.stopDragging();
        }
      }
    }
  }]);

  return DraggableEntry;
}(Element);

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIndpbmRvdyIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsImZyb21QYXJlbnRFbGVtZW50IiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImhhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nIiwiaGFzT3B0aW9uIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsInRvcCIsImdldFRvcCIsImxlZnQiLCJnZXRMZWZ0IiwiY3NzIiwib24iLCJrZXlEb3duSGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJkcmFnZ2luZyIsIm1vdXNlQnV0dG9uIiwic2V0VGltZW91dCIsInJvb3REaXJlY3RvcnkiLCJpc1Jvb3REaXJlY3RvcnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImV2ZW50Iiwia2V5Q29kZSIsIndoaWNoIiwiZXNjYXBlRHJhZ2dpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7QUFBQSxJQUVNQyxTQUFTSCxPQUFPRyxNQUZ0Qjs7QUFJQSxJQUFNQyxVQUFVSCxRQUFRLFlBQVIsQ0FBaEI7QUFBQSxJQUNNSSxhQUFhSixRQUFRLGNBQVIsQ0FEbkI7O0FBR0EsSUFBTUssaUJBQWlCLEVBQXZCO0FBQUEsSUFDTUMsdUJBQXVCLEdBRDdCOztJQUdNQyxjOzs7QUFDSiwwQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDQyxJQUF0QyxFQUE0QztBQUFBOztBQUFBLGdJQUNwQ0gsUUFEb0M7O0FBRzFDLFVBQUtJLFVBQUwsR0FBa0JSLFdBQVdTLGlCQUFYLFFBQW1DSixJQUFuQyxDQUFsQjs7QUFFQSxVQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7O0FBRUEsVUFBS0csT0FBTCxHQUFlLElBQWY7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixJQUFsQjs7QUFF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VyxFQUFhO0FBQ2pELFVBQU1ELFdBQVcsS0FBS3lCLFVBQUwsRUFBakI7O0FBRUEsVUFBSXpCLFFBQUosRUFBYztBQUNaLGFBQUtBLFFBQUwsQ0FBY2YsUUFBZCxFQUF3QkMsU0FBeEI7QUFDRDtBQUNGOzs7bUNBRWM0QyxLLEVBQU87QUFDcEIsVUFBTUMsVUFBVUQsTUFBTUMsT0FBTixJQUFpQkQsTUFBTUUsS0FBdkM7O0FBRUEsVUFBSUQsWUFBWXhFLGNBQWhCLEVBQWdDO0FBQzlCLFlBQU15QyxXQUFXLEtBQUt5QixVQUFMLEVBQWpCOztBQUVBLFlBQUl6QixRQUFKLEVBQWM7QUFDWixlQUFLcEMsUUFBTCxDQUFjcUUsY0FBZDs7QUFFQSxlQUFLTCxZQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7O0VBak4wQnpFLE87O0FBb043QitFLE9BQU9DLE9BQVAsR0FBaUIxRSxjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQsXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IE5hbWVCdXR0b24uZnJvbVBhcmVudEVsZW1lbnQodGhpcywgbmFtZSk7XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmV4cGxvcmVyLmdldERyYWdnYWJsZUVudHJ5UGF0aCh0aGlzKTtcbiAgICBcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcblxuICAgIGxldCB0b3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgIGxlZnQgPSBib3VuZHMuZ2V0TGVmdCgpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDtcbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDtcbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3A6IHRvcCxcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICFyb290RGlyZWN0b3J5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXMgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTtcblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIFxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcblxuICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19