'use strict';

class ActivateFileEvent {
  constructor(file) {
    this.file = file;
  }

  getFile() {
    return this.file;
  }
}

module.exports = ActivateFileEvent;
