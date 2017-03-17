'use strict';

const util = require('../../../util'),
      options = require('../../../options'),
      Directory = require('../directory');

class RootDirectory extends Directory {
  isRootDirectory() {
    return true;
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

  addMarker(markerPath, draggableEntryType) {
    const markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

    super.addMarker(markerPathWithoutRootDirectoryName, draggableEntryType);
  }
  
  static fromProperties(properties) {
    return Directory.fromProperties(RootDirectory, properties);
  }
}

module.exports = RootDirectory;
