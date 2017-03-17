'use strict';

const easyui = require('easyui'),
      InputElement = easyui.InputElement;

class ToggleButton extends InputElement {
  constructor(selector, updateHandler) {
    super(selector);

    this.updateHandler = updateHandler;

    this.onClick(this.clickHandler.bind(this));
  }

  isCollapsed() {
    return this.collapsed;
  }

  expand() {
    this.collapsed = false;

    this.update();
  }

  collapse() {
    this.collapsed = true;

    this.update();
  }

  toggle() {
    this.collapsed = !this.collapsed;

    this.update();
  }
  
  clickHandler() {
    this.toggle();
  }

  update() {
    const html = this.collapsed ? 
                   ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE : 
                     ToggleButton.BLACK_DOWN_POINTING_TRIANGLE;

    this.html(html);

    this.updateHandler(this.collapsed);
  }

  static fromProperties(properties) {
    const { updateHandler } = properties;
    
    return InputElement.fromProperties(ToggleButton, properties, updateHandler);
  }
}

Object.assign(ToggleButton, {
  tagName: 'button',
  ignoredAttributes: [
    'updateHandler'
  ],
  BLACK_RIGHT_POINTING_TRIANGLE: '&#x025b6',
  BLACK_DOWN_POINTING_TRIANGLE: '&#x025bc'
});

module.exports = ToggleButton;
