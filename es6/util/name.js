'use strict';

const arrayUtil = require('../util/array');

class nameUtil {
  static extensionFromName(name) {
    let extension = null;
    
    const matches = name.match(/^.*\.([^.]+)$/);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      extension = secondMatch;  ///
    }

    return extension;
  }
}

module.exports = nameUtil;
