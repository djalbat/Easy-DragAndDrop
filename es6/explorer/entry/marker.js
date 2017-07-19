'use strict';

const Entry = require('../entry');

class MarkerEntry extends Entry {
  constructor(selector, name) {
    const type = Entry.types.MARKER;

    super(selector, name, type);
  }

  static fromProperties(Class, properties) { return Entry.fromProperties(Class, properties); }
}

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: 'marker'
  }
});

module.exports = MarkerEntry;
