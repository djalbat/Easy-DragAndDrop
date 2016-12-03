'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = function () {
  function util() {
    _classCallCheck(this, util);
  }

  _createClass(util, null, [{
    key: 'isPathTopmostDirectoryName',
    value: function isPathTopmostDirectoryName(path) {
      var topmostDirectoryName = util.topmostDirectoryName(path),
          pathTopmostDirectoryName = topmostDirectoryName === null; ///

      return pathTopmostDirectoryName;
    }
  }, {
    key: 'bottommostName',
    value: function bottommostName(path) {
      var bottommostName = null,
          matches = path.match(/^.*\/([^\/]*$)/);

      if (matches !== null) {
        var secondMatch = second(matches);

        bottommostName = secondMatch; ///
      }

      return bottommostName;
    }
  }, {
    key: 'topmostDirectoryName',
    value: function topmostDirectoryName(path) {
      var topmostDirectoryName = null,
          matches = path.match(/^([^\/]*)\//);

      if (matches !== null) {
        var secondMatch = second(matches);

        topmostDirectoryName = secondMatch; ///
      }

      return topmostDirectoryName;
    }
  }, {
    key: 'pathWithoutBottommostName',
    value: function pathWithoutBottommostName(path) {
      var pathWithoutBottommostName = null,
          matches = path.match(/(^.*)\/[^\/]*$/);

      if (matches !== null) {
        var secondMatch = second(matches);

        pathWithoutBottommostName = secondMatch; ///
      }

      return pathWithoutBottommostName;
    }
  }, {
    key: 'pathWithoutTopmostDirectoryName',
    value: function pathWithoutTopmostDirectoryName(path) {
      var pathWithoutTopmostDirectoryName = null,
          matches = path.match(/^[^\/]*\/(.*$)/);

      if (matches !== null) {
        var secondMatch = second(matches);

        pathWithoutTopmostDirectoryName = secondMatch;
      }

      return pathWithoutTopmostDirectoryName;
    }
  }, {
    key: 'prependTargetPath',
    value: function prependTargetPath(entryPath, targetPath) {
      entryPath = targetPath + '/' + entryPath;

      return entryPath;
    }
  }, {
    key: 'replaceSourcePathWithTargetPath',
    value: function replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath) {
      var regExp = new RegExp('^' + sourcePath + '(.*$)'),
          matches = entryPath.match(regExp),
          secondMatch = second(matches);

      entryPath = targetPath + secondMatch; ///

      return entryPath;
    }
  }]);

  return util;
}();

module.exports = util;

