'use strict';

var easyui = require('easyui'),
    Button = easyui.Button;

class ToggleButton extends Button {
  constructor(parentElement, updateHandler) {
    super([parentElement, '>button.toggle']);

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
    var html = this.collapsed ? 
                 ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE : 
                   ToggleButton.BLACK_DOWN_POINTING_TRIANGLE;

    this.html(html);

    this.updateHandler(this.collapsed);
  }
}

ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE = '&#x025b6';
ToggleButton.BLACK_DOWN_POINTING_TRIANGLE = '&#x025bc';

module.exports = ToggleButton;
