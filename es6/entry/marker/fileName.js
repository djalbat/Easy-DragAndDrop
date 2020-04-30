"use strict";

import MarkerEntry from "../../entry/marker";

import { nameIsBeforeEntryName } from "../../utilities/name";
import { FILE_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_TYPE } from "../../types";

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
  
  static fromClass(Class, properties) {
    const type = FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = MarkerEntry.fromClass(Class, properties, type);

    return fileNameMarkerEntry;
  }
}

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: "file-name"
  }
});

module.exports = FileNameMarkerEntry;
