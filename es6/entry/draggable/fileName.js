'use strict';

const easy = require('easy');

const NameButton = require('../../nameButton'),
      entryTypes = require('../../entryTypes'),
      nameUtilities = require('../../utilities/name'),
      DraggableEntry = require('../../entry/draggable');

const { React } = easy,
      { nameIsBeforeEntryName } = nameUtilities,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = entryTypes;

class FileNameDraggableEntry extends DraggableEntry {
  constructor(selector) {
    const type = FILE_NAME_TYPE;

    super(selector, type);
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

  static fromProperties(properties) {
    const fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties);

    fileNameDraggableEntry.initialise();

    return fileNameDraggableEntry;
  }
}

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'file-name'
  }
});

module.exports = FileNameDraggableEntry;