function second(array) {
  return array[1];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi91dGlsLmpzIl0sIm5hbWVzIjpbInV0aWwiLCJwYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJib3R0b21tb3N0TmFtZSIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwic2Vjb25kIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJlbnRyeVBhdGgiLCJ0YXJnZXRQYXRoIiwic291cmNlUGF0aCIsInJlZ0V4cCIsIlJlZ0V4cCIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcnJheSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxJOzs7Ozs7OytDQUM4QkMsSSxFQUFNO0FBQ3RDLFVBQUlDLHVCQUF1QkYsS0FBS0Usb0JBQUwsQ0FBMEJELElBQTFCLENBQTNCO0FBQUEsVUFDSUUsMkJBQTRCRCx5QkFBd0IsSUFEeEQsQ0FEc0MsQ0FFeUI7O0FBRS9ELGFBQU9DLHdCQUFQO0FBQ0Q7OzttQ0FFcUJGLEksRUFBTTtBQUMxQixVQUFJRyxpQkFBaUIsSUFBckI7QUFBQSxVQUNJQyxVQUFVSixLQUFLSyxLQUFMLENBQVcsZ0JBQVgsQ0FEZDs7QUFHQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQUlFLGNBQWNDLE9BQU9ILE9BQVAsQ0FBbEI7O0FBRUFELHlCQUFpQkcsV0FBakIsQ0FIb0IsQ0FHVztBQUNoQzs7QUFFRCxhQUFPSCxjQUFQO0FBQ0Q7Ozt5Q0FFMkJILEksRUFBTTtBQUNoQyxVQUFJQyx1QkFBdUIsSUFBM0I7QUFBQSxVQUNJRyxVQUFVSixLQUFLSyxLQUFMLENBQVcsYUFBWCxDQURkOztBQUdBLFVBQUlELFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsWUFBSUUsY0FBY0MsT0FBT0gsT0FBUCxDQUFsQjs7QUFFQUgsK0JBQXVCSyxXQUF2QixDQUhvQixDQUdpQjtBQUN0Qzs7QUFFRCxhQUFPTCxvQkFBUDtBQUNEOzs7OENBRWdDRCxJLEVBQU07QUFDckMsVUFBSVEsNEJBQTRCLElBQWhDO0FBQUEsVUFDSUosVUFBVUosS0FBS0ssS0FBTCxDQUFXLGdCQUFYLENBRGQ7O0FBR0EsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFJRSxjQUFjQyxPQUFPSCxPQUFQLENBQWxCOztBQUVBSSxvQ0FBNEJGLFdBQTVCLENBSG9CLENBR3FCO0FBQzFDOztBQUVELGFBQU9FLHlCQUFQO0FBQ0Q7OztvREFFc0NSLEksRUFBTTtBQUMzQyxVQUFJUyxrQ0FBa0MsSUFBdEM7QUFBQSxVQUNJTCxVQUFVSixLQUFLSyxLQUFMLENBQVcsZ0JBQVgsQ0FEZDs7QUFHQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQUlFLGNBQWNDLE9BQU9ILE9BQVAsQ0FBbEI7O0FBRUFLLDBDQUFrQ0gsV0FBbEM7QUFDRDs7QUFFRCxhQUFPRywrQkFBUDtBQUNEOzs7c0NBRXdCQyxTLEVBQVlDLFUsRUFBWTtBQUMvQ0Qsa0JBQVlDLGFBQWEsR0FBYixHQUFtQkQsU0FBL0I7O0FBRUEsYUFBT0EsU0FBUDtBQUNEOzs7b0RBRXNDQSxTLEVBQVdFLFUsRUFBWUQsVSxFQUFZO0FBQ3hFLFVBQUlFLFNBQVMsSUFBSUMsTUFBSixDQUFXLE1BQU1GLFVBQU4sR0FBbUIsT0FBOUIsQ0FBYjtBQUFBLFVBQ0lSLFVBQVVNLFVBQVVMLEtBQVYsQ0FBZ0JRLE1BQWhCLENBRGQ7QUFBQSxVQUVJUCxjQUFjQyxPQUFPSCxPQUFQLENBRmxCOztBQUlBTSxrQkFBWUMsYUFBYUwsV0FBekIsQ0FMd0UsQ0FLbEM7O0FBRXRDLGFBQU9JLFNBQVA7QUFDRDs7Ozs7O0FBR0hLLE9BQU9DLE9BQVAsR0FBaUJqQixJQUFqQjs7QUFFQSxTQUFTUSxNQUFULENBQWdCVSxLQUFoQixFQUF1QjtBQUFFLFNBQU9BLE1BQU0sQ0FBTixDQUFQO0FBQWtCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIHV0aWwge1xuICBzdGF0aWMgaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZT09PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGJvdHRvbW1vc3ROYW1lKHBhdGgpIHtcbiAgICB2YXIgYm90dG9tbW9zdE5hbWUgPSBudWxsLFxuICAgICAgICBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4qXFwvKFteXFwvXSokKS8pO1xuICAgIFxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICB2YXIgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG4gICAgICBcbiAgICAgIGJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gYm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgdG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGwsXG4gICAgICAgIG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSopXFwvLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgdmFyIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUocGF0aCkge1xuICAgIHZhciBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gbnVsbCxcbiAgICAgICAgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyheLiopXFwvW15cXC9dKiQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICB2YXIgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgdmFyIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsLFxuICAgICAgICBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXlteXFwvXSpcXC8oLiokKS8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIHZhciBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG4gIFxuICBzdGF0aWMgcHJlcGVuZFRhcmdldFBhdGgoZW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICAgIGVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyAnLycgKyBlbnRyeVBhdGg7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5UGF0aDtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZVBhdGggKyAnKC4qJCknKSxcbiAgICAgICAgbWF0Y2hlcyA9IGVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIGVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnlQYXRoO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbDtcblxuZnVuY3Rpb24gc2Vjb25kKGFycmF5KSB7IHJldHVybiBhcnJheVsxXTsgfVxuIl19