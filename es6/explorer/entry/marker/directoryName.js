'use strict';

const Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker');

const { types } = Entry,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, DIRECTORY_NAME_MARKER_TYPE } = types;

class DirectoryNameMarkerEntry extends MarkerEntry {
  constructor(selector, name) {
    const type = DIRECTORY_NAME_MARKER_TYPE;
    
    super(selector, name, type);
  }
  
  isBefore(draggableEntry) {
    let before;

    const draggableEntryType = draggableEntry.getType();

    switch (draggableEntryType) {
      case FILE_NAME_TYPE:
        before = true;

        break;

      case DIRECTORY_NAME_TYPE:
        const name = this.getName(),
              draggableEntryName = draggableEntry.getName();

        before = (name.localeCompare(draggableEntryName) < 0);

        break;
    }

    return before;
  }
  
  static fromProperties(properties) { 
    const draggableNameMarkerEntry = MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties);

    draggableNameMarkerEntry.initialise();
    
    return draggableNameMarkerEntry;
  }
}

module.exports = DirectoryNameMarkerEntry;
