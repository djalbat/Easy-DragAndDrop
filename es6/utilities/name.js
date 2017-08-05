'use strict';

const necessary = require('necessary');

const { array } = necessary,
      { second } = array;

class nameUtilities {
  static extensionFromName(name) {
    let extension = null;
    
    const matches = name.match(/^.*\.([^.]+)$/);

    if (matches !== null) {
      const secondMatch = second(matches);

      extension = secondMatch;  ///
    }

    return extension;
  }

  static nameWithoutExtensionFromName(name) {
    let nameWithoutExtension = null;

    const matches = name.match(/^(.+)\.[^.]+$/);

    if (matches !== null) {
      const secondMatch = second(matches);

      nameWithoutExtension = secondMatch;  ///
    }

    return nameWithoutExtension;
  }

  static nameIsBeforeEntryName(name, entryName) {
    let before = (name.localeCompare(entryName) < 0);

    const nameExtension = nameUtilities.extensionFromName(name),
          entryNameExtension = nameUtilities.extensionFromName(entryName),
          nameWithoutExtension = nameUtilities.nameWithoutExtensionFromName(name),
          entryNameWithoutExtension = nameUtilities.nameWithoutExtensionFromName(entryName),
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

module.exports = nameUtilities;
