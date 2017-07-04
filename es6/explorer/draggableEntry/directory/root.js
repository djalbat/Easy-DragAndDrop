'use strict';

const options = require('../../../options'),
      pathUtil = require('../../../util/path'),
      Directory = require('../directory');

class RootDirectory extends Directory {
  get() {
    return this;  ///
  }
  
  isRootDirectory() {
    return true;
  }

  addFile(filePath) {
    const filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.addFile(filePathWithoutRootDirectoryName);
    }
  }

  addDirectory(directoryPath, collapsed) {
    const directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.addDirectory(directoryPathWithoutRootDirectoryName, collapsed);
    }
  }

  removeFile(filePath) {
    const filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.removeFile(filePathWithoutRootDirectoryName);
    }
  }

  removeDirectory(directoryPath) {
    const directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

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
    const markerPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(markerPath);

    super.addMarker(markerPathWithoutRootDirectoryName, draggableEntryType);
  }

  parentContext() {
    return {
      addFile: this.addFile.bind(this),
      removeFile: this.removeFile.bind(this),
      addDirectory: this.addDirectory.bind(this),
      removeDirectory: this.removeDirectory.bind(this),
      getMarkedDirectory: this.getMarkedDirectory.bind(this),
      getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
      getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
      addRootDirectoryMarker: this.addMarker.bind(this), ///
      removeRootDirectoryMarker: this.removeMarker.bind(this), ///
      isRootDirectoryMarked: this.isMarked.bind(this),  ///
      getRootDirectoryName: this.getName.bind(this),  ///
      getRootDirectory: this.get.bind(this),  ///
      getFilePaths: this.getFilePaths.bind(this)
    };
  }

  static fromProperties(properties) {
    return Directory.fromProperties(RootDirectory, properties);
  }
}

module.exports = RootDirectory;
