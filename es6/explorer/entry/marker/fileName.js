'use strict';

const Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker'),
      nameUtilities = require('../../../utilities/name');

class FileNameMarkerEntry extends MarkerEntry {
  isBefore(draggableEntry) {
    let before;

    const draggableEntryType = draggableEntry.getType();

    switch (draggableEntryType) {
      case Entry.types.FILE_NAME:
        const name = this.getName(),
              draggableEntryName = draggableEntry.getName();

        before = nameUtilities.nameIsBeforeEntryName(name, draggableEntryName);
        break;

      case Entry.types.DIRECTORY_NAME:
        before = false;
        break;
    }

    return before;
  }
  
  static fromProperties(properties) { return MarkerEntry.fromProperties(FileNameMarkerEntry, properties); }
}

module.exports = FileNameMarkerEntry;
