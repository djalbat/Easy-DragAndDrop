'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

class Explorer extends DroppableElement {
  constructor(selector, rootDirectoryName, activateHandler, moveHandler) {
    super(selector, moveHandler);

    var rootDirectory = RootDirectory.clone(rootDirectoryName, this.onDragEvent.bind(this), this.onActivateEvent.bind(this));

    this.activateHandler = activateHandler;

    this.rootDirectory = rootDirectory;

    this.append(rootDirectory);
  }

  addFile(filePath, readOnly) { this.rootDirectory.addFile(filePath, readOnly); }
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }
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

  onActivateEvent(activateFileEvent) {
    var file = activateFileEvent.getFile(),
        filePath = file.getPath(this.rootDirectory);

    this.activateHandler(filePath);
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
      var subEntries = entry.getSubEntries(),
          entries = subEntries;

      entries.reverse();
      entries.push(entry);

      droppableElementHavingMarker.moveEntries(entries, sourcePath, targetPath, function() {
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

  moveDirectory(directory, sourcePath, movedPath) {
    if (false) {

    } else if (movedPath === sourcePath) {

    } else if (movedPath === null) {
      directory.remove();
    } else {
      directory.remove();

      var collapsed = directory.isCollapsed(),
          directoryPath = movedPath;

      this.addDirectory(directoryPath, collapsed);
    }
  }

  moveFile(file, sourcePath, movedPath) {
    if (false) {

    } else if (movedPath === sourcePath) {

    } else if (movedPath === null) {
      file.remove();
    } else {
      file.remove();

      var readOnly = file.getReadOnly(),
          filePath = movedPath;

      this.addFile(filePath, readOnly);
    }
  }
}

Explorer.clone = function(selector, rootDirectoryName, moveHandler, activateHandler) {
  return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
};

Explorer.fromHTML = function(html, rootDirectoryName, moveHandler, activateHandler) {
  return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
};

module.exports = Explorer;
