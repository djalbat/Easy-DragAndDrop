"use strict";

const easy = require("easy"),
      necessary = require("necessary");

const { InputElement } = easy,
      { arrayUtilities } = necessary,
      { first } = arrayUtilities;

class NameButton extends InputElement {
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
  
  static fromProperties(properties) { return InputElement.fromProperties(NameButton, properties); }
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

module.exports = NameButton;
