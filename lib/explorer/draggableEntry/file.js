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

  function File(selector, name, readOnly, dragEventHandler, activateFileEventHandler) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, type, dragEventHandler));

    _this.activateFileEventHandler = activateFileEventHandler;

    _this.readOnly = !!readOnly;

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.update();
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
    key: 'getReadOnly',
    value: function getReadOnly() {
      return this.readOnly;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'update',
    value: function update() {
      this.readOnly ? this.addClass('readOnly') : this.removeClass('readOnly');
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
    value: function clone(name, readOnly, dragEventHandler, activateFileEventHandler) {
      var file = Element.clone(File, '#file', name, readOnly, dragEventHandler, activateFileEventHandler);

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkFjdGl2YXRlRmlsZUV2ZW50IiwiRmlsZSIsInNlbGVjdG9yIiwibmFtZSIsInJlYWRPbmx5IiwiZHJhZ0V2ZW50SGFuZGxlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsInR5cGUiLCJ0eXBlcyIsIkZJTEUiLCJvbkRvdWJsZUNsaWNrIiwiZG91YmxlQ2xpY2tIYW5kbGVyIiwiYmluZCIsInVwZGF0ZSIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJmaWxlIiwiYWN0aXZhdGVGaWxlRXZlbnQiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxRQUFRRixRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lHLGlCQUFpQkgsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlJLG9CQUFvQkosUUFBUSxzQkFBUixDQUZ4Qjs7SUFJTUssSTs7O0FBQ0osZ0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0MsZ0JBQXRDLEVBQXdEQyx3QkFBeEQsRUFBa0Y7QUFBQTs7QUFDaEYsUUFBSUMsT0FBT1QsTUFBTVUsS0FBTixDQUFZQyxJQUF2Qjs7QUFEZ0YsNEdBRzFFUCxRQUgwRSxFQUdoRUMsSUFIZ0UsRUFHMURJLElBSDBELEVBR3BERixnQkFIb0Q7O0FBS2hGLFVBQUtDLHdCQUFMLEdBQWdDQSx3QkFBaEM7O0FBRUEsVUFBS0YsUUFBTCxHQUFnQixDQUFDLENBQUNBLFFBQWxCOztBQUVBLFVBQUtNLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCLE9BQW5COztBQUVBLFVBQUtDLE1BQUw7QUFYZ0Y7QUFZakY7Ozs7a0NBRWE7QUFDWixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRQyxLLEVBQU87QUFDZCxVQUFJQyxNQUFKO0FBQUEsVUFDSUMsWUFBWUYsTUFBTUcsT0FBTixFQURoQjs7QUFHQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS2xCLE1BQU1VLEtBQU4sQ0FBWUMsSUFBakI7QUFDQSxhQUFLWCxNQUFNVSxLQUFOLENBQVlVLE1BQWpCOztBQUVFLGNBQUlmLE9BQU8sS0FBS2dCLE9BQUwsRUFBWDtBQUFBLGNBQ0lDLFlBQVlOLE1BQU1LLE9BQU4sRUFEaEI7O0FBR0FKLG1CQUFTWixLQUFLa0IsYUFBTCxDQUFtQkQsU0FBbkIsSUFBZ0MsQ0FBekM7QUFDQTs7QUFFRixhQUFLdEIsTUFBTVUsS0FBTixDQUFZYyxTQUFqQjtBQUNFUCxtQkFBUyxLQUFUO0FBQ0E7QUFaSjs7QUFlQSxhQUFPQSxNQUFQO0FBQ0Q7OztrQ0FFYTtBQUNaLGFBQU8sS0FBS1gsUUFBWjtBQUNEOzs7b0NBRWU7QUFDZCxVQUFJbUIsYUFBYSxFQUFqQixDQURjLENBQ1E7O0FBRXRCLGFBQU9BLFVBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS25CLFFBQUwsR0FDRSxLQUFLb0IsUUFBTCxDQUFjLFVBQWQsQ0FERixHQUVJLEtBQUtDLFdBQUwsQ0FBaUIsVUFBakIsQ0FGSjtBQUdEOzs7eUNBRW9CO0FBQ25CLFVBQUlDLE9BQU8sSUFBWDtBQUFBLFVBQ0lDLG9CQUFvQixJQUFJM0IsaUJBQUosQ0FBc0IwQixJQUF0QixDQUR4Qjs7QUFHQSxXQUFLcEIsd0JBQUwsQ0FBOEJxQixpQkFBOUI7QUFDRDs7OzBCQUVZeEIsSSxFQUFNQyxRLEVBQVVDLGdCLEVBQWtCQyx3QixFQUEwQjtBQUN2RSxVQUFJb0IsT0FBTzdCLFFBQVErQixLQUFSLENBQWMzQixJQUFkLEVBQW9CLE9BQXBCLEVBQTZCRSxJQUE3QixFQUFtQ0MsUUFBbkMsRUFBNkNDLGdCQUE3QyxFQUErREMsd0JBQS9ELENBQVg7O0FBRUFvQixXQUFLRyxlQUFMLENBQXFCLElBQXJCOztBQUVBLGFBQU9ILElBQVA7QUFDRDs7OztFQXRFZ0IzQixjOztBQXlFbkIrQixPQUFPQyxPQUFQLEdBQWlCOUIsSUFBakIiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5JyksXG4gICAgQWN0aXZhdGVGaWxlRXZlbnQgPSByZXF1aXJlKCcuLi9hY3RpdmF0ZUZpbGVFdmVudCcpO1xuXG5jbGFzcyBGaWxlIGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgcmVhZE9ubHksIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuRklMRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlLCBkcmFnRXZlbnRIYW5kbGVyKTtcbiAgICBcbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciA9IGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcjtcblxuICAgIHRoaXMucmVhZE9ubHkgPSAhIXJlYWRPbmx5O1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIGJlZm9yZSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgICAgXG4gICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDsgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgZ2V0UmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZE9ubHk7XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMucmVhZE9ubHkgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3JlYWRPbmx5JykgOiBcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygncmVhZE9ubHknKTtcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHZhciBmaWxlID0gdGhpcyxcbiAgICAgICAgYWN0aXZhdGVGaWxlRXZlbnQgPSBuZXcgQWN0aXZhdGVGaWxlRXZlbnQoZmlsZSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgcmVhZE9ubHksIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBmaWxlID0gRWxlbWVudC5jbG9uZShGaWxlLCAnI2ZpbGUnLCBuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19