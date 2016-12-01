'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    Directory = require('./directory');

class RootDirectory extends Directory {
  constructor(selector, name, dragEventHandler, activateFileEventHandler) {
    var collapsed = false;  ///

    super(selector, name, collapsed, dragEventHandler, activateFileEventHandler);
  }

  getDirectoryOverlappingEntry(entry, noDragsToSubdirectories) {
    var directoryOverlappingEntry;
    
    if (noDragsToSubdirectories) {
      var overlappingEntry = this.isOverlappingEntry(entry);

      directoryOverlappingEntry = overlappingEntry ?
                                    this :
                                      null;
    } else {
      directoryOverlappingEntry = super.getDirectoryOverlappingEntry(entry);
    }
    
    return directoryOverlappingEntry;    
  }

  addFile(filePath) {
    var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

    super.addFile(filePathWithoutRootDirectoryName);
  }

  addDirectory(directoryPath, collapsed) {
    var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

    if (directoryPathWithoutRootDirectoryName !== null) {
      super.addDirectory(directoryPathWithoutRootDirectoryName, collapsed);
    }
  }
  
  addMarker(markerPath, entryType) {
    var markerPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(markerPath);

    super.addMarker(markerPathWithoutRootDirectoryName, entryType);
  }

  pathWithoutRootDirectoryName(path) {
    var topmostDirectoryName = util.topmostDirectoryName(path),
        rootDirectoryName = this.getName(),
        pathWithoutRootDirectoryName = topmostDirectoryName === rootDirectoryName ?
                                         util.pathWithoutTopmostDirectoryName(path) :
                                           null;  ///

    return pathWithoutRootDirectoryName;
  }

  static clone(name, dragEventHandler, activateFileEventHandler) {
    var rootDirectory = Element.clone(RootDirectory, '#directory', name, dragEventHandler, activateFileEventHandler);

    rootDirectory.removeAttribute('id');

    return rootDirectory;
  }
}

module.exports = RootDirectory;
