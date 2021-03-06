"use strict";

import MarkerEntry from "../../entry/marker";

import { nameIsBeforeEntryName } from "../../utilities/name";
import { FILE_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_TYPE } from "../../types";

export default class FileNameMarkerEntry extends MarkerEntry {
  type = FILE_NAME_MARKER_TYPE;

  isBefore(dragEntry) {
    let before;

    const dragEntryType = dragEntry.getType();

    switch (dragEntryType) {
      case FILE_NAME_TYPE:
        const name = this.getName(),
              dragEntryName = dragEntry.getName();

        before = nameIsBeforeEntryName(name, dragEntryName);
        break;

      case DIRECTORY_NAME_TYPE:
        before = false;
        break;
    }

    return before;
  }

  static defaultProperties = {
    className: "file-name"
  };

  static fromClass(Class, properties) {
    const type = FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = MarkerEntry.fromClass(Class, properties, type);

    return fileNameMarkerEntry;
  }
}
