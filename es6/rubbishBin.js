'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

class RubbishBin extends DroppableElement {
  constructor(selector, removeHandler) {
    var droppableElementMoveHandler = removeHandler;  ///
    
    super(selector, droppableElementMoveHandler);

    this.close();
  }

  getDirectoryHavingMarker() {
    var directoryHavingMarker = null;
    
    return directoryHavingMarker; 
  }

  addMarker(entry) {
    this.open();
  }

  removeMarker() {
    this.close();
  }

  hasMarker() {
    var open = this.isOpen(),
        marker = open;  ///
    
    return marker;
  }

  moveDirectory(directory, sourcePath, movedPath) {
    var removedPath = movedPath;  ///
    
    this.removeDirectory(directory, removedPath);
  }

  moveFile(file, sourcePath, movedPath) {
    var removedPath = movedPath;  ///
    
    this.removeFile(file, removedPath);
  }

  removeDirectory(directory, removedPath) {
    if (removedPath === null) {
      directory.remove();
    }
  }

  removeFile(file, removedPath) {
    if (removedPath === null) {
      file.remove();
    }
  }

  open() {
    this.addClass('open');
  }

  close() {
    this.removeClass('open');
  }

  isOpen() {
    var open = this.hasClass('open');
    
    return open;
  }

  static clone(selector, removeHandler) {
    return Element.clone(RubbishBin, selector, removeHandler);
  }

  static fromHTML(html, removeHandler) {
    return Element.fromHTML(RubbishBin, html, removeHandler);
  }
}

module.exports = RubbishBin;
