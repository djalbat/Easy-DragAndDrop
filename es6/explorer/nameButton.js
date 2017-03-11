'use strict';

const easyui = require('easyui'),
      Button = easyui.Button,
      InputElement = easyui.InputElement;

class NameButton extends Button {
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
    this.on('dbclick', handler);
  }

  static fromParentElement(parentElement, name, doubleClickHandler) {
    const selector = 'button.name',
          domElement = parentElement.domElement.querySelector(selector);
    
    return InputElement.fromDOMElement(NameButton, domElement, name, doubleClickHandler);
  }
}

module.exports = NameButton;
