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

  dragDirectory(directory, sourcePath, targetPath) {
    function afterRemove(removedPath) {
      if (false) {

      } else if (removedPath === null) {
        directory.remove();
      } else if (removedPath === sourcePath) {

      }
    }

    var removedPath = this.removeDirectoryHandler(sourcePath, afterRemove.bind(this));

    if (removedPath !== undefined) {
      afterRemove(removedPath);
    }
  }

  dragFile(file, sourcePath, targetPath) {
    function afterRemove(removedPath) {
      if (false) {

      } else if (removedPath === null) {
        file.remove();
      } else if (removedPath === sourcePath) {

      }
    }

    var removedPath = this.removeFileHandler(sourcePath, afterRemove.bind(this));

    if (removedPath !== undefined) {
      afterRemove(removedPath);
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
