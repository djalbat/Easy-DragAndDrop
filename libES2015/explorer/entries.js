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

  addFile(fileName, readOnly, dragEventHandler, activateFileEventHandler) {
    var file = File.clone(fileName, readOnly, dragEventHandler, activateFileEventHandler),
        entry = file; ///

    this.addEntry(entry);
  }

  addDirectory(directoryName, collapsed, dragEventHandler, activateFileEventHandler) {
    var directory = this.Directory.clone(directoryName, collapsed, dragEventHandler, activateFileEventHandler),
        entry = directory;  ///

    this.addEntry(entry);
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

  hasMarker() {
    var marker = this.retrieveMarker();

    return !!marker;  ///
  }

  hasDirectory(directoryName) {
    var directory = this.retrieveDirectory(directoryName);

    return !!directory; ///
  }

  addEntry(entry) {
    var nextEntry = entry,
        previousEntry = undefined,
        childElements = this.childElements('li'),
        entries = childElements;  ///

    entries.some(function(entry) {
      if (nextEntry.isBefore(entry)) {
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
    var marker = undefined,
        type = Entry.types.MARKER;

    this.someEntryByType(function(entry) {
      marker = entry;  ///

      return true;
    }, type);

    return marker;
  }

  directoryOverlappingEntry(entry) {
    var directoryOverlappingEntry = null;

    this.someDirectory(function(directory) {
      directoryOverlappingEntry = directory.directoryOverlappingEntry(entry);
      
      if (directoryOverlappingEntry !== null) {
        return true;
      } else {
        return false;
      }
    });
    
    return directoryOverlappingEntry;
  }

  directoryHavingMarker(entry) {
    var directoryHavingMarker = null;

    this.someDirectory(function(directory) {
      directoryHavingMarker = directory.directoryHavingMarker(entry);

      if (directoryHavingMarker !== null) {
        return true;
      } else {
        return false;
      }
    });

    return directoryHavingMarker;
  }

  forEachFile(cb) { this.forEachEntryByType(cb, Entry.types.FILE) }

  forEachDirectory(cb) { this.forEachEntryByType(cb, Entry.types.DIRECTORY) }

  someDirectory(cb) { return this.someEntryByType(cb, Entry.types.DIRECTORY) }

  forEachEntry(cb) {
    var childElements = this.childElements('li'),
        entries = childElements;  ///

    entries.forEach(function(entry) {
      cb(entry);
    });
  }

  forEachEntryByType(cb, type) {
    var childElements = this.childElements('li'),
        entries = childElements;  ///

    entries.forEach(function(entry) {
      var entryType = entry.getType();

      if (entryType === type) {
        cb(entry);
      }
    });
  }

  someEntryByType(cb, type) {
    var childElements = this.childElements('li'),
        entries = childElements;  ///

    return entries.some(function(entry) {
      var entryType = entry.getType();

      if (entryType === type) {
        return cb(entry);
      } else {
        return false;
      }
    });
  }

  retrieveEntryByType(name, type) {
    var foundEntry = undefined;

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
}

module.exports = Entries;
