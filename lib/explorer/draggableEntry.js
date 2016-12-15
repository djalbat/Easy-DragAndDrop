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
      var parentElements = this.parentElements('ul.explorer li'),
          ///
      name = this.getName(),
          path = parentElements.reduce(function (path, parentElement) {
        var parentElementName = parentElement.getName();

        path = parentElementName + '/' + path;

        return path;
      }, name);

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
              noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectory = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);

          if (noDragging || !rootDirectory && noDraggingSubEntries || rootDirectory && noDraggingRootDirectory) {
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
      var collapsedBounds = this.getCollapsedBounds();
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
          this.explorer.escapeDragging(this);

          this.stopDragging();
        }
      }
    }
  }]);

  return DraggableEntry;
}(Element);

module.exports = DraggableEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiQm9keSIsIkVsZW1lbnQiLCJvcHRpb25zIiwiTmFtZUJ1dHRvbiIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhcmVudEVsZW1lbnRzIiwicGF0aCIsInJlZHVjZSIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnRFbGVtZW50TmFtZSIsImJvdW5kcyIsImdldEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJzZXROYW1lIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwidG9wIiwiZ2V0VG9wIiwibGVmdCIsImdldExlZnQiLCJjc3MiLCJhZGRDbGFzcyIsIm9uIiwia2V5RG93bkhhbmRsZXIiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsIm5vRHJhZ2dpbmciLCJoYXNPcHRpb24iLCJOT19EUkFHR0lORyIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwibW91c2VPdmVyIiwiaXNNb3VzZU92ZXIiLCJzdGFydGVkRHJhZ2dpbmciLCJzdGFydERyYWdnaW5nIiwiY2xlYXJUaW1lb3V0IiwiaGFzQ2xhc3MiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvbk1vdXNlVXAiLCJtb3VzZVVwSGFuZGxlciIsIm9uTW91c2VNb3ZlIiwibW91c2VNb3ZlSGFuZGxlciIsIkxFRlRfTU9VU0VfQlVUVE9OIiwiaXNEcmFnZ2luZyIsInN0YXJ0V2FpdGluZ1RvRHJhZyIsIm9mZk1vdXNlTW92ZSIsIm9mZk1vdXNlVXAiLCJzdG9wRHJhZ2dpbmciLCJzdG9wV2FpdGluZ1RvRHJhZyIsImV2ZW50Iiwia2V5Q29kZSIsIndoaWNoIiwiZXNjYXBlRHJhZ2dpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsT0FBT0YsT0FBT0UsSUFEbEI7QUFBQSxJQUVJQyxVQUFVSCxPQUFPRyxPQUZyQjs7QUFJQSxJQUFJQyxVQUFVSCxRQUFRLFlBQVIsQ0FBZDtBQUFBLElBQ0lJLGFBQWFKLFFBQVEsY0FBUixDQURqQjs7QUFHQSxJQUFNSyxpQkFBaUIsRUFBdkI7QUFBQSxJQUNNQyx1QkFBdUIsR0FEN0I7QUFBQSxJQUVNQyxZQUFZLDZCQUZsQjs7QUFJQSxJQUFJQyxPQUFPLElBQUlQLElBQUosRUFBWDs7SUFFTVEsYzs7O0FBQ0osMEJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0MsSUFBdEMsRUFBNEM7QUFBQTs7QUFBQSxnSUFDcENILFFBRG9DOztBQUcxQyxVQUFLSSxVQUFMLEdBQWtCLElBQUlWLFVBQUosUUFBcUJPLElBQXJCLENBQWxCOztBQUVBLFVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxVQUFLRSxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLElBQWxC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OUIsWUFBSTBDLFdBQVcsS0FBS3dCLFVBQUwsRUFBZjs7QUFFQSxZQUFJeEIsUUFBSixFQUFjO0FBQ1osZUFBS25DLFFBQUwsQ0FBY29FLGNBQWQsQ0FBNkIsSUFBN0I7O0FBRUEsZUFBS0wsWUFBTDtBQUNEO0FBQ0Y7QUFDRjs7OztFQWxNMEJ6RSxPOztBQXFNN0IrRSxPQUFPQyxPQUFQLEdBQWlCekUsY0FBakIiLCJmaWxlIjoiZHJhZ2dhYmxlRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBCb2R5ID0gZWFzeXVpLkJvZHksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NSxcbiAgICAgIE5BTUVTUEFDRSA9ICdFYXN5VUktRHJhZ0FuZERyb3AvZHJhZ2dpbmcnO1xuXG52YXIgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5ldyBOYW1lQnV0dG9uKHRoaXMsIG5hbWUpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICB2YXIgcGFyZW50RWxlbWVudHMgPSB0aGlzLnBhcmVudEVsZW1lbnRzKCd1bC5leHBsb3JlciBsaScpLCAvLy9cbiAgICAgICAgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBwYXRoID0gcGFyZW50RWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKHBhdGgsIHBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgcGFyZW50RWxlbWVudE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldE5hbWUoKTtcblxuICAgICAgICAgIHBhdGggPSBwYXJlbnRFbGVtZW50TmFtZSArICcvJyArIHBhdGg7XG5cbiAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfSwgbmFtZSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICBsZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICB2YXIgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTtcblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8ICghcm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIHZhciBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHZhciBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpXG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgYm9keS5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpLCBOQU1FU1BBQ0UpOyAgLy8vXG4gICAgYm9keS5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTsgIC8vL1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGJvZHkub2ZmTW91c2VNb3ZlKE5BTUVTUEFDRSk7IC8vL1xuICAgIGJvZHkub2ZmTW91c2VVcChOQU1FU1BBQ0UpOyAvLy9cblxuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIl19