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

    _this.explorer = explorer;

    _this.nameButton = new NameButton(_this, name);

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.onMouseDown(_this.mouseDownHandler.bind(_this));
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
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
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectory = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);

          if (noDraggingSubEntries || rootDirectory && noDraggingRootDirectory) {
            return;
          }

          var startedDragging = this.explorer.startDragging(this);

          if (startedDragging) {
            this.startDragging(mouseTop, mouseLeft);
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
    key: 'isWaitingToDrag',
    value: function isWaitingToDrag() {
      var waitingToDrag = this.timeout !== null;

      return waitingToDrag;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
      body.onMouseUp(this.mouseUpHandler.bind(this), NAMESPACE);
      body.onMouseMove(this.mouseMoveHandler.bind(this), NAMESPACE);

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
      body.offMouseMove(NAMESPACE);
      body.offMouseUp(NAMESPACE);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS5qcyJdLCJuYW1lcyI6WyJlYXN5dWkiLCJyZXF1aXJlIiwiQm9keSIsIkVsZW1lbnQiLCJvcHRpb25zIiwiTmFtZUJ1dHRvbiIsIkVTQ0FQRV9LRVlDT0RFIiwiU1RBUlRfRFJBR0dJTkdfREVMQVkiLCJOQU1FU1BBQ0UiLCJib2R5IiwiRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJleHBsb3JlciIsInR5cGUiLCJuYW1lQnV0dG9uIiwidGltZW91dCIsInRvcE9mZnNldCIsImxlZnRPZmZzZXQiLCJvbk1vdXNlRG93biIsIm1vdXNlRG93bkhhbmRsZXIiLCJiaW5kIiwiZ2V0TmFtZSIsInBhcmVudEVsZW1lbnRzIiwicGF0aCIsInJlZHVjZSIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnRFbGVtZW50TmFtZSIsImJvdW5kcyIsImdldEJvdW5kcyIsImNvbGxhcHNlZEJvdW5kcyIsIm92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzIiwiYXJlT3ZlcmxhcHBpbmciLCJzZXROYW1lIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwib25Eb3VibGVDbGljayIsIm1vdXNlVG9wIiwibW91c2VMZWZ0IiwidG9wIiwiZ2V0VG9wIiwibGVmdCIsImdldExlZnQiLCJjc3MiLCJhZGRDbGFzcyIsIm9uIiwia2V5RG93bkhhbmRsZXIiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImRyYWdnaW5nIiwibW91c2VCdXR0b24iLCJzZXRUaW1lb3V0Iiwicm9vdERpcmVjdG9yeSIsImlzUm9vdERpcmVjdG9yeSIsIm5vRHJhZ2dpbmdTdWJFbnRyaWVzIiwiaGFzT3B0aW9uIiwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMiLCJub0RyYWdnaW5nUm9vdERpcmVjdG9yeSIsIk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZIiwic3RhcnRlZERyYWdnaW5nIiwic3RhcnREcmFnZ2luZyIsImNsZWFyVGltZW91dCIsImhhc0NsYXNzIiwid2FpdGluZ1RvRHJhZyIsIm9uTW91c2VVcCIsIm1vdXNlVXBIYW5kbGVyIiwib25Nb3VzZU1vdmUiLCJtb3VzZU1vdmVIYW5kbGVyIiwiTEVGVF9NT1VTRV9CVVRUT04iLCJpc0RyYWdnaW5nIiwic3RhcnRXYWl0aW5nVG9EcmFnIiwib2ZmTW91c2VNb3ZlIiwib2ZmTW91c2VVcCIsInN0b3BEcmFnZ2luZyIsInN0b3BXYWl0aW5nVG9EcmFnIiwiZXZlbnQiLCJrZXlDb2RlIiwid2hpY2giLCJlc2NhcGVEcmFnZ2luZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxPQUFPRixPQUFPRSxJQURsQjtBQUFBLElBRUlDLFVBQVVILE9BQU9HLE9BRnJCOztBQUlBLElBQUlDLFVBQVVILFFBQVEsWUFBUixDQUFkO0FBQUEsSUFDSUksYUFBYUosUUFBUSxjQUFSLENBRGpCOztBQUdBLElBQU1LLGlCQUFpQixFQUF2QjtBQUFBLElBQ01DLHVCQUF1QixHQUQ3QjtBQUFBLElBRU1DLFlBQVksNkJBRmxCOztBQUlBLElBQUlDLE9BQU8sSUFBSVAsSUFBSixFQUFYOztJQUVNUSxjOzs7QUFDSiwwQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDQyxJQUF0QyxFQUE0QztBQUFBOztBQUFBLGdJQUNwQ0gsUUFEb0M7O0FBRzFDLFVBQUtFLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLFVBQUtFLFVBQUwsR0FBa0IsSUFBSVYsVUFBSixRQUFxQk8sSUFBckIsQ0FBbEI7O0FBRUEsVUFBS0UsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFVBQUtFLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUtDLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUEsVUFBS0MsV0FBTCxDQUFpQixNQUFLQyxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBakI7QUFi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QUFDYixlQUFLcUIsa0JBQUwsQ0FBd0JqQyxRQUF4QixFQUFrQ0MsU0FBbEM7QUFDRDtBQUNGO0FBQ0Y7OzttQ0FFY0QsUSxFQUFVQyxTLEVBQVdZLFcsRUFBYTtBQUMvQ3hDLFdBQUs2RCxZQUFMLENBQWtCOUQsU0FBbEI7QUFDQUMsV0FBSzhELFVBQUwsQ0FBZ0IvRCxTQUFoQjs7QUFFQSxVQUFJd0MsV0FBVyxLQUFLb0IsVUFBTCxFQUFmOztBQUVBLFVBQUlwQixRQUFKLEVBQWM7QUFDWixhQUFLbkMsUUFBTCxDQUFjMkQsWUFBZCxDQUEyQixJQUEzQixFQUFpQyxZQUFXO0FBQzFDLGVBQUtBLFlBQUw7QUFDRCxTQUZnQyxDQUUvQm5ELElBRitCLENBRTFCLElBRjBCLENBQWpDO0FBR0QsT0FKRCxNQUlPO0FBQ0wsYUFBS29ELGlCQUFMO0FBQ0Q7QUFDRjs7O3FDQUVnQnJDLFEsRUFBVUMsUyxFQUFXWSxXLEVBQWE7QUFDakQsVUFBSUQsV0FBVyxLQUFLb0IsVUFBTCxFQUFmOztBQUVBLFVBQUlwQixRQUFKLEVBQWM7QUFDWixhQUFLQSxRQUFMLENBQWNaLFFBQWQsRUFBd0JDLFNBQXhCO0FBQ0Q7QUFDRjs7O21DQUVjcUMsSyxFQUFPO0FBQ3BCLFVBQUlDLFVBQVVELE1BQU1DLE9BQU4sSUFBaUJELE1BQU1FLEtBQXJDOztBQUVBLFVBQUlELFlBQVlyRSxjQUFoQixFQUFnQztBQUM5QixZQUFJMEMsV0FBVyxLQUFLb0IsVUFBTCxFQUFmOztBQUVBLFlBQUlwQixRQUFKLEVBQWM7QUFDWixlQUFLbkMsUUFBTCxDQUFjZ0UsY0FBZCxDQUE2QixJQUE3Qjs7QUFFQSxlQUFLTCxZQUFMO0FBQ0Q7QUFDRjtBQUNGOzs7O0VBL0wwQnJFLE87O0FBa003QjJFLE9BQU9DLE9BQVAsR0FBaUJyRSxjQUFqQiIsImZpbGUiOiJkcmFnZ2FibGVFbnRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEJvZHkgPSBlYXN5dWkuQm9keSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1LFxuICAgICAgTkFNRVNQQUNFID0gJ0Vhc3lVSS1EcmFnQW5kRHJvcC9kcmFnZ2luZyc7XG5cbnZhciBib2R5ID0gbmV3IEJvZHkoKTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmV3IE5hbWVCdXR0b24odGhpcywgbmFtZSk7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG4gIFxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICB2YXIgcGFyZW50RWxlbWVudHMgPSB0aGlzLnBhcmVudEVsZW1lbnRzKCd1bC5leHBsb3JlciBsaScpLCAvLy9cbiAgICAgICAgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBwYXRoID0gcGFyZW50RWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKHBhdGgsIHBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgcGFyZW50RWxlbWVudE5hbWUgPSBwYXJlbnRFbGVtZW50LmdldE5hbWUoKTtcblxuICAgICAgICAgIHBhdGggPSBwYXJlbnRFbGVtZW50TmFtZSArICcvJyArIHBhdGg7XG5cbiAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfSwgbmFtZSk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkgeyB0aGlzLm5hbWVCdXR0b24uc2V0TmFtZShuYW1lKTsgfVxuXG4gIG9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgdG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICBsZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB2YXIgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICB2YXIgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTtcblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSkpIHsgICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHZhciBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNXYWl0aW5nVG9EcmFnKCkge1xuICAgIHZhciB3YWl0aW5nVG9EcmFnID0gKHRoaXMudGltZW91dCAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gd2FpdGluZ1RvRHJhZztcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyksIE5BTUVTUEFDRSk7XG4gICAgYm9keS5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSwgTkFNRVNQQUNFKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBib2R5Lm9mZk1vdXNlTW92ZShOQU1FU1BBQ0UpO1xuICAgIGJvZHkub2ZmTW91c2VVcChOQU1FU1BBQ0UpO1xuXG4gICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB2YXIgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCkge1xuICAgIHZhciBrZXlDb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcblxuICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgdmFyIGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iXX0=