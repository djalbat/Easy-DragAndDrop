'use strict';

const Entry = require('../entry'),
      nameUtil = require('../../util/name'),
      DraggableEntry = require('../draggableEntry');

class File extends DraggableEntry {
  constructor(selector, name, explorer) {
    const type = Entry.types.FILE;

    super(selector, name, explorer, type);

    this.onDoubleClick(this.doubleClickHandler.bind(this));
  }

  isDirectory() {
    return false;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case Entry.types.FILE:
      case Entry.types.MARKER:
        const name = this.getName(),
              entryName = entry.getName();
          
        before = nameIsBeforeEntryName(name, entryName);
        break;

      case Entry.types.DIRECTORY:
        before = false;          
        break;
    }
    
    return before;
  }

  getSubEntries() {
    const subEntries = [];  ///
    
    return subEntries;
  }
  
  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFile(file);
  }
  
  static fromProperties(properties) {
    const { name, explorer } = properties;
    
    return DraggableEntry.fromProperties(File, properties, name, explorer);
  }
}

Object.assign(File, {
  defaultProperties: {
    className: 'file'
  },
  ignoredProperties: [
    'name',
    'explorer'
  ]
});

module.exports = File;

function nameIsBeforeEntryName(name, entryName) {
  let before = (name.localeCompare(entryName) < 0);
  
  const nameExtension = nameUtil.extensionFromName(name),
        entryNameExtension = nameUtil.extensionFromName(entryName),
        nameWithoutExtension = nameUtil.nameWithoutExtensionFromName(name),
        entryNameWithoutExtension = nameUTil.nameWithoutExtensionFromName(entryName),
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