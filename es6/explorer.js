'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

class Explorer extends DroppableElement {
  constructor(selector, rootDirectoryName, activateHandler, moveHandler) {
    super(selector, moveHandler);

    var rootDirectory = RootDirectory.clone(rootDirectoryName, this.dragEventHandler.bind(this), this.activateFileEventHandler.bind(this));

    this.activateHandler = activateHandler;

    this.rootDirectory = rootDirectory;

    this.append(rootDirectory);
  }

  addFile(filePath) { this.rootDirectory.addFile(filePath); }
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }
  getRootDirectoryName() { return this.rootDirectory.getName(); }
  getMarkedDirectory() { return this.rootDirectory.getMarkedDirectory(); }
  getDirectoryOverlappingEntry(entry) { return this.rootDirectory.getDirectoryOverlappingEntry(entry); }

  addMarkerInPlace(entry) {
    var entryPath = entry.getPath(),
        entryType = entry.getType(),
        entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);

    if (!entryPathTopmostDirectoryName) {
      var markerPath = entryPath;

      this.rootDirectory.addMarker(markerPath, entryType);
    } else {
      super.addMarker(entry)
    }
  }

  addMarker(entry, directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry)) {
    var entryName = entry.getName(),
        entryType = entry.getType(),
        directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
        markerPath = directoryOverlappingEntryPath + '/' + entryName;

    this.rootDirectory.addMarker(markerPath, entryType);
  }

  removeMarker() {
    var rootDirectoryMarked = this.rootDirectory.isMarked();

    if (rootDirectoryMarked) {
      this.rootDirectory.removeMarker();
    } else {
      super.removeMarker();
    }
  }

  isMarked() {
    var rootDirectoryMarked = this.rootDirectory.isMarked(),
        marked = rootDirectoryMarked ?
                   true :
                     super.isMarked();

    return marked;
  }

  isToBeMarked(entry) {
    var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
        toBeMarked = (directoryOverlappingEntry !== null);

    return toBeMarked;
  }

  startDragging(entry) {
    var marked = this.isMarked(),
        startDragging = !marked;

    if (startDragging) {
      this.addMarkerInPlace(entry);
    }

    return startDragging;
  }

  stopDragging(entry, done) {
    var entryPath = entry.getPath(),
        marked = this.isMarked(),
        markedDroppableElement = marked ?
                                   this :
                                     this.getMarkedDroppableElement(),
        markedDirectory = markedDroppableElement.getMarkedDirectory(),
        noMarkedDirectory = (markedDirectory === null),
        markedDirectoryPath = noMarkedDirectory ?
                                null :
                                  markedDirectory.getPath(),
        entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
        sourcePath = entryPathWithoutBottommostName,
        targetPath = markedDirectoryPath;

    if ((sourcePath !== targetPath) || (sourcePath === null) && (targetPath === null) && (markedDroppableElement !== this)) {
      var subEntries = entry.getSubEntries(),
          entries = subEntries;

      entries.reverse();
      entries.push(entry);

      markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function() {
        this.removeMarkerGlobally();

        done();
      }.bind(this));
    } else {
      this.removeMarkerGlobally();

      done();
    }
  }

  escapeDragging(entry) {
    this.removeMarkerGlobally();
  }

  dragging(entry, explorer = this) {
    var marked = this.isMarked();
    
    if (marked) {
      var toBeMarked = this.isToBeMarked(entry);
      
      if (toBeMarked) {
        var markedDirectory = this.getMarkedDirectory(),
            directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        if (markedDirectory !== directoryOverlappingEntry) {
          this.removeMarker();

          this.addMarker(entry, directoryOverlappingEntry);
        }
      } else {
        var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

        (droppableElementToBeMarked !== null) ?
          droppableElementToBeMarked.addMarker(entry) :
            explorer.addMarkerInPlace(entry);

        this.removeMarker();
      }
    } else {
      var markedDroppableElement = this.getMarkedDroppableElement();

      markedDroppableElement.dragging(entry, explorer);
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

      var filePath = movedPath; ///

      this.addFile(filePath);
    }
  }

  activateFileEventHandler(activateFileEvent) {
    var file = activateFileEvent.getFile(),
        filePath = file.getPath(this.rootDirectory),
        sourcePath = filePath,  ///
        result = this.activateHandler(sourcePath, callback);

    callback(result);
    
    function callback(result) {
      if (result === false) {
        file.remove();
      }
    }
  }

  static clone(selector, rootDirectoryName, moveHandler, activateHandler) {
    return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
  }

  static fromHTML(html, rootDirectoryName, moveHandler, activateHandler) {
    return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
  }
}

module.exports = Explorer;
