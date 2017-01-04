'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var options = require('../options'),
    Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/fileMarker'),
    DirectoryMarker = require('./entry/directoryMarker');

class Entries extends Element {
  constructor(parentElement, Directory) {
    super([parentElement, '>.entries']);

    this.Directory = Directory;
  }
  
  addFile(fileName, explorer, activateFileEventHandler) {
    var file = File.clone(fileName, explorer, activateFileEventHandler),
        entry = file; ///

    this.addEntry(entry);
  }

  addDirectory(directoryName, collapsed, explorer, activateFileEventHandler) {
    var directory = this.Directory.clone(directoryName, collapsed, explorer, activateFileEventHandler),
        entry = directory;  ///

    this.addEntry(entry);
  }

  removeFile(fileName) {
    var file = this.retrieveFile(fileName),
        explorer = file.getExplorer(),
        removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

    file.remove();
    
    return removeEmptyParentDirectories;
  }

  removeDirectory(directoryName) {
    var directory = this.retrieveDirectory(directoryName),
        explorer = directory.getExplorer(),
        removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

    directory.remove();

    return removeEmptyParentDirectories;
  }

  hasFile(fileName) {
    var file = this.retrieveFile(fileName);

    file = (file !== null); ///

    return file;
  }

  hasDirectory(directoryName) {
    var directory = this.retrieveDirectory(directoryName);
    
    directory = (directory !== null); ///

    return directory;
  }

  addMarker(markerName, draggableEntryType) {
    var marker;

    switch (draggableEntryType) {
      case Entry.types.FILE:
        marker = FileMarker.clone(markerName);
        break;

      case Entry.types.DIRECTORY:
        marker = DirectoryMarker.clone(markerName);
        break;
    }

    var entry = marker; ///

    this.addEntry(entry);
  }

  removeMarker() {
    var marker = this.retrieveMarker();

    marker.remove();
  }
  
  isMarked() {
    var marker = this.retrieveMarker(),
        marked = (marker!== null);

    return marked;
  }

  isEmpty() {
    var entries = this.getEntries(),
        entriesLength = entries.length,
        empty = (entriesLength === 0);

    return empty;
  }

  addEntry(entry) {
    var nextEntry = entry,
        previousEntry = undefined,
        entries = this.getEntries();

    entries.some(function(entry) {
      var nextEntryBefore = nextEntry.isBefore(entry);
      
      if (nextEntryBefore) {
        previousEntry = entry;

        return true;
      } else {
        return false;
      }
    });

    if (previousEntry === undefined) {
      this.append(nextEntry);
    } else {
      previousEntry.prependBefore(nextEntry);
    }
  }

  retrieveFile(fileName) { return this.retrieveEntryByType(fileName, Entry.types.FILE) }

  retrieveDirectory(directoryName) { return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY) }

  retrieveMarker() {
    var marker = null,
        type = Entry.types.MARKER;

    this.someEntryByType(function(entry) {
      marker = entry;  ///

      return true;
    }, type);

    return marker;
  }

  getMarkedDirectory() {
    var markedDirectory = null;

    this.someDirectory(function(directory) {
      markedDirectory = directory.getMarkedDirectory();

      if (markedDirectory !== null) {
        return true;
      } else {
        return false;
      }
    });

    return markedDirectory;
  }
  
  getDraggableEntryPath(draggableEntry) {
    var draggableEntryPath = null;
    
    this.someEntry(function(entry) {
      if (entry === draggableEntry) {  ///
        var entryName = entry.getName();
        
        draggableEntryPath = entryName;  ///
        
        return true;
      } else {
        return false;
      }
    });
    
    if (draggableEntryPath === null) {
      this.someDirectory(function(directory) {
        var directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);
        
        if (directoryDraggableEntryPath !== null) {
          draggableEntryPath = directoryDraggableEntryPath; ///
          
          return true;
        } else {
          return false;
        }
      });
    }
    
    return draggableEntryPath;
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    var directoryOverlappingDraggableEntry = null;

    this.someDirectory(function(directory) {
      directoryOverlappingDraggableEntry = directory.getDirectoryOverlappingDraggableEntry(draggableEntry);

      if (directoryOverlappingDraggableEntry !== null) {
        return true;
      } else {
        return false;
      }
    });

    return directoryOverlappingDraggableEntry;
  }

  forEachFile(callback) { this.forEachEntryByType(callback, Entry.types.FILE) }

  forEachDirectory(callback) { this.forEachEntryByType(callback, Entry.types.DIRECTORY) }

  someFile(callback) { return this.someEntryByType(callback, Entry.types.FILE) }

  someDirectory(callback) { return this.someEntryByType(callback, Entry.types.DIRECTORY) }

  forEachEntry(callback) {
    var entries = this.getEntries();

    entries.forEach(function(entry) {
      callback(entry);
    });
  }

  forEachEntryByType(callback, type) {
    var entries = this.getEntries();

    entries.forEach(function(entry) {
      var entryType = entry.getType();

      if (entryType === type) {
        callback(entry);
      }
    });
  }

  someEntry(callback, type) {
    var entries = this.getEntries();

    return entries.some(function(entry) {
      return callback(entry);
    });
  }

  someEntryByType(callback, type) {
    var entries = this.getEntries();

    return entries.some(function(entry) {
      var entryType = entry.getType();

      if (entryType === type) {
        return callback(entry);
      } else {
        return false;
      }
    });
  }

  retrieveEntryByType(name, type) {
    var foundEntry = null;

    this.someEntryByType(function(entry) {
      var entryName = entry.getName();

      if (entryName === name) {
        foundEntry = entry;

        return true;
      } else {
        return false;
      }
    }, type);

    var entry = foundEntry; ///

    return entry;
  }

  getEntries() {
    var childListElements = this.childElements('li'),
        entries = childListElements;  ///

    return entries;
  }
}

module.exports = Entries;
