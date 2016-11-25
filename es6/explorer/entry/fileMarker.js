'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry');

class FileMarker extends Entry {
  constructor(selector, name) {
    var type = Entry.types.MARKER;

    super(selector, name, type);
  }

  isBefore(entry) {
    var name = this.getName(),
        entryName = entry.getName(),
        entryType = entry.getType(),
        before = entryType === Entry.types.DIRECTORY ? false : (name.localeCompare(entryName) < 0);

    return before;
  }

  static clone(name) {
    var fileMarker = Element.clone(FileMarker, '#marker', name);

    fileMarker.removeAttribute('id');

    return fileMarker;
  }
}

module.exports = FileMarker;
