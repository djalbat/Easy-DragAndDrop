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
      var directoryMarker = new DirectoryMarker('#marker', name);

      directoryMarker = Element.clone(DirectoryMarker, directoryMarker, name);

      directoryMarker.removeAttribute('id');

      return directoryMarker;
    }
  }]);

  return DirectoryMarker;
}(Entry);

module.exports = DirectoryMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXIuanMiXSwibmFtZXMiOlsiZWFzeXVpIiwicmVxdWlyZSIsIkVsZW1lbnQiLCJFbnRyeSIsIkRpcmVjdG9yeU1hcmtlciIsInNlbGVjdG9yIiwibmFtZSIsInR5cGUiLCJ0eXBlcyIsIk1BUktFUiIsImVudHJ5IiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJiZWZvcmUiLCJGSUxFIiwibG9jYWxlQ29tcGFyZSIsImRpcmVjdG9yeU1hcmtlciIsImNsb25lIiwicmVtb3ZlQXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ01DLFVBQVVGLE9BQU9FLE9BRHZCOztBQUdBLElBQU1DLFFBQVFGLFFBQVEsVUFBUixDQUFkOztJQUVNRyxlOzs7QUFDSiwyQkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEI7QUFBQTs7QUFDMUIsUUFBTUMsT0FBT0osTUFBTUssS0FBTixDQUFZQyxNQUF6Qjs7QUFEMEIsNkhBR3BCSixRQUhvQixFQUdWQyxJQUhVLEVBR0pDLElBSEk7QUFJM0I7Ozs7NkJBRVFHLEssRUFBTztBQUNkLFVBQU1KLE9BQU8sS0FBS0ssT0FBTCxFQUFiO0FBQUEsVUFDTUMsWUFBWUYsTUFBTUMsT0FBTixFQURsQjtBQUFBLFVBRU1FLFlBQVlILE1BQU1JLE9BQU4sRUFGbEI7QUFBQSxVQUdNQyxTQUFVRixjQUFjVixNQUFNSyxLQUFOLENBQVlRLElBQTNCLEdBQ0UsSUFERixHQUVLVixLQUFLVyxhQUFMLENBQW1CTCxTQUFuQixJQUFnQyxDQUxwRDs7QUFPQSxhQUFPRyxNQUFQO0FBQ0Q7OzswQkFFWVQsSSxFQUFNO0FBQ2pCLFVBQUlZLGtCQUFrQixJQUFJZCxlQUFKLENBQW9CLFNBQXBCLEVBQStCRSxJQUEvQixDQUF0Qjs7QUFFQVksd0JBQWtCaEIsUUFBUWlCLEtBQVIsQ0FBY2YsZUFBZCxFQUErQmMsZUFBL0IsRUFBZ0RaLElBQWhELENBQWxCOztBQUVBWSxzQkFBZ0JFLGVBQWhCLENBQWdDLElBQWhDOztBQUVBLGFBQU9GLGVBQVA7QUFDRDs7OztFQTFCMkJmLEs7O0FBNkI5QmtCLE9BQU9DLE9BQVAsR0FBaUJsQixlQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlNYXJrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeU1hcmtlciBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBiZWZvcmUgPSAoZW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5GSUxFKSA/IFxuICAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6IFxuICAgICAgICAgICAgICAgICAgICAgICAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSkge1xuICAgIGxldCBkaXJlY3RvcnlNYXJrZXIgPSBuZXcgRGlyZWN0b3J5TWFya2VyKCcjbWFya2VyJywgbmFtZSk7XG5cbiAgICBkaXJlY3RvcnlNYXJrZXIgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeU1hcmtlciwgZGlyZWN0b3J5TWFya2VyLCBuYW1lKTtcblxuICAgIGRpcmVjdG9yeU1hcmtlci5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TWFya2VyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TWFya2VyO1xuIl19