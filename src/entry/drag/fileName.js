"use strict";

import DragEntry from "../../entry/drag";
import FileNameButton from "../../button/name/file";

import { nameIsBeforeEntryName } from "../../utilities/name";
import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "../../types";

export default class FileNameDragEntry extends DragEntry {
  type = FILE_NAME_TYPE;  ///

  getFileNameButton() {
    const { FileNameButton } = this.constructor;

    return FileNameButton;
  }

  isBefore(entry) {
    let before;

    const entryType = entry.getType();

    switch (entryType) {
      case FILE_NAME_TYPE:
      case FILE_NAME_MARKER_TYPE:
      case DIRECTORY_NAME_MARKER_TYPE:
        const name = this.getName(),
              entryName = entry.getName();

        before = nameIsBeforeEntryName(name, entryName);
        break;

      case DIRECTORY_NAME_TYPE:
        before = false;
        break;
    }

    return before;
  }

  isFileNameDragEntry() {
    return true;
  }

  isDirectoryNameDragEntry() {
    return false;
  }

  retrieveDragSubEntries() {
    const dragSubEntries = [];  ///
    
    return dragSubEntries;
  }
  
  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFileNameDragEntry(file);
  }

  childElements() {
    const { name } = this.properties,
          fileName= name, ///
          FileNameButton = this.getFileNameButton();

    return ([

      <FileNameButton>{fileName}</FileNameButton>

    ]);
  }

  static FileNameButton = FileNameButton;

  static defaultProperties = {
    className: "file-name"
  };
}
