'use strict';

var util = {
  isTopmostDirectoryName: function(path) {
    var topmostDirectoryName = util.topmostDirectoryName(path),
        topmost = topmostDirectoryName === null;

    return topmost;
  },

  bottommostName: function(path) {
    var matches = path.match(/^.*\/([^\/]*$)/),
        bottommostName = matches ? matches[1] : null;

    return bottommostName;
  },

  topmostDirectoryName: function(path) {
    var matches = path.match(/^([^\/]*)\//),
        topmostDirectoryName = matches ? matches[1] : null;

    return topmostDirectoryName;
  },

  pathWithoutBottommostName: function(path) {
    var matches = path.match(/(^.*)\/[^\/]*$/),
        pathWithoutBottommostName = matches ? matches[1] : null;

    return pathWithoutBottommostName;
  },

  pathWithoutTopmostDirectoryName: function(path) {
    var matches = path.match(/^[^\/]*\/(.*$)/),
        pathWithoutTopmostDirectoryName = matches ? matches[1] : null;

    return pathWithoutTopmostDirectoryName;
  },

  replaceTopPath: function(path, sourcePath, targetPath) {
    var regExp = new RegExp('^' + sourcePath + '(.*$)'),
        matches = path.match(regExp);

    path = targetPath + matches[1]; ///

    return path;
  }
};

module.exports = util;
