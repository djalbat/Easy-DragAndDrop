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

    _this.nameButton = React.createElement(NameButton, { name: name, className: 'name' });

    _this.explorer = explorer;

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

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
          bounds = this.getBounds();

      var top = bounds.getTop(),
          left = bounds.getLeft();

      this.topOffset = top - mouseTop;
      this.leftOffset = left - mouseLeft;

      top = top + 'px';
      left = left + 'px';

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      if (escapeKeyStopsDragging) {
        this.on('keydown', this.keyDownHandler.bind(this));
      }

      this.addClass('dragging');
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
      var top = mouseTop + this.topOffset,
          left = mouseLeft + this.leftOffset;

      top = top + 'px';
      left = left + 'px';

      var css = {
        top: top,
        left: left
      };

      this.css(css);

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
  tagName: 'div'
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIndpbmRvdyIsIlJlYWN0Iiwib3B0aW9ucyIsIk5hbWVCdXR0b24iLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImhhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nIiwiaGFzT3B0aW9uIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsInRvcCIsImdldFRvcCIsImxlZnQiLCJnZXRMZWZ0IiwiY3NzIiwib24iLCJrZXlEb3duSGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJkcmFnZ2luZyIsIm1vdXNlQnV0dG9uIiwic2V0VGltZW91dCIsInJvb3REaXJlY3RvcnkiLCJpc1Jvb3REaXJlY3RvcnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImV2ZW50Iiwia2V5Q29kZSIsIndoaWNoIiwiZXNjYXBlRHJhZ2dpbmciLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyZW1haW5pbmdBcmd1bWVudHMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7QUFBQSxJQUVNQyxTQUFTSCxPQUFPRyxNQUZ0QjtBQUFBLElBR01DLFFBQVFKLE9BQU9JLEtBSHJCOztBQUtBLElBQU1DLFVBQVVKLFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01LLGFBQWFMLFFBQVEsY0FBUixDQURuQjs7QUFHQSxJQUFNTSxpQkFBaUIsRUFBdkI7QUFBQSxJQUNNQyx1QkFBdUIsR0FEN0I7O0lBR01DLGM7OztBQUNKLDBCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0NDLElBQXRDLEVBQTRDO0FBQUE7O0FBQUEsZ0lBQ3BDSCxRQURvQzs7QUFHMUMsVUFBS0ksVUFBTCxHQUFrQixvQkFBQyxVQUFELElBQVksTUFBTUgsSUFBbEIsRUFBd0IsV0FBVSxNQUFsQyxHQUFsQjs7QUFFQSxVQUFLQyxRQUFMLEdBQWdC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QUtBLFlBQUw7QUFDRCxTQUZnQyxDQUUvQnZELElBRitCLENBRTFCLElBRjBCLENBQWpDO0FBR0QsT0FKRCxNQUlPO0FBQ0wsYUFBS3dELGlCQUFMO0FBQ0Q7QUFDRjs7O3FDQUVnQjVDLFEsRUFBVUMsUyxFQUFXZSxXLEVBQWE7QUFDakQsVUFBTUQsV0FBVyxLQUFLeUIsVUFBTCxFQUFqQjs7QUFFQSxVQUFJekIsUUFBSixFQUFjO0FBQ1osYUFBS0EsUUFBTCxDQUFjZixRQUFkLEVBQXdCQyxTQUF4QjtBQUNEO0FBQ0Y7OzttQ0FFYzRDLEssRUFBTztBQUNwQixVQUFNQyxVQUFVRCxNQUFNQyxPQUFOLElBQWlCRCxNQUFNRSxLQUF2Qzs7QUFFQSxVQUFJRCxZQUFZdkUsY0FBaEIsRUFBZ0M7QUFDOUIsWUFBTXdDLFdBQVcsS0FBS3lCLFVBQUwsRUFBakI7O0FBRUEsWUFBSXpCLFFBQUosRUFBYztBQUNaLGVBQUtuQyxRQUFMLENBQWNvRSxjQUFkOztBQUVBLGVBQUtMLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7OzttQ0FFcUJNLEssRUFBT0MsVSxFQUFtQztBQUFBLHdDQUFwQkMsa0JBQW9CO0FBQXBCQSwwQkFBb0I7QUFBQTs7QUFDOUQsYUFBT2pGLFFBQVFrRixjQUFSLGlCQUF1QkgsS0FBdkIsRUFBOEJDLFVBQTlCLFNBQTZDQyxrQkFBN0MsRUFBUDtBQUNEOzs7O0VBck4wQmpGLE87O0FBd043Qm1GLE9BQU9DLE1BQVAsQ0FBYzdFLGNBQWQsRUFBOEI7QUFDNUI4RSxXQUFTO0FBRG1CLENBQTlCOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCaEYsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgd2luZG93ID0gZWFzeXVpLndpbmRvdyxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm5hbWVcIiAvPjtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZXhwbG9yZXIuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKHRoaXMpO1xuICAgIFxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soaGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuXG4gICAgbGV0IHRvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgO1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDtcblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgO1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDtcblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXJvb3REaXJlY3RvcnksICAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkpO1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ21vdXNldXAgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2Rpdidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19