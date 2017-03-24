'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    Element = easy.Element,
    window = easy.window,
    React = easy.React;

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    var nameButton = React.createElement(
      NameButton,
      null,
      name
    );

    _this.explorer = explorer;

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.nameButton = nameButton;

    _this.append(nameButton);

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
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft();

      this.topOffset = boundsTop - mouseTop;
      this.leftOffset = boundsLeft - mouseLeft;

      if (escapeKeyStopsDragging) {
        this.on('keydown', this.keyDownHandler.bind(this));
      }

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
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
      this.drag(mouseTop, mouseLeft);

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
  }, {
    key: 'drag',
    value: function drag(mouseTop, mouseLeft) {
      var windowScrollTop = window.getScrollTop(),
          windowScrollLeft = window.getScrollLeft(),
          top = mouseTop + this.topOffset - windowScrollTop + 'px',
          left = mouseLeft + this.leftOffset - windowScrollLeft + 'px';

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return Element.fromProperties.apply(Element, [Class, properties].concat(remainingArguments));
    }
  }]);

  return DraggableEntry;
}(Element);

Object.assign(DraggableEntry, {
  tagName: 'li'
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ3aW5kb3ciLCJSZWFjdCIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwiYXBwZW5kIiwib25Nb3VzZURvd24iLCJtb3VzZURvd25IYW5kbGVyIiwiYmluZCIsImdldE5hbWUiLCJwYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInNldE5hbWUiLCJoYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyIsImhhc09wdGlvbiIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsIm9uIiwia2V5RG93bkhhbmRsZXIiLCJhZGRDbGFzcyIsImRyYWciLCJvZmYiLCJyZW1vdmVDbGFzcyIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsInN1YkVudHJ5Iiwibm9EcmFnZ2luZyIsIk5PX0RSQUdHSU5HIiwibm9EcmFnZ2luZ1N1YkVudHJpZXMiLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIm5vRHJhZ2dpbmdSb290RGlyZWN0b3J5IiwiTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkiLCJtb3VzZU92ZXIiLCJpc01vdXNlT3ZlciIsInN0YXJ0ZWREcmFnZ2luZyIsInN0YXJ0RHJhZ2dpbmciLCJjbGVhclRpbWVvdXQiLCJoYXNDbGFzcyIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiaXNEcmFnZ2luZyIsInN0YXJ0V2FpdGluZ1RvRHJhZyIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwiZXZlbnQiLCJrZXlDb2RlIiwid2hpY2giLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwidG9wIiwibGVmdCIsImNzcyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxVQUFVRixLQUFLRSxPQURyQjtBQUFBLElBRU1DLFNBQVNILEtBQUtHLE1BRnBCO0FBQUEsSUFHTUMsUUFBUUosS0FBS0ksS0FIbkI7O0FBS0EsSUFBTUMsVUFBVUosUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUssYUFBYUwsUUFBUSxjQUFSLENBRG5COztBQUdBLElBQU1NLGlCQUFpQixFQUF2QjtBQUFBLElBQ01DLHVCQUF1QixHQUQ3Qjs7SUFHTUMsYzs7O0FBQ0osMEJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0MsSUFBdEMsRUFBNEM7QUFBQTs7QUFBQSxnSUFD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Y0FBZCxFQUE4QjtBQUM1QnNGLFdBQVM7QUFEbUIsQ0FBOUI7O0FBSUFDLE9BQU9DLE9BQVAsR0FBaUJ4RixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5LkVsZW1lbnQsXG4gICAgICB3aW5kb3cgPSBlYXN5LndpbmRvdyxcbiAgICAgIFJlYWN0ID0gZWFzeS5SZWFjdDtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1O1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuYW1lQnV0dG9uO1xuICAgIFxuICAgIHRoaXMuYXBwZW5kKG5hbWVCdXR0b24pO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5leHBsb3Jlci5nZXREcmFnZ2FibGVFbnRyeVBhdGgodGhpcyk7XG4gICAgXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhoYW5kbGVyKTsgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXJvb3REaXJlY3RvcnksICAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkpO1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ21vdXNldXAgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wID0gYCR7bW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcH1weGAsXG4gICAgICAgICAgbGVmdCA9IGAke21vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnR9cHhgO1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iXX0=