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
  }, {
    key: 'nameWithoutExtensionFromName',
    value: function nameWithoutExtensionFromName(name) {
      var nameWithoutExtension = null;

      var matches = name.match(/^(.+)\.[^.]+$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        nameWithoutExtension = secondMatch; ///
      }

      return nameWithoutExtension;
    }
  }]);

  return nameUtil;
}();

module.exports = nameUtil;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsL25hbWUuanMiXSwibmFtZXMiOlsiYXJyYXlVdGlsIiwicmVxdWlyZSIsIm5hbWVVdGlsIiwibmFtZSIsImV4dGVuc2lvbiIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwic2Vjb25kIiwibmFtZVdpdGhvdXRFeHRlbnNpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxlQUFSLENBQWxCOztJQUVNQyxROzs7Ozs7O3NDQUNxQkMsSSxFQUFNO0FBQzdCLFVBQUlDLFlBQVksSUFBaEI7O0FBRUEsVUFBTUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXLGVBQVgsQ0FBaEI7O0FBRUEsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFNRSxjQUFjUCxVQUFVUSxNQUFWLENBQWlCSCxPQUFqQixDQUFwQjs7QUFFQUQsb0JBQVlHLFdBQVosQ0FIb0IsQ0FHTTtBQUMzQjs7QUFFRCxhQUFPSCxTQUFQO0FBQ0Q7OztpREFFbUNELEksRUFBTTtBQUN4QyxVQUFJTSx1QkFBdUIsSUFBM0I7O0FBRUEsVUFBTUosVUFBVUYsS0FBS0csS0FBTCxDQUFXLGVBQVgsQ0FBaEI7O0FBRUEsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFNRSxjQUFjUCxVQUFVUSxNQUFWLENBQWlCSCxPQUFqQixDQUFwQjs7QUFFQUksK0JBQXVCRixXQUF2QixDQUhvQixDQUdpQjtBQUN0Qzs7QUFFRCxhQUFPRSxvQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQlQsUUFBakIiLCJmaWxlIjoibmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpO1xuXG5jbGFzcyBuYW1lVXRpbCB7XG4gIHN0YXRpYyBleHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IGV4dGVuc2lvbiA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14uKlxcLihbXi5dKykkLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBleHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cblxuICBzdGF0aWMgbmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbnVsbDtcblxuICAgIGNvbnN0IG1hdGNoZXMgPSBuYW1lLm1hdGNoKC9eKC4rKVxcLlteLl0rJC8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lV2l0aG91dEV4dGVuc2lvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hbWVVdGlsO1xuIl19