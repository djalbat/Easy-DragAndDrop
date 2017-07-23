'use strict';

const easy = require('easy');

const NameButton = require('./nameButton');

const { Element, React } = easy;

class Entry extends Element {
  constructor(selector, name, type) {
    super(selector);

    this.nameButton = <NameButton>{name}</NameButton>;

    this.type = type;
  }

  getName() { return this.nameButton.getName(); }

  getType() {
    return this.type;
  }

  initialise() {
    this.append(this.nameButton);
  }
  
  static fromProperties(Class, properties) {
    const { name } = properties,
          entry = Element.fromProperties(Class, properties, name);

    entry.initialise();
    
    return entry;
  }
}

Object.assign(Entry, {
  tagName: 'li',
  ignoredProperties: [
    'name'
  ],
  types: {
    MARKER: 'MARKER',
    FILE_NAME: 'FILE_NAME',
    DIRECTORY_NAME: 'DIRECTORY_NAME'
  }
});

module.exports = Entry;
