'use strict';

const Entry = require('../entry');

class MarkerEntry extends Entry {
  static fromProperties(Class, properties) { return Entry.fromProperties(Class, properties); }
}

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: 'marker'
  }
});

module.exports = MarkerEntry;
