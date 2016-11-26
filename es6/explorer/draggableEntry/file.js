'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry'),
    ActivateFileEvent = require('../activateFileEvent');

class File extends DraggableEntry {
  constructor(selector, name, dragEventHandler, activateFileEventHandler) {
    var type = Entry.types.FILE;

    super(selector, name, type, dragEventHandler);

    this.activateFileEventHandler = activateFileEventHandler;

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
    var file = this,
        activateFileEvent = new ActivateFileEvent(file);

    this.activateFileEventHandler(activateFileEvent);
  }

  static clone(name, dragEventHandler, activateFileEventHandler) {
    var file = Element.clone(File, '#file', name, dragEventHandler, activateFileEventHandler);

    file.removeAttribute('id');

    return file;
  }
}

module.exports = File;
