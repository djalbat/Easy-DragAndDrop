'use strict';

const easyui = require('easyui'),
      Element = easyui.Element,
      React = easyui.React;

const NameButton = require('./nameButton');

class Entry extends Element {
  constructor(selector, name, type) {
    super(selector);

    this.nameButton = <NameButton name={name} className="name" />;

    this.type = type;
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
