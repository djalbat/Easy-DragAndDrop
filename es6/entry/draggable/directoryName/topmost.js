'use strict';

const DirectoryNameDraggableEntry = require('../../../entry/draggable/directoryName');

class TopmostDirectoryNameDraggableEntry extends DirectoryNameDraggableEntry {
  retrieve() {
    return this;  ///
  }

  isTopmostDirectoryNameDraggableEntry() {
    const topmostDirectoryNameDraggableEntry = true;

    return topmostDirectoryNameDraggableEntry;
  }

  static fromProperties(properties) { return DirectoryNameDraggableEntry.fromProperties(TopmostDirectoryNameDraggableEntry, properties); }
}

module.exports = TopmostDirectoryNameDraggableEntry;
