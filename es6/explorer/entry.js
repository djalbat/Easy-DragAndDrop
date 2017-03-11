'use strict';

const easyui = require('easyui'),
      Element = easyui.Element;

const NameButton = require('./nameButton');

class Entry extends Element {
  constructor(selector, name, type) {
    super(selector);

    this.nameButton = NameButton.fromParentElement(this, name);

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
