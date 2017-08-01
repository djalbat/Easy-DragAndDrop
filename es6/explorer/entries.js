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
  
  addFileNameDraggableEntry(fileName, explorer, recognised) {
    const name = fileName,
          fileNameDraggableEntry = <FileNameDraggableEntry name={name} explorer={explorer} recognised={recognised} />,
          entry = fileNameDraggableEntry; ///

    this.addEntry(entry);
  }

  addDirectoryNameDraggableEntry(directoryName, explorer, collapsed) {
    const name = directoryName,
          directoryNameDraggableEntry = <this.DirectoryNameDraggableEntry name={name} explorer={explorer} collapsed={collapsed} />,
          entry = directoryNameDraggableEntry;  ///
    
    this.addEntry(entry);
  }

  removeFileNameDraggableEntry(fileName) {
    const fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

    fileNameDraggableEntry.remove();
    
    return removeEmptyParentDirectories;
  }

  removeDirectoryNameDraggableEntry(directoryName) {
    let removeEmptyParentDirectories = false;
    
    const directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();
    
    if (directoryNameDraggableEntryEmpty) {
      const explorer = directoryNameDraggableEntry.getExplorer();
      
      removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directoryNameDraggableEntry.remove();
    }

    return removeEmptyParentDirectories;
  }

  isFileNameDraggableEntryPresent(fileName) {
    const fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = (fileNameDraggableEntry !== null); ///

    return fileNameDraggableEntryPresent;
  }

  isDirectoryNameDraggableEntryPresent(directoryName) {
    const directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),    
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
    const markerEntry = this.findMarkerEntry();

    markerEntry.remove();
  }
  
  isMarked() {
    const markerEntry = this.findMarkerEntry(),
          marked = (markerEntry!== null);

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
          previousEntry = this.findEntry(function(entry) {
            const entryBeforeNextEntry = entry.isBefore(nextEntry),
                  found = entryBeforeNextEntry; ///
            
            return found;
          });

    if (previousEntry === null) {
      this.prepend(nextEntry);
    } else {
      nextEntry.insertAfter(previousEntry);
    }
  }

  findMarkerEntry() {
    const type = Entry.types.MARKER,
          markerEntry = this.findEntryByType(function(entry) {
            const found = true; ///
  
            return found;
          }, type);

    return markerEntry;
  }

  findFileNameDraggableEntry(fileName) { return this.findEntryByNameAndType(fileName, Entry.types.FILE_NAME) }

  findDirectoryNameDraggableEntry(directoryName) { return this.findEntryByNameAndType(directoryName, Entry.types.DIRECTORY_NAME) }

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

  forEachEntryByType(callback, type) {
    const entries = this.getEntries();

    entries.forEach(function(entry) {
      const entryType = entry.getType();

      if (entryType === type) {
        callback(entry);
      }
    });
  }

  forEachEntry(callback) {
    const entries = this.getEntries();

    entries.forEach(function(entry) {
      callback(entry);
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

  someEntry(callback, type) {
    const entries = this.getEntries();

    return entries.some(function(entry) {
      return callback(entry);
    });
  }

  findEntryByNameAndType(name, type) {
    const entry = this.findEntryByType(function(entry) {
      const entryName = entry.getName(),
            found = (entryName === name);
      
      return found;
    }, type);
    
    return entry;
  }

  findEntryByType(callback, type) {
    const entries = this.getEntries(),
          entry = entries.find(function(entry) {
            const entryType = entry.getType();
            
            if (entryType === type) {
              const found = callback(entry);
              
              return found;
            }
          }) || null;
    
    return entry;
  }

  findEntry(callback) {
    const entries = this.getEntries(),
          entry = entries.find(callback) || null;

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
