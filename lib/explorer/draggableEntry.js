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

    _this.nameButton = React.createElement(
      NameButton,
      { className: 'name' },
      name
    );

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
  tagName: 'li'
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiRWxlbWVudCIsIndpbmRvdyIsIlJlYWN0Iiwib3B0aW9ucyIsIk5hbWVCdXR0b24iLCJFU0NBUEVfS0VZQ09ERSIsIlNUQVJUX0RSQUdHSU5HX0RFTEFZIiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImhhbmRsZXIiLCJvbkRvdWJsZUNsaWNrIiwibW91c2VUb3AiLCJtb3VzZUxlZnQiLCJlc2NhcGVLZXlTdG9wc0RyYWdnaW5nIiwiaGFzT3B0aW9uIiwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyIsInRvcCIsImdldFRvcCIsImxlZnQiLCJnZXRMZWZ0IiwiY3NzIiwib24iLCJrZXlEb3duSGFuZGxlciIsImFkZENsYXNzIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJkcmFnZ2luZyIsIm1vdXNlQnV0dG9uIiwic2V0VGltZW91dCIsInJvb3REaXJlY3RvcnkiLCJpc1Jvb3REaXJlY3RvcnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImV2ZW50Iiwia2V5Q29kZSIsIndoaWNoIiwiZXNjYXBlRHJhZ2dpbmciLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyZW1haW5pbmdBcmd1bWVudHMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7QUFBQSxJQUVNQyxTQUFTSCxPQUFPRyxNQUZ0QjtBQUFBLElBR01DLFFBQVFKLE9BQU9JLEtBSHJCOztBQUtBLElBQU1DLFVBQVVKLFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01LLGFBQWFMLFFBQVEsY0FBUixDQURuQjs7QUFHQSxJQUFNTSxpQkFBaUIsRUFBdkI7QUFBQSxJQUNNQyx1QkFBdUIsR0FEN0I7O0lBR01DLGM7OztBQUNKLDBCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0NDLElBQXRDLEVBQTRDO0FBQUE7O0FBQUEsZ0lBQ3BDSCxRQURvQzs7QUFHMUMsVUFBS0ksVUFBTCxHQUFrQjtBQUFDLGdCQUFEO0FBQUEsUUFBWSxXQUFVLE1BQXRCO0FBQThCSDtBQUE5QixLQUFsQjs7QUFFQSxVQUFLQyxRQUFMLEdBQWdC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QUtBLFlBQUw7QUFDRCxTQUZnQyxDQUUvQnZELElBRitCLENBRTFCLElBRjBCLENBQWpDO0FBR0QsT0FKRCxNQUlPO0FBQ0wsYUFBS3dELGlCQUFMO0FBQ0Q7QUFDRjs7O3FDQUVnQjVDLFEsRUFBVUMsUyxFQUFXZSxXLEVBQWE7QUFDakQsVUFBTUQsV0FBVyxLQUFLeUIsVUFBTCxFQUFqQjs7QUFFQSxVQUFJekIsUUFBSixFQUFjO0FBQ1osYUFBS0EsUUFBTCxDQUFjZixRQUFkLEVBQXdCQyxTQUF4QjtBQUNEO0FBQ0Y7OzttQ0FFYzRDLEssRUFBTztBQUNwQixVQUFNQyxVQUFVRCxNQUFNQyxPQUFOLElBQWlCRCxNQUFNRSxLQUF2Qzs7QUFFQSxVQUFJRCxZQUFZdkUsY0FBaEIsRUFBZ0M7QUFDOUIsWUFBTXdDLFdBQVcsS0FBS3lCLFVBQUwsRUFBakI7O0FBRUEsWUFBSXpCLFFBQUosRUFBYztBQUNaLGVBQUtuQyxRQUFMLENBQWNvRSxjQUFkOztBQUVBLGVBQUtMLFlBQUw7QUFDRDtBQUNGO0FBQ0Y7OzttQ0FFcUJNLEssRUFBT0MsVSxFQUFtQztBQUFBLHdDQUFwQkMsa0JBQW9CO0FBQXBCQSwwQkFBb0I7QUFBQTs7QUFDOUQsYUFBT2pGLFFBQVFrRixjQUFSLGlCQUF1QkgsS0FBdkIsRUFBOEJDLFVBQTlCLFNBQTZDQyxrQkFBN0MsRUFBUDtBQUNEOzs7O0VBck4wQmpGLE87O0FBd043Qm1GLE9BQU9DLE1BQVAsQ0FBYzdFLGNBQWQsRUFBOEI7QUFDNUI4RSxXQUFTO0FBRG1CLENBQTlCOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCaEYsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgd2luZG93ID0gZWFzeXVpLndpbmRvdyxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uIGNsYXNzTmFtZT1cIm5hbWVcIj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5leHBsb3Jlci5nZXREcmFnZ2FibGVFbnRyeVBhdGgodGhpcyk7XG4gICAgXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikgeyB0aGlzLm5hbWVCdXR0b24ub25Eb3VibGVDbGljayhoYW5kbGVyKTsgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG5cbiAgICBsZXQgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICBsZWZ0ID0gYm91bmRzLmdldExlZnQoKTtcblxuICAgIHRoaXMudG9wT2Zmc2V0ID0gdG9wIC0gbW91c2VUb3A7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7XG4gICAgbGVmdCA9IGAke2xlZnR9cHhgO1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7XG4gICAgbGVmdCA9IGAke2xlZnR9cHhgO1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhcm9vdERpcmVjdG9yeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7XG5cbiAgICAgICAgaWYgKChub0RyYWdnaW5nKSB8fCAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXMpIHx8IChyb290RGlyZWN0b3J5ICYmIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vbignbW91c2V1cCBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignbW91c2V1cCBibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==