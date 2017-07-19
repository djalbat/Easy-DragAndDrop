'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = require('../util/array');

var nameUtil = function () {
  function nameUtil() {
    _classCallCheck(this, nameUtil);
  }

  _createClass(nameUtil, null, [{
    key: 'extensionFromName',
    value: function extensionFromName(name) {
      var extension = null;

      var matches = name.match(/^.*\.([^.]+)$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        extension = secondMatch; ///
      }

      return extension;
    }
  }]);

  return nameUtil;
}();

module.exports = nameUtil;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsL25hbWUuanMiXSwibmFtZXMiOlsiYXJyYXlVdGlsIiwicmVxdWlyZSIsIm5hbWVVdGlsIiwibmFtZSIsImV4dGVuc2lvbiIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwic2Vjb25kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsZUFBUixDQUFsQjs7SUFFTUMsUTs7Ozs7OztzQ0FDcUJDLEksRUFBTTtBQUM3QixVQUFJQyxZQUFZLElBQWhCOztBQUVBLFVBQU1DLFVBQVVGLEtBQUtHLEtBQUwsQ0FBVyxlQUFYLENBQWhCOztBQUVBLFVBQUlELFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsWUFBTUUsY0FBY1AsVUFBVVEsTUFBVixDQUFpQkgsT0FBakIsQ0FBcEI7O0FBRUFELG9CQUFZRyxXQUFaLENBSG9CLENBR007QUFDM0I7O0FBRUQsYUFBT0gsU0FBUDtBQUNEOzs7Ozs7QUFHSEssT0FBT0MsT0FBUCxHQUFpQlIsUUFBakIiLCJmaWxlIjoibmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpO1xuXG5jbGFzcyBuYW1lVXRpbCB7XG4gIHN0YXRpYyBleHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IGV4dGVuc2lvbiA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14uKlxcLihbXi5dKykkLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBleHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuYW1lVXRpbDtcbiJdfQ==