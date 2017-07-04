'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = require('../util/array');

var pathUtil = function () {
  function pathUtil() {
    _classCallCheck(this, pathUtil);
  }

  _createClass(pathUtil, null, [{
    key: 'isPathTopmostDirectoryName',
    value: function isPathTopmostDirectoryName(path) {
      var topmostDirectoryName = pathUtil.topmostDirectoryName(path),
          pathTopmostDirectoryName = topmostDirectoryName === null; ///

      return pathTopmostDirectoryName;
    }
  }, {
    key: 'bottommostName',
    value: function bottommostName(path) {
      var bottommostName = null;

      var matches = path.match(/^.*\/([^\/]*$)/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        bottommostName = secondMatch; ///
      }

      return bottommostName;
    }
  }, {
    key: 'topmostDirectoryName',
    value: function topmostDirectoryName(path) {
      var topmostDirectoryName = null;

      var matches = path.match(/^([^\/]*)\//);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        topmostDirectoryName = secondMatch; ///
      }

      return topmostDirectoryName;
    }
  }, {
    key: 'pathWithoutBottommostName',
    value: function pathWithoutBottommostName(path) {
      var pathWithoutBottommostName = null;

      var matches = path.match(/(^.*)\/[^\/]*$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        pathWithoutBottommostName = secondMatch; ///
      }

      return pathWithoutBottommostName;
    }
  }, {
    key: 'pathWithoutTopmostDirectoryName',
    value: function pathWithoutTopmostDirectoryName(path) {
      var pathWithoutTopmostDirectoryName = null;

      var matches = path.match(/^[^\/]*\/(.*$)/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        pathWithoutTopmostDirectoryName = secondMatch;
      }

      return pathWithoutTopmostDirectoryName;
    }
  }]);

  return pathUtil;
}();

module.exports = pathUtil;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsL3BhdGguanMiXSwibmFtZXMiOlsiYXJyYXlVdGlsIiwicmVxdWlyZSIsInBhdGhVdGlsIiwicGF0aCIsInRvcG1vc3REaXJlY3RvcnlOYW1lIiwicGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lIiwiYm90dG9tbW9zdE5hbWUiLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCIsInNlY29uZCIsInBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUiLCJwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsZUFBUixDQUFsQjs7SUFFTUMsUTs7Ozs7OzsrQ0FDOEJDLEksRUFBTTtBQUN0QyxVQUFNQyx1QkFBdUJGLFNBQVNFLG9CQUFULENBQThCRCxJQUE5QixDQUE3QjtBQUFBLFVBQ01FLDJCQUE0QkQseUJBQXlCLElBRDNELENBRHNDLENBRTRCOztBQUVsRSxhQUFPQyx3QkFBUDtBQUNEOzs7bUNBRXFCRixJLEVBQU07QUFDMUIsVUFBSUcsaUJBQWlCLElBQXJCOztBQUVBLFVBQU1DLFVBQVVKLEtBQUtLLEtBQUwsQ0FBVyxnQkFBWCxDQUFoQjs7QUFFQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQU1FLGNBQWNULFVBQVVVLE1BQVYsQ0FBaUJILE9BQWpCLENBQXBCOztBQUVBRCx5QkFBaUJHLFdBQWpCLENBSG9CLENBR1c7QUFDaEM7O0FBRUQsYUFBT0gsY0FBUDtBQUNEOzs7eUNBRTJCSCxJLEVBQU07QUFDaEMsVUFBSUMsdUJBQXVCLElBQTNCOztBQUVBLFVBQU1HLFVBQVVKLEtBQUtLLEtBQUwsQ0FBVyxhQUFYLENBQWhCOztBQUVBLFVBQUlELFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsWUFBTUUsY0FBY1QsVUFBVVUsTUFBVixDQUFpQkgsT0FBakIsQ0FBcEI7O0FBRUFILCtCQUF1QkssV0FBdkIsQ0FIb0IsQ0FHaUI7QUFDdEM7O0FBRUQsYUFBT0wsb0JBQVA7QUFDRDs7OzhDQUVnQ0QsSSxFQUFNO0FBQ3JDLFVBQUlRLDRCQUE0QixJQUFoQzs7QUFFQSxVQUFNSixVQUFVSixLQUFLSyxLQUFMLENBQVcsZ0JBQVgsQ0FBaEI7O0FBRUEsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFNRSxjQUFjVCxVQUFVVSxNQUFWLENBQWlCSCxPQUFqQixDQUFwQjs7QUFFQUksb0NBQTRCRixXQUE1QixDQUhvQixDQUdxQjtBQUMxQzs7QUFFRCxhQUFPRSx5QkFBUDtBQUNEOzs7b0RBRXNDUixJLEVBQU07QUFDM0MsVUFBSVMsa0NBQWtDLElBQXRDOztBQUVBLFVBQU1MLFVBQVVKLEtBQUtLLEtBQUwsQ0FBVyxnQkFBWCxDQUFoQjs7QUFFQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQU1FLGNBQWNULFVBQVVVLE1BQVYsQ0FBaUJILE9BQWpCLENBQXBCOztBQUVBSywwQ0FBa0NILFdBQWxDO0FBQ0Q7O0FBRUQsYUFBT0csK0JBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJaLFFBQWpCIiwiZmlsZSI6InBhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFycmF5VXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvYXJyYXknKTtcblxuY2xhc3MgcGF0aFV0aWwge1xuICBzdGF0aWMgaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgICAgcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGJvdHRvbW1vc3ROYW1lKHBhdGgpIHtcbiAgICBsZXQgYm90dG9tbW9zdE5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eLipcXC8oW15cXC9dKiQpLyk7XG4gICAgXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcbiAgICAgIFxuICAgICAgYm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBib3R0b21tb3N0TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyB0b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXihbXlxcL10qKVxcLy8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKHBhdGgpIHtcbiAgICBsZXQgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyheLiopXFwvW15cXC9dKiQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgbGV0IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eW15cXC9dKlxcLyguKiQpLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoVXRpbDtcbiJdfQ==