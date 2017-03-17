'use strict';

const Entry = require('../entry');

class Marker extends Entry {
  constructor(selector, name) {
    const type = Entry.types.MARKER;

    super(selector, name, type);
  }

  static fromProperties(Class, properties) {
    return Entry.fromProperties(Class, properties);
  }
}

module.exports = Marker;