"use strict";

import MarkerEntry from "../../entry/marker";

import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "../../types";

export default class DirectoryNameMarkerEntry extends MarkerEntry {
  type = DIRECTORY_NAME_MARKER_TYPE;

  isBefore(dragEntry) {
    let before;

    const dragEntryType = dragEntry.getType();

    switch (dragEntryType) {
      case FILE_NAME_TYPE:
        before = true;

        break;

      case DIRECTORY_NAME_TYPE:
        const name = this.getName(),
              dragEntryName = dragEntry.getName();

        before = (name.localeCompare(dragEntryName) < 0);

        break;
    }

    return before;
  }

  static defaultProperties = {
    className: "directory-name"
  };

  static fromClass(Class, properties) {
    const type = DIRECTORY_NAME_MARKER_TYPE,  ///
          directoryNameMarkerEntry = MarkerEntry.fromClass(Class, properties, type);

    return directoryNameMarkerEntry;
  }
}
