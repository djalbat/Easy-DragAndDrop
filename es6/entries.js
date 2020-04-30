"use strict";

const easy = require("easy"),
      necessary = require("necessary");

const types = require("./types"),
      options = require("./options"),
      FileNameMarkerEntry = require("./entry/marker/fileName"),
      FileNameDraggableEntry = require("./entry/draggable/fileName"),
      DirectoryNameMarkerEntry = require("./entry/marker/directoryName");

const { Element, React } = easy,
      { pathUtilities } = necessary,
      { REMOVE_EMPTY_PARENT_DIRECTORIES, NO_DRAGGING_INTO_SUB_DIRECTORIES } = options,
      { topmostDirectoryNameFromPath, pathWithoutTopmostDirectoryNameFromPath } = pathUtilities,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = types;

class Entries extends Element {
  constructor(selector, explorer) {
    super(selector);

    this.explorer = explorer;
  }

  getExplorer() {
    return this.explorer;
  }

  getEntries() {
    const childEntryListItemElements = this.getChildElements("li.entry"),
          entries = childEntryListItemElements;  ///

    return entries;
  }

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
          previousEntry = this.findEntry((entry) => {
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

  addFileNameDraggableEntry(fileName) {
    const name = fileName,
          explorer = this.explorer,
          fileNameDraggableEntry =

            <FileNameDraggableEntry name={name} explorer={explorer} />

          ,
          entry = fileNameDraggableEntry; ///

    this.addEntry(entry);

    return fileNameDraggableEntry;
  }

  addDirectoryNameDraggableEntry(directoryName, collapsed) {
    const name = directoryName,
          explorer = this.explorer, ///
          DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry(),
          directoryNameDraggableEntry =

            <DirectoryNameDraggableEntry name={name} collapsed={collapsed} explorer={explorer} />

          ,
          entry = directoryNameDraggableEntry;  ///

    this.addEntry(entry);

    return directoryNameDraggableEntry;
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

  addFilePath(filePath) {
    let fileNameDraggableEntry = null;

    const topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (topmostDirectoryNameEntry !== null) {
      if (filePathWithoutTopmostDirectoryName !== null) {
        const topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
          filePath = filePathWithoutTopmostDirectoryName; ///

          fileNameDraggableEntry = topmostDirectoryNameEntry.addFilePath(filePath);
        }
      }
    } else {
      if (topmostDirectoryName !== null) {
        let topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

        if (topmostDirectoryNameDraggableEntry === null) {
          const collapsed = true; ///

          topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, collapsed);
        }

        const filePath = filePathWithoutTopmostDirectoryName; ///

        fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePath);
      } else {
        const fileName = filePath,  ///
              fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

        fileNameDraggableEntry = fileNameDraggableEntryPresent ?
                                   this.findFileNameDraggableEntry(fileName) :
                                     this.addFileNameDraggableEntry(fileName);
      }
    }

    return fileNameDraggableEntry;
  }

  removeFilePath(filePath) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (topmostDirectoryName !== null) {
      const directoryName = topmostDirectoryName, ///
            directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

      if (directoryNameDraggableEntry !== null) {
        filePath = filePathWithoutTopmostDirectoryName; ///

        directoryNameDraggableEntry.removeFilePath(filePath);

        const removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

        if (removeEmptyParentDirectoriesOptionPresent) {
          const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry();

          if (directoryNameDraggableEntry !== topmostDirectoryNameDraggableEntry) {
            const directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

            if (directoryNameDraggableEntryEmpty) {
              directoryNameDraggableEntry.remove();
            }
          }
        }
      }
    } else {
      const fileName = filePath,  ///
            fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName);

