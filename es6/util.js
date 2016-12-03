'use strict';

class util {
  static isPathTopmostDirectoryName(path) {
    var topmostDirectoryName = util.topmostDirectoryName(path),
        pathTopmostDirectoryName = (topmostDirectoryName=== null); ///

    return pathTopmostDirectoryName;
  }

  static bottommostName(path) {
    var bottommostName = null,
        matches = path.match(/^.*\/([^\/]*$)/);
    
    if (matches !== null) {
      var secondMatch = second(matches);
      
      bottommostName = secondMatch;  ///
    }

    return bottommostName;
  }

  static topmostDirectoryName(path) {
    var topmostDirectoryName = null,
        matches = path.match(/^([^\/]*)\//);

    if (matches !== null) {
      var secondMatch = second(matches);

      topmostDirectoryName = secondMatch;  ///
    }

    return topmostDirectoryName;
  }

  static pathWithoutBottommostName(path) {
    var pathWithoutBottommostName = null,
        matches = path.match(/(^.*)\/[^\/]*$/);

    if (matches !== null) {
      var secondMatch = second(matches);

      pathWithoutBottommostName = secondMatch; ///
    }

    return pathWithoutBottommostName;
  }

  static pathWithoutTopmostDirectoryName(path) {
    var pathWithoutTopmostDirectoryName = null,
        matches = path.match(/^[^\/]*\/(.*$)/);

    if (matches !== null) {
      var secondMatch = second(matches);

      pathWithoutTopmostDirectoryName = secondMatch;
    }

    return pathWithoutTopmostDirectoryName;
  }
  
  static prependTargetPath(entryPath,  targetPath) {
    entryPath = targetPath + '/' + entryPath;
    
    return entryPath;
  }

  static replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath) {
    var regExp = new RegExp('^' + sourcePath + '(.*$)'),
        matches = entryPath.match(regExp),
        secondMatch = second(matches);

    entryPath = targetPath + secondMatch; ///

    return entryPath;
  }
}

module.exports = util;

function second(array) { return array[1]; }
