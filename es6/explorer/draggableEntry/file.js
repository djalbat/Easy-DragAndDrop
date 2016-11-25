'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry'),
    ActivateFileEvent = require('../activateFileEvent');

class File extends DraggableEntry {
  constructor(selector, name, readOnly, dragEventHandler, activateFileEventHandler) {
    var type = Entry.types.FILE;

    super(selector, name, type, dragEventHandler);
    
    this.activateFileEventHandler = activateFileEventHandler;

    this.readOnly = !!readOnly;

    this.onDoubleClick(this.doubleClickHandler.bind(this));

    this.update();
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

  getReadOnly() {
    return this.readOnly;
  }
  
  getSubEntries() {
    var subEntries = [];  ///
    
    return subEntries;
  }

  update() {
    this.readOnly ? 
      this.addClass('readOnly') : 
        this.removeClass('readOnly');
  }
  
  doubleClickHandler() {
    var file = this,
        activateFileEvent = new ActivateFileEvent(file);

    this.activateFileEventHandler(activateFileEvent);
  }

  static clone(name, readOnly, dragEventHandler, activateFileEventHandler) {
    var file = Element.clone(File, '#file', name, readOnly, dragEventHandler, activateFileEventHandler);

    file.removeAttribute('id');

    return file;
  }
}

module.exports = File;