      if (fileNameDraggableEntry !== null) {
        fileNameDraggableEntry.remove();
      }
    }
  }

  addDirectoryPath(directoryPath, collapsed = false) {
    let directoryNameDraggableEntry = null;

    const topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (topmostDirectoryNameEntry !== null) {
      if (directoryPathWithoutTopmostDirectoryName !== null) {
        const topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
          directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry = topmostDirectoryNameEntry.addDirectoryPath(directoryPath, collapsed);
        }
      }
    } else {
      if (topmostDirectoryName !== null) {
        let topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

        if (topmostDirectoryNameDraggableEntry === null) {
          const collapsed = true; ///

          topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, collapsed);
        }

        const directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPath, collapsed);
      } else {
        const directoryName = directoryPath,  ///
              directoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);

        directoryNameDraggableEntry = directoryNameDraggableEntryPresent ?
                                        this.findDirectoryNameDraggableEntry(directoryName) :
                                          this.addDirectoryNameDraggableEntry(directoryName, collapsed);


        directoryNameDraggableEntry.setCollapsed(collapsed);
      }
    }

    return directoryNameDraggableEntry;
  }

  removeDirectoryPath(directoryPath) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (topmostDirectoryName !== null) {
      const directoryName = topmostDirectoryName, ///
            directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

      if (directoryNameDraggableEntry !== null) {
        directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        directoryNameDraggableEntry.removeDirectoryPath(directoryPath);

        const removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

        if (removeEmptyParentDirectoriesOptionPresent) {
          const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry();

          if (directoryNameDraggableEntry !== topmostDirectoryNameDraggableEntry) {
            const directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

            if (directoryNameDraggableEntryEmpty) {
              directoryNameDraggableEntry.remove();
            }
          }
        }
      }
    } else {
      const directoryName = directoryPath,  ///
            directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

      if (directoryNameDraggableEntry !== null) {
        directoryNameDraggableEntry.remove();
      }
    }
  }

  findMarkerEntry() {
    const markerEntry = this.findEntryByTypes((entry) => {
            return true;  ///
          }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

    return markerEntry;
  }

  findDraggableEntryPath(draggableEntry) {
    let draggableEntryPath = null;

    this.someEntry((entry) => {
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

    this.someDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
      const directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

      if (directoryNameDraggableEntryMarked) {
        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry;  ///

        return true;
      }
    });

    return markedDirectoryNameDraggableEntry;
  }

  findTopmostDirectoryNameDraggableEntry() {
    let topmostDirectoryNameDraggableEntry = null;

    this.someDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
      const directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

      if (directoryNameDraggableEntryTopmost) {
        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry;  ///

        return true;
      }
    });

    return topmostDirectoryNameDraggableEntry;
  }

  retrieveMarkerEntry() {
    let markerEntry = this.findMarkerEntry();

    if (markerEntry === null) {
      this.someDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
        markerEntry = directoryNameDraggableEntry.retrieveMarkerEntry();

        if (markerEntry !== null) {
          return true;
        }
      });
    }

    return markerEntry;
  }

  retrieveFilePaths(filePaths = []) {
    this.forEachFileNameDraggableEntry((fileNameDraggableEntry) => {
      const fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
            filePath = fileNameDraggableEntryPath;  ///

      filePaths.push(filePath);
    });

    this.forEachDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
      directoryNameDraggableEntry.retrieveFilePaths(filePaths);
    });

    return filePaths;
  }

  retrieveDirectoryPaths(directoryPaths = []) {
    this.forEachDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
      const directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(),
            directoryPath = directoryNameDraggableEntryPath;  ///

      directoryPaths.push(directoryPath);

      directoryNameDraggableEntry.retrieveDirectoryPaths(directoryPaths);
    });

    return directoryPaths;
  }

  retrieveDraggableEntryPath(draggableEntry) {
    let draggableEntryPath = this.findDraggableEntryPath(draggableEntry);

    if (draggableEntryPath === null) {
      this.someDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
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

  retrieveDraggableSubEntries(subEntries = []) {
    this.forEachFileNameDraggableEntry((fileNameDraggableEntry) => {
      const subEntry = fileNameDraggableEntry; ///

      subEntries.push(subEntry);
    });

    this.forEachDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
      const subEntry = directoryNameDraggableEntry; ///

      subEntries.push(subEntry);

      directoryNameDraggableEntry.retrieveDraggableSubEntries(subEntries);
    });

    return subEntries;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    let markedDirectoryNameDraggableEntry = this.findMarkedDirectoryNameDraggableEntry();

    if (markedDirectoryNameDraggableEntry === null) {
      this.someDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
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

    this.someDirectoryNameDraggableEntry((directoryNameDraggableEntry) => {
      const directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

      if (directoryNameDraggableEntryOverlappingDraggableEntry) {
        let dragIntoSubDirectories = true;

        const directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

        if (directoryNameDraggableEntryTopmost) {
          const noDraggingIntoSubdirectoriesOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

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

    entries.forEach((entry) => {
      const entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

      if (typesIncludesEntryType) {
        callback(entry);
      }
    });
  }

  forEachEntry(callback) {
    const entries = this.getEntries();

    entries.forEach((entry) => {
      callback(entry);
    });
  }

  someEntryByTypes(callback, ...types) {
    const entries = this.getEntries();

    return entries.some((entry) => {
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

    return entries.some((entry) => {
      return callback(entry);
    });
  }

  findEntryByNameAndTypes(name, ...types) {
    const entry = this.findEntryByTypes((entry) => {
      const entryName = entry.getName();

      if (entryName === name) {
        return true;
      }
    }, ...types);
    
    return entry;
  }

  findEntryByTypes(callback, ...types) {
    const entries = this.getEntries(),
          entry = entries.find((entry) => {
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
    const entry = this.findEntry((entry) => {
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

  parentContext() {
	  const getExplorer = this.getExplorer.bind(this),
          isEmpty = this.isEmpty.bind(this),
          addMarker = this.addMarker.bind(this),
          removeMarker = this.removeMarker.bind(this),
          addFilePath = this.addFilePath.bind(this),
          removeFilePath = this.removeFilePath.bind(this),
          addDirectoryPath = this.addDirectoryPath.bind(this),
          removeDirectoryPath = this.removeDirectoryPath.bind(this),
          isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this),
          isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this),
          findTopmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry.bind(this),
          retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this),
          retrieveFilePaths = this.retrieveFilePaths.bind(this),
          retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this),
          retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          retrieveDraggableSubEntries = this.retrieveDraggableSubEntries.bind(this),
          retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this);

    return ({
      getExplorer,
      isEmpty,
      addMarker,
      removeMarker,
      addFilePath,
      removeFilePath,
      addDirectoryPath,
      removeDirectoryPath,
      isMarkerEntryPresent,
      isDraggableEntryPresent,
      findTopmostDirectoryNameDraggableEntry,
      retrieveMarkerEntry,
      retrieveFilePaths,
      retrieveDirectoryPaths,
      retrieveDraggableEntryPath,
      retrieveDraggableSubEntries,
      retrieveMarkedDirectoryNameDraggableEntry,
      retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry
    });
  }

  static fromProperties(properties) {
    const { explorer } = properties,
          entries = Element.fromProperties(Entries, properties, explorer);

    return entries;
  }
}

Object.assign(Entries, {
  tagName: "ul",
  defaultProperties: {
    className: "entries"
  }
});

module.exports = Entries;
