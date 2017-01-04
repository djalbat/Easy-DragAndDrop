'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Body = easyui.Body,
    Element = easyui.Element;

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175,
    NAMESPACE = 'EasyUI-DragAndDrop/dragging';

var body = new Body();

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    _this.nameButton = new NameButton(_this, name);

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
    value: function onDoubleClick(doubleClickHandler) {
      this.nameButton.onDoubleClick(doubleClickHandler);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var bounds = this.getBounds(),
          top = bounds.getTop(),
          left = bounds.getLeft(),
          css = {
        top: top,
        left: left
      };

      this.css(css);

      this.topOffset = top - mouseTop;
      this.leftOffset = left - mouseLeft;

      this.addClass('dragging');

      this.on('keydown', this.keyDownHandler.bind(this));
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.off('keydown', this.keyDownHandler.bind(this));

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      var top = mouseTop + this.topOffset,
          left = mouseLeft + this.leftOffset,
          css = {
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
      body.onMouseUp(this.mouseUpHandler.bind(this), NAMESPACE); ///
      body.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE); ///

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
      body.offMouseMove(NAMESPACE); ///
      body.offMouseUp(NAMESPACE); ///

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
  }]);

  return DraggableEntry;
}(Element);

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiQm9keSIsIkVsZW1lbnQiLCJvcHRpb25zIiwiTmFtZUJ1dHRvbiIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhdGgiLCJnZXREcmFnZ2FibGVFbnRyeVBhdGgiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyIsImFyZU92ZXJsYXBwaW5nIiwic2V0TmFtZSIsImRvdWJsZUNsaWNrSGFuZGxlciIsIm9uRG91YmxlQ2xpY2siLCJtb3VzZVRvcCIsIm1vdXNlTGVmdCIsInRvcCIsImdldFRvcCIsImxlZnQiLCJnZXRMZWZ0IiwiY3NzIiwiYWRkQ2xhc3MiLCJvbiIsImtleURvd25IYW5kbGVyIiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJkcmFnZ2luZyIsIm1vdXNlQnV0dG9uIiwic2V0VGltZW91dCIsInJvb3REaXJlY3RvcnkiLCJpc1Jvb3REaXJlY3RvcnkiLCJzdWJFbnRyeSIsIm5vRHJhZ2dpbmciLCJoYXNPcHRpb24iLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlIiwiaXNPdmVybGFwcGluZ01vdXNlIiwib25Nb3VzZVVwIiwibW91c2VVcEhhbmRsZXIiLCJvbk1vdXNlTW92ZSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJMRUZUX01PVVNFX0JVVFRPTiIsImlzRHJhZ2dpbmciLCJzdGFydFdhaXRpbmdUb0RyYWciLCJvZmZNb3VzZU1vdmUiLCJvZmZNb3VzZVVwIiwic3RvcERyYWdnaW5nIiwic3RvcFdhaXRpbmdUb0RyYWciLCJldmVudCIsImtleUNvZGUiLCJ3aGljaCIsImVzY2FwZURyYWdnaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLE9BQU9GLE9BQU9FLElBRGxCO0FBQUEsSUFFSUMsVUFBVUgsT0FBT0csT0FGckI7O0FBSUEsSUFBSUMsVUFBVUgsUUFBUSxZQUFSLENBQWQ7QUFBQSxJQUNJSSxhQUFhSixRQUFRLGNBQVIsQ0FEakI7O0FBR0EsSUFBTUssaUJBQWlCLEVBQXZCO0FBQUEsSUFDTUMsdUJBQXVCLEdBRDdCO0FBQUEsSUFFTUMsWUFBWSw2QkFGbEI7O0FBSUEsSUFBSUMsT0FBTyxJQUFJUCxJQUFKLEVBQVg7O0lBRU1RLGM7OztBQUNKLDBCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0NDLElBQXRDLEVBQTRDO0FBQUE7O0FBQUEsZ0lBQ3BDSCxRQURvQzs7QUFHMUMsVUFBS0ksVUFBTCxHQUFrQixJQUFJVixVQUFKLFFBQXFCTyxJQUFyQixDQUFsQjs7QUFFQSxVQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQSxVQUFLQyxJQUFMLEdBQVlBLElBQVo7O0FBRUEsVUFBS0UsT0FBTCxHQUFlLElBQWY7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLElBQWpC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QUFjO0FBQ1osZUFBS2hDLFFBQUwsQ0FBY29FLGNBQWQ7O0FBRUEsZUFBS0wsWUFBTDtBQUNEO0FBQ0Y7QUFDRjs7OztFQS9MMEJ6RSxPOztBQWtNN0IrRSxPQUFPQyxPQUFQLEdBQWlCekUsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NSxcbiAgICAgIE5BTUVTUEFDRSA9ICdFYXN5VUktRHJhZ0FuZERyb3AvZHJhZ2dpbmcnO1xuXG52YXIgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5ldyBOYW1lQnV0dG9uKHRoaXMsIG5hbWUpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMuZXhwbG9yZXIuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKHRoaXMpO1xuICAgIFxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICB0b3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgIGxlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMudG9wT2Zmc2V0ID0gdG9wIC0gbW91c2VUb3A7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICB0aGlzLm9mZigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0LFxuICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIHZhciByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKSxcbiAgICAgICAgICAgIHN1YkVudHJ5ID0gIXJvb3REaXJlY3RvcnksICAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkpO1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdmFyIGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7ICAvLy9cbiAgICBib2R5Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpOyAgLy8vXG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgYm9keS5vZmZNb3VzZU1vdmUoTkFNRVNQQUNFKTsgLy8vXG4gICAgYm9keS5vZmZNb3VzZVVwKE5BTUVTUEFDRSk7IC8vL1xuXG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCkge1xuICAgIHZhciBrZXlDb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcblxuICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiJdfQ==