'use strict';

const easyui = require('easyui'),
      Element = easyui.Element;

const Entry = require('../entry');

class DirectoryMarker extends Entry {
  constructor(selector, name) {
    const type = Entry.types.MARKER;

    super(selector, name, type);
  }

  isBefore(entry) {
    const name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = (entryType === Entry.types.FILE) ? 
                     true : 
                       (name.localeCompare(entryName) < 0);

    return before;
  }

  static clone(name) {
    let directoryMarker = new DirectoryMarker('#marker', name);

    directoryMarker = Element.clone(DirectoryMarker, directoryMarker, name);

    directoryMarker.removeAttribute('id');

    return directoryMarker;
  }
}

module.exports = DirectoryMarker;
