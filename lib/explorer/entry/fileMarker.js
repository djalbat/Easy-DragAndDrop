'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry');

var FileMarker = function (_Entry) {
  _inherits(FileMarker, _Entry);

  function FileMarker(selector, name) {
    _classCallCheck(this, FileMarker);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, (FileMarker.__proto__ || Object.getPrototypeOf(FileMarker)).call(this, selector, name, type));
  }

  _createClass(FileMarker, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = entryType === Entry.types.DIRECTORY ? false : name.localeCompare(entryName) < 0;

      return before;
    }
  }], [{
    key: 'clone',
    value: function clone(name) {
      var fileMarker = Element.clone(FileMarker, '#marker', name);

      fileMarker.removeAttribute('id');

      return fileMarker;
    }
  }]);

  return FileMarker;
}(Entry);

module.exports = FileMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlTWFya2VyIiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsInR5cGVzIiwiTUFSS0VSIiwiZW50cnkiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsImJlZm9yZSIsIkRJUkVDVE9SWSIsImxvY2FsZUNvbXBhcmUiLCJmaWxlTWFya2VyIiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsUUFBUUYsUUFBUSxVQUFSLENBQVo7O0lBRU1HLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QjtBQUFBOztBQUMxQixRQUFJQyxPQUFPSixNQUFNSyxLQUFOLENBQVlDLE1BQXZCOztBQUQwQixtSEFHcEJKLFFBSG9CLEVBR1ZDLElBSFUsRUFHSkMsSUFISTtBQUkzQjs7Ozs2QkFFUUcsSyxFQUFPO0FBQ2QsVUFBSUosT0FBTyxLQUFLSyxPQUFMLEVBQVg7QUFBQSxVQUNJQyxZQUFZRixNQUFNQyxPQUFOLEVBRGhCO0FBQUEsVUFFSUUsWUFBWUgsTUFBTUksT0FBTixFQUZoQjtBQUFBLFVBR0lDLFNBQVVGLGNBQWNWLE1BQU1LLEtBQU4sQ0FBWVEsU0FBM0IsR0FDRSxLQURGLEdBRUtWLEtBQUtXLGFBQUwsQ0FBbUJMLFNBQW5CLElBQWdDLENBTGxEOztBQU9BLGFBQU9HLE1BQVA7QUFDRDs7OzBCQUVZVCxJLEVBQU07QUFDakIsVUFBSVksYUFBYWhCLFFBQVFpQixLQUFSLENBQWNmLFVBQWQsRUFBMEIsU0FBMUIsRUFBcUNFLElBQXJDLENBQWpCOztBQUVBWSxpQkFBV0UsZUFBWCxDQUEyQixJQUEzQjs7QUFFQSxhQUFPRixVQUFQO0FBQ0Q7Ozs7RUF4QnNCZixLOztBQTJCekJrQixPQUFPQyxPQUFQLEdBQWlCbEIsVUFBakIiLCJmaWxlIjoiZmlsZU1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKTtcblxuY2xhc3MgRmlsZU1hcmtlciBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlKTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGJlZm9yZSA9IChlbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgPyBcbiAgICAgICAgICAgICAgICAgICBmYWxzZSA6IFxuICAgICAgICAgICAgICAgICAgICAgKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUpIHtcbiAgICB2YXIgZmlsZU1hcmtlciA9IEVsZW1lbnQuY2xvbmUoRmlsZU1hcmtlciwgJyNtYXJrZXInLCBuYW1lKTtcblxuICAgIGZpbGVNYXJrZXIucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGVNYXJrZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTWFya2VyO1xuIl19