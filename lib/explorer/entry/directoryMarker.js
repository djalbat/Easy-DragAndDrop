'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry');

var DirectoryMarker = function (_Entry) {
  _inherits(DirectoryMarker, _Entry);

  function DirectoryMarker(selector, name) {
    _classCallCheck(this, DirectoryMarker);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, (DirectoryMarker.__proto__ || Object.getPrototypeOf(DirectoryMarker)).call(this, selector, name, type));
  }

  _createClass(DirectoryMarker, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = entryType === Entry.types.FILE ? true : name.localeCompare(entryName) < 0;

      return before;
    }
  }], [{
    key: 'clone',
    value: function clone(name) {
      var directoryMarker = Element.clone(DirectoryMarker, '#marker', name);

      directoryMarker.removeAttribute('id');

      return directoryMarker;
    }
  }]);

  return DirectoryMarker;
}(Entry);

module.exports = DirectoryMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXIuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJFbnRyeSIsIkRpcmVjdG9yeU1hcmtlciIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJ0eXBlcyIsIk1BUktFUiIsImVudHJ5IiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJiZWZvcmUiLCJGSUxFIiwibG9jYWxlQ29tcGFyZSIsImRpcmVjdG9yeU1hcmtlciIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ0lDLFVBQVVGLE9BQU9FLE9BRHJCOztBQUdBLElBQUlDLFFBQVFGLFFBQVEsVUFBUixDQUFaOztJQUVNRyxlOzs7QUFDSiwyQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEI7QUFBQTs7QUFDMUIsUUFBSUMsT0FBT0osTUFBTUssS0FBTixDQUFZQyxNQUF2Qjs7QUFEMEIsNkhBR3BCSixRQUhvQixFQUdWQyxJQUhVLEVBR0pDLElBSEk7QUFJM0I7Ozs7NkJBRVFHLEssRUFBTztBQUNkLFVBQUlKLE9BQU8sS0FBS0ssT0FBTCxFQUFYO0FBQUEsVUFDSUMsWUFBWUYsTUFBTUMsT0FBTixFQURoQjtBQUFBLFVBRUlFLFlBQVlILE1BQU1JLE9BQU4sRUFGaEI7QUFBQSxVQUdJQyxTQUFVRixjQUFjVixNQUFNSyxLQUFOLENBQVlRLElBQTNCLEdBQ0UsSUFERixHQUVLVixLQUFLVyxhQUFMLENBQW1CTCxTQUFuQixJQUFnQyxDQUxsRDs7QUFPQSxhQUFPRyxNQUFQO0FBQ0Q7OzswQkFFWVQsSSxFQUFNO0FBQ2pCLFVBQUlZLGtCQUFrQmhCLFFBQVFpQixLQUFSLENBQWNmLGVBQWQsRUFBK0IsU0FBL0IsRUFBMENFLElBQTFDLENBQXRCOztBQUVBWSxzQkFBZ0JFLGVBQWhCLENBQWdDLElBQWhDOztBQUVBLGFBQU9GLGVBQVA7QUFDRDs7OztFQXhCMkJmLEs7O0FBMkI5QmtCLE9BQU9DLE9BQVAsR0FBaUJsQixlQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlNYXJrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeU1hcmtlciBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlKTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGJlZm9yZSA9IChlbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkZJTEUpID8gXG4gICAgICAgICAgICAgICAgICAgdHJ1ZSA6IFxuICAgICAgICAgICAgICAgICAgICAgKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKG5hbWUpIHtcbiAgICB2YXIgZGlyZWN0b3J5TWFya2VyID0gRWxlbWVudC5jbG9uZShEaXJlY3RvcnlNYXJrZXIsICcjbWFya2VyJywgbmFtZSk7XG5cbiAgICBkaXJlY3RvcnlNYXJrZXIucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU1hcmtlcjtcbiJdfQ==