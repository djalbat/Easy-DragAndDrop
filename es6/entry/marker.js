"use strict";

import withStyle from "easy-with-style";  ///

import Entry from "../entry";

class MarkerEntry extends Entry {
  getName() {
    const { name } = this.properties;

    return name;
  }

  static defaultProperties = {
    className: "marker"
  };
}

export default withStyle(MarkerEntry)`

  width: 4rem;
  height: 2.4rem;
  background-image: url("css/image/marker.png");
  background-repeat: no-repeat;
  background-position: 1.8rem 1rem;

`;
