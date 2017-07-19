'use strict';

const Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker');

class DirectoryNameMarkerEntry extends MarkerEntry {
  isBefore(draggableEntry) {
    const name = this.getName(),
          draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          before = (draggableEntryType === Entry.types.FILE_NAME) ?
                     true :
                       (name.localeCompare(draggableEntryName) < 0);

    return before;
  }
  
  static fromProperties(properties) { return MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties); }
}

module.exports = DirectoryNameMarkerEntry;
