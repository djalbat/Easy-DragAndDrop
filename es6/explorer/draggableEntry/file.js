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
  let before;
  
  const nameExtension = nameUtil.extensionFromName(name),
        entryNameExtension = nameUtil.extensionFromName(entryName),
        nameExtensionPresent = (nameExtension !== null),
        entryNameExtensionPresent = (entryNameExtension !== null),
        extensionsBothPresent = (nameExtensionPresent && entryNameExtensionPresent);

  if (extensionsBothPresent) {
    const extensionsEqual = (nameExtension === entryNameExtension);

    if (extensionsEqual) {
      before = (name.localeCompare(entryName) < 0);
    } else {
      before = (nameExtension.localeCompare(entryNameExtension) < 0);
    }
  } else if (nameExtensionPresent) {
    before = false;
  } else if (entryNameExtensionPresent) {
    before = true;
  } else {
    before = (name.localeCompare(entryName) < 0);
  }

  return before;
}