'use strict';

const util = require('../../../util'),
      options = require('../../../options'),
      Directory = require('../directory');

class RootDirectory extends Directory {
  isRootDirectory() {
    return true;
  }

  addFile(filePath) {
    const filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.addFile(filePathWithoutRootDirectoryName);
    }
  }

  addDirectory(directoryPath, collapsed) {
    const directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.addDirectory(directoryPathWithoutRootDirectoryName, collapsed);
    }
  }

  removeFile(filePath) {
    const filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.removeFile(filePathWithoutRootDirectoryName);
    }
  }

  removeDirectory(directoryPath) {
    const directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.removeDirectory(directoryPathWithoutRootDirectoryName);
    }
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    let directoryOverlappingEntry;

    const explorer = this.getExplorer(),
        noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

    if (noDraggingIntoSubdirectories) {
      const overlappingEntry = this.isOverlappingDraggableEntry(draggableEntry);

      directoryOverlappingEntry = overlappingEntry ?
          this :
          null;
    } else {
      directoryOverlappingEntry = super.getDirectoryOverlappingDraggableEntry(draggableEntry);
    }

    return directoryOverlappingEntry;
  }

  addMarker(markerPath, draggableEntryType) {
    const markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

    super.addMarker(markerPathWithoutRootDirectoryName, draggableEntryType);
  }

  parentContext() {
    function getRootDirectory() {
      return this;
    }
    
    const parentContext = {
      addFile: this.addFile.bind(this),
      addDirectory: this.addDirectory.bind(this),
      removeFile: this.removeFile.bind(this),
      removeDirectory: this.removeDirectory.bind(this),
      getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
      getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
      getMarkedDirectory: this.getMarkedDirectory.bind(this),
      getFilePaths: this.getFilePaths.bind(this),
      addRootDirectoryMarker: this.addMarker.bind(this), ///
      removeRootDirectoryMarker: this.removeMarker.bind(this), ///
      isRootDirectoryMarked: this.isMarked.bind(this),  ///
      getRootDirectoryName: this.getName.bind(this),  ///
      getRootDirectory: getRootDirectory
    };

    return parentContext;
  }

  static fromProperties(properties) {
    return Directory.fromProperties(RootDirectory, properties);
  }
}

module.exports = RootDirectory;
