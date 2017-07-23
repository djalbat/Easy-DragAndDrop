'use strict';

const easy = require('easy');

const arrayUtil = require('../util/array');

const { InputElement } = easy;

class NameButton extends InputElement {
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
  
  initialise(doubleClickHandler) {
    this.onDoubleClick(doubleClickHandler);
  }
  
  static fromProperties(properties) {
    const { onDoubleClick } = properties,
          doubleClickHandler = onDoubleClick, ///
          nameButton = InputElement.fromProperties(NameButton, properties);
    
    nameButton.initialise(doubleClickHandler);
    
    return nameButton;
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
