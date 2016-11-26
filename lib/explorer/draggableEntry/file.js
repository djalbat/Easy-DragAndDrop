'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry'),
    ActivateFileEvent = require('../activateFileEvent');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selector, name, dragEventHandler, activateFileEventHandler) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, type, dragEventHandler));

    _this.activateFileEventHandler = activateFileEventHandler;

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
    return _this;
  }

  _createClass(File, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before,
          entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;
          break;

        case Entry.types.DIRECTORY:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var file = this,
          activateFileEvent = new ActivateFileEvent(file);

      this.activateFileEventHandler(activateFileEvent);
    }
  }], [{
    key: 'clone',
    value: function clone(name, dragEventHandler, activateFileEventHandler) {
      var file = Element.clone(File, '#file', name, dragEventHandler, activateFileEventHandler);

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkFjdGl2YXRlRmlsZUV2ZW50IiwiRmlsZSIsInNlbGVjdG9yIiwibmFtZSIsImRyYWdFdmVudEhhbmRsZXIiLCJhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIiLCJ0eXBlIiwidHlwZXMiLCJGSUxFIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibG9jYWxlQ29tcGFyZSIsIkRJUkVDVE9SWSIsInN1YkVudHJpZXMiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxRQUFRRixRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lHLGlCQUFpQkgsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlJLG9CQUFvQkosUUFBUSxzQkFBUixDQUZ4Qjs7SUFJTUssSTs7O0FBQ0osZ0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxnQkFBNUIsRUFBOENDLHdCQUE5QyxFQUF3RTtBQUFBOztBQUN0RSxRQUFJQyxPQUFPUixNQUFNUyxLQUFOLENBQVlDLElBQXZCOztBQURzRSw0R0FHaEVOLFFBSGdFLEVBR3REQyxJQUhzRCxFQUdoREcsSUFIZ0QsRUFHMUNGLGdCQUgwQzs7QUFLdEUsVUFBS0Msd0JBQUwsR0FBZ0NBLHdCQUFoQzs7QUFFQSxVQUFLSSxhQUFMLENBQW1CLE1BQUtDLGtCQUFMLENBQXdCQyxJQUF4QixPQUFuQjtBQVBzRTtBQVF2RTs7OztrQ0FFYTtBQUNaLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLE1BQUo7QUFBQSxVQUNJQyxZQUFZRixNQUFNRyxPQUFOLEVBRGhCOztBQUdBLGNBQVFELFNBQVI7QUFDRSxhQUFLaEIsTUFBTVMsS0FBTixDQUFZQyxJQUFqQjtBQUNBLGFBQUtWLE1BQU1TLEtBQU4sQ0FBWVMsTUFBakI7O0FBRUUsY0FBSWIsT0FBTyxLQUFLYyxPQUFMLEVBQVg7QUFBQSxjQUNJQyxZQUFZTixNQUFNSyxPQUFOLEVBRGhCOztBQUdBSixtQkFBU1YsS0FBS2dCLGFBQUwsQ0FBbUJELFNBQW5CLElBQWdDLENBQXpDO0FBQ0E7O0FBRUYsYUFBS3BCLE1BQU1TLEtBQU4sQ0FBWWEsU0FBakI7QUFDRVAsbUJBQVMsS0FBVDtBQUNBO0FBWko7O0FBZUEsYUFBT0EsTUFBUDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFJUSxhQUFhLEVBQWpCLENBRGMsQ0FDUTs7QUFFdEIsYUFBT0EsVUFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQUlDLE9BQU8sSUFBWDtBQUFBLFVBQ0lDLG9CQUFvQixJQUFJdkIsaUJBQUosQ0FBc0JzQixJQUF0QixDQUR4Qjs7QUFHQSxXQUFLakIsd0JBQUwsQ0FBOEJrQixpQkFBOUI7QUFDRDs7OzBCQUVZcEIsSSxFQUFNQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDN0QsVUFBSWlCLE9BQU96QixRQUFRMkIsS0FBUixDQUFjdkIsSUFBZCxFQUFvQixPQUFwQixFQUE2QkUsSUFBN0IsRUFBbUNDLGdCQUFuQyxFQUFxREMsd0JBQXJELENBQVg7O0FBRUFpQixXQUFLRyxlQUFMLENBQXFCLElBQXJCOztBQUVBLGFBQU9ILElBQVA7QUFDRDs7OztFQXhEZ0J2QixjOztBQTJEbkIyQixPQUFPQyxPQUFQLEdBQWlCMUIsSUFBakIiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5JyksXG4gICAgQWN0aXZhdGVGaWxlRXZlbnQgPSByZXF1aXJlKCcuLi9hY3RpdmF0ZUZpbGVFdmVudCcpO1xuXG5jbGFzcyBGaWxlIGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIgPSBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXI7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBiZWZvcmUsXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICAgIFxuICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7ICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7ICAgICAgICAgIFxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdmFyIGZpbGUgPSB0aGlzLFxuICAgICAgICBhY3RpdmF0ZUZpbGVFdmVudCA9IG5ldyBBY3RpdmF0ZUZpbGVFdmVudChmaWxlKTtcblxuICAgIHRoaXMuYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKGFjdGl2YXRlRmlsZUV2ZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lLCBkcmFnRXZlbnRIYW5kbGVyLCBhY3RpdmF0ZUZpbGVFdmVudEhhbmRsZXIpIHtcbiAgICB2YXIgZmlsZSA9IEVsZW1lbnQuY2xvbmUoRmlsZSwgJyNmaWxlJywgbmFtZSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19