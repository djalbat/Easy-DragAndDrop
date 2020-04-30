"use strict";

import { InputElement } from "easy";
import { arrayUtilities } from "necessary";

const { first } = arrayUtilities;

export default class NameButton extends InputElement {
  getName() {
    const childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

    return name;
  }

  onDoubleClick(handler) {
    this.on("dblclick", handler);
  }
  
  parentContext() {
	  const getName = this.getName.bind(this),
				  onDoubleClick = this.onDoubleClick.bind(this);

    return ({
      getName,
      onDoubleClick
    });
  }
}

Object.assign(NameButton, {
  tagName: "button",
  defaultProperties: {
    className: "name"
  },
  ignoredProperties: [
    "name"
  ]
});
