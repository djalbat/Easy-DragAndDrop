'use strict';

var util = {
  isTopmostDirectoryName: function isTopmostDirectoryName(path) {
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

  replaceTopPath: function replaceTopPath(path, sourcePath, targetPath) {
    var regExp = new RegExp('^' + sourcePath + '(.*$)'),
        matches = path.match(regExp);

    path = targetPath + matches[1]; ///

    return path;
  }
};

module.exports = util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUksT0FBTztBQUNULDBCQUF3QixnQ0FBUyxJQUFULEVBQWU7QUFDckMsUUFBSSx1QkFBdUIsS0FBSyxvQkFBTCxDQUEwQixJQUExQixDQUEzQjtRQUNJLFVBQVUseUJBQXlCLElBRHZDOztBQUdBLFdBQU8sT0FBUDtBQUNELEdBTlE7O0FBUVQsa0JBQWdCLHdCQUFTLElBQVQsRUFBZTtBQUM3QixRQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBZDtRQUNJLGlCQUFpQixVQUFVLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBRDVDOztBQUdBLFdBQU8sY0FBUDtBQUNELEdBYlE7O0FBZVQsd0JBQXNCLDhCQUFTLElBQVQsRUFBZTtBQUNuQyxRQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUFkO1FBQ0ksdUJBQXVCLFVBQVUsUUFBUSxDQUFSLENBQVYsR0FBdUIsSUFEbEQ7O0FBR0EsV0FBTyxvQkFBUDtBQUNELEdBcEJROztBQXNCVCw2QkFBMkIsbUNBQVMsSUFBVCxFQUFlO0FBQ3hDLFFBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUFkO1FBQ0ksNEJBQTRCLFVBQVUsUUFBUSxDQUFSLENBQVYsR0FBdUIsSUFEdkQ7O0FBR0EsV0FBTyx5QkFBUDtBQUNELEdBM0JROztBQTZCVCxtQ0FBaUMseUNBQVMsSUFBVCxFQUFlO0FBQzlDLFFBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUFkO1FBQ0ksa0NBQWtDLFVBQVUsUUFBUSxDQUFSLENBQVYsR0FBdUIsSUFEN0Q7O0FBR0EsV0FBTywrQkFBUDtBQUNELEdBbENROztBQW9DVCxrQkFBZ0Isd0JBQVMsSUFBVCxFQUFlLFVBQWYsRUFBMkIsVUFBM0IsRUFBdUM7QUFDckQsUUFBSSxTQUFTLElBQUksTUFBSixDQUFXLE1BQU0sVUFBTixHQUFtQixPQUE5QixDQUFiO1FBQ0ksVUFBVSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBRGQ7O0FBR0EsV0FBTyxhQUFhLFFBQVEsQ0FBUixDQUFwQixDOztBQUVBLFdBQU8sSUFBUDtBQUNEO0FBM0NRLENBQVg7O0FBOENBLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHtcbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZTogZnVuY3Rpb24ocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgIHRvcG1vc3QgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbDtcblxuICAgIHJldHVybiB0b3Btb3N0O1xuICB9LFxuXG4gIGJvdHRvbW1vc3ROYW1lOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eLipcXC8oW15cXC9dKiQpLyksXG4gICAgICAgIGJvdHRvbW1vc3ROYW1lID0gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiBudWxsO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xuICB9LFxuXG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSopXFwvLyksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiBudWxsO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9LFxuXG4gIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyheLiopXFwvW15cXC9dKiQvKSxcbiAgICAgICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogbnVsbDtcblxuICAgIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xuICB9LFxuXG4gIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10qXFwvKC4qJCkvKSxcbiAgICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogbnVsbDtcblxuICAgIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9LFxuXG4gIHJlcGxhY2VUb3BQYXRoOiBmdW5jdGlvbihwYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlUGF0aCArICcoLiokKScpLFxuICAgICAgICBtYXRjaGVzID0gcGF0aC5tYXRjaChyZWdFeHApO1xuXG4gICAgcGF0aCA9IHRhcmdldFBhdGggKyBtYXRjaGVzWzFdOyAvLy9cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWw7XG4iXX0=
