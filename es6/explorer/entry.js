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
  
  static fromProperties(Class, properties, ...remainingArguments) {
    const { name } = properties,
          entry = Element.fromProperties(Class, properties, name, ...remainingArguments);
    
    return entry;
  }
}

Object.assign(Entry, {
  tagName: 'li',
  defaultProperties: {
    className: 'entry'
  },
  ignoredProperties: [
    'name'
  ],
  types: {
    FILE_NAME_TYPE: 'FILE_NAME_TYPE',
    DIRECTORY_NAME_TYPE: 'DIRECTORY_NAME_TYPE',
    FILE_NAME_MARKER_TYPE: 'FILE_NAME_MARKER_TYPE',
    DIRECTORY_NAME_MARKER_TYPE: 'DIRECTORY_NAME_MARKER_TYPE'
  }
});

module.exports = Entry;
