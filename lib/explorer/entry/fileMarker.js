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
  }]);

  return FileMarker;
}(Entry);

FileMarker.clone = function (name) {
  var fileMarker = Element.clone(FileMarker, '#marker', name);

  fileMarker.removeAttribute('id');

  return fileMarker;
};

module.exports = FileMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlTWFya2VyIiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsInR5cGVzIiwiTUFSS0VSIiwiZW50cnkiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsImJlZm9yZSIsIkRJUkVDVE9SWSIsImxvY2FsZUNvbXBhcmUiLCJjbG9uZSIsImZpbGVNYXJrZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsUUFBUUYsUUFBUSxVQUFSLENBQVo7O0lBRU1HLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QjtBQUFBOztBQUMxQixRQUFJQyxPQUFPSixNQUFNSyxLQUFOLENBQVlDLE1BQXZCOztBQUQwQixtSEFHcEJKLFFBSG9CLEVBR1ZDLElBSFUsRUFHSkMsSUFISTtBQUkzQjs7Ozs2QkFFUUcsSyxFQUFPO0FBQ2QsVUFBSUosT0FBTyxLQUFLSyxPQUFMLEVBQVg7QUFBQSxVQUNJQyxZQUFZRixNQUFNQyxPQUFOLEVBRGhCO0FBQUEsVUFFSUUsWUFBWUgsTUFBTUksT0FBTixFQUZoQjtBQUFBLFVBR0lDLFNBQVNGLGNBQWNWLE1BQU1LLEtBQU4sQ0FBWVEsU0FBMUIsR0FBc0MsS0FBdEMsR0FBK0NWLEtBQUtXLGFBQUwsQ0FBbUJMLFNBQW5CLElBQWdDLENBSDVGOztBQUtBLGFBQU9HLE1BQVA7QUFDRDs7OztFQWRzQlosSzs7QUFpQnpCQyxXQUFXYyxLQUFYLEdBQW1CLFVBQVNaLElBQVQsRUFBZTtBQUNoQyxNQUFJYSxhQUFhakIsUUFBUWdCLEtBQVIsQ0FBY2QsVUFBZCxFQUEwQixTQUExQixFQUFxQ0UsSUFBckMsQ0FBakI7O0FBRUFhLGFBQVdDLGVBQVgsQ0FBMkIsSUFBM0I7O0FBRUEsU0FBT0QsVUFBUDtBQUNELENBTkQ7O0FBUUFFLE9BQU9DLE9BQVAsR0FBaUJsQixVQUFqQiIsImZpbGUiOiJmaWxlTWFya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpO1xuXG5jbGFzcyBGaWxlTWFya2VyIGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIHZhciB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgYmVmb3JlID0gZW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5ESVJFQ1RPUlkgPyBmYWxzZSA6IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxufVxuXG5GaWxlTWFya2VyLmNsb25lID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZmlsZU1hcmtlciA9IEVsZW1lbnQuY2xvbmUoRmlsZU1hcmtlciwgJyNtYXJrZXInLCBuYW1lKTtcblxuICBmaWxlTWFya2VyLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICByZXR1cm4gZmlsZU1hcmtlcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU1hcmtlcjtcbiJdfQ==