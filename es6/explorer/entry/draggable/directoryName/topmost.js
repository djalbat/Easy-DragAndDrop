'use strict';

const necessary = require('necessary');

const options = require('../../../../options'),
      DirectoryNameDraggableEntry = require('../../../entry/draggable/directoryName');

const { path } = necessary,
      { pathWithoutTopmostDirectoryNameFromPath } = path,
      { NO_DRAGGING_INTO_SUB_DIRECTORIES } = options;

class TopmostDirectoryNameDraggableEntry extends DirectoryNameDraggableEntry {
  retrieve() {
    return this;  ///
  }
  
  isTopmostDirectoryNameDraggableEntry() {
    return true;
  }

  addFilePath(filePath, recognised = true) {
    const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (filePathWithoutTopmostDirectoryName !== null) {
      super.addFilePath(filePathWithoutTopmostDirectoryName, recognised);
    }
  }

  addDirectoryPath(directoryPath, collapsed = false) {
    const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (directoryPathWithoutTopmostDirectoryName !== null) {
      super.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
    }
  }

  removeFilePath(filePath) {
    const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (filePathWithoutTopmostDirectoryName !== null) {
      super.removeFilePath(filePathWithoutTopmostDirectoryName);
    }
  }

  removeDirectoryPath(directoryPath) {
    const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (directoryPathWithoutTopmostDirectoryName !== null) {
      super.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
    }
  }

  retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    let directoryNameDraggableEntryOverlappingDraggableEntry;

    const explorer = this.getExplorer(),
          noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

    if (noDraggingIntoSubdirectoriesOptionPresent) {
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
    const markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

    super.addMarkerEntry(markerPathWithoutTopmostDirectoryName, draggableEntryType);
  }

  parentContext() {
    return ({
      addFilePath: this.addFilePath.bind(this),
      removeFilePath: this.removeFilePath.bind(this),
      addDirectoryPath: this.addDirectoryPath.bind(this),
      removeDirectoryPath: this.removeDirectoryPath.bind(this),
      retrieveDraggableEntryPath: this.retrieveDraggableEntryPath.bind(this),
      retrieveTopmostDirectoryNameDraggableEntry: this.retrieve.bind(this),  ///
      retrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
      retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
      addTopmostDirectoryNameDraggableEntryMarkerEntry: this.addMarkerEntry.bind(this), ///
      removeTopmostDirectoryNameDraggableEntryMarkerEntry: this.removeMarkerEntry.bind(this), ///
      isTopmostDirectoryNameDraggableEntryMarked: this.isMarked.bind(this),  ///
      getTopmostDirectoryName: this.getName.bind(this),  ///
      retrieveFilePaths: this.retrieveFilePaths.bind(this)
    });
  }

  static fromProperties(properties) { return DirectoryNameDraggableEntry.fromProperties(TopmostDirectoryNameDraggableEntry, properties); }
}

module.exports = TopmostDirectoryNameDraggableEntry;
