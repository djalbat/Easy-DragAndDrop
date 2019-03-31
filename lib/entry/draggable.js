'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    options = require('../options');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    Element = easy.Element,
    LEFT_MOUSE_BUTTON = Element.LEFT_MOUSE_BUTTON,
    NO_DRAGGING = options.NO_DRAGGING,
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    ESCAPE_KEY_STOPS_DRAGGING = options.ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry(selector, type, explorer) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector, type));

    _this.explorer = explorer;

    _this.setInitialState();
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
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
    key: 'isOverlappingCollapsedBounds',
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

      return overlappingCollapsedBounds;
    }
  }, {
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
      var topmostDirectoryNameDraggableEntry = false;

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft(),
          topOffset = boundsTop - mouseTop,
          leftOffset = boundsLeft - mouseLeft;

      this.setTopOffset(topOffset);

      this.setLeftOffset(leftOffset);

      if (escapeKeyStopsDraggingOptionPresent) {
        var keyDownHandler = this.keyDownHandler.bind(this);

        this.onKeyDown(keyDownHandler);
      }

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDraggingOptionPresent) {
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
      var _this2 = this;

      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          _this2.resetTimeout();

          var noDraggingOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING),
              topmostDirectoryNameDraggableEntry = _this2.isTopmostDirectoryNameDraggableEntry();

          if (topmostDirectoryNameDraggableEntry || noDraggingOptionPresent) {
            return;
          }

          var subEntry = !topmostDirectoryNameDraggableEntry,
              noDraggingSubEntriesOptionPresent = _this2.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

          if (subEntry && noDraggingSubEntriesOptionPresent) {
            return;
          }

          var mouseOver = _this2.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = _this2.explorer.startDragging(_this2);

            if (startedDragging) {
              _this2.startDragging(mouseTop, mouseLeft);
            }
          }
        }, START_DRAGGING_DELAY);

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

      if (mouseButton === LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
      var _this3 = this;

      window.off('blur', this.mouseUpHandler, this); ///

      window.offMouseUp(this.mouseUpHandler, this);

      window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var draggableEntry = this; ///

        this.explorer.stopDragging(draggableEntry, function () {
          _this3.stopDragging();
        });
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
      var state = this.getState(),
          timeout = state.timeout;


      return timeout;
    }
  }, {
    key: 'getTopOffset',
    value: function getTopOffset() {
      var state = this.getState(),
          topOffset = state.topOffset;


      return topOffset;
    }
  }, {
    key: 'getLeftOffset',
    value: function getLeftOffset() {
      var state = this.getState(),
          leftOffset = state.leftOffset;


      return leftOffset;
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
    value: function initialise(properties) {
      this.assignContext();

      var mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);

      this.onMouseDown(mouseDownHandler);
      this.onDoubleClick(doubleClickHandler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var explorer = properties.explorer,
          draggableEntry = Entry.fromProperties(Class, properties, explorer);


      return draggableEntry;
    }
  }]);

  return DraggableEntry;
}(Entry);

Object.assign(DraggableEntry, {
  tagName: 'li',
  defaultProperties: {
    className: 'draggable'
  },
  ignoredProperties: ['explorer']
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwid2luZG93IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkciLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwidHlwZSIsImV4cGxvcmVyIiwic2V0SW5pdGlhbFN0YXRlIiwiZHJhZ2dpbmciLCJoYXNDbGFzcyIsImRyYWdnYWJsZUVudHJ5IiwicGF0aCIsInJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoIiwiYm91bmRzIiwiZ2V0Qm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMiLCJhcmVPdmVybGFwcGluZyIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsImVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiYm91bmRzVG9wIiwiZ2V0VG9wIiwiYm91bmRzTGVmdCIsImdldExlZnQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0Iiwic2V0VG9wT2Zmc2V0Iiwic2V0TGVmdE9mZnNldCIsImtleURvd25IYW5kbGVyIiwiYmluZCIsIm9uS2V5RG93biIsImFkZENsYXNzIiwiZHJhZyIsIm9mZktleURvd24iLCJyZW1vdmVDbGFzcyIsIm1vdXNlQnV0dG9uIiwidGltZW91dCIsImdldFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzZXRUaW1lb3V0Iiwibm9EcmFnZ2luZ09wdGlvblByZXNlbnQiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCIsIm1vdXNlT3ZlciIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJvbiIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZVVwIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiaXNEcmFnZ2luZyIsInN0YXJ0V2FpdGluZ1RvRHJhZyIsIm9mZiIsIm9mZk1vdXNlVXAiLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImtleUNvZGUiLCJlc2NhcGVLZXkiLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwiZ2V0VG9wT2Zmc2V0IiwiZ2V0TGVmdE9mZnNldCIsInRvcCIsImxlZnQiLCJjc3MiLCJnZXRTdGF0ZSIsInN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJhc3NpZ25Db250ZXh0IiwibW91c2VEb3duSGFuZGxlciIsImRvdWJsZUNsaWNrSGFuZGxlciIsIm9uTW91c2VEb3duIiwib25Eb3VibGVDbGljayIsIkNsYXNzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUMsUUFBUUQsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNRSxVQUFVRixR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O0FBQzVCMEYsV0FBUyxJQURtQjtBQUU1QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGUztBQUs1QkMscUJBQW1CLENBQ2pCLFVBRGlCO0FBTFMsQ0FBOUI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUIvRixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBFbGVtZW50LFxuICAgICAgeyBOT19EUkFHR0lORywgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSB0aGlzLmV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCBub0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgfHwgbm9EcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyk7XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vbignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cblxuICAgIHdpbmRvdy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cblxuICAgIHdpbmRvdy5vZmZNb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGtleUNvZGUpIHtcbiAgICBjb25zdCBlc2NhcGVLZXkgPSAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpO1xuXG4gICAgaWYgKGVzY2FwZUtleSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wLFxuICAgICAgbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRpbWVvdXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRpbWVvdXQ7XG4gIH1cblxuICBnZXRUb3BPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRvcE9mZnNldDtcbiAgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBsZWZ0T2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBsZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IEVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBleHBsb3Jlcik7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RyYWdnYWJsZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnZXhwbG9yZXInXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19