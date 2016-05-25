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

  getRootDirectoryName() { return this.rootDirectory.getName(); }
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
          markerPath = directoryPathOverlappingEntry + '/' + entryName;

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

    this.draggedEntry = entry;

    return true;
  }

  stopDragging(entry, done) {
    this.draggedEntry = null;

    var entryPath = entry.getPath(),
        elementHavingMarker = this.hasMarker() ?
                                this :
                                  this.droppableElementHavingMarker(),
        directoryPathContainingMarker = elementHavingMarker.directoryPathContainingMarker(),
        entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
        sourcePath = entryPathWithoutBottommostName,
        targetPath = directoryPathContainingMarker;

    if ((sourcePath !== targetPath)
     || (sourcePath === null) && (targetPath === null) && (elementHavingMarker !== this)) {
      var subEntries = entry.getSubEntries();

      elementHavingMarker.moveEntries(entry, subEntries, sourcePath, targetPath, function() {
        this.removeMarkerGlobally();

        done();
      }.bind(this));
    } else {
      this.removeMarkerGlobally();

      done();
    }
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

  moveDirectory(directory, sourcePath, targetPath, isSubEntry, next) {
    function afterMove(movedPath) {
      if (false) {

      } else if (movedPath === null) {
        directory.remove();
      } else if (movedPath === targetPath) {
        directory.remove();

        var collapsed = directory.isCollapsed();

        this.addDirectory(movedPath, collapsed);
      } else if (movedPath === sourcePath) {

      }
      
      next();
    }

    var movedPath = this.moveDirectoryHandler(sourcePath, targetPath, isSubEntry, afterMove.bind(this));

    if (movedPath !== undefined) {
      afterMove.call(this, movedPath);
    }
  }

  moveFile(file, sourcePath, targetPath, isSubEntry, next) {
    function afterMove(movedPath) {
      if (false) {

      } else if (movedPath === null) {
        file.remove();
      } else if (movedPath === targetPath) {
        file.remove();

        var readOnly = file.getReadOnly();

        this.addFile(movedPath, readOnly);
      } else if (movedPath === sourcePath) {

      }
      
      next();
    }

    var movedPath = this.moveFileHandler(sourcePath, targetPath, isSubEntry, afterMove.bind(this));

    if (movedPath !== undefined) {
      afterMove.call(this, movedPath);
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
