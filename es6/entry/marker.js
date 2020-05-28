"use strict";

import withStyle from "easy-with-style";  ///

import Entry from "../entry";

class MarkerEntry extends Entry {
  constructor(selectorOrDOMElement, type, name) {
    super(selectorOrDOMElement, type);

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

export default withStyle(MarkerEntry)`

  width: 4rem;
  height: 2.4rem;
  background-image: url("css/image/marker.png");
  background-repeat: no-repeat;
  background-position: 1.8rem 1rem;

`;
