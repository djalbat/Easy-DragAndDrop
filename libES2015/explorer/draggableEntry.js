'use strict';

var NameButton = require('./nameButton'),
    DraggableElement = require('../draggableElement');

class DraggableEntry extends DraggableElement {
  constructor(selector, name, type, dragEventHandler) {
    super(selector, dragEventHandler);

    this.nameButton = new NameButton(this, name);

    this.type = type;
  }

  getName() { return this.nameButton.getName(); }

  getType() {
    return this.type;
  }

  getPath() {
    var parentElements = this.parentElements('ul.explorer li'), ///
        name = this.getName(),
        path = parentElements.reduce(function(path, parentElement) {
                var parentElementName = parentElement.getName();

                path = parentElementName + '/' + path;

                return path;
              }, name);

    return path;
  }

  setName(name) { this.nameButton.setName(name); }

  onDoubleClick(doubleClickHandler) { this.nameButton.onDoubleClick(doubleClickHandler); }
}

module.exports = DraggableEntry;
