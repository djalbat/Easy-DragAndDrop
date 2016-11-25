'use strict';

var easyui = require('easyui'),
    Button = easyui.Button;

class NameButton extends Button {
  constructor(parentElement, name, doubleClickHandler = function() {}) {
    super([parentElement, '>button.name']);

    this.setName(name);

    this.onDoubleClick(doubleClickHandler);
  }

  getName() {
    var name = this.html(); ///

    return name;
  }

  setName(name) {
    var html = name;  ///

    this.html(html);
  }
}

module.exports = NameButton;
