'use strict';

var util = {
  isPathTopmostDirectoryName: function(path) {
    var pathTopmostDirectoryName = util.topmostDirectoryName(path);

    pathTopmostDirectoryName = (pathTopmostDirectoryName === null); ///

    return pathTopmostDirectoryName;
  },

  bottommostName: function(path) {
    var bottommostName = null,
        matches = path.match(/^.*\/([^\/]*$)/);
    
    if (matches !== null) {
      var secondMatch = second(matches);
      
      bottommostName = secondMatch;  ///
    }

    return bottommostName;
  },

  topmostDirectoryName: function(path) {
    var topmostDirectoryName = null,
        matches = path.match(/^([^\/]*)\//);

    if (matches !== null) {
      var secondMatch = second(matches);

      topmostDirectoryName = secondMatch;  ///
    }

    return topmostDirectoryName;
  },

  pathWithoutBottommostName: function(path) {
    var pathWithoutBottommostName = null,
        matches = path.match(/(^.*)\/[^\/]*$/);

    if (matches !== null) {
      var secondMatch = second(matches);

      pathWithoutBottommostName = secondMatch; ///
    }

    return pathWithoutBottommostName;
  },

  pathWithoutTopmostDirectoryName: function(path) {
    var pathWithoutTopmostDirectoryName = null,
        matches = path.match(/^[^\/]*\/(.*$)/);

    if (matches !== null) {
      var secondMatch = second(matches);

      pathWithoutTopmostDirectoryName = secondMatch;
    }

    return pathWithoutTopmostDirectoryName;
  },

  replaceSourcePathWithTargetPath: function(path, sourcePath, targetPath) {
    var regExp = new RegExp('^' + sourcePath + '(.*$)'),
        matches = path.match(regExp),
        secondMatch = second(matches);

    path = targetPath + secondMatch; ///

    return path;
  }
};

module.exports = util;

function second(array) { return array[1]; }
