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

      var hidden = properties.hidden,
          draggableEntry = Element.fromProperties.apply(Element, [Class, properties].concat(remainingArguments));


      hidden ? draggableEntry.hide() : draggableEntry.show();

      return draggableEntry;
    }
  }]);

  return DraggableEntry;
}(Element);

Object.assign(DraggableEntry, {
  tagName: 'li',
  ignoredProperties: ['hidden']
});

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIm9wdGlvbnMiLCJOYW1lQnV0dG9uIiwiRVNDQVBFX0tFWUNPREUiLCJTVEFSVF9EUkFHR0lOR19ERUxBWSIsIndpbmRvdyIsIkVsZW1lbnQiLCJSZWFjdCIsIkRyYWdnYWJsZUVudHJ5Iiwic2VsZWN0b3IiLCJuYW1lIiwiZXhwbG9yZXIiLCJ0eXBlIiwibmFtZUJ1dHRvbiIsInRpbWVvdXQiLCJ0b3BPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwiYm91bmRNb3VzZVVwSGFuZGxlciIsIm1vdXNlVXBIYW5kbGVyIiwiYmluZCIsImJvdW5kTW91c2VEb3duSGFuZGxlciIsIm1vdXNlRG93bkhhbmRsZXIiLCJib3VuZE1vdXNlTW92ZUhhbmRsZXIiLCJtb3VzZU1vdmVIYW5kbGVyIiwib25Nb3VzZURvd24iLCJhcHBlbmQiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnkiLCJwYXRoIiwicmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJkcmFnZ2luZyIsImhhc0NsYXNzIiwiaGlkZGVuIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJzZXROYW1lIiwiaGFuZGxlciIsIm9uRG91YmxlQ2xpY2siLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsImVzY2FwZUtleVN0b3BzRHJhZ2dpbmciLCJoYXNPcHRpb24iLCJFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIiwiYm91bmRzVG9wIiwiZ2V0VG9wIiwiYm91bmRzTGVmdCIsImdldExlZnQiLCJvbktleURvd24iLCJrZXlEb3duSGFuZGxlciIsImRyYWciLCJvZmYiLCJtb3VzZUJ1dHRvbiIsInNldFRpbWVvdXQiLCJyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5Iiwic3ViRW50cnkiLCJub0RyYWdnaW5nIiwiTk9fRFJBR0dJTkciLCJub0RyYWdnaW5nU3ViRW50cmllcyIsIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIiwibm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJOT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSIsIm1vdXNlT3ZlciIsImlzTW91c2VPdmVyIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImdldENvbGxhcHNlZEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UiLCJpc092ZXJsYXBwaW5nTW91c2UiLCJvbiIsIm9uTW91c2VNb3ZlIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJrZXlDb2RlIiwiZXNjYXBlS2V5IiwiZXNjYXBlRHJhZ2dpbmciLCJ3aW5kb3dTY3JvbGxUb3AiLCJnZXRTY3JvbGxUb3AiLCJ3aW5kb3dTY3JvbGxMZWZ0IiwiZ2V0U2Nyb2xsTGVmdCIsInRvcCIsImxlZnQiLCJjc3MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyZW1haW5pbmdBcmd1bWVudHMiLCJmcm9tUHJvcGVydGllcyIsImhpZGUiLCJzaG93IiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGNBQVIsQ0FEbkI7O0FBR0EsSUFBTUcsaUJBQWlCLEVBQXZCO0FB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RHpDOztBQUdBRSxZQUFTQSxHQUFULFFBUHdCLENBT047QUFDbEJDLGFBQVVBLElBQVYsUUFSd0IsQ0FRSjs7QUFFcEIsVUFBTUMsTUFBTTtBQUNWRixhQUFLQSxHQURLO0FBRVZDLGNBQU1BO0FBRkksT0FBWjs7QUFLQSxXQUFLQyxHQUFMLENBQVNBLEdBQVQ7O0FBRUEsV0FBS2pGLFFBQUwsQ0FBY3NCLFFBQWQsQ0FBdUIsSUFBdkI7QUFDRDs7O21DQUVxQjRELEssRUFBT0MsVSxFQUFtQztBQUFBLHdDQUFwQkMsa0JBQW9CO0FBQXBCQSwwQkFBb0I7QUFBQTs7QUFDeEQsVUFBRTVELE1BQUYsR0FBYTJELFVBQWIsQ0FBRTNELE1BQUY7QUFBQSxVQUNBUixjQURBLEdBQ2lCckIsUUFBUTBGLGNBQVIsaUJBQXVCSCxLQUF2QixFQUE4QkMsVUFBOUIsU0FBNkNDLGtCQUE3QyxFQURqQjs7O0FBR041RCxlQUNFUixlQUFlc0UsSUFBZixFQURGLEdBRUl0RSxlQUFldUUsSUFBZixFQUZKOztBQUlBLGFBQU92RSxjQUFQO0FBQ0Q7Ozs7RUFuUDBCckIsTzs7QUFzUDdCNkYsT0FBT0MsTUFBUCxDQUFjNUYsY0FBZCxFQUE4QjtBQUM1QjZGLFdBQVMsSUFEbUI7QUFFNUJDLHFCQUFtQixDQUNqQixRQURpQjtBQUZTLENBQTlCOztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCaEcsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuYW1lQnV0dG9uO1xuXG4gICAgdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyID0gdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRNb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZE1vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5ib3VuZE1vdXNlRG93bkhhbmRsZXIpO1xuXG4gICAgdGhpcy5hcHBlbmQobmFtZUJ1dHRvbik7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gdGhpcy5leHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNIaWRkZW4oKSB7XG4gICAgY29uc3QgaGlkZGVuID0gdGhpcy5oYXNDbGFzcygnaGlkZGVuJyk7XG5cbiAgICByZXR1cm4gaGlkZGVuO1xuICB9XG4gIFxuICBzaG93KCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG4gIFxuICBoaWRlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vbktleURvd24odGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICBjb25zdCByb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhcm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7ICAvLy9cblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLmJvdW5kTW91c2VNb3ZlSGFuZGxlcik7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGJsdXInLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5ib3VuZE1vdXNlTW92ZUhhbmRsZXIpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHsgaGlkZGVuIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIGhpZGRlbiA/XG4gICAgICBkcmFnZ2FibGVFbnRyeS5oaWRlKCkgOlxuICAgICAgICBkcmFnZ2FibGVFbnRyeS5zaG93KCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdoaWRkZW4nXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19