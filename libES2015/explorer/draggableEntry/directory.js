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

    this.toggleButton = new ToggleButton(this, function(collapsed) { collapsed ? this.addClass('collapsed') : this.removeClass('collapsed'); }.bind(this) );

    this.entries = new Entries(this, Directory);

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
        draggingBounds = bounds;

    if (!collapsed) {
      this.expand();
    }

    return draggingBounds;
  }

  isOverlappingEntry(entry) {
    if (this === entry) {
      return false;
    }
    
    var collapsed = this.isCollapsed();

    if (collapsed) {
      return false;
    }

    var draggingBounds = entry.getDraggingBounds();

    return super.isOverlappingDraggingBounds(draggingBounds);
  }

  isCollapsed() { return this.toggleButton.isCollapsed(); }

  expand() { this.toggleButton.expand(); }

  collapse() { this.toggleButton.collapse(); }

  addFile(filePath, readOnly) {
    var topmostDirectory = this.topmostDirectory(filePath);

    if (topmostDirectory !== null) {
      var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      topmostDirectory.addFile(filePathWithoutTopmostDirectoryName, readOnly);
    } else {
      this.entries.addFile(filePath, readOnly, this.dragEventHandler, this.activateFileEventHandler);
    }
  }

  addDirectory(directoryPath, collapsed) {
    var topmostDirectory = this.topmostDirectory(directoryPath);

    if (topmostDirectory !== null) {
      var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
    } else {
      var directoryName = directoryPath;  ///

      if (!this.entries.hasDirectory(directoryName)) {
        this.entries.addDirectory(directoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
      } else {
        var directory = this.entries.retrieveDirectory(directoryName);

        collapsed ? directory.collapse() : directory.expand();
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
    if (this.entries.hasMarker()) {
      this.entries.removeMarker();

      return true;
    } else {
      return this.entries.someDirectory(function(directory) {
        return directory.removeMarker();
      });
    }
  }

  hasMarker() {
    if (this.entries.hasMarker()) {
      return true;
    } else {
      return this.entries.someDirectory(function(directory) {
        return directory.hasMarker();
      })
    }
  }

  forEachFile(cb) { this.entries.forEachFile(cb); }

  forEachDirectory(cb) { this.entries.forEachDirectory(cb); }

  retrieveDirectory(directoryPath) {
    var topmostDirectoryName = util.topmostDirectoryName(directoryPath);

    if (topmostDirectoryName === null) {
      var name = this.getName(),
          directoryName = directoryPath;  ///

      if (name === directoryName) {
        return this;
      } else {
        return null;
      }
    } else {
      var directorPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath),
          retrievedDirectory = null;

      this.entries.someDirectory(function(directory) {
        retrievedDirectory = directory.retrieveDirectory(directorPathWithoutTopmostDirectoryName);

        if (retrievedDirectory !== null) {
          return true;
        } else {
          return false;
        }
      });

      return retrievedDirectory;
    }
  }

  topmostDirectory(path) {
    var topmostDirectoryName = util.topmostDirectoryName(path);

    if (topmostDirectoryName === null) {
      return null;
    } else {
      if (!this.entries.hasDirectory(topmostDirectoryName)) {
        var collapsed = true; ///

        this.entries.addDirectory(topmostDirectoryName, collapsed, this.dragEventHandler, this.activateFileEventHandler);
      }

      var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);

      return topmostDirectory;
    }
  }

  getDirectoryHavingMarker() {
    var directoryHavingMarker = this.entries.getDirectoryHavingMarker();

    if (directoryHavingMarker === null) {
      if (this.hasMarker()) {
        directoryHavingMarker = this;
      }
    }

    return directoryHavingMarker;
  }

  getDirectoryOverlappingEntry(entry) {
    var directoryOverlappingDraggingBounds = null,
        overlappingDraggingBounds = this.isOverlappingEntry(entry);

    if (overlappingDraggingBounds) {
      directoryOverlappingDraggingBounds = this.entries.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingDraggingBounds === null) {
        directoryOverlappingDraggingBounds = this;
      }
    }

    return directoryOverlappingDraggingBounds;
  }
}

Directory.clone = function(name, collapsed, dragEventHandler, activateFileEventHandler) {
  var directory = Element.clone(Directory, '#directory', name, collapsed, dragEventHandler, activateFileEventHandler);

  directory.removeAttribute('id');

  return directory;
};

module.exports = Directory;
