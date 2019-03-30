'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const options = require('./options'),
      entryTypes = require('./entryTypes'),
      FileNameMarkerEntry = require('./entry/marker/fileName'),
      FileNameDraggableEntry = require('./entry/draggable/fileName'),
      DirectoryNameMarkerEntry = require('./entry/marker/directoryName');

const { Element, React } = easy,
      { pathUtilities } = necessary,
      { REMOVE_EMPTY_PARENT_DIRECTORIES, NO_DRAGGING_INTO_SUB_DIRECTORIES } = options,
      { topmostDirectoryNameFromPath, pathWithoutTopmostDirectoryNameFromPath } = pathUtilities,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = entryTypes;

class Entries extends Element {
  isEmpty() {
    const entries = this.getEntries(),
        entriesLength = entries.length,
        empty = (entriesLength === 0);

    return empty;
  }

  isMarkerEntryPresent() {
    const markerEntry = this.findMarkerEntry(),
          markerEntryPresent = (markerEntry !== null);

    return markerEntryPresent;
  }

  isDraggableEntryPresent(name) {
    const draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = (draggableEntry !== null);

    return draggableEntryPresent;
  }

  isFileNameDraggableEntryPresent(fileName) {
    const fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = (fileNameDraggableEntry !== null);

    return fileNameDraggableEntryPresent;
  }

  isDirectoryNameDraggableEntryPresent(directoryName) {
    const directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = (directoryNameDraggableEntry !== null);

    return directoryNameDraggableEntryPresent;
  }

  addEntry(entry) {
    const nextEntry = entry,  ///
          previousEntry = this.findEntry(function(entry) {
            const nextEntryBeforeEntry = nextEntry.isBefore(entry);

            if (nextEntryBeforeEntry) {
              return true;
            }
          });

    if (previousEntry === null) {
      this.append(nextEntry);
    } else {
      nextEntry.insertBefore(previousEntry);
    }
  }

  addMarkerEntry(markerEntryName, draggableEntryType) {
    let markerEntry;

    const name = markerEntryName, ///
        type = draggableEntryType;  ///

    switch (type) {
      case FILE_NAME_TYPE :
        const fileNameMarkerEntry =

          <FileNameMarkerEntry name={name} />

        ;

        markerEntry = fileNameMarkerEntry;  ///

        break;

      case DIRECTORY_NAME_TYPE :
        const directoryNameMarkerEntry =

          <DirectoryNameMarkerEntry name={name} />

        ;

        markerEntry = directoryNameMarkerEntry; ///

        break;
    }

    const entry = markerEntry; ///

    this.addEntry(entry);
  }

  removeMarkerEntry() {
    const markerEntry = this.retrieveMarkerEntry();

    markerEntry.remove();
  }

  addFileNameDraggableEntry(fileName, explorer) {
    const name = fileName,
          fileNameDraggableEntry =

            <FileNameDraggableEntry name={name} explorer={explorer} />

          ,
          entry = fileNameDraggableEntry; ///

    this.addEntry(entry);

    return fileNameDraggableEntry;
  }

  removeFileNameDraggableEntry(fileName) {
    const fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES),
          removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent; ///

    fileNameDraggableEntry.remove();

