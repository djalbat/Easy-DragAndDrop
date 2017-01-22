'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry');

class File extends DraggableEntry {
  constructor(selector, name, explorer) {
    var type = Entry.types.FILE;

    super(selector, name, explorer, type);

    this.onDoubleClick(this.doubleClickHandler.bind(this));
  }

  isDirectory() {
    return false;
  }

  isBefore(entry) {
    var before,
        entryType = entry.getType();

    switch (entryType) {
      case Entry.types.FILE:
      case Entry.types.MARKER:

        var name = this.getName(),
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
    var subEntries = [];  ///
    
    return subEntries;
  }
  
  doubleClickHandler() {
    var explorer = this.getExplorer(),
        file = this; ///
    
    explorer.openFile(file);
  }

  static clone(name, explorer) {
    var file = Element.clone(File, '#file', name, explorer);

    file.removeAttribute('id');

    return file;
  }
}

module.exports = File;
