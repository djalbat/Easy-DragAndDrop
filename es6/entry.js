"use strict";

import { Element } from "easy";

export default class Entry extends Element {
  constructor(selector, type) {
    super(selector);

    this.type = type;
  }

  getType() {
    return this.type;
  }
}

Object.assign(Entry, {
  tagName: "li",
  defaultProperties: {
    className: "entry"
  },
  ignoredProperties: [
    "name"
  ]
});
