'use strict';

const easy = require('easy');

const options = require('../options'),
      Entry = require('./entry'),
      FileNameMarkerEntry = require('./entry/marker/fileName'),
      DirectoryNameMarkerEntry = require('./entry/marker/directoryName'),
      FileNameDraggableEntry = require('./draggableEntry/fileName');

const { Element, React } = easy;

class Entries extends Element {
  constructor(selector, DirectoryNameDraggableEntry) {
    super(selector);

    this.DirectoryNameDraggableEntry = DirectoryNameDraggableEntry;
  }
  
  addFileNameDraggableEntry(fileName, explorer, recognised, hidden) {
    const name = fileName,
          fileNameDraggableEntry = <FileNameDraggableEntry name={name} explorer={explorer} recognised={recognised} hidden={hidden} />,
          entry = fileNameDraggableEntry; ///

    this.addEntry(entry);
  }

  addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, hidden) {
    const name = directoryName,
          directoryNameDraggableEntry = <this.DirectoryNameDraggableEntry name={name} explorer={explorer} collapsed={collapsed} hidden={hidden} />,
          entry = directoryNameDraggableEntry;  ///
    
    this.addEntry(entry);
  }

  removeFileNameDraggableEntry(fileName) {
    const fileNameDraggableEntry = this.retrieveFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

    fileNameDraggableEntry.remove();
    
    return removeEmptyParentDirectories;
  }

  removeDirectoryNameDraggableEntry(directoryName) {
    let removeEmptyParentDirectories = false;
    
    const directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();
    
    if (directoryNameDraggableEntryEmpty) {
      const explorer = directoryNameDraggableEntry.getExplorer();
      
      removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directoryNameDraggableEntry.remove();
    }

    return removeEmptyParentDirectories;
  }

  isFileNameDraggableEntryPresent(fileName) {
    const fileNameDraggableEntry = this.retrieveFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = (fileNameDraggableEntry !== null); ///

    return fileNameDraggableEntryPresent;
  }

  isDirectoryNameDraggableEntryPresent(directoryName) {
    const directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),    
          directoryNameDraggableEntryPresent = (directoryNameDraggableEntry !== null); ///

    return directoryNameDraggableEntryPresent;
  }

  addMarkerEntry(markerName, draggableEntryType) {
    let markerEntry;
    
    const name = markerName;  ///

    switch (draggableEntryType) {
      case Entry.types.FILE_NAME:
        markerEntry = <FileNameMarkerEntry name={name} />;
        break;

      case Entry.types.DIRECTORY_NAME:
        markerEntry = <DirectoryNameMarkerEntry name={name} />;
        break;
    }

    const entry = markerEntry; ///

    this.addEntry(entry);
  }

  removeMarkerEntry() {
    const markerEntry = this.retrieveMarkerEntry();

    markerEntry.remove();
  }
  
  isMarked() {
    const marker = this.retrieveMarkerEntry(),
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
      }
    });

    if (previousEntry === null) {
      this.append(nextEntry);
    } else {
      nextEntry.insertBefore(previousEntry);
    }
  }

  retrieveFileNameDraggableEntry(fileName) { return this.retrieveEntryByType(fileName, Entry.types.FILE_NAME) }

  retrieveDirectoryNameDraggableEntry(directoryName) { return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY_NAME) }

  retrieveMarkerEntry() {
    let marker = null;
    
    const type = Entry.types.MARKER;

    this.someEntryByType(function(entry) {
      marker = entry;  ///

      return true;
    }, type);

    return marker;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    let markedDirectoryNameDraggableEntry = null;

    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();

      if (markedDirectoryNameDraggableEntry !== null) {
        return true;
      }
    });

    return markedDirectoryNameDraggableEntry;
  }
  
  retrieveDraggableEntryPath(draggableEntry) {
    let draggableEntryPath = null;
    
    this.someEntry(function(entry) {
      if (entry === draggableEntry) {  ///
        const entryName = entry.getName();
        
        draggableEntryPath = entryName;  ///
        
        return true;
      }
    });
    
    if (draggableEntryPath === null) {
      this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
        const directoryDraggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);
        
        if (directoryDraggableEntryPath !== null) {
          draggableEntryPath = directoryDraggableEntryPath; ///
          
          return true;
        }
      });
    }
    
    return draggableEntryPath;
  }

  retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    let directoryNameDraggableEntryOverlappingDraggableEntry = null;

    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

      if (directoryNameDraggableEntryOverlappingDraggableEntry !== null) {
        return true;
      }
    });

    return directoryNameDraggableEntryOverlappingDraggableEntry;
  }

  forEachFileNameDraggableEntry(callback) { this.forEachEntryByType(callback, Entry.types.FILE_NAME) }

  forEachDirectoryNameDraggableEntry(callback) { this.forEachEntryByType(callback, Entry.types.DIRECTORY_NAME) }

  someFileNameDraggableEntry(callback) { return this.someEntryByType(callback, Entry.types.FILE_NAME) }

  someDirectoryNameDraggableEntry(callback) { return this.someEntryByType(callback, Entry.types.DIRECTORY_NAME) }

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
        const result = callback(entry);
        
        return result;
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
    const { DirectoryNameDraggableEntry } = properties,
          entries = Element.fromProperties(Entries, properties, DirectoryNameDraggableEntry);
    
    return entries;
  }
}

Object.assign(Entries, {
  tagName: 'ul',
  defaultProperties: {
    className: 'entries'
  },
  ignoredProperties: [
    'DirectoryNameDraggableEntry'
  ]
});

module.exports = Entries;
