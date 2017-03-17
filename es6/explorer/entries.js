'use strict';

const easyui = require('easyui'),
      Element = easyui.Element,
      React = easyui.React;

const options = require('../options'),
      Entry = require('./entry'),
      File = require('./draggableEntry/file'),
      FileMarker = require('./entry/marker/file'),
      DirectoryMarker = require('./entry/marker/directory');

class Entries extends Element {
  constructor(selector, Directory) {
    super(selector);

    this.Directory = Directory;
  }
  
  addFile(fileName, explorer) {
    const name = fileName,
          file = <File name={name} explorer={explorer} className="file" />,
          entry = file; ///

    this.addEntry(entry);
  }

  addDirectory(directoryName, explorer, collapsed) {
    const name = directoryName,
          directory = <this.Directory name={name} explorer={explorer} collapsed={collapsed} className="directory" />,
          entry = directory;  ///

    this.addEntry(entry);
  }

  removeFile(fileName) {
    const file = this.retrieveFile(fileName),
          explorer = file.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

    file.remove();
    
    return removeEmptyParentDirectories;
  }

  removeDirectory(directoryName) {
    const directory = this.retrieveDirectory(directoryName),
          explorer = directory.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

    directory.remove();

    return removeEmptyParentDirectories;
  }

  hasFile(fileName) {
    let file = this.retrieveFile(fileName);

    file = (file !== null); ///

    return file;
  }

  hasDirectory(directoryName) {
    let directory = this.retrieveDirectory(directoryName);
    
    directory = (directory !== null); ///

    return directory;
  }

  addMarker(markerName, draggableEntryType) {
    let marker;
    
    const name = markerName;  ///

    switch (draggableEntryType) {
      case Entry.types.FILE:
        marker = <FileMarker name={name} className="marker" />;
        break;

      case Entry.types.DIRECTORY:
        marker = <DirectoryMarker name={name} className="marker" />;
        break;
    }

    const entry = marker; ///

    this.addEntry(entry);
  }

  removeMarker() {
    const marker = this.retrieveMarker();

    marker.remove();
  }
  
  isMarked() {
    const marker = this.retrieveMarker(),
          marked = (marker!== null);

    return marked;
  }

  isEmpty() {
    const entries = this.getEntries(),
          entriesLength = entries.length,
          empty = (entriesLength === 0);

    return empty;
  }

  addEntry(entry) {
    const nextEntry = entry,
          entries = this.getEntries();

    let previousEntry = null;

    entries.some(function(entry) {
      const nextEntryBefore = nextEntry.isBefore(entry);
      
      if (nextEntryBefore) {
        previousEntry = entry;

        return true;
      } else {
        return false;
      }
    });

    if (previousEntry === null) {
      this.append(nextEntry);
    } else {
      nextEntry.insertBefore(previousEntry);
    }
  }

  retrieveFile(fileName) { return this.retrieveEntryByType(fileName, Entry.types.FILE) }

  retrieveDirectory(directoryName) { return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY) }

  retrieveMarker() {
    let marker = null;
    
    const type = Entry.types.MARKER;

    this.someEntryByType(function(entry) {
      marker = entry;  ///

      return true;
    }, type);

    return marker;
  }

  getMarkedDirectory() {
    let markedDirectory = null;

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
    let draggableEntryPath = null;
    
    this.someEntry(function(entry) {
      if (entry === draggableEntry) {  ///
        const entryName = entry.getName();
        
        draggableEntryPath = entryName;  ///
        
        return true;
      } else {
        return false;
      }
    });
    
    if (draggableEntryPath === null) {
      this.someDirectory(function(directory) {
        const directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);
        
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
    let directoryOverlappingDraggableEntry = null;

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
    const entries = this.getEntries();

    entries.forEach(function(entry) {
      callback(entry);
    });
  }

  forEachEntryByType(callback, type) {
    const entries = this.getEntries();

    entries.forEach(function(entry) {
      const entryType = entry.getType();

      if (entryType === type) {
        callback(entry);
      }
    });
  }

  someEntry(callback, type) {
    const entries = this.getEntries();

    return entries.some(function(entry) {
      return callback(entry);
    });
  }

  someEntryByType(callback, type) {
    const entries = this.getEntries();

    return entries.some(function(entry) {
      const entryType = entry.getType();

      if (entryType === type) {
        return callback(entry);
      } else {
        return false;
      }
    });
  }

  retrieveEntryByType(name, type) {
    let foundEntry = null;

    this.someEntryByType(function(entry) {
      const entryName = entry.getName();

      if (entryName === name) {
        foundEntry = entry;

        return true;
      } else {
        return false;
      }
    }, type);

    const entry = foundEntry; ///

    return entry;
  }

  getEntries() {
    const childListElements = this.getChildElements('li'),
          entries = childListElements;  ///

    return entries;
  }

  static fromProperties(properties) {
    const { Directory } = properties;
    
    return Element.fromProperties(Entries, properties, Directory);
  }
}

Object.assign(Entries, {
  tagName: 'ul',
  ignoredAttributes: [
    'Directory'
  ]
});

module.exports = Entries;
