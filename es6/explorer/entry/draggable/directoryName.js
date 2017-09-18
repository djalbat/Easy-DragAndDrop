'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const Entry = require('../../entry'),
      Entries = require('../../entries'),
      DraggableEntry = require('../../entry/draggable');

const { pathUtilities } = necessary,
      { types } = Entry,
      { Button, React } = easy,
      { topmostDirectoryNameFromPath, pathWithoutTopmostDirectoryNameFromPath } = pathUtilities,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = types;

class DirectoryNameDraggableEntry extends DraggableEntry {
  constructor(selector, name, explorer) {
    const type = DIRECTORY_NAME_TYPE;

    super(selector, name, explorer, type);

    const toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);
    
    this.entries = <Entries DirectoryNameDraggableEntry={DirectoryNameDraggableEntry} />;
    
    this.toggleButton = <Button className="toggle" onClick={toggleButtonClickHandler} />;
  }

  isDirectoryNameDraggableEntry() {
    return true;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case FILE_NAME_TYPE:
      case FILE_NAME_MARKER_TYPE:
      case DIRECTORY_NAME_MARKER_TYPE:
        before = true;
          
        break;

      case DIRECTORY_NAME_TYPE:
        const name = this.getName(),
              entryName = entry.getName();

        before = (name.localeCompare(entryName) < 0);

        break;
    }
    
    return before;
  }

  getCollapsedBounds() {
    const collapsed = this.isCollapsed();

    this.collapse();

    const bounds = super.getBounds(),
          collapsedBounds = bounds;  ///

    if (!collapsed) {
      this.expand();
    }

    return collapsedBounds;
  }

  isCollapsed() {
    const collapsed = this.hasClass('collapsed');

    return collapsed;
  }

  isMarked() {
    let marked;

    const entriesMarked = this.entries.isMarked();

    if (entriesMarked) {
      marked = entriesMarked;
    } else {
      const directoryNameDraggableEntryMarked = this.entries.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
        const directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

        return directoryNameDraggableEntryMarked;
      });

      marked = directoryNameDraggableEntryMarked; ///
    }

    return marked;
  }

  isEmpty() { return this.entries.isEmpty(); }

  isOverlappingDraggableEntry(draggableEntry) {
    let overlappingDraggableEntry;
    
    if (this === draggableEntry) {
      overlappingDraggableEntry = false;
    } else {
      const collapsed = this.isCollapsed();
      
      if (collapsed) {
        overlappingDraggableEntry = false;
      } else {
        const draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = super.isOverlappingCollapsedBounds(draggableEntryCollapsedBounds);

        overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
      }
    }

    return overlappingDraggableEntry;
  }

  addFilePath(filePath) {
    let fileNameDraggableEntry = null;

    const addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName);
    } else {
      const fileName = filePath,  ///
            entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

      if (!entriesFile) {
        const explorer = this.getExplorer();
        
        fileNameDraggableEntry = this.entries.addFileNameDraggableEntry(fileName, explorer);
      }
    }

    return fileNameDraggableEntry;
  }

  addDirectoryPath(directoryPath, collapsed) {
    let directoryNameDraggableEntry = null;

    const addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
    } else {
      const directoryName = directoryPath,  ///
            entriesDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(directoryName),
            entriesDirectoryNameDraggableEntryPresent = (entriesDirectoryNameDraggableEntry !== null);

      if (entriesDirectoryNameDraggableEntryPresent) {
        entriesDirectoryNameDraggableEntry.setCollapsed(collapsed);
      } else {
        const explorer = this.getExplorer();

        directoryNameDraggableEntry = this.entries.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed);
      }
    }

    return directoryNameDraggableEntry;
  }

  removeFilePath(filePath) {
    let removeEmptyParentDirectoryNameDraggableEntries = null; ///

    const addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeFilePath(filePathWithoutTopmostDirectoryName);
    } else {
      const fileName = filePath,  ///
            entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

      if (entriesFile) {
        removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeFileNameDraggableEntry(fileName);
      }
    }

    if (removeEmptyParentDirectoryNameDraggableEntries === true) {
      const topmostDirectory = this.isTopmostDirectoryNameDraggableEntry();

      if (!topmostDirectory) {
        const empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }

    return removeEmptyParentDirectoryNameDraggableEntries;
  }

  removeDirectoryPath(directoryPath) {
    let removeEmptyParentDirectoryNameDraggableEntries = false;

    const addIfNecessary = false, ///
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
    } else {
      const directoryName = directoryPath,  ///
            entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(directoryName);

      if (entriesDirectoryNameDraggableEntryPresent) {
        removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeDirectoryNameDraggableEntry(directoryName);
      }
    }

    if (removeEmptyParentDirectoryNameDraggableEntries === true) {
      const topmostDirectory = this.isTopmostDirectoryNameDraggableEntry();

      if (!topmostDirectory) {
        const empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }

    return removeEmptyParentDirectoryNameDraggableEntries;
  }
  
  addMarkerEntry(markerPath, draggableEntryType) {
    const topmostDirectoryName = topmostDirectoryNameFromPath(markerPath);

    if (topmostDirectoryName === null) {
      const markerName = markerPath;  ///

      this.entries.addMarkerEntry(markerName, draggableEntryType);
    } else {
      const topmostDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

      topmostDirectoryNameDraggableEntry.addMarkerEntry(markerPathWithoutTopmostDirectoryName, draggableEntryType);
    }
  }

  removeMarkerEntry() {
    let removed;

    const entriesMarked = this.entries.isMarked();
    
    if (entriesMarked) {
      this.entries.removeMarkerEntry();

      removed = true;
    } else {
      removed = this.entries.someDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
        const removed = directoryNameDraggableEntry.removeMarkerEntry();
        
        return removed;
      });
    }
    
    return removed;
  }

  isDraggableEntryPresent(name) { return this.entries.isDraggableEntryPresent(name); }

  forEachFileNameDraggableEntry(callback) { this.entries.forEachFileNameDraggableEntry(callback); }

  forEachDirectoryNameDraggableEntry(callback) { this.entries.forEachDirectoryNameDraggableEntry(callback); }

  someDirectoryNameDraggableEntry(callback) { this.entries.someDirectoryNameDraggableEntry(callback); }

  retrieveFilePaths() {
    let filePaths = [];

    this.forEachFileNameDraggableEntry(function(fileNameDraggableEntry) {
      const fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
            filePath = fileNameDraggableEntryPath;  ///

      filePaths.push(filePath);
    });

    this.forEachDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      const directoryNameDraggableEntryFilePaths = directoryNameDraggableEntry.retrieveFilePaths(),
            directoryFilePaths = directoryNameDraggableEntryFilePaths;

      filePaths = filePaths.concat(directoryFilePaths);
    });

    return filePaths;
  }

  retrieveDirectoryPaths() {
    let directoryPaths = [];

    this.forEachDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      const directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(),
            directoryNameDraggableEntryDirectoryPaths = directoryNameDraggableEntry.retrieveDirectoryPaths(),
            directoryPath = directoryNameDraggableEntryPath,  ///
            directoryDirectoryPaths = directoryNameDraggableEntryDirectoryPaths;

      directoryPaths.push(directoryPath);

      directoryPaths = directoryPaths.concat(directoryDirectoryPaths);
    });

    return directoryPaths;
  }

  retrieveSubEntries() {
    let subEntries = [];

    this.forEachFileNameDraggableEntry(function(fileNameDraggableEntry) {
      const subEntry = fileNameDraggableEntry; ///

      subEntries.push(subEntry);
    });

    this.forEachDirectoryNameDraggableEntry(function(directoryNameDraggableEntry) {
      const subEntry = directoryNameDraggableEntry, ///
            directoryNameDraggableEntrySubEntries = directoryNameDraggableEntry.retrieveSubEntries();

      subEntries.push(subEntry);

      subEntries = subEntries.concat(directoryNameDraggableEntrySubEntries);
    });

    return subEntries;
  }

  retrieveDraggableEntryPath(draggableEntry) {
    let draggableEntryPath;

    const name = this.getName();

    if (draggableEntry === this) {
      draggableEntryPath = name;  ///
    } else {
      draggableEntryPath = this.entries.retrieveDraggableEntryPath(draggableEntry);

      if (draggableEntryPath !== null) {
        draggableEntryPath = `${name}/${draggableEntryPath}`;
      }
    }

    return draggableEntryPath;
  }

  retrieveTopmostDirectoryNameDraggableEntry(path, addIfNecessary) {
    let topmostDirectoryNameDraggableEntry;

    const topmostDirectoryName = topmostDirectoryNameFromPath(path);

    if (topmostDirectoryName === null) {
      topmostDirectoryNameDraggableEntry = null;
    } else {
      if (addIfNecessary) {
        const entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

        if (!entriesDirectoryNameDraggableEntryPresent) {
          const collapsed = true, ///
                explorer = this.getExplorer();

          this.entries.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed);
        }
      }

      const directoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName);

      topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
    }

    return topmostDirectoryNameDraggableEntry;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    let markedDirectoryNameDraggableEntry = this.entries.retrieveMarkedDirectoryNameDraggableEntry();

    if (markedDirectoryNameDraggableEntry === null) {
      const marked = this.isMarked();
      
      if (marked) {
        markedDirectoryNameDraggableEntry = this;
      }
    }

    return markedDirectoryNameDraggableEntry;
  }

  retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    let directoryNameDraggableEntryOverlappingDraggableEntry = null;

    const overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

    if (overlappingDraggableEntry) {
      directoryNameDraggableEntryOverlappingDraggableEntry = this.entries.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

      if (directoryNameDraggableEntryOverlappingDraggableEntry === null) {
        directoryNameDraggableEntryOverlappingDraggableEntry = this;
      }
    }

    return directoryNameDraggableEntryOverlappingDraggableEntry;
  }
  
  toggleButtonClickHandler() {
    this.toggle();
  }

  doubleClickHandler() {
    this.toggle();
  }

  setCollapsed(collapsed) {
    collapsed ?
      this.collapse() :
        this.expand();
  }

  collapse() {
    this.addClass('collapsed');
  }

  expand() {
    this.removeClass('collapsed');
  }

  toggle() {
    this.toggleClass('collapsed');
  }
  
  initialise(collapsed) {
    super.initialise();
    
    this.onDoubleClick(this.doubleClickHandler.bind(this));

    this.append(this.entries);

    this.prepend(this.toggleButton);

    this.setCollapsed(collapsed);
  }
  
  static fromProperties(Class, properties) {
    if (arguments.length === 1) {
      properties = Class;
      Class = DirectoryNameDraggableEntry;
    }

    const { collapsed } = properties,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);

    directoryNameDraggableEntry.initialise(collapsed);

    return directoryNameDraggableEntry;
  }
}

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directoryName'
  },
  ignoredProperties: [
    'collapsed'
  ]
});

module.exports = DirectoryNameDraggableEntry;