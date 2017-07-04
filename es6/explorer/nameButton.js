'use strict';

const easy = require('easy');

const arrayUtil = require('../util/array');

const { InputElement } = easy;

class NameButton extends InputElement {
  constructor(selector, doubleClickHandler) {
    super(selector);

    if (doubleClickHandler) {
      this.onDoubleClick(doubleClickHandler);
    }
  }

  getName() {
    const childElements = this.getChildElements(),
          firstChildElement = arrayUtil.first(childElements),
          text = firstChildElement.getText(),
          name = text; ///

    return name;
  }

  setName(name) {
    const text = name, ///
          childElements = this.getChildElements(),
          firstChildElement = arrayUtil.first(childElements);

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
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: [
    'name',
    'onDoubleClick'
  ]
});

module.exports = NameButton;
