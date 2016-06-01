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

  addFile(filePath, readOnly) {
    var filePathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(filePath);

    super.addFile(filePathWithoutRootDirectoryName, readOnly);
  }

  addDirectory(directoryPath, collapsed) {
    var directoryPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(directoryPath);

    super.addDirectory(directoryPathWithoutRootDirectoryName, collapsed);
  }
  
  addMarker(markerPath, entryType) {
    var markerPathWithoutRootDirectoryName = this.pathWithoutRootDirectoryName(markerPath);

    var marker = super.addMarker(markerPathWithoutRootDirectoryName, entryType);

    return marker;
  }

  pathWithoutRootDirectoryName(path) {
    var topmostDirectoryName = util.topmostDirectoryName(path),
        rootDirectoryName = this.getName();

    var pathWithoutRootDirectoryName = topmostDirectoryName === rootDirectoryName ?
                                         util.pathWithoutTopmostDirectoryName(path) :
                                           null;  ///

    return pathWithoutRootDirectoryName;
  }
}

RootDirectory.clone = function(name, dragEventHandler, activateFileEventHandler) {
  var rootDirectory = Element.clone(RootDirectory, '#directory', name, dragEventHandler, activateFileEventHandler);

  rootDirectory.removeAttribute('id');

  return rootDirectory;
};

module.exports = RootDirectory;
