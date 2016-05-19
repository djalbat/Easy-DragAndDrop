'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

class Explorer extends DroppableElement {
  constructor(selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
    super(selector);

    var rootDirectory = RootDirectory.clone(rootDirectoryName, this.onDragEvent.bind(this), this.onActivateFileEvent.bind(this));

    this.activateFileHandler = activateFileHandler;
    this.moveFileHandler = moveFileHandler;
    this.moveDirectoryHandler = moveDirectoryHandler;

    this.rootDirectory = rootDirectory;

    this.append(rootDirectory);
  }

  addFile(filePath, readOnly) { this.rootDirectory.addFile(filePath, readOnly); }
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }
  directoryPathContainingMarker() { return this.rootDirectory.directoryPathContainingMarker(); }

  addMarkerInPlace(entry) {
    var entryPath = entry.getPath(),
        entryType = entry.getType(),
        entryIsTopmost = util.isTopmost(entryPath);

    if (!entryIsTopmost) {
      var markerPath = entryPath;

      this.rootDirectory.addMarker(markerPath, entryType);
    } else {
      super.addMarker(entry)
    }
  }

  addMarker(entry) {
    var directoryPathOverlappingEntry = this.rootDirectory.directoryPathOverlappingEntry(entry);

    if (directoryPathOverlappingEntry === null) {
      this.addMarkerInPlace(entry);
    } else {
      var entryName = entry.getName(),
          entryType = entry.getType(),
          entryPath = entry.getPath(),
          rootDirectoryName = this.rootDirectory.getName(),
          entryTopmostDirectoryName = util.topmostDirectoryName(entryPath),
          markerPath = (entryTopmostDirectoryName !== rootDirectoryName) ?
                         rootDirectoryName + '/' + entryName :
                           directoryPathOverlappingEntry + '/' + entryName;

      this.rootDirectory.addMarker(markerPath, entryType);
    }
  }

  removeMarker() {
    if (this.rootDirectory.hasMarker()) {
      this.rootDirectory.removeMarker();
    } else {
      super.removeMarker();
    }
  }

  hasMarker() {
    if (this.rootDirectory.hasMarker()) {
      return true;
    } else {
      return super.hasMarker();
    }
  }

  onActivateFileEvent(activateFileEvent) {
    var file = activateFileEvent.getFile(),
        filePath = file.getPath(this.rootDirectory);

    this.activateFileHandler(filePath);
  }

  startDragging(entry) {
    if (this.hasMarker()) {
      return false;
    }

    this.addMarkerInPlace(entry);

    return true;
  }

  stopDragging(entry) {
    var entryPath = entry.getPath(),
        elementHavingMarker = this.hasMarker() ?
                                this :
                                  this.droppableElementHavingMarker(),
        directoryPathContainingMarker = elementHavingMarker.directoryPathContainingMarker(),
        entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
        sourcePath = entryPathWithoutBottommostName,
        targetPath = directoryPathContainingMarker;

    if ((sourcePath === null)
     || (sourcePath !== targetPath)) {
      var entries = entry.getEntries();

      elementHavingMarker.dragEntries(entries, sourcePath, targetPath);
    }

    super.stopDragging();
  }

  isKeepingMarker(entry) {
    var directoryPathOverlappingEntry = this.rootDirectory.directoryPathOverlappingEntry(entry),
        keepingMarker;

    if (directoryPathOverlappingEntry !== null) {
      this.removeMarker();

      this.addMarker(entry);

      keepingMarker = true;
    } else {
      keepingMarker = false;
    }

    return keepingMarker;
  }

  toAddMarker(entry) {
    var entryPath = entry.getPath(),
        entryIsTopmost = util.isTopmost(entryPath),
        directoryPathOverlappingEntry = this.rootDirectory.directoryPathOverlappingEntry(entry),
        addMarker = !entryIsTopmost && (directoryPathOverlappingEntry !== null);

    return addMarker;
  }

  dragDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
    var movedDirectoryPath = this.moveDirectoryHandler(sourceDirectoryPath, targetDirectoryPath);

    if (false) {

    } else if (movedDirectoryPath === null) {
      directory.remove();
    } else if (movedDirectoryPath === targetDirectoryPath) {
      directory.remove();

      var collapsed = directory.isCollapsed();

      this.addDirectory(movedDirectoryPath, collapsed);
    } else if (movedDirectoryPath === sourceDirectoryPath) {

    }
  }

  dragFile(file, sourceFilePath, targetFilePath) {
    var movedFilePath = this.moveFileHandler(sourceFilePath, targetFilePath);

    if (false) {

    } else if (movedFilePath === null) {
      file.remove();
    } else if (movedFilePath === targetFilePath) {
      file.remove();

      var readOnly = file.getReadOnly();

      this.addFile(movedFilePath, readOnly);
    } else if (movedFilePath === sourceFilePath) {

    }
  }
}

Explorer.clone = function(selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
  return Element.clone(Explorer, selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler);
};

Explorer.fromHTML = function(html, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
  return Element.fromHTML(Explorer, html, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler);
};

module.exports = Explorer;
