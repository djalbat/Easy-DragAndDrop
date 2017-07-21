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

  static nameIsBeforeEntryName(name, entryName) {
    let before = (name.localeCompare(entryName) < 0);

    const nameExtension = nameUtil.extensionFromName(name),
        entryNameExtension = nameUtil.extensionFromName(entryName),
        nameWithoutExtension = nameUtil.nameWithoutExtensionFromName(name),
        entryNameWithoutExtension = nameUtil.nameWithoutExtensionFromName(entryName),
        nameExtensionPresent = (nameExtension !== null),
        entryNameExtensionPresent = (entryNameExtension !== null),
        nameWithoutExtensionMissing = (nameWithoutExtension === null),
        entryNameWithoutExtensionMissing = (entryNameWithoutExtension === null),
        extensionsBothPresent = (nameExtensionPresent && entryNameExtensionPresent),
        namesWithoutExtensionsBothMissing = (nameWithoutExtensionMissing && entryNameWithoutExtensionMissing);

    if (namesWithoutExtensionsBothMissing) {
      ///
    } else if (nameWithoutExtensionMissing) {
      before = true;
    } else if (entryNameWithoutExtensionMissing) {
      before = false;
    } else {
      if (extensionsBothPresent) {
        const extensionsDiffer = (nameExtension !== entryNameExtension);

        if (extensionsDiffer) {
          before = (nameExtension.localeCompare(entryNameExtension) < 0);
        }
      } else if (nameExtensionPresent) {
        before = false;
      } else if (entryNameExtensionPresent) {
        before = true;
      }
    }

    return before;
  }
}

module.exports = nameUtil;
