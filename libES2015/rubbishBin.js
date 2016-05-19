'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

class RubbishBin extends DroppableElement {
  constructor(selector, removeFileHandler, removeDirectoryHandler) {
    super(selector);

    this.removeFileHandler = removeFileHandler;
    this.removeDirectoryHandler = removeDirectoryHandler;

    this.close();
  }

  directoryPathContainingMarker() { return null; }

  addMarker(entry) {
    this.open();
  }

  removeMarker() {
    this.close();
  }

  hasMarker() {
    return this.isOpen();
  }

  dragDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
    var movedDirectoryPath = this.removeDirectoryHandler(sourceDirectoryPath);

    if (false) {

    } else if (movedDirectoryPath === null) {
      directory.remove();
    } else if (movedDirectoryPath === sourceDirectoryPath) {

    }
  }

  dragFile(file, sourceFilePath, targetFilePath) {
    var movedFilePath = this.removeFileHandler(sourceFilePath);

    if (false) {

    } else if (movedFilePath === null) {
      file.remove();
    } else if (movedFilePath === sourceFilePath) {

    }
  }

  open() {
    this.addClass('open');
  }

  close() {
    this.removeClass('open');
  }

  isOpen() {
    return this.hasClass('open');
  }
}

RubbishBin.clone = function(selector, removeFileHandler, removeDirectoryHandler) {
  return Element.clone(RubbishBin, selector, removeFileHandler, removeDirectoryHandler);
};

RubbishBin.fromHTML = function(html, removeFileHandler, removeDirectoryHandler) {
  return Element.fromHTML(RubbishBin, html, removeFileHandler, removeDirectoryHandler);
};

module.exports = RubbishBin;
