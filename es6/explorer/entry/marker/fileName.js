'use strict';

const Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker'),
      nameUtilities = require('../../../utilities/name');

const { types } = Entry,
      { FILE_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_TYPE } = types;

class FileNameMarkerEntry extends MarkerEntry {
  constructor(selector, name) {
    const type = FILE_NAME_MARKER_TYPE;

    super(selector, name, type);
  }

  isBefore(draggableEntry) {
    let before;

    const draggableEntryType = draggableEntry.getType();

    switch (draggableEntryType) {
      case FILE_NAME_TYPE:
        const name = this.getName(),
              draggableEntryName = draggableEntry.getName();

        before = nameUtilities.nameIsBeforeEntryName(name, draggableEntryName);
        break;

      case DIRECTORY_NAME_TYPE:
        before = false;
        break;
    }

    return before;
  }
  
  static fromProperties(properties) { 
    const fileNameMarkerEntry = MarkerEntry.fromProperties(FileNameMarkerEntry, properties);

    fileNameMarkerEntry.initialise();
    
    return fileNameMarkerEntry;
  }
}

module.exports = FileNameMarkerEntry;
