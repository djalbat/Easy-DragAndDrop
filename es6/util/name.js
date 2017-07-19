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

  static nameWithoutExtensionFromName(name) {
    let nameWithoutExtension = null;

    const matches = name.match(/^(.+)\.[^.]+$/);

    if (matches !== null) {
      const secondMatch = arrayUtil.second(matches);

      nameWithoutExtension = secondMatch;  ///
    }

    return nameWithoutExtension;
  }
}

module.exports = nameUtil;
