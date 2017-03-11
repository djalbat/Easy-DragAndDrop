'use strict';

const easyui = require('easyui'),
      Element = easyui.Element;

const Entry = require('../entry');

class FileMarker extends Entry {
  constructor(selector, name) {
    const type = Entry.types.MARKER;

    super(selector, name, type);
  }

  isBefore(entry) {
    const name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = (entryType === Entry.types.DIRECTORY) ? 
                     false : 
                       (name.localeCompare(entryName) < 0);

    return before;
  }

  static clone(name) {
    let fileMarker = new FileMarker('#marker', name);

    fileMarker = Element.clone(FileMarker, fileMarker, name);

    fileMarker.removeAttribute('id');

    return fileMarker;
  }
}

module.exports = FileMarker;
