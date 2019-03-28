'use strict';

const Entry = require('../entry');

class MarkerEntry extends Entry {
  constructor(selector, type, name) {
    super(selector, type);

    this.name = name;
  }

  getName() {
    return this.name;
  }

  static fromProperties(Class, properties) {
    const { name } = properties,
          markerEntry = Entry.fromProperties(Class, properties, name);

    return markerEntry;
  }
}

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: 'marker'
  }
});

module.exports = MarkerEntry;
