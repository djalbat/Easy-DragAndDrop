"use strict";

const Entry = require("../entry");

class MarkerEntry extends Entry {
  constructor(selector, type, name) {
    super(selector, type);

    this.name = name;
  }

  getName() {
    return this.name;
  }

  static fromClass(Class, properties, type) {
    const { name } = properties,
          markerEntry = Entry.fromClass(Class, properties, type, name);

    return markerEntry;
  }
}

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: "marker"
  }
});

module.exports = MarkerEntry;
