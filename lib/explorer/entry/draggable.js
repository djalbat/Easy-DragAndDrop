'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    options = require('../../options'),
    NameButton = require('../nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    React = easy.React,
    Element = easy.Element,
    LEFT_MOUSE_BUTTON = Element.LEFT_MOUSE_BUTTON,
    NO_DRAGGING = options.NO_DRAGGING,
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    NO_DRAGGING_TOPMOST_DIRECTORY = options.NO_DRAGGING_TOPMOST_DIRECTORY,
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
      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          this.resetTimeout();

          var topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              ///
          noDraggingOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING),
              noDraggingSubEntriesOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES),
              noDraggingTopmostDirectoryNameDraggableEntryOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_TOPMOST_DIRECTORY); ///

          if (noDraggingOptionPresent || subEntry && noDraggingSubEntriesOptionPresent || topmostDirectoryNameDraggableEntry && noDraggingTopmostDirectoryNameDraggableEntryOptionPresent) {
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
    key: 'childElements',
    value: function childElements(properties) {
      var name = properties.name;


      return React.createElement(
        NameButton,
        null,
        name
      );
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      this.assignContext();

      var mouseDownHandler = this.mouseDownHandler.bind(this);

      this.onMouseDown(mouseDownHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIlJlYWN0IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkciLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIk5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJ0eXBlIiwiZXhwbG9yZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCIsImlzT3B0aW9uUHJlc2VudCIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsInNldFRvcE9mZnNldCIsInNldExlZnRPZmZzZXQiLCJrZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbktleURvd24iLCJhZGRDbGFzcyIsImRyYWciLCJvZmZLZXlEb3duIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZUJ1dHRvbiIsInRpbWVvdXQiLCJnZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0VGltZW91dCIsInRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmdPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50Iiwibm9EcmFnZ2luZ1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPcHRpb25QcmVzZW50IiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm9uIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmIiwib2ZmTW91c2VVcCIsIm9mZk1vdXNlTW92ZSIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwia2V5Q29kZSIsImVzY2FwZUtleSIsImVzY2FwZURyYWdnaW5nIiwid2luZG93U2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9wIiwid2luZG93U2Nyb2xsTGVmdCIsImdldFNjcm9sbExlZnQiLCJnZXRUb3BPZmZzZXQiLCJnZXRMZWZ0T2Zmc2V0IiwidG9wIiwibGVmdCIsImNzcyIsImZyb21TdGF0ZSIsInVwZGF0ZVN0YXRlIiwic2V0U3RhdGUiLCJwcm9wZXJ0aWVzIiwibmFtZSIsImFzc2lnbkNvbnRleHQiLCJtb3VzZURvd25IYW5kbGVyIiwib25Nb3VzZURvd24iLCJDbGFzcyIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7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VUFBZixDQUFFN0UsUUFBRjtBQUFBLFVBQ0FJLGNBREEsR0FDaUJwQixNQUFNbUcsY0FBTixDQUFxQkQsS0FBckIsRUFBNEJMLFVBQTVCLEVBQXdDN0UsUUFBeEMsQ0FEakI7OztBQUdOLGFBQU9JLGNBQVA7QUFDRDs7OztFQXRSMEJwQixLOztBQXlSN0JvRyxPQUFPQyxNQUFQLENBQWN4RixjQUFkLEVBQThCO0FBQzVCeUYsV0FBUyxJQURtQjtBQUU1QkMscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE0sR0FGUztBQUs1QkMscUJBQW1CLENBQ2pCLFVBRGlCO0FBTFMsQ0FBOUI7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUI5RixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBSZWFjdCwgRWxlbWVudCB9ID0gZWFzeSxcbiAgICAgIHsgTEVGVF9NT1VTRV9CVVRUT04gfSA9IEVsZW1lbnQsXG4gICAgICB7IE5PX0RSQUdHSU5HLCBOT19EUkFHR0lOR19TVUJfRU5UUklFUywgTk9fRFJBR0dJTkdfVE9QTU9TVF9ESVJFQ1RPUlksIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSB0aGlzLmV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG4gIFxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZKTsgIC8vL1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZ09wdGlvblByZXNlbnQpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHx8ICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICYmIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vbignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cblxuICAgIHdpbmRvdy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cblxuICAgIHdpbmRvdy5vZmZNb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihrZXlDb2RlKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIGxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDsgLy8vXG4gICAgbGVmdCA9IGAke2xlZnR9cHhgOyAvLy9cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCd0aW1lb3V0Jyk7IH1cblxuICBnZXRUb3BPZmZzZXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgndG9wT2Zmc2V0Jyk7IH1cblxuICBnZXRMZWZ0T2Zmc2V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ2xlZnRPZmZzZXQnKTsgfVxuXG4gIHNldFRpbWVvdXQodGltZW91dCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdGltZW91dDogdGltZW91dFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldDogbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4oXG5cbiAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj5cblxuICAgICk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgZXhwbG9yZXIpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkcmFnZ2FibGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==