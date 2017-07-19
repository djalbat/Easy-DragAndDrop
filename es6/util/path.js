'use strict';

const arrayUtil = require('../util/array');

class pathUtil {
  static isPathTopmostDirectoryName(path) {
    const topmostDirectoryName = pathUtil.topmostDirectoryNameFromPath(path),
          pathTopmostDirectoryName = (topmostDirectoryName === null); ///

    return pathTopmostDirectoryName;
  }

  static bottommostNameFromPath(path) {
    let bottommostName = null;
    
    const matches = path.match(/^.*\/([^\/]*$)/);
    
    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);
      
      bottommostName = secondMatch;  ///
    }

    return bottommostName;
  }

  static topmostDirectoryNameFromPath(path) {
    let topmostDirectoryName = null;
    
    const matches = path.match(/^([^\/]*)\//);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      topmostDirectoryName = secondMatch;  ///
    }

    return topmostDirectoryName;
  }

  static pathWithoutBottommostNameFromPath(path) {
    let pathWithoutBottommostName = null;
    
    const matches = path.match(/(^.*)\/[^\/]*$/);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      pathWithoutBottommostName = secondMatch; ///
    }

    return pathWithoutBottommostName;
  }

  static pathWithoutTopmostDirectoryNameFromPath(path) {
    let pathWithoutTopmostDirectoryName = null;
    
    const matches = path.match(/^[^\/]*\/(.*$)/);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      pathWithoutTopmostDirectoryName = secondMatch;
    }

    return pathWithoutTopmostDirectoryName;
  }
}

module.exports = pathUtil;