    return removeEmptyParentDirectories;
  }

  addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry) {
    const name = directoryName,
          directoryNameDraggableEntry =

            <DirectoryNameDraggableEntry name={name} explorer={explorer} collapsed={collapsed} />

          ,
          entry = directoryNameDraggableEntry;  ///

    this.addEntry(entry);

    return directoryNameDraggableEntry;
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

  addMarker(markerEntryPath, draggableEntryType) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(markerEntryPath);

    if (topmostDirectoryName === null) {
      const markerEntryName = markerEntryPath;  ///

      this.addMarkerEntry(markerEntryName, draggableEntryType);
    } else {
      const topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);

      markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///

      topmostDirectoryNameDraggableEntry.addMarker(markerEntryPath, draggableEntryType);
    }
  }

  removeMarker() {
    this.removeMarkerEntry();
  }

  findMarkerEntry() {
    const markerEntry = this.findEntryByTypes(function(entry) {
            return true;  ///
          }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

    return markerEntry;
  }

  findDraggableEntryPath(draggableEntry) {
    let draggableEntryPath = null;

    this.someEntry(function(entry) {
      if (entry === draggableEntry) {  ///
        const entryName = entry.getName();

        draggableEntryPath = entryName;  ///

        return true;
      }
    });

    return draggableEntryPath;
  }

  findMarkedDirectoryNameDraggableEntry() {
    let markedDirectoryNameDraggableEntry = null;

    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      const directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

      if (directoryNameDraggableEntryMarked) {
        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry;  ///

        return true;
      }
    });

    return markedDirectoryNameDraggableEntry;
  }

  retrieveMarkerEntry() {
    let markerEntry = this.findMarkerEntry();

    if (markerEntry === null) {
      this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
        markerEntry = directoryNameDraggableEntry.retrieveMarkerEntry();

        if (markerEntry !== null) {
          return true;
        }
      });
    }

    return markerEntry;
  }

  retrieveDraggableEntryPath(draggableEntry) {
    let draggableEntryPath = this.findDraggableEntryPath(draggableEntry);

    if (draggableEntryPath === null) {
      this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
        draggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);

        if (draggableEntryPath !== null) {
          const directoryNameDraggableEntryName = directoryNameDraggableEntry.getName();

          draggableEntryPath = `${directoryNameDraggableEntryName}/${draggableEntryPath}`;

          return true;
        }
      });
    }

    return draggableEntryPath;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    let markedDirectoryNameDraggableEntry = this.findMarkedDirectoryNameDraggableEntry();

    if (markedDirectoryNameDraggableEntry === null) {
      this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();

        if (markedDirectoryNameDraggableEntry !== null) {
          return true;
        }
      });
    }

    return markedDirectoryNameDraggableEntry;
  }
  
  retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    let bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;

    this.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      const directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

      if (directoryNameDraggableEntryOverlappingDraggableEntry) {
        let dragIntoSubDirectories = true;

        const directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry = directoryNameDraggableEntry.isTopmostDirectoryNameDraggableEntry();

        if (directoryNameDraggableEntryTopmostDirectoryNameDraggableEntry) {
          const topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry,  ///
                explorer = topmostDirectoryNameDraggableEntry.getExplorer(),
                noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

          if (noDraggingIntoSubdirectoriesOptionPresent) {
            dragIntoSubDirectories = false;
          }
        }

        if (dragIntoSubDirectories) {
          bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
        }

        if (bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry === null) {
          bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry; ///
        }
      }
    });

    return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
  }

  forEachFileNameDraggableEntry(callback) { this.forEachEntryByTypes(callback, FILE_NAME_TYPE); }

  forEachDirectoryNameDraggableEntry(callback) { this.forEachEntryByTypes(callback, DIRECTORY_NAME_TYPE); }

  someFileNameDraggableEntry(callback) { return this.someEntryByTypes(callback, FILE_NAME_TYPE); }

  someDirectoryNameDraggableEntry(callback) { return this.someEntryByTypes(callback, DIRECTORY_NAME_TYPE); }

  findDraggableEntry(name) { return this.findEntryByNameAndTypes(name, FILE_NAME_TYPE, DIRECTORY_NAME_TYPE); }

  findFileNameDraggableEntry(fileName) { return this.findEntryByNameAndTypes(fileName, FILE_NAME_TYPE); }

  findDirectoryNameDraggableEntry(directoryName) { return this.findEntryByNameAndTypes(directoryName, DIRECTORY_NAME_TYPE); }

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
      const entryName = entry.getName();

      if (entryName === name) {
        return true;
      }
    }, ...types);
    
    return entry;
  }

  findEntryByTypes(callback, ...types) {
    const entries = this.getEntries(),
          entry = entries.find(function(entry) {
            const entryType = entry.getType(),
                  typesIncludesEntryType = types.includes(entryType);

            if (typesIncludesEntryType) {
              const result = callback(entry);

              if (result) {
                return true;
              }
            }
          }) || null; ///;
    
    return entry;
  }

  findEntryByName(name) {
    const entry = this.findEntry(function(entry) {
      const entryName = entry.getName();

      if (entryName === name) {
        return true;
      }
    });

    return entry;
  }

  findEntry(callback) {
    const entries = this.getEntries(),
          entry = entries.find(callback) || null; ///

    return entry;
  }

  getEntries() {
    const childEntryListItemElements = this.getChildElements('li.entry'),
          entries = childEntryListItemElements;  ///

    return entries;
  }
  
  parentContext() {
	  const isEmpty = this.isEmpty.bind(this),
          isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this),
				  isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this),
				  isFileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent.bind(this),
				  isDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent.bind(this),
          addMarker = this.addMarker.bind(this),
          removeMarker = this.removeMarker.bind(this),
				  addFileNameDraggableEntry = this.addFileNameDraggableEntry.bind(this),
				  removeFileNameDraggableEntry = this.removeFileNameDraggableEntry.bind(this),
				  addDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry.bind(this),
				  removeDirectoryNameDraggableEntry = this.removeDirectoryNameDraggableEntry.bind(this),
				  forEachFileNameDraggableEntry = this.forEachFileNameDraggableEntry.bind(this),
				  forEachDirectoryNameDraggableEntry = this.forEachDirectoryNameDraggableEntry.bind(this),
				  someDirectoryNameDraggableEntry = this.someDirectoryNameDraggableEntry.bind(this),
          findDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry.bind(this),
          retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this),
          retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this);

    return ({
      isEmpty,
      isMarkerEntryPresent,
      isDraggableEntryPresent,
      isFileNameDraggableEntryPresent,
      isDirectoryNameDraggableEntryPresent,
      addMarker,
      removeMarker,
      addFileNameDraggableEntry,
      removeFileNameDraggableEntry,
      addDirectoryNameDraggableEntry,
      removeDirectoryNameDraggableEntry,
      forEachFileNameDraggableEntry,
      forEachDirectoryNameDraggableEntry,
      someDirectoryNameDraggableEntry,
      findDirectoryNameDraggableEntry,
      retrieveMarkerEntry,
      retrieveDraggableEntryPath,
      retrieveMarkedDirectoryNameDraggableEntry,
      retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry
    });
  }

  static fromProperties(properties) { return Element.fromProperties(Entries, properties); }
}

Object.assign(Entries, {
  tagName: 'ul',
  defaultProperties: {
    className: 'entries'
  }
});

module.exports = Entries;
