'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const { InputElement } = easy,
      { arrayUtilities } = necessary,
      { first } = arrayUtilities;

class NameButton extends InputElement {
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
