'use strict';

const easyui = require('easyui'),
      Button = easyui.Button,
      InputElement = easyui.InputElement;

class ToggleButton extends Button {
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

  static fromParentElement(parentElement, updateHandler) {
    const selector = 'button.toggle',
          domElement = parentElement.domElement.querySelector(selector);

    return InputElement.fromDOMElement(ToggleButton, domElement, updateHandler);
  }
}

ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE = '&#x025b6';
ToggleButton.BLACK_DOWN_POINTING_TRIANGLE = '&#x025bc';

module.exports = ToggleButton;
