"use strict";

import NameButton from "../../button/name";
import DraggableEntry from "../../entry/draggable";

import { nameIsBeforeEntryName } from "../../utilities/name";
import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "../../types";

export default class FileNameDraggableEntry extends DraggableEntry {
  constructor(selector, type, explorer) {
    super(selector, type);

    this.explorer = explorer;
  }

  getExplorer() {
    return this.explorer;
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

  isFileNameDraggableEntry() {
    return true;
  }

  isDirectoryNameDraggableEntry() {
    return false;
  }

  retrieveDraggableSubEntries() {
    const draggableSubEntries = [];  ///
    
    return draggableSubEntries;
  }
  
  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFileNameDraggableEntry(file);
  }

  childElements(properties) {
    const { name } = properties;

    return ([

      <NameButton>{name}</NameButton>

    ]);
  }

  static fromClass(Class, properties) {
    const { explorer } = properties,
          type = FILE_NAME_TYPE,  ///
          fileNameDraggableEntry = DraggableEntry.fromClass(Class, properties, type, explorer);

    fileNameDraggableEntry.initialise(properties);

    return fileNameDraggableEntry;
  }

  static defaultProperties = {
    className: "file-name"
  };
}
