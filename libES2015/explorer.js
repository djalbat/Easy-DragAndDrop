'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

class Explorer extends DroppableElement {
  constructor(selector, rootDirectoryName, moveFileHandler, moveDirectoryHandler, activateFileHandler) {
    super(selector);

    var rootDirectory = RootDirectory.clone(rootDirectoryName, this.onDragEvent.bind(this), this.onActivateFileEvent.bind(this));

    this.moveFileHandler = moveFileHandler;
    this.moveDirectoryHandler = moveDirectoryHandler;
    this.activateFileHandler = activateFileHandler;

    this.rootDirectory = rootDirectory;

    this.append(rootDirectory);
  }

  addFile(filePath, readOnly) { this.rootDirectory.addFile(filePath, readOnly); }
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }
  hasDirectory(directoryPath) { return this.rootDirectory.hasDirectory(directoryPath); }
  retrieveDirectory(directoryPath) { return this.rootDirectory.retrieveDirectory(directoryPath); }
  removeDirectory(directoryPath) { this.rootDirectory.removeDirectory(directoryPath); }

  getRootDirectoryName() { return this.rootDirectory.getName(); }
  getDirectoryHavingMarker() { return this.rootDirectory.getDirectoryHavingMarker(); }
  getDirectoryOverlappingEntry(entry) { return this.rootDirectory.getDirectoryOverlappingEntry(entry); }

  addMarker(entry, directoryOverlappingEntry) {
    if (directoryOverlappingEntry === undefined) {
      directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);
    }

    var entryName = entry.getName(),
        entryType = entry.getType(),
        directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
        markerPath = directoryPathOverlappingEntry + '/' + entryName;

    this.rootDirectory.addMarker(markerPath, entryType);
  }

  removeMarker() {
    var rootDirectoryHasMarker = this.rootDirectory.hasMarker();

    if (rootDirectoryHasMarker) {
      this.rootDirectory.removeMarker();
    } else {
      super.removeMarker();
    }
  }

  hasMarker() {
    var rootDirectoryHasMarker = this.rootDirectory.hasMarker();

    if (rootDirectoryHasMarker) {
      return true;
    } else {
      return super.hasMarker();
    }
  }

  addMarkerInPlace(entry) {
    var entryPath = entry.getPath(),
        entryType = entry.getType(),
        entryIsTopmost = util.isTopmostDirectoryName(entryPath);

    if (!entryIsTopmost) {
      var markerPath = entryPath;

      this.rootDirectory.addMarker(markerPath, entryType);
    } else {
      super.addMarker(entry)
    }
  }

  onActivateFileEvent(activateFileEvent) {
    var file = activateFileEvent.getFile(),
        filePath = file.getPath(this.rootDirectory);

    this.activateFileHandler(filePath);
  }

  startDragging(entry) {
    var marker = this.hasMarker();

    if (marker) {
      return false;
    }

    this.addMarkerInPlace(entry);

    return true;
  }

  stopDragging(entry) {
    var entryPath = entry.getPath(),
        droppableElementHavingMarker = this.hasMarker() ?
                                         this :
                                           this.getDroppableElementHavingMarker(),
        directoryHavingMarker = droppableElementHavingMarker.getDirectoryHavingMarker(),
        directoryPathHavingMarker = (directoryHavingMarker === null ) ?
                                      null :
                                        directoryHavingMarker.getPath(),
        entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
        sourcePath = entryPathWithoutBottommostName,
        targetPath = directoryPathHavingMarker;

    if ((sourcePath !== targetPath)
     || (sourcePath === null) && (targetPath === null) && (droppableElementHavingMarker !== this)) {
      var subEntries = entry.getSubEntries();

      droppableElementHavingMarker.moveEntries(entry, subEntries, sourcePath, targetPath, function() {
        this.removeMarkerGlobally();
      }.bind(this));
    } else {
      this.removeMarkerGlobally();
    }
  }

  dragging(entry) {
    var directoryHavingMarker = this.getDirectoryHavingMarker(),
        directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

    if ((directoryOverlappingEntry !== null)
     && (directoryOverlappingEntry !== directoryHavingMarker)) {
      this.removeMarkerGlobally();

      this.addMarker(entry, directoryOverlappingEntry);
    } else {
      super.dragging(entry);
    }
  }

  isToHaveMarker(entry) {
    var entryPath = entry.getPath(),
        entryIsTopmostDirectory = util.isTopmostDirectoryName(entryPath);

    if (entryIsTopmostDirectory) {
      return false;
    } else {
      var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
          toHaveMarker = (directoryOverlappingEntry !== null);

      return toHaveMarker;
    }
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
