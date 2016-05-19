'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../explorer/entry');

var DirectoryMarker = function (_Entry) {
  _inherits(DirectoryMarker, _Entry);

  function DirectoryMarker(selectorOr$Element, name) {
    _classCallCheck(this, DirectoryMarker);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectoryMarker).call(this, selectorOr$Element, name, type));
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
  }]);

  return DirectoryMarker;
}(Entry);

DirectoryMarker.clone = function (name) {
  var directoryMarker = Element.clone(DirectoryMarker, '#marker', name);

  directoryMarker.removeAttribute('id');

  return directoryMarker;
};

module.exports = DirectoryMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9lbnRyeS9kaXJlY3RvcnlNYXJrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQVQ7SUFDQSxVQUFVLE9BQU8sT0FBUDs7QUFFZCxJQUFJLFFBQVEsUUFBUSxtQkFBUixDQUFSOztJQUVFOzs7QUFDSixXQURJLGVBQ0osQ0FBWSxrQkFBWixFQUFnQyxJQUFoQyxFQUFzQzswQkFEbEMsaUJBQ2tDOztBQUNwQyxRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksTUFBWixDQUR5Qjs7a0VBRGxDLDRCQUlJLG9CQUFvQixNQUFNLE9BSEk7R0FBdEM7O2VBREk7OzZCQU9LLE9BQU87QUFDZCxVQUFJLE9BQU8sS0FBSyxPQUFMLEVBQVA7VUFDQSxZQUFZLE1BQU0sT0FBTixFQUFaO1VBQ0EsWUFBWSxNQUFNLE9BQU4sRUFBWjtVQUNBLFNBQVMsY0FBYyxNQUFNLEtBQU4sQ0FBWSxJQUFaLEdBQW1CLElBQWpDLEdBQXlDLEtBQUssYUFBTCxDQUFtQixTQUFuQixJQUFnQyxDQUFoQyxDQUp4Qzs7QUFNZCxhQUFPLE1BQVAsQ0FOYzs7OztTQVBaO0VBQXdCOztBQWlCOUIsZ0JBQWdCLEtBQWhCLEdBQXdCLFVBQVMsSUFBVCxFQUFlO0FBQ3JDLE1BQUksa0JBQWtCLFFBQVEsS0FBUixDQUFjLGVBQWQsRUFBK0IsU0FBL0IsRUFBMEMsSUFBMUMsQ0FBbEIsQ0FEaUM7O0FBR3JDLGtCQUFnQixlQUFoQixDQUFnQyxJQUFoQyxFQUhxQzs7QUFLckMsU0FBTyxlQUFQLENBTHFDO0NBQWY7O0FBUXhCLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJkaXJlY3RvcnlNYXJrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4uL2V4cGxvcmVyL2VudHJ5Jyk7XG5cbmNsYXNzIERpcmVjdG9yeU1hcmtlciBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JPciRFbGVtZW50LCBuYW1lKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICBzdXBlcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgYmVmb3JlID0gZW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5GSUxFID8gdHJ1ZSA6IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxufVxuXG5EaXJlY3RvcnlNYXJrZXIuY2xvbmUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBkaXJlY3RvcnlNYXJrZXIgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeU1hcmtlciwgJyNtYXJrZXInLCBuYW1lKTtcblxuICBkaXJlY3RvcnlNYXJrZXIucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3RvcnlNYXJrZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU1hcmtlcjtcbiJdfQ==
