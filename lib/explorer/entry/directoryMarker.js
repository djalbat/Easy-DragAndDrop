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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectoryMarker).call(this, selector, name, type));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9lbnRyeS9kaXJlY3RvcnlNYXJrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7SUFDSSxVQUFVLE9BQU8sT0FEckI7O0FBR0EsSUFBSSxRQUFRLFFBQVEsVUFBUixDQUFaOztJQUVNLGU7OztBQUNKLDJCQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEI7QUFBQTs7QUFDMUIsUUFBSSxPQUFPLE1BQU0sS0FBTixDQUFZLE1BQXZCOztBQUQwQiw4RkFHcEIsUUFIb0IsRUFHVixJQUhVLEVBR0osSUFISTtBQUkzQjs7Ozs2QkFFUSxLLEVBQU87QUFDZCxVQUFJLE9BQU8sS0FBSyxPQUFMLEVBQVg7VUFDSSxZQUFZLE1BQU0sT0FBTixFQURoQjtVQUVJLFlBQVksTUFBTSxPQUFOLEVBRmhCO1VBR0ksU0FBUyxjQUFjLE1BQU0sS0FBTixDQUFZLElBQTFCLEdBQWlDLElBQWpDLEdBQXlDLEtBQUssYUFBTCxDQUFtQixTQUFuQixJQUFnQyxDQUh0Rjs7QUFLQSxhQUFPLE1BQVA7QUFDRDs7OztFQWQyQixLOztBQWlCOUIsZ0JBQWdCLEtBQWhCLEdBQXdCLFVBQVMsSUFBVCxFQUFlO0FBQ3JDLE1BQUksa0JBQWtCLFFBQVEsS0FBUixDQUFjLGVBQWQsRUFBK0IsU0FBL0IsRUFBMEMsSUFBMUMsQ0FBdEI7O0FBRUEsa0JBQWdCLGVBQWhCLENBQWdDLElBQWhDOztBQUVBLFNBQU8sZUFBUDtBQUNELENBTkQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6ImRpcmVjdG9yeU1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5TWFya2VyIGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgYmVmb3JlID0gZW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5GSUxFID8gdHJ1ZSA6IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxufVxuXG5EaXJlY3RvcnlNYXJrZXIuY2xvbmUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBkaXJlY3RvcnlNYXJrZXIgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeU1hcmtlciwgJyNtYXJrZXInLCBuYW1lKTtcblxuICBkaXJlY3RvcnlNYXJrZXIucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBkaXJlY3RvcnlNYXJrZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU1hcmtlcjtcbiJdfQ==
