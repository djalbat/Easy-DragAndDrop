'use strict';

const options = require('../../../options'),
      pathUtil = require('../../../util/path'),
      DirectoryNameDraggableEntry = require('../../draggableEntry/directoryName');

class RootDirectoryNameDraggableEntry extends DirectoryNameDraggableEntry {
  retrieve() {
    return this;  ///
  }
  
  isRootDirectoryNameDraggableEntry() {
    return true;
  }

  addFilePath(filePath) {
    const filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.addFilePath(filePathWithoutRootDirectoryName);
    }
  }

  addDirectoryPath(directoryPath, collapsed) {
    const directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.addDirectoryPath(directoryPathWithoutRootDirectoryName, collapsed);
    }
  }

  removeFilePath(filePath) {
    const filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.removeFilePath(filePathWithoutRootDirectoryName);
    }
  }

  removeDirectoryPath(directoryPath) {
    const directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.removeDirectoryPath(directoryPathWithoutRootDirectoryName);
    }
  }

  retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    let directoryNameDraggableEntryOverlappingDraggableEntry;

    const explorer = this.getExplorer(),
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

    if (noDraggingIntoSubdirectories) {
      const overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

      directoryNameDraggableEntryOverlappingDraggableEntry = overlappingDraggableEntry ?
        this :
          null;
    } else {
      directoryNameDraggableEntryOverlappingDraggableEntry = super.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
    }

    return directoryNameDraggableEntryOverlappingDraggableEntry;
  }

  addMarkerEntry(markerPath, draggableEntryType) {
    const markerPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(markerPath);

    super.addMarkerEntry(markerPathWithoutRootDirectoryName, draggableEntryType);
  }

  parentContext() {
    return ({
      addFilePath: this.addFilePath.bind(this),
      removeFilePath: this.removeFilePath.bind(this),
      addDirectoryPath: this.addDirectoryPath.bind(this),
      removeDirectoryPath: this.removeDirectoryPath.bind(this),
      retrieveDraggableEntryPath: this.retrieveDraggableEntryPath.bind(this),
      retrieveRootDirectoryNameDraggableEntry: this.retrieve.bind(this),  ///
      retrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
      retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
      addRootDirectoryNameDraggableEntryMarkerEntry: this.addMarkerEntry.bind(this), ///
      removeRootDirectoryNameDraggableEntryMarkerEntry: this.removeMarkerEntry.bind(this), ///
      isRootDirectoryNameDraggableEntryMarked: this.isMarked.bind(this),  ///
      getRootDirectoryName: this.getName.bind(this),  ///
      retrieveFilePaths: this.retrieveFilePaths.bind(this)
    });
  }

  static fromProperties(properties) {
    return DirectoryNameDraggableEntry.fromProperties(RootDirectoryNameDraggableEntry, properties);
  }
}

module.exports = RootDirectoryNameDraggableEntry;
