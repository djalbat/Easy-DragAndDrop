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

  getCollapsedBounds() {
    var collapsed = this.isCollapsed();

    this.collapse();

    var bounds = super.getBounds(),
        collapsedBounds = bounds;  ///

    if (!collapsed) {
      this.expand();
    }

    return collapsedBounds;
  }

  isOverlappingEntry(entry) {
    var overlappingEntry;
    
    if (this === entry) {
      overlappingEntry = false;
    } else {
      var collapsed = this.isCollapsed();
      
      if (collapsed) {
        overlappingEntry = false;
      } else {
        var entryCollapsedBounds = entry.getCollapsedBounds(),
            overlappingCollapsedBounds = super.isOverlappingCollapsedBounds(entryCollapsedBounds);

        overlappingEntry = overlappingCollapsedBounds;
      }
    }

    return overlappingEntry;
  }

  isCollapsed() { return this.toggleButton.isCollapsed(); }

  expand() { this.toggleButton.expand(); }

  collapse() { this.toggleButton.collapse(); }

  addFile(filePath) {
    var addIfNecessary = true,
        topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

    if (topmostDirectory !== null) {
      var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      topmostDirectory.addFile(filePathWithoutTopmostDirectoryName);
    } else {
      var fileName = filePath,  ///
          entriesFile = this.entries.hasFile(fileName);

      if (!entriesFile) {
        this.entries.addFile(fileName, this.dragEventHandler, this.activateFileEventHandler);
      }
    }
  }

  addDirectory(directoryPath, collapsed) {
    var addIfNecessary = true,
        topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

    if (topmostDirectory !== null) {
      var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
    } else {
      var directoryName = directoryPath,  ///
          entriesDirectory = this.entries.hasDirectory(directoryName);

      if (!entriesDirectory) {
        this.entries.addDirectory(directoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
      }
    }
  }

  removeFile(filePath, removeEmptyParentDirectories) {
    var addIfNecessary = false,
        topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

    if (topmostDirectory !== null) {
      var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      topmostDirectory.removeFile(filePathWithoutTopmostDirectoryName, removeEmptyParentDirectories);
    } else {
      var fileName = filePath,  ///
          entriesFile = this.entries.hasFile(fileName);

      if (entriesFile) {
        this.entries.removeFile(fileName);
      }
    }

    if (removeEmptyParentDirectories) {
      var empty = this.isEmpty();

      if (empty) {
        this.remove();
      }
    }
  }

  removeDirectory(directoryPath, removeEmptyParentDirectories) {
    var addIfNecessary = false,
        topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

    if (topmostDirectory !== null) {
      var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName, removeEmptyParentDirectories);
    } else {
      var directoryName = directoryPath,  ///
          entriesDirectory = this.entries.hasDirectory(directoryName);

      if (entriesDirectory) {
        this.entries.removeDirectory(directoryName);
      }
    }

    if (removeEmptyParentDirectories) {
      var empty = this.isEmpty();

      if (empty) {
        this.remove();
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

  isEmpty() { return this.entries.isEmpty(); }

  forEachFile(callback) { this.entries.forEachFile(callback); }

  forEachDirectory(callback) { this.entries.forEachDirectory(callback); }

  someDirectory(callback) { this.entries.someDirectory(callback); }

  topmostDirectory(path, addIfNecessary) {
    var topmostDirectory,
        topmostDirectoryName = util.topmostDirectoryName(path);

    if (topmostDirectoryName === null) {
      topmostDirectory = null;
    } else {
      if (addIfNecessary) {
        var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

        if (!entriesDirectory) {
          var collapsed = true;

          this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
        }
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
