'use strict';

const easy = require('easy'),
      Element = easy.Element,
      React = easy.React;

const NameButton = require('./nameButton');

class Entry extends Element {
  constructor(selector, name, type) {
    super(selector);

    const nameButton = <NameButton className="name">{name}</NameButton>;

    this.type = type;

    this.nameButton = nameButton;

    this.append(nameButton);
  }

  getName() { return this.nameButton.getName(); }

  getType() {
    return this.type;
  }
  
  fromProperties(Class, properties) {
    const { name } = properties;
    
    return Element.fromProperties(Class, properties, name);
  }
}

Object.assign(Entry, {
  tagName: 'li',
  ignoredAttributes: [
    'name'
  ],
  types: {
    FILE: 'FILE',
    MARKER: 'MARKER',
    DIRECTORY: 'DIRECTORY'
  }
});

module.exports = Entry;
