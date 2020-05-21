"use strict";

import withStyle from "easy-with-style";  ///

import { Element } from "easy";

class Entry extends Element {
  constructor(selectorOrDOMElement, type) {
    super(selectorOrDOMElement);

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
  list-style-type: none;

`;
