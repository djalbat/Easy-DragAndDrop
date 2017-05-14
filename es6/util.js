'use strict';

class util {
  static isPathTopmostDirectoryName(path) {
    const topmostDirectoryName = util.topmostDirectoryName(path),
          pathTopmostDirectoryName = (topmostDirectoryName === null); ///

    return pathTopmostDirectoryName;
  }

  static bottommostName(path) {
    let bottommostName = null;
    
    const matches = path.match(/^.*\/([^\/]*$)/);
    
    if (matches !== null) {
      const secondMatch = second(matches);
      
      bottommostName = secondMatch;  ///
    }

    return bottommostName;
  }

  static topmostDirectoryName(path) {
    let topmostDirectoryName = null;
    
    const matches = path.match(/^([^\/]*)\//);

    if (matches !== null) {
      const secondMatch = second(matches);

      topmostDirectoryName = secondMatch;  ///
    }

    return topmostDirectoryName;
  }

  static pathWithoutBottommostName(path) {
    let pathWithoutBottommostName = null;
    
    const matches = path.match(/(^.*)\/[^\/]*$/);

    if (matches !== null) {
      const secondMatch = second(matches);

      pathWithoutBottommostName = secondMatch; ///
    }

    return pathWithoutBottommostName;
  }

  static pathWithoutTopmostDirectoryName(path) {
    let pathWithoutTopmostDirectoryName = null;
    
    const matches = path.match(/^[^\/]*\/(.*$)/);

    if (matches !== null) {
      const secondMatch = second(matches);

      pathWithoutTopmostDirectoryName = secondMatch;
    }

    return pathWithoutTopmostDirectoryName;
  }
  
  static prependTargetPath(entryPath,  targetPath) {
    entryPath = targetPath + '/' + entryPath;
    
    return entryPath;
  }

  static replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath) {
    sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)');  ///

    const regExp = new RegExp('^' + sourcePath + '(.*$)'),
          matches = entryPath.match(regExp),
          secondMatch = second(matches);

    entryPath = targetPath + secondMatch; ///

    return entryPath;
  }
}

module.exports = util;

function second(array) { return array[1]; }
