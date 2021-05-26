"use strict";

import withStyle from "easy-with-style";  ///

import { Element } from "easy";
import { pathUtilities } from "necessary";

import { REMOVE_EMPTY_PARENT_DIRECTORIES, NO_DRAGGING_INTO_SUB_DIRECTORIES } from "./options";
import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "./types";

const { topmostDirectoryNameFromPath, pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

class Entries extends Element {
  getExplorer() {
    const { explorer } = this.properties;

    return explorer;
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

  isDragEntryPresent(name) {
    const dragEntry = this.findDragEntry(name),
          dragEntryPresent = (dragEntry !== null);

    return dragEntryPresent;
  }

  isFileNameDragEntryPresent(fileName) {
    const fileNameDragEntry = this.findFileNameDragEntry(fileName),
          fileNameDragEntryPresent = (fileNameDragEntry !== null);

    return fileNameDragEntryPresent;
  }

  isDirectoryNameDragEntryPresent(directoryName) {
    const directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName),
          directoryNameDragEntryPresent = (directoryNameDragEntry !== null);

    return directoryNameDragEntryPresent;
  }

  expand() {
    this.removeClass("collapsed");
  }

  collapse() {
    this.addClass("collapsed");
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
      this.append(entry);
    } else {
      entry.insertBefore(previousEntry);
    }

    entry.didMount && entry.didMount(); ///
  }

  removeEntry(entry) {
    entry.willUnmount && entry.willUnmount();  ///

    entry.remove();
  }

  addMarkerEntry(markerEntryName, dragEntryType) {
    let markerEntry;

    const name = markerEntryName, ///
          type = dragEntryType;  ///

    switch (type) {
      case FILE_NAME_TYPE : {
        const explorer = this.getExplorer(),
              FileNameMarkerEntry = explorer.getFileNameMarkerEntry(),
              fileNameMarkerEntry =

                <FileNameMarkerEntry name={name} />

              ;

        markerEntry = fileNameMarkerEntry;  ///

        break;
      }

      case DIRECTORY_NAME_TYPE : {
        const explorer = this.getExplorer(),
              DirectoryNameMarkerEntry = explorer.getDirectoryNameMarkerEntry(),
              directoryNameMarkerEntry =

                <DirectoryNameMarkerEntry name={name} />

              ;

        markerEntry = directoryNameMarkerEntry; ///

        break;
      }
    }

    const entry = markerEntry; ///

    this.addEntry(entry);
  }

  removeMarkerEntry() {
    const markerEntry = this.retrieveMarkerEntry();

    markerEntry.remove();
  }

  addMarker(markerEntryPath, dragEntryType) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(markerEntryPath);

    if (topmostDirectoryName === null) {
      const markerEntryName = markerEntryPath;  ///

      this.addMarkerEntry(markerEntryName, dragEntryType);
    } else {
      const topmostDirectoryNameDragEntry = this.findDirectoryNameDragEntry(topmostDirectoryName),
            markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);

      markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///

      topmostDirectoryNameDragEntry.addMarker(markerEntryPath, dragEntryType);
    }
  }

  removeMarker() {
    this.removeMarkerEntry();
  }

  addFilePath(filePath) {
    let fileNameDragEntry = null;

    const topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDragEntry(),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (topmostDirectoryNameEntry !== null) {
      if (filePathWithoutTopmostDirectoryName !== null) {
        const topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
          filePath = filePathWithoutTopmostDirectoryName; ///

          fileNameDragEntry = topmostDirectoryNameEntry.addFilePath(filePath);
        }
      }
    } else {
      if (topmostDirectoryName !== null) {
        let topmostDirectoryNameDragEntry = this.findDirectoryNameDragEntry(topmostDirectoryName);

        if (topmostDirectoryNameDragEntry === null) {
          const collapsed = true; ///

          topmostDirectoryNameDragEntry = this.createDirectoryNameDragEntry(topmostDirectoryName, collapsed);

          this.addEntry(topmostDirectoryNameDragEntry);
        }

        const filePath = filePathWithoutTopmostDirectoryName; ///

        fileNameDragEntry = topmostDirectoryNameDragEntry.addFilePath(filePath);
      } else {
        const fileName = filePath,  ///
              fileNameDragEntryPresent = this.isFileNameDragEntryPresent(fileName);

        if (fileNameDragEntryPresent) {
          fileNameDragEntry = this.findFileNameDragEntry(fileName);
        } else {
          fileNameDragEntry = this.createFileNameDragEntry(fileName);

          this.addEntry(fileNameDragEntry);
        }
      }
    }

    return fileNameDragEntry;
  }

  removeFilePath(filePath) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

    if (topmostDirectoryName !== null) {
      const directoryName = topmostDirectoryName, ///
            directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);

      if (directoryNameDragEntry !== null) {
        filePath = filePathWithoutTopmostDirectoryName; ///

        directoryNameDragEntry.removeFilePath(filePath);

        const explorer = this.getExplorer(),
              removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

        if (removeEmptyParentDirectoriesOptionPresent) {
          const topmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry();

          if (directoryNameDragEntry !== topmostDirectoryNameDragEntry) {
            const directoryNameDragEntryEmpty = directoryNameDragEntry.isEmpty();

            if (directoryNameDragEntryEmpty) {
              this.removeEntry(directoryNameDragEntry);
            }
          }
        }
      }
    } else {
      const fileName = filePath,  ///
            fileNameDragEntry = this.findFileNameDragEntry(fileName);

      if (fileNameDragEntry !== null) {
        this.removeEntry(fileNameDragEntry);
      }
    }
  }

  addDirectoryPath(directoryPath, collapsed = false) {
    let directoryNameDragEntry = null;

    const topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDragEntry(),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (topmostDirectoryNameEntry !== null) {
      if (directoryPathWithoutTopmostDirectoryName !== null) {
        const topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

        if (topmostDirectoryName === topmostDirectoryNameEntryName) {
          directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          directoryNameDragEntry = topmostDirectoryNameEntry.addDirectoryPath(directoryPath, collapsed);
        }
      }
    } else {
      if (topmostDirectoryName !== null) {
        let topmostDirectoryNameDragEntry = this.findDirectoryNameDragEntry(topmostDirectoryName);

        if (topmostDirectoryNameDragEntry === null) {
          const collapsed = true; ///

          topmostDirectoryNameDragEntry = this.createDirectoryNameDragEntry(topmostDirectoryName, collapsed);

          this.addEntry(topmostDirectoryNameDragEntry);
        }

        const directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        directoryNameDragEntry = topmostDirectoryNameDragEntry.addDirectoryPath(directoryPath, collapsed);
      } else {
        const directoryName = directoryPath,  ///
              directoryNameDragEntryPresent = this.isDirectoryNameDragEntryPresent(directoryName);

        if (directoryNameDragEntryPresent) {
          directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);
        } else {
          directoryNameDragEntry = this.createDirectoryNameDragEntry(directoryName, collapsed);

          this.addEntry(directoryNameDragEntry);
        }

        directoryNameDragEntry.setCollapsed(collapsed);
      }
    }

    return directoryNameDragEntry;
  }

  removeDirectoryPath(directoryPath) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

    if (topmostDirectoryName !== null) {
      const directoryName = topmostDirectoryName, ///
            directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);

      if (directoryNameDragEntry !== null) {
        directoryPath = directoryPathWithoutTopmostDirectoryName; ///

        directoryNameDragEntry.removeDirectoryPath(directoryPath);

        const explorer = this.getExplorer(),
              removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

        if (removeEmptyParentDirectoriesOptionPresent) {
          const topmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry();

          if (directoryNameDragEntry !== topmostDirectoryNameDragEntry) {
            const directoryNameDragEntryEmpty = directoryNameDragEntry.isEmpty();

            if (directoryNameDragEntryEmpty) {
              this.removeEntry(directoryNameDragEntry);
            }
          }
        }
      }
    } else {
      const directoryName = directoryPath,  ///
            directoryNameDragEntry = this.findDirectoryNameDragEntry(directoryName);

      if (directoryNameDragEntry !== null) {
        this.removeEntry(directoryNameDragEntry);
      }
    }
  }

  createFileNameDragEntry(fileName) {
    const name = fileName,
          explorer = this.getExplorer(),
          FileNameDragEntry = explorer.getFileNameDragEntry(),
          fileNameDragEntry =

            <FileNameDragEntry name={name} explorer={explorer} />

        ;

    return fileNameDragEntry;
  }

  createDirectoryNameDragEntry(directoryName, collapsed) {
    const name = directoryName,
          explorer = this.getExplorer(),
          DirectoryNameDragEntry = explorer.getDirectoryNameDragEntry(),
          directoryNameDragEntry =

            <DirectoryNameDragEntry name={name} collapsed={collapsed} explorer={explorer} />

          ;

    return directoryNameDragEntry;
  }

  findMarkerEntry() {
    const markerEntry = this.findEntryByTypes((entry) => {
            return true;  ///
          }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

    return markerEntry;
  }

  findDragEntryPath(dragEntry) {
    let dragEntryPath = null;

    this.someEntry((entry) => {
      if (entry === dragEntry) {  ///
        const entryName = entry.getName();

        dragEntryPath = entryName;  ///

        return true;
      }
    });

    return dragEntryPath;
  }

  findMarkedDirectoryNameDragEntry() {
    let markedDirectoryNameDragEntry = null;

    this.someDirectoryNameDragEntry((directoryNameDragEntry) => {
      const directoryNameDragEntryMarked = directoryNameDragEntry.isMarked();

      if (directoryNameDragEntryMarked) {
        markedDirectoryNameDragEntry = directoryNameDragEntry;  ///

        return true;
      }
    });

    return markedDirectoryNameDragEntry;
  }

  findTopmostDirectoryNameDragEntry() {
    let topmostDirectoryNameDragEntry = null;

    this.someDirectoryNameDragEntry((directoryNameDragEntry) => {
      const directoryNameDragEntryTopmost = directoryNameDragEntry.isTopmost();

      if (directoryNameDragEntryTopmost) {
        topmostDirectoryNameDragEntry = directoryNameDragEntry;  ///

        return true;
      }
    });

    return topmostDirectoryNameDragEntry;
  }

  retrieveMarkerEntry() {
    let markerEntry = this.findMarkerEntry();

    if (markerEntry === null) {
      this.someDirectoryNameDragEntry((directoryNameDragEntry) => {
        markerEntry = directoryNameDragEntry.retrieveMarkerEntry();

        if (markerEntry !== null) {
          return true;
        }
      });
    }

    return markerEntry;
  }

  retrieveFilePaths(filePaths = []) {
    this.forEachFileNameDragEntry((fileNameDragEntry) => {
      const fileNameDragEntryPath = fileNameDragEntry.getPath(),
            filePath = fileNameDragEntryPath;  ///

      filePaths.push(filePath);
    });

    this.forEachDirectoryNameDragEntry((directoryNameDragEntry) => {
      directoryNameDragEntry.retrieveFilePaths(filePaths);
    });

    return filePaths;
  }

  retrieveDirectoryPaths(directoryPaths = []) {
    this.forEachDirectoryNameDragEntry((directoryNameDragEntry) => {
      const directoryNameDragEntryPath = directoryNameDragEntry.getPath(),
            directoryPath = directoryNameDragEntryPath;  ///

      directoryPaths.push(directoryPath);

      directoryNameDragEntry.retrieveDirectoryPaths(directoryPaths);
    });

    return directoryPaths;
  }

  retrieveDragEntryPath(dragEntry) {
    let dragEntryPath = this.findDragEntryPath(dragEntry);

    if (dragEntryPath === null) {
      this.someDirectoryNameDragEntry((directoryNameDragEntry) => {
        dragEntryPath = directoryNameDragEntry.retrieveDragEntryPath(dragEntry);

        if (dragEntryPath !== null) {
          const directoryNameDragEntryName = directoryNameDragEntry.getName();

          dragEntryPath = `${directoryNameDragEntryName}/${dragEntryPath}`;

          return true;
        }
      });
    }

    return dragEntryPath;
  }

  retrieveDragSubEntries(subEntries = []) {
    this.forEachFileNameDragEntry((fileNameDragEntry) => {
      const subEntry = fileNameDragEntry; ///

      subEntries.push(subEntry);
    });

    this.forEachDirectoryNameDragEntry((directoryNameDragEntry) => {
      const subEntry = directoryNameDragEntry; ///

      subEntries.push(subEntry);

      directoryNameDragEntry.retrieveDragSubEntries(subEntries);
    });

    return subEntries;
  }

  retrieveMarkedDirectoryNameDragEntry() {
    let markedDirectoryNameDragEntry = this.findMarkedDirectoryNameDragEntry();

    if (markedDirectoryNameDragEntry === null) {
      this.someDirectoryNameDragEntry((directoryNameDragEntry) => {
        markedDirectoryNameDragEntry = directoryNameDragEntry.retrieveMarkedDirectoryNameDragEntry();

        if (markedDirectoryNameDragEntry !== null) {
          return true;
        }
      });
    }

    return markedDirectoryNameDragEntry;
  }
  
  retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry) {
    let bottommostDirectoryNameDragEntryOverlappingDragEntry = null;

    this.someDirectoryNameDragEntry((directoryNameDragEntry) => {
      const directoryNameDragEntryOverlappingDragEntry = directoryNameDragEntry.isOverlappingDragEntry(dragEntry);

      if (directoryNameDragEntryOverlappingDragEntry) {
        let dragIntoSubDirectories = true;

        const directoryNameDragEntryTopmost = directoryNameDragEntry.isTopmost();

        if (directoryNameDragEntryTopmost) {
          const explorer = this.getExplorer(),
                noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

          if (noDraggingIntoSubdirectoriesOptionPresent) {
            dragIntoSubDirectories = false;
          }
        }

        if (dragIntoSubDirectories) {
          bottommostDirectoryNameDragEntryOverlappingDragEntry = directoryNameDragEntry.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry);
        }

        if (bottommostDirectoryNameDragEntryOverlappingDragEntry === null) {
          bottommostDirectoryNameDragEntryOverlappingDragEntry = directoryNameDragEntry; ///
        }
      }
    });

    return bottommostDirectoryNameDragEntryOverlappingDragEntry;
  }

  forEachFileNameDragEntry(callback) { this.forEachEntryByTypes(callback, FILE_NAME_TYPE); }

  forEachDirectoryNameDragEntry(callback) { this.forEachEntryByTypes(callback, DIRECTORY_NAME_TYPE); }

  someFileNameDragEntry(callback) { return this.someEntryByTypes(callback, FILE_NAME_TYPE); }

  someDirectoryNameDragEntry(callback) { return this.someEntryByTypes(callback, DIRECTORY_NAME_TYPE); }

  findDragEntry(name) { return this.findEntryByNameAndTypes(name, FILE_NAME_TYPE, DIRECTORY_NAME_TYPE); }

  findFileNameDragEntry(fileName) { return this.findEntryByNameAndTypes(fileName, FILE_NAME_TYPE); }

  findDirectoryNameDragEntry(directoryName) { return this.findEntryByNameAndTypes(directoryName, DIRECTORY_NAME_TYPE); }

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
            expandEntries = this.expand.bind(this), ///
            collapseEntries = this.collapse.bind(this), ///
            addFilePath = this.addFilePath.bind(this),
            removeFilePath = this.removeFilePath.bind(this),
            addDirectoryPath = this.addDirectoryPath.bind(this),
            removeDirectoryPath = this.removeDirectoryPath.bind(this),
            isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this),
            isDragEntryPresent = this.isDragEntryPresent.bind(this),
            findTopmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry.bind(this),
            retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this),
            retrieveFilePaths = this.retrieveFilePaths.bind(this),
            retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this),
            retrieveDragEntryPath = this.retrieveDragEntryPath.bind(this),
            retrieveDragSubEntries = this.retrieveDragSubEntries.bind(this),
            retrieveMarkedDirectoryNameDragEntry = this.retrieveMarkedDirectoryNameDragEntry.bind(this),
            retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry.bind(this);

    return ({
      getExplorer,
      isEmpty,
      addMarker,
      removeMarker,
      expandEntries,
      collapseEntries,
      addFilePath,
      removeFilePath,
      addDirectoryPath,
      removeDirectoryPath,
      isMarkerEntryPresent,
      isDragEntryPresent,
      findTopmostDirectoryNameDragEntry,
      retrieveMarkerEntry,
      retrieveFilePaths,
      retrieveDirectoryPaths,
      retrieveDragEntryPath,
      retrieveDragSubEntries,
      retrieveMarkedDirectoryNameDragEntry,
      retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry
    });
  }

  static tagName = "ul";

  static defaultProperties = {
    className: "entries"
  };
}

export default withStyle(Entries)`

  width: auto;
  padding-left: 2.4rem;
  
  .collapsed {
    display: none;
  }

`;
