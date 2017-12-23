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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kcmFnZ2FibGUuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJFbnRyeSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIlJlYWN0IiwiRWxlbWVudCIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiTk9fRFJBR0dJTkciLCJOT19EUkFHR0lOR19TVUJfRU5UUklFUyIsIk5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJ0eXBlIiwiZXhwbG9yZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwibmFtZSIsIm5hbWVCdXR0b24iLCJzZXROYW1lIiwiaGFuZGxlciIsIm9uRG91YmxlQ2xpY2siLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsImVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50IiwiaXNPcHRpb25QcmVzZW50IiwiYm91bmRzVG9wIiwiZ2V0VG9wIiwiYm91bmRzTGVmdCIsImdldExlZnQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0Iiwic2V0VG9wT2Zmc2V0Iiwic2V0TGVmdE9mZnNldCIsImtleURvd25IYW5kbGVyIiwiYmluZCIsIm9uS2V5RG93biIsImFkZENsYXNzIiwiZHJhZyIsIm9mZktleURvd24iLCJyZW1vdmVDbGFzcyIsIm1vdXNlQnV0dG9uIiwidGltZW91dCIsImdldFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzZXRUaW1lb3V0IiwidG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsImlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInN1YkVudHJ5Iiwibm9EcmFnZ2luZ09wdGlvblByZXNlbnQiLCJub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQiLCJub0RyYWdnaW5nVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU9wdGlvblByZXNlbnQiLCJtb3VzZU92ZXIiLCJpc01vdXNlT3ZlciIsInN0YXJ0ZWREcmFnZ2luZyIsInN0YXJ0RHJhZ2dpbmciLCJjbGVhclRpbWVvdXQiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwib24iLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZVVwIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsImdldFRvcE9mZnNldCIsImdldExlZnRPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiY3NzIiwiZnJvbVN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsInByb3BlcnRpZXMiLCJhc3NpZ25Db250ZXh0IiwibW91c2VEb3duSGFuZGxlciIsIm9uTW91c2VEb3duIiwiQ2xhc3MiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsImlnbm9yZWRQcm9w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YUE7QUFBYixPQUZKO0FBS0Q7OztpQ0FFWTtBQUNYLFdBQUt1RSxhQUFMOztBQUVBLFVBQU1DLG1CQUFtQixLQUFLQSxnQkFBTCxDQUFzQnRELElBQXRCLENBQTJCLElBQTNCLENBQXpCOztBQUVBLFdBQUt1RCxXQUFMLENBQWlCRCxnQkFBakI7QUFDRDs7O21DQUVxQkUsSyxFQUFPSixVLEVBQVk7QUFDakMsVUFBRWxGLFFBQUYsR0FBZWtGLFVBQWYsQ0FBRWxGLFFBQUY7QUFBQSxVQUNBSSxjQURBLEdBQ2lCcEIsTUFBTXVHLGNBQU4sQ0FBcUJELEtBQXJCLEVBQTRCSixVQUE1QixFQUF3Q2xGLFFBQXhDLENBRGpCOzs7QUFHTixhQUFPSSxjQUFQO0FBQ0Q7Ozs7RUExUjBCcEIsSzs7QUE2UjdCd0csT0FBT0MsTUFBUCxDQUFjNUYsY0FBZCxFQUE4QjtBQUM1QjZGLFdBQVMsSUFEbUI7QUFFNUJDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRlM7QUFLNUJDLHFCQUFtQixDQUNqQixVQURpQjtBQUxTLENBQTlCOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCbEcsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi4vLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL25hbWVCdXR0b24nKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1O1xuXG5jb25zdCB7IHdpbmRvdywgUmVhY3QsIEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBFbGVtZW50LFxuICAgICAgeyBOT19EUkFHR0lORywgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsIE5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZLCBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHR5cGUsIGV4cGxvcmVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gdGhpcy5leHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuICBcbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCk7XG5cbiAgICB0aGlzLnNldExlZnRPZmZzZXQobGVmdE9mZnNldCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGtleURvd25IYW5kbGVyID0gdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgXG4gICAgICB0aGlzLm9uS2V5RG93bihrZXlEb3duSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICB0aGlzLm9mZktleURvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU9wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19UT1BNT1NUX0RJUkVDVE9SWSk7ICAvLy9cblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB8fCAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50KSB8fCAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAmJiBub0RyYWdnaW5nVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU9wdGlvblByZXNlbnQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ2JsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgICB3aW5kb3cub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgICB3aW5kb3cub2ZmTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3A6IHRvcCxcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHJlc2V0VGltZW91dCgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gIH1cbiAgXG4gIGdldFRpbWVvdXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgndGltZW91dCcpOyB9XG5cbiAgZ2V0VG9wT2Zmc2V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ3RvcE9mZnNldCcpOyB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdsZWZ0T2Zmc2V0Jyk7IH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXQ6IHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldDogdG9wT2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGxlZnRPZmZzZXQ6IGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBudWxsLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZW91dDogdGltZW91dCxcbiAgICAgIHRvcE9mZnNldDogdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldDogbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuKFxuXG4gICAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj5cblxuICAgICk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgZXhwbG9yZXIpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkcmFnZ2FibGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==