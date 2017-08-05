'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    Element = easy.Element,
    React = easy.React;

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    _this.nameButton = React.createElement(
      NameButton,
      null,
      name
    );

    _this.explorer = explorer;

    _this.type = type;

    _this.setInitialState();
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
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var draggableEntry = this,
          ///
      path = this.explorer.retrieveDraggableEntryPath(draggableEntry);

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
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
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
          boundsLeft = bounds.getLeft(),
          topOffset = boundsTop - mouseTop,
          leftOffset = boundsLeft - mouseLeft;

      this.setTopOffset(topOffset);

      this.setLeftOffset(leftOffset);

      if (escapeKeyStopsDragging) {
        var keyDownHandler = this.keyDownHandler.bind(this);

        this.onKeyDown(keyDownHandler);
      }

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDragging) {
        this.offKeyDown();
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
      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          this.resetTimeout();

          var topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              ///
          noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingTopmostDirectoryNameDraggableEntry = this.explorer.hasOption(options.NO_DRAGGING_TOPMOST_DIRECTORY); ///

          if (noDragging || subEntry && noDraggingSubEntries || topmostDirectoryNameDraggableEntry && noDraggingTopmostDirectoryNameDraggableEntry) {
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

        this.setTimeout(timeout);
      }
    }
  }, {
    key: 'stopWaitingToDrag',
    value: function stopWaitingToDrag() {
      var timeout = this.getTimeout();

      if (timeout !== null) {
        clearTimeout(timeout);

        this.resetTimeout();
      }
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
      window.on('blur', this.mouseUpHandler, this); ///

      window.onMouseUp(this.mouseUpHandler, this);

      window.onMouseMove(this.mouseMoveHandler, this);

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
      window.off('blur', this.mouseUpHandler, this); ///

      window.offMouseUp(this.mouseUpHandler, this);

      window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var draggableEntry = this; ///

        this.explorer.stopDragging(draggableEntry, function () {
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
    value: function keyDownHandler(keyCode) {
      var escapeKey = keyCode === ESCAPE_KEYCODE;

      if (escapeKey) {
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
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset();

      var top = mouseTop + topOffset - windowScrollTop,
          left = mouseLeft + leftOffset - windowScrollLeft;

      top = top + 'px'; ///
      left = left + 'px'; ///

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
    }
  }, {
    key: 'resetTimeout',
    value: function resetTimeout() {
      var timeout = null;

      this.setTimeout(timeout);
    }
  }, {
    key: 'getTimeout',
    value: function getTimeout() {
      return this.fromState('timeout');
    }
  }, {
    key: 'getTopOffset',
    value: function getTopOffset() {
      return this.fromState('topOffset');
    }
  }, {
    key: 'getLeftOffset',
    value: function getLeftOffset() {
      return this.fromState('leftOffset');
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      this.updateState({
        timeout: timeout
      });
    }
  }, {
    key: 'setTopOffset',
    value: function setTopOffset(topOffset) {
      this.updateState({
        topOffset: topOffset
      });
    }
  }, {
    key: 'setLeftOffset',
    value: function setLeftOffset(leftOffset) {
      this.updateState({
        leftOffset: leftOffset
      });
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState() {
      var timeout = null,
          topOffset = null,
          leftOffset = null;

      this.setState({
        timeout: timeout,
        topOffset: topOffset,
        leftOffset: leftOffset
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      this.append(this.nameButton);

      var mouseDownHandler = this.mouseDownHandler.bind(this);

      this.onMouseDown(mouseDownHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIkVsZW1lbnQiLCJSZWFjdCIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInNldEluaXRpYWxTdGF0ZSIsImdldE5hbWUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImhhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nIiwiaGFzT3B0aW9uIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsInNldFRvcE9mZnNldCIsInNldExlZnRPZmZzZXQiLCJrZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbktleURvd24iLCJhZGRDbGFzcyIsImRyYWciLCJvZmZLZXlEb3duIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZUJ1dHRvbiIsInRpbWVvdXQiLCJnZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0VGltZW91dCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIk5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZVVwIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwiZnJvbVN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsImFwcGVuZCIsIm1vdXNlRG93bkhhbmRsZXIiLCJvbk1vdXNlRG93biIsIkNsYXNzIiwicHJvcGVydGllcyIsInJlbWFpbmluZ0FyZ3VtZW50cyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMs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cUJFLEssRUFBT0MsVSxFQUFtQztBQUFBLHdDQUFwQkMsa0JBQW9CO0FBQXBCQSwwQkFBb0I7QUFBQTs7QUFBRSxhQUFPbEcsUUFBUW1HLGNBQVIsaUJBQXVCSCxLQUF2QixFQUE4QkMsVUFBOUIsU0FBNkNDLGtCQUE3QyxFQUFQO0FBQTBFOzs7O0VBclJqSGxHLE87O0FBd1I3Qm9HLE9BQU9DLE1BQVAsQ0FBY25HLGNBQWQsRUFBOEI7QUFDNUJvRyxXQUFTO0FBRG1CLENBQTlCOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCdEcsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IHRoaXMuZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cbiAgXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhoYW5kbGVyKTsgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vZmZLZXlEb3duKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfVE9QTU9TVF9ESVJFQ1RPUlkpOyAgLy8vXG5cbiAgICAgICAgaWYgKChub0RyYWdnaW5nKSB8fCAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXMpIHx8ICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICYmIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgICAgXG4gICAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgICB3aW5kb3cub2ZmTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3A6IHRvcCxcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHJlc2V0VGltZW91dCgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gIH1cbiAgXG4gIGdldFRpbWVvdXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgndGltZW91dCcpOyB9XG5cbiAgZ2V0VG9wT2Zmc2V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ3RvcE9mZnNldCcpOyB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdsZWZ0T2Zmc2V0Jyk7IH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXQ6IHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldDogdG9wT2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGxlZnRPZmZzZXQ6IGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBudWxsLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZW91dDogdGltZW91dCxcbiAgICAgIHRvcE9mZnNldDogdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldDogbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFwcGVuZCh0aGlzLm5hbWVCdXR0b24pO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iXX0=