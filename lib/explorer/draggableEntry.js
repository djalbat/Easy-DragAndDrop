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
    key: 'isHidden',
    value: function isHidden() {
      var hidden = this.hasClass('hidden');

      return hidden;
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
    key: 'isRootDirectoryNameDraggableEntry',
    value: function isRootDirectoryNameDraggableEntry() {
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
    key: 'setHidden',
    value: function setHidden(hidden) {
      hidden ? this.addClass('hidden') : this.removeClass('hidden');
    }
  }, {
    key: 'show',
    value: function show() {
      this.removeClass('hidden');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.addClass('hidden');
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

          var rootDirectoryNameDraggableEntry = this.isRootDirectoryNameDraggableEntry(),
              subEntry = !rootDirectoryNameDraggableEntry,
              ///
          noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectoryNameDraggableEntry = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY); ///

          if (noDragging || subEntry && noDraggingSubEntries || rootDirectoryNameDraggableEntry && noDraggingRootDirectoryNameDraggableEntry) {
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
      var mouseUpHandler = this.getMouseUpHandler(),
          mouseMoveHandler = this.getMouseMoveHandler();

      window.on('mouseup blur', mouseUpHandler);

      window.onMouseMove(mouseMoveHandler);

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
      var mouseUpHandler = this.getMouseUpHandler(),
          mouseMoveHandler = this.getMouseMoveHandler();

      window.off('mouseup blur', mouseUpHandler);

      window.offMouseMove(mouseMoveHandler);

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
    key: 'getMouseUpHandler',
    value: function getMouseUpHandler() {
      return this.fromState('mouseUpHandler');
    }
  }, {
    key: 'getMouseMoveHandler',
    value: function getMouseMoveHandler() {
      return this.fromState('mouseMoveHandler');
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
          leftOffset = null,
          mouseUpHandler = this.mouseUpHandler.bind(this),
          mouseMoveHandler = this.mouseMoveHandler.bind(this);

      this.setState({
        timeout: timeout,
        topOffset: topOffset,
        leftOffset: leftOffset,
        mouseUpHandler: mouseUpHandler,
        mouseMoveHandler: mouseMoveHandler
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIkVsZW1lbnQiLCJSZWFjdCIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInNldEluaXRpYWxTdGF0ZSIsImdldE5hbWUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiaGlkZGVuIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyIsImhhc09wdGlvbiIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJzZXRUb3BPZmZzZXQiLCJzZXRMZWZ0T2Zmc2V0Iiwia2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25LZXlEb3duIiwiZHJhZyIsIm9mZktleURvd24iLCJtb3VzZUJ1dHRvbiIsInRpbWVvdXQiLCJnZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0VGltZW91dCIsInJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm1vdXNlVXBIYW5kbGVyIiwiZ2V0TW91c2VVcEhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwiZ2V0TW91c2VNb3ZlSGFuZGxlciIsIm9uIiwib25Nb3VzZU1vdmUiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImtleUNvZGUiLCJlc2NhcGVLZXkiLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwiZ2V0VG9wT2Zmc2V0IiwiZ2V0TGVmdE9mZnNldCIsInRvcCIsImxlZnQiLCJjc3MiLCJmcm9tU3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwiYXBwZW5kIiwibW91c2VEb3duSGFuZGxlciIsIm9uTW91c2VEb3duIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FB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QWpCO0FBR0Q7OztzQ0FFaUI7QUFDaEIsVUFBTVMsVUFBVSxJQUFoQjtBQUFBLFVBQ01WLFlBQVksSUFEbEI7QUFBQSxVQUVNQyxhQUFhLElBRm5CO0FBQUEsVUFHTThCLGlCQUFpQixLQUFLQSxjQUFMLENBQW9CMUIsSUFBcEIsQ0FBeUIsSUFBekIsQ0FIdkI7QUFBQSxVQUlNNEIsbUJBQW1CLEtBQUtBLGdCQUFMLENBQXNCNUIsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FKekI7O0FBTUEsV0FBS3FELFFBQUwsQ0FBYztBQUNaaEQsaUJBQVNBLE9BREc7QUFFWlYsbUJBQVdBLFNBRkM7QUFHWkMsb0JBQVlBLFVBSEE7QUFJWjhCLHdCQUFnQkEsY0FKSjtBQUtaRSwwQkFBa0JBO0FBTE4sT0FBZDtBQU9EOzs7aUNBRVk7QUFDWCxXQUFLMEIsTUFBTCxDQUFZLEtBQUt2RixVQUFqQjs7QUFFQSxVQUFNd0YsbUJBQW1CLEtBQUtBLGdCQUFMLENBQXNCdkQsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBekI7O0FBRUEsV0FBS3dELFdBQUwsQ0FBaUJELGdCQUFqQjtBQUNEOzs7bUNBRXFCRSxLLEVBQU9DLFUsRUFBbUM7QUFBQSx3Q0FBcEJDLGtCQUFvQjtBQUFwQkEsMEJBQW9CO0FBQUE7O0FBQUUsYUFBT25HLFFBQVFvRyxjQUFSLGlCQUF1QkgsS0FBdkIsRUFBOEJDLFVBQTlCLFNBQTZDQyxrQkFBN0MsRUFBUDtBQUEwRTs7OztFQW5UakhuRyxPOztBQXNUN0JxRyxPQUFPQyxNQUFQLENBQWNwRyxjQUFkLEVBQThCO0FBQzVCcUcsV0FBUztBQURtQixDQUE5Qjs7QUFJQUMsT0FBT0MsT0FBUCxHQUFpQnZHLGNBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIFxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc0hpZGRlbigpIHtcbiAgICBjb25zdCBoaWRkZW4gPSB0aGlzLmhhc0NsYXNzKCdoaWRkZW4nKTtcblxuICAgIHJldHVybiBoaWRkZW47XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSB0aGlzLmV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG4gIFxuICBpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBzZXRIaWRkZW4oaGlkZGVuKSB7XG4gICAgaGlkZGVuID9cbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2hpZGRlbicpIDpcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH1cbiAgXG4gIHNob3coKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH1cbiAgXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnaGlkZGVuJyk7XG4gIH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soaGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCk7XG5cbiAgICB0aGlzLnNldExlZnRPZmZzZXQobGVmdE9mZnNldCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICFyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXMgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTsgIC8vL1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IG1vdXNlVXBIYW5kbGVyID0gdGhpcy5nZXRNb3VzZVVwSGFuZGxlcigpLFxuICAgICAgICAgIG1vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLmdldE1vdXNlTW92ZUhhbmRsZXIoKTtcbiAgICAgICAgXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKG1vdXNlTW92ZUhhbmRsZXIpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgbW91c2VVcEhhbmRsZXIgPSB0aGlzLmdldE1vdXNlVXBIYW5kbGVyKCksXG4gICAgICAgICAgbW91c2VNb3ZlSGFuZGxlciA9IHRoaXMuZ2V0TW91c2VNb3ZlSGFuZGxlcigpO1xuXG4gICAgd2luZG93Lm9mZignbW91c2V1cCBibHVyJywgbW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUobW91c2VNb3ZlSGFuZGxlcik7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cbiAgICAgIFxuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGtleUNvZGUpIHtcbiAgICBjb25zdCBlc2NhcGVLZXkgPSAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpO1xuXG4gICAgaWYgKGVzY2FwZUtleSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ3RpbWVvdXQnKTsgfVxuXG4gIGdldFRvcE9mZnNldCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCd0b3BPZmZzZXQnKTsgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgnbGVmdE9mZnNldCcpOyB9XG5cbiAgZ2V0TW91c2VVcEhhbmRsZXIoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgnbW91c2VVcEhhbmRsZXInKTsgfVxuXG4gIGdldE1vdXNlTW92ZUhhbmRsZXIoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgnbW91c2VNb3ZlSGFuZGxlcicpOyB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXQ6IHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBtb3VzZVVwSGFuZGxlciA9IHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBtb3VzZU1vdmVIYW5kbGVyID0gdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0LFxuICAgICAgbW91c2VVcEhhbmRsZXI6IG1vdXNlVXBIYW5kbGVyLFxuICAgICAgbW91c2VNb3ZlSGFuZGxlcjogbW91c2VNb3ZlSGFuZGxlclxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFwcGVuZCh0aGlzLm5hbWVCdXR0b24pO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iXX0=