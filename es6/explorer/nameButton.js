'use strict';

const easy = require('easy'),
      InputElement = easy.InputElement;

class NameButton extends InputElement {
  constructor(selector, doubleClickHandler) {
    super(selector);

    if (doubleClickHandler) {
      this.onDoubleClick(doubleClickHandler);
    }
  }

  getName() {
    const childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          text = firstChildElement.getText(),
          name = text; ///

    return name;
  }

  setName(name) {
    const text = name, ///
          childElements = this.getChildElements(),
          firstChildElement = first(childElements);

    firstChildElement.setText(text);
  }
  
  onDoubleClick(handler) {
    this.on('dblclick', handler);
  }
  
  static fromProperties(properties) {
    const { onDoubleClick } = properties,
          doubleClickHandler = onDoubleClick; ///
    
    return InputElement.fromProperties(NameButton, properties, doubleClickHandler);
  }
}

Object.assign(NameButton, {
  tagName: 'button',
  ignoredAttributes: [
    'name',
    'onDoubleClick'
  ]
});

module.exports = NameButton;

function first(array) { return array[0]; }
