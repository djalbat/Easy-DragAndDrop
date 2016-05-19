'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../explorer/entry');

var FileMarker = function (_Entry) {
  _inherits(FileMarker, _Entry);

  function FileMarker(selectorOr$Element, name) {
    _classCallCheck(this, FileMarker);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileMarker).call(this, selectorOr$Element, name, type));
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
  }]);

  return FileMarker;
}(Entry);

FileMarker.clone = function (name) {
  var fileMarker = Element.clone(FileMarker, '#marker', name);

  fileMarker.removeAttribute('id');

  return fileMarker;
};

module.exports = FileMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9lbnRyeS9maWxlTWFya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFUO0lBQ0EsVUFBVSxPQUFPLE9BQVA7O0FBRWQsSUFBSSxRQUFRLFFBQVEsbUJBQVIsQ0FBUjs7SUFFRTs7O0FBQ0osV0FESSxVQUNKLENBQVksa0JBQVosRUFBZ0MsSUFBaEMsRUFBc0M7MEJBRGxDLFlBQ2tDOztBQUNwQyxRQUFJLE9BQU8sTUFBTSxLQUFOLENBQVksTUFBWixDQUR5Qjs7a0VBRGxDLHVCQUlJLG9CQUFvQixNQUFNLE9BSEk7R0FBdEM7O2VBREk7OzZCQU9LLE9BQU87QUFDZCxVQUFJLE9BQU8sS0FBSyxPQUFMLEVBQVA7VUFDQSxZQUFZLE1BQU0sT0FBTixFQUFaO1VBQ0EsWUFBWSxNQUFNLE9BQU4sRUFBWjtVQUNBLFNBQVMsY0FBYyxNQUFNLEtBQU4sQ0FBWSxTQUFaLEdBQXdCLEtBQXRDLEdBQStDLEtBQUssYUFBTCxDQUFtQixTQUFuQixJQUFnQyxDQUFoQyxDQUo5Qzs7QUFNZCxhQUFPLE1BQVAsQ0FOYzs7OztTQVBaO0VBQW1COztBQWlCekIsV0FBVyxLQUFYLEdBQW1CLFVBQVMsSUFBVCxFQUFlO0FBQ2hDLE1BQUksYUFBYSxRQUFRLEtBQVIsQ0FBYyxVQUFkLEVBQTBCLFNBQTFCLEVBQXFDLElBQXJDLENBQWIsQ0FENEI7O0FBR2hDLGFBQVcsZUFBWCxDQUEyQixJQUEzQixFQUhnQzs7QUFLaEMsU0FBTyxVQUFQLENBTGdDO0NBQWY7O0FBUW5CLE9BQU8sT0FBUCxHQUFpQixVQUFqQiIsImZpbGUiOiJmaWxlTWFya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuLi9leHBsb3Jlci9lbnRyeScpO1xuXG5jbGFzcyBGaWxlTWFya2VyIGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHN1cGVyKHNlbGVjdG9yT3IkRWxlbWVudCwgbmFtZSwgdHlwZSk7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBiZWZvcmUgPSBlbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkRJUkVDVE9SWSA/IGZhbHNlIDogKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG59XG5cbkZpbGVNYXJrZXIuY2xvbmUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBmaWxlTWFya2VyID0gRWxlbWVudC5jbG9uZShGaWxlTWFya2VyLCAnI21hcmtlcicsIG5hbWUpO1xuXG4gIGZpbGVNYXJrZXIucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gIHJldHVybiBmaWxlTWFya2VyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTWFya2VyO1xuIl19
