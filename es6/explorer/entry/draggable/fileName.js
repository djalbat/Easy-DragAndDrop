'use strict';

const Entry = require('../../entry'),
      DraggableEntry = require('../../entry/draggable'),
      nameUtilities = require('../../../utilities/name');

const { types } = Entry,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = types;

class FileNameDraggableEntry extends DraggableEntry {
  constructor(selector, name, explorer) {
    const type = FILE_NAME_TYPE;

    super(selector, name, explorer, type);
  }

  isDirectoryNameDraggableEntry() {
    return false;
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
          
        before = nameUtilities.nameIsBeforeEntryName(name, entryName);
        break;

      case DIRECTORY_NAME_TYPE:
        before = false;          
        break;
    }
    
    return before;
  }

  retrieveSubEntries() {
    const subEntries = [];  ///
    
    return subEntries;
  }
  
  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFileNameDraggableEntry(file);
  }
  
  initialise()  {
    super.initialise();
    
    const doubleClickHandler = this.doubleClickHandler.bind(this);

    this.onDoubleClick(doubleClickHandler);
  }

  static fromProperties(Class, properties) {
    if (arguments.length === 1) {
      properties = Class;
      Class = FileNameDraggableEntry;
    }

    const fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);

    fileNameDraggableEntry.initialise();

    return fileNameDraggableEntry;
  }
}

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  }
});

module.exports = FileNameDraggableEntry;
