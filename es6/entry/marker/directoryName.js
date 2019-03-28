'use strict';

const entryTypes = require('../../entryTypes'),
      MarkerEntry = require('../../entry/marker');

const { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, DIRECTORY_NAME_MARKER_TYPE } = entryTypes;

class DirectoryNameMarkerEntry extends MarkerEntry {
  constructor(selector, name) {
    const type = DIRECTORY_NAME_MARKER_TYPE;
    
    super(selector, type, name);
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
  
  static fromProperties(properties) { return MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties); }
}

Object.assign(DirectoryNameMarkerEntry, {
  defaultProperties: {
    className: 'directory-name'
  }
});

module.exports = DirectoryNameMarkerEntry;
