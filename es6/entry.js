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

  static tagName = "li";

  static defaultProperties = {
    className: "entry"
  };

  static ignoredProperties = [
    "name"
  ];
}
