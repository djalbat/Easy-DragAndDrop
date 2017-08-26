'use strict';

const easy = require('easy');

const options = require('../options'),
      Entry = require('./entry'),
      FileNameMarkerEntry = require('./entry/marker/fileName'),
      DirectoryNameMarkerEntry = require('./entry/marker/directoryName'),
      FileNameDraggableEntry = require('./draggableEntry/fileName');

const { Element, React } = easy,
      { types } = Entry,
      { REMOVE_EMPTY_PARENT_DIRECTORIES } = options,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = types;

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
          removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES),
          removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent; ///

    fileNameDraggableEntry.remove();
    
    return removeEmptyParentDirectories;
  }

  removeDirectoryNameDraggableEntry(directoryName) {
    let removeEmptyParentDirectories = false;
    
    const directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();
    
    if (directoryNameDraggableEntryEmpty) {
      const explorer = directoryNameDraggableEntry.getExplorer(),
            removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

      removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent;  ///

      directoryNameDraggableEntry.remove();
    }

    return removeEmptyParentDirectories;
  }

  isDraggableEntryPresent(name) {
    const draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = (draggableEntry !== null); ///

    return draggableEntryPresent;
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
      case FILE_NAME_TYPE:
        markerEntry = <FileNameMarkerEntry name={name} />;
        break;

      case DIRECTORY_NAME_TYPE:
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
            const nextEntryBeforeEntry = nextEntry.isBefore(entry),
                  found = nextEntryBeforeEntry; ///
            
            return found;
          });

    if (previousEntry === null) {
      this.append(nextEntry);
    } else {
      nextEntry.insertBefore(previousEntry);
    }
  }

  findMarkerEntry() {
    const markerEntry = this.findEntryByTypes(function(entry) {
            const found = true; ///
  
            return found;
          }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

    return markerEntry;
  }

  findDraggableEntry(name) { return this.findEntryByNameAndTypes(name, FILE_NAME_TYPE, DIRECTORY_NAME_TYPE) }

  findFileNameDraggableEntry(fileName) { return this.findEntryByNameAndTypes(fileName, FILE_NAME_TYPE) }

  findDirectoryNameDraggableEntry(directoryName) { return this.findEntryByNameAndTypes(directoryName, DIRECTORY_NAME_TYPE) }

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

  forEachFileNameDraggableEntry(callback) { this.forEachEntryByTypes(callback, FILE_NAME_TYPE) }

  forEachDirectoryNameDraggableEntry(callback) { this.forEachEntryByTypes(callback, DIRECTORY_NAME_TYPE) }

  someFileNameDraggableEntry(callback) { return this.someEntryByTypes(callback, FILE_NAME_TYPE) }

  someDirectoryNameDraggableEntry(callback) { return this.someEntryByTypes(callback, DIRECTORY_NAME_TYPE) }

  forEachEntryByTypes(callback, ...types) {
    const entries = this.getEntries();

    entries.forEach(function(entry) {
      const entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

      if (typesIncludesEntryType) {
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

  someEntryByTypes(callback, ...types) {
    const entries = this.getEntries();

    return entries.some(function(entry) {
      const entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

      if (typesIncludesEntryType) {
        const result = callback(entry);
        
        return result;
      }
    });
  }

  someEntry(callback) {
    const entries = this.getEntries();

    return entries.some(function(entry) {
      return callback(entry);
    });
  }

  findEntryByNameAndTypes(name, ...types) {
    const entry = this.findEntryByTypes(function(entry) {
      const entryName = entry.getName(),
            found = (entryName === name);
      
      return found;
    }, ...types);
    
    return entry;
  }

  findEntryByTypes(callback, ...types) {
    const entries = this.getEntries(),
          entry = entries.find(function(entry) {
            const entryType = entry.getType(),
                typesIncludesEntryType = types.includes(entryType);

            if (typesIncludesEntryType) {
              const found = callback(entry);
              
              return found;
            }
          }) || null; ///;
    
    return entry;
  }

  findEntryByName(name) {
    const entry = this.findEntry(function(entry) {
      const entryName = entry.getName(),
            found = (entryName === name);

      return found;
    });

    return entry;
  }

  findEntry(callback) {
    const entries = this.getEntries(),
          entry = entries.find(callback) || null; ///

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
