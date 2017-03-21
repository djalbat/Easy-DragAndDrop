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
      { className: 'name' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVsZW1lbnQiLCJ3aW5kb3ciLCJSZWFjdCIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwiYXBwZW5kIiwib25Nb3VzZURvd24iLCJtb3VzZURvd25IYW5kbGVyIiwiYmluZCIsImdldE5hbWUiLCJwYXRoIiwiZ2V0RHJhZ2dhYmxlRW50cnlQYXRoIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInNldE5hbWUiLCJoYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyIsImhhc09wdGlvbiIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsIm9uIiwia2V5RG93bkhhbmRsZXIiLCJhZGRDbGFzcyIsImRyYWciLCJvZmYiLCJyZW1vdmVDbGFzcyIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsInN1YkVudHJ5Iiwibm9EcmFnZ2luZyIsIk5PX0RSQUdHSU5HIiwibm9EcmFnZ2luZ1N1YkVudHJpZXMiLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIm5vRHJhZ2dpbmdSb290RGlyZWN0b3J5IiwiTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkiLCJtb3VzZU92ZXIiLCJpc01vdXNlT3ZlciIsInN0YXJ0ZWREcmFnZ2luZyIsInN0YXJ0RHJhZ2dpbmciLCJjbGVhclRpbWVvdXQiLCJoYXNDbGFzcyIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiaXNEcmFnZ2luZyIsInN0YXJ0V2FpdGluZ1RvRHJhZyIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwiZXZlbnQiLCJrZXlDb2RlIiwid2hpY2giLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwidG9wIiwibGVmdCIsImNzcyIsIkNsYXNzIiwicHJvcGVydGllcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFBQSxJQUNNQyxVQUFVRixLQUFLRSxPQURyQjtBQUFBLElBRU1DLFNBQVNILEtBQUtHLE1BRnBCO0FBQUEsSUFHTUMsUUFBUUosS0FBS0ksS0FIbkI7O0FBS0EsSUFBTUMsVUFBVUosUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUssYUFBYUwsUUFBUSxjQUFSLENBRG5COztBQUdBLElBQU1NLGlCQUFpQixFQUF2QjtBQUFBLElBQ01DLHVCQUF1QixHQUQ3Qjs7SUFHTUMsYzs7O0FBQ0osMEJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0MsSUFBdEMsRUFBNEM7QUFBQTs7QUFBQSxnSUFD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T0FBT0MsTUFBUCxDQUFjckYsY0FBZCxFQUE4QjtBQUM1QnNGLFdBQVM7QUFEbUIsQ0FBOUI7O0FBSUFDLE9BQU9DLE9BQVAsR0FBaUJ4RixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5LkVsZW1lbnQsXG4gICAgICB3aW5kb3cgPSBlYXN5LndpbmRvdyxcbiAgICAgIFJlYWN0ID0gZWFzeS5SZWFjdDtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1O1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmFtZUJ1dHRvbjtcbiAgICBcbiAgICB0aGlzLmFwcGVuZChuYW1lQnV0dG9uKTtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZXhwbG9yZXIuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKHRoaXMpO1xuICAgIFxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soaGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKTtcblxuICAgIHRoaXMudG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3A7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICFyb290RGlyZWN0b3J5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXMgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTtcblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIFxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcblxuICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcCA9IGAke21vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3B9cHhgLFxuICAgICAgICAgIGxlZnQgPSBgJHttb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0fXB4YDtcblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19