'use strict';

const entryTypes = require('../../entryTypes'),
      MarkerEntry = require('../../entry/marker'),
      nameUtilities = require('../../utilities/name');

const { nameIsBeforeEntryName } = nameUtilities,
      { FILE_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_TYPE } = entryTypes;

class FileNameMarkerEntry extends MarkerEntry {
  isBefore(draggableEntry) {
    let before;

    const draggableEntryType = draggableEntry.getType();

    switch (draggableEntryType) {
      case FILE_NAME_TYPE:
        const name = this.getName(),
              draggableEntryName = draggableEntry.getName();

        before = nameIsBeforeEntryName(name, draggableEntryName);
        break;

      case DIRECTORY_NAME_TYPE:
        before = false;
        break;
    }

    return before;
  }
  
  static fromProperties(properties) {
    const type = FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = MarkerEntry.fromProperties(FileNameMarkerEntry, properties, type);

    return fileNameMarkerEntry;
  }
}

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: 'file-name'
  }
});

module.exports = FileNameMarkerEntry;
