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
      var bottommostName = null;

      var matches = path.match(/^.*\/([^\/]*$)/);

      if (matches !== null) {
        var secondMatch = second(matches);

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
        var secondMatch = second(matches);

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
        var secondMatch = second(matches);

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
      sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)'); ///

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi91dGlsLmpzIl0sIm5hbWVzIjpbInV0aWwiLCJwYXRoIiwidG9wbW9zdERpcmVjdG9yeU5hbWUiLCJwYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUiLCJib3R0b21tb3N0TmFtZSIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwic2Vjb25kIiwicGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSIsInBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUiLCJlbnRyeVBhdGgiLCJ0YXJnZXRQYXRoIiwic291cmNlUGF0aCIsInJlcGxhY2UiLCJyZWdFeHAiLCJSZWdFeHAiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXJyYXkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUFFTUEsSTs7Ozs7OzsrQ0FDOEJDLEksRUFBTTtBQUN0QyxVQUFNQyx1QkFBdUJGLEtBQUtFLG9CQUFMLENBQTBCRCxJQUExQixDQUE3QjtBQUFBLFVBQ01FLDJCQUE0QkQseUJBQXlCLElBRDNELENBRHNDLENBRTRCOztBQUVsRSxhQUFPQyx3QkFBUDtBQUNEOzs7bUNBRXFCRixJLEVBQU07QUFDMUIsVUFBSUcsaUJBQWlCLElBQXJCOztBQUVBLFVBQU1DLFVBQVVKLEtBQUtLLEtBQUwsQ0FBVyxnQkFBWCxDQUFoQjs7QUFFQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQU1FLGNBQWNDLE9BQU9ILE9BQVAsQ0FBcEI7O0FBRUFELHlCQUFpQkcsV0FBakIsQ0FIb0IsQ0FHVztBQUNoQzs7QUFFRCxhQUFPSCxjQUFQO0FBQ0Q7Ozt5Q0FFMkJILEksRUFBTTtBQUNoQyxVQUFJQyx1QkFBdUIsSUFBM0I7O0FBRUEsVUFBTUcsVUFBVUosS0FBS0ssS0FBTCxDQUFXLGFBQVgsQ0FBaEI7O0FBRUEsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFNRSxjQUFjQyxPQUFPSCxPQUFQLENBQXBCOztBQUVBSCwrQkFBdUJLLFdBQXZCLENBSG9CLENBR2lCO0FBQ3RDOztBQUVELGFBQU9MLG9CQUFQO0FBQ0Q7Ozs4Q0FFZ0NELEksRUFBTTtBQUNyQyxVQUFJUSw0QkFBNEIsSUFBaEM7O0FBRUEsVUFBTUosVUFBVUosS0FBS0ssS0FBTCxDQUFXLGdCQUFYLENBQWhCOztBQUVBLFVBQUlELFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsWUFBTUUsY0FBY0MsT0FBT0gsT0FBUCxDQUFwQjs7QUFFQUksb0NBQTRCRixXQUE1QixDQUhvQixDQUdxQjtBQUMxQzs7QUFFRCxhQUFPRSx5QkFBUDtBQUNEOzs7b0RBRXNDUixJLEVBQU07QUFDM0MsVUFBSVMsa0NBQWtDLElBQXRDOztBQUVBLFVBQU1MLFVBQVVKLEtBQUtLLEtBQUwsQ0FBVyxnQkFBWCxDQUFoQjs7QUFFQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQU1FLGNBQWNDLE9BQU9ILE9BQVAsQ0FBcEI7O0FBRUFLLDBDQUFrQ0gsV0FBbEM7QUFDRDs7QUFFRCxhQUFPRywrQkFBUDtBQUNEOzs7c0NBRXdCQyxTLEVBQVlDLFUsRUFBWTtBQUMvQ0Qsa0JBQVlDLGFBQWEsR0FBYixHQUFtQkQsU0FBL0I7O0FBRUEsYUFBT0EsU0FBUDtBQUNEOzs7b0RBRXNDQSxTLEVBQVdFLFUsRUFBWUQsVSxFQUFZO0FBQ3hFQyxtQkFBYUEsV0FBV0MsT0FBWCxDQUFtQixLQUFuQixFQUEwQixLQUExQixFQUFpQ0EsT0FBakMsQ0FBeUMsS0FBekMsRUFBZ0QsS0FBaEQsQ0FBYixDQUR3RSxDQUNGOztBQUV0RSxVQUFNQyxTQUFTLElBQUlDLE1BQUosQ0FBVyxNQUFNSCxVQUFOLEdBQW1CLE9BQTlCLENBQWY7QUFBQSxVQUNNUixVQUFVTSxVQUFVTCxLQUFWLENBQWdCUyxNQUFoQixDQURoQjtBQUFBLFVBRU1SLGNBQWNDLE9BQU9ILE9BQVAsQ0FGcEI7O0FBSUFNLGtCQUFZQyxhQUFhTCxXQUF6QixDQVB3RSxDQU9sQzs7QUFFdEMsYUFBT0ksU0FBUDtBQUNEOzs7Ozs7QUFHSE0sT0FBT0MsT0FBUCxHQUFpQmxCLElBQWpCOztBQUVBLFNBQVNRLE1BQVQsQ0FBZ0JXLEtBQWhCLEVBQXVCO0FBQUUsU0FBT0EsTUFBTSxDQUFOLENBQVA7QUFBa0IiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgdXRpbCB7XG4gIHN0YXRpYyBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpLFxuICAgICAgICAgIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBib3R0b21tb3N0TmFtZShwYXRoKSB7XG4gICAgbGV0IGJvdHRvbW1vc3ROYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4qXFwvKFteXFwvXSokKS8pO1xuICAgIFxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcbiAgICAgIFxuICAgICAgYm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBib3R0b21tb3N0TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyB0b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXihbXlxcL10qKVxcLy8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUocGF0aCkge1xuICAgIGxldCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvKF4uKilcXC9bXlxcL10qJC8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xuICB9XG5cbiAgc3RhdGljIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIGxldCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXlteXFwvXSpcXC8oLiokKS8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cbiAgXG4gIHN0YXRpYyBwcmVwZW5kVGFyZ2V0UGF0aChlbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gICAgZW50cnlQYXRoID0gdGFyZ2V0UGF0aCArICcvJyArIGVudHJ5UGF0aDtcbiAgICBcbiAgICByZXR1cm4gZW50cnlQYXRoO1xuICB9XG5cbiAgc3RhdGljIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGgoZW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKTsgIC8vL1xuXG4gICAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2VQYXRoICsgJyguKiQpJyksXG4gICAgICAgICAgbWF0Y2hlcyA9IGVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgZW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICAgIHJldHVybiBlbnRyeVBhdGg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsO1xuXG5mdW5jdGlvbiBzZWNvbmQoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzFdOyB9XG4iXX0=