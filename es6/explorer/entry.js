'use strict';

const easy = require('easy');

const NameButton = require('./nameButton');

const { Element, React } = easy;

class Entry extends Element {
  constructor(selector, name, type) {
    super(selector);

    const nameButton = <NameButton>{name}</NameButton>;

    this.type = type;

    this.nameButton = nameButton;

    this.append(nameButton);
  }

  getName() { return this.nameButton.getName(); }

  getType() {
    return this.type;
  }
  
  static fromProperties(Class, properties) {
    const { name } = properties;
    
    return Element.fromProperties(Class, properties, name);
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
