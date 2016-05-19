'use strict';

var util = {
  isTopmost: function isTopmost(path) {
    var topmostDirectoryName = util.topmostDirectoryName(path),
        topmost = topmostDirectoryName === null;

    return topmost;
  },

  bottommostName: function bottommostName(path) {
    var matches = path.match(/^.*\/([^\/]*$)/),
        bottommostName = matches ? matches[1] : null;

    return bottommostName;
  },

  topmostDirectoryName: function topmostDirectoryName(path) {
    var matches = path.match(/^([^\/]*)\//),
        topmostDirectoryName = matches ? matches[1] : null;

    return topmostDirectoryName;
  },

  pathWithoutBottommostName: function pathWithoutBottommostName(path) {
    var matches = path.match(/(^.*)\/[^\/]*$/),
        pathWithoutBottommostName = matches ? matches[1] : null;

    return pathWithoutBottommostName;
  },

  pathWithoutTopmostDirectoryName: function pathWithoutTopmostDirectoryName(path) {
    var matches = path.match(/^[^\/]*\/(.*$)/),
        pathWithoutTopmostDirectoryName = matches ? matches[1] : null;

    return pathWithoutTopmostDirectoryName;
  },

  replaceTopmostPath: function replaceTopmostPath(path, sourcePath, targetPath) {
    var regExp = new RegExp('^' + sourcePath + '(.*$)'),
        matches = path.match(regExp);

    path = targetPath + matches[1]; ///

    return path;
  }
};

module.exports = util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUksT0FBTztBQUNULGFBQVcsbUJBQVMsSUFBVCxFQUFlO0FBQ3hCLFFBQUksdUJBQXVCLEtBQUssb0JBQUwsQ0FBMEIsSUFBMUIsQ0FBM0I7UUFDSSxVQUFVLHlCQUF5QixJQUR2Qzs7QUFHQSxXQUFPLE9BQVA7QUFDRCxHQU5ROztBQVFULGtCQUFnQix3QkFBUyxJQUFULEVBQWU7QUFDN0IsUUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGdCQUFYLENBQWQ7UUFDSSxpQkFBaUIsVUFBVSxRQUFRLENBQVIsQ0FBVixHQUF1QixJQUQ1Qzs7QUFHQSxXQUFPLGNBQVA7QUFDRCxHQWJROztBQWVULHdCQUFzQiw4QkFBUyxJQUFULEVBQWU7QUFDbkMsUUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBZDtRQUNJLHVCQUF1QixVQUFVLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBRGxEOztBQUdBLFdBQU8sb0JBQVA7QUFDRCxHQXBCUTs7QUFzQlQsNkJBQTJCLG1DQUFTLElBQVQsRUFBZTtBQUN4QyxRQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBZDtRQUNJLDRCQUE0QixVQUFVLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBRHZEOztBQUdBLFdBQU8seUJBQVA7QUFDRCxHQTNCUTs7QUE2QlQsbUNBQWlDLHlDQUFTLElBQVQsRUFBZTtBQUM5QyxRQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBZDtRQUNJLGtDQUFrQyxVQUFVLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBRDdEOztBQUdBLFdBQU8sK0JBQVA7QUFDRCxHQWxDUTs7QUFvQ1Qsc0JBQW9CLDRCQUFTLElBQVQsRUFBZSxVQUFmLEVBQTJCLFVBQTNCLEVBQXVDO0FBQ3pELFFBQUksU0FBUyxJQUFJLE1BQUosQ0FBVyxNQUFNLFVBQU4sR0FBbUIsT0FBOUIsQ0FBYjtRQUNJLFVBQVUsS0FBSyxLQUFMLENBQVcsTUFBWCxDQURkOztBQUdBLFdBQU8sYUFBYSxRQUFRLENBQVIsQ0FBcEIsQzs7QUFFQSxXQUFPLElBQVA7QUFDRDtBQTNDUSxDQUFYOztBQThDQSxPQUFPLE9BQVAsR0FBaUIsSUFBakIiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSB7XG4gIGlzVG9wbW9zdDogZnVuY3Rpb24ocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHRvcG1vc3QgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbDtcblxuICAgIHJldHVybiB0b3Btb3N0O1xuICB9LFxuXG4gIGJvdHRvbW1vc3ROYW1lOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eLipcXC8oW15cXC9dKiQpLyksXG4gICAgICAgIGJvdHRvbW1vc3ROYW1lID0gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiBudWxsO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xuICB9LFxuXG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSopXFwvLyksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiBudWxsO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9LFxuXG4gIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyheLiopXFwvW15cXC9dKiQvKSxcbiAgICAgICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogbnVsbDtcblxuICAgIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xuICB9LFxuXG4gIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10qXFwvKC4qJCkvKSxcbiAgICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogbnVsbDtcblxuICAgIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9LFxuXG4gIHJlcGxhY2VUb3Btb3N0UGF0aDogZnVuY3Rpb24ocGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZVBhdGggKyAnKC4qJCknKSxcbiAgICAgICAgbWF0Y2hlcyA9IHBhdGgubWF0Y2gocmVnRXhwKTtcblxuICAgIHBhdGggPSB0YXJnZXRQYXRoICsgbWF0Y2hlc1sxXTsgLy8vXG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsO1xuIl19
