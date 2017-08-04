'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const { array } = necessary,
      { InputElement } = easy;

class NameButton extends InputElement {
  getName() {
    const childElements = this.getChildElements(),
          firstChildElement = array.first(childElements),
          text = firstChildElement.getText(),
          name = text; ///

    return name;
  }

  setName(name) {
    const text = name, ///
          childElements = this.getChildElements(),
          firstChildElement = array.first(childElements);

    firstChildElement.setText(text);
  }
  
  onDoubleClick(handler) {
    this.on('dblclick', handler);
  }
  
  static fromProperties(properties) { return InputElement.fromProperties(NameButton, properties); }
}

Object.assign(NameButton, {
  tagName: 'button',
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: [
    'name'
  ]
});

module.exports = NameButton;
