'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    ToggleButton = require('../toggleButton'),
    DraggableEntry = require('../draggableEntry');

class Directory extends DraggableEntry {
  constructor(selector, name, collapsed, dragEventHandler, activateFileEventHandler) {
    var type = Entry.types.DIRECTORY;

    super(selector, name, type, dragEventHandler);

    this.dragEventHandler = dragEventHandler;

    this.activateFileEventHandler = activateFileEventHandler;

    this.toggleButton = new ToggleButton(this, this.toggleButtonUpdateHandler.bind(this) );

    this.entries = new Entries(this, Directory);

    this.onDoubleClick(this.doubleClickHandler.bind(this));

    !collapsed ?
      this.expand() :
        this.collapse();
  }

  isDirectory() {
    return true;
  }

  isBefore(entry) {
    var entryType = entry.getType();

    switch (entryType) {
      case Entry.types.FILE:
      case Entry.types.MARKER:

        return true;

      case Entry.types.DIRECTORY:

        var name = this.getName(),
            entryName = entry.getName(),
            before = name.localeCompare(entryName) < 0;

        return before;
    }
  }
  
  getSubEntries() {
    var subEntries = [];

    this.forEachFile(function(file) {
      var subEntry = file; ///

      subEntries.push(subEntry);
    });

    this.forEachDirectory(function(directory) {
      var subEntry = directory, ///
          directorySubEntries = directory.getSubEntries();

      subEntries.push(subEntry);
      
      subEntries = subEntries.concat(directorySubEntries);
    });

    return subEntries;
  }

  getDraggingBounds() {
    var collapsed = this.isCollapsed();

    this.collapse();

    var bounds = super.getBounds(),
        draggingBounds = bounds;  ///

    if (!collapsed) {
      this.expand();
    }

    return draggingBounds;
  }

  isOverlappingEntry(entry) {
    var overlapping;
    
    if (this === entry) {
      overlapping = false;
    } else {
      var collapsed = this.isCollapsed();
      
      if (collapsed) {
        overlapping = false;
      } else {
        var draggingBounds = entry.getDraggingBounds(),
            overlappingDraggingBounds = super.isOverlappingDraggingBounds(draggingBounds);

        overlapping = overlappingDraggingBounds;
      }
    }

    return overlapping;
  }

  isCollapsed() { return this.toggleButton.isCollapsed(); }

  expand() { this.toggleButton.expand(); }

  collapse() { this.toggleButton.collapse(); }

  addFile(filePath) {
    var topmostDirectory = this.addTopmostDirectory(filePath);

    if (topmostDirectory !== null) {
      var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      topmostDirectory.addFile(filePathWithoutTopmostDirectoryName);
    } else {
      this.entries.addFile(filePath, this.dragEventHandler, this.activateFileEventHandler);
    }
  }

  addDirectory(directoryPath, collapsed) {
    var topmostDirectory = this.addTopmostDirectory(directoryPath);

    if (topmostDirectory !== null) {
      var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
    } else {
      var directoryName = directoryPath,  ///
          entriesDirectory = this.entries.hasDirectory(directoryName);

      if (!entriesDirectory) {
        this.entries.addDirectory(directoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
      } else {
        var directory = this.entries.retrieveDirectory(directoryName);

        collapsed ? 
          directory.collapse() : 
            directory.expand();
      }
    }
  }
  
  addMarker(markerPath, entryType) {
    var topmostDirectoryName = util.topmostDirectoryName(markerPath);

    if (topmostDirectoryName === null) {
      var markerName = markerPath;  ///

      this.entries.addMarker(markerName, entryType);
    } else {
      var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
          markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, entryType);
    }
  }

  removeMarker() {
    var removed,
        entriesMarked = this.entries.isMarked();
    
    if (entriesMarked) {
      this.entries.removeMarker();

      removed = true;
    } else {
      var someDirectoryMarkerRemoved = this.entries.someDirectory(function(directory) {
        return directory.removeMarker();
      });
      
      removed = someDirectoryMarkerRemoved;
    }
    
    return removed;
  }

  isMarked() {
    var marked,
        entriesMarked = this.entries.isMarked();
    
    if (entriesMarked) {
      marked = entriesMarked;
    } else {
      var someDirectoryMarked = this.entries.someDirectory(function(directory) {
        var directoryMarked = directory.isMarked();
        
        return directoryMarked;
      });

      marked = someDirectoryMarked;
    }
    
    return marked;
  }

  forEachFile(callback) { this.entries.forEachFile(callback); }

  forEachDirectory(callback) { this.entries.forEachDirectory(callback); }

  someDirectory(callback) { this.entries.someDirectory(callback); }

  addTopmostDirectory(path) {
    var topmostDirectory,
        topmostDirectoryName = util.topmostDirectoryName(path);

    if (topmostDirectoryName === null) {
      topmostDirectory = null;
    } else {
      var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

      if (!entriesDirectory) {
        var collapsed = true;

        this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
      }

      topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);
    }

    return topmostDirectory;
  }

  getMarkedDirectory() {
    var markedDirectory = this.entries.getMarkedDirectory();

    if (markedDirectory === null) {
      var marked = this.isMarked();
      
      if (marked) {
        markedDirectory = this;
      }
    }

    return markedDirectory;
  }

  getDirectoryOverlappingEntry(entry) {
    var directoryOverlappingEntry = null,
        overlappingEntry = this.isOverlappingEntry(entry);

    if (overlappingEntry) {
      directoryOverlappingEntry = this.entries.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingEntry === null) {
        directoryOverlappingEntry = this;
      }
    }

    return directoryOverlappingEntry;
  }
  
  toggleButtonUpdateHandler(collapsed) {
    collapsed ? 
      this.addClass('collapsed') : 
        this.removeClass('collapsed');
  }

  doubleClickHandler() {
    this.toggleButton.toggle();
  }

  static clone(name, collapsed, dragEventHandler, activateFileEventHandler) {
    var directory = Element.clone(Directory, '#directory', name, collapsed, dragEventHandler, activateFileEventHandler);

    directory.removeAttribute('id');

    return directory;
  }
}

module.exports = Directory;
