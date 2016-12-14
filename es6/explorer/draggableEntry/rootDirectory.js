'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    Directory = require('./directory');

class RootDirectory extends Directory {
  constructor(selector, name, explorer, activateFileEventHandler) {
    var collapsed = false;  ///

    super(selector, name, collapsed, explorer, activateFileEventHandler);
  }
  
  isRootDirectory() {
    return true;
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry, noDraggingIntoSubdirectories) {
    var directoryOverlappingEntry;
    
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

  removeFile(filePath, removeEmptyParentDirectories) {
    var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

    if (filePathWithoutRootDirectoryName !== null) {
      super.removeFile(filePathWithoutRootDirectoryName, removeEmptyParentDirectories);
    }
  }

  removeDirectory(directoryPath, removeEmptyParentDirectories) {
    var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.removeDirectory(directoryPathWithoutRootDirectoryName, removeEmptyParentDirectories);
    }
  }

  addMarker(markerPath, draggableEntryType) {
    var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

    super.addMarker(markerPathWithoutRootDirectoryName, draggableEntryType);
  }

  static clone(name, explorer, activateFileEventHandler) {
    var rootDirectory = Element.clone(RootDirectory, '#directory', name, explorer, activateFileEventHandler);

    rootDirectory.removeAttribute('id');

    return rootDirectory;
  }
}

module.exports = RootDirectory;
