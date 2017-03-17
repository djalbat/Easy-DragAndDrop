'use strict';

const easyui = require('easyui'),
      InputElement = easyui.InputElement;

class NameButton extends InputElement {
  constructor(selector, name, doubleClickHandler) {
    super(selector);

    this.setName(name);
    
    if (doubleClickHandler) {
      this.onDoubleClick(doubleClickHandler);
    }
  }

  getName() {
    const name = this.html(); ///

    return name;
  }

  setName(name) {
    const html = name;  ///

    this.html(html);
  }
  
  onDoubleClick(handler) {
    this.on('dblclick', handler);
  }
  
  static fromProperties(properties) {
    const { name, onDoubleClick } = properties,
          doubleClickHandler = onDoubleClick; ///
    
    return InputElement.fromProperties(NameButton, properties, name, doubleClickHandler);
  }
}

Object.assign(NameButton, {
  type: 'button',
  ignoredAttributes: [
    'name',
    'onDoubleClick'
  ]
});

module.exports = NameButton;
