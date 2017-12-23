'use strict';

const easy = require('easy');

const { Element, React } = easy;

class Entry extends Element {
  constructor(selector, type) {
    super(selector);

    this.type = type;
  }

  getType() {
    return this.type;
  }

  static fromProperties(Class, properties, ...remainingArguments) { return Element.fromProperties(Class, properties, ...remainingArguments); }
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
