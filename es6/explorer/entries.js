'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/fileMarker'),
    DirectoryMarker = require('./entry/directoryMarker');

class Entries extends Element {
  constructor(parentElement, Directory) {
    super([parentElement, '>.entries']);

    this.Directory = Directory;
  }
  
  addFile(fileName, dragEventHandler, activateFileEventHandler) {
    var file = File.clone(fileName, dragEventHandler, activateFileEventHandler),
        entry = file; ///

    this.addEntry(entry);
  }

  removeFile(fileName) {
    var file = this.retrieveFile(fileName);

    file.remove();
  }

  addDirectory(directoryName, collapsed, dragEventHandler, activateFileEventHandler) {
    var directory = this.Directory.clone(directoryName, collapsed, dragEventHandler, activateFileEventHandler),
        entry = directory;  ///

    this.addEntry(entry);
  }

  removeDirectory(directoryName) {
    var directory = this.retrieveDirectory(directoryName);

    directory.remove();
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

  addMarker(markerName, entryType) {
    var marker;

    switch (entryType) {
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

  getDirectoryOverlappingEntry(entry) {
    var directoryOverlappingEntry = null;

    this.someDirectory(function(directory) {
      directoryOverlappingEntry = directory.getDirectoryOverlappingEntry(entry);

      if (directoryOverlappingEntry !== null) {
        return true;
      } else {
        return false;
      }
    });

    return directoryOverlappingEntry;
  }

  forEachFile(callback) { this.forEachEntryByType(callback, Entry.types.FILE) }

  forEachDirectory(callback) { this.forEachEntryByType(callback, Entry.types.DIRECTORY) }

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
