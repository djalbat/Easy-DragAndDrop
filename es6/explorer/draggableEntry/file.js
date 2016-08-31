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

    this.readOnly = !!readOnly;

    this.onDoubleClick(function() {
      var file = this,
          activateFileEvent = new ActivateFileEvent(file);

      activateFileEventHandler(activateFileEvent);
    }.bind(this));

    this.update();
  }

  isDirectory() {
    return false;
  }

  isBefore(entry) {
    var entryType = entry.getType();

    switch (entryType) {
      case Entry.types.FILE:
      case Entry.types.MARKER:

        var name = this.getName(),
            entryName = entry.getName(),
            before = name.localeCompare(entryName) < 0;

        return before;

      case Entry.types.DIRECTORY:

        return false;
    }
  }

  getReadOnly() {
    return this.readOnly;
  }
  
  getSubEntries() {
    var subEntries = [];
    
    return subEntries;
  }

  update() {
    this.readOnly ? this.addClass('readOnly') : this.removeClass('readOnly');
  }
}

File.clone = function(name, readOnly, dragEventHandler, activateFileEventHandler) {
  var file = Element.clone(File, '#file', name, readOnly, dragEventHandler, activateFileEventHandler);

  file.removeAttribute('id');

  return file;
};

module.exports = File;
