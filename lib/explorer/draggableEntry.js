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

    _this.boundMouseUpHandler = _this.mouseUpHandler.bind(_this);
    _this.boundMouseDownHandler = _this.mouseDownHandler.bind(_this);
    _this.boundMouseMoveHandler = _this.mouseMoveHandler.bind(_this);

    _this.onMouseDown(_this.boundMouseDownHandler);

    _this.append(nameButton);
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
        this.onKeyDown(this.keyDownHandler.bind(this));
      }

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDragging) {
        this.off('keydown');
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
      window.on('mouseup blur', this.boundMouseUpHandler);

      window.onMouseMove(this.boundMouseMoveHandler);

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
      window.off('mouseup blur', this.boundMouseUpHandler);

      window.offMouseMove(this.boundMouseMoveHandler);

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
          windowScrollLeft = window.getScrollLeft();

      var top = mouseTop + this.topOffset - windowScrollTop,
          left = mouseLeft + this.leftOffset - windowScrollLeft;

      top = top + 'px'; ///
      left = left + 'px'; ///

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIkVsZW1lbnQiLCJSZWFjdCIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwiYm91bmRNb3VzZVVwSGFuZGxlciIsIm1vdXNlVXBIYW5kbGVyIiwiYmluZCIsImJvdW5kTW91c2VEb3duSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJib3VuZE1vdXNlTW92ZUhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwib25Nb3VzZURvd24iLCJhcHBlbmQiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiaGlkZGVuIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJzZXROYW1lIiwiaGFuZGxlciIsIm9uRG91YmxlQ2xpY2siLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsImVzY2FwZUtleVN0b3BzRHJhZ2dpbmciLCJoYXNPcHRpb24iLCJFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIiwiYm91bmRzVG9wIiwiZ2V0VG9wIiwiYm91bmRzTGVmdCIsImdldExlZnQiLCJvbktleURvd24iLCJrZXlEb3duSGFuZGxlciIsImRyYWciLCJvZmYiLCJtb3VzZUJ1dHRvbiIsInNldFRpbWVvdXQiLCJyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic3ViRW50cnkiLCJub0RyYWdnaW5nIiwiTk9fRFJBR0dJTkciLCJub0RyYWdnaW5nU3ViRW50cmllcyIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwibm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJOT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSIsIm1vdXNlT3ZlciIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJvbiIsIm9uTW91c2VNb3ZlIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInRvcCIsImxlZnQiLCJjc3MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyZW1haW5pbmdBcmd1bWVudHMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU1DLFVBQVVELFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01FLGFBQWFGLFFBQVEsY0FBUixDQURuQjs7QUFHQSxJQUFNRyxpQkFBaUIsRUFBdkI7QUFBQSxJQUNNQyx1QkFBdUIsR0FEN0I7O0lBR1FDLE0sR0FB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NEJ1RSxlQUF0QztBQUFBLFVBQ0lLLE9BQU8vQyxZQUFZLEtBQUs1QixVQUFqQixHQUE4QndFLGdCQUR6Qzs7QUFHQUUsWUFBU0EsR0FBVCxRQVB3QixDQU9OO0FBQ2xCQyxhQUFVQSxJQUFWLFFBUndCLENBUUo7O0FBRXBCLFVBQU1DLE1BQU07QUFDVkYsYUFBS0EsR0FESztBQUVWQyxjQUFNQTtBQUZJLE9BQVo7O0FBS0EsV0FBS0MsR0FBTCxDQUFTQSxHQUFUOztBQUVBLFdBQUtqRixRQUFMLENBQWNzQixRQUFkLENBQXVCLElBQXZCO0FBQ0Q7OzttQ0FFcUI0RCxLLEVBQU9DLFUsRUFBbUM7QUFBQSx3Q0FBcEJDLGtCQUFvQjtBQUFwQkEsMEJBQW9CO0FBQUE7O0FBQUUsYUFBT3pGLFFBQVEwRixjQUFSLGlCQUF1QkgsS0FBdkIsRUFBOEJDLFVBQTlCLFNBQTZDQyxrQkFBN0MsRUFBUDtBQUEwRTs7OztFQWhQakh6RixPOztBQW1QN0IyRixPQUFPQyxNQUFQLENBQWMxRixjQUFkLEVBQThCO0FBQzVCMkYsV0FBUztBQURtQixDQUE5Qjs7QUFJQUMsT0FBT0MsT0FBUCxHQUFpQjdGLGNBQWpCIiwiZmlsZSI6ImRyYWdnYWJsZUVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmFtZUJ1dHRvbjtcblxuICAgIHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlciA9IHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kTW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRNb3VzZU1vdmVIYW5kbGVyID0gdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMuYm91bmRNb3VzZURvd25IYW5kbGVyKTtcblxuICAgIHRoaXMuYXBwZW5kKG5hbWVCdXR0b24pO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IHRoaXMuZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuICAgIFxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzSGlkZGVuKCkge1xuICAgIGNvbnN0IGhpZGRlbiA9IHRoaXMuaGFzQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgcmV0dXJuIGhpZGRlbjtcbiAgfVxuICBcbiAgc2V0SGlkZGVuKGhpZGRlbikge1xuICAgIGhpZGRlbiA/XG4gICAgICB0aGlzLmFkZENsYXNzKCdoaWRkZW4nKSA6XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG4gIFxuICBzaG93KCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG4gIFxuICBoaWRlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vbktleURvd24odGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICBjb25zdCByb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhcm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7ICAvLy9cblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLmJvdW5kTW91c2VNb3ZlSGFuZGxlcik7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGJsdXInLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5ib3VuZE1vdXNlTW92ZUhhbmRsZXIpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19