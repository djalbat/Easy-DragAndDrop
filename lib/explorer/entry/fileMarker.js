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
      var fileMarker = new FileMarker('#marker', name);

      fileMarker = Element.clone(FileMarker, fileMarker, name);

      fileMarker.removeAttribute('id');

      return fileMarker;
    }
  }]);

  return FileMarker;
}(Entry);

module.exports = FileMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9maWxlTWFya2VyLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJGaWxlTWFya2VyIiwic2VsZWN0b3IiLCJuYW1lIiwidHlwZSIsInR5cGVzIiwiTUFSS0VSIiwiZW50cnkiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsImJlZm9yZSIsIkRJUkVDVE9SWSIsImxvY2FsZUNvbXBhcmUiLCJmaWxlTWFya2VyIiwiY2xvbmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTUMsVUFBVUYsT0FBT0UsT0FEdkI7O0FBR0EsSUFBTUMsUUFBUUYsUUFBUSxVQUFSLENBQWQ7O0lBRU1HLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QjtBQUFBOztBQUMxQixRQUFNQyxPQUFPSixNQUFNSyxLQUFOLENBQVlDLE1BQXpCOztBQUQwQixtSEFHcEJKLFFBSG9CLEVBR1ZDLElBSFUsRUFHSkMsSUFISTtBQUkzQjs7Ozs2QkFFUUcsSyxFQUFPO0FBQ2QsVUFBTUosT0FBTyxLQUFLSyxPQUFMLEVBQWI7QUFBQSxVQUNNQyxZQUFZRixNQUFNQyxPQUFOLEVBRGxCO0FBQUEsVUFFTUUsWUFBWUgsTUFBTUksT0FBTixFQUZsQjtBQUFBLFVBR01DLFNBQVVGLGNBQWNWLE1BQU1LLEtBQU4sQ0FBWVEsU0FBM0IsR0FDRSxLQURGLEdBRUtWLEtBQUtXLGFBQUwsQ0FBbUJMLFNBQW5CLElBQWdDLENBTHBEOztBQU9BLGFBQU9HLE1BQVA7QUFDRDs7OzBCQUVZVCxJLEVBQU07QUFDakIsVUFBSVksYUFBYSxJQUFJZCxVQUFKLENBQWUsU0FBZixFQUEwQkUsSUFBMUIsQ0FBakI7O0FBRUFZLG1CQUFhaEIsUUFBUWlCLEtBQVIsQ0FBY2YsVUFBZCxFQUEwQmMsVUFBMUIsRUFBc0NaLElBQXRDLENBQWI7O0FBRUFZLGlCQUFXRSxlQUFYLENBQTJCLElBQTNCOztBQUVBLGFBQU9GLFVBQVA7QUFDRDs7OztFQTFCc0JmLEs7O0FBNkJ6QmtCLE9BQU9DLE9BQVAsR0FBaUJsQixVQUFqQiIsImZpbGUiOiJmaWxlTWFya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpO1xuXG5jbGFzcyBGaWxlTWFya2VyIGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSk7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGJlZm9yZSA9IChlbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgPyBcbiAgICAgICAgICAgICAgICAgICAgIGZhbHNlIDogXG4gICAgICAgICAgICAgICAgICAgICAgIChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShuYW1lKSB7XG4gICAgbGV0IGZpbGVNYXJrZXIgPSBuZXcgRmlsZU1hcmtlcignI21hcmtlcicsIG5hbWUpO1xuXG4gICAgZmlsZU1hcmtlciA9IEVsZW1lbnQuY2xvbmUoRmlsZU1hcmtlciwgZmlsZU1hcmtlciwgbmFtZSk7XG5cbiAgICBmaWxlTWFya2VyLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICAgIHJldHVybiBmaWxlTWFya2VyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU1hcmtlcjtcbiJdfQ==