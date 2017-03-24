'use strict';

const easy = require('easy'),
      InputElement = easy.InputElement;

class ToggleButton extends InputElement {
  constructor(selector, updateHandler) {
    super(selector);

    this.updateHandler = updateHandler;

    this.onClick(this.clickHandler.bind(this));
  }

  isCollapsed() {
    const collapsed = this.hasClass('collapsed');

    return collapsed;
  }

  expand() {
    this.removeClass('collapsed');
  }

  collapse() {
    this.addClass('collapsed');
  }

  toggle() {
    this.toggleClass('collapsed');

    const collapsed = this.isCollapsed();

    this.updateHandler(collapsed);
  }
  
  clickHandler() {
    this.toggle();
  }

  static fromProperties(properties) {
    const { updateHandler } = properties;
    
    return InputElement.fromProperties(ToggleButton, properties, updateHandler);
  }
}

Object.assign(ToggleButton, {
  tagName: 'button',
  defaultProperties: {
    className: 'toggle'
  },
  ignoredProperties: [
    'updateHandler'
  ]
});

module.exports = ToggleButton;
