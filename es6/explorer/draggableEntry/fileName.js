'use strict';

const Entry = require('../entry'),
      nameUtil = require('../../util/name'),
      DraggableEntry = require('../draggableEntry');

class FileNameDraggableEntry extends DraggableEntry {
  constructor(selector, name, explorer) {
    const type = Entry.types.FILE_NAME;

    super(selector, name, explorer, type);
    
    this.onDoubleClick(this.doubleClickHandler.bind(this));
  }

  isDirectoryNameDraggableEntry() {
    return false;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case Entry.types.MARKER:
      case Entry.types.FILE_NAME:
        const name = this.getName(),
              entryName = entry.getName();
          
        before = nameIsBeforeEntryName(name, entryName);
        break;

      case Entry.types.DIRECTORY_NAME:
        before = false;          
        break;
    }
    
    return before;
  }

  isRecognised() {
    const recognised = this.hasClass('recognised');

    return recognised;
  }

  retrieveSubEntries() {
    const subEntries = [];  ///
    
    return subEntries;
  }
  
  setRecognised(recognised) {
    recognised ?
      this.recognise() :
        this.overlook();
  }

  recognise() {
    this.addClass('recognised');
  }

  overlook() {
    this.removeClass('recognised');
  }

  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFileNameDraggableEntry(file);
  }

  static fromProperties(Class, properties) {
    if (arguments.length === 1) {
      properties = Class;
      Class = FileNameDraggableEntry;
    }

    const { name, explorer, recognised, hidden } = properties,
          fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, name, explorer);

    fileNameDraggableEntry.setHidden(hidden);

    fileNameDraggableEntry.setRecognised(recognised);

    return fileNameDraggableEntry;
  }
}

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  },
  ignoredProperties: [
    'name',
    'explorer',
    'recognised',
    'hidden'
  ]
});

module.exports = FileNameDraggableEntry;

function nameIsBeforeEntryName(name, entryName) {
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