"use strict";

import Entry from "../entry";

export default class MarkerEntry extends Entry {
  constructor(selector, type, name) {
    super(selector, type);

    this.name = name;
  }

  getName() {
    return this.name;
  }

  static defaultProperties = {
    className: "marker"
  };

  static fromClass(Class, properties, type) {
    const { name } = properties,
          markerEntry = Entry.fromClass(Class, properties, type, name);

    return markerEntry;
  }
}
