'use strict';

const Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker');

class FileNameMarkerEntry extends MarkerEntry {
  isBefore(draggableEntry) {
    const name = this.getName(),
          draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          before = (draggableEntryType === Entry.types.DIRECTORY_NAME) ? 
                     false : 
                       (name.localeCompare(draggableEntryName) < 0);

    return before;
  }
  
  static fromProperties(properties) { return MarkerEntry.fromProperties(FileNameMarkerEntry, properties); }
}

module.exports = FileNameMarkerEntry;
