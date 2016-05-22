'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

class RubbishBin extends DroppableElement {
  constructor(selector, removeFileHandler, removeDirectoryHandler, options) {
    super(selector, options);

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

  moveDirectory(directory, sourcePath, targetPath, handle, next) {
    this.removeDirectory(directory, sourcePath, handle, next);
  }

  moveFile(file, sourcePath, targetPath, handle, next) {
    this.removeFile(file, sourcePath, handle, next);
  }

  removeDirectory(directory, sourcePath, handle, next) {
    function afterRemove(removedPath) {
      if (false) {

      } else if (removedPath === null) {
        directory.remove();
      } else if (removedPath === sourcePath) {

      }

      next();
    }

    var removedPath = !handle ? 
                        null :
                          this.removeDirectoryHandler(sourcePath, afterRemove.bind(this));

    if (removedPath !== undefined) {
      afterRemove.call(this, removedPath);
    }
  }

  removeFile(file, sourcePath, handle, next) {
    function afterRemove(removedPath) {
      if (false) {

      } else if (removedPath === null) {
        file.remove();
      } else if (removedPath === sourcePath) {

      }

      next();
    }

    var removedPath = !handle ?
                        null :
                          this.removeFileHandler(sourcePath, afterRemove.bind(this));

    if (removedPath !== undefined) {
      afterRemove.call(this, removedPath);
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

RubbishBin.clone = function(selector, removeFileHandler, removeDirectoryHandler, options) {
  return Element.clone(RubbishBin, selector, removeFileHandler, removeDirectoryHandler, options);
};

RubbishBin.fromHTML = function(html, removeFileHandler, removeDirectoryHandler, options) {
  return Element.fromHTML(RubbishBin, html, removeFileHandler, removeDirectoryHandler, options);
};

module.exports = RubbishBin;
