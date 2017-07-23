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
      var mouseUpHandler = this.mouseUpHandler.bind(this),
          mouseMoveHandler = this.mouseMoveHandler.bind(this);

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
      window.off('mouseup blur');

      window.offMouseMove();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIkVsZW1lbnQiLCJSZWFjdCIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInNldEluaXRpYWxTdGF0ZSIsImdldE5hbWUiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiaGlkZGVuIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwiZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyIsImhhc09wdGlvbiIsIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkciLCJib3VuZHNUb3AiLCJnZXRUb3AiLCJib3VuZHNMZWZ0IiwiZ2V0TGVmdCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJzZXRUb3BPZmZzZXQiLCJzZXRMZWZ0T2Zmc2V0Iiwia2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25LZXlEb3duIiwiZHJhZyIsIm9mZktleURvd24iLCJtb3VzZUJ1dHRvbiIsInRpbWVvdXQiLCJnZXRUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0VGltZW91dCIsInJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm1vdXNlVXBIYW5kbGVyIiwibW91c2VNb3ZlSGFuZGxlciIsIm9uIiwib25Nb3VzZU1vdmUiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmYiLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImtleUNvZGUiLCJlc2NhcGVLZXkiLCJlc2NhcGVEcmFnZ2luZyIsIndpbmRvd1Njcm9sbFRvcCIsImdldFNjcm9sbFRvcCIsIndpbmRvd1Njcm9sbExlZnQiLCJnZXRTY3JvbGxMZWZ0IiwiZ2V0VG9wT2Zmc2V0IiwiZ2V0TGVmdE9mZnNldCIsInRvcCIsImxlZnQiLCJjc3MiLCJmcm9tU3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwiYXBwZW5kIiwibW91c2VEb3duSGFuZGxlciIsIm9uTW91c2VEb3duIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwicmVtYWluaW5nQXJndW1lbnRzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFBQSxJ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QUwsQ0FBWSxLQUFLckYsVUFBakI7O0FBRUEsVUFBTXNGLG1CQUFtQixLQUFLQSxnQkFBTCxDQUFzQnJELElBQXRCLENBQTJCLElBQTNCLENBQXpCOztBQUVBLFdBQUtzRCxXQUFMLENBQWlCRCxnQkFBakI7QUFDRDs7O21DQUVxQkUsSyxFQUFPQyxVLEVBQW1DO0FBQUEsd0NBQXBCQyxrQkFBb0I7QUFBcEJBLDBCQUFvQjtBQUFBOztBQUFFLGFBQU9qRyxRQUFRa0csY0FBUixpQkFBdUJILEtBQXZCLEVBQThCQyxVQUE5QixTQUE2Q0Msa0JBQTdDLEVBQVA7QUFBMEU7Ozs7RUF4U2pIakcsTzs7QUEyUzdCbUcsT0FBT0MsTUFBUCxDQUFjbEcsY0FBZCxFQUE4QjtBQUM1Qm1HLFdBQVM7QUFEbUIsQ0FBOUI7O0FBSUFDLE9BQU9DLE9BQVAsR0FBaUJyRyxjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1O1xuXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICBcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNIaWRkZW4oKSB7XG4gICAgY29uc3QgaGlkZGVuID0gdGhpcy5oYXNDbGFzcygnaGlkZGVuJyk7XG5cbiAgICByZXR1cm4gaGlkZGVuO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gdGhpcy5leHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuICBcbiAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBzZXRIaWRkZW4oaGlkZGVuKSB7XG4gICAgaGlkZGVuID9cbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2hpZGRlbicpIDpcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH1cbiAgXG4gIHNob3coKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH1cbiAgXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnaGlkZGVuJyk7XG4gIH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soaGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCk7XG5cbiAgICB0aGlzLnNldExlZnRPZmZzZXQobGVmdE9mZnNldCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICFyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXMgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTsgIC8vL1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IG1vdXNlVXBIYW5kbGVyID0gdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIG1vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgXG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKG1vdXNlTW92ZUhhbmRsZXIpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignbW91c2V1cCBibHVyJyk7XG4gICAgXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSgpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihrZXlDb2RlKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIGxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDsgLy8vXG4gICAgbGVmdCA9IGAke2xlZnR9cHhgOyAvLy9cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCd0aW1lb3V0Jyk7IH1cblxuICBnZXRUb3BPZmZzZXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgndG9wT2Zmc2V0Jyk7IH1cblxuICBnZXRMZWZ0T2Zmc2V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ2xlZnRPZmZzZXQnKTsgfVxuXG4gIHNldFRpbWVvdXQodGltZW91dCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdGltZW91dDogdGltZW91dFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldDogbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXBwZW5kKHRoaXMubmFtZUJ1dHRvbik7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==