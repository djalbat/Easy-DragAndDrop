'use strict';

const necessary = require('necessary');

const options = require('../../../../options'),
      DirectoryNameDraggableEntry = require('../../../entry/draggable/directoryName');

const { pathUtilities } = necessary,
      { NO_DRAGGING_INTO_SUB_DIRECTORIES } = options,
      { pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

class TopmostDirectoryNameDraggableEntry extends DirectoryNameDraggableEntry {
  retrieve() {
    return this;  ///
  }
  
  isTopmostDirectoryNameDraggableEntry() {
    return true;
  }

  addFilePath(filePath) {
    let fileNameDraggableEntry = null;

    const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (filePathWithoutTopmostDirectoryName !== null) {
      filePath = filePathWithoutTopmostDirectoryName; ///

      fileNameDraggableEntry = super.addFilePath(filePath);
    }

    return fileNameDraggableEntry;
  }

  addDirectoryPath(directoryPath, collapsed) {
    let directoryNameDraggableEntry = null;
    
    const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (directoryPathWithoutTopmostDirectoryName !== null) {
      directoryPath = directoryPathWithoutTopmostDirectoryName; ///

      directoryNameDraggableEntry = super.addDirectoryPath(directoryPath, collapsed);
    }
    
    return directoryNameDraggableEntry;
  }

  removeFilePath(filePath) {
    const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (filePathWithoutTopmostDirectoryName !== null) {
      filePath = filePathWithoutTopmostDirectoryName; ///

      super.removeFilePath(filePath);
    }
  }

  removeDirectoryPath(directoryPath) {
    const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (directoryPathWithoutTopmostDirectoryName !== null) {
      directoryPath = directoryPathWithoutTopmostDirectoryName;  ///

      super.removeDirectoryPath(directoryPath);
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

    markerPath = markerPathWithoutTopmostDirectoryName; ///

    super.addMarkerEntry(markerPath, draggableEntryType);
  }

  parentContext() {
	  const addFilePath = this.addFilePath.bind(this),
				  removeFilePath = this.removeFilePath.bind(this),
				  addDirectoryPath = this.addDirectoryPath.bind(this),
				  removeDirectoryPath = this.removeDirectoryPath.bind(this),
				  retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
				  retrieveTopmostDirectoryNameDraggableEntry = this.retrieve.bind(this),  ///
				  retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
				  retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
				  addTopmostDirectoryNameDraggableEntryMarkerEntry = this.addMarkerEntry.bind(this), ///
				  removeTopmostDirectoryNameDraggableEntryMarkerEntry = this.removeMarkerEntry.bind(this), ///
				  isTopmostDirectoryNameDraggableEntryMarked = this.isMarked.bind(this),  ///
				  getTopmostDirectoryName = this.getName.bind(this),  ///
				  retrieveFilePaths = this.retrieveFilePaths.bind(this),
				  retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this);

    return ({
      addFilePath,
      removeFilePath,
      addDirectoryPath,
      removeDirectoryPath,
      retrieveDraggableEntryPath,
      retrieveTopmostDirectoryNameDraggableEntry,
      retrieveMarkedDirectoryNameDraggableEntry,
      retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry,
      addTopmostDirectoryNameDraggableEntryMarkerEntry,
      removeTopmostDirectoryNameDraggableEntryMarkerEntry,
      isTopmostDirectoryNameDraggableEntryMarked,
      getTopmostDirectoryName,
      retrieveFilePaths,
      retrieveDirectoryPaths
    });
  }

  static fromProperties(properties) { return DirectoryNameDraggableEntry.fromProperties(TopmostDirectoryNameDraggableEntry, properties); }
}

module.exports = TopmostDirectoryNameDraggableEntry;
