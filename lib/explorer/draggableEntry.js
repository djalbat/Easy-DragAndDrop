'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    window = easyui.window,
    React = easyui.React;

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
      var top = mouseTop + this.topOffset - window.pageXOffset,
          left = mouseLeft + this.leftOffset - window.pageYOffset;

      top = top + 'px';
      left = left + 'px';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIndpbmRvdyIsIlJlYWN0Iiwib3B0aW9ucyIsIk5hbWVCdXR0b24iLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJhcHBlbmQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImhhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nIiwiaGFzT3B0aW9uIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsImJvdW5kc1RvcCIsImdldFRvcCIsImJvdW5kc0xlZnQiLCJnZXRMZWZ0Iiwib24iLCJrZXlEb3duSGFuZGxlciIsImFkZENsYXNzIiwiZHJhZyIsIm9mZiIsInJlbW92ZUNsYXNzIiwiZHJhZ2dpbmciLCJtb3VzZUJ1dHRvbiIsInNldFRpbWVvdXQiLCJyb290RGlyZWN0b3J5IiwiaXNSb290RGlyZWN0b3J5Iiwic3ViRW50cnkiLCJub0RyYWdnaW5nIiwiTk9fRFJBR0dJTkciLCJub0RyYWdnaW5nU3ViRW50cmllcyIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwibm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkiLCJOT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSIsIm1vdXNlT3ZlciIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImhhc0NsYXNzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwiY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSIsImlzT3ZlcmxhcHBpbmdNb3VzZSIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJldmVudCIsImtleUNvZGUiLCJ3aGljaCIsImVzY2FwZURyYWdnaW5nIiwidG9wIiwicGFnZVhPZmZzZXQiLCJsZWZ0IiwicGFnZVlPZmZzZXQiLCJjc3MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyZW1haW5pbmdBcmd1bWVudHMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7QUFBQSxJQUVNQyxTQUFTSCxPQUFPRyxNQUZ0QjtBQUFBLElBR01DLFFBQVFKLE9BQU9JLEtBSHJCOztBQUtBLElBQU1DLFVBQVVKLFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01LLGFBQWFMLFFBQVEsY0FBUixDQURuQjs7QUFHQSxJQUFNTSxpQkFBaUIsRUFBdkI7QUFBQSxJQUNNQyx1QkFBdUIsR0FEN0I7O0lBR01DLGM7OztBQUNKLDBCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0NDLElBQXRDLEVBQTRDO0FBQUE7O0FBQUEsZ0lBQ3BDSCxRQURvQzs7QUFHMUMsUUFBTUksYUFBYTtBQUFDLGdCQUFE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RixjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQsXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uIGNsYXNzTmFtZT1cIm5hbWVcIj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5hbWVCdXR0b247XG4gICAgXG4gICAgdGhpcy5hcHBlbmQobmFtZUJ1dHRvbik7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmV4cGxvcmVyLmdldERyYWdnYWJsZUVudHJ5UGF0aCh0aGlzKTtcbiAgICBcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhcm9vdERpcmVjdG9yeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7XG5cbiAgICAgICAgaWYgKChub0RyYWdnaW5nKSB8fCAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXMpIHx8IChyb290RGlyZWN0b3J5ICYmIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vbignbW91c2V1cCBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignbW91c2V1cCBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0IC0gd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0IC0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDtcbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3A6IHRvcCxcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==