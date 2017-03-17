'use strict';

const Entry = require('../entry'),
      DraggableEntry = require('../draggableEntry');

class File extends DraggableEntry {
  constructor(selector, name, explorer) {
    const type = Entry.types.FILE;

    super(selector, name, explorer, type);

    this.onDoubleClick(this.doubleClickHandler.bind(this));
  }

  isDirectory() {
    return false;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case Entry.types.FILE:
      case Entry.types.MARKER:

        const name = this.getName(),
              entryName = entry.getName();
          
        before = name.localeCompare(entryName) < 0;      
        break;

      case Entry.types.DIRECTORY:
        before = false;          
        break;
    }
    
    return before;
  }

  getSubEntries() {
    const subEntries = [];  ///
    
    return subEntries;
  }
  
  doubleClickHandler() {
    const explorer = this.getExplorer(),
          file = this; ///
    
    explorer.openFile(file);
  }
  
  static fromProperties(properties) {
    const { name, explorer } = properties;
    
    return DraggableEntry.fromProperties(File, properties, name, explorer);
  }
}

Object.assign(File, {
  ignoredAttributes: [
    'name',
    'explorer'
  ]
});

module.exports = File;
