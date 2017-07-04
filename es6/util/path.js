'use strict';

const arrayUtil = require('../util/array');

class pathUtil {
  static isPathTopmostDirectoryName(path) {
    const topmostDirectoryName = pathUtil.topmostDirectoryName(path),
          pathTopmostDirectoryName = (topmostDirectoryName === null); ///

    return pathTopmostDirectoryName;
  }

  static bottommostName(path) {
    let bottommostName = null;
    
    const matches = path.match(/^.*\/([^\/]*$)/);
    
    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);
      
      bottommostName = secondMatch;  ///
    }

    return bottommostName;
  }

  static topmostDirectoryName(path) {
    let topmostDirectoryName = null;
    
    const matches = path.match(/^([^\/]*)\//);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      topmostDirectoryName = secondMatch;  ///
    }

    return topmostDirectoryName;
  }

  static pathWithoutBottommostName(path) {
    let pathWithoutBottommostName = null;
    
    const matches = path.match(/(^.*)\/[^\/]*$/);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      pathWithoutBottommostName = secondMatch; ///
    }

    return pathWithoutBottommostName;
  }

  static pathWithoutTopmostDirectoryName(path) {
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
