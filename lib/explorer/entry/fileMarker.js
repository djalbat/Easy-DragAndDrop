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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileMarker).call(this, selector, name, type));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYkVTMjAxNS9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksUUFBUSxRQUFRLFVBQVIsQ0FBWjs7SUFFTSxVOzs7QUFDSixzQkFBWSxRQUFaLEVBQXNCLElBQXRCLEVBQTRCO0FBQUE7O0FBQzFCLFFBQUksT0FBTyxNQUFNLEtBQU4sQ0FBWSxNQUF2Qjs7QUFEMEIseUZBR3BCLFFBSG9CLEVBR1YsSUFIVSxFQUdKLElBSEk7QUFJM0I7Ozs7NkJBRVEsSyxFQUFPO0FBQ2QsVUFBSSxPQUFPLEtBQUssT0FBTCxFQUFYO1VBQ0ksWUFBWSxNQUFNLE9BQU4sRUFEaEI7VUFFSSxZQUFZLE1BQU0sT0FBTixFQUZoQjtVQUdJLFNBQVMsY0FBYyxNQUFNLEtBQU4sQ0FBWSxTQUExQixHQUFzQyxLQUF0QyxHQUErQyxLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsSUFBZ0MsQ0FINUY7O0FBS0EsYUFBTyxNQUFQO0FBQ0Q7Ozs7RUFkc0IsSzs7QUFpQnpCLFdBQVcsS0FBWCxHQUFtQixVQUFTLElBQVQsRUFBZTtBQUNoQyxNQUFJLGFBQWEsUUFBUSxLQUFSLENBQWMsVUFBZCxFQUEwQixTQUExQixFQUFxQyxJQUFyQyxDQUFqQjs7QUFFQSxhQUFXLGVBQVgsQ0FBMkIsSUFBM0I7O0FBRUEsU0FBTyxVQUFQO0FBQ0QsQ0FORDs7QUFRQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiZmlsZU1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKTtcblxuY2xhc3MgRmlsZU1hcmtlciBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlKTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGJlZm9yZSA9IGVudHJ5VHlwZSA9PT0gRW50cnkudHlwZXMuRElSRUNUT1JZID8gZmFsc2UgOiAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbn1cblxuRmlsZU1hcmtlci5jbG9uZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZpbGVNYXJrZXIgPSBFbGVtZW50LmNsb25lKEZpbGVNYXJrZXIsICcjbWFya2VyJywgbmFtZSk7XG5cbiAgZmlsZU1hcmtlci5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgcmV0dXJuIGZpbGVNYXJrZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVNYXJrZXI7XG4iXX0=
