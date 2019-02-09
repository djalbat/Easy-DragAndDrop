'use strict';

const entryTypes = require('../../../entryTypes'),
      DraggableEntry = require('../../entry/draggable'),
      nameUtilities = require('../../../utilities/name');

const { nameIsBeforeEntryName } = nameUtilities,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = entryTypes;

class FileNameDraggableEntry extends DraggableEntry {
  constructor(selector, explorer) {
    const type = FILE_NAME_TYPE;

    super(selector, type, explorer);
  }

  isFileNameDraggableEntry() {
    return true;
  }

  isDirectoryNameDraggableEntry() {
    return false;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case FILE_NAME_TYPE:
      case FILE_NAME_MARKER_TYPE:
      case DIRECTORY_NAME_MARKER_TYPE:
        const name = this.getName(),
              entryName = entry.getName();
          
        before = nameIsBeforeEntryName(name, entryName);
        break;

      case DIRECTORY_NAME_TYPE:
        before = false;          
        break;
    }
    
    return before;
  }

  retrieveSubEntries() {
    const subEntries = [];  ///
    
    return subEntries;
  }
  
  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFileNameDraggableEntry(file);
  }
  
  static fromProperties(properties) {
    const fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties);

    fileNameDraggableEntry.initialise();

    return fileNameDraggableEntry;
  }
}

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'file-name'
  }
});

module.exports = FileNameDraggableEntry;
