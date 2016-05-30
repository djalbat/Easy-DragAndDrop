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

    this.draggedEntry = null;
    
    this.directoryHavingMarker = null;

    this.rootDirectory = rootDirectory;

    this.append(rootDirectory);
  }

  addFile(filePath, readOnly) { this.rootDirectory.addFile(filePath, readOnly); }
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }

  getRootDirectoryName() { return this.rootDirectory.getName(); }
  getDirectoryHavingMarker() { return this.rootDirectory.getDirectoryHavingMarker(); }
  getDirectoryOverlappingEntry(entry) { return this.rootDirectory.getDirectoryOverlappingEntry(entry); }

  addMarker(directoryOverlappingEntry, entry) {
    var entryName = entry.getName(),
        entryType = entry.getType(),
        directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
        markerPath = directoryPathOverlappingEntry + '/' + entryName;

    this.rootDirectory.addMarker(markerPath, entryType);
  }

  removeMarker() {
    if (this.directoryHavingMarker !== null) {
      this.directoryHavingMarker.removeMarker();

      this.directoryHavingMarker = null;
    } else {
      super.removeMarker();
    }
  }

  hasMarker() {
    if (this.directoryHavingMarker !== null) {
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

  removeMarkerGlobally() {
    this.removeMarker();  ///
  }

  onActivateFileEvent(activateFileEvent) {
    var file = activateFileEvent.getFile(),
        filePath = file.getPath(this.rootDirectory);

    this.activateFileHandler(filePath);
  }

  startDragging(entry) {
    if (this.draggedEntry !== null) {
      return false;
    }

    this.addMarkerInPlace(entry);

    this.draggedEntry = entry;

    this.directoryHavingMarker = this.getDirectoryHavingMarker();

    return true;
  }

  stopDragging(entry) {
    this.draggedEntry = null;

    var entryPath = entry.getPath(),
        droppableElementlementHavingMarker = this, ///
        // droppableElementlementHavingMarker = this.hasMarker() ?
        //                         this :
        //                           this.droppableElementHavingMarker(),
        directoryHavingMarker = droppableElementlementHavingMarker.getDirectoryHavingMarker(),
        directoryPathHavingMarker = (directoryHavingMarker === null ) ?
                                      null :
                                        directoryHavingMarker.getPath(),
        entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
        sourcePath = entryPathWithoutBottommostName,
        targetPath = directoryPathHavingMarker;

    if ((sourcePath !== targetPath)
     || (sourcePath === null) && (targetPath === null) && (droppableElementlementHavingMarker !== this)) {
      var subEntries = entry.getSubEntries();

      droppableElementlementHavingMarker.moveEntries(entry, subEntries, sourcePath, targetPath, function() {
        this.removeMarkerGlobally();
      }.bind(this));
    } else {
      this.removeMarkerGlobally();
    }
  }

  dragging(entry) {
    var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

    if (directoryOverlappingEntry !== this.directoryHavingMarker) {
      this.directoryHavingMarker.removeMarker();

      if (directoryOverlappingEntry !== null) {
        this.addMarker(directoryOverlappingEntry, entry);
      } else {
        this.addMarkerInPlace(entry);
      }

      this.directoryHavingMarker = this.getDirectoryHavingMarker();
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

  // isKeepingMarker(entry) {
  //   var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
  //       keepingMarker;
  //
  //   if (directoryOverlappingEntry !== null) {
  //     this.removeMarker();
  //
  //     this.addMarker(entry);
  //
  //     keepingMarker = true;
  //   } else {
  //     keepingMarker = false;
  //   }
  //
  //   return keepingMarker;
  // }

  // toAddMarker(entry) {
  //   var entryPath = entry.getPath(),
  //       entryIsTopmost = util.isTopmostDirectoryName(entryPath),
  //       directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry),
  //       directoryPathOverlappingEntry = directoryOverlappingEntry.getPath(),
  //       addMarker = !entryIsTopmost && (directoryPathOverlappingEntry !== null);
  //
  //   return addMarker;
  // }
}

Explorer.clone = function(selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
  return Element.clone(Explorer, selector, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler);
};

Explorer.fromHTML = function(html, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler) {
  return Element.fromHTML(Explorer, html, rootDirectoryName, activateFileHandler, moveFileHandler, moveDirectoryHandler);
};

module.exports = Explorer;
