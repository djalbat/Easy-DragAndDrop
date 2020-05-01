"use strict";

import withStyle from "easy-with-style";  ///

import { Element } from "easy";

class Entry extends Element {
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

export default withStyle(Entry)`

  width: auto;
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 0;
  list-style-type: none;

`;
