'use strict';

const nameUtil = require('../../../util/name'),
      Entry = require('../../entry'),
      MarkerEntry = require('../../entry/marker');

class FileNameMarkerEntry extends MarkerEntry {
  isBefore(draggableEntry) {
    let before;

    const draggableEntryType = draggableEntry.getType();

    switch (draggableEntryType) {
      case Entry.types.FILE_NAME:
        const name = this.getName(),
            draggableEntryName = draggableEntry.getName();

        before = nameUtil.nameIsBeforeEntryName(name, draggableEntryName);
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
