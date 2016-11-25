'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry');

class DirectoryMarker extends Entry {
  constructor(selector, name) {
    var type = Entry.types.MARKER;

    super(selector, name, type);
  }

  isBefore(entry) {
    var name = this.getName(),
        entryName = entry.getName(),
        entryType = entry.getType(),
        before = entryType === Entry.types.FILE ? true : (name.localeCompare(entryName) < 0);

    return before;
  }

  static clone(name) {
    var directoryMarker = Element.clone(DirectoryMarker, '#marker', name);

    directoryMarker.removeAttribute('id');

    return directoryMarker;
  }
}

module.exports = DirectoryMarker;
