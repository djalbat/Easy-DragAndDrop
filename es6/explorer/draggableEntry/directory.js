'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    ToggleButton = require('../toggleButton'),
    DraggableEntry = require('../draggableEntry');

class Directory extends DraggableEntry {
  constructor(selector, name, collapsed, explorer, activateFileEventHandler) {
    var type = Entry.types.DIRECTORY;

    super(selector, name, explorer, type);
    
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

  isOverlappingDraggableEntry(draggableEntry) {
    var overlappingDraggableEntry;
    
    if (this === draggableEntry) {
      overlappingDraggableEntry = false;
    } else {
      var collapsed = this.isCollapsed();
      
      if (collapsed) {
        overlappingDraggableEntry = false;
      } else {
        var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
            overlappingDraggableEntryCollapsedBounds = super.isOverlappingCollapsedBounds(draggableEntryCollapsedBounds);

        overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
      }
    }

    return overlappingDraggableEntry;
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
        var explorer = this.getExplorer();
        
        this.entries.addFile(fileName, explorer, this.activateFileEventHandler);
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
        var explorer = this.getExplorer();

        this.entries.addDirectory(directoryName, collapsed, explorer, this.activateFileEventHandler);
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
      var rootDirectory = this.isRootDirectory();

      if (!rootDirectory) {
        var empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
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
      var rootDirectory = this.isRootDirectory();

      if (!rootDirectory) {
        var empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }
  }
  
  addMarker(markerPath, draggableEntryType) {
    var topmostDirectoryName = util.topmostDirectoryName(markerPath);

    if (topmostDirectoryName === null) {
      var markerName = markerPath;  ///

      this.entries.addMarker(markerName, draggableEntryType);
    } else {
      var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
          markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, draggableEntryType);
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

  getDraggableEntryPath(draggableEntry) {
    var name = this.getName(),
        draggableEntryPath;
    
    if (draggableEntry === this) {
      draggableEntryPath = name;  ///
    } else {
      draggableEntryPath = this.entries.getDraggableEntryPath(draggableEntry);

      draggableEntryPath = name + '/' + draggableEntryPath;
    }

    return draggableEntryPath;
  }

  topmostDirectory(path, addIfNecessary) {
    var topmostDirectory,
        topmostDirectoryName = util.topmostDirectoryName(path);

    if (topmostDirectoryName === null) {
      topmostDirectory = null;
    } else {
      if (addIfNecessary) {
        var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

        if (!entriesDirectory) {
          var collapsed = true,
              explorer = this.getExplorer();

          this.entries.addDirectory(topmostDirectoryName, collapsed, explorer, this.activateFileEventHandler);
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

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    var directoryOverlappingDraggableEntry = null,
        overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

    if (overlappingDraggableEntry) {
      directoryOverlappingDraggableEntry = this.entries.getDirectoryOverlappingDraggableEntry(draggableEntry);

      if (directoryOverlappingDraggableEntry === null) {
        directoryOverlappingDraggableEntry = this;
      }
    }

    return directoryOverlappingDraggableEntry;
  }
  
  toggleButtonUpdateHandler(collapsed) {
    collapsed ? 
      this.addClass('collapsed') : 
        this.removeClass('collapsed');
  }

  doubleClickHandler() {
    this.toggleButton.toggle();
  }

  static clone(name, collapsed, explorer, activateFileEventHandler) {
    var directory = Element.clone(Directory, '#directory', name, collapsed, explorer, activateFileEventHandler);

    directory.removeAttribute('id');

    return directory;
  }
}

module.exports = Directory;
