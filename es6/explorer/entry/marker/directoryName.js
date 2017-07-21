'use strict';

const Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker');

class DirectoryNameMarkerEntry extends MarkerEntry {
  isBefore(draggableEntry) {
    let before;

    const draggableEntryType = draggableEntry.getType();

    switch (draggableEntryType) {
      case Entry.types.FILE_NAME:
        before = true;

        break;

      case Entry.types.DIRECTORY_NAME:
        const name = this.getName(),
              draggableEntryName = draggableEntry.getName();

        before = (name.localeCompare(draggableEntryName) < 0);

        break;
    }

    return before;
  }
  
  static fromProperties(properties) { return MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties); }
}

module.exports = DirectoryNameMarkerEntry;
