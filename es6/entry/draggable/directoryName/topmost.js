'use strict';

const necessary = require('necessary');

const DirectoryNameDraggableEntry = require('../../../entry/draggable/directoryName');

const { pathUtilities } = necessary,
      { pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

class TopmostDirectoryNameDraggableEntry extends DirectoryNameDraggableEntry {
  retrieve() {
    return this;  ///
  }

  addFilePath(filePath) {
    const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    filePath = filePathWithoutTopmostDirectoryName; ///

    super.addFilePath(filePath);
  }

  removeFilePath(filePath) {
    const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    filePath = filePathWithoutTopmostDirectoryName; ///

    super.removeFilePath(filePath);
  }

  addDirectoryPath(directoryPath, collapsed = false) {
    const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    directoryPath = directoryPathWithoutTopmostDirectoryName; ///

    super.addDirectoryPath(directoryPath, collapsed);
  }

  removeDirectoryPath(directoryPath) {
    const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    directoryPath = directoryPathWithoutTopmostDirectoryName; ///

    super.removeDirectoryPath(directoryPath);
  }

  isTopmostDirectoryNameDraggableEntry() {
    const topmostDirectoryNameDraggableEntry = true;

    return topmostDirectoryNameDraggableEntry;
  }

  parentContext() {
	  const addFilePath = this.addFilePath.bind(this),
				  removeFilePath = this.removeFilePath.bind(this),
				  addDirectoryPath = this.addDirectoryPath.bind(this),
				  removeDirectoryPath = this.removeDirectoryPath.bind(this),
          retrieveTopmostDirectoryNameDraggableEntry = this.retrieve.bind(this);  ///

    return ({
      addFilePath,
      removeFilePath,
      addDirectoryPath,
      removeDirectoryPath,
      retrieveTopmostDirectoryNameDraggableEntry
    });
  }

  static fromProperties(properties) { return DirectoryNameDraggableEntry.fromProperties(TopmostDirectoryNameDraggableEntry, properties); }
}

module.exports = TopmostDirectoryNameDraggableEntry;
