'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    options = require('../../options'),
    Directory = require('./directory');

class RootDirectory extends Directory {
  constructor(selector, name, explorer) {
    var collapsed = false;  ///

    super(selector, name, collapsed, explorer);
  }
  
  isRootDirectory() {
    return true;
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    var directoryOverlappingEntry,
        explorer = this.getExplorer(),
        noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);
    
    if (noDraggingIntoSubdirectories) {
      var overlappingEntry = this.isOverlappingDraggableEntry(draggableEntry);

      directoryOverlappingEntry = overlappingEntry ?
                                    this :
                                      null;
    } else {
      directoryOverlappingEntry = super.getDirectoryOverlappingDraggableEntry(draggableEntry);
    }
    
    return directoryOverlappingEntry;    
  }

  addFile(filePath) {
    var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.addFile(filePathWithoutRootDirectoryName);
    }
  }

  addDirectory(directoryPath, collapsed) {
    var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.addDirectory(directoryPathWithoutRootDirectoryName, collapsed);
    }
  }

  removeFile(filePath) {
    var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.removeFile(filePathWithoutRootDirectoryName);
    }
  }

  removeDirectory(directoryPath) {
    var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.removeDirectory(directoryPathWithoutRootDirectoryName);
    }
  }

  addMarker(markerPath, draggableEntryType) {
    var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

    super.addMarker(markerPathWithoutRootDirectoryName, draggableEntryType);
  }

  static clone(name, explorer) {
    var rootDirectory = Element.clone(RootDirectory, '#directory', name, explorer);

    rootDirectory.removeAttribute('id');

    return rootDirectory;
  }
}

module.exports = RootDirectory;
