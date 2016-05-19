'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var NameButton = require('./nameButton');

class Entry extends Element {
  constructor(selector, name, type) {
    super(selector);

    this.nameButton = new NameButton(this, name);

    this.type = type;
  }

  getName() { return this.nameButton.getName(); }

  getType() {
    return this.type;
  }
}

Entry.types = {
  FILE: 'FILE',
  MARKER: 'MARKER',
  DIRECTORY: 'DIRECTORY'
};

module.exports = Entry;
