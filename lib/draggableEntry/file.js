'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selectorOr$Element, name, readOnly, eventHandler) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, selectorOr$Element, name, eventHandler, type));

    _this.readOnly = !!readOnly;

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
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;

        case Entry.types.DIRECTORY:

          return false;
      }
    }
  }, {
    key: 'getEntries',
    value: function getEntries() {
      var entry = this,
          ///
      entries = [entry];

      return entries;
    }
  }, {
    key: 'getReadOnly',
    value: function getReadOnly() {
      return this.readOnly;
    }
  }, {
    key: 'update',
    value: function update() {
      this.readOnly ? this.addClass('readOnly') : this.removeClass('readOnly');
    }
  }]);

  return File;
}(DraggableEntry);

File.clone = function (name, readOnly, eventHandler) {
  var file = Element.clone(File, '#file', name, readOnly, eventHandler);

  file.removeAttribute('id');

  return file;
};

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFUO0lBQ0EsVUFBVSxPQUFPLE9BQVA7O0FBRWQsSUFBSSxRQUFRLFFBQVEsVUFBUixDQUFSO0lBQ0EsaUJBQWlCLFFBQVEsbUJBQVIsQ0FBakI7O0lBRUU7OztBQUNKLFdBREksSUFDSixDQUFZLGtCQUFaLEVBQWdDLElBQWhDLEVBQXNDLFFBQXRDLEVBQWdELFlBQWhELEVBQThEOzBCQUQxRCxNQUMwRDs7QUFDNUQsUUFBSSxPQUFPLE1BQU0sS0FBTixDQUFZLElBQVosQ0FEaUQ7O3VFQUQxRCxpQkFJSSxvQkFBb0IsTUFBTSxjQUFjLE9BSGM7O0FBSzVELFVBQUssUUFBTCxHQUFnQixDQUFDLENBQUMsUUFBRCxDQUwyQzs7QUFPNUQsVUFBSyxNQUFMLEdBUDREOztHQUE5RDs7ZUFESTs7a0NBV1U7QUFDWixhQUFPLEtBQVAsQ0FEWTs7Ozs2QkFJTCxPQUFPO0FBQ2QsVUFBSSxZQUFZLE1BQU0sT0FBTixFQUFaLENBRFU7O0FBR2QsY0FBUSxTQUFSO0FBQ0UsYUFBSyxNQUFNLEtBQU4sQ0FBWSxJQUFaLENBRFA7QUFFRSxhQUFLLE1BQU0sS0FBTixDQUFZLE1BQVo7O0FBRUgsY0FBSSxPQUFPLEtBQUssT0FBTCxFQUFQO2NBQ0EsWUFBWSxNQUFNLE9BQU4sRUFBWjtjQUNBLFNBQVMsS0FBSyxhQUFMLENBQW1CLFNBQW5CLElBQWdDLENBQWhDLENBSmY7O0FBTUUsaUJBQU8sTUFBUCxDQU5GOztBQUZGLGFBVU8sTUFBTSxLQUFOLENBQVksU0FBWjs7QUFFSCxpQkFBTyxLQUFQLENBRkY7QUFWRixPQUhjOzs7O2lDQW1CSDtBQUNYLFVBQUksUUFBUSxJQUFSOztBQUNBLGdCQUFVLENBQUMsS0FBRCxDQUFWLENBRk87O0FBSVgsYUFBTyxPQUFQLENBSlc7Ozs7a0NBT0M7QUFDWixhQUFPLEtBQUssUUFBTCxDQURLOzs7OzZCQUlMO0FBQ1AsV0FBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBaEIsR0FBNEMsS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTVDLENBRE87Ozs7U0E3Q0w7RUFBYTs7QUFrRG5CLEtBQUssS0FBTCxHQUFhLFVBQVMsSUFBVCxFQUFlLFFBQWYsRUFBeUIsWUFBekIsRUFBdUM7QUFDbEQsTUFBSSxPQUFPLFFBQVEsS0FBUixDQUFjLElBQWQsRUFBb0IsT0FBcEIsRUFBNkIsSUFBN0IsRUFBbUMsUUFBbkMsRUFBNkMsWUFBN0MsQ0FBUCxDQUQ4Qzs7QUFHbEQsT0FBSyxlQUFMLENBQXFCLElBQXJCLEVBSGtEOztBQUtsRCxTQUFPLElBQVAsQ0FMa0Q7Q0FBdkM7O0FBUWIsT0FBTyxPQUFQLEdBQWlCLElBQWpCIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBGaWxlIGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIHJlYWRPbmx5LCBldmVudEhhbmRsZXIpIHtcbiAgICB2YXIgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEU7XG5cbiAgICBzdXBlcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIGV2ZW50SGFuZGxlciwgdHlwZSk7XG5cbiAgICB0aGlzLnJlYWRPbmx5ID0gISFyZWFkT25seTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLCAvLy9cbiAgICAgICAgZW50cmllcyA9IFtlbnRyeV07XG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGdldFJlYWRPbmx5KCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRPbmx5O1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMucmVhZE9ubHkgPyB0aGlzLmFkZENsYXNzKCdyZWFkT25seScpIDogdGhpcy5yZW1vdmVDbGFzcygncmVhZE9ubHknKTtcbiAgfVxufVxuXG5GaWxlLmNsb25lID0gZnVuY3Rpb24obmFtZSwgcmVhZE9ubHksIGV2ZW50SGFuZGxlcikge1xuICB2YXIgZmlsZSA9IEVsZW1lbnQuY2xvbmUoRmlsZSwgJyNmaWxlJywgbmFtZSwgcmVhZE9ubHksIGV2ZW50SGFuZGxlcik7XG5cbiAgZmlsZS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgcmV0dXJuIGZpbGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGU7XG4iXX0=
