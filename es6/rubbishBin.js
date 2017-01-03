'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

class RubbishBin extends DroppableElement {
  constructor(selector, removeHandler) {
    var droppableElementMoveHandler = removeHandler;  ///
    
    super(selector, droppableElementMoveHandler);

    this.close();
  }

  getMarkedDirectory() {
    var markedDirectory = null;
    
    return markedDirectory;
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    var directoryOverlappingDraggableEntry = null; ///

    return directoryOverlappingDraggableEntry;
  }

  addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
    this.open();
  }

  removeMarker() {
    this.close();
  }

  isMarked() {
    var open = this.isOpen(),
        marked = open;  ///
    
    return marked;
  }

  isToBeMarked(draggableEntry) {
    var bounds = this.getBounds(),
        draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
        overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
        toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

    return toBeMarked;
  }
  
  dragging(draggableEntry, explorer) {
    var marked = this.isMarked();

    if (marked) {
      var toBeMarked = this.isToBeMarked(draggableEntry);

      if (!toBeMarked) {
        var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

        if (droppableElementToBeMarked !== null) {
          var directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

          droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
        } else {
          explorer.addMarkerInPlace(draggableEntry);
        }

        this.removeMarker();
      }
    }
  }

  moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath, removeEmptyParentDirectories) {
    if (movedDirectoryPath === null) {
      var explorer = directory.getExplorer(),
          directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectory(sourceDirectoryPath, removeEmptyParentDirectories);
    }
  }

  moveFile(file, sourceFilePath, movedFilePath, removeEmptyParentDirectories) {
    if (movedFilePath === null) {
      var explorer = file.getExplorer(),
          filePath = sourceFilePath;  ///

      explorer.removeFile(filePath, removeEmptyParentDirectories);
    }
  }

  open() {
    this.addClass('open');
  }

  close() {
    this.removeClass('open');
  }

  isOpen() {
    var open = this.hasClass('open');
    
    return open;
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    var pathMaps = draggableEntries.map(function(draggableEntry) {
      var pathMap = {},
          draggableEntryPath = draggableEntry.getPath(),
          sourceDraggableEntryPath = draggableEntryPath,  ///
          targetDraggableEntryPath = null;

      pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

      return pathMap;
    });

    return pathMaps;
  }

  static clone(selector, removeHandler) {
    return Element.clone(RubbishBin, selector, removeHandler);
  }

  static fromHTML(html, removeHandler) {
    return Element.fromHTML(RubbishBin, html, removeHandler);
  }
}

module.exports = RubbishBin;
